const { Router } = require('express');
const User = require('../models/User');

const router = Router();


router.post(
    '/signup',
    async (req, res, next) => {
        console.log('Registration');
        console.log(req.body);
        const {username, email, password} = req.body;
        console.log(username, email, password);
        const user = new User(
            {
                username,
                email,
                password
            }
        );
        user.password = await user.encryptPassword(user.password);
        console.log(user);
        res.json({'message': 'Registration'});
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