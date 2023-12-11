var express = require('express');
var router = express.Router();
const fs = require('fs');
const CleanCSS = require('clean-css');
const UglifyJS = require('uglify-es');


router.get('/', function (req, res) {
return res.json({
  status: true,
  message: 'hello Champ...'
})
})



module.exports = router;
