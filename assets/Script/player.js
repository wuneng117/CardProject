const Card = require('card');
const CardDataManager = require('./data/CardDataManager')

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        
        hp: 30, //英雄生命值
        critical: 0,    //英雄当前水晶数
        maxCritical: 0, //英雄当前回合最大水晶数
        //handCard: 0,    
        deckArray: [],  //卡组数组（Card类型）
        handArray: [],  //手牌数组（Card类型）
        fieldArray: [], //场上随从数组（CardMonster类型）
        handCardSprteArray: [], //手牌图片数组
    },
    
    init: function() {
        this.hp = 30;
        this.critical = 0;
        this.maxCritical = 0;
        this.deckArray = [];
        this.handArray = [];
        this.fieldArray = [];
        for(var i=0; i<this.handCardSpriteArray.length(); ++i)
        {
            //this.handCardSpriteArray[i].removeFrom
        }
        
    },
    
    //根据牌池随机创建卡组
    createDeck: function(cardArray) {
        for(var i=0; i<30; ++i)
        {
            deckArray[i] = new Card();
            var randomKey = cardArray[Math.floor(Math.random()*cardArray.length)];
            var cardData = CardDataManager.cardMap[randomKey];
            deckArray[i].init(cardData);
        }
    },
    
    //水晶回复
    criticalRecover() {
        this.critical = this.maxCritical;
    },
    
    //水晶增加
    criticalPlus: function(num) {
        this.maxCritical += num;
        this.critical += num;
        if(this.maxCritical > 10)
            this.maxCritical = 10;
        if(this.critical > 10)
            this.critical = 10;
    },
    
    //抽牌
    drawDeck: function(num) {
        var deckArray = this.deckArray;
        
        if(deckArray.length > 0)
        {
            var card = deckArray.pop();
            this.handArray.push(card);
            this.refreshHandCardSprte();    //刷新手牌图片
        }
        else
        {
            
        }
    },
    
    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
