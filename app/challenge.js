var frameModule = require("ui/frame");

// var controller = frameModule.topmost().ios.controller;
// // get the view controller navigation item
// var navigationItem = controller.visibleViewController.navigationItem;
// // hide back button
// navigationItem.setHidesBackButtonAnimated(true, false);

exports.loaded = function(args) {
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
};

exports.recursion = function(){
	alert('Recursion Clicked');
}

exports.dataStructures = function(){
	alert('Data Structures Clicked');
}

exports.loops = function(){
	alert('Loops Clicked');
}

exports.algorithms = function(){
	alert('Algorithms Clicked');
}

exports.sorts = function(){
	alert('Sorts Clicked');
}