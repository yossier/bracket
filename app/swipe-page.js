var sModule = require("./swipe-view-model");
var dialogs = require("ui/dialogs");
var gestures = require("ui/gestures");
var absoluteLayoutModule = require("ui/layouts/absolute-layout");
var view = require("ui/core/view");
var platformModule = require("platform");
var scrollViewModule = require("ui/scroll-view");
var builder = require("ui/builder");
var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var actionBarModule = require("ui/action-bar");
var animation = require("ui/animation");
var pageModule = require("ui/page");
var indexes={ 
     "algorithms": 0,
     "complexity": 0,
     "dataStructures": 0,
     "loops": 0, 
     "recursion": 0          
};
var context = "loops";

var code = new observableModule.Observable({
	previous: "",
	current: "",
	next: ""
});

// var titleInfo = new observableModule.Observable({
// 	title: "context"
// });

var pageData = new observableModule.Observable({
	code: code,
	title: ""
});

function pageLoaded(args) {
    var page = args.object;

    context = page.navigationContext.info;

    titleTemp = context.charAt(0).toUpperCase() + context.slice(1);
    pageData.title = titleTemp;

    // page.bindingContext = sModule.swipeViewModel;
    page.bindingContext = pageData;

    var swipeCard = view.getViewById(page, "swipeCard");
    var swipeCardPrevious = view.getViewById(page, "swipeCardPrevious");
    var swipeCardNext = view.getViewById(page, "swipeCardNext");

    var screenWidth = platformModule.screen.mainScreen.widthPixels / platformModule.screen.mainScreen.scale;
    var screenHeight = platformModule.screen.mainScreen.heightPixels / platformModule.screen.mainScreen.scale;
    var absoluteLayout = new absoluteLayoutModule.AbsoluteLayout();
    absoluteLayout.width = screenWidth;
	absoluteLayout.height = screenHeight;
	var middleCardLeft = (screenWidth - 250) / 2;
	var middleCardTop = (screenHeight/6);
	var otherCardTop = middleCardTop + 25;
	var previousCardLeft = -200 + middleCardLeft/2;
	var nextCardLeft = 250 + middleCardLeft + middleCardLeft/2;
	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, previousCardLeft);
	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, middleCardLeft);
    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, nextCardLeft);
    absoluteLayoutModule.AbsoluteLayout.setTop(swipeCardPrevious, otherCardTop);
    absoluteLayoutModule.AbsoluteLayout.setTop(swipeCard, middleCardTop);
    absoluteLayoutModule.AbsoluteLayout.setTop(swipeCardNext, otherCardTop);

    //Challenge description lists -- ADDING A DESCRIPTION HERE "ADDS" THE CHALLENGE TO THE APP -- assuming the XML file exists
    var algorithms = ["Implement a binary search.", "Perform an insertion sort.", "Perform a selection sort."];

    var complexity = ["(1) Determine the BigO of the code snippet", "(2) Determine the BigO of the code snippet", 
	"(3) Determine the BigO of the code snippet", "(4) Determine the BigO of the code snippet"];

	// var dataStructures = ["Implement an IntStack class", "Finish implementing the Person class.", "Declare and use an array."];
	var dataStructures = ["Implement an IntStack class", "Finish implementing the Person class."];

	var loops= ["Find the smallest element using a loop.", "Return the number of times a value occurs.", 
	"Find the last increasing pod of 3 elts.", "Return the row the value is found in."];

	var recursion = ["Compute the nth fibonacci number.", "Compute the factorial.", "Find the greatest common divisor.", 
	"Determine if a string is a palindrome."];

	if (context === "algorithms") {
		var challengeDescriptions = algorithms;
	} else if (context === "complexity") {
		var challengeDescriptions = complexity;
	} else if  (context === "dataStructures") {
		var challengeDescriptions = dataStructures;
	} else if (context === "loops") {
		var challengeDescriptions = loops;
	} else if (context === "recursion") {
		var challengeDescriptions = recursion;
	}

	handleEdges();

	cardIndex = indexes[context];
	if (cardIndex - 1 > -1) {
		code.previous = challengeDescriptions[cardIndex - 1];
	} else {
		code.previous = "";
	}
	code.current = challengeDescriptions[cardIndex];
	if (cardIndex + 1 < challengeDescriptions.length) {
		code.next = challengeDescriptions[cardIndex + 1];
	} else {
		code.next = "";
	}

    swipeCard.on(gestures.GestureTypes.pan, function (args) {
		// if ( typeof this.oldLeftMiddle === 'undefined' ) {
	 //        this.oldLeftMiddle = swipeCard._oldLeft;
	 //        this.oldLeftPrevious = swipeCardPrevious._oldLeft;
	 //        this.oldLeftNext = swipeCardNext._oldLeft;
	 //    }

	    if(args.state === gestures.GestureStateTypes.began) {
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, previousCardLeft + args.deltaX);
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, middleCardLeft + args.deltaX);
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, nextCardLeft + args.deltaX);
	    } else if(args.state === gestures.GestureStateTypes.changed) {
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, previousCardLeft + args.deltaX);
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, middleCardLeft + args.deltaX);
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, nextCardLeft + args.deltaX);
	    } else if(args.state === gestures.GestureStateTypes.ended) {
	    	// console.log("ended with deltaX: " + args.deltaX);
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, middleCardLeft);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, previousCardLeft);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, nextCardLeft);

		 //    var animations = [
			//     { target: swipeCardPrevious, translate: { x: -args.deltaX, y:0 }, duration: 300, delay: 0 },
			//     { target: swipeCard, translate: { x: -args.deltaX, y:0 }, duration: 300, delay: 0 },
			//     { target: swipeCardNext, translate: { x: -args.deltaX, y:0 }, duration: 300, delay: 0 }
			// ];
			// var a = new animation.Animation(animations);
			// a.play()
			//     .then(function () {
			//     //console.log("Animations finished");
			// })
			//     .catch(function (e) {
			//     console.log(e.message);
			// });
		   	if (args.deltaX > 150) {
		   		if (canSwipe("previous")) {
		   			indexes[context] -= 1;
		   			handleEdges();
			   		cardIndex = indexes[context];
			   		code.current = challengeDescriptions[cardIndex];
			      	code.previous = challengeDescriptions[cardIndex - 1];
			      	code.next = challengeDescriptions[cardIndex + 1];	
		   		}
		    } else if (args.deltaX < -150) {
		    	if (canSwipe("next")) {
		    		indexes[context] += 1;
		    		handleEdges();
			   		cardIndex = indexes[context];
			      	code.current = challengeDescriptions[cardIndex];
			      	code.previous = challengeDescriptions[cardIndex - 1];
			      	code.next = challengeDescriptions[cardIndex + 1];
		    	}	
		    } 
	    } else if(args.state === gestures.GestureStateTypes.cancelled) {
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, middleCardLeft);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, previousCardLeft);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, nextCardLeft);
		    return;
	    }
	});

	swipeCard.on(gestures.GestureTypes.tap, function (args) {
    	cardIndex = indexes[context];
    	var path = "./challenges/" + context + "/" + context + (cardIndex + 1);
    	var topmost = frameModule.topmost();
		topmost.navigate(path);
	});

	function handleEdges() {
		console.log("index: " + indexes[context] + " in handleEdges");
		if(indexes[context] === 0) {
			swipeCardPrevious.style.visibility = "collapse";
			swipeCardNext.style.visibility = "visible";
		} else if (indexes[context] === challengeDescriptions.length - 1) {
			swipeCardPrevious.style.visibility = "visible";
			swipeCardNext.style.visibility = "collapse";
		} else {
			swipeCardPrevious.style.visibility = "visible";
			swipeCardNext.style.visibility = "visible";
		}
	};

	function canSwipe(direction) {
		if((indexes[context] === 0) && (direction === "previous")) {
			return false;
		} else if ((indexes[context] === challengeDescriptions.length - 1) 
			&& (direction === "next")) {
			return false;
		} else {
			return true;
		}
	};

	page.on(pageModule.Page.navigatingFromEvent, function (isBackNavigation) {
    	if(isBackNavigation) {
    		console.log("in isBackNavigation");
    		// page.css = "cardPrevious { visibility: collapse }";
    	}
	});

}
exports.pageLoaded = pageLoaded;