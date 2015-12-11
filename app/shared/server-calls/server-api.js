var config = require("../config");
var fetchModule = require("fetch");

var jsonHeader = {"Content-Type": "application/json"};

modules.exports = {
    createUser: function(user) {
        return fetchModule.fetch(config.apiUrl + "users", {
            method: "POST",
            body: JSON.stringify({
                email: user.email,
                passHash: user.passHash,
                first_name: user.first_name,
                last_name: user.last_name
            }),            
            headers: jsonHeader
        })
            .then(function (r) {
                return r.json();
            })
            .then(function (r) {
                console.log(r);
                return r
            }, function (e) {
                console.log("Error occurred " + e);
                return null;
            })
    },

    getUser: function(userId) {
        return fetchModule.fetch(config.apiUrl + "users/" + userId)
            .then( function(r) {
                return r.json();
            });
            .then(function (r) {
                console.log(r);
                return r
            }, function (e) {
                console.log("Error occurred " + e);
                return null;
            })  
    },

    updateName: function(user) {
        return fetchModule.fetch(config.apiUrl + "users/" + user.id + "/name", {
            method: "PUT",
            body: JSON.stringify({
                first_name: user.first_name,
                last_name: user.last_name,
                passHash: user.passHash
            }),
            header: jsonHeader
        })
            .then(function (r) {
                return r.json();
            })
            .then(function (r) {
                console.log(r);
                return r
            }, function (e) {
                console.log("Error occurred " + e);
                return null;
            })
    }
}
