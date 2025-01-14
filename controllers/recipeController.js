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

router.route('/error').get(function (req, res) {
    res.render('error.ejs');
});

router.route('/recipes').post(async function (req, res, next) {
    try {

        if (!req.session.user) {
           return res.redirect('/error')
        }

        if (req.body.ingredients) {
            req.body.ingredients = req.body.ingredients.split(',').map(ingredient => ingredient.trim());
        }
        const newRecipe = await Recipe.create(req.body);
        res.redirect('/recipes');
    } catch (e) {
        next(e);
    }
});

router.route('/recipes').get(async function (req, res, next) {
    try {
        const allRecipes = await Recipe.find();
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
            return res.status(404).send({ message: "Recipe not found. Please check the name and try again!" });
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

        if (!req.session.user) {
            return res.redirect('/error')
         }

        const recipeId = req.params.id;
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
        if (!deletedRecipe) {
            return res.status(404).send({ message: "Recipe not found. Please check the ID and try again!" });
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

        if (!req.session.user) {
            return res.redirect('/error')
         }

        if (req.body.ingredients) {
            req.body.ingredients = req.body.ingredients.split(',').map(ingredient => ingredient.trim());
        }
        const recipeId = req.params.id;
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, { new: true });
        if (!updatedRecipe) {
            return res.status(404).send({ message: "Recipe not found. Please check the ID and try again!" });
        }
        res.redirect('/recipes');
    } catch (e) {
        next(e);
    }
});


export default router;