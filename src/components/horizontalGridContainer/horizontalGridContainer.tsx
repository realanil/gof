import React, { Component } from "react";
import withHorizontalGridContainerConfiguration from "./configuration/withHorizontalGridContainerConfiguration";
import Horizontalgrid from "./../horizontalGrid/horizontalgrid";
import { Container, withPixiApp } from "@inlet/react-pixi";
import UIManager from "../../core/components/ui/UiBuilder";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { actions as layoutsActions } from "../../core/reducers/layoutsStateReducer";
import { isMobile } from "react-device-detect";
import { configGame } from "../../data/config";
import HorizontalSymbolAnimation from "../../components/horizontalSymbol/horizontalSymbolAnimation";
import * as PIXI from "pixi.js";

interface IStore {
    [x: string]: any;
}

interface IStateToProps {


}

interface IDispatchToProps {

}

interface IProps {
    [x: string]: any;


}

interface IState {

}

class HorizontalGridContainer extends Component<IProps, IState> {

    protected app: PIXI.Application;
    protected horizontalReelContainer: any;
    protected reelList: Array<any>;
    protected widthOfMaskingRect: number = 173;
    protected heightOfMaskingRect: number = 1100;
    protected xOfMaskingRect: number = -10;
    protected yOfMaskingRect: number = -360;
    protected horizontalContainerRotation: number = 1.57;
    protected maskingContainerColo: any = "0xDE3249";
    protected reelContainerX: any;
    protected reelContainerY: any;
    protected reelContainerXAnim: any;
    protected reelContainerYAnim: any;
    protected scalingOfReelContainer: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.reelList = [];
    }

    componentDidMount() {
        this.onReelMaskOn();

        this.horizontalReelContainer.rotation = this.horizontalContainerRotation;

    }


    //this method will on the masking of particular area
    onReelMaskOn() {

        const thing = new PIXI.Graphics();
        thing.beginFill(this.maskingContainerColo);
        thing.drawRect(0, 0, this.widthOfMaskingRect, this.heightOfMaskingRect);
        thing.endFill();
        this.horizontalReelContainer.addChild(thing);
        thing.x = this.xOfMaskingRect;
        thing.y = this.yOfMaskingRect;
        this.horizontalReelContainer.mask = thing;
    }

    //this method will of the masking of container
    onReelMaskOff() {
        this.horizontalReelContainer.mask = null;
    }

    //this method will resize horizontal grid container while orientation changes
    onOrientationChange() {
        this.reelContainerX = this.props.data.REEL_CONTAINER_X;
        this.reelContainerY = this.props.data.REEL_CONTAINER_Y;
        this.reelContainerXAnim = this.props.data.REEL_CONTAINER_X;
        this.reelContainerYAnim = this.props.data.REEL_CONTAINER_Y;
        this.scalingOfReelContainer = this.props.data.REEL_CONTAINER_SCALE;
        if (isMobile) {
            if (window.innerHeight > window.innerWidth) {
                this.reelContainerX = this.props.data.HORIZONTAL_REEL_CONTAINER_X_IN_PORTRAIT;
                this.reelContainerY = this.props.data.HORIZONTAL_REEL_CONTAINER_Y_IN_PORTRAIT;
                this.scalingOfReelContainer = this.props.data.HORIZONTAL_REEL_CONTAINER_SCALE_IN_PORTRAIT;
                this.reelContainerXAnim = this.props.data.HORIZONTAL_REEL_CONTAINER_X_ANIM_IN_PORTRAIT;
                this.reelContainerYAnim = this.props.data.HORIZONTAL_REEL_CONTAINER_Y_ANIM_IN_PORTRAIT;
            }
            if (window.innerHeight < window.innerWidth) {
                this.reelContainerX = this.props.data.HORIZONTAL_REEL_CONTAINER_X_IN_LANDSCAPE;
                this.reelContainerY = this.props.data.HORIZONTAL_REEL_CONTAINER_Y_IN_LANDSCAPE;
                this.scalingOfReelContainer = this.props.data.HORIZONTAL_REEL_CONTAINER_SCALE_IN_LANDSCAPE;
            }
        }
    }



    render() {
        this.onOrientationChange();
        const reels_array: any = [];

        for (let i = 0; i < 1; i++) {

            let PROPS_TO_SEND_Horizontalgrid = {
                key: "grid" + i,
                name: "grid" + i,
                canvasApp: this.app,
                GridIndex: i,
                gridList: this.reelList,
               
            }

            reels_array.push(<Horizontalgrid {...PROPS_TO_SEND_Horizontalgrid} />);
        }

        return (<>
            {this.props.data.child && this.props.data.child.map((i: any) => <UIManager
                key={`UIManager-${Math.random()}`} type={i.type} name ={"UIManager"}
                id={i.id} {...i} app={this.app} configGame={configGame} />)}
            <Container ref={i => this.horizontalReelContainer = i}   
              x={this.reelContainerX} y={this.reelContainerY}  name ={"UIManager"}
                scale={this.scalingOfReelContainer=== undefined ? 1:this.scalingOfReelContainer}>
                {reels_array}


            </Container>

            <HorizontalSymbolAnimation 
                configGame={this.props.configGame} posx={this.reelContainerX} posy={this.reelContainerY}
                scale={this.scalingOfReelContainer=== undefined ? 1:this.scalingOfReelContainer} REEL_WIDTH={this.props.data.REEL_WIDTH} name ={"HorizontalSymbolAnimation"}
                REEL_GAP={this.props.data.REEL_GAP}></HorizontalSymbolAnimation>

        </>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: string): any => dispatch(layoutsActions.setApplicationLayoutObject(layoutobjectlist)),
    }))(withHorizontalGridContainerConfiguration(HorizontalGridContainer)));