var express = require('express');
var router = express.Router();
var passport = require("passport");

router.get('/secret', passport.authenticate('jwt', {session:false}) , (req,res) =>{
    res.json("Welcome");
});



module.exports  = router;