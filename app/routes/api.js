var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/api', function(req,res){
    var  data2 = req.app.get('appData');
    data2 = data2.slice(data2.length/2);

    res.json(data2);
});

module.exports = router;