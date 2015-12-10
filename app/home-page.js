var tabViewModule = require("ui/tab-view");
var view = require("ui/core/view");
var stackLayoutModule = require("ui/layouts/stack-layout");
var labelModule = require("ui/label");
var frameModule = require("ui/frame");

function pageLoaded(args) {
	var page = args.object;
	console.log("inside home-page pageLoaded");
	var tabView = view.getViewById(page, "homeTabView");
	console.log()

}

var navigationEntry = {
    moduleName: "swipe-page",
    animated: false
}

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
