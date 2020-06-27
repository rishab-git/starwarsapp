var express = require('express');
var path = require('path');
var app = express();
var sslRedirect = require('heroku-ssl-redirect');

app.use(express.static(__dirname + '/app')); // set static files location, in this case the route, add a file name if not

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname));
app.use(sslRedirect());

/* At the top, with other redirect methods before other routes */
app.get('*',function(req,res,next){
    if(req.headers['x-forwarded-proto']!='https')
      res.redirect('https://' +req.url)
    else
      next() /* Continue to other routes if we're not redirecting */
  })

app.get('/', function(req, res) {
    res.sendfile('./app/index.html', {root: __dirname })
});
app.listen(process.env.PORT || 3000);
