var express = require('express');
var router = express.Router();


/* Start image uploads*/


/* ENd Image Uploades*/

/* GET home page. */
var user = require('../controller/usercontroller');


router.post('/register', user.register);

router.post('/checkotp', user.checkotp);


module.exports = router;
