import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withMultiplierConfiguration from "./configuration/withMultiplierConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import * as PIXI from 'pixi.js';
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { isMobile } from "react-device-detect";
import { TIMER } from "../../core/utills";
import { actions as multiplierActions } from "../../gamereducer/multiplierReducer";


interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;


}

interface IStateToProps {
    layoutMode: any;
    multiplierActive: any;
    multiplierCurrentValue: any;
    reel_data:any

}

interface IDispatchToProps {

}

interface IState {
    [x: string]: any;
}

class Multiplier extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected multiplierContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;
    protected objName: any;
    protected multiplierTextMobile: any;
    protected multiplierTextDesktop: any;
    protected multiplierBigTextMobile: any;
    protected multiplierBigTextDesktop: any;
    protected blastAnimationDesktop: any;
    protected blastAnimationMobile: any;
    protected graphicDesktop: any;
    protected graphicMobile: any;
    protected timerTime: number = 2500;
    protected timerDelay: number = 20;
    protected multiplierHighestValue: number = 10;
    protected showBigMultiplier: boolean = false;
    private AllTimer :any [] = [];

    constructor(props: IProps) {
        super(props);
        this.AllTimer =[];
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en"
        }
        // this.multiplierContainer = React.createRef();
        this.multiplierContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }

        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));
        this.objName = 1;
    }

    checkUiMode(uimodeobj: any) {

        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both";
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    //this method will call after the first rendering for scaling and logo animation looping
    bindUI() {
        this.layoutChange(this.props.layoutMode);
    }

    //this method will initialize object to variables
    initializeObjectInVariable() {
        this.multiplierTextMobile = UIManager.getRef("multiplierText_mobile");
        this.multiplierTextDesktop = UIManager.getRef("multiplierText_desktop");
        this.multiplierBigTextMobile = UIManager.getRef("multiplierBigText_mobile");
        this.multiplierBigTextDesktop = UIManager.getRef("multiplierBigText_desktop");
        this.blastAnimationMobile = UIManager.getRef("blastAnimation_mobile");
        this.blastAnimationDesktop = UIManager.getRef("blastAnimation");
        this.graphicMobile = UIManager.getRef("multiplierGraphicMobile");
        this.graphicDesktop = UIManager.getRef("multiplierGraphicDesktop");

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
        this.initializeObjectInVariable();
        this.bindUI();
        this.showBigMultiplier = false;
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any,) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
        this.orientationChange();
    }

    orientationChange() {
        if (isMobile) {
            UIManager.getRef("multiplierGraphicMobile").scale.x = 2;
            UIManager.getRef("multiplierGraphicMobile").scale.y = 2;

            UIManager.getRef("blastAnimation_mobile").scale.x = 2;
            UIManager.getRef("blastAnimation_mobile").scale.y = 2;
        } else {
            UIManager.getRef("multiplierGraphicDesktop").scale.x = 2;
            UIManager.getRef("multiplierGraphicDesktop").scale.y = 2;

            UIManager.getRef("blastAnimation").scale.x = 2;
            UIManager.getRef("blastAnimation").scale.y = 2;
        }
    }

    disappearText(obj: any, graphic: any) {
        let timer = TIMER.TimerManager.createTimer(100)

        timer.on('repeat', (i: number) => {
            obj.alpha -= 0.2;
            graphic.alpha -= 0.2;
            if (obj.alpha <= 0) {
                obj.visible = false;
                graphic.visible = false;
                obj.alpha = 1;
                graphic.alpha = 1;
                timer.stop();
            }
        })
        timer.start(true);
    }

    bigTextEffect(value: any) {
        let obj;
        if (isMobile) {
            this.graphicMobile.visible = true;
            this.multiplierBigTextMobile.visible = true;
            this.multiplierBigTextMobile.text = "x" + value;

            let timer = TIMER.TimerManager.createTimer(900)

            timer.on('end', (e: any) => {
                e.remove();
                this.disappearText(this.multiplierBigTextMobile, this.graphicMobile);
            })
            timer.start();
            this.AllTimer.push(timer);

        } else {
            this.graphicDesktop.visible = true;
            this.multiplierBigTextDesktop.visible = true;
            this.multiplierBigTextDesktop.text = "x" + value;

            let timer = TIMER.TimerManager.createTimer(900)
            timer.on('end', (e: any) => {
                e.remove();
                this.disappearText(this.multiplierBigTextDesktop, this.graphicDesktop);
            })
            timer.start();
            this.AllTimer.push(timer);
        }
    }

    numberStartChanging(nextProps: any) {

        if (isMobile) {
            this.multiplierTextMobile.text = "x" + nextProps.multiplierCurrentValue;

            this.showBigMultiplier && this.bigTextEffect(nextProps.multiplierCurrentValue);
            this.blastAnimationMobile.visible = true;
            this.blastAnimationMobile.gotoAndPlay(0);
        } else {
            this.multiplierTextDesktop.text = "x" + nextProps.multiplierCurrentValue;
            this.showBigMultiplier && this.bigTextEffect(nextProps.multiplierCurrentValue);
            this.blastAnimationDesktop.visible = true;
            this.blastAnimationDesktop.gotoAndPlay(0);
        }
        this.showBigMultiplier = true;
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.reel_data != this.props.reel_data) {
            this.cleanAllTimer();
            return false;
        }

        if (nextProps.layoutMode !== this.props.layoutMode || nextProps.multiplierActive !== this.props.multiplierActive
            || nextProps.multiplierCurrentValue !== this.props.multiplierCurrentValue) {

            if (nextProps.layoutMode !== this.props.layoutMode) {
                this.layoutChange(nextProps.layoutMode);
            }
            if (nextProps.multiplierActive) {
            }
            if (nextProps.multiplierCurrentValue !== this.props.multiplierCurrentValue) {
                this.numberStartChanging(nextProps);
            }
            return false;
        }
        return false;
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        this.orientationChange();
    }

    render() {
        return (
            <UIManager id={"multiplierContainer"} name={"multiplierContainer"} type={"Container"}
                ref={i => this.multiplierContainer = i} configGame={this.props.configGame}
                app={this.app}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={this.props.configGame}
                            scope={this} />
                    )
                }
            </UIManager>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'MultiplierState' | 'applicationState' | 'reelgridState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        multiplierActive: state.MultiplierState.multiplierActive,
        multiplierCurrentValue: state.MultiplierState.multiplierCurrentValue,
        reel_data: state.reelgridState.reel_data,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        activeMultiplier: (multiplierActive: boolean): any => dispatch(multiplierActions.activeMultiplier(multiplierActive)),
    }))(withMultiplierConfiguration(Multiplier)));