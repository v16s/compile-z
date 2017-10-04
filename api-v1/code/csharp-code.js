var counter = require("../counter");
const execFile = require('child_process').execFile;
const exec = require('child_process').exec;
var fs = require("fs");

var execute = function(reqData,callback) {
    var foldername = (counter.getCount())['total']; 
    counter.increaseTotalCount();

    var pathName = "./usercodes/" + foldername + "/";

    if (fs.existsSync("./usercodes")===false) {
        fs.mkdirSync("./usercodes",0777);
    }

    if (fs.existsSync(pathName)===false) {
        fs.mkdirSync(pathName,0777);
    }

    var finalSourceCode = reqData['code'];
    fs.writeFileSync("./usercodes/" + foldername + "/main.cs",finalSourceCode);
    fs.writeFileSync("./usercodes/" + foldername + "/input.txt",reqData['input']);

    var pwd = process.cwd() + "/usercodes/" + foldername + "/";

    execFile('mcs',['main.cs'], {'cwd': pwd },(error, stdout, stderr) => {
        if (error) {
            callback({
                "statusCode": "404",
                "errorMsg": error.message
            });
            return;
        }
        if(stderr) {
            callback({
                "statusCode": "404",
                "errorMsg": stderr
            });
        }else {
            execute(pwd,callback);
        }
    });

    function execute(pwd,callback) {
        console.log("Executing" + pwd);
        exec('mono main.exe <input.txt',{'cwd': pwd, 'timeout': 10000 },(error, stdout, stderr) => {
            if (error) {
                        //free up folder
                        counter.freeFolder(pwd);
                if(error['signal'] === "SIGTERM") {
                    callback({
                        "statusCode": "404",
                        "errorMsg": "Execution timeout [10 SEC]"
                    });
                    return;
                }
                callback({
                    "statusCode": "404",
                    "errorMsg": error.message
                });
                return;
            }
            if(stderr) {
                        //free up folder
                        counter.freeFolder(pwd);
                callback({
                    "statusCode": "404",
                    "errorMsg": stderr
                });
                        //free up folder
                        counter.freeFolder(pwd);
            }else{
                        //free up folder
                        counter.freeFolder(pwd);
                callback({
                    "statusCode":"200",
                    "output": stdout
                });
            }
        });
    }
};



module.exports.execute = execute;
