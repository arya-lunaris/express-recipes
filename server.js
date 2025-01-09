import express from 'express';
import recipes from './data.js';
import mongoose from 'mongoose';
import Recipe from './models/recipe.js';
import recipeController from './controllers/recipeController.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js'



const app = express();

app.use(express.json());

app.use(logger)

app.use('/', recipeController)

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});

const url = 'mongodb://127.0.0.1:27017/';
const dbname = 'recipes-db';
mongoose.connect(`${url}${dbname}`);