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

<<<<<<< HEAD
// exports.loaded = function(args) {
//   var page = args.object;
=======
/*exports.loaded = function(args) {
  var page = args.object;
>>>>>>> 84bd3a1b115b8d13b71e4251736f9fa012b4acd1
  
//   if (page.ios) {
//     var controller = frameModule.topmost().ios.controller;
//   	// get the view controller navigation item
// 	var navigationItem = controller.visibleViewController.navigationItem;

// 	// hide back button
// 	// navigationItem.setHidesBackButtonAnimated(true, false);
// 	// frameModule.topmost().ios.navBarVisibility = "never";

<<<<<<< HEAD
// 	//Use this if want to set IOS title bar
//   	// frameModule.topmost().ios.navBarVisibility = "always";
//   	// page.ios.title = "<Choose A Challenge >";
//   }
// };

exports.recursion = function(){
	  // alert('Recursion Clicked');
=======
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
>>>>>>> 84bd3a1b115b8d13b71e4251736f9fa012b4acd1
    navigationEntry.context = {info: 'recursion'};
    frameModule.topmost().navigate(navigationEntry);
};

exports.dataStructures = function(){
<<<<<<< HEAD
	  // alert('Data Structures Clicked');
=======
>>>>>>> 84bd3a1b115b8d13b71e4251736f9fa012b4acd1
    navigationEntry.context = {info: "dataStructures"};
    frameModule.topmost().navigate(navigationEntry);
};

exports.loops = function(){
<<<<<<< HEAD
	  // alert('Loops Clicked');
=======
>>>>>>> 84bd3a1b115b8d13b71e4251736f9fa012b4acd1
    navigationEntry.context = {info: "loops"};
    frameModule.topmost().navigate(navigationEntry);
};

exports.algorithms = function(){
<<<<<<< HEAD
	  // alert('Algorithms Clicked');
=======
>>>>>>> 84bd3a1b115b8d13b71e4251736f9fa012b4acd1
    navigationEntry.context = {info: "algorithms"};
    frameModule.topmost().navigate(navigationEntry);
};

exports.sorts = function(){
<<<<<<< HEAD
	  // alert('Sorts Clicked');
=======
>>>>>>> 84bd3a1b115b8d13b71e4251736f9fa012b4acd1
    navigationEntry.context = {info: "sorts"};
    frameModule.topmost().navigate(navigationEntry);
};

