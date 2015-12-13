var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");

var completedChallengeList = new observableArrayModule.ObservableArray([
    {title:"BigO1", user_score:1, max_points:1},
    {title:"BigO3", user_score:2, max_points:3}
]);

var pageData = new observableModule.Observable({
    title: "Completed and Attempted Challenges",
    completed_challenge_list: completedChallengeList
});

exports.pageLoaded = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
};
