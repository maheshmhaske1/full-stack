var express = require('express');
var router = express.Router();
var { verifyAdmin } = require('../middleware/Auth')
var user = require('../controller/user.controller')


/* GET users listing. */
router.post('/create', user.createUser)
router.post('/login', user.login)
router.get('/is-exist/:username', user.isUserExist)
router.get('/get-all-countries', user.getAllCountries)
router.get('/get-statesByCountry/:country_name', user.getStatesByCountry)
router.get('/get-citiesByState/:state_name', user.getCitiesByStates)


module.exports = router;
