var config = require("../shared/config");
var Observable = require("data/observable").Observable;

function Challenge(info) {
    info = info || {};

    var viewModel = new Observable({
        id: info.challenge_id || "",
        title: info.title || "",
        points: info.points || "",
        category: info.category || "",
        score: info.score || 0
    });
    
    viewModel.getChallengeInfo = function (challenge_id) {
        viewModel.set("id", challenge_id);
        console.log("GET:" + config.apiUrl + "challenges/" + challenge_id);
        return fetch(config.apiUrl + "challenges/" + viewModel.get("id") )
            .then(handleErrors)
            .then(function(response) {
                return response.json();
            })
            .then(function (data) {
//                viewModel.set("id", data.id);
                viewModel.set("title", data.title);
                viewModel.set("category", data.category);
                viewModel.set("points", data.points);
                console.log(data.title + " " + data.points + " - " + data.category);
            });
    };

    viewModel.getUserScore =function () {
        //not yet implemented on the server
    };
    
    viewModel.updateScore = function() {
        console.log("POST: " + config.apiUrl + "users/" + config.user_id + "/completed-challenges/" + viewModel.get("id") + " points=" + viewModel.get("score"));
        return fetch(config.apiUrl + "users/" + config.user_id + "/completed-challenges/" + viewModel.get("id"), {
            method: "POST",
            body: JSON.stringify({
                points: viewModel.get("score")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                viewModel.set("score", data.points);
                return data;
            });
    };

    return viewModel;
    
}

module.exports = Challenge;

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}
