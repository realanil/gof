import React from "react";
import MAINPAGE from "./core/components/mainpage";
import { Provider } from "react-redux";
import { Stage, Sprite, Container } from "@inlet/react-pixi";
import { alllanguage, lanAssetConfig } from "./data/lang";
import * as PIXI from "pixi.js";
import Layouts from "./core/components/layouts/layouts";
import Detectdevices from "./core/components/device/detectdevices";
import HtmlElementGenericUI from "./behaviour/htmlElementGenericUI/htmlElementGenericUI";
import { isMobile } from "react-device-detect";
import ServerComm from "./serverComm/serverComm";
import KeyboardListener from "./core/components/keyboardListeners/keyboardListener";
import Cheat from "./cheat/cheat";
import packageJson from '../package.json';

window.PIXI = PIXI;
interface IProps {
  [x: string]: any;
}

interface IState {
  [x: string]: any;


}

class GameApp extends React.Component<IProps, IState> {
  protected contentContainer: any;
  protected logoImageXInPortrait: number = 550;
  protected logoImageYInPortrait: number = 750;
  protected logoImageXInLandscape: number = 940;
  protected logoImageYInLandscape: number = 411;
  protected NewlogoImageXInPortrait: number = 550;
  protected NewlogoImageYInPortrait: number = 1300;
  protected NewlogoImageXInLandscape: number = 940;
  protected NewlogoImageYInLandscape: number = 900;
  private minFullHDWidth: number = 1024;
  private HDReadyWidth: number = 1280;
  private minFullHDPxRatio: number = 2;
  private graphicImagePage: string = "";
  private canvasBgImagePage: string = "";
  private bwLogoImage: string = "";

  constructor(props: any) {
    super(props);
    this.state = {
      width: this.props.width,
      height: this.props.height,
    };
    this.contentContainer = {};
    this.chooseAssets();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.contentResize();
  }

