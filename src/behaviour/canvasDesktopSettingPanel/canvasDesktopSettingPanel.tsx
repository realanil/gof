import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withCanvasDesktopSettingPanelConfiguration from "./configuration/withCanvasDesktopSettingPanelConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { isMobile } from "react-device-detect";
import * as PIXI from "pixi.js";
import { actions as desktopSettingPanelActions } from "../../core/reducers/desktopSettingPanelReducer";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as keyboardListenerActions } from "../../core/reducers/keyboardListenerReducer";
import { actions as reelGridActions } from "../../core/reducers/reelgridStateReducer";
import { actions as desktopSettingPanelGameLevel } from "../../gamereducer/desktopSettingPanelGameLevelReducer";
import { actions as soundActions } from "../../core/reducers/soundReducer";
import { actions as introductionActions } from "../../gamereducer/introductionPageReducer";
import { actions as applicationStateActions } from "../../core/reducers/applicationStateReducer"
import { toggleFullScreen , isFullScreen} from "../../core/components/fullscreen/fullScreen";

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

class CanvasDesktopSettingPanel extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected canvasDesktopSettingPanelContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;
    protected previousStateValue: any;
    protected settingHeading: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            buttonPanelEnable: true,
            allContainerList: [],
            uiElements: [],
            lang: "en",

        }
        //this.canvasDesktopSettingPanelContainer = React.createRef();
        this.canvasDesktopSettingPanelContainer = {};
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
        if (this.props.introductionScreenVisible) {
            this.radioController("introScreenRadioButtonOff", "introScreenRadioButtonOn");
        } else {
            this.radioController("introScreenRadioButtonOn", "introScreenRadioButtonOff");
        }
    }

    //this method will initialize the object to variable

    initializeObjectToVariable() {
        this.settingHeading = UIManager.getRef("settingHeading2");
    }

    componentDidMount() {
        this.bindUI();
        this.setImageposition();
        this.initializeObjectToVariable();

        if (this.props.showSettingPanelUI && !isMobile) {
            window.addEventListener('resize', this.updateDimensions.bind(this));
            this.conditionCheckForToggles();
            if (!this.props.EnableIntroScreenOption) {
                UIManager.getRef("introScreenRadioButtonOn").visible = false;
                UIManager.getRef("introScreenRadioButtonOff").visible = false;
                UIManager.getRef("introScreenRadioButtonDisable").visible = true;
            }

            if (!this.props.EnableTurboModeOption) {
                UIManager.getRef("turboSpinRadioButtonOn").visible = false;
                UIManager.getRef("turboSpinRadioButtonOff").visible = false;
                UIManager.getRef("turboSpinRadioButtonDisable").visible = true;
            }
            if (!this.props.soundOnOff) {
                UIManager.getRef("musicRadioButtonOn").visible = false;
                UIManager.getRef("musicRadioButtonOff").visible = false;
                UIManager.getRef("musicRadioButtonDisable").visible = true;
            } else {
                UIManager.getRef("musicRadioButtonDisable").visible = false;
            }
            this.props.disableQuickSpin ? UIManager.getRef("turboSpinRadioButtonDisable").visible = true : UIManager.getRef("turboSpinRadioButtonDisable").visible = false;
            !this.props.showFullScreenButton ? UIManager.getRef("fullScreenRadioButtonDisable").visible = true : UIManager.getRef("fullScreenRadioButtonDisable").visible = false;
        }
    }

    setImageposition() {
        if (!isMobile)
            switch (this.props.languageCode) {
                case 'bg': UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 758);
                    this.settingHeading && (this.settingHeading.x = 973);
                    break;
                case 'cs':
                case 'ro': UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 824);
                    this.settingHeading && (this.settingHeading.x = 975);
                    break;
                case 'da':
                case 'nl': UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 794);
                    this.settingHeading && (this.settingHeading.x = 977);
                    break;
                case 'de':
                case 'gr': UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 766);
                    break;
                case 'en': UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 815);
                    this.settingHeading && (this.settingHeading.x = 974);
                    break;
                case 'es': UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 716);
                    break;
                case 'fi': UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 804);
                    this.settingHeading && (this.settingHeading.x = 978);
                    break;
                case 'fr': UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 801);
                    this.settingHeading && (this.settingHeading.x = 977);
                    break;
                case 'hr':
                case 'sr':
                case 'tr': UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 823);
                    this.settingHeading && (this.settingHeading.x = 977);
                    break;
                case 'hu':
                case 'nb': UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 788);
                    this.settingHeading && (this.settingHeading.x = 977);
                    break;
                case 'it': UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 756);
                    break;
                case 'pl': UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 814);
                    this.settingHeading && (this.settingHeading.x = 978);
                    break;
                case 'pt': UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 748);
                    break;
                case 'ru': UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 800);
                    break;
                case 'sv': UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 783);
                    this.settingHeading && (this.settingHeading.x = 978);
                    break;
                default:
                UIManager.getRef("settingImage") && (UIManager.getRef("settingImage").x = 775);
                this.settingHeading && (this.settingHeading.x = 974);

            }
    }

    conditionCheckForToggles() {
        if (this.props.spinWithSpaceBar) {
            this.radioController("spaceBarToSpinRadioButtonOff", "spaceBarToSpinRadioButtonOn");
        } else if (!this.props.spinWithSpaceBar) {
            this.radioController("spaceBarToSpinRadioButtonOn", "spaceBarToSpinRadioButtonOff");
        }
        if (this.props.turboToggle) {
            this.props.setTurboMode(true);
            this.radioController("turboSpinRadioButtonOff", "turboSpinRadioButtonOn");
        } else if (!this.props.turboToggle) {
            this.props.setTurboMode(false);
            this.radioController("turboSpinRadioButtonOn", "turboSpinRadioButtonOff");
        }

        if (this.props.soundIsPlaying) {
            this.radioController("musicRadioButtonOff", "musicRadioButtonOn");
        } else if (!this.props.soundIsPlaying) {
            this.radioController("musicRadioButtonOn", "musicRadioButtonOff");
        }
        if (this.props.fullScreenToggle) {
            this.radioButtonClicked("fullScreenRadioButtonOff", "fullScreenRadioButtonOn");

        } else if (!this.props.fullScreenToggle) {
            this.radioButtonClicked("fullScreenRadioButtonOn", "fullScreenRadioButtonOff");
        }
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
            this.layoutChange(nextProps.layoutMode);
            return false;
        }
        if (nextProps.introductionScreenVisible !== this.props.introductionScreenVisible) {
            return false;
        }
        return false;
    }

    radioButtonClicked(currentButtonName: any, nextButtonName: any) {
        UIManager.getRef(currentButtonName).visible = false;
        UIManager.getRef(nextButtonName).visible = true;
    }
    radioController(currentToggleState: any, nextToggleState: any) {
        UIManager.getRef(currentToggleState) && (UIManager.getRef(currentToggleState).visible = false);
        UIManager.getRef(currentToggleState) && (UIManager.getRef(nextToggleState).visible = true);
    }

    updateDimensions() {
        if (this.props.fullScreenToggle) {
            if (!isFullScreen()) {
                this.radioButtonClicked("fullScreenRadioButtonOn", "fullScreenRadioButtonOff");
                this.props.fullScreenToggleButton(false);
            }
        } 
    }

    handleEvent = (e: any) => {
        this.props.setApplicationButtonClicked(true);
        this.props.setApplicationButtonClicked(false);
        switch (e.target.name) {
            case "crossButton":
                this.props.showDesktopSettingPanelUI(false);
                !this.props.showRealityCheck && this.props.setAllButtonEnable();
                return;
            case "introScreenRadioButtonOn":
                this.props.visibleIntroductionScreen(false);
                this.radioController("introScreenRadioButtonOn", "introScreenRadioButtonOff");
                return;
            case "introScreenRadioButtonOff":
                this.props.visibleIntroductionScreen(true);
                this.radioController("introScreenRadioButtonOff", "introScreenRadioButtonOn");
                return;
            case "fullScreenRadioButtonOn":
                if (this.props.showFullScreenButton) {
                    this.props.fullScreenToggleButton(false);
                    toggleFullScreen();
                    this.radioButtonClicked("fullScreenRadioButtonOn", "fullScreenRadioButtonOff");
                }
                return;
            case "fullScreenRadioButtonOff":
                if (this.props.showFullScreenButton) {
                    toggleFullScreen();
                    this.props.fullScreenToggleButton(true);
                    this.radioButtonClicked("fullScreenRadioButtonOff", "fullScreenRadioButtonOn");
                }
                return;
            case "musicRadioButtonOn":
                if (this.props.soundOnOff) {
                    this.props.soundLoadStartFunction(true);
                    this.props.stopAllBGMSound(true);
                    this.props.stopAllSFXSound(true);
                    this.props.playingSound(false);
                    this.radioController("musicRadioButtonOn", "musicRadioButtonOff");
                }
                return;
            case "musicRadioButtonOff":
                if (this.props.soundOnOff) {
                    this.props.stopAllBGMSound(false);
                    this.props.stopAllSFXSound(false);
                    this.props.playingSound(true);
                    this.radioController("musicRadioButtonOff", "musicRadioButtonOn");
                }
                return;
            case "spaceBarToSpinRadioButtonOn":
                this.props.spaceBarSpin(false);
                this.radioController("spaceBarToSpinRadioButtonOn", "spaceBarToSpinRadioButtonOff");
                return;
            case "spaceBarToSpinRadioButtonOff":
                this.props.spaceBarSpin(true);
                this.radioController("spaceBarToSpinRadioButtonOff", "spaceBarToSpinRadioButtonOn");
                return;
            case "turboSpinRadioButtonOn":
                if (!this.props.disableQuickSpin) {
                    this.props.setTurboMode(false);
                    this.props.turboToggleButton(false);
                    this.radioController("turboSpinRadioButtonOn", "turboSpinRadioButtonOff");
                }
                return;
            case "turboSpinRadioButtonOff":
                if (!this.props.disableQuickSpin) {
                    this.props.setTurboMode(true);
                    this.props.turboToggleButton(true);
                    this.radioController("turboSpinRadioButtonOff", "turboSpinRadioButtonOn");
                }
                return;
            default:
                return 'No buttons';
        }
    }

    render() {
        if (isMobile) {
            return (
                <></>
            )
        }
        if (!this.props.showSettingPanelUI) {
            return (
                <></>
            )
        }
        return (
            <UIManager id={"canvasDesktopSettingPanelContainer"} type={"Container"}
                ref={i => this.canvasDesktopSettingPanelContainer = i}
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
    (state: Pick<IStore, "behaviourState" | 'desktopSettingPanelState' | 'applicationState' | 'introductionState' | 'keyboardListenerState' | 'reelgridState' | 'desktopSettingPanelGameLevel' | 'soundState'>): IStateToProps =>
    ({
        showSettingPanelUI: state.desktopSettingPanelState.showSettingPanel,
        layoutMode: state.applicationState.layoutMode,
        introductionScreenVisible: state.introductionState.introductionScreenVisible,
        spinWithSpaceBar: state.keyboardListenerState.spinWithSpaceBar,
        InTurboMode: state.reelgridState.InTurboMode,
        turboToggle: state.desktopSettingPanelGameLevel.turboToggle,
        fullScreenToggle: state.desktopSettingPanelGameLevel.fullScreenToggle,
        soundIsPlaying: state.soundState.soundIsPlaying,
        EnableIntroScreenOption: state.desktopSettingPanelGameLevel.EnableIntroScreenOption,
        EnableTurboModeOption: state.desktopSettingPanelGameLevel.EnableTurboModeOption,
        disableQuickSpin: state.applicationState.disableQuickSpin,
        showFullScreenButton: state.applicationState.showFullScreenButton,
        showRealityCheck: state.behaviourState.showRealityCheck,
        isGameSettingFirstTime: state.applicationState.isGameSettingFirstTime,
        languageCode: state.applicationState.languageCode,
        soundOnOff: state.applicationState.soundOnOff,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        showDesktopSettingPanelUI: (showSettingPanel: boolean): any => dispatch(desktopSettingPanelActions.showDesktopSettingPanelUI(showSettingPanel)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        spaceBarSpin: (spinWithSpaceBar: boolean): any => dispatch(keyboardListenerActions.spaceBarSpin(spinWithSpaceBar)),
        setTurboMode: (IsTurboMode: any): any => dispatch(reelGridActions.setTurboMode(IsTurboMode)),
        turboToggleButton: (turboToggle: any): any => dispatch(desktopSettingPanelGameLevel.turboToggleButton(turboToggle)),
        fullScreenToggleButton: (fullScreenToggle: any): any => dispatch(desktopSettingPanelGameLevel.fullScreenToggleButton(fullScreenToggle)),
        playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
        stopAllBGMSound: (stopBgSound: any): any => dispatch(soundActions.stopAllBGMSound(stopBgSound)),
        stopAllSFXSound: (stopAllSfxSound: boolean): any => dispatch(soundActions.stopAllSFXSound(stopAllSfxSound)),
        visibleIntroductionScreen: (value: boolean): any => dispatch(introductionActions.visibleIntroductionScreen(value)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        soundLoadStartFunction: (soundLoadStart: boolean): any => dispatch(soundActions.soundLoadStartFunction(soundLoadStart)),
        setIsGameSettingFirstTime: (isGameSettingFirstTime: Boolean): any => dispatch(applicationStateActions.setIsGameSettingFirstTime(isGameSettingFirstTime)),
    }))(withCanvasDesktopSettingPanelConfiguration(CanvasDesktopSettingPanel)));