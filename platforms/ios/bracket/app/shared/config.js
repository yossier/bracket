var appSettingsModule = require("application-settings");

var configObject = {
    apiUrl: "https://bracket-server-stage.herokuapp.com/",
    logout: function() {
        this.logged_in = false;
        this.user_id = 0;
    }
};

Object.defineProperty(configObject, "logged_in", {
    get: function() {
        return appSettingsModule.getBoolean("logged_in");
    },
    set: function(status) {
        return appSettingsModule.setBoolean("logged_in", status);
    }
});

Object.defineProperty(configObject, "user_id", {
    get: function() {
        return appSettingsModule.getNumber("user_id");
    },
    set: function(id) {
        return appSettingsModule.setNumber("user_id", id);
    }
});

module.exports = configObject;
