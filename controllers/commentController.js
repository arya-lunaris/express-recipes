import express from 'express';
import Recipe from '../models/recipe.js';

const router = express.Router();

router.post('/recipes/:id/comments', async function(req, res, next) {
    try {
        if (!req.session.user) {
            return res.redirect('/error/loginError')
        }

        req.body.user = req.session.user;

        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.redirect('/error/recipeNotFound')
        }

        recipe.comments.push(req.body);

        await recipe.save();

        res.redirect(`/recipes/${recipe.name}`);  
    } catch (e) {
        next(e);
    }
});

router.delete('/recipes/:recipeId/comments/:commentId', async function(req, res, next) {
    try {
        if (!req.session.user) {
            return res.redirect('/error/loginError');
        }

        const { recipeId, commentId } = req.params;

        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.redirect('/error/recipeNotFound');
        }

        const commentIndex = recipe.comments.findIndex(comment => comment._id.toString() === commentId);

        if (commentIndex === -1) {
            return res.redirect('/error/commentNotFound');
        }

        if (recipe.comments[commentIndex].user.toString() !== req.session.user._id.toString()) {
            return res.redirect('/error/unauthorized');
        }

        recipe.comments.splice(commentIndex, 1);

        await recipe.save();

        res.redirect(`/recipes/${recipe.name}`);  

    } catch (e) {
        next(e);
    }
});

export default router;