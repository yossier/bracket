var observableModule = require("data/observable");
var appSettings = require("application-settings");
var frameModule = require("ui/frame")

var user = new observableModule.Observable({
    email: "",
    password: ""
});

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var email;
var password;

exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = user;
};

exports.signIn = function() {
    appSettings.setBoolean("logged-in", true);
    frameModule.topmost().navigate("main-page")
}

exports.register = function() {
   // alert("moving");
    var topmost = frameModule.topmost();
    topmost.navigate("user");    
}
