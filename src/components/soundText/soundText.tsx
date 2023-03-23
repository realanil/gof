import React, { Component, Ref } from "react";
import { _ReactPixi, withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import UIManager from "../../core/components/ui/UiBuilder";
import withSoundTextConfiguration from "./configuration/withSoundTextConfiguration";
import { isMobile } from "react-device-detect";
import { configGame, constant } from "../../data/config";
import { actions as layoutssActions } from "../../core/reducers/layoutsStateReducer";
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

class SoundText extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected soundTextContainer: _ReactPixi.IContainer | Ref<any>;
    protected tweening: any;
    protected ui_mode: string;
    protected displayUI: any;
    protected soundNameArray: any;


    constructor(props: IProps) {
        super(props);
        this.app = props.app;
        this.state = {
            uiElements: [],
            lang: "en",
        }
        this.soundTextContainer = React.createRef();
        if (isMobile) {
            this.ui_mode = "mobile";
        } else {
            this.ui_mode = "desktop";

        }
        this.soundNameArray = [];
        this.displayUI = this.props.data.COMPONENTS.filter(this.checkUiMode.bind(this));

    }

    checkUiMode(uimodeobj: any) {
        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name);
            }
        });
    }


    componentDidMount() {
        if (this.props.showWinShower) {
            this.layoutChange(this.props.layoutMode);

        }
    }

    setSoundText(props: any, count: number) {
        let storeValue = "SName: " + props.playsoundobjList[count].name + "  VOL: " + props.playsoundobjList[count].vol;
        this.soundNameArray.push(storeValue);
        for (let i = 0; i < 15; i++) {
            UIManager.setText("soundText_" + i, this.soundNameArray[i]);
        }

    }
    setSoundChangeText(props: any, count: number ){
        let storeValue
        if (props.changeVolumesoundobjList) {
            storeValue = "SName: " + props.changeVolumesoundobjList[count].name + "  VOL: " + props.changeVolumesoundobjList[count].vol.toFixed(2);
        }
        this.soundNameArray.push(storeValue);
        for (let i = 0; i < 15; i++) {
            UIManager.setText("soundText_" + i, this.soundNameArray[i]);
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.isSoundPrint !== this.props.isSoundPrint) {
            nextProps.isSoundPrint && (this.soundNameArray = []);
            return true;
        }
        if (nextProps.layoutMode !== this.props.layoutMode
            || nextProps.playsoundobjList !== this.props.playsoundobjList
            || nextProps.changeVolumesoundobjList !== this.props.changeVolumesoundobjList) {
            if (nextProps.layoutMode) {
                this.layoutChange(nextProps.layoutMode);

            }
            if (nextProps.isSoundPrint) {
                if (nextProps.playsoundobjList !== this.props.playsoundobjList) {
                    this.soundNameArray.length > 15 && (this.soundNameArray = []);
                    for (let i = 0; i < nextProps.playsoundobjList.length; i++) {
                        this.setSoundText(nextProps, i);
                    }
                }
                if(nextProps.changeVolumesoundobjList !== this.props.changeVolumesoundobjList){
                    this.soundNameArray.length > 15 && (this.soundNameArray = []);
                    for (let i = 0; i < nextProps.changeVolumesoundobjList.length; i++) {
                        this.setSoundChangeText(nextProps, i);
                    }
                }

            }

            return false;
        }
        return false;
    }






    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        this.props.isSoundPrint && this.setSoundText(this.props, 0);
        this.props.isSoundPrint ? UIManager.getRef("soundTextContainer").visible = true : UIManager.getRef("soundTextContainer").visible = false;
    }



    render() {

        if (!this.props.isSoundPrint) {
            return (<></>)
        }
        return (
            <UIManager id={"soundTextContainer"} name={"soundTextContainer"} type={"Container"}
                ref={i => this.soundTextContainer = i}>
                {
                    this.displayUI && this.displayUI.map((i: any) =>
                        <UIManager key={`UIManager-${Math.random()}`} langObj={this.props.langObj} type={i.type}
                            app={this.app} configGame={configGame} constant={constant}
                            id={i.id} name={i.name} {...i}
                        />)
                }
            </UIManager>
        );
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'soundState' | 'applicationState'>): IStateToProps =>
    ({
        layoutMode: state.applicationState.layoutMode,
        playsoundobjList: state.soundState.playsoundobjList,
        isSoundPrint: state.applicationState.isSoundPrint,
        changeVolumesoundobjList: state.soundState.changeVolumesoundobjList,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        setApplicationLayoutObject: (layoutobjectlist: any): any => dispatch(layoutssActions.setApplicationLayoutObject(layoutobjectlist)),

    }))(withSoundTextConfiguration(SoundText)));