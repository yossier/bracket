var observableModule = require("data/observable");

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    IS: "",
    Tvoid: "",
    topVal: "",
    arrIndex: "",
    arrIndexEq: "",
    rarr: "",
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
    var IS = response.IS;
    var Tvoid = (response.Tvoid);
    var topVal = (response.topVal);
    var arrIndex = (response.arrIndex);
    var arrIndexEq = response.arrIndexEq;
    var rarr = response.rarr;
    var priv = response.priv;
    var returnVal2 = response.returnVal2;
    var names = ["IS", "Tvoid", "topVal", "arrIndex", "arrIndexEq", "rarr", "priv"];
    var vals = [IS, Tvoid, topVal, arrIndex, arrIndexEq, rarr, priv];
    var correct = ["intstack", "void", "maxsize", "top++", "pushval", "--top", "int"];
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
    // 	page.addCss("#condition {border-color: red; background-color: #ffcccc}");
    // }
    // else{
    // 	page.addCss("#condition {border-color: #00cc00; background-color: #e5ffe5}");

    // }

}