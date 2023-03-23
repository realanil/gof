import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withBaseGameConfiguration from "../../core/components/basegame/configuration/withBaseGameConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import { actions as layoutsActions } from "../../core/reducers/layoutsStateReducer";
import { actions as baseGameAction } from "../../core/reducers/baseGameReducer";
import { actions as winCelebrationActions } from "../../gamereducer/winCelebrationReducer";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as freeGameAction } from "../../core/reducers/freeGameReducer";
import PIXI from "pixi.js";
import { isIOS, isMobile, isTablet } from "react-device-detect";
import { CURRENCY, TIMER } from "../../core/utills";
import { actions as soundActions } from "../../core/reducers/soundReducer";
import { configGame } from "../../data/config";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { actions as aplicationActions } from "../../core/reducers/applicationStateReducer";
import { frameworkReelGrid } from "../../core/components/reelgrid/configuration/reelgridconfiguration";
import { frameworkGrids } from "../horizontalGrid/configuration/horizontalGridconfiguration";
import { Tween } from "../../core/components/effect/tween";

interface IProps {
  [x: string]: any;
}

interface IStore {
  [x: string]: any;
}

interface IStateToProps {
  soundOnOff: string;
  languageCode: string;
  layoutMode: string;
  jurisdictionKey: string;
  balance: number;
  winAmount: number;
  allSpinComplete: any;
  stopIfSingleWinExceed: any;
  stopIfBalanceIncreasedBy: any;
  stopIfBalanceDecreasedBy: any;
  stopAutoplayOnAnyWin: any;
  basegamestate: any;
  spinStart: any;
  currentBetIndex: any;
  betList: any;
  allButtonEnable: any;
  transitionBalance: any;
  previousBalance: any;
  selectedCoin: any;
  coinList: any;
  spinStopID: any;
  displayReelGridSymbolCount: any;
  winAmountEmpty: any;
  InTurboMode: any;
  resetManyWaysTextToInitial: any;
  totalCreditWinAmount: any;
  featureJustReTriggered: any;
  storeAmountForAutoplay: any;
  blastStart: any;
  freegameSpinCountRemaining: any;
  currencyGroupingSeparator: any;
  currencyDecimalSeparator: any;
}

interface IDispatchToProps { }

interface IState {
  [x: string]: any;
}

class GofBaseGame extends Component<IProps, IState> {
  protected app: PIXI.Application;
  protected gofBaseGameContainer: _ReactPixi.IContainer | Ref<any>;
  protected ui_mode: string;
  protected displayUI: any;
  protected logoAnimIntervalTime: number;
  protected baseGameFrameBorder: any;
  protected textWinlabelmobile: any;
  protected baseGameFramesInsidePortionImage: any;
  protected manywaysTextImage: any;
  protected mobileTextBetLabel: any;
  protected mobileTextMobColonSymbol3: any;
  protected mobileTextBetValue: any;
  protected BGbalanceTextBgImage: any;
  protected text_win_label: any;
  protected text_win_value1: any;
  protected Mobiletext_mobColonSymbol4: any;
  protected textcolonSymbol3mobile: any;
  protected BG_win_Text_Bg_Image: any;
  protected mobileTextBalanceLabel: any;
  protected mobileTextMobColonSymbol2: any;
  protected textWinvaluemobile: any;
  protected text_balance_value_desktop: any;
  protected mobileTextBalanceValue: any;
  protected BG_balance_Text_Bg_Image_Social: any;
  private tweenTimer: number = 0.001;
  protected leftCaveImage: any;
  protected text_balance_label_mobile: any;
  protected rightCaveImage: any;
  protected mobileTextWinLabel: any;
  protected mobileTextMobColonSymbol1: any;
  protected Mobiletext_mobColonSymbol5: any;
  protected mobileTextWinValue: any;
  protected text_balance_label: any;
  protected logoForMobile: any;
  protected logoForDesktop: any;
  protected text_balance_value_mobile: any;
  protected originalScalingOfObject: number = 1;
  protected frameBorderScaling: number = 0.88;
  protected manywaysTextPortraitScalingX: number = 0.7;
  protected manywaysTextPortraitScalingY: number = 0.8;
  protected cavePortraitScalingX: number = 0.9;
  protected cavePortraitScalingY: number = 0.89;
  protected storeCurrentBalance: number = 0;
  protected storeTotalWinAmount: number = 0;
  protected constantT1: number = 2000;
  protected constantT2: number = 100;
  protected mwTextValue: number = 1;
  protected winValueStore: number = 0;
  protected baseGameSound: string = "introductionSoundLoop";
  protected reelGridSymbolsArray: any = [];
  protected winCelebration: boolean = true;
  protected mwIntialValue: number = 2880;
  protected logoAnimDelay: number = 1000;
  private AllTimer: any[] = [];
  constructor(props: IProps) {
    super(props);
    this.AllTimer = [];
    this.app = props.app;
    this.state = {
      uiElements: [],
      lang: "en",
    };
    // this.gofBaseGameContainer = React.createRef();
    this.gofBaseGameContainer = {};
    if (isMobile) {
      this.ui_mode = "mobile";
    } else {
      this.ui_mode = "desktop";
    }
    this.logoAnimIntervalTime = 11050;
    this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
  }

