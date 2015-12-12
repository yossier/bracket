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

        user.getChallenges()
        .catch(function(error) {
            dialogs.alert({
                message: "Unable to fetch user challenge info. Please sign out and try again : " + error,
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

exports.pageNavigatedTo = pageNavigatedTo;

exports.pageLoaded = pageLoaded;

exports.recursion = function(){
    navigationEntry.context = {info: 'recursion'};
    frameModule.topmost().navigate(navigationEntry);
};

exports.dataStructures = function(){
    navigationEntry.context = {info: "dataStructures"};
    frameModule.topmost().navigate(navigationEntry);
};

exports.loops = function(){
    navigationEntry.context = {info: "loops"};
    frameModule.topmost().navigate(navigationEntry);
};

exports.algorithms = function(){
    navigationEntry.context = {info: "algorithms"};
    frameModule.topmost().navigate(navigationEntry);
};

exports.sorts = function(){
    navigationEntry.context = {info: "sorts"};
    frameModule.topmost().navigate(navigationEntry);
};

exports.bigO = function() {
    navigationEntry.context = {info: "bigO"};
    frameModule.topmost().navigate(navigationEntry);
};

exports.signOut = navigation.signOut;
