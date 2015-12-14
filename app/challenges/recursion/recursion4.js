var observableModule = require("data/observable");

var navigation = require("../../shared/navigation");
var dialogs = require("ui/dialogs");
var Challenge = require("../../view-models/challenge-view-model");

var challenge = new Challenge();

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    baseCaseRight: "",
    strIndex1: "",
    strIndex2: "",
    recursiveCall: "",
    funcParam2: "",
    returnFalse: "",
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;

    challenge.getChallengeInfo(11)
        .catch(function(error) {
            dialogs.alert({
                message:"Unfortunately we were unable to retrieve the requested challenge: " + error,
                okButtonText: "OK"
            });
            navigation.goBack();
        });
};


exports.print = function() {
    var baseCaseRight = (response.baseCaseRight).replace(/ /g,'');
    var strIndex1 = (response.strIndex1).replace(/ /g,'');
    var strIndex2 = (response.strIndex2).replace(/ /g,'');
    var recursiveCall = (response.recursiveCall).replace(/ /g,'');
    var funcParam2 = (response.funcParam2).replace(/ /g,'');
    var returnFalse = (response.returnFalse).replace(/ /g,'');

    var names = ["baseCaseRight", "strIndex1", "strIndex2", "recursiveCall", "funcParam2", "returnFalse"];
    var vals = [baseCaseRight, strIndex1, strIndex2, recursiveCall, funcParam2, returnFalse];
    var correct = [2, 0, 1, "ispalindrome", 2, "false"];
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