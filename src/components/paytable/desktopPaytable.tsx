import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import UIManager from "../../core/components/ui/UiBuilder";
import { alllanguage } from "../../data/lang/index";
import { Ilanguage } from "../../core/interface/Icommon";
import { actions as paytableActions } from "../../core/reducers/paytableReducer";
import { actions as paytableGofActions } from "./../../gamereducer/paytableBMReducer";
import withPaytableConfiguration from "../../core/components/paytable/configuration/withPaytableConfiguration";
import { isMobile, isTablet } from "react-device-detect";
import { actions as behaviourAction } from "../../gamereducer/behaviourReducer";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { CURRENCY } from "../../core/utills";
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

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}

class DesktopPaytable extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected paytable_Container: _ReactPixi.IContainer | Ref<any>;
    private alllanguage: Ilanguage;
    protected slideWidth: number;
    protected slidesContainerArray: any;
    protected totalCount: number;
    protected carouselDot1: any;
    protected carouselDotDisable1: any;
    protected carouselDot2: any;
    protected carouselDotDisable2: any;
    protected carouselDot3: any;
    protected carouselDotDisable3: any;
    protected carouselDot4: any;
    protected carouselDotDisable4: any;
    protected carouselDot5: any;
    protected carouselDotDisable5: any;
    protected carouselDot6: any;
    protected carouselDotDisable6: any;
    protected ui_mode: string;
    protected displayUI: any;
    protected baseContainerX: number = 100;
    protected baseContainerY: number = 50;
    protected baseContainerWidth: number = 970;
    protected baseContainerHeight: number = 680;
    private minFullHDWidth: number = 1024;
    private HDReadyWidth: number = 1280;
    private fullHDWidth: number = 1920;
    private minFullHDPxRatio: number = 2;
    private constantT1: number = 100;
    private canvasBgImagePage: string = "";
    protected symbolsList: any = [];

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.slideWidth = 1280;
        this.slidesContainerArray = [];
        this.totalCount = 0;

        this.alllanguage = alllanguage;
        // this.paytable_Container = React.createRef();
        this.paytable_Container = {};
        this.state = {
            uiElements: [],
            lang: "en",
            currentIndex: 1,
            totalSlides: 6,
            leftIndicator: false,
            rightIndicator: false,
            [this.carouselDot1]: { enable: true },

        }
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
        this.displayUI = this.props.child.filter(this.checkUiMode.bind(this));
        this.initializingCarousal();
        this.chooseAssets();
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

    }

    checkUiMode(uimodeobj: any) {

        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both";
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    //this method will initialize carousal state according to the page number in the beginning
    initializingCarousal() {
        this.displayUI.map((data: any) => {
            switch (data.name) {
                case "dotEnable1":
                    this.carouselDot1 = data;
                    return;
                case "dotDisable1":
                    this.carouselDotDisable1 = data;
                    return;
                case "dotEnable2":
                    this.carouselDot2 = data;
                    return;
                case "dotDisable2":
                    this.carouselDotDisable2 = data;
                    return;
                case "dotEnable3":
                    this.carouselDot3 = data;
                    return;
                case "dotDisable3":
                    this.carouselDotDisable3 = data;
                    return;
                case "dotEnable4":
                    this.carouselDot4 = data;
                    return;
                case "dotDisable4":
                    this.carouselDotDisable4 = data;
                    return;
                case "dotEnable5":
                    this.carouselDot5 = data;
                    return;
                case "dotDisable5":
                    this.carouselDotDisable5 = data;
                    return;
                case "dotEnable6":
                    this.carouselDot6 = data;
                    return;
                case "dotDisable6":
                    this.carouselDotDisable6 = data;
                    return;
                default:
                    return;
            }

        })

    }


    //this function will move slide to the left
    moveSlideLeft(currentIndexState: number) {

        let { totalSlides } = this.state;
        let currentIndex = currentIndexState;
        let displayInd = -1;

        let arrayMovingSlide = [];
        for (let i = 0; i < this.slidesContainerArray.length; i++) {
            arrayMovingSlide.push(this.slidesContainerArray[i]);
        }
        displayInd = arrayMovingSlide.length - currentIndex + 1;
        this.leftRotatebyOne(arrayMovingSlide, displayInd, arrayMovingSlide.length)
        for (let i = 1; i <= totalSlides; i++) {
            let slideObj = UIManager.getRef("slide_Container" + i);
            slideObj.x = arrayMovingSlide[i - 1];

        }
    }


    carouselChanging() {
        let name;
        this.displayUI.map((data: any) => {
            name = data.name;
            if (name.startsWith("dotEnable")) {
                data.visible = false;
            }
            if (name.startsWith("dotDisable")) {
                data.visible = true;
            }
            if (data.name === "dotEnable" + this.state.currentIndex) {
                data.visible = true;
            }
            if (data.name === "dotDisable" + this.state.currentIndex) {
                data.visible = false;
            }
        })
    }

    carouselDot() {
        this.carouselChanging();
        this.setState((prevState) => {
            return {
                ...prevState,
                [this.carouselDot1]: { enable: false },

            }
        })

    }


    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.paytablePayoutArray !== this.props.paytablePayoutArray) {
            return false;

        }
        if (nextProps.showPaytable && nextProps.showPaytable !== this.props.showPaytable) {
            (document.getElementsByClassName("canvasBgImage")[0] as any).style.display = 'none';
            this.props.startCarousel();

        }

        if (nextProps.carouselStart && nextProps.carouselStart !== this.props.carouselStart) {
            !isMobile && this.initialPlacedSlide();
        }
        if (nextState.currentIndex !== this.state.currentIndex) {
            {
                this.moveSlideLeft(nextState.currentIndex);
            }
        }
        return true;
    }

    chooseAssets() {
        let screen = window.screen;
        let isFullHD = false;
        if (((screen.width >= this.minFullHDWidth || screen.height >= this.minFullHDWidth) && window.devicePixelRatio >= this.minFullHDPxRatio) ||
            (screen.width >= this.HDReadyWidth || screen.height >= this.HDReadyWidth)) {
            isFullHD = true;
        }
        if (isFullHD) {
            this.canvasBgImagePage = "HD/assets/commongame/basegame_2048.jpg";
        } else {
            this.canvasBgImagePage = "LD/assets/commongame/basegame_2048.jpg";

        }
    }

    //when any button get clicked, we can get that button's call in this method
    handleEvent = (e: any) => {
        this.props.setApplicationButtonClicked(true);
        this.props.setApplicationButtonClicked(false);
        if (e.target.name === "rightArrowButtonImage") {
            this.rightButtonState();
            this.carouselDot();
        }
        if (e.target.name === "leftArrowButtonImage") {
            this.leftButtonState();
            this.carouselDot();
        }
        if (e.target.name === "paytable_closeButton") {

            this.props.setWinAmount(false);
            (document.getElementsByClassName("canvasBgImage")[0] as any).style.display = 'inline';
            (document.getElementsByClassName("canvasBgImage")[0] as any).src = this.canvasBgImagePage;

            this.setState((prevState) => {
                return {
                    ...prevState,
                    currentIndex: 1,
                }
            })
            this.props.hidePaytable();
            this.carouselDot1.id = this.state.currentIndex;
            this.carouselDot();
        }
        if (e.target.name !== "paytable_closeButton") {
            this.updateUi();
        }
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
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
                        UIManager.getRef("payout" + payoutWinning.symbolId + "_" + (i - 1)) && (UIManager.setText("payout" + payoutWinning.symbolId + "_" + (i - 1), CURRENCY.CurrencyManager.formatCurrencyString(((payoutWinning.paytable[payoutWinning.paytable.length - i]) / this.constantT1).toFixed(2), true, true, true, true)))
                    }
                }
            }
        })
        //to update paytable UI after resizing
        this.updateUi();
        for (let i = 0; i < this.props.storeWinningSymbolData.length; i++) {
            this.setSymbolHighlighted(this.props.storeWinningSymbolData[i]);
        }

    }

    setSymbolHighlighted(arr: any) {
        UIManager.getRef("graphic_" + arr[0] + "_" + arr[1]) && (UIManager.getRef("graphic_" + arr[0] + "_" + arr[1]).visible = true);
    }
    //this method will change the state for right button
    rightButtonState() {
        let selectedIndex = this.state.currentIndex;
        if (this.state.currentIndex === this.state.totalSlides) {
            selectedIndex = 0;
        }
        let calculateIndex = selectedIndex + 1;

        this.slideStateChanger(false, true, selectedIndex, calculateIndex);
    }

    slideStateChanger(leftIndicator: boolean, rightIndicator: boolean, selectedIndex: any, calculateIndex: any) {
        this.setState((prevState) => {
            return {
                ...prevState,
                currentIndex: calculateIndex,
                leftIndicator: leftIndicator,
                rightIndicator: rightIndicator
            }
        })
    }

    //this method will change the state for left button
    leftButtonState() {
        let selectedIndex = this.state.currentIndex;
        if (this.state.currentIndex === 1) {
            selectedIndex = this.state.totalSlides + 1;
        }
        let calculateIndex = selectedIndex - 1;
        this.slideStateChanger(true, false, selectedIndex, calculateIndex);
    }

    //this method will create masking on the area
    onIntroductionMaskOn() {
        const baseContainer = new PIXI.Graphics();
        baseContainer.beginFill(0xDE3249, 1);
        baseContainer.drawRect(0, 0, this.baseContainerWidth, this.baseContainerHeight);
        baseContainer.endFill();
        UIManager.getRef("introductionPage_Container").addChild(baseContainer);
        baseContainer.x = this.baseContainerX;
        baseContainer.y = this.baseContainerY;
        UIManager.getRef("introductionPage_Container").mask = baseContainer;
    }

    //when pages change, then UI will update by this method
    updateUi() {
        for (let i = 1; i <= this.state.totalSlides; i++) {
            let slideContainer: any = UIManager.getRef("slide_Container" + i)
            slideContainer && (slideContainer.visible = false);
        }
        UIManager.getRef("slide_Container" + this.state.currentIndex) && (UIManager.getRef("slide_Container" + this.state.currentIndex).visible = true);
    }
    
    leftRotatebyOne(arr: any, d: number, n: number) {
        let temp = [];

        // copy first d element in array temp
        for (let i = 0; i < d; i++)
            temp[i] = arr[i];

        // move the rest element to index
        // zero to N-d
        for (let i = d; i < n; i++) {
            arr[i - d] = arr[i];
        }

        // copy the temp array element
        // in origninal array
        for (let i = 0; i < d; i++) {
            arr[i + n - d] = temp[i];
        }
    }


    //whith the help of this method, we can choose the initial slide
    initialPlacedSlide() {

        let { totalSlides, currentIndex } = this.state;


        for (let i = 1; i <= totalSlides; i++) {

            let calculate_slideWidth = this.slideWidth * (i - 1)

            if (i <= totalSlides - 1) {
                this.slidesContainerArray.push(calculate_slideWidth);
            }
            if (i === totalSlides) {
                this.slidesContainerArray.push(-this.slideWidth);
            }
        }
        let displayInd = -1;
        let arrayMovingSlide = [];
        for (let i = 0; i < this.slidesContainerArray.length; i++) {
            arrayMovingSlide.push(this.slidesContainerArray[i])
        }
        displayInd = arrayMovingSlide.length - currentIndex + 1;
        this.leftRotatebyOne(arrayMovingSlide, displayInd, arrayMovingSlide.length)
        for (let i = 1; i <= totalSlides; i++) {
            let slideObj = UIManager.getRef("slide_Container" + i);
            slideObj.x = arrayMovingSlide[i - 1];

        }
    }


    render() {
        if (isMobile) {
            return (<></>)
        }
        if (!this.props.showPaytable) {
            return (<></>)
        }
        return (
            <UIManager id={"paytableContainer"} type={"Container"}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-Paytable-${Math.random()}`} langObj={this.props.langObj}
                            type={i.type}
                            id={i.id} {...i} app={this.app} ClickHandler={this.handleEvent} />)
                }

            </UIManager>
        );
    }


}

export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'paytableState' | 'paytableBMState' | 'basegameState' | 'behaviourState'>): IStateToProps =>
    ({
        showPaytable: state.paytableState.showPaytable,
        carouselStart: state.paytableBMState.carouselStart,
        paytablePayoutArray: state.paytableBMState.paytablePayoutArray,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        languageCode: state.applicationState.languageCode,
        storeWinningSymbolData: state.behaviourState.storeWinningSymbolData,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        hidePaytable: (): any => dispatch(paytableActions.hidePaytable()),
        startCarousel: (): any => dispatch(paytableGofActions.startCarousel()),
        setWinAmount: (winAmountEmpty: any): any => dispatch(behaviourAction.setWinAmount(winAmountEmpty)),
        setApplicationButtonClicked: (clicked: boolean): any => dispatch(buttonActions.setApplicationButtonClicked(clicked)),

    }))(withPaytableConfiguration(DesktopPaytable)));