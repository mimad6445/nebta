const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const express = require('express')

module.exports.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin,
            role: req.body.role,
        });

        user = await user.save();

        if (!user) {
            console.error('User not created:', user);
            return res.status(400).send('The user cannot be created!');
        }

        console.log('User created:', user);
        res.send(user);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('An error occurred during user registration');
    }
};

module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log("true");
        const secret = process.env.secret;
        
        if (!user) {
            return res.status(400).send('User not found');
        }

        if (user && bcrypt.compareSync(req.body.password, user.password)) { 
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                secret,
                { expiresIn: '1d' }
            );
            
            res.status(200).send({ user: user.role ,user: user.email, token: token });
        } else {
            res.status(400).send('Incorrect password');
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('An error occurred during login: ' + error.message);
    }
};

