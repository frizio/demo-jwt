const { Router } = require('express');

const router = Router();


router.post(
    '/signup',
    (req, res, next) => {
        console.log('Registration');
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