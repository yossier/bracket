var observableModule = require("data/observable");
var navigation = require("../../shared/navigation");
var dialogs = require("ui/dialogs");
var Challenge = require("../../view-models/challenge-view-model");

var challenge = new Challenge();

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    baseCase1: "",
    returnBase2: "",
    fibCall: "",
    fibParam2: "",
    challenge: challenge
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;
    
    challenge.getChallengeInfo(8)
        .catch(function(error) {
            dialogs.alert({
                message:"Unfortunately we were unable to retrieve the requested challenge: " + error,
                okButtonText: "OK"
            });
            navigation.goBack();
        });
};


exports.print = function() {
    var baseCase1 = (response.baseCase1).replace(/ /g,'');
    var returnBase2 = (response.returnBase2).replace(/ /g,'');
    var fibCall = (response.fibCall).replace(/ /g,'');
    var fibParam2 = (response.fibParam2).replace(/ /g,'');
    
    var names = ["baseCase1", "returnBase2", "fibCall", "fibParam2"];
    var vals = [baseCase1, returnBase2, fibCall, fibParam2];
    var correct = ["n==0", 1, "fib", "n-2"];
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
        //    	alert("ALL ARE CORRECT!");
    }


    // Check condition
    // if (condition.toLowerCase() != "size"){
    // 	page.addCss("#condition {border-color: red; background-color: #ffcccc}");
    // }
    // else{
    // 	page.addCss("#condition {border-color: #00cc00; background-color: #e5ffe5}");

    // }

}
