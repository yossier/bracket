var observableModule = require("data/observable");

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
    alert("Signing in");
    console.log(user.email);
}

exports.register = function() {
   // alert("moving");
    var topmost = frameModule.topmost();
    topmost.navigate("loop2");    
}
