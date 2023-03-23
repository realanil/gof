import React, {Component} from "react";
import withHorizontalSymbolConfiguration from "../horizontalSymbol/configuration/withHorizontalSymbolConfiguration";
import UIManager from "../../core/components/ui/UiBuilder";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {withPixiApp} from "@inlet/react-pixi";
import _ from "lodash";
import {TIMER} from "../../core/utills";
import {GJIStore} from "../../gamestore/IStore";
import {actions as symbolActions} from "../../core/reducers/symbolStateReducer";
import * as PIXI from "pixi.js";

interface IState {
    listOfanimationSymbol: any,

    [x: string]: any;
}
interface IProps {
    [x: string]: any;
}
interface IStateToProps {
}
interface IDispatchToProps {
}

class HorizontalSymbolAnimation extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected symbolImage: any = [];
    protected symbolAnimations: any = [];
    protected horizontalSymbolanimationContainer: any;
    protected symbolId: any;
    protected rowId: any;
    protected reelId: any;
    protected reel: any;
    protected playAnimation: boolean;
    protected startBlastAnim: boolean;
    protected animationName: string;
    protected horizontalContainerRotation: number = 1.57;
    protected horizontalContainerPivotY: number = 0;
    protected addOnValueInPivotX: number = -310;
    protected pivotY: number = -70;
    protected symbolanimationcontainer: any;
    protected SINGLE_SYMBOL_DELAY_IN_ANIM: number;
    protected SHOW_GROUP_WIN_SYMBOL_DELAY: number;
    protected SYMBOL_ANIMATION_GRP_WISE: boolean;
    protected LOOP: boolean;
    private T50: number = 50;
    private T5000: number = 5000;
    private toConvertInSec: number = 1000;
    private AllTimer :any [] = [];
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.AllTimer =[];
        this.symbolId = props.SYMBOL_ID;
        this.rowId = props.ROW_ID;
        this.reelId = props.REEL_ID;
        this.reel = props.REEL;
        this.playAnimation = false;
        this.startBlastAnim = false;
        this.animationName = "anim";
        this.SINGLE_SYMBOL_DELAY_IN_ANIM = this.props.data.SINGLE_SYMBOL_DELAY_IN_ANIM;
        this.SHOW_GROUP_WIN_SYMBOL_DELAY = this.props.configGame.SHOW_GROUP_WIN_SYMBOL_DELAY;
        this.SYMBOL_ANIMATION_GRP_WISE = this.props.data.SYMBOL_ANIMATION_GRP_WISE;
        this.LOOP = false;
        // this.symbolanimationcontainer = React.createRef();
        this.symbolanimationcontainer = {}
        this.state = {
            listOfanimationSymbol: []
        }
        this.init();
    }

    init() {
        for (let i = 0; i < this.props.data.symbolsAnimation.length; i++) {
            this.symbolImage.push(this.props.data.symbolsAnimation[i]);
        }
        this.props.setChangeAnimationConfig(this.LOOP, this.SINGLE_SYMBOL_DELAY_IN_ANIM, this.SHOW_GROUP_WIN_SYMBOL_DELAY, this.SYMBOL_ANIMATION_GRP_WISE, 'anim')
        this.bindEvent();
    }

    bindEvent() {
    }

    changeSymbolConfig(nextProps: any) {
        this.SINGLE_SYMBOL_DELAY_IN_ANIM = nextProps.singleSymbolAnimDelay || this.props.data.SINGLE_SYMBOL_DELAY_IN_ANIM;
        this.SHOW_GROUP_WIN_SYMBOL_DELAY = nextProps.groupSymbolAnimDelay || this.props.configGame.SHOW_GROUP_WIN_SYMBOL_DELAY;
        this.SYMBOL_ANIMATION_GRP_WISE = nextProps.symbolAnimGroupWise || this.props.data.SYMBOL_ANIMATION_GRP_WISE;
        this.LOOP = nextProps.animLoop;
        this.animationName = nextProps.animationName;
    }

    onDeletesymbolonreel(symbol: any) {
    }

    onUpdateRandomSymbolOnReel(symbol: any) {
        let randomSymbolIndex = Math.floor(Math.random() * this.symbolImage.length);
        let randomSymbolId = this.symbolImage[randomSymbolIndex].id;
        this.onUpdateSymbolOnReel(symbol, randomSymbolId);
    }

    onUpdateSymbolOnReel(symbol: any, newSymbolId: number, random?: boolean) {
        if (random === undefined) {
            random = false;
        }

        if (random) {
            if (symbol.rowId === this.rowId && symbol.reelId === this.reelId) {
                let randomSymbolIndex = Math.floor(Math.random() * this.symbolImage.length);
                this.symbolId = this.symbolImage[randomSymbolIndex].id;
            }
        } else {
            if (symbol.rowId === this.rowId && symbol.reelId === this.reelId) {
                this.symbolId = newSymbolId;
            }
        }
    }

    onUpdateSymbolAnimationName(animationName: string) {
        this.animationName = animationName;
    }

    isObject(obj: any) {
        let type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    iterationCopy(src: any) {
        let target: any = {};
        for (let prop in src) {
            if (src.hasOwnProperty(prop)) {
                // if the value is a nested object, recursively copy all it's properties
                if (this.isObject(src[prop])) {
                    target[prop] = this.iterationCopy(src[prop]);
                } else {
                    target[prop] = src[prop];
                }
            }
        }
        return target;
    }

    playSymbolAnimation(symbol: any) {
        symbol.loop = this.LOOP;
        symbol.play();
        symbol.onComplete = (e:any, obj:any) => {
            symbol.onComplete = null;
            symbol.onFrameChange = null; 
            symbol.onLoop = null;
            symbol.visible = false;    
            symbol.parent && symbol.parent.removeChild(symbol);          
            symbol = null;    
        if (this.props.data.SYMBOL_ANIMATION_EFFECT[0] === "glitch" && symbol) {
        }
    }
    }

    componentDidMount() {
    //     this.horizontalSymbolanimationContainer.COMPONENT.rotation = this.horizontalContainerRotation;
    //     for (let i = 0; i < UIManager.getRef("horizontalSymbolanimationContainer").children.length; i++) {
    //         UIManager.getRef("horizontalSymbolanimationContainer").children[i].rotation = -this.horizontalContainerRotation
    // }
}

    componentDidUpdate() {
        if (!this.props.playSymbolAnimation) {
            return;
        }
        if (!this.showSymbolsAnmation) {
            return;
        }
        this.horizontalSymbolanimationContainer.COMPONENT.rotation = this.horizontalContainerRotation;
        for (let i = 0; i < UIManager.getRef("horizontalSymbolanimationContainer").children.length; i++) {
            UIManager.getRef("horizontalSymbolanimationContainer").children[i].rotation = -this.horizontalContainerRotation
            if (this.props.data.SINGLE_SYMBOL_DELAY_IN_ANIM == 0) {
                UIManager.getRef("horizontalSymbolanimationContainer").children[i].play()
            } else {
                let timer = TIMER.TimerManager.createTimer(1 + i * this.props.data.SINGLE_SYMBOL_DELAY_IN_ANIM);
                timer.on('end', (e: any) => {
                    e.remove();
                    UIManager.getRef("horizontalSymbolanimationContainer").children[i].play()
                });
                timer.start();
                this.AllTimer.push(timer);
            }
        }
    }

   
    private cleanAllTimer():void{
        this.AllTimer.forEach((_time:any)=>{
           _time && _time.stop();
           _time && _time.reset();
           _time && _time.remove();
       }); 
       this.AllTimer =[];
   }

   private showSymbolsAnmation:boolean = false;

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.winSymbolCoOrdinate.length !== this.props.winSymbolCoOrdinate.length
            || nextProps.reel_data !== this.props.reel_data
            || nextProps.SymbolAnimationPositions !== this.props.SymbolAnimationPositions
            || nextProps.playSymbolAnimation !== this.props.playSymbolAnimation
            || nextProps.animLoop !== this.props.animLoop
            || nextProps.resetAnimConfig !== this.props.resetAnimConfig
            || nextProps.singleSymbolAnimDelay !== this.props.singleSymbolAnimDelay
            || nextProps.groupSymbolAnimDelay !== this.props.groupSymbolAnimDelay
            || nextProps.symbolAnimGroupWise !== this.props.symbolAnimGroupWise
            || nextProps.animLoop !== this.props.animLoop
            || nextProps.singleSymbolAnimDelay !== this.props.singleSymbolAnimDelay
            || nextProps.groupSymbolAnimDelay !== this.props.groupSymbolAnimDelay
            || nextProps.symbolAnimGroupWise !== this.props.symbolAnimGroupWise
            || nextProps.animationName != this.props.animationName
            || nextProps.horizontalGridList != this.props.horizontalGridList
        ) {
            if (nextProps.animLoop !== this.props.animLoop
                || nextProps.singleSymbolAnimDelay !== this.props.singleSymbolAnimDelay
                || nextProps.groupSymbolAnimDelay !== this.props.groupSymbolAnimDelay
                || nextProps.symbolAnimGroupWise !== this.props.symbolAnimGroupWise
                || nextProps.animationName !== this.props.animationName
            ) {
                this.changeSymbolConfig(nextProps);
            }
            if (nextProps.resetAnimConfig && nextProps.resetAnimConfig !== this.props.resetAnimConfig) {
                this.SINGLE_SYMBOL_DELAY_IN_ANIM = this.props.data.SINGLE_SYMBOL_DELAY_IN_ANIM;
                this.SHOW_GROUP_WIN_SYMBOL_DELAY = this.props.configGame.SHOW_GROUP_WIN_SYMBOL_DELAY;
                this.SYMBOL_ANIMATION_GRP_WISE = this.props.data.SYMBOL_ANIMATION_GRP_WISE;
                this.animationName = "anim";
                this.props.setChangeAnimationConfig(this.LOOP, this.SINGLE_SYMBOL_DELAY_IN_ANIM, this.SHOW_GROUP_WIN_SYMBOL_DELAY, this.SYMBOL_ANIMATION_GRP_WISE, 'anim')
            }

            if (nextProps.animationName !== this.props.animationName) {
                this.onUpdateSymbolAnimationName(nextProps.animationName);
            }

            if (nextProps.winSymbolCoOrdinate.length !== this.props.winSymbolCoOrdinate.length) {
                let animationInfo: any = [];
                this.showSymbolsAnmation = true;
                //this.horizontalSymbolanimationContainer.visible = true;
               // UIManager.getRef("horizontalSymbolanimationContainer").visible = true;
                if (nextProps.winSymbolCoOrdinate.length == 0) {
                    animationInfo = [];
                    this.horizontalSymbolanimationContainer.COMPONENT.removeChildren();
                    this.horizontalSymbolanimationContainer.visible = false;
                    UIManager.getRef("horizontalSymbolanimationContainer").visible = false;
                    this.clearAllChild();
                }
                // let animationInfo: any = []

                nextProps.winSymbolCoOrdinate.forEach((data: any, index: number) => {
                    animationInfo.push({
                        symbolRow: data.rowId,
                        symbolColumn: data.reelId,
                        symbolId: nextProps.horizontalGridList[data.reelId][data.rowId]
                    })


                })
                 this.setState((prevState) => {
                    return {
                        ...prevState,
                        listOfanimationSymbol: animationInfo,
                    }
                })

            }

            if (nextProps.playSymbolAnimation && nextProps.horizontalGridList == this.props.horizontalGridList) {
                this.cleanAllTimer();
                let animationInfo: any = [];
                nextProps.winSymbolCoOrdinate.forEach((data: any, index: number) => {
                    animationInfo.push({
                        symbolRow: data.reelId,
                        symbolColumn: data.rowId,
                        symbolId: nextProps.horizontalGridList[data.reelId][data.rowId]
                    })
                })

                this.setState((prevState) => {
                    return {
                        ...prevState,
                        listOfanimationSymbol: animationInfo,
                    }
                })
            }
            return false;
        }
        return true;
    }

    onCompleteCallBack(e: any, scope: any) {
    }

    private clearAllChild(): void {
        for (let i = 0; i < UIManager.getRef("horizontalSymbolanimationContainer").children.length; i++) {
            UIManager.getRef("horizontalSymbolanimationContainer").children[i].removeChildren();
        }
        UIManager.getRef("horizontalSymbolanimationContainer").removeChildren();
        UIManager.getRef("horizontalSymbolanimationContainer").visible = false;       
        this.horizontalSymbolanimationContainer.COMPONENT.children.length = 0; 
        this.horizontalSymbolanimationContainer.COMPONENT = null;
        this.showSymbolsAnmation = false;
    }

    getSymbolIndex(symbolId: number) {
        let symbolIndex = -1;
        this.symbolImage.filter((data: any, index: number) => {
            if (data.id == symbolId) {
                symbolIndex = index;
                return index;
            }
        })
        return symbolIndex;
    }

    render() {
        if (!this.showSymbolsAnmation) {
            return (<></>)
        }
      
        let {
            listOfanimationSymbol
        } = this.state
        let symbolChild_array: any = [];

        listOfanimationSymbol.map((data: any, i: any) => {
            let symbolIndex = this.getSymbolIndex(data.symbolId);
            let symbolContainer = this.symbolImage[symbolIndex];

            symbolContainer && symbolContainer.child.map((data: any, j: any) => {
                if (symbolContainer.child[j].x == undefined) {
                    symbolContainer.child[j].x = 0;
                }
                if (symbolContainer.child[j].y == undefined) {
                    symbolContainer.child[j].y = 0;
                }
                symbolChild_array.push(
                    <UIManager type="Animation"
                               key={`UIManager-${Math.random()*10000}`}   {...symbolContainer.child[j]}
                               playanimname={"anim"}
                               visible={this.props.playSymbolAnimation}
                               name={"symbol_animation_" + listOfanimationSymbol[i].symbolColumn + "_" + listOfanimationSymbol[i].symbolRow}
                               playing={this.props.playSymbolAnimation} scope={this}

                               x={symbolContainer.child[j].x + symbolContainer.offsetX + listOfanimationSymbol[i].symbolColumn}
                               reelId={listOfanimationSymbol[i].symbolColumn}
                               rowId={listOfanimationSymbol[i].symbolRow}

                               onComplete={() => {
                                   this.onCompleteCallBack(symbolContainer.child[j], this)
                               }}
                               anchor ={symbolContainer.child[j].anchor=== undefined?[0,0]:symbolContainer.child[j].anchor}
                               y={symbolContainer.child[j].y + symbolContainer.offsetY + symbolContainer.width * listOfanimationSymbol[i].symbolColumn}
                               app={this.app} configGame={this.props.configGame}/>
                );
            });
        });

        return (
            <UIManager ref={i => this.horizontalSymbolanimationContainer = i} type={"Container"}
                       id={"horizontalSymbolanimationContainer"}
                       app={this.app}
                       configGame={this.props.configGame}                      
                       name={"horizontalSymbolanimationContainer"} x={this.props.posx}
                       y={this.props.posy} visible={true} scale={this.props.scale}>
                {symbolChild_array}
            </UIManager>)
    }
}


