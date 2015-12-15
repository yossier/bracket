var tabViewModule = require("ui/tab-view");
var view = require("ui/core/view");
//var stackLayoutModule = require("ui/layouts/stack-layout");
//var labelModule = require("ui/label");
var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");
var navigation = require("./shared/navigation");
var UserViewModel = require("./view-models/user-view-model");
var UserListViewModel = require("./view-models/user-list-view-model");
var frameModule = require("ui/frame");


var user = new UserViewModel({loading: false});
var topTen = new UserListViewModel([]);
var categoryList = new observableArrayModule.ObservableArray([
    { name: "Recursion", imgSrc:"res://recursion", handler: () => { navigation.goToSwipePage("recursion"); }},
    { name: "Data Structures", imgSrc:"res://data_structures", handler: () => { navigation.goToSwipePage("dataStructures"); }},
    { name: "Algorithms", imgSrc:"res://algorithms", handler: () => { navigation.goToSwipePage("algorithms"); }} ,
    { name: "Loops", imgSrc:"res://loops", handler: () => { navigation.goToSwipePage("loops"); }},
    { name: "Complexity", imgSrc:"res://complexity", handler: () => { navigation.goToSwipePage("complexity"); } }
]);

var pageData = new observableModule.Observable({
    title: "Choose a Challenge",
    user: user,
    categoryList: categoryList,
    selectedIndex: 0,
    topTenIsLoading: false,
    topTen: topTen
});

var actionBarTitleList = ["Choose a Challenge", "Leaderboard", "Profile"];

function pageLoaded(args) {
	var page = args.object;
    page.bindingContext = pageData;
    //topTen.empty();
    
    var tabView  = view.getViewById(page, "homeTabView");
    var activityIndicatorTopTen = view.getViewById(page, "actIndTopTen");
    var repeater = view.getViewById(page, "topTenList");

    //repeater.refresh();
    
    tabView.on(tabViewModule.TabView.selectedIndexChangedEvent, function(eventData){
        newIndex = eventData.newIndex;
        topTen.empty();
        pageData.set("title", actionBarTitleList[newIndex]);
        if (newIndex === 1) {
            
            pageData.set("topTenIsLoading", true);
            activityIndicatorTopTen.visibility = "visible";
            //topTen.empty();
            topTen.getTopTenUsers()
                .then(function() {
                    pageData.set("topTenIsLoading", false);
                    activityIndicatorTopTen.visibility = "collapse";
                })
                .catch(function(error) {
                    dialogs.alert({
                        message: "Unable to fetch top ten users. Please try again in a little while" + error,
                        okButtonText: "OK"
                    });
                });
            //            repeater.refresh();
        }
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

exports.compChallenges = ()=>{ navigation.goToCompletedChallengesPage(); };

exports.onNavigatedTo = function() {
    topTen.empty();
};
