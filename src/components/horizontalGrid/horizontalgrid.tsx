import React, { Component } from "react";
import WithHorizontalGridConfiguration from "./configuration/withHorizontalGridConfiguration";
import { TIMER } from "../../core/utills";
import * as PIXI from "pixi.js";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { GJIStore } from "../../gamestore/IStore";
import UIManager from "../../core/components/ui/UiBuilder";
import { actions as winpresentationAction } from "../../core/reducers/winPresentationReducer";
import { actions as gridActions } from "../../core/reducers/gridStateReducer";
import { actions as symbolActions } from "../../gamereducer/horizontalSymbolStateReducer";
import { actions as horizontalSymbolActions } from "../../gamereducer/horizontalSymbolReducer";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as basegameAction } from "../../core/reducers/baseGameReducer";
import { actions as freegameAction } from "../../core/reducers/freeGameReducer";
import _ from "lodash";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
import HorizontalSymbol from "../../components/horizontalSymbol/horizontalSymbol";
import { Tween } from "../../core/components/effect/tween";
import { isMobile } from "react-device-detect";
import { configGame } from "../../data/config";

window.PIXI = PIXI;


interface IStateToProps {
    blastPosition: any
    spinStart: boolean
    layoutMode: string
    InTurboMode: any
    blastStart: any
    horizontalGridList: any
    horizontalGridListAfterBlast: any
    winningList: any,
    currentCascadeCount: number,
    totalCascadeCount: number,
    playAnticipation: any,
    forceSpinStop: boolean,
    isSlamSpin: boolean,

}

interface IDispatchToProps {
}

interface IProps extends IStateToProps {
    [x: string]: any;
}

interface IState {

}

