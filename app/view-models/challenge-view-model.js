var config = require("./shared/config");
var Observable = require("data/observable").Observable;

function Challenge(info) {
    info = info || {};

    var viewModel = new Observable({
        id: info.challenge_id || "",
        title: info.title || "",
        points: info.points || "",
        category: info.category || "",
        score: info.score
    });

    


};
