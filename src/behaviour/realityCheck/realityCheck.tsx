import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import UIManager from "../../core/components/ui/UiBuilder";
import { alllanguage } from "../../data/lang/index";
import { Ilanguage } from "../../core/interface/Icommon";
import withRealityCheckConfiguration from "./configuration/withRealityCheckConfiguration";
import { isMobile } from "react-device-detect";
import { configGame, constant } from "../../data/config";
import { TIMER } from "../../core/utills";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as reelsActions } from "../../core/reducers/reelsStateReducer";
import { actions as reelsGridActions, actions as reelGridActions } from "../../core/reducers/reelgridStateReducer";
import { actions as gridsActions } from "../../core/reducers/gridStateReducer";
import { actions as asyncActions } from "../../core/reducers/asyncServerResponseReducer";
import { actions as winpresentationAction } from "../../core/reducers/winPresentationReducer";
import { actions as behaviourAction } from '../../gamereducer/behaviourReducer';
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

class RealityCheck extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected realityCheckContainer: _ReactPixi.IContainer | Ref<any>;
    private alllanguage: Ilanguage;
    protected tweening: any;
    protected ui_mode: string;
    protected displayUI: any;
  
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
        this.realityCheckContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";

        }
        this.tweening = [];
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
        }
        )
    }
    bindUI() {
        this.layoutChange(this.props.layoutMode);
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode
            || nextProps.inSpinning !== this.props.inSpinning
            || nextProps.blastStart !== this.props.blastStart
            || nextProps.showWinShower !== this.props.showWinShower
            || nextProps.showWinCelebration !== this.props.showWinCelebration) {
            if (nextProps.layoutMode) {
                this.layoutChange(nextProps.layoutMode);

            }
            if ((!nextProps.inSpinning && nextProps.inSpinning !== this.props.inSpinning)) {
                if (nextProps.winAmount == 0) {
                    this.props.showRealityCheck && (UIManager.getRef("realityCheckContainer").visible = true);
                    this.props.showRealityCheck && this.setTime(this);
                    this.props.showRealityCheck && nextProps.setAllButtonDisable();
                }
            }

            if ((!nextProps.showWinShower && nextProps.showWinShower !== this.props.showWinShower) || (!nextProps.showWinCelebration && nextProps.showWinCelebration !== this.props.showWinCelebration)) {
                this.props.showRealityCheck && (UIManager.getRef("realityCheckContainer").visible = true);
                this.props.showRealityCheck && this.setTime(this);
            }
            return false;
        }
        if (nextProps.showRealityCheck !== this.props.showRealityCheck) {
            nextProps.showRealityCheck && nextProps.setAllButtonDisable();
            return true;
        }
        return false;
    }
    
    startTimerAgain() {
        let timer = TIMER.TimerManager.createTimer(this.props.realityCheckTimePassedInSeconds ? this.props.realityCheckTimePassedInSeconds : this.props.realityCheckTimeoutInSeconds);
        timer.on('end', (e: any) => {
            this.props.realityCheckVisible(true);
            timer && timer.stop();         
            timer && timer.remove();
        })
        timer.start();
       
    }

    handleEvent = (e: any) => {
        switch (e.target.name) {
            case "continue_btn_" + this.ui_mode:
                this.props.realityCheckVisible(false);
                this.props.setAllButtonEnable();
                this.startTimerAgain();
                return;
            case "quit_btn_" + this.ui_mode:
                (window as any).top.location.href = "https://social-bridge-staging.gamesrvr.net/gameLauncher";
                return;
            default:
                return 'No buttons';
        }
    }

    setTime(event: any) {
        let time = new Date().getTime();
        let totalTime: any = ((time - this.props.storeCurrentTimeForRC) / 60000).toFixed(2);
        if (!isMobile) {
            if (this.props.languageCode === 'tr' || this.props.languageCode === 'hu')
                 {
                UIManager.setText("rc_text_2", (totalTime / 60).toFixed(0) + " " + this.props.langObj["realityCheckText3"] + " " + (totalTime % 60).toFixed(2) + " " + this.props.langObj["realityCheckText4"] + " " + this.props.langObj["realityCheckText2"]);
            } else {
                UIManager.setText("rc_text_2", this.props.langObj["realityCheckText2"] + " " + (totalTime / 60).toFixed(0) + " " + this.props.langObj["realityCheckText3"] + " " + (totalTime % 60).toFixed(2) + " " + this.props.langObj["realityCheckText4"]);
            }
        } else {
            if (this.props.languageCode === 'tr' || this.props.languageCode === 'hu') {
                UIManager.setText("rc_text_2_mobile", (totalTime / 60).toFixed(0) + " " + this.props.langObj["realityCheckText3"] + " " + (totalTime % 60).toFixed(2) + " " + this.props.langObj["realityCheckText4"] + " " + this.props.langObj["realityCheckText2"]);
            } else {
                UIManager.setText("rc_text_2_mobile", this.props.langObj["realityCheckText2"] + " " + (totalTime / 60).toFixed(0) + " " + this.props.langObj["realityCheckText3"] + " " + (totalTime % 60).toFixed(2) + " " + this.props.langObj["realityCheckText4"]);
            }
        }
    }
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        this.bindUI();
        if (this.props.spinStart || this.props.inSpinning) {
            (UIManager.getRef("realityCheckContainer").visible = false);
        }
        else {
            this.props.showRealityCheck && this.setTime(this);
        }
    }

    render() {
        if (!this.props.showRealityCheck) {
            return (<></>)
        }
        return (
            <UIManager id={"realityCheckContainer"} name={"realityCheckContainer"} type={"Container"}
                ref={i => this.realityCheckContainer = i}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            app={this.app} configGame={configGame} constant={constant}
                            id={i.id} name={i.name} {...i} ClickHandler={this.handleEvent} scope={this} />)
                }
            </UIManager>
        );
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'behaviourState' | 'reelgridState' | 'gridsState' | 'reelsState' | 'basegameState' | 'winShowerState' | 'winCelebrationState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        languageCode: state.applicationState.languageCode,
        realityCheckTimePassedInSeconds: state.applicationState.realityCheckTimePassedInSeconds,
        realityCheckTimeoutInSeconds: state.applicationState.realityCheckTimeoutInSeconds,
        showRealityCheck: state.behaviourState.showRealityCheck,
        inSpinning: state.reelgridState.inSpinning,
        blastStart: state.reelgridState.blastStart,
        winAmount: state.basegameState.winAmount,
        showWinShower: state.winShowerState.showWinShower,
        showWinCelebration: state.winCelebrationState.showWinCelebration,
        storeCurrentTimeForRC: state.behaviourState.storeCurrentTimeForRC,
        spinStart: Number(configGame["SPIN_TYPE"]) === 1 && state.gridsState.spinStart || Number(configGame["SPIN_TYPE"]) === 2 && state.reelgridState.spinStart || state.reelsState.spinStart,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({

        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        resetReelState: (): any => dispatch(Number(configGame["SPIN_TYPE"]) === 0 && reelsActions.resetReelState() || Number(configGame["SPIN_TYPE"]) === 1 && gridsActions.resetReelState() || configGame["SPIN_TYPE"] === 2 && reelsGridActions.resetReelState()),
        realityCheckVisible: (showRealityCheck: boolean): any => dispatch(behaviourAction.realityCheckVisible(showRealityCheck)),
    }))(withRealityCheckConfiguration(RealityCheck)));