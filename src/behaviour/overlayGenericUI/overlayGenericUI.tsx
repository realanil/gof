import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { IStore } from "../../core/store/IStore";
import { Dispatch } from "redux";
import withOverlayConfiguration from "../../core/components/overlay/configuration/withOverlayConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import PIXI from "pixi.js";
import { configGame } from "../../data/config";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { isMobile } from "react-device-detect";
import { actions as autoplayActions } from "../../core/reducers/autoplayReducer";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as baseGameActions } from "../../core/reducers/baseGameReducer";
import { actions as asyncActions } from "../../core/reducers/asyncServerResponseReducer";
import { actions as winpresentationAction } from "../../core/reducers/winPresentationReducer";
import { actions as reelsActions } from "../../core/reducers/reelsStateReducer";
import { actions as gridsActions } from "../../core/reducers/gridStateReducer";
import { actions as reelgridActions } from "../../core/reducers/reelgridStateReducer";


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

class OverlayGenericUI extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected overlayGenericUIContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            autoplayContentShow: true,
            buttonSelected: "",
            uiElements: [],
            lang: "en"
        }
        this.overlayGenericUIContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }

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

    //when layout changes, this method will be called
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
    }

    //this method will be called when a button gets clicked
    handleEventMouseOver = (e: any) => {
        if (!this.props.showPaytable && !this.props.showSettingPanelUI && !this.props.showAutoplay) {

            this.displayUI.map((data: any, j: number) => {
                if (data.name.startsWith("line_button_")) {
                    UIManager.getRef(data.name).buttonMode = true;
                }
            }
            )
            switch (e.currentTarget.name) {
                case "line_button_1":
                    UIManager.getRef("payline_button_1").visible = true;
                    return;
                case "line_button_2":
                    UIManager.getRef("payline_button_2").visible = true;
                    return;
                case "line_button_3":
                    UIManager.getRef("payline_button_3").visible = true;
                    return;
                case "line_button_4":
                    UIManager.getRef("payline_button_4").visible = true;
                    return;
                case "line_button_5":
                    UIManager.getRef("payline_button_5").visible = true;
                    return;
                case "line_button_6":
                    UIManager.getRef("payline_button_6").visible = true;
                    return;
                case "line_button_7":
                    UIManager.getRef("payline_button_7").visible = true;
                    return;
                case "line_button_8":
                    UIManager.getRef("payline_button_8").visible = true;
                    return;
                case "line_button_9":
                    UIManager.getRef("payline_button_9").visible = true;
                    return;
                case "line_button_10":
                    UIManager.getRef("payline_button_10").visible = true;
                    return;
                case "line_button_11":
                    UIManager.getRef("payline_button_11").visible = true;
                    return;
                case "line_button_12":
                    UIManager.getRef("payline_button_12").visible = true;
                    return;
                case "line_button_13":
                    UIManager.getRef("payline_button_13").visible = true;
                    return;
                case "line_button_14":
                    UIManager.getRef("payline_button_14").visible = true;
                    return;
                case "line_button_15":
                    UIManager.getRef("payline_button_15").visible = true;
                    return;
                case "line_button_16":
                    UIManager.getRef("payline_button_16").visible = true;
                    return;
                case "line_button_17":
                    UIManager.getRef("payline_button_17").visible = true;
                    return;
                case "line_button_18":
                    UIManager.getRef("payline_button_18").visible = true;
                    return;
                case "line_button_19":
                    UIManager.getRef("payline_button_19").visible = true;
                    return;
                case "line_button_20":
                    UIManager.getRef("payline_button_20").visible = true;
                    return;
                default:
                    return 'No buttons';
            }
        }
        else {

            this.displayUI.map((data: any, j: number) => {
                if (data.name.startsWith("line_button_")) {
                    UIManager.getRef(data.name).buttonMode = false;
                }
            }
            )
        }
    }



    handleEventMouseOut = (e: any) => {
        if (!this.props.showPaytable && !this.props.showSettingPanelUI && !this.props.showAutoplay) {
            switch (e.currentTarget.name) {
                case "line_button_1":
                    UIManager.getRef("payline_button_1").visible = false;
                    return;
                case "line_button_2":
                    UIManager.getRef("payline_button_2").visible = false;
                    return;
                case "line_button_3":
                    UIManager.getRef("payline_button_3").visible = false;
                    return;
                case "line_button_4":
                    UIManager.getRef("payline_button_4").visible = false;
                    return;
                case "line_button_5":
                    UIManager.getRef("payline_button_5").visible = false;
                    return;
                case "line_button_6":
                    UIManager.getRef("payline_button_6").visible = false;
                    return;
                case "line_button_7":
                    UIManager.getRef("payline_button_7").visible = false;
                    return;
                case "line_button_8":
                    UIManager.getRef("payline_button_8").visible = false;
                    return;
                case "line_button_9":
                    UIManager.getRef("payline_button_9").visible = false;
                    return;
                case "line_button_10":
                    UIManager.getRef("payline_button_10").visible = false;
                    return;
                case "line_button_11":
                    UIManager.getRef("payline_button_11").visible = false;
                    return;
                case "line_button_12":
                    UIManager.getRef("payline_button_12").visible = false;
                    return;
                case "line_button_13":
                    UIManager.getRef("payline_button_13").visible = false;
                    return;
                case "line_button_14":
                    UIManager.getRef("payline_button_14").visible = false;
                    return;
                case "line_button_15":
                    UIManager.getRef("payline_button_15").visible = false;
                    return;
                case "line_button_16":
                    UIManager.getRef("payline_button_16").visible = false;
                    return;
                case "line_button_17":
                    UIManager.getRef("payline_button_17").visible = false;
                    return;
                case "line_button_18":
                    UIManager.getRef("payline_button_18").visible = false;
                    return;
                case "line_button_19":
                    UIManager.getRef("payline_button_19").visible = false;
                    return;
                case "line_button_20":
                    UIManager.getRef("payline_button_20").visible = false;
                    return;
                default:
                    return 'No buttons';
            }
        }
    }


    handleEvent = (e: any) => {

    }
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        return true;
    }


    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        if (this.props.showAutoplay || this.props.showSettingPanelUI) {
            UIManager.getRef("common_bgGraphic").visible = true;
            UIManager.getRef("common_autoBgImage").visible = true;
        }
    }

    render() {
        return (
            <UIManager id={"overlayGenericUIContainer"} name={"overlayGenericUIContainer"} type={"Container"}
            configGame={this.props.configGame === undefined ?configGame :this.props.configGame }
                ref={i => this.overlayGenericUIContainer = i} app={this.app}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            app={this.app}  configGame={this.props.configGame === undefined ?configGame :this.props.configGame }
                            disabled={!i.interactive}
                            id={i.id} ClickHandler={this.handleEvent} {...i} mouseOver={this.handleEventMouseOver} mouseOut={this.handleEventMouseOut} />)
                }
            </UIManager>)
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'autoplayState' | 'desktopSettingPanelState' | 'paytableState' | 'basegameState'>): IStateToProps =>
    ({
        showAutoplay: state.autoplayState.showAutoplay,
        showSettingPanelUI: state.desktopSettingPanelState.showSettingPanel,
        showPaytable: state.paytableState.showPaytable,
        featureJustTriggered: state.basegameState.featureJustTriggered,


    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        hideAutoplay: (): any => dispatch(autoplayActions.hideAutoplayUI()),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        setAutoplay: (autoplayCount: number): any => dispatch(autoplayActions.setAutoplayCount(autoplayCount)),
        startAutoplay: (): any => dispatch(baseGameActions.startAutoplay()),
        setApplicationAutoplayCount: (autoplaycount: number): any => dispatch(baseGameActions.setApplicationAutoplayCount(autoplaycount)),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        //resetReelState: (): any => dispatch(configGame["SPIN_TYPE"] === 0 && reelsActions.resetReelState() || configGame["SPIN_TYPE"] === 1 && gridsActions.resetReelState() || configGame["SPIN_TYPE"] === 2 && reelgridActions.resetReelState()),
        resetReelState: (): any => dispatch( configGame["SPIN_TYPE"] === 2 && reelgridActions.resetReelState()),
       
        autoplayReset: (resetAutoplay: boolean): any => dispatch(autoplayActions.autoplayReset(resetAutoplay)),
        setValueOfNumberButton: (numberButtonValue: number): any => dispatch(autoplayActions.setValueOfNumberButton(numberButtonValue)),
        interactivityOfStartButton: (startButtonInteractivity: boolean): any => dispatch(autoplayActions.interactivityOfStartButton(startButtonInteractivity)),
    }))(withOverlayConfiguration(OverlayGenericUI)));