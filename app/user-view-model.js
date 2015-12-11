var config = require("./shared/config")
var Observable = require("data/observable").Observable;
var validator = require("email-validator");

function User(info) {
    info = info || {};

    // You can add properties to observables on creation
    var viewModel = new Observable({
        id: config.user_id || "",
        email: info.email || "",
        password: info.password || "",
        first_name: info.first_name || "",
        last_name: info.last_name || "",
        total_points: info.total_points || ""
    });

    //Method to get basic user info 
    viewModel.getUserInfo = function() {
        return fetch(config.apiUrl + "users/" + viewModel.get("id"))
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                viewModel.set("email", data.email);
                viewModel.set("first_name", data.first_name);
                viewModel.set("last_name", data.last_name);
                viewModel.set("total_points", data.total_points);
            });
    };
    
    viewModel.login = function() {
        return fetch(config.apiUrl + "users/authenticate", {
            method: "POST",
            body: JSON.stringify({
                email: viewModel.get("email"),
                passHash: viewModel.get("password"),
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function(response) {
                return response.json();
            }).then(function(data) {
                config.logged_in = true;
                config.user_id = data.user_id;
            });
    };

    viewModel.register = function() {
        return fetch(config.apiUrl + "users", {
            method: "POST",
            body: JSON.stringify({
                email: viewModel.get("email"),
                passHash: viewModel.get("password"),
                first_name: viewModel.get("first_name"),
                last_name: viewModel.get("last_name")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors);
    };

    viewModel.resetPassword = function() {
        return fetch(config.apiUrl + "Users/resetpassword", {
            method: "POST",
            body: JSON.stringify({
                email: viewModel.get("email"),
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors);
    };

    viewModel.isValidEmail = function() {
        var email = this.get("email");
        return validator.validate(email);
    };

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = User;
