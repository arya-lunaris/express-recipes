// This program is responsible for adding (seeding) data to our database

import mongoose from "mongoose";
import Recipe from '../models/recipe.js';
import recipes from '../data.js';

async function seed() {
    console.log("Hello Seed");
    mongoose.connect('mongodb://127.0.0.1:27017/recipes-db');
    
    const newRecipes = await Recipe.create(recipes);

    await mongoose.disconnect();
}

seed();