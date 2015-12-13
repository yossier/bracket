//var tabViewModule = require("ui/tab-view");
//var view = require("ui/core/view");
//var stackLayoutModule = require("ui/layouts/stack-layout");
//var labelModule = require("ui/label");
var navigation = require("./shared/navigation");
var UserViewModel = require("./user-view-model");
var frameModule = require("ui/frame");

var user = new UserViewModel({loading: false});

function pageLoaded(args) {
	  var page = args.object;
    page.bindingContext = user;

    user.getUserInfo()
        .catch(function(error) {
            dialogs.alert({
                message: "Unable to fetch user info. Please sign out and try again : " + error,
                okButtonText: "OK"
            });
            navigation.signOut();
        });
}

function pageNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = user;
    
    user.getUserInfo()
        .catch(function(error) {
            dialogs.alert({
                message: "Unable to fetch user info. Please sign out and try again : " + error,
                okButtonText: "OK"
            });
            navigation.signOut();
        });
}

var navigationEntry = {
    moduleName: "swipe-page",
    animated: false
}

exports.onNavigatedTo = pageNavigatedTo;

exports.pageLoaded = pageLoaded;

exports.recursion = function(){
    navigation.goToSwipePage("recursion");
};

exports.dataStructures = function(){
    navigation.goToSwipePage("dataStructures");
};

exports.loops = function(){
    navigation.goToSwipePage("loops");
};

exports.algorithms = function(){
    navigation.goToSwipePage("algorithms");
};

exports.sorts = function(){
    navigationgoToSwipePage("sorts");
};

exports.complexity = function() {
    navigation.goToSwipePage("complexity");
};

exports.signOut = navigation.signOut;
