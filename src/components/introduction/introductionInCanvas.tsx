import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import UIManager from "../../core/components/ui/UiBuilder";
import { alllanguage } from "../../data/lang";
import { Ilanguage } from "../../core/interface/Icommon";
import withIntroductionScreenConfiguration from "../../core/components/introductionScreen/configuration/withintroductionScreenConfiguration";
import { actions as introductionActions } from "../../gamereducer/introductionPageReducer";
import { isMobile } from "react-device-detect";
import { actions as applicationActions } from "../../core/reducers/applicationStateReducer";
import { actions as soundActions } from "../../core/reducers/soundReducer";
import { actions as layoutsActions } from "../../core/reducers/layoutsStateReducer";
import { actions as freegameAction } from "../../core/reducers/freeGameReducer";
import { Tween } from "../../core/components/effect/tween";
import { TIMER } from "../../core/utills";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as introductionScreenActions } from "../../core/reducers/introductionScreenReducer";
import { Texture } from "pixi.js";
import { actions as applicationStateActions } from "../../core/reducers/applicationStateReducer";
import * as PIXI from "pixi.js";


interface IStore {
  [x: string]: any;
}

interface IProps {
  [x: string]: any;
}

interface IStateToProps {
  [x: string]: any;
}

interface IDispatchToProps { }

interface IState {
  [x: string]: any;
}

class IntroductionInCanvas extends Component<IProps, IState> {
  protected app: PIXI.Application;
  protected introductionContainer: _ReactPixi.IContainer | Ref<any>;
  private allLanguage: Ilanguage;
  private introductionContainerHolder: any;
  private backgroundImagePortrait: any;
  private backgroundImage: any;
  protected ui_mode: string;
  protected displayUI: any;
  protected scalingOfPortraitBg: number = 0.8;
  protected xCoordinateOfPortraitBg: number = -228;
  protected yCoordinateOfPortraitBg: number = 203;
  protected timerAmount: number = 200;
  private minFullHDWidth: number = 1024;
  private HDReadyWidth: number = 1280;
  private fullHDWidth: number = 1920;
  private minFullHDPxRatio: number = 2;
  private canvasBgImagePage: string = "";
  private tweenTimer: number = 0.001;
  protected textScaling: number = 0.9;
  private blackmaskVisibility = false;

  constructor(props: IProps) {
    super(props);
    this.app = props.app;
    this.allLanguage = alllanguage;
    this.state = {
      uiElements: [],
      lang: "en",
      width: this.props.width,
      height: this.props.height,
      pixelRatio: window.devicePixelRatio,
      resizing: false,
    };
    if (isMobile) {
      this.ui_mode = "mobile";
    } else {
      this.ui_mode = "desktop";
    }
    // this.introductionContainer = React.createRef();
    this.introductionContainer = {}
    this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
    this.blackmaskVisibility = true;
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

  componentDidMount() {
    this.blackmaskVisibility = false;
    UIManager.getRef("Text_WinMultiplier") && UIManager.setText("Text_WinMultiplier", this.props.langObj["introductionText_7"]);
    this.layoutChange(this.props.layoutMode);

  }

  //this method will initialize object to variables
  initializeObjectInVariable() {
    this.backgroundImage = UIManager.getRef("backgroundImageOfIntroductionPage");
    this.backgroundImagePortrait = UIManager.getRef("backgroundImageOfIntroductionPage_portrait");
  }


  //when layout changes, this method will be called
  layoutChange(currentLayout: string) {
    this.chooseAssets();
    this.displayUI.map((data: any) => {
      if (data.layout === true) {
        this.props.setApplicationLayoutObject(data.name);
      }
    });
  }
  continueButtonVisibility() {
    if (this.props.showRealityCheck && UIManager.getRef("postIntro_continueButton_" + this.ui_mode)) {
      UIManager.getRef("postIntro_continueButton_" + this.ui_mode).texture = Texture.from("continue_disable.png");
      UIManager.getRef("postIntro_continueButton_" + this.ui_mode).interactive = false;
    }
    if (!this.props.showRealityCheck && UIManager.getRef("postIntro_continueButton_" + this.ui_mode)) {
      UIManager.getRef("postIntro_continueButton_" + this.ui_mode).texture = Texture.from("continue_up.png");
      UIManager.getRef("postIntro_continueButton_" + this.ui_mode).interactive = true;

    }
  }
  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
    if (nextProps.layoutMode !== this.props.layoutMode) {
      this.layoutChange(nextProps.layoutMode);
      return false;
    }
    if (nextProps.introductionScreenVisible !== this.props.introductionScreenVisible || nextProps.gameBroken !== this.props.gameBroken ||
      nextProps.showIntroductionPage !== this.props.showIntroductionPage
      || nextProps.freegameSpinCountRemaining !== this.props.freegameSpinCountRemaining
    ) {
      if (nextProps.gameBroken) {
        nextProps.hideIntroductionPage();
      }
      return false;
    }

    if (nextProps.showIntroScreen && nextProps.showIntroScreen !== this.props.showIntroScreen) {
      this.blackmaskVisibility = true;
      let timer = TIMER.TimerManager.createTimer(1000);
      timer.on("end", (e: any) => {
        e.remove();
        if (UIManager.getRef("UIManager-blackGraphic")) {
          this.tweenTo(
            UIManager.getRef("UIManager-blackGraphic"), "alpha", 0, 0.9, "easeOutSine", null,
            () => { this.blackmaskVisibility = false; });
        }
      });
      timer.start();
    }
    return true;
  }


