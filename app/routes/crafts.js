var express = require('express');
var router = express.Router();



router.get('/crafts', function(req,res){
    console.log('Session token of user '+ req.session.token);
    res.render('index',{
        pageTitle: '5 min paper crafts',
        apiKey: req.app.get('YOUTUBE_API_KEY'),
        pageId: 'crafts'
    });
});








module.exports = router;