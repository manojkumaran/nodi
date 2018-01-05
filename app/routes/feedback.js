var express = require('express');
var router = express.Router();


router.get('/feedback', (req,res) =>{
    res.render('index', {
        pageTitle: 'Your Feedback',
        pageId: 'feedback'
    });
});
module.exports = router;