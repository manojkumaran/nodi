var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var _ = require("lodash");
var jwt = require("jsonwebtoken");
var users    = require('../users');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/login', (req,res) => {
    var jwtOptions = req.app.get('jwtOptions');
     var name=null;
     var password = null;

    if(req.body.name && req.body.password){
         name = req.body.name;
        password = req.body.password;
    }
    
    //usually this would be a db call
    var user = users[_.findIndex(users,{name:name})];
    if(!user){
        res.status(401).json({message:"no such user found"});
    }
    if(user.password === password){
        var payload = {id: user.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey,{expiresIn:'30m'});    //create a jwt token and send as response. token expiry is also set
        req.session.token = token;
        res.json({message: "ok", token: token});
    }else{
        res.status(401).json({message: "passwords did not match"});
    }
});


router.get('/login', (req,res) => {
    console.log('Session token of user '+ req.session.token);
    res.render('index',{
        pageTitle: 'Login',
        pageId: "login"
    } );
});

router.get('/logout', (req,res) => {
    req.session.destroy( (err) => {
        if(err){
            console.log(err)
        }   else {
            console.log('session cleared. req.session.token is ' + req.session.token );
            res.redirect('/');
        }
    });
});

module.exports = router;