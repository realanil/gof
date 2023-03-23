import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withBannerConfiguration from "../../core/components/banner/configuration/withBannerConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import { actions as layoutsActions } from "../../core/reducers/layoutsStateReducer";
import { actions as soundGameLevelAction } from "../../gamereducer/soundGameLevelReducer";
import PIXI from "pixi.js";
import { isMobile } from "react-device-detect";
import { actions as basegameActions } from "../../core/reducers/baseGameReducer";
import { configGame } from "../../data/config";
import { actions as soundActions } from "../../core/reducers/soundReducer";
import { actions as freegameActions } from "../../core/reducers/freeGameReducer";
import { actions as flowManagerAction } from "../../core/reducers/flowManagerReducer";
import { actions as multiplierActions } from "../../gamereducer/multiplierReducer";
import { actions as reelgridAction } from "../../core/reducers/reelgridStateReducer";
import { TIMER } from "../../core/utills";

interface IProps {
    [x: string]: any;
}
interface IStore {
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

class GofBanner extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected scope: any;
    protected gofBannerContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;
    protected objName: any;
    protected introBgGraphic: any;
    protected introBgBlastAnim: any;   
    constructor(props: IProps) {
        super(props);     
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en"
        }
        // this.gofBannerContainer = React.createRef();
        this.gofBannerContainer = {}
        if (isMobile) {
            this.ui_mode = "mobile";
            this.objName = "_mobile";
        } else {
            this.ui_mode = "desktop";
            this.objName = "_desktop";
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

    //this method will call when layout changes
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
        this.orientationChange();
    }

