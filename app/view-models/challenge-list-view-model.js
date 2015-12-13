var config = require("./shared/config");
var ObservableArray = require("data/observable").ObservableArray;

function ChallengeListViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.load = function(category = null) {
        var challenges_append = "/challenges" + category ? "/" + category : "";
        //if (category)
        //    challenges_append += "/" + category;
        
        return fetch(config.apiUrl + challenges_append)
            .then(handleErrors)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                data.challenges.forEach(function(challenge) {
                    viewModel.push({
                        category: challenge.category,
                        challenge_id: challenge.id,
                        challenge_points: points,
                        challenge_title: challenge.title
                    });
                });
            });   
    }
    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}


module.exports = ChallengeListViewModel;

