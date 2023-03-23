import React, { Component } from "react";
import { ReelObject } from "./reelObject";
import * as PIXI from "pixi.js";

interface IProps {
    [x: string]: any;
}
interface IState {
    [x: string]: any;
}


class Cheat extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected hor_reel_Count: number;
    protected hor_row_Count: number;
    protected reel_Count: number;
    protected row_Count: number;
    protected HorizontalData: any;
    protected MainReelData: any;
    protected forceSelected = false;
    protected loseSelected = false;
    protected printSoundSelected = false;

    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.hor_reel_Count = 1;
        this.hor_row_Count = 4;
        this.reel_Count = 6;
        this.row_Count = 7;
        this.state = {
            toggle: false,
            forcechecked: false,
            freegamechecked: false,
            printSoundChecked:false,
        };
        this.HorizontalData = [];
        this.MainReelData = [];

        for (let i = 0; i < this.hor_row_Count; i++) {
            let symbolObj = { reel: 0, row: i, symbol: -1 };
            this.HorizontalData.push(symbolObj)
        }

        for (let i = 0; i < this.reel_Count; i++) {
            for (let j = 0; j < this.row_Count; j++) {
                let symbolObj = { reel: i, row: j, symbol: -1 }
                this.MainReelData.push(symbolObj)
            }
        }
        localStorage.setItem("Printsound","false");
    }

    checkboxHandleFG(e: any) {
        this.loseSelected = e.currentTarget.checked;
        this.setState((prevState) => {
            return {
                ...prevState,
                freegamechecked: this.loseSelected,
            }
        })
        this.handleCase();
    }
    checkboxHandlePS(e: any) {
        this.printSoundSelected = e.currentTarget.checked;
        this.setState((prevState) => {
            return {
                ...prevState,
                printSoundChecked: this.printSoundSelected,
            }
        })
        this.handleCase();
    }

    cleanAllCheat() {
        localStorage.setItem("cheatModifiedRequest", "");
    }

    clearCheat(e: any) {
        localStorage.setItem("cheatModifiedRequest", "");
        this.setState(() => ({
            forcechecked: false,
            freegamechecked: false,
            printSoundChecked:false,
        }));
        this.forceSelected = false;
        this.loseSelected = false;
        this.printSoundSelected=false;
        this.HorizontalData = [];
        this.MainReelData = [];

        for (let i = 0; i < this.hor_row_Count; i++) {
            let symbolObj = { reel: 0, row: i, symbol: -1 };
            this.HorizontalData.push(symbolObj)
        }

        for (let i = 0; i < this.reel_Count; i++) {
            for (let j = 0; j < this.row_Count; j++) {
                let symbolObj = { reel: i, row: j, symbol: -1 }
                this.MainReelData.push(symbolObj)
            }
        }
        this.forceUpdate();
    }
    updateCheat() {
        this.handleCase();
    }

    checkboxHandle(e: any) {
        this.forceSelected = e.currentTarget.checked;
        this.setState((prevState) => {
            return {
                ...prevState,
                forcechecked: this.forceSelected,
            }
        })
        localStorage.setItem("cheatModifiedRequest", "");
        this.handleCase();

    }
    handleCase() {
        if (this.forceSelected) {
            if (this.loseSelected) {
                this.createLoseCheat();
            } else {
                this.createCheat()
            }

        } else {
            this.cleanAllCheat();
        }
        if (this.printSoundSelected) {
        localStorage.setItem("Printsound","true");
        }else{
            localStorage.setItem("Printsound","false");
        }
    }
    createLoseCheat() {
        localStorage.setItem("cheatModifiedRequest", JSON.stringify(
            {
                "cheatCascadeMatrix": [
                    this.setReelMatrixReel(0),
                    this.setReelMatrixReel(1),
                    this.setReelMatrixReel(2),
                    this.setReelMatrixReel(3),
                    this.setReelMatrixReel(4),
                    this.setReelMatrixReel(5),
                ],
                "cmd": "cheatSpin"
            }
        ));
    }
    createCheat() {
        localStorage.setItem("cheatModifiedRequest", JSON.stringify(
            {
                "cheatCascadeMatrix": [
                    this.setReelMatrixReel1(),
                    this.setReelMatrixReel2(),
                    this.setReelMatrixReel3(),
                    this.setReelMatrixReel4(),
                    this.setReelMatrixReel5(),
                    this.setReelMatrixReel6(),
                ],
                "cmd": "cheatSpin"
            }
        ));
    }
    setReelMatrixReel(reelId: number) {
        let reel = [];
        let symbolCount = Math.floor(Math.random() * (6) + 2);
        switch (reelId) {
            case 0:
            case 5:
                reel.push("");
                break;
            default:
                reel.push(this.getsymbolID(Math.floor(Math.random() * (3) + 3)));
        }

        for (let i = 0; i < symbolCount; i++) {
            switch (reelId) {
                case 0:
                    reel.push(this.getsymbolID(Math.floor(Math.random() * (4) + 6)));
                    break;
                case 1:
                    reel.push(this.getsymbolID(Math.floor(Math.random() * (3))));
                    break;
                default:
                    reel.push(this.getsymbolID(Math.floor(Math.random() * (9))));
            }
        }
        return reel;
    }
    setReelMatrixReel1() {
        let reel = [];
        reel.push("");

        if (this.MainReelData[0].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (7) + 1)));
        }
        else {
            reel.push(this.getsymbolID(this.MainReelData[0].symbol));
        }
        if (this.MainReelData[1].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (9))));
        } else {
            reel.push(this.getsymbolID(this.MainReelData[1].symbol));
        }
        if (this.MainReelData[2].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[2].symbol));
        }
        if (this.MainReelData[3].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[3].symbol));
        }
        if (this.MainReelData[4].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[4].symbol));
        }
        if (this.MainReelData[5].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[5].symbol));
        }
        if (this.MainReelData[6].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[6].symbol));
        }
        return reel;
    }
    setReelMatrixReel2() {
        let reel = [];

        if (this.HorizontalData[0].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (7) + 1)));
        } else {
            reel.push(this.getsymbolID(this.HorizontalData[0].symbol));
        }

        if (this.MainReelData[7].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (9))));
        }
        else {
            reel.push(this.getsymbolID(this.MainReelData[7].symbol));
        }
        if (this.MainReelData[8].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (7) + 1)));
        } else {
            reel.push(this.getsymbolID(this.MainReelData[8].symbol));
        }
        if (this.MainReelData[9].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[9].symbol));
        }
        if (this.MainReelData[10].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[10].symbol));
        }
        if (this.MainReelData[11].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[11].symbol));
        }
        if (this.MainReelData[12].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[12].symbol));
        }
        if (this.MainReelData[13].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[13].symbol));
        }
        return reel;
    }
    setReelMatrixReel3() {
        let reel = [];
        if (this.HorizontalData[1].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (7) + 1)));
        } else {
            reel.push(this.getsymbolID(this.HorizontalData[1].symbol));
        }

        if (this.MainReelData[14].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (7) + 1)));
        }
        else {
            reel.push(this.getsymbolID(this.MainReelData[14].symbol));
        }
        if (this.MainReelData[15].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (7) + 1)));
        } else {
            reel.push(this.getsymbolID(this.MainReelData[15].symbol));
        }
        if (this.MainReelData[16].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[16].symbol));
        }
        if (this.MainReelData[17].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[17].symbol));
        }
        if (this.MainReelData[18].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[18].symbol));
        }
        if (this.MainReelData[19].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[19].symbol));
        }
        if (this.MainReelData[20].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[20].symbol));
        }
        return reel;
    }
    setReelMatrixReel4() {
        let reel = [];
        if (this.HorizontalData[2].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (7) + 1)));
        } else {
            reel.push(this.getsymbolID(this.HorizontalData[2].symbol));
        }

        if (this.MainReelData[21].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (7) + 1)));
        }
        else {
            reel.push(this.getsymbolID(this.MainReelData[21].symbol));
        }
        if (this.MainReelData[22].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (7) + 1)));
        } else {
            reel.push(this.getsymbolID(this.MainReelData[22].symbol));
        }
        if (this.MainReelData[23].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[23].symbol));
        }
        if (this.MainReelData[24].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[24].symbol));
        }
        if (this.MainReelData[25].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[25].symbol));
        }
        if (this.MainReelData[26].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[26].symbol));
        }
        if (this.MainReelData[27].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[27].symbol));
        }
        return reel;
    }
    setReelMatrixReel5() {
        let reel = [];
        if (this.HorizontalData[3].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (7) + 1)));
        } else {
            reel.push(this.getsymbolID(this.HorizontalData[3].symbol));
        }

        if (this.MainReelData[28].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (7) + 1)));
        }
        else {
            reel.push(this.getsymbolID(this.MainReelData[28].symbol));
        }
        if (this.MainReelData[29].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (7) + 1)));
        } else {
            reel.push(this.getsymbolID(this.MainReelData[29].symbol));
        }
        if (this.MainReelData[30].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[30].symbol));
        }
        if (this.MainReelData[31].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[31].symbol));
        }
        if (this.MainReelData[32].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[32].symbol));
        }
        if (this.MainReelData[33].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[33].symbol));
        }
        if (this.MainReelData[34].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[34].symbol));
        }
        return reel;
    }
    setReelMatrixReel6() {
        let reel = [];
        reel.push("");

        if (this.MainReelData[35].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (7) + 1)));
        }
        else {
            reel.push(this.getsymbolID(this.MainReelData[35].symbol));
        }
        if (this.MainReelData[36].symbol === -1) {
            reel.push(this.getsymbolID(Math.floor(Math.random() * (7) + 1)));
        } else {
            reel.push(this.getsymbolID(this.MainReelData[36].symbol));
        }
        if (this.MainReelData[37].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[37].symbol));
        }
        if (this.MainReelData[38].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[38].symbol));
        }
        if (this.MainReelData[39].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[39].symbol));
        }
        if (this.MainReelData[40].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[40].symbol));
        }
        if (this.MainReelData[41].symbol !== -1) {
            reel.push(this.getsymbolID(this.MainReelData[41].symbol));
        }
        return reel;
    }
   
    getsymbolID(symbolNo: number) {
        switch (symbolNo) {
            case -1: return "";
            case 0: return "LV6";
            case 1: return "LV5";
            case 2: return "LV4";
            case 3: return "LV3";
            case 4: return "LV2";
            case 5: return "LV1";
            case 6: return "HV4";
            case 7: return "HV3";
            case 8: return "HV2";
            case 9: return "HV1";
            case 10: return "WILD";
            case 11: return "SC";
        }
    }

    render() {
        let propsToSent = {
            callback: null,
            HorizontalData: this.HorizontalData,
            MainReelData: this.MainReelData,
            forcechecked: this.forceSelected,
            updateCheat: this.updateCheat,
            scope: this,
        }


        return (
            <>
                <div className="main-container">
                    <div className={!this.state.toggle ? "sub-container-toggle" : "sub-container"} >
                        <span id="toggle" onClick={() => { this.setState({ toggle: !this.state.toggle }) }}>{!this.state.toggle ? <span style={{ color: "red", fontSize: "25px", marginBottom: "10px" }}>&#60;</span> : <span style={{ color: "red", fontSize: "18px", marginBottom: "10px" }}>&#10006; </span>}</span>
                        <div className="sub-checkboxes">
                            <label className="container" >
                                <input type="checkbox" className="option-input checkbox" checked={this.forceSelected} onChange={this.checkboxHandle.bind(this)}></input>
                                <span className="checkmark">  </span>   Force
                            </label>
                            <label className="container">
                                <input onChange={e => null}
                                    type="checkbox" className="option-input checkbox" checked={this.loseSelected} onClick={this.checkboxHandleFG.bind(this)}
                                ></input>
                                <span className="checkmark" > </span> Always Lose
                            </label>
                            <label className="container">
                                <input onChange={e => null}
                                    type="checkbox" className="option-input checkbox" checked={this.printSoundSelected} onClick={this.checkboxHandlePS.bind(this)}
                                ></input>
                                <span className="checkmark" > </span> Print Sound
                            </label>
                        </div>
                        <div className="single-row">
                            {
                                this.HorizontalData.map((data: any, index: number) => <div className="single-row-div"  key={index} >
                                    <ReelObject {...propsToSent} type={"HORIZONTAL_REEL"} index={index}></ReelObject>
                                </div>)
                            }
                        </div>
                        <div className="multiple-row-change">
                            <div className="multiple-row">
                                {
                                    this.MainReelData.map((data: any, index: number) => <div className="multiple-row-div" key={index}  >
                                        <ReelObject {...propsToSent} type={"NORMAL_REEL"} index={index}></ReelObject>
                                    </div>)
                                }
                            </div>
                        </div>
                        <div className="Clear-box">
                            <span id="Clear" onClick={this.clearCheat.bind(this)}>
                                Clear
                            </span>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}
export default Cheat
