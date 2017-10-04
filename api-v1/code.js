const exec = require('child_process').exec;

//c files
var c_code = require("./code/c-code");
var c_check = require("./code/c-check");
var cCounter = 0;

//cpp files
var cpp_code = require("./code/cpp-code");
var cpp_check = require("./code/cpp-check");
var cppCounter = 0;

//python files
var python_code = require("./code/python-code");
var python_check = require("./code/python-check");
var pythonCounter = 0;

//perl files
var perl_code = require("./code/perl-code");
var perl_check = require("./code/perl-check");
var perlCounter = 0;

//r files
var r_code = require("./code/r-code");
var r_check = require("./code/r-check");
var rCounter = 0;

//ruby files
var ruby_code = require("./code/ruby-code");
var ruby_check = require("./code/ruby-check");
var rubyCounter = 0;

//csharp files
var csharp_code = require("./code/csharp-code");
var csharp_check = require("./code/csharp-check");
var csharpCounter = 0;

//haskell files
var haskell_code = require("./code/haskell-code");
var haskell_check = require("./code/haskell-check");
var haskellCounter = 0;

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
    }else if(subjectID == 9) {
        fileName = "perl";
     }else if(subjectID == 8) {
        fileName = "python";
    }else if(subjectID == 3) {
        fileName = "octave-gui";

        exec("killall " + "octave-cli",(error,stdout,stderr) => {
            if(error) {
                console.log('Error in killing '+ fileName + " with Message: " + error.message);
            }
            console.log("Process Killed ocatave-cli");
        });
    }else if(subjectID == 10) {
        fileName = "R";
    }else if(subjectID == 13) {
        fileName = "ruby";
    }else if(subjectID == 12) {
        fileName = "hmain";
    }else if(subjectID == 11) {
        fileName = "mono";
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
    }

     else if(lang == "csharp"){
        csharpCounter++;

        if(mode == "verify") {
            csharp_check.execute(reqData,function(jsonData){
                csharpCounter--;
                if(csharpCounter == 0) {
                    deleteAllProcess(0);
                }
                callback(jsonData);
            });
        }else {
            csharp_code.execute(reqData,function(jsonData){
                csharpCounter--;
                if(csharpCounter == 0) {
                    deleteAllProcess(0);
                }
                callback(jsonData);
            });
        }    
    }
	
     else if(lang == "haskell"){
        haskellCounter++;

        if(mode == "verify") {
            haskell_check.execute(reqData,function(jsonData){
                haskellCounter--;
                if(haskellCounter == 0) {
                    deleteAllProcess(0);
                }
                callback(jsonData);
            });
        }else {
            haskell_code.execute(reqData,function(jsonData){
                haskellCounter--;
                if(haskellCounter == 0) {
                    deleteAllProcess(0);
                }
                callback(jsonData);
            });
        }    
    }


	else if(lang == "python"){
        pythonCounter++;

        if(mode == "verify") {
            python_check.execute(reqData,function(jsonData){
                pythonCounter--;
                if(pythonCounter == 0) {
                    deleteAllProcess(8);
                }
                callback(jsonData);
            });
        }else {
            python_code.execute(reqData,function(jsonData){
                pythonCounter--;
                if(pythonCounter == 0) {
                    deleteAllProcess(8);
                }
                callback(jsonData);
            });
        }    
    }

    else if(lang == "perl"){
        perlCounter++;

        if(mode == "verify") {
            perl_check.execute(reqData,function(jsonData){
                perlCounter--;
                if(perlCounter == 0) {
                    deleteAllProcess(9);
                }
                callback(jsonData);
            });
        }else {
            perl_code.execute(reqData,function(jsonData){
                perlCounter--;
                if(perlCounter == 0) {
                    deleteAllProcess(9);
                }
                callback(jsonData);
            });
        }    
    }
    
    else if(lang == "ruby"){
        rubyCounter++;

        if(mode == "verify") {
            ruby_check.execute(reqData,function(jsonData){
                rubyCounter--;
                if(rubyCounter == 0) {
                    deleteAllProcess(10);
                }
                callback(jsonData);
            });
        }else {
            ruby_code.execute(reqData,function(jsonData){
                rubyCounter--;
                if(rubyCounter == 0) {
                    deleteAllProcess(10);
                }
                callback(jsonData);
            });
        }    
    }

    else if(lang == "r"){
        rCounter++;

        if(mode == "verify") {
            r_check.execute(reqData,function(jsonData){
                rCounter--;
                if(rCounter == 0) {
                    deleteAllProcess(10);
                }
                callback(jsonData);
            });
        }else {
            r_code.execute(reqData,function(jsonData){
                rCounter--;
                if(rCounter == 0) {
                    deleteAllProcess(10);
                }
                callback(jsonData);
            });
        }    
    }

else if(lang == "java") {
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
