var sModule = require("./swipe-view-model");
var dialogs = require("ui/dialogs");
var gestures = require("ui/gestures");
var absoluteLayout = require("ui/layouts/absolute-layout");
var view = require("ui/core/view");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = sModule.swipeViewModel;
    var swipeCard = view.getViewById(page, "swipeCard");

    swipeCard.on(gestures.GestureTypes.pan, function (args) {
		// console.log("Pan deltaX:" + args.deltaX + "; deltaY:" + args.deltaY + ";");
		if ( typeof this.oldTop === 'undefined' ) {
	        this.oldTop = swipeCard._oldTop;
	        this.oldLeft = swipeCard._oldLeft;
	       	this.panDuration = 0;
	    }

	    //if the pan is starting from origin then we need to add oldTop and oldLeft
	    if (panDuration === 0) {
	    	absoluteLayout.AbsoluteLayout.setTop(swipeCard, this.oldTop + args.deltaY);
	    	absoluteLayout.AbsoluteLayout.setLeft(swipeCard, this.oldLeft + args.deltaX);
	    }
	    //this means we are mid-swipe so just use deltaY and deltaX by themselves 
	    else {
	    	absoluteLayout.AbsoluteLayout.setTop(swipeCard, args.deltaY);
	    	absoluteLayout.AbsoluteLayout.setLeft(swipeCard, args.deltaX);
	    	panDuration++;
	    }

	    swipeCard.animate({
		    rotate: args.deltaX/360,
		    duration:10
		});


	   	if (args.deltaX > 100) {
	    	dialogs.alert("swipe right");
	    	absoluteLayout.AbsoluteLayout.setTop(swipeCard, this.oldTop);
	      	absoluteLayout.AbsoluteLayout.setLeft(swipeCard, this.oldLeft);
	      	panDuration = 0;
	      	return;
	    } else if (args.deltaX < -90) {
	    	dialogs.alert("swipe left");
	    	absoluteLayout.AbsoluteLayout.setTop(swipeCard, this.oldTop);
	      	absoluteLayout.AbsoluteLayout.setLeft(swipeCard, this.oldLeft);
	      	panDuration = 0;
	      	return;
	    } 

	    //args.state is undefined for some reason??
	    if(args.state === "began") {
	      // Pan began.
	      // absoluteLayout.AbsoluteLayout.setTop(swipeCard, this.oldTop + args.deltaY);
	      // absoluteLayout.AbsoluteLayout.setLeft(swipeCard, this.oldLeft + args.deltaX);
	    } else if(args.state === "changed") {
	      // Pan changed.
	      // absoluteLayout.AbsoluteLayout.setTop(swipeCard, args.deltaY);
	      // absoluteLayout.AbsoluteLayout.setLeft(swipeCard, args.deltaX);
	    } else if(args.state === "ended") {
	      // Pan ended.
	      absoluteLayout.AbsoluteLayout.setTop(swipeCard, this.oldTop);
	      absoluteLayout.AbsoluteLayout.setLeft(swipeCard, this.oldLeft);
	    } else if(args.state === "cancelled") {
	      // Pan cancelled.
	      absoluteLayout.AbsoluteLayout.setTop(swipeCard, this.oldTop);
	      absoluteLayout.AbsoluteLayout.setLeft(swipeCard, this.oldLeft);
	    } else if(args.state === "failed") {
	      // Pan failed.
	      absoluteLayout.AbsoluteLayout.setTop(swipeCard, this.oldTop);
	      absoluteLayout.AbsoluteLayout.setLeft(swipeCard, this.oldLeft);
	    }
	});
}
exports.pageLoaded = pageLoaded;