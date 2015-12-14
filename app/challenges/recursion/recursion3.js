var observableModule = require("data/observable");
var navigation = require("../../shared/navigation");
var dialogs = require("ui/dialogs");
var Challenge = require("../../view-models/challenge-view-model");

var challenge = new Challenge();

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

    challenge.getChallengeInfo(10)
        .catch(function(error) {
            dialogs.alert({
                message:"Unfortunately we were unable to retrieve the requested challenge: " + error,
                okButtonText: "OK"
            });
            navigation.goBack();
        });
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