  //while first rendering, this method will check the mode first
  checkUiMode(uimodeobj: any) {
    if (uimodeobj.uimode === undefined) {
      uimodeobj.uimode = "both";
    }
    if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
      return uimodeobj;
    }
  }

  //this method will initialize object in a variable
  initializeObjectToVariable() {
    this.baseGameFrameBorder = UIManager.getRef("BG_frame_Image_Mobile");
    this.baseGameFramesInsidePortionImage = UIManager.getRef("BG_reelOfFrame_Image_Mobile");
    this.manywaysTextImage = UIManager.getRef("BG_textManyWays_Image_mobile");
    this.leftCaveImage = UIManager.getRef("leftCaveMaskImage_mobile");
    this.rightCaveImage = UIManager.getRef("rightCaveMaskImage_mobile");
    this.logoForDesktop = UIManager.getRef("BG_gameLogo_Anim_desktop");
    this.logoForMobile = UIManager.getRef("BG_gameLogo_Anim_mobile");
    this.mobileTextBetLabel = UIManager.getRef("Mobiletext_bet_label");
    this.mobileTextMobColonSymbol3 = UIManager.getRef("Mobiletext_mobColonSymbol3");
    this.mobileTextBetValue = UIManager.getRef("Mobiletext_bet_value");
    this.mobileTextWinLabel = UIManager.getRef("Mobiletext_win_label");
    this.mobileTextMobColonSymbol1 = UIManager.getRef("Mobiletext_mobColonSymbol1");
    this.mobileTextWinValue = UIManager.getRef("Mobiletext_win_value");
    this.mobileTextBalanceLabel = UIManager.getRef("Mobiletext_balance_label");
    this.mobileTextMobColonSymbol2 = UIManager.getRef("Mobiletext_mobColonSymbol2");
    this.mobileTextBalanceValue = UIManager.getRef("Mobiletext_balance_value");
    this.textWinlabelmobile = UIManager.getRef("text_Win_label_mobile");
    this.textcolonSymbol3mobile = UIManager.getRef("text_colonSymbol3_mobile");
    this.textWinvaluemobile = UIManager.getRef("text_Win_value_mobile");
    this.BGbalanceTextBgImage =UIManager.getRef("BG_balance_Text_Bg_Image");
    this.BG_balance_Text_Bg_Image_Social = UIManager.getRef("BG_balance_Text_Bg_Image_Social");
    this.BG_win_Text_Bg_Image =  UIManager.getRef("BG_win_Text_Bg_Image");
    this.text_balance_label = UIManager.getRef("text_balance_label");
    this.text_balance_value_desktop = UIManager.getRef("text_balance_value_desktop");
    this.text_win_label = UIManager.getRef("text_win_label");
    this.text_win_value1 = UIManager.getRef("text_win_value1");
    this.Mobiletext_mobColonSymbol4 = UIManager.getRef("Mobiletext_mobColonSymbol4");
    this.Mobiletext_mobColonSymbol5 = UIManager.getRef("Mobiletext_mobColonSymbol5");
    this.text_balance_label_mobile =  UIManager.getRef("text_balance_label_mobile");
    this.text_balance_value_mobile = UIManager.getRef("text_balance_value_mobile");
  }
  symbolDroping() {
    frameworkReelGrid.data.delayDropDuration = 200;
    frameworkGrids.data.blastDuration = 2200;
  }

  tweenTo(
    object: any,
    property: any,
    target: any,
    time: any,
    easing: any,
    onchange: any,
    oncomplete: any,
    start?: number
  ) {
    new Tween([object], { [property]: { start: object[property], end: target }, },
      time || this.tweenTimer, easing, false, null, null, null, null, false, onchange, oncomplete);
  }
  useQuery = () => {
    let search = window.location.search;
    return new URLSearchParams(search);
  }

  componentDidMount() {
    if (this.props.basegamestate && this.props.soundOnOff) {
      if (((localStorage.getItem("playerId-sound-" + this.useQuery().get("token")) === "true") ? true : false)) {
        this.props.playingSound(true);
      } else {
        this.props.playingSound(false);
      }

      this.symbolDroping();
      if (this.props.freegameSpinCountRemaining !== undefined) {
        let graphicName: any;
        if (isMobile && window.innerWidth < window.innerHeight) {
          graphicName = "baseGameBlackScreenPortrait";
        } else {
          graphicName = "baseGameBlackScreen";
        }
        UIManager.getRef(graphicName) && (UIManager.getRef(graphicName).visible = true);
        let timer1 = TIMER.TimerManager.createTimer(50);
        timer1.on("end", (e: any) => {
          e.remove();
          this.tweenTo(UIManager.getRef(graphicName), "alpha", 0, 0.5, "easeInCubic", null, () => {
            UIManager.getRef(graphicName).visible = false;
          });
        });
        timer1.start();
        this.AllTimer.push(timer1);
      }
    }
    this.layoutChange(this.props.layoutMode);
    this.initializeObjectToVariable();
    this.bindUI();
    this.setManywaysInitially();
    this.onOrientationChange();
    this.wintextposition();
    if (this.props.jurisdictionKey === "social") {
      UIManager.getRef("good_Luck_Text") && (UIManager.getRef("good_Luck_Text").visible = true);
    }
  }
  wintextposition() {
    if (this.props.jurisdictionKey == "social") {

      if (window.innerHeight > window.innerWidth) {
        this.textWinlabelmobile && (this.textWinlabelmobile.x = 720) && (this.textWinlabelmobile.y = 585);
        this.textcolonSymbol3mobile && (this.textcolonSymbol3mobile.x = 725) && (this.textcolonSymbol3mobile.y = 583);
        this.textWinvaluemobile && (this.textWinvaluemobile.x = 735) && (this.textWinvaluemobile.y = 585);

      }
      else {
        this.textWinlabelmobile && (this.textWinlabelmobile.x = 880) && (this.textWinlabelmobile.y = -95);
        this.textcolonSymbol3mobile && (this.textcolonSymbol3mobile.x = 885) && (this.textcolonSymbol3mobile.y = -97);
        this.textWinvaluemobile && (this.textWinvaluemobile.x = 895) && (this.textWinvaluemobile.y = -95);
      }
    }
    else {
      if (window.innerWidth > window.innerHeight) {
        this.textWinlabelmobile && (this.textWinlabelmobile.x = 950) && (this.textWinlabelmobile.y = 29);
        this.textcolonSymbol3mobile && (this.textcolonSymbol3mobile.x = 955) && (this.textcolonSymbol3mobile.y = 27);
        this.textWinvaluemobile && (this.textWinvaluemobile.x = 965) && (this.textWinvaluemobile.y = 29);
      } else {
        this.textWinlabelmobile && (this.textWinlabelmobile.x = 818) && (this.textWinlabelmobile.y = 700);
        this.textcolonSymbol3mobile && (this.textcolonSymbol3mobile.x = 823) && (this.textcolonSymbol3mobile.y = 698);
        this.textWinvaluemobile && (this.textWinvaluemobile.x = 833) && (this.textWinvaluemobile.y = 700);
      }
    }
  }

  setManywaysInitially() {
    this.symbolsCountRearrangeCount(this.props);
    let totalmwCount = 1;
    for (let j = 0; j < this.reelGridSymbolsArray.length; j++) {
      totalmwCount = totalmwCount * this.reelGridSymbolsArray[j];
    }
    UIManager.getRef("BG_manywaysText_desktop") && (UIManager.getRef("BG_manywaysText_desktop").text = totalmwCount);
    UIManager.getRef("BG_manywaysText_mobile") && (UIManager.getRef("BG_manywaysText_mobile").text = totalmwCount);
  }
  symbolsCountRearrangeCount(nextProps: any) {
    for (let i = 0; i < nextProps.displayReelGridSymbolCount.length; i++) {
      let data;
      if (i == 0 || i == nextProps.displayReelGridSymbolCount.length - 1) {
        data = nextProps.displayReelGridSymbolCount[i];
      } else if (i > 0) {
        data = nextProps.displayReelGridSymbolCount[i] + 1;
      }
      this.reelGridSymbolsArray.push(data);
    }
  }

  totalBalanceShow() {

    this.props.totalCreditWinAmount && (this.mobileTextWinValue.visible = true);
    this.props.totalCreditWinAmount && UIManager.setText("Mobiletext_win_value", this.props.totalCreditWinAmount);
  }

  //this method will call after the first rendering for scaling and logo animation looping
  bindUI() {
    if (isMobile) {
      if (window.innerWidth < window.innerHeight) {
        this.totalBalanceShow();
        this.portraitScaling();
      } else {
        this.totalBalanceShow();
        this.landscapeScaling();
      }
      let balanceMob;
      if (this.props.freegameSpinCountRemaining != undefined) {
        balanceMob = this.props.transitionBalance;
      }
      else {
        balanceMob = this.props.balance;

      }
      let balanceValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(balanceMob / this.constantT2, true, true, true, true);
      let betValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(this.props.betList[this.props.currentBetIndex] / this.constantT2, true, true, true, true);
      this.mobileTextBalanceValue && UIManager.setText("Mobiletext_balance_value", balanceValueInCurrency);
      UIManager.getRef("Mobiletext_bet_value") && UIManager.setText("Mobiletext_bet_value", betValueInCurrency);
    } else {
      this.logoForDesktop && this.logoForDesktop.gotoAndPlay(0);
      this.props.totalCreditWinAmount && ( this.text_win_value1.visible = true);
      this.props.totalCreditWinAmount && UIManager.setText("text_win_value1", this.numberWithCommasAndDeciaml(this.props.totalCreditWinAmount));
    }

    let balance = this.props.balance / this.constantT2;
    UIManager.getRef("text_balance_value_" + this.ui_mode) && UIManager.setText("text_balance_value_" + this.ui_mode, this.numberWithCommasAndDeciaml(Math.round((balance / this.props.coinList[this.props.selectedCoin]) * this.constantT1)));
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
  //this method will be called when a button gets clicked
  handleEvent(e: any) {

  }
  desktopSocial() {

    if (this.props.jurisdictionKey == "social") {
      this.BGbalanceTextBgImage && ( this.BGbalanceTextBgImage.visible = false);
      this.BG_balance_Text_Bg_Image_Social && (  this.BG_balance_Text_Bg_Image_Social.visible = true);
      this.BG_win_Text_Bg_Image && (this.BG_win_Text_Bg_Image.visible = false);
      this.text_balance_label && (this.text_balance_label.visible = false);
      this.text_balance_value_desktop && (  this.text_balance_value_desktop.visible = false);
      this.text_win_label && (this.text_win_label .visible = false);
      this.text_win_value1  && (this.text_win_value1 .visible = false);

    }
    else {

      this.BGbalanceTextBgImage && ( this.BGbalanceTextBgImage.visible = true);
      this.BG_balance_Text_Bg_Image_Social && (  this.BG_balance_Text_Bg_Image_Social.visible = false);
      this.BG_win_Text_Bg_Image && (this.BG_win_Text_Bg_Image.visible = true);
      this.text_balance_label && (this.text_balance_label.visible = true);
      this.text_balance_value_desktop && (  this.text_balance_value_desktop.visible = true);
      this.text_win_label  && (this.text_win_label .visible = true);
      this.text_win_value1  && (this.text_win_value1 .visible = true);
    }
  }

  landscapeTextAlignment() {

    if (window.innerWidth > window.innerHeight) {
      if (this.props.jurisdictionKey == "social") {
        this.mobileTextBetLabel && (this.mobileTextBetLabel.x = 350) && (this.mobileTextBetLabel.y = 1050);
        this.mobileTextMobColonSymbol3 && (this.mobileTextMobColonSymbol3.x = 355) && (this.mobileTextMobColonSymbol3.y = 1048);
        this.mobileTextBetValue && (this.mobileTextBetValue.x = 365) && (this.mobileTextBetValue.y = 1050);

        this.mobileTextWinLabel && (this.mobileTextWinLabel.visible = false);
        this.mobileTextMobColonSymbol1 && (this.mobileTextMobColonSymbol1.visible = false);
        this.mobileTextWinValue && (this.mobileTextWinValue.visible = false);
        this.mobileTextMobColonSymbol1 && (this.mobileTextMobColonSymbol1.visible = false);
        this.Mobiletext_mobColonSymbol4  && (this.Mobiletext_mobColonSymbol4.visible = false);
        this.Mobiletext_mobColonSymbol5  && (this.Mobiletext_mobColonSymbol5.visible = false);
        this.text_balance_label_mobile  && (this.text_balance_label_mobile.visible = false);
        this.text_balance_value_mobile  && (this.text_balance_value_mobile.visible = false);
      }
      else {
        this.mobileTextBetLabel && (this.mobileTextBetLabel.x = 1495) && (this.mobileTextBetLabel.y = 1050);
        this.mobileTextMobColonSymbol3 && (this.mobileTextMobColonSymbol3.x = 1500) && (this.mobileTextMobColonSymbol3.y = 1048);
        this.mobileTextBetValue && (this.mobileTextBetValue.x = 1515) && (this.mobileTextBetValue.y = 1050);

        this.mobileTextWinLabel && (this.mobileTextWinLabel.x = 950) && (this.mobileTextWinLabel.y = 940);
        this.mobileTextMobColonSymbol1 && (this.mobileTextMobColonSymbol1.x = 959) && (this.mobileTextMobColonSymbol1.y = 938);
        this.mobileTextWinValue && (this.mobileTextWinValue.x = 968) && (this.mobileTextWinValue.y = 940);

        this.Mobiletext_mobColonSymbol4  && (this.Mobiletext_mobColonSymbol4.visible = true);
        this.Mobiletext_mobColonSymbol5  && (this.Mobiletext_mobColonSymbol5.visible = true);
        this.Mobiletext_mobColonSymbol4  && (this.Mobiletext_mobColonSymbol4.x = 1505) && (this.Mobiletext_mobColonSymbol4.y = 934);
        this.Mobiletext_mobColonSymbol5  && (this.Mobiletext_mobColonSymbol5.x = 512) && (this.Mobiletext_mobColonSymbol5.y = 934);
        this.text_balance_label_mobile  && (this.text_balance_label_mobile.x = 500) && (this.text_balance_label_mobile.y = 935.5);
        this.text_balance_value_mobile  && (this.text_balance_value_mobile.x = 524) && (this.text_balance_value_mobile.y = 935.5);

      }
    }
  }

  //this method will scale reelgrid according to the screen size
  portraitTextAlignment() {
    if (window.innerHeight > window.innerWidth) {
      if (this.props.jurisdictionKey == "social") {
        this.mobileTextBalanceLabel && (this.mobileTextBalanceLabel.x = 760) && (this.mobileTextBalanceLabel.y = 1754);
        this.mobileTextMobColonSymbol2 && (this.mobileTextMobColonSymbol2.x = 765) && (this.mobileTextMobColonSymbol2.y = 1752);
        this.mobileTextBalanceValue && (this.mobileTextBalanceValue.x = 775) && (this.mobileTextBalanceValue.y = 1754);

        this.mobileTextBetLabel && (this.mobileTextBetLabel.x = 230) && (this.mobileTextBetLabel.y = 1754);
        this.mobileTextMobColonSymbol3 && (this.mobileTextMobColonSymbol3.x = 235) && (this.mobileTextMobColonSymbol3.y = 1752);
        this.mobileTextBetValue && (this.mobileTextBetValue.x = 245) && (this.mobileTextBetValue.y = 1754);

        this.Mobiletext_mobColonSymbol4  && (this.Mobiletext_mobColonSymbol4.visible = false);
        this.Mobiletext_mobColonSymbol5  && (this.Mobiletext_mobColonSymbol5.visible = false);
        this.text_balance_label_mobile  && (this.text_balance_label_mobile.visible = false);
        this.text_balance_value_mobile  && (this.text_balance_value_mobile.visible = false);


        this.mobileTextWinLabel && (this.mobileTextWinLabel.visible = false);
        this.mobileTextMobColonSymbol1 && (this.mobileTextMobColonSymbol1.visible = false);
        this.mobileTextWinValue && (this.mobileTextWinValue.visible = false);
      }
      else {
        this.mobileTextBalanceLabel && (this.mobileTextBalanceLabel.x = 200) && (this.mobileTextBalanceLabel.y = 1754);
        this.mobileTextMobColonSymbol2 && (this.mobileTextMobColonSymbol2.x = 205) && (this.mobileTextMobColonSymbol2.y = 1752);
        this.mobileTextBalanceValue && (this.mobileTextBalanceValue.x = 215) && (this.mobileTextBalanceValue.y = 1754);

        this.mobileTextBetLabel && (this.mobileTextBetLabel.x = 960) && (this.mobileTextBetLabel.y = 1754);
        this.mobileTextMobColonSymbol3 && (this.mobileTextMobColonSymbol3.x = 965) && (this.mobileTextMobColonSymbol3.y = 1752);
        this.mobileTextBetValue && (this.mobileTextBetValue.x = 975) && (this.mobileTextBetValue.y = 1754);

        this.mobileTextWinLabel && (this.mobileTextWinLabel.visible = true);
        this.mobileTextWinLabel && (this.mobileTextWinLabel.x = 585) && (this.mobileTextWinLabel.y = 1635);
        this.mobileTextMobColonSymbol1 && (this.mobileTextMobColonSymbol1.x = 590) && (this.mobileTextMobColonSymbol1.y = 1633);
        this.mobileTextWinValue && (this.mobileTextWinValue.x = 600) && (this.mobileTextWinValue.y = 1635);

        this.Mobiletext_mobColonSymbol4  && (this.Mobiletext_mobColonSymbol4.visible = true);
        this.Mobiletext_mobColonSymbol5  && (this.Mobiletext_mobColonSymbol5.visible = true);
        this.Mobiletext_mobColonSymbol4  && (this.Mobiletext_mobColonSymbol4.x = 965) && (this.Mobiletext_mobColonSymbol4.y = 1630);
        this.Mobiletext_mobColonSymbol5  && (this.Mobiletext_mobColonSymbol5.x = 210) && (this.Mobiletext_mobColonSymbol5.y = 1630);
        this.text_balance_label_mobile  && (this.text_balance_label_mobile.x = 200) && (this.text_balance_label_mobile.y = 1633);
        this.text_balance_value_mobile  && (this.text_balance_value_mobile.x = 220) && (this.text_balance_value_mobile.y = 1633);

        if (this.props.languageCode === 'pl'
          || this.props.languageCode === 'da'
          || this.props.languageCode === 'hr'
          || this.props.languageCode === 'sv'
          || this.props.languageCode === 'nb') {
          this.mobileTextBalanceLabel && (this.mobileTextBalanceLabel.x = 200) && (this.mobileTextBalanceLabel.y = 1755);
          this.mobileTextMobColonSymbol2 && (this.mobileTextMobColonSymbol2.x = 210) && (this.mobileTextMobColonSymbol2.y = 1752);
          this.mobileTextBalanceValue && (this.mobileTextBalanceValue.x = 220) && (this.mobileTextBalanceValue.y = 1754);
        }
      }
    }
    else {
      if (window.innerWidth > window.innerHeight) {
        if (this.props.jurisdictionKey == "social") {
          this.mobileTextBalanceLabel && (this.mobileTextBalanceLabel.x = 1495) && (this.mobileTextBalanceLabel.y = 1050);
          this.mobileTextMobColonSymbol2 && (this.mobileTextMobColonSymbol2.x = 1500) && (this.mobileTextMobColonSymbol2.y = 1048);
          this.mobileTextBalanceValue && (this.mobileTextBalanceValue.x = 1510) && (this.mobileTextBalanceValue.y = 1050);
          this.Mobiletext_mobColonSymbol5 && (this.Mobiletext_mobColonSymbol5.visible = false);
          this.Mobiletext_mobColonSymbol4  && (this.Mobiletext_mobColonSymbol4.visible = false);
          this.mobileTextWinValue && (this.mobileTextWinValue.visible = false);
          UIManager.getRef("Mobiletext_win_label") && (UIManager.getRef("Mobiletext_win_label").visible = false);
          this.mobileTextWinLabel && (this.mobileTextWinLabel.visible = false);
          this.mobileTextMobColonSymbol1 && (this.mobileTextMobColonSymbol1.visible = false);
          this.mobileTextWinValue && (this.mobileTextWinValue.visible = false);

        } else {

          this.mobileTextBalanceLabel && (this.mobileTextBalanceLabel.x = 500) && (this.mobileTextBalanceLabel.y = 1050);
          this.mobileTextMobColonSymbol2 && (this.mobileTextMobColonSymbol2.x = 505) && (this.mobileTextMobColonSymbol2.y = 1048);
          this.mobileTextBalanceValue && (this.mobileTextBalanceValue.x = 515) && (this.mobileTextBalanceValue.y = 1050);

          if (this.props.languageCode === 'pl'
            || this.props.languageCode === 'da'
            || this.props.languageCode === 'hr'
            || this.props.languageCode === 'sv'
            || this.props.languageCode === 'nb') {
            this.mobileTextBalanceLabel && (this.mobileTextBalanceLabel.x = 670) && (this.mobileTextBalanceLabel.y = 1050);
            this.mobileTextMobColonSymbol2 && (this.mobileTextMobColonSymbol2.x = 692) && (this.mobileTextMobColonSymbol2.y = 1048);
            this.mobileTextBalanceValue && (this.mobileTextBalanceValue.x = 709) && (this.mobileTextBalanceValue.y = 1050);
            this.Mobiletext_mobColonSymbol5  && (this.Mobiletext_mobColonSymbol5.visible = true);
            this.Mobiletext_mobColonSymbol4  && (this.Mobiletext_mobColonSymbol4.visible = true);
          }
        }
      }
    }
  }

  onOrientationChange() {
    this.desktopSocial();
    this.landscapeTextAlignment()
    this.portraitTextAlignment();
    let reelGrid = UIManager.getRef("reelgridLayer");
    !isTablet && UIManager.getRef("BG_gameLogo_Anim_mobile") && (UIManager.getRef("BG_gameLogo_Anim_mobile").scale.set(2));
    UIManager.getRef("BG_reelOfFrame_Image_Desktop") && (UIManager.getRef("BG_reelOfFrame_Image_Desktop").scale.set(2));
    UIManager.getRef("BG_leftTorchFlame_Anim_desktop") && (UIManager.getRef("BG_leftTorchFlame_Anim_desktop").scale.set(1.2));
    UIManager.getRef("BG_leftTorchFlame_Anim_mobile") && (UIManager.getRef("BG_leftTorchFlame_Anim_mobile").scale.set(1.2));
    UIManager.getRef("BG_rightTorchFlame_Anim_desktop") && (UIManager.getRef("BG_rightTorchFlame_Anim_desktop").scale.set(1.2));
    UIManager.getRef("BG_rightTorchFlame_Anim_mobile") && (UIManager.getRef("BG_rightTorchFlame_Anim_mobile").scale.set(1.2));
    if (isMobile && window.innerHeight > window.innerWidth) {
      reelGrid && reelGrid.scale.set(configGame.REEL_GRID_SCALE_IN_PORTRAIT);
      reelGrid &&
        reelGrid.position.set(
          configGame.REEL_GRID_X_IN_PORTRAIT,
          configGame.REEL_GRID_Y_IN_PORTRAIT
        );
    } else {
      reelGrid && reelGrid.scale.set(configGame.REEL_GRID_SCALE);
      reelGrid &&
        reelGrid.position.set(configGame.REEL_GRID_X, configGame.REEL_GRID_Y);
    }
  }

  //when layout changes, this method will be called
  layoutChange(currentLayout: string) {
    this.displayUI.map((data: any) => {
      if (data.layout === true) {
        this.props.setApplicationLayoutObject(data.name);
      }
    });

  }

  //scaling for portrait mode
  portraitScaling() {
    this.baseGameFrameBorder && this.baseGameFrameBorder.scale.set(this.frameBorderScaling);
    this.baseGameFramesInsidePortionImage && this.baseGameFramesInsidePortionImage.scale.set(1.8);
    this.manywaysTextImage && (this.manywaysTextImage.scale.x = this.manywaysTextPortraitScalingX);
    this.manywaysTextImage && (this.manywaysTextImage.scale.y = this.manywaysTextPortraitScalingY);
    this.leftCaveImage && (this.leftCaveImage.scale.x = this.cavePortraitScalingX);
    this.leftCaveImage && (this.leftCaveImage.scale.y = this.cavePortraitScalingY);
    this.rightCaveImage && (this.rightCaveImage.scale.x = this.cavePortraitScalingX);
    this.rightCaveImage && (this.rightCaveImage.scale.y = this.cavePortraitScalingY);
  }

  //scaling for landscape mode
  landscapeScaling() {
    this.baseGameFrameBorder && this.baseGameFrameBorder.scale.set(this.originalScalingOfObject);
    this.baseGameFramesInsidePortionImage && this.baseGameFramesInsidePortionImage.scale.set(2);
    this.manywaysTextImage && this.manywaysTextImage.scale.set(this.originalScalingOfObject);
    this.leftCaveImage && this.leftCaveImage.scale.set(this.originalScalingOfObject);
    this.rightCaveImage && this.rightCaveImage.scale.set(this.originalScalingOfObject);
  }
  private cleanAllTimer(): void {
    this.AllTimer.forEach((_time: any) => {
      _time && _time.stop();
      _time && _time.reset();
      _time && _time.remove();
    });
    this.AllTimer =[];
  }

  shouldComponentUpdate(
    nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
    if (
      nextProps.allButtonEnable !== this.props.allButtonEnable ||
      nextProps.layoutMode !== this.props.layoutMode ||
      nextProps.allSpinComplete !== this.props.allSpinComplete ||
      nextProps.spinStart != this.props.spinStart ||
      nextProps.winAmount !== this.props.winAmount ||
      nextProps.selectedCoin !== this.props.selectedCoin ||
      nextProps.currentBetIndex !== this.props.currentBetIndex ||
      nextProps.spinStopID != this.props.spinStopID ||
      nextProps.displayReelGridSymbolCount != this.props.displayReelGridSymbolCount ||
      nextProps.winAmountEmpty != this.props.winAmountEmpty ||
      nextProps.basegamestate !== this.props.basegamestate ||
      nextProps.blastStart != this.props.blastStart
    ) {
      if (nextProps.basegamestate) {
        if (this.props.resetManyWaysTextToInitial) {
          UIManager.getRef("BG_manywaysText_desktop") && (UIManager.getRef("BG_manywaysText_desktop").text = this.mwIntialValue);
          UIManager.getRef("BG_manywaysText_mobile") && (UIManager.getRef("BG_manywaysText_mobile").text = this.mwIntialValue);
          this.props.resetManywaysValue(false);
        }
      }
      if (!nextProps.basegamestate && nextProps.basegamestate != this.props.basegamestate) {

        this.props.setApplicationButtonpanelVisibility(false);
      }
      if (nextProps.basegamestate && nextProps.basegamestate != this.props.basegamestate) {

        let balanceValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(nextProps.transitionBalance / this.constantT2, true, true, true, true);
        UIManager.getRef("text_balance_value_" + this.ui_mode) &&
          UIManager.setText("text_balance_value_" + this.ui_mode, this.numberWithCommasAndDeciaml(Math.round((nextProps.transitionBalance / this.constantT2 / this.props.coinList[this.props.selectedCoin]) * this.constantT1)));
          this.mobileTextBalanceValue && UIManager.setText("Mobiletext_balance_value", balanceValueInCurrency);
      }
      if (nextProps.allButtonEnable) {
        let balanceValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(nextProps.transitionBalance / this.constantT2, true, true, true, true);
        UIManager.getRef("text_balance_value_" + this.ui_mode) && UIManager.setText("text_balance_value_" + this.ui_mode, this.numberWithCommasAndDeciaml(Math.round((nextProps.transitionBalance / this.constantT2 / this.props.coinList[this.props.selectedCoin]) * this.constantT1)));
        this.mobileTextBalanceValue && UIManager.setText("Mobiletext_balance_value", balanceValueInCurrency);
        this.props.setPreviousBalance(nextProps.transitionBalance);
      }
      if (nextProps.selectedCoin !== this.props.selectedCoin) {
        UIManager.getRef("text_balance_value_" + this.ui_mode) && UIManager.setText("text_balance_value_" + this.ui_mode, this.numberWithCommasAndDeciaml(Math.round((this.props.transitionBalance / this.constantT2 / nextProps.coinList[nextProps.selectedCoin]) * this.constantT1)));
      }
      if (nextProps.winAmountEmpty) {

        this.text_win_value1 && ( this.text_win_value1.visible = false);
        this.mobileTextWinValue && (this.mobileTextWinValue.visible = false);
      }
      if (nextProps.layoutMode !== this.props.layoutMode) {
        this.layoutChange(nextProps.layoutMode);
        this.onOrientationChange();
        if (isMobile) {
          if (window.innerWidth < window.innerHeight) {
            this.portraitScaling();
          } else {
            this.landscapeScaling();
          }
        }
      }
      if (nextProps.blastStart && nextProps.blastStart != this.props.blastStart) {
        let timer = TIMER.TimerManager.createTimer(this.logoAnimDelay);
        timer.on("end", (e: any) => {
          e.remove();
          if (isMobile) {
            this.logoForMobile && this.logoForMobile.gotoAndPlay(0);
          } else {
            this.logoForDesktop && this.logoForDesktop.gotoAndPlay(0);
          }
        });
        timer.start();
        this.AllTimer.push(timer);
      }
      if (nextProps.allSpinComplete && nextProps.allSpinComplete != this.props.allSpinComplete) {
        // setTimeout(() => {
        //   this.checkAutoplayConditions(nextProps);
        // }, 500);

        let timer = TIMER.TimerManager.createTimer(500);
        timer.on('end', (e: any) => {
          e.remove();
          this.checkAutoplayConditions(nextProps);

        });
        timer.start();
        this.AllTimer.push(timer);

        if (nextProps.winAmount !== 0) {
          let timer = TIMER.TimerManager.createTimer(210);
          timer.on("end", (e: any) => {
            e.remove();
            this.winValueStore = this.winValueStore + this.props.winAmount;
            this.reflectWinAmount(nextProps, nextProps.winAmount);
          });
          timer.start();
          this.AllTimer.push(timer);
        } else {
          this.winValueStore = 0;
        }
      }
      if (nextProps.spinStart) {
        if (nextProps.spinStart && nextProps.spinStart != this.props.spinStart) {
          this.cleanAllTimer();
          if (!nextProps.InTurboMode || !this.props.InTurboMode) {
            let timer = TIMER.TimerManager.createTimer(100);
            timer.on("repeat", () => {
              if (
                UIManager.getRef("BG_manywaysText_" + this.ui_mode).alpha > 0
              ) {
                if (!isMobile) {
                  UIManager.getRef("BG_manywaysText_desktop") && (UIManager.getRef("BG_manywaysText_desktop").alpha -= 0.1);
                  UIManager.getRef("BG_textManyWays_Image_Desktop") && (UIManager.getRef("BG_textManyWays_Image_Desktop").alpha -= 0.1);
                } else {
                  UIManager.getRef("BG_manywaysText_mobile") && (UIManager.getRef("BG_manywaysText_mobile").alpha -= 0.1);
                  UIManager.getRef("BG_textManyWays_Image_mobile") && (UIManager.getRef("BG_textManyWays_Image_mobile").alpha -= 0.1);
                }
              }
              if (UIManager.getRef("BG_manywaysText_" + this.ui_mode).alpha <= 0) {
                timer.stop();
                TIMER.TimerManager.removeTimer(timer);
              }
            });
            timer.start(true, 0);
          } else {
            UIManager.getRef("BG_manywaysText_desktop") && (UIManager.getRef("BG_manywaysText_desktop").alpha = 0);
            UIManager.getRef("BG_textManyWays_Image_Desktop") && (UIManager.getRef("BG_textManyWays_Image_Desktop").alpha = 0);
            UIManager.getRef("BG_manywaysText_mobile") && (UIManager.getRef("BG_manywaysText_mobile").alpha = 0);
            UIManager.getRef("BG_textManyWays_Image_mobile") && (UIManager.getRef("BG_textManyWays_Image_mobile").alpha = 0);
          }
        }
        this.winValueStore = 0;
        this.text_win_value1 && ( this.text_win_value1.visible = false);
        this.mobileTextWinValue && (this.mobileTextWinValue.visible = false);
        this.updateValues(nextProps);
      }
      if (nextProps.winAmount !== this.props.winAmount) {
        if (nextProps.winAmount == 0) {
          this.text_win_value1 && ( this.text_win_value1.visible = false);
          this.mobileTextWinValue && (this.mobileTextWinValue.visible = false);
        }
        this.winValueStore = nextProps.winAmount + this.winValueStore;
        this.reflectWinAmount(nextProps, this.winValueStore);
      }
      if (nextProps.currentBetIndex !== this.props.currentBetIndex) {
        let betval = CURRENCY.CurrencyManager.formatCurrencyString(this.props.betList[nextProps.currentBetIndex] / this.constantT2, true, true, true, true);
        UIManager.getRef("Mobiletext_bet_value") && (UIManager.setText("Mobiletext_bet_value", betval));
      }
      if (nextProps.displayReelGridSymbolCount !== this.props.displayReelGridSymbolCount) {
        this.mwTextValue = 1;
        this.reelGridSymbolsArray = [];
        this.symbolsCountRearrangeCount(nextProps);
        if (nextProps.basegamestate && nextProps.basegamestate != this.props.basegamestate) {
          this.setManywaysInitially();
        }
      }
      if (nextProps.spinStopID > -1 && nextProps.spinStopID != this.props.spinStopID) {
        if (!isMobile) {
          UIManager.getRef("BG_manywaysText_desktop") && (UIManager.getRef("BG_manywaysText_desktop").alpha = 1);
          UIManager.getRef("BG_textManyWays_Image_Desktop") && (UIManager.getRef("BG_textManyWays_Image_Desktop").alpha = 1);
        } else {
          UIManager.getRef("BG_manywaysText_mobile") && (UIManager.getRef("BG_manywaysText_mobile").alpha = 1);
          UIManager.getRef("BG_textManyWays_Image_mobile") && (UIManager.getRef("BG_textManyWays_Image_mobile").alpha = 1);
        }
        this.mwTextValue = this.mwTextValue * this.reelGridSymbolsArray[nextProps.spinStopID];
        UIManager.getRef("BG_manywaysText_desktop") && (UIManager.getRef("BG_manywaysText_desktop").text = this.mwTextValue);
        UIManager.getRef("BG_manywaysText_mobile") && (UIManager.getRef("BG_manywaysText_mobile").text = this.mwTextValue);
      }
      return false;
    }
    return false;
  }

  updateValues(nextProps: any) {
    let balanceValueInCurrency = CURRENCY.CurrencyManager.formatCurrencyString((this.props.previousBalance - this.props.betList[this.props.currentBetIndex]) / this.constantT2, true, true, true, true);
    this.mobileTextBalanceValue && UIManager.setText("Mobiletext_balance_value", balanceValueInCurrency);
    UIManager.getRef("text_balance_value_" + this.ui_mode) && UIManager.setText("text_balance_value_" + this.ui_mode, this.numberWithCommasAndDeciaml(Math.round(((this.props.previousBalance - this.props.betList[this.props.currentBetIndex]) / this.constantT2 / this.props.coinList[this.props.selectedCoin]) * this.constantT1)));
  }

  reflectWinAmount(nextProps: any, lastWinStore: any) {
    if (!isMobile) {
      let winText = this.text_win_value1;
      if (nextProps.winAmount !== 0) {
        winText && (winText.visible = true);
        if (lastWinStore == 0) {
          winText && UIManager.setText("text_win_value1", this.numberWithCommasAndDeciaml(Math.round((this.winValueStore / this.constantT2 / this.props.coinList[this.props.selectedCoin]) * this.constantT1)));
        } else {
          winText && UIManager.setText("text_win_value1", this.numberWithCommasAndDeciaml(Math.round((lastWinStore / this.constantT2 / this.props.coinList[this.props.selectedCoin]) * this.constantT1)));
        }
      } else {
        this.winValueStore = 0;
        this.text_win_value1 && ( this.text_win_value1.visible = false);
      }
    } else {
      if (this.props.jurisdictionKey !== "social") {
        let winText = this.mobileTextWinValue;
        if (this.props.winAmount !== 0) {
          winText && (winText.visible = true);
          let winValueInCurrency;
          if (lastWinStore == 0) {
            winValueInCurrency = this.numberWithCommasAndDeciaml(Math.round((this.winValueStore / this.constantT2 / this.props.coinList[this.props.selectedCoin]) * this.constantT1));
          } else {
            winValueInCurrency = this.numberWithCommasAndDeciaml(Math.round((lastWinStore / this.constantT2 / this.props.coinList[this.props.selectedCoin]) * this.constantT1));
          }
          winText && UIManager.setText("Mobiletext_win_value", winValueInCurrency);
        } else {
          this.winValueStore = 0;
          winText && (winText.visible = false);
        }
      }
    }
  }

  //this method is to check the autoplay condition and to stop it when its required
  checkAutoplayConditions(nextProps: any) {
    let previousAmount =
      nextProps.transitionBalance / 100 - nextProps.totalCreditWinAmount / 100;
    if (
      (nextProps.transitionBalance / 100 - nextProps.storeAmountForAutoplay >= this.props.stopIfBalanceIncreasedBy &&
        this.props.stopIfBalanceIncreasedBy !== -1) ||
      (nextProps.storeAmountForAutoplay - nextProps.transitionBalance / 100 >= this.props.stopIfBalanceDecreasedBy &&
        this.props.stopIfBalanceDecreasedBy !== -1) ||
      (this.props.totalCreditWinAmount / 100 > this.props.stopIfSingleWinExceed &&
        this.props.stopIfSingleWinExceed !== -1) ||
      (nextProps.totalCreditWinAmount / 100 > 0 && nextProps.stopAutoplayOnAnyWin) ||
      (nextProps.featureJustReTriggered && nextProps.stopAutoplayOnAnyWin)
    ) {
      this.props.stopAutoplay();
    }
  }

  render() {
    return (
      <UIManager
        id={"gofBaseGameContainer"}
        type={"Container"}
        ref={(i) => (this.gofBaseGameContainer = i)}
        name={"gofBaseGameContainer"}
        app={this.app}
      >
        {this.displayUI &&
          this.displayUI.map((i: any) => (
            <UIManager
              key={`UIManager-${Math.random()}`}
              langObj={this.props.langObj}
              type={i.type}
              id={i.id}
              {...i}
              app={this.app}
              configGame={configGame}
              ClickHandler={this.handleEvent.bind(this)}
            />
          ))}
      </UIManager>
    );
  }
}

