var observableModule = require("data/observable");

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    conditioni: "",
    conditionj1: "",
    conditionj2: "",
    rowVal: "",
    colVal: "",
    equality: "",
    returnVal1: "",
    returnVal2: ""
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;
};


exports.print = function() {
    var conditioni = response.conditioni;
    var conditionj1 = (response.conditionj1);
    var conditionj2 = (response.conditionj2);
    var rowVal = (response.rowVal);
    var colVal = response.colVal;
    console.log(rowVal);
    console.log(colVal);
    var equality = response.equality;
    var returnVal1 = response.returnVal1;
    var returnVal2 = response.returnVal2;

    var names = ["conditioni", "conditionj1", "conditionj2", "rowVal", "colVal", "equality", "returnVal1", "returnVal2"];
    var vals = [conditioni, conditionj1, conditionj2, rowVal, colVal, equality, returnVal1, returnVal2];
    var correct = [10, 0, 10, "i", "j", "findval", "i", -1];
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