import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { actions as asyncServerActions } from "../../core/reducers/asyncServerResponseReducer";
import { actions as wrapperActions } from '../../gamereducer/wrapperReducer'
import withWrapperCommConfiguration from "./configuration/withWrapperCommConfiguration";
import { actions as paytableActions } from "../../core/reducers/paytableReducer";
import { actions as reelGridActions } from "../../core/reducers/reelgridStateReducer";
import { actions as desktopSettingPanelGameLevel } from "../../gamereducer/desktopSettingPanelGameLevelReducer";
import { actions as soundActions } from "../../core/reducers/soundReducer";
import { actions as aplicationActions } from "../../core/reducers/applicationStateReducer";
import { actions as keyboardListenerActions } from "../../core/reducers/keyboardListenerReducer";
import { actions as basegameActions, actions as baseGameActions } from "../../core/reducers/baseGameReducer";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { isMobile } from "react-device-detect";
import UIManager from "../../core/components/ui/UiBuilder";
import { TIMER } from "../../core/utills";
import * as PIXI from "pixi.js";

interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    [x: string]: any;
}

interface IDispatchToProps {
    [x: string]: any;
}

interface IState {
    [x: string]: any;
}

class WrapperComm extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected callback: any;
    protected netProfitloss: number;
    private AllTimer :any [] = [];
    constructor(props: IProps) {
        super(props);
        this.AllTimer =[];
        this.app = props.app;
        this.netProfitloss = 0;
        this.callback = () => { };
    }

    hideOtherControls() {
        UIManager.getRef("btn_history").visible = false;
        UIManager.getRef("btn_setting").visible = true;
        UIManager.getRef("btn_game_rules").visible = true;
        this.props.showSettingGameRules(false);
        this.props.setShowGameSettings(false);
        let ui_mode = ";"
        if (isMobile) {
            ui_mode = "mobile";
        } else {
            ui_mode = "desktop";
        }
        UIManager.getRef("btn_spin") && (UIManager.getRef("btn_spin").visible = false);
        UIManager.getRef("btn_autoplay_stop" + ui_mode) && (UIManager.getRef("btn_autoplay_stop" + ui_mode).visible = false);
        UIManager.getRef("btn_autoplay_start") && (UIManager.getRef("btn_autoplay_start").visible = false);
        UIManager.getRef("btn_autoplay") && (UIManager.getRef("btn_autoplay").visible = false);
        UIManager.getRef("btn_stake") && (UIManager.getRef("btn_stake").visible = false);
    }
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return true;
    }
    shouldComponentUpdate_(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.gamePause != this.props.gamePause) {
            if (!nextProps.gamePause) {
                this.props.setBlockLayer(false);
            } else {
                this.props.setBlockLayer(true);
            }
        }
        if (nextProps.initResult != this.props.initResult
            || nextProps.isRequestSent != this.props.isRequestSent
            || nextProps.balanceResult != this.props.balanceResult
            || nextProps.selectedCoin != this.props.selectedCoin
            || nextProps.loadingPercent != this.props.loadingPercent
            || nextProps.spinStart != this.props.spinStart
            || nextProps.callFlowManager != this.props.callFlowManager
            || nextProps.inFreeGame != this.props.inFreeGame
            || nextProps.blastStart != this.props.blastStart
            || nextProps.autoplayCount != this.props.autoplayCount
            || nextProps.inAutoplay != this.props.inAutoplay
            || nextProps.InTurboMode != this.props.InTurboMode
            || nextProps.soundLoadStart != this.props.soundLoadStart
            || nextProps.soundIsPlaying != this.props.soundIsPlaying
            || nextProps.isshowBetHistory != this.props.isshowBetHistory
            || nextProps.showSettingGameRules != this.props.showSettingGameRules
            || nextProps.showPaytable != this.props.showPaytable
            || nextProps.balanceInGame != this.props.balanceInGame
            || nextProps.startWinCelebration != this.props.startWinCelebration
            || nextProps.startWinShower != this.props.startWinShower
            || nextProps.spinResult != this.props.spinResult) {
            if (nextProps.spinResult != this.props.spinResult && nextProps.spinResult && nextProps.spinResult.data.response.errorcode) {
                if (nextProps.spinResult.data.response.errorcode == -500) {
                }

                if (Number(nextProps.spinResult.data.response.errorcode) > -800 && Number(nextProps.spinResult.data.response.errorcode) < -699 && (window as any).GAME_INFO.playingForReal && (window as any).MESSAGE_HANDLER_INIT.use()) {
                    this.props.setApplicationPause(true);
                    (window as any).MESSAGE_HANDLER_INIT.check(() => {
                        this.props.setApplicationPause(false);
                        // reset state
                        this.props.setAllButtonEnable();
                    }, 'error')
                }
                localStorage.setItem("buyInFeature_local", "false");
                localStorage.setItem("buyInValue_local", "0");
                localStorage.setItem("selection_local", "-1");
                (window as any).CLIENT_WRAPPER_INIT.send("error", [nextProps.spinResult.data.response.errorcode, nextProps.spinResult.data.response.errordesc]);
                !((window as any).GAME_INFO.NYX && (window as any).CLIENT_WRAPPER_INIT.use) && (window as any).GAME_INFO.UI.error.show(nextProps.spinResult.data.response.errorcode, nextProps.spinResult.data.response.errordesc);
                return false
            }
            if (nextProps.initResult != this.props.initResult && nextProps.initResult && nextProps.initResult.data.response.errorcode) {
                if (nextProps.initResult.data.response.errorcode == -500) {

                }
                (window as any).CLIENT_WRAPPER_INIT.send('load-fail');
                (window as any).CLIENT_WRAPPER_INIT.send("error", [nextProps.initResult.data.response.errorcode, nextProps.initResult.data.response.errordesc]);
                !((window as any).GAME_INFO.NYX && (window as any).CLIENT_WRAPPER_INIT.use) && (window as any).GAME_INFO.UI.error.show(nextProps.spinResult.data.response.errorcode, nextProps.spinResult.data.response.errordesc);

                return false
            }
            if (nextProps.autoplayCount > 0 && nextProps.autoplayCount != this.props.autoplayCount) {
                (window as any).CLIENT_WRAPPER_INIT.send('autoplay-remaining', nextProps.autoplayCount);
            }
            if (nextProps.isshowBetHistory && nextProps.isshowBetHistory != this.props.isshowBetHistory) {
                (window as any).CLIENT_WRAPPER_INIT.send('history-open');
                this.props.spaceBarSpin(false);
            }
            if (!nextProps.isshowBetHistory && nextProps.isshowBetHistory != this.props.isshowBetHistory) {
                (window as any).CLIENT_WRAPPER_INIT.send('history-close');
            }
            if (nextProps.showSettingGameRules && nextProps.showSettingGameRules != this.props.showSettingGameRules) {
                (window as any).CLIENT_WRAPPER_INIT.send('help-open');
                this.props.spaceBarSpin(false);
            }
            if (!nextProps.showSettingGameRules && nextProps.showSettingGameRules != this.props.showSettingGameRules) {
                (window as any).CLIENT_WRAPPER_INIT.send('help-close');
            }
            if (nextProps.showPaytable && nextProps.showPaytable != this.props.showPaytable) {
                (window as any).CLIENT_WRAPPER_INIT.send('paytable-open');
            }
            if (!nextProps.showPaytable && nextProps.showPaytable != this.props.showPaytable) {
                (window as any).CLIENT_WRAPPER_INIT.send('paytable-close');
            }
            if (nextProps.inAutoplay && nextProps.inAutoplay != this.props.inAutoplay) {
                (window as any).CLIENT_WRAPPER_INIT.send('autoplay-start');
            }
            if (!nextProps.inAutoplay && nextProps.inAutoplay != this.props.inAutoplay) {
                (window as any).CLIENT_WRAPPER_INIT.send('autoplay-end');
            }
            if (nextProps.blastStart && nextProps.blastStart != this.props.blastStart) {
                if ((window as any).GAME_INFO.UI && (window as any).GAME_INFO.UI.realityCheck) {
                    (window as any).GAME_INFO.UI.realityCheck.delay = true;   //Delay reality check from being displayed whilst in tumble/bonus
                }
            }
            if (nextProps.startWinShower && nextProps.startWinShower != this.props.startWinShower
                || nextProps.startWinCelebration && nextProps.startWinCelebration != this.props.startWinCelebration
            ) {
                if ((window as any).GAME_INFO.UI && (window as any).GAME_INFO.UI.realityCheck) {
                    (window as any).GAME_INFO.UI.realityCheck.delay = true;   //Delay reality check from being displayed whilst in tumble/bonus
                }
            }
            if (!nextProps.startWinShower && nextProps.startWinShower != this.props.startWinShower
                || !nextProps.startWinCelebration && nextProps.startWinCelebration != this.props.startWinCelebration
            ) {
                if (!nextProps.inFreeGame) {
                    (window as any).GAME_INFO.UI && (window as any).GAME_INFO.UI.realityCheck && (window as any).GAME_INFO.UI.realityCheck.delayAction.dispatch();
                }
            }
            if (nextProps.inFreeGame && nextProps.inFreeGame != this.props.inFreeGame) {
                if ((window as any).GAME_INFO.UI && (window as any).GAME_INFO.UI.realityCheck) {
                    (window as any).GAME_INFO.UI.realityCheck.delay = true;   //Delay reality check from being displayed whilst in tumble/bonus
                }
                (window as any).CLIENT_WRAPPER_INIT.send('feature-start');
            }
            if (!nextProps.inFreeGame && !nextProps.startWinShower && !nextProps.startWinCelebration && nextProps.inFreeGame != this.props.inFreeGame) {

                let timer = TIMER.TimerManager.createTimer(1000);
                timer.on('end', (e: any) => {
                   
                    (window as any).GAME_INFO.UI && (window as any).GAME_INFO.UI.realityCheck && (window as any).GAME_INFO.UI.realityCheck.delayAction.dispatch();
                    (window as any).CLIENT_WRAPPER_INIT.send('feature-end');
                    timer && timer.remove();
                    timer && timer.stop();
                })
                timer.start();
              

            }
            if (nextProps.InTurboMode && nextProps.InTurboMode != this.props.InTurboMode) {

                (window as any).CLIENT_WRAPPER_INIT.send('quickspin-enable');
            }
            if (!nextProps.InTurboMode && nextProps.InTurboMode != this.props.InTurboMode) {

                (window as any).CLIENT_WRAPPER_INIT.send('quickspin-disable');
            }
            if (nextProps.spinStart && nextProps.spinStart != this.props.spinStart) {
                // (window as any).CLIENT_WRAPPER_INIT.send('play-start');
            }
            if (nextProps.callFlowManager && nextProps.callFlowManager != this.props.callFlowManager) {

                if (!nextProps.inFreeGame && !nextProps.startWinShower && !nextProps.startWinCelebration) {
                    (window as any).GAME_INFO.UI && (window as any).GAME_INFO.UI.realityCheck && (window as any).GAME_INFO.UI.realityCheck.delayAction.dispatch();
                }
                if (nextProps.spinResult.data && nextProps.spinResult.data.response.bet.addBalance) {
                    let SESSION_BAR = (window as any).f1x2.SESSION_BAR;
                    SESSION_BAR && SESSION_BAR.updateNet(nextProps.spinResult.data.response.bet.addBalance);
                }

                if (nextProps.buyInFeatureDeductAmt == 0) {

                    if (nextProps.balanceInGame != null) {
                        let balcObj: any;
                        balcObj = {
                            balance: Number(nextProps.balanceInGame), // balance current in game balance
                            mode: "stake", // 'place' start of round | 'settle' end of round 
                            stake: Number(nextProps.coinList[nextProps.selectedCoin])// current in game stake
                        };

                        (window as any).CLIENT_WRAPPER_INIT.send("value-balance", balcObj);
                        // (window as any).CLIENT_WRAPPER_INIT.send("value-stake", nextProps.coinList[nextProps.selectedCoin]);
                    }
                    (window as any).CLIENT_WRAPPER_INIT.send("value-win", nextProps.spinResult.data.response.bet.addBalance);
                    if ((window as any).GAME_INFO.playingForReal && (window as any).MESSAGE_HANDLER_INIT.use()) {
                        this.props.setApplicationPause(true);
                        (window as any).MESSAGE_HANDLER_INIT.check(() => {
                            this.props.setApplicationPause(false);
                            // continue game play
                        }, 'results');
                    }
                }
                (window as any).CLIENT_WRAPPER_INIT.send('play-end');
            }
            if (nextProps.soundIsPlaying && nextProps.soundIsPlaying != this.props.soundIsPlaying) {

                (window as any).CLIENT_WRAPPER_INIT.send('audio-enable');
            }
            if (!nextProps.soundIsPlaying && nextProps.soundIsPlaying != this.props.soundIsPlaying) {

                (window as any).CLIENT_WRAPPER_INIT.send('audio-disable');
            }
            if (nextProps.soundLoadStart && nextProps.soundLoadStart != this.props.soundLoadStart) {

                (window as any).CLIENT_WRAPPER_INIT.send('audio-enable');
            }
            if (!nextProps.soundLoadStart && nextProps.soundLoadStart != this.props.soundLoadStart) {

                (window as any).CLIENT_WRAPPER_INIT.send('audio-disable');
            }
            if (nextProps.isRequestSent && nextProps.isRequestSent != this.props.isRequestSent) {
                let SESSION_BAR = (window as any).f1x2.SESSION_BAR;
                SESSION_BAR && SESSION_BAR.updateNet(-nextProps.coinList[nextProps.selectedCoin]);
                (window as any).CLIENT_WRAPPER_INIT.send('play-start');
                (window as any).CLIENT_WRAPPER_INIT.send("value-win", 0);
            }
            if (nextProps.spinStart && nextProps.spinStart != this.props.spinStart) {
                if (nextProps.balanceInGame != null) {
                    let balcObj: any;
                    balcObj = {
                        balance: Number(nextProps.balanceInGame), // balance current in game balance
                        mode: "stake", // 'place' start of round | 'settle' end of round 
                        stake: Number(nextProps.coinList[nextProps.selectedCoin])// current in game stake
                    };

                    (window as any).CLIENT_WRAPPER_INIT.send("value-balance", balcObj);
                    if ((window as any).GAME_INFO.playingForReal && (window as any).MESSAGE_HANDLER_INIT.use()) {
                        this.props.setApplicationPause(true);
                        (window as any).MESSAGE_HANDLER_INIT.check(() => {
                            this.props.setApplicationPause(false);
                            // continue game play
                        }, 'place');
                    } else {
                        // continue game play
                    }
                }
            }

            if (nextProps.selectedCoin != this.props.selectedCoin) {
                let convert_Number = Number((nextProps.coinList[nextProps.selectedCoin]).toFixed(2) * 100);
                (window as any).GAME_INFO.stake = convert_Number.toFixed(0);
                (window as any).CLIENT_WRAPPER_INIT.send("value-stake", Number(nextProps.coinList[nextProps.selectedCoin]));
            }
            if (nextProps.loadingPercent > 0 && nextProps.loadingPercent != this.props.loadingPercent) {

                (window as any).CLIENT_WRAPPER_INIT.send('load-progress', Math.floor(nextProps.loadingPercent));
            }
            if (nextProps.initResult != this.props.initResult) {
                let balcObj: any;
                balcObj = {
                    balance: Number(nextProps.balanceInGame), // balance current in game balance
                    mode: "stake", // 'place' start of round | 'settle' end of round 
                    stake: Number(nextProps.coinList[nextProps.selectedCoin])  // current in game stake
                };

                (window as any).CLIENT_WRAPPER_INIT.send("value-balance", balcObj);
                (window as any).CLIENT_WRAPPER_INIT.send("value-stake", Number(nextProps.coinList[nextProps.selectedCoin]));
                (window as any).GAME_INFO.UI.realityCheck && (window as any).GAME_INFO.UI.realityCheck.timeout();
                (window as any).GAME_INFO.UI.realityCheck && (window as any).GAME_INFO.UI.realityCheck.onVisibilityChange.add((v_: any) => {
                    if (v_) {
                        this.props.spaceBarSpin(false);
                        this.props.setApplicationPause(true);
                    } else {
                        this.props.spaceBarSpin(true);
                        this.props.setApplicationPause(false);
                    }

                });
                (window as any).GAME_INFO.UI.realityCheck && (window as any).GAME_INFO.UI.realityCheck.onShowHistory.add((close_: any) => {
                    this.props.setBlockLayer(false);
                    this.props.spaceBarSpin(false);
                    this.hideOtherControls();
                    if (isMobile) {
                        this.props.showSettingPanelContainerForMobile(true, 'history');
                        this.props.setApplicationButtonpanelVisibility(false);
                    } else {
                        this.props.getApplicationHistoryResponse();
                        this.props.setMenuButtonClicked(true);
                        this.props.showBetHistory(true);
                        // this.props.setApplicationButtonpanelVisibility(false);
                    }
                    this.callback = close_;
                });
                if (nextProps.initResult != undefined) {

                    (window as any).GAME_INFO.playingForReal && (window as any).GAME_INFO.messageHandler();
                }
                let aams = new (window as any).GAME_INFO.UI.AAMSBar(
                    (window as any).GAME_INFO.jurisdiction,
                    (window as any).GAME_INFO.fun_real,
                    (window as any).GAME_INFO.AAMS_LINK,
                    (window as any).GAME_INFO.RESPONSIBLE_LINK,
                    (window as any).GAME_INFO.SHOW_AAMS_TICKET === 'true',
                    (window as any).GAME_INFO.AAMS_TICKET_LABEL,
                    (window as any).GAME_INFO.AAMS_TICKET,
                    (window as any).GAME_INFO.SHOW_AAMS_SESSION === 'true',
                    (window as any).GAME_INFO.AAMS_SESSION_LABEL,
                    (window as any).GAME_INFO.AAMS_SESSION
                );
                aams.render(document.getElementById('root'));
                let rtp = new (window as any).GAME_INFO.UI.RTP(
                    (window as any).GAME_INFO.gameID,
                    (window as any).GAME_INFO.jurisdiction,
                    (window as any).GAME_INFO.site,
                    (window as any).GAME_INFO.path,
                    (window as any).GAME_INFO.lang,
                    (window as any).GAME_INFO.fun_real,
                    (window as any).GAME_INFO.clientName,
                    (window as any).GAME_INFO.channel,
                    (window as any).GAME_INFO.currency,
                    (window as any).GAME_INFO.ex_rate
                );
                rtp.render(document.getElementById('root'));
                (window as any).CLIENT_WRAPPER_INIT.send('load-end');
                (window as any).CLIENT_WRAPPER_INIT.send("value-win", 0);
            }
            return false
        }
        return true
    }
    componentDidMount() {

    }
    private cleanAllTimer():void{
        this.AllTimer.forEach((_time:any)=>{
           _time && _time.stop();
           _time && _time.reset();
           _time && _time.remove();
       }); 
       this.AllTimer =[];
   }

    setUpcall() {
        this.props.constant.serverConfig.postfixpath =
            "acc_id=" + (window as any).GAME_INFO.acc_id +
            "&lang=" + (window as any).GAME_INFO.lang +
            "&gameID=" + (window as any).GAME_INFO.gameID +
            "&playMode=" + (window as any).GAME_INFO.playMode +
            "&jurisdiction=" + (window as any).GAME_INFO.jurisdiction +
            "&pathCDN=" + (window as any).GAME_INFO.pathCDN +
            "&dev=true" +
            "&path=" + (window as any).GAME_INFO.path +
            "&clientName=1x2_dev" +
            "&installID=null" +
            "&folderName=" + (window as any).GAME_INFO.folderName +
            "&site=" + (window as any).GAME_INFO.site +
            "&gameType=" + (window as any).GAME_INFO.gameType +
            "&gameVersion=" + (window as any).GAME_INFO.gameVersion +
            "&version=" + (window as any).GAME_INFO.gameVersion +
            "&force=" + (window as any).GAME_INFO.force +
            "&fun_real=" + (window as any).GAME_INFO.fun_real +
            "&hash=259777413" +
            "&stake=" + Number((window as any).GAME_INFO.stake) +
            "&ex_rate=" + (window as any).GAME_INFO.ex_rate +
            "&currency=" + (window as any).GAME_INFO.currency
        this.props.setApplicationInitBalanceResponse((window as any).GAME_INFO.balance);
        this.netProfitloss = (window as any).GAME_INFO.balance;
        this.props.setUseBuyFeature((window as any).GAME_INFO.useBuyAFeature);
        this.props.setSpaceBarDisable((window as any).GAME_INFO.spacebarDisabled);
        this.props.spaceBarSpin(!(window as any).GAME_INFO.spacebarDisabled);
        // temp hack to remove spacebar spinning as it allows you to bet below stake
        this.props.setSpaceBarDisable(true);
        this.props.spaceBarSpin(!true);
        this.props.setOneClickRule((window as any).GAME_INFO.oneClickRules);

        this.props.showHomeButton((window as any).GAME_INFO.mobile && (window as any).GAME_INFO.showLobby);
        this.props.setMaxStake((window as any).GAME_INFO.maximumStake);
        this.props.setMaxAutoPlay((window as any).GAME_INFO.maximumAutoplay);
        this.props.setHideNegativeValue((window as any).GAME_INFO.hideNegativeWins);

        this.props.setDisableCoins((window as any).GAME_INFO.disableCoins);
        this.props.setDisableAutoplay((window as any).GAME_INFO.disableAutoplay);
        this.props.setClickToEnterFeature((window as any).GAME_INFO.clickToEnterFeature);
        this.props.setBetLimit((window as any).GAME_INFO.betLimit);

        let SESSION_BAR_INIT = (window as any).f1x2.SESSION_BAR_INIT;

        //If SESSION_BAR_INIT exists
        if (SESSION_BAR_INIT) {
            //Once Session bar initialised
            SESSION_BAR_INIT.ready.then(() => {
                let SESSION_BAR = (window as any).f1x2.SESSION_BAR;
                if (SESSION_BAR) {
                    // let { SESSION_BAR } = f1x2          //Destructure f1x2 namespace
                    SESSION_BAR_INIT._sessionBar = SESSION_BAR;   //Initialise Session bar reference
                    SESSION_BAR_INIT._timer = SESSION_BAR && SESSION_BAR.useTimer; //Initialise timer
                    SESSION_BAR_INIT._net = SESSION_BAR && SESSION_BAR.useNet;   //Initialise net
                    SESSION_BAR_INIT.use && SESSION_BAR.setupDefault();
                }
            });
        }

        (window as any).CLIENT_WRAPPER_INIT.callbacks['autoplay-disable'].add(() => {
            // Stop the game from autoplaying
            this.props.stopAutoplay();
        });
        (window as any).CLIENT_WRAPPER_INIT.callbacks['game-pause'].add(() => {
            // Stop all game interactions
            this.props.spaceBarSpin(false);
            this.props.setBlockLayer(true);
        });
        (window as any).CLIENT_WRAPPER_INIT.callbacks['game-resume'].add(() => {
            // Enable interactions with the game
            this.props.spaceBarSpin(true);
            this.props.setBlockLayer(false);
            this.props.setAllButtonEnable();
        });
        // if ((window as any).CLIENT_WRAPPER_INIT.use && (window as any).CLIENT_WRAPPER_INIT.syncBalance) {

        (window as any).CLIENT_WRAPPER_INIT.callbacks['update-gameinfo'].add((type_: any, property_: any, value_: any) => {
            // example code
            let value //New value to determine

            //Switch on type of update
            switch (type_) {
                //Direct assignment
                case 1:
                    value = value_ //Set value
                    break
                //Append to current
                case 2:
                    value = `${(this as any)[property_]}${value_}` //Set value
                    break
                //Prepend to current
                case 3:
                    value = `${value_}${(this as any)[property_]}` //Set value
            }
            (window as any).GAME_INFO[property_] = (this as any)[property_] = value  //Update value
        });
        (window as any).CLIENT_WRAPPER_INIT.callbacks['update-balance'].add((value: any) => {
            // update game balance with value from clientAPI
            this.props.setApplicationBalance(Number(value));
            let balcObj: any;
            balcObj = {
                balance: Number(value), // balance current in game balance
                mode: "stake", // 'place' start of round | 'settle' end of round 
                stake: Number(this.props.coinList[this.props.selectedCoin])  // current in game stake
            };

            (window as any).CLIENT_WRAPPER_INIT.send("value-balance", balcObj);
            (window as any).GAME_INFO.balance = value;
        });
        (window as any).CLIENT_WRAPPER_INIT.callbacks['audio-enable'].add(() => {
            // enable sounds
            if (this.props.soundOnOff) {
                this.props.soundLoadStartFunction(true);
                this.props.stopAllBGMSound(false);
                this.props.stopAllSFXSound(false);
                this.props.playingSound(true);
            }
        });
        (window as any).CLIENT_WRAPPER_INIT.callbacks['audio-disable'].add(() => {
            // disable/mute all sounds
            if (this.props.soundOnOff) {
                this.props.playingSound(false);
                this.props.stopAllBGMSound(true);
                this.props.stopAllSFXSound(true);
            }
        });
        (window as any).CLIENT_WRAPPER_INIT.callbacks['quickspin-enable'].add(() => {
            this.props.setTurboMode(true);
            this.props.turboToggleButton(true);
        });
        (window as any).CLIENT_WRAPPER_INIT.callbacks['quickspin-disable'].add(() => {
            this.props.setTurboMode(false);
            this.props.turboToggleButton(false);
        });
        (window as any).CLIENT_WRAPPER_INIT.callbacks['paytable-open'].add(() => {
            if (isMobile) {
                this.props.showSettingPanelContainerForMobile(true, "paytable");
                this.props.setApplicationButtonpanelVisibility(false);
            } else {
                this.props.showPaytable();
            }
        });

        // Paytable closed from outside the game
        (window as any).CLIENT_WRAPPER_INIT.callbacks['paytable-close'].add(() => {
            // close game paytable
            if (isMobile) {
                this.props.showSettingPanelContainerForMobile(false, '');
                this.props.setApplicationButtonpanelVisibility(true);
            } else {
                this.props.hidePaytable();
            }
        });

        // Help opened from outside the game
        (window as any).CLIENT_WRAPPER_INIT.callbacks['help-open'].add(() => {
            if (isMobile) {
                this.props.showSettingPanelContainerForMobile(true, 'guide');
                this.props.setApplicationButtonpanelVisibility(false);
            } else {
                this.props.setMenuButtonClicked(true);
                this.props.showSettingGameRule(true);
            }
        });

        // Help closed from outside the game
        (window as any).CLIENT_WRAPPER_INIT.callbacks['help-close'].add(() => {
            // close help file
            if (isMobile) {
                this.props.showSettingPanelContainerForMobile(false, '');
                this.props.setApplicationButtonpanelVisibility(true);
            } else {
                this.props.setMenuButtonClicked(false);
            }
        });
        (window as any).CLIENT_WRAPPER_INIT.callbacks['history-open'].add(() => {
            // open game history
            if (isMobile) {
                this.props.showSettingPanelContainerForMobile(true, 'history');
                this.props.setApplicationButtonpanelVisibility(false);
            } else {
                this.props.setMenuButtonClicked(true);
                this.props.showBetHistory(true);
            }
        });

        // History closed from outside the game
        (window as any).CLIENT_WRAPPER_INIT.callbacks['history-close'].add(() => {
            // close game history
            if (isMobile) {
                this.props.showSettingPanelContainerForMobile(false, '');
                this.props.setApplicationButtonpanelVisibility(true);
            } else {
                this.props.setMenuButtonClicked(false);;
            }
            this.callback && this.callback();
        });
    }

    render() {
        return (<></>);
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'gameactionstate' | 'winShowerState' | 'winCelebrationState' | 'betPanelState' | 'behaviourState' | 'paytableState' | 'soundState' | 'basegameState' | 'applicationState' | 'freegameState' | 'asyncServerAction' | 'asyncInitAction' | 'reelgridState' | 'flowManagerState'>): IStateToProps =>
    ({
        isRequestSent: state.asyncServerAction.isRequestSent,
        gamePause: state.applicationState.gamePause,
        loadingPercent: state.asyncInitAction.loadingPercent,
        initResult: state.asyncInitAction.result,
        balanceResult: state.asyncInitAction.balanceResult,
        balanceInGame: state.basegameState.balance,
        spinResult: state.asyncServerAction.result,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        spinStart: state.reelgridState.spinStart,
        callFlowManager: state.flowManagerState.callFlowManager,
        inFreeGame: state.freegameState.inFreeGame,
        inAutoplay: state.basegameState.inAutoplay,
        autoplayCount: state.basegameState.autoplayCount,
        soundLoadStart: state.soundState.soundLoadStart,
        soundIsPlaying: state.soundState.soundIsPlaying,
        InTurboMode: state.reelgridState.InTurboMode,
        showPaytable: state.paytableState.showPaytable,
        showSettingGameRules: state.behaviourState.showSettingGameRules,
        isshowBetHistory: state.behaviourState.isshowBetHistory,
        buyInFeatureDeductAmt: state.behaviourState.buyInFeatureDeductAmt,
        blastStart: state.reelgridState.blastStart,
        startWinShower: state.winShowerState.startWinShower,
        startWinCelebration: state.winCelebrationState.startWinCelebration,
        actionResult: state.gameactionstate.result,
        showFullScreenButton: state.applicationState.showFullScreenButton,
        soundOnOff: state.applicationState.soundOnOff,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        stopAutoplay: (): any => dispatch(baseGameActions.stopAutoplay()),
        setApplicationAutoplayCount: (autoplaycount: number): any => dispatch(baseGameActions.setApplicationAutoplayCount(autoplaycount)),
        getApplicationHistoryResponse: (): any => dispatch(asyncServerActions.getApplicationHistoryResponse()),
        setApplicationBalance: (balanceResult: any): any => dispatch(baseGameActions.setApplicationBalance(balanceResult)),
        setUseBuyFeature: (useBuyAFeature: boolean): any => dispatch(wrapperActions.setUseBuyFeature(useBuyAFeature)),
        setSpaceBarDisable: (spacebarDisabled: boolean): any => dispatch(wrapperActions.setSpaceBarDisable(spacebarDisabled)),
        setOneClickRule: (oneClickRules: boolean): any => dispatch(wrapperActions.setOneClickRule(oneClickRules)),
        showHomeButton: (homeButton: boolean): any => dispatch(wrapperActions.showHomeButton(homeButton)),
        setMaxStake: (maximumStake: number): any => dispatch(wrapperActions.setMaxStake(maximumStake)),
        setMaxAutoPlay: (maximumAutoplay: number): any => dispatch(wrapperActions.setMaxAutoPlay(maximumAutoplay)),
        setHideNegativeValue: (hideNegativeWins: boolean): any => dispatch(wrapperActions.setHideNegativeValue(hideNegativeWins)),
        setDisableCoins: (disableCoins: boolean): any => dispatch(wrapperActions.setDisableCoins(disableCoins)),
        setDisableAutoplay: (disableAutoplay: boolean): any => dispatch(wrapperActions.setDisableAutoplay(disableAutoplay)),
        setClickToEnterFeature: (clickToEnterFeature: boolean): any => dispatch(wrapperActions.setClickToEnterFeature(clickToEnterFeature)),
        setBetLimit: (betLimit: number): any => dispatch(wrapperActions.setBetLimit(betLimit)),
        showPaytable: (): any => dispatch(paytableActions.showPaytable()),
        hidePaytable: (): any => dispatch(paytableActions.hidePaytable()),
        setTurboMode: (IsTurboMode: any): any => dispatch(reelGridActions.setTurboMode(IsTurboMode)),
        turboToggleButton: (turboToggle: any): any => dispatch(desktopSettingPanelGameLevel.turboToggleButton(turboToggle)),
        playingSound: (soundIsPlaying: boolean): any => dispatch(soundActions.playingSound(soundIsPlaying)),
        stopAllBGMSound: (stopBgSound: any): any => dispatch(soundActions.stopAllBGMSound(stopBgSound)),
        stopAllSFXSound: (stopAllSfxSound: boolean): any => dispatch(soundActions.stopAllSFXSound(stopAllSfxSound)),
        setApplicationButtonpanelVisibility: (visible: boolean): any => dispatch(aplicationActions.setApplicationButtonpanelVisibility(visible)),
        spaceBarSpin: (spinWithSpaceBar: boolean): any => dispatch(keyboardListenerActions.spaceBarSpin(spinWithSpaceBar)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),

    }))(withWrapperCommConfiguration(WrapperComm)));