  chooseAssets() {
    let screen = window.screen;
    let isFullHD = false;
    if (((screen.width >= this.minFullHDWidth || screen.height >= this.minFullHDWidth) && window.devicePixelRatio >= this.minFullHDPxRatio) || screen.width >= this.HDReadyWidth || screen.height >= this.HDReadyWidth) {
      isFullHD = true;
    }
    if (isFullHD) {
      this.canvasBgImagePage = "HD/assets/commongame/basegame_2048.jpg";
    } else {
      this.canvasBgImagePage = "LD/assets/commongame/basegame_2048.jpg";
    }
  }
  tweenTo(
    object: any, property: any, target: any, time: any, easing: any, onchange: any,
    oncomplete: any, start?: number) {
    new Tween([object],
      {
        [property]: { start: object[property], end: target },
      }, time || this.tweenTimer, easing, false, null, null, null, null, false, onchange, oncomplete);
  }

  //this method will be called when a button gets clicked
  handleEvent = (e: any) => {
    if (e.target.name === "postIntro_continueButton_desktop" || e.target.name === "postIntro_continueButton_mobile") {
      this.props.setApplicationButtonClicked(true);
      this.props.setApplicationButtonClicked(false);
      this.props.setApplicationShowHelpText(true);
      this.props.introScreenVisible(false);
      this.props.setApplicationShowHelpText(false);
      (document.getElementsByClassName("canvasBgImage")[0] as any).src = this.canvasBgImagePage;
      UIManager.getRef("introductionContainer").visible = true;
      UIManager.getRef("introductionContainer").alpha = 1;
      UIManager.getRef("UIManager-blackGraphic").visible = true;
      UIManager.getRef("UIManager-blackGraphic").alpha = 1;
      this.tweenTo(UIManager.getRef("introductionContainer"), "alpha", 0, 0.1, "easeInCubic", null,
        () => {
          this.props.hideIntroductionPage();
            this.playGameSound();
          if (UIManager.getRef("UIManager-blackGraphic")) {
            this.tweenTo(UIManager.getRef("UIManager-blackGraphic"), "alpha", 0, 0.6, "easeInCubic", null,
              () => {
                this.forceUpdate();
              }
            );
          }
        }
      );
    }
  };
  playGameSound() {
   if(this.props.soundOnOff){
    if (((localStorage.getItem("playerId-sound-" + this.useQuery().get("token")) === "true") ? true : false)) {
      this.props.soundLoadStartFunction(true);
      this.props.playingSound(true);
    }else{
      this.props.soundLoadStartFunction(true);
      this.props.playingSound(false);
    }
   }
  
  }
  useQuery = () => {
    let search = window.location.search;

    return new URLSearchParams(search);
  }
  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
    this.initializeObjectInVariable();
    if (isMobile) {
      UIManager.getRef("UIManager-blackGraphic") && (UIManager.getRef("UIManager-blackGraphic").width = this.props.resizeWidth);
      if (this.props.layoutMode === "Portrait") {
        UIManager.getRef("UIManager-blackGraphic") && (UIManager.getRef("UIManager-blackGraphic").height = this.props.resizeWidth);
      } else {
        UIManager.getRef("UIManager-blackGraphic") && (UIManager.getRef("UIManager-blackGraphic").height = this.props.resizeWidth);
      }
    }
    if (isMobile && window.innerWidth < window.innerHeight) {
      this.backgroundImagePortrait && (this.backgroundImagePortrait.visible = true);
      this.backgroundImage && (this.backgroundImage.visible = false);
      this.layoutChange(this.props.layoutMode);

      UIManager.getRef("assetsContainerOfIntroWithoutBg") && (UIManager.getRef("assetsContainerOfIntroWithoutBg").scale.x = 0.6);
      UIManager.getRef("assetsContainerOfIntroWithoutBg") && (UIManager.getRef("assetsContainerOfIntroWithoutBg").scale.y = 0.6);
      UIManager.getRef("assetsContainerOfIntroWithoutBg") && (UIManager.getRef("assetsContainerOfIntroWithoutBg").x = -42);
      UIManager.getRef("assetsContainerOfIntroWithoutBg") && (UIManager.getRef("assetsContainerOfIntroWithoutBg").y = 284);
    }
    if (isMobile && window.innerWidth > window.innerHeight) {
      this.backgroundImagePortrait && (this.backgroundImagePortrait.visible = false);
      this.backgroundImage && (this.backgroundImage.visible = true);

    }

    if (UIManager.getRef("Text_Continue_" + this.ui_mode)) {
      let continueText = UIManager.getRef("Text_Continue_" + this.ui_mode);
      UIManager.getRef("postIntro_continueButton_" + this.ui_mode).mousedown = (event: any) => {
        continueText.scale.set(this.textScaling);
      };
      UIManager.getRef("postIntro_continueButton_" + this.ui_mode).mouseup = (event: any) => {
        continueText.scale.set(1);
      };

      UIManager.getRef("postIntro_continueButton_" + this.ui_mode).mouseout = (event: any) => {
        continueText.scale.set(1);
      };
    }

    this.continueButtonVisibility();


  }

  render() {
    if (this.props.freegameSpinCountRemaining != undefined) {
      return <></>;
    }


    if (!this.props.showIntroScreen) {
      return <></>;
    }
    let blackAreaConfig = {
      name: "UIManager-blackGraphic",
      type: "Graphic",
      shape: "rectangle",
      visible: this.blackmaskVisibility,
      alpha: 1,
      color: "0x000000",
      x: 0,
      y: 0,
      width: 1920,
      height: 1080,
    };

    return (
      <UIManager
        visible={this.props.startRendering}
        id={"mainintroductionContainer"}
        name={"mainintroductionContainer"}
        type={"Container"}
        app ={this.app}
        configGame={this.props.configGame}
      >
        <UIManager
          visible={this.props.startRendering}
          id={"introductionContainer"}
          name={"introductionContainer"}
          type={"Container"}
          configGame={this.props.configGame}
          app ={this.app}
          ref={(i) => (this.introductionContainer = i)}
        >
          {this.displayUI &&
            this.displayUI.map((i: any) => (
              <UIManager
                key={`UIManager-Introduction-${Math.random()}`}
                langObj={this.props.langObj}
                type={i.type}
                id={i.id}
                {...i}
                app={this.app}
                ClickHandler={this.handleEvent}
                configGame={this.props.configGame}
              />
            ))}
        </UIManager>
        <UIManager
          key={`UIManager-blackGraphic`}
          langObj={this.props.langObj}
          id={"UIManager-blackGraphic"}
          {...blackAreaConfig}
          app={this.app}
          configGame={this.props.configGame}
        />

      </UIManager>
    );
  }
}

export default withPixiApp(
  connect((state: Pick<IStore, | "introductionState" | "applicationState" | "freegameState" | "asyncInitAction" | "introductionScreenState" | "behaviourState">): IStateToProps => ({
    showIntroductionPage: state.introductionState.showIntroductionPage,
    layoutMode: state.applicationState.layoutMode,
    resizeWidth: state.applicationState.resizeWidth,
    resizeHeight: state.applicationState.resizeHeight,
    scaleX: state.applicationState.scaleX,
    introductionScreenVisible: state.introductionState.introductionScreenVisible,
    scaleY: state.applicationState.scaleY,
    freegameSpinCountRemaining: state.freegameState.freegameSpinCountRemaining,
    gameBroken: state.asyncInitAction.gameBroken,
    startRendering: state.asyncInitAction.startRendering,
    showIntroScreen: state.introductionScreenState.showIntroScreen,
    showRealityCheck: state.behaviourState.showRealityCheck,
    soundOnOff: state.applicationState.soundOnOff,

  }),
    (dispatch: Dispatch): IDispatchToProps => ({
      hideIntroductionPage: (): any => dispatch(introductionActions.hideIntroductionPage()),
      showIntroductionPageFun: (): any => dispatch(introductionActions.introductionPageShow()),
      setApplicationLayoutMode: (layout: string): any => dispatch(applicationActions.setApplicationLayoutMode(layout)),
      playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
      setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutsActions.setApplicationLayoutObject(layoutobjectlist)),
      nextFreegame: (): any => dispatch(freegameAction.nextFreegame()),
      setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
      soundLoadStartFunction: (soundLoadStart: boolean): any => dispatch(soundActions.soundLoadStartFunction(soundLoadStart)),
      playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
      introScreenVisible: (showIntroScreen: boolean): any => dispatch(introductionScreenActions.introScreenVisible(showIntroScreen)),
      setApplicationShowHelpText: (showHelpText: boolean): any => dispatch(applicationStateActions.setApplicationShowHelpText(showHelpText)),
    })
  )(withIntroductionScreenConfiguration(IntroductionInCanvas))
);
