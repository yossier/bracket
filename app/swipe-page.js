var sModule = require("./swipe-view-model");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = sModule.swipeViewModel;
}
exports.pageLoaded = pageLoaded;