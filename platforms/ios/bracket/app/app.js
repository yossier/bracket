var application = require("application");
application.mainModule = "swipe-page";
application.cssFile = "./app.css";

application.on(application.launchEvent, function (args) {
    if (args.android) {

    } else if ( args.ios !== undefined ) {
        //check if logged in and move appropriately
    }
});

application.start();
