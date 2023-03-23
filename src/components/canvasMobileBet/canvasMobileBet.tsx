import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withCanvasMobileBetConfiguration from "./configuration/withCanvasMobileBetConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { isMobile } from "react-device-detect";
import { actions as betPanelAction } from "../../core/reducers/betPanelReducer";
import { actions as gameLevelResponseActions } from "../../gamereducer/asyncGameLevelServerResponseReducer";
import { actions as baseGameActions } from "../../core/reducers/baseGameReducer";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as asyncActions } from "../../core/reducers/asyncServerResponseReducer";
import { actions as winpresentationAction } from "../../core/reducers/winPresentationReducer";
import { actions as reelsGridActions, actions as reelGridActions } from "../../core/reducers/reelgridStateReducer";
//
import { actions as desktopSettingPanelActions } from "../../core/reducers/desktopSettingPanelReducer";
import { actions as applicationStateActions } from "../../core/reducers/applicationStateReducer";
import { actions as paytableActions } from "../../core/reducers/paytableReducer";
import { actions as paytableGofActions } from "./../../gamereducer/paytableBMReducer";
import { actions as autoplayActions } from "../../core/reducers/autoplayReducer";
import { actions as menuActions } from "../../core/reducers/menuReducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { actions as aplicationActions } from "../../core/reducers/applicationStateReducer";
//
import { Texture } from "pixi.js";
import * as PIXI from "pixi.js";
import { configGame } from "../../data/config";
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

