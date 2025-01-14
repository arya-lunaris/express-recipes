import express from 'express';
const router = express.Router();


router.route('/loginError').get(function (req, res) {
    res.render('errors/loginError.ejs');
});

router.route('/deleteRecipeError').get(function (req, res) {
    res.render('errors/deleteRecipeError.ejs');
});

router.route('/updateRecipeError').get(function (req, res) {
    res.render('errors/updateRecipeError.ejs');
});

router.route('/recipeNotFound').get(function (req, res) {
    res.render('errors/recipeNotFound.ejs');
});

router.route('/userNotFound').get(function (req, res) {
    res.render('errors/userNotFound.ejs');
});

router.route('/incorrectPassword').get(function (req, res) {
    res.render('errors/incorrectPassword.ejs');
});

router.route('/passwordsNotMatch').get(function (req, res) {
    res.render('errors/passwordsNotMatch.ejs');
});

router.route('/invalidPassword').get(function (req, res) {
    res.render('errors/invalidPassword.ejs');
});

export default router;