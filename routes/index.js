const router = require('express').Router(); 
const passport = require('passport');


router.use('/', require('./swagger'));

router.use('/cars', require('./cars')); //will look for cars.js file under routes
router.use('/customers', require('./customers')); //will look for customers.js file under routes..

//authentication
router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err); }   
    res.redirect('/');
 });
});

module.exports = router;