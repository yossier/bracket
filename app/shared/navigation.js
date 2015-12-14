var config = require("./config");
var frameModule = require("ui/frame");

module.exports = {
    goBack: ()=> { frameModule.topmost().goBack(); },
    
    goToCompletedChallengesPage: ()=> { frameModule.topmost().navigate("views/completed-challenges/completed-challenges");  },
    goToHomePage: function() {
        frameModule.topmost().navigate({
            moduleName: "home-page",
            clearHistory: true
        });
    },
    goToLoginPage: function() {
        frameModule.topmost().navigate("login");
    },
    goToSwipePage: function(contextInfo) {
        frameModule.topmost().navigate({
            moduleName: "swipe-page",
            animated: false,
            context: { info: contextInfo }
        });
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
