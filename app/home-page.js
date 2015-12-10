var tabViewModule = require("ui/tab-view");
var view = require("ui/core/view");
var stackLayoutModule = require("ui/layouts/stack-layout");
var labelModule = require("ui/label");
var frameModule = require("ui/frame");
var challengeView = require("./challenge");
// var leaderboardView = require("./app/leaderboard");
// var profileView = require("./app/user");
function pageLoaded(args) {
	var page = args.object;
	console.log("inside home-page pageLoaded");
	var tabView = view.getViewById(page, "homeTabView");
	console.log()

	// var items = [];
	// var StackLayout0 = new stackLayoutModule.StackLayout();
	// var label0 = new labelModule.Label();
	// label0.text = "Tab 0";
	// StackLayout0.addChild(label0);
	// var tabEntry0 = {
	//     title: "Tab 0",
	//     view: StackLayout0
	// };
	// items.push(tabEntry0);
	// var StackLayout1 = new stackLayoutModule.StackLayout();
	// var label1 = new labelModule.Label();
	// label1.text = "Tab 1";
	// StackLayout1.addChild(label1);
	// var tabEntry1 = {
	//     title: "Tab 1",
	//     view: StackLayout1
	// };
	// items.push(tabEntry1);
	// tabView.items = items;
}
exports.pageLoaded = pageLoaded;