class HorizontalGrids extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected subGridContainer: any;
    protected eventEmitter: any;
    protected GRID_STOPS: Array<Array<number>>;
    protected newPositions: any;
    protected tweening: any;
    protected serverResponseReceived: Boolean;
    protected updateSymbol: Boolean;
    protected reelRunning: Boolean;
    protected blurReel: Boolean;
    protected spinMidCalled: Boolean;
    protected minimummSpinTimeComplete: Boolean;
    protected decreaseValue: number = 15;

    protected SPIN_MOVE_VALUE: number;
    private gamePause: boolean;
    private tickupRequest: any;
    protected totalCascadeCount: number;

    private gridPositions: any;
    private createPosition: any;
    private endPosition: any;
    private blastPosition: any;
    private blastLen: number = 0;
    private ALLTIMER: any[] = []
    forceSpinStopReels: boolean;


    constructor(props: IProps) {
        super(props);

        this.app = props.app;
        this.GRID_STOPS = [];
        this.newPositions = [];
        this.tweening = [];
        this.gamePause = false;
        this.forceSpinStopReels = false;
        this.minimummSpinTimeComplete = false;
        this.spinMidCalled = false;
        this.serverResponseReceived = false;
        this.updateSymbol = false;
        this.reelRunning = false;
        this.blurReel = false;
        this.SPIN_MOVE_VALUE = 0;
        this.ALLTIMER = []
        // this.subGridContainer = React.createRef();    
        this.subGridContainer = {}
        this.totalCascadeCount = this.props.totalCascadeCount;
        this.blastPosition = [];

        this.init();

    }

    init() {
        this.bindEvent();
        this.gridPositions = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
        this.createPosition = { x: 0, y: 0 };
        this.endPosition = { x: 0, y: 0 };
        this.props.setSpinType();
        this.onInitializeReelStop();
    }

    destroy() {
    }

    bindEvent() {

    }

    onGameResume(data: any) {
        this.gamePause = false;
    }

    onGamePause(data: any) {
        this.gamePause = true;
    }

    onInitializeReelStop() {
        this.GRID_STOPS = this.props.horizontalGridList;// [[21, 15, 9, 3, 27]];
    }

    onServerReelStop(data?: any) {
        this.serverResponseReceived = true;
    }

    private cleanAllTimer(): void {
        this.ALLTIMER.forEach((_time: any) => {
            _time && _time.stop();
            _time && _time.reset();
            _time && _time.remove();
        });
        this.ALLTIMER =[];
    }


    componentDidMount() {

        let gridCoulmn = UIManager.getRef("gridCoulmn" + this.props.GridIndex);

        this.gridPositions = _.cloneDeep(this.props.data.gridPositions);
        this.gridPositions.forEach((pos: any) => {
            pos.x = pos.x + gridCoulmn.x;
            pos.y = pos.y + gridCoulmn.y;
        });

        this.createPosition.x = _.cloneDeep(this.props.data.createPosition).x + gridCoulmn.x;
        this.createPosition.y = _.cloneDeep(this.props.data.createPosition).y + gridCoulmn.y;

        this.endPosition.x = _.cloneDeep(this.props.data.endPosition).x
        this.endPosition.y = _.cloneDeep(this.props.data.endPosition).y;

        this.endPosition.x += gridCoulmn.x;
        this.endPosition.y += gridCoulmn.y;

        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols;
        gridSymbols.forEach((symbol: any, index: number) => {

            symbol.COMPONENT.gridPosition = index;
            symbol.COMPONENT.rowId = symbol.rowId;
            symbol.COMPONENT.reelId = symbol.reelId;
            symbol.COMPONENT.y = symbol.COMPONENT.width * symbol.rowId;
        });
    }
    componentWillUnmount() {
        this.subGridContainer.current = null;
        this.subGridContainer = null;
        //let el = ReactDom.findDOMNode(this);
        // d3Chart.destroy(el);
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.horizontalGridList !== this.props.horizontalGridList) {
            if (nextProps.horizontalGridList) {
                this.resetAll();
                this.GRID_STOPS = nextProps.horizontalGridList;// [[21, 15, 3, 9]];
            }
        }

        if (nextProps.horizontalGridListAfterBlast !== this.props.horizontalGridListAfterBlast) {
            if (nextProps.horizontalGridListAfterBlast) {
                this.GRID_STOPS = nextProps.horizontalGridListAfterBlast;// [[21, 15, 3, 9]];
            }
        }

        if (nextProps.isSpinning != this.props.isSpinning || nextProps.blastStart != this.props.blastStart || nextProps.spinStart != this.props.spinStart || nextProps.spinStop != this.props.spinStop
            || nextProps.forceSpinStop != this.props.forceSpinStop || nextProps.spinResponseReceived != this.props.spinResponseReceived
            || nextProps.layoutMode != this.props.layoutMode
            || nextProps.totalCascadeCount != this.props.totalCascadeCount
            || nextProps.blastPosition != this.props.blastPosition
            || nextProps.InTurboMode != this.props.InTurboMode
            || nextProps.isSlamSpin != this.props.isSlamSpin
        ) {
            if (nextProps.totalCascadeCount != this.props.totalCascadeCount) {
                if (nextProps.totalCascadeCount) {
                    this.totalCascadeCount = nextProps.totalCascadeCount
                }
            }
            if (nextProps.isSlamSpin && nextProps.isSlamSpin != this.props.isSlamSpin) {
                this.forceSpinStopReels = true;
                return false;
            }
            if (nextProps.blastPosition != this.props.blastPosition) {
                this.blastPosition = nextProps.blastPosition;
            }
            if (nextProps.spinStart && nextProps.spinStart != this.props.spinStart) {

                if (nextProps.InTurboMode) {
                    this.forceSpinStopReels = true;
                } else {
                    this.forceSpinStopReels = false;
                }
                this.onReelSpinStart();
            }
            if (nextProps.blastStart && nextProps.blastStart != this.props.blastStart) {
                let gridSymbols = nextProps.gridList[this.props.GridIndex].symbols;
                gridSymbols.forEach((symbol: any, index: number) => {
                    symbol.COMPONENT.gridPosition = symbol.gridPosition;
                    symbol.COMPONENT.rowId = symbol.rowId;
                    symbol.COMPONENT.reelId = symbol.reelId;

                    this.blastSymbol(symbol);
                });
                this.startBlast();
            }
            if (nextProps.spinResponseReceived) {
                this.onServerReelStop();
            }

            if (nextProps.forceSpinStop) {
                for (let i = 0; i < this.tweening.length; i++) {
                    const t = this.tweening[i];
                    if (t.complete) t.complete(t);
                    this.tweening.splice(this.tweening.indexOf(t), 1);
                }
                this.tweening = []
                this.forceSpinStopReels = true;
            } else {
                !this.forceSpinStopReels && (this.forceSpinStopReels = false);
            }

            if (nextProps.InTurboMode != this.props.InTurboMode) {
                if (nextProps.InTurboMode) {

                    for (let i = 0; i < this.tweening.length; i++) {
                        const t = this.tweening[i];
                        if (t.complete) t.complete(t);
                        this.tweening.splice(this.tweening.indexOf(t), 1);
                    }
                    this.tweening = []
                    this.forceSpinStopReels = true;
                } else {
                    !this.forceSpinStopReels && (this.forceSpinStopReels = false);
                }
            }
            return false;
        }
        return false;
    }

    getSubReelContainer() {
        return this.subGridContainer;
    }

    private resetAll(): void {

        this.tweening.length && this.tweening.forEach((tween: any) => {
            tween && tween.dispose();
        });
        this.tweening = [];
        this.state = { symbolList: [] };
        this.cleanAllTimer();
        this.cancelledAllRequest();
    }

    private cancelledAllRequest(): void {
        cancelAnimationFrame(this.tickupRequest);
        while (this.roughArr.length) {
            let req = this.roughArr.pop();
            window.cancelAnimationFrame(req);
            req = '';
        }

    }


    onResetGrid() {

        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols;

        for (let j = 0; j < this.props.data.GRID_ROWS - 1; j++) {

            gridSymbols[j].COMPONENT.blasted = false;
            gridSymbols[j].COMPONENT.x = 0

            gridSymbols[j].COMPONENT.gridPosition = j;
            gridSymbols[j].COMPONENT.rowId = j;

            gridSymbols[j].COMPONENT.blasted = false;
            gridSymbols[j].COMPONENT.shiftCount = 0;
            gridSymbols[j].shifted = false
        }
    }
    onResetGrid_() {

        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols;
        for (let j = this.props.data.GRID_ROWS - 1; j >= 0; j--) {
            this.props.onUpdateSymbolOnReel(gridSymbols[j], this.props.horizontalGridList[0][j], false);
            gridSymbols[j].y = gridSymbols[j].rowId * this.props.data.SYMBOL_HEIGHT;
        }
    }

    onReelSpinStart() {
        if (this.reelRunning) return;
        let timer = TIMER.TimerManager.createTimer(30);
        timer.on('end', (e: any) => {
            e.remove();
            this.tick();
            this.startDrop(() => {
            }, () => {
            });
        });
        timer.start();
        // this.tick();
        // this.startDrop(() => {
        // }, () => {
        // });
    }

    startDrop(onSymbolsCreated: any, onComplete: any) {
        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols,
            count = 0;

        this.newPositions = [];
        gridSymbols.forEach((symbol: any, index: number) => {

            let tweenTime: number;
            if (this.forceSpinStopReels) {
                tweenTime = this.props.data.singlePositionDropDurationInTurboMode
            } else {
                tweenTime = this.props.data.singlePositionDropDuration
            }
            tweenTime = tweenTime === undefined ? 200 : tweenTime;
            symbol.COMPONENT.updatedTexture = false;
            this.tweenTo(symbol.COMPONENT, 'y',
                this.endPosition.y + symbol.COMPONENT.width * index
                , tweenTime, "easeInBack", () => {

                    if (symbol.COMPONENT.y >= this.endPosition.y - 400 && !symbol.COMPONENT.updatedTexture) {
                        symbol.COMPONENT.updatedTexture = true;

                        this.props.onUpdateSymbolOnReel(symbol.COMPONENT, this.GRID_STOPS[this.props.GridIndex][symbol.COMPONENT.gridPosition], false);
                    }

                }, () => {
                    count += 1;
                    let gap = 200;
                    symbol.COMPONENT.y = this.createPosition.y + gap * count + symbol.COMPONENT.width * count;
                    this.props.onUpdateSymbolOnReel(symbol.COMPONENT, this.GRID_STOPS[this.props.GridIndex][symbol.COMPONENT.gridPosition], false);
                    if (gridSymbols.length - 1 === count) {
                        this.createNewSymbols(onSymbolsCreated, onComplete)
                    }
                });
        });

    }

    private checkFirstSymbols(rowId: number): boolean {
        let flg: boolean = false;
        if (this.blastLen === 1 && rowId === 2) {
            flg = true
        }
        if (this.blastLen === 2 && rowId === 1) {
            flg = true
        }
        if (this.blastLen === 3 && rowId === 0) {
            flg = true
        }
        if (this.blastLen === 4 && rowId === 0) {
            flg = true
        }
        return flg;
    }

    private getConsecutiveBlastLenth(rowId: number): void {
        let flg: boolean = false;
        this.props.blastPosition.forEach((arr: Array<number>) => {
            if (arr[1] === rowId) {
                this.blastLen++;
                flg = true;
            }
        });
        if (flg) {
            this.getConsecutiveBlastLenth(rowId - 1);
        }
    }

    private setBalstConsecutiveLength(): void {
        let isThree: boolean = false;
        this.props.blastPosition.forEach((arr: Array<number>) => {
            if (arr[1] === 3) {
                isThree = true;
            }
        });
        if (isThree) {
            this.getConsecutiveBlastLenth(3);
        }
    }

    startDropAfterBlast() {
        this.GRID_STOPS = this.props.horizontalGridListAfterBlast[0];
        this.props.setGridList(this.props.horizontalGridListAfterBlast);
        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols,
            count = 4;
        this.newPositions = [];
        let countNotBlast = 0;
        this.blastLen = 0;
        let _timer: number = isMobile ? 200 : this.props.data.dropAfterBlastDuration
        this.setBalstConsecutiveLength();
        gridSymbols.sort(this.compare_prop_y);
        gridSymbols.reverse();
        gridSymbols.forEach((symbol: any, index: number) => {

            if (symbol.COMPONENT.blasted) {
                count -= 1;
                let str: string = this.checkFirstSymbols(symbol.COMPONENT.rowId) ? "easeOutBack" : "easeLinear";
                this.props.onUpdateSymbolOnReel(symbol.COMPONENT, this.GRID_STOPS[this.props.GridIndex][count], false);
                symbol.COMPONENT.visible = true;
                this.tweenTo(symbol.COMPONENT, 'y',
                    this.gridPositions[this.gridPositions.length - 1 - symbol.COMPONENT.shiftCount].y
                    , _timer, str, null, () => {
                        if (this.totalCascadeCount - 1 == this.props.currentCascadeCount + 1) {
                            cancelAnimationFrame(this.tickupRequest);
                        }
                    });

            } else {
                let str: string = this.checkFirstSymbols(symbol.COMPONENT.rowId) ? "easeOutBack" : "easeLinear";
                countNotBlast += 1
                this.tweenTo(symbol.COMPONENT, 'y',
                    symbol.COMPONENT.y + this.props.data.SYMBOL_WIDTH * symbol.COMPONENT.shiftCount
                    , _timer, str, null, () => {

                    });
            }
        });

        let timer = TIMER.TimerManager.createTimer(500 + this.props.data.staggerDropDelay);
        timer.on('end', (e: any) => {
            e.remove();
            this.onResetGrid();
            this.reArrangeGridBeforeNextCascade();
        });
        timer.start();
        this.ALLTIMER.push(timer);
    }

    createNewSymbols(onSymbolsCreated?: any, onComplete?: any) {
        onSymbolsCreated && onSymbolsCreated();
        this.dropSymbols(onComplete);
    }
    compare_prop_rowId(a: any, b: any) {
        // a should come before b in the sorted order
        if (a.COMPONENT.rowId < b.COMPONENT.rowId) {
            return -1;
            // a should come after b in the sorted order
        } else if (a.COMPONENT.rowId > b.COMPONENT.rowId) {
            return 1;
            // a and b are the same
        } else {
            return 0;
        }
    }
    dropSymbols(onComplete: any) {
        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols;
        let gapduration: number;
        if (this.forceSpinStopReels) {
            gapduration = 0;
        } else {
            gapduration = 500;
        }
        let timer = TIMER.TimerManager.createTimer(1 + gapduration);
        timer.on('end', (e: any) => {
            e.remove();
            let counter = 0;
            gridSymbols.forEach((symbol: any, index: number) => {
                let duration: number;
                if (this.forceSpinStopReels) {
                    duration = this.props.data.delayDropDurationInTurboMode;
                } else {
                    duration = this.props.data.delayDropDuration;
                }
                this.tweenTo(symbol.COMPONENT, 'y',
                    this.gridPositions[this.gridPositions.length - 1 - index].y
                    , duration, "easeOutBack", null, () => {
                        counter += 1;
                        symbol.COMPONENT.gridPosition = index;
                        symbol.COMPONENT.rowId = symbol.rowId;
                        symbol.COMPONENT.reelId = symbol.reelId;

                        if (counter === gridSymbols.length) {
                            this.reelsComplete();
                        }
                    });
            });
        });
        timer.start();
        this.ALLTIMER.push(timer);
    }

    blastSymbol(symbol: any) {
        symbol.COMPONENT.blasted = false;
        this.blastPosition.forEach((data: any, index: number) => {
            if (data[0] === symbol.COMPONENT.reelId && data[1] === symbol.COMPONENT.rowId) {
                symbol.COMPONENT.blasted = true;
            }
        })
    }

    endBlast(symbol: any) {
        let symbolContainer = symbol.symbolcontainer;
        symbolContainer.visible = false;
        if (this.props.GridIndex + 1 === this.props.data.GRID_COLUMN) {
            this.reArrangeGrid();
        }
    }

    startBlast() {
        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols;
        let shiftCount = 0;
        for (let j = this.props.data.GRID_ROWS - 1; j >= 0; j--) {
            gridSymbols[j].COMPONENT.shiftCount = shiftCount;
            if (gridSymbols[j].COMPONENT.blasted) {
                let wincordinate: any = [];
                this.blastPosition.forEach((data: any, index: number) => {
                    wincordinate.push({
                        "reelId": data[0],
                        "rowId": data[1],
                    })
                })

                this.props.displayWinBox(false)
                this.props.playSymbolAnim();
                this.props.setWinSymbolCoOrdinate(wincordinate);
                let timer = TIMER.TimerManager.createTimer(this.props.data.delayInSymbolAnimationPlay);
                timer.on('end', (e: any) => {
                    e.remove();
                    let symbolContainer = gridSymbols[j].COMPONENT;
                    let gap = 200;
                    symbolContainer.y = this.createPosition.y + gap * shiftCount + symbolContainer.width * shiftCount
                    symbolContainer.visible = false;
                    this.props.displayWinBox(false)
                });
                timer.start();
                this.ALLTIMER.push(timer);
                shiftCount += 1;
            }
            if (shiftCount > 0) {
                gridSymbols[j].shifted = true
            } else {
                gridSymbols[j].shifted = false
            }
        }

        let blasttimertimer = TIMER.TimerManager.createTimer(this.props.data.blastDuration);
        blasttimertimer.on('end', (e: any) => {
            e.remove();
            this.reArrangeGrid();
        });

        blasttimertimer.start();
        this.ALLTIMER.push(blasttimertimer);

        if (this.props.playAnticipation) {
            let timer = TIMER.TimerManager.createTimer(this.props.data.blastDuration + 3500);

            timer.on('end', (e: any) => {
                e.remove();
                this.startDropAfterBlast();
            });
            timer.start();
            this.ALLTIMER.push(timer);
        } else {
            let timer = TIMER.TimerManager.createTimer(this.props.data.blastDuration + 500);

            timer.on('end', (e: any) => {
                e.remove();
                this.startDropAfterBlast();
            });
            timer.start();
            this.ALLTIMER.push(timer);
        }
    }

    reArrangeGrid() {
        this.props.setWinSymbolCoOrdinate([]);
        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols;

        for (let j = this.props.data.GRID_ROWS - 1; j >= 0; j--) {
            let shiftCount = gridSymbols[j].COMPONENT.shiftCount;
            if (gridSymbols[j].COMPONENT.blasted) {
                shiftCount = 0;
            }
        }
    }
    compare_prop_y(a: any, b: any) {
        // a should come before b in the sorted order
        if (a.COMPONENT.y < b.COMPONENT.y) {
            return -1;
            // a should come after b in the sorted order
        } else if (a.COMPONENT.y > b.COMPONENT.y) {
            return 1;
            // a and b are the same
        } else {
            return 0;
        }
    }
    reArrangeGridBeforeNextCascade() {
        let gridSymbols = this.props.gridList[this.props.GridIndex].symbols;
        for (let j = this.props.data.GRID_ROWS - 1; j >= 0; j--) {
            let shiftCount = gridSymbols[j].COMPONENT.shiftCount;
            if (gridSymbols[j].COMPONENT.blasted) {
                shiftCount = 0;
            }
            this.tweenTo(gridSymbols[j].COMPONENT, 'y',
                gridSymbols[j].COMPONENT.y + gridSymbols[j].COMPONENT.width * shiftCount
                , 50 * (this.gridPositions.length - j), "easeOutBack", null, () => {
                });
        }
        gridSymbols.sort(this.compare_prop_y);
        gridSymbols.forEach((data: any, index: number) => {
            data.COMPONENT.rowId = index;
            data.COMPONENT.gridPosition = index;
            data.rowId = index;
            data.gridPosition = index;
        })
    }

    reelsComplete() {

        this.props.setSpinning(false);
        this.reelRunning = false;
        this.serverResponseReceived = false;
        this.props.setStoppedReel(this.props.GridIndex);
        if (this.props.GridIndex + 1 === 1) {
            this.props.setSpinComplete(true);
            if (this.props.winningList.length == 0) {
                cancelAnimationFrame(this.tickupRequest);
            }
        }
    }

    private tweenTo(object: any, property: any, target: any, time: any, easing: any, onchange: any, oncomplete: any, start?: number) {
        let Tweenlist = new Tween(
            [object],
            {
                [property]: { start: object[property], end: target }
            },
            time / 1000,
            easing,
            false, null, null, null, null, false, onchange, oncomplete
        );
        this.tweening.push(Tweenlist);
    }

    // Basic lerp funtion.
    private roughArr: any[] = []
    tick = () => {
        cancelAnimationFrame(this.tickupRequest);
        // this.roughArr.push(this.tickupRequest = requestAnimationFrame(this.tick));
        this.tickupRequest ='';
        let req = this.tickupRequest = requestAnimationFrame(this.tick.bind(this))
        this.roughArr.push(req);

    }

    render() {
        if (this.GRID_STOPS.length === 0) {
            return <></>;
        }
        const reel = {
            container: this.getSubReelContainer(),
            Id: this.props.GridIndex,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new PIXI.filters.BlurFilter(),
        };
        reel.blur.blurX = 4;
        reel.blur.blurY = 4;
        this.props.gridList && this.props.gridList.push(reel);
        const symbols_array = [];

        for (let j = 0; j < this.props.data.GRID_ROWS; j++) {
            let symbolId = this.props.horizontalGridList[this.props.GridIndex][j];
            let PROPS_TO_SEND_HorizontalSymbol = {
                key: "symbol_" + Math.random() + this.props.GridIndex + "_" + j,
                app: this.app,
                configGame: this.props.configGame === undefined ? configGame : this.props.configGame,
                SYMBOL_ID: symbolId,
                ROW_ID: j,
                REEL_ID: this.props.GridIndex, REEL: reel,
            }
            symbols_array.push(
                <HorizontalSymbol {...PROPS_TO_SEND_HorizontalSymbol}>
                </HorizontalSymbol>
            );
        }

        return (<UIManager type={"Container"} ref={(i: any) => this.subGridContainer = i} app={this.app}
            id={"gridCoulmn" + this.props.GridIndex} name={"gridCoulmn" + this.props.GridIndex} configGame={this.props.configGame === undefined ? configGame : this.props.configGame}
            x={this.props.GridIndex * this.props.data.GRID_WIDTH + this.props.GridIndex * this.props.data.GRID_GAP}>
            {symbols_array}
        </UIManager>)
    }
}

