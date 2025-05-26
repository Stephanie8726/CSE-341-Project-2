const router = require('express').Router(); 

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['My 2nd Project - Car Collections ]
    res.send('My 2nd Project - Car Collections'); 
});

router.use('/cars', require('./cars')); //will look for collections.js file under routes

module.exports = router;