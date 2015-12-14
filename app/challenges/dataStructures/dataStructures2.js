var observableModule = require("data/observable");
var navigation = require("../../shared/navigation");
var dialogs = require("ui/dialogs");
var Challenge = require("../../view-models/challenge-view-model");

var challenge = new Challenge();

// inside brackets of text fields - data binding
var response = new observableModule.Observable({
    constr: "",
    type1: "",
    type2: "",
    rname: "",
    type3: "",
    nl: "",
    nr: "",
    priv: ""
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var page = "";

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = response;

    challenge.getChallengeInfo(13)
        .catch(function(error) {
            dialogs.alert({
                message:"Unfortunately we were unable to retrieve the requested challenge: " + error,
                okButtonText: "OK"
            });
            navigation.goBack();
        });
};


exports.print = function() {
    var constr = (response.constr).replace(/ /g,'');
    console.log(constr);
    var type1 = (response.type1).replace(/ /g,'');
    var type2 = (response.type2).replace(/ /g,'');
    var rname = (response.rname).replace(/ /g,'');
    var type3 = (response.type3).replace(/ /g,'');
    var nl = (response.nl).replace(/ /g,'');
    var nr = (response.nr).replace(/ /g,'');
    var priv = (response.priv).replace(/ /g,'');

    var names = ["constr", "type1", "type2", "rname", "type3", "nl", "nr", "priv"];
    var vals = [constr, type1, type2, rname, type3, nl, nr, priv];
    var correct = ["person", "string", "string", "name", "string", "name", "name_in", "private"];
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
    //  page.addCss("#condition {border-color: red; background-color: #ffcccc}");
    // }
    // else{
    //  page.addCss("#condition {border-color: #00cc00; background-color: #e5ffe5}");

    // }

}