var express = require('express');
var router = express.Router();
const fs = require('fs');
const CleanCSS = require('clean-css');
const UglifyJS = require('uglify-es');


router.get('/', function (req, res) {
  const cssCode = `
  /* Your CSS code here */
  body {
    margin: 0;
    padding: 0;
  }
`;

  const minifiedCSS = new CleanCSS().minify(cssCode).styles;
  console.log("minifiedCSS:", minifiedCSS);

  const jsCode = `
  // Your JS code here
  function greet(name) {
    console.log('Hello, ' + name + '!');
  }

  greet('World');
`;

  const minifiedJS = UglifyJS.minify(jsCode).code;
  console.log("minifiedJS:", minifiedJS);

  return res.json({
    css: minifiedCSS,
    js: minifiedJS
  })


})



module.exports = router;
