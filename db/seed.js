import mongoose from "mongoose";
import Recipe from '../models/recipe.js';
import recipes from '../data.js';
import User from '../models/user.js'

async function seed() {
    console.log("Hello Seed");
    await mongoose.connect('mongodb://127.0.0.1:27017/recipes-db');

    await mongoose.connection.db.dropDatabase();

    const user = await User.create({
        username: "arya",
        email: "arya@arya.com",
        password: "Arya123!"
    })

    recipes.forEach((recipe) => {
        recipe.user = user;
    })

    const newRecipes = await Recipe.create(recipes);
console.log(newRecipes)
    await mongoose.disconnect();
}

seed();