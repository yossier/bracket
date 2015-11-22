var sModule = require("./swipe-view-model");
var dialogs = require("ui/dialogs");
var gestures = require("ui/gestures");
var absoluteLayout = require("ui/layouts/absolute-layout");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = sModule.swipeViewModel;
}
exports.pageLoaded = pageLoaded;
exports.onCardPan = function(args){
    var sender = args.object;
    sender.on(gestures.GestureTypes.pan, function (args) {
    	console.log("Pan deltaX:" + args.deltaX + "; deltaY:" + args.deltaY + ";");
    	console.log(args);
    	console.log(args.state);
	    if(args.state === gestures.GestureStateTypes.began) {
	      // Pan began.
	      if ( typeof this.oldTop == 'undefined' ) {
	        	this.oldTop = sender._oldTop;
	        	this.oldLeft = sender._oldLeft;
	      }
	    } else if(args.state === gestures.GestureStateTypes.changed) {
	      // Pan changed.
	      absoluteLayout.AbsoluteLayout.setTop(sender, args.deltaY);
	      absoluteLayout.AbsoluteLayout.setLeft(sender, args.deltaX);
	    } else if(args.state === gestures.GestureStateTypes.ended) {
	      // Pan ended.
	       if (args.deltaX > 200) {
	    		dialogs.alert("swipe right");
	    	} else if (args.deltaX < -150) {
	    		dialogs.alert("swipe left");
	    	} 
	      absoluteLayout.AbsoluteLayout.setTop(sender, oldTop);
	      absoluteLayout.AbsoluteLayout.setLeft(sender, oldLeft);

	    } else if(args.state === gestures.GestureStateTypes.cancelled) {
	      // Pan cancelled.
	      absoluteLayout.AbsoluteLayout.setTop(sender, oldTop);
	      absoluteLayout.AbsoluteLayout.setLeft(sender, oldLeft);
	    }
	});
    
}