var dialogsModule = require("ui/dialogs");
var navigation = require("./shared/navigation");
var UserViewModel = require("./user-view-model");

var user = new UserViewModel({ authenticating: false});
var email;
var firstName;
var lastName;
var password;
var signUpButton;

exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = user;

    user.set("email", "");
    user.set("password", "");
    user.set("first_name", "");
    user.set("last_name", "");

    email = page.getViewById("email");
    password = page.getViewById("password");
    firstName = page.getViewById("first_name");
    lastName = page.getViewById("last_name");
    signUpButton = page.getViewById("sign-up-button");
};

function disableForm() {
    email.isEnabled = false;
    firstName.isEnabled = false;
    lastName.isEnabled = false;
    password.isEnabled = false;
    signUpButton.isEnabled = false;
    user.set("authenticating", true);
}

function enableForm() {
    email.isEnabled = true;
    firstName.isEnabled = true;
    lastName.isEnabled = true;
    password.isEnabled = true;
    signUpButton.isEnabled = true;
    user.set("authenticating", false);
}

function completeRegistration() {
    disableForm();
    user.register()
        .then(function() {
            dialogsModule
                .alert("Your account was successfully created.")
                .then(navigation.goToLoginPage);
        }).catch(function() {
            dialogsModule
                .alert({
                    message: "Unfortunately we were unable to create your account.",
                    okButtonText: "OK"
                });
        }).then(enableForm);
}

exports.register = function() {
    if (user.isValidEmail()) {
        completeRegistration();
    } else {
        dialogsModule.alert({
            message: "Enter a valid email address.",
            okButtonText: "OK"
        });
    }
};
