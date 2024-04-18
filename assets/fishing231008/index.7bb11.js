window.__require=function e(t,i,n){function s(c,o){if(!i[c]){if(!t[c]){var h=c.split("/");if(h=h[h.length-1],!t[h]){var r="function"==typeof __require&&__require;if(!o&&r)return r(h,!0);if(a)return a(h,!0);throw new Error("Cannot find module '"+c+"'")}c=h}var d=i[c]={exports:{}};t[c][0].call(d.exports,function(e){return s(t[c][1][e]||e)},d,d.exports,e,t,i,n)}return i[c].exports}for(var a="function"==typeof __require&&__require,c=0;c<n.length;c++)s(n[c]);return s}({FishCtrl:[function(e,t){"use strict";cc._RF.push(t,"894aeR9xjtHGJ/hSR5fuJGh","FishCtrl");var i=e("GameControl");cc.Class({extends:cc.Component,properties:{},start:function(){},init:function(e,t,n){this.isDestroy=!1,this.type=e,this.trackNo=n,this.directionFlag=t,this.speed=i.curScene.getSpeedByType(e)},update:function(e){e>5||this.isDestroy||3!=i.curScene.gameState||(this.node.x+=e*this.speed*this.directionFlag,this.speed>500?this.node.y+=e*i.curScene.bgMoveSpeed*.85:this.node.y+=e*i.curScene.bgMoveSpeed,(this.node.x>=cc.winSize.width/2+this.node.width||this.node.x<=-cc.winSize.width/2-this.node.width)&&(7==this.type?(this.isDestroy=!0,this.node.destroy()):this.node.x>cc.winSize.width/2?this.node.x=-cc.winSize.width/2-this.node.width:this.node.x=cc.winSize.width/2+this.node.width),this.node.y+this.node.parent.y<-cc.winSize.height/2-this.node.height?(this.isDestroy=!0,this.node.destroy(),this.type<7&&(i.curScene.fishNum[this.trackNo]--,i.curScene.checkTrackNum())):this.node.y>-cc.winSize.height-this.node.height&&(this.isDestroy=!0,this.node.destroy(),this.type<7&&(i.curScene.fishNum[this.trackNo]--,i.curScene.checkTrackNum())))}}),cc._RF.pop()},{GameControl:void 0}],Fishing:[function(e,t){"use strict";cc._RF.push(t,"b77e5xcsd9B6YQl3jJ6uQv1","Fishing");var i=e("GameControl"),n=e("LoadResModule"),s=e("MathModule"),a=e("AdInfo"),c=e("StorageModule"),o=e("StatisticsModule"),h=e("AudioModule"),r=e("EngineCommon"),d=e("GameCommon");cc.Class({extends:cc.Component,properties:{cat:sp.Skeleton,remindTimes:cc.Label,bellLabel:cc.Label,warnAnima:cc.Animation,bg:cc.Node,fishHolder:cc.Node,fishRod:cc.Node,protectNode:cc.Node,baitHolder:cc.Node,basketHolder:cc.Node,panelHolder:cc.Node,settlementPanel:cc.Node,fishImage:{type:cc.SpriteFrame,default:[]}},onLoad:function(){i.curScene=this,lastSceneIndex=sceneIndex,sceneIndex=i.SceneName.fishing,d.handleEventPerScene(),r.enableCollide(),o.sceneStart("fishing")},onDestroy:function(){o.sceneEnd(),i.curScene=null},start:function(){var e=this;this.levelNum=c.getData("levelNum",1),this.gameState=0,this.curStage=0,this.stageTimes=[20,40,60],this.readyTimes=0,this.dragBgMove=!1,this.isHookBack=!1,this.fishRodY=this.fishRod.y,this.hookInitY=100,this.bgDropSpeed1=18e3,this.bgDropSpeed2=15e3,this.dropTime1=1.6,this.dropTime2=2,this.minY=this.bg.y+cc.winSize.height;for(var t=this.bg.getChildByName("layout").children,n=0,a=0;a<t.length;a++)n+=t[a].height*t[a].scale;for(var o=this.bgDropSpeed1*this.dropTime1+this.bgDropSpeed2*(this.dropTime2-this.dropTime1)+cc.winSize.height,h=Math.ceil((o-n)/(t[1].height*t[1].scale)),r=0;r<h;r++){var d=cc.instantiate(t[1]);d.parent=t[1].parent,d.scale=t[1].scale}this.maxY=this.bg.y+o-cc.winSize.height;var l=(o-2*cc.winSize.height)/60;this.bgMoveSpeed=0,this.bgMoveSpeed1=l-200,this.bgMoveSpeed2=l,this.bgMoveSpeed3=l+200,this.lastSharkIndex=-1,this.sharkTimes=10,this.sharkNum=0,this.fishes=[],this.fishTimes1=s.rangeRandom(5,15),this.fishTimes2=s.rangeRandom(5,20),this.fishNum=[],this.emptyTrackNo=-1,this.isMagnet=!1,this.isProtect=!1,this.initData(),this.initCat(),this.initRemindPanel(),this.sizeFit(),this.listenHandle(),this.loadRes(),this.adHandle(),i.hideLoadingPanel(function(){e.cat.timeScale=1})},sizeFit:function(){},adHandle:function(){var e;isHasAd&&(bannerShowFlag[sceneIndex]?a.adsManager.showBanner():a.adsManager.hideBanner(),e=lastSceneIndex==sceneIndex?"fishing-replay":"fishing",a.adsManager.showInterVideo(e),a.adsManager.hideCustomAd(),a.adsManager.showCustomAd(4))},initRemindPanel:function(){var e=this,t=this.cat.skeletonData;n.getBundleRes(i.gameBundle,"prefabs/miniGameRemindPanel",function(i){if(e.panelHolder){var n=cc.instantiate(i);n.active=!1,n.parent=e.panelHolder,n.position=cc.v2(0,0),e.panelCtrl=n.getComponent("MiniGameRemindPanel"),e.panelCtrl.initPanel(t)}else LogCommon.debug("\u8bf7\u5148\u8bbe\u7f6e\u5f39\u7a97\u7684\u7236\u8282\u70b9")},cc.Prefab)},loadRes:function(){var e=this;n.getBundleRes(i.fishingBundle,"prefabs",function(t){e.fishPrefabs=t},cc.Director,cc.Prefab),n.getBundleRes(i.fishingBundle,"fish",function(t){e.fishImage=t},cc.Director,cc.SpriteFrame)},listenHandle:function(){var e=this;this.cat.setCompleteListener(function(t){var n=t.animation?t.animation.name:"";if("play-diaoyu-walk"==n)e.playAnimation(1);else if("play-diaoyu"==n)e.gameState=1,e.fishRod.active=!0,cc.tween(e.fishRod).to(.2,{angle:4}).to(.4,{angle:-4}).to(.2,{angle:0}).union().repeat(2).to(.2,{angle:2}).to(.4,{angle:-2}).to(.2,{angle:0}).call(function(){e.startGame()}).start();else if("play-diaoyu-shouxian"==n){e.settlementPanel.active=!0,e.bellLabel.node.parent.active=!0;var a=e.settlementPanel.getChildByName("holder"),h=e.settlementPanel.getChildByName("label").getComponent(cc.Label),r=e.settlementPanel.getChildByName("bellHolder"),d=e.settlementPanel.getChildByName("buttonHolder");r.scale=0,h.string="X"+e.fishes.length;for(var l=0,g=0;g<e.fishes.length;g++){var m=e.fishes[g];l+=parseInt(e.getScoreByType(m));var u=new cc.Node;u.parent=a,u.addComponent(cc.Sprite).spriteFrame=e.fishImage[m];var f=s.rangeRandom(0,360),p=s.rangeRandom(-a.width/2,a.width/2),v=s.rangeRandom(-a.height/2,a.height/2);u.angle=f,u.scale=1.5;var S=u.height>u.width?u.height:u.width;u.position=cc.v2(p,cc.winSize.height/2+S),cc.tween(u).to(.5,{y:v}).start()}e.scheduleOnce(function(){var e=this;h.node.active=!0,h.scale=5,cc.tween(h.node).to(.2,{scale:2}).call(function(){for(var e=a.children,t=0;t<e.length;t++)cc.tween(e[t]).to(.5,{position:cc.v2(0,0),scale:0}).start()}).start();var t=this;this.scheduleOnce(function(){var n=t.scoreExchangeBell(l);r.getChildByName("num").getComponent(cc.Label).string="X"+n,r.active=!0,cc.tween(r).to(.5,{scale:1}).delay(.5).to(.5,{scale:0,position:e.bellLabel.node.parent.position}).call(function(){h.node.active=!1,d.active=!0,i.updateBellNum(t.bellLabel,n);var e=c.getData("fishHighScore",0);l>e&&c.setData("fishHighScore",l),i.unlockGift()}).start()},1.5)},.5),o.eventStatistics("fishingSuc")}}),this.cat.setStartListener(function(t){"play-diaoyu-shouxian"==(t.animation?t.animation.name:"")&&e.scheduleOnce(function(){for(var t=e.baitHolder.children,i=function(i){var n=t[i],s=e.baitHolder.convertToWorldSpaceAR(n.position);s=e.basketHolder.convertToNodeSpaceAR(s),n.parent=e.basketHolder,n.position=s,cc.tween(n).to(.5,{scale:0,position:cc.v2(0,0)}).call(function(){n.destroy()}).start()},n=t.length-1;n>=0;n--)i(n)},1)})},initCat:function(){var e=i.getLocalDressUp(i.curCatName,-1),t=r.newSkeletonData(i.skeletonData),n=this.cat;n.skeletonData=t,n.setSkin(i.curCatName),i.initDressUp(n,e),this.playCatAnim(),this.cat.timeScale=0},playCatAnim:function(){lastSceneIndex==sceneIndex?this.playAnimation(1):this.playAnimation(0)},initData:function(){i.protectNum=c.getData("protectNum",1),i.magnetNum=c.getData("magnetNum",1),i.bellNum=c.getData("bellNum",0),i.updateBellNum(this.bellLabel),cc.find("Canvas/UI/leftHolder/toolHolder").active=isHasAd,this.updateMagnetNum(),this.updateProtectNum()},updateProtectNum:function(e){void 0===e&&(e=0),0!=e&&(i.protectNum=parseInt(i.protectNum)+parseInt(e),c.setData("protectNum",i.protectNum));var t=cc.find("Canvas/UI/leftHolder/toolHolder/btnProtective/bottom/label").getComponent(cc.Label),n=cc.find("Canvas/UI/leftHolder/toolHolder/btnProtective/bottom/video");i.protectNum>0?(n.active=!1,t.string=""+i.protectNum):(n.active=!0,t.string="")},updateMagnetNum:function(e){void 0===e&&(e=0),0!=e&&(i.magnetNum=parseInt(i.magnetNum)+parseInt(e),c.setData("magnetNum",i.magnetNum));var t=cc.find("Canvas/UI/leftHolder/toolHolder/btnMagnet/bottom/label").getComponent(cc.Label),n=cc.find("Canvas/UI/leftHolder/toolHolder/btnMagnet/bottom/video");i.magnetNum>0?(n.active=!1,t.string=""+i.magnetNum):(n.active=!0,t.string="")},getScoreByType:function(e){var t;switch(e){case 0:case 1:t=1;break;case 2:case 3:case 4:t=2;break;case 5:t=3;break;case 6:t=5}return t},scoreExchangeBell:function(e){var t;return 4==this.gameState?(t=Math.floor(e/15),t=Math.min(t,30)):5==this.gameState&&(t=Math.floor(e/30),t=Math.min(t,15)),t},playAnimation:function(e){0==e?this.cat.setAnimation(0,"play-diaoyu-walk"):1==e?this.cat.setAnimation(0,"play-diaoyu"):2==e&&this.cat.setAnimation(0,"play-diaoyu-shouxian")},startGame:function(){var e=this;this.hookInitY=this.fishRod.children[0].height,cc.find("Canvas/UI/leftHolder").active=!0;var t=cc.find("Canvas/UI/counter");t.y=620,cc.tween(t).to(.5,{y:460}).call(function(){e.gameState=3,e.gameTimes=0,e.generateFish()}).start()},setStage:function(e){e!=this.curStage&&(this.curStage=e,this.hookAnimation())},hookAnimation:function(){this.isHookBack||(3==this.curStage?(this.fishRod.children[1].stopAllActions(),cc.tween(this.fishRod.children[1]).to(.5,{angle:15}).to(1,{angle:-15}).to(.5,{angle:0}).union().repeatForever().start()):2==this.curStage?(this.fishRod.children[1].stopAllActions(),cc.tween(this.fishRod.children[1]).to(.5,{angle:10}).to(1,{angle:-10}).to(.5,{angle:0}).union().repeatForever().start()):1==this.curStage?(this.fishRod.children[1].stopAllActions(),cc.tween(this.fishRod.children[1]).to(.5,{angle:5}).to(1,{angle:-5}).to(.5,{angle:0}).union().repeatForever().start()):0==this.curStage&&this.fishRod.children[1].stopAllActions())},updateRemindTimes:function(e){var t=Math.ceil(60-e);t<=0&&(t=0,this.gameOver(4)),this.remindTimes.string=t+"S"},changeLine:function(e,t){void 0===t&&(t=!0);var i=this.fishRod.children;this.fishRod.y-i[0].height>=this.hookInitY||(this.fishRod.y+=e,i[0].height+=e/2,i[1].y=-i[0].height)},showWarn:function(){var e,t=this,i=[0,1,2,3];this.lastSharkIndex>=0&&i.splice(this.lastSharkIndex,1);var n=i[s.rangeRandom(0,i.length)];switch(1==this.sharkNum&&(n=0),this.lastSharkIndex=n,n){case 0:e=cc.v2(-cc.winSize.width/2+200,cc.winSize.height/4);break;case 1:e=cc.v2(cc.winSize.width/2-200,cc.winSize.height/4);break;case 2:e=cc.v2(-cc.winSize.width/2+200,-cc.winSize.height/4);break;case 3:e=cc.v2(cc.winSize.width/2-200,-cc.winSize.height/4)}this.warnAnima.node.position=e,this.warnAnima.node.scaleX=0==n||2==n?-1:1,this.warnAnima.node.active=!0,this.warnAnima.play(),this.scheduleOnce(function(){t.warnAnima.node.active=!1,t.generateShark(n)},1.5)},getSpeedByType:function(e){var t=100;switch(e){case 0:t=500;break;case 1:t=550;break;case 2:t=500;break;case 3:t=450;break;case 4:t=500;break;case 5:t=400;break;case 6:t=500;break;case 7:t=800}return t},getPosY:function(e){var t=(e+1)*cc.winSize.height/6;return this.bg.convertToNodeSpaceAR(cc.v2(0,t)).y},checkTrackNum:function(){for(var e=[],t=0;t<5;t++)t!=this.emptyTrackNo&&0==this.fishNum[t]&&e.push(t);if(e.length>0)if(1==e.length)this.generateTrackFish(this.emptyTrackNo),this.emptyTrackNo=e[0];else{var i=s.rangeRandom(0,e.length),n=e[i];e[i]=this.emptyTrackNo;for(var a=0;a<e.length;a++)this.generateTrackFish(e[a]);this.emptyTrackNo=n}},generateFish:function(){var e=s.rangeRandom(0,5);this.emptyTrackNo=e,this.fishNum[e]=0;for(var t=0;t<5;t++)t!=e&&this.generateTrackFish(t)},generateTrackFish:function(e){var t;t=e%2==0?s.rangeRandom(3,4):s.rangeRandom(2,3),this.fishNum[e]=t;for(var i=0;i<t;i++){var n=s.getRandomResult([3,3,1,1,1]);this.timingGenerateFish(n,e,i)}},timingGenerateFish:function(e,t,i){var n=this;this.scheduleOnce(function(){n.generateOneFish(e,t)},.5+.5*i)},generateOneFish:function(e,t){try{var i=cc.instantiate(this.fishPrefabs[e]);i.parent=this.bg;var n=this.getPosY(t),s=Math.random()<.5?1:-1;i.scaleX=-s,i.position=cc.v2(-s*(cc.winSize.width/2+i.width),n-i.height/2),i.getComponent("FishCtrl").init(e,s,t)}catch(a){console.log(a)}},generateShark:function(e){var t,i=cc.instantiate(this.fishPrefabs[this.fishPrefabs.length-1]);switch(i.parent=this.bg,e){case 0:t=cc.v2(-cc.winSize.width/2-i.width,cc.winSize.height/4-i.height/2);break;case 1:t=cc.v2(cc.winSize.width/2+i.width,cc.winSize.height/4-i.height/2);break;case 2:t=cc.v2(-cc.winSize.width/2-i.width,-cc.winSize.height/4-150);break;case 3:t=cc.v2(cc.winSize.width/2+i.width,-cc.winSize.height/4-150)}i.position=cc.v2(t.x,t.y-this.bg.y);var n=0==e||2==e?1:-1;i.scaleX=-n,i.getComponent("FishCtrl").init(7,n)},update:function(e){if(!(e>5))if(1==this.gameState){this.readyTimes+=e;var t=this.bg.y,i=t;this.readyTimes<=1.6?t+=this.bgDropSpeed1*e:this.readyTimes<=2?t+=this.bgDropSpeed2*e:(this.gameState=2,console.log(t,this.maxY)),this.bg.y=Math.min(t,this.maxY),this.changeLine(this.bg.y-i)}else if(3==this.gameState){if(this.gameTimes+=e,this.gameTimes>=1){var n=this.bg.y;if(this.dragBgMove||(this.gameTimes<=this.stageTimes[0]?(this.bgMoveSpeed=this.bgMoveSpeed1,this.setStage(1)):this.gameTimes<=this.stageTimes[1]?(this.bgMoveSpeed=this.bgMoveSpeed2,this.setStage(2)):this.gameTimes<=this.stageTimes[2]&&(this.bgMoveSpeed=this.bgMoveSpeed3,this.setStage(3))),n-=this.bgMoveSpeed*e,this.bg.y=n,this.gameTimes>=this.sharkTimes-1.5&&this.gameTimes<=40&&this.sharkNum<4){switch(this.sharkNum=parseInt(this.sharkNum)+1,this.sharkNum){case 1:this.sharkTimes=s.rangeRandom(this.sharkTimes+6,20);break;case 2:this.sharkTimes=s.rangeRandom(this.sharkTimes+6,30);break;case 3:this.sharkTimes=s.rangeRandom(this.sharkTimes+6,40);break;case 4:this.sharkTimes=s.rangeRandom(43,45)}this.showWarn()}else if(this.gameTimes>=this.sharkTimes-1.5&&this.gameTimes>40&&this.sharkNum<7){switch(this.sharkNum=parseInt(this.sharkNum)+1,this.sharkNum){case 5:this.sharkTimes=s.rangeRandom(this.sharkTimes+3,50);break;case 6:this.sharkTimes=s.rangeRandom(this.sharkTimes+3,55)}this.showWarn()}if(this.gameTimes>=this.fishTimes1){this.fishTimes1<15?this.fishTimes1=s.rangeRandom(16,30):this.fishTimes1<30?this.fishTimes1=s.rangeRandom(31,45):this.fishTimes1<45?this.fishTimes1=s.rangeRandom(46,55):this.fishTimes1=100;var a=s.rangeRandom(0,5);this.generateOneFish(5,a)}if(this.gameTimes>=this.fishTimes2){this.fishTimes2<20?this.fishTimes2=s.rangeRandom(25,40):this.fishTimes2<40?this.fishTimes2=s.rangeRandom(45,55):this.fishTimes2=100;var c=s.rangeRandom(0,5);this.generateOneFish(6,c)}this.gameTimes>=this.stageTimes[this.stageTimes.length-1]-1&&this.protectNode.active&&(this.protectNode.active=!1)}this.updateRemindTimes(this.gameTimes)}},btnProtect:function(){var e=this;if(h.playEffect("click"),i.protectNum>0){if(this.protectNode.active)return;this.updateProtectNum(-1),this.protectNode.active=!0,this.protectNode.getChildByName("remind").active=!0,this.scheduleOnce(function(){e.protectNode.getChildByName("remind").active=!1},2)}else a.adsManager.showVideo("fishPropProtect",function(t){t&&e.updateProtectNum(1)})},btnMagnet:function(){var e=this;if(h.playEffect("click"),i.magnetNum>0){if(this.isMagnet)return;this.updateMagnetNum(-1),i.curScene.gameState=6,this.isMagnet=!0,this.fishRod.children[1].getChildByName("magnet").active=!0,this.magnetHandle(),this.scheduleOnce(function(){e.isMagnet=!1,i.curScene.gameState=3,e.fishRod.children[1].getChildByName("magnet").active=!1},1)}else a.adsManager.showVideo("fishPropMagnet",function(t){t&&e.updateMagnetNum(1)})},magnetHandle:function(){var e=this.fishRod.children[1].convertToWorldSpaceAR(cc.v2(-50,-116));e=this.bg.convertToNodeSpaceAR(e);for(var t=this.bg.children,i=0;i<t.length;i++)"fish"==t[i].group&&t[i].x<=cc.winSize.width/2-t[i].width/2&&t[i].x>=-cc.winSize.width/2+t[i].width/2&&t[i].y+t[i].parent.y>=-cc.winSize.height/2&&t[i].y+t[i].parent.y<=cc.winSize.height/2-t[i].height&&cc.tween(t[i]).to(.7,{position:e}).start()},gameOver:function(e){if(this.gameState=e,5==this.gameState)isHasAd?this.panelCtrl.showPanel("revive"):this.panelCtrl.showPanel("fail"),o.eventStatistics("fishingFail");else if(4==this.gameState){var t=cc.find("Canvas/UI/counter");cc.tween(t).to(.5,{y:620}).start();var i=this.bg.y-(cc.winSize.height/2-this.fishRodY),n=i-this.fishRod.y;this.fishRod.angle=0,this.fishRod.y=i,this.fishRod.children[1].stopAllActions(),this.fishRod.children[0].height+=n,this.fishRod.children[1].y=-this.fishRod.children[0].height;var s=this;cc.tween(this.bg).to(1,{y:cc.winSize.height/2}).call(function(){for(var e=s.fishRod.children[1].getChildByName("holder").children,t=e.length-1;t>=0;t--){var i=e[t];i.parent=s.baitHolder,i.angle=0,i.position=cc.v2(0,-i.height/2)}s.fishRod.active=!1,s.playAnimation(2)}).start(),cc.tween(this.fishRod).to(1,{y:this.fishRodY}).start(),cc.tween(this.fishRod.children[0]).to(.95,{height:492}).start(),cc.tween(this.fishRod.children[1]).to(.95,{y:-492}).start()}},updatePanel:function(e,t,n){for(var s=0,a=0;a<i.curScene.fishes.length;a++){var o=i.curScene.fishes[a];s+=parseInt(i.curScene.getScoreByType(o))}t.string=s.toString();var h=i.curScene.scoreExchangeBell(s);e.string=h.toString(),i.updateBellNum(i.curScene.bellLabel,h);var r=c.getData("fishHighScore",0);s>r&&(r=s,c.setData("fishHighScore",r)),n.string=r.toString(),i.curScene.bellLabel.node.parent.active=!0},btnBack:function(){h.playEffect("click"),i.showLoadingPanel(function(){cc.director.loadScene("game")})},btnReplay:function(){h.playEffect("click"),i.showLoadingPanel(function(){cc.director.loadScene("fishing")})},btnPause:function(){h.playEffect("click"),this.gameState=6,this.panelCtrl.showPanel("pause")},continueHandle:function(){this.gameState=3},reviveHandle:function(){this.gameState=3}}),cc._RF.pop()},{AdInfo:void 0,AudioModule:void 0,EngineCommon:void 0,GameCommon:void 0,GameControl:void 0,LoadResModule:void 0,MathModule:void 0,StatisticsModule:void 0,StorageModule:void 0}],HookCtrl:[function(e,t){"use strict";cc._RF.push(t,"a409e/dePFF+6fwPD5Yv8Lt","HookCtrl");var i=e("GameControl"),n=e("MathModule");cc.Class({extends:cc.Component,properties:{holder:cc.Node},onLoad:function(){this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this),this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this),this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this)},start:function(){},onTouchStart:function(e){if(3==i.curScene.gameState){i.curScene.fishRod.children[1].stopAllActions();var t=e.touch.getLocation();t=i.curScene.fishRod.parent.convertToNodeSpaceAR(t);var s=n.getAngle(i.curScene.fishRod.position,t)+90;i.curScene.fishRod.angle=s;var a=i.curScene.fishRod.position.sub(t).mag();i.curScene.fishRod.children[0].height=a,i.curScene.fishRod.children[1].y=-i.curScene.fishRod.children[0].height}},onTouchMove:function(e){if(3==i.curScene.gameState){var t=e.touch.getLocation();t=i.curScene.fishRod.parent.convertToNodeSpaceAR(t);var s=n.getAngle(i.curScene.fishRod.position,t)+90;i.curScene.fishRod.angle=s;var a=i.curScene.fishRod.position.sub(t).mag();i.curScene.fishRod.children[0].height=a,i.curScene.fishRod.children[1].y=-i.curScene.fishRod.children[0].height}},onTouchEnd:function(){3==i.curScene.gameState&&(i.curScene.dragBgMove=!1,i.curScene.isHookBack=!0,cc.tween(i.curScene.fishRod).to(.5,{angle:0}).start(),cc.tween(i.curScene.fishRod.children[0]).to(.5,{height:i.curScene.hookInitY}).start(),cc.tween(i.curScene.fishRod.children[1]).to(.5,{y:-i.curScene.hookInitY}).call(function(){i.curScene.isHookBack=!1,i.curScene.hookAnimation()}).start())},onCollisionEnter:function(e){if("fish"==e.node.group){var t;e.node.stopAllActions();var s=this.holder.children;5==s.length&&s[0].destroy(),e.node.removeComponent(cc.PhysicsCollider),e.node.parent=this.holder,e.node.scaleX=1;var a=e.node.getComponent("FishCtrl");a.isDestroy=!0,i.curScene.fishes.push(a.type),a.type<7&&(0==a.type||2==a.type||6==a.type?(t=0,e.node.position=cc.v2(-72,-67-e.node.height)):(t=n.rangeRandom(85,105),e.node.position=cc.v2(-72-e.node.height/2,-67-e.node.width/2)),i.curScene.fishNum[a.trackNo]--,i.curScene.checkTrackNum()),e.node.angle=-t}else"shark"==e.node.group&&(i.curScene.protectNode.active?(i.curScene.protectNode.active=!1,i.curScene.isProtect=!0,this.scheduleOnce(function(){i.curScene.isProtect=!1},3)):i.curScene.isProtect||(i.curScene.gameOver(5),e.node.destroy()))}}),cc._RF.pop()},{GameControl:void 0,MathModule:void 0}]},{},["FishCtrl","Fishing","HookCtrl"]);