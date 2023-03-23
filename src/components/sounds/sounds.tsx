import React, { Component } from "react";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { actions as soundActions } from "../../core/reducers/soundReducer";
import PIXI from "pixi.js";
import { actions as gridActions } from "../../core/reducers/gridStateReducer";
import { TIMER } from "../../core/utills";
import { actions as buttonActions } from "../../core/reducers/buttonPanelReducer";
import { actions as behaviourAction } from '../../gamereducer/behaviourReducer';
import { actions as soundGameLevelAction } from "../../gamereducer/soundGameLevelReducer";
import { actions as winShowerActions } from "../../gamereducer/winShowerReducer";

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

}

class GAMESounds extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected _currentvol: number = 1;
    protected playingSound: any = [];
    protected spinSound: any = '';
    protected playScatterLandingCount: number;
    protected count: number = 1;
    protected setSign: string = "";
    protected valueToBeUpdatedBy: number = 0.05;
    protected timer: number = 50;
    private AllTimer: any[] = [];

    constructor(props: IProps) {
        super(props);
        this.AllTimer = [];
        this.app = props.app;
        this.playScatterLandingCount = 0;

    }
    componentDidMount() {
        if (!this.props.basegamestate) {
            this.props.playSound([{ name: "fgloop", vol: 0.4 }]);
        }
    }

    onButtonClickSound() {
        this.props.playSound([{ name: "genericButtonSound", loop: false, vol: 0.7 }]);
    }
    backgroundSound() {
        let sound;
        if (this.props.basegamestate) {
            sound = "bgloop";
            this.count = 1;
            this.changeBgVolume("bgloop", 0.4, 0.1);
        }
        else if (!this.props.basegamestate) {
            sound = "fgloop";
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if (nextProps.soundIsPlaying != this.props.soundIsPlaying || nextProps.spinStart !== this.props.spinStart
            || nextProps.basegamestate != this.props.basegamestate || nextProps.blastStart != this.props.blastStart
            || nextProps.startWinShower != this.props.startWinShower || nextProps.allSpinComplete != this.props.allSpinComplete
            || nextProps.playLandingAnimation != this.props.playLandingAnimation ||
            nextProps.landingAnimPositions != this.props.landingAnimPositions || nextProps.spinStopID != this.props.spinStopID
            || nextProps.featureJustTriggered != this.props.featureJustTriggered
            || nextProps.playSymbolAnimation != this.props.playSymbolAnimation
            || nextProps.startWinCelebration != this.props.startWinCelebration
            || nextProps.featureTriggered != this.props.featureTriggered
            || nextProps.spinButtonClicked != this.props.spinButtonClicked
            || nextProps.buttonClickedSound != this.props.buttonClickedSound
            || nextProps.multiplierCurrentValue !== this.props.multiplierCurrentValue
            || nextProps.reTriggerBlastCount !== this.props.reTriggerBlastCount
            || nextProps.introContinueButtonClick !== this.props.introContinueButtonClick
            || nextProps.stopWinShowerSound !== this.props.stopWinShowerSound
        ) {
            if (nextProps.soundIsPlaying) {

                if (nextProps.spinButtonClicked && nextProps.spinButtonClicked != this.props.spinButtonClicked) {
                    this.props.playSound([{ name: "spinButtonSound", loop: false, vol: 0.7 }]);
                }
                if (nextProps.buttonClickedSound && nextProps.buttonClickedSound != this.props.buttonClickedSound) {
                    this.onButtonClickSound();
                }
                if (nextProps.multiplierCurrentValue !== this.props.multiplierCurrentValue) {
                    this.props.playSound([{ name: "multiplierSound", loop: false, vol: 0.7 }]);
                }
                if (nextProps.reTriggerBlastCount >= 0 && nextProps.reTriggerBlastCount !== this.props.reTriggerBlastCount) {
                    this.props.stopSound([{ name: "reTriggerBlastSound" }]);
                    this.props.playSound([{ name: "reTriggerBlastSound", loop: false, vol: 0.7 }]);
                }
                if (nextProps.featureTriggered && nextProps.featureTriggered != this.props.featureTriggered) {
                    this.props.stopSound([{ name: this.spinSound }]);
                    this.props.playSound([{ name: "featureTriggerSound", loop: false, vol: 0.7 }]);
                    this.props.fgFeaturetrigger(false);
                }

                if (nextProps.blastStart && nextProps.blastStart != this.props.blastStart) {
                    let timer = TIMER.TimerManager.createTimer(200);
                    timer.on('end', (e: any) => {
                        e.remove();
                        let myArray = ["blastSound2", "blastSound3", "blastSound4"];
                        let randomItem = myArray[Math.floor(Math.random() * myArray.length)];
                        this.props.playSound([{ name: randomItem, loop: false, vol: 0.7 }]);
                    });
                    timer.start();

                    let timer1 = TIMER.TimerManager.createTimer(1300);
                    timer1.on('end', (e: any) => {
                        e.remove();
                        this.props.playSound([{ name: "blastSound1", loop: false, vol: 0.7 }]);
                    });
                    timer1.start();
                    this.backgroundSound();
                    if (nextProps.playAnticipation) {
                        let timer = TIMER.TimerManager.createTimer(1500);
                        timer.on('end', (e: any) => {
                            e.remove();
                            this.count = 1;
                            this.changeBgVolume("bgloop", 0.4, 0.1);
                            this.props.playSound([{ name: "anticipationSound", loop: false, vol: 0.7 }]);
                        });
                        timer.start();

                        let timer1 = TIMER.TimerManager.createTimer(5500);
                        timer1.on('end', (e: any) => {
                            e.remove();
                            this.count = 1;
                            this.changeBgVolume("bgloop", 0.1, 0.4);
                            this.props.fadeOutSound([{ name: "anticipationSound", vol: 0.1 }]);
                        });
                        timer1.start();
                    }
                }
                if (nextProps.startWinCelebration != this.props.startWinCelebration) {
                    let sound = "bgloop";
                    if (nextProps.startWinCelebration) {
                        nextProps.basegamestate && this.props.changeVolume([{ name: sound, vol: 0.1 }]);
                        this.props.playSound([{ name: "winCelebrationStartSoundBell", loop: false, vol: 1 }]);
                    }
                    else {
                        if (nextProps.basegamestate) {
                            this.props.playSound([{ name: sound, vol: 0.4 }]);
                        }
                    }
                }

                if (nextProps.featureJustTriggered && nextProps.featureJustTriggered != this.props.featureJustTriggered) {
                    this.props.playSound([{ name: "freeGameEnterSound", loop: false, vol: 0.7 }, { name: "fgloop", vol: 0.4, loop: true }]);
                    this.props.stopSound([{ name: "bgloop" }]);
                }
                if (nextProps.introContinueButtonClick && nextProps.introContinueButtonClick != this.props.introContinueButtonClick) {
                    this.props.stopSound([{ name: "freeGameEnterSound" }, { name: this.spinSound }]);
                    this.props.playSound([{ name: "introBlastSound", loop: false, vol: 0.7 }]);
                    this.props.buttonClickedIntro(false);
                }
                if (nextProps.spinStopID > this.props.spinStopID && nextProps.spinStopID != this.props.spinStopID) {
                    let soundPlaylist: any = [{ name: "reelStoppingSound", loop: false, vol: 0.2 }]
                    if (nextProps.landingAnimPositions.length > 0) {
                        for (let i = 0; i < nextProps.landingAnimPositions.length; i++) {
                            if (nextProps.spinStopID == nextProps.landingAnimPositions[i].reelId) {
                                soundPlaylist = [];
                                this.playScatterLandingCount++;
                                if (this.playScatterLandingCount > 4) {
                                    this.playScatterLandingCount = 4;
                                }
                                this.props.stopSound([{ name: "scatterLanding" + this.playScatterLandingCount }]);
                                soundPlaylist.push({ name: "scatterLanding" + this.playScatterLandingCount, loop: false, vol: 0.6 });
                            }
                        }
                    }
                    this.props.stopSound([{ name: "reelStoppingSound" }]);
                    this.props.playSound(soundPlaylist);
                }

                if (nextProps.spinStart && nextProps.spinStart !== this.props.spinStart) {
                    this.props.stopSound([{ name: "winShowerSound" }, { name: "winShowerBgSound" }]);
                    let myArray = ["spinSound1", "spinSound2", "spinSound3", "spinSound4"];
                    if (nextProps.basegamestate) {
                        let randomItem = myArray[Math.floor(Math.random() * myArray.length)];
                        this.backgroundSound();
                        this.props.playSound([{ name: randomItem, loop: true, vol: 0.2 }]);
                        this.spinSound = randomItem;
                    }
                }
                if (nextProps.allSpinComplete && nextProps.allSpinComplete != this.props.allSpinComplete && !nextProps.featureTriggered) {
                    this.playScatterLandingCount = 0;
                    this.props.stopSound([{ name: this.spinSound }]);
                    if (nextProps.basegamestate) {
                        this.count = 1;
                        this.changeBgVolume("bgloop", 0.1, 0.4);
                    } else {
                        this.props.playSound([{ name: "fgloop", loop: true, vol: 0.4 }]);
                    }
                }
                if (nextProps.startWinShower && nextProps.startWinShower != this.props.startWinShower) {
                    if (nextProps.basegamestate) {
                        this.count = 1;
                        this.changeBgVolume("bgloop", 0.4, 0.1);
                    }
                    this.props.playSound([{ name: "winShowerSound", loop: true, vol: 1 }, { name: "winShowerBgSound", loop: true, vol: 1 }]);
                }
                if (!nextProps.startWinShower && nextProps.startWinShower != this.props.startWinShower) {
                    this.props.winShowerSoundStop(false);
                }

                if (nextProps.stopWinShowerSound && nextProps.stopWinShowerSound != this.props.stopWinShowerSound) {
                    this.props.stopSound([{ name: "winShowerSound" }, { name: "winShowerBgSound" }]);
                    if (nextProps.basegamestate) {
                        this.count = 1;
                        this.changeBgVolume("bgloop", 0.1, 0.4);
                    }
                }
                if (nextProps.basegamestate != this.props.basegamestate) {
                    if (nextProps.basegamestate) {
                        this.props.fadeOutSound([{ name: "fgloop" }]);
                        let timer = TIMER.TimerManager.createTimer(200);
                        timer.on('end', (e: any) => {
                            e.remove();
                            this.props.playSound([{ name: "bgloop", loop: true, vol: 0.4 }]);
                        });
                        timer.start(false, 100);
                    }
                    else {
                        this.playBackgroundLoop(nextProps);
                    }
                }

                if (nextProps.soundIsPlaying && nextProps.soundIsPlaying != this.props.soundIsPlaying) {
                    this.playBackgroundLoop(nextProps);
                }
            }
            return false;
        }
        return false;
    }
    private cleanAllTimer(): void {
        this.AllTimer.forEach((_time: any) => {
            _time && _time.stop();
            _time && _time.reset();
            _time && _time.remove();
        });
        this.AllTimer =[];
    }
    changeBgVolume(name: string, currentVol: number, nextVol: number) {
        let setExpression: any;
        let val = -this.valueToBeUpdatedBy;
        setExpression = currentVol;
        if (nextVol >= currentVol) {
            val = this.valueToBeUpdatedBy;
        }
        else {
            val = -this.valueToBeUpdatedBy;
        }
        let timer = TIMER.TimerManager.createTimer(this.timer);
        timer.on('repeat', (i: number) => {
            if (this.count > 8) {
                timer.stop();
                this.cleanAllTimer();
            } else {
                setExpression >= 0.1 && this.props.changeVolume([{ name: name, vol: setExpression }]);
                setExpression = setExpression + val;
                this.count++;
            }

        });
        timer.start(true, this.timer);
        this.AllTimer.push(timer);
    }
    playBackgroundLoop(nextProps: any) {
        if (nextProps.basegamestate) {
            this.props.playSound([{ name: "bgloop", loop: true, vol: 0.4 }]);
        } else {
            this.props.playSound([{ name: "fgloop", loop: true, vol: 0.4 }]);
        }
    }
    render() {
        return (<></>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'soundGameLevelState' | 'MultiplierState' | 'soundState' | 'reelgridState' | 'winCelebrationState' | 'asyncInitAction' | 'freegameState' | 'basegameState' | 'buttonPanelState' | 'winShowerState' | 'landingState' | 'winpresentationState' | 'behaviourState'>): IStateToProps =>
    ({
        soundIsPlaying: state.soundState.soundIsPlaying,
        blastStart: state.reelgridState.blastStart,
        stoppedReel: state.reelgridState.stoppedReel,
        basegamestate: state.basegameState.basegamestate,
        spinStopID: state.reelgridState.spinStopID,
        spinStart: state.reelgridState.spinStart,
        startWinShower: state.winShowerState.startWinShower,
        allSpinComplete: state.reelgridState.allSpinComplete,
        playLandingAnimation: state.landingState.playLandingAnimation,
        landingAnimPositions: state.landingState.landingAnimPositions,
        featureJustTriggered: state.basegameState.featureJustTriggered,
        featureJustReTriggered: state.basegameState.featureJustReTriggered,
        playSymbolAnimation: state.winpresentationState.playSymbolAnimation,
        featureType: state.basegameState.featureType,
        countStopReels: state.reelgridState.countStopReels,
        playAnticipation: state.reelgridState.playAnticipation,
        startWinCelebration: state.winCelebrationState.startWinCelebration,
        featureTriggered: state.behaviourState.featureTriggered,
        spinButtonClicked: state.buttonPanelState.spinButtonClicked,
        buttonClickedSound: state.buttonPanelState.buttonClickedSound,
        multiplierCurrentValue: state.MultiplierState.multiplierCurrentValue,
        reTriggerBlastCount: state.soundGameLevelState.reTriggerBlastCount,
        introContinueButtonClick: state.soundGameLevelState.introContinueButtonClick,
        stopWinShowerSound: state.winShowerState.stopWinShowerSound,
        sound: state.soundState.sound,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        playSound: (soundName: any): any => dispatch(soundActions.playSound(soundName)),
        setStoppedReel: (stoppedReel: number): any => dispatch(gridActions.setStoppingReel(stoppedReel)),
        stopSound: (soundName: any): any => dispatch(soundActions.stopSound(soundName)),
        playingSound: (soundIsPlaying: any): any => dispatch(soundActions.playingSound(soundIsPlaying)),
        setApplicationSpinButtonClicked: (isClicked: boolean): any => dispatch(buttonActions.setApplicationSpinButtonClicked(isClicked)),
        fadeOutSound: (soundObject: any): any => dispatch(soundActions.fadeOutSound(soundObject)),
        changeVolume: (soundObject: any): any => dispatch(soundActions.changeVolume(soundObject)),
        fgFeaturetrigger: (featureTriggered: any): any => dispatch(behaviourAction.FgFeaturetrigger(featureTriggered)),
        reTriggerCountBlast: (reTriggerBlastCount: any): any => dispatch(soundGameLevelAction.reTriggerCountBlast(reTriggerBlastCount)),
        buttonClickedIntro: (introContinueButtonClick: any): any => dispatch(soundGameLevelAction.buttonClickedIntro(introContinueButtonClick)),
        winShowerSoundStop: (stopWinShowerSound: boolean): any => dispatch(winShowerActions.winShowerSoundStop(stopWinShowerSound)),

    }))(GAMESounds));