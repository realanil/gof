import React, { Component } from "react";

interface IProps {
    [x: string]: any;
}

interface IState {
    [x: string]: any;
}

export class ReelObject extends Component<IProps, IState> {
    protected modifyData: any;
    protected reeltype:any;
    constructor(props: IProps) {
        super(props);
        if (props.type == "NORMAL_REEL") {
            this.modifyData = props.MainReelData[props.index];
            this.reeltype="N";
        } else {
            this.modifyData = props.HorizontalData[props.index];
            this.reeltype="H";
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.forcechecked !== this.props.forcechecked) {
            if (!nextProps.forcechecked) {
                this.modifyData.symbol = - 1;
                (document.getElementById(this.modifyData.reel+","+this.modifyData.row+","+this.reeltype) as any).value = "-1"  ;
            }
        }
        return true;
    }

    handleChange(e: any) {
        this.modifyData.symbol = parseInt(e.target.value);
        this.props.updateCheat.call(this.props.scope);
        this.forceUpdate();
    };
    render() {
        return <>
            <span ><div>
                <select  id={this.modifyData.reel+","+this.modifyData.row+","+this.reeltype}  style={{ height: "100%", width: "100%" }} onChange={this.handleChange.bind(this)} >
                    <option value="-1">-1</option>
                    <option value="0" >LV6</option>
                    <option value="1">LV5</option>
                    <option value="2">LV4</option>
                    <option value="3">LV3</option>
                    <option value="4">LV2</option>
                    <option value="5">LV1</option>
                    <option value="6">HV4</option>
                    <option value="7">HV3</option>
                    <option value="8">HV2</option>
                    <option value="9">HV1</option>
                    <option value="10">WILD</option>
                    <option value="11">SC</option>
                </select>
            </div></span>
        </>
    }
}