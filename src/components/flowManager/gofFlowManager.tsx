import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withFlowManagerConfiguration from "../../core/components/flowManager/configuration/withFlowManagerConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import { actions as layoutsActions } from "../../core/reducers/layoutsStateReducer";
import PIXI from "pixi.js";
import { isMobile } from "react-device-detect";
import { actions as reelgridAction } from '../../core/reducers/reelgridStateReducer';
import { configGame } from "../../data/config";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as winpresentationAction } from "../../core/reducers/winPresentationReducer";
import { actions as baseGameAction, actions as basegameAction } from "../../core/reducers/baseGameReducer";
import { actions as freegameAction } from "../../core/reducers/freeGameReducer";
import { actions as winCelebrationActions } from "../../gamereducer/winCelebrationReducer";
import { TIMER } from "../../core/utills";
import { actions as horizontalSymbolActions } from "../../gamereducer/horizontalSymbolReducer"
import { actions as multiplierActions } from "../../gamereducer/multiplierReducer";
import { actions as winShowerActions } from "../../gamereducer/winShowerReducer";
import { actions as keyboardListenerActions } from "../../core/reducers/keyboardListenerReducer";
import { actions as landingSymbolAction } from "../../core/reducers/landingsymbolreducer";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { Tween } from "../../core/components/effect/tween";


interface IProps {
    [x: string]: any;
}

interface IStore {
    [x: string]: any;
}

interface IStateToProps {

    reel_data: any,
    displayReelGridSymbolCount: any,
    callFlowManager: boolean,
    winAmount: any,
    totalCreditWinAmount: any,
    currentBetIndex: any,
    featureJustReTriggered: any,
    betList: any,
    featureJustFinished: any,
    freegameSpinCountRemaining: any,
    featureType: any,
    totalCascadeCount: number,
    currentCascadeCount: number,
    freegameSpinCountWin: number,
    scatterDataBeforeFG: any,
    scatterDataAnticipation: any,
    inFreeGame: any,
    selectedCoin: any,
    coinList: any,
    inAutoplay: any,
    storeAmountForAutoplay: any,
    transitionBalance: any,
    stopIfBalanceDecreasedBy: any,
    blastStart: any,
    playAnticipation: any,
    freegameSpinCount: any,
    showWinCelebration: any,
    showWinShower: any,
    basegamestate: any,
    autoPlayAbortOnFreeGameWinEnabled: any,
    suppressCelebrationForWinsBelowStake: boolean,
    balance: number,
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class GofFlowManager extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected gofFlowManagerContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;
    protected winCelebrationMinimumValue: number = 25;
    protected extraFreeSpins: number = 1;
    protected storePreviousFreeSpinCount: number = 0;
    protected constantT1: number = 100;
    protected constantT2: number = 2000;
    private tweenTimer: number = 0.001;
    private Alltimers: any[] = [];
    private AllTween:any [] = [];


