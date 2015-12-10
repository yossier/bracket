var sModule = require("./swipe-view-model");
var dialogs = require("ui/dialogs");
var gestures = require("ui/gestures");
var absoluteLayoutModule = require("ui/layouts/absolute-layout");
var view = require("ui/core/view");
var platformModule = require("platform");
var scrollViewModule = require("ui/scroll-view");
var builder = require("ui/builder");
var frameModule = require("ui/frame");
var cardIndex = 2;

function pageLoaded(args) {
    var page = args.object;
    var absoluteLayout = new absoluteLayoutModule.AbsoluteLayout();
    page.bindingContext = sModule.swipeViewModel;
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

    var loopDescList = ["loop 1", "loop 2", "loop 3", "loop 4", "loop 5"];
	var loopList = ["loop1", "loop2", "loop3", "loop4", "loop5"];

	swipeCardPrevious.text = loopDescList[cardIndex - 1];
	swipeCard.text = loopDescList[cardIndex];
	swipeCardNext.text = loopDescList[cardIndex + 1];

	// if (this.loopCurIndex === 0) {
	// 	page.css = "cardPrevious { visibility: collapsed }";
	// }



    swipeCard.on(gestures.GestureTypes.pan, function (args) {
		// console.log("Pan deltaX:" + args.deltaX + "; deltaY:" + args.deltaY + ";");
		if ( typeof this.oldLeftMiddle === 'undefined' ) {
	        this.oldLeftMiddle = swipeCard._oldLeft;
	        this.oldLeftPrevious = swipeCardPrevious._oldLeft;
	        this.oldLeftNext = swipeCardNext._oldLeft;
	    }

	    console.log("deltaX: " + args.deltaX);
	   	if (args.deltaX > 200) {
	   		//NEED TO UPDATE FOR EDGE CASES
	   		cardIndex -= 1;
	      	swipeCard.text = loopDescList[cardIndex];
	      	swipeCardPrevious.text = loopDescList[cardIndex - 1];
	      	swipeCardNext.text = loopDescList[cardIndex + 1];
	      	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, this.oldLeftMiddle);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, this.oldLeftPrevious);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, this.oldLeftNext);
	      	return;
	    } else if (args.deltaX < -200) {
	      	cardIndex += 1;
	      	var tempSwipCardText = swipeCard.text;
	      	swipeCard.text = loopDescList[cardIndex];
	      	swipeCardPrevious.text = loopDescList[cardIndex - 1];
	      	swipeCardNext.text = loopDescList[cardIndex + 1];
	      	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, this.oldLeftMiddle);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, this.oldLeftPrevious);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, this.oldLeftNext);
	      	return;
	    } 

	    if(args.state === gestures.GestureStateTypes.began) {
	    	console.log("began");
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, this.oldLeftPrevious + args.deltaX);
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, this.oldLeftMiddle + args.deltaX);
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, this.oldLeftNext + args.deltaX);
	    } else if(args.state === gestures.GestureStateTypes.changed) {
	    	console.log("changed");
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, this.oldLeftPrevious + args.deltaX);
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, this.oldLeftMiddle + args.deltaX);
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, this.oldLeftNext + args.deltaX);
	    } else if(args.state === gestures.GestureStateTypes.ended) {
	    	console.log("ended");
	    	absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, this.oldLeftMiddle);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, this.oldLeftPrevious);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, this.oldLeftNext);
	      	return;
	    } else if(args.state === gestures.GestureStateTypes.cancelled) {
	    	console.log("cancelled");
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCard, this.oldLeftMiddle);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardPrevious, this.oldLeftPrevious);
		    absoluteLayoutModule.AbsoluteLayout.setLeft(swipeCardNext, this.oldLeftNext);
		    return;
	    }
	});

	swipeCard.on(gestures.GestureTypes.tap, function (args) {
    	console.log("Tap");
    	var topmost = frameModule.topmost();
    	console.log("this.loopCurIndex:" + cardIndex);
    	console.log("loopList[this.loopCurIndex]: " + loopList[cardIndex]);
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