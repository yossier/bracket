var observableModule = require("data/observable");

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
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
    var TC = (response.TC).replace(/ /g,'');
    var conditioni = (response.conditioni).replace(/ /g,'');
    var conditionj = (response.conditionj).replace(/ /g,'');
    var ifval = (response.ifval).replace(/ /g,'');
    var increment = (response.increment).replace(/ /g,'');
    var returnVal = (response.returnVal).replace(/ /g,'');

    var names = ["TC", "conditioni", "conditionj", "ifval", "increment", "returnVal"];
    var vals = [TC, conditioni, conditionj, ifval, increment, returnVal];
    var correct = [0, 15, 8, "array[i][j]", "totalcount", "totalcount"];
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
        alert("You successfully completed the challenge!");
    }


    // Check condition
    // if (condition.toLowerCase() != "size"){
    // 	page.addCss("#condition {border-color: red; background-color: #ffcccc}");
    // }
    // else{
    // 	page.addCss("#condition {border-color: #00cc00; background-color: #e5ffe5}");

    // }

}