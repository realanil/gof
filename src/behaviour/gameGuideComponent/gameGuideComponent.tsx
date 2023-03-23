import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withHelpConfiguration from "../../core/components/help/configuration/withHelpConfiguration";
import { isMobile } from "react-device-detect";
import * as PIXI from "pixi.js";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as applicationStateActions } from "../../core/reducers/applicationStateReducer";
import { actions as layoutsActions } from "../../core/reducers/layoutsStateReducer";
import { configGame } from "../../data/config";
import { CURRENCY } from "../../core/utills";
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

class GameGuideComponent extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected canvasDesktopSettingPanelContainer: _ReactPixi.IContainer | Ref<any>;
    protected ui_mode: string;
    protected displayUI: any;
    protected showFixedPanelPage: boolean;
    protected showFixedPanelPageport: boolean;
    protected previousStateValue: any;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            buttonPanelEnable: true,
            allContainerList: [],
            uiElements: [],
            lang: "en",

        }
        this.showFixedPanelPage = false;
        this.showFixedPanelPageport = false;
        this.canvasDesktopSettingPanelContainer = {};
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";
        }
    }

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
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
    }
    layoutChange() {

        this.props.setApplicationLayoutObject();
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.layoutMode !== this.props.layoutMode) {
            if (window.innerHeight > window.innerWidth) {
                this.showFixedPanelPageport = true;
            } else {
                this.showFixedPanelPageport = false;
            }
            return true;
        }
        if (nextProps.showHelpText !== this.props.showHelpText) {
            return true;
        }
        return false;
    }

    helptextDisplayFunctionality() {
        this.props.setApplicationShowHelpText(false);
        this.props.setAllButtonEnable();
    }

    render() {
        if (!this.props.showHelpText) {
            return (
                <>
                </>
            )
        }
        if (isMobile) {
            this.showFixedPanelPage = true;
            if (window.innerHeight > window.innerWidth) {
                this.showFixedPanelPageport = true;
            }
        }
        return (
            <div style={{ width: "100%", height: "95.8%", backgroundColor: " rgba(0,0,0,0.85)" }} className="helptext_cls">
                {!this.showFixedPanelPage ? <div className="help_text_container_box">
                    <div className="help_text_container">
                        <div className="cancle_btn" onClick={() => this.helptextDisplayFunctionality()}><p> </p></div>
                        <h1 className="S0H1">{this.props.langObj["gameGuideintro1"]}</h1>
                        <p className="S1P1">{this.props.langObj["gameGuideintro1_1"]}</p>
                        <div className="S0I1" id="image gamescreen">
                        </div>
                        <h1 className="S1H1">1.{this.props.langObj["gameGuideHeading2"]}</h1>
                        <div className="overview_en">
                            <h2 className="S1H2">1.1 {this.props.langObj["gameGuideText2_1"]}</h2>
                            <p className="S1P1">{this.props.langObj["gameGuideText2_2"]} {configGame.REEL_COLUMN}</p>
                            <p className="S1P1">{this.props.langObj["gameGuideText2_3"]}</p>
                            <p className="S1P1">{this.props.langObj["gameGuideText2_4"]}</p>
                            <p className="S1P1">{this.props.langObj["gameGuideText2_5"]}</p>
                            <p className="S1P1">{this.props.langObj["gameGuideText2_6"]}</p>
                            <p className="S1P1">{this.props.langObj["gameGuideText2_7"]} {this.props.storeRtp}</p>
                            <p className="S1P1">{this.props.langObj["gameGuideText2_8"]} {CURRENCY.CurrencyManager.formatCurrencyString(this.props.betList[0]/100, true, true, true, true)}</p>
                            <p className="S1P1">{this.props.langObj["gameGuideText2_9"]} {CURRENCY.CurrencyManager.formatCurrencyString(this.props.betList[this.props.betList.length - 1]/100, true, true, true, true)}</p>
                        </div>
                        <br />
                        <h2 className="S1H3">1.2 {this.props.langObj["gameGuideHeading3"]}</h2>
                        <p className="S1P1">{this.props.langObj["gameGuideText3_1"]}</p>
                        <img src="HD\assets\paytable\lady.png" height="12%" width="10%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\red_sym.png" height="14%" width="10%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\blue_sym.png" height="14%" width="10%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\green_sym.png" height="14%" width="10%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\a.png" height="10%" width="8%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\k.png" height="10%" width="8%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\q.png" height="10%" width="8%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\j.png" height="10%" width="8%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\10.png" height="10%" width="8%" alt="img1" draggable="false"></img>
                        <img src="HD\assets\paytable\9.png" height="12%" width="10%" alt="img1" draggable="false"></img>
                        <p className="S1P1">{this.props.langObj["gameGuideText3_2"]}</p>
                        <img src="HD\assets\paytable\wild.png" height="11%" width="8%" alt="img1" draggable="false"></img>
                        <br></br><br></br>
                        <h2 className="S1H3">1.3 {this.props.langObj["gameGuideHeading4"]}</h2>
                        <p className="S1P1"> {this.props.langObj["gameGuideText4_1"]}</p>
                        <img src="HD\assets\paytable\cavereel.png" height="20%" width="50%" alt="img1" draggable="false"></img>
                        <br></br><br></br>
                        <h2 className="S1H3">1.4 {this.props.langObj["gameGuideHeading5"]}</h2>
                        <p className="S1P1">{this.props.langObj["gameGuideText5_1"]}</p>
                        <br></br>
                        <h2 className="S1H3">1.5 {this.props.langObj["gameGuideHeading6"]}</h2>
                        <p className="S1P1">{this.props.langObj["gameGuideText6_1"]}</p>
                        <img src="HD\assets\paytable\fire_sym.png" height="11%" width="27%" alt="img1" draggable="false"></img>
                        <p className="S1P1">{this.props.langObj["gameGuideText6_2"]}</p>
                        <img src="HD\assets\paytable\5.jpg" height="10%" width="6%" alt="img1" draggable="false"></img>
                        <br></br>  <br></br>
                        <h2 className="S1H3">1.6 {this.props.langObj["gameGuideHeading7"]}</h2>
                        <p className="S1P1">{this.props.langObj["gameGuideText7_1"]}</p>
                        <img src="HD\assets\paytable\freegame_screen.png" height="40%" width="40%" alt="img1" draggable="false"></img>
                        <br></br>   <br></br>
                        <h2 className="S1H3">1.7 {this.props.langObj["gameGuideHeading8"]}</h2>
                        <p className="S1P1">{this.props.langObj["gameGuideText8_1"]}</p>
                        <p className="S1P1">{this.props.langObj["gameGuideText8_2"]}</p>
                        <p className="S1P1">{this.props.langObj["gameGuideText8_3"]}</p>
                        <img src="HD\assets\paytable\scatter.png" height="12%" width="10%" alt="img1" draggable="false"></img>
                        <br />
                        <h1 className="S2H1">2. {this.props.langObj["gameGuideHeading9_0"]}</h1>
                        <p className="S2P1">{this.props.langObj["gameGuideHeading9_1_1"]}</p>
                        <p className="S2P1">{this.props.langObj["gameGuideHeading9_1_2"]}</p>

                        {
                            (this.props.jurisdictionKey !== "social") ? <p className="S2P1">{this.props.langObj["gameGuideHeading9_1_2_0"]}</p> : " "
                        }
                        <p className="S2P1">{this.props.langObj["gameGuideHeading9_1_3"]}</p>
                        <p className="S2P1">{this.props.langObj["gameGuideHeading9_1_4"]}</p>
                        <p className="S2P1">{this.props.langObj["gameGuideHeading9_1_5"]}</p>
                        <p className="S2P1">{this.props.langObj["gameGuideHeading9_1_6"]}</p>
                        <p className="S2P1">{this.props.langObj["gameGuideHeading9_1_7"]}</p>
                        {
                            this.props.enableAutoPlay ? <p className="S2P1">{this.props.langObj["gameGuideHeading9_1_8"]}</p> : ""
                        }
                        <p className="S2P1">{this.props.langObj["gameGuideHeading9_1_9"]}</p>
                        <p className="S2P1">{this.props.langObj["gameGuideHeading9_1_10"]}</p>
                        {
                            (this.props.jurisdictionKey !== "social") ? <p className="S2P1">{this.props.langObj["gameGuideHeading9_1_11"]}</p> : ""
                        }

                        <p className="S2P1">{this.props.langObj["gameGuideHeading9_1_12"]}</p>
                        <br></br>
                        <h1 className="S2H1">3. {this.props.langObj["gameGuideHeading9"]}</h1>
                        <p className="S2P1">{this.props.langObj["gameGuideText9_1"]}</p>
                        <p className="S2P1">{this.props.langObj["gameGuideText9_2"]}</p>
                        <p className="S2P1">{this.props.langObj["gameGuideText9_3"]}</p>
                        <p className="S2P1">{this.props.langObj["gameGuideText9_4"]}</p>
                        <p className="S2P1">{this.props.langObj["gameGuideText9_5"]}</p>
                        <p className="S2P1">{this.props.langObj["gameGuideText9_6"]}</p>
                        <p className="S2P1">{this.props.langObj["gameGuideText9_7"]}</p>
                        <br></br>
                        <img src="HD\assets\paytable\basegame_screen.png" height="40%" width="40%" alt="img1" draggable="false"></img>
                        <br></br><br></br>
                        <h2 className="S3H2">4. {this.props.langObj["gameGuideHeading10"]}</h2>
                        <div className="cnt_elements">
                            <p className="S2P1">{this.props.langObj["gameGuideText10_1"]}</p>
                            <p className="S2P1">{this.props.langObj["gameGuideText10_2"]}</p>
                            <p className="S2P1">{this.props.langObj["gameGuideText10_3"]}</p>
                            <p className="S2P1">{this.props.langObj["gameGuideText10_4"]}</p>
                            <p className="S2P1">{this.props.langObj["gameGuideText10_5"]}</p>
                        </div>
                        <br />
                        <h3 className="shAll" >4.1 {this.props.langObj["gameGuideText10_6"]}</h3>
                        <div className="cnt_elements">
                            <p className="S2P1">{this.props.langObj["gameGuideText10_7"]}</p>
                            <p className="S2P1">{this.props.langObj["gameGuideText10_8"]}</p>
                            <p className="S2P1">{this.props.langObj["gameGuideText10_9"]}</p>
                            <p className="S2P1">{this.props.langObj["gameGuideText10_10"]}</p>
                            <p className="S2P1">{this.props.langObj["gameGuideText10_11"]}</p>
                        </div>
                        <br />
                        {
                            this.props.enableAutoPlay ? <>
                                <h2 className="S3H3">5. {this.props.langObj["gameGuideHeading11"]}</h2>
                                <div className="cnt_elements">
                                    <p className="S2P1">{this.props.langObj["gameGuideText11_0"]}</p>
                                    <p className="S2P1">{this.props.langObj["gameGuideText11_1"]}</p>
                                    <p className="S2P1">{this.props.langObj["gameGuideText11_2"]}</p>
                                    <p className="S2P1">{this.props.langObj["gameGuideText11_3"]}</p>
                                    <p className="S2P1">{this.props.langObj["gameGuideText11_4"]}</p>
                                </div>
                                <br />
                                <h2 className="shAll">5.1  {this.props.langObj["gameGuideHeading12"]}</h2>
                                <div className="cnt_elements">
                                    <p className="S2P1">{this.props.langObj["gameGuideText12_1"]}</p>
                                    <p className="S2P1">{this.props.langObj["gameGuideText12_2"]}</p>
                                </div>
                                <br />
                                <h2 className="shAll" >5.2  {this.props.langObj["gameGuideHeading13"]}</h2>
                                <div className="cnt_elements">
                                    <p className="S2P1">{this.props.langObj["gameGuideText13_1"]}</p>
                                    <p className="S2P1">{this.props.langObj["gameGuideText13_2"]}</p>
                                    <p className="S2P1">{this.props.langObj["gameGuideText13_3"]}</p>
                                    <p className="S2P1">{this.props.langObj["gameGuideText13_4"]}</p>
                                    <p className="S2P1">{this.props.langObj["gameGuideText13_5"]}</p>
                                    <p className="S2P1">{this.props.langObj["gameGuideText13_6"]}</p>
                                    <p className="S2P1">{this.props.langObj["gameGuideText13_7"]}</p>
                                    <p className="S2P1">{this.props.langObj["gameGuideText13_8"]}</p>
                                    <p className="S2P1">{this.props.langObj["gameGuideText13_9"]}</p>
                                    <p className="S2P1">{this.props.langObj["gameGuideText13_10"]}</p>
                                </div>
                                <br />
                                <h2 className="shAll" >5.3 {this.props.langObj["gameGuideHeading14"]}</h2>
                                <div className="cnt_elements">
                                    <p className="S2P1">{this.props.langObj["gameGuideText14_1"]}</p>
                                    <p className="S2P1">{this.props.langObj["gameGuideText14_2"]}</p>
                                </div>
                                <br />
                            </> : ""
                        }
                        <h2 className="S3H3">{this.props.enableAutoPlay ? 6 : 5}. {this.props.langObj["gameGuideHeading15"]}</h2>

                        <div className="cnt_elements1">
                            <p className="S2P1">{this.props.langObj["gameGuideText15_1"]}</p>
                            <ul>
                                <li className="S2P1">{this.props.langObj["gameGuideText15_2"]}</li>
                                <li className="S2P1">{this.props.langObj["gameGuideText15_3"]}</li>
                                <li className="S2P1">{this.props.langObj["gameGuideText15_4"]}</li>
                                <li className="S2P1">{this.props.langObj["gameGuideText15_5"]}</li>
                                <li className="S2P1">{this.props.langObj["gameGuideText15_6"]}</li>
                                <li className="S2P1">{this.props.langObj["gameGuideText15_7"]}</li>
                                <li className="S2P1">{this.props.langObj["gameGuideText15_8"]}</li>
                            </ul>
                        </div>
                        <br></br>
                        <div className="SSES">
                            <p className="SRTP">
                                <i>
                                    {this.props.langObj["gameGuideText16"]}  {this.props.storeRtp}{"."}<br />
                                    {this.props.langObj["gameGuideText16_1"]}<br />
                                    {this.props.langObj["gameGuideText17"]}
                                </i>
                                <br></br><br></br>
                                <span> {this.props.langObj["gameGuideText18"]}</span>
                            </p>
                        </div>
                        <div className="VTEXT">
                            <p className="VERSION"> {this.props.gameVersion}</p>
                        </div>
                    </div>
                </div> : <div className="help_text_container_box_mob">
                    <div className="help_text_container_mob">
                        <h1 className="S0H1">{this.props.langObj["gameGuideintro1"]}</h1>
                        <p className="S2P11">{this.props.langObj["gameGuideintro1_1"]}</p>
                        <div className="S0I1" id="image gamescreen">

                        </div>
                        <h1 className="S1H1">1.{this.props.langObj["gameGuideHeading2"]}</h1>
                        <div className="overview_en">
                            <h2 className="S1H2">1.1 {this.props.langObj["gameGuideText2_1"]}</h2>
                            <p className="S2P11">{this.props.langObj["gameGuideText2_2"]} {configGame.REEL_COLUMN}</p>
                            <p className="S2P11">{this.props.langObj["gameGuideText2_3"]}</p>
                            <p className="S2P11">{this.props.langObj["gameGuideText2_4"]}</p>
                            <p className="S2P11">{this.props.langObj["gameGuideText2_5"]}</p>
                            <p className="S2P11">{this.props.langObj["gameGuideText2_6"]}</p>
                            <p className="S2P11">{this.props.langObj["gameGuideText2_7"]} {this.props.storeRtp}</p>
                            <p className="S2P11">{this.props.langObj["gameGuideText2_8"]} {CURRENCY.CurrencyManager.formatCurrencyString(this.props.betList[0]/100, true, true, true, true)}</p>
                            <p className="S2P11">{this.props.langObj["gameGuideText2_9"]} {CURRENCY.CurrencyManager.formatCurrencyString(this.props.betList[this.props.betList.length - 1]/100, true, true, true, true)}</p>
                        </div>
                        <br />
                        <h2 className="S1H3">1.2 {this.props.langObj["gameGuideHeading3"]}</h2>
                        <p className="S2P11">{this.props.langObj["gameGuideText3_1"]}</p>
                        {
                            !this.showFixedPanelPageport ? <div className="imgboxx">
                                <img src="LD\assets\paytable\lady.png" height="12%" width="10%" alt="img1" ></img>
                                <img src="LD\assets\paytable\red_sym.png" height="14%" width="10%" alt="img1"></img>
                                <img src="LD\assets\paytable\blue_sym.png" height="14%" width="10%" alt="img1"></img>
                                <img src="LD\assets\paytable\green_sym.png" height="14%" width="10%" alt="img1"></img>
                                <img src="LD\assets\paytable\a.png" height="10%" width="8%" alt="img1"></img>
                                <img src="LD\assets\paytable\k.png" height="10%" width="8%" alt="img1"></img>
                                <img src="LD\assets\paytable\q.png" height="10%" width="8%" alt="img1"></img>
                                <img src="LD\assets\paytable\j.png" height="10%" width="8%" alt="img1"></img>
                                <img src="LD\assets\paytable\10.png" height="10%" width="8%" alt="img1"></img>
                                <img src="LD\assets\paytable\9.png" height="12%" width="10%" alt="img1"></img>
                            </div> : <>
                                <img src="LD\assets\paytable\lady.png" height="14%" width="17%" alt="img1"></img>
                                <img src="LD\assets\paytable\red_sym.png" height="14%" width="16%" alt="img1"></img>
                                <img src="LD\assets\paytable\blue_sym.png" height="14%" width="15%" alt="img1"></img>
                                <img src="LD\assets\paytable\green_sym.png" height="14%" width="15%" alt="img1"></img>
                                <img src="LD\assets\paytable\a.png" height="10%" width="15%" alt="img1"></img>
                                <img src="LD\assets\paytable\k.png" height="10%" width="15%" alt="img1"></img><br></br>
                                <img src="LD\assets\paytable\q.png" height="10%" width="15%" alt="img1"></img>
                                <img src="LD\assets\paytable\j.png" height="10%" width="15%" alt="img1"></img>
                                <img src="LD\assets\paytable\10.png" height="10%" width="15%" alt="img1"></img>
                                <img src="LD\assets\paytable\9.png" height="12%" width="15%" alt="img1"></img>
                            </>
                        }
                        <p className="S2P11">{this.props.langObj["gameGuideText3_2"]}</p>
                        {
                            this.showFixedPanelPageport ? <img src="LD\assets\paytable\wild.png" alt="img1" height="22%" width="30%"></img> : <img src="LD\assets\paytable\wild.png" height="48%" width="17%" alt="img1" ></img>
                        }
                        <br></br><br></br>
                        <h2 className="S1H3">1.3 {this.props.langObj["gameGuideHeading4"]}</h2>
                        <p className="S2P11"> {this.props.langObj["gameGuideText4_1"]}</p>
                        {
                            this.showFixedPanelPageport ? <img src="LD\assets\paytable\cavereel.png" height="19%" width="97%" alt="img1" ></img> : <img src="LD\assets\paytable\cavereel.png" height="70%" width="92%" alt="img1" ></img>
                        }

                        <br></br><br></br>
                        <h2 className="S1H3">1.4 {this.props.langObj["gameGuideHeading5"]}</h2>
                        <p className="S2P11">{this.props.langObj["gameGuideText5_1"]}</p>
                        <br></br>
                        <h2 className="S1H3">1.5 {this.props.langObj["gameGuideHeading6"]}</h2>
                        <p className="S2P11">{this.props.langObj["gameGuideText6_1"]}</p>
                        {
                            this.showFixedPanelPageport ? <img src="LD\assets\paytable\fire_sym.png" alt="img1" height="28%" width="97%" className="help_img_box1"></img> : <img src="LD\assets\paytable\fire_sym.png" alt="img1" height="70%" width="60%" className="help_img_box1"></img>
                        }

                        <p className="S2P11">{this.props.langObj["gameGuideText6_2"]}</p>
                        {
                            this.showFixedPanelPageport ? <img src="LD\assets\paytable\5.jpg" alt="img1" height="28%" width="23%" className="help_img_box1"></img> : <img src="LD\assets\paytable\5.jpg" alt="img1" height="70%" width="14%" className="help_img_box1"></img>
                        }

                        <br></br><br></br>
                        <h2 className="S1H3">1.6 {this.props.langObj["gameGuideHeading7"]}</h2>
                        <p className="S2P11">{this.props.langObj["gameGuideText7_1"]}</p>
                        {
                            this.showFixedPanelPageport ? <img src="LD\assets\paytable\freegame_screen.png" alt="img1" height="33%" width="75%" ></img> : <img src="LD\assets\paytable\freegame_screen.png" alt="img1" height="90%" width="50%" ></img>
                        }

                        <br></br><br></br>
                        <h2 className="S1H3">1.7 {this.props.langObj["gameGuideHeading8"]}</h2>
                        <p className="S2P11">{this.props.langObj["gameGuideText8_1"]}</p>
                        <p className="S2P11">{this.props.langObj["gameGuideText8_2"]}</p>
                        <p className="S2P11">{this.props.langObj["gameGuideText8_3"]}</p>
                        {
                            this.showFixedPanelPageport ? <img src="LD\assets\paytable\scatter.png" alt="img1" height="33%" width="55%" ></img> : <img src="LD\assets\paytable\scatter.png" alt="img1" height="83%" width="35%"  ></img>
                        }

                        <br></br><br></br>
                        <h1 className="S2H1">2. {this.props.langObj["gameGuideHeading9_0"]}</h1>
                        <p className="S2P11">{this.props.langObj["gameGuideHeading9_1_1"]}</p>
                        <p className="S2P11">{this.props.langObj["gameGuideHeading9_1_2"]}</p>
                        {
                            (this.props.jurisdictionKey !== "social") ? <p className="S2P11">{this.props.langObj["gameGuideHeading9_1_2_0"]}</p> : " "
                        }

                        <p className="S2P11">{this.props.langObj["gameGuideHeading9_1_3"]}</p>
                        <p className="S2P11">{this.props.langObj["gameGuideHeading9_1_4"]}</p>
                        <p className="S2P11">{this.props.langObj["gameGuideHeading9_1_5"]}</p>
                        <p className="S2P11">{this.props.langObj["gameGuideHeading9_1_6"]}</p>
                        <p className="S2P11">{this.props.langObj["gameGuideHeading9_1_7"]}</p>
                        {
                            this.props.enableAutoPlay ? <p className="S2P11">{this.props.langObj["gameGuideHeading9_1_8"]}</p> : ""
                        }
                        <p className="S2P11">{this.props.langObj["gameGuideHeading9_1_9"]}</p>
                        <p className="S2P11">{this.props.langObj["gameGuideHeading9_1_10"]}</p>
                        {
                            (this.props.jurisdictionKey !== "social") ? <p className="S2P11">{this.props.langObj["gameGuideHeading9_1_11"]}</p> : " "
                        }

                        <p className="S2P11">{this.props.langObj["gameGuideHeading9_1_12"]}</p>
                        <br></br>
                        <h1 className="S2H1">3. {this.props.langObj["gameGuideHeading9"]}</h1>
                        <p className="S2P11">{this.props.langObj["gameGgameGuideText9_1uideText2_0"]}</p>
                        <p className="S2P11">{this.props.langObj["gameGuideText9_2"]}</p>
                        <p className="S2P11">{this.props.langObj["gameGuideText9_3"]}</p>
                        <p className="S2P11">{this.props.langObj["gameGuideText9_4"]}</p>
                        <p className="S2P11">{this.props.langObj["gameGuideText9_5"]}</p>
                        <p className="S2P11">{this.props.langObj["gameGuideText9_6"]}</p>
                        <p className="S2P11">{this.props.langObj["gameGuideText9_7"]}</p>
                        {
                            this.showFixedPanelPageport ? <img src="LD\assets\paytable\basegame_screen.png" alt="img1" height="33%" width="75%" ></img> : <img src="LD\assets\paytable\basegame_screen.png" alt="img1" height="90%" width="50%"  ></img>
                        }
                        <br></br><br></br>
                        <h2 className="S3H2">4. {this.props.langObj["gameGuideHeading10"]}</h2>
                        <div className="cnt_elements">
                            <p className="S2P11">{this.props.langObj["gameGuideText10_1"]}</p>
                            <p className="S2P11">{this.props.langObj["gameGuideText10_2"]}</p>
                            <p className="S2P11">{this.props.langObj["gameGuideText10_3"]}</p>
                            <p className="S2P11">{this.props.langObj["gameGuideText10_4"]}</p>
                            <p className="S2P11">{this.props.langObj["gameGuideText10_5"]}</p> </div>
                        <br></br>
                        <h3 className="shAll" >4.1 {this.props.langObj["gameGuideText10_6"]}</h3>
                        <div className="cnt_elements">
                            <p className="S2P11">{this.props.langObj["gameGuideText10_7"]}</p>
                            <p className="S2P11">{this.props.langObj["gameGuideText10_8"]}</p>
                            <p className="S2P11">{this.props.langObj["gameGuideText10_9"]}</p>
                            <p className="S2P11">{this.props.langObj["gameGuideText10_10"]}</p>
                            <p className="S2P11">{this.props.langObj["gameGuideText10_11"]}</p>
                        </div>
                        <br></br>
                        {
                            this.props.enableAutoPlay ? <>
                                <h2 className="S3H3">5. {this.props.langObj["gameGuideHeading11"]}</h2>
                                <div className="cnt_elements">
                                    <p className="S2P11">{this.props.langObj["gameGuideText11_0"]}</p>
                                    <p className="S2P11">{this.props.langObj["gameGuideText11_1"]}</p>
                                    <p className="S2P11">{this.props.langObj["gameGuideText11_2"]}</p>
                                    <p className="S2P11">{this.props.langObj["gameGuideText11_3"]}</p>
                                    <p className="S2P11">{this.props.langObj["gameGuideText11_4"]}</p>
                                </div>
                                <br></br>
                                <h2 className="shAll">5.1  {this.props.langObj["gameGuideHeading12"]}</h2>
                                <div className="cnt_elements">
                                    <p className="S2P11">{this.props.langObj["gameGuideText12_1"]}</p>
                                    <p className="S2P11">{this.props.langObj["gameGuideText12_2"]}</p>
                                </div>
                                <br></br>
                                <h2 className="shAll">5.2 {this.props.langObj["gameGuideHeading13"]}</h2>
                                <div className="cnt_elements">
                                    <p className="S2P11">{this.props.langObj["gameGuideText13_1"]}</p>
                                    <p className="S2P11">{this.props.langObj["gameGuideText13_2"]}</p>
                                    <p className="S2P11">{this.props.langObj["gameGuideText13_3"]}</p>
                                    <p className="S2P11">{this.props.langObj["gameGuideText13_4"]}</p>
                                    <p className="S2P11">{this.props.langObj["gameGuideText13_5"]}</p>
                                    <p className="S2P11">{this.props.langObj["gameGuideText13_6"]}</p>
                                    <p className="S2P11">{this.props.langObj["gameGuideText13_7"]}</p>
                                    <p className="S2P11">{this.props.langObj["gameGuideText13_8"]}</p>
                                    <p className="S2P11">{this.props.langObj["gameGuideText13_9"]}</p>
                                    <p className="S2P11">{this.props.langObj["gameGuideText13_10"]}</p>
                                </div>
                                <br></br>
                                <h2 className="shAll">5.3 {this.props.langObj["gameGuideHeading14"]}</h2>
                                <div className="cnt_elements">
                                    <p className="S2P11">{this.props.langObj["gameGuideText14_1"]}</p>
                                    <p className="S2P11">{this.props.langObj["gameGuideText14_2"]}</p>
                                </div><br />
                            </> : ""
                        }
                        <h2 className="S3H3">{this.props.enableAutoPlay ? 6 : 5}. {this.props.langObj["gameGuideHeading15"]}</h2>
                        <div className="cnt_elements1">
                            <p className="S2P11">{this.props.langObj["gameGuideText15_1"]}</p>
                            <ul>
                                <li className="S2P11">{this.props.langObj["gameGuideText15_2"]}</li>
                                <li className="S2P11">{this.props.langObj["gameGuideText15_3"]}</li>
                                <li className="S2P11">{this.props.langObj["gameGuideText15_4"]}</li>
                                <li className="S2P11">{this.props.langObj["gameGuideText15_5"]}</li>
                                <li className="S2P11">{this.props.langObj["gameGuideText15_6"]}</li>
                                <li className="S2P11">{this.props.langObj["gameGuideText15_7"]}</li>
                                <li className="S2P11">{this.props.langObj["gameGuideText15_8"]}</li>
                            </ul>

                        </div>
                        <br></br>
                        <div className="SSES">
                            <p className="SRTP">
                                <i>
                                    {this.props.langObj["gameGuideText16"]}  {this.props.storeRtp}{"."}<br />
                                    {this.props.langObj["gameGuideText16_1"]}<br />
                                    {this.props.langObj["gameGuideText17"]}
                                </i>
                                <br></br><br></br>
                                <span> {this.props.langObj["gameGuideText18"]}</span>
                            </p>
                        </div>
                        <div className="VTEXT">
                            <p className="VERSION"> {this.props.gameVersion}</p>
                        </div>
                    </div>
                </div>}
            </div>

        )
    }

}

export default withPixiApp(connect(
    (state: Pick<IStore, | 'applicationState' | 'basegameState' | 'behaviourState' | 'paytableBMState'>): IStateToProps =>
    ({
        showHelpText: state.applicationState.showHelpText,
        storeRtp: state.paytableBMState.storeRtp,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        maxWinOddsCount: state.behaviourState.maxWinOddsCount,
        layoutMode: state.applicationState.layoutMode,
        jurisdictionKey: state.applicationState.jurisdictionKey,
        enableAutoPlay: state.applicationState.enableAutoPlay,
        gameVersion: state.applicationState.gameVersion,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        setApplicationShowHelpText: (showHelpText: boolean): any => dispatch(applicationStateActions.setApplicationShowHelpText(showHelpText)),
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutsActions.setApplicationLayoutObject(layoutobjectlist)),
    }))(withHelpConfiguration(GameGuideComponent)));