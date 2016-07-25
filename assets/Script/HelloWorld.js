const cardDataManager = require('./data/CardDataManager')

var tempTimer = 0;

cc.Class({
    extends: cc.Component,

    properties: {
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        cardDataManager.init();
        
        cc.log(cardDataManager.cardMap['a'].cardName);
        cc.log(cardDataManager.cardMap.length);
    },

    // called every frame
    update: function (dt) {
        tempTimer++;
        if(tempTimer > 60)
        {
            tempTimer = 0;
        }
    },
});
