import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withMobileViewSettingPanelUIConfiguration from "./configuration/withMobileViewSettingPanelUIConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import { isMobile } from "react-device-detect";
import * as PIXI from "pixi.js";
import { actions as reelGridActions } from "../../core/reducers/reelgridStateReducer";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { actions as introductionActions } from "../../gamereducer/introductionPageReducer";
import { actions as soundActions } from "../../core/reducers/soundReducer";
import { TIMER } from "../../core/utills";
import { actions as desktopSettingPanelGameLevel } from "../../gamereducer/desktopSettingPanelGameLevelReducer";
import screenfull from 'screenfull';
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

class MobileViewSettingPanelUI extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected mobileViewSettingPanelUIContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected ui_mobileMode: string = "";
    protected displayUI: any;
    protected previousStateValue: any;
    protected prevTextName: string = "";
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
        this.mobileViewSettingPanelUIContainer ={}; 
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
    private cleanAllTimer():void{
        this.AllTimer.forEach((_time:any)=>{
           _time && _time.stop();
           _time && _time.reset();
           _time && _time.remove();
       }); 
       this.AllTimer =[];
   }

    componentDidMount() {
        this.bindUI();
        if (this.props.showSettingPanelUI && isMobile) {
            this.conditionCheckForToggles();
            if (!this.props.soundOnOff){
        
             UIManager.getRef("musicRadioButtonMobileDisable") && (UIManager.getRef("musicRadioButtonMobileDisable").visible = true);
             UIManager.getRef("musicRadioButtonMobileOn") && (UIManager.getRef("musicRadioButtonMobileOn").visible = false);
             UIManager.getRef("musicRadioButtonMobileOff") && (UIManager.getRef("musicRadioButtonMobileOff").visible = false);
          
            }else{
                UIManager.getRef("musicRadioButtonMobileDisable") && (UIManager.getRef("musicRadioButtonMobileDisable").visible = false);  
            }
    } }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
        this.orientationChange();
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            this.orientationChange();
            this.setLayout();
            return false;
        }
        if (nextProps.showSettingPanelUI !== this.props.showSettingPanelUI) {
            this.cleanAllTimer();
            return true;
        }
        return false;
    }
    radioController(currentToggleState: any, nextToggleState: any) {
        let timer = TIMER.TimerManager.createTimer(10);
        timer.on('end', (e: any) => {
            e.remove();
            UIManager.getRef(currentToggleState) && (UIManager.getRef(currentToggleState).visible = false);
            UIManager.getRef(currentToggleState) && (UIManager.getRef(nextToggleState).visible = true);
        });
        timer.start();
        this.AllTimer.push(timer);

    }

    conditionCheckForToggles() {
        this.props.soundIsPlaying && this.radioController("musicRadioButtonMobileOff", "musicRadioButtonMobileOn");
        !this.props.soundIsPlaying && this.radioController("musicRadioButtonMobileOn", "musicRadioButtonMobileOff");
        this.props.introductionScreenVisible && this.radioController("showIntroScreenRadioButtonMobileOff", "showIntroScreenRadioButtonMobileOn");
        !this.props.introductionScreenVisible && this.radioController("showIntroScreenRadioButtonMobileOn", "showIntroScreenRadioButtonMobileOff");
        if (this.props.turboToggle) {
            this.props.setTurboMode(true);
            this.radioController("mobile_turboSpinRadioButtonOff", "mobile_turboSpinRadioButtonOn");
        } else if (!this.props.turboToggle) {
            this.props.setTurboMode(false);
            this.radioController("mobile_turboSpinRadioButtonOn", "mobile_turboSpinRadioButtonOff");
        }
    }

    radioButtonClicked(currentButtonName: any, nextButtonName: any) {
        UIManager.getRef(currentButtonName).visible = false;
        UIManager.getRef(nextButtonName).visible = true;
    }

    handleEvent = (e: any) => {
        switch (e.target.name) {
            case "showIntroScreenRadioButtonMobileOn":
                this.props.visibleIntroductionScreen(false);
                this.radioController("showIntroScreenRadioButtonMobileOn", "showIntroScreenRadioButtonMobileOff");
                this.radioButtonClicked("showIntroScreenRadioButtonMobileOn", "showIntroScreenRadioButtonMobileOff");
                return;
            case "showIntroScreenRadioButtonMobileOff":
                this.props.visibleIntroductionScreen(true);
                this.radioController("showIntroScreenRadioButtonMobileOff", "showIntroScreenRadioButtonMobileOn");
                this.radioButtonClicked("showIntroScreenRadioButtonMobileOff", "showIntroScreenRadioButtonMobileOn");
                return;
            case "musicRadioButtonMobileOn":
                if( this.props.soundOnOff){
                    this.props.stopAllBGMSound(true);
                    this.props.stopAllSFXSound(true);
                    this.props.playingSound(false);
                    this.radioController("musicRadioButtonMobileOn", "musicRadioButtonMobileOff");
                    this.radioButtonClicked("musicRadioButtonMobileOn", "musicRadioButtonMobileOff");
                }
                return;
            case "musicRadioButtonMobileOff":
                if( this.props.soundOnOff){
                    this.props.stopAllBGMSound(false);
                    this.props.stopAllSFXSound(false);
                    this.props.playingSound(true);
                    this.radioController("musicRadioButtonMobileOff", "musicRadioButtonMobileOn");
                    this.radioButtonClicked("musicRadioButtonMobileOff", "musicRadioButtonMobileOn");
                }
                return;
            case "mobile_turboSpinRadioButtonOn":
                if (!this.props.disableQuickSpin) {
                    this.props.setTurboMode(false);
                    this.props.turboToggleButton(false);
                    this.radioController("mobile_turboSpinRadioButtonOn", "mobile_turboSpinRadioButtonOff");
                    this.radioButtonClicked("mobile_turboSpinRadioButtonOn", "mobile_turboSpinRadioButtonOff");
                }
                return;
            case "mobile_turboSpinRadioButtonOff":
                if (!this.props.disableQuickSpin) {
                    this.props.setTurboMode(true);
                    this.props.turboToggleButton(true);
                    this.radioController("mobile_turboSpinRadioButtonOff", "mobile_turboSpinRadioButtonOn");
                    this.radioButtonClicked("mobile_turboSpinRadioButtonOff", "mobile_turboSpinRadioButtonOn");
                }
                return;
            default:
                return 'No buttons';
        }
    }
    orientationChange() {
        if (isMobile && window.innerWidth < window.innerHeight) {
            UIManager.getRef("turboSpinRadioButtonMobDisable") && (UIManager.getRef("turboSpinRadioButtonMobDisable").x = 532);
            UIManager.getRef("turboSpinRadioButtonMobDisable") && (UIManager.getRef("turboSpinRadioButtonMobDisable").y = 1103);
    
            UIManager.getRef("musicRadioButtonMobileDisable") && (UIManager.getRef("musicRadioButtonMobileDisable").x = 535);
            UIManager.getRef("musicRadioButtonMobileDisable") && (UIManager.getRef("musicRadioButtonMobileDisable").y = 917);
        } else {
            UIManager.getRef("turboSpinRadioButtonMobDisable") && (UIManager.getRef("turboSpinRadioButtonMobDisable").x = 532);
            UIManager.getRef("turboSpinRadioButtonMobDisable") && (UIManager.getRef("turboSpinRadioButtonMobDisable").y = 788);

            UIManager.getRef("musicRadioButtonMobileDisable") && (UIManager.getRef("musicRadioButtonMobileDisable").x = 536);
            UIManager.getRef("musicRadioButtonMobileDisable") && (UIManager.getRef("musicRadioButtonMobileDisable").y = 633);
        }
    }


    componentDidUpdate() {
        this.setLayout();
        this.orientationChange();
        this.props.disableQuickSpin ? UIManager.getRef("turboSpinRadioButtonMobDisable").visible = true : UIManager.getRef("turboSpinRadioButtonMobDisable").visible = false;
       !this.props.soundOnOff ? UIManager.getRef("musicRadioButtonMobileDisable").visible = true : UIManager.getRef("musicRadioButtonMobileDisable").visible = false;
    }

    setLayout() {
        this.layoutChange(this.props.layoutMode);
        if (this.props.showSettingPanelUI && isMobile) {
            let timer = TIMER.TimerManager.createTimer(10);
            timer.on('end', (e: any) => {
                e.remove();
                this.conditionCheckForToggles();
            });
            timer.start();
            this.AllTimer.push(timer);
        }
    }
    render() {
        if (!isMobile) {
            return (
                <></>
            )
        }
        if (!this.props.showSettingPanelUI) {
            return (<></>)
        }
        return (
            <UIManager id={"mobileViewSettingPanelUIContainer"} type={"Container"}
                ref={i => this.mobileViewSettingPanelUIContainer = i}
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
    (state: Pick<IStore, "desktopSettingPanelGameLevel" | 'soundState' | 'applicationState' | 'desktopSettingPanelState' | 'introductionState'>): IStateToProps =>
    ({
        showSettingPanelUI: state.desktopSettingPanelState.showSettingPanel,
        introductionScreenVisible: state.introductionState.introductionScreenVisible,
        layoutMode: state.applicationState.layoutMode,
        soundIsPlaying: state.soundState.soundIsPlaying,
        disableQuickStop: state.applicationState.disableQuickStop,
        turboToggle: state.desktopSettingPanelGameLevel.turboToggle,
        EnableTurboModeOption: state.desktopSettingPanelGameLevel.EnableTurboModeOption,
        disableQuickSpin: state.applicationState.disableQuickSpin,
        soundOnOff: state.applicationState.soundOnOff,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        visibleIntroductionScreen: (value: boolean): any => dispatch(introductionActions.visibleIntroductionScreen(value)),
        stopAllBGMSound: (stopBgSound: any): any => dispatch(soundActions.stopAllBGMSound(stopBgSound)),
        stopAllSFXSound: (stopAllSfxSound: boolean): any => dispatch(soundActions.stopAllSFXSound(stopAllSfxSound)),
        playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
        setTurboMode: (IsTurboMode: any): any => dispatch(reelGridActions.setTurboMode(IsTurboMode)),
        turboToggleButton: (turboToggle: any): any => dispatch(desktopSettingPanelGameLevel.turboToggleButton(turboToggle)),
    }))(withMobileViewSettingPanelUIConfiguration(MobileViewSettingPanelUI)));