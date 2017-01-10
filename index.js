var express = require("express");
var path = require("path");
var bodyParser     = require( 'body-parser' );
var methodOverride = require( 'method-override' );

//internal files
var deployment = require("./api-v1/deploy");
var active = require("./api-v1/active");
var counter = require("./api-v1/counter");
var code = require("./api-v1/code");
var image = require("./api-v1/image");

var app = express();

app.use( bodyParser.json()); 
app.use( bodyParser.urlencoded({ extended: true })); 
app.use( methodOverride( 'X-HTTP-Method-Override' )); 
app.use(express.static( __dirname + '/ui' ));

app.get('/control',function(req,res){
    res.sendFile(path.join( __dirname, 'ui', 'index.html' ));
});

app.post("/api/v1/",function(req,res){
    console.log(req.body);
});

app.post("/api/v1/deployment",function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(deployment.isDeployed()));
});

app.post("/api/v1/active",function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(active.isActive()));
});

app.post("/api/v1/count",function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(counter.getCount()));
});

app.post("/api/v1/code",function(req,res) {
    code.code(req.body,function(jsonData){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(jsonData));
        console.log(JSON.stringify(jsonData));
    });
});

app.post("/api/v1/image",function(req,res){
    image.html2image(req.body,function(jsonData){
        if(jsonData['statusCode'] == "200") {
            res.writeHead(200, {'Content-Type': 'image/png' });
            res.end(jsonData['image']);
        } else {
            res.send(JSON.stringify(jsonData));
        }
    });
});


app.listen(2200,function(){
    console.log("Listening on Port 2200")
});