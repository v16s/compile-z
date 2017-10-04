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

    fs.writeFileSync("./usercodes/" + foldername + "/main.rb",reqData['code']);
    fs.writeFileSync("./usercodes/" + foldername + "/input.txt",reqData['input']);

    var pwd = process.cwd() + "/usercodes/" + foldername + "/";

    execute(pwd,callback);

    function execute(pwd,callback) {
        console.log("Executing" + pwd);
        exec('ruby main.rb < input.txt',{'cwd': pwd, 'timeout': 10000 },(error, stdout, stderr) => {
            if (error) {
                if(error['signal'] === "SIGTERM") {
                    callback({
                        "statusCode": "404",
                        "errorMsg": "Execution timeout [10 SEC]"
                    });
                        //free up folder
                        counter.freeFolder(pwd);
                    return;
                }
                callback({
                    "statusCode": "404",
                    "errorMsg": error.message
                });
                        //free up folder
                        counter.freeFolder(pwd);
                return;
            }
            if(stderr) {
                callback({
                    "statusCode": "404",
                    "errorMsg": stderr
                });
                        //free up folder
                        counter.freeFolder(pwd);
            }else{
                callback({
                    "statusCode":"200",
                    "output": stdout
                });
                        //free up folder
                        counter.freeFolder(pwd);
            }
        });
    }
};



module.exports.execute = execute;
