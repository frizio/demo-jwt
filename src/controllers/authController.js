const { Router } = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = require('./verifyToken');

const router = Router();


router.post(
    '/signup',
    async (req, res, next) => {
        console.log('Registration');
        const {username, email, password} = req.body;
        const user = new User( {username, email, password} );
        user.password = await user.encryptPassword(user.password);
        await user.save();
        const token = jwt.sign( {id: user._id}, config.secret, {expiresIn: 60*60*24} );
        res.json( {message: 'Registration successfully', auth: true, token} );
    }
);


router.post(
    '/signin',
    async (req, res, next) => {
        console.log('Login');
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'The user not exist', auth: false, token: null});
        } else {
            const validPassword = await user.validatePassword(password);
            if (!validPassword) {
                return res.status(404).json({message: 'Password invalid', auth: false, token: null});
            } else {
                const token = jwt.sign( {id: user._id}, config.secret, {expiresIn: 60*60*24} );
                return res.status(200).json({message: 'Login successfully', auth: true, token});
            }
        }


    }
);


router.get(
    '/me',
    verifyToken,
    async (req, res, next) => {
        console.log('Dashboard');
        const user = await User.findById(req.userId, { password: 0, __v: 0 } );
        if (!user) {
            return res.status(404).json( {message: 'No user found'} );
        } else {
            return res.status(200).json( {message: 'Dashboard', user} );
        }
    }
);



module.exports = router;