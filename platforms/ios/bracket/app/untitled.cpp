var observableModule = require("data/observable");

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    CPR: "",
    TC: "",
    conditioni: "",
    conditionj: "",
    ifval: "",
    increment: "",
    returnVal: ""
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;
};


exports.print = function() {
    var CPR = response.CPR;
    var TC = response.TC;
    var conditioni = response.conditionj;
    var conditionj = response.conditionj;
    var ifval = response.ifval;
    var increment = response.increment;


    var names = ["CPR", "TC", "conditioni", "conditionj", "ifval", "increment", "returnVal"];
    var vals = [CPR, TC, conditioni, conditionj, ifval, increment, returnVal];
    var correct = [0, 0, 15, 8, "totalcount", "array[i][j]", "totalcount"];
    var numCorrect = 0;

    for (var i = 0; i < names.length; i++){
    	if (vals[i].toLowerCase() != correct[i]){
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