var storage = require("node-persist");
var fs = require("fs");
var remove = require("remove");

var getCount = function() {
    storage.initSync();
    var totalCount = storage.getItemSync('total-count');
    
    if(!totalCount) {
        storage.setItemSync('total-count',0);
        totalCount = 0;
    }

    return  {
        "statusCode": "200",
        "total": totalCount
    };
};

var increaseTotalCount = function() {
    storage.initSync();
    var totalCount = parseInt(storage.getItemSync('total-count'))%100;
    totalCount++;
    
    storage.setItemSync('total-count',totalCount);
}

var freeFolder = function(pwd) {
    remove(pwd,(err) => {
        if(err) console.log("Folder Not Freed: " + pwd);
    
        console.log("Folder Freed: " + pwd);
    });

}

module.exports.getCount = getCount;
module.exports.increaseTotalCount = increaseTotalCount;
module.exports.freeFolder = freeFolder;