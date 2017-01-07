var c_code = require("./code/c-code");
var c_check = require("./code/c-check");

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
    }else {
        callback({
            "statusCode": "404",
            "errorMsg": "Language is Currently Not Supported or Invalid Language"
        });
    }
    
};

module.exports.code = code;