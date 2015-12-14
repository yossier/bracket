var observableModule = require("data/observable");

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    conditioni1: "",
    setValue: "",
    setJ: "",
    greaterThan: "",
    arrayIndex1: "",
    arrayIndex2: "",
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;
};


exports.print = function() {
    var conditioni1 = (response.conditioni1).replace(/ /g,'');
    var setValue = (response.setValue).replace(/ /g,'');
    var setJ = (response.setJ).replace(/ /g,'');
    var greaterThan = (response.greaterThan).replace(/ /g,'');
    var arrayIndex1 = (response.arrayIndex1).replace(/ /g,'');
    var arrayIndex2 = (response.arrayIndex2).replace(/ /g,'');

    var names = ["conditioni1", "setValue", "setJ", "greaterThan", "arrayIndex1", "arrayIndex2"];
    var vals = [conditioni1, setValue, setJ, greaterThan, arrayIndex1, arrayIndex2];
    var correct = ["size", "array[i]", "i-1", ">", "j+1", "j+1"];
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