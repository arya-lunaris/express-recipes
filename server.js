import express from 'express';
import recipes from './data.js';
import mongoose from 'mongoose';
import Recipe from './models/recipe.js';

const app = express();

app.use(express.json());

app.post('/recipes', async function (req, res) {
    const newRecipe = await Recipe.create(req.body);

    console.log(newRecipe);
    res.status(201).send(newRecipe);
});

app.get('/recipes', async function (req, res) {
    const allRecipes = await Recipe.find();
    res.send(allRecipes);
});

app.get('/recipes/:name', async function (req, res) {
    const recipe = await Recipe.findOne({ name: req.params.name })

    res.send(recipe);
});

app.delete('/recipes/:id', async function (req, res) {
    const recipeId = req.params.id;

    await Recipe.findByIdAndDelete(recipeId);

    res.sendStatus(204);
});

app.put('/recipes/:id', async function (req, res) {
    const recipeId = req.params.id;
    
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId);

    res.send(updatedRecipe);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});


const url = 'mongodb://127.0.0.1:27017/';
const dbname = 'recipes-db';
mongoose.connect(`${url}${dbname}`);