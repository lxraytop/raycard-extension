'use strict';
game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"志臻扩展",
content:function(config,pack){
    if(config.ziqi){
    for(var i in lib.characterPack['ziqi']) {
    if(lib.character[i][4].indexOf("forbidai")<0)lib.character[i][4].push("forbidai");
    };
    };
},precontent:function(ziqi){
    	if(ziqi.enable){ 	
 		game.import('character',function(){
 			var ziqi={
 				name:'ziqi',
 				connect:true,
 	    character:{
            "zq_shenxusheng":["male","shen",3,["zqxushi","zqpodi","zqyicheng"],["des:虎背熊腰：“刘少咤，安平国人。三国时期志臻名将。初时因讨伐山贼有功被加为班主任，之后于往届生之战，独自率军击破一本军队，因前后战功，升任志臻太守，今任志臻判官。被回世杰盛赞为“志臻之熊臣”。”"]],
            "zq_luxun": ["male", "wu", 4, ["zqdingqian", "zqguilv"], ["des:邵爱民，曾任安平校区高中部年级主任，现任河南平顶山校区副校长，为人谦逊有礼，为不可多得的老师。"]],
            "zq_simayi": ["male", "wei", 3, ["zqyinfeng", "zqtaohui"], ["des:回世杰，安平校区大校长。"]],
            "zq_zhaoyun": ["male", "shu", 4, ["zqlinhuang", "zqyuwang"], ["des:忒爽，惭愧惭愧，多喝热水，你**敢在我的课上吃东西，来~超然"]],
            "zq_shen_zhugeliang": ["male", "shen", "3/7", ["zqdouzhuan", "zqxingsuo", "zqtianji"], ["des:神"]],
            "zq_xiaoqiao": ["female", "wu", 3, ["zqfangze", "zqfumeng"], ["des:贺茜，高三一级部物理老师。"]],
            "zq_daqiao": ["female", "wu", 3, ["zqyurong", "zqfuhua"], ["des:王佳宁，高三语文老师。"]],
            "zq_zhangjiao": ["male", "qun", 3, ["zqluanshi", "huangtian", "zqtaiping"], ["des:角完，知其始何名，字急，轰然分行，有类角完者，故师号之曰“角完”，闻之曰，甚善，名我固当，亦自谓角完云。"]],
            "zq_zhugeliang": ["male", "shu", 3, ["zqwendao", "zqzhaoce", "zqkuitian"], ["des:韩朋浩，高三实验部主任。"]],

        },
        skill:{
             zqxushi:{
                trigger:{
                    source:"damageEnd",
                },
                mark:true,
                marktext:"破",
                init:function(player){
            player.storage.zqxushi=0;
        },
                intro:{
                    name:"破",
                    content:"mark",
                },
                frequent:true,
                content:function(){
                player.storage.zqxushi+=1;
                player.syncStorage('zqxushi');
            },
            },
            zqpodi:{
                audio:["repojun",2],
                trigger:{
                    player:"useCardToPlayered",
                },
                direct:true,
                filter:function(event,player){
                    if(event.getParent().triggeredTargets1.length>1) return false;
                    return event.target.countCards('he')>0&&event.cards.length>0&&event.target!=player;
                },
                content:function(){
        'step 0'
        var next=player.choosePlayerCard(trigger.target,'he',[1,Math.min(get.number(trigger.cards[0]),trigger.target.countCards('he'))],get.prompt('zqpodi',trigger.target));
        next.set('ai',function(button){
            if(!_status.event.goon) return 0;
            var val=get.value(button.link);
            if(button.link==_status.event.target.getEquip(2)) return 2*(val+3);
            return val;
        });
        next.set('goon',get.attitude(player,trigger.target)<=0);
        next.set('forceAuto',true);
        'step 1'
        if(result.bool){
            var target=trigger.target;
            player.logSkill('zqpodi',target);
            target.addTempSkill('zqpodi2');
            target.addToExpansion(result.cards,'giveAuto',target).gaintag.add('zqpodi2');
            }
        },
                ai:{
                    "unequip_ai":true,
                    "directHit_ai":true,
                skillTagFilter:function(player,tag,arg){
            if(get.attitude(player,arg.target)>0) return false;
            if(tag=='directHit_ai') return arg.target.hp>=Math.max(1,arg.target.countCards('h')-1);
            if(arg&&arg.target.getEquip(2)) return true;
            return false;
                },
                },
            group:"zqpodi3"
            },
            "zqpodi3":{
                direct:true,
                trigger:{
                    player:"useCardBegin",
                },
                logTarget:"target",
                check:function(event,player){
                    return get.attitude(player,event.target)<=0;
                },
                filter:function(event,player){
                    return event.targets.length==1;
                },
                content:function(){
                     player.addTempSkill('zqpodi4','useCardAfter');
                },
                ai:{
                    threaten:0.5,
                },
            },
            "zqpodi4":{
                trigger:{
                    source:"damageBegin",
                },
                direct:true,
                filter:function(event){
                    return event.card;
                },
                content:function(){
                    trigger.num+=player.countMark('zqxushi');
                },
            },
            "zqpodi2":{
                trigger:{
                    global:"phaseEnd",
                },
                locked:true,
                forced:true,
                popup:false,
                charlotte:true,
                filter:function(event,player){
                    return player.getExpansions('zqpodi2').length>0;
                },
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('zqpodi2');
                    player.gain(cards,'draw');
                    game.log(player,'收回了'+get.cnNumber(cards.length)+'张置于武将上的牌');
                    'step 1'
                    player.removeSkill('zqpodi2');
                },
                intro:{
                    markcount:"expansion",
                    mark:function(dialog,storage,player){
                        var cards=player.getExpansions('zqpodi2');
                        if(player.isUnderControl(true)) dialog.addAuto(cards);
                        else return '共有'+get.cnNumber(cards.length)+'张牌';
                    },
                },
            },
            zqyicheng:{
                audio:["pojun",2],
                trigger:{
                    player:"phaseJieshuBegin",
                },
                forced:true,
                frequent:true,
                preHidden:true,
            filter:function(event,player){
                return !player.getHistory('sourceDamage').length;
            },
            content:function(){
                'step 0'
                player.draw(2);
                'step 1'
                for(var i in player.storage){
                    player.removeMark(i,player.storage[i],true);
                }
                'step 2'
                player.addTempSkill('zqyicheng2',{player:'phaseBegin'});
            },
            },
            zqyicheng2:{
            mod:{
                targetEnabled:function(card,player,target,now){
                    if(player.countCards('h')<=target.countCards('h')){
                        if(card.name=='sha') return false;
                    }
                },
            },
            },
            zqdingqian: {
                group: "zqdingqian_gain",
                trigger: {
                    player: ["phaseZhunbeiBegin", "damageEnd"],
                },
                filter: function (event, player) {
                    return game.hasPlayer(function (current) {
                        return current != player && !current.hasSkill("zqdingqian_mark");
                    });
                },
                forced: true,
                content: function () {
                    "step 0"
                    player.chooseTarget(true, "请选择要获得「谦」的角色", function (card, player, target) {
                        return !target.hasSkill("zqdingqian_mark") && target != player;
                    }).set('ai', function (target) {
                        return -get.attitude(player, target);
                    });
                    "step 1"
                    if (result.bool) {
                        player.line(result.targets[0], 'green');
                        result.targets[0].addSkill("zqdingqian_mark");
                    }
                },
                subSkill: {
                    mark: {
                        mark: true,
                        marktext: "谦",
                        intro: {
                            content: "已获得「谦」",
                        },
                        sub: true,
                    },
                    gain: {
                        trigger: {
                            global: "gainAfter",
                        },
                        audio: "zqdingqian",
                        filter: function (event, player) {
                            if (event.parent.parent.name == 'phaseDraw') return false;
                            if (event.player==player) return false;
                            if(player.countCards("h")>player.maxHp) return false;
                            return event.cards && event.cards.length > 0 && event.player.hasSkill("zqdingqian_mark");
                        },
                        forced: true,
                        content: function () {
                           player.draw();
                            
                        },
                        sub: true,
                    },
                },
            },
            zqguilv: {
                trigger: {
                    player: "phaseUseBegin",
                },
                direct: true,
                content: function () {
                    "step 0"
                    player.chooseTarget("是否发动〖规虑〗？选择一名角色为目标", function (card, player, target) {
                        return target != player;
                    }).set('ai', function (target) {
                        if (get.attitude(player, target) < 0 && target.countCards("h") <= player.countCards("h")) return 10;
                        return get.attitude(player, target);
                    });
                    "step 1"
                    if (result.bool) {
                        player.logSkill("zqguilv", result.targets);
                        player.draw();
                        player.addTempSkill("zqguilv2");
                        result.targets[0].draw();
                        result.targets[0].addTempSkill("zqguilv3");
                    }
                },
            },
            "zqguilv2": {
                trigger: {
                    player: "phaseUseEnd",
                },
                direct: true,
                filter: function (event, player) {
                    return game.hasPlayer(function (current) {
                        return current != player && current.hasSkill("zqguilv3");
                    });
                },
                content: function () {
                    "step 0"
                    event.list = game.filterPlayer(function (current) {
                        return current.hasSkill("zqguilv3");
                    });
                    event.current = event.list.shift();
                    if (event.current.countCards("h") <= player.countCards("h")) {
                        event.goto(1);
                    }
                    else event.finish();
                    "step 1"
                    player.chooseBool('是否对' + get.translation(event.current) + '造成1点火焰伤害？或点取消与其各回复1点体力').ai = function () {
                        return get.damageEffect(event.current, player, player) > 0
                    };
                    "step 2"
                    if (result.bool) {
                        player.logSkill("zqguilv", event.current);
                        event.current.damage('fire');
                    }
                    else {
                        player.logSkill("zqguilv", event.current);
                        event.current.recover();
                        player.recover();
                    }
                },
            },
            "zqguilv3": {
                charlotte: true,
            },
            zqyinfeng: {
                locked: true,
                group: ["zqyinfeng_1", "zqyinfeng_2", "zqyinfeng_3", "zqyinfeng_4", "zqyinfeng_5"],
                subSkill: {
                    "1": {
                        audio: "zqyinfeng",
                        trigger: {
                            player: "linkBegin",
                        },
                        forced: true,
                        filter: function (event, player) {
                            return !player.isLinked();
                        },
                        content: function () {
                            trigger.cancel();
                        },
                        ai: {
                            effect: {
                                target: function (card) {
                                    if (card.name == 'tiesuo') return 'zeroplayertarget';
                                },
                            },
                        },
                        sub: true,
                    },
                    "2": {
                        audio: "zqyinfeng",
                        trigger: {
                            player: "turnOverBefore",
                        },
                        priority: 20,
                        forced: true,
                        filter: function (event, player) {
                            return !player.isTurnedOver();
                        },
                        content: function () {
                            trigger.cancel();
                            game.log(player, '取消了翻面');
                        },
                        ai: {
                            noturn: true,
                        },
                        sub: true,
                    },
                    "3": {
                        mod: {
                            targetEnabled: function (card, player, target) {
                                if (get.type(card) == 'delay') return false;
                            },
                        },
                        sub: true,
                    },
                    "4": {
                        ai: {
                            noCompareTarget: true,
                        },
                        sub: true,
                    },
                    "5": {
                        audio: "zqyinfeng",
                        trigger: {
                            player: "damageEnd",
                        },
                        forced: true,
                        content: function () {
                            player.addTempSkill("zqyinfeng_6", { player: "phaseBegin" });
                        },
                        sub: true,
                    },
                    "6": {
                        audio: "zqyinfeng",
                        trigger: {
                            player: "damageBegin4",
                        },
                        forced: true,
                        mark: true,
                        intro: {
                            content: "防止你受到的所有伤害直至你下回合开始",
                        },
                        content: function () {
                            trigger.cancel();
                        },
                        ai: {
                            nofire: true,
                            nothunder: true,
                            nodamage: true,
                            effect: {
                                target: function (card, player, target, current) {
                                    if (get.tag(card, 'damage')) return [0, 0];
                                }
                            },
                        },
                        sub: true,
                    },
                },
            },
            zqtaohui: {
                group: "zqtaohui_1",
                trigger: {
                    player: "phaseUseBegin",
                },
                forced: true,
                content: function () {
                    var num = Math.min(5, game.roundNumber);
                    player.draw(num);
                },
                subSkill: {
                    "1": {
                        mod: {
                            maxHandcard: function (player, num) {
                                return num += Math.min(5, game.roundNumber);
                            },
                        },
                        sub: true,
                    },
                },
            },
            zqlinhuang: {
                group: "zqlinhuang_use",
                trigger: {
                    player: "loseAfter",
                    global: "gameDrawAfter"
                },
                intro: {
                    content: "共有#枚「心」"
                },
                marktext: "心",
                forced: true,
                filter: function (event, player) {
                    var num = game.countPlayer();
                    if (player.countMark("zqlinhuang") >= num) return false;
                    if (event.name == "lose") {
                        var evt = event.getParent();
                        return evt.name != "useCard";
                    }
                    else return true;
                },
                content: function () {
                    player.addMark("zqlinhuang", 1);
                },
                subSkill: {
                    use: {
                        enable: 'chooseToUse',
                        audio: "zqlinhuang",
                        filter: function (event, player) {
                            if (!player.countMark("zqlinhuang")) return false;
                            return event.filterCard({ name: 'sha' }, player, event) ||
                                event.filterCard({ name: 'wuxie' }, player, event) ||
                                event.filterCard({ name: 'shan' }, player, event);
                        },
                        chooseButton: {
                            dialog: function (event, player) {
                                var list = [];
                                if (event.filterCard({ name: 'sha' }, player, event)) {
                                    list.push(['基本', '', 'sha']);
                                    for (var j of lib.inpile_nature) list.push(['基本', '', 'sha', j]);
                                }
                                if (event.filterCard({ name: 'wuxie' }, player, event)) {
                                    list.push(['锦囊', '', 'wuxie']);
                                }
                                if (event.filterCard({ name: 'shan' }, player, event)) {
                                    list.push(['基本', '', 'shan']);
                                }
                                return ui.create.dialog('鳞煌', [list, 'vcard'], 'hidden');
                            },
                            check: function (button) {
                                var player = _status.event.player;
                                var card = { name: button.link[2], nature: button.link[3] };
                                if (card.name == 'sha') {
                                    if (card.nature == 'fire') return 2.95;
                                    else return 2.9;
                                }
                                else if (card.name == 'wuxie' || card.name == 'shan') {
                                    return 4;
                                }
                            },
                            backup: function (links, player) {
                                return {
                                    filterCard: function () { return false },
                                    viewAs: { name: links[0][2], nature: links[0][3], isCard: true },
                                    audio: "zqlinhuang",
                                    selectCard: -1,
                                    popname: true,
                                    precontent: function () {
                                        player.removeMark("zqlinhuang");
                                    },
                                }
                            },
                            prompt: function (links, player) {
                                return '选择' + get.translation(links[0][3] || '') + get.translation(links[0][2]) + '的目标';
                            }
                        },
                        hiddenCard: function (player, name) {
                            return (name == "sha" || name == "shan" || name == "wuxie") && player.countMark('zqlinhuang') > 0;
                        },
                        ai: {
                            order: function () {
                                var player = _status.event.player;
                                var event = _status.event;
                                if (event.filterCard({ name: 'wuxie' }, player, event) || event.filterCard({ name: 'shan' }, player, event)) {
                                    return 4;
                                }
                                if (event.filterCard({ name: 'sha' }, player, event)) {
                                    return 2.9;
                                }
                            },
                            respondSha: true,
                            respondShan: true,
                            skillTagFilter: function (player, tag, arg) {
                                if (!player.countMark("zqlinhuang")) return false;
                                return true;
                            },
                            result: {
                                player: function (player) {
                                    return 1;
                                }
                            }
                        }
                    }
                }
            },
            zqyuwang: {
                init: function (player) {
                    player.storage.zqyuwang = 0;
                },
                mod: {
                    maxHandcard: function (player, num) {
                        return num + player.storage.zqyuwang;
                    }
                },
                intro: {
                    content: '手牌上限+#'
                },
                enable: "phaseUse",
                group: "zqyuwang2",
                filter: function (event, player) {
                    return player.countCards("he") > 0;
                },
                usable: 1,
                filterCard: function (card, player) {
                    return true;
                },
                check: function (card) {
                    if (card.name == "wuxie" || card.name == "sha" || card.name == "shan") return 10;
                    else return 10 - get.value(card);
                },
                position: "he",
                discard: false,
                lose: false,
                delay: false,
                content: function () {
                    "step 0"
                    player.loseToDiscardpile(cards[0]);
                    player.draw();
                    "step 1"
                    var type = get.type2(cards[0]);
                    if (type == "basic") {
                        player.draw();
                        player.markSkill("zqyuwang");
                        player.storage.zqyuwang++;
                        event.finish();
                    }
                    if (type == "equip") {
                        player.moveCard();
                        event.finish();
                    }
                    if (type == "trick") {
                        player.chooseTarget("令一名角色回复1点体力", function (card, player, target) {
                            return target.isDamaged();
                        }).set('ai', function (target) {
                            var player = _status.event.player;
                            return get.recoverEffect(target, player, player);
                        });
                    }
                    "step 2"
                    if (result.bool) result.targets[0].recover();
                },
                ai: {
                    order: 10,
                    result: {
                        player: function (player) {
                            return 1;
                        }
                    }
                },
            },
            zqyuwang2: {
                charlotte: true,
                trigger: {
                    player: "phaseAfter"
                },
                forced: true,
                popup: false,
                content: function () {
                    player.storage.zqyuwang = 0;
                    player.unmarkSkill("zqyuwang");
                }
            },
            zqdouzhuan: {
                enable: "phaseUse",
                usable: 1,
                filterTarget: true,
                selectTarget: 1,
                multitarget: true,
                multiline: true,
                prompt: "令一名角色获得或移除「阵」",
                content: function () {
                    for (var i = 0; i < targets.length; i++) {
                        if (!targets[i].hasSkill("zqzhen")) targets[i].addSkill("zqzhen");
                        else targets[i].removeSkill("zqzhen");
                    }
                },
                ai: {
                    order: 7,
                    result: {
                        target: function (player, target) {
                            if (!target.hasSkill("zqzhen")) return 1;
                            return -1;
                        }
                    },
                },
            },
            zqzhen: {
                mark: true,
                marktext: "阵",
                intro: {
                    content: "已成为阵列角色"
                },
                popup: false,
                charlotte: true,
                trigger: {
                    player: "useCard",
                },
                forced: true,
                filter: function (event, player) {
                    return event.card && get.tag(event.card, 'damage') && game.hasPlayer(function (current) {
                        return !current.hasSkill("zqzhen");
                    });
                },
                content: function () {
                    trigger.directHit.addArray(game.filterPlayer(function (current) {
                        return !current.hasSkill("zqzhen");
                    }));
                },
                ai: {
                    directHit_ai: true,
                    skillTagFilter: function (player, tag, arg) {
                        return !arg.target.hasSkill("zqzhen");
                    },
                },
            },
            zqxingsuo: {
                global: ["zqxingsuo2", "zqxingsuo3"],
                unique: true,
            },
            zqxingsuo2: {
                trigger: {
                    player: "useCardToPlayered"
                },
                forced: true,
                audio: "zqxingsuo",
                filter: function (event, player) {
                    if (player.hasSkill("zqzhen")) return false;
                    return event.targets.length == 1 && event.target.hasSkill("zqzhen") && get.tag(event.card, 'damage');
                },
                content: function () {
                    "step 0"
                    player.logSkill("zqxingsuo");
                    var card=player.getCards('he').randomGet();
                    if(card) player.discard(card);
                },
                
            },
            zqxingsuo3: {
                trigger: {
                    player: "damageBegin3"
                },
                forced: true,
                audio: "zqxingsuo",
                filter: function (event, player) {
                    if (player.hasSkill("zqzhen")) return false;
                    return player.previous.hasSkill("zqzhen") && player.next.hasSkill("zqzhen") && player.previous != player.next;
                },
                content: function () {
                    player.logSkill("zqxingsuo");
                    trigger.num++;
                },
                ai: {
                    effect: {
                        target: function (card, player, target, current) {
                            if (get.tag(card, 'damage') && target.previous.hasSkill("zqzhen") && target.next.hasSkill("zqzhen") && target.previous != target.next) return [1, -2];
                        }
                    }
                }
            },
            zqtianji: {
                group: ["zqtianji_draw", "zqtianji_discard", "zqtianji_storage", "zqtianji_clear"],
                trigger: {
                    global: "phaseEnd"
                },
                check: function (event, player) {
                    return player.maxHp > 3
                },
                filter: function (event, player) {
                    return !player.hasSkill("zqtianji2") && event.player != player;
                },
                content: function () {
                    "step 0"
                    player.addTempSkill("zqtianji2", "roundStart");
                    "step 1"
                    player.loseMaxHp();
                    "step 2"
                    var next = player.insertPhase();
                    event.next.remove(next);
                    trigger.next.push(next);
                },
                subSkill: {
                    draw: {
                        trigger: { player: 'phaseDrawBegin2' },
                        audio: "zqtianji",
                        forced: true,
                        filter: function (event, player) {
                            return !event.numFixed && player.storage.zqtianji == true;
                        },
                        content: function () {
                            trigger.num++;
                        },
                    },
                    discard: {
                        trigger: { player: 'phaseDiscardBefore' },
                        audio: "zqtianji",
                        forced: true,
                        filter: function (event, player) {
                            return player.storage.zqtianji == true;
                        },
                        content: function () {
                            trigger.cancel();
                        }
                    },
                    storage: {
                        trigger: { player: "phaseBefore" },
                        forced: true,
                        popup: false,
                        filter: function (event, player) {
                            return event.skill;
                        },
                        content: function () {
                            player.storage.zqtianji = true;
                        }
                    },
                    clear: {
                        trigger: { player: "phaseEnd" },
                        forced: true,
                        popup: false,
                        filter: function (event, player) {
                            return event.skill;
                        },
                        content: function () {
                            delete player.storage.zqtianji;
                        }
                    }
                },
            },
            zqtianji2: {},
            zqfangze: {
                trigger: {
                    global: "phaseBegin"
                },
                direct: true,
                filter: function (event, player) {
                    if (event.player == player) return true;
                    return player.countCards("he");
                },
                content: function () {
                    "step 0"
                    if (trigger.player != player) player.chooseCard(get.prompt2("zqfangze"), [1, 3], "he").set('ai', function (card) {
                        if (get.attitude(player, trigger.player) <= 0) return 0;
                        return 7 - get.value(card);
                    });
                    else {
                        player.logSkill("zqfangze");
                        player.draw(2);
                        event.goto(2);
                    }
                    "step 1"
                    if (result.bool) {
                        player.logSkill("zqfangze", trigger.player);
                        player.give(result.cards, trigger.player, true);
                        event.num = result.cards.length;
                    }
                    else event.finish();
                    "step 2"
                    if (trigger.player != player) {
                        player.discardPlayerCard(trigger.player, "hej", [1, event.num], "visible").set('ai', function (card) {
                            return 3 - get.value(card);
                        });
                    }
                    else {
                        player.discardPlayerCard(player, "hej", [1, 2], "visible").set('ai', function (card) {
                            return 3 - get.value(card);
                        });
                    }
                    "step 3"
                    event.hh = false;
                    event.ee = false
                    if (result.bool && result.cards) {
                        for (var i = 0; i < result.cards.length; i++) {
                            if (result.cards[i].original == 'h') {
                                event.hh = true;
                            }
                            if (result.cards[i].original == 'e') {
                                event.ee = true;
                            }
                        }
                    }
                    "step 4"
                    if (event.hh) player.chooseBool("是否令" + get.translation(trigger.player) + "摸两张牌？");
                    "step 5"
                    if (result.bool && event.hh) trigger.player.draw(2);
                    "step 6"
                    if (event.ee) {
                        player.chooseBool("是否令" + get.translation(trigger.player) + "回复1点体力并且使用牌无距离次数限制？");
                    }
                    "step 7"
                    if (result.bool && event.ee) {
                        trigger.player.recover();
                        trigger.player.addTempSkill("yuiko_fenglun2");
                    }
                }
            },
            zqfumeng: {
                mod: {
                    maxHandcard: function (player, num) {
                        return num + player.hp;
                    },
                },
                trigger: {
                    player: "damageEnd"
                },
                forced: true,
                content: function () {
                    "step 0"
                    player.draw(2);
                    "step 1"
                    if (trigger.source && trigger.source.countCards("h") >= player.countCards("h")) player.addTempSkill("mianyi");
                }
            },
            zqyurong: {
                enable: "phaseUse",
                discard: false,
                lose: false,
                delay: false,
                filter: function (event, player) {
                    if (player.getStat().skill.zqyurong >= 1 + player.getDamagedHp()) return false;
                    return player.countCards("he") > 0;
                },
                position: "he",
                filterCard: true,
                filterTarget: function (card, player, target) {
                    if (player == target) return false;
                    if (get.suit(ui.selected.cards[0]) == "diamond") return player.canUse({ name: 'lebu', cards: ui.selected.cards }, target);
                    if (get.suit(ui.selected.cards[0]) == "club") return target.countCards("he") > 0;
                    return true;
                },
                check: function (card) {
                    if (get.suit(card) == "spade") return 10;
                    return 7 - get.value(card);
                },
                content: function () {
                    "step 0"
                    var card = cards;
                    if (get.suit(card) == "diamond") {
                        player.useCard({ name: 'lebu' }, target, card).audio = false;
                        player.draw();
                        event.finish();
                    }
                    if (get.suit(card) == "club") {
                        player.discard(card);
                        target.chooseToDiscard("he", 3, true);
                        event.finish();
                    }
                    if (get.suit(card) == "spade") {
                        player.give(card, target, true);
                        target.draw();
                        target.turnOver();
                        event.finish();
                    }
                    if (get.suit(card) == "heart") {
                        player.give(card, target, true);
                        target.chooseCard("将一张手牌当【无中生有】对" + get.translation(player) + "使用", true).set('ai', function (card) {
                            var att = get.attitude(target, player);
                            if (att < 0 && get.color(card) == "black") return 10;
                            if (att > 0 && get.color(card) == "red") return 10;
                            return 7 - get.value(card);
                        });
                    }
                    "step 1"
                    if (result.bool) {
                        target.useCard({ name: "wuzhong" }, player, result.cards);
                    }
                },
                ai: {
                    order: 4,
                    result: {
                        target: function (player, target) {
                            if (ui.selected.cards.length && get.suit(ui.selected.cards[0]) == "spade") {
                                if (target.isTurnedOver()) return 10;
                                return -10;
                            }
                            return -1;
                        }
                    },
                }
            },
            zqfuhua: {
                trigger: {
                    player: "damageEnd",
                    target: "useCardToTarget"
                },
                filter: function (event, player) {
                    if (event.name == "useCardToTarget") return get.color(event.card) == "red" && get.type(event.card) != "equip";
                    return true;
                },
                content: function () {
                    "step 0"
                    if (event.triggername == "damageEnd") event.num = trigger.num;
                    "step 1"
                    player.chooseControl("一张", "两张").ai = function (event, player) {
                        if (event.triggername == "damageEnd") var target = trigger.player;
                        else if (trigger.source) var target = trigger.source;
                        else return 1;
                        if (get.attitude(player, target) <= 0) return 0;
                        return 1;
                    }
                    "step 2"
                    if (result.control == "一张") player.draw();
                    if (result.control == "两张") {
                        player.draw(2);
                        if ((trigger.source && trigger.source != player) || (event.triggername == "useCardToTarget" && trigger.player != player)) {
                            player.chooseCard("he", "请选择要给出的牌", true);
                        }
                        else event.goto(4);
                    }
                    "step 3"
                    if (result.cards) {
                        if (event.triggername == "useCardToTarget") var target = trigger.player;
                        else if (trigger.source) var target = trigger.source;
                        player.give(result.cards, target, true);
                    }
                    "step 4"
                    if (--event.num > 0) {
                        player.chooseBool(get.prompt2("zqfuhua"));
                    }
                    else {
                        event.finish();
                    }
                    "step 5"
                    if (result.bool) {
                        player.logSkill("zqfuhua");
                        event.goto(1);
                    }
                }
            },
            zqluanshi: {
                trigger: {
                    global: "phaseUseBegin",
                },
                filter: function (event, player) {
                    return event.player.isAlive();
                },
                logTarget: "player",
                content: function () {
                    "step 0"
                    if (!trigger.player.isAlive()) event.finish();
                    "step 1"
                    trigger.player.judge();
                    "step 2"
                    player.storage.zqluanshi = get.color(result.card);
                    "step 3"
                    player.chooseToDiscard("he").set('ai', function (card) {
                        if (get.attitude(player, trigger.player) > 3) return get.color(card, player) != player.storage.zqluanshi;
                        if (get.attitude(player, trigger.player) < 0) return get.color(card, player) == player.storage.zqluanshi;
                        return -1;
                    });
                    "step 4"
                    if (result.bool) {
                        if (get.color(result.cards[0]) != player.storage.zqluanshi) {
                            trigger.player.draw(2);
                        }
                        else trigger.player.damage("thunder");
                    }
                    else event.finish();
                },
            },
            zqtaiping: {
                zhuSkill: true,
                trigger: {
                    player: "phaseJieshuBegin",
                },
                filter: function (event, player) {
                    return player.hasZhuSkill("zqtaiping");
                },
                direct: true,
                content: function () {
                    "step 0"
                    _status.noclearcountdown = true;
                    var num1 = game.countPlayer();
                    var num2 = game.countPlayer(function (current) {
                        return current.group == "qun";
                    });
                    if (num1 != num2) {
                        player.chooseControl('cancel2').set('choiceList', [
                            '令一名群势力角色获得〖雷击〗、〖鬼道〗或〖天妒〗',
                            '令一名角色将势力改为群',
                        ]).set('prompt', get.prompt('zqtaiping'));
                    }
                    else {
                        player.chooseControl('ok', 'cancel2').set('prompt', get.prompt2('zqtaiping'));
                    }
                    "step 1"
                    if (result.control == 'cancel2') {
                        delete _status.noclearcountdown;
                        if (!_status.noclearcountdown) {
                            game.stopCountChoose();
                        }
                        event.finish();
                        return;
                    }
                    else if (result.index == 1) {
                        player.chooseTarget('请选择一名角色，将其势力改为群', true, function (card, player, target) {
                            return target.group != "qun";
                        });
                    }
                    else {
                        delete _status.noclearcountdown;
                        if (!_status.noclearcountdown) {
                            game.stopCountChoose();
                        }
                        player.chooseTarget(function (card, player, target) {
                            return target.group == "qun";
                        }, "请选择一名角色", true).set('ai', function (target) {
                            return get.attitude(player, target);
                        });
                        event.goto(3);
                    }
                    "step 2"
                    delete _status.noclearcountdown;
                    if (!_status.noclearcountdown) {
                        game.stopCountChoose();
                    }
                    if (result.bool) {
                        var target = result.targets[0];
                        player.logSkill('zqtaiping', target);
                        target.group = "qun";
                        event.finish();
                    }
                    else event.finish();
                    "step 3"
                    if (result.bool) {
                        var target = result.targets[0];
                        player.logSkill('zqtaiping', target);
                        event.target = target;
                        player.chooseControl('xinleiji', 'xinguidao', 'tiandu').set('prompt', '令' + get.translation(target) + '获得一项技能').ai = function (event, player) {
                            if (target.hasSkill("xinleiji") && !target.hasSkill("xinguidao")) return 1;
                            if (target.hasSkill("xinleiji") && target.hasSkill("xinguidao")) return 2;
                            return 0;
                        }
                    }
                    "step 4"
                    event.target.addSkillLog(result.control);
                },
            },
            zqwendao: {
                mod: {
                    maxHandcard: function (player, num) {
                        return num + player.storage.zqwendao;
                    }
                },
                intro: {
                    content: '手牌上限+#'
                },
                init: function (player) {
                    player.storage.zqwendao = 0;
                },
                group: ["zqwendao_maxhand", "zqwendao_clear"],
                trigger: {
                    player: "useCardAfter"
                },
                forced: true,
                usable: 2,
                filter: function (event, player) {
                    if (get.type(event.card) == "equip") return false;
                    return true;
                },
                content: function () {
                    if (get.type(trigger.card) == "basic") {
                        var card = get.cardPile(function (card) {
                            return get.type2(card) == "trick";
                        });
                    }
                    else {
                        var card = get.cardPile(function (card) {
                            return get.type(card) == "basic";
                        });
                    }
                    if (card) {
                        player.gain(card, 'gain2');
                    }
                },
                subSkill: {
                    maxhand: {
                        trigger: {
                            player: "useCardAfter"
                        },
                        forced: true,
                        popup: false,
                        lastDo: true,
                        filter: function (event, player) {
                            if (get.type(event.card) == "basic") return false;
                            return player.storage.zqwendao < 2;
                        },
                        content: function () {
                            player.storage.zqwendao++;
                            player.markSkill("zqwendao");
                        }
                    },
                    clear: {
                        trigger: { global: 'phaseAfter' },
                        silent: true,
                        content: function () {
                            player.storage.zqwendao = 0;
                            player.unmarkSkill("zqwendao");
                        }
                    }
                }
            },
            zqzhaoce: {
                group: "zqzhaoce_storage",
                intro: {
                    content: function (storage, player, skill) {
                        return '已记录的势力：' + get.translation(storage);
                    }
                },
                mark: true,
                init: function (player) {
                    if (!player.storage.zqzhaoce) player.storage.zqzhaoce = [];
                },
                enable: "phaseUse",
                filter: function (event, player) {
                    return player.storage.zqzhaoce.length > 0;
                },
                usable: 1,
                content: function () {
                    "step 0"
                    var controls = [];
                    if (player.storage.zqzhaoce.contains("shu")) controls.push("shu");
                    if (player.storage.zqzhaoce.contains("qun")) controls.push("qun");
                    if (player.storage.zqzhaoce.contains("wu")) controls.push("wu");
                    if (player.storage.zqzhaoce.contains("wei")) controls.push("wei");
                    if (player.storage.zqzhaoce.contains("shen")) controls.push("shen");
                    player.chooseControl(controls).set("prompt", "昭策：请选择一种势力");
                    "step 1"
                    var list;
                    if (_status.characterlist) {
                        list = [];
                        for (var i = 0; i < _status.characterlist.length; i++) {
                            var name = _status.characterlist[i];
                            if (lib.character[name][1] == result.control) list.push(name);
                        }
                    }
                    else if (_status.connectMode) {
                                list = get.charactersOL(function (i) {
                                    return lib.character[i][1] != result.control;
                                });
                            }
                            else {
                                list = get.gainableCharacters(function (info) {
                                    return info[1] == result.control;
                                });
                            }
                    var players = game.players.concat(game.dead);
                    for (var i = 0; i < players.length; i++) {
                        list.remove(players[i].name);
                        list.remove(players[i].name1);
                        list.remove(players[i].name2);
                    }
                    if (list.length > 0) {
                        player.chooseButton(true).set('ai', function (button) {
                            return Math.random();
                        }).set('createDialog', ['请选择一张武将牌', [list.randomGets(5), 'character']]);
                    }
                    else event.finish();
                    "step 2"
                    var link = result.links[0];
                    event.link = link;
                    "step 3"
                    var list = [];
                    var listm = [];
                    listm = lib.character[event.link][3];
                    var func = function (skill) {
                        var info = get.info(skill);
                            if(info.unique||info.limited||info.juexingji||info.charlotte||info.zhuSkill||info.hiddenSkill||info.dutySkill) return false;
                        return true;
                    };
                    for (var i = 0; i < listm.length; i++) {
                        if (func(listm[i])) list.add(listm[i]);
                    }
                    event.skills = list;
                    player.chooseControl(list).set("prompt", "请选择一个技能");
                    "step 4"
                    var skill = result.control;
                    event.skill = skill;
                    player.chooseTarget("请选择要获得技能的角色", function (card, player, target) {
                        return true;
                    }).set('ai', function (target) {
                        return get.attitude(player, target);
                    });
                    "step 5"
                    if (result.bool) {
                        var target = result.targets[0];
                        event.target = target;
                        player.line(target);
                        if (target.storage.zqzhaoce2) target.removeSkill(target.storage.zqzhaoce2);
                        target.storage.zqzhaoce2 = event.skill;
                        target.addSkillLog(event.skill);
                    }
                },
                ai: {
                    order: 7,
                    result: {
                        player: function (player) {
                            return 1;
                        }
                    }
                },
                subSkill: {
                    storage: {
                        trigger: {
                            player: "damageEnd",
                            global: "roundStart"
                        },
                        forced: true,
                        locked: false,
                        audio: "zqzhaoce",
                        filter: function (event, player) {
                            return player.storage.zqzhaoce.length < 5;
                        },
                        content: function () {
                            if (player.storage.zqzhaoce.length == 0) player.storage.zqzhaoce.add("shu");
                            else if (player.storage.zqzhaoce.length == 1) player.storage.zqzhaoce.add("qun");
                            else if (player.storage.zqzhaoce.length == 2) player.storage.zqzhaoce.add("wu");
                            else if (player.storage.zqzhaoce.length == 3) player.storage.zqzhaoce.add("wei");
                            else if (player.storage.zqzhaoce.length == 4) player.storage.zqzhaoce.add("shen");
                        }
                    }
                }
            },
            zqkuitian: {
                enable: "phaseUse",
                usable: 1,
                content: function () {
                    "step 0"
                    player.judge();
                    "step 1"
                    var color = get.color(result.card);
                    event.card = result.card;
                    event.color = color;
                    if (!player.countCards('he', { color: color })) {
                        player.gain(result.card, "gain2");
                        event.finish();
                    }
                    else {
                        if (color == "red") var str = "狂风";
                        else var str = "大雾";
                        player.chooseControl(function () {
                            return Math.random() < 0.5 ? '选项一' : '选项二';
                        }).set('prompt', '窥天').set('choiceList', ['获得' + get.translation(result.card), '令至多两名角色处于' + str + '状态直至你下回合开始']);
                    }
                    "step 2"
                    if (result.control == "选项一") {
                        player.gain(event.card, "gain2");
                        event.finish();
                    }
                    else {
                        player.addSkill("dawu3");
                        player.chooseToDiscard(true, "he", { color: event.color });
                        if (event.color == "red") var str = "狂风";
                        else var str = "大雾";
                        player.chooseTarget([1, 2], "选择角色获得" + str + "标记").set('ai', function (target) {
                            if (event.color == "red") return -get.attitude(_status.event.player, target);
                            else return get.attitude(_status.event.player, target);
                        });
                    }
                    "step 3"
                    if (result.bool) {
                        if (event.color == "red") var skill = "kuangfeng2";
                        else var skill = "dawu2";
                        var length = result.targets.length;
                        for (var i = 0; i < length; i++) {
                            result.targets[i].addSkill(skill);
                        }
                    }
                },
                ai: {
                    order: 7,
                    result: {
                        player: function (player) {
                            return 1;
                        }
                    }
                },
            },							

        },
        translate:{
            "zq_shenxusheng":"刘少咤 ",
            "zq_shenxusheng_ab":"刘少咤",
            "zq_luxun":"邵爱民 ",
            "zq_luxun_ab":"邵爱民",
            "zq_simayi":"回世杰 ",
            "zq_simayi_ab":"回世杰",
            "zq_zhaoyun":"张路 ",
            "zq_zhaoyun_ab":"张路",
            "zq_shen_zhugeliang":"刘晓航 ",
            "zq_shen_zhugeliang_ab":"刘晓航",
            "zq_xiaoqiao":"贺茜 ",
            "zq_xiaoqiao_ab":"贺茜",
            "zq_daqiao":"王佳宁",
            "zq_daqiao_ab":"王佳宁",
            "zq_zhangjiao":"角完 ",
            "zq_zhangjiao_ab":"角完",
            "zq_zhugeliang":"韩朋浩 ",
            "zq_zhugeliang_ab":"韩朋浩",
            zqxushi:"蓄势",
            "zqxushi_info":"当你造成伤害后，获得一个标记「破」。",
            zqpodi:"破敌",
            "zqpodi_info":"当你使用牌指定其他角色为唯一目标后，可以将其至多X张牌扣置于该角色的武将上(X为此牌点数)，若如此做，当前回合结束后该角色获得这些牌。当你使用牌造成伤害时，若此牌指定的目标唯一，伤害+Y (Y为「破」的标记数)。",
            "zqpodi2":"破敌",
            "zqpodi3":"破敌",
            "zqpodi4":"破敌",
            zqyicheng:"安平",
            "zqyicheng_info":"锁定技，你的回合结束时，若本回合你未能造成任何伤害，摸2张牌并清除武将上除「置于武将上的牌」和「记录牌名」以外的任何标记，直到你的下个回合开始前，手牌数不大于你的角色使用【杀】时，不能指定你为目标。",
            "zqyicheng2":"安平",
            zqdingqian: "定谦",
            "zqdingqian_info": "锁定技，准备阶段或当你受到伤害后，你令一名没有「谦」的其他角色获得「谦」。当有「谦」的其他角色于其摸牌阶段外获得牌后，若你的手牌数不大于体力上限，你摸一张牌。",
            zqguilv: "规虑",
            "zqguilv_info": "出牌阶段开始时，你可与一名其他角色各摸一张牌，然后此阶段结束时，若其手牌数不大于你，你可对其造成1点火焰伤害或与其各回复1点体力。",
            "zqguilv2": "规虑",
            "zqguilv2_info": "",
            "zqguilv3": "规虑",
            "zqguilv3_info": "",
            zqyinfeng: "隐锋",
            "zqyinfeng_info": "锁定技，你不能翻面或横置，且不能成为延时锦囊牌或其他角色拼点的目标。当你受到伤害后，防止你受到的所有伤害直至你下回合开始。",
            zqtaohui: "韬晦",
            "zqtaohui_info": "锁定技，出牌阶段开始时，你摸X张牌。你的手牌上限+X（X为游戏轮数且至多为5）。",
            zqlinhuang: "心眼",
            "zqlinhuang_info": "游戏开始时或当你不因使用而失去牌后，若你「心」的数量小于场上存活角色数，则你获得1枚「心」。你可于合法时机移除1枚「心」并视为使用一张任意种类的【杀】、【闪】或【无懈可击】。",
            zqyuwang: "摸鱼",
            "zqyuwang_info": "出牌阶段限一次，你可重铸一张牌，然后若此牌为：基本牌，你摸一张牌且本回合手牌上限+1；锦囊牌，你可令一名角色回复1点体力；装备牌，你可移动场上一张牌。",
            zqdouzhuan: "斗转",
            zqdouzhuan_info: "出牌阶段限一次，你可选择一名角色，若其没有「阵」，则其获得「阵」，否则其移除「阵」（有「阵」的角色称为阵列角色）。",
            zqzhen: "阵",
            zqxingsuo: "星锁",
            zqxingsuo_info: "锁定技，非阵列角色不能响应阵列角色使用的带伤害标签的牌。当非阵列角色：①受到伤害时，若其上下家均为阵列角色且不为同一角色，此伤害+1；②使用带伤害标签的牌指定阵列角色为唯一目标后，其随机弃置一张牌。",
            zqxingsuo2: "星锁",
            zqxingsuo3: "星锁",
            zqtianji: "天汲",
            zqtianji_info: "每轮限一次，每名其他角色的回合结束后，你可减1点体力上限并执行一个额外的回合。在你的额外回合内，你于摸牌阶段多摸一张牌且跳过弃牌阶段。",
            zqfangze: "芳泽",
            "zqfangze_info": "每名其他角色/你的回合开始时，你可交给其至多三张牌/须摸两张牌，然后观看其手牌并弃置其区域里至多等量的牌，若此次弃置的牌来自其：手牌区，你可令其摸两张牌；装备区，你可令其回复1点体力且此回合使用牌无距离与次数限制。",
            zqfumeng: "浮梦",
            "zqfumeng_info": "锁定技，当你受到伤害后，你摸两张牌，然后若伤害来源的手牌数不小于你，防止你此回合受到的所有伤害。你的手牌上限+X（X为你的体力值）。",
            zqyurong: "玉容",
            "zqyurong_info": "出牌阶段限X次，你可选择一项：①将一张方块牌当【乐不思蜀】置入一名其他角色的判定区，然后摸一张牌；②交给一名其他角色一张红桃牌，然后其将一张手牌当【无中生有】对你使用；③弃置一张梅花牌并令一名其他角色弃置三张牌；④交给一名其他角色一张黑桃牌，然后其摸一张牌并翻面（X为你已损失的体力值+1）。",
            "zqyurong2": "玉容",
            "zqyurong2_info": "",
            zqfuhua: "浮华",
            "zqfuhua_info": "当你成为红色非装备牌的目标时/受到1点伤害后，你可选择一项：①摸一张牌；②摸两张牌，然后交给此牌使用者/伤害来源一张牌。",
            zqluanshi: "乱始",
            "zqluanshi_info": "每名角色的出牌阶段开始时，你可令其判定，然后你可弃置一张与判定结果颜色相同/不同的牌并对其造成１点雷电伤害/令其摸两张牌。",
            zqtaiping: "太平",
            "zqtaiping_info": "主公技，结束阶段，你可选择一项：①将一名角色的势力改为群；②令一名群势力角色获得〖雷击〗、〖鬼道〗或〖天妒〗。",
            zqwendao: "问道",
            "zqwendao_info": "锁定技，每回合限两次，当你使用基本/锦囊牌后，你获得一张锦囊/基本牌。当你使用一张非基本牌后，本回合你的手牌上限+1（至多+2）。",
            zqzhaoce: "昭策",
            "zqzhaoce_info": "出牌阶段限一次，你可选择一个已记录的势力并从该势力五张未登场的武将牌中选择一个技能，然后你可令一名角色失去上次以此法获得的技能并获得此技能。每轮游戏开始时或当你受到伤害后，你依序在本技能中记录如下势力：蜀·群·吴·魏·神。",
            zqkuitian: "窥天",
            "zqkuitian_info": "出牌阶段限一次，你可判定，然后选择一项：①获得生效后的判定牌；②弃置一张与判定结果颜色相同的牌，若此牌为红/黑色，你令至多两名角色处于“狂风”/“大雾”状态直至你下回合开始。",

 		},
 	    	};
 			if(lib.device||lib.node){
 				for(var i in ziqi.character){ziqi.character[i][4].push('ext:志臻扩展/'+i+'.jpg');}
 			}else{
 				for(var i in ziqi.character){ziqi.character[i][4].push('db:extension-志臻扩展:'+i+'.jpg');}
 			}
 			return ziqi;
 		});
 		lib.config.all.characters.push('ziqi');
	 	if(!lib.config.characters.contains('ziqi')) lib.config.characters.push('ziqi');
 		lib.translate['ziqi_character_config']='志臻扩展';
 		};
},
    editable:false,
