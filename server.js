import express from 'express';
import recipes from './data.js';

const app = express();


app.use(express.json());


app.get('/recipes', function (req, res) {
    res.send(recipes);
});


app.get('/recipes/:name', function (req, res) {
    const recipeName = req.params.name;
    const recipe = recipes.find((currentRecipe) => {
        return currentRecipe.name.toLowerCase() === recipeName.toLowerCase();
    });

    res.send(recipe);
});


app.post('/recipes', function (req, res) {
    const newRecipe = req.body;
    recipes.push(newRecipe);
    res.status(201).send(newRecipe);
});


app.delete('/recipes/:id', function (req, res) {
    const recipeId = req.params.id;
    const recipeIndex = recipes.findIndex(currentRecipe => currentRecipe.id === recipeId);
    recipes.splice(recipeIndex, 1);
});


app.put('/recipes/:id', function (req, res) {
    const recipeId = req.params.id;
    const updateRecipe = req.body;

    const recipeIndex = recipes.findIndex((currentRecipe) => {
        return currentRecipe.id === recipeId;
    });

    recipes[recipeIndex] = updateRecipe;

    res.send(updateRecipe);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});