  updateDimensions() {
    if (isMobile) {
      if (window.innerHeight > window.innerWidth) {
        this.setState((prevState) => {
          return {
            ...prevState,
            width: this.props.constant.configGame.portraitCanvasWidth,
            height: this.props.constant.configGame.portraitCanvasHeight,
          };
        }, this.contentResize);
      } else {
        this.setState((prevState) => {
          return {
            ...prevState,
            width: this.props.constant.configGame.landscapeCanvasWidth,
            height: this.props.constant.configGame.landscapeCanvasHeight,
          };
        }, this.contentResize);
      }
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          width: this.props.constant.configGame.canvasWidth,
          height: this.props.constant.configGame.canvasHeight,
        };
      }, this.contentResize);
    }
  }

  contentResize() {
    let viewWidth,
      viewHeight,
      detectDevices = new Detectdevices();
    if (
      detectDevices.isHandheld() === true &&
      detectDevices.isSafariBrowser() === false
    ) {
      if (detectDevices.isIOS9Mobile() === true) {
        viewWidth = window.outerWidth;
        viewHeight = window.outerHeight;
      } else {
        viewWidth = Math.min(
          document.documentElement.clientWidth,
          window.outerWidth || 0
        );
        viewHeight = Math.min(
          document.documentElement.clientHeight,
          window.outerHeight || 0
        );
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
    let gameCanvas: any = document.getElementById("gameCanvas");
    gameCanvas.getContext("2d");
  }

  chooseAssets() {
    let screen = window.screen;
    let isFullHD = false;
    // FullHD atlas will be loaded on devices whose base resolution is greater than 1024px width and its pixel ratio (density) is greater than 1 (https://mydevice.io/devices/)
    // In the case of computer screens which normally have a pixel ratio of 1, it will be checked if the base resolution is HDReady or FullHD to load the fullHD atlas
    if (
      ((screen.width >= this.minFullHDWidth ||
        screen.height >= this.minFullHDWidth) &&
        window.devicePixelRatio >= this.minFullHDPxRatio) ||
      screen.width >= this.HDReadyWidth ||
      screen.height >= this.HDReadyWidth
    ) {
      isFullHD = true;
    }
    if (isFullHD) {
      this.graphicImagePage = "HD/assets/loader/graphic.png";
      this.bwLogoImage = "HD/assets/loader/BW_Logo.png";
      this.canvasBgImagePage = "HD/assets/commongame/paytable_loading_bg2048.jpg";
     // this.canvasBgImagePage = "HD/assets/commongame/basegame_2048.jpg";
    } else {
      this.graphicImagePage = "LD/assets/loader/graphic.png";
      this.bwLogoImage = "LD/assets/loader/BW_Logo.png";
      this.canvasBgImagePage = "LD/assets/commongame/paytable_loading_bg2048.jpg";
      //this.canvasBgImagePage = "HD/assets/commongame/basegame_2048.jpg";
    }
  }
  loaderUi() {
    let loaderScreenImageX = this.logoImageXInLandscape,
      loaderScreenImageY = this.logoImageYInLandscape;
    if (isMobile) {
      if (window.innerHeight > window.innerWidth) {
        loaderScreenImageX = this.logoImageXInPortrait;
        loaderScreenImageY = this.logoImageYInPortrait;
      } else {
        loaderScreenImageX = this.logoImageXInLandscape;
        loaderScreenImageY = this.logoImageYInLandscape;
      }
    }
    let logoImageX = this.NewlogoImageXInLandscape,
      logoImageY = this.NewlogoImageYInLandscape;
    if (isMobile) {
      if (window.innerHeight > window.innerWidth) {
        logoImageX = this.NewlogoImageXInPortrait;
        logoImageY = this.NewlogoImageYInPortrait;
      } else {
        logoImageX = this.NewlogoImageXInLandscape;
        logoImageY = this.NewlogoImageYInLandscape;
      }

    }
    return (
      <Container  >
        <Sprite
          x={loaderScreenImageX}
          y={loaderScreenImageY}
          image={this.graphicImagePage}
          anchor={[0.5, 0.5]}
          name={this.props.name=== undefined?'sprite':this.props.name }
          key={`sprite-${Math.random()*10000}`}
        ></Sprite>
  
         <Sprite
         x={logoImageX}
         y={logoImageY}
         image={this.bwLogoImage}
         anchor={[0.5, 0.5]}
         scale={[0.1]}
         name={this.props.name=== undefined?'sprite':this.props.name }
         key={`sprite-${Math.random()*10000}`}
       ></Sprite>
      </Container>
   
       
    );
  }

  



  useQuery = () => {
    let search = window.location.search;
    return new URLSearchParams(search);
  };

  setQueryStringParameter() {
    let currCode = this.useQuery().get("currency");
    if (currCode === undefined || currCode === null || currCode === "") {
      currCode = "GBP";
    }
    localStorage.setItem("langCode", "en");
    localStorage.setItem("currCode", currCode || "GBP");
    localStorage.setItem("gameVersion",packageJson.version );
  }

  getGameStart() {
    this.setQueryStringParameter();
    let langCode = localStorage.getItem("langCode");
    let cheatEnable: boolean = localStorage.getItem("cheatEnable") == "true";
    const langObj: Record<any, any> =
      alllanguage[langCode as keyof typeof alllanguage];
    let { width, height } = this.state;
    let PROPS_TO_SEND_MAINPAGE = {
      langCode: langCode,
      langObj: langObj,
      constant: this.props.constant,
      detectDevices: new Detectdevices(),
      lanAssetConfig: lanAssetConfig,
      width: width,
      height: height,
      configGame: this.props.configGame,
      LOADERUI: this.loaderUi(),
      

    };
    let PROPS_TO_SEND_HtmlElementGenericUI = {
      langCode: langCode,
      langObj: langObj,
      constant: this.props.constant,
      detectDevices: new Detectdevices(),
      lanAssetConfig: lanAssetConfig,
      width: this.props.configGame.CANVAS_WIDTH,
      height: this.props.configGame.CANVAS_HEIGHT,
      configGame: this.props.configGame,
    };

    return (
      <div  id="mainDiv">
        <div id={"bg"}>
          <img
            alt="Canvas Background"
            className={"canvasBgImage"}
            id={"canvasBgImageId"}
            src={this.canvasBgImagePage}
            width={window.innerWidth + "vw"}
            height={window.innerHeight + "vh"}
          ></img>
        </div>

        <Stage id={"gameCanvas"} width={width} height={height} >
          <Provider store={this.props.Gamestore} >
            <Container ref={(i) => (this.contentContainer = i)}  >
              <MAINPAGE {...PROPS_TO_SEND_MAINPAGE} />

            </Container>
          </Provider>
        </Stage>
        <Provider store={this.props.Gamestore}>
          <HtmlElementGenericUI
            {...PROPS_TO_SEND_HtmlElementGenericUI}
          ></HtmlElementGenericUI>
          <ServerComm></ServerComm>
          <Layouts></Layouts>
          <KeyboardListener
            {...PROPS_TO_SEND_HtmlElementGenericUI}
          ></KeyboardListener>
        </Provider>
        <div id={"cheat-section"} style={{ visibility: "hidden" }}>
          {<Cheat></Cheat>}
        </div>
      </div>
    );
  }

  render() {
    return this.getGameStart();
  }
}

export default GameApp;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

//https://www.youtube.com/watch?v=CVpUuw9XSjY

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
