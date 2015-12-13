var observableModule = require("data/observable");

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    string: "",
    doubleP: "",
    grocery: "",
    weight: "",
    price: "",
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;
};


exports.print = function() {
    var string = (response.string).replace(/ /g,'');
    var doubleP = (response.doubleP).replace(/ /g,'');
    var grocery = (response.grocery);
    var weight = (response.weight).replace(/ /g,'');
    var price = (response.price).replace(/ /g,'');


    var names = ["string", "doubleP", "grocery", "weight", "price"];
    var vals = [string, doubleP, grocery, weight, price];
    var correct = ["string", "double", "groceryitem", "weight", 4.60];
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