help:{},config:{
    "qun":{
    "name":
    "<div uk-lightbox id='test1' style='display: block'>\n" + "<a class=\"uk-button uk-button-small uk-button-primary\"href=\"" + lib.assetURL + "extension/志臻扩展/images/qun.jpg\"><img src=\"" +lib.assetURL + "extension/志臻扩展/images/QQ.png\" width='32px' height='32px' style='vertical-align: middle;'>点击获得老校徽</a>\n"+"</div>",
    "clear":true,
    onclick:function(){
    this.name="<div uk-lightbox id='test1' style='display: block'>\n"+"<a class=\"uk-button uk-button-small uk-button-primary\"href=\"" + lib.assetURL + "extension/志臻扩展/images/qun.jpg\"><img src=\"" + lib.assetURL + "extension/志臻扩展/images/QQ.png\" width='32px' height='32px' style='vertical-align: middle;'>点击获得老校徽</a>\n"+"</div>"
    }
    },
},package:{
    intro:"另有卡图可以彩印面杀。",
    author:"志臻",
    diskURL:"",
    forumURL:"",
    version:"1.4",
},files:{"character":["zq_shenxusheng.jpg","zq_luxun.jpg","zq_simayi.jpg","zq_zhaoyun.jpg","zq_daqiao.jpg","zq_xiaoqiao.jpg","zq_zhangjiao.jpg","zq_zhugeliang.jpg","zq_shen_zhugeliang"],"card":[],"skill":[]}}})