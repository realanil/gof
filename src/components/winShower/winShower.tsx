import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import UIManager from "../../core/components/ui/UiBuilder";
import { alllanguage } from "../../data/lang/index";
import { Ilanguage } from "../../core/interface/Icommon";
import withWinShowerConfiguration from "./configuration/withWinShowerConfiguration";
import { isMobile } from "react-device-detect";
import { configGame, constant } from "../../data/config";
import { CURRENCY } from "../../core/utills";
import { actions as winShowerActions } from "../../gamereducer/winShowerReducer";
import { BaseAnimatedparticle } from "../../core/components/effect/baseanimatedparticle";
import { TIMER } from "../../core/utills";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as soundActions } from "../../core/reducers/soundReducer";
import { Tween } from "../../core/components/effect/tween";
import { actions as basegameAction } from "../../core/reducers/baseGameReducer";
import { actions as freegameAction } from "../../core/reducers/freeGameReducer";
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

class WinShower extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected winShowerContainer: _ReactPixi.IContainer | Ref<any>;
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
    protected currentCelebrationState: any
    private tweenTimer: number = 0.001;
    private level_1: number = 2000;
    private level_2: number = 3000;
    private level_3: number = 4000;
    private level_4: number = 5000;
    private threshold_level_1 = 5;
    private threshold_level_2 = 10;
    private threshold_level_3 = 20;
    private threshold_level_4 = 25;
    private constantValue: number = 100;
    private storeBetValue: number = 0;
    private frequency_1: number = 0.2;
    private frequency_2: number = 0.15;
    private frequency_3: number = 0.1;
    private frequency_4: number = 0.08;
    private maxParticle_1: number = 20;
    private maxParticle_2: number = 60;
    private maxParticle_3: number = 100;
    private maxParticle_4: number = 140;
    private isClicked: boolean = false;

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
        this.winShowerContainer = React.createRef();
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
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
    }


    componentDidMount() {
        if (this.props.showWinShower) {
            this.layoutChange(this.props.layoutMode);

        }
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
                "max": 4
            },
            "frequency": 0.1,
            "emitterLifetime": -1,

            "maxParticles": 20,
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
            framerate: 30,
            loop: true,
            textures: UIManager.getRef("coins_Anim").textures
        }
        this.Baseparticle = new BaseAnimatedparticle(UIManager.getRef("winShower_Container_" + this.ui_mode), animmationconfig, coinConfig)
    }



    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.soundIsPlaying !== this.props.soundIsPlaying
            || nextProps.showWinShower !== this.props.showWinShower
            || nextProps.startWinShower !== this.props.startWinShower
            || nextProps.layoutMode !== this.props.layoutMode) {
            if (nextProps.soundIsPlaying !== this.props.soundIsPlaying) {
                return false;
            }
            if (nextProps.layoutMode !== this.props.layoutMode && this.props.showWinShower) {
                this.layoutChange(nextProps.layoutMode);

            }
            if (nextProps.showWinShower && nextProps.showWinShower !== this.props.showWinShower) {

                this.isClicked = false;
                this.activeWinShower(true)
                this.props.winShowerSoundStop(false);

                return true;
            }
            if (nextProps.startWinShower && nextProps.startWinShower !== this.props.startWinShower) {

                this.activeWinShower(true)
                this.props.winShowerSoundStop(false);

                this.storeBetValue = this.props.betList[this.props.currentBetIndex] / this.constantValue;

                this.coinShower();
                UIManager.getRef("amount_tickup_" + this.ui_mode).visible = false;
                this.interactivityTrue(true);
                let timer = TIMER.TimerManager.createTimer(100);
                timer.on('end', (e: any) => {
                    e.remove();
                    UIManager.getRef("amount_tickup_" + this.ui_mode).visible = true;
                    this.setTimeOfWin();
                    UIManager.getRef("amount_tickup_" + this.ui_mode).objectInstance.startTickup(nextProps.winShowerAmount);
                });
                timer.start();
            }
            return false;
        }
        return true;
    }

    private activeWinShower(flg: boolean) {
        if (UIManager.getRef("winShowerContainer")) {
            UIManager.getRef("winShowerContainer").visible = flg;
        }

    }

    interactivityTrue(value: boolean) {
        UIManager.getRef("winShowerContainer").interactive = true;
        if (isMobile) {
            UIManager.getRef("winShowerContainer").addListener('touchend', (evt: MouseEvent): void => {
                this.handleEvents();
            })
        } else {
            UIManager.getRef("winShowerContainer").click = (event: any) => {
                this.handleEvents();
            }
        }
    }
    handleEventMouseOver() { }
    handleEventMouseOut() { }
    handleEvents() {
        this.isClicked = true;
        this.Baseparticle.emit = false;
        //this.props.winShowerSoundStop(true);
    }
    setTimeOfWin() {
        if (this.props.totalCreditWinAmount / this.constantValue < this.threshold_level_1 * this.storeBetValue) {
            this.Baseparticle.maxParticles = this.maxParticle_1;
            this.Baseparticle.frequency = this.frequency_1;
            UIManager.getRef("amount_tickup_" + this.ui_mode).tickuptime = this.level_1;

        }
        else if (this.props.totalCreditWinAmount / this.constantValue >= this.threshold_level_1 * this.storeBetValue && this.props.totalCreditWinAmount / this.constantValue < this.threshold_level_2 * this.storeBetValue) {
            this.Baseparticle.maxParticles = this.maxParticle_2;
            this.Baseparticle.frequency = this.frequency_2;
            UIManager.getRef("amount_tickup_" + this.ui_mode).tickuptime = this.level_2;
        }
        else if (this.props.totalCreditWinAmount / this.constantValue >= this.threshold_level_2 * this.storeBetValue && this.props.totalCreditWinAmount / this.constantValue < this.threshold_level_3 * this.storeBetValue) {
            this.Baseparticle.maxParticles = this.maxParticle_3;
            this.Baseparticle.frequency = this.frequency_3;
            UIManager.getRef("amount_tickup_" + this.ui_mode).tickuptime = this.level_3;

        }
        else if (this.props.totalCreditWinAmount / this.constantValue >= this.threshold_level_4 * this.storeBetValue) {
            this.Baseparticle.maxParticles = this.maxParticle_4;
            this.Baseparticle.frequency = this.frequency_4;
            UIManager.getRef("amount_tickup_" + this.ui_mode).tickuptime = this.level_4;
        }
    }

    onTickupUpdate(e?: any) {
        if (this.isClicked) {
            e.value = this.props.winShowerAmount;
            this.props.winShowerSoundStop(true);
        }
        e.updateTextFromOutside = true;
        e.text = CURRENCY.CurrencyManager.formatCurrencyString(e.value, true, true, true, true);
    }

    tweenTo(object: any, property: any, target: any, time: any, easing: any, onchange: any, oncomplete: any, start?: number) {
        new Tween(
            [object], {
            [property]: { start: object[property], end: target }
        },
            time || this.tweenTimer, easing, false, null, null, null, null, false, onchange, oncomplete
        );

    }
    onTickupComplete(e?: any) {
        e.value = (this.props.winShowerAmount);
        this.Baseparticle.emit = false;
        this.props.winShowerSoundStop(true);
        let tickUpValue = CURRENCY.CurrencyManager.formatCurrencyString(e.value, true, true, true, true);
        UIManager.getRef("amount_tickup_" + this.ui_mode) && (UIManager.setText("amount_tickup_" + this.ui_mode, tickUpValue));

        if (this.isClicked) {
            this.onSkip();
            return;
        }
        let timer = TIMER.TimerManager.createTimer(400);
        timer.on('end', (e: any) => {
            e.remove();
            UIManager.getRef("amount_tickup_" + this.ui_mode).alpha = 1;
            this.tweenTo(UIManager.getRef("amount_tickup_" + this.ui_mode), 'alpha', 0, 0.8, "easeInCubic", null, () => {
                UIManager.getRef("amount_tickup_" + this.ui_mode).visible = false;
                UIManager.getRef("amount_tickup_" + this.ui_mode).alpha = 1;
            });
            this.waitForcoinfalldown();          
            
            this.isClicked = false;
        });
        timer.start();




    }

    private waitForcoinfalldown(): void {
        let timer = TIMER.TimerManager.createTimer(1500);
        timer.on('end', (e: any) => {
            e.remove();
            this.props.winShowerStart(false);
            this.props.startIncreasingCounter(true);
            this.props.winShowerShow(false);
            this.props.setActiveall(true);
            this.props.removeKeyBoardEvent(false);
            this.props.winShowerSoundStop(false);
            this.activeWinShower(false);
            if ((this.props.featureType == "BONUS" || this.props.featureType == "FREEGAME") || !this.props.featureJustReTriggered) {
                this.nextPlayCommand();
            }
            if (((this.props.balance - this.props.coinList[this.props.selectedCoin] >= this.props.coinList[this.props.selectedCoin]) || this.props.winAmount > 0)) {
                this.props.setAllButtonEnable();
            }
            else {
                if ((this.props.balance - this.props.coinList[this.props.selectedCoin]) > 0) {
                    this.props.particularButtonEnable(true);
                }
                else {
                    this.props.setAllButtonDisable();
                }
            }
            this.clearAllChild();
        });
        timer.start();
    }
    private onSkip(): void {
        let timer = TIMER.TimerManager.createTimer(30);
        timer.on('end', (e: any) => {
            e.remove();
            UIManager.getRef("amount_tickup_" + this.ui_mode).alpha = 1;
            UIManager.getRef("amount_tickup_" + this.ui_mode).visible = false;
            this.props.winShowerStart(false);
            this.props.startIncreasingCounter(true);
            this.props.winShowerShow(false);
            this.props.setActiveall(true);
            this.props.removeKeyBoardEvent(false);
            this.props.winShowerSoundStop(false);
            this.activeWinShower(false);
            if (((this.props.balance - this.props.coinList[this.props.selectedCoin] >= this.props.coinList[this.props.selectedCoin]) || this.props.winAmount > 0)) {
                this.props.setAllButtonEnable();
            }
            else {
                if ((this.props.balance - this.props.coinList[this.props.selectedCoin]) > 0) {
                    this.props.particularButtonEnable(true);
                }
                else {
                    this.props.setAllButtonDisable();
                }
            }
            this.isClicked = false;
            if ((this.props.featureType == "BONUS" || this.props.featureType == "FREEGAME") || !this.props.featureJustReTriggered) {
                this.nextPlayCommand();
            }
            this.clearAllChild();
        });
        timer.start();


    }

    private nextPlayCommand(): void {
        this.props.nextAutoplay();
        this.props.nextFreegame();
    }

    private clearAllChild(): void {
        for (let i = 0; i < UIManager.getRef("winShowerContainer").children.length; i++) {
            UIManager.getRef("winShowerContainer").children[i].removeChildren();;
        }
        UIManager.getRef("winShowerContainer").removeChildren();
        UIManager.getRef("winShowerContainer").visible = false;
        this.winShowerContainer = {};
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        UIManager.getRef("winShowerContainer") && (UIManager.getRef("winShowerContainer").visible = true);
        if (this.props.showWinShower) {
            this.layoutChange(this.props.layoutMode);
        }

    }


    render() {
        if (!this.props.showWinShower) {
            return (<></>)
        }
        return (
            <UIManager id={"winShowerContainer"} name={"winShowerContainer"} type={"Container"} app={this.app}
                ref={i => this.winShowerContainer = i}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            app={this.app} configGame={configGame} constant={constant}
                            id={i.id} name={i.name} {...i} tickupupdate={this.onTickupUpdate.bind(this)}
                            tickupComplete={this.onTickupComplete.bind(this)} mouseOver={this.handleEventMouseOver} mouseOut={this.handleEventMouseOut} />)
                }
            </UIManager>
        );
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'betPanelState' | 'freegameState' | 'winShowerState' | 'behaviourState' | 'applicationState' | 'basegameState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        startWinShower: state.winShowerState.startWinShower,
        showWinShower: state.winShowerState.showWinShower,
        winShowerAmount: state.winShowerState.winShowerAmount,
        betList: state.basegameState.betList,
        currentBetIndex: state.basegameState.currentBetIndex,
        totalCreditWinAmount: state.behaviourState.totalCreditWinAmount,
        featureJustReTriggered: state.freegameState.featureJustReTriggered,
        showRealityCheck: state.behaviourState.showRealityCheck,
        featureType: state.basegameState.featureType,
        balance: state.basegameState.balance,
        coinList: state.betPanelState.coinList,
        selectedCoin: state.betPanelState.selectedCoin,
        jurisdictionKey: state.applicationState.jurisdictionKey,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        nextAutoplay: (): any => dispatch(basegameAction.nextAutoplay()),
        nextFreegame: (): any => dispatch(freegameAction.nextFreegame()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        winShowerStart: (startWinShower: boolean, winShowerAmount: number): any => dispatch(winShowerActions.winShowerStart(startWinShower, winShowerAmount)),
        winShowerShow: (showWinShower: boolean): any => dispatch(winShowerActions.winShowerShow(showWinShower)),
        winShowerSoundStop: (stopWinShowerSound: boolean): any => dispatch(winShowerActions.winShowerSoundStop(stopWinShowerSound)),
        startIncreasingCounter: (counterStartIncreasing: any): any => dispatch(behaviourAction.startIncreasingCounter(counterStartIncreasing)),
        setActiveall: (isActiveAll: boolean): any => dispatch(basegameAction.setActiveall(isActiveAll)),
        removeKeyBoardEvent: (isRemoveKeyBoardEvent: boolean): any => dispatch(basegameAction.removeKeyBoardEvent(isRemoveKeyBoardEvent)),
        particularButtonEnable: (enableParticularButton: boolean): any => dispatch(buttonActions.particularButtonEnable(enableParticularButton)),

    }))(withWinShowerConfiguration(WinShower)));