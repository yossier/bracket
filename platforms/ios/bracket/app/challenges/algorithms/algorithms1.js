var observableModule = require("data/observable");

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    lessThanEqual: "",
    lowForMid: "",
    highForMid: "",
    arrayMid: "",
    highSet: "",
    lowSet: "",
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;
    console.log("this changed");
};


exports.print = function() {
    var lessThanEqual = (response.lessThanEqual).replace(/ /g,'');
    var lowForMid = (response.lowForMid).replace(/ /g,'');
    var highForMid = (response.highForMid).replace(/ /g,'');
    var arrayMid = (response.arrayMid).replace(/ /g,'');
    var highSet = (response.highSet).replace(/ /g,'');
    var lowSet = (response.lowSet).replace(/ /g,'');

    var names = ["lessThanEqual", "lowForMid", "highForMid", "arrayMid", "highSet", "lowSet"];
    var vals = [lessThanEqual, lowForMid, highForMid, arrayMid, highSet, lowSet];
    var correct = ["<=", "low", "high", "array[mid]", "mid-1", "low"];
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