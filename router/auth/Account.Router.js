const express = require('express');
const router = express.Router();
const controller = require('../../Controller/auth/Account.Controller');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Passport to use Google OAuth 2.0
// passport.use(new GoogleStrategy({
//         clientID: 'YOUR_GOOGLE_CLIENT_ID',
//         clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
//         callbackURL: 'http://localhost:3000/auth/google/callback'
//     },
//     (accessToken, refreshToken, profile, done) => {
//         // Your authentication logic here
//         // For example, you might check if the user is already registered in your system
//         // and create a new account if necessary
//         // Then call done(null, user) to indicate successful authentication
//         return done(null, profile);
//     }
// ));

// You may want to implement serialization and deserialization as in the previous example

router.route('/')
        .post(controller.registerAccount);

router.route('/login')
        .post(controller.login);

// Route for initiating Google OAuth authentication
// router.route('/login/google')
//         .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.route('/login/google/callback')
//         .get(passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//             res.send('Successfully authenticated with Google');
// });

router.route('/:id')
        .patch(controller.addProfile)
        .delete(controller.deleteAccount)

router.route('/codePromo/:id')
        .patch(controller.removeCodePromo)

router.route('update/:id')
        .patch(controller.updateAccount);

module.exports = router;
