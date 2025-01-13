import express from 'express';
import User from '../models/user.js';


const router = express.Router();


router.route('/signup').get((req, res) => {
    res.render('user/signup.ejs');
});

router.route('/user/signup').post(async (req, res, next) => {
    try {
        const { username, email, password } = req.body;


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists. Please log in.' });
        }


        const newUser = new User({ username, email, password });
        await newUser.save();


        res.redirect('/user/login');
    } catch (e) {
        next(e);
    }
});

router.route('/login').get((req, res) => {
    res.render('user/login.ejs');
});

export default router;