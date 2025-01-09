import express from 'express';
import Recipe from '../models/recipe.js';

const router = express.Router();

router.route('/recipes').post(async function (req, res, next) {
    try {
        const newRecipe = await Recipe.create(req.body);
        res.status(201).send(newRecipe);
    } catch (e) {
        next(e);  
    }
});

router.route('/recipes').get(async function (req, res, next) {
    try {
        const allRecipes = await Recipe.find();
        res.send(allRecipes);
    } catch (e) {
        next(e);  
    }
});

router.route('/recipes/:name').get(async function (req, res, next) {
    try {
        const recipe = await Recipe.findOne({ name: req.params.name });
        if (!recipe) {
            return res.status(404).send({ message: "Recipe not found. Please check the name and try again!" });
        }
        res.send(recipe);
    } catch (e) {
        next(e); 
    }
});

router.route('/recipes/:id').delete(async function (req, res, next) {
    try {
        const recipeId = req.params.id;
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
        if (!deletedRecipe) {
            return res.status(404).send({ message: "Recipe not found. Please check the ID and try again!" });
        }
        res.sendStatus(204);
    } catch (e) {
        next(e); 
    }
});

router.route('/recipes/:id').put(async function (req, res, next) {
    try {
        const recipeId = req.params.id;
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, { new: true });
        if (!updatedRecipe) {
            return res.status(404).send({ message: "Recipe not found. Please check the ID and try again!" });
        }
        res.send(updatedRecipe);
    } catch (e) {
        next(e);  
    }
});

export default router;