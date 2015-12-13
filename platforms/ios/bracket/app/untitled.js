var observableModule = require("data/observable");

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    constructor: "",
    type1: "",
    type2: "",
    rname: "",
    type3: "",
    nl: "",
    nr: "",
    priv: ""
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;
};


exports.print = function() {
    var constructor = response.constructor;
    var type1 = (response.type1);
    var type2 = (response.type2);
    var rname = (response.rname);
    var type3 = response.type3;
    var nl = response.nl;
    var nr = response.nr;
    var returnVal2 = response.returnVal2;
    var names = ["constructor", "type1", "type2", "rname", "type3", "nl", "nr", "priv"];
    var vals = [constructor, type1, type2, rname, type3, nl, nr, priv];
    var correct = ["person", "string", "string", "name", "string", "name", "name_in", "private"];
    var numCorrect = 0;
    
    for (var i = 0; i < names.length; i++){
        if (vals[i].toLowerCase() != correct[i] || vals[i].length == 0){
            page.addCss("#" + names[i] + " {border-color: red; background-color: #ffcccc}");
        }
        else{
            page.addCss("#" + names[i] + " {border-color: #00cc00; background-color: #e5ffe5}");            
            numCorrect++;
        }
    }

    console.log(numCorrect);
    if (numCorrect === (names.length)){
        alert("ALL ARE CORRECT!");
    }


    // Check condition
    // if (condition.toLowerCase() != "size"){
    //  page.addCss("#condition {border-color: red; background-color: #ffcccc}");
    // }
    // else{
    //  page.addCss("#condition {border-color: #00cc00; background-color: #e5ffe5}");

    // }

}