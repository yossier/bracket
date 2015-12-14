var observableModule = require("data/observable");
var navigation = require("../../shared/navigation");
var dialogs = require("ui/dialogs");
var Challenge = require("../../view-models/challenge-view-model");

var challenge = new Challenge();

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    i: "",
    condition: "",
    arr: "",
    arrLessThan: "",
    setSE: "",
    returnVal: ""
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;

    challenge.getChallengeInfo(4)
        .catch(function(error) {
            dialogs.alert({
                message:"Unfortunately we were unable to retrieve the requested challenge: " + error,
                okButtonText: "OK"
            });
            navigation.goBack();
        });
};


exports.print = function() {
    var i = (response.i).replace(/ /g,'');
    var condition = (response.condition).replace(/ /g,'');
    var arr = (response.arr).replace(/ /g,'');
    var arrLessThan = (response.arrLessThan).replace(/ /g,'');
    var setSE = (response.setSE).replace(/ /g,'');
    var returnVal = (response.returnVal).replace(/ /g,'');


    var names = ["i", "condition", "arr", "arrLessThan", "setSE", "returnVal"];
    var vals = [i, condition, arr, arrLessThan, setSE, returnVal];
    var correct = [1, "size", "i", "smallestelt", "i", "smallestelt"];
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