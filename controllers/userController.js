import express from 'express';
import User from '../models/user.js';


const router = express.Router();


router.route('/signup').get(async function (req, res) {
    res.render('user/signup.ejs');
});

router.route('/signup').post(async function (req, res, next) {
    try {
        const { username, email, password } = req.body;
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
        return res.status(401).send({ message: "Unauthorized"})
      }
      res.send({ message: "Login successful!"})
    } catch(e) {
      next(e)
    }
  })

export default router;