import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withCommonGameConfiguration from "../../core/components/commongame/configuration/withCommonGameConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { TIMER } from "../../core/utills";
import * as PIXI from "pixi.js";
import { isMobile } from "react-device-detect";
import { configGame } from "./../../data/config";
import { Tween } from "../../core/components/effect/tween";
import easing from "../../core/components/effect/easing";


interface IProps {
    [x: string]: any;
}

interface IStore {
    [x: string]: any;
}

interface IStateToProps {
    basegamestate: any,
    layoutMode: string,
    resizeWidth: any,
    inFreeGame: boolean
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class GofCommonGame extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected gofCommonGameContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;
    protected baseGameSkyImageLandscape: any;
    protected baseGameBgImageLandscape: any;
    protected freeGameSkyImageLandscape: any;
    protected freeGameBgImageLandscape: any;
    protected baseGameBgImagePortrait: any;
    protected freeGameBgImagePortrait: any;
    protected baseGameSkyImageDesktop: any;
    protected freeGameSkyImageDesktop: any;
    protected baseGameBgImageDesktop: any;
    protected freeGameBgImageDesktop: any;
    protected cloudScale: number = 1.6;
    protected cloudAInitialX: number = -711;
    protected cloudBInitialX: number = 565;
    protected cloudALastX: number = 590;
    protected cloudBLastX: number = 1700;
    protected timerAmount: number = 100;
    protected thunderTimerAmount: number = 10000;
    protected thunderDelayAmount: number = 2000;
    protected thunderReactWidth: number = 160;
    protected thunderReactHeight: number = 100;
    protected thunderReactX: number = 950;
    protected thunderReactY: number = 100;
    protected thunderPortraitReactX: number = 685;
    protected thunderPortraitReactY: number = 713;
    protected rotationMultiplyValue: number = 50;
    protected colorCode: any = '0xDE3249';
    private portrait: boolean = false;
    private AllTimer :any [] = [];

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.AllTimer =[];
        this.state = {
            uiElements: [],
            lang: "en",
            width: this.props.width,
            height: this.props.height,
            pixelRatio: window.devicePixelRatio,
            resizing: false,
        }
        this.portrait = this.props.layoutMode === 'Portrait' ? true : false;
        // this.gofCommonGameContainer = React.createRef();
        this.gofCommonGameContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";

        }
        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
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
        this.imageChangingMethod();
    }


    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
    }

    imageChangingMethod() {
        if (this.props.basegamestate) {
            if (this.ui_mode === "mobile") {
                if (!this.portrait) {
                    this.freeGameBgImageLandscape.visible = false;
                    this.freeGameSkyImageLandscape.visible = false;
                    this.baseGameBgImageLandscape.visible = true;
                    this.baseGameSkyImageLandscape.visible = true;
                } else {
                    this.baseGameBgImagePortrait.visible = true;
                    this.freeGameBgImagePortrait.visible = false;
                }

            } else {
                this.freeGameBgImageDesktop.visible = false;
                this.freeGameSkyImageDesktop.visible = false;
                this.baseGameBgImageDesktop.visible = true;
                this.baseGameSkyImageDesktop.visible = true;

            }
        }
        else {

            if (this.ui_mode === "mobile") {
                if (window.innerWidth > window.innerHeight) {
                    this.freeGameBgImageLandscape.visible = true;
                    this.freeGameSkyImageLandscape.visible = true;
                    this.baseGameBgImageLandscape.visible = false;
                    this.baseGameSkyImageLandscape.visible = false;
                } else {
                    this.baseGameBgImagePortrait.visible = false;
                    this.freeGameBgImagePortrait.visible = true;

                }

            } else {
                this.freeGameBgImageDesktop.visible = true;
                this.freeGameSkyImageDesktop.visible = true;
                this.baseGameBgImageDesktop.visible = false;
                this.baseGameSkyImageDesktop.visible = false;
            }
        }
    }

    movingCloud() {
        let cloud_A_Image = UIManager.getRef("image_cloud_a_" + this.ui_mode);
        let cloud_B_Image = UIManager.getRef("image_cloud_b_" + this.ui_mode);
        cloud_A_Image.x += this.cloudScale;
        cloud_B_Image.x += this.cloudScale;
        if (cloud_A_Image.x > this.cloudALastX) {
            cloud_A_Image.x = this.cloudAInitialX;
        }
        if (cloud_B_Image.x > this.cloudBLastX) {
            cloud_B_Image.x = this.cloudBInitialX;
        }
    }
    movingCloud_() {
        let cloud_A_Image = UIManager.getRef("image_cloud_a_" + this.ui_mode);
        let cloud_B_Image = UIManager.getRef("image_cloud_b_" + this.ui_mode);
        /* cloud_A_Image.x += this.cloudScale;
        cloud_B_Image.x += this.cloudScale;
        if (cloud_A_Image.x > this.cloudALastX) {
            cloud_A_Image.x = this.cloudAInitialX;
        }
        if (cloud_B_Image.x > this.cloudBLastX) {
            cloud_B_Image.x = this.cloudBInitialX;
        } */
        this.addCloudTween(cloud_A_Image, this.cloudALastX, this.cloudAInitialX)
        this.addCloudTween(cloud_B_Image, this.cloudBLastX, this.cloudBInitialX)
    }

    addCloudTween(displayObj: any, endPoint: any, initialPoint: any) {
        if (displayObj) {
           let _tween =  new Tween(
                [displayObj],
                {

                    'x': { start: displayObj.x, end: endPoint }

                },
                30,
                easing.easeLinear,
                false, null, null, null, null, false, onchange, () => {
                    displayObj.x = initialPoint;
                    this.addCloudTween(displayObj, endPoint, initialPoint);
                    _tween.dispose();

                }
            )
        }

    }

    initializeObjectToVariable() {
        this.baseGameSkyImageLandscape = UIManager.getRef("image_basegameSky-bg_mobile");
        this.freeGameSkyImageLandscape = UIManager.getRef("image_freegameTop-fg_mobile");
        this.freeGameBgImageLandscape = UIManager.getRef("image_freegame-fg1");
        this.baseGameBgImageLandscape = UIManager.getRef("image_basegame-bg1");
        this.baseGameBgImagePortrait = UIManager.getRef("image_commongame-potrait-bg");
        this.freeGameBgImagePortrait = UIManager.getRef("image_commongame-potrait-fg");
        this.baseGameSkyImageDesktop = UIManager.getRef("image_basegameSky-bg_desktop");
        this.baseGameBgImageDesktop = UIManager.getRef("image_basegame-bg");
        this.freeGameBgImageDesktop = UIManager.getRef("image_freegame-fg");
        this.freeGameSkyImageDesktop = UIManager.getRef("image_freegameTop-fg_desktop");
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
        this.initializeObjectToVariable();
        this.bindUI();

        let timer = TIMER.TimerManager.createTimer(this.timerAmount);
        timer.on('repeat', (i: number) => {
            if (window.innerWidth > window.innerHeight) {
                this.movingCloud();
                if (!this.props.basegamestate) {
                    timer.stop();
                    TIMER.TimerManager.removeTimer(timer);
                }
            }
        });
        //this.movingCloud();
        timer.start(true, this.timerAmount);
        let timer1 = TIMER.TimerManager.createTimer(50);
        timer1.on('end', (e: any) => {
            e.remove();
            this.bindUI();
        });
        //this.movingCloud();
        timer1.start();
        this.AllTimer.push(timer1);
    }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode
            || nextProps.basegamestate !== this.props.basegamestate
            || nextProps.inFreeGame !== this.props.inFreeGame

        ) {
            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.portrait = nextProps.layoutMode === 'Portrait' ? true : false;
                this.layoutChange(nextProps.layoutMode);
                let timer = TIMER.TimerManager.createTimer(200);
                timer.on('end', (e: any) => {
                    e.remove();
                    this.imageChangingMethod();
                });
                //this.movingCloud();
                timer.start();
                this.AllTimer.push(timer);
                return false;
            }
            if (nextProps.inFreeGame) {
                this.cleanAllTimer();
                this.imageChangingMethod();
            }
            if (nextProps.basegamestate) {

                if (isMobile) {
                    if (window.innerWidth > window.innerHeight) {
                        UIManager.getRef("image_freegame-fg1").visible = false;
                        UIManager.getRef("image_freegameTop-fg_mobile").visible = false;
                        UIManager.getRef("image_basegame-bg1").visible = true;
                        UIManager.getRef("image_basegameSky-bg_mobile").visible = true;
                    } else {
                        UIManager.getRef("image_commongame-potrait-bg").visible = true;
                        UIManager.getRef("image_commongame-potrait-fg").visible = false;
                    }
                }
                else {
                    UIManager.getRef("image_freegame-fg").visible = false;
                    UIManager.getRef("image_freegameTop-fg_desktop").visible = false;
                    UIManager.getRef("image_basegame-bg").visible = true;
                    UIManager.getRef("image_basegameSky-bg_desktop").visible = true;
                }
                if (window.innerWidth > window.innerHeight) {
                    let timer = TIMER.TimerManager.createTimer(this.timerAmount);
                    timer.on('repeat', (i: number) => {
                        if (!this.props.basegamestate) {
                            UIManager.getRef("image_cloud_a_" + this.ui_mode).visible = false;
                            UIManager.getRef("image_cloud_b_" + this.ui_mode).visible = false;
                            timer.stop();
                            TIMER.TimerManager.removeTimer(timer);
                        }
                        else {
                            UIManager.getRef("image_cloud_a_" + this.ui_mode).visible = true;
                            UIManager.getRef("image_cloud_b_" + this.ui_mode).visible = true;
                            this.movingCloud();
                        }
                    });
                    timer.start(true, this.timerAmount);
                    //this.movingCloud();
                }
            }
            if (!nextProps.basegamestate) {
                if (isMobile) {
                    if (window.innerWidth > window.innerHeight) {
                        UIManager.getRef("image_freegame-fg1").visible = true;
                        UIManager.getRef("image_freegameTop-fg_mobile").visible = true;
                        UIManager.getRef("image_basegame-bg1").visible = false;
                        UIManager.getRef("image_basegameSky-bg_mobile").visible = false;
                    } else {
                        UIManager.getRef("image_commongame-potrait-bg").visible = false;
                        UIManager.getRef("image_commongame-potrait-fg").visible = true;
                    }

                } else {
                    UIManager.getRef("image_freegame-fg").visible = true;
                    UIManager.getRef("image_freegameTop-fg_desktop").visible = true;
                    UIManager.getRef("image_basegame-bg").visible = false;
                    UIManager.getRef("image_basegameSky-bg_desktop").visible = false;
                }
                if (!isMobile || (isMobile && window.innerWidth > window.innerHeight)) {
                    this.thunderWithChangingBg();
                }
            }
            if (!nextProps.basegamestate || window.innerWidth < window.innerHeight) {
                UIManager.getRef("image_cloud_a_" + this.ui_mode).visible = false;
                UIManager.getRef("image_cloud_b_" + this.ui_mode).visible = false;
            }
            return false;
        }
        return true;
    }

    thunderWithChangingBg() {
        const thing = new PIXI.Graphics();
        thing.beginFill(this.colorCode);
        thing.drawRect(0, 0, this.thunderReactWidth, this.thunderReactHeight);
        thing.endFill();
        if (isMobile && window.innerWidth > window.innerHeight) {
            thing.x =this.thunderPortraitReactX;
            thing.y =this.thunderPortraitReactY;
        } else {
            thing.x = this.thunderReactX;
            thing.y = this.thunderReactY;
        }
        UIManager.getRef("image_freegameTop-fg_" + this.ui_mode).parent.addChild(thing);
        let cloudImage = UIManager.getRef("image_freegameTop-fg_" + this.ui_mode);
        let colorMatrix = new PIXI.filters.ColorMatrixFilter();
        cloudImage.filters = [colorMatrix];
        let rotationValue = 1;
        let thunderObj = UIManager.getRef("FG_thunder_Anim_" + this.ui_mode);
        let timer = TIMER.TimerManager.createTimer(this.thunderTimerAmount);
        timer.on('repeat', (i: number) => {
            thunderObj.visible = true;
            thunderObj.gotoAndPlay(0);
            rotationValue++;
            colorMatrix.hue(rotationValue * this.rotationMultiplyValue, false);
            thunderObj.onComplete = () => {
                thunderObj.visible = false;
                rotationValue = 1;
                colorMatrix.hue(rotationValue * 1, false);
            }
        });
        timer.start(true, this.thunderDelayAmount);
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        this.initializeObjectToVariable();
        this.imageChangingMethod.call(this);
        if (!this.props.basegamestate || window.innerWidth < window.innerHeight) {
            UIManager.getRef("image_cloud_a_" + this.ui_mode).visible = false;
            UIManager.getRef("image_cloud_b_" + this.ui_mode).visible = false;
        }
    }

    render() {
        return (
            <UIManager id={"gofCommonGameContainer"} name={"gofCommonGameContainer"} type={"Container"} app={this.app}
                ref={i => this.gofCommonGameContainer = i} configGame={configGame}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            app={this.app} configGame={configGame}
                            id={i.id} {...i} />)
                }
            </UIManager>)
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'basegameState' | 'applicationState' | 'SQModelState' | 'freegameState'>): IStateToProps =>
    ({
        basegamestate: state.basegameState.basegamestate,
        layoutMode: state.applicationState.layoutMode,
        resizeWidth: state.applicationState.resizeWidth,
        inFreeGame: state.freegameState.inFreeGame,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
    }))(withCommonGameConfiguration(GofCommonGame)));