var tabViewModule = require("ui/tab-view");
var view = require("ui/core/view");
//var stackLayoutModule = require("ui/layouts/stack-layout");
//var labelModule = require("ui/label");
var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");
var navigation = require("./shared/navigation");
var UserViewModel = require("./user-view-model");
var frameModule = require("ui/frame");

var user = new UserViewModel({loading: false});
var categoryList = new observableArrayModule.ObservableArray([
    { name: "Recursion", handler: () => { navigation.goToSwipePage("recursion"); }},
    { name: "Data Structures", handler: () => { navigation.goToSwipePage("dataStructures"); }},
    { name: "Algorithms", handler: () => { navigation.goToSwipePage("algorithms"); }} ,
    { name: "Loops", handler: () => { navigation.goToSwipePage("loops"); }},
    { name: "Complexity", handler: () => { navigation.goToSwipePage("complexity"); } }
]);

var pageData = new observableModule.Observable({
    title: "< Choose a Challenge >",
    user: user,
    categoryList: categoryList
});

var actionBarTitleList = ["< Choose a Challenge >", "< Leaderboard >", "< Profile >"];

function pageLoaded(args) {
	var page = args.object;
    page.bindingContext = pageData;

    var tabView  = view.getViewById(page, "homeTabView");
    
    tabView.on(tabViewModule.TabView.selectedIndexChangedEvent, function(eventData){
        newIndex = eventData.newIndex;
        pageData.set("title", actionBarTitleList[newIndex]);
        if (newIndex === 2)
            getUserInfo();
    });
}

function getUserInfo() {
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

exports.recursion_cb = function(){
    navigation.goToSwipePage("recursion");
};

exports.dataStructures_cb = function(){
    navigation.goToSwipePage("dataStructures");
};

exports.loops_cb = function(){
    navigation.goToSwipePage("loops");
};

exports.algorithms_cb = function(){
    navigation.goToSwipePage("algorithms");
};

exports.sorts_cb = function(){
    navigationgoToSwipePage("sorts");
};

exports.complexity_cb = function() {
    navigation.goToSwipePage("complexity");
};

exports.signOut = navigation.signOut;