export default withPixiApp(
  connect(
    (
      state: Pick<IStore, | "freegameState" | "basegameState" | "applicationState" | "reelgridState" | "autoplayState" | "buttonPanelState" | "behaviourState" | "betPanelState" | "winCelebrationState">
    ): IStateToProps => ({
      balance: state.basegameState.balance,
      layoutMode: state.applicationState.layoutMode,
      winAmount: state.basegameState.winAmount,
      basegamestate: state.basegameState.basegamestate,
      allSpinComplete: state.reelgridState.allSpinComplete,
      spinStart: state.reelgridState.spinStart,
      stopIfSingleWinExceed: state.autoplayState.stopIfSingleWinExceed,
      stopIfBalanceIncreasedBy: state.autoplayState.stopIfBalanceIncreasedBy,
      stopIfBalanceDecreasedBy: state.autoplayState.stopIfBalanceDecreasedBy,
      stopAutoplayOnAnyWin: state.autoplayState.stopAutoplayOnAnyWin,
      currentBetIndex: state.basegameState.currentBetIndex,
      betList: state.basegameState.betList,
      allButtonEnable: state.buttonPanelState.allButtonEnable,
      transitionBalance: state.behaviourState.transitionBalance,
      totalCreditWinAmount: state.behaviourState.totalCreditWinAmount,
      previousBalance: state.behaviourState.previousBalance,
      selectedCoin: state.betPanelState.selectedCoin,
      coinList: state.betPanelState.coinList,
      spinStopID: state.reelgridState.spinStopID,
      displayReelGridSymbolCount: state.reelgridState.displayReelGridSymbolCount,
      winAmountEmpty: state.behaviourState.winAmountEmpty,
      InTurboMode: state.reelgridState.InTurboMode,
      resetManyWaysTextToInitial: state.behaviourState.resetManyWaysTextToInitial,
      featureJustReTriggered: state.freegameState.featureJustReTriggered,
      storeAmountForAutoplay: state.behaviourState.storeAmountForAutoplay,
      blastStart: state.reelgridState.blastStart,
      freegameSpinCountRemaining: state.freegameState.freegameSpinCountRemaining,
      languageCode: state.applicationState.languageCode,
      soundOnOff: state.applicationState.soundOnOff,
      jurisdictionKey: state.applicationState.jurisdictionKey,
      currencyDecimalSeparator: state.applicationState.currencyDecimalSeparator,
      currencyGroupingSeparator: state.applicationState.currencyGroupingSeparator,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
      setApplicationButtonpanelVisibility: (visible: boolean): any => dispatch(aplicationActions.setApplicationButtonpanelVisibility(visible)),
      setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutsActions.setApplicationLayoutObject(layoutobjectlist)),
      stopAutoplay: (): any => dispatch(baseGameAction.stopAutoplay()),
      winCelebrationStart: (startWinCelebration: boolean, showAmount: string): any => dispatch(winCelebrationActions.winCelebrationStart(startWinCelebration, showAmount)),
      winCelebrationShow: (showWinCelebration: boolean): any => dispatch(winCelebrationActions.winCelebrationShow(showWinCelebration)),
      setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
      setFeatureJustFinished: (): any => dispatch(freeGameAction.setFeatureJustFinished()),
      playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
      setPreviousBalance: (previousBalance: any): any => dispatch(behaviourAction.setPreviousBalance(previousBalance)),
      setWinAmount: (winAmountEmpty: any): any => dispatch(behaviourAction.setWinAmount(winAmountEmpty)),
      resetManywaysValue: (resetManyWaysTextToInitial: any): any => dispatch(behaviourAction.resetManywaysValue(resetManyWaysTextToInitial)),
    })
  )(withBaseGameConfiguration(GofBaseGame))
);
