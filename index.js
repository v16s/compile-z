var express = require("express");
var path = require("path");
var bodyParser     = require( 'body-parser' );
var methodOverride = require( 'method-override' );
const exec = require('child_process').exec;

//internal files
var deployment = require("./api-v1/deploy");
var active = require("./api-v1/active");
var counter = require("./api-v1/counter");
var code = require("./api-v1/code");
var image = require("./api-v1/image");
var deleteTread = false;

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
    console.log("INBOUND: " + JSON.stringify(req.body));
    deleteTread = false;
    code.code(req.body,function(jsonData){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(jsonData));
        console.log('OUTBOUND' + JSON.stringify(jsonData));
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

setInterval(function(){
    if(deleteTread == true) {
        deleteTread=false;
    }else{
        //kill all
        exec("killall a.out",(error,stdout,stderr) => {
        if(error) {
            console.log('Error in killing with Message: ' + error.message);
        }
        console.log("Process Killed a.out");
    });

    exec("killall java",(error,stdout,stderr) => {
        if(error) {
            console.log('Error in killing with Message: ' + error.message);
        }
        console.log("Process Killed java");
    });

    exec("killall octave-gui",(error,stdout,stderr) => {
        if(error) {
            console.log('Error in killing with Message: ' + error.message);
        }
        console.log("Process Killed octave-gui");
    });
    }
},300000);