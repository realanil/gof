import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import UIManager from "../../core/components/ui/UiBuilder";
import { alllanguage } from "../../data/lang/index";
import { Ilanguage } from "../../core/interface/Icommon";
import withWinCelebrationConfiguration from "./configuration/withWinCelebrationConfiguration";
import { isMobile } from "react-device-detect";
import { configGame, constant } from "../../data/config";
import { CURRENCY } from "../../core/utills";
import { actions as winCelebrationActions } from "../../gamereducer/winCelebrationReducer";
import { BaseAnimatedparticle } from "../../core/components/effect/baseanimatedparticle";
import { TIMER } from "../../core/utills";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as soundActions } from "../../core/reducers/soundReducer";
import { Tween } from "../../core/components/effect/tween";
import { actions as basegameAction } from "../../core/reducers/baseGameReducer";
import { actions as freegameAction } from "../../core/reducers/freeGameReducer";
import { actions as keyboardListenerActions } from "../../core/reducers/keyboardListenerReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
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
}

interface IState {
    [x: string]: any;
}

class WinCelebration extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected winCelebrationContainer: _ReactPixi.IContainer | Ref<any>;
    private alllanguage: Ilanguage;
    private tickupRequest: any;
    protected tweening: any;
    protected ui_mode: string;
    protected displayUI: any;
    protected thresholdSuperWin: any
    protected thresholdMegaWin: any
    protected thresholdLegendaryWin: any
    protected Baseparticle: any
    protected wincelebrationText: any
    protected wincelebrationTextPortrait: any
    private lowerTargetValue: number = 0.5;
    private higherTargetValue: number = 1.5;
    protected currentCelebrationState: any
    private winCelebrationLabelDL: any;
    private winCelebrationLabelPortrait: any
    private winCelebrationLableDLName: any
    private winCelebrationLablePortraitName: any
    private winCelebration_Graphic: any;
    private T2000: number = 2000;
    private tickupScale: number = 0.002;
    private tickUpValue: number = 0;
    private maximumScalingOfTickUp: number = 1;
    private T100: number = 100;
    private toConvertInSec: number = 1000;
    private previousSound: string = "";
    private startWinSound: boolean = false;
    private isClicked: boolean = false;
    private tickUpScalingTimer: number = 50;
    private tickUpScalingDelay: number = 20;
    private handleEventTimer: number = 1000;
    private tickUpStartingScaling: number = 0.70;
    private tickUpActualScaling: number = 1;
    private coinContainerX: number = -400;
    private coinContainerY: number = 300;
    private tweenTimer: number = 0.001;
    private decreasingAlpha: number = 0.18;
    private decreasingAlphaTimer: number = 100;
    private storeBetValue: number = 0;
    private bigWinValue: number = 25;
    private finalTextOnClick: any;
    private constantValue: number = 100;
    private bigWinTimer: number = 3000;
    private superWinTimer: number = 7000;
    private megaWinTime: number = 12000;
    private legendaryWinTime: number = 25000;
    private playEndSound: boolean = true;
    private winCelebrationStart: boolean = false;
    private screenClickOneTime: boolean = true;


    constructor(props: IProps) {
        super(props);
        this.app = props.app;

        this.alllanguage = alllanguage;
        this.state = {
            uiElements: [],
            lang: "en",
            width: this.props.width,
            height: this.props.height,
            pixelRatio: window.devicePixelRatio,
            resizing: false,
        }
        // this.winCelebrationContainer = React.createRef();
        this.winCelebrationContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";

        }
        this.tweening = [];

        this.thresholdSuperWin = 100;
        this.thresholdMegaWin = 200;
        this.thresholdLegendaryWin = 500;
        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));
    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    layoutChange(currentLayout: string) {
        this.setPortraitPosition();
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
    }


    componentDidMount() {
        if (this.props.showWinCelebration) {
            this.layoutChange(this.props.layoutMode);
        }
    }

    textTweening() {
        this.startWinSound = true;
        if (isMobile && window.innerWidth < window.innerHeight) {
            this.wincelebrationText = UIManager.getRef("text_WinCelebration_label_mobile_portrait");
        } else {
            this.wincelebrationText = UIManager.getRef("text_WinCelebration_label_" + this.ui_mode);
        }
        this.wincelebrationText.scale.set(this.lowerTargetValue);
        this.tweenTo(this.wincelebrationText.scale, 'x', this.higherTargetValue, this.T2000 / this.toConvertInSec, "easeOutElastic", null, () => { });
        this.tweenTo(this.wincelebrationText.scale, 'y', this.higherTargetValue, this.T2000 / this.toConvertInSec, "easeOutElastic", () => { }, () => { });
    }


    coinShower() {
        let coinConfig = {
            "alpha": {
                "start": 1,
                "end": 1
            },
            "scale": {
                "start": 0.3,
                "end": 0.6
            },
            "speed": {
                "start": 2000,
                "end": 2000
            },
            "acceleration": {
                "x": 10,
                "y": 1830
            },
            "startRotation": {
                "min": 250,
                "max": 290
            },
            "rotationSpeed": {
                "min": 100,
                "max": 150
            },
            "lifetime": {
                "min": 2,
                "max": 2
            },
            "blendMode": "normal",
            "frequency": 0.1,
            "emitterLifetime": -1,
            "maxParticles": 30,
            "pos": {
                "x": 900,
                "y": 1200
            },
            "addAtBack": false,
            "spawnType": "circle",
            "spawnCircle": {
                "x": 0,
                "y": 0,
                "r": 100
            }
        }

        let animmationconfig = {
            //framerate is required. It is the animation speed of the particle in frames per
            //second.
            //A value of "matchLife" causes the animation to match the lifetime of an individual
            //particle, instead of at a constant framerate. This causes the animation to play
            //through one time, completing when the particle expires.
            framerate: 30,
            //loop is optional, and defaults to false.
            loop: true,
            //textures is required, and can be an array of any (non-zero) length.
            textures: UIManager.getRef("coins_Anim").textures
        }
        this.Baseparticle = new BaseAnimatedparticle(UIManager.getRef("winCelebration_Container_" + this.ui_mode), animmationconfig, coinConfig)
    }

    setPortraitPosition() {
        let coinCointainer: any = UIManager.getRef("winCelebration_Container_" + this.ui_mode);
        if (isMobile && window.innerWidth < window.innerHeight) {
            coinCointainer && (coinCointainer.x = this.coinContainerX);
            coinCointainer && (coinCointainer.y = this.coinContainerY);
        } else {
            coinCointainer && (coinCointainer.x = 0);
            coinCointainer && (coinCointainer.y = 0);
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.spinStart != this.props.spinStart) {
            return false;
        }
        if (nextProps.soundIsPlaying !== this.props.soundIsPlaying) {
            if (nextProps.soundIsPlaying !== this.props.soundIsPlaying) {
                return false;
            }
            if (UIManager.getRef("Text_amount_tickup_" + this.ui_mode) !== undefined) {
                this.interactivityTrue(true);
                this.props.setActiveall(false);
                UIManager.getRef("Text_amount_tickup_" + this.ui_mode).visible = true;
                this.playEndSound = true;
                UIManager.getRef("Text_amount_tickup_" + this.ui_mode).objectInstance.startTickup(nextProps.totalCreditWinAmount / 100);
                this.coinShower();
            }
            return false;
        }

        if (nextProps.layoutMode !== this.props.layoutMode && nextProps.showWinCelebration) {
            this.layoutChange(nextProps.layoutMode)
            this.onOrientationChange();
            this.wincelebrationText.scale.set(this.higherTargetValue);
            return false;
        }
        if (nextProps.showWinCelebration && nextProps.showWinCelebration !== this.props.showWinCelebration) {
            return true;
        }
        if (nextProps.startWinCelebration && nextProps.startWinCelebration !== this.props.startWinCelebration) {
            this.activeWinCelebration(true);
            this.winCelebrationStart = true;
            this.screenClickOneTime = true;
            this.storeBetValue = this.props.betList[this.props.currentBetIndex] / this.constantValue;
            this.layoutChange(this.props.layoutMode);
            this.textTweening()
            this.tickupTextScaling();
            this.initialize();
            this.onOrientationChange();
            this.props.setActiveall(false);
            if (UIManager.getRef("Text_amount_tickup_" + this.ui_mode) !== undefined) {
                let timer = TIMER.TimerManager.createTimer(1700);
                timer.on('end', (e: any, data: any) => {
                    e.remove();
                    UIManager.getRef("winCelebrationContainer").alpha = 1;
                    this.interactivityTrue(true);
                    this.setTimeOfWin();
                    UIManager.getRef("Text_amount_tickup_" + this.ui_mode).visible = true;
                    this.playEndSound = true;
                    UIManager.getRef("Text_amount_tickup_" + this.ui_mode).objectInstance.startTickup(this.props.totalCreditWinAmount / this.constantValue);
                    this.coinShower();
                })
                timer.start();
            }
            return false;
        }
        return false;
    }

    setTimeOfWin() {
        if (this.props.totalCreditWinAmount / this.constantValue < this.thresholdSuperWin * this.storeBetValue) {
            UIManager.getRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.bigWinTimer;
            if (this.storeBetValue < 1) {
                UIManager.getRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.bigWinTimer
            }
        }
        else if (this.props.totalCreditWinAmount / this.constantValue >= this.thresholdSuperWin * this.storeBetValue && this.props.totalCreditWinAmount / this.constantValue < this.thresholdMegaWin * this.storeBetValue) {
            UIManager.getRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.superWinTimer;
            if (this.storeBetValue < 1) {
                UIManager.getRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.superWinTimer;
            }
        }
        else if (this.props.totalCreditWinAmount / this.constantValue >= this.thresholdMegaWin * this.storeBetValue && this.props.totalCreditWinAmount / this.constantValue < this.thresholdLegendaryWin * this.storeBetValue) {
            UIManager.getRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.megaWinTime;
            if (this.storeBetValue < 1) {
                UIManager.getRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.megaWinTime;
            }
        }
        else if (this.props.totalCreditWinAmount / this.constantValue >= this.thresholdLegendaryWin * this.storeBetValue) {
            UIManager.getRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.legendaryWinTime;
            if (this.storeBetValue < 1) {
                UIManager.getRef("Text_amount_tickup_" + this.ui_mode).tickuptime = this.legendaryWinTime;
            }
        }
    }

    interactivityTrue(value: boolean) {
        UIManager.getRef("winCelebrationContainer").interactive = true;

        if (isMobile) {
            UIManager.getRef("winCelebrationContainer").addListener('touchend', (evt: MouseEvent): void => {
                this.handleEvents();
            })
        } else {
            UIManager.getRef("winCelebrationContainer").click = (event: any) => {
                this.handleEvents();
            }
        }
    }

    onOrientationChange() {
        if (isMobile && window.innerWidth < window.innerHeight) {
            this.winCelebrationLabelPortrait.visible = true;
            this.wincelebrationText = this.winCelebrationLabelPortrait;
            this.winCelebrationLabelDL.visible = false;
            this.winCelebration_Graphic && (this.winCelebration_Graphic.width = configGame.CANVAS_HEIGHT);
            this.winCelebration_Graphic && (this.winCelebration_Graphic.height = configGame.CANVAS_WIDTH);

        } else {

            this.wincelebrationText = this.winCelebrationLabelDL;
            this.winCelebrationLabelDL && (this.winCelebrationLabelDL.visible = true);
            this.winCelebrationLabelPortrait && (this.winCelebrationLabelPortrait.visible = false);
            this.winCelebration_Graphic && (this.winCelebration_Graphic.width = configGame.CANVAS_WIDTH);
            this.winCelebration_Graphic && (this.winCelebration_Graphic.height = configGame.CANVAS_HEIGHT);
        }
    }

    tickupTextScaling() {
        const textTickup = UIManager.getRef("Text_amount_tickup_" + this.ui_mode);
        if (textTickup) {
            textTickup.scale.set(this.tickUpStartingScaling);
            let timer = TIMER.TimerManager.createTimer(this.tickUpScalingTimer);
            timer.on('repeat', (i: number) => {
                textTickup.scale.x += this.tickupScale;
                textTickup.scale.y += this.tickupScale;
                if (isMobile) {
                    if (textTickup.scale.x > this.maximumScalingOfTickUp) {
                        timer.stop();
                    }
                } else {
                    if (textTickup.scale.x > this.tickUpActualScaling) {
                        timer.stop();
                    }
                }
            });
            timer.start(true, this.tickUpScalingDelay);
        }
    }

    initialize() {
        this.winCelebrationLablePortraitName = "text_WinCelebration_label_mobile_portrait"
        this.winCelebrationLabelPortrait = UIManager.getRef(this.winCelebrationLablePortraitName);
        this.winCelebrationLableDLName = "text_WinCelebration_label_" + this.ui_mode
        this.winCelebrationLabelDL = UIManager.getRef("text_WinCelebration_label_" + this.ui_mode)
        this.winCelebration_Graphic = UIManager.getRef("winCelebration_Graphic");
        this.winCelebrationLabelPortrait && (UIManager.setText(this.winCelebrationLablePortraitName, this.props.langObj["winCelebration_bigWin"]));
        this.winCelebrationLabelDL && (UIManager.setText(this.winCelebrationLableDLName, this.props.langObj["winCelebration_bigWin"]));
        this.winCelebrationLabelDL && this.winCelebrationLabelDL.scale.set(this.lowerTargetValue);
        this.winCelebrationLabelPortrait && this.winCelebrationLabelPortrait.scale.set(this.lowerTargetValue);
    }

    addTweenEffects(obj: any, textUpdate: any) {
        this.tweenTo(obj.scale, 'x', this.lowerTargetValue, this.T100 / this.toConvertInSec, "easeInCubic", null, () => {
        });
        this.tweenTo(obj.scale, 'y', this.lowerTargetValue, this.T100 / this.toConvertInSec, "easeInCubic", null, () => {
            let textUpdateTimer = TIMER.TimerManager.createTimer(10);
            textUpdateTimer.on('end', (e: any) => {
                e.remove();
                this.winCelebrationLabelPortrait && (UIManager.setText(this.winCelebrationLablePortraitName, this.props.langObj[textUpdate]));
                this.winCelebrationLabelDL && (UIManager.setText(this.winCelebrationLableDLName, this.props.langObj[textUpdate]));

            });
            textUpdateTimer.start()
            this.tweenTo(obj.scale, 'x', this.higherTargetValue, this.T2000 / this.toConvertInSec, "easeOutElastic", null, () => {
            });
            this.tweenTo(obj.scale, 'y', this.higherTargetValue, this.T2000 / this.toConvertInSec, "easeOutElastic", () => {
            }, () => {
            });
        });
    }
    selectTextWithRange() {
        let finalAmount = this.props.totalCreditWinAmount / this.constantValue;
        if (finalAmount >= this.bigWinValue * this.storeBetValue && finalAmount < this.thresholdSuperWin * this.storeBetValue) {
            this.finalTextOnClick = this.props.langObj["winCelebration_bigWin"];
        }
        else if (finalAmount >= this.thresholdSuperWin * this.storeBetValue && finalAmount < this.thresholdMegaWin * this.storeBetValue) {
            this.finalTextOnClick = this.props.langObj["winCelebration_superWin"];
        }
        else if (finalAmount >= this.thresholdMegaWin * this.storeBetValue && finalAmount < this.thresholdLegendaryWin * this.storeBetValue) {
            this.finalTextOnClick = this.props.langObj["winCelebration_megaWin"];
        }
        else if (finalAmount >= this.thresholdLegendaryWin * this.storeBetValue) {
            this.finalTextOnClick = this.props.langObj["winCelebration_legendaryWin"];
        }
    }
    onTickupUpdate(e?: any) {
        if (e.value > (this.props.totalCreditWinAmount) / this.constantValue) {
            e.value = (this.props.totalCreditWinAmount) / this.constantValue;
        }
        this.storeBetValue = this.props.betList[this.props.currentBetIndex] / this.constantValue;
        if (e.name === "Text_amount_tickup_" + this.ui_mode) {
            if (this.tickUpValue === (this.props.totalCreditWinAmount) / this.constantValue) {
                e.value = (this.props.totalCreditWinAmount) / this.constantValue;
                this.selectTextWithRange();
                UIManager.getRef("text_WinCelebration_label_" + this.ui_mode).text = this.finalTextOnClick;
                if (isMobile && window.innerWidth < window.innerHeight) {
                    UIManager.getRef("text_WinCelebration_label_mobile_portrait").text = this.finalTextOnClick;
                }
            }
            if (this.props.showAmount === 'Cash') {
                e.updateTextFromOutside = true;
                e.text = CURRENCY.CurrencyManager.formatCurrencyString(e.value, true, true, true, true);
            }
            if (this.props.showAmount === 'Coin') {
                e.updateTextFromOutside = false;
            }
            if (e.value >= 0 && e.value < this.thresholdSuperWin * this.storeBetValue) {
                if (this.startWinSound) {
                    this.soundsOn("bigWinLoop", this.previousSound);
                    this.startWinSound = false;
                }
                this.currentCelebrationState = "BIGWIN";
            }
            if (e.value >= this.thresholdSuperWin * this.storeBetValue && e.value < this.thresholdMegaWin * this.storeBetValue && this.currentCelebrationState === "BIGWIN") {
                this.soundsOn("superWinLoop", this.previousSound);
                this.currentCelebrationState = "SUPERWIN";
                this.Baseparticle.maxParticles = 70;
                this.Baseparticle.frequency = 0.08;
                this.addTweenEffects(this.wincelebrationText, "winCelebration_superWin");
            }

            if (e.value >= this.thresholdMegaWin * this.storeBetValue && e.value < this.thresholdLegendaryWin * this.storeBetValue && this.currentCelebrationState === "SUPERWIN") {
                this.soundsOn("megaWinLoop", this.previousSound);
                this.currentCelebrationState = "MEGAWIN";
                this.Baseparticle.maxParticles = 120;
                this.Baseparticle.frequency = 0.05;
                this.addTweenEffects(this.wincelebrationText, "winCelebration_megaWin");
            }

            if (e.value >= this.thresholdLegendaryWin * this.storeBetValue && this.currentCelebrationState === "MEGAWIN") {
                this.soundsOn("ultraWinLoop", this.previousSound);
                this.currentCelebrationState = "LEGENDARYWIN";
                this.Baseparticle.maxParticles = 190;
                this.Baseparticle.frequency = 0.02;
                this.addTweenEffects(this.wincelebrationText, "winCelebration_legendaryWin");
            }
            this.tickUpValue = e.value;
        }
        this.onOrientationChange();
    }

    onTickupComplete(e?: any) {
        if (e != null) {
            e.value = (this.props.totalCreditWinAmount / 100).toFixed(2);
            let tickUpValue = CURRENCY.CurrencyManager.formatCurrencyString(e.value, true, true, true, true);
            UIManager.getRef("Text_amount_tickup_" + this.ui_mode) && (UIManager.setText("Text_amount_tickup_" + this.ui_mode, tickUpValue));
            this.Baseparticle.emit = false;
            if (e.value >= 0 && e.value < this.thresholdSuperWin * this.storeBetValue) {
                if (this.startWinSound) {
                    this.soundsOn("bigWinLoop", this.previousSound);
                    this.startWinSound = false;
                }
                this.winCelebrationLabelPortrait && (UIManager.setText(this.winCelebrationLablePortraitName, this.props.langObj["winCelebration_bigWin"]));
                this.winCelebrationLabelDL && (UIManager.setText(this.winCelebrationLableDLName, this.props.langObj["winCelebration_bigWin"]));
                this.winCelebrationLabelDL && this.winCelebrationLabelDL.scale.set(this.higherTargetValue);
                this.winCelebrationLabelPortrait && this.winCelebrationLabelPortrait.scale.set(this.higherTargetValue);
                this.currentCelebrationState = "BIGWIN";
            }
            if (e.value >= this.thresholdSuperWin * this.storeBetValue && e.value < this.thresholdMegaWin * this.storeBetValue && this.currentCelebrationState === "BIGWIN") {
                this.soundsOn("superWinLoop", this.previousSound);
                this.currentCelebrationState = "SUPERWIN";
                this.addTweenEffects(this.wincelebrationText, "winCelebration_superWin");
            }

            if (e.value >= this.thresholdMegaWin * this.storeBetValue && e.value < this.thresholdLegendaryWin * this.storeBetValue && this.currentCelebrationState === "SUPERWIN") {
                this.soundsOn("megaWinLoop", this.previousSound);

                this.currentCelebrationState = "MEGAWIN";
                this.addTweenEffects(this.wincelebrationText, "winCelebration_megaWin");
            }

            if (e.value >= this.thresholdLegendaryWin * this.storeBetValue && this.currentCelebrationState === "MEGAWIN") {
                this.soundsOn("ultraWinLoop", this.previousSound);
                this.currentCelebrationState = "LEGENDARYWIN";
                this.addTweenEffects(this.wincelebrationText, "winCelebration_legendaryWin");
            }
        }
        if (!this.isClicked) {
            if (e != null) {
                e.value = 0;
                this.CloseScreen.call(this);
            }
        }
    }


    tweenTo(object: any, property: any, target: any, time: any, easing: any, onchange: any, oncomplete: any, start?: number) {
        new Tween(
            [object], {
            [property]: { start: object[property], end: target }
        }, time || this.tweenTimer, easing, false, null, null, null, null, false, onchange, oncomplete
        );

    }

    soundsOn(current: any, previous: any) {
        if (this.props.soundIsPlaying) {
            this.props.stopSound([{ name: previous }]);
            this.props.playSound([{ name: current, loop: true, vol: 1 }]);
            this.previousSound = current;
        }
    }

    setWincelebrationGraphic() {
        if (isMobile && window.innerWidth < window.innerHeight) {
            this.winCelebration_Graphic && (this.winCelebration_Graphic.width = configGame.CANVAS_HEIGHT);
            this.winCelebration_Graphic && (this.winCelebration_Graphic.height = configGame.CANVAS_WIDTH);

        } else {
            this.winCelebration_Graphic && (this.winCelebration_Graphic.width = configGame.CANVAS_WIDTH);
            this.winCelebration_Graphic && (this.winCelebration_Graphic.height = configGame.CANVAS_HEIGHT);
        }
    }


    handleEvents() {
        this.isClicked = true;
        this.props.stopSound([{ name: this.previousSound }]);
        UIManager.getRef("Text_amount_tickup_" + this.ui_mode).objectInstance.stopTickup();
        this.tickUpValue = this.props.totalCreditWinAmount / 100;
        let timer = TIMER.TimerManager.createTimer(100);
        timer.on('end', (e: any) => {
            e.remove();
            this.isClicked = false;
            this.screenClickOneTime && this.CloseScreen();
            this.screenClickOneTime = false;
        });
        timer.start(false);

    }

    private activeWinCelebration(flg: boolean) {
        if (UIManager.getRef("winCelebrationContainer")) {
            UIManager.getRef("winCelebrationContainer").visible = flg;
        }

    }

    CloseScreen() {
        this.Baseparticle.emit = false;
        this.props.stopSound([{ name: this.previousSound }]);
        if (this.playEndSound && this.props.soundIsPlaying) {
            this.props.playSound([{ name: "winCelebrationStartSound", loop: false, vol: 0.7 }]);
            this.playEndSound = false;
        }

        let timer = TIMER.TimerManager.createTimer(this.decreasingAlphaTimer);
        timer.on('repeat', (i: number) => {
            UIManager.getRef("winCelebrationContainer").alpha -= this.decreasingAlpha;
            if (UIManager.getRef("winCelebrationContainer").alpha < 0) {
                timer.stop();
                this.tickUpValue = 0;
                if (((this.props.balance - this.props.coinList[this.props.selectedCoin] >= this.props.coinList[this.props.selectedCoin])) || this.props.winAmount > 0) {
                    !this.props.spinStart && this.props.setAllButtonEnable();
                }
                else {
                    if ((this.props.balance - this.props.coinList[this.props.selectedCoin]) > 0) {
                        !this.props.spinStart && this.props.particularButtonEnable(true);
                    }
                    else {
                        this.props.setAllButtonDisable();
                    }
                }
                this.props.winCelebrationShow(false);
                this.props.setActiveall(true);
                this.props.removeKeyBoardEvent(false);
                this.props.winCelebrationStart(false, "Cash");
                this.props.startIncreasingCounter(true);
                this.activeWinCelebration(false);
                UIManager.getRef("text_WinCelebration_label_" + this.ui_mode).text = "";
                UIManager.getRef("winCelebrationContainer").alpha = 1;
                this.props.setWinCelebrationForKeyboardListener(false);
            }
        });
        timer.start(true, this.handleEventTimer);
        let timer1 = TIMER.TimerManager.createTimer(250);
        timer1.on("end", (e: any) => {
            e.remove();
            if ((this.props.featureType == "BONUS" || this.props.featureType == "FREEGAME") || !this.props.featureJustReTriggered) {
                this.winCelebrationStart && this.nextPlayCommand();
            }
            this.props.setActiveall(true);
        });
        timer1.start();
    }

    private nextPlayCommand(): void {
        this.winCelebrationStart = false;
        let timer = TIMER.TimerManager.createTimer(1500);
        timer.on("end", (e: any) => {
            e.remove();
            this.tickUpValue = 0;
            this.props.winCelebrationShow(false);
            this.props.winCelebrationStart(false, "Cash");
            this.props.startIncreasingCounter(true);
            UIManager.getRef("text_WinCelebration_label_" + this.ui_mode).text = "";
            UIManager.getRef("winCelebrationContainer").alpha = 1;

            for (let i = 0; i < UIManager.getRef("winCelebrationContainer").children.length; i++) {
                UIManager.getRef("winCelebrationContainer").children[i].removeChildren();;
            }
            UIManager.getRef("winCelebrationContainer").removeChildren();
            UIManager.getRef("winCelebrationContainer").visible = false;
            this.winCelebrationContainer = {};

            this.props.setWinCelebrationForKeyboardListener(false);
            this.props.nextAutoplay();
            this.props.nextFreegame();
        });
        timer.start();
    }

    render() {
        if (!this.props.showWinCelebration) {
            return (<></>)
        }
        return (
            <UIManager id={"winCelebrationContainer"} name={"winCelebrationContainer"} type={"Container"} app={this.app}
                ref={i => this.winCelebrationContainer = i} alpha={0}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            app={this.app} configGame={configGame} constant={constant}
                            id={i.id} name={i.name === undefined ? 'i_name' : i.name} {...i} tickupupdate={this.onTickupUpdate.bind(this)}
                            tickupComplete={this.onTickupComplete.bind(this)} />)
                }
            </UIManager>
        );
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'reelgridState' | 'betPanelState' | 'freegameState' | 'winCelebrationState' | 'paytableState' | 'introductionState' | 'applicationState' | 'soundState' | 'basegameState' | 'behaviourState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        startWinCelebration: state.winCelebrationState.startWinCelebration,
        showAmount: state.winCelebrationState.showAmount,
        showWinCelebration: state.winCelebrationState.showWinCelebration,
        soundIsPlaying: state.soundState.soundIsPlaying,
        betList: state.basegameState.betList,
        currentBetIndex: state.basegameState.currentBetIndex,
        winAmount: state.basegameState.winAmount,
        totalCreditWinAmount: state.behaviourState.totalCreditWinAmount,
        featureJustReTriggered: state.freegameState.featureJustReTriggered,
        showRealityCheck: state.behaviourState.showRealityCheck,
        featureType: state.basegameState.featureType,
        balance: state.basegameState.balance,
        coinList: state.betPanelState.coinList,
        selectedCoin: state.betPanelState.selectedCoin,
        spinStart: state.reelgridState.spinStart,
        jurisdictionKey: state.applicationState.jurisdictionKey,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        winCelebrationShow: (showWinCelebration: boolean): any => dispatch(winCelebrationActions.winCelebrationShow(showWinCelebration)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        winCelebrationStart: (startWinCelebration: boolean, showAmount: string): any => dispatch(winCelebrationActions.winCelebrationStart(startWinCelebration, showAmount)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),
        nextAutoplay: (): any => dispatch(basegameAction.nextAutoplay()),
        nextFreegame: (): any => dispatch(freegameAction.nextFreegame()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setWinCelebrationForKeyboardListener: (winCelebrationForKeyBoardListener: boolean): any => dispatch(keyboardListenerActions.setWinCelebrationForKeyboardListener(winCelebrationForKeyBoardListener)),
        startIncreasingCounter: (counterStartIncreasing: any): any => dispatch(behaviourAction.startIncreasingCounter(counterStartIncreasing)),
        setActiveall: (isActiveAll: boolean): any => dispatch(basegameAction.setActiveall(isActiveAll)),
        removeKeyBoardEvent: (isRemoveKeyBoardEvent: boolean): any => dispatch(basegameAction.removeKeyBoardEvent(isRemoveKeyBoardEvent)),
        particularButtonEnable: (enableParticularButton: boolean): any => dispatch(buttonActions.particularButtonEnable(enableParticularButton)),

    }))(withWinCelebrationConfiguration(WinCelebration)));