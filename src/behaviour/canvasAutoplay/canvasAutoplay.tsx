import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withCanvasAutoplayConfiguration from "./configuration/withCanvasAutoplayConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import { actions as autoplayActions } from "../../core/reducers/autoplayReducer";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { isMobile } from "react-device-detect";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as baseGameActions } from "../../core/reducers/baseGameReducer";
import { actions as asyncActions } from "../../core/reducers/asyncServerResponseReducer";
import { actions as winpresentationAction } from "../../core/reducers/winPresentationReducer";
import { configGame } from "../../data/config";
import { actions as reelgridActions } from "../../core/reducers/reelgridStateReducer";
import { Texture } from "pixi.js";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { CURRENCY } from "../../core/utills";
import * as PIXI from "pixi.js";

interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {

}

interface IDispatchToProps {

}

interface IState {
    [x: string]: any;
}

class CanvasAutoplay extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected canvasAutoplayContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;
    protected data: any;
    protected dragging: any;
    protected x: any;
    protected y: any;
    protected parent: any;
    protected autoplayMainContainer: any;
    protected button1: number = this.props.autoPlaySpinSteps[0];
    protected button2: number = this.props.autoPlaySpinSteps[1];
    protected button3: number = this.props.autoPlaySpinSteps[2];
    protected button4: number = this.props.autoPlaySpinSteps[3];
    protected button5: number = this.props.autoPlaySpinSteps[4];
    protected button6: number = this.props.autoPlaySpinSteps[5];
    protected button7: number = this.props.autoPlaySpinSteps[6];
    protected button8: number = this.props.autoPlaySpinSteps[7];
    protected button9: number = this.props.autoPlaySpinSteps[8];
    protected storeLastClickedButtonValue: number = 0;
    protected sliderBarGraphicColor: any = 0xDE3249;
    protected sliderBarGraphicAlpha: any = 0.001;
    public valueOfSlider: number = 1;
    public initialXOfSliderDot: number = 400;
    public extraWidthValue: number = 9;
    protected valueMultiplierForFirstSlide: number = 500;
    protected valueMultiplierForSecondSlide: number = 5000;
    protected sliderLineHeight: number = 20;
    protected sliderLineY: number = 4;
    protected a: number = 0;
    public sliderDotName: any;
    public sliderLineName: any;
    public selectedInputName: any;
    public maxValue: any;
    public lastHighlightedButton: any;
    public countButtonCLicked: boolean = false;
    public totalAutoPlayButtons: number = 9;
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            buttonPanelEnable: true,
            allContainerList: [],
            autoplayModeOn: false,
            showOverLay: false,
            isSpinning: false,
            pause: false,
            play: true,
            basegameIdleMode: true,
            basegamePlayMode: false,
            uiElements: [],
            lang: "en",
            toggleOn: false,
            slideAlpha: 0
        }
        // this.canvasAutoplayContainer = React.createRef();
        this.canvasAutoplayContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }

        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));

    }

    checkUiMode(uimodeobj: any) {

        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both";
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    selectMaxValue(dotName: any) {
        if (dotName === "sliderDot") {
            let manWinValue = (this.props.maxWinMultiplier * this.props.autoPlaySingleWinLimitPercentage) / 100;
            this.maxValue = this.props.maxWinMultiplier ? (this.props.betList[this.props.currentBetIndex]) / 100 * manWinValue : (this.props.betList[this.props.currentBetIndex]) / 100 * this.valueMultiplierForFirstSlide;
        } else if (dotName === "sliderDot_2") {
            let manWinValue = (this.props.maxWinMultiplier * this.props.autoPlayWinLimitPercentage) / 100;
            this.maxValue = this.props.maxWinMultiplier ? (this.props.betList[this.props.currentBetIndex]) / 100 * manWinValue : (this.props.betList[this.props.currentBetIndex]) / 100 * this.valueMultiplierForSecondSlide;
        } else if (dotName === "sliderDot_3") {
            let storeValue1, storeValue2;
            storeValue1 = this.props.autoPlayLossLimitPercentage ? ((this.props.transitionBalance * this.props.autoPlayLossLimitPercentage) / 100) / 100 : this.props.transitionBalance / 100;
            storeValue2 = (this.props.betList[this.props.currentBetIndex]) / 100 * this.props.autoPlaySpinSteps[this.props.autoPlaySpinSteps.length - 1];
            storeValue1 > storeValue2 ? this.maxValue = storeValue2 : this.maxValue = storeValue1;
        }
    }

    bindUI() {
        this.layoutChange(this.props.layoutMode);
    }

    rangeSlider(dotName: any, sliderName: any) {
        UIManager.getRef(dotName).off('pointerdown');
        UIManager.getRef(dotName).off('pointerup');
        UIManager.getRef(dotName).off('pointerupoutside');
        UIManager.getRef(dotName).off('pointermove');
        UIManager.getRef(dotName).on('pointerdown', this.onDragStart.bind(this))
            .on('pointerup', this.onDragEnd.bind(this))
            .on('pointerupoutside', this.onDragEnd.bind(this))
            .on('pointermove', this.onDragMove.bind(this, dotName, sliderName));
    }


    onDragStart(event: any) {
        this.sliderDotName = event.target.name;
        this.selectedInputName = event.target.name + '_inputBoxText';
        this.sliderLineName = event.target.name + 'Line';
        this.selectMaxValue(this.sliderDotName);
        this.data = event.data;
        this.dragging = true;
        this.x = this.data.global.x;
    }

    onDragEnd() {
        this.dragging = false;
        this.data = null;
    }

    onDragMove(dotName: any, sliderName: any) {

        if (this.dragging) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    slideAlpha: this.state.slideAlpha + 1
                }
            })
            const newPosition = this.data.global;
            if (newPosition.x < this.initialXOfSliderDot) {
                newPosition.x = this.initialXOfSliderDot;
            } else if (newPosition.x > (UIManager.getRef(sliderName).width - this.extraWidthValue) + this.initialXOfSliderDot) {
                newPosition.x = (UIManager.getRef(sliderName).width - this.extraWidthValue) + this.initialXOfSliderDot;
            }
            this.x = newPosition.x;
            UIManager.getRef(this.sliderDotName).x = newPosition.x;

            this.valueOfSlider = this.x - this.initialXOfSliderDot;
            let displayValue = 0;
            displayValue = this.maxValue / (UIManager.getRef(sliderName).width - this.extraWidthValue) * (this.valueOfSlider);

            if (this.sliderDotName == "sliderDot_3") {
                if (this.props.currencyCode) {

                    UIManager.setText(this.selectedInputName, CURRENCY.CurrencyManager.formatCurrencyString(Math.round(displayValue), true, true, true, true));
                }
                else {
                    UIManager.setText(this.selectedInputName, ((Math.round(displayValue)).toFixed(2)));
                }
                if (displayValue > 0) {
                    this.props.setBalanceDecreasedBy((Math.round(displayValue)).toFixed(2));
                } else {
                    this.props.setBalanceDecreasedBy(Number.POSITIVE_INFINITY);
                    UIManager.setText("sliderDot_3_inputBoxText", '∞');
                }

            }
            else {
                if (this.props.currencyCode) {
                    UIManager.setText(this.selectedInputName, CURRENCY.CurrencyManager.formatCurrencyString(Math.round(displayValue), true, true, true, true));
                }
                else {
                    UIManager.setText(this.selectedInputName, (Math.round(displayValue)).toFixed(2));
                }
                if (this.sliderDotName == "sliderDot") {
                    if (displayValue > 0) {
                        this.props.setSingleWinExceed((Math.round(displayValue)).toFixed(2));
                    } else {
                        this.props.setSingleWinExceed(Number.POSITIVE_INFINITY);
                        UIManager.setText("sliderDot_inputBoxText", '∞');
                    }
                }
                if (this.sliderDotName == "sliderDot_2") {
                    if (displayValue > 0) {
                        this.props.setBalanceIncreasedBy((Math.round(displayValue)).toFixed(2));
                    } else {
                        this.props.setBalanceIncreasedBy(Number.POSITIVE_INFINITY);
                        UIManager.setText("sliderDot_2_inputBoxText", '∞');
                    }
                }
            }
            // }
            if (this.props.autoPlayWinLimitMandatory && this.props.autoPlayLossLimitMandatory) {
                UIManager.getRef("autoplay_StartButton").interactive = true;
                UIManager.getRef("autoplay_StartButton").texture = Texture.from("start_btn_up.png");
            }
        }
    }

    sliderBarVisibilityOnOff() {
        this.sliderBarVisibility("sliderDot", "sliderDotLine");
        this.sliderBarVisibility("sliderDot_2", "sliderDot_2Line");
        this.sliderBarVisibility("sliderDot_3", "sliderDot_3Line");
    }

    buttonModeOnForDots() {
        UIManager.getRef("sliderDot").buttonMode = true;
        UIManager.getRef("sliderDot_2").buttonMode = true;
        UIManager.getRef("sliderDot_3").buttonMode = true;
    }
    setExtraButtonsvisibilityFalse() {
        for (let i = this.props.autoPlaySpinSteps.length + 1; i <= this.totalAutoPlayButtons; i++) {
            UIManager.getRef("autoplayButton" + i).visible = false;
        }
    }
    setTextInitialValue(textName: string) {
        UIManager.setText(textName, '∞');
        this.props.setSingleWinExceed(Number.POSITIVE_INFINITY);
        this.props.setBalanceIncreasedBy(Number.POSITIVE_INFINITY);
        this.props.setBalanceDecreasedBy(Number.POSITIVE_INFINITY);
    }
    componentDidMount() {
        this.bindUI();
        if (this.props.showAutoplay) {
            this.setTextInitialValue("sliderDot_inputBoxText");
            this.setTextInitialValue("sliderDot_2_inputBoxText");
            this.setTextInitialValue("sliderDot_3_inputBoxText");
            UIManager.getRef("radioButtonDisable") && (UIManager.getRef("radioButtonDisable").visible = false);
            for (let i = 1; i <= this.props.autoPlaySpinSteps.length; i++) {
                UIManager.getRef("autoplayButtonText" + i) && UIManager.setText("autoplayButtonText" + i, this.props.autoPlaySpinSteps[i - 1] == -1 ? '∞' : this.props.autoPlaySpinSteps[i - 1]);
                if (this.props.autoPlaySpinStartValue == this.props.autoPlaySpinSteps[i - 1] && this.props.autoPlaySpinResetToStartValue) {
                    (UIManager.getRef("autoplayButton" + i).texture = Texture.from("autoplay_btn_over.png"));
                    this.props.setValueOfNumberButton(this.props.autoPlaySpinSteps[i - 1]);
                }
            }
            !this.props.autoPlaySpinResetToStartValue && (UIManager.getRef("autoplayButton1").texture = Texture.from("autoplay_btn_over.png"));
            !this.props.autoPlaySpinResetToStartValue && this.props.setValueOfNumberButton(0);
            this.setExtraButtonsvisibilityFalse();
            if (this.props.autoPlayWinLimitMandatory && this.props.autoPlayLossLimitMandatory && this.props.autoPlaySpinStartValue <= 0) {
                (UIManager.getRef("autoplay_StartButton").interactive = false);
                (UIManager.getRef("autoplay_StartButton").texture = Texture.from("start_btn_disable.png"));
            }
            this.buttonModeOnForDots();
            UIManager.getRef("sliderDot").x = this.initialXOfSliderDot;
            this.rangeSliderCall();
            this.sliderBarVisibilityOnOff();
            if (this.props.stopAutoplayOnAnyWin) {
                UIManager.getRef("radioButtonOff").visible = false;
                UIManager.getRef("radioButtonOn").visible = true;
            } else {
                UIManager.getRef("radioButtonOff").visible = true;
                UIManager.getRef("radioButtonOn").visible = false;
            }
        }

    }

    slider() {
        this.rangeSlider("sliderDot", "sliderDotLine");
        this.rangeSlider("sliderDot_2", "sliderDot_2Line");
        this.rangeSlider("sliderDot_3", "sliderDot_3Line");
    }

    rangeSliderCall() {
        if (!this.props.autoPlayLossLimitEnabled) {
            UIManager.getRef("sliderDot_3_disable").visible = true;
        } else {
            this.slider();
        }
        if (!this.props.autoPlaySingleWinLimitEnabled) {
            UIManager.getRef("sliderDot_disable").visible = true;
        } else {
            this.slider();
        }

        if (!this.props.autoPlayWinLimitEnabled) {
            UIManager.getRef("sliderDot_2_disable").visible = true;
        }
        else {
            this.slider();
        }
    }

    sliderBarVisibilityForInput(sliderDot: any, sliderLine: any) {
        const thing = new PIXI.Graphics();
        thing.beginFill(this.sliderBarGraphicColor);
        thing.drawRect(0, this.sliderLineY, UIManager.getRef(sliderDot).x - this.initialXOfSliderDot, this.sliderLineHeight);
        thing.endFill();
        UIManager.getRef(sliderLine).addChild(thing);
        thing.x = 0;
        thing.y = 0;
        thing.alpha = this.sliderBarGraphicAlpha;
        UIManager.getRef(sliderLine).mask = thing;

    }

    sliderBarVisibility(sliderDot: any, sliderLine: any) {
        const thing = new PIXI.Graphics();
        thing.beginFill(this.sliderBarGraphicColor);
        thing.drawRect(0, this.sliderLineY, UIManager.getRef(sliderDot).x - this.initialXOfSliderDot, this.sliderLineHeight);
        thing.endFill();
        UIManager.getRef(sliderLine).addChild(thing);
        thing.x = 0;
        thing.y = 0;
        thing.alpha = this.sliderBarGraphicAlpha;
        UIManager.getRef(sliderLine).mask = thing;

    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)
            return false;
        }

        if (nextProps.autoplayCount !== this.props.autoplayCount) {
            if (nextProps.autoplayCount == 0) {
                this.props.setBalanceIncreasedBy(-1);
                this.props.setBalanceDecreasedBy(-1);
                this.props.setSingleWinExceed(-1);
            }
            return false;
        }

        if (nextState.slideAlpha !== this.state.slideAlpha) {
            this.sliderBarVisibility(this.sliderDotName, this.sliderLineName);
            return false;
        }
        return false;
    }

    onClick(e: any, buttonName: any, value: number) {
        this.countButtonCLicked = true;
        this.props.setApplicationButtonClicked(true);
        this.props.setApplicationButtonClicked(false);
        for (let i = 1; i <= 9; i++) {
            UIManager.getRef("autoplayButton" + i).texture = Texture.from("autoplay_btn_up.png");
        }

        e.target.texture = Texture.from("autoplay_btn_over.png");
        if ((this.props.autoPlayLossLimitMandatory && this.props.stopIfBalanceDecreasedBy > -1) || (this.props.autoPlaySingleWinLimitMandatory && this.props.stopIfSingleWinExceed > -1) || (this.props.autoPlayWinLimitMandatory && this.props.stopIfBalanceIncreasedBy > -1)) {
            UIManager.getRef("autoplay_StartButton").interactive = true;
        } else if (!this.props.autoPlayLossLimitMandatory && !this.props.autoPlaySingleWinLimitMandatory && !this.props.autoPlayWinLimitMandatory) {
            UIManager.getRef("autoplay_StartButton").interactive = true;
            UIManager.getRef("autoplay_StartButton").texture = Texture.from("start_btn_up.png");
        }

        if (value > 0) {
            this.props.setValueOfNumberButton(value - 1);
        }
        else if (value == 0) {
            this.props.setValueOfNumberButton(0);
        }
        else {
            this.props.setValueOfNumberButton(-1);
        }

        this.props.interactivityOfStartButton(true);
        this.storeLastClickedButtonValue = this.props.numberButtonValue;
        this.setExtraButtonsvisibilityFalse();
    }

    radioButtonClicked(currentButtonName: any, nextButtonName: any) {
        this.props.stoppedAutoplayOnWin();
        UIManager.getRef(currentButtonName).visible = false;
        UIManager.getRef(nextButtonName).visible = true;
    }

    handleEvent = (e: any) => {

        this.props.setApplicationButtonClicked(true);
        this.props.setApplicationButtonClicked(false);
        switch (e.target.name) {
            case "autoplayButton1":
                this.onClick(e, e.target.name, this.button1);
                break;
            case "autoplayButton2":
                this.onClick(e, e.target.name, this.button2);
                break;
            case "autoplayButton3":
                this.onClick(e, e.target.name, this.button3);
                break;
            case "autoplayButton4":
                this.onClick(e, e.target.name, this.button4);
                break;
            case "autoplayButton5":
                this.onClick(e, e.target.name, this.button5);
                break;
            case "autoplayButton6":
                this.onClick(e, e.target.name, this.button6);
                break;
            case "autoplayButton7":
                this.onClick(e, e.target.name, this.button7);
                break;
            case "autoplayButton8":
                this.onClick(e, e.target.name, this.button8);
                break;
            case "autoplayButton9":
                this.onClick(e, e.target.name, this.button9);
                break;
            case "radioButtonOn":
                this.radioButtonClicked("radioButtonOn", "radioButtonOff");
                break;
            case "radioButtonOff":
                this.radioButtonClicked("radioButtonOff", "radioButtonOn");
                break;
            case "sliderDotLine":
                (this.props.autoPlaySingleWinLimitEnabled) && this.onClickValueChange(e, "sliderDot", "sliderDotLine", "sliderDot_inputBoxText");
                (this.props.autoPlaySingleWinLimitEnabled) && this.sliderBarVisibility("sliderDot", "sliderDotLine");
                break;
            case "sliderLineBG":
                (this.props.autoPlaySingleWinLimitEnabled) && this.onClickValueChange(e, "sliderDot", "sliderLineBG", "sliderDot_inputBoxText");
                (this.props.autoPlaySingleWinLimitEnabled) && this.sliderBarVisibility("sliderDot", "sliderDotLine");
                break;
            case "sliderDot_2Line":
                (this.props.autoPlayWinLimitEnabled) && this.onClickValueChange(e, "sliderDot_2", "sliderDot_2Line", "sliderDot_2_inputBoxText");
                (this.props.autoPlayWinLimitEnabled) && this.sliderBarVisibility("sliderDot_2", "sliderDot_2Line");
                break;
            case "sliderLine_2BG":
                (this.props.autoPlayWinLimitEnabled) && this.onClickValueChange(e, "sliderDot_2", "sliderLine_2BG", "sliderDot_2_inputBoxText");
                (this.props.autoPlayWinLimitEnabled) && this.sliderBarVisibility("sliderDot_2", "sliderDot_2Line");
                break;
            case "sliderDot_3Line":
                (this.props.autoPlayLossLimitEnabled) && this.onClickValueChange(e, "sliderDot_3", "sliderDot_3Line", "sliderDot_3_inputBoxText");
                (this.props.autoPlayLossLimitEnabled) && this.sliderBarVisibility("sliderDot_3", "sliderDot_3Line");
                break;
            case "sliderLine_3BG":
                (this.props.autoPlayLossLimitEnabled) && this.onClickValueChange(e, "sliderDot_3", "sliderLine_3BG", "sliderDot_3_inputBoxText");
                (this.props.autoPlayLossLimitEnabled) && this.sliderBarVisibility("sliderDot_3", "sliderDot_3Line");
                break;
            case "autoplay_StartButton":
                this.startAutoplay();
                break;
            case "autoplay_CancelButton":
                this.reset();
                break;
            default:
                return 'No buttons';
        }
        if (this.countButtonCLicked && this.props.autoPlayLossLimitMandatory && this.props.stopIfBalanceDecreasedBy >= -1 || (this.countButtonCLicked && this.props.autoPlaySingleWinLimitMandatory && this.props.stopIfSingleWinExceed > -1) || (this.countButtonCLicked && this.props.autoPlayWinLimitMandatory && this.props.stopIfBalanceIncreasedBy > -1)) {
            UIManager.getRef("autoplay_StartButton").texture = Texture.from("start_btn_up.png");
            UIManager.getRef("autoplay_StartButton").interactive = true;
        }
    }

    reset() {
        this.props.setAllButtonEnable();
        this.props.hideAutoplay();
        this.props.setBalanceIncreasedBy(-1);
        this.props.setBalanceDecreasedBy(-1);
        this.props.setSingleWinExceed(-1);
    }

    startAutoplay() {
        if (this.props.numberButtonValue != 0 && (this.props.balance - this.props.coinList[this.props.selectedCoin]) - this.props.coinList[this.props.selectedCoin] > 0) {
            let numberValue;
            (this.props.numberButtonValue == -1) ? (numberValue = Number.POSITIVE_INFINITY) : (numberValue = this.props.numberButtonValue);
            this.countButtonCLicked = false;
            this.props.setAmountForAutoplay(this.props.transitionBalance / 100);
            this.props.setAutoplay(numberValue);
            this.props.setApplicationAutoplayCount(numberValue);
            this.props.startAutoplay();
            this.props.getApplicationSpinResponse();
            this.props.stopWinPresentation();
            this.props.resetReelState();
            this.props.setAllButtonDisable();
            this.props.hideAutoplay();
            this.props.interactivityOfStartButton(false);
        }
        else {
            this.reset();
        }

    }

    onClickValueChange(e: any, sliderDot: any, sliderLine: any, inputBoxValue: any) {
        this.data = e.data;
        this.x = this.data.global.x - this.initialXOfSliderDot;
        UIManager.getRef(sliderDot).x = this.x + this.initialXOfSliderDot - this.extraWidthValue;

        let displayValue = 0;
        this.selectMaxValue(sliderDot);
        if (sliderDot == "sliderDot_3") {
            displayValue = this.maxValue / (UIManager.getRef("sliderLineBG").width - this.extraWidthValue) * (this.x);
            if (this.countButtonCLicked && this.props.autoPlayLossLimitMandatory && displayValue > 0) {
                UIManager.getRef("autoplay_StartButton").texture = Texture.from("start_btn_up.png");
                UIManager.getRef("autoplay_StartButton").interactive = true;
            }
        }
        else {
            displayValue = this.maxValue / (UIManager.getRef("sliderLineBG").width - this.extraWidthValue) * Math.floor(this.x);
            if ((this.countButtonCLicked && this.props.autoPlaySingleWinLimitMandatory && displayValue > 0) || (this.countButtonCLicked && this.props.autoPlayWinLimitMandatory && displayValue > 0)) {
                UIManager.getRef("autoplay_StartButton").texture = Texture.from("start_btn_up.png");
                UIManager.getRef("autoplay_StartButton").interactive = true;
            }
        }
        if (displayValue > this.maxValue) {
            displayValue = this.maxValue;
        }
        if (sliderDot == "sliderDot_3") {
            if (this.props.currencyCode) {
                UIManager.setText(inputBoxValue, CURRENCY.CurrencyManager.formatCurrencyString(Math.round(displayValue), true, true, true, true));
            }
            else {
                UIManager.setText(inputBoxValue, (Math.round(displayValue)).toFixed(2));
            }
            if (displayValue > 0) {
                this.props.setBalanceDecreasedBy((Math.round(displayValue)).toFixed(2));
            }
            else {
                this.props.setBalanceDecreasedBy(Number.POSITIVE_INFINITY);
                UIManager.setText("sliderDot_3_inputBoxText", '∞');
            }
        }
        else {
            if (this.props.currencyCode) {
                UIManager.setText(inputBoxValue, CURRENCY.CurrencyManager.formatCurrencyString(Math.round(displayValue), true, true, true, true));
            }
            else {
                UIManager.setText(inputBoxValue, (Math.round(displayValue)).toFixed(2));
            }

            if (sliderDot == "sliderDot") {
                if (displayValue > 0) {
                    this.props.setSingleWinExceed((Math.round(displayValue)).toFixed(2));
                }
                else {
                    this.props.setSingleWinExceed(Number.POSITIVE_INFINITY);
                    UIManager.setText("sliderDot_inputBoxText", '∞');
                }
            }
            if (sliderDot == "sliderDot_2") {
                if (displayValue > 0) {
                    this.props.setBalanceIncreasedBy((Math.round(displayValue)).toFixed(2));
                }
                else {
                    this.props.setBalanceIncreasedBy(Number.POSITIVE_INFINITY);
                    UIManager.setText("sliderDot_2_inputBoxText", '∞');
                }
            }
        }

    }

    render() {
        if (!this.props.showAutoplay) {
            return (<></>)
        }

        return (
            <UIManager id={"canvasAutoplayContainer"} type={"Container"} ref={i => this.canvasAutoplayContainer = i}
                configGame={this.props.configGame}
                app={this.app}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={this.props.configGame}
                            ClickHandler={this.handleEvent} scope={this} />
                    )
                }
            </UIManager>

        )
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'betPanelState' | 'autoplayState' | 'applicationState' | 'basegameState' | 'behaviourState' | 'autoplayKeyBoardListenerState'>): IStateToProps =>
    ({
        showAutoplay: state.autoplayState.showAutoplay,
        autoplayCount: state.basegameState.autoplayCount,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        balance: state.basegameState.balance,
        numberButtonValue: state.autoplayState.numberButtonValue,
        stopAutoplayOnAnyWin: state.autoplayState.stopAutoplayOnAnyWin,
        transitionBalance: state.behaviourState.transitionBalance,
        autoPlayLossLimitMandatory: state.applicationState.autoPlayLossLimitMandatory,
        stopIfBalanceDecreasedBy: state.autoplayState.stopIfBalanceDecreasedBy,
        stopIfBalanceIncreasedBy: state.autoplayState.stopIfBalanceIncreasedBy,
        stopIfSingleWinExceed: state.autoplayState.stopIfSingleWinExceed,
        autoPlaySingleWinLimitMandatory: state.applicationState.autoPlaySingleWinLimitMandatory,
        autoPlayWinLimitMandatory: state.applicationState.autoPlayWinLimitMandatory,
        autoPlayLossLimitEnabled: state.applicationState.autoPlayLossLimitEnabled,
        autoPlaySingleWinLimitEnabled: state.applicationState.autoPlaySingleWinLimitEnabled,
        autoPlayWinLimitEnabled: state.applicationState.autoPlayWinLimitEnabled,
        autoPlaySpinSteps: state.applicationState.autoPlaySpinSteps,
        autoPlaySpinStartValue: state.applicationState.autoPlaySpinStartValue,
        autoPlaySpinResetToStartValue: state.applicationState.autoPlaySpinResetToStartValue,
        autoPlayLossLimitPercentage: state.applicationState.autoPlayLossLimitPercentage,
        autoPlayWinLimitPercentage: state.applicationState.autoPlayWinLimitPercentage,
        autoPlaySingleWinLimitPercentage: state.applicationState.autoPlaySingleWinLimitPercentage,
        maxWinMultiplier: state.applicationState.maxWinMultiplier,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        currencyCode: state.applicationState.currencyCode,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setValueOfNumberButton: (numberButtonValue: number): any => dispatch(autoplayActions.setValueOfNumberButton(numberButtonValue)),
        interactivityOfStartButton: (startButtonInteractivity: boolean): any => dispatch(autoplayActions.interactivityOfStartButton(startButtonInteractivity)),
        stoppedAutoplayOnWin: (): any => dispatch(autoplayActions.stoppedAutoplayOnWin()),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        hideAutoplay: (): any => dispatch(autoplayActions.hideAutoplayUI()),
        setAutoplay: (autoplayCount: number): any => dispatch(autoplayActions.setAutoplayCount(autoplayCount)),
        startAutoplay: (): any => dispatch(baseGameActions.startAutoplay()),
        setApplicationAutoplayCount: (autoplaycount: number): any => dispatch(baseGameActions.setApplicationAutoplayCount(autoplaycount)),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        resetReelState: (): any => dispatch(configGame["SPIN_TYPE"] === 2 && reelgridActions.resetReelState()),
        autoplayReset: (resetAutoplay: boolean): any => dispatch(autoplayActions.autoplayReset(resetAutoplay)),
        setBalanceIncreasedBy: (value: any): any => dispatch(autoplayActions.setBalanceIncreasedBy(value)),
        setBalanceDecreasedBy: (value: any): any => dispatch(autoplayActions.setBalanceDecreasedBy(value)),
        setSingleWinExceed: (value: any): any => dispatch(autoplayActions.setSingleWinExceed(value)),
        setAmountForAutoplay: (storeAmountForAutoplay: any): any => dispatch(behaviourAction.setAmountForAutoplay(storeAmountForAutoplay)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
    }))(withCanvasAutoplayConfiguration(CanvasAutoplay)));