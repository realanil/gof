import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withMobileSettingPanelConfiguration from "./configuration/withMobileSettingPanelConfiguration";
import { actions as aplicationActions } from "../../core/reducers/applicationStateReducer";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { actions as menuActions } from "../../core/reducers/menuReducer";
import { actions as autoplayActions } from "../../core/reducers/autoplayReducer";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import UIManager from "../../core/components/ui/UiBuilder";
import { isMobile } from "react-device-detect";
import { actions as paytableActions } from "../../core/reducers/paytableReducer";
import { actions as desktopSettingPanelActions } from "../../core/reducers/desktopSettingPanelReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { actions as applicationStateActions } from "../../core/reducers/applicationStateReducer";
import { actions as paytableGofActions } from "./../../gamereducer/paytableBMReducer";
import * as PIXI from "pixi.js";
import {
    configGame
} from "../../data/config";
import { TIMER } from "../../core/utills";


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

class MobileSettingPanel extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected mobileSettingPanelContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected ui_mobileMode: string = "";
    protected displayUI: any;
    protected previousStateValue: any;
    protected prevTextName: string = "";
    protected panelHeight: number = 1718;
    protected panelWidth: number = 1030;
    protected timerValue: number = 50;
    private AllTimer :any [] = [];
    constructor(props: IProps) {
        super(props);
        this.AllTimer =[];
        this.app = props.app;
        this.state = {
            buttonPanelEnable: true,
            allContainerList: [],
            uiElements: [],
            lang: "en",

        }
        this.mobileSettingPanelContainer = {};
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

    bindUI() {
        this.layoutChange(this.props.layoutMode);

    }
    setLayout() {
        if (window.innerWidth > window.innerHeight) {
            this.ui_mobileMode = '_landscape';
            this.visibilitlyOfcontainer('_landscape', '_portrait');
            UIManager.getRef("mobileButtonUi" + this.ui_mobileMode) && (UIManager.getRef("mobileButtonUi" + this.ui_mobileMode).visible = true);
        }
        else {
            this.ui_mobileMode = '_portrait';
            this.visibilitlyOfcontainer('_portrait', '_landscape');
        }
    }

    visibilitlyOfcontainer(current: string, previous: string) {
        UIManager.getRef("mobileButtonUi" + current) && (UIManager.getRef("mobileButtonUi" + current).visible = true);
        UIManager.getRef("mobileButtonUi" + previous) && (UIManager.getRef("mobileButtonUi" + previous).visible = false);
    }
    componentDidMount() {
        this.bindUI();
        this.autoplaydisabletexture();
    }



    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
        this.setLayout();

    }
    autoplaydisabletexture() {
        if (!this.props.enableAutoPlay || !this.props.autoPlayExpertMode ) {
           UIManager.getRef("btn_mobileAutoplayButtonDisable" + this.ui_mobileMode) && (UIManager.getRef("btn_mobileAutoplayButtonDisable" + this.ui_mobileMode).visible =false);
           UIManager.getRef("btn_mobileAutoplayButtonEnable" + this.ui_mobileMode) && (UIManager.getRef("btn_mobileAutoplayButtonEnable" + this.ui_mobileMode).visible =false);
          
        }
    }
    orientationChange() {
        if (isMobile && window.innerWidth < window.innerHeight) {
            UIManager.getRef("mobileSettingPanelBg").width = configGame.CANVAS_HEIGHT;
            UIManager.getRef("mobileSettingPanelBg").height = this.panelHeight;
        } else {
            UIManager.getRef("mobileSettingPanelBg").width = configGame.CANVAS_WIDTH;
            UIManager.getRef("mobileSettingPanelBg").height = this.panelWidth;
        }
        this.autoplaydisabletexture();
    }
    private cleanAllTimer():void{
        this.AllTimer.forEach((_time:any)=>{
           _time && _time.stop();
           _time && _time.reset();
           _time && _time.remove();
       }); 
       this.AllTimer =[];
   }

    setScreenWhileRotate() {
        this.cleanAllTimer();
        if (this.props.showAutoplay) {
            this.updateButtonsState("btn_mobileAutoplayButtonEnable" + this.ui_mobileMode, "btn_mobileAutoplayButtonDisable" + this.ui_mobileMode);
            let timer = TIMER.TimerManager.createTimer(this.timerValue);
            timer.on('end', (e: any) => {
                e.remove();
                this.showContent("autoplayHeading_mobile");
            })
            timer.start();
            this.AllTimer.push(timer);

        }
        else if (this.props.showMenu) {
            this.updateButtonsState("btn_mobileBetButtonEnable" + this.ui_mobileMode, "btn_mobileBetButtonDisable" + this.ui_mobileMode);
            let timer = TIMER.TimerManager.createTimer(this.timerValue);
            timer.on('end', (e: any) => {
                e.remove();
                this.showContent("betHeading_mobile");
            })
            timer.start();
            this.AllTimer.push(timer);
        }
        else if (this.props.showSettingPanelUI) {
            this.updateButtonsState("btn_mobileGameGuideEnable" + this.ui_mobileMode, "btn_mobileGameGuideDisable" + this.ui_mobileMode);
            let timer = TIMER.TimerManager.createTimer(this.timerValue);
            timer.on('end', (e: any) => {
                e.remove();
                this.showContent("GameGuideHeading_mobile");
            })
            timer.start();
            this.AllTimer.push(timer);

        }
        else if (this.props.showPaytable) {

            this.updateButtonsState("btn_mobilePayTableButtonEnable" + this.ui_mobileMode, "btn_mobilePayTableButtonDisable" + this.ui_mobileMode);
            let timer = TIMER.TimerManager.createTimer(this.timerValue);
            timer.on('end', (e: any) => {
                e.remove();
                this.showContent("payTableHeading_mobile");
            })
            timer.start();
            this.AllTimer.push(timer);
        }
    }
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.clickedButtonName != this.props.clickedButtonName) {
            if (nextProps.clickedButtonName.startsWith("auto") && isMobile) {
                this.setUI(false);
            }
            return false;
        }
        if (nextProps.layoutMode !== this.props.layoutMode) {

            this.layoutChange(nextProps.layoutMode);
            nextProps.showMobileMenuPanel && this.orientationChange();
            this.setScreenWhileRotate();
            return false;
        }
        if (nextProps.showMobileMenuPanel !== this.props.showMobileMenuPanel) {
            return true;
        }

        return false;
    }

    showContent(textName: string) {
        this.prevTextName != "" && (UIManager.getRef(this.prevTextName).visible = false);
        UIManager.getRef(textName).visible = true;
        this.prevTextName = textName;
    }

    handleEvent = (e: any) => {

        switch (e.target.name) {
            case "btn_mobileAutoplayButtonDisable" + this.ui_mobileMode:
                if (this.props.enableAutoPlay && !this.props.autoPlaySimpleMode) {
                    this.updateButtonsState("btn_mobileAutoplayButtonEnable" + this.ui_mobileMode, "btn_mobileAutoplayButtonDisable" + this.ui_mobileMode);
                    this.showContent("autoplayHeading_mobile");
                    this.props.setApplicationShowHelpText(false);
                    this.props.showAutoplayUI();
                    this.props.showDesktopSettingPanelUI(false);
                    this.props.hideMenuUI();
                    this.props.mobilePaytableShow(false);
                }
                return;
            case "btn_mobileBetButtonDisable" + this.ui_mobileMode:
                this.updateButtonsState("btn_mobileBetButtonEnable" + this.ui_mobileMode, "btn_mobileBetButtonDisable" + this.ui_mobileMode);
                this.showContent("betHeading_mobile");
                this.props.setApplicationShowHelpText(false);
                this.props.showMenuUI();
                this.props.showDesktopSettingPanelUI(true);
                this.props.mobilePaytableShow(false);
                this.props.hideAutoplay();
                return;
            case "btn_mobileGameGuideDisable" + this.ui_mobileMode:
                this.showContent("GameGuideHeading_mobile");
                this.updateButtonsState("btn_mobileGameGuideEnable" + this.ui_mobileMode, "btn_mobileGameGuideDisable" + this.ui_mobileMode);
                this.props.showDesktopSettingPanelUI(true);
                this.props.setApplicationShowHelpText(true);
                this.props.setAllButtonEnable();
                this.props.mobilePaytableShow(false);
                this.props.hideAutoplay();
                this.props.hideMenuUI();
                return;
            case "btn_mobilePayTableButtonDisable" + this.ui_mobileMode:
                this.props.mobilePaytableShow(true);
                this.updateButtonsState("btn_mobilePayTableButtonEnable" + this.ui_mobileMode, "btn_mobilePayTableButtonDisable" + this.ui_mobileMode);
                this.showContent("payTableHeading_mobile");
                this.props.setApplicationShowHelpText(false);
                this.props.showDesktopSettingPanelUI(false);
                this.props.hideAutoplay();
                this.props.hideMenuUI();
                return;
            case "mobileCloseButton" + this.ui_mobileMode:
                this.props.showDesktopSettingPanelUI(false);
                this.props.setApplicationShowHelpText(false);
                this.props.hidePaytable();
                this.props.mobilePaytableShow(false);
                this.props.hideAutoplay();
                this.props.hideMenuUI();
                this.props.setAllButtonEnable();
                this.props.setMobMenuVisibility(false);
                this.props.setApplicationButtonpanelVisibility(true);
                return;
            default:
                return 'No buttons';
        }

    }
    updateButtonsState(clickedButton: string, previousButton: string) {
        this.displayUI.map((data: any) => {
            if (isMobile) {
                if (window.innerWidth > window.innerHeight) {
                    data.name.endsWith(this.ui_mobileMode) && this.setButtonPanelVisibility(data, clickedButton, previousButton);
                }
                else {
                    data.name.endsWith(this.ui_mobileMode) && this.setButtonPanelVisibility(data, clickedButton, previousButton);
                }
                this.autoplaydisabletexture();
            }
        }
        )
    }

    setButtonPanelVisibility(data: any, clickedButton: string, previousButton: string) {
        data.child && data.child.map((innerData: any) => {
            let buttonName = innerData.name;
            if (buttonName.startsWith("btn_")) {
                if (buttonName.includes("Disable")) {
                    UIManager.getRef(buttonName) && (UIManager.getRef(buttonName).visible = true);
                }
                else {
                    UIManager.getRef(buttonName) && (UIManager.getRef(buttonName).visible = false);
                }
                UIManager.getRef(clickedButton) && (UIManager.getRef(clickedButton).visible = true);
                UIManager.getRef(clickedButton) && (UIManager.getRef(previousButton).visible = false);
            }
        })
    }

    setAccToCondition(condition: any, value: boolean) {
        if (condition) {
            this.props.showMenu && this.showBet(value);
        }
        else if (this.props.enableAutoPlay) {

            !this.props.autoPlaySimpleMode && this.props.showAutoplay && this.showAutoplay(value);
            this.props.showMenu && this.props.autoPlaySimpleMode && this.showBet(value);
        }
    }
    setUI(value: boolean) {
        if (this.props.clickedButtonName == "btn_autoplay2") {
            this.setAccToCondition((!this.props.enableAutoPlay), value);
        } else {
            this.setAccToCondition((!this.props.enableAutoPlay || (this.props.enableAutoPlay && (this.props.jurisdictionKey == "es" || this.props.jurisdictionKey == "nl"))), value);

        }

        this.orientationChange();
        this.props.setApplicationButtonpanelVisibility(value);
    }
    showAutoplay(value: boolean) {
        this.updateButtonsState("btn_mobileAutoplayButtonEnable" + this.ui_mobileMode, "btn_mobileAutoplayButtonDisable" + this.ui_mobileMode);
        let timer = TIMER.TimerManager.createTimer(this.timerValue);
        timer.on('end', (e: any) => {
            this.showContent("autoplayHeading_mobile");
        })
        timer.start();
        this.AllTimer.push(timer);
    }
    showBet(value: boolean) {
        this.updateButtonsState("btn_mobileBetButtonEnable" + this.ui_mobileMode, "btn_mobileBetButtonDisable" + this.ui_mobileMode);
        let timer = TIMER.TimerManager.createTimer(this.timerValue);
        timer.on('end', (e: any) => {
            this.showContent("betHeading_mobile");
        })
        timer.start();
        this.AllTimer.push(timer);
    }
    componentDidUpdate() {
        this.layoutChange(this.props.layoutMode);
        this.setUI(false);
        this.orientationChange();
        this.props.showMobileMenuPanel && this.props.showPaytableUI();
    }
    render() {
        if (!this.props.showMobileMenuPanel) {
            return (<></>)
        }
        return (
            <UIManager id={"mobileSettingPanelContainer"} type={"Container"}
                ref={i => this.mobileSettingPanelContainer = i}
                configGame={this.props.configGame}
                app={this.app}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={this.props.configGame}
                            ClickHandler={this.handleEvent} scope={this} />
                    )
                }
            </UIManager>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'buttonPanelState' | "desktopSettingPanelState" | 'paytableState' | 'autoplayState' | 'menuState' | 'soundState' | 'introductionState' | 'applicationState' | 'basegameState' | 'behaviourState' | 'betPanelState'>): IStateToProps =>
    ({
        showAutoplay: state.autoplayState.showAutoplay,
        soundIsPlaying: state.soundState.soundIsPlaying,
        layoutMode: state.applicationState.layoutMode,
        showMenu: state.menuState.showMenu,
        enableAutoPlay: state.applicationState.enableAutoPlay,
        showMobileMenuPanel: state.behaviourState.showMobileMenuPanel,
        showPaytable: state.paytableState.showPaytable,
        showSettingPanelUI: state.desktopSettingPanelState.showSettingPanel,
        autoPlaySimpleMode: state.applicationState.autoPlaySimpleMode,
        autoPlayExpertMode: state.applicationState.autoPlayExpertMode,
        jurisdictionKey: state.applicationState.jurisdictionKey,
        clickedButtonName: state.buttonPanelState.clickedButtonName,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationButtonpanelVisibility: (visible: boolean): any => dispatch(aplicationActions.setApplicationButtonpanelVisibility(visible)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        hideMenuUI: (): any => dispatch(menuActions.hideMenuUI()),
        hideAutoplay: (): any => dispatch(autoplayActions.hideAutoplayUI()),
        showPaytableUI: (): any => dispatch(paytableActions.showPaytable()),
        showAutoplayUI: (): any => dispatch(autoplayActions.showAutoplayUI()),
        showMenuUI: (): any => dispatch(menuActions.showMenuUI()),
        hidePaytable: (): any => dispatch(paytableActions.hidePaytable()),
        showDesktopSettingPanelUI: (showSettingPanel: boolean): any => dispatch(desktopSettingPanelActions.showDesktopSettingPanelUI(showSettingPanel)),
        setMobMenuVisibility: (showMobileMenuPanel: boolean): any => dispatch(behaviourAction.setMobMenuVisibility(showMobileMenuPanel)),
        setApplicationShowHelpText: (showHelpText: boolean): any => dispatch(applicationStateActions.setApplicationShowHelpText(showHelpText)),
        mobilePaytableShow: (showPaytableMobile: boolean): any => dispatch(paytableGofActions.mobilePaytableShow(showPaytableMobile)),

    }))(withMobileSettingPanelConfiguration(MobileSettingPanel)));