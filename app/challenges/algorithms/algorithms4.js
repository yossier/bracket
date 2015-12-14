var observableModule = require("data/observable");

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    iSet: "",
    condition10: "",
    arrI: "",
    eltCheck: "",
    returnStatement: "",
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;
};


exports.print = function() {
    var iSet = (response.iSet).replace(/ /g,'');
    var condition10 = (response.condition10).replace(/ /g,'');
    var arrI = (response.arrI).replace(/ /g,'');
    var eltCheck = (response.eltCheck).replace(/ /g,'');
    var returnStatement = (response.returnStatement).replace(/ /g,'');


    var names = ["iSet", "condition10", "arrI", "eltCheck", "returnStatement"];
    var vals = [iSet, condition10, arrI, eltCheck, returnStatement];
    var correct = [0, 10, "array[i]", "elt", "return"];
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