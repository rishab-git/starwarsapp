var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(__dirname + '/app')); // set static files location, in this case the route, add a file name if not
app.get('/', function(req, res) {
    res.sendfile('./app/index.html', {root: __dirname })
});
app.listen(process.env.PORT || 3000);
