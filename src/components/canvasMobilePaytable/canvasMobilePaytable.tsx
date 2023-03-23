import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withCanvasMobilePaytableConfiguration from "./configuration/withCanvasMobilePaytableConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import { isIOS, isMobile, isTablet } from "react-device-detect";
import { CURRENCY } from "../../core/utills";
import { TIMER } from "../../core/utills";
import * as PIXI from "pixi.js";

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

class CanvasMobilePaytable extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected canvasMobilePaytableContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;
    protected boxWidth = 0;
    protected boxHeight = 0;
    protected boxX = 0;
    protected boxY = 0;
    protected ui_mobileMode: string = "";
    protected symbolsList: any = [];
    private constantT1: number = 100;
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en",
        }
        // this.canvasMobilePaytableContainer = React.createRef();
        this.canvasMobilePaytableContainer = {}

        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.symbolsList = [
            { symbol: "HV1" },
            { symbol: "HV2" },
            { symbol: "HV3" },
            { symbol: "HV4" },
            { symbol: "LV1" },
            { symbol: "LV2" },
            { symbol: "LV3" },
            { symbol: "LV4" },
            { symbol: "LV5" },
            { symbol: "LV6" },
        ]
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
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
        this.orientationChange(this.props);
        this.setLayout();
    }
    orientationChange(props: any) {

        if (props.showPaytableMobile) {
            if (window.innerWidth > window.innerHeight) {
                UIManager.getRef("landscape_paytableContent") && (UIManager.getRef("landscape_paytableContent").visible = true);
                UIManager.getRef("portrait_paytableContent") && (UIManager.getRef("portrait_paytableContent").visible = false);
            } else {
                UIManager.getRef("landscape_paytableContent") && (UIManager.getRef("landscape_paytableContent").visible = false);
                UIManager.getRef("portrait_paytableContent") && (UIManager.getRef("portrait_paytableContent").visible = true);
            }
        } else {
            UIManager.getRef("gameScrollComponentMob_landscape") && (UIManager.getRef("gameScrollComponentMob_landscape").visible = false);
            UIManager.getRef("landscape_paytableContent") && (UIManager.getRef("landscape_paytableContent").visible = false);
            UIManager.getRef("portrait_paytableContent") && (UIManager.getRef("portrait_paytableContent").visible = false);
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.showPaytableMobile !== this.props.showPaytableMobile) {
            //  this.orientationChangePaytable();
            this.orientationChange(nextProps);
            return false;
        }
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode);
            this.orientationChange(nextProps);
            return false;
        }
        if (nextProps.showPaytable !== this.props.showPaytable) {
            return true;
        }
        return false;
    }

    handleEvent = (e: any) => {
    }

    componentDidUpdate() {
        if (isMobile) {
            this.addScrollBar();
            this.setPayoutsValue();
            for (let i = 0; i < this.props.storeWinningSymbolData.length; i++) {
                this.setSymbolHighlighted(this.props.storeWinningSymbolData[i]);
            }
            this.orientationChange(this.props);
            let timer = TIMER.TimerManager.createTimer(20);
            timer.on('end', (e: any) => {
                UIManager.getRef("landscape_paytableContent") && (UIManager.getRef("landscape_paytableContent").visible = false);
                timer && timer.stop();
                timer && timer.remove();

            });
            timer.start();

        }
    }

    setSymbolHighlighted(arr: any) {
        UIManager.getRef("mob_graphic_" + arr[0] + "_" + arr[1]) && (UIManager.getRef("mob_graphic_" + arr[0] + "_" + arr[1]).visible = true);
    }
    setPayoutsValue() {
        let bet = this.props.betList[this.props.currentBetIndex];
        let symbolId: any;
        this.symbolsList.map((innerData: any, index: any) => {
            let selectedPayout = this.props.paytablePayoutArray.filter(
                function (data: any) {
                    return data.betStep === bet;
                }
            )
            symbolId = innerData.symbol;
            if (selectedPayout.length > 0) {
                let payoutWinning = selectedPayout[0].payoutsPerBetStepAndSymbol.filter(
                    function (data: any) {
                        if (data.symbolId === symbolId) {
                            return (data.symbolId === symbolId);
                        }
                    }
                )[0]
                for (let i = 1; i <= payoutWinning.paytable.length; i++) {
                    if (payoutWinning.paytable[payoutWinning.paytable.length - i] !== 0) {
                        UIManager.getRef("landscape_payout" + payoutWinning.symbolId + "_" + (i - 1)) && (UIManager.setText("landscape_payout" + payoutWinning.symbolId + "_" + (i - 1), CURRENCY.CurrencyManager.formatCurrencyString(((payoutWinning.paytable[payoutWinning.paytable.length - i]) / this.constantT1).toFixed(2), true, true, true, true)))
                    }
                }
            }
        })
    }

    addScrollBar() {
        let landscape_paytableContent: any = UIManager.getRef("landscape_paytableContent");
        let gameScrollComponent: any = UIManager.getRef("gameScrollComponentMob_landscape");
        const Scrollbox = require('pixi-scrollbox').Scrollbox;
        const scrollbox = new Scrollbox({ boxWidth: 1500, boxHeight: 650 })
        scrollbox.x = 200;
        scrollbox.y = 200;
        gameScrollComponent && gameScrollComponent.addChild(scrollbox);
        const sprite = scrollbox.content.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
        sprite.width = 1500;
        sprite.height = 3000;
        isMobile && (sprite.alpha = 0.01);
        sprite.tint = 0x131313;
        scrollbox.dragScroll = true;
        scrollbox.overflowX = "none";
        scrollbox.content.addChild(landscape_paytableContent);
        scrollbox.update();
    }
    render() {
        if (!this.props.showPaytable) {
            return (<></>)
        }

        return (
            <UIManager id={"canvasMobilePaytableContainer"} type={"Container"} ref={i => this.canvasMobilePaytableContainer = i}
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
    (state: Pick<IStore, 'basegameState' | 'applicationState' | 'paytableState' | 'paytableBMState' | 'behaviourState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        showPaytable: state.paytableState.showPaytable,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        paytablePayoutArray: state.paytableBMState.paytablePayoutArray,
        languageCode: state.applicationState.languageCode,
        storeWinningSymbolData: state.behaviourState.storeWinningSymbolData,
        showPaytableMobile: state.paytableBMState.showPaytableMobile,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
    }))(withCanvasMobilePaytableConfiguration(CanvasMobilePaytable)));