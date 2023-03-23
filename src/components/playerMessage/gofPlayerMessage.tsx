import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withPlayerMessageConfiguration from "../../core/components/playerMessage/configuration/withPlayerMessageConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import PIXI from "pixi.js";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { isMobile } from "react-device-detect";
import { CURRENCY, TIMER } from "../../core/utills";
import { actions as showMessageActions } from "../../core/reducers/playerMessageReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { actions as winCelebrationActions } from "../../gamereducer/winCelebrationReducer";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as applicationStateActions } from "../../core/reducers/applicationStateReducer"

interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    inFreeGame: string;
    layoutMode: string;
    jurisdictionKey: string;
    spinStart: any;
    allSpinComplete: any;
    betList: any;
    currentBetIndex: any;
    selectedCoin: any;
    coinList: any;
    winAmount: any;
    balance: any;
    allButtonEnable: any;
    transitionBalance: any;
    previousBalance: any;
    increaseBetResult: any;
    winAmountEmpty: any;
    basegamestate: any;
    totalCreditWinAmount: any;
    showTime: any;
    showRTP: boolean;
    storeRtp: string;
    maxWinOddsCount: number;
    showTopWinOdds: any;
    currencyIgnoreDecimals: boolean;
    languageCode: any;
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class GofPlayerMessage extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected gofPlayerMessageContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;
    protected leftContainerChildCurrentIndex: number;
    protected rightContainerChildCurrentIndex: number;
    protected leftInterval: any;
    protected rightInterval: any;
    protected messagesRunInLoopLeftContainer: any;
    protected messagesNotRunInLoopLeftContainer: any;
    protected messagesRunInLoopRightContainer: any;
    protected messagesNotRunInLoopRightContainer: any;
    protected betValueText: any;
    protected coinValueText: any;
    protected balanceValueText: any;
    protected winValueText: any;
    protected maxWinOddText: any;
    protected maxWinOddText_landscape: any;
    protected maxWinOddText_portrait: any;
    protected coinValueDivider: number = 2000;
    protected constantT1: number = 100;
    protected winValueStore: number = 0;
    protected winCelebrationMinimumValue: number = 25;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            leftContainer: false,
            rightContainer: false,
            uiElements: [],
            lang: "en"
        }
        // this.gofPlayerMessageContainer = React.createRef();
        this.gofPlayerMessageContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }

        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this))
        this.leftContainerChildCurrentIndex = 0;
        this.rightContainerChildCurrentIndex = 0;
        this.messagesRunInLoopLeftContainer = [];
        this.messagesNotRunInLoopLeftContainer = [];
        this.messagesRunInLoopRightContainer = [];
        this.messagesNotRunInLoopRightContainer = [];
        this.displayUI.map((data: any) => {
            if (data.name === "leftInfoContainer") {
                for (let i = 0; i < data.child.length; i++) {
                    if (data.child[i].messageInLoop) {
                        this.messagesRunInLoopLeftContainer.push(data.child[i]);
                    } else {
                        this.messagesNotRunInLoopLeftContainer.push(data.child[i]);
                    }
                }
            } else if (data.name === "rightInfoContainer") {
                for (let i = 0; i < data.child.length; i++) {
                    if (data.child[i].messageInLoop) {
                        this.messagesRunInLoopRightContainer.push(data.child[i]);
                    } else {
                        this.messagesNotRunInLoopRightContainer.push(data.child[i]);
                    }
                }
            }
        })
    }

    checkUiMode(uimodeobj: any) {

        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both";
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }
    setCoinTextSize() {
        let toString = (this.props.coinList[this.props.selectedCoin] / this.coinValueDivider).toString();
        this.coinValueText && (this.coinValueText.text = CURRENCY.CurrencyManager.formatCurrencyString(toString, true, true, true, true));
        let coinValue = CURRENCY.CurrencyManager.formatCurrencyString(toString, true, true, true, true);
        this.coinValueText && UIManager.setText("text_Coin_value_value", coinValue);
    }
    setBetTextSize(nextProps: any) {
        let toString = (this.props.betList[nextProps.currentBetIndex] / this.constantT1).toString();
        this.betValueText && (this.betValueText.text = CURRENCY.CurrencyManager.formatCurrencyString(toString, true, true, true, true));
        let bet = CURRENCY.CurrencyManager.formatCurrencyString(toString, true, true, true, true);
        this.betValueText && UIManager.setText("text_bet_value", bet);
    }
   
    bindUI() {
        this.layoutChange(this.props.layoutMode);
        if (this.props.currencyIgnoreDecimals) {
            let toString = (this.props.betList[this.props.currentBetIndex] / this.constantT1);
            this.betValueText && (this.betValueText.text = CURRENCY.CurrencyManager.formatCurrencyString(toString, true, true, true, true));
            let bet = CURRENCY.CurrencyManager.formatCurrencyString(toString, true, true, true, true);
            this.betValueText && (UIManager.setText("text_bet_value", bet));
        } else {
            this.setBetTextSize(this.props);
        }

        if (this.props.currencyIgnoreDecimals) {
            let toString = this.props.coinList[this.props.selectedCoin] / this.coinValueDivider;
            let toString1 = CURRENCY.CurrencyManager.formatCurrencyString(toString, true, true, true, true)
            this.coinValueText && UIManager.setText("text_Coin_value_value", toString1);
        } else {
            this.setCoinTextSize();
        }

        let balanceValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(this.props.balance / this.constantT1, true, true, true, true);

        UIManager.getRef(this.balanceValueText) && (UIManager.setText(this.balanceValueText, balanceValueInCurrency));


    }

    //this method will initialize the object to variable

    initializeObjectToVariable() {
        this.betValueText = UIManager.getRef("text_bet_value");
        this.coinValueText = UIManager.getRef("text_Coin_value_value");
        this.balanceValueText = "text_Balance_value_withSign";
        this.winValueText = "text_Win_value_" + this.ui_mode;
        this.maxWinOddText = UIManager.getRef("MaxWinOdd_text");
        this.maxWinOddText_landscape = UIManager.getRef("MaxWinOdd_text_landscape");
        this.maxWinOddText_portrait = UIManager.getRef("MaxWinOdd_text_portrait");
        this.setGameClockTime();
        this.setGameRtp();
        this.setMaxWinOdd();
    }

    getMobileText(trueString: string, falseString: string) {
        UIManager.getRef(trueString).visible = true;
        UIManager.getRef(falseString).visible = false;
    }

    setGameRtpText(setTextString: string) {
        let setGameRtpText = UIManager.getRef(setTextString);
        setGameRtpText && UIManager.setText(setTextString, this.props.storeRtp);
        setGameRtpText && (setGameRtpText.visible = true);
    }

    setGameRtp() {
        if (this.props.showRTP) {
            if (!isMobile) {
                UIManager.setText("game_rtp", this.props.storeRtp);
                UIManager.getRef("game_rtp").visible = true;
            }
            else {
                if (window.innerWidth > window.innerHeight) {
                    this.getMobileText("game_rtp_m_text", "game_rtp_m_text_portrait");
                    this.getMobileText("game_rtp_m", "game_rtp_m_portrait");
                    this.setGameRtpText("game_rtp_m");
                } else {
                    this.getMobileText("game_rtp_m_text_portrait", "game_rtp_m_text");
                    this.getMobileText("game_rtp_m_portrait", "game_rtp_m");
                    this.setGameRtpText("game_rtp_m_portrait");
                }
            }
        }
        else {
            if (!isMobile) {
                UIManager.getRef("game_rtp_text").visible = false;
            }
            else {
                UIManager.getRef("game_rtp_m_text").visible = false;
                UIManager.getRef("game_rtp_m_text_portrait").visible = false;
            }
        }
    }

    setMaxWinOddText(setTextString: string) {
        let setMaxWinOddText = UIManager.getRef(setTextString);
        setMaxWinOddText && UIManager.setText(setTextString, this.props.maxWinOddsCount);
        setMaxWinOddText && (setMaxWinOddText.visible = true);
    }


    setMaxWinOdd() {
        if (this.props.showTopWinOdds) {
            if (!isMobile) {
                UIManager.setText("setMaxWinOdd", this.props.maxWinOddsCount);
                UIManager.getRef("setMaxWinOdd").visible = true;
            }
            else {
                if (window.innerWidth > window.innerHeight) {
                    UIManager.setText("setMaxWinOdd_m2", this.props.maxWinOddsCount);
                    UIManager.getRef("setMaxWinOdd_m2").visible = true;
                    this.getMobileText("setMaxWinOdd_m", "setMaxWinOdd_portrait");
                    this.setMaxWinOddText("setMaxWinOdd_m2");

                } else {
                    UIManager.setText("setMaxWinOdd_m2_portrait", this.props.maxWinOddsCount);
                    UIManager.getRef("setMaxWinOdd_m2_portrait").visible = true;
                    this.getMobileText("setMaxWinOdd_portrait", "setMaxWinOdd_m");
                    this.setMaxWinOddText("setMaxWinOdd_m2_portrait");
                }
            }
        }

        else {
            if (!isMobile) {
                UIManager.getRef("setMaxWinOdd_text").visible = false;
                UIManager.getRef("setMaxWinOdd").visible = false;
            }
            else {
                UIManager.getRef("setMaxWinOdd_m").visible = false;
                UIManager.getRef("setMaxWinOdd_portrait").visible = false;
                UIManager.getRef("setMaxWinOdd_m2").visible = false;
                UIManager.getRef("setMaxWinOdd_m2_portrait").visible = false;
            }
        }
    }

    desktopSocial1(props: any) {

        if (props.basegamestate) {

            if (this.props.jurisdictionKey == "social") {
                UIManager.getRef("text_Coin_value_label") && (UIManager.getRef("text_Coin_value_label").visible = false);
                UIManager.getRef("text_colonSymbol2") && (UIManager.getRef("text_colonSymbol2").visible = false);
                UIManager.getRef("text_Coin_value_value") && (UIManager.getRef("text_Coin_value_value").visible = false);

                UIManager.getRef("text_Balance_label") && (UIManager.getRef("text_Balance_label").visible = true);
                UIManager.getRef("text_Balance_label") && (UIManager.getRef("text_Balance_label")._anchor._x =0.5)
                UIManager.getRef("text_Balance_label") && (UIManager.getRef("text_Balance_label").x = 465) && (UIManager.getRef("text_Balance_label").y = -105);
                UIManager.getRef("text_colonSymbol4") && (UIManager.getRef("text_colonSymbol4").visible = false);
                UIManager.getRef("text_Balance_value_withSign") && (UIManager.getRef("text_Balance_value_withSign")._anchor._x =0.5)
                UIManager.getRef("text_Balance_value_withSign") && (UIManager.getRef("text_Balance_value_withSign").x = 465) && (UIManager.getRef("text_Balance_value_withSign").y = -60);
                UIManager.getRef("text_Win_label_desktop") && (UIManager.getRef("text_Win_label_desktop").x = 400) && (UIManager.getRef("text_Win_label_desktop").y = 32);
                UIManager.getRef("text_colonSymbol3_desktop") && (UIManager.getRef("text_colonSymbol3_desktop").x = 405) && (UIManager.getRef("text_colonSymbol3_desktop").y = 30);
                UIManager.getRef("text_Win_value_desktop") && (UIManager.getRef("text_Win_value_desktop").x = 412) && (UIManager.getRef("text_Win_value_desktop").y = 32);
                UIManager.getRef("text_bet_label") && (UIManager.getRef("text_bet_label")._anchor._x=.5);
                UIManager.getRef("text_bet_label") && (UIManager.getRef("text_bet_label").x = 450) && (UIManager.getRef("text_bet_label").y = -105);
                UIManager.getRef("text_colonSymbol1") && (UIManager.getRef("text_colonSymbol1").visible = false);
                UIManager.getRef("text_bet_value") && (UIManager.getRef("text_bet_value")._anchor._x =0.5)
                UIManager.getRef("text_bet_value") && (UIManager.getRef("text_bet_value").x = 450) && (UIManager.getRef("text_bet_value").y = -60);

            }
            else {
                
                UIManager.getRef("text_Coin_value_label") && (UIManager.getRef("text_Coin_value_label").visible = true);
                UIManager.getRef("text_colonSymbol2") && (UIManager.getRef("text_colonSymbol2").visible = true);
                UIManager.getRef("text_colonSymbol2") && (UIManager.getRef("text_colonSymbol2").x = 760) && (UIManager.getRef("text_colonSymbol2").y = 30);

                UIManager.getRef("text_Coin_value_value") && (UIManager.getRef("text_Coin_value_value").visible = true);

                UIManager.getRef("text_Balance_label") && (UIManager.getRef("text_Balance_label").x = 590) && (UIManager.getRef("text_Balance_label").y = 32);
                UIManager.getRef("text_colonSymbol4") && (UIManager.getRef("text_colonSymbol4").visible = true);
                UIManager.getRef("text_Balance_value_withSign") && (UIManager.getRef("text_Balance_value_withSign").x = 610) && (UIManager.getRef("text_Balance_value_withSign").y = 32);

                UIManager.getRef("text_Win_label_desktop") && (UIManager.getRef("text_Win_label_desktop").x = 190) && (UIManager.getRef("text_Win_label_desktop").y = 32);
                UIManager.getRef("text_colonSymbol3_desktop") && (UIManager.getRef("text_colonSymbol3_desktop").x = 200) && (UIManager.getRef("text_colonSymbol3_desktop").y = 30);
                UIManager.getRef("text_Win_value_desktop") && (UIManager.getRef("text_Win_value_desktop").x = 212) && (UIManager.getRef("text_Win_value_desktop").y = 32);

                UIManager.getRef("text_bet_label") && (UIManager.getRef("text_bet_label").x = 295) && (UIManager.getRef("text_bet_label").y = 32);
                UIManager.getRef("text_colonSymbol1") && (UIManager.getRef("text_colonSymbol1").x = 305) && (UIManager.getRef("text_colonSymbol1").y = 30);
                UIManager.getRef("text_bet_value") && (UIManager.getRef("text_bet_value").x = 315) && (UIManager.getRef("text_bet_value").y = 32);
            }
        }
        else {

            if (this.props.jurisdictionKey == "social") {
                UIManager.getRef("text_Balance_value_withSign") && (UIManager.getRef("text_Balance_value_withSign")._anchor._x =0)
                UIManager.getRef("text_Balance_label") && (UIManager.getRef("text_Balance_label")._anchor._x =1)
                UIManager.getRef("text_bet_label") && (UIManager.getRef("text_bet_label")._anchor._x=1);
                UIManager.getRef("text_bet_value") && (UIManager.getRef("text_bet_value")._anchor._x =0)
                UIManager.getRef("text_Coin_value_label") && (UIManager.getRef("text_Coin_value_label").visible = false);
                UIManager.getRef("text_colonSymbol2") && (UIManager.getRef("text_colonSymbol2").visible = false);
                UIManager.getRef("text_Coin_value_value") && (UIManager.getRef("text_Coin_value_value").visible = false);

                UIManager.getRef("text_Balance_label") && (UIManager.getRef("text_Balance_label").x = 590) && (UIManager.getRef("text_Balance_label").y = 32);
                UIManager.getRef("text_colonSymbol4") && (UIManager.getRef("text_colonSymbol4").visible = true);
                UIManager.getRef("text_Balance_value_withSign") && (UIManager.getRef("text_Balance_value_withSign").x = 610) && (UIManager.getRef("text_Balance_value_withSign").y = 32);

                UIManager.getRef("text_Win_label_desktop") && (UIManager.getRef("text_Win_label_desktop").x = 190) && (UIManager.getRef("text_Win_label_desktop").y = 32);
                UIManager.getRef("text_colonSymbol3_desktop") && (UIManager.getRef("text_colonSymbol3_desktop").x = 200) && (UIManager.getRef("text_colonSymbol3_desktop").y = 30);
                UIManager.getRef("text_Win_value_desktop") && (UIManager.getRef("text_Win_value_desktop").x = 212) && (UIManager.getRef("text_Win_value_desktop").y = 32);

                UIManager.getRef("text_bet_label") && (UIManager.getRef("text_bet_label").x = 545) && (UIManager.getRef("text_bet_label").y = 32);
                UIManager.getRef("text_colonSymbol1") && (UIManager.getRef("text_colonSymbol1").visible = true);
                UIManager.getRef("text_colonSymbol1") && (UIManager.getRef("text_colonSymbol1").x = 555) && (UIManager.getRef("text_colonSymbol1").y = 30);
                UIManager.getRef("text_bet_value") && (UIManager.getRef("text_bet_value").x = 565) && (UIManager.getRef("text_bet_value").y = 32);
            }
            else {
                UIManager.getRef("text_Coin_value_label") && (UIManager.getRef("text_Coin_value_label").visible = true);
                UIManager.getRef("text_colonSymbol2") && (UIManager.getRef("text_colonSymbol2").visible = true);
                UIManager.getRef("text_Coin_value_value") && (UIManager.getRef("text_Coin_value_value").visible = true);

                UIManager.getRef("text_Balance_label") && (UIManager.getRef("text_Balance_label").x = 590) && (UIManager.getRef("text_Balance_label").y = 32);
                UIManager.getRef("text_colonSymbol4") && (UIManager.getRef("text_colonSymbol4").visible = true);
                UIManager.getRef("text_Balance_value_withSign") && (UIManager.getRef("text_Balance_value_withSign").x = 610) && (UIManager.getRef("text_Balance_value_withSign").y = 32);

                UIManager.getRef("text_Win_label_desktop") && (UIManager.getRef("text_Win_label_desktop").x = 190) && (UIManager.getRef("text_Win_label_desktop").y = 32);
                UIManager.getRef("text_colonSymbol3_desktop") && (UIManager.getRef("text_colonSymbol3_desktop").x = 200) && (UIManager.getRef("text_colonSymbol3_desktop").y = 30);
                UIManager.getRef("text_Win_value_desktop") && (UIManager.getRef("text_Win_value_desktop").x = 212) && (UIManager.getRef("text_Win_value_desktop").y = 32);

                UIManager.getRef("text_bet_label") && (UIManager.getRef("text_bet_label").x = 295) && (UIManager.getRef("text_bet_label").y = 32);
                UIManager.getRef("text_colonSymbol1") && (UIManager.getRef("text_colonSymbol1").x = 305) && (UIManager.getRef("text_colonSymbol1").y = 30);
                UIManager.getRef("text_bet_value") && (UIManager.getRef("text_bet_value").x = 315) && (UIManager.getRef("text_bet_value").y = 32);
            }
        }
    }


    setMaxTextPosition() {
        if (!isMobile) {
            switch (this.props.languageCode) {
                case 'bg':
                    this.maxWinOddText && (this.maxWinOddText.x = 205) && (this.maxWinOddText.y = 0);
                    break;
                case 'de':
                    this.maxWinOddText && (this.maxWinOddText.x = 155) && (this.maxWinOddText.y = 0);
                    break;
                case 'it':
                case 'es':
                    this.maxWinOddText && (this.maxWinOddText.x = 125) && (this.maxWinOddText.y = 0);
                    break;
                case 'gr':
                    this.maxWinOddText && (this.maxWinOddText.x = 75) && (this.maxWinOddText.y = 0);
                    break;
                case 'nl':
                    this.maxWinOddText && (this.maxWinOddText.x = -50) && (this.maxWinOddText.y = 0);
                    break;
                case 'ro':
                    this.maxWinOddText && (this.maxWinOddText.x = 130) && (this.maxWinOddText.y = 0);
                    break;
            }
        }

        else {
            if (window.innerWidth > window.innerHeight) {
                switch (this.props.languageCode) {
                    case 'bg':
                        this.maxWinOddText_landscape && (this.maxWinOddText_landscape.x = -40) && (this.maxWinOddText_landscape.y = 3);
                        break;
                    case 'de':
                        this.maxWinOddText_landscape && (this.maxWinOddText_landscape.x = -95) && (this.maxWinOddText_landscape.y = 3);
                        break;
                    case 'es':
                        this.maxWinOddText_landscape && (this.maxWinOddText_landscape.x = -133) && (this.maxWinOddText_landscape.y = 3);
                        break;
                    case 'gr':
                        this.maxWinOddText_landscape && (this.maxWinOddText_landscape.x = -190) && (this.maxWinOddText_landscape.y = 3);
                        break;
                    case 'it':
                        this.maxWinOddText_landscape && (this.maxWinOddText_landscape.x = -135) && (this.maxWinOddText_landscape.y = 3);
                        break;
                    case 'nl':
                        this.maxWinOddText_landscape && (this.maxWinOddText_landscape.x = -340) && (this.maxWinOddText_landscape.y = 3);
                        break;
                    case 'ro':
                        this.maxWinOddText_landscape && (this.maxWinOddText_landscape.x = -125) && (this.maxWinOddText_landscape.y = 3);
                        break;
                }
            }
            else {
                switch (this.props.languageCode) {
                    case 'bg':
                        this.maxWinOddText_portrait && (this.maxWinOddText_portrait.x = 228) && (this.maxWinOddText_portrait.y = 3);
                        break;
                    case 'de':
                        this.maxWinOddText_portrait && (this.maxWinOddText_portrait.x = 176) && (this.maxWinOddText_portrait.y = 3);
                        break;
                    case 'es':
                        this.maxWinOddText_portrait && (this.maxWinOddText_portrait.x = 140) && (this.maxWinOddText_portrait.y = 3);
                        break;
                    case 'gr':
                        this.maxWinOddText_portrait && (this.maxWinOddText_portrait.x = 78) && (this.maxWinOddText_portrait.y = 3);
                        break;
                    case 'it':
                        this.maxWinOddText_portrait && (this.maxWinOddText_portrait.x = 135) && (this.maxWinOddText_portrait.y = 3);
                        break;
                    case 'nl':
                        this.maxWinOddText_portrait && (this.maxWinOddText_portrait.x = -69) && (this.maxWinOddText_portrait.y = 3);
                        break;
                    case 'ro':
                        this.maxWinOddText_portrait && (this.maxWinOddText_portrait.x = 145) && (this.maxWinOddText_portrait.y = 3);
                        break;
                }
            }
        }
    }

    setGameClockTime() {
        if (this.props.showTime) {
            let timer = TIMER.TimerManager.createTimer(100);
            timer.on('repeat', () => {
                let today = new Date();
                let sec = today.getSeconds()
                let newSec
                if (sec < 10) {
                    newSec = "0" + sec
                }
                else {
                    newSec = sec
                }

                let minutes = today.getMinutes()
                let newMinutes
                if (minutes < 10) {
                    newMinutes = "0" + minutes
                }
                else {
                    newMinutes = minutes
                }
                if (isMobile) {
                    let time = today.getHours() + ":" + newMinutes;
                    if (window.innerWidth > window.innerHeight) {
                        let game_clock = UIManager.getRef("game_clock_m");
                        game_clock && (game_clock.text = time);
                        this.getMobileText("game_clock_m", "game_clock_m_portrait");
                    } else {
                        let game_clock = UIManager.getRef("game_clock_m_portrait");
                        game_clock && (game_clock.text = time);
                        this.getMobileText("game_clock_m_portrait", "game_clock_m");
                    }
                } else {
                    let time = today.getHours() + ":" + newMinutes;
                    let game_clock = UIManager.getRef("game_clock");
                    game_clock && (game_clock.text = time);
                    UIManager.getRef("game_clock").visible = true;
                }
            });
            timer.start(true);
        }
    }

    componentDidMount() {
        this.initializeObjectToVariable();
        this.orientationChange();
        this.setMaxTextPosition();
        this.bindUI();
        this.setMaxWinOdd();
        this.winValueStore = this.winValueStore + this.props.winAmount;
        if (this.winValueStore > 0) {
            UIManager.getRef(this.winValueText) && (UIManager.getRef(this.winValueText).visible = true);
        } else {
            UIManager.getRef(this.winValueText) && (UIManager.getRef(this.winValueText).visible = false);
        }
        UIManager.getRef(this.winValueText) && (UIManager.setText(this.winValueText, CURRENCY.CurrencyManager.formatCurrencyString(this.winValueStore / this.constantT1, true, true, true, true)));
        if (this.props.totalCreditWinAmount) {
            UIManager.getRef(this.winValueText) && (UIManager.getRef(this.winValueText).visible = true);
            let totaltWinAmount = CURRENCY.CurrencyManager.formatCurrencyString((this.props.totalCreditWinAmount) / this.constantT1, true, true, true, true)
            this.props.totalCreditWinAmount && UIManager.getRef(this.winValueText) && (UIManager.setText(this.winValueText, totaltWinAmount));
        }
        //good_Luck_Text
        if (this.props.jurisdictionKey === "social") {
            UIManager.getRef("good_Luck_Text") && (UIManager.getRef("good_Luck_Text").visible = true);
        }
    }

    //this method will change the left container state

    changeLeftContent() {
        if (this.state.leftContainer) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    leftContainer: false,
                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    leftContainer: true,
                }
            })
        }
    }

    //this method will change the right container state
    changeRightContent() {
        if (this.state.rightContainer) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    rightContainer: false,
                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    rightContainer: true,
                }
            })
        }
    }

    //when layout changes, this methhod will be called
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        })
        this.orientationChange();
    }

    orientationChange() {
        this.desktopSocial1(this.props);
        if (this.props.jurisdictionKey == "social") {
            if (window.innerWidth > window.innerHeight) {
                UIManager.getRef("setMaxWinOdd_m") && (UIManager.getRef("setMaxWinOdd_m").visible = true);
                UIManager.getRef("setMaxWinOdd_portrait") && (UIManager.getRef("setMaxWinOdd_portrait").visible = false);

                UIManager.getRef("setMaxWinOdd_m2") && (UIManager.getRef("setMaxWinOdd_m2").visible = true);
                UIManager.getRef("setMaxWinOdd_m2_portrait") && (UIManager.getRef("setMaxWinOdd_m2_portrait").visible = false);

                UIManager.getRef("Mobiletext_win_value") && (UIManager.getRef("Mobiletext_win_value").visible = false);
                UIManager.getRef("Mobiletext_win_label") && (UIManager.getRef("Mobiletext_win_label").visible = false);

                UIManager.getRef("text_Win_label_mobile") && (UIManager.getRef("text_Win_label_mobile").x = 880) && (UIManager.getRef("text_Win_label_mobile").y = -95);
                UIManager.getRef("text_colonSymbol3_mobile") && (UIManager.getRef("text_colonSymbol3_mobile").x = 885) && (UIManager.getRef("text_colonSymbol3_mobile").y = -97);
                UIManager.getRef("text_Win_value_mobile") && (UIManager.getRef("text_Win_value_mobile").x = 895) && (UIManager.getRef("text_Win_value_mobile").y = -95);
            } else {
                UIManager.getRef("setMaxWinOdd_m") && (UIManager.getRef("setMaxWinOdd_m").visible = false);
                UIManager.getRef("setMaxWinOdd_portrait") && (UIManager.getRef("setMaxWinOdd_portrait").visible = true);

                UIManager.getRef("setMaxWinOdd_m2") && (UIManager.getRef("setMaxWinOdd_m2").visible = false);
                UIManager.getRef("setMaxWinOdd_m2_portrait") && (UIManager.getRef("setMaxWinOdd_m2_portrait").visible = true);

                UIManager.getRef("Mobiletext_win_value") && (UIManager.getRef("Mobiletext_win_value").visible = false);
                UIManager.getRef("Mobiletext_win_label") && (UIManager.getRef("Mobiletext_win_label").visible = false);


                UIManager.getRef("text_Win_label_mobile") && (UIManager.getRef("text_Win_label_mobile").x = 720) && (UIManager.getRef("text_Win_label_mobile").y = 585);
                UIManager.getRef("text_colonSymbol3_mobile") && (UIManager.getRef("text_colonSymbol3_mobile").x = 725) && (UIManager.getRef("text_colonSymbol3_mobile").y = 583);
                UIManager.getRef("text_Win_value_mobile") && (UIManager.getRef("text_Win_value_mobile").x = 735) && (UIManager.getRef("text_Win_value_mobile").y = 585);
            }
            if (this.props.inFreeGame) {
                if (window.innerHeight > window.innerWidth) {
                  UIManager.getRef("text_Win_label_mobile") && (UIManager.getRef("text_Win_label_mobile").x = 750) && (UIManager.getRef("text_Win_label_mobile").y = 750);
                  UIManager.getRef("text_colonSymbol3_mobile") && (UIManager.getRef("text_colonSymbol3_mobile").x = 755) && (UIManager.getRef("text_colonSymbol3_mobile").y = 748);
                  UIManager.getRef("text_Win_value_mobile") && (UIManager.getRef("text_Win_value_mobile").x = 765) && (UIManager.getRef("text_Win_value_mobile").y = 750);
                }
                else {
                  UIManager.getRef("text_Win_label_mobile") && (UIManager.getRef("text_Win_label_mobile").x = 950) && (UIManager.getRef("text_Win_label_mobile").y = 29);
                  UIManager.getRef("text_colonSymbol3_mobile") && (UIManager.getRef("text_colonSymbol3_mobile").x = 955) && (UIManager.getRef("text_colonSymbol3_mobile").y = 27);
                  UIManager.getRef("text_Win_value_mobile") && (UIManager.getRef("text_Win_value_mobile").x = 965) && (UIManager.getRef("text_Win_value_mobile").y = 29);
                }
              }
        }
        else {
            if (window.innerWidth > window.innerHeight) {
                UIManager.getRef("setMaxWinOdd_m") && (UIManager.getRef("setMaxWinOdd_m").visible = true);
                UIManager.getRef("setMaxWinOdd_portrait") && (UIManager.getRef("setMaxWinOdd_portrait").visible = false);

                UIManager.getRef("setMaxWinOdd_m2") && (UIManager.getRef("setMaxWinOdd_m2").visible = true);
                UIManager.getRef("setMaxWinOdd_m2_portrait") && (UIManager.getRef("setMaxWinOdd_m2_portrait").visible = false);

                UIManager.getRef("text_Win_label_mobile") && (UIManager.getRef("text_Win_label_mobile").x = 950) && (UIManager.getRef("text_Win_label_mobile").y = 29);
                UIManager.getRef("text_colonSymbol3_mobile") && (UIManager.getRef("text_colonSymbol3_mobile").x = 955) && (UIManager.getRef("text_colonSymbol3_mobile").y = 27);
                UIManager.getRef("text_Win_value_mobile") && (UIManager.getRef("text_Win_value_mobile").x = 965) && (UIManager.getRef("text_Win_value_mobile").y = 29);
            } else {
                UIManager.getRef("setMaxWinOdd_m") && (UIManager.getRef("setMaxWinOdd_m").visible = false);
                UIManager.getRef("setMaxWinOdd_portrait") && (UIManager.getRef("setMaxWinOdd_portrait").visible = true);

                UIManager.getRef("setMaxWinOdd_m2") && (UIManager.getRef("setMaxWinOdd_m2").visible = false);
                UIManager.getRef("setMaxWinOdd_m2_portrait") && (UIManager.getRef("setMaxWinOdd_m2_portrait").visible = true);

                UIManager.getRef("text_Win_label_mobile") && (UIManager.getRef("text_Win_label_mobile").x = 818) && (UIManager.getRef("text_Win_label_mobile").y = 700);
                UIManager.getRef("text_colonSymbol3_mobile") && (UIManager.getRef("text_colonSymbol3_mobile").x = 823) && (UIManager.getRef("text_colonSymbol3_mobile").y = 698);
                UIManager.getRef("text_Win_value_mobile") && (UIManager.getRef("text_Win_value_mobile").x = 833) && (UIManager.getRef("text_Win_value_mobile").y = 700);
            }
            if (this.props.inFreeGame ) {

                if (window.innerHeight > window.innerWidth) {
                    UIManager.getRef("text_Win_label_mobile") && (UIManager.getRef("text_Win_label_mobile").x = 818) && (UIManager.getRef("text_Win_label_mobile").y = 850);
                    UIManager.getRef("text_colonSymbol3_mobile") && (UIManager.getRef("text_colonSymbol3_mobile").x = 823) && (UIManager.getRef("text_colonSymbol3_mobile").y = 848);
                    UIManager.getRef("text_Win_value_mobile") && (UIManager.getRef("text_Win_value_mobile").x = 833) && (UIManager.getRef("text_Win_value_mobile").y = 850);
                }
                else {
                    UIManager.getRef("text_Win_label_mobile") && (UIManager.getRef("text_Win_label_mobile").x = 950) && (UIManager.getRef("text_Win_label_mobile").y = 29);
                    UIManager.getRef("text_colonSymbol3_mobile") && (UIManager.getRef("text_colonSymbol3_mobile").x = 955) && (UIManager.getRef("text_colonSymbol3_mobile").y = 27);
                    UIManager.getRef("text_Win_value_mobile") && (UIManager.getRef("text_Win_value_mobile").x = 965) && (UIManager.getRef("text_Win_value_mobile").y = 29);
                }
            }
        }
    }

    //this method will change the left container text
    leftContainerChanging() {
        this.messagesRunInLoopLeftContainer.map((data: any, index: number) => {
            data.visible = false
            if (this.leftContainerChildCurrentIndex === this.messagesRunInLoopLeftContainer.length) {
                this.leftContainerChildCurrentIndex = 0;
            }
        })
        this.messagesRunInLoopLeftContainer[this.leftContainerChildCurrentIndex] && (this.messagesRunInLoopLeftContainer[this.leftContainerChildCurrentIndex].visible = true);
        this.leftContainerChildCurrentIndex++;
    }

    //to start the interval, call this method
    startInterval(nextProps: any) {
        if (nextProps.selectContainer === "both" || nextProps.selectContainer === "left") {
            this.changeLeftContent.call(this);
            let timer = TIMER.TimerManager.createTimer(this.props.leftContainerIntervalTime);
            timer.on('repeat', (i: number) => {
                this.changeLeftContent();
                if (nextProps.pauseInterval) {
                    timer.stop();
                    this.pauseInterval(nextProps);
                }
            });
            timer.start(true, this.props.leftContainerIntervalTime);
        }
        if (nextProps.selectContainer === "both" || nextProps.selectContainer === "right") {
            this.changeRightContent.call(this);
            let timer = TIMER.TimerManager.createTimer(this.props.rightContainerIntervalTime);
            timer.on('repeat', (i: number) => {
                this.changeRightContent();
                if (nextProps.pauseInterval) {
                    timer.stop();
                    this.pauseInterval(nextProps);
                }
            });
            timer.start(true, this.props.rightContainerIntervalTime);
        }
    }

    //this method will pause the text
    pauseInterval(nextProps: any) {
        if (nextProps.selectContainer === "both" || nextProps.selectContainer === "left") {
            this.displayUI.map((data: any) => {
                if (data.name === "leftInfoContainer") {
                    for (let i = 0; i < data.child.length; i++) {
                        data.child[i].visible = false;
                    }
                    data.child[this.leftContainerChildCurrentIndex].visible = true;
                }
            })
        }
        if (nextProps.selectContainer === "both" || nextProps.selectContainer === "right") {
            this.displayUI.map((data: any) => {
                if (data.name === "rightInfoContainer") {
                    for (let i = 0; i < data.child.length; i++) {
                        data.child[i].visible = false;
                    }
                    data.child[this.rightContainerChildCurrentIndex].visible = true;
                }
            })
        }
        this.props.pauseTheInterval(false);
    }




    updateValues(nextProps: any) {
        let balanceValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString((this.props.previousBalance - this.props.betList[this.props.currentBetIndex]) / this.constantT1, true, true, true, true);
       if (nextProps.basegamestate) {
            UIManager.getRef(this.balanceValueText) && (UIManager.setText(this.balanceValueText, balanceValueInCurrency));
        } else {
        }
    }

    showWin(nextProps: any, lastWinStore: any) {
        //if (!isMobile) {
        if (this.props.winAmount !== 0) {

            UIManager.getRef(this.winValueText).visible = true;

            let winAmountInCurrency;
            if (lastWinStore == 0) {
                winAmountInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(this.winValueStore / this.constantT1, true, true, true, true);
            } else {
                winAmountInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(lastWinStore / this.constantT1, true, true, true, true);
            }
            UIManager.getRef(this.winValueText) && (UIManager.setText(this.winValueText, winAmountInCurrency));
        } else {
            UIManager.getRef(this.winValueText).visible = false;
        }
        //  }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.spinStart !== this.props.spinStart || nextProps.allSpinComplete !== this.props.allSpinComplete || nextProps.layoutMode !== this.props.layoutMode
            || nextProps.allButtonEnable !== this.props.allButtonEnable || nextProps.currentBetIndex != this.props.currentBetIndex || nextProps.winAmount != this.props.winAmount
            || nextProps.winAmountEmpty != this.props.winAmountEmpty
            || nextProps.basegamestate != this.props.basegamestate) {

            if (nextProps.allButtonEnable && nextProps.basegamestate) {
                let balanceValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(nextProps.transitionBalance / this.constantT1, true, true, true, true);
                UIManager.getRef(this.balanceValueText) && (UIManager.setText(this.balanceValueText, balanceValueInCurrency));
            }
            if (nextProps.spinStart) {
                this.winValueStore = 0;
                UIManager.getRef(this.winValueText) && (UIManager.getRef(this.winValueText).visible = false);
                this.updateValues(nextProps);
            }
            if (nextProps.allSpinComplete && nextProps.allSpinComplete != this.props.allSpinComplete) {
                if (nextProps.winAmount !== 0) {

                    let timer = TIMER.TimerManager.createTimer(210);
                    timer.on('end', (e: any) => {
                        this.winValueStore = this.winValueStore + this.props.winAmount;
                        this.showWin(nextProps, nextProps.winAmount);
                        timer && timer.stop();
                        timer && timer.remove();
                    })
                    timer.start();

                } else {
                    this.winValueStore = 0;
                }
            }
            if (nextProps.winAmountEmpty) {
                UIManager.getRef(this.winValueText) && (UIManager.getRef(this.winValueText).visible = false);
                this.props.setWinAmount(false);
            }
            if (nextProps.winAmount !== this.props.winAmount) {

                this.winValueStore = nextProps.winAmount + this.winValueStore;
                this.showWin(nextProps, this.winValueStore);
            }
            if (nextProps.currentBetIndex !== this.props.currentBetIndex) {
                this.betValueText && (this.betValueText.text = CURRENCY.CurrencyManager.formatCurrencyString((this.props.betList[nextProps.currentBetIndex] / this.constantT1), true, true, true, true));
                if (this.props.currencyIgnoreDecimals) {
                    let toString = (this.props.betList[nextProps.currentBetIndex] / this.constantT1);
                    this.betValueText && (this.betValueText.text = CURRENCY.CurrencyManager.formatCurrencyString(toString, true, true, true, true));
                    let bet = CURRENCY.CurrencyManager.formatCurrencyString(toString, true, true, true, true);
                    this.betValueText && UIManager.setText("text_bet_value", bet);
                 } else {
                    this.setBetTextSize(nextProps);
                }

                UIManager.getRef("text_Coin_value_value") && (UIManager.getRef("text_Coin_value_value").text = CURRENCY.CurrencyManager.formatCurrencyString(nextProps.coinList[nextProps.selectedCoin] / this.coinValueDivider, true, true, true, true));
                if (this.props.currencyIgnoreDecimals) {
                    let toString = nextProps.coinList[nextProps.selectedCoin] / this.coinValueDivider;
                    let toString1 = CURRENCY.CurrencyManager.formatCurrencyString(toString, true, true, true, true)
                    this.coinValueText && UIManager.setText("text_Coin_value_value", toString1);
                } else {
                    this.setCoinTextSize();
                }
            }
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode);
                this.setGameRtp();
                this.setMaxWinOdd();

            }
            if (nextProps.basegamestate != this.props.basegamestate) {
                this.desktopSocial1(nextProps);
                if (nextProps.basegamestate) {
                    if ((nextProps.totalCreditWinAmount / 100) >= this.winCelebrationMinimumValue * this.props.betList[this.props.currentBetIndex] / 100) {
                    }
                    this.props.totalCreditWinAmount && UIManager.getRef(this.winValueText) && (UIManager.getRef(this.winValueText).visible = true);
                    let totaltWinAmount = CURRENCY.CurrencyManager.formatCurrencyString((this.props.totalCreditWinAmount) / this.constantT1, true, true, true, true)
                    this.props.totalCreditWinAmount && UIManager.getRef(this.winValueText) && (UIManager.setText(this.winValueText, totaltWinAmount));
                }
            }
            return false;
        }
        return false;
    }


    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        this.bindUI();
        this.orientationChange();
      
    }

    render() {

        return (
            <UIManager id={"gofPlayerMessageContainer"} type={"Container"} ref={i => this.gofPlayerMessageContainer = i}
                app={this.app}>
                <UIManager id={"playerMessage"} type={"Container"} name={"playerMessage"} app={this.app}>
                    {
                        this.displayUI && this.displayUI.map((i: any) =>
                            <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                                id={i.id} {...i} app={this.app} />
                        )
                    }
                </UIManager>
            </UIManager>
        )
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'paytableBMState' | 'basegameState' | 'freegameState' | 'applicationState' | 'playerMessageState' | 'reelgridState' | 'betPanelState' | 'buttonPanelState' | 'behaviourState' | 'asyncGameLevelSeverState'>, ownProps?: any): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        spinStart: state.reelgridState.spinStart,
        allSpinComplete: state.reelgridState.allSpinComplete,
        betList: state.basegameState.betList,
        currentBetIndex: state.basegameState.currentBetIndex,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        winAmount: state.basegameState.winAmount,
        inFreeGame: state.freegameState.inFreeGame,
        balance: state.basegameState.balance,
        basegamestate: state.basegameState.basegamestate,
        allButtonEnable: state.buttonPanelState.allButtonEnable,
        transitionBalance: state.behaviourState.transitionBalance,
        previousBalance: state.behaviourState.previousBalance,
        increaseBetResult: state.asyncGameLevelSeverState.result,
        winAmountEmpty: state.behaviourState.winAmountEmpty,
        totalCreditWinAmount: state.behaviourState.totalCreditWinAmount,
        showTime: state.applicationState.showTime,
        showRTP: state.applicationState.showRTP,
        storeRtp: state.paytableBMState.storeRtp,
        maxWinOddsCount: state.behaviourState.maxWinOddsCount,
        showTopWinOdds: state.applicationState.showTopWinOdds,
        currencyIgnoreDecimals: state.applicationState.currencyIgnoreDecimals,
        languageCode: state.applicationState.languageCode,
        jurisdictionKey: state.applicationState.jurisdictionKey,
    }),
    (dispatch: Dispatch, ownProps): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setPreviousBalance: (previousBalance: any): any => dispatch(behaviourAction.setPreviousBalance(previousBalance)),
        setWinAmount: (winAmountEmpty: any): any => dispatch(behaviourAction.setWinAmount(winAmountEmpty)),
        winCelebrationStart: (startWinCelebration: boolean, showAmount: string): any => dispatch(winCelebrationActions.winCelebrationStart(startWinCelebration, showAmount)),
        winCelebrationShow: (showWinCelebration: boolean): any => dispatch(winCelebrationActions.winCelebrationShow(showWinCelebration)),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setTopwinOddsShow: (showTopWinOdds: boolean): any => dispatch(applicationStateActions.setTopwinOddsShow(showTopWinOdds)),


    }))(withPlayerMessageConfiguration(GofPlayerMessage)));