import React, { Component } from "react";
import { withPixiApp } from "@inlet/react-pixi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { isMobile } from "react-device-detect";
import withHtmlElementConfiguration from "../../core/components/htmlElementPanel/configuration/withHtmlElementConfiguration";
import GameGuideComponent from "../gameGuideComponent/gameGuideComponent";
import { TIMER } from "../../core/utills";
import { alllanguage, lanAssetConfig } from "../../data/lang";
import * as PIXI from "pixi.js";


interface IStore {
    [x: string]: any;
}

interface IProps {
    [x: string]: any;
}

interface IState {

}

interface IState {
    isGameLoaded: boolean,
    GameType: string,
    width: number | string,
    height: number | string,
    pixelRatio: number,
    resizing: boolean,
    lang: string
}

interface IStateToProps {
}

interface IDispatchToProps {
}

class HtmlElementGenericUI extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected HtmlElementGenericUI: any;   
    constructor(props: IProps) {
        super(props);       
        this.app = props.app;
        this.state = {
            width: this.props.width,
            height: this.props.height,
            pixelRatio: window.devicePixelRatio,
            isGameLoaded: false,
            resizing: false,
            GameType: "BASE",
            lang: this.props.langcode
        }
    }


    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
    }

    //this method will update size of canvas according to layout
    updateDimensions = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                width: window.innerWidth,
                height: window.innerHeight,
                pixelRatio: window.devicePixelRatio || 1
            }
        })
        this.calculateCanvas();
    };

    iniFrame() {
        if (window.location !== window.parent.location) {
            return true
        } else {

            return false
        }
    }

    //this method will calculate the canvas
    calculateCanvas() {
        if (this.iniFrame()) {
            this.handleResizeChange()
        } else {
            this.handleResizeChangeInIframe()
        }
    }


    handleResizeChangeInIframe_() {
        const {
            pixelRatio
        } = this.state;
        let
            width = 0,
            height = 0,
            scaleX = 0,
            scaleY = 0,
            scaleFactor = 0,
            viewWidth = 0,
            viewHeight = 0;
        let viewportWidth, viewportHeight: any;


        if (isMobile) {
            if (window.innerHeight > window.innerWidth) {
                viewportWidth = this.props.constant.configGame.portraitCanvasWidth;
                viewportHeight = this.props.constant.configGame.portraitCanvasHeight;
            } else {
                viewportWidth = this.props.constant.configGame.landscapeCanvasWidth;
                viewportHeight = this.props.constant.configGame.landscapeCanvasHeight;
            }
        } else {
            viewportWidth = this.props.constant.configGame.canvasWidth;
            viewportHeight = this.props.constant.configGame.canvasHeight;

        }

        //isMobile
        if (this.props.detectDevices.isHandheld() === true && this.props.detectDevices.isSafariBrowser() === false) {
            if (this.props.detectDevices.isIOS9Mobile() === true) {
                viewWidth = window.outerWidth;
                viewHeight = window.outerHeight;
            } else {
                viewWidth = Math.max(document.documentElement.clientWidth, window.outerWidth || 0);
                viewHeight = Math.max(document.documentElement.clientHeight, window.outerHeight || 0);
            }
        } else {
            if (isMobile) {

                viewWidth = window.outerWidth;
                viewHeight = window.outerHeight;
            } else {
                viewWidth = window.innerWidth;
                viewHeight = window.innerHeight;
            }

        }
        scaleFactor = viewHeight / viewportHeight;
        if (Math.round(scaleFactor * viewportWidth) > viewWidth) {
            width = viewWidth;
            scaleX = viewWidth / viewportWidth;

            height = Math.ceil(scaleX * viewportHeight);
            scaleY = scaleX;
        } else {
            height = viewHeight;
            scaleY = viewHeight / viewportHeight;

            width = Math.ceil(scaleY * viewportWidth);
            scaleX = scaleY;
        }

        const CAN_WIDTH = viewportWidth * Math.min(pixelRatio, 2);
        const CAN_HEIGHT = viewportHeight * Math.min(pixelRatio, 2);

        this.HtmlElementGenericUI.style.width = width + "px";
        this.HtmlElementGenericUI.style.height = height + "px";
        if (isMobile) {
            if (window.innerHeight > window.innerWidth) {
                this.HtmlElementGenericUI.style.height = width;
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        height: viewWidth,
                    }
                })
            } else {

                this.HtmlElementGenericUI.style.height = viewportHeight;
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        height: viewportHeight,
                    }
                })
            }
        }


        if (this.props.constant.configGame.centered === true) {
            alert(width + "W:" + viewWidth)
            alert(height + "H:" + viewHeight)
            this.HtmlElementGenericUI.style.position = "fixed";
            if (viewHeight > height) {
                this.HtmlElementGenericUI.style.top = (viewHeight / 2 - height / 2) + "px";
            } else {
                this.HtmlElementGenericUI.style.top = 0 + "px";
            }
            if (viewWidth > width) {
                this.HtmlElementGenericUI.style.left = (viewWidth / 2 - width / 2) + "px";
            } else {
                this.HtmlElementGenericUI.style.left = 0 + "px";
            }
        }
    }

    handleResizeChangeInIframe() {
        let
            width = 0,
            height = 0,
            scaleX = 0,
            scaleY = 0,
            scaleFactor = 0,
            viewWidth,
            viewHeight;
        let viewportWidth, viewportHeight: any;


        if (isMobile) {
            if (window.outerHeight > window.outerWidth) {
                viewportWidth = this.props.constant.configGame.portraitCanvasWidth * window.devicePixelRatio;
                viewportHeight = this.props.constant.configGame.portraitCanvasHeight * window.devicePixelRatio;
            } else {
                viewportWidth = this.props.constant.configGame.landscapeCanvasWidth * window.devicePixelRatio;
                viewportHeight = this.props.constant.configGame.landscapeCanvasHeight * window.devicePixelRatio;
            }
        } else {
            viewportWidth = this.props.constant.configGame.canvasWidth;
            viewportHeight = this.props.constant.configGame.canvasHeight;
        }

        //isMobile
        if (this.props.detectDevices.isHandheld() === true && this.props.detectDevices.isSafariBrowser() === false) {
            if (this.props.detectDevices.isIOS9Mobile() === true) {
                viewWidth = window.outerWidth;
                viewHeight = window.outerHeight;
            } else {
                viewWidth = Math.min(document.documentElement.clientWidth, window.outerWidth || 0);
                viewHeight = Math.min(document.documentElement.clientHeight, window.outerHeight || 0);
            }
        } else {
            if (isMobile) {

                viewWidth = Math.min(document.documentElement.clientWidth, window.outerWidth || 0);
                viewHeight = Math.min(document.documentElement.clientHeight, window.outerHeight || 0);
            } else {
                viewWidth = window.innerWidth;
                viewHeight = window.innerHeight;
            }
        }


        scaleFactor = viewHeight / viewportHeight;
        if (Math.round(scaleFactor * viewportWidth) > viewWidth) {
            width = viewWidth;
            scaleX = viewWidth / viewportWidth;
            height = Math.ceil(scaleX * viewportHeight);
            scaleY = scaleX;
        } else {
            height = viewHeight;
            scaleY = viewHeight / viewportHeight;
            width = Math.ceil(scaleY * viewportWidth);
            scaleX = scaleY;
        }


        if (isMobile) {
            let Can_Width, Can_Height;
            if (window.innerHeight > window.innerWidth) {
                Can_Width = this.props.constant.configGame.portraitCanvasWidth;
                Can_Height = this.props.constant.configGame.portraitCanvasHeight;
            } else {

                Can_Width = this.props.constant.configGame.landscapeCanvasWidth;
                Can_Height = this.props.constant.configGame.landscapeCanvasHeight;
            }
        }
        this.HtmlElementGenericUI && (this.HtmlElementGenericUI.style.width = width + "px");
        this.HtmlElementGenericUI && (this.HtmlElementGenericUI.style.height = height + "px");
        this.HtmlElementGenericUI && (this.HtmlElementGenericUI.style.position = "fixed");
        if (viewHeight > height) {
            this.HtmlElementGenericUI && (this.HtmlElementGenericUI.style.top = (viewHeight / 2 - height / 2) + "px");
        } else {
            this.HtmlElementGenericUI && (this.HtmlElementGenericUI.style.top = 0 + "px");
        }
        if (viewWidth > width) {
            this.HtmlElementGenericUI && (this.HtmlElementGenericUI.style.left = (viewWidth / 2 - width / 2) + "px");
        } else {
            this.HtmlElementGenericUI && (this.HtmlElementGenericUI.style.left = 0 + "px");
        }
    }

    handleResizeChange() {
        let
            width = 0,
            height = 0,
            scaleX = 0,
            scaleY = 0,
            scaleFactor = 0,
            viewWidth,
            viewHeight;
        let viewportWidth, viewportHeight: any;
        if (isMobile) {
            if (window.innerHeight > window.innerWidth) {
                viewportWidth = this.props.constant.configGame.portraitCanvasWidth;
                viewportHeight = this.props.constant.configGame.portraitCanvasHeight;
            } else {
                viewportWidth = this.props.constant.configGame.landscapeCanvasWidth;
                viewportHeight = this.props.constant.configGame.landscapeCanvasHeight;
            }
        } else {
            viewportWidth = this.props.constant.configGame.canvasWidth;
            viewportHeight = this.props.constant.configGame.canvasHeight;
        }

        //isMobile
        if (this.props.detectDevices.isHandheld() === true && this.props.detectDevices.isSafariBrowser() === false) {
            if (this.props.detectDevices.isIOS9Mobile() === true) {
                viewWidth = window.innerWidth;
                viewHeight = window.innerHeight;
            } else {
                viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            }
        } else {
            if (isMobile) {
                viewWidth = window.innerWidth;
                viewHeight = window.innerHeight;
            } else {
                viewWidth = window.innerWidth;
                viewHeight = window.innerHeight;
            }

        }
        scaleFactor = viewHeight / viewportHeight;
        if (Math.round(scaleFactor * viewportWidth) > viewWidth) {
            width = viewWidth;
            scaleX = viewWidth / viewportWidth;
            height = Math.ceil(scaleX * viewportHeight);
            scaleY = scaleX;
        } else {
            height = viewHeight;
            scaleY = viewHeight / viewportHeight;

            width = Math.ceil(scaleY * viewportWidth);
            scaleX = scaleY;
        }

        this.HtmlElementGenericUI.style.width = width + "px";
        this.HtmlElementGenericUI.style.height = height + "px";

        if (this.props.constant.configGame.centered === true) {
            this.HtmlElementGenericUI.style.position = "fixed";
            if (viewHeight > height) {
                this.HtmlElementGenericUI.style.top = (viewHeight / 2 - height / 2) + "px";
            } else {
                this.HtmlElementGenericUI.style.top = 0 + "px";
            }
            if (viewWidth > width) {
                this.HtmlElementGenericUI.style.left = (viewWidth / 2 - width / 2) + "px";
            } else {
                this.HtmlElementGenericUI.style.left = 0 + "px";
            }
        }

    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        let timer = TIMER.TimerManager.createTimer(300);
        timer.on('end', (e: any) => {          
            this.calculateCanvas();
            timer && timer.stop();
            timer && timer.reset();
            timer && timer.remove();
            
        });
        timer.start();
       
    }
      


    render() {
        let showMobViewPanelPage = false, pointerEventController = true;
        if (isMobile) {
            showMobViewPanelPage = true;
        }
        if (this.props.showAutoplay || this.props.showMenu) {
            if (isMobile) {
                pointerEventController = true;
            }
        }
        let langCode = this.props.languageCode;
        const langObj: Record<any, any> =
            alllanguage[langCode as keyof typeof alllanguage];

        let PROPS_TO_SEND_AutoplayGenericUI = {
            langcode: langCode,
            langObj: langObj,
            InCanvas: this.props.configGame.AUTOPLAY_UI_IN_CANVAS,
            width: this.props.configGame.CANVAS_WIDTH,
            height: this.props.configGame.CANVAS_HEIGHT,
        }
        return (
          <div ref={i => this.HtmlElementGenericUI = i} className={isMobile ? "htmlElementGenericUIContainerMob" : "htmlElementGenericUIContainer"} style={{
                pointerEvents: pointerEventController ? 'none' : 'auto', left: '0px', top: '0px', height: '100%'
            }}>
                {<GameGuideComponent {...PROPS_TO_SEND_AutoplayGenericUI} ></GameGuideComponent>}
            </div>
           )
    }
}


export default withPixiApp(connect(
    (state: Pick<IStore, 'autoplayState' | 'menuState' | 'applicationState' | 'behaviourState'>): IStateToProps =>
    ({
        showAutoplay: state.autoplayState.showAutoplay,
        showMenu: state.menuState.showMenu,
        maxWinOddsCount: state.behaviourState.maxWinOddsCount,
        showTopWinOdds: state.applicationState.showTopWinOdds,
        languageCode: state.applicationState.languageCode,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({}))(withHtmlElementConfiguration(HtmlElementGenericUI)));