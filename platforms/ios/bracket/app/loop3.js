var observableModule = require("data/observable");

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    lastIndexNum: "",
    condition: "",
    arri: "",
    arrip1: "",
    equalTo: "",
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
    var lastIndexNum = response.lastIndexNum;
    var condition = (response.condition).replace(/ /g,'');
    var arri = (response.arri).replace(/ /g,'');
    var arrip1 = (response.arrip1).replace(/ /g,'');
    var equalTo = response.equalTo;
    var returnVal = response.returnVal;

    var names = ["lastIndexNum", "condition", "arri", "arrip1", "equalTo", "returnVal"];
    var vals = [lastIndexNum, condition, arri, arrip1, equalTo, returnVal];
    var correct = [-1, "size-1", "array[i]", "array[i+1]", "lastindex", "lastindex"];
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