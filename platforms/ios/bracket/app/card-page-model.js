var observable = require("data/observable");
var CardPageModel = (function (_super) {
    __extends(CardPageModel, _super);
    function CardPageModel() {
        _super.call(this);
        this.set("code", "Look at my awesome code snippet!");
    }
    return CardPageModel;
})(observable.Observable);
exports.CardPageModel = CardPageModel;
exports.CardViewModel = new CardPageModel();