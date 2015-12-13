var observableModule = require("data/observable");

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    fillPublic: "",
    IS: "",
    Tvoid: "",
    topVal: "",
    arrIndex: "",
    arrIndexEq: "",
    rarr: "",
    priv: ""
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;
};


exports.print = function() {
    var fillPublic = (response.fillPublic).replace(/ /g,'');
    var IS = (response.IS).replace(/ /g,'');
    var Tvoid = (response.Tvoid).replace(/ /g,'');
    var topVal = (response.topVal).replace(/ /g,'');
    var arrIndex = (response.arrIndex).replace(/ /g,'');
    var arrIndexEq = (response.arrIndexEq).replace(/ /g,'');
    var rarr = (response.rarr).replace(/ /g,'');
    var priv = (response.priv).replace(/ /g,'');
    
    var names = ["fillPublic", "IS", "Tvoid", "topVal", "arrIndex", "arrIndexEq", "rarr", "priv"];
    var vals = [fillPublic, IS, Tvoid, topVal, arrIndex, arrIndexEq, rarr, priv];
    var correct = ["public:", "intstack", "void", "maxsize", "top++", "pushval", "--top", "int"];
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