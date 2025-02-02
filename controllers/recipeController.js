import express from 'express';
import Recipe from '../models/recipe.js';
const router = express.Router();

router.route('/home').get(async function (req, res, next) {
    try {
        res.render('home.ejs');
    } catch (e) {
        next(e);
    }
});

router.route('/recipes').post(async function (req, res, next) {
    try {

        if (!req.session.user) {
           return res.redirect('/error/loginError')
        }

        if (req.body.ingredients) {
            req.body.ingredients = req.body.ingredients.split(',').map(ingredient => ingredient.trim());
        }

        req.body.user = req.session.user;

        const newRecipe = await Recipe.create(req.body);
        res.redirect('/recipes');
    } catch (e) {
        next(e);
    }
});

router.route('/recipes').get(async function (req, res, next) {
    try {
        const allRecipes = await Recipe.find().populate('user');
        res.render('recipes/index.ejs', {
            allRecipes: allRecipes
        })
    } catch (e) {
        next(e);
    }
});

router.route("/recipes/new").get(async function (req, res, next) {
    try {
        res.render("recipes/new.ejs");
    } catch (e) {
        next(e);
    }
});


router.route('/recipes/:name').get(async function (req, res, next) {
    try {
        const recipeName = { name: req.params.name }
        const recipe = await Recipe.findOne(recipeName);
        if (!recipe) {
            return res.redirect('/error/recipeNotFound')
        }
        res.render('recipes/show.ejs', {
            recipe: recipe
        });
    } catch (e) {
        next(e);
    }
});


router.route('/recipes/:id').delete(async function (req, res, next) {
    try {

        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId).populate('user');
        
        console.log(recipe, req.session)
        
        if (!recipe.user._id.equals(req.session.user._id)) {
            return res.redirect('/error/deleteRecipeError')

          }

        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId).populate('user');

        if (!deletedRecipe) {
            return res.redirect('/error/recipeNotFound')
        }
        res.redirect('/recipes');
    } catch (e) {
        next(e);
    }
});

router.route('/recipes/edit/:id').get(async function (req, res, next) {
    try {
        const recipe = await Recipe.findById(req.params.id).exec()
        res.render('recipes/edit.ejs', {
            recipe: recipe
        })
    } catch (e) {
        next(e)
    }
})



router.route('/recipes/:id').put(async function (req, res, next) {
    try {

        if (req.body.ingredients) {
            req.body.ingredients = req.body.ingredients.split(',').map(ingredient => ingredient.trim());
        }

        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId, req.body, { new: true }).populate('user');

        if (!recipe.user._id.equals(req.session.user._id)) {
            return res.redirect('/error/updateRecipeError')
          }

        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, { new: true }).populate('user');

        if (!updatedRecipe) {
            return res.redirect('/error/recipeNotFound')
        }
        res.redirect('/recipes');
    } catch (e) {
        next(e);
    }
});

export default router;