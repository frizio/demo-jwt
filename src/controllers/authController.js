const { Router } = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const router = Router();


router.post(
    '/signup',
    async (req, res, next) => {
        console.log('Registration');
        const {username, email, password} = req.body;
        const user = new User(
            {
                username,
                email,
                password
            }
        );
        user.password = await user.encryptPassword(user.password);
        await user.save();

        const token = jwt.sign( {id: user._id}, config.secret, {expiresIn: 60*60*24} );

        res.json(
            {
                message: 'Registration successfully',
                auth: true,
                token
            }
        );
    }
);


router.post(
    '/signin',
    (req, res, next) => {
        console.log('Login');
        rres.json({'message': 'Login'});
    }
);


router.get(
    '/me',
    (req, res, next) => {
        console.log('Dashboard');
        res.json({'message': 'Dashboard'});
    }
);



module.exports = router;