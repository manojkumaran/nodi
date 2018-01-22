var express = require('express');
var reload = require('reload');
var app = express();
var dataFile = require('./data/data.json');

app.set('port', process.env.PORT || 3001);
app.set('appData', dataFile);
app.set('views', 'app/views');
app.set('view engine','ejs');
app.set('YOUTUBE_API_KEY',"AIzaSyC_kBk58X8SAWxVLxsNxMymCvDMMm8klfA");


app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/api'));
app.use(require('./routes/crafts'));
app.use(require('./routes/feedback'));
app.use(require('./routes/feeds'));

reload(app);
var server = app.listen(app.get('port'), function(){
    console.log("Listening on port "+app.get('port'));
});