export default withPixiApp(connect(
    (state: Pick<GJIStore, 'gridsState' | 'horizontalGridState' | 'reelgridState' | 'buttonPanelState' | 'symbolState' | 'horizontalSymbolState' | 'applicationState'>): IStateToProps =>
    ({
        blastPosition: state.horizontalGridState.blastPosition,
        horizontalGridList: state.horizontalGridState.gridList,
        horizontalGridListAfterBlast: state.horizontalGridState.gridListAfterBlast,
        spinStart: state.reelgridState.spinStart,
        InTurboMode: state.reelgridState.InTurboMode,
        blastStart: state.reelgridState.blastStart,
        layoutMode: state.applicationState.layoutMode,
        winningList: state.reelgridState.winningList,
        currentCascadeCount: state.reelgridState.currentCascadeCount,
        totalCascadeCount: state.reelgridState.totalCascadeCount,
        playAnticipation: state.reelgridState.playAnticipation,
        forceSpinStop: state.reelgridState.forcespinStop,
        isSlamSpin: state.reelgridState.isSlamSpin,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setGridList: (grid: any): any => dispatch(horizontalSymbolActions.setGridList(grid)),
        nextAutoplay: (): any => dispatch(basegameAction.nextAutoplay()),
        nextFreegame: (): any => dispatch(freegameAction.nextFreegame()),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        stopWinPresentation: (): any => dispatch(winpresentationAction.stopWinPresentation()),
        setSpinType: (): any => dispatch(gridActions.setSpinType()),
        setSpinning: (spinning: boolean): any => dispatch(gridActions.setSpinningState(spinning)),
        setSpinComplete: (allSpinComplete: boolean): any => dispatch(gridActions.setSpinComplete(allSpinComplete)),
        setStoppedReel: (stoppedReel: number): any => dispatch(gridActions.setStoppingReel(stoppedReel)),
        onUpdateSymbolOnReel: (symbol: any, symbolId: number, randomSymbol: boolean): any => dispatch(symbolActions.setUpdatedSymbol(symbol, symbolId, randomSymbol)),
        onDropSymbolOnReel: (symbol: any, symbolId: any): any => dispatch(symbolActions.setDropSymbol(symbol, symbolId)),
        setSymbolAnimationName: (symbol: any, animationname: string, callback: any, callbackScope: any): any => dispatch(symbolActions.setSymbolAnimationName(symbol, animationname, callback, callbackScope)),
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),
        displayWinBox: (displayWinBox: boolean): any => dispatch(winpresentationAction.displayWinBox(displayWinBox)),
        playSymbolAnim: (): any => dispatch(horizontalSymbolActions.playSymbolAnim()),
        horizontalBlastStart: (): any => dispatch(horizontalSymbolActions.blastStart()),
        getBlastPosition: (): any => dispatch(horizontalSymbolActions.getBlastPosition()),
        setWinSymbolCoOrdinate: (winSymbolCoOrdinate: any): any => dispatch(horizontalSymbolActions.setWinSymbolCoOrdinate(winSymbolCoOrdinate)),

    }))(WithHorizontalGridConfiguration(HorizontalGrids)));
