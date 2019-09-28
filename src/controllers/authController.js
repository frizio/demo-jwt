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
        const user = new User( {username, email, password} );
        user.password = await user.encryptPassword(user.password);
        await user.save();
        const token = jwt.sign( {id: user._id}, config.secret, {expiresIn: 60*60*24} );
        res.json( {message: 'Registration successfully', auth: true, token} );
    }
);


router.post(
    '/signin',
    (req, res, next) => {
        console.log('Login');
        res.json({'message': 'Login'});
    }
);


router.get(
    '/me',
    async (req, res, next) => {
        console.log('Dashboard');
        const token = req.headers['x-access-token'];
        if (!token) {
            res.status(401).json( { auth: false, message: 'No token provided'} );
        } else {
            const decoded = jwt.verify(token, config.secret);
            console.log(decoded);
            const user = await User.findById(decoded.id, { password: 0, __v: 0 } );
            if (!user) {
                res.status(404).json( {message: 'No user found'} );
            } else {
                res.status(200).json( {message: 'Dashboard', user: decoded.id, user} );
            }
        }
    }
);



module.exports = router;