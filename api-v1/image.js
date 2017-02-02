var counter = require("./counter");
var fs = require("fs");
const exec = require('child_process').exec;

var html2image = function(jsonData,callback) {
    //debug
    /*var html = `<html>
        <head><title>Working</title></head>
        <body><h1>working</h1></body>
    </html>`;
    */

    var foldername = (counter.getCount())['total']; 
    counter.increaseTotalCount();

    var pathName = "./userimages/" + foldername + "/";

    if (fs.existsSync("./userimages")===false) {
        fs.mkdirSync("./userimages",0777);
    }

    if (fs.existsSync(pathName)===false) {
        fs.mkdirSync(pathName,0777);
    }
    var pwd = process.cwd() + "/userimages/" + foldername + "/";
    // Folder is created now

    //console.log(jsonData['html']);
    fs.writeFileSync("./userimages/" + foldername + "/index.html",jsonData['html']);
    
    var exec_statment = 'wkhtmltoimage ' + pwd + 'index.html ' + pwd + 'image.png';
    exec(exec_statment,{'cwd': pwd, 'timeout': 10000 }, (error, stdout, stderr) => {
        if (error) {
            // Deleting folder
            counter.freeFolder(pwd);

            callback({
                "statusCode": "404",
                "errorMsg": error.message
            });

            console.log("Message: " + error.message);
            
            return;
        }
        
        fs.readFile(pwd+'/image.png',{'cwd': pwd, 'timeout': 10000 },(err,data) => {
            if(err) {
                // Deleting folder
                counter.freeFolder(pwd);

                callback({
                    "statusCode": "404",
                    "errorMsg": err.message
                });

                // Deleting folder
                counter.freeFolder(pwd);

                return;
            }
            //image read success
            // Deleting folder
            counter.freeFolder(pwd);

            callback({
                "statusCode": "200",
                "image": data
            });

        });
    });



}

module.exports.html2image = html2image;