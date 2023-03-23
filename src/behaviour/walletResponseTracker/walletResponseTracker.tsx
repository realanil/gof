import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import UIManager from "../../core/components/ui/UiBuilder";
import { alllanguage } from "../../data/lang/index";
import { Ilanguage } from "../../core/interface/Icommon";
import withWalletResponseTrackerConfiguration from "./configuration/withWalletResponseTrackerConfiguration";
import { isMobile } from "react-device-detect";
import { configGame, constant } from "../../data/config";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { actions as gameLevelResponseActions } from "../../gamereducer/asyncGameLevelServerResponseReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
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
}

interface IState {
    [x: string]: any;
}

class WalletResponseTracker extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected walletResponseTrackerContainer: _ReactPixi.IContainer | Ref<any>;
    private alllanguage: Ilanguage;
    protected tweening: any;
    protected ui_mode: string;
    protected displayUI: any;
    protected currentTime: number = 0;
    protected storePreviousTime: number = 0;
    protected walletResponseHitTimer: number = 30000;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.alllanguage = alllanguage;
        this.state = {
            uiElements: [],
            lang: "en",
        }
        this.walletResponseTrackerContainer = React.createRef();
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";

        }
        this.currentTime = new Date().getTime();
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

        // this.layoutChange(this.props.layoutMode);
        // let timer = TIMER.TimerManager.createTimer(10000);
        // timer.on("repeat", () => {
        //  });
        //  timer.start(true, 0);

    }





    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.isInitResponseReceived != this.props.isInitResponseReceived
            || nextProps.spinResult != this.props.spinResult
            || nextProps.initResult != this.props.initResult
            || nextProps.increaseBetResult != this.props.increaseBetResult
            || nextProps.requestSent != this.props.requestSent) {
            this.storePreviousTime = new Date().getTime() - this.currentTime;

            if (nextProps.requestSent != this.props.requestSent) {
                if (this.storePreviousTime > this.walletResponseHitTimer) {
                    this.props.getApplicationWalletResponse();
                    this.currentTime = new Date().getTime();

                }
                nextProps.setRequestSent(false);

            }
            else {
                if (this.storePreviousTime < this.walletResponseHitTimer) {
                    this.currentTime = new Date().getTime();
                } else {
                    this.props.getApplicationWalletResponse();
                    this.currentTime = new Date().getTime();
                }
            }


            return false;
        }
        return false;

    }
    render() {
        return (
            <UIManager id={"walletResponseTrackerContainer"} name={"walletResponseTrackerContainer"}
             type={"Container"}  app={this.app} configGame={configGame}
                ref={i => this.walletResponseTrackerContainer = i}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            app={this.app} configGame={configGame} constant={constant}
                            id={i.id} name={i.name} {...i}
                        />)
                }
            </UIManager>
        );
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'asyncInitAction' | 'applicationState' | 'gameactionstate' | 'asyncServerAction' | 'asyncGameLevelSeverState' | 'behaviourState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        isInitResponseReceived: state.asyncInitAction.isInitResponseReceived,
        spinResult: state.asyncServerAction.result,
        initResult: state.asyncInitAction.result,
        actionResult: state.gameactionstate.result,
        increaseBetResult: state.asyncGameLevelSeverState.result,
        requestSent: state.behaviourState.requestSent,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        getApplicationWalletResponse: (): any => dispatch(gameLevelResponseActions.getApplicationWalletResponse()),
        setRequestSent: (requestSent: boolean): any => dispatch(behaviourAction.setRequestSent(requestSent)),
    }))(withWalletResponseTrackerConfiguration(WalletResponseTracker)));