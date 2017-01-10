//c files
var c_code = require("./code/c-code");
var c_check = require("./code/c-check");

//cpp files
var cpp_code = require("./code/cpp-code");
var cpp_check = require("./code/cpp-check");

//java files
var java_code = require("./code/java-code");
var java_check = require("./code/java-check");

//matlab files
var matlab_code = require("./code/matlab-code");
var matlab_check = require("./code/matlab-check");


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

    if(lang == 'c') {
        if(mode == "verify") {
            c_check.execute(reqData,function(jsonData){
                callback(jsonData);
            });
        }else {
            c_code.execute(reqData,function(jsonData){
                callback(jsonData);
            });
        }
    } else if(lang == "cpp"){
        if(mode == "verify") {
            cpp_check.execute(reqData,function(jsonData){
                callback(jsonData);
            });
        }else {
            cpp_code.execute(reqData,function(jsonData){
                callback(jsonData);
            });
        }    
    }else if(lang == "java") {
        if(mode == "verify") {
            java_check.execute(reqData,function(jsonData){
                callback(jsonData);
            });
        }else {
            java_code.execute(reqData,function(jsonData){
                callback(jsonData);
            });
        }       
    }else if(lang == "matlab") {
        if(mode == "verify") {
            matlab_check.execute(reqData,function(jsonData){
                callback(jsonData);
            });
        }else {
            matlab_code.execute(reqData,function(jsonData){
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