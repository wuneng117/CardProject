//处理对战流程的关键类

const Player = require('player');

var tempDeck = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L'];
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
        
        cardPrefab: {
            default: null,
            type: cc.Prefab
        },

        //自己
        localPlayer: {
            default: null,
            type: Player
        },
        
        //对手
        opponentPlayer: {
            default: null,
            type: Player
        },
        
        turn: 0,    //当前双方总回合数
        turnPhase: 0,   //行动状态
        
        //状态相关
        enterTurnFunc: {
            default: []
        },
        
        turnFunc: {
            default: []
        },
        
        leaveTurnFunc: {
            default: []
        },
    },
    
    //开始游戏
    startGame: function() {
        //玩家初始化
        this.localPlayer.init();
        this.opponentPlayer.init();
        
        //根据牌池生成卡组
        this.localPlayer.createDeck(tempDeck);
        this.opponentPlayer.createDeck(tempDeck);
     
        this.turnPlayer = this.localPlayer;
        this.turnOpponent = this.opponentPlayer;
        
        this.turn = 1;
        
        changePhase(PHASE_BEGIN_TURN);
        
       
    },

    enterBeginTurn: function() {
        this.turnPlayer.criticalPlus(1);        //增加水晶
        this.turnPlayer.criticalRecover();      //回复水晶
        
        this.turnPlayer.drawCard();     //抽1张卡
        
    },
    
    beginTurn: function(){
        //进入主流程
        changePhase(PHASE_MAIN_TURN);
    },
    
    leaveBeginTurn: function() {
        
    },
    
    enterMainTurn: function() {
        
    },
    
    mainTurn: function(){
        
    },
    
    leavemainTurn: function() {
        
    },
    
    enterEndTurn: function() {
        
    },
    
    endTurn: function(){
        
    },
    
    leaveEndTurn: function() {
        
    },
        
    changePhase: function(nextTurnType) {
        if(this.turnPhase !== 0)
        {
            this.leaveTurnFunc[this.turnPhase]();
        }
        
        this.enterTurnFunc[this.tuanPhase]();
    },
    
    // use this for initialization
    onLoad: function () {
        //
        this.enterTurnFunc[PHASE_BEGIN_TURN] = this.enterBeginTurn;
        this.enterTurnFunc[PHASE_MAIN_TURN] = this.enterMainTurn;
        this.enterTurnFunc[PHASE_END_TURN] = this.enterEndTurn;

        this.turnFunc[PHASE_BEGIN_TURN] = this.beginTurn;
        this.turnFunc[PHASE_MAIN_TURN] = this.mainTurn;
        this.turnFunc[PHASE_END_TURN] = this.endTurn;
        
        this.leaveTurnFunc[PHASE_BEGIN_TURN] = this.leaveBeginTurn;
        this.leaveTurnFunc[PHASE_MAIN_TURN] = this.leaveMainTurn;
        this.leaveTurnFunc[PHASE_END_TURN] = this.leaveEndTurn;
    },


    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.turnFunc[this.turnPhase]();
    },
});
