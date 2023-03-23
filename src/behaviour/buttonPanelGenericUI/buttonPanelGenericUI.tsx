import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withButtonPanelConfiguration from "./../../core/components/buttonpanel/configuration/withButtonPanelConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import { actions as layoutsActions } from "../../core/reducers/layoutsStateReducer";
import PIXI from "pixi.js";
import { isMobile } from "react-device-detect";
import { actions as reelsActions } from "../../core/reducers/reelsStateReducer";
import { actions as reelsGridActions, actions as reelGridActions } from "../../core/reducers/reelgridStateReducer";
import { actions as gridsActions } from "../../core/reducers/gridStateReducer";
import { actions as baseGameActions } from "../../core/reducers/baseGameReducer";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as asyncActions } from "../../core/reducers/asyncServerResponseReducer";
import { actions as paytableActions } from "../../core/reducers/paytableReducer";
import { actions as autoplayActions } from "../../core/reducers/autoplayReducer";
import { actions as menuActions } from "../../core/reducers/menuReducer";
import { actions as desktopSettingPanelActions } from "../../core/reducers/desktopSettingPanelReducer";
import { actions as betPanelAction } from "../../core/reducers/betPanelReducer";
import { actions as winpresentationAction } from "../../core/reducers/winPresentationReducer";
import { actions as applicationStateActions } from "../../core/reducers/applicationStateReducer";
import { configGame } from "../../data/config";
import { Texture } from "pixi.js";
import { TIMER } from "../../core/utills";
import { actions as soundActions } from "../../core/reducers/soundReducer";
import { actions as gameLevelResponseActions } from "../../gamereducer/asyncGameLevelServerResponseReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { actions as flowManagerAction } from "../../core/reducers/flowManagerReducer";



interface IProps {
    [x: string]: any;
}

interface IStore {
    [x: string]: any;
}


interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class ButtonPanelGenericUI extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected buttonPanelGenericUIContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;
    protected button_name_1: string;
    protected button_name_2: string;
    protected button_name_3: string;
    protected button_name_4: string;
    protected button_name_5: string;
    protected button_name_6: string;
    protected button_name_7: string;
    protected button_name_8: string;
    protected button_name_9: string;
    protected button_name_10: string;
    protected button_name_11: string;
    protected button_name_12: string;
    protected button_name_13: string;
    protected button_name_14: string;
    protected button_name_15: string;
    protected button_name_16: string;
    protected coinValueObject: any;
    protected balanceValueObject: any;
    protected autoplayCounterObject: any;
    protected autoplayStopButtonObject: any;
    protected autoplayStopButtonX: number = 290;
    protected autoplayStopButtonY: number = 1420;
    protected autoplayCounterX: number = 790;
    protected autoplayCounterY: number = 1420;
    protected textScaling: number = 0.9;
    protected autoPlayButtonName: string = "";
    protected storeCurrentBet: number = 0;
    protected textBalancelabel: any;
    protected textBetlabel: any;
    protected textBetColon: any;
    protected textBetValue: any;
    protected textCoinValuelabel: any;
    protected textCoinColon: any;
    protected textCoinValue: any;
    protected textWinLabel: any;
    protected textWinColon: any;
    protected textWinValue: any;
    private AllTimer: any[] = [];

    constructor(props: IProps) {
        super(props);
        this.AllTimer = [];
        this.app = props.app;
        this.button_name_1 = "btn_spin";
        this.button_name_2 = "btn_paytable";
        this.button_name_3 = "btn_bet_increase";
        this.button_name_4 = "btn_bet_decrease";
        this.button_name_5 = "btn_sound";
        this.button_name_6 = "btn_gameRule";
        this.button_name_7 = "btn_autoplay_stop";
        this.button_name_8 = "btn_autoplay";
        this.button_name_9 = "btn_home";
        this.button_name_10 = "btn_maxbet";
        this.button_name_11 = "btn_setting";
        this.button_name_12 = "btn_autoplay2";
        this.button_name_13 = "btn_soundOff";
        this.button_name_14 = "btn_responsibleGammingIcon";
        this.button_name_15 = "btn_spinStop";
        this.button_name_16 = "btn_sounddisable";

        this.buttonPanelGenericUIContainer = {};
        this.state = {
            [this.button_name_1]: { enable: false },
            [this.button_name_2]: { enable: false },
            [this.button_name_3]: { enable: false },
            [this.button_name_4]: { enable: false },
            [this.button_name_5]: { enable: false },
            [this.button_name_6]: { enable: false },
            [this.button_name_7]: { enable: false },
            [this.button_name_8]: { enable: false },
            [this.button_name_9]: { enable: false },
            [this.button_name_10]: { enable: false },
            [this.button_name_11]: { enable: false },
            [this.button_name_12]: { enable: false },
            [this.button_name_13]: { enable: false },
            [this.button_name_14]: { enable: false },
            [this.button_name_15]: { enable: false },
            [this.button_name_16]: { enable: false },
            firstLoad: 1
        }
        if (isMobile) {
            this.ui_mode = "mobile";
            this.autoPlayButtonName = "btn_autoplay2";

        } else {
            this.ui_mode = "desktop";
            this.autoPlayButtonName = "btn_autoplay";
        }

        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
        this.setVisibilityOfButtonAccordingToBackend();
    }

    //this method is setting visibility of button from coming backend
    setVisibilityOfButtonAccordingToBackend() {
        this.displayUI.map((data: any) => {
            if (data.name === this.button_name_1) {
                data.visible = this.props.spinBtnVisibility;
            }
            if (data.name === this.button_name_2) {
                data.visible = this.props.paytableBtnVisibility;
            }
            if (data.name === this.button_name_3) {
                data.visible = this.props.increaseBetBtnVisibility;
            }
            if (data.name === this.button_name_4) {
                data.visible = this.props.decreaseBetBtnVisibility;
            }
            if (data.name === this.button_name_10) {
                data.visible = this.props.maxBetBtnVisibility;
            }
            if (data.name === "btn_autoplay") {
                data.visible = true;
            }
            if (data.name === "btn_autoplay_stop") {
                data.visible = false;
            }
            if (isMobile) {
                if (data.name === "btn_autoplay_stop") {
                    data.visible = false;
                }
            }
        });

    }

    //this method will decrease the bet
    onBetDecrease() {
        this.props.setSelectedCoin(this.props.selectedCoin - 1)
        this.enableAllBtn(["btn_autoplay_stop"]);
        if (this.props.selectedCoin === 0) {
            this.enableAllBtn(["btn_bet_decrease"]);
        }
        this.enableAllBtn(["btn_bet_decrease", "btn_autoplay_stop"]);
    }

    //this method will increase the bet
    onBetIncrease() {
        if (this.props.selectedCoin === this.props.coinList.length - 2) {
            this.props.setSelectedCoin(this.props.selectedCoin + 1)
            this.enableAllBtn(["btn_autoplay_stop", "btn_bet_increase"]);
        } else {
            this.props.setSelectedCoin(this.props.selectedCoin + 1)
            this.enableAllBtn(["btn_autoplay_stop"]);
        }
        this.enableAllBtn(["btn_bet_increase", "btn_autoplay_stop"]);
    }


    //this method will show autoplay
    onAutoplayShow() {
        this.props.showAutoplay();
        this.props.setAllButtonDisable();
    }
    //this method will show menu
    onMenuShow() {
        this.props.showMenuUI();
        this.props.limitOfLoss(false);
        this.props.setAllButtonDisable();
    }

    //this method will call when autoplay gets stop and it will set autoplay stop button state disable
    onAutoplayStop() {
        this.props.setIsScreenOnOff(false); // let the screen turn off.
        this.setState((prevState) => {
            return {
                ...prevState,
                ["btn_autoplay_stop"]: { enable: false }
            }
        });
        this.props.setApplicationAutoplayCount(0);
        this.props.stopAutoplay();
    }


    //this method helps to set the property true for showing paytable
    onPaytable() {
        this.props.showPaytable();
    }


    //this method helps to set the property true for spinning
    onSpin() {
        this.cleanAllTimer();
        let timer = TIMER.TimerManager.createTimer(100);
        timer.on('end', (e: any) => {
            e.remove();
            let condition;
            if (this.props.firstSpinAfterLoad) {
                condition = ((this.props.balance - this.props.coinList[this.props.selectedCoin] >= this.props.coinList[this.props.selectedCoin]) || (this.props.balance - this.props.coinList[this.props.selectedCoin]) == 0) || ((this.props.balance - this.props.coinList[this.props.selectedCoin]) >= 0);
                this.props.spinAfterLoad(false);
            }
            else {
                condition = ((this.props.balance - this.props.coinList[this.props.selectedCoin] >= this.props.coinList[this.props.selectedCoin]));
            }
            if (condition) {
                this.storeCurrentBet = this.props.coinList[this.props.selectedCoin];
                this.props.getApplicationSpinResponse();
                this.props.setStopActive(true);
                this.props.stopWinPresentation()
                this.props.setAllButtonDisable();
                this.props.resetReelState();
            }
            else {
                if ((this.props.balance - this.props.coinList[this.props.selectedCoin]) > 0) {
                    this.disableAllBtn(["btn_bet_decrease"]);
                }
                else {
                    this.disableAllBtn();
                }
            }
        });
        timer.start();
        this.AllTimer.push(timer);


    }

    //this method will handle sounds on button's visibility accordingly
    soundOnButtonFunctionality() {
        if (this.props.soundIsPlaying && this.props.soundOnOff) {
            this.props.soundLoadStartFunction(true)
            this.props.playingSound(false);
            this.props.stopAllBGMSound(true);
            this.props.stopAllSFXSound(true);
        }
    }

    //this method will handle mute button's visibility accordingly
    soundOffButtonFunctionality() {
        if (this.props.soundIsPlaying && this.props.soundOnOff) {
            this.props.soundLoadStartFunction(true);
            this.props.playingSound(false);
            this.props.stopAllBGMSound(true);
            this.props.stopAllSFXSound(true);
        } else {
            this.props.stopAllBGMSound(false);
            this.props.stopAllSFXSound(false);
            this.props.playingSound(true);
        }
    }
    helptextDisplayFunctionality() {
        if (!this.props.showHelpText) {
            this.props.setApplicationShowHelpText(true);
            this.props.setAllButtonDisable();
            UIManager.getRef("btn_spinStop").visible = false;
        }
    }

    //this panel will hit the property by which setting panel will display or hide
    settingPanelDisplayFunctionality() {
        if (this.props.showSettingPanelUI) {
            this.props.showDesktopSettingPanelUI(false);
            this.props.setAllButtonEnable();
        } else {
            this.props.showDesktopSettingPanelUI(true);
            this.props.setAllButtonDisable();
        }
    }

    showAutoPlay() {
        if (isMobile) {
            if (!this.props.enableAutoPlay || (this.props.enableAutoPlay && (this.props.jurisdictionKey == "es" || this.props.jurisdictionKey == "nl"))) {
                this.props.showMenuUI();
            } else if (this.props.enableAutoPlay) {
                this.onAutoplayShow();
            }
            this.props.setMobMenuVisibility(true);
        } else {
            this.onAutoplayShow();
        }
    }


    onBetDecreaseForMinBalance() {
        // this.props.setSelectedCoin(this.props.currentBetIndex);
        this.props.setSelectedCoin(this.props.selectedCoin - 1);
        this.enableAllBtn(["btn_autoplay_stop", "btn_bet_increase"]);
        if (this.props.selectedCoin === 0) {
            this.enableAllBtn(["btn_bet_decrease"]);
        }
        this.enableAllBtn(["btn_bet_decrease", "btn_autoplay_stop", "btn_bet_increase"]);
    }


    //this method will be called when a button gets clicked
    handleEvent = (e: any) => {
        e.stopPropagation();
        this.props.setApplicationButtonClicked(true);
        this.props.setApplicationButtonClicked(false);
        switch (e.target.name) {
            case this.button_name_1:
                navigator.onLine ? this.props.visibleNoInternetPopUp(false) : this.props.visibleNoInternetPopUp(true);
                this.props.setApplicationSpinButtonClicked(true);
                this.onSpin();
                return;
            case this.button_name_2:
                this.onPaytable();
                return;
            case this.button_name_3:
                if (this.props.betList[this.props.currentBetIndex + 1] <= this.props.balance - this.storeCurrentBet) {
                    this.props.getApplicationIncreaseBetResponse();
                    this.onBetIncrease();
                    this.props.betList[this.props.currentBetIndex + 2] > this.props.balance - this.storeCurrentBet && this.enableAllBtn(["btn_bet_increase"]);
                }
                else {
                    this.props.betList[this.props.currentBetIndex + 1] > this.props.balance - this.storeCurrentBet && this.enableAllBtn(["btn_bet_increase"]);
                }
                return;
            case this.button_name_4:
                if ((this.props.balance - this.props.coinList[this.props.selectedCoin]) < this.props.coinList[this.props.selectedCoin]) {
                    this.props.stopAutoplay();
                    this.setIncreaseButtonDisable(this.props);
                    this.props.getApplicationDecreaseBetResponse();
                    this.onBetDecreaseForMinBalance();
                }
                else {
                    this.props.getApplicationDecreaseBetResponse();
                    this.onBetDecrease();
                }
                return;
            case this.button_name_5:
                this.soundOnButtonFunctionality();
                return;
            case this.button_name_6:
                this.helptextDisplayFunctionality();
                return;
            case this.button_name_7:
                this.onAutoplayStop();
                return;
            case this.button_name_8:
                if (isMobile) {
                    this.props.buttonClickedName(this.button_name_8);
                    if (this.props.autoPlaySimpleMode || (this.props.jurisdictionKey == "es" || this.props.jurisdictionKey == "nl")) {
                        this.props.showMenuUI();
                        this.props.setMobMenuVisibility(true);
                    }
                    else {
                        this.showAutoPlay();
                    }
                }



                if (this.props.autoPlaySimpleMode) {
                    if (isMobile) {
                        this.props.showMenuUI();
                        this.props.setMobMenuVisibility(true);
                    }
                    else {
                        this.simpleAutoplayStart();
                    }
                }
                else {
                    if (isMobile) {
                        this.props.buttonClickedName(this.button_name_8);
                        if (this.props.autoPlaySimpleMode || (this.props.jurisdictionKey == "es" || this.props.jurisdictionKey == "nl")) {
                            this.props.showMenuUI();
                            this.props.setMobMenuVisibility(true);
                        }
                        else {
                            this.showAutoPlay();
                        }
                    } else {
                        this.showAutoPlay();
                    }


                }
                isMobile && this.props.showDesktopSettingPanelUI(true);
                return;
            case this.button_name_9:
                this.openUrl("http://www.spielen-mit-verantwortung.de/gluecksspielsucht.html");
                return;
            case this.button_name_10:
                if ((this.props.selectedCoin == this.props.coinList.length - 1)) {
                    this.props.setApplicationSpinButtonClicked(true);
                    this.onSpin();
                }
                else if ((this.props.betList[this.props.coinList.length - 1] > this.props.balance)) {
                    this.enableAllBtn(["btn_maxbet"]);
                }
                else {
                    this.props.setSelectedCoin(this.props.coinList.length - 1);
                    this.props.getApplicationMaxBetResponse();
                }
                return;
            case this.button_name_11:
                this.settingPanelDisplayFunctionality();
                return;
            case this.button_name_12:
                if (isMobile && this.props.autoPlaySimpleMode) {
                    this.simpleAutoplayStart();
                } else {
                    this.props.buttonClickedName(this.button_name_12);
                    if (isMobile && (this.props.jurisdictionKey == "es" || this.props.jurisdictionKey == "nl")) {
                        if (!this.props.enableAutoPlay) {
                            this.props.showMenuUI();
                        } else if (this.props.enableAutoPlay) {
                            this.onAutoplayShow();
                        }
                        this.props.setMobMenuVisibility(true);

                    } else {
                        this.showAutoPlay();
                    }
                }
                return;
            case this.button_name_13:
                this.soundOffButtonFunctionality();
                return;
            case this.button_name_14:
                this.openUrl(this.props.responsibleGamingUrl);
                return;
            case this.button_name_15:
                this.onStopSpin();
                return;
            default:
                return 'No buttons';
        }
    }
    setIncreaseButtonDisable(props: any) {
        let index;
        props.currentBetIndex + 1 == props.betList.length ? index = props.currentBetIndex : index = props.currentBetIndex + 1;
        ((props.betList[index] > props.balance - this.storeCurrentBet)) && this.enableAllBtn(["btn_bet_increase"]);
    }
    onStopSpin() {
        if (!this.props.isSlamSpin) {
            this.disableAllBtn();
            let _time = 500;
            let timer = TIMER.TimerManager.createTimer(_time);
            timer.on('end', (e: any) => {
                e.remove();
                if (!this.props.isSlamSpin) {
                    this.props.setStopActive(false);
                    this.props.setSlamSpin(true);
                }
            });
            timer.start();
            this.AllTimer.push(timer);
        }
        // if (!this.props.isSlamSpin) {

        //     this.disableAllBtn();
        //     this.props.setStopActive(false);
        //     this.props.setSlamSpin(true);
        // }

    }
    showSpinStopButton(props: any) {
        if ((props.stopButtonActive && !props.allButtonEnable && !props.inFreeGame && props.spinResponseReceived && !props.disableQuickStop && !props.InTurboMode)) {
            UIManager.getRef("btn_spinStop").texture = Texture.from("slam.png");
            UIManager.getRef("btn_spinStop").visible = true;
        } else if (props.startSpinBySpaceBar && !props.isRemoveKeyBoardEvent) {
            UIManager.getRef("btn_spinStop").texture = Texture.from("slam.png");
            UIManager.getRef("btn_spinStop").visible = true;
        }
        else if (props.allButtonEnable || props.allSpinComplete || props.InTurboMode) {
            UIManager.getRef("btn_spinStop").visible = false;

        }
        else if (!props.stopButtonActive && !props.inAutoplay && !props.InTurboMode) {
            UIManager.getRef("btn_spinStop").texture = Texture.from("slam_disable.png");
        }

    }
    openUrl(path: string) {
        (window as any).top.location.href = path;
    }


    simpleAutoplayStart() {
        this.props.setIsScreenOnOff(true);// let the screen turn on.
        if (((this.props.balance - this.props.coinList[this.props.selectedCoin]) - this.props.coinList[this.props.selectedCoin] > 0) || this.props.winAmount > 0) {
            this.props.setAmountForAutoplay(this.props.transitionBalance / 100);
            this.props.hideAutoplay();
            this.props.setAutoplay(Number.POSITIVE_INFINITY);
            this.props.setApplicationAutoplayCount(Number.POSITIVE_INFINITY);
            this.props.startAutoplay();
            this.storeCurrentBet = this.props.coinList[this.props.selectedCoin];
            this.props.getApplicationSpinResponse();
            this.props.stopWinPresentation();
            this.props.resetReelState();
            this.props.setAllButtonDisable();
        }

    }
    decreaseButtonEnable() {
        if ((this.props.balance - this.props.coinList[this.props.selectedCoin]) - this.props.coinList[this.props.selectedCoin] >= 0) {
        }
        else {
            if ((this.props.balance - this.props.coinList[this.props.selectedCoin]) > 0) {
                this.disableAllBtn(["btn_bet_decrease"]);
            }
            else {
                this.disableAllBtn();

            }
        }
    }
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.enableParticularButton !== this.props.enableParticularButton) {
            nextProps.enableParticularButton && this.decreaseButtonEnable();
            return false;
        }
        if (nextProps.currentBetIndex !== this.props.currentBetIndex ||
            nextProps.allButtonEnable !== this.props.allButtonEnable ||
            nextProps.showWinCelebration !== this.props.showWinCelebration ||
            nextProps.autoplayCount !== this.props.autoplayCount ||
            nextProps.autoplayNextSpin !== this.props.autoplayNextSpin ||
            nextProps.inAutoplay !== this.props.inAutoplay ||
            nextProps.showAutoplayUI !== this.props.showAutoplayUI ||
            nextProps.feature !== this.props.feature ||
            nextProps.spinResponseReceived !== this.props.spinResponseReceived ||
            nextProps.layoutMode !== this.props.layoutMode ||
            nextProps.spinStart !== this.props.spinStart ||
            nextProps.allSpinComplete !== this.props.allSpinComplete ||
            nextProps.selectedCoin !== this.props.selectedCoin ||
            nextProps.featureJustFinished !== this.props.featureJustFinished
            || nextProps.increaseBetResult !== this.props.increaseBetResult
            || nextProps.isSlamSpin !== this.props.isSlamSpin
            || nextProps.isRemoveKeyBoardEvent !== this.props.isRemoveKeyBoardEvent
            || nextProps.startSpinBySpaceBar !== this.props.startSpinBySpaceBar


        ) {
            if (nextProps.isSlamSpin && nextProps.isSlamSpin !== this.props.isSlamSpin) {
                this.disableAllBtn(["btn_autoplay_stop"]);
                return false;
            }
            if (nextProps.isRemoveKeyBoardEvent && nextProps.isRemoveKeyBoardEvent !== this.props.isRemoveKeyBoardEvent) {
                this.disableAllBtn();
                this.props.setStopActive(false);
                this.props.flowManagerCalled(false);
                this.showSpinStopButton(nextProps);
                this.onStopSpin();


            }
            if (nextProps.startSpinBySpaceBar && nextProps.startSpinBySpaceBar !== this.props.startSpinBySpaceBar) {

                this.props.setApplicationSpinButtonClicked(true);
                this.onSpin();
                this.props.flowManagerCalled(false);
                UIManager.getRef("btn_spinStop").texture = Texture.from("slam.png");
                UIManager.getRef("btn_spinStop").visible = true;
            }
            if (nextProps.spinStart) {
                nextProps.particularButtonEnable(false);
                this.props.flowManagerCalled(false);
                this.showSpinStopButton(nextProps);
            }
            if (nextProps.increaseBetResult !== this.props.increaseBetResult && !nextProps.showWinCelebration) {
                this.enableAllBtn(["btn_autoplay_stop"]);
                this.setIncreaseButtonDisable(nextProps);
            }
            if (nextProps.allSpinComplete) {
                this.props.setApplicationSpinButtonClicked(false);
            }
            if (nextProps.selectedCoin !== this.props.selectedCoin) {
                this.coinValueObject && (this.coinValueObject.text = nextProps.coinList[nextProps.stakeTore]);
            }
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode)
            }
            if (nextProps.spinResponseReceived && nextProps.spinResponseReceived !== this.props.spinResponseReceived) {

                if (configGame["SPIN_TYPE"] === 2) {
                    const {
                        startRGSpin
                    } = nextProps;
                    startRGSpin();
                } else {
                    const {
                        startGridSpin
                    } = nextProps;
                    startGridSpin();
                }
            }
            if (nextProps.currentBetIndex !== this.props.currentBetIndex && !nextProps.inAutoplay && nextProps.layoutMode === this.props.layoutMode || nextProps.allButtonEnable && !nextProps.inAutoplay &&
                nextProps.layoutMode === this.props.layoutMode) {

                if (nextProps.feature.length > 0 || this.props.autoplayCount > 0) {
                    this.disableAllBtn();
                } else {
                    if (nextProps.isActiveAll && nextProps.allSpinComplete) {
                        this.enableAllBtn(["btn_autoplay_stop"]);
                        this.setIncreaseButtonDisable(nextProps);
                    }
                }
                if (nextProps.selectedCoin === nextProps.betList.length - 1) {
                    this.enableAllBtn(["btn_bet_increase", "btn_autoplay_stop"]);
                }
                if (nextProps.selectedCoin === 0 && !(this.props.autoplayCount > 0)) {
                    this.enableAllBtn(["btn_bet_decrease", "btn_autoplay_stop"]);
                }
            }

            if (!nextProps.allButtonEnable && nextProps.allButtonEnable !== this.props.allButtonEnable) {
                this.textVisibility(nextProps);
                if (nextProps.inAutoplay) {
                    this.disableAllBtn(["btn_autoplay_stop"]);
                } else {
                    this.disableAllBtn();
                }
            }
            if (nextProps.inAutoplay && nextProps.inAutoplay === this.props.inAutoplay) {
                this.textVisibility(nextProps);
                this.autoplayIsTrue();
            } else if (!nextProps.inAutoplay && nextProps.inAutoplay !== this.props.inAutoplay) {
                this.autoplayIsFalse();
                return false;
            }
            if (nextProps.autoplayCount > 0 && nextProps.inAutoplay && nextProps.autoplayNextSpin
                || nextProps.autoplayCount > 0 && nextProps.featureJustFinished) {
                this.autoplayIsTrue();
                this.disableAllBtn(["btn_autoplay_stop"]);
                if (!nextProps.inFreeGame) {
                    if (nextProps.featureJustReTriggered == false && !nextProps.showWinCelebration) {
                        if (nextProps.allSpinComplete && !nextProps.winPresentationStart) {
                            this.spinCallingWhileAutoplay(nextProps);
                        }
                    }
                }
            }
            if (nextProps.showWinCelebration !== this.props.showWinCelebration) {
                nextProps.showWinCelebration && this.disableAllBtn();

            }
        }
        return true;
    }

    // this method will call spin method as much time as autoSpin Count left
    spinCallingWhileAutoplay(nextProps: any) {
        let timer = TIMER.TimerManager.createTimer(1000);
        timer.on('end', (e: any) => {
            e.remove();
            this.onSpin();
        });
        timer.start();
        this.AllTimer.push(timer);
        let remainingAutoplay = nextProps.autoplayCount - 1;
        if (remainingAutoplay <= 0) {
            this.props.stopAutoplay();
            this.displayUI.map((data: any) => {
                if (data.name === "btn_autoplay") {
                    data.visible = true;
                }
                if (data.name === "btn_autoplay_stop") {
                    data.visible = false;
                }
            });
            if (isMobile) {
                this.displayUI.map((data: any) => {
                    if (data.name === "btn_autoplay_stop") {
                        data.visible = false;
                    }
                });
            }
        }
        this.props.setApplicationAutoplayCount(remainingAutoplay);
    }

    //this method will call when autoplay has false,this will enable all buttons and un hide autoplay button
    autoplayIsFalse() {
        this.displayUI.map((data: any) => {
            if (data.name === "btn_autoplay") {
                data.visible = true
            }
            if (data.name === "btn_autoplay_stop") {
                data.visible = false;
            }
        });

        if (isMobile) {
            this.displayUI.map((data: any) => {
                if (data.name === "btn_autoplay_stop" || data.name === "auto_play_Stop_Image_text") {
                    data.visible = false;
                }
            });
        }
    }

    //this method will call when autoplay has started,this will disable all buttons and un hide autoplay stop button
    autoplayIsTrue() {
        this.disableAllBtn(["btn_autoplay_stop"]);
        this.displayUI.map((data: any) => {
            if (data.name === "btn_autoplay") {
                data.visible = false
            }
            if (data.name === "btn_autoplay_stop") {
                data.visible = true
            }
        });
        if (isMobile) {
            this.displayUI.map((data: any) => {
                if (data.name === "btn_autoplay_stop" || data.name === "auto_play_Stop_Image_text") {
                    data.visible = true
                }
            });
        }
    }

    //when layout changes, this method will be called
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name)
            }
        });
        this.orientation();
    }

    textVisibility(nextProps: any) {
        this.displayUI.map((data: any) => {
            if (data.name == "text_maxBet_label1" || data.name == "text_maxBet_label2") {
                data.visible = false;
            } else if (data.name == "text_maxBet_label1_grey" || data.name == "text_maxBet_label2_grey" || data.name == "text_maxBet_label2_grey") {
                data.visible = true;
            }
            if (nextProps.inAutoplay) {
                if (data.name == "text_AUTOPLAY_label1_grey") {
                    data.visible = false;
                }
                if (data.name == "text_AUTOPLAY_label1") {
                    data.visible = true;
                }
            }
            else {
                if (data.name == "text_AUTOPLAY_label1_grey") {
                    data.visible = true;
                }
                if (data.name == "text_AUTOPLAY_label1") {
                    data.visible = false;
                }
            }
        });
    }
    textEnableVisibility() {
        this.displayUI.map((data: any) => {
            if (data.name == "text_maxBet_label1" || data.name == "text_maxBet_label2" || data.name == "text_AUTOPLAY_label1" || data.name == "text_AUTOPLAY_label2") {
                data.visible = true;
            }
            if (data.name == "text_maxBet_label1_grey" || data.name == "text_maxBet_label2_grey" || data.name == "text_AUTOPLAY_label1_grey") {
                data.visible = false;
            }
        });
    }
    setButtontextPostion() {
        if (this.props.languageCode === 'sr' ||
            this.props.languageCode === 'hr' ||
            this.props.languageCode === 'ru' ||
            this.props.languageCode === 'it'
            || this.props.languageCode === 'es'
            || this.props.languageCode === 'bg'
            || this.props.languageCode === 'ro'
            || this.props.languageCode === 'fr') {
            UIManager.getRef("text_coin_value_LABEL") && (UIManager.getRef("text_coin_value_LABEL").y = 900);
        }
    }

    setButtontextPostion2() {
        if (this.props.jurisdictionKey !== "social") {
            switch (this.props.languageCode) {
                case 'pl':
                    this.textBalancelabel && (this.textBalancelabel.y = 900);
                    this.textBetlabel && (this.textBetlabel.x = 320);
                    this.textBetColon && (this.textBetColon.x = 325);
                    this.textBetValue && (this.textBetValue.x = 330);
                    break;

                case 'hr':
                    this.textBalancelabel && (this.textBalancelabel.y = 900);
                    this.textBetlabel && (this.textBetlabel.x = 290);
                    this.textBetColon && (this.textBetColon.x = 295);
                    this.textBetValue && (this.textBetValue.x = 300);
                    break;

                case 'hu':
                    this.textBalancelabel && (this.textBalancelabel.y = 900);
                    this.textBetlabel && (this.textBetlabel.x = 290);
                    this.textBetColon && (this.textBetColon.x = 295);
                    this.textBetValue && (this.textBetValue.x = 300);
                    break;
                case 'nb':
                    this.textBetlabel && (this.textBetlabel.x = 320);
                    this.textBetColon && (this.textBetColon.x = 325);
                    this.textBetValue && (this.textBetValue.x = 330);
                    break;
                case 'ru':
                    this.textBetlabel && (this.textBetlabel.x = 320);
                    this.textBetColon && (this.textBetColon.x = 325);
                    this.textBetValue && (this.textBetValue.x = 330);
                    break;
                default:
                    this.textBalancelabel && (this.textBalancelabel.y = 910);
                    this.textBetlabel && (this.textBetlabel.x = 295);
                    this.textBetColon && (this.textBetColon.x = 300);
                    this.textBetValue && (this.textBetValue.x = 305);
            }
        }
    }

    //for leftcontainer
    setPalyerMsgTextPostion() {
        if (this.props.jurisdictionKey !== "social") {
            switch (this.props.languageCode) {
                case 'sv':
                case 'de':
                case 'pt':
                case 'da':
                    this.textBetlabel && (this.textBetlabel.x = 333);
                    this.textBetColon && (this.textBetColon.x = 340);
                    this.textBetValue && (this.textBetValue.x = 345);
                    break;
                case 'it':
                    this.textBetlabel && (this.textBetlabel.x = 351);
                    this.textBetColon && (this.textBetColon.x = 355);
                    this.textBetValue && (this.textBetValue.x = 359);

                    this.textCoinValuelabel && (this.textCoinValuelabel.x = 790);
                    this.textCoinColon && (this.textCoinColon.x = 795);
                    this.textCoinValue && (this.textCoinValue.x = 800);
                    break;
                case 'es':
                    this.textBetlabel && (this.textBetlabel.x = 328);
                    this.textBetColon && (this.textBetColon.x = 332);
                    this.textBetValue && (this.textBetValue.x = 338);

                    this.textCoinValuelabel && (this.textCoinValuelabel.x = 765);
                    this.textCoinColon && (this.textCoinColon.x = 770);
                    this.textCoinValue && (this.textCoinValue.x = 778);
                    break;
                case 'gr':
                    this.textBetlabel && (this.textBetlabel.x = 392);
                    this.textBetColon && (this.textBetColon.x = 395);
                    this.textBetValue && (this.textBetValue.x = 400);

                    this.textCoinValuelabel && (this.textCoinValuelabel.x = 765);
                    this.textCoinColon && (this.textCoinColon.x = 770);
                    this.textCoinValue && (this.textCoinValue.x = 775);
                    break;
                case 'bg':
                case 'ro':
                    this.textBetlabel && (this.textBetlabel.x = 295);
                    this.textBetColon && (this.textBetColon.x = 300);
                    this.textBetValue && (this.textBetValue.x = 305);

                    this.textCoinValuelabel && (this.textCoinValuelabel.x = 778);
                    this.textCoinColon && (this.textCoinColon.x = 781);
                    this.textCoinValue && (this.textCoinValue.x = 785);
                    break;
                default:
                    this.textBetlabel && (this.textBetlabel.x = 295);
                    this.textBetColon && (this.textBetColon.x = 300);
                    this.textBetValue && (this.textBetValue.x = 305);

                    this.textCoinValuelabel && (this.textCoinValuelabel.x = 752);
                    this.textCoinColon && (this.textCoinColon.x = 757);
                    this.textCoinValue && (this.textCoinValue.x = 762);
            }
        }

    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        this.orientation();
        if (!isMobile && !this.props.soundOnOff) {
            UIManager.getRef(this.button_name_16) && (UIManager.getRef(this.button_name_16).visible = true);
            UIManager.getRef(this.button_name_5) && (UIManager.getRef(this.button_name_5).visible = false);
            UIManager.getRef(this.button_name_13) && (UIManager.getRef(this.button_name_13).visible = false);
        } else {
            UIManager.getRef(this.button_name_16) && (UIManager.getRef(this.button_name_16).visible = false);
        }
        let timer = TIMER.TimerManager.createTimer(10);
        timer.on('end', (e: any) => {
            e.remove();
            this.showSpinStopButton(this.props);
            this.props.disableQuickStop && (UIManager.getRef("btn_spinStop").visible = false);
            isMobile && !this.props.inAutoplay && UIManager.getRef("auto_play_Stop_Image_text") && (UIManager.getRef("auto_play_Stop_Image_text").visible = false);

        });
        timer.start();
        this.AllTimer.push(timer);

        this.initializeObjectInVariable();
        if (!isMobile) {
            let maxBetLabel1: any, maxBetLabel2: any, autoplayLabel1: any;
            maxBetLabel1 = UIManager.getRef("text_maxBet_label1");
            maxBetLabel2 = UIManager.getRef("text_maxBet_label2");
            autoplayLabel1 = UIManager.getRef("text_AUTOPLAY_label1");
            UIManager.getRef("btn_maxbet").mousedown = (event: any) => {
                maxBetLabel1.scale.set(this.textScaling);
                maxBetLabel2.scale.set(this.textScaling);
            }
            UIManager.getRef("btn_maxbet").mouseup = (event: any) => {
                maxBetLabel1.scale.set(1);
                maxBetLabel2.scale.set(1);
            }

            UIManager.getRef("btn_maxbet").mouseout = (event: any) => {
                maxBetLabel1.scale.set(1);
                maxBetLabel2.scale.set(1);
            }
            UIManager.getRef("btn_autoplay").mousedown = (event: any) => {
                autoplayLabel1.scale.set(this.textScaling);
            }

            UIManager.getRef("btn_autoplay").mouseup = (event: any) => {
                autoplayLabel1.scale.set(1);
            }

            UIManager.getRef("btn_autoplay").mouseout = (event: any) => {
                autoplayLabel1.scale.set(1);
            }
        }
        if (this.props.autoplayCount >= 0) {
            if (this.props.autoplayCount === 0) {
                this.autoplayCounterObject && (this.autoplayCounterObject.visible = false);
                UIManager.getRef("auto_play_text_Image") && (UIManager.getRef("auto_play_text_Image").visible = false);
            } else {
                this.autoplayCounterObject && (this.autoplayCounterObject.visible = true);
                UIManager.getRef("auto_play_text_Image") && (UIManager.getRef("auto_play_text_Image").visible = true);
            }
            this.props.autoplayCount !== Infinity && this.setTextValue("Text_COUNT_AP", this.props.autoplayCount);
            this.props.autoplayCount === Infinity && this.setTextValue("Text_COUNT_AP", "∞");
        }
        if (isMobile) {
            if (window.innerWidth < window.innerHeight) {
                this.autoplayStopButtonObject.x = this.autoplayStopButtonX;
                this.autoplayStopButtonObject.y = this.autoplayStopButtonY;
                this.autoplayCounterObject.x = this.autoplayCounterX;
                this.autoplayCounterObject.y = this.autoplayCounterY;
                UIManager.getRef("auto_play_text_Image") && (UIManager.getRef("auto_play_text_Image").x = 790);
                UIManager.getRef("auto_play_text_Image") && (UIManager.getRef("auto_play_text_Image").y = 1420);
                UIManager.getRef("auto_play_Stop_Image_text") && (UIManager.getRef("auto_play_Stop_Image_text").x = 290);
                UIManager.getRef("auto_play_Stop_Image_text") && (UIManager.getRef("auto_play_Stop_Image_text").y = 1420);

            }
        }
        this.bindUI();
        this.layoutChange(this.props.layoutMode);
        if (!isMobile) {
            if (this.props.soundIsPlaying) {
                UIManager.getRef(this.button_name_5).visible = true;
                UIManager.getRef(this.button_name_13).visible = false;
            } else {
                UIManager.getRef(this.button_name_5).visible = false;
                UIManager.getRef(this.button_name_13).visible = true;
            }
        }
        this.setHelpButtonVisibility();
        this.setSettingButtonVisibility();
        this.setResponsibleGammingIcon();
        !this.props.enableAutoPlay && !isMobile && this.autoPlayText();
        this.setButtontextPostion();
        this.setButtontextPostion2();
        this.setPalyerMsgTextPostion();
        if (isMobile && !this.props.enableAutoPlay) {
            UIManager.getRef(this.button_name_12) && (UIManager.getRef(this.button_name_12).visible = false);
        }
        isMobile && !this.props.inAutoplay && UIManager.getRef("auto_play_Stop_Image_text") && (UIManager.getRef("auto_play_Stop_Image_text").visible = false);

    }
    autoPlayText() {
        UIManager.getRef("text_AUTOPLAY_label1_grey").visible = false;
        UIManager.getRef("text_AUTOPLAY_label1").visible = false;
        UIManager.getRef("btn_autoplay").texture = Texture.from("autoplay_disable.png");
    }
    setResponsibleGammingIcon() {
        let timer = TIMER.TimerManager.createTimer(100);
        timer.on('end', (e: any) => {
            e.remove();
            !this.props.showResponsibleGamingIcon && (UIManager.getRef("btn_responsibleGammingIcon").visible = false);
            this.props.showResponsibleGamingIcon && (UIManager.getRef("btn_responsibleGammingIcon").visible = true);
            this.props.responsibleGamingIconPath && this.props.showResponsibleGamingIcon && (UIManager.getRef("btn_responsibleGammingIcon").texture = Texture.from(this.props.responsibleGamingIconPath));
        });
        timer.start();
        this.AllTimer.push(timer);
    }
    private cleanAllTimer(): void {
        this.AllTimer.forEach((_time: any) => {
            _time && _time.stop();
            _time && _time.reset();
            _time && _time.remove();
        });
        this.AllTimer = [];
    }

    setSettingButtonVisibility() {
        if (!isMobile) {
            if (this.props.showSettingsControl) {
                UIManager.getRef("btn_setting").visible = true;
            } else {
                UIManager.getRef("btn_setting").visible = false;
            }
        }
    }
    setHelpButtonVisibility() {
        if (!isMobile) {
            if (this.props.showHelpButton) {
                UIManager.getRef("btn_gameRule").visible = true;
            } else {
                UIManager.getRef("btn_gameRule").visible = false;
            }
        }
    }
    //this method will initialize object to variables
    initializeObjectInVariable() {
        this.coinValueObject = UIManager.getRef("text_coinValue_value");
        this.autoplayCounterObject = UIManager.getRef("Text_COUNT_AP");
        this.autoplayStopButtonObject = UIManager.getRef("btn_autoplay_stop");
        this.textBalancelabel = UIManager.getRef("text_balance_label");
        this.textBetlabel = UIManager.getRef("text_bet_label");
        this.textBetColon = UIManager.getRef("text_colonSymbol1");
        this.textBetValue = UIManager.getRef("text_bet_value");
        this.textCoinValuelabel = UIManager.getRef("text_Coin_value_label");
        this.textCoinColon = UIManager.getRef("text_colonSymbol2");
        this.textCoinValue = UIManager.getRef("text_Coin_value_value");
        this.textWinLabel = UIManager.getRef("text_Win_label_" + this.ui_mode);
        this.textWinColon = UIManager.getRef("text_colonSymbol3_" + this.ui_mode);
        this.textWinValue = UIManager.getRef("text_Win_value_" + this.ui_mode);
    }

    componentDidMount() {
        this.setButtontextPostion();
        this.props.allButtonEnable && this.textEnableVisibility();
        this.displayUI.map((data: any) => {
            let obj = this.state[data.name];

            if (obj) {
                obj.enable = data.interactive;
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        [data.name]: obj
                    }
                });
            }
        });
        if (this.props.selectedCoin === 0) {
            this.enableAllBtn(["btn_bet_decrease", "btn_autoplay_stop"]);
        }
        if (this.props.selectedCoin === this.props.coinList.length - 1) {
            this.enableAllBtn(["btn_autoplay_stop", "btn_bet_increase"]);
        }
        if (!isMobile && !this.props.soundOnOff) {
            UIManager.getRef(this.button_name_16) && (UIManager.getRef(this.button_name_16).visible = true);
            UIManager.getRef(this.button_name_5) && (UIManager.getRef(this.button_name_5).visible = false);
            UIManager.getRef(this.button_name_13) && (UIManager.getRef(this.button_name_13).visible = false);
        } else {
            UIManager.getRef(this.button_name_16) && (UIManager.getRef(this.button_name_16).visible = false);
        }
        this.showSpinStopButton(this.props);
        this.props.spinAfterLoad(true);
        this.props.balance == 0 && this.props.betList[0] > this.props.balance && this.disableAllBtn();
        this.orientation();

        if (isMobile && !this.props.enableAutoPlay) {
            UIManager.getRef(this.button_name_12) && (UIManager.getRef(this.button_name_12).visible = false);
        }
    }
    orientation() {
        this.desktopSocial2();
        if (window.innerHeight < window.innerWidth) {
            if (this.props.jurisdictionKey == "social") {
                UIManager.getRef(this.button_name_12) && (UIManager.getRef(this.button_name_12).x = 1612) && (UIManager.getRef(this.button_name_12).y = 252);
                UIManager.getRef("text_bet_label_button_mobile") && (UIManager.getRef("text_bet_label_button_mobile").visible = false);
                UIManager.getRef("text_bet_value1_mobile") && (UIManager.getRef("text_bet_value1_mobile").visible = false);
            }
            else {
                UIManager.getRef(this.button_name_12) && (UIManager.getRef(this.button_name_12).x = 1612) && (UIManager.getRef(this.button_name_12).y = 252);
                UIManager.getRef("text_bet_label_button_mobile") && (UIManager.getRef("text_bet_label_button_mobile").x = 1495) && (UIManager.getRef("text_bet_label_button_mobile").y = 938);
                UIManager.getRef("text_bet_value1_mobile") && (UIManager.getRef("text_bet_value1_mobile").x = 1518) && (UIManager.getRef("text_bet_value1_mobile").y = 938);
                UIManager.getRef("text_colonSymbol2") && (UIManager.getRef("text_colonSymbol2").x = 761) && (UIManager.getRef("text_colonSymbol2").y = 30);
                UIManager.getRef("text_colonSymbol2") && (UIManager.getRef("text_colonSymbol2").visible = true);

            }
        } else if (window.innerWidth < window.innerHeight) {
            if (this.props.jurisdictionKey == "social") {
                UIManager.getRef(this.button_name_12) && (UIManager.getRef(this.button_name_12).x = 404) && (UIManager.getRef(this.button_name_12).y = 1180);
                UIManager.getRef("text_bet_label_button_mobile") && (UIManager.getRef("text_bet_label_button_mobile").visible = false);
                UIManager.getRef("text_bet_value1_mobile") && (UIManager.getRef("text_bet_value1_mobile").visible = false);

            }
            else {
                UIManager.getRef(this.button_name_12) && (UIManager.getRef(this.button_name_12).x = 404) && (UIManager.getRef(this.button_name_12).y = 1180);
                UIManager.getRef("text_bet_label_button_mobile") && (UIManager.getRef("text_bet_label_button_mobile").x = 960) && (UIManager.getRef("text_bet_label_button_mobile").y = 1633);
                UIManager.getRef("text_bet_value1_mobile") && (UIManager.getRef("text_bet_value1_mobile").x = 975) && (UIManager.getRef("text_bet_value1_mobile").y = 1633);
                UIManager.getRef("text_colonSymbol2") && (UIManager.getRef("text_colonSymbol2").x = 1518) && (UIManager.getRef("text_colonSymbol2").y = 938);
                UIManager.getRef("text_colonSymbol2") && (UIManager.getRef("text_colonSymbol2").visible = true);

            }
        }
    }

    desktopSocial2() {
        if (this.props.jurisdictionKey == "social") {
            UIManager.getRef("btn_bet_decrease") && (UIManager.getRef("btn_bet_decrease").x = 229) && (UIManager.getRef("btn_bet_decrease").y = 935);
            UIManager.getRef("BG_bet_Text_Bg_Image_Social") && (UIManager.getRef("BG_bet_Text_Bg_Image_Social").visible = true);
            UIManager.getRef("BG_bet_Text_Bg_Image") && (UIManager.getRef("BG_bet_Text_Bg_Image").visible = false);
            UIManager.getRef("BG_coin_increment_decrement_Bg_Image") && (UIManager.getRef("BG_coin_increment_decrement_Bg_Image").visible = false);
            UIManager.getRef("text_bet_label_button") && (UIManager.getRef("text_bet_label_button").visible = false);
            UIManager.getRef("text_bet_value1") && (UIManager.getRef("text_bet_value1").visible = false);
            UIManager.getRef("text_coin_value_LABEL") && (UIManager.getRef("text_coin_value_LABEL").visible = false);
            UIManager.getRef("text_coinValue_value") && (UIManager.getRef("text_coinValue_value").visible = false);

        }
        else {
            UIManager.getRef("btn_bet_decrease") && (UIManager.getRef("btn_bet_decrease").x = 474) && (UIManager.getRef("btn_bet_decrease").y = 938);
            UIManager.getRef("BG_bet_Text_Bg_Image_Social") && (UIManager.getRef("BG_bet_Text_Bg_Image_Social").visible = false);
            UIManager.getRef("BG_bet_Text_Bg_Image") && (UIManager.getRef("BG_bet_Text_Bg_Image").visible = true);
            UIManager.getRef("BG_coin_increment_decrement_Bg_Image") && (UIManager.getRef("BG_coin_increment_decrement_Bg_Image").visible = true);
            UIManager.getRef("text_bet_label_button") && (UIManager.getRef("text_bet_label_button").visible = true);
            UIManager.getRef("text_bet_value1") && (UIManager.getRef("text_bet_value1").visible = true);
            UIManager.getRef("text_coin_value_LABEL") && (UIManager.getRef("text_coin_value_LABEL").visible = true);
            UIManager.getRef("text_coinValue_value") && (UIManager.getRef("text_coinValue_value").visible = true);

        }
    }

    //this method will disable the buttons which is passed as a argument, if nothing is passed then all buttons will be disable
    disableAllBtn(exceptList: Array<string> = []) {
        this.props.setAllButtonDisable(exceptList);
        this.displayUI.map((data: any) => {
            let obj = this.state[data.name];

            if (obj) {
                if (exceptList.length > 0 && exceptList.indexOf(data.name) > -1 || (this.props.alwaysEnableButtonNameList.indexOf(data.name) > -1)) {
                    obj.enable = true;
                } else {
                    obj.enable = false;
                }

                this.setState((prevState) => {
                    return {
                        ...prevState,
                        [data.name]: obj
                    }
                });
            }
        });
    }

    //this method will enable the buttons which is passed as a argument, if nothing is passed then all buttons will be enable
    enableAllBtn(exceptList: Array<string> = []) {
        this.delayToEnableAllbutton(exceptList);

    }

    private delayToEnableAllbutton(exceptList: Array<string> = []) {
        if (!this.props.inAutoplay) {
            this.textEnableVisibility();
        }
        this.props.setAllButtonEnable(exceptList);
        this.displayUI.map((data: any) => {
            let obj = this.state[data.name];
            if (obj) {
                if (exceptList.length > 0 && exceptList.indexOf(data.name) > -1 && (this.props.alwaysEnableButtonNameList.indexOf(data.name) === -1)) {
                    obj.enable = false;
                } else {
                    obj.enable = true;
                }
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        [data.name]: obj
                    }
                });
            }
        });
    }

    //this method will initially bind values to text

    bindUI() {
        this.setTextValue("text_coinValue_value", this.numberWithCommasAndDeciaml(this.props.coinList[this.props.selectedCoin] / 2000));
    }

    numberWithCommasAndDeciaml(x: any) {
        try {
            x = x.toString();
            x = x.replace(".", this.props.currencyDecimalSeparator);
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.props.currencyGroupingSeparator);
        } catch {
            return x;
        }
    }
    //this method will set the text
    setTextValue(name: string, property: any) {
        UIManager.getRef(name) && (UIManager.setText(name, property));
    }

    //while first rendering, this method will check the mode first
    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    render() {
        return (
            <UIManager id={"buttonPanelGenericUIContainer"} type={"Container"}
                ref={i => this.buttonPanelGenericUIContainer = i} app={this.app} configGame={configGame}>
                {
                    this.displayUI.map((data: any) => (
                        (this.props.alwaysEnableButtonNameList.indexOf(data.name) > -1 || this.props.exceptBtnList.indexOf(data.name) > -1) && (
                            (this.props.alwaysEnableButtonNameList.indexOf(data.name) > -1) &&
                            <UIManager key={`UIManager-${Math.random()}`} type={data.type}
                                ClickHandler={this.handleEvent} langObj={this.props.langObj}
                                disabled={!this.props.enableAutoPlay ? ((data.name == this.autoPlayButtonName) ? true : !this.state[data.name].enable) : !this.state[data.name].enable} id={data.id} {...data} app={this.app} />
                            ||
                            (this.props.allButtonEnable && this.props.exceptBtnList.indexOf(data.name) > -1) &&
                            <UIManager key={`UIManager-${Math.random()}`} type={data.type} app={this.app}
                                ClickHandler={this.handleEvent} langObj={this.props.langObj}
                                disabled={!this.props.enableAutoPlay ? ((data.name == this.autoPlayButtonName) ? true : !this.state[data.name].enable) : !this.state[data.name].enable} id={data.id} {...data} />
                            ||
                            <UIManager key={`UIManager-${Math.random()}`} type={data.type} app={this.app}
                                ClickHandler={this.handleEvent} langObj={this.props.langObj}
                                disabled={!this.props.enableAutoPlay ? ((data.name == this.autoPlayButtonName) ? true : !this.state[data.name].enable) : !this.state[data.name].enable} id={data.id} {...data} />
                        )
                        ||
                        (

                            <UIManager key={`UIManager-${Math.random()}`} type={data.type} app={this.app}
                                ClickHandler={this.handleEvent} langObj={this.props.langObj}
                                disabled={!this.props.enableAutoPlay ? ((data.name == this.autoPlayButtonName) ? true : this.state[data.name] && !this.state[data.name].enable) : this.state[data.name] && !this.state[data.name].enable}
                                id={data.id} {...data} />)
                    ))
                }
            </UIManager>
        )
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'asyncGameLevelSeverState' | 'reelgridState' | 'freegameState' | 'winCelebrationState' | 'winpresentationState' | 'betPanelState' | 'reelsState' | 'buttonPanelState' | 'soundState' | 'basegameState' | 'gridsState' | 'autoplayState' | 'applicationState' | 'desktopSettingPanelState' | 'playerMessageState' | 'asyncServerAction' | 'behaviourState'>) =>
    ({
        spinResponseReceived: configGame["SPIN_TYPE"] === 2 && state.reelgridState.spinResponseReceived || state.reelsState.spinResponseReceived,
        spinStart: configGame["SPIN_TYPE"] === 2 && state.reelgridState.spinStart || state.reelsState.spinStart,
        showAutoplayUI: state.autoplayState.showAutoplay,
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        exceptBtnList: state.buttonPanelState.exceptBtnList,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        autoplayCount: state.basegameState.autoplayCount,
        autoplayNextSpin: state.basegameState.autoplayNextSpin,
        basegamestate: state.basegameState.basegamestate,
        inAutoplay: state.basegameState.inAutoplay,
        feature: state.basegameState.feature,
        layoutMode: state.applicationState.layoutMode,
        decreaseBetBtnVisibility: state.applicationState.decreaseBet,
        increaseBetBtnVisibility: state.applicationState.increaseBet,
        maxBetBtnVisibility: state.applicationState.maxBet,
        paytableBtnVisibility: state.applicationState.showPaytable,
        spinBtnVisibility: state.applicationState.spin,
        showSettingPanelUI: state.desktopSettingPanelState.showSettingPanel,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        allSpinComplete: state.reelgridState.allSpinComplete,
        winAmount: state.basegameState.winAmount,
        balance: state.basegameState.balance,
        soundIsPlaying: state.soundState.soundIsPlaying,
        inFreeGame: state.freegameState.inFreeGame,
        winPresentationStart: state.winpresentationState.winPresentationStart,
        featureJustFinished: state.freegameState.featureJustFinished,
        showWinCelebration: state.winCelebrationState.showWinCelebration,
        featureJustReTriggered: state.freegameState.featureJustReTriggered,
        showSettingsControl: state.applicationState.showSettingsControl,
        showHelpButton: state.applicationState.showHelpButton,
        enableAutoPlay: state.applicationState.enableAutoPlay,
        autoPlaySimpleMode: state.applicationState.autoPlaySimpleMode,
        showResponsibleGamingIcon: state.applicationState.showResponsibleGamingIcon,
        responsibleGamingUrl: state.applicationState.responsibleGamingUrl,
        responsibleGamingIconPath: state.applicationState.responsibleGamingIconPath,
        showHelpText: state.applicationState.showHelpText,
        increaseBetResult: state.asyncGameLevelSeverState.result,
        languageCode: state.applicationState.languageCode,
        stopButtonActive: state.buttonPanelState.stopButtonActive,
        disableQuickStop: state.applicationState.disableQuickStop,
        InTurboMode: state.reelgridState.InTurboMode,
        isSlamSpin: state.reelgridState.isSlamSpin,
        isActiveAll: state.basegameState.isActiveAll,
        enableParticularButton: state.buttonPanelState.enableParticularButton,
        isRemoveKeyBoardEvent: state.basegameState.isRemoveKeyBoardEvent,
        startSpinBySpaceBar: state.basegameState.startSpinBySpaceBar,
        firstSpinAfterLoad: state.basegameState.firstSpinAfterLoad,
        stakeTore: state.basegameState.stakeTore,
        soundOnOff: state.applicationState.soundOnOff,
        jurisdictionKey: state.applicationState.jurisdictionKey,
        currencyDecimalSeparator: state.applicationState.currencyDecimalSeparator,
        currencyGroupingSeparator: state.applicationState.currencyGroupingSeparator,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        resetReelState: (): any => dispatch(configGame["SPIN_TYPE"] === 2 && reelsGridActions.resetReelState()),
        startSpin: (): any => dispatch(reelsActions.startSpin()),
        startRGSpin: (): any => dispatch(reelGridActions.startSpin()),
        startGridSpin: (): any => dispatch(gridsActions.startSpin()),
        startAutoplay: (): any => dispatch(baseGameActions.startAutoplay()),
        stopAutoplay: (): any => dispatch(baseGameActions.stopAutoplay()),
        setApplicationAutoplayCount: (autoplaycount: number): any => dispatch(baseGameActions.setApplicationAutoplayCount(autoplaycount)),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setApplicationSpinButtonClicked: (isClicked: boolean): any => dispatch(buttonActions.setApplicationSpinButtonClicked(isClicked)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        showPaytable: (): any => dispatch(paytableActions.showPaytable()),
        showAutoplay: (): any => dispatch(autoplayActions.showAutoplayUI()),
        showMenuUI: (): any => dispatch(menuActions.showMenuUI()),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        limitOfLoss: (lossLimit: boolean): any => dispatch(autoplayActions.limitOfLoss(lossLimit)),
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutsActions.setApplicationLayoutObject(layoutobjectlist)),
        showDesktopSettingPanelUI: (showSettingPanel: boolean): any => dispatch(desktopSettingPanelActions.showDesktopSettingPanelUI(showSettingPanel)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setSelectedCoin: (selectedCoin: number): any => dispatch(betPanelAction.setSelectedCoin(selectedCoin)),
        playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
        stopAllBGMSound: (stopBgSound: any): any => dispatch(soundActions.stopAllBGMSound(stopBgSound)),
        stopAllSFXSound: (stopAllSfxSound: boolean): any => dispatch(soundActions.stopAllSFXSound(stopAllSfxSound)),
        getApplicationIncreaseBetResponse: (): any => dispatch(gameLevelResponseActions.getApplicationIncreaseBetResponse()),
        getApplicationDecreaseBetResponse: (): any => dispatch(gameLevelResponseActions.getApplicationDecreaseBetResponse()),
        getApplicationMaxBetResponse: (): any => dispatch(gameLevelResponseActions.getApplicationMaxBetResponse()),
        setWinAmount: (winAmountEmpty: any): any => dispatch(behaviourAction.setWinAmount(winAmountEmpty)),
        flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager)),
        setMobMenuVisibility: (showMobileMenuPanel: boolean): any => dispatch(behaviourAction.setMobMenuVisibility(showMobileMenuPanel)),
        setAmountForAutoplay: (storeAmountForAutoplay: any): any => dispatch(behaviourAction.setAmountForAutoplay(storeAmountForAutoplay)),
        hideAutoplay: (): any => dispatch(autoplayActions.hideAutoplayUI()),
        setAutoplay: (autoplayCount: number): any => dispatch(autoplayActions.setAutoplayCount(autoplayCount)),
        setApplicationShowHelpText: (showHelpText: boolean): any => dispatch(applicationStateActions.setApplicationShowHelpText(showHelpText)),
        soundLoadStartFunction: (soundLoadStart: boolean): any => dispatch(soundActions.soundLoadStartFunction(soundLoadStart)),
        visibleNoInternetPopUp: (noInternetPopupVisible: boolean): any => dispatch(behaviourAction.visibleNoInternetPopUp(noInternetPopupVisible)),
        setSlamSpin: (isSlamSpin: any): any => dispatch(reelGridActions.setSlamSpin(isSlamSpin)),
        setStopActive: (stopActive: boolean): any => dispatch(buttonActions.setStopActive(stopActive)),
        setActiveall: (isActiveAll: boolean): any => dispatch(baseGameActions.setActiveall(isActiveAll)),
        particularButtonEnable: (enableParticularButton: boolean): any => dispatch(buttonActions.particularButtonEnable(enableParticularButton)),
        spinAfterLoad: (firstSpinAfterLoad: boolean): any => dispatch(baseGameActions.spinAfterLoad(firstSpinAfterLoad)),
        setIsScreenOnOff: (screenOnOff: boolean): any => dispatch(buttonActions.setIsScreenOnOff(screenOnOff)),
        buttonClickedName: (clickedButtonName: string): any => dispatch(buttonActions.buttonClickedName(clickedButtonName)),
    }))(withButtonPanelConfiguration(ButtonPanelGenericUI)));