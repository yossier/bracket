var config = require("./config");
var frameModule = require("ui/frame");

module.exports = {
    goToHomePage: function() {
        frameModule.topmost().navigate({
            moduleName: "home-page",
            clearHistory: true
        });
    },
    goToLoginPage: function() {
        frameModule.topmost().navigate("login");
    },
    goToRegisterPage: function() {
        frameModule.topmost().navigate("register");
    },
    signOut: function() {
        config.logout();
        frameModule.topmost().navigate({
            moduleName: "login",
            animated: false,
            clearHistory: true
        });
    },
    startingPage: function() {
        return config.logged_in ? "home-page" : "login";
    }
};
