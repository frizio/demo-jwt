const { Router } = require('express');
const User = require('../models/User');

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
        res.json({'message': 'Registration successfully'});
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