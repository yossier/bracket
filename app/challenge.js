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

/*exports.loaded = function(args) {
  var page = args.object;
  
  if (page.ios) {
    var controller = frameModule.topmost().ios.controller;
  	// get the view controller navigation item
	var navigationItem = controller.visibleViewController.navigationItem;

	// hide back button
	navigationItem.setHidesBackButtonAnimated(true, false);
	frameModule.topmost().ios.navBarVisibility = "never";

	//Use this if want to set IOS title bar
  	// frameModule.topmost().ios.navBarVisibility = "always";
  	// page.ios.title = "<Choose A Challenge >";
  }
  module.exports = {
  	page: page
  }
};
*/

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

