var observableModule = require("data/observable");

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    i: "",
    condition: "",
    arr: "",
    arrLessThan: "",
    setSE: "",
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
    var i = response.i;
    var condition = response.condition;
    var arr = response.arr;
    var arrLessThan = response.arrLessThan;
    var setSE = response.setSE;
    var returnVal = response.returnVal;


    var names = ["i", "condition", "arr", "arrLessThan", "setSE", "returnVal"];
    var vals = [i, condition, arr, arrLessThan, setSE, returnVal];
    var correct = [1, "size", "i", "smallestelt", "i", "smallestelt"];
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