    //this method will initialize object in a variable
    initializeVariable() {
        this.introBgGraphic = UIManager.getRef("introGraphic");
        this.introBgBlastAnim = UIManager.getRef("blastAnim" + this.objName);
    }
    orientationChange() {
        if(this.props.languageCode== "pl" ||this.props.languageCode== "fr" ||this.props.languageCode== "fi"){
            UIManager.ref["btn_introBanner" + this.objName].children[0]._style._fontSize= 65
       }
        if (isMobile) {
          
            if (window.innerWidth > window.innerHeight) {
                UIManager.getRef("blastAnim_mobile") && (UIManager.getRef("blastAnim_mobile").scale.x = 4) && (UIManager.getRef("blastAnim_mobile").scale.y = 4);
            } else {
                UIManager.getRef("blastAnim_mobile") && (UIManager.getRef("blastAnim_mobile").scale.x = 4) && (UIManager.getRef("blastAnim_mobile").scale.y = 10);
            }
        } else {
            UIManager.getRef("blastAnim_desktop") && (UIManager.getRef("blastAnim_desktop").scale.x = 4) && (UIManager.getRef("blastAnim_desktop").scale.y = 4);
            
         
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.showRealityCheck != this.props.showRealityCheck) {
            if (this.props.showRealityCheck && UIManager.getRef("btn_introBanner" + this.objName)) {
                UIManager.getRef("btn_introBanner" + this.objName).interactive = true;
                UIManager.getRef("btn_introBanner" + this.objName).buttonMode = true;
            }
            else if (!this.props.showRealityCheck && UIManager.getRef("btn_introBanner" + this.objName)) {
                UIManager.getRef("btn_introBanner" + this.objName).interactive = false;
                UIManager.getRef("btn_introBanner" + this.objName).buttonMode = false;
            }


            return false;
        }
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            this.initializeVariable();
            if (window.innerWidth < window.innerHeight) {
                UIManager.getRef("introGraphic").width = configGame.CANVAS_HEIGHT;
                UIManager.getRef("introGraphic").height = configGame.CANVAS_WIDTH;
                if (UIManager.getRef("introGraphic").visible === true) {
                    UIManager.getRef("introGraphic").width = configGame.CANVAS_HEIGHT;
                    UIManager.getRef("introGraphic").height = configGame.CANVAS_WIDTH;
                }
            } else {
                if (UIManager.getRef("introGraphic")) {
                    UIManager.getRef("introGraphic").width = configGame.CANVAS_WIDTH;
                    UIManager.getRef("introGraphic").height = configGame.CANVAS_HEIGHT;
                }
            }
            return false;
        }
        return true;
    }

    //this method will be called when a button will clicked
    onClick(evt: any) {
        if (evt.target.name === "btn_introBanner" + this.objName && !this.props.showRealityCheck) {
            this.props.buttonClickedIntro(true);
            let reelData = [
                [76, 76, 58, 64, 34, 64, 58, 76, 76, 76],
                [73, 73, 73, 73, 73, 73, 73, 73, 73, 73],
                [37, 67, 67, 67, 67, 67, 67, 67, 67, 67],
                [38, 38, 56, 56, 56, 38, 38, 38, 38, 38],
                [50, 74, 32, 74, 74, 74, 74, 74, 74, 74],
                [45, 57, 57, 57, 57, 45, 45, 45, 57, 57],
                [75, 63, 81, 39, 63, 63, 81, 75, 39, 63]
            ]
            let FWReelData;
            FWReelData = {
                stopReels: reelData,
            }
            this.props.updateReelData(FWReelData);
            this.props.stopSound([{ name: "introLoop" }]);

            UIManager.getRef("btn_introBanner" + this.objName) && (UIManager.getRef("btn_introBanner" + this.objName).interactive = false);
            UIManager.getRef("btn_introBanner" + this.objName) && (UIManager.getRef("btn_introBanner" + this.objName).buttonMode = false);
            UIManager.getRef("blastAnim" + this.objName) && (UIManager.getRef("blastAnim" + this.objName).visible = true);

            UIManager.getRef("blastAnim" + this.objName) && (UIManager.getRef("blastAnim" + this.objName).gotoAndPlay(0));
            UIManager.getRef("blastAnim" + this.objName) && (UIManager.getRef("blastAnim" + this.objName).onFrameChange = (e: any) => {
                if (e > 5) {
                    this.displayUI.map((data: any) => {
                        if (data.name !== "introGraphic" && data.name !== "blastAnim_desktop") {
                            UIManager.getRef(data.name).visible = false;
                        }
                    })
                }
            })
            let timer = TIMER.TimerManager.createTimer(500);
            timer.on('end', (e: any) => {
                localStorage.setItem("cheatModifiedRequest", "");
                this.props.setApplicationToBaseGameState(false);
                timer && timer.stop();         
                timer && timer.remove();
            });
            timer.start();
          

            UIManager.getRef("blastAnim" + this.objName) && (UIManager.getRef("blastAnim" + this.objName).onComplete = () => {
                UIManager.getRef("blastAnim" + this.objName).visible = false;
                UIManager.getRef("introGraphic").visible = false;
                this.props.flowManagerCalled(false);
                this.props.setIntroDone();
                this.props.activeMultiplier(true);
                this.props.setMultiplierValue(this.props.storeMultiplierCurrentValue);
                this.props.startFreegame();
                this.props.nextFreegame();
            })
        }
    }
   
    componentDidMount() {      
        this.setLayout();
        let timer = TIMER.TimerManager.createTimer(1000);
        timer.on('end', (e: any) => {
            e.remove();
            UIManager.getRef("gofBannerContainer").visible = true;
            this.setLayout();
        });
        timer.start();      
  
    }

    setLayout() {
        this.initializeVariable();
        this.layoutChange(this.props.layoutMode);
        UIManager.getRef("text_IntroScreenFG_desktop") && (UIManager.getRef("text_IntroScreenFG_desktop").text = this.props.freegameSpinCountWin);
        if (isMobile && UIManager.getRef("introGraphic") !== undefined) {
            if (window.innerWidth < window.innerHeight) {
                if (UIManager.getRef("introGraphic").visible === true) {
                    UIManager.getRef("introGraphic").width = configGame.CANVAS_HEIGHT;
                    UIManager.getRef("introGraphic").height = configGame.CANVAS_WIDTH;
                }
            } else {
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        this.setLayout();
        this.orientationChange();
    }

    render() {
        return (
            <UIManager id={"gofBannerContainer"} name={"gofBannerContainer"} type={"Container"} 
            app={this.app}  configGame={configGame}
                ref={i => this.gofBannerContainer = i}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} ClickHandler={this.onClick.bind(this)}
                            scope={this}
                            langObj={this.props.langObj} type={i.type} group={this.props.group} app={this.app}
                            configGame={configGame}
                            id={i.id} {...i} />)
                }
            </UIManager>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'freegameState' | 'basegameState' | 'applicationState' | 'gameactionstate' | 'MultiplierState' | 'behaviourState' | 'reelgridState' | 'flowManagerState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        freegameSpinCount: state.freegameState.freegameSpinCount,
        freegameSpinCountWin: state.freegameState.freegameSpinCountWin,
        storeMultiplierCurrentValue: state.MultiplierState.storeMultiplierCurrentValue,
        callFlowManager: state.flowManagerState.callFlowManager,
        showRealityCheck: state.behaviourState.showRealityCheck,
        languageCode: state.applicationState.languageCode,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationToBaseGameState: (basegamestate: boolean): any => dispatch(basegameActions.setApplicationToBaseGameState(basegamestate)),
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutsActions.setApplicationLayoutObject(layoutobjectlist)),
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),
        setIntroDone: (): any => dispatch(basegameActions.setIntroDone()),
        startFreegame: (): any => dispatch(freegameActions.startFreegame()),
        stopFreegame: (): any => dispatch(freegameActions.stopFreegame()),
        nextFreegame: (): any => dispatch(freegameActions.nextFreegame()),
        flowManagerCalled: (callFlowManager: boolean): any => dispatch(flowManagerAction.flowManagerCalled(callFlowManager)),
        updateReelData: (result_reel: any): any => dispatch(reelgridAction.updateReelData(result_reel)),
        activeMultiplier: (multiplierActive: boolean): any => dispatch(multiplierActions.activeMultiplier(multiplierActive)),
        setMultiplierValue: (multiplierCurrentValue: any): any => dispatch(multiplierActions.setMultiplierValue(multiplierCurrentValue)),
        buttonClickedIntro: (introContinueButtonClick: any): any => dispatch(soundGameLevelAction.buttonClickedIntro(introContinueButtonClick)),

    }))(withBannerConfiguration(GofBanner)));