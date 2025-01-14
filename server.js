import express from 'express';
import mongoose from 'mongoose';
import path from 'path'; 
import methodOverride from 'method-override';
import recipeController from './controllers/recipeController.js';
import errorController from './controllers/errorController.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import userController from './controllers/userController.js'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUnitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    }
}))


app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', recipeController);
app.use('/user', userController);
app.use('/error', errorController);
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