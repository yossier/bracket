var config = require("../shared/config");
var observableArrayModule = require("data/observable-array");

function UserListViewModel(items) {
    var viewModel = new observableArrayModule.ObservableArray(items);
    
    viewModel.getTopTenUsers = function() {
        return fetch(config.apiUrl + "users/top-ten")
            .then(handleErrors)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                data.users.forEach(function(user) {
                    viewModel.push({
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        points: user.points
                    });
                });
            });
    };
    
    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
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

module.exports = UserListViewModel;

