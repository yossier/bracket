var observableModule = require("data/observable");

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    whileCondition: "",
    ifCondition: "",
    baseFirstParam: "",
    elseFirstParam: "",
    elseSecondParam: "",
    returnFunc: "",
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;
};


exports.print = function() {
    var whileCondition = (response.whileCondition).replace(/ /g,'');
    var ifCondition = (response.ifCondition).replace(/ /g,'');
    var baseFirstParam = (response.baseFirstParam).replace(/ /g,'');
    var elseFirstParam = (response.elseFirstParam).replace(/ /g,'');
    var elseSecondParam = (response.elseSecondParam).replace(/ /g,'');
    var returnFunc = (response.returnFunc).replace(/ /g,'');

    var names = ["whileCondition", "ifCondition", "baseFirstParam", "elseFirstParam", "elseSecondParam", "returnFunc"];
    var vals = [whileCondition, ifCondition, baseFirstParam, elseFirstParam, elseSecondParam, returnFunc];
    var correct = ["x!=y", ">", "x-y", "x", "y-x", "x"];
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