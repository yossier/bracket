var observableModule = require("data/observable");

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    intArray: "",
    five: "",
    condition5: "",
    setJ5: "",
    indexI: "",
    indexJ: "",
    neg1: "",
    indexArr1: "",
    indexArr2: ""
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;
};


exports.print = function() {
    var intArray = (response.intArray).replace(/ /g,'');
    var five = (response.five).replace(/ /g,'');
    var condition5 = (response.condition5).replace(/ /g,'');
    var setJ5 = (response.setJ5).replace(/ /g,'');
    var indexI = (response.indexI).replace(/ /g,'');
    var indexJ = (response.indexJ).replace(/ /g,'');
    var neg1 = (response.neg1).replace(/ /g,'');
    var indexArr1 = (response.indexArr1).replace(/ /g,'');
    var indexArr2 = (response.indexArr2).replace(/ /g,'');

    var names = ["intArray", "five", "condition5", "setJ5", "indexI", "indexJ", "neg1", "indexArr1", "indexArr2"];
    var vals = [intArray, five, condition5, setJ5, indexI, indexJ, neg1, indexArr1, indexArr2];
    var correct = ["int", 5, 5, 0, "i", "j", -1, 3, 3];
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