var observable = require("data/observable");
var SwipePageModel = (function (_super) {
    __extends(SwipePageModel, _super);
    function SwipePageModel() {
        _super.call(this);
        this.set("code", "Look at my awesome code snippet");
        // this.counter = 42;
        // this.set("message", this.counter + " taps left");
    }
    // HelloWorldModel.prototype.tapAction = function () {
    //     this.counter--;
    //     if (this.counter <= 0) {
    //         this.set("message", "Hoorraaay! You unlocked the NativeScript clicker achievement!");
    //     }
    //     else {
    //         this.set("message", this.counter + " taps left");
    //     }
    // };
    return SwipePageModel;
})(observable.Observable);
exports.SwipePageModel = SwipePageModel;
exports.swipeViewModel = new SwipePageModel();