const router = require('express').Router(); 

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['My 2nd Project - Car Collections ]
    res.send('My 2nd Project - Collections'); 
});

router.use('/cars', require('./cars')); //will look for cars.js file under routes
router.use('/customers', require('./customers')); //will look for customers.js file under routes

module.exports = router;