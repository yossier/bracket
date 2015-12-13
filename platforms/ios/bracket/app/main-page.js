var vmModule = require("./main-view-model");
var appSettings = require("application-settings");
var frameModule = require("ui/frame");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
    
    if( appSettings.getBoolean("logged-in", false) ){
        //switch to main-page
        var topmost = frameModule.topmost();
        topmost.navigate("home-page");
    } else {
        var topmost = frameModule.topmost();
        console.log("to navigate")
        topmost.navigate("login");
    }
    
}
exports.pageLoaded = pageLoaded;