    constructor(props: IProps) {

        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en"
        }
        // this.gofFlowManagerContainer = React.createRef();
        this.gofFlowManagerContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
        this.storePreviousFreeSpinCount = this.props.freegameSpinCountWin;
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

    }

    //this method will call after the first rendering for scaling and logo animation looping
    bindUI() {

    }

    //this method will be called when a button gets clicked
    handleEvent(e: any) {

    }

    //when layout changes, this method will be called
    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        }
        )
    }
    compare_prop_y(a: any, b: any) {
        // a should come before b in the sorted order
        if (a.y < b.y) {
            return -1;
            // a should come after b in the sorted order
        } else if (a.y > b.y) {
            return 1;
            // a and b are the same
        } else {
            return 0;
        }
    }

    startWinCelebration(nextProps: any) {
        nextProps.winCelebrationShow(true);
        nextProps.setWinCelebrationForKeyboardListener(true);

        let timer = TIMER.TimerManager.createTimer(this.constantT1);
        timer.on('end', (e: any, data: any) => {
            e.remove();
            nextProps.winCelebrationStart(true, "Cash");
        })
        timer.start();
        this.Alltimers.push(timer);
        nextProps.setAllButtonDisable();
    }
    tweenTo(object: any, property: any, target: any, time: any, easing: any, onchange: any, oncomplete: any, start?: number   ) {
      let _tween =   new Tween([object],
            {
                [property]: { start: object[property], end: target },
            },
            time || this.tweenTimer, easing, false, null, null, null, null, false, onchange, oncomplete
        );
       this.AllTween.push(_tween);
    }
    showBlackScreen() {
        let graphicName: any;
        if (isMobile && window.innerWidth < window.innerHeight) {
            graphicName = "freeGameBlackScreenPortrait";
        }
        else {
            graphicName = "freeGameBlackScreen";
        }
        UIManager.getRef(graphicName) && (UIManager.getRef(graphicName).visible = true);
        UIManager.getRef(graphicName) && (UIManager.getRef(graphicName).alpha = 0);
        this.tweenTo(UIManager.getRef(graphicName), "alpha", 1, 1.5, "easeInCubic", null,
            () => {
            }
        );
    }

    private winShowerForSmallWin(totalWinAmount: number): void {
        this.props.winShowerShow(true);
        let timer = TIMER.TimerManager.createTimer(100);
        timer.on('end', (e: any) => {
            e.remove();
            this.props.winShowerStart(true, totalWinAmount);
        });
        timer.start();
        this.Alltimers.push(timer);
    }


    private winCelebrationForBigWin(nextProps: any): void {
        if (this.props.inFreeGame) {
            let timer = TIMER.TimerManager.createTimer(1000);
            timer.on('end', (e: any, data: any) => {
                e.remove();
                this.startWinCelebration(nextProps);
            })
            timer.start();
            this.Alltimers.push(timer);
        }
        else {
            this.startWinCelebration(nextProps);
        }
    }

    private clearAllTimers(): void {
        while (this.Alltimers.length) {
            let time = this.Alltimers.pop();
            time && time.stop();
            time && time.remove();
        }
        this.Alltimers =[];
        this.AllTween.length && this.AllTween.forEach((tween: any) => {
            tween && tween.dispose();
        });
        this.AllTween = [];

    }


    flowStart(nextProps: any) {
        this.clearAllTimers();
        if (nextProps.winAmount > 0) {
            nextProps.stopWinPresentation();
            let totalWinAmount = nextProps.totalCreditWinAmount / this.constantT1;
            let storeBetValue = this.props.betList[this.props.currentBetIndex] / this.constantT1;
            let setWinParam;
            if (!this.props.suppressCelebrationForWinsBelowStake) {
                setWinParam = true;
            }
            else {
                (totalWinAmount > storeBetValue) ? setWinParam = true : setWinParam = false;
            }
            if ((nextProps.totalCreditWinAmount / this.constantT1 < this.winCelebrationMinimumValue * nextProps.betList[nextProps.currentBetIndex] / this.constantT1 && setWinParam)) {
                this.winShowerForSmallWin(totalWinAmount);
            } else if (nextProps.totalCreditWinAmount / this.constantT1 >= this.winCelebrationMinimumValue * nextProps.betList[nextProps.currentBetIndex] / this.constantT1) {
                this.winCelebrationForBigWin(nextProps);
            } else {
                this.nextPlayCommand(nextProps);
            }

        } else if (nextProps.featureType == "BONUS" || nextProps.featureType == "FREEGAME") {
            if (nextProps.featureJustReTriggered) {
                this.freegameTriggered(nextProps);
            } else {
                let timer = TIMER.TimerManager.createTimer(1000);
                timer.on('end', (e: any, data: any) => {
                    e.remove();
                    if (nextProps.featureJustFinished) {
                        this.freegameFinished(nextProps);
                    } else {
                        this.nextPlayCommand(nextProps);
                    }
                })
                timer.start();
                this.Alltimers.push(timer);
            }
        }
        else {
            this.enableAllButtonAndreadyToNextcommand(nextProps)

        }
    }

    private freegameTriggered(nextProps: any): void {
        this.playScatterAnimations();
        if (nextProps.freegameSpinCountWin == nextProps.freegameSpinCountRemaining) {
            let timer = TIMER.TimerManager.createTimer(this.constantT2);
            timer.on('end', (e: any, data: any) => {
                e.remove();
                this.nextPlayCommand(nextProps);
            })
            timer.start();
            this.Alltimers.push(timer);
        }
    }

    private freegameFinished(nextProps: any): void {
        let timer = TIMER.TimerManager.createTimer(700);
        timer.on('end', (e: any, data: any) => {
            e.remove();
            this.props.stopFreegame();
            this.showBlackScreen();
            let timer1 = TIMER.TimerManager.createTimer(1600);
            timer1.on("end", (e: any) => {
                e.remove();
                this.props.setApplicationToBaseGameState(true);
                if (this.props.autoPlayAbortOnFreeGameWinEnabled) {
                    nextProps.stopAutoplay();
                } else {
                    nextProps.nextAutoplay();
                }
            });
            timer1.start();
            this.Alltimers.push(timer);
        })
        timer.start();
        this.Alltimers.push(timer);
    }

    private enableAllButtonAndreadyToNextcommand(nextProps: any): void {
        if (nextProps.featureJustFinished) {
            this.freeGameToBaseGameState(nextProps);
        } else {
            if (nextProps.inAutoplay || this.props.inAutoplay) {
                this.nextPlayCommand(nextProps);
            }
            if (((this.props.balance - this.props.coinList[this.props.selectedCoin] >= this.props.coinList[this.props.selectedCoin]) || this.props.winAmount > 0)) {
                nextProps.setAllButtonEnable();
            }
            else {
                if ((this.props.balance - this.props.coinList[this.props.selectedCoin]) > 0) {
                    nextProps.particularButtonEnable(true);
                }
                else {
                    nextProps.setAllButtonDisable();
                }
            }
        }
    }

    private nextPlayCommand(nextProps: any): void {
        nextProps.nextAutoplay();
        nextProps.nextFreegame();
    }

    freeGameToBaseGameState(nextProps: any) {
        let timer = TIMER.TimerManager.createTimer(500);
        timer.on('end', (e: any, data: any) => {
            e.remove();
            this.props.stopFreegame();
            this.showBlackScreen();
            let timer1 = TIMER.TimerManager.createTimer(1600);
            timer1.on("end", (e: any) => {
                e.remove();
                this.props.setApplicationToBaseGameState(true);
                if (this.props.autoPlayAbortOnFreeGameWinEnabled) {
                    nextProps.stopAutoplay();
                } else {
                    nextProps.nextAutoplay();
                }
            });
            timer1.start();
            this.Alltimers.push(timer);
        })
        timer.start();
        this.Alltimers.push(timer);
    }


    setScatterData(reelGrid: any): any {
        let scatterPositions: any = [];
        reelGrid && reelGrid.forEach((singleReelData: any, i: any) => {
            for (let j: any = 0; j < this.props.displayReelGridSymbolCount[i]; j++) {
                if (singleReelData[j] < 30) {
                    scatterPositions.push([i, j])
                }
            }
        });
        return scatterPositions;
    }
    setScatterDataInsideFG(reelGrid: any): any {
        let scatterPositions: any = [];
        let horizontalGrid: any = reelGrid[reelGrid.length - 1];
        horizontalGrid && horizontalGrid.forEach((symbolId: any, i: any) => {
            if (symbolId === 92 && i < 4) {
                scatterPositions.push([0, 3 - i])
            }
        });
        return scatterPositions;
    }

    playScatterAnimations() {

        this.props.setLandingPosition([])
        if (this.props.inFreeGame) {
            let scatterPositions: any = this.setScatterDataInsideFG(this.props.scatterDataBeforeFG);
            let reel_data = this.props.reel_data;
            scatterPositions.forEach((pos: any, i: any) => {
                let reelGrid = UIManager.getRef("reelgrid" + pos[0]);
                reel_data.stopReels[pos[0]][pos[1]] = reelGrid.children[pos[1] + 1].symbolId;
            });
            this.props.updateReelData(reel_data);
            let symbolBgAnimList: any = scatterPositions;
            this.props.setSymbolAnimationPosition([symbolBgAnimList]);
            let wincordinate: any = []
            symbolBgAnimList.forEach((data: any, index: number) => {
                wincordinate.push({
                    "reelId": data[0],
                    "rowId": data[1],
                })
            })
            this.props.setWinHorizontalSymbolCoOrdinate(wincordinate);
            this.props.playSymbolAnim();
        }
        else {
            let scatterPositions: any = this.setScatterData(this.props.scatterDataBeforeFG);
            let reel_data = this.props.reel_data;
            scatterPositions.forEach((pos: any, i: any) => {
                let reelGrid = UIManager.getRef("reelgrid" + pos[0]);
                reelGrid.children.sort(this.compare_prop_y)
                reel_data.stopReels[pos[0]][pos[1]] = reelGrid.children[pos[1] + 1].symbolId;
            });
            this.props.updateReelData(reel_data);

            let symbolBgAnimList: any = scatterPositions;
            this.props.setSymbolAnimationPosition([symbolBgAnimList]);
            let wincordinate: any = []
            symbolBgAnimList.forEach((data: any, index: number) => {
                wincordinate.push({
                    "reelId": data[0],
                    "rowId": data[1],
                })
            })
            this.props.setWinSymbolCoOrdinate(wincordinate);
            this.props.playSymbolAnim();
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.callFlowManager !== this.props.callFlowManager) {
            if (nextProps.callFlowManager) {
                if (nextProps.freegameSpinCount == 1) {
                    nextProps.fgFeaturetrigger(true);
                }
                this.flowStart(nextProps);
            }
            return false;
        }
        if (nextProps.blastStart !== this.props.blastStart || nextProps.playAnticipation !== this.props.playAnticipation) {
            if (nextProps.playAnticipation && nextProps.blastStart && nextProps.blastStart !== this.props.blastStart) {
                let timer1 = TIMER.TimerManager.createTimer(2500);
                timer1.on('end', (e: any) => {
                    e.remove();
                    this.playScatterAniamtion(nextProps);
                });
                timer1.start();
                let timer2 = TIMER.TimerManager.createTimer(4000);
                timer2.on('end', (e: any) => {
                    e.remove();
                    this.playScatterBgAniamtion(nextProps);
                });
                timer2.start();
                this.Alltimers.push(timer1);
                this.Alltimers.push(timer2);
            }
            return false;
        }
        if (nextProps.storeAmountForAutoplay - nextProps.transitionBalance / 100 >= this.props.stopIfBalanceDecreasedBy && this.props.stopIfBalanceDecreasedBy !== -1) {
            nextProps.stopAutoplay();
        }

        if ((!nextProps.showWinCelebration && nextProps.showWinCelebration !== this.props.showWinCelebration) || (!nextProps.showWinShower && nextProps.showWinShower !== this.props.showWinShower)) {
            if (nextProps.featureJustFinished) {
                this.freeGameToBaseGameState(nextProps);
            }
        }
        if (nextProps.basegamestate && nextProps.basegamestate !== this.props.basegamestate) {
            if (nextProps.totalCreditWinAmount / this.constantT1 >= this.winCelebrationMinimumValue * nextProps.betList[nextProps.currentBetIndex] / this.constantT1) {
                nextProps.setAllButtonDisable();
                this.startWinCelebration(nextProps);
            }
        }
        if (nextProps.inFreeGame !== this.props.inFreeGame) {
            if (nextProps.inFreeGame) {
                this.props.setIsScreenOnOff(true);
            } else {
                this.props.setIsScreenOnOff(false);
            }
        }
        return false;
    }

    private playScatterAniamtion(nextProps: any): void {
        let scatterPositions: any = this.setScatterData(nextProps.scatterDataAnticipation);
        let reel_data = this.props.reel_data;
        scatterPositions.forEach((pos: any, i: any) => {
            let reelGrid = UIManager.getRef("reelgrid" + pos[0]);
            reelGrid.children.sort(this.compare_prop_y);
            reel_data.stopReels[pos[0]][pos[1]] = reelGrid.children[pos[1] + 1].symbolId;
        });
        this.props.updateReelData(reel_data);

        let symbolBgAnimList: any = [];
        for (let i = 0; i < 6; i++) {
            let reelsInUi = UIManager.getRef("reelgrid" + i);
            let countOnreel = 0;
            for (let j: any = 0; j < reelsInUi.children.length; j++) {
                if (reelsInUi.children[j].symbolId > -1 && reelsInUi.children[j].symbolId < 30 && reelsInUi.children[j].y > -80 && countOnreel < this.props.displayReelGridSymbolCount[i]) {
                    symbolBgAnimList.push([i, j - 1])
                }
                if (reelsInUi.children[j].y > -80) {
                    countOnreel++;
                }
            }
        }
        this.props.setWinSymbolCoOrdinate([]);
        let wincordinate: any = []
        symbolBgAnimList.forEach((data: any, index: number) => {
            wincordinate.push({
                "reelId": data[0],
                "rowId": data[1],
            })
        })
        this.props.setWinSymbolCoOrdinate(wincordinate);
        this.props.playSymbolAnim();
    }

    private playScatterBgAniamtion(nextProps: any): void {
        let symbolBgAnimList: any = [];
        for (let i = 0; i < 6; i++) {
            let reelsInUi = UIManager.getRef("reelgrid" + i);
            let countOnreel = 0;
            for (let j: any = 0; j < reelsInUi.children.length; j++) {
                if (reelsInUi.children[j].symbolId > -1 && reelsInUi.children[j].symbolId < 30 && reelsInUi.children[j].y > -80 && countOnreel < this.props.displayReelGridSymbolCount[i]) {
                    symbolBgAnimList.push([i, j - 1])
                }
                if (reelsInUi.children[j].y > -80) {
                    countOnreel++;
                }
            }
        }
        this.props.setWinSymbolCoOrdinate([]);
        let wincordinate: any = []
        symbolBgAnimList.forEach((data: any, index: number) => {
            wincordinate.push({
                "reelId": data[0],
                "rowId": data[1],
            })
        })
        this.props.setWinSymbolCoOrdinate(wincordinate);
        this.props.playSymbolAnim();
    }


    render() {
        if (!this.props.callFlowManager) {
            return (<></>);
        }
        return (
            <UIManager id={"gofFlowManagerContainer"} type={"Container"} ref={i => this.gofFlowManagerContainer = i}
                name={"gofFlowManagerContainer"}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            id={i.id} {...i} app={this.app} configGame={configGame}
                            ClickHandler={this.handleEvent.bind(this)} />)
                }
            </UIManager>)
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, 'winShowerState' | 'winCelebrationState' | 'autoplayState' | 'betPanelState' | 'flowManagerState' | 'applicationState' | 'basegameState' | 'behaviourState' | 'freegameState' | 'reelgridState'>): IStateToProps =>
    ({
        callFlowManager: state.flowManagerState.callFlowManager,
        winAmount: state.basegameState.winAmount,
        totalCreditWinAmount: state.behaviourState.totalCreditWinAmount,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        freegameSpinCountRemaining: state.freegameState.freegameSpinCountRemaining,
        featureJustReTriggered: state.freegameState.featureJustReTriggered,
        featureType: state.basegameState.featureType,
        totalCascadeCount: state.reelgridState.totalCascadeCount,
        currentCascadeCount: state.reelgridState.currentCascadeCount,
        reel_data: state.reelgridState.reel_data,
        displayReelGridSymbolCount: state.reelgridState.displayReelGridSymbolCount,
        freegameSpinCountWin: state.freegameState.freegameSpinCountWin,
        featureJustFinished: state.freegameState.featureJustFinished,
        scatterDataBeforeFG: state.behaviourState.scatterDataBeforeFG,
        scatterDataAnticipation: state.behaviourState.scatterDataAnticipation,
        inFreeGame: state.freegameState.inFreeGame,
        selectedCoin: state.betPanelState.selectedCoin,
        coinList: state.betPanelState.coinList,
        inAutoplay: state.basegameState.inAutoplay,
        storeAmountForAutoplay: state.behaviourState.storeAmountForAutoplay,
        transitionBalance: state.behaviourState.transitionBalance,
        stopIfBalanceDecreasedBy: state.autoplayState.stopIfBalanceDecreasedBy,
        blastStart: state.reelgridState.blastStart,
        playAnticipation: state.reelgridState.playAnticipation,
        showWinCelebration: state.winCelebrationState.showWinCelebration,
        freegameSpinCount: state.freegameState.freegameSpinCount,
        showWinShower: state.winShowerState.showWinShower,
        basegamestate: state.basegameState.basegamestate,
        autoPlayAbortOnFreeGameWinEnabled: state.applicationState.autoPlayAbortOnFreeGameWinEnabled,
        suppressCelebrationForWinsBelowStake: state.applicationState.suppressCelebrationForWinsBelowStake,
        balance: state.basegameState.balance,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationToBaseGameState: (basegamestate: boolean): any => dispatch(basegameAction.setApplicationToBaseGameState(basegamestate)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutsActions.setApplicationLayoutObject(layoutobjectlist)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        nextAutoplay: (): any => dispatch(basegameAction.nextAutoplay()),
        nextFreegame: (): any => dispatch(freegameAction.nextFreegame()),
        winCelebrationStart: (startWinCelebration: boolean, showAmount: string): any => dispatch(winCelebrationActions.winCelebrationStart(startWinCelebration, showAmount)),
        winCelebrationShow: (showWinCelebration: boolean): any => dispatch(winCelebrationActions.winCelebrationShow(showWinCelebration)),
        setAllButtonDisable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonDisable(exceptBtnList)),
        activeMultiplier: (multiplierActive: boolean): any => dispatch(multiplierActions.activeMultiplier(multiplierActive)),
        setWinSymbolCoOrdinate: (winSymbolCoOrdinate: any): any => dispatch(winpresentationAction.setWinSymbolCoOrdinate(winSymbolCoOrdinate)),
        playSymbolAnim: (): any => dispatch(winpresentationAction.playSymbolAnim()),
        setSymbolAnimationPosition: (symbolAnimationPosition: any): any => dispatch(winpresentationAction.setSymbolAnimationPosition(symbolAnimationPosition)),
        updateReelData: (result_reel: any): any => dispatch(reelgridAction.updateReelData(result_reel)),
        setWinHorizontalSymbolCoOrdinate: (winSymbolCoOrdinate: any): any => dispatch(horizontalSymbolActions.setWinSymbolCoOrdinate(winSymbolCoOrdinate)),
        stopFreegame: (): any => dispatch(freegameAction.stopFreegame()),
        winShowerStart: (startWinShower: boolean, winShowerAmount: number): any => dispatch(winShowerActions.winShowerStart(startWinShower, winShowerAmount)),
        winShowerShow: (showWinShower: boolean): any => dispatch(winShowerActions.winShowerShow(showWinShower)),
        stopAutoplay: (): any => dispatch(baseGameAction.stopAutoplay()),
        setWinCelebrationForKeyboardListener: (winCelebrationForKeyBoardListener: boolean): any => dispatch(keyboardListenerActions.setWinCelebrationForKeyboardListener(winCelebrationForKeyBoardListener)),
        fgFeaturetrigger: (featureTriggered: any): any => dispatch(behaviourAction.FgFeaturetrigger(featureTriggered)),
        particularButtonEnable: (enableParticularButton: boolean): any => dispatch(buttonActions.particularButtonEnable(enableParticularButton)),
        setLandingPosition: (landingPosition: any): any => dispatch(landingSymbolAction.setLandingPosition(landingPosition)),
        setIsScreenOnOff: (screenOnOff: boolean): any => dispatch(buttonActions.setIsScreenOnOff(screenOnOff)),
        setActiveall: (isActiveAll: boolean): any => dispatch(basegameAction.setActiveall(isActiveAll)),
    }))(withFlowManagerConfiguration(GofFlowManager)));