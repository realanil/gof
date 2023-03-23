import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withFreeGameConfiguration from "../../core/components/freegame/configuration/withFreeGameConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import { actions as layoutsActions } from "../../core/reducers/layoutsStateReducer";
import PIXI from "pixi.js";
import { isMobile } from "react-device-detect";
import { configGame } from "../../data/config";
import { actions as asyncActions } from "../../core/reducers/asyncServerResponseReducer";
import { actions as winpresentationAction } from "../../core/reducers/winPresentationReducer";
import { actions as reelGridActions, actions as reelgridAction } from "../../core/reducers/reelgridStateReducer";
import { actions as flowManagerAction } from "../../core/reducers/flowManagerReducer";
import { actions as aplicationActions } from "../../core/reducers/applicationStateReducer";

interface IProps {
    [x: string]: any;
}

interface IStore {
    [x: string]: any;
}

interface IStateToProps {
    layoutMode: string,
    inFreeGame: any,
    soundIsPlaying: any,
    freegameNextSpin: any,
    spinResponseReceived: any,
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class GofFreeGameBaseLayer extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected gofFreeGameBaseLayerContainer: _ReactPixi.IContainer | Ref<any>;
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
    protected manywaysTextPortraitScalingX: number = 0.7;
    protected manywaysTextPortraitScalingY: number = 0.8;
    private minFullHDWidth: number = 1024;
    private HDReadyWidth: number = 1280;
    private fullHDWidth: number = 1920;
    private minFullHDPxRatio: number = 2;
    private canvasBgImagePage: string = "";

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en",
            isSpinning: false,
        }
        // this.gofFreeGameBaseLayerContainer = React.createRef();
        this.gofFreeGameBaseLayerContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.logoAnimIntervalTime = 11050;
        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
        this.chooseAssets();
        this.props.setApplicationButtonpanelVisibility(false);
    }

    static getDerivedStateFromProps(newProp: IProps, newState: IState): IState {
        if (newProp.isSpinning) {
            return {
                ...newState,
                isSpinning: newProp.isSpinning
            }
        }
        return newState;
    }

    onSpin() {
        this.props.getApplicationFreeSpinResponse();
        this.props.stopWinPresentation();
        this.props.resetReelState();
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
        }
        )
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode
            || nextProps.inFreeGame !== this.props.inFreeGame
            || nextProps.freegameNextSpin != this.props.freegameNextSpin
            || nextProps.spinResponseReceived != this.props.spinResponseReceived) {
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode);
            }
            if (nextProps.freegameNextSpin && nextProps.inFreeGame && nextProps.freegameNextSpin != this.props.freegameNextSpin) {
                this.onSpin();
            }
            if (nextProps.spinResponseReceived && nextProps.spinResponseReceived !== this.props.spinResponseReceived) {
                this.props.flowManagerCalled(false);
                // this.props.resetReelState();
                const {
                    startSpin
                } = nextProps;
                startSpin();
            }
            return false;
        }
        return true;
    }

    //this method will call after the first rendering for scaling and logo animation looping
    bindUI() {
        this.layoutChange(this.props.layoutMode);
    }

    handleEvent = (e: any) => {
    }

    componentDidUpdate() {
        if (isMobile) {
            this.freeGameFramesInsidePortionImage = UIManager.getRef("frameReel_FG_Image_Mob");
            if (window.innerWidth < window.innerHeight) {
                this.freeGameFramesInsidePortionImage && (this.freeGameFramesInsidePortionImage.scale.x = this.frameInsideScalingX);
                this.freeGameFramesInsidePortionImage && (this.freeGameFramesInsidePortionImage.scale.y = this.frameInsideScalingY);
            }
            else {
                this.freeGameFramesInsidePortionImage && (this.freeGameFramesInsidePortionImage.scale.x = this.originalScalingOfObject);
                this.freeGameFramesInsidePortionImage && (this.freeGameFramesInsidePortionImage.scale.y = this.originalScalingOfObject);
            }
        }
    }

    componentDidMount() {
        this.bindUI();
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
        return (
            <UIManager id={"freeGameGenericUIContainer"} type={"Container"} name={"freeGameGenericUIContainer"} app={this.app}
                ref={i => this.gofFreeGameBaseLayerContainer = i}>
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
    (state: Pick<IStore, 'freegameState' | 'basegameState' | 'applicationState' | 'soundState' | 'reelgridState'>): IStateToProps =>
    ({
        inFreeGame: state.freegameState.inFreeGame,
        layoutMode: state.applicationState.layoutMode,
        // winAmount: state.basegameState.winAmount,
        soundIsPlaying: state.soundState.soundIsPlaying,
        freegameNextSpin: state.freegameState.freegameNextSpin,
        spinResponseReceived: state.reelgridState.spinResponseReceived,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutsActions.setApplicationLayoutObject(layoutobjectlist)),
        getApplicationFreeSpinResponse: (): any => dispatch(asyncActions.getApplicationFreeSpinResponse()),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        startSpin: (): any => dispatch(reelgridAction.startSpin()),
        flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager)),
        resetReelState: (): any => dispatch(reelGridActions.resetReelState()),
        setApplicationButtonpanelVisibility: (visible: boolean): any => dispatch(aplicationActions.setApplicationButtonpanelVisibility(visible)),
    }))(withFreeGameConfiguration(GofFreeGameBaseLayer)));