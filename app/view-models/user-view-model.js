var config = require("../shared/config")
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var validator = require("email-validator");

var challenges = new ObservableArray([]);


function User(info) {
    info = info || {};

    // You can add properties to observables on creation
    var viewModel = new Observable({
        id: config.user_id || "",
        email: info.email || "",
        password: info.password || "",
        first_name: info.first_name || "",
        last_name: info.last_name || "",
        total_points: info.total_points || "",
        completed_challenges: info.completed_challenges || "",
        attempted_challenges: info.attempted_challenges || "",
        challenges: challenges
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
                viewModel.set("attempted_challenges", data.attempted_challenges);
                viewModel.set("completed_challenges", data.completed_challenges);
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
            .then(handleErrors)
            .then(function(response) {
                return response.json();
            }).then( function(data) {
                config.logged_in = true;
                config.user_id = data.user_id;
            });
    };

    viewModel.resetPassword = function() {
        return fetch(config.apiUrl + "Users/"+ viewModel.get("id") +"/password", {
            method: "PUT",
            body: JSON.stringify({
                email: viewModel.get("email"),
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors);
    };

    viewModel.getCompletedChallenges = function(){
        return fetch(config.apiUrl + "users/" + viewModel.get("id") + "/completed-challenges")
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log('getting data');
                viewModel.emptyChallenges();
                data.challenges.forEach(function(challenge) {
                    
                    challenges.push({
                        title: challenge.challenge_title,
                        id: challenge.challenge_id,
                        category: challenge.challenge_category,
                        completed: challenge.challenge_completed,
                        max_points: challenge.challenge_points,
                        user_score: challenge.user_score,
                    });
                    
                });
                
                viewModel.set("attempted_challenges", data.attempted_challenges);
                viewModel.set("completed_challenges", data.completed_challenges);
            });
    }

    viewModel.emptyChallenges = function() {
        while(challenges.length)
            challenges.pop();
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
