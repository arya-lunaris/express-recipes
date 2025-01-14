import express from 'express';
import User from '../models/user.js';

const router = express.Router();


router.route('/signup').get(async function (req, res) {
    res.render('user/signup.ejs');
});

router.route('/signup').post(async function (req, res, next) {
    try {
        const { username, email, password, passwordConfirmation } = req.body;

        if (password !== passwordConfirmation) {
            return res.status(400).send({
                message: 'Passwords do not match.'
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).send({
                message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send({
                message: 'Invalid email format.'
            });
        }

        await User.create(req.body);

        res.redirect('/user/login');
    } catch (e) {
        next(e);
    }
});

router.route('/login').get(async function (req, res) {
    res.render('user/login.ejs');
});

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user.isPasswordValid(req.body.password)) {
            return res.status(401).send({ message: "Login unsuccessful" })
        }
        req.session.user = user;
        res.redirect('/home')
    } catch (e) {
        next(e)
    }
})

router.route("/logout").get(async function (req, res, next) {
    req.session.destroy();
    res.redirect("/home");
  });


export default router;