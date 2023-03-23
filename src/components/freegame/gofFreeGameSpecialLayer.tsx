import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withFreeGameConfiguration from "../../core/components/freegame/configuration/withFreeGameConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import { actions as layoutsActions } from "../../core/reducers/layoutsStateReducer";
import PIXI from "pixi.js";
import { isMobile, isTablet } from "react-device-detect";
import { CURRENCY, TIMER } from "../../core/utills";
import { configGame } from "../../data/config";
import { actions as soundActions } from "../../core/reducers/soundReducer";
import { actions as reelgridAction } from "../../core/reducers/reelgridStateReducer";
import { actions as basegameActions, actions as basegameAction } from "../../core/reducers/baseGameReducer";
import { actions as freegameActions, actions as freegameAction } from "../../core/reducers/freeGameReducer";
import { actions as multiplierActions } from "../../gamereducer/multiplierReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as horizontalSymbolActions } from "../../gamereducer/horizontalSymbolReducer";
import { actions as soundGameLevelAction } from "../../gamereducer/soundGameLevelReducer";
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
    languageCode: string;
    soundOnOff: string;
    layoutMode: string,
    jurisdictionKey: string,
    inFreeGame: any,
    soundIsPlaying: any,
    freegameSpinCountRemaining: any,
    freegameSpinCountWin: any,
    freegameSpinCount: any,
    displayReelGridSymbolCount: any,
    spinStopID: any,
    allSpinComplete: any,
    featureJustReTriggered: any,
    callFlowManager: any,
    featureJustFinished: any,
    totalWinAmount: any,
    totalCreditWinAmount: any,
    transitionBalance: any,
    balance: any,
    betList: any;
    currentBetIndex: any;
    multiplierActive: any;
    storeMultiplierCurrentValue: any;
    selectedCoin: any;
    coinList: any;
    spinStart: any;
    blastStart: any;
    currentCascadeCount: any;
    winAmount: any;
    InTurboMode: any;
    showWinShower: any;
    counterStartIncreasing: any;
    reConstruction: boolean;
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class GofFreeGameSpecialLayer extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected gofFreeGameSpecialLayerContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;
    protected logoAnimIntervalTime: number;
    protected freeGameFrameBorder: any;
    protected freeGameFramesInsidePortionImage: any;
    protected manywaysTextImage: any;
    protected logoForMobile: any;
    protected logoForDesktop: any;
    protected originalScalingOfObject: number = 1;
    protected frameBorderScalingX: number = 0.88;
    protected frameBorderScalingY: number = 0.869;
    protected frameInsideScalingX: number = 0.85;
    protected frameInsideScalingY: number = 0.88;
    private tweenTimer: number = 0.001;
    protected manywaysTextPortraitScalingX: number = 0.7;
    protected manywaysTextPortraitScalingY: number = 0.8;
    private minFullHDWidth: number = 1024;
    private HDReadyWidth: number = 1280;
    private minFullHDPxRatio: number = 2;
    private canvasBgImagePage: string = "";
    protected mwTextValue: number = 1;
    protected storeWinAmount: number = 0;
    protected delayTimerOfMultiplierWithAnticipation: number = 7500;
    protected delayTimerOfMultiplierWithOutAnticipation: number = 2200;
    protected alphaOfManyways: number = 0.1;
    protected reelGridSymbolsArray: any = [];
    protected logoAnimDelay: number = 1000;
    protected remainingFreeGameCount: number = 0;
    protected winCelebrationMinimumValue: number = 25;

    protected constantT11: number = 100;
    private FG_Left_DrippingLava1_Anim_desktop: any;
    private FG_Right_DrippingLava1_Anim_desktop: any;
    private FG_Left_DrippingLava1_Anim_mobile: any;
    private FG_Right_DrippingLava1_Anim_mobile: any;
    protected MobileBalance_labelFG: any;
    protected MobileBalance_ColonFG: any;
    protected MobileBalance_valueFG: any;
    private AllTimer: any[] = [];
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.AllTimer = [];
        this.state = {
            uiElements: [],
            lang: "en",
            isSpinning: false,
        }
        // this.gofFreeGameSpecialLayerContainer = React.createRef();
        this.gofFreeGameSpecialLayerContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.logoAnimIntervalTime = 11050;

        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
        this.chooseAssets();
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

    //when layout changes, this method will be called
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
    }

    flipAnimations() {
        if (isMobile) {
            this.FG_Left_DrippingLava1_Anim_mobile.scale.set(-1, 1)
            this.FG_Right_DrippingLava1_Anim_mobile.scale.set(1, 1)
        } else {
            this.FG_Left_DrippingLava1_Anim_desktop.scale.set(-1, 1)
            this.FG_Right_DrippingLava1_Anim_desktop.scale.set(1, 1)
        }

    }
    portraitTextAlignmentFG() {
        if (this.props.jurisdictionKey == "social") {
            if (isMobile && window.innerHeight > window.innerWidth) {
                this.MobileBalance_labelFG && (this.MobileBalance_labelFG.x = 770) && (this.MobileBalance_labelFG.y = 1900);
                this.MobileBalance_ColonFG && (this.MobileBalance_ColonFG.x = 775) && (this.MobileBalance_ColonFG.y = 1898);
                this.MobileBalance_valueFG && (this.MobileBalance_valueFG.x = 780) && (this.MobileBalance_valueFG.y = 1900);

                if (this.props.languageCode === 'pl'
                    || this.props.languageCode === 'da'
                    || this.props.languageCode === 'hr'
                    || this.props.languageCode === 'sv'
                    || this.props.languageCode === 'nb') {
                    this.MobileBalance_labelFG && (this.MobileBalance_labelFG.x = 390) && (this.MobileBalance_labelFG.y = 1900);
                    this.MobileBalance_ColonFG && (this.MobileBalance_ColonFG.x = 394) && (this.MobileBalance_ColonFG.y = 1900);
                    this.MobileBalance_valueFG && (this.MobileBalance_valueFG.x = 409) && (this.MobileBalance_valueFG.y = 1900);
                }
            } else {
                this.MobileBalance_labelFG && (this.MobileBalance_labelFG.x = 1550) && (this.MobileBalance_labelFG.y = 1050);
                this.MobileBalance_ColonFG && (this.MobileBalance_ColonFG.x = 1555) && (this.MobileBalance_ColonFG.y = 1048);
                this.MobileBalance_valueFG && (this.MobileBalance_valueFG.x = 1560) && (this.MobileBalance_valueFG.y = 1050);

                if (this.props.languageCode === 'pl'
                    || this.props.languageCode === 'da'
                    || this.props.languageCode === 'hr'
                    || this.props.languageCode === 'sv'
                    || this.props.languageCode === 'nb') {
                    this.MobileBalance_labelFG && (this.MobileBalance_labelFG.x = 570) && (this.MobileBalance_labelFG.y = 1050);
                    this.MobileBalance_ColonFG && (this.MobileBalance_ColonFG.x = 592) && (this.MobileBalance_ColonFG.y = 1048);
                    this.MobileBalance_valueFG && (this.MobileBalance_valueFG.x = 609) && (this.MobileBalance_valueFG.y = 1050);
                }
            }
        }
        else {

            if (isMobile && window.innerHeight > window.innerWidth) {
                this.MobileBalance_labelFG && (this.MobileBalance_labelFG.x = 200) && (this.MobileBalance_labelFG.y = 1900);
                this.MobileBalance_ColonFG && (this.MobileBalance_ColonFG.x = 209) && (this.MobileBalance_ColonFG.y = 1898);
                this.MobileBalance_valueFG && (this.MobileBalance_valueFG.x = 218) && (this.MobileBalance_valueFG.y = 1900);

                if (this.props.languageCode === 'pl'
                    || this.props.languageCode === 'da'
                    || this.props.languageCode === 'hr'
                    || this.props.languageCode === 'sv'
                    || this.props.languageCode === 'nb') {
                    this.MobileBalance_labelFG && (this.MobileBalance_labelFG.x = 390) && (this.MobileBalance_labelFG.y = 1900);
                    this.MobileBalance_ColonFG && (this.MobileBalance_ColonFG.x = 394) && (this.MobileBalance_ColonFG.y = 1900);
                    this.MobileBalance_valueFG && (this.MobileBalance_valueFG.x = 409) && (this.MobileBalance_valueFG.y = 1900);
                }
            } else {
                this.MobileBalance_labelFG && (this.MobileBalance_labelFG.x = 464) && (this.MobileBalance_labelFG.y = 1050);
                this.MobileBalance_ColonFG && (this.MobileBalance_ColonFG.x = 470) && (this.MobileBalance_ColonFG.y = 1048);
                this.MobileBalance_valueFG && (this.MobileBalance_valueFG.x = 475) && (this.MobileBalance_valueFG.y = 1050);

                if (this.props.languageCode === 'pl'
                    || this.props.languageCode === 'da'
                    || this.props.languageCode === 'hr'
                    || this.props.languageCode === 'sv'
                    || this.props.languageCode === 'nb') {
                    this.MobileBalance_labelFG && (this.MobileBalance_labelFG.x = 570) && (this.MobileBalance_labelFG.y = 1050);
                    this.MobileBalance_ColonFG && (this.MobileBalance_ColonFG.x = 592) && (this.MobileBalance_ColonFG.y = 1048);
                    this.MobileBalance_valueFG && (this.MobileBalance_valueFG.x = 609) && (this.MobileBalance_valueFG.y = 1050);
                }
            }
        }
    }

    socialPosition() {
        if (this.props.jurisdictionKey === "social") {
            if (window.innerHeight > window.innerWidth) {
                UIManager.getRef("text_TotalWin_label_mobileFG") && (UIManager.getRef("text_TotalWin_label_mobileFG").x = 1400) && (UIManager.getRef("text_TotalWin_label_mobileFG").y = 940);
                UIManager.getRef("text_TotalWin_value_mobileFG") && (UIManager.getRef("text_TotalWin_value_mobileFG").x = 539) && (UIManager.getRef("text_TotalWin_value_mobileFG").y = 1642);

                UIManager.getRef("Mobiletext_bet_labelFG") && (UIManager.getRef("Mobiletext_bet_labelFG").x = 200) && (UIManager.getRef("Mobiletext_bet_labelFG").y = 1900);
                UIManager.getRef("Mobiletext_mobColonSymbol3FG") && (UIManager.getRef("Mobiletext_mobColonSymbol3FG").x = 205) && (UIManager.getRef("Mobiletext_mobColonSymbol3FG").y = 1898);
                UIManager.getRef("Mobiletext_bet_valueFG") && (UIManager.getRef("Mobiletext_bet_valueFG").x = 210) && (UIManager.getRef("Mobiletext_bet_valueFG").y = 1900);

                UIManager.getRef("text_FreeGame_value1_mobileFG") && (UIManager.getRef("text_FreeGame_value1_mobileFG").x = 690) && (UIManager.getRef("text_FreeGame_value1_mobileFG").y = 1550);
                UIManager.getRef("text_FreeGame_label_mobileFG") && (UIManager.getRef("text_FreeGame_label_mobileFG").x = 420) && (UIManager.getRef("text_FreeGame_label_mobileFG").y = 1550);
                UIManager.getRef("text_FreeGame_label_mobileFG") && (UIManager.getRef("text_FreeGame_label_mobileFG").visible = true);

                UIManager.getRef("text_Win_label_mobile") && (UIManager.getRef("text_Win_label_mobile").x = 800) && (UIManager.getRef("text_Win_label_mobile").y = 750);
                UIManager.getRef("text_colonSymbol3_mobile") && (UIManager.getRef("text_colonSymbol3_mobile").x = 805) && (UIManager.getRef("text_colonSymbol3_mobile").y = 748);
                UIManager.getRef("text_Win_value_mobile") && (UIManager.getRef("text_Win_value_mobile").x = 810) && (UIManager.getRef("text_Win_value_mobile").y = 750);

                // freegame multiplier
                UIManager.getRef("FG_reTrigger_blast_Anim_mobile") && (UIManager.getRef("FG_reTrigger_blast_Anim_mobile").x = 720) && (UIManager.getRef("FG_reTrigger_blast_Anim_mobile").y = 1500);

                UIManager.getRef("multiplierFrame_FG_Image_mob") && (UIManager.getRef("multiplierFrame_FG_Image_mob").x = 430) && (UIManager.getRef("multiplierFrame_FG_Image_mob").y = 1159);
                UIManager.getRef("multiplier_text_mobile") && (UIManager.getRef("multiplier_text_mobile").x = 435) && (UIManager.getRef("multiplier_text_mobile").y = 1335);
                UIManager.getRef("FG_coalLoop_Anim_mobile") && (UIManager.getRef("FG_coalLoop_Anim_mobile").x = 526) && (UIManager.getRef("FG_coalLoop_Anim_mobile").y = 1125);
                UIManager.getRef("mobileMainContainer") && (UIManager.getRef("mobileMainContainer").x = -1280) && (UIManager.getRef("mobileMainContainer").y = 766);

            }
            else {
                UIManager.getRef("text_TotalWin_label_mobileFG") && (UIManager.getRef("text_TotalWin_label_mobileFG").x = 1400) && (UIManager.getRef("text_TotalWin_label_mobileFG").y = 940);
                UIManager.getRef("text_TotalWin_value_mobileFG") && (UIManager.getRef("text_TotalWin_value_mobileFG").x = 1258) && (UIManager.getRef("text_TotalWin_value_mobileFG").y = 940);

                UIManager.getRef("Mobiletext_bet_labelFG") && (UIManager.getRef("Mobiletext_bet_labelFG").x = 400) && (UIManager.getRef("Mobiletext_bet_labelFG").y = 1050);
                UIManager.getRef("Mobiletext_mobColonSymbol3FG") && (UIManager.getRef("Mobiletext_mobColonSymbol3FG").x = 405) && (UIManager.getRef("Mobiletext_mobColonSymbol3FG").y = 1048);
                UIManager.getRef("Mobiletext_bet_valueFG") && (UIManager.getRef("Mobiletext_bet_valueFG").x = 410) && (UIManager.getRef("Mobiletext_bet_valueFG").y = 1050);
                UIManager.getRef("textFreeGamelabelmobileFG") && (UIManager.getRef("textFreeGamelabelmobileFG").x = 190) && (UIManager.getRef("textFreeGamelabelmobileFG").y = 1050);
                UIManager.getRef("text_FreeGame_value1_mobileFG") && (UIManager.getRef("text_FreeGame_value1_mobileFG").x = 650) && (UIManager.getRef("text_FreeGame_value1_mobileFG").y = 940);
                UIManager.getRef("text_FreeGame_label_mobileFG") && (UIManager.getRef("text_FreeGame_label_mobileFG").visible = false);

                UIManager.getRef("text_Win_label_mobile") && (UIManager.getRef("text_Win_label_mobile").x = 950) && (UIManager.getRef("text_Win_label_mobile").y = 29);
                UIManager.getRef("text_colonSymbol3_mobile") && (UIManager.getRef("text_colonSymbol3_mobile").x = 955) && (UIManager.getRef("text_colonSymbol3_mobile").y = 27);
                UIManager.getRef("text_Win_value_mobile") && (UIManager.getRef("text_Win_value_mobile").x = 965) && (UIManager.getRef("text_Win_value_mobile").y = 29);

                // freegame multiplier
                UIManager.getRef("FG_reTrigger_blast_Anim_mobile") && (UIManager.getRef("FG_reTrigger_blast_Anim_mobile").x = 830) && (UIManager.getRef("FG_reTrigger_blast_Anim_mobile").y = 893);

                UIManager.getRef("multiplierFrame_FG_Image_mob") && (UIManager.getRef("multiplierFrame_FG_Image_mob").x = 40) && (UIManager.getRef("multiplierFrame_FG_Image_mob").y = 391);
                UIManager.getRef("multiplier_text_mobile") && (UIManager.getRef("multiplier_text_mobile").x = 44) && (UIManager.getRef("multiplier_text_mobile").y = 566);
                UIManager.getRef("FG_coalLoop_Anim_mobile") && (UIManager.getRef("FG_coalLoop_Anim_mobile").x = 136) && (UIManager.getRef("FG_coalLoop_Anim_mobile").y = 353);
                UIManager.getRef("mobileMainContainer") && (UIManager.getRef("mobileMainContainer").x = -1673) && (UIManager.getRef("mobileMainContainer").y = 0);
            }
        }
        else {
            if (window.innerHeight > window.innerWidth) {
                UIManager.getRef("text_TotalWin_label_mobileFG") && (UIManager.getRef("text_TotalWin_label_mobileFG").x = 586) && (UIManager.getRef("text_TotalWin_label_mobileFG").y = 1644);
                UIManager.getRef("text_TotalWin_value_mobileFG") && (UIManager.getRef("text_TotalWin_value_mobileFG").x = 539) && (UIManager.getRef("text_TotalWin_value_mobileFG").y = 1642);

                UIManager.getRef("Mobiletext_bet_labelFG") && (UIManager.getRef("Mobiletext_bet_labelFG").x = 970) && (UIManager.getRef("Mobiletext_bet_labelFG").y = 1900);
                UIManager.getRef("Mobiletext_mobColonSymbol3FG") && (UIManager.getRef("Mobiletext_mobColonSymbol3FG").x = 975) && (UIManager.getRef("Mobiletext_mobColonSymbol3FG").y = 1898);
                UIManager.getRef("Mobiletext_bet_valueFG") && (UIManager.getRef("Mobiletext_bet_valueFG").x = 980) && (UIManager.getRef("Mobiletext_bet_valueFG").y = 1900);

                UIManager.getRef("text_FreeGame_label_mobileFG") && (UIManager.getRef("text_FreeGame_label_mobileFG").visible = true);

                UIManager.getRef("text_FreeGame_value1_mobileFG") && (UIManager.getRef("text_FreeGame_value1_mobileFG").x = 535) && (UIManager.getRef("text_FreeGame_value1_mobileFG").y = 1806);
                UIManager.getRef("text_FreeGame_label_mobileFG") && (UIManager.getRef("text_FreeGame_label_mobileFG").x = 538) && (UIManager.getRef("text_FreeGame_label_mobileFG").y = 1757);

                UIManager.getRef("text_Win_label_mobile") && (UIManager.getRef("text_Win_label_mobile").x = 818) && (UIManager.getRef("text_Win_label_mobile").y = 850);
                UIManager.getRef("text_colonSymbol3_mobile") && (UIManager.getRef("text_colonSymbol3_mobile").x = 823) && (UIManager.getRef("text_colonSymbol3_mobile").y = 848);
                UIManager.getRef("text_Win_value_mobile") && (UIManager.getRef("text_Win_value_mobile").x = 833) && (UIManager.getRef("text_Win_value_mobile").y = 850);

                // freegame multiplier
                UIManager.getRef("FG_reTrigger_blast_Anim_mobile") && (UIManager.getRef("FG_reTrigger_blast_Anim_mobile").x = 563) && (UIManager.getRef("FG_reTrigger_blast_Anim_mobile").y = 1757);

                UIManager.getRef("multiplierFrame_FG_Image_mob") && (UIManager.getRef("multiplierFrame_FG_Image_mob").x = 60) && (UIManager.getRef("multiplierFrame_FG_Image_mob").y = 1159);
                UIManager.getRef("multiplier_text_mobile") && (UIManager.getRef("multiplier_text_mobile").x = 72) && (UIManager.getRef("multiplier_text_mobile").y = 1335);
                UIManager.getRef("FG_coalLoop_Anim_mobile") && (UIManager.getRef("FG_coalLoop_Anim_mobile").x = 155) && (UIManager.getRef("FG_coalLoop_Anim_mobile").y = 1125);
                UIManager.getRef("mobileMainContainer") && (UIManager.getRef("mobileMainContainer").x = -1656) && (UIManager.getRef("mobileMainContainer").y = 766);

            }
            else {
                UIManager.getRef("text_TotalWin_label_mobileFG") && (UIManager.getRef("text_TotalWin_label_mobileFG").x = 1470) && (UIManager.getRef("text_TotalWin_label_mobileFG").y = 940);
                UIManager.getRef("text_TotalWin_value_mobileFG") && (UIManager.getRef("text_TotalWin_value_mobileFG").x = 1378) && (UIManager.getRef("text_TotalWin_value_mobileFG").y = 940);

                UIManager.getRef("Mobiletext_bet_labelFG") && (UIManager.getRef("Mobiletext_bet_labelFG").x = 1450) && (UIManager.getRef("Mobiletext_bet_labelFG").y = 1050);
                UIManager.getRef("Mobiletext_mobColonSymbol3FG") && (UIManager.getRef("Mobiletext_mobColonSymbol3FG").x = 1455) && (UIManager.getRef("Mobiletext_mobColonSymbol3FG").y = 1048);
                UIManager.getRef("Mobiletext_bet_valueFG") && (UIManager.getRef("Mobiletext_bet_valueFG").x = 1460) && (UIManager.getRef("Mobiletext_bet_valueFG").y = 1050);

                UIManager.getRef("text_FreeGame_label_mobileFG") && (UIManager.getRef("text_FreeGame_label_mobileFG").visible = false);
                UIManager.getRef("text_FreeGame_value1_mobileFG") && (UIManager.getRef("text_FreeGame_value1_mobileFG").x = 620) && (UIManager.getRef("text_FreeGame_value1_mobileFG").y = 940);

                UIManager.getRef("text_Win_label_mobile") && (UIManager.getRef("text_Win_label_mobile").x = 950) && (UIManager.getRef("text_Win_label_mobile").y = 29);
                UIManager.getRef("text_colonSymbol3_mobile") && (UIManager.getRef("text_colonSymbol3_mobile").x = 955) && (UIManager.getRef("text_colonSymbol3_mobile").y = 27);
                UIManager.getRef("text_Win_value_mobile") && (UIManager.getRef("text_Win_value_mobile").x = 965) && (UIManager.getRef("text_Win_value_mobile").y = 29);

                // freegame multiplier
                UIManager.getRef("FG_reTrigger_blast_Anim_mobile") && (UIManager.getRef("FG_reTrigger_blast_Anim_mobile").x = 808) && (UIManager.getRef("FG_reTrigger_blast_Anim_mobile").y = 893);

                UIManager.getRef("multiplierFrame_FG_Image_mob") && (UIManager.getRef("multiplierFrame_FG_Image_mob").x = 40) && (UIManager.getRef("multiplierFrame_FG_Image_mob").y = 391);
                UIManager.getRef("multiplier_text_mobile") && (UIManager.getRef("multiplier_text_mobile").x = 44) && (UIManager.getRef("multiplier_text_mobile").y = 566);
                UIManager.getRef("FG_coalLoop_Anim_mobile") && (UIManager.getRef("FG_coalLoop_Anim_mobile").x = 136) && (UIManager.getRef("FG_coalLoop_Anim_mobile").y = 353);
                UIManager.getRef("mobileMainContainer") && (UIManager.getRef("mobileMainContainer").x = -1673) && (UIManager.getRef("mobileMainContainer").y = 0);
            }
        }
    }

    onOrientationChange() {
        this.socialPosition();
        this.portraitTextAlignmentFG();
        let reelGrid = UIManager.getRef("reelgridLayer");
        !isTablet && UIManager.getRef("FG_gameLogo_Anim_mobile") && (UIManager.getRef("FG_gameLogo_Anim_mobile").scale.set(2));
        UIManager.getRef("FG_smoke_Anim_desktop") && (UIManager.getRef("FG_smoke_Anim_desktop").scale.set(2));
        UIManager.getRef("FG_rightTorchFlame_Anim_desktop") && (UIManager.getRef("FG_rightTorchFlame_Anim_desktop").scale.set(2));
        UIManager.getRef("FG_leftTorchFlame_Anim_desktop") && (UIManager.getRef("FG_leftTorchFlame_Anim_desktop").scale.set(2));
        UIManager.getRef("FG_thunder_Anim_desktop") && (UIManager.getRef("FG_thunder_Anim_desktop").scale.set(4));

        if (isMobile && window.innerHeight > window.innerWidth) {
            reelGrid && reelGrid.scale.set(configGame.REEL_GRID_SCALE_IN_PORTRAIT);
            reelGrid && reelGrid.position.set(configGame.REEL_GRID_X_IN_PORTRAIT, configGame.REEL_GRID_Y_IN_PORTRAIT);
            UIManager.getRef("FG_smoke_Anim_mobile") && (UIManager.getRef("FG_smoke_Anim_mobile").scale.set(2));


        } else {
            UIManager.getRef("FG_thunder_Anim_mobile") && (UIManager.getRef("FG_thunder_Anim_mobile").scale.set(4));
            UIManager.getRef("FG_rightTorchFlame_Anim_mobile") && (UIManager.getRef("FG_rightTorchFlame_Anim_mobile").scale.set(2));
            UIManager.getRef("FG_leftTorchFlame_Anim_mobile") && (UIManager.getRef("FG_leftTorchFlame_Anim_mobile").scale.set(2));
            UIManager.getRef("FG_smoke_Anim_mobile") && (UIManager.getRef("FG_smoke_Anim_mobile").scale.set(2));

            reelGrid && reelGrid.scale.set(configGame.REEL_GRID_SCALE);
            reelGrid && reelGrid.position.set(configGame.REEL_GRID_X, configGame.REEL_GRID_Y);
        }
    }

    //scaling for landscape mode
    landscapeScaling() {
        this.freeGameFrameBorder && (this.freeGameFrameBorder.scale.set(this.originalScalingOfObject));
        this.freeGameFramesInsidePortionImage && (this.freeGameFramesInsidePortionImage.scale.set(2));
        this.manywaysTextImage && (this.manywaysTextImage.scale.set(this.originalScalingOfObject));
    }

    //scaling for portrait mode
    portraitScaling() {
        this.freeGameFrameBorder && (this.freeGameFrameBorder.scale.x = this.frameBorderScalingX);
        this.freeGameFrameBorder && (this.freeGameFrameBorder.scale.y = this.frameBorderScalingY);
        this.freeGameFramesInsidePortionImage && (this.freeGameFramesInsidePortionImage.scale.x = 2);
        this.freeGameFramesInsidePortionImage && (this.freeGameFramesInsidePortionImage.scale.y = 1.8);
        this.manywaysTextImage && (this.manywaysTextImage.scale.x = this.manywaysTextPortraitScalingX);
        this.manywaysTextImage && (this.manywaysTextImage.scale.y = this.manywaysTextPortraitScalingY);
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

    updateTotalWin() {
        let winAmount = ((this.storeWinAmount) / 100).toFixed(2);
        let win = CURRENCY.CurrencyManager.formatCurrencyString(winAmount, true, true, true, true);
        if (!isMobile) {
            UIManager.getRef("text_TotalWin_value").visible = true;

            UIManager.getRef("text_TotalWin_value") && (UIManager.setText("text_TotalWin_value", win));
        } else {
            let val = UIManager.getRef("text_TotalWin_label_mobileFG").text;
            UIManager.getRef("text_TotalWin_value_mobileFG").visible = true;
            UIManager.getRef("text_TotalWin_value_mobileFG") && (UIManager.setText("text_TotalWin_value_mobileFG", val + " " + win));
        }
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
        new Tween(
            [object],
            {
                [property]: { start: object[property], end: target },
            },
            time || this.tweenTimer,
            easing,
            false,
            null,
            null,
            null,
            null,
            false,
            onchange,
            oncomplete
        );
    }
    funCounterText(freegameSpinCounttProps: any) {

        let textFreeGamevalue2mobileFG = (Number(UIManager.getRef("text_FreeGame_value2_mobileFG").text));
        let textFreeGameOFlabelmobileFG = UIManager.getRef("text_FreeGame_OF_label_mobileFG") && UIManager.getRef("text_FreeGame_OF_label_mobileFG").text;
        let textFreeGamelabelmobileFG = UIManager.getRef("text_FreeGame_label_mobileFG") && UIManager.getRef("text_FreeGame_label_mobileFG").text;
        UIManager.getRef("text_FreeGame_value1_mobileFG") && (UIManager.setText("text_FreeGame_value1_mobileFG", textFreeGamelabelmobileFG + " " + freegameSpinCounttProps + " " + textFreeGameOFlabelmobileFG + " " + textFreeGamevalue2mobileFG));
    }
    funCounterTextPortrait(freegameSpinCount: any) {
        let textFreeGamevalue2mobileFG = (Number(UIManager.getRef("text_FreeGame_value2_mobileFG").text));
        let textFreeGameOFlabelmobileFG = UIManager.getRef("text_FreeGame_OF_label_mobileFG") && UIManager.getRef("text_FreeGame_OF_label_mobileFG").text;
        UIManager.getRef("text_FreeGame_value1_mobileFG") && (UIManager.setText("text_FreeGame_value1_mobileFG", freegameSpinCount + " " + textFreeGameOFlabelmobileFG + " " + textFreeGamevalue2mobileFG));
    }
    private cleanAllTimer(): void {
        this.AllTimer.forEach((_time: any) => {
            _time && _time.stop();
            _time && _time.reset();
            _time && _time.remove();
        });
        this.AllTimer =[];
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode
            || nextProps.inFreeGame !== this.props.inFreeGame || nextProps.soundIsPlaying != this.props.soundIsPlaying
            || nextProps.freegameSpinCountRemaining != this.props.freegameSpinCountRemaining
            || nextProps.freegameSpinCount != this.props.freegameSpinCount
            || nextProps.displayReelGridSymbolCount != this.props.displayReelGridSymbolCount
            || nextProps.spinStopID != this.props.spinStopID
            || nextProps.featureJustFinished != this.props.featureJustFinished
            || nextProps.callFlowManager !== this.props.callFlowManager
            || nextProps.spinStart !== this.props.spinStart
            || nextProps.blastStart !== this.props.blastStart
            || nextProps.allSpinComplete !== this.props.allSpinComplete
            || nextProps.showWinShower !== this.props.showWinShower
            || nextProps.counterStartIncreasing !== this.props.counterStartIncreasing
            || nextProps.freeGameFinished !== this.props.freeGameFinished
        ) {
            this.changeButton();
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode);
                this.onOrientationChange();
                if (isMobile) {
                    if (window.innerWidth < window.innerHeight) {
                        this.portraitScaling();
                        this.funCounterTextPortrait(nextProps.freegameSpinCount);

                    } else {
                        this.landscapeScaling();
                        this.funCounterText(nextProps.freegameSpinCount);
                    }
                }
            }

            if (nextProps.spinStart && nextProps.spinStart != this.props.spinStart) {
                this.cleanAllTimer();
                this.updateTotalWin();
                if ((!nextProps.InTurboMode || !this.props.InTurboMode) && !nextProps.reConstruction) {
                    let timer = TIMER.TimerManager.createTimer(80);
                    timer.on('repeat', () => {
                        if (UIManager.getRef("FG_manywaysText_" + this.ui_mode).alpha > 0) {
                            UIManager.getRef("FG_manywaysText_desktop") && (UIManager.getRef("FG_manywaysText_desktop").alpha -= this.alphaOfManyways);
                            UIManager.getRef("FG_textManyWays_Image_Desktop") && (UIManager.getRef("FG_textManyWays_Image_Desktop").alpha -= this.alphaOfManyways);
                            UIManager.getRef("FG_manywaysText_mobile") && (UIManager.getRef("FG_manywaysText_mobile").alpha -= this.alphaOfManyways);
                            UIManager.getRef("FG_textManyWays_Image_mobile") && (UIManager.getRef("FG_textManyWays_Image_mobile").alpha -= this.alphaOfManyways);
                        }
                        if (UIManager.getRef("FG_manywaysText_" + this.ui_mode).alpha <= 0) {
                            timer.stop();
                            TIMER.TimerManager.removeTimer(timer);
                        }
                    })
                    timer.start(true, 0);
                }
                else {
                    UIManager.getRef("FG_manywaysText_desktop") && (UIManager.getRef("FG_manywaysText_desktop").alpha = 0);
                    UIManager.getRef("FG_textManyWays_Image_Desktop") && (UIManager.getRef("FG_textManyWays_Image_Desktop").alpha = 0);
                    UIManager.getRef("FG_manywaysText_mobile") && (UIManager.getRef("FG_manywaysText_mobile").alpha = 0);
                    UIManager.getRef("FG_textManyWays_Image_mobile") && (UIManager.getRef("FG_textManyWays_Image_mobile").alpha = 0);
                }
            }

            if (nextProps.blastStart && nextProps.blastStart !== this.props.blastStart) {
                let timer1 = TIMER.TimerManager.createTimer(this.logoAnimDelay);
                timer1.on("end", (e: any) => {
                    e.remove();
                    if (isMobile) {
                        this.logoForMobile && (this.logoForMobile.gotoAndPlay(0));
                    } else {
                        this.logoForDesktop && (this.logoForDesktop.gotoAndPlay(0));
                    }
                });
                timer1.start();
                this.AllTimer.push(timer1);

                let time;
                if (this.props.playAnticipation) {
                    time = this.delayTimerOfMultiplierWithAnticipation;
                }
                else {
                    time = this.delayTimerOfMultiplierWithOutAnticipation;
                }
                let timer = TIMER.TimerManager.createTimer(time);
                timer.on('end', (e: any) => {
                    e.remove();
                    this.props.setMultiplierValue(nextProps.storeMultiplierCurrentValue);
                });
                timer.start();
                this.AllTimer.push(timer);

                let storeBetValue = this.props.betList[this.props.currentBetIndex] / this.constantT11;
                if (nextProps.featureJustReTriggered && nextProps.winAmount / this.constantT11 < storeBetValue) {
                    let timer = TIMER.TimerManager.createTimer(1200);
                    timer.on('end', (e: any) => {
                        e.remove();
                        this.startTextChangingEffect(nextProps);
                    });
                    timer.start();
                    this.AllTimer.push(timer);
                }
                this.storeWinAmount = nextProps.winAmount + this.storeWinAmount;
            }
            if (!nextProps.inFreeGame && nextProps.inFreeGame !== this.props.inFreeGame) {
                this.props.setTotalCreditWinAmount(this.storeWinAmount);
            }
            if (nextProps.allSpinComplete && nextProps.allSpinComplete !== this.props.allSpinComplete) {
                let totalWinAmount = nextProps.totalCreditWinAmount / this.constantT11;
                let storeBetValue = this.props.betList[this.props.currentBetIndex] / this.constantT11;
                if (nextProps.featureJustReTriggered && nextProps.winAmount / this.constantT11 == 0) {
                    this.startTextChangingEffect(nextProps);
                }
                else if (nextProps.featureJustReTriggered && nextProps.winAmount / this.constantT11 > storeBetValue) {
                    nextProps.startIncreasingCounter(false);
                }
            }

            if (nextProps.counterStartIncreasing && nextProps.counterStartIncreasing !== this.props.counterStartIncreasing) {
                this.startTextChangingEffect(nextProps);
            }
            if (nextProps.freegameSpinCountRemaining != this.props.freegameSpinCountRemaining) {
                UIManager.getRef("text_FreeGame_value2") && (UIManager.setText("text_FreeGame_value2", this.props.freegameSpinCountWin));

            }
            if (nextProps.freegameSpinCount && nextProps.freegameSpinCount != this.props.freegameSpinCount) {
                UIManager.getRef("text_FreeGame_value1") && (UIManager.setText("text_FreeGame_value1", nextProps.freegameSpinCount));
                if (isMobile) {
                    if (window.innerHeight < window.innerWidth) {
                        this.funCounterText(nextProps.freegameSpinCount);
                    } else {
                        this.funCounterTextPortrait(nextProps.freegameSpinCount);
                    }
                }
            }

            if (nextProps.displayReelGridSymbolCount !== this.props.displayReelGridSymbolCount) {
                this.mwTextValue = 1;
                this.reelGridSymbolsArray = [];
                this.symbolsCountRearrangeCount(nextProps);
            }
            if (nextProps.spinStopID > -1 && nextProps.spinStopID != this.props.spinStopID) {
                UIManager.getRef("FG_manywaysText_" + this.ui_mode) && (UIManager.getRef("FG_manywaysText_" + this.ui_mode).alpha = 1);
                UIManager.getRef("FG_textManyWays_Image_Desktop") && (UIManager.getRef("FG_textManyWays_Image_Desktop").alpha = 1);
                UIManager.getRef("FG_textManyWays_Image_mobile") && (UIManager.getRef("FG_textManyWays_Image_mobile").alpha = 1);
                this.mwTextValue = this.mwTextValue * this.reelGridSymbolsArray[nextProps.spinStopID];
                UIManager.getRef("FG_manywaysText_" + this.ui_mode) && (UIManager.getRef("FG_manywaysText_" + this.ui_mode).text = this.mwTextValue);
            }
            return false;
        }
        return false;
    }

    //this function will show the effect of increasing free spins when 3 or more scatter trigger.
    startTextChangingEffect(nextProps: any) {
        let addText = "";
        if (isMobile) {
            addText = "_mobileFG";
        }
        let timer = TIMER.TimerManager.createTimer(1000);
        timer.on('repeat', (i: number) => {
            if (Number(UIManager.getRef("text_FreeGame_value2" + addText).text) < nextProps.freegameSpinCountWin) {
                let blastAnim = UIManager.getRef("FG_reTrigger_blast_Anim_" + this.ui_mode);
                blastAnim.visible = true;
                blastAnim && (blastAnim.gotoAndPlay(0));
                this.props.reTriggerCountBlast(Number(UIManager.getRef("text_FreeGame_value2" + addText).text) + 1);
                UIManager.getRef("text_FreeGame_value2" + addText) && (UIManager.setText("text_FreeGame_value2" + addText, Number(UIManager.getRef("text_FreeGame_value2" + addText).text) + 1));
                if (isMobile) {
                    let textFreeGamevalue2mobileFG = (Number(UIManager.getRef("text_FreeGame_value2_mobileFG").text));
                    let textFreeGameOFlabelmobileFG = UIManager.getRef("text_FreeGame_OF_label_mobileFG").text;
                    let textFreeGamelabelmobileFG = UIManager.getRef("text_FreeGame_label_mobileFG").text;
                    if (window.innerHeight < window.innerWidth) {
                        UIManager.getRef("text_FreeGame_value1_mobileFG") && (UIManager.setText("text_FreeGame_value1_mobileFG", textFreeGamelabelmobileFG + " " + this.props.freegameSpinCount + " " + textFreeGameOFlabelmobileFG + " " + textFreeGamevalue2mobileFG));
                    } else {
                        UIManager.getRef("text_FreeGame_value1_mobileFG") && (UIManager.setText("text_FreeGame_value1_mobileFG", this.props.freegameSpinCount + " " + textFreeGameOFlabelmobileFG + " " + textFreeGamevalue2mobileFG));
                    }
                }
                (blastAnim.onComplete = () => {
                    blastAnim.visible = false;
                })
            } else if (Number(UIManager.getRef("text_FreeGame_value2" + addText).text) == nextProps.freegameSpinCountWin) {
                this.props.setWinHorizontalSymbolCoOrdinate([]);
                nextProps.nextAutoplay();
                nextProps.nextFreegame();
                this.props.reTriggerCountBlast(-1);

                timer.stop();
                TIMER.TimerManager.removeTimer(timer);

            }
        });
        timer.start(true, 1000);
    }

    //this method will call after the first rendering for scaling and logo animation looping
    bindUI() {
        this.layoutChange(this.props.layoutMode);
        if (isMobile) {
            if (window.innerWidth < window.innerHeight) {
                this.portraitScaling();
            } else {
                this.landscapeScaling();
            }
        }
    }

    //this method will handle sounds on button's visibility accordingly
    soundOnButtonFunctionality() {
        if (this.props.soundIsPlaying && this.props.soundOnOff) {
            this.props.playingSound(false);
            this.props.stopAllBGMSound(true);
            this.props.stopAllSFXSound(true);
        }

    }

    //this method will handle mute button's visibility accordingly
    soundOffButtonFunctionality() {
        if (this.props.soundIsPlaying && this.props.soundOnOff) {
            this.props.playingSound(false);
            this.props.stopAllBGMSound(true);
            this.props.stopAllSFXSound(true);
        } else {
            this.props.soundLoadStartFunction(true);
            this.props.stopAllBGMSound(false);
            this.props.stopAllSFXSound(false);
            this.props.playingSound(true);
        }
    }

    handleEvent = (e: any) => {
        if (e.target.name === "btn_sound") {
            this.soundOnButtonFunctionality();
        }
        if (e.target.name === "btn_soundOff") {
            this.soundOffButtonFunctionality();
        }
        this.changeButton();
    }

    changeButton() {

        if (!isMobile) {
            if (this.props.soundIsPlaying) {
                UIManager.getRef("btn_sound").visible = true;
                UIManager.getRef("btn_soundOff").visible = false;
            } else {
                UIManager.getRef("btn_sound").visible = false;
                UIManager.getRef("btn_soundOff").visible = true;
            }
        }
        if (!isMobile && !this.props.soundOnOff) {
            UIManager.getRef("btn_soundDisable").visible = true;
            UIManager.getRef("btn_soundOff").visible = false;
            UIManager.getRef("btn_sound").visible = false;
        } else {
            UIManager.getRef("btn_soundDisable") && (UIManager.getRef("btn_soundDisable").visible = false);
        }
    }

    //this method will initialize object in a variable
    initializeObjectToVariable() {
        this.freeGameFrameBorder = UIManager.getRef("frame_FG_Image_Mob");
        this.freeGameFramesInsidePortionImage = UIManager.getRef("frameReel_FG_Image_Mob");
        this.manywaysTextImage = UIManager.getRef("FG_textManyWays_Image_mobile");
        this.logoForDesktop = UIManager.getRef("FG_gameLogo_Anim_desktop");
        this.logoForMobile = UIManager.getRef("FG_gameLogo_Anim_mobile");
        this.FG_Left_DrippingLava1_Anim_desktop = UIManager.getRef("FG_Left_DrippingLava1_Anim_desktop");
        this.FG_Right_DrippingLava1_Anim_desktop = UIManager.getRef("FG_Right_DrippingLava1_Anim_desktop");
        this.FG_Left_DrippingLava1_Anim_mobile = UIManager.getRef("FG_Left_DrippingLava1_Anim_mobile");
        this.FG_Right_DrippingLava1_Anim_mobile = UIManager.getRef("FG_Right_DrippingLava1_Anim_mobile");
        this.flipAnimations();
        this.MobileBalance_labelFG = UIManager.getRef("Mobiletext_balance_labelFG");
        this.MobileBalance_ColonFG = UIManager.getRef("Mobiletext_mobColonSymbol2FG");
        this.MobileBalance_valueFG = UIManager.getRef("Mobiletext_balance_valueFG");
    }

    useQuery = () => {
        let search = window.location.search;

        return new URLSearchParams(search);
    }
    symbolDroping() {
        frameworkReelGrid.data.delayDropDuration = 900;
        frameworkGrids.data.blastDuration = 2900;
    }

    componentDidMount() {
        this.symbolDroping();
        this.changeButton();
        this.initializeObjectToVariable();
        if (this.props.soundOnOff) {
            if (((localStorage.getItem("playerId-sound-" + this.useQuery().get("token")) === "true") ? true : false)) {
                this.props.playingSound(true);
            } else {
                this.props.playingSound(false);
            }
        }

        this.bindUI();
        this.onOrientationChange();
        if (this.props.freegameSpinCount !== this.props.freegameSpinCountRemaining) {
            this.props.activeMultiplier(true);
            this.props.setMultiplierValue(this.props.storeMultiplierCurrentValue);
        }
        UIManager.getRef("text_FreeGame_value1") && (UIManager.setText("text_FreeGame_value1", this.props.freegameSpinCount));
        UIManager.getRef("text_FreeGame_value2") && (UIManager.setText("text_FreeGame_value2", this.props.freegameSpinCountWin));
        UIManager.getRef("text_FreeGame_value2_mobileFG") && (UIManager.setText("text_FreeGame_value2_mobileFG", this.props.freegameSpinCountWin));
        if (isMobile) {
            let textFreeGamevalue2mobileFG = (Number(UIManager.getRef("text_FreeGame_value2_mobileFG").text));
            let textFreeGameOFlabelmobileFG = UIManager.getRef("text_FreeGame_OF_label_mobileFG") && UIManager.getRef("text_FreeGame_OF_label_mobileFG").text;
            let textFreeGamelabelmobileFG = UIManager.getRef("text_FreeGame_label_mobileFG") && UIManager.getRef("text_FreeGame_label_mobileFG").text;
            if (window.innerHeight < window.innerWidth) {
                UIManager.getRef("text_FreeGame_value1_mobileFG") && (UIManager.setText("text_FreeGame_value1_mobileFG", textFreeGamelabelmobileFG + " " + this.props.freegameSpinCount + " " + textFreeGameOFlabelmobileFG + " " + textFreeGamevalue2mobileFG));
            } else {
                UIManager.getRef("text_FreeGame_value1_mobileFG") && (UIManager.setText("text_FreeGame_value1_mobileFG", this.props.freegameSpinCount + " " + textFreeGameOFlabelmobileFG + " " + textFreeGamevalue2mobileFG));
            }
        }

        this.symbolsCountRearrangeCount(this.props);
        let totalmwCount = 1;
        for (let j = 0; j < this.reelGridSymbolsArray.length; j++) {
            totalmwCount = totalmwCount * this.reelGridSymbolsArray[j];
        }
        UIManager.getRef("FG_manywaysText_" + this.ui_mode) && (UIManager.getRef("FG_manywaysText_" + this.ui_mode).text = totalmwCount);
        let balanceInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(this.props.transitionBalance / 100, true, true, true, true);
        UIManager.getRef("Mobiletext_balance_valueFG") && (UIManager.setText("Mobiletext_balance_valueFG", balanceInCurrency));
        let betInCurrency = CURRENCY.CurrencyManager.formatCurrencyString(this.props.betList[this.props.currentBetIndex] / 100, true, true, true, true);
        UIManager.getRef("Mobiletext_bet_valueFG") && (UIManager.setText("Mobiletext_bet_valueFG", betInCurrency));

        let winAmount = ((this.props.totalWinAmount + this.storeWinAmount) / 100).toFixed(2);
        let win = CURRENCY.CurrencyManager.formatCurrencyString(winAmount, true, true, true, true);

        if (!isMobile) {
            UIManager.getRef("text_TotalWin_value").visible = true;
            UIManager.getRef("text_TotalWin_value") && (UIManager.setText("text_TotalWin_value", win));
        } else {
            let val = UIManager.getRef("text_TotalWin_label_mobileFG").text;
            UIManager.getRef("text_TotalWin_value_mobileFG").visible = true;
            UIManager.getRef("text_TotalWin_value_mobileFG") && (UIManager.setText("text_TotalWin_value_mobileFG", val + " " + win));
        }
        this.storeWinAmount = this.props.totalWinAmount + this.storeWinAmount;
        UIManager.getRef("good_Luck_Text") && (UIManager.getRef("good_Luck_Text").visible = false);
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        /*  if (this.props.soundOnOff) {
             UIManager.getRef("btn_soundDisable").visible = true;
             UIManager.getRef("btn_soundOff").visible = false;
             UIManager.getRef("btn_sound").visible = false;
         }else{
             UIManager.getRef("btn_soundDisable").visible = false;
         } */
    }

    chooseAssets() {
        let screen = window.screen;

        let isFullHD = false;
        if (((screen.width >= this.minFullHDWidth || screen.height >= this.minFullHDWidth) && window.devicePixelRatio >= this.minFullHDPxRatio) ||
            (screen.width >= this.HDReadyWidth || screen.height >= this.HDReadyWidth)) {
            isFullHD = true;
        }
        if (isFullHD) {
            this.canvasBgImagePage = "HD/assets/commongame/freegame_2048.jpg";
        } else {
            this.canvasBgImagePage = "LD/assets/commongame/freegame_2048.jpg";

        }
    }

    render() {
        (document.getElementsByClassName("canvasBgImage")[0] as any).src = this.canvasBgImagePage;
        return (
            <UIManager id={"freeGameGenericUIContainer"} type={"Container"} name={"freeGameGenericUIContainer"} app={this.app}
                ref={i => this.gofFreeGameSpecialLayerContainer = i}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            app={this.app} configGame={configGame}
                            id={i.id} {...i} ClickHandler={this.handleEvent} />)
                }
            </UIManager>)
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'winCelebrationState' | 'winShowerState' | 'freegameState' | 'applicationState' | 'soundState' | 'reelgridState' | 'flowManagerState' | 'behaviourState' | 'buttonPanelState' | 'behaviourState' | 'basegameState' | 'MultiplierState' | 'betPanelState'>): IStateToProps =>
    ({
        inFreeGame: state.freegameState.inFreeGame,
        layoutMode: state.applicationState.layoutMode,
        soundIsPlaying: state.soundState.soundIsPlaying,
        freegameSpinCountRemaining: state.freegameState.freegameSpinCountRemaining,
        freegameSpinCount: state.freegameState.freegameSpinCount,
        freegameSpinCountWin: state.freegameState.freegameSpinCountWin,
        currentCascadeCount: state.reelgridState.currentCascadeCount,
        spinStopID: state.reelgridState.spinStopID,
        displayReelGridSymbolCount: state.reelgridState.displayReelGridSymbolCount,
        allSpinComplete: state.reelgridState.allSpinComplete,
        featureJustReTriggered: state.freegameState.featureJustReTriggered,
        callFlowManager: state.flowManagerState.callFlowManager,
        featureJustFinished: state.freegameState.featureJustFinished,
        totalWinAmount: state.behaviourState.totalWinAmount,
        totalCreditWinAmount: state.behaviourState.totalCreditWinAmount,
        transitionBalance: state.behaviourState.transitionBalance,
        balance: state.basegameState.balance,
        betList: state.basegameState.betList,
        currentBetIndex: state.basegameState.currentBetIndex,
        multiplierActive: state.MultiplierState.multiplierActive,
        storeMultiplierCurrentValue: state.MultiplierState.storeMultiplierCurrentValue,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        spinStart: state.reelgridState.spinStart,
        blastStart: state.reelgridState.blastStart,
        winAmount: state.basegameState.winAmount,
        InTurboMode: state.reelgridState.InTurboMode,
        showWinShower: state.winShowerState.showWinShower,
        counterStartIncreasing: state.behaviourState.counterStartIncreasing,
        reConstruction: state.basegameState.reConstruction,
        languageCode: state.applicationState.languageCode,
        soundOnOff: state.applicationState.soundOnOff,
        jurisdictionKey: state.applicationState.jurisdictionKey,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        updateReelData: (result_reel: any): any => dispatch(reelgridAction.updateReelData(result_reel)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutsActions.setApplicationLayoutObject(layoutobjectlist)),
        activeMultiplier: (multiplierActive: boolean): any => dispatch(multiplierActions.activeMultiplier(multiplierActive)),
        playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
        stopAllBGMSound: (stopBgSound: any): any => dispatch(soundActions.stopAllBGMSound(stopBgSound)),
        stopAllSFXSound: (stopAllSfxSound: boolean): any => dispatch(soundActions.stopAllSFXSound(stopAllSfxSound)),
        nextAutoplay: (): any => dispatch(basegameAction.nextAutoplay()),
        nextFreegame: (): any => dispatch(freegameAction.nextFreegame()),
        stopFreegame: (): any => dispatch(freegameActions.stopFreegame()),
        setApplicationToBaseGameState: (basegamestate: boolean): any => dispatch(basegameActions.setApplicationToBaseGameState(basegamestate)),
        setMultiplierValue: (multiplierCurrentValue: any): any => dispatch(multiplierActions.setMultiplierValue(multiplierCurrentValue)),
        setTotalCreditWinAmount: (totalCreditWinAmount: any): any => dispatch(behaviourAction.setTotalCreditWinAmount(totalCreditWinAmount)),
        resetManywaysValue: (resetManyWaysTextToInitial: any): any => dispatch(behaviourAction.resetManywaysValue(resetManyWaysTextToInitial)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        setGridList: (grid: any): any => dispatch(horizontalSymbolActions.setGridList(grid)),
        setWinHorizontalSymbolCoOrdinate: (winSymbolCoOrdinate: any): any => dispatch(horizontalSymbolActions.setWinSymbolCoOrdinate(winSymbolCoOrdinate)),
        reTriggerCountBlast: (reTriggerBlastCount: any): any => dispatch(soundGameLevelAction.reTriggerCountBlast(reTriggerBlastCount)),
        startIncreasingCounter: (counterStartIncreasing: any): any => dispatch(behaviourAction.startIncreasingCounter(counterStartIncreasing)),
        soundLoadStartFunction: (soundLoadStart: boolean): any => dispatch(soundActions.soundLoadStartFunction(soundLoadStart)),
    }))(withFreeGameConfiguration(GofFreeGameSpecialLayer)));