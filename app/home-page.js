var tabViewModule = require("ui/tab-view");
var challengeView = require("challenge");
function pageLoaded(args) {
	var tabView = view.getViewById(page, "homeTabView");
	var items = [];
	var tabEntry0 = {
	    title: "Home",
	    view: challengeView
	};
	items.push(tabEntry0);
	var tabEntry1 = {
	    title: "Leaderboard",
	    view: StackLayout1
	};
	items.push(tabEntry1);
	tabView.items = items;
}