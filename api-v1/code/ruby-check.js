var counter = require("../counter");
const execFile = require('child_process').execFile;
const exec = require('child_process').exec;
var fs = require("fs");

var execute = function(reqData,callback) {
    var foldername = (counter.getCount())['total']; 
    counter.increaseTotalCount();

    var pathName = "usercodes/" + foldername + "/";

    if (fs.existsSync(pathName)===false) {
        fs.mkdirSync(pathName,0777);
    }

    fs.writeFileSync("./usercodes/" + foldername + "/main.rb",reqData['code']);

    var pwd = process.cwd() + "/usercodes/" + foldername + "/";

    execute(reqData,pwd,callback);

    function execute(reqData,pwd,callback) {
        var inputs = [];
        var outputs = [];

        var count = 0;

        inputs = reqData['inputs'];

        if(inputs.length === 0) {
            callback({
                "statusCode": "404",
                "output": "Provide a Valid Input"
            });
            return;
        }
        
        for(var i=0;i < inputs.length; i++) {
            if(inputs[i] == "") {
                getOutput(pwd," ",i,(jsonData,index) => {
                    outputs[index] = jsonData;
                    count++;
                    if(count == inputs.length) {
                        callback({
                            "statusCode": "200",
                            "output": JSON.stringify(outputs)
                        });
                        
                        //free up folder
                        counter.freeFolder(pwd);
                    }
                });
            } else {
                getOutput(pwd,inputs[i],i,(jsonData,index) => {
                    outputs[index] = jsonData;
                    count++;
                    if(count == inputs.length) {
                        callback({
                            "statusCode": "200",
                            "output": JSON.stringify(outputs)
                        });

                        //free up folder
                        counter.freeFolder(pwd);
                    }
                });
            }
        }
    }

    function getOutput(pwd,input,index,callback) { 
        
        fs.writeFileSync("./usercodes/" + foldername + "/input" + index + ".txt",input);
        
        exec('ruby main.rb < input' + index + '.txt',{'cwd': pwd, 'timeout': 10000 },(error, stdout, stderr) => {
            if (error) {
                if(error['signal'] === "SIGTERM") {
                    callback({
                        "statusCode": "404",
                        "errorMsg": "Execution timeout [10 SEC]"
                    },index);
                    return;
                }
                callback({
                    "statusCode": "404",
                    "errorMsg": error.message
                },index);
                return;
            }
            if(stderr) {
                callback({
                    "statusCode": "404",
                    "errorMsg": stderr
                },index);
            }else{
                callback({
                    "statusCode":"200",
                    "output": stdout
                },index);
            }
        });
    }
};



module.exports.execute = execute;