export default withPixiApp(connect(
    (state: Pick<GJIStore, 'symbolState' | 'horizontalGridState' | 'winpresentationState' | 'reelgridState' | 'gridsState' | 'reelsState'>, ownProps?: any): IStateToProps =>
        ({
            onComplete: state.symbolState.onComplete,
            onCompleteScope: state.symbolState.onCompleteScope,
            animationName: state.symbolState.animationName,
            resetAnimConfig: state.symbolState.resetAnimConfig,
            animLoop: state.symbolState.animLoop,
            singleSymbolAnimDelay: state.symbolState.singleSymbolAnimDelay,
            groupSymbolAnimDelay: state.symbolState.groupSymbolAnimDelay,
            symbolAnimGroupWise: state.symbolState.symbolAnimGroupWise,

            winSymbolCoOrdinate: state.horizontalGridState.winSymbolCoOrdinate,
            playSymbolAnimation: state.winpresentationState.playSymbolAnimation,
            horizontalGridList: state.horizontalGridState.gridList,
             }),
    (dispatch: Dispatch): IDispatchToProps => (dispatch: Dispatch): IDispatchToProps => ({
        setChangeAnimationConfig: (animLoop: any, singleSymbolAnimDelay: any, groupSymbolAnimDelay: any, symbolAnimGroupWise: any, animationname: string): any => dispatch(symbolActions.setChangeAnimationConfig(animLoop, singleSymbolAnimDelay, groupSymbolAnimDelay, symbolAnimGroupWise, animationname)),

    }))(withHorizontalSymbolConfiguration(HorizontalSymbolAnimation)));