var express = require('express');
var reload = require('reload');
var app = express();
var dataFile = require('./data/data.json');

var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJWT = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy; 
var jwt       = require("jsonwebtoken");
var users    = require('./users');

var _ = require("lodash");

app.set('port', process.env.PORT || 3001);
app.set('appData', dataFile);
app.set('views', 'app/views');
app.set('view engine','ejs');
app.set('YOUTUBE_API_KEY',"AIzaSyC_kBk58X8SAWxVLxsNxMymCvDMMm8klfA");


app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/api'));
app.use(require('./routes/crafts'));    //has the youtube videos retrieved
app.use(require('./routes/feedback'));
app.use(require('./routes/feeds'));
app.use(require('./routes/login'));
app.use(require('./routes/secret'));

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey="mysecretKey";

app.set('jwtOptions',jwtOptions);

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload,next){
    console.log('payload received ', jwt_payload);
    //usually this would be database call
    var user = users[_.findIndex(users, {id:jwt_payload.id})];
    if(user){
        next(null,user);
    }else{
        next(null,false);
    }
});
passport.use(strategy);



/* route for debugging purposes */
app.get("/debug", (req,res,next) => {
    console.log(req.get('Authorization'));
    next();
}, 
(req,res) =>{
    res.json('debugging');
});

reload(app);
var server = app.listen(app.get('port'), function(){
    console.log("Listening on port "+app.get('port'));
});
