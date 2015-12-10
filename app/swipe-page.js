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
var cardIndex = 2;

var code = new observableModule.Observable({
	previous: "previous",
	current: "current",
	next: "next"
});

function pageLoaded(args) {
    var page = args.object;
    var absoluteLayout = new absoluteLayoutModule.AbsoluteLayout();
    // page.bindingContext = sModule.swipeViewModel;
    page.bindingContext = code;
    var swipeCard = view.getViewById(page, "swipeCard");
    var swipeCardPrevious = view.getViewById(page, "swipeCardPrevious");
    var swipeCardNext = view.getViewById(page, "swipeCardNext");
    var screenWidth = platformModule.screen.mainScreen.widthPixels / platformModule.screen.mainScreen.scale;
    var screenHeight = platformModule.screen.mainScreen.heightPixels / platformModule.screen.mainScreen.scale;
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

	var context = "loops";

	//You can access a challenge like this:
	//challenges["loopChallenges"]["loop1"]
	loops={ 
     "loop1":"Find the smallest element using a loop.", 
     "loop2":"Return the number of times a value occurs.", 
     "loop3":"Find the last increasing pod of 3 elts.",
     "loop4":"Return the row the value is found in." 
	};

	dataStructures={
		"dataStructures1":"Implement an IntStack class",
	  "dataStructures2":"Finish implementing the Person class."
	};

	challenges={
		"loopChallenges":loops,
	  "dataStructureChallenges": dataStructures
	};

	code.previous = loopDescList[cardIndex - 1];
	code.current = loopDescList[cardIndex];
	code.next = loopDescList[cardIndex + 1];

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
	    	// console.log("ended");
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, this.oldLeftMiddle);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, this.oldLeftPrevious);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, this.oldLeftNext);
		   	if (args.deltaX > 200) {
		   		console.log("swipe left");
		   		//NEED TO UPDATE FOR EDGE CASES
		   		cardIndex -= 1;
		   		code.current = loopDescList[cardIndex];
		      	code.previous = loopDescList[cardIndex - 1];
		      	code.next = loopDescList[cardIndex + 1];
		      	console.log("previous: " + code.previous + ", current: " + code.current + ", next: " + code.next);
		    } else if (args.deltaX < -200) {
		    	console.log("swipe right");
		      	cardIndex += 1;
		      	code.current = loopDescList[cardIndex];
		      	code.previous = loopDescList[cardIndex - 1];
		      	code.next = loopDescList[cardIndex + 1];
		      	console.log("previous: " + code.previous + ", current: " + code.current + ", next: " + code.next);
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
    	console.log("Tap");
    	var topmost = frameModule.topmost();
    	console.log("this.cardIndex:" + cardIndex);
    	console.log("loopList[cardIndex]: " + loopList[cardIndex]);
		topmost.navigate(loopList[cardIndex]);

	});

	// swipeCard.on(gestures.GestureTypes.pinch, function (args) {
 //    // 	if (args.scale > 1) {
 //    // 		if(args.state === gestures.GestureStateTypes.changed) {
	// 	  //   	console.log("pinch changed");
	// 	  //   	swipeCard.animate({
	// 		 //    	scale: { x: args.scale, y: args.scale},
	// 		 //    	duration: 30
	// 			// });
	// 	  //   } else if(args.state === gestures.GestureStateTypes.ended) {
	// 	  //   	console.log("pinch ended");
	//    //  		absoluteLayoutModule.AbsoluteLayout.setTop(swipeCard, 0);
	//    //  		absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, 0);
	//    //  		swipeCard.width = screenWidth;
	// 			// swipeCard.height = screenHeight
	// 	  //     	return;
	// 	  //   }
 //    // 	} else {
 //    	if (args.scale < 1 && swipeCard.width > 250) {
 //    		if(args.state === gestures.GestureStateTypes.changed) {
	// 	    	console.log("pinch changed");
	// 	    	swipeCard.animate({
	// 		    	scale: { x: args.scale, y: args.scale},
	// 		    	duration: 30
	// 			});
	// 	    } else if(args.state === gestures.GestureStateTypes.ended) {
	// 	    	console.log("pinch ended");
	//     		absoluteLayoutModule.AbsoluteLayout.setTop(swipeCard, middleCardTop);
	//     		absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, middleCardLeft);
	//     		swipeCard.width = 250;
	// 			swipeCard.height = 250;
	// 	      	return;
	// 	    }
 //    	}
	// });
}
exports.pageLoaded = pageLoaded;