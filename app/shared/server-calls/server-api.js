var config = require("../config");
var fetchModule = require("fetch");

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
            headers: {
                "Content-Type": "application/json"
            }
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
    }
    
}
