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
var indexes={ 
     "loops": 0, 
     "dataStructures": 0,
     "recursion": 0,
     "algorithms": 0,
     "bigO": 0
};
var context = "loops";

var code = new observableModule.Observable({
	previous: "previous",
	current: "current",
	next: "next"
});

var titleInfo = new observableModule.Observable({
	title: "context"
});

function pageLoaded(args) {
	// console.log("pageLoaded");
    var page = args.object;

    context = page.navigationContext.info;
    console.log("context: " + context);

    titleTemp = context.charAt(0).toUpperCase() + context.slice(1);
    titleInfo.title = titleTemp;

    // page.bindingContext = sModule.swipeViewModel;
    page.bindingContext = code;


    var swipeCard = view.getViewById(page, "swipeCard");
    var swipeCardPrevious = view.getViewById(page, "swipeCardPrevious");
    var swipeCardNext = view.getViewById(page, "swipeCardNext");

    var screenWidth = platformModule.screen.mainScreen.widthPixels / platformModule.screen.mainScreen.scale;
    var screenHeight = platformModule.screen.mainScreen.heightPixels / platformModule.screen.mainScreen.scale;
    var absoluteLayout = new absoluteLayoutModule.AbsoluteLayout();
    absoluteLayout.width = screenWidth;
	absoluteLayout.height = screenHeight;
	var middleCardLeft = (screenWidth - 250) / 2;
	var middleCardTop = (screenHeight/5);
	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious,  -200 + middleCardLeft/2);
	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, middleCardLeft);
    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, 250 + middleCardLeft + middleCardLeft/2);
    absoluteLayoutModule.AbsoluteLayout.setTop(swipeCardPrevious, middleCardTop + 25);
    absoluteLayoutModule.AbsoluteLayout.setTop(swipeCard, middleCardTop);
    absoluteLayoutModule.AbsoluteLayout.setTop(swipeCardNext, middleCardTop + 25);

 //    var loopDescList = ["loop 1", "loop 2", "loop 3", "loop 4", "loop 5"];
	// var loopList = ["loop1", "loop2", "loop3", "loop4", "loop5"];

	//You can access a challenge like this:
	//challenges["loopChallenges"]["loop1"]
	var loops= ["Find the smallest element using a loop.", "Return the number of times a value occurs.", 
	"Find the last increasing pod of 3 elts.", "Return the row the value is found in."];

	var dataStructures = ["Implement an IntStack class", "Finish implementing the Person class."]

	var recursion = ["Compute the nth fibonacci number.", "Compute the factorial.", "Find the greatest common divisor.", 
	"Determine if a string is a palindrome."];

	var algorithms = ["implement a binary search."];

	var bigO = ["Complexity 1", "Complexity 2", "Complexity 3"];

	// var challenges={
	// 	"loopChallenges":loops,
	//   "dataStructureChallenges": dataStructures
	// };

	if (context === "loops") {
		var challengeDescriptions = loops;
	} else if (context === "dataStructures") {
		var challengeDescriptions = dataStructures;
	} else if  (context === "recursion") {
		var challengeDescriptions = recursion;
	} else if (context === "algorithms") {
		var challengeDescriptions = algorithms;
	} else if (context === "bigO") {
		var challengeDescriptions = bigO;
	}

	cardIndex = indexes[context];
	code.previous = challengeDescriptions[cardIndex - 1];
	code.current = challengeDescriptions[cardIndex];
	code.next = challengeDescriptions[cardIndex + 1];

	// if (this.loopCurIndex === 0) {
	// 	page.css = "cardPrevious { visibility: collapsed }";
	// }



    swipeCard.on(gestures.GestureTypes.pan, function (args) {
		if ( typeof this.oldLeftMiddle === 'undefined' ) {
	        this.oldLeftMiddle = swipeCard._oldLeft;
	        this.oldLeftPrevious = swipeCardPrevious._oldLeft;
	        this.oldLeftNext = swipeCardNext._oldLeft;
	    }

	    if(args.state === gestures.GestureStateTypes.began) {
	    	// console.log("began");
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, this.oldLeftPrevious + args.deltaX);
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, this.oldLeftMiddle + args.deltaX);
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, this.oldLeftNext + args.deltaX);
	    } else if(args.state === gestures.GestureStateTypes.changed) {
	    	// console.log("changed");
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, this.oldLeftPrevious + args.deltaX);
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, this.oldLeftMiddle + args.deltaX);
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, this.oldLeftNext + args.deltaX);
	    } else if(args.state === gestures.GestureStateTypes.ended) {
	    	console.log("ended");
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, this.oldLeftMiddle);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, this.oldLeftPrevious);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, this.oldLeftNext);
		 //    var animations = [
			//     { target: swipeCardPrevious, translate: { x: -args.deltaX }, duration: 300, delay: 0 },
			//     { target: swipeCard, translate: { x: -args.deltaX }, duration: 300, delay: 0 },
			//     { target: swipeCardNext, translate: { x: -args.deltaX }, duration: 300, delay: 0 },
			// ];
			// var a = new animation.Animation(animations);
			// a.play()
			//     .then(function () {
			//     //console.log("Animations finished");
			// })
			//     .catch(function (e) {
			//     console.log(e.message);
			// });
		   	if (args.deltaX > 175) {
		   		//NEED TO UPDATE FOR EDGE CASES
		   		indexes[context] -= 1;
		   		cardIndex = indexes[context];
		   		code.current = challengeDescriptions[cardIndex];
		      	code.previous = challengeDescriptions[cardIndex - 1];
		      	code.next = challengeDescriptions[cardIndex + 1];
		    } else if (args.deltaX < -175) {
		      	indexes[context] += 1;
		   		cardIndex = indexes[context];
		      	code.current = challengeDescriptions[cardIndex];
		      	code.previous = challengeDescriptions[cardIndex - 1];
		      	code.next = challengeDescriptions[cardIndex + 1];
		      	// console.log("previous: " + code.previous + ", current: " + code.current + ", next: " + code.next);
		    } 
	    } else if(args.state === gestures.GestureStateTypes.cancelled) {
	    	// console.log("cancelled");
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, this.oldLeftMiddle);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, this.oldLeftPrevious);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, this.oldLeftNext);
		    return;
	    }
	});

	swipeCard.on(gestures.GestureTypes.tap, function (args) {
    	cardIndex = indexes[context];
    	var key = context + (cardIndex + 1);
    	var topmost = frameModule.topmost();
		topmost.navigate(key);
	});

}
exports.pageLoaded = pageLoaded;