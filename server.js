import express from 'express';
import mongoose from 'mongoose';
import path from 'path'; 
import methodOverride from 'method-override';
import recipeController from './controllers/recipeController.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import userController from './controllers/userController.js'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use('/user', userController);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', recipeController);
app.use(errorHandler);

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

const url = 'mongodb://127.0.0.1:27017/';
const dbname = 'recipes-db';
mongoose.connect(`${url}${dbname}`, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});