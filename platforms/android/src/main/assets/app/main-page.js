var vmModule = require("./main-view-model");
var appSettings = require("application-settings");
var frameModule = require("ui/frame");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
    
    if( appSettings.getBoolean("logged-in", false) ){
        //switch to main-page
        var topmost = frameModule.topmost();
        topmost.navigate("swipe-page");
    } else {
       /* var navEntry = {
            moduleName: "login",
            context: "login into bracket",
            animated: false
        }
       */
        var topmost = frameModule.topmost();
        topmost.navigate("login");
    }
    
}
exports.pageLoaded = pageLoaded;
