var express = require('express');
var router = express.Router();


router.get('/', function(req,res){
    var data1 = req.app.get('appData');
    data1 = data1.slice(0,data1.length/2);

    res.render('index', {
        pageTitle: 'Our Products',
        pageId: 'home',
        products: data1
    });
});

module.exports = router;

