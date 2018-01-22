var express = require('express');
var router = express.Router();
var feedbackData = require('../data/feedback.json');
var bodyParser = require('body-parser');

router.get('/feeds', (req,res) =>{
    res.json(feedbackData);
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded( { extended : false } ));

router.post('/feeds',  (req,res) =>{
    feedbackData.unshift(req.body);
    res.json(feedbackData);
});

router.post('/');
module.exports = router;