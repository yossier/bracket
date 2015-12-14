var observableModule = require("data/observable");
var navigation = require("../../shared/navigation");
var dialogs = require("ui/dialogs");
var Challenge = require("../../view-models/challenge-view-model");

var challenge = new Challenge();

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    conditioni: "",
    conditionj1: "",
    conditionj2: "",
    rowVal: "",
    colVal: "",
    equality: "",
    returnVal1: "",
    returnVal2: ""
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;

    challenge.getChallengeInfo(7)
        .catch(function(error) {
            dialogs.alert({
                message:"Unfortunately we were unable to retrieve the requested challenge: " + error,
                okButtonText: "OK"
            });
            navigation.goBack();
        });
};


exports.print = function() {
    var conditioni = (response.conditioni).replace(/ /g,'');
    var conditionj1 = (response.conditionj1).replace(/ /g,'');
    var conditionj2 = (response.conditionj2).replace(/ /g,'');
    var rowVal = (response.rowVal).replace(/ /g,'');
    var colVal = (response.colVal).replace(/ /g,'');
    console.log(rowVal);
    console.log(colVal);
    var equality = (response.equality).replace(/ /g,'');
    var returnVal1 = (response.returnVal1).replace(/ /g,'');
    var returnVal2 = (response.returnVal2).replace(/ /g,'');

    var names = ["conditioni", "conditionj1", "conditionj2", "rowVal", "colVal", "equality", "returnVal1", "returnVal2"];
    var vals = [conditioni, conditionj1, conditionj2, rowVal, colVal, equality, returnVal1, returnVal2];
    var correct = [10, 0, 10, "i", "j", "findval", "i", -1];
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

    challenge.set("score", numCorrect);
    challenge.updateScore()
        .then(function(data) {
            alert({
                message: data.msg + "\nHighest Score " + data.points,
                okButtonText: "OK"
            });
        })
        .catch(function(error) {
            alert(error);
        });

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