const exec = require('child_process').exec;

//c files
var c_code = require("./code/c-code");
var c_check = require("./code/c-check");
var cCounter = 0;

//cpp files
var cpp_code = require("./code/cpp-code");
var cpp_check = require("./code/cpp-check");
var cppCounter = 0;

//java files
var java_code = require("./code/java-code");
var java_check = require("./code/java-check");
var javaCounter = 0;

//matlab files
var matlab_code = require("./code/matlab-code");
var matlab_check = require("./code/matlab-check");
var mathsLabCounter = 0;

var fs = require('fs');

var deleteAllProcess = function(subjectID) {
    console.log(subjectID);
    var fileName = null;
    if(subjectID == 0) {
        fileName = "a.out";
    }else if(subjectID == 2) {
        fileName = "java";
    }else if(subjectID == 3) {
        fileName = "octave-gui";
    }

    exec("killall " + fileName,(error,stdout,stderr) => {
        if(error) {
            console.log('Error in killing '+ fileName + " with Message: " + error.message);
        }
        console.log("Process Killed " + fileName);
    });
};

var code = function(reqData,callback) {

    var api = reqData['api-key'];
    
    if(api != "reezpatel") {
        callback({
            "statusCode": "404",
            "errorMsg": "Invalid API Key"
        });
        return;
    }

    var lang = (reqData['language'] + "").toLowerCase();
    var mode = reqData['mode'];

    if(mode == "verify") {
        //Evaluate
        fs.appendFile('sizeLogs.txt',"Code: " + Buffer.byteLength(reqData['code'], 'utf8')+'B\n',(err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    } else {
        //Check
        fs.appendFile('sizeLogs.txt',"Code: " + Buffer.byteLength(reqData['code']+'\n', 'utf8')+'B\n',(err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
        fs.appendFile('sizeLogs.txt',"Input: "+Buffer.byteLength(reqData['input']+'\n', 'utf8')+'B\n',(err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    }

    if(lang == 'c') {
        cCounter++;

        console.log(cCounter);

        if(mode == "verify") {
            c_check.execute(reqData,function(jsonData){
                cCounter--;
                if(cCounter == 0) {
                    deleteAllProcess(0);
                }
                callback(jsonData);
            });
        }else {
            c_code.execute(reqData,function(jsonData){
                cCounter--;
                if(cCounter == 0) {
                    deleteAllProcess(0);
                }

                callback(jsonData);

            });
        }
    } else if(lang == "cpp"){
        cppCounter++;

        if(mode == "verify") {
            cpp_check.execute(reqData,function(jsonData){
                cppCounter--;
                if(cppCounter == 0) {
                    deleteAllProcess(0);
                }
                callback(jsonData);
            });
        }else {
            cpp_code.execute(reqData,function(jsonData){
                cppCounter--;
                if(cppCounter == 0) {
                    deleteAllProcess(0);
                }
                callback(jsonData);
            });
        }    
    }else if(lang == "java") {
        javaCounter++;


        if(mode == "verify") {
            java_check.execute(reqData,function(jsonData){
                javaCounter--;
                if(javaCounter == 0) {
                    deleteAllProcess(2);
                }
                callback(jsonData);
            });
        }else {
            java_code.execute(reqData,function(jsonData){
                javaCounter--;
                if(javaCounter == 0) {
                    deleteAllProcess(2);
                }
                callback(jsonData);
            });
        }       
    }else if(lang == "matlab") {
        mathsLabCounter++;

        if(mode == "verify") {
            matlab_check.execute(reqData,function(jsonData){
                mathsLabCounter--;
                if(mathsLabCounter == 0) {
                    deleteAllProcess(3);
                }
                callback(jsonData);
            });
        }else {
            matlab_code.execute(reqData,function(jsonData){
                mathsLabCounter--;
                if(mathsLabCounter == 0) {
                    deleteAllProcess(3);
                }
                callback(jsonData);
            });
        }       
    }else {
        callback({
            "statusCode": "404",
            "errorMsg": "Language is Currently Not Supported or Invalid Language"
        });
    }
    
};

module.exports.code = code;