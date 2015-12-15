var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");

var User = require("../../view-models/user-view-model");

var completedChallengeList = new observableArrayModule.ObservableArray([
    {title:"BigO1", user_score:1, max_points:1},
    {title:"BigO3", user_score:2, max_points:3}
]);

var user = new User();

var pageData = new observableModule.Observable({
    title: "Completed & Attempted Challenges",
    user: user
});

exports.pageLoaded = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
    user.getCompletedChallenges();
};
