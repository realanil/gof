import React, { Component } from "react";
import withHorizontalSymbolConfiguration from "../horizontalSymbol/configuration/withHorizontalSymbolConfiguration";
import { withPixiApp } from "@inlet/react-pixi";
import UIManager from "../../core/components/ui/UiBuilder";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { configGame } from "../../data/config";
import * as PIXI from "pixi.js";

interface IStore {
    [x: string]: any;
}

interface IState {

}

interface IProps {
    [x: string]: any;
}

interface IStateToProps {

}

interface IDispatchToProps {

}

class HorizontalSymbol extends Component<IProps> {
    protected app: PIXI.Application;
    protected symbolImage: any = [];
    protected symbolAnimations: any = [];
    protected horizontalSymbolContainer: any;
    protected symbolcontainerobj: any;
    protected symbolId: any;
    protected rowId: any;
    protected reelId: any;
    protected reel: any;
    protected playAnimation: boolean;
    protected startBlastAnim: boolean;
    protected animationName: string;


    constructor(props: IProps) {
        super(props);
        this.app = props.app;

        this.symbolId = props.SYMBOL_ID;
        this.rowId = props.ROW_ID;
        this.reelId = props.REEL_ID;
        this.reel = props.REEL;
        this.playAnimation = false;
        this.startBlastAnim = false;
        this.animationName = "";
        // this.horizontalSymbolContainer = React.createRef();
        this.horizontalSymbolContainer = {};
        this.symbolcontainerobj = [];
        this.init();
    }

    init() {
        for (let i = 0; i < this.props.data.symbols.length; i++) {
            this.symbolImage.push(this.props.data.symbols[i]);

        }

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
        this.symbolId = newSymbolId;
        //    this.rowId   =   this.horizontalSymbolContainer.rowId;
        //     this.reelId =this.horizontalSymbolContainer.reelId ;

        this.horizontalSymbolContainer.symbolId = this.symbolId;
    }

    onUpdateSymbolAnimationName(symbol: any, animationName: string) {

        if (symbol.rowId === this.rowId && symbol.reelId === this.reelId) {

            this.animationName = animationName;
            if (this.animationName === "blast") {
                this.startBlastAnim = true;
            }

        }
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

    componentDidMount() {

        this.horizontalSymbolContainer.rowId = this.rowId;
        this.horizontalSymbolContainer.reelId = this.reelId;
        this.horizontalSymbolContainer.symbolId = this.symbolId;
        this.reel.symbols.push(this.horizontalSymbolContainer);
        this.horizontalSymbolContainer.COMPONENT.rotation = -1.57;

    }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.updatedSymbol.reelId == this.horizontalSymbolContainer.reelId && nextProps.updatedSymbol.rowId == this.horizontalSymbolContainer.rowId) {

            this.onUpdateSymbolOnReel(nextProps.updatedSymbol, nextProps.updatedSymbolId, nextProps.randomSymbol);
            return true
        }
        return false
    }

    onCompleteCallBack(e: any, scope: any) {
        scope.playAnimation = false;
        scope.startBlastAnim = false;
        scope.animationName = "";
    }

    getSymbolIndex(symbolId: number) {
        let symbolIndex = -1;

        this.symbolImage.map((data: any, m: number) => {
            if (data.id == symbolId) {
                symbolIndex = m;
                this.symbolcontainerobj = data
                return m;
            }
        });
        return symbolIndex;
    }


    render() {
        this.playAnimation = false;

        const symbolChild_array: any = [];
        let symbolHeight = 0;
        let symbolWidth = 0;
        let offsetX = 0;
        let offsetY = 0;
        let anchor = 0;
        if (this.symbolImage.length > 0 && this.symbolId > -1) {
            let symbolIndex = this.getSymbolIndex(this.symbolId);
            let symbolContainer = this.symbolcontainerobj;

            symbolContainer.child.map((data: any, m: number) => {
                symbolWidth = symbolContainer.height;
                symbolHeight = symbolContainer.width;
                offsetX = symbolContainer.offsetX || 0;
                offsetY = 0;
                anchor = symbolContainer.anchor || [0, 0];

                symbolChild_array.push(
                    <UIManager
                        key={`UIManager-${Math.random()}`}  {...symbolContainer.child[m]}
                        playanimname={this.animationName}
                        name={"horizontalsymbol_block" + this.symbolId}
                      
                        playing={this.playAnimation} onComplete={this.onCompleteCallBack} scope={this}
                        anchor ={symbolContainer.child[m].anchor}
                        app={this.app} configGame={this.props.configGame} />
                );
            });
        }

        if (symbolHeight === 0) {
            symbolHeight = this.props.data.SYMBOL_WIDTH
        }
        return (<UIManager ref={i => this.horizontalSymbolContainer = i} type={"Container"} id={"symbolcontainer"}
            app={this.app}
            configGame={this.props.configGame === undefined?configGame:this.props.configGame}
            name={"symbolcontainer"} offsetX={0} offsetY={0} x={0}
            y={this.props.yoffset === undefined ?0:this.props.yoffset} visible={true}>
            {symbolChild_array}

        </UIManager>
        )
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'symbolState' | 'winpresentationState' | 'horizontalSymbolState'>): IStateToProps =>
    ({
        animationName: state.horizontalSymbolState.animationName,
        updatedSymbol: state.horizontalSymbolState.updatedSymbol,
        updatedSymbolId: state.horizontalSymbolState.updatedSymbolId,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({}))(withHorizontalSymbolConfiguration(HorizontalSymbol)));