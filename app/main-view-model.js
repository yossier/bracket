var observable = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
    }
    
    function switchPage() {
        var frameModule = require('ui/frame');
        var topmost = frameModule.topmost();
        //will check later for logged in user
        topmost.navigate("swipe-page");
    }
    return HelloWorldModel;
})(observable.Observable);
exports.HelloWorldModel = HelloWorldModel;
exports.mainViewModel = new HelloWorldModel();
