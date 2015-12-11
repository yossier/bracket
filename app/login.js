var navigation = require("./shared/navigation");
var UserViewModel = require("./user-view-model");
var dialogs = require("ui/dialogs");


var email;
var password;
var signInButton;

var user = new UserViewModel({
    email: "",
    password: "",
    authenticating: false
});


exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = user;


    email = page.getViewById("email");
    password = page.getViewById("password");
    signInButton = page.getViewById("sign-in-button");

    if(page.android) {
        //Prevent focus
    }
    
};

function disableForm() {
    email.isEnabled = false;
    password.isEnabled = false;
    signInButton.isEnabled = false;
    user.set("authenticating", true);
}

function enableForm() {
    email.isEnabled = true;
    password.isEnabled = true;
    signInButton.isEnabled = true;
    user.set("authenticating", false);
}

exports.signIn = function() {
    disableForm();
    user.login()
        .then(enableForm)
        .then(navigation.goToHomePage)
        .catch(function(error) {
            dialogs.alert({
                message: "Unfortunately we could no find your account \n Here is Your error: " + error,
                okButtonText: "OK"
            });
            return;
        })
            .then(enableForm);
};

exports.register = navigation.goToRegisterPage;
