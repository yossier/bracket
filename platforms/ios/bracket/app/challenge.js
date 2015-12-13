var frameModule = require("ui/frame");
var view = require("ui/core/view");

// var controller = frameModule.topmost().ios.controller;
// // get the view controller navigation item
// var navigationItem = controller.visibleViewController.navigationItem;
// // hide back button
// navigationItem.setHidesBackButtonAnimated(true, false);

var topmost = frameModule.topmost();

var navigationEntry = {
    moduleName: "swipe-page",
    animated: false
};

exports.recursion = function(){
    navigationEntry.context = {info: 'recursion'};
    frameModule.topmost().navigate(navigationEntry);
};

exports.dataStructures = function(){
	  // alert('Data Structures Clicked');
    navigationEntry.context = {info: "dataStructures"};
    frameModule.topmost().navigate(navigationEntry);
};

exports.loops = function(){
	  // alert('Loops Clicked');
    navigationEntry.context = {info: "loops"};
    frameModule.topmost().navigate(navigationEntry);
};

exports.algorithms = function(){
	  // alert('Algorithms Clicked');
    navigationEntry.context = {info: "algorithms"};
    frameModule.topmost().navigate(navigationEntry);
};

exports.sorts = function(){
	  // alert('Sorts Clicked');
    navigationEntry.context = {info: "sorts"};
    frameModule.topmost().navigate(navigationEntry);
};

