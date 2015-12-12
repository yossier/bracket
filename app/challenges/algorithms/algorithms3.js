var observableModule = require("data/observable");

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    setJcounter: "",
    Jcondition: "",
    arrayMin: "",
    minToJ: "",
    minCheck: "",
    setTemp: "",
    setArrayi: "",
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;
};


exports.print = function() {
    var setJcounter = (response.setJcounter).replace(/ /g,'');
    var Jcondition = (response.Jcondition).replace(/ /g,'');
    var arrayMin = (response.arrayMin).replace(/ /g,'');
    var minToJ = (response.minToJ).replace(/ /g,'');
    var minCheck = (response.minCheck).replace(/ /g,'');
    var setTemp = (response.setTemp).replace(/ /g,'');
    var setArrayi = (response.setArrayi).replace(/ /g,'');

    var names = ["setJcounter", "Jcondition", "arrayMin", "minToJ", "minCheck", "setTemp", "setArrayi"];
    var vals = [setJcounter, Jcondition, arrayMin, minToJ, minCheck, setTemp, setArrayi];
    var correct = ["i+1", "size", "array[min]", "j", "min", "temp", "array[i]"];
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