class CanvasMobileBet extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected CanvasMobileBetContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;
    protected boxWidth = 0;
    protected boxHeight = 0;
    protected boxX = 0;
    protected boxY = 0;
    protected ui_mobileMode: string = "";
    protected constantT1: number = 2000;
    public countButtonCLicked: boolean = false;
    protected storeCurrentBet: number = 0;
    public totalBetButtons: number = 9;
    public storeLastBetIndex: number = this.props.currentBetIndex; 
    constructor(props: IProps) {
        super(props);
        this.app = props.app;      
        this.state = {
            uiElements: [],
            lang: "en",
        }
        // this.CanvasMobileBetContainer = React.createRef();
        this.CanvasMobileBetContainer = {};
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
        }
        else {
            this.ui_mobileMode = '_portrait';
        }
    }
    componentDidMount() {
        this.bindUI();
        this.updateUi();
        this.layoutChange(this.props.layoutMode);
    }
    setExtraButtonsDisable() {
        for (let i = this.props.betList.length + 1; i <= this.totalBetButtons; i++) {
            UIManager.getRef("bet_btn_" + i).visible = false;
        }
    }
    scaled() {
        if (UIManager.getRef("bet_text_Bg_image")) {
            (window.innerWidth > window.innerHeight) && (UIManager.getRef("bet_text_Bg_image").scale.set(0.8));
            (window.innerWidth < window.innerHeight) && (UIManager.getRef("bet_text_Bg_image").scale.set(1));
        }
    }
    updateUi() {
        if (isMobile) {
            UIManager.getRef("bet_text") && UIManager.setText("bet_text", this.props.coinList[this.props.selectedCoin] / 2000);
            if ((this.props.betList[this.props.coinList.length - 1] > this.props.balance)) {
                UIManager.getRef("maxbetBtn")&& (UIManager.getRef("maxbetBtn").texture = Texture.from("max_disable.png"));
            }
            this.scaled();
        }
    }
    onSpin() {
        let timer = TIMER.TimerManager.createTimer(100);
        timer.on('end', (e: any) => {
            let condition;
            if (this.props.firstSpinAfterLoad) {
                condition = ((this.props.balance - this.props.coinList[this.props.selectedCoin] >= this.props.coinList[this.props.selectedCoin]) || (this.props.balance - this.props.coinList[this.props.selectedCoin]) == 0) || ((this.props.balance - this.props.coinList[this.props.selectedCoin]) >= 0);
                this.props.spinAfterLoad(false);
            }
            else {
                condition = ((this.props.balance - this.props.coinList[this.props.selectedCoin] >= this.props.coinList[this.props.selectedCoin]));
            }
            if (condition) {
                this.storeCurrentBet = this.props.coinList[this.props.selectedCoin];
                this.props.getApplicationSpinResponse();
                this.props.setStopActive(true);
                this.props.stopWinPresentation()
                this.props.setAllButtonDisable();
                this.props.resetReelState();
            }
            timer && timer.stop();         
            timer && timer.remove();
        });
        timer.start();
       

    }
    
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
        this.orientationChange();
        this.setLayout();
        this.scaled();
    }
    orientationChange() {
        if (window.innerWidth > window.innerHeight) {
            UIManager.getRef("betContent") && (UIManager.getRef("betContent").scale.x = 1);
            UIManager.getRef("betContent") && (UIManager.getRef("betContent").scale.y = 1);
        } else {
            UIManager.getRef("betContent") && (UIManager.getRef("betContent").scale.x = 0.75);
            UIManager.getRef("betContent") && (UIManager.getRef("betContent").scale.y = 0.8);
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            return false;
        }
        if (nextProps.selectedCoin !== this.props.selectedCoin) {
            UIManager.getRef("bet_text") && UIManager.setText("bet_text", nextProps.coinList[nextProps.selectedCoin] / 2000);
        }
        if (nextProps.showMenu !== this.props.showMenu) {
            return true;
        }
        return false;
    }

    //this method will decrease the bet
    onBetDecrease() {
        this.props.setApplicationCurrentBetIndex(this.props.selectedCoin - 1);
        this.props.setSelectedCoin(this.props.selectedCoin - 1);
    }

    //this method will increase the bet
    onBetIncrease() {
        this.props.setApplicationCurrentBetIndex(this.props.selectedCoin + 1);
        this.props.setSelectedCoin(this.props.selectedCoin + 1);
    }
    maxbet() {
        this.props.setApplicationCurrentBetIndex(this.props.coinList.length - 1);
        this.props.setSelectedCoin(this.props.coinList.length - 1);
        this.props.getApplicationMaxBetResponse();
    }
    setButtonState() {
        if (this.props.selectedCoin == 0) {
            UIManager.getRef("countMinus").texture = Texture.from("minus_disable_p.png");
            UIManager.getRef("countPlus").texture = Texture.from("plus_p.png");
        }
        else {
            UIManager.getRef("countMinus").texture = Texture.from("minus_p.png");
        }


        if (this.props.selectedCoin + 1 == this.props.coinList.length) {
            UIManager.getRef("countPlus").texture = Texture.from("plus_disable_p.png");
            UIManager.getRef("countMinus").texture = Texture.from("minus_p.png");
        }
        else {
            UIManager.getRef("countPlus").texture = Texture.from("plus_p.png");
        }
    }
    buttonSound() {
        this.props.setApplicationButtonClicked(true);
        this.props.setApplicationButtonClicked(false);
    }
    handleEvent = (e: any) => {
        switch (e.target.name) {
            case "countMinus":
                if (this.props.selectedCoin != 0) {
                    this.props.getApplicationDecreaseBetResponse();
                    this.onBetDecrease();
                    this.buttonSound();
                }

                break;
            case "countPlus":
                if (this.props.selectedCoin + 1 != this.props.coinList.length) {
                    this.props.getApplicationIncreaseBetResponse();
                    this.onBetIncrease();
                    this.buttonSound();
                }
                break;
            case "maxbetBtn":
                if ( (this.props.selectedCoin == this.props.coinList.length - 1)) {
                    this.props.setApplicationSpinButtonClicked(true);
                    this.onSpin();
                    this.props.showDesktopSettingPanelUI(false);
                    this.props.setApplicationShowHelpText(false);
                    this.props.hidePaytable();
                    this.props.mobilePaytableShow(false);
                    this.props.hideAutoplay();
                    this.props.hideMenuUI();
                    this.props.setAllButtonEnable();
                    this.props.setMobMenuVisibility(false);
                    this.props.setApplicationButtonpanelVisibility(true);
                }else if ((this.props.betList[this.props.coinList.length - 1] > this.props.balance)) {
                    UIManager.getRef("maxbetBtn")&& (UIManager.getRef("maxbetBtn").texture = Texture.from("max_disable.png"));
                }else{
                    this.props.getApplicationIncreaseBetResponse();
                    this.maxbet();
                    this.buttonSound();  
                }
                break;
            default:
                return 'No buttons';
        }
        this.setButtonState();
    }

    componentDidUpdate() {
        this.updateUi();
        this.layoutChange(this.props.layoutMode);
        this.props.showMenu && this.setButtonState();
    }

    setAxis() {

    }

    render() {
        if (!this.props.showMenu) {
            return (<></>)
        }

        return (
            <UIManager id={"CanvasMobileBetContainer"} type={"Container"} ref={i => this.CanvasMobileBetContainer = i}
                configGame={this.props.configGame}
                app={this.app}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={this.props.configGame}
                            ClickHandler={this.handleEvent} scope={this} />
                    )
                }
            </UIManager>
        )
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'menuState' | 'basegameState' | 'betPanelState' | 'behaviourState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        showMenu: state.menuState.showMenu,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        betBoxCount: state.behaviourState.betBoxCount,
        balance: state.basegameState.balance,
        firstSpinAfterLoad: state.basegameState.firstSpinAfterLoad,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        setApplicationSpinButtonClicked: (isClicked: boolean): any => dispatch(buttonActions.setApplicationSpinButtonClicked(isClicked)),
        setSelectedCoin: (selectedCoin: number): any => dispatch(betPanelAction.setSelectedCoin(selectedCoin)),
        getApplicationIncreaseBetResponse: (): any => dispatch(gameLevelResponseActions.getApplicationIncreaseBetResponse()),
        getApplicationDecreaseBetResponse: (): any => dispatch(gameLevelResponseActions.getApplicationDecreaseBetResponse()),
        setApplicationCurrentBetIndex: (betIndex: number): any => dispatch(baseGameActions.setApplicationCurrentBetIndex(betIndex)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),
        getApplicationMaxBetResponse: (): any => dispatch(gameLevelResponseActions.getApplicationMaxBetResponse()),
        spinAfterLoad: (firstSpinAfterLoad: boolean): any => dispatch(baseGameActions.spinAfterLoad(firstSpinAfterLoad)),
        getApplicationSpinResponse: (): any => dispatch(asyncActions.getApplicationSpinResponse()),
        setStopActive: (stopActive: boolean): any => dispatch(buttonActions.setStopActive(stopActive)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        resetReelState: (): any => dispatch(configGame["SPIN_TYPE"] === 2 && reelsGridActions.resetReelState()),
        //
        showDesktopSettingPanelUI: (showSettingPanel: boolean): any => dispatch(desktopSettingPanelActions.showDesktopSettingPanelUI(showSettingPanel)),
        setApplicationShowHelpText: (showHelpText: boolean): any => dispatch(applicationStateActions.setApplicationShowHelpText(showHelpText)),
        hidePaytable: (): any => dispatch(paytableActions.hidePaytable()),
        mobilePaytableShow: (showPaytableMobile: boolean): any => dispatch(paytableGofActions.mobilePaytableShow(showPaytableMobile)),
        hideAutoplay: (): any => dispatch(autoplayActions.hideAutoplayUI()),
        hideMenuUI: (): any => dispatch(menuActions.hideMenuUI()),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        setMobMenuVisibility: (showMobileMenuPanel: boolean): any => dispatch(behaviourAction.setMobMenuVisibility(showMobileMenuPanel)),
        setApplicationButtonpanelVisibility: (visible: boolean): any => dispatch(aplicationActions.setApplicationButtonpanelVisibility(visible)),
        
    }))(withCanvasMobileBetConfiguration(CanvasMobileBet)));