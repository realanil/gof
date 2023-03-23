import React, { Component } from "react";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { GJIStore } from "../gamestore/IStore";
import { Dispatch } from "redux";
import { actions as gameActions } from "../gamereducer/actionReducer";
import { actions as baseGameActions, actions as baseGameAction } from "../core/reducers/baseGameReducer";
import { actions as reelgridAction } from '../core/reducers/reelgridStateReducer';
import { actions as applicationStateActions } from "../core/reducers/applicationStateReducer"
import { actions as winActions } from '../core/reducers/winPresentationReducer';
import { actions as basegameActions } from "../core/reducers/baseGameReducer";
import { actions as freegameAction } from "../core/reducers/freeGameReducer";
import { actions as betPanelAction } from "../core/reducers/betPanelReducer";
import { actions as paytableAction } from "../gamereducer/paytableBMReducer";
import { actions as introductionActions } from "../gamereducer/introductionPageReducer";
import { actions as horizontalSymbolActions } from "../gamereducer/horizontalSymbolReducer";
import { actions as asyncActions } from '../core/reducers/asyncInitAction'
import { actions as behaviourAction } from '../gamereducer/behaviourReducer';
import { isMobile } from "react-device-detect";
import { actions as multiplierActions } from "../gamereducer/multiplierReducer";
import { TIMER } from "../core/utills";
import { actions as buttonActions } from "../core/reducers/buttonPanelReducer";
import { constant } from "../data/config/index";
import { actions as landingSymbolAction } from "../core/reducers/landingsymbolreducer";
import { actions as desktopSettingPanelActions } from "../gamereducer/desktopSettingPanelGameLevelReducer";
import { actions as winpresentationAction } from "../core/reducers/winPresentationReducer";
import { actions as soundActions } from "../core/reducers/soundReducer";
import { CURRENCY } from "../core/utills";
import { actions as introductionScreenActions } from "../core/reducers/introductionScreenReducer";
import Detectdevices from "../core/components/device/detectdevices";

interface IProps {
    [x: string]: any;
}

interface IStateToProps {
    [x: string]: any;
}

interface IDispatchToProps {
    [x: string]: any;
}

interface IState {
    [x: string]: any;
}

class ServerComm extends Component<IProps, IState> {
    protected symbolMappingList: any = [];
    protected symbolsArrayLength: number = 9;
    protected scatterCounter: number = 0;
    protected scatterCounterForSpin: number = 0;
    protected counterScatterSymbolForSpin: number = 0;
    protected symbolsNoOfSizes: number = 6;
    protected lastScatterSymbolID: number = 30;
    protected storePreviousFreeGameCount: number = 0;
    protected secToMiliSecConvert: number = 1000;
    protected filteredreelData: any;
    protected filteredreelDataSpinBeforeBlast: any;
    protected filteredreelDataSpinAfterBlast: any;
    protected blastPositionArray: any = [];
    protected winningPosition: any = [];
    protected symbolForAnticipationArray: any = [];
    protected storeReelsData: any;
    protected horizontalReelsBlastPositionsArray: any = [[0, 1], [0, 2], [0, 3], [0, 4]];
    protected horizontalReelsBlastPositions: any = [];
    protected setReelsTrue: boolean = false;
    protected anticipationSymbolList: any = constant.reelgridConfig.ANTICIPATION_SYMBOL_LIST;
    protected anticipationTriggeringMinCount: any = constant.reelgridConfig.ANTICIPATION_TRIGGERING_SYMBOL_MIN_COUNT;
    protected anticipationTriggeringMaxCount: any = constant.reelgridConfig.ANTICIPATION_TRIGGERING_SYMBOL_MAX_COUNT;
    protected lineWins: any;
    protected winAmountDisplay: any;
    protected counterScatterCount = 0;
    private reCostruction: boolean = false;
    protected autoplayLengthAccToUI: number = 9;
    protected storePaytableWin: any;
    constructor(props: IProps) {
        super(props);
        this.symbolMappingList = [
            { id: 1, name: "SC" },
            { id: 2, name: "SC" },
            { id: 3, name: "SC" },
            { id: 4, name: "SC" },
            { id: 5, name: "SC" },
            { id: 6, name: "SC" },
            { id: 7, name: "SC" },
            { id: 8, name: "SC" },
            { id: 9, name: "SC" },
            { id: 10, name: "SC" },
            { id: 11, name: "SC" },
            { id: 12, name: "SC" },
            { id: 13, name: "SC" },
            { id: 14, name: "SC" },
            { id: 15, name: "SC" },
            { id: 16, name: "SC" },
            { id: 17, name: "SC" },
            { id: 18, name: "SC" },
            { id: 19, name: "SC" },
            { id: 20, name: "SC" },
            { id: 21, name: "SC" },
            { id: 22, name: "SC" },
            { id: 23, name: "SC" },
            { id: 24, name: "SC" },
            { id: 25, name: "SC" },
            { id: 26, name: "SC" },
            { id: 27, name: "SC" },
            { id: 28, name: "SC" },
            { id: 29, name: "SC" },
            { id: 30, name: "SC" },
            { id: 31, name: "LV6" },
            { id: 32, name: "LV6" },
            { id: 33, name: "LV6" },
            { id: 34, name: "LV6" },
            { id: 35, name: "LV6" },
            { id: 36, name: "LV6" },
            { id: 37, name: "LV5" },
            { id: 38, name: "LV5" },
            { id: 39, name: "LV5" },
            { id: 40, name: "LV5" },
            { id: 41, name: "LV5" },
            { id: 42, name: "LV5" },
            { id: 43, name: "LV4" },
            { id: 44, name: "LV4" },
            { id: 45, name: "LV4" },
            { id: 46, name: "LV4" },
            { id: 47, name: "LV4" },
            { id: 48, name: "LV4" },
            { id: 49, name: "LV3" },
            { id: 50, name: "LV3" },
            { id: 51, name: "LV3" },
            { id: 52, name: "LV3" },
            { id: 53, name: "LV3" },
            { id: 54, name: "LV3" },
            { id: 55, name: "LV2" },
            { id: 56, name: "LV2" },
            { id: 57, name: "LV2" },
            { id: 58, name: "LV2" },
            { id: 59, name: "LV2" },
            { id: 60, name: "LV2" },
            { id: 61, name: "LV1" },
            { id: 62, name: "LV1" },
            { id: 63, name: "LV1" },
            { id: 64, name: "LV1" },
            { id: 65, name: "LV1" },
            { id: 66, name: "LV1" },
            { id: 67, name: "HV4" },
            { id: 68, name: "HV4" },
            { id: 69, name: "HV4" },
            { id: 70, name: "HV4" },
            { id: 71, name: "HV4" },
            { id: 72, name: "HV4" },
            { id: 73, name: "HV3" },
            { id: 74, name: "HV3" },
            { id: 75, name: "HV3" },
            { id: 76, name: "HV3" },
            { id: 77, name: "HV3" },
            { id: 78, name: "HV3" },
            { id: 79, name: "HV2" },
            { id: 80, name: "HV2" },
            { id: 81, name: "HV2" },
            { id: 82, name: "HV2" },
            { id: 83, name: "HV2" },
            { id: 84, name: "HV2" },
            { id: 85, name: "HV1" },
            { id: 86, name: "HV1" },
            { id: 87, name: "HV1" },
            { id: 88, name: "HV1" },
            { id: 89, name: "HV1" },
            { id: 90, name: "HV1" },
            { id: 91, name: "WILD" },
            { id: 92, name: "SC" },
        ];
        this.storePaytableWin = [];
        document.removeEventListener("visibilitychange",this.visibilitychange.bind(this));
        document.addEventListener("visibilitychange",this.visibilitychange.bind(this));
      
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        const { isInitResponseReceived, initResult, basegamestate, actionResult, introductionScreenVisible,
            reConstruction, spinResult, currentCascadeCount, increaseBetResult, soundIsPlaying } = nextProps;

        if (isInitResponseReceived != this.props.isInitResponseReceived) {
            if (initResult.data.response == "ok") {
                this.props.applicationResponsesend();
                this.props.setApplicationJurisdictionKey(initResult.data.gameOptions.jurisdictionKey);

                let timer = TIMER.TimerManager.createTimer(2000);
                timer.on("repeat", () => {
                    this.props.setRequestSent(true);
                });
                timer.start(true, 0);
            }
            return false;
        }

        if (basegamestate != this.props.basegamestate) {
            if (!basegamestate) {
                this.setReelsTrue = true;
            }
            else {
                this.setReelsTrue = false;
            }
            this.setReelStrip();
            return false;
        }
        if (actionResult != this.props.actionResult) {
            this.parseInitData(actionResult);
            return false;
        }
        if (introductionScreenVisible != this.props.introductionScreenVisible) {
            this.setRadioButtonLocalStorageValue(introductionScreenVisible);
            return false;
        }
        if (soundIsPlaying != this.props.soundIsPlaying) {
            this.setRadioSoundButtonLocalStorageValue(soundIsPlaying);
        }
        if (reConstruction && reConstruction != this.props.reConstruction) {
            this.props.resetReelState(true);
            this.props.setApplicationToBaseGameState(false);
            this.props.introScreenVisible(false);
            this.reCostruction = true;
            this.parseSpinData(actionResult);
            this.playNextFreeCommand(nextProps);
            return false;

        }
        if (spinResult != this.props.spinResult) {
            if (navigator.onLine) {
                this.storePaytableWin = [];
                this.props.anticipationPlay(false);
                this.symbolForAnticipationArray = [];
                this.counterScatterCount = 0;
                this.reCostruction = false;
                this.parseSpinData(spinResult);
            }
            return false;
        }
        if (currentCascadeCount > 0 && currentCascadeCount != this.props.currentCascadeCount) {
            if (this.reCostruction) {
                this.setCascadeData(actionResult, currentCascadeCount);
            } else {
                this.setCascadeData(spinResult, currentCascadeCount);
            }
            return false;
        }
        if (increaseBetResult && increaseBetResult != this.props.increaseBetResult) {
            if (!isMobile) {
                this.props.setApplicationCurrentBetIndex(this.props.betListGameLevel.indexOf(increaseBetResult.stake));
                nextProps.stakeTore(this.props.betListGameLevel.indexOf(increaseBetResult.stake));
            }
            return false;
        }
        return true;
    }

    private playNextFreeCommand(nextProps: any): void {
        const { actionResult } = nextProps;
        let winningsInCascade = actionResult.transition.goddessOfFire.subSpins[0].winnings.credits;
        this.props.startFreegame();
        let timer = TIMER.TimerManager.createTimer(5000);
        timer.on('end', (e: any) => {
            e.remove();
            if (winningsInCascade > 0) {
                this.props.blastStart();
            }
        });
        timer.start();

    }

    setGameModel(Result: any) {
        const { setApplicationDecreaseBet, setApplicationIncreaseBet, setApplicationMaxBet, setApplicationShowPaytable, setApplicationSpin } = this.props;

        if (Result.allowedCommands.indexOf('decreaseBet') > -1) {
            setApplicationDecreaseBet(true);
        }
        if (Result.allowedCommands.indexOf('increaseBet') > -1) {
            setApplicationIncreaseBet(true);
        }
        if (Result.allowedCommands.indexOf('maxBet') > -1) {
            setApplicationMaxBet(true);
        }
        if (Result.allowedCommands.indexOf('showPaytable') > -1) {
            setApplicationShowPaytable(true);
        }
        if (Result.allowedCommands.indexOf('spin') > -1) {
            setApplicationSpin(true);
        }
        setApplicationMaxBet(true);
        setApplicationDecreaseBet(true);
        setApplicationIncreaseBet(true);
        this.setFunctions(Result);
        this.setCurrencyForApplication(Result);
    }
    setCurrencyForApplication(Result: any) {
        CURRENCY.CurrencyManager.setCurrency({
            currency: {
                code: Result.gameOptions.currencyCode,
                maj: "?",
                min: "p",
                gs: Result.gameOptions.currencyGroupingSeparator ? Result.gameOptions.currencyGroupingSeparator : ",",
                ds: Result.gameOptions.currencyDecimalSeparator ? Result.gameOptions.currencyDecimalSeparator : ".",
                scale: Result.gameOptions.currencyCode ? "1" : "100",
                gp: 3,
                dp: Result.gameOptions.currencyIgnoreDecimals ? 0 : 2,
                msp: !Result.gameOptions.currencySymbolPrintedBefore,
            },
        });
    }

    setFunctions(Result: any) {
        const { setApplicationAutoPlayLossLimitEnabled, setApplicationDebugEnabled, setApplicationCurrencyAdditionalMultiplier, setApplicationAutoPlayLossLimitMandatory, setApplicationAutoPlaySingleWinLimitEnabled, setApplicationAutoPlaySingleWinLimitMandatory, setApplicationAutoPlayWinLimitEnabled, setApplicationAutoPlayWinLimitMandatory, setApplicationCheatingEnabled, setApplicationCountryCode, setApplicationCurrencyCode, setApplicationCurrencyDecimalSeparator, setApplicationCurrencyIgnoreDecimals, setApplicationCurrencyGroupingSeparator, setApplicationDisableQuickSpin, setApplicationDisableQuickStop, setApplicationEnableAutoPlay, setApplicationEnableRiskCard, setApplicationHistoryUrl, setApplicationHomeUrl, setApplicationLanguageCode, setApplicationRealityCheckTimePassedInSeconds, setApplicationRealityCheckTimeoutInSeconds, setApplicationSessionTimeoutInSeconds, setApplicationShowCloseButton, setApplicationShowFullScreenButton, setApplicationShowHelpButton, setApplicationShowSettingsControl, setApplicationShowRTP, setApplicationShowTime, setApplicationShowVolumeControl, setTopwinOddsShow, setApplicationEnableRiskLadder, setApplicationAutoPlaySpinStartValue, setApplicationAutoPlaySingleWinLimitPercentage, setApplicationCurrencySymbolPrintedBefore, setApplicationShowSlotSessionStatistics, setApplicationMaxWinMultiplier, setApplicationAutoPlayExpertMode, setApplicationAutoPlaySpinSteps, setApplicationAutoPlaySimpleMode, setApplicationLocale, setApplicationAutoPlaySpinResetToStartValue, setApplicationResponsibleGamingUrl, setApplicationAutoPlayWinLimitPercentage, setApplicationAutoPlayFreeGamesAutoStart, setApplicationShowResponsibleGamingIcon, setApplicationAutoPlayLossLimitPercentage, setApplicationCurrencySymbol, setApplicationResponsibleGamingIconPath, setApplicationAutoPlayAbortOnFreeGameWinEnabled, setApplicationRequestCommand, setSuppressCelebrationForWinsBelowStake, setIsGameSettingFirstTime, setIsSoundOnOff, setIsSoundPrint, setApplicationGameVersion } = this.props;
        let detectDevices = new Detectdevices();
        setApplicationAutoPlayLossLimitEnabled(Result.gameOptions.autoPlayLossLimitEnabled);
        setApplicationDebugEnabled(Result.gameOptions.debugEnabled);
        setApplicationCurrencyAdditionalMultiplier(Result.gameOptions.currencyAdditionalMultiplier);
        setApplicationAutoPlayLossLimitMandatory(Result.gameOptions.autoPlayLossLimitMandatory);
        setApplicationAutoPlaySingleWinLimitEnabled(Result.gameOptions.autoPlaySingleWinLimitEnabled);
        setApplicationAutoPlaySingleWinLimitMandatory(Result.gameOptions.autoPlaySingleWinLimitMandatory);
        setApplicationAutoPlayWinLimitEnabled(Result.gameOptions.autoPlayWinLimitEnabled);
        setApplicationAutoPlayWinLimitMandatory(Result.gameOptions.autoPlayWinLimitMandatory);
        setApplicationCheatingEnabled(Result.gameOptions.cheatingEnabled);
        setApplicationCountryCode(Result.gameOptions.countryCode);
        setApplicationCurrencyCode(Result.gameOptions.currencyCode);
        setApplicationCurrencyDecimalSeparator(Result.gameOptions.currencyDecimalSeparator ? Result.gameOptions.currencyDecimalSeparator : ".");
        setApplicationCurrencyIgnoreDecimals(Result.gameOptions.currencyIgnoreDecimals);
        setApplicationCurrencyGroupingSeparator(Result.gameOptions.currencyGroupingSeparator ? Result.gameOptions.currencyGroupingSeparator : ",");
        setApplicationDisableQuickSpin(Result.gameOptions.disableQuickSpin);
        setApplicationDisableQuickStop(Result.gameOptions.disableQuickStop);
        setApplicationEnableAutoPlay(Result.gameOptions.enableAutoPlay);
        setApplicationEnableRiskCard(Result.gameOptions.enableRiskCard);
        setApplicationHistoryUrl(Result.gameOptions.historyUrl);
        setApplicationHomeUrl(Result.gameOptions.homeUrl);
        setApplicationLanguageCode(Result.gameOptions.languageCode);
        setApplicationRealityCheckTimePassedInSeconds(Result.gameOptions.realityCheckTimePassedInSeconds * this.secToMiliSecConvert);
        setApplicationRealityCheckTimeoutInSeconds(Result.gameOptions.realityCheckTimeoutInSeconds * this.secToMiliSecConvert);
        setApplicationSessionTimeoutInSeconds(Result.gameOptions.sessionTimeoutInSeconds);
        setApplicationShowCloseButton(Result.gameOptions.showCloseButton);
        setApplicationShowFullScreenButton(detectDevices.isIOSMobile() && !detectDevices.isTablet() ? false : Result.gameOptions.showFullScreenButton);
        setApplicationShowHelpButton(Result.gameOptions.showHelpButton);
        setApplicationShowRTP(Result.gameOptions.showRTP);
        setApplicationShowSettingsControl(Result.gameOptions.showSettingsControl);
        setApplicationShowTime(Result.gameOptions.showTime);
        setApplicationShowVolumeControl(Result.gameOptions.showVolumeControl);
        setTopwinOddsShow(Result.gameOptions.showTopWinOdds);
        setApplicationEnableRiskLadder(Result.gameOptions.enableRiskLadder);
        setApplicationAutoPlaySpinStartValue(Result.gameOptions.autoPlaySpinStartValue);
        setApplicationAutoPlaySingleWinLimitPercentage(Result.gameOptions.autoPlaySingleWinLimitPercentage);
        setApplicationCurrencySymbolPrintedBefore(!Result.gameOptions.currencySymbolPrintedBefore);
        setApplicationShowSlotSessionStatistics(Result.gameOptions.showSlotSessionStatistics);
        setApplicationMaxWinMultiplier(Result.gameOptions.maxWinMultiplier);
        setApplicationAutoPlayExpertMode(Result.gameOptions.autoPlayExpertMode);
        let autoplaySteps = [];
        if (Result.gameOptions.autoPlaySpinSteps.length > this.autoplayLengthAccToUI) {
            for (let i = 0; i < this.autoplayLengthAccToUI; i++) {
                autoplaySteps.push(Result.gameOptions.autoPlaySpinSteps[i]);
            }
        } else {
            autoplaySteps = Result.gameOptions.autoPlaySpinSteps;
        }

        setApplicationAutoPlaySpinSteps(autoplaySteps);
        setApplicationAutoPlaySimpleMode(Result.gameOptions.autoPlaySimpleMode);
        setApplicationLocale(Result.gameOptions.locale);
        setApplicationAutoPlaySpinResetToStartValue(Result.gameOptions.autoPlaySpinResetToStartValue);
        setApplicationResponsibleGamingUrl(Result.gameOptions.responsibleGamingUrl);
        setApplicationAutoPlayWinLimitPercentage(Result.gameOptions.autoPlayWinLimitPercentage);
        setApplicationShowResponsibleGamingIcon(Result.gameOptions.showResponsibleGamingIcon);
        setApplicationAutoPlayFreeGamesAutoStart(Result.gameOptions.autoPlayFreeGamesAutoStart);
        setApplicationAutoPlayLossLimitPercentage(Result.gameOptions.autoPlayLossLimitPercentage);
        setApplicationCurrencySymbol(Result.gameOptions.currencySymbol);
        setApplicationResponsibleGamingIconPath(Result.gameOptions.responsibleGamingIconPath);
        setApplicationAutoPlayAbortOnFreeGameWinEnabled(Result.gameOptions.autoPlayAbortOnFreeGameWinEnabled);
        setApplicationRequestCommand(Result.gameOptions.requestCommand);

        setSuppressCelebrationForWinsBelowStake(Result.gameOptions.suppressCelebrationForWinsBelowStake ? Result.gameOptions.suppressCelebrationForWinsBelowStake : false);
        this.setReelRunDuration(Result);

        if (((localStorage.getItem("playerId-postIntro-" + this.useQuery().get("token")) === "true") ? true : false)) {
            this.props.visibleIntroductionScreen(true);
            this.props.introductionVisibleScreen(true);
        } else {
            this.props.visibleIntroductionScreen(false)
            this.props.introductionVisibleScreen(false);
        }
        if (Result.gameOptions.cheatingEnabled) {
            (document.getElementById("cheat-section") as any).style = "visibility :visible;";
        }
        setApplicationGameVersion("v" + localStorage.getItem("gameVersion"));
        let sound = this.useQuery().get("sound");
        if (sound === undefined || sound === null || sound === "") {
            setIsSoundOnOff(true);
        } else {
            if (sound === "0") {
                setIsSoundOnOff(false);
            } else {
                setIsSoundOnOff(true);
            }
        }
        setIsGameSettingFirstTime(false);
        if (localStorage.getItem("Printsound") === "true") {
            setIsSoundPrint(true);
        } else {
            setIsSoundPrint(false);
        }

    }


    setReelRunDuration(Result: any) {
        const { setApplicationMinimumGameDurationMs } = this.props;
        if (Result.gameOptions.minimumGameDurationMs) {
            if (Result.gameOptions.minimumGameDurationMs < 2000) {
                setApplicationMinimumGameDurationMs(1000);
            } else if (Result.gameOptions.minimumGameDurationMs >= 2000 && Result.gameOptions.minimumGameDurationMs <= 3000) {
                setApplicationMinimumGameDurationMs(1800);
            } else if (Result.gameOptions.minimumGameDurationMs >= 3000 && Result.gameOptions.minimumGameDurationMs <= 4000) {
                setApplicationMinimumGameDurationMs(2900);
            } else if (Result.gameOptions.minimumGameDurationMs > 4000) {
                setApplicationMinimumGameDurationMs(4000);
            }
        } else {
            setApplicationMinimumGameDurationMs(1000);
        }
    }


    reelDataInitMapping(Result: any, index: any) {
        let reelData, filteredreelData;
        const { relGridSymbolCountDisplay } = this.props;

        if (Result.transition !== undefined) {
            reelData = Result.transition.goddessOfFire.subSpins[0].reels;
        }
        else {
            reelData = Result.state.goddessOfFire.subSpins[index].reels;
        }
        let reelDataArraysCount = reelData.map((data: any, index: any) => {
            return data.length;
        })
        reelDataArraysCount.pop();
        relGridSymbolCountDisplay(reelDataArraysCount);
        filteredreelData = reelData.map((data: any, index: any) => {
            let filteredData = data.map((innerdata: any, innerindex: any) => {
                let updateIds = this.symbolMappingList.map((mapdata: any, mapindex: any) => {
                    if (mapdata.name == innerdata) {
                        let length;
                        length = data.length - 2;
                        if (innerdata == "WILD") {
                            mapdata.id = 91;
                            return mapdata.id;
                        } else {
                            return mapdata.id + length;
                        }
                    }
                });
                updateIds = updateIds.filter((name: string) => {
                    return name != undefined;
                });
                return updateIds[0];

            });
            let filteredData_1 = filteredData.map((innerdata: any, innerindex: any) => {
                if (innerdata >= 1 && innerdata <= this.symbolsNoOfSizes) {
                    if (this.scatterCounter > 0) {
                        let localInnerData: any;
                        localInnerData = innerdata;
                        innerdata = innerdata + (this.symbolsNoOfSizes * this.scatterCounter);
                        if (innerdata > this.lastScatterSymbolID) {
                            innerdata = innerdata - this.symbolsNoOfSizes;
                            return innerdata;
                        }
                    }
                    this.scatterCounter++;
                }
                return innerdata;
            })
            if (filteredData_1.length < this.symbolsArrayLength) {
                for (let i = 0; i < filteredData_1.length; i++) {
                    filteredData_1.push(filteredData_1[Math.floor(filteredData_1.length * Math.random())]);
                    if (filteredData_1.length === this.symbolsArrayLength) {
                        break;
                    }
                }
            }
            return filteredData_1;
        });
        if (Result.transition !== undefined) {
            if (Result.transition && Result.transition.goddessOfFire.freeGame !== undefined) {
                Result.transition && this.props.storeMultiplierValue(Result.transition.goddessOfFire.subSpins[Result.transition.goddessOfFire.subSpins.length - 1].winnings.multiplier);
                let filteredreelData_11 = filteredreelData.map((data: any, index: any) => {
                    let filteredreelData_12 = data.map((innerData: any) => {
                        if (innerData >= 1 && innerData <= 30) {
                            if (index == 6) {
                                innerData = 92;
                            }
                            return innerData;
                        } else {
                            return innerData;
                        }
                    });

                    return filteredreelData_12;
                });
                this.filteredreelData = filteredreelData_11;
                return filteredreelData_11;
            }
        }
        else {
            this.filteredreelData = filteredreelData;
        }
    }

    parseSpinData(Result: any) {
        if (localStorage.getItem("Printsound") === "true") {
            this.props.setIsSoundPrint(true);
        } else {
            this.props.setIsSoundPrint(false);
        }

        const { setTotalCascadeCount, setTransitionBalance, setPreviousBalance, setTotalCreditWinAmount } = this.props;
        this.winningPosition = [];
        this.counterScatterSymbolForSpin = 0;
        this.scatterCounterForSpin = 0;
        this.setCascadeData(Result, 0);
        setTotalCascadeCount(Result.transition.goddessOfFire.subSpins.length);
        setTransitionBalance(Result.transition.balance);
        setPreviousBalance(Result.state.balance);
        setTotalCreditWinAmount(Result.transition.goddessOfFire.basicWin.credits);
    }

    getReelFilterData(Reels: any, scatterList: any) {
        this.scatterCounterForSpin = this.counterScatterSymbolForSpin;
        let filteredreelData = Reels.map((data: any, index: any) => {
            let filteredData = data.map((innerdata: any, innerindex: any) => {
                let updateIds = this.symbolMappingList.map((mapdata: any, mapindex: any) => {
                    if (mapdata.name == innerdata) {
                        let length;
                        length = data.length - 2;
                        if (innerdata == "WILD") {
                            mapdata.id = 91;
                            return mapdata.id;
                        } else {
                            return mapdata.id + length;
                        }
                    }
                })
                updateIds = updateIds.filter((name: string) => {
                    return name != undefined;
                })
                return updateIds[0];
            })

            let filteredData_1 = filteredData.map((innerdata: any, innerindex: any) => {
                if (innerdata >= 1 && innerdata <= this.symbolsNoOfSizes) {
                    scatterList.push({ reel: index, row: innerindex, used: false })
                }
                return innerdata;
            })

            if (filteredData_1.length < this.symbolsArrayLength) {
                for (let i = 0; i < filteredData_1.length; i++) {
                    filteredData_1.push(filteredData_1[Math.floor(filteredData_1.length * Math.random())]);
                    if (filteredData_1.length === this.symbolsArrayLength) {
                        break;
                    }
                }
            }
            return filteredData_1;
        })

        if (!this.props.basegamestate || this.reCostruction) {
            let filteredreelData_11 = filteredreelData.map((data: any) => {
                let filteredreelData_12 = data.map((innerData: any) => {
                    if (innerData >= 1 && innerData <= 30) {
                        innerData = 92;
                        return innerData;
                    } else {
                        return innerData;
                    }
                });
                return filteredreelData_12;
            })
            return filteredreelData_11;
        }
        else {
            return filteredreelData;
        }
    }

    setCascadeData(Result: any, currentCascadeCount: number) {
        const { setGridListAfterBlast, relGridSymbolCountDisplay, setScatterDataBeforeFG, setScatterDataAnticipation, blastPositionSet, storeMultiplierValue, reTriggeredFreegame, activeMultiplier, setFeatureJustFinished, setTotalWinAmount, setBlastPosition, setApplicationWinAmount, setBaseGameSpinSucces, setFreeeGameSpinSucces, setApplicationBalance, setGridList, setReelSpinSucces, setWinsSucces } = this.props;

        this.lineWins = [];
        this.horizontalReelsBlastPositions = [];
        this.blastPositionArray = [];
        setGridListAfterBlast([]);
        let reelDataArraysCount = Result.transition.goddessOfFire.subSpins[currentCascadeCount].reels.map((data: any, index: any) => {
            return data.length;
        });
        reelDataArraysCount.pop();
        relGridSymbolCountDisplay(reelDataArraysCount);
        let ListOfScatterBeforeBlast: any = [];
        let ListOfScatterAfterBlast: any = [];
        if (Result.transition.goddessOfFire.freeGame && Result.transition.goddessOfFire.freeGame.totalNumber > 0 && currentCascadeCount == 0) {
            let scatterListonFinalgrid: any = []
            let calculateReelData = this.getReelFilterData(Result.transition.goddessOfFire.subSpins[Result.transition.goddessOfFire.subSpins.length - 1].reels, scatterListonFinalgrid)
            setScatterDataBeforeFG(calculateReelData);
        }
        let filteredreelData = this.getReelFilterData(Result.transition.goddessOfFire.subSpins[currentCascadeCount].reels, ListOfScatterBeforeBlast);
        this.filteredreelDataSpinBeforeBlast = filteredreelData;
        this.filteredreelDataSpinAfterBlast = filteredreelData;
        let beforeBlastReel = filteredreelData
        let afterBlatReel = filteredreelData;
        let winningsInCascade = Result.transition.goddessOfFire.subSpins[currentCascadeCount].winnings.credits;
        filteredreelData = Result.transition.goddessOfFire.subSpins[currentCascadeCount + 1] && (this.getReelFilterData(Result.transition.goddessOfFire.subSpins[currentCascadeCount + 1].reels, ListOfScatterAfterBlast));
        afterBlatReel = filteredreelData && filteredreelData;
        for (let k = 0; k < ListOfScatterBeforeBlast.length; k++) {
            if (beforeBlastReel[ListOfScatterBeforeBlast[k].reel][ListOfScatterBeforeBlast[k].row] >= 1 && beforeBlastReel[ListOfScatterBeforeBlast[k].reel][ListOfScatterBeforeBlast[k].row] <= this.symbolsNoOfSizes) {
                beforeBlastReel[ListOfScatterBeforeBlast[k].reel][ListOfScatterBeforeBlast[k].row] = beforeBlastReel[ListOfScatterBeforeBlast[k].reel][ListOfScatterBeforeBlast[k].row]
                    + this.symbolsNoOfSizes * this.counterScatterCount;

                if (beforeBlastReel[ListOfScatterBeforeBlast[k].reel][ListOfScatterBeforeBlast[k].row] > this.lastScatterSymbolID) {
                    beforeBlastReel[ListOfScatterBeforeBlast[k].reel][ListOfScatterBeforeBlast[k].row] = beforeBlastReel[ListOfScatterBeforeBlast[k].reel][ListOfScatterBeforeBlast[k].row] - this.symbolsNoOfSizes;
                }
                if (currentCascadeCount == 0) {
                    this.counterScatterCount++;
                }
            }
        }

        if (afterBlatReel) {
            for (let k = 0; k < ListOfScatterAfterBlast.length; k++) {
                let onReelscatterCountBeforeReel = ListOfScatterBeforeBlast.filter((obj: any) => {
                    return obj.reel == ListOfScatterAfterBlast[k].reel
                });
                let onReelscatterCountAfterReel = ListOfScatterAfterBlast.filter((obj: any) => {
                    return obj.reel == ListOfScatterAfterBlast[k].reel && obj.used == false;
                });

                if (onReelscatterCountAfterReel.length > onReelscatterCountBeforeReel.length) {
                    if (afterBlatReel[ListOfScatterAfterBlast[k].reel][ListOfScatterAfterBlast[k].row] >= 1 && afterBlatReel[ListOfScatterAfterBlast[k].reel][ListOfScatterAfterBlast[k].row] <= this.symbolsNoOfSizes) {
                        afterBlatReel[ListOfScatterAfterBlast[k].reel][ListOfScatterAfterBlast[k].row] = afterBlatReel[ListOfScatterAfterBlast[k].reel][ListOfScatterAfterBlast[k].row]
                            + this.symbolsNoOfSizes * this.counterScatterCount;
                        if (afterBlatReel[ListOfScatterAfterBlast[k].reel][ListOfScatterAfterBlast[k].row] > this.lastScatterSymbolID) {
                            afterBlatReel[ListOfScatterAfterBlast[k].reel][ListOfScatterAfterBlast[k].row] = afterBlatReel[ListOfScatterAfterBlast[k].reel][ListOfScatterAfterBlast[k].row] - this.symbolsNoOfSizes;
                        }
                        ListOfScatterAfterBlast[k].used = true;
                        this.counterScatterCount++;
                    }
                }
            }
        }
        setScatterDataAnticipation(beforeBlastReel);
        this.filteredreelDataSpinAfterBlast = Result.transition.goddessOfFire.subSpins[currentCascadeCount + 1] && (filteredreelData);
        this.processAnticipation(Result.transition.goddessOfFire.subSpins[currentCascadeCount].reels);

        if (winningsInCascade > 0) {
            let winningPositions = Result.transition.goddessOfFire.subSpins[currentCascadeCount].winnings.positions;
            winningPositions.forEach((data: any, index: any) => {

                this.horizontalReelsBlastPositionsArray.indexOf(data);
                let horizontalBlastEntry = false;
                this.horizontalReelsBlastPositionsArray.map((innerData: any, innerIndex: any) => {
                    if (innerData[0] == data[0] && innerData[1] == data[1]) {
                        horizontalBlastEntry = true;
                        let rowId = 0;
                        if (data[1] === 1) {
                            rowId = 3;
                        }
                        if (data[1] === 2) {
                            rowId = 2;
                        }
                        if (data[1] === 3) {
                            rowId = 1;
                        }
                        if (data[1] === 4) {
                            rowId = 0;
                        }
                        this.horizontalReelsBlastPositions.push([data[0], rowId]);
                    }
                })
                let blastPosition: object = {};
                blastPosition = {
                    rowId: data[0], reelId: data[1]
                }
                if (horizontalBlastEntry == false) {
                    this.blastPositionArray.push(blastPosition);
                }
            })
            blastPositionSet(this.blastPositionArray);
            this.lineWins = [
                {
                    id: 0,
                    multiplier: 0,
                    positions: this.winningPosition,
                    prize: 0
                }
            ];

            for (let i = 0; i < 5; i++) {
                this.filteredreelDataSpinAfterBlast[6].pop();
            }

        }
        let hasfeature: any = [1];
        if (Result.transition.goddessOfFire.freeGame !== undefined) {
            storeMultiplierValue(Result.transition.goddessOfFire.subSpins[currentCascadeCount].winnings.multiplier);
            if (Result.transition.goddessOfFire.subSpins[currentCascadeCount + 1] !== undefined) {
                storeMultiplierValue(Result.transition.goddessOfFire.subSpins[currentCascadeCount + 1].winnings.multiplier);
            }
            let countOfFreeGames = Result.transition.goddessOfFire.freeGame.totalNumber;
            if (countOfFreeGames > 0) {
                hasfeature = [1];
                if (countOfFreeGames - this.storePreviousFreeGameCount > 0) {

                    let count = Result.transition.goddessOfFire.freeGame.totalNumber - Result.transition.goddessOfFire.freeGame.currentNumber;
                    if (count == 0) {
                    } else {
                        reTriggeredFreegame();
                    }
                }
                this.storePreviousFreeGameCount = countOfFreeGames;
            }
            let count = Result.transition.goddessOfFire.freeGame.totalNumber - Result.transition.goddessOfFire.freeGame.currentNumber;
            if (count == 0) {
                this.storePreviousFreeGameCount = 0;
                activeMultiplier(false);
                setFeatureJustFinished();
            }
            if (this.reCostruction) {
                setTotalWinAmount(Result.state.totalWin);
            } else {
                setTotalWinAmount(Result.transition.totalWin);
            }
        } else {
            this.storePreviousFreeGameCount = 0;
            storeMultiplierValue(0);
            hasfeature = [];
        }
        this.filteredreelDataSpinAfterBlast && setGridListAfterBlast([this.filteredreelDataSpinAfterBlast[6]]);
        let FWReelData;
        FWReelData = {
            stopReelsAfterWin: this.filteredreelDataSpinAfterBlast,
            stopReels: this.filteredreelDataSpinBeforeBlast,
            wins: this.lineWins,
            balance: Result.state.balance,
            winAmount: Result.transition.goddessOfFire.subSpins[currentCascadeCount].winnings.credits,
            feature: hasfeature,
            featureType: Result.transition.goddessOfFire.freeGame !== undefined ? "FREEGAME" : "",
            freegameSpinCount: Result.transition && Result.transition.goddessOfFire.freeGame && (Result.transition.goddessOfFire.freeGame.currentNumber),
            freegameSpinCountWin: Result.transition && Result.transition.goddessOfFire.freeGame && (Result.transition.goddessOfFire.freeGame.totalNumber),
            freegameSpinCountRemaining: Result.transition && Result.transition.goddessOfFire.freeGame && (Result.transition.goddessOfFire.freeGame.totalNumber - Result.transition.goddessOfFire.freeGame.currentNumber),
        }

        setBlastPosition(this.horizontalReelsBlastPositions);
        setApplicationWinAmount(FWReelData.winAmount, FWReelData.wins);
        setBaseGameSpinSucces(FWReelData);
        setFreeeGameSpinSucces(FWReelData);

        if (winningsInCascade > 0) {
            let paytable = Result.transition.goddessOfFire.subSpins[currentCascadeCount].winnings.paytable;
            let mainObjKeys = Object.keys(paytable);
            let mainObjValues: any = Object.values(paytable);

            for (let i = 0; i < mainObjKeys.length; i++) {
                let arr = [];
                arr.push(mainObjKeys[i], mainObjValues[i].matchCount);
                this.storePaytableWin.push(arr);

            }

        }
        this.props.winningSymbolDataStored(this.storePaytableWin);
        for (let i = 0; i < 5; i++) {
            this.filteredreelDataSpinBeforeBlast[6].pop();
        }
        this.filteredreelDataSpinBeforeBlast[6].reverse();

        setGridList([this.filteredreelDataSpinBeforeBlast[6]]);
        if (currentCascadeCount == 0) {
            setReelSpinSucces(FWReelData);
            setWinsSucces(FWReelData);

        } else if (currentCascadeCount < Result.transition.goddessOfFire.subSpins.length - 1) {
            this.props.blastStart();
            this.props.updateReelData(FWReelData);
            this.props.setWinsSucces(FWReelData);
        }

        setApplicationBalance(FWReelData.balance);
        this.blastPositionArray = [];
        this.horizontalReelsBlastPositions = [];
        this.setLandingSymbolData(FWReelData.stopReels);
    }

    setLandingSymbolData(stopReels: any) {
        const { setLandingPosition } = this.props;
        let symbolBgAnimList: any = [];
        stopReels && stopReels.forEach((singleReelData: any, i: any) => {
            for (let j: any = 0; j < this.props.displayReelGridSymbolCount[i]; j++) {
                if (singleReelData[j] < 30) {
                    symbolBgAnimList.push([i, j])
                }
            }
        });
        let landingCoordinate: any = []
        symbolBgAnimList.forEach((data: any, index: number) => {
            landingCoordinate.push({
                "reelId": data[0],
                "rowId": data[1],
            })
        })
        setLandingPosition(landingCoordinate)
    }

    processAnticipation(reels: any) {
        const { anticipationPlay } = this.props;
        this.symbolForAnticipationArray = [];
        let FS_Symbolcount: number = 0;
        reels.map((data: any, index: number) => {
            data.map((innerData: any, innerIndex: number) => {
                this.anticipationSymbolList.map((symbols: any) => {
                    let object: any = {};
                    if (innerData == symbols) {
                        let alreadyHaveObj = false;
                        for (let k = 0; k < this.symbolForAnticipationArray.length; k++) {
                            if (this.symbolForAnticipationArray[k].rowId == innerIndex + 1 && this.symbolForAnticipationArray[k].reelId == index) {
                                alreadyHaveObj = true;
                            }
                        }
                        FS_Symbolcount++
                        if (!alreadyHaveObj) {
                            object = {
                                rowId: innerIndex + 1,
                                reelId: index,
                            }
                            this.symbolForAnticipationArray.push(object);
                        }
                    }
                });
            });
        });

        if (this.symbolForAnticipationArray.length >= this.anticipationTriggeringMinCount && !this.props.inFreeGame && this.symbolForAnticipationArray.length < this.anticipationTriggeringMaxCount) {
            anticipationPlay(true);
        } else {
            anticipationPlay(false);
        }
    }

    parseInitData(Result: any) {
        const { relGridSymbolCountDisplay, soundLoadStartFunction, setApplicationBroken, storeMultiplierValue, realityCheckVisible, setBetBoxCount, setBetList, setMaxWinOddsCount, setGridList, setReelStripsIndex, setApplicationBalance, setBaseGameInitSucces, setReelInitSucces, setFreeeGameSpinSucces, setCoinList, setSelectedCoin, arrayOfPaytablePayouts, setGameRtp, renderingStart, setPreviousBalance, setTransitionBalance, introScreenOptionEnabled, turboModeOptionEnabled, currentTimeForRC } = this.props;
        if (Result.state.goddessOfFire.subSpins[0] === undefined) {
            this.filteredreelData = [
                [76, 76, 58, 64, 34, 64, 58, 76, 76, 76],
                [73, 73, 73, 73, 73, 73, 73, 73, 73, 73],
                [37, 67, 67, 67, 67, 67, 67, 67, 67, 67],
                [38, 38, 56, 56, 56, 38, 38, 38, 38, 38],
                [50, 74, 32, 74, 74, 74, 74, 74, 74, 74],
                [45, 57, 57, 57, 57, 45, 45, 45, 57, 57],
                [75, 63, 81, 39, 63, 63, 81, 75, 39, 63]
            ]
            relGridSymbolCountDisplay([5, 2, 2, 3, 3, 4]);

        } else if (Result.state.goddessOfFire.subSpins[0] != undefined && !Result.state.goddessOfFire.subSpins[1]) {
            this.reelDataInitMapping(Result, 0);
        } else if (Result.state.goddessOfFire.subSpins[1]) {
            this.reelDataInitMapping(Result, 1);
        }
        soundLoadStartFunction(true);
        setApplicationBroken(Result.isRestore);
        Result.state.winOfRound.freeGames = 1;
        let balance = Result.state.balance;
        let coinList = Result.configuration.betSteps.possibleValues
        let coinIndex = Result.configuration.betSteps.possibleValues.indexOf(Result.stake);
        if (coinIndex == -1) {
            coinIndex = 1;
        }
        let hasfeature: any = [1];
        if (Result.transition && Result.transition.goddessOfFire.freeGame !== undefined) {
            let countOfFreeGames = Result.transition.goddessOfFire.freeGame.totalNumber;
            if (countOfFreeGames > 0) {
                hasfeature = [1];
                if (countOfFreeGames - this.storePreviousFreeGameCount > 0) {
                }
                this.storePreviousFreeGameCount = countOfFreeGames;
            }
            let count = Result.transition.goddessOfFire.freeGame.totalNumber - Result.transition.goddessOfFire.freeGame.currentNumber;
            if (count == 0) {
                this.storePreviousFreeGameCount = 0;
            }
        } else {
            this.storePreviousFreeGameCount = 0;
            storeMultiplierValue(0);
            hasfeature = [];
        }
        let FWReelData = {
            stopReels: this.filteredreelData,
            reel_data: this.filteredreelData,
            feature: hasfeature,
            featureType: Result.transition && (Result.transition.goddessOfFire.freeGame !== undefined ? "FREEGAME" : ""),
            betList: Result.configuration.betSteps.possibleValues,
            currentBetIndex: coinIndex,
            freegameSpinCount: Result.transition && Result.transition.goddessOfFire.freeGame && (Result.transition.goddessOfFire.freeGame.currentNumber),
            scatterWinnings: Result.transition && (Result.transition.goddessOfFire.basicWin.credits),
            freegameSpinCountWin: Result.transition && Result.transition.goddessOfFire.freeGame && (Result.transition.goddessOfFire.freeGame.totalNumber),
            freegameSpinCountRemaining: Result.transition && Result.transition.goddessOfFire.freeGame && (Result.transition.goddessOfFire.freeGame.totalNumber - Result.transition.goddessOfFire.freeGame.currentNumber),
        }

        setBetBoxCount(Result.configuration.betSteps.possibleValues.length);
        setMaxWinOddsCount(Result.configuration.maxWinOdds);
        let paytablePayoutsArray = Result.configuration.paytables;
        setBetList(FWReelData.betList);
        this.setReelStrip();
        setReelStripsIndex(0);
        setApplicationBalance(balance);
        setReelInitSucces(FWReelData);
        setBaseGameInitSucces(FWReelData);
        setFreeeGameSpinSucces(FWReelData);
        setCoinList(coinList);
        setSelectedCoin(coinIndex);
        arrayOfPaytablePayouts(paytablePayoutsArray);
        setGameRtp(Result.configuration.rtp);

        this.setGameModel(Result);
        for (let i = 0; i < 5; i++) {
            this.filteredreelData[6].pop();
        }

        if (Result.transition && Result.transition.goddessOfFire.freeGame !== undefined) {
            let count = Result.transition.goddessOfFire.freeGame.totalNumber - Result.transition.goddessOfFire.freeGame.currentNumber;
            if (count == 0) {
                this.props.setFeatureJustFinished();
            }
        }
        this.filteredreelData[6].reverse();
        setGridList([this.filteredreelData[6]]);
        renderingStart(true);
        setPreviousBalance(Result.state.balance);
        setTransitionBalance(Result.state.balance);
        introScreenOptionEnabled(true);
        turboModeOptionEnabled(true);
        if (Result.gameOptions.realityCheckTimeoutInSeconds) {
            currentTimeForRC(new Date().getTime);
            let timer = TIMER.TimerManager.createTimer(Result.gameOptions.realityCheckTimeoutInSeconds * this.secToMiliSecConvert)
            timer.on('end', (e: any) => {
                e.remove();
                realityCheckVisible(true);
            })
            timer.start();
        }
        this.setReconstruction(Result);

    }

    private setReconstruction(Result: any): void {
        const { nextFreegame, startFreegame, setApplicationToBaseGameState, setTotalWinAmount, storeMultiplierValue, setReConstruction } = this.props;

        if (Result.transition && Result.transition.goddessOfFire.freeGame && Result.transition.goddessOfFire.freeGame.currentNumber && Result.transition.goddessOfFire.freeGame.totalNumber) {
            storeMultiplierValue(Result.transition.goddessOfFire.subSpins[Result.transition.goddessOfFire.subSpins.length - 1].winnings.multiplier);
            setTotalWinAmount(Result.state.totalWin);
            this.props.setReConstruction(true);
        } else if (Result.transition && Result.transition.goddessOfFire.freeGame !== undefined) {
            let count = Result.transition.goddessOfFire.freeGame.totalNumber - Result.transition.goddessOfFire.freeGame.currentNumber;
            if (count > 0) {
                localStorage.setItem("cheatModifiedRequest", "");
                setApplicationToBaseGameState(false);
                startFreegame();
                let timer = TIMER.TimerManager.createTimer(200);
                timer.on('end', (e: any) => {
                    e.remove();
                    nextFreegame();
                });
                timer.start();
            }
        }


    }

    setReelStrip() {
        const { setReelStrips } = this.props;
        let symbols_level_2, symbols_level_3, symbols_level_4, symbols_level_5, symbols_level_6, symbols_level_7;
        if (!this.setReelsTrue) {
            symbols_level_2 = [1, 79, 55, 73, 31, 43, 49, 61, 67, 55, 37, 85];
            symbols_level_3 = [68, 80, 56, 38, 32, 86, 50, 68, 80, 62, 74, 44];
            symbols_level_4 = [69, 81, 63, 45, 87, 39, 81, 69, 51, 57, 75, 33];
            symbols_level_5 = [70, 82, 64, 76, 34, 40, 88, 52, 58, 70, 46, 88];
            symbols_level_6 = [77, 83, 65, 47, 35, 41, 83, 77, 59, 71, 53, 89];
            symbols_level_7 = [84, 30, 48, 78, 42, 66, 54, 60, 84, 72, 36, 90];
        }
        else if (this.setReelsTrue) {
            symbols_level_2 = [49, 79, 55, 73, 31, 43, 49, 61, 67, 55, 37, 85];
            symbols_level_3 = [62, 80, 56, 38, 32, 86, 50, 68, 80, 62, 74, 44];
            symbols_level_4 = [51, 81, 63, 45, 87, 39, 33, 69, 51, 57, 75, 33];
            symbols_level_5 = [76, 82, 64, 76, 34, 40, 64, 52, 58, 70, 46, 88];
            symbols_level_6 = [89, 83, 65, 47, 35, 41, 83, 77, 59, 71, 53, 89];
            symbols_level_7 = [84, 60, 48, 78, 42, 66, 54, 60, 84, 72, 36, 90];
        }
        let collectionOfSymbols: any[];
        collectionOfSymbols = [];
        collectionOfSymbols.push(symbols_level_2, symbols_level_3, symbols_level_4, symbols_level_5, symbols_level_6, symbols_level_7)
        let reelstrip: any[];
        reelstrip = [];
        for (let i = 1; i <= collectionOfSymbols.length; i++) {
            for (let j = 0; j < collectionOfSymbols[i - 1].length; j++) {
                reelstrip.push(collectionOfSymbols[i - 1][j]);
            }
        }
        let finalReelStrip = [reelstrip, reelstrip, reelstrip, reelstrip, reelstrip, reelstrip];
        setReelStrips([finalReelStrip]);
    }
    useQuery = () => {
        let search = window.location.search;
        return new URLSearchParams(search);
    }

    setRadioButtonLocalStorageValue(introductionScreenVisible: any) {
        if (introductionScreenVisible) {
            localStorage.setItem("playerId-postIntro-" + this.useQuery().get("token"), "true");
        } else {
            localStorage.setItem("playerId-postIntro-" + this.useQuery().get("token"), "false");
        }
    }
    setRadioSoundButtonLocalStorageValue(soundIsPlaying: any) {
        if (soundIsPlaying) {
            localStorage.setItem("playerId-sound-" + this.useQuery().get("token"), "true");
        } else {
            localStorage.setItem("playerId-sound-" + this.useQuery().get("token"), "false");
        }
    }

    componentDidMount() {
      // const { setApplicationPause } = this.props;
        // document.removeEventListener("visibilitychange",this.visibilitychange)
        // document.addEventListener("visibilitychange",this.visibilitychange);
        // document.addEventListener("visibilitychange", () => {
        //     if (document.visibilityState === 'visible') {
        //         setApplicationPause(false);
        //     } else {
        //         setApplicationPause(true);
        //     }
        // });

        // document.removeEventListener("visibilitychange",this.visibilitychange.bind(this));
        // document.addEventListener("visibilitychange",this.visibilitychange.bind(this));

    }
    visibilitychange() {
        //const { setApplicationPause } = this.props;
        if (document.visibilityState === 'visible') {
            this.props.setApplicationPause(false);
        } else {
            this.props.setApplicationPause(true);
        }
    }

    render() {
        if (localStorage.getItem("playerId-postIntro-" + this.useQuery().get("token")) === null ||
            localStorage.getItem("playerId-postIntro-" + this.useQuery().get("token")) === undefined) {
            localStorage.setItem("playerId-postIntro-" + this.useQuery().get("token"), "true");
        }
        if (localStorage.getItem("playerId-sound-" + this.useQuery().get("token")) === null ||
            localStorage.getItem("playerId-sound-" + this.useQuery().get("token")) === undefined) {
            localStorage.setItem("playerId-sound-" + this.useQuery().get("token"), "true");
        }

        localStorage.setItem("playerId", this.useQuery().get("token") || "free");
        localStorage.setItem("bridgeUrl", this.useQuery().get("bridgeUrl") || "noURL");
        return (<div></div>)
    }

}



export default withPixiApp(connect(
    (state: Pick<GJIStore, 'soundState' | 'applicationState' | 'basegameState' | 'reelgridState' | 'introductionState' | 'gameactionstate' | 'asyncInitAction' | 'asyncServerAction' | 'asyncGameLevelSeverState' | 'behaviourState' | 'freegameState'>): IStateToProps =>
    ({
        isInitResponseReceived: state.asyncInitAction.isInitResponseReceived,
        initResult: state.asyncInitAction.result,
        actionResult: state.gameactionstate.result,
        spinResult: state.asyncServerAction.result,
        featureType: state.basegameState.featureType,
        feature: state.basegameState.feature,
        basegamestate: state.basegameState.basegamestate,
        currentCascadeCount: state.reelgridState.currentCascadeCount,
        currentBetIndex: state.basegameState.currentBetIndex,
        betList: state.basegameState.betList,
        betIncrease: state.asyncGameLevelSeverState.betIncrease,
        increaseBetResult: state.asyncGameLevelSeverState.result,
        betListGameLevel: state.behaviourState.betList,
        allSpinComplete: state.reelgridState.allSpinComplete,
        inFreeGame: state.freegameState.inFreeGame,
        introductionScreenVisible: state.introductionState.introductionScreenVisible,
        displayReelGridSymbolCount: state.reelgridState.displayReelGridSymbolCount,
        reConstruction: state.basegameState.reConstruction,
        currencySymbolPrintedBefore: state.applicationState.currencySymbolPrintedBefore,
        currencyCode: state.applicationState.currencyCode,
        currencyGroupingSeparator: state.applicationState.currencyGroupingSeparator,
        currencyDecimalSeparator: state.applicationState.currencyDecimalSeparator,
        soundIsPlaying: state.soundState.soundIsPlaying,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        applicationResponsesend: (): any => dispatch(gameActions.getApplicationActionResponse()),
        visibleIntroductionScreen: (value: boolean): any => dispatch(introductionActions.visibleIntroductionScreen(value)),
        setBaseGameInitSucces: (result_reel: any): any => dispatch(baseGameAction.setBaseGameInitSucces(result_reel)),
        setReelInitSucces: (result_reel: any): any => dispatch(reelgridAction.setReelInitSucces(result_reel)),
        setReConstruction: (reConstruction: boolean): any => dispatch(baseGameAction.setReConstruction(reConstruction)),
        setReelSpinSucces: (result_reel: any): any => dispatch(reelgridAction.setReelSpinSucces(result_reel)),
        updateReelData: (result_reel: any): any => dispatch(reelgridAction.updateReelData(result_reel)),
        setScatterDataBeforeFG: (scatterData: any): any => dispatch(behaviourAction.setScatterDataBeforeFG(scatterData)),
        setScatterDataAnticipation: (scatterData: any): any => dispatch(behaviourAction.setScatterDataAnticipation(scatterData)),
        setReelStrips: (reelStrips: any): any => dispatch(reelgridAction.setReelStrips(reelStrips)),
        setReelStripsIndex: (currentReelStripIndex: number): any => dispatch(reelgridAction.setReelStripsIndex(currentReelStripIndex)),
        setTopwinOddsShow: (showTopWinOdds: boolean): any => dispatch(applicationStateActions.setTopwinOddsShow(showTopWinOdds)),
        setApplicationEnableRiskLadder: (enableRiskLadder: boolean): any => dispatch(applicationStateActions.setApplicationEnableRiskLadder(enableRiskLadder)),
        setApplicationDecreaseBet: (decreaseBet: boolean): any => dispatch(applicationStateActions.setApplicationDecreaseBet(decreaseBet)),
        setApplicationIncreaseBet: (increaseBet: boolean): any => dispatch(applicationStateActions.setApplicationIncreaseBet(increaseBet)),
        setApplicationMaxBet: (maxBet: boolean): any => dispatch(applicationStateActions.setApplicationMaxBet(maxBet)),
        setApplicationShowPaytable: (showPaytable: boolean): any => dispatch(applicationStateActions.setApplicationShowPaytable(showPaytable)),
        setApplicationSpin: (spin: boolean): any => dispatch(applicationStateActions.setApplicationSpin(spin)),
        setApplicationAutoPlayLossLimitEnabled: (autoPlayLossLimitEnabled: boolean): any => dispatch(applicationStateActions.setApplicationAutoPlayLossLimitEnabled(autoPlayLossLimitEnabled)),
        setApplicationCurrencyAdditionalMultiplier: (currencyAdditionalMultiplier: number): any => dispatch(applicationStateActions.setApplicationCurrencyAdditionalMultiplier(currencyAdditionalMultiplier)),
        setApplicationDebugEnabled: (debugEnabled: boolean): any => dispatch(applicationStateActions.setApplicationDebugEnabled(debugEnabled)),
        setApplicationAutoPlaySpinStartValue: (autoPlaySpinStartValue: number): any => dispatch(applicationStateActions.setApplicationAutoPlaySpinStartValue(autoPlaySpinStartValue)),
        setApplicationAutoPlayLossLimitMandatory: (autoPlayLossLimitMandatory: boolean): any => dispatch(applicationStateActions.setApplicationAutoPlayLossLimitMandatory(autoPlayLossLimitMandatory)),
        setApplicationAutoPlaySingleWinLimitEnabled: (autoPlaySingleWinLimitEnabled: boolean): any => dispatch(applicationStateActions.setApplicationAutoPlaySingleWinLimitEnabled(autoPlaySingleWinLimitEnabled)),
        setApplicationAutoPlaySingleWinLimitMandatory: (autoPlaySingleWinLimitMandatory: boolean): any => dispatch(applicationStateActions.setApplicationAutoPlaySingleWinLimitMandatory(autoPlaySingleWinLimitMandatory)),
        setApplicationAutoPlayWinLimitEnabled: (autoPlayWinLimitEnabled: boolean): any => dispatch(applicationStateActions.setApplicationAutoPlayWinLimitEnabled(autoPlayWinLimitEnabled)),
        setApplicationAutoPlayWinLimitMandatory: (autoPlayWinLimitMandatory: boolean): any => dispatch(applicationStateActions.setApplicationAutoPlayWinLimitMandatory(autoPlayWinLimitMandatory)),
        setApplicationCheatingEnabled: (cheatingEnabled: boolean): any => dispatch(applicationStateActions.setApplicationCheatingEnabled(cheatingEnabled)),
        setApplicationCountryCode: (countryCode: string): any => dispatch(applicationStateActions.setApplicationCountryCode(countryCode)),
        setApplicationCurrencyCode: (currencyCode: string): any => dispatch(applicationStateActions.setApplicationCurrencyCode(currencyCode)),
        setApplicationCurrencyDecimalSeparator: (currencyDecimalSeparator: string): any => dispatch(applicationStateActions.setApplicationCurrencyDecimalSeparator(currencyDecimalSeparator)),
        setApplicationCurrencyGroupingSeparator: (currencyGroupingSeparator: string): any => dispatch(applicationStateActions.setApplicationCurrencyGroupingSeparator(currencyGroupingSeparator)),
        setApplicationCurrencyIgnoreDecimals: (currencyIgnoreDecimals: boolean): any => dispatch(applicationStateActions.setApplicationCurrencyIgnoreDecimals(currencyIgnoreDecimals)),
        setApplicationDisableQuickSpin: (disableQuickSpin: boolean): any => dispatch(applicationStateActions.setApplicationDisableQuickSpin(disableQuickSpin)),
        setApplicationDisableQuickStop: (disableQuickStop: boolean): any => dispatch(applicationStateActions.setApplicationDisableQuickStop(disableQuickStop)),
        setApplicationEnableAutoPlay: (enableAutoPlay: boolean): any => dispatch(applicationStateActions.setApplicationEnableAutoPlay(enableAutoPlay)),
        setApplicationEnableRiskCard: (enableRiskCard: boolean): any => dispatch(applicationStateActions.setApplicationEnableRiskCard(enableRiskCard)),
        setApplicationHistoryUrl: (historyUrl: string): any => dispatch(applicationStateActions.setApplicationHistoryUrl(historyUrl)),
        setApplicationHomeUrl: (homeUrl: string): any => dispatch(applicationStateActions.setApplicationHomeUrl(homeUrl)),
        setApplicationLanguageCode: (languageCode: string): any => dispatch(applicationStateActions.setApplicationLanguageCode(languageCode)),
        setApplicationRealityCheckTimePassedInSeconds: (realityCheckTimePassedInSeconds: number): any => dispatch(applicationStateActions.setApplicationRealityCheckTimePassedInSeconds(realityCheckTimePassedInSeconds)),
        setApplicationRealityCheckTimeoutInSeconds: (realityCheckTimeoutInSeconds: number): any => dispatch(applicationStateActions.setApplicationRealityCheckTimeoutInSeconds(realityCheckTimeoutInSeconds)),
        setApplicationSessionTimeoutInSeconds: (sessionTimeoutInSeconds: number): any => dispatch(applicationStateActions.setApplicationSessionTimeoutInSeconds(sessionTimeoutInSeconds)),
        setApplicationShowCloseButton: (showCloseButton: boolean): any => dispatch(applicationStateActions.setApplicationShowCloseButton(showCloseButton)),
        setApplicationShowFullScreenButton: (showFullScreenButton: boolean): any => dispatch(applicationStateActions.setApplicationShowFullScreenButton(showFullScreenButton)),
        setApplicationShowHelpButton: (showHelpButton: boolean): any => dispatch(applicationStateActions.setApplicationShowHelpButton(showHelpButton)),
        setApplicationShowRTP: (showRTP: boolean): any => dispatch(applicationStateActions.setApplicationShowRTP(showRTP)),
        setApplicationShowSettingsControl: (showSettingsControl: boolean): any => dispatch(applicationStateActions.setApplicationShowSettingsControl(showSettingsControl)),
        setApplicationShowTime: (showTime: boolean): any => dispatch(applicationStateActions.setApplicationShowTime(showTime)),
        setApplicationShowVolumeControl: (showVolumeControl: boolean): any => dispatch(applicationStateActions.setApplicationShowVolumeControl(showVolumeControl)),
        setBaseGameSpinSucces: (result_spin: any): any => dispatch(baseGameAction.setBaseGameSpinSucces(result_spin)),
        setApplicationBalance: (balance: number): any => dispatch(baseGameAction.setApplicationBalance(balance)),
        setApplicationToBaseGameState: (basegamestate: boolean): any => dispatch(basegameActions.setApplicationToBaseGameState(basegamestate)),
        nextFreegame: (): any => dispatch(freegameAction.nextFreegame()),
        startFreegame: (): any => dispatch(freegameAction.startFreegame()),
        setWinsSucces: (result_reel: any): any => dispatch(winActions.setWinsSucces(result_reel)),
        setApplicationWinAmount: (winAmount: number, wins: any): any => dispatch(baseGameAction.setApplicationWinAmount(winAmount, wins)),
        setCoinList: (coinList: any): any => dispatch(betPanelAction.setCoinList(coinList)),
        setBlastPosition: (blastPosition: any): any => dispatch(horizontalSymbolActions.setBlastPosition(blastPosition)),
        setGridList: (grid: any): any => dispatch(horizontalSymbolActions.setGridList(grid)),
        setGridListAfterBlast: (grid: any): any => dispatch(horizontalSymbolActions.setGridListAfterBlast(grid)),
        setSelectedCoin: (selectedCoin: number): any => dispatch(betPanelAction.setSelectedCoin(selectedCoin)),
        arrayOfPaytablePayouts: (paytablePayoutArray: any): any => dispatch(paytableAction.arrayOfPaytablePayouts(paytablePayoutArray)),
        setGameRtp: (storeRtp: string): any => dispatch(paytableAction.setGameRtp(storeRtp)),
        blastPositionSet: (blastPosition: any): any => dispatch(reelgridAction.blastPositionSet(blastPosition)),
        anticipationPlay: (playAnticipation: boolean): any => dispatch(reelgridAction.anticipationPlay(playAnticipation)),
        relGridSymbolCountDisplay: (displayReelGridSymbolCount: any): any => dispatch(reelgridAction.relGridSymbolCountDisplay(displayReelGridSymbolCount)),
        setTotalCascadeCount: (totalCascadeCountAction: number): any => dispatch(reelgridAction.setTotalCascadeCount(totalCascadeCountAction)),
        setCurrentCascadeCount: (currentCascadeCountAction: number): any => dispatch(reelgridAction.setCurrentCascadeCount(currentCascadeCountAction)),
        renderingStart: (startRendering: any): any => dispatch(asyncActions.renderingStart(startRendering)),
        setApplicationBroken: (gameBroken: any): any => dispatch(asyncActions.setApplicationBroken(gameBroken)),
        setTransitionBalance: (transitionBalance: any): any => dispatch(behaviourAction.setTransitionBalance(transitionBalance)),
        setMaxWinOddsCount: (maxWinOddsCount: number): any => dispatch(behaviourAction.setMaxWinOddsCount(maxWinOddsCount)),
        blastStart: (): any => dispatch(reelgridAction.blastStart()),
        setPreviousBalance: (previousBalance: any): any => dispatch(behaviourAction.setPreviousBalance(previousBalance)),
        setBetList: (betList: any): any => dispatch(behaviourAction.setBetList(betList)),
        setFreeeGameSpinSucces: (result_spin: any): any => dispatch(freegameAction.setFreeeGameSpinSucces(result_spin)),
        reTriggeredFreegame: (): any => dispatch(freegameAction.reTriggeredFreegame()),
        setTotalCreditWinAmount: (totalCreditWinAmount: any): any => dispatch(behaviourAction.setTotalCreditWinAmount(totalCreditWinAmount)),
        setTotalWinAmount: (totalWinAmount: any): any => dispatch(behaviourAction.setTotalWinAmount(totalWinAmount)),
        setFeatureJustFinished: (): any => dispatch(freegameAction.setFeatureJustFinished()),
        setApplicationCurrentBetIndex: (betIndex: number): any => dispatch(baseGameActions.setApplicationCurrentBetIndex(betIndex)),
        storeMultiplierValue: (storeMultiplierCurrentValue: any): any => dispatch(multiplierActions.storeMultiplierValue(storeMultiplierCurrentValue)),
        activeMultiplier: (multiplierActive: boolean): any => dispatch(multiplierActions.activeMultiplier(multiplierActive)),
        setAllButtonEnable: (exceptBtnList: Array<string>): any => dispatch(buttonActions.setAllButtonEnable(exceptBtnList)),
        setLandingPosition: (landingPosition: any): any => dispatch(landingSymbolAction.setLandingPosition(landingPosition)),
        introScreenOptionEnabled: (EnableIntroScreenOption: boolean): any => dispatch(desktopSettingPanelActions.introScreenOptionEnabled(EnableIntroScreenOption)),
        turboModeOptionEnabled: (EnableTurboModeOption: boolean): any => dispatch(desktopSettingPanelActions.turboModeOptionEnabled(EnableTurboModeOption)),
        setBetBoxCount: (betBoxCount: any): any => dispatch(behaviourAction.setBetBoxCount(betBoxCount)),
        playSymbolAnim: (): any => dispatch(winpresentationAction.playSymbolAnim()),
        setWinSymbolCoOrdinate: (winSymbolCoOrdinate: any): any => dispatch(winpresentationAction.setWinSymbolCoOrdinate(winSymbolCoOrdinate)),
        setApplicationAutoPlaySingleWinLimitPercentage: (autoPlaySingleWinLimitPercentage: number): any => dispatch(applicationStateActions.setApplicationAutoPlaySingleWinLimitPercentage(autoPlaySingleWinLimitPercentage)),
        setApplicationCurrencySymbolPrintedBefore: (currencySymbolPrintedBefore: boolean): any => dispatch(applicationStateActions.setApplicationCurrencySymbolPrintedBefore(currencySymbolPrintedBefore)),
        setApplicationShowSlotSessionStatistics: (showSlotSessionStatistics: boolean): any => dispatch(applicationStateActions.setApplicationShowSlotSessionStatistics(showSlotSessionStatistics)),
        setApplicationMinimumGameDurationMs: (minimumGameDurationMs: number): any => dispatch(applicationStateActions.setApplicationMinimumGameDurationMs(minimumGameDurationMs)),
        setApplicationMaxWinMultiplier: (maxWinMultiplier: number): any => dispatch(applicationStateActions.setApplicationMaxWinMultiplier(maxWinMultiplier)),
        setApplicationAutoPlayExpertMode: (autoPlayExpertMode: boolean): any => dispatch(applicationStateActions.setApplicationAutoPlayExpertMode(autoPlayExpertMode)),
        setApplicationAutoPlaySpinSteps: (autoPlaySpinSteps: object): any => dispatch(applicationStateActions.setApplicationAutoPlaySpinSteps(autoPlaySpinSteps)),
        setApplicationAutoPlaySimpleMode: (autoPlaySimpleMode: boolean): any => dispatch(applicationStateActions.setApplicationAutoPlaySimpleMode(autoPlaySimpleMode)),
        setApplicationLocale: (locale: string): any => dispatch(applicationStateActions.setApplicationLocale(locale)),
        setApplicationAutoPlaySpinResetToStartValue: (autoPlaySpinResetToStartValue: boolean): any => dispatch(applicationStateActions.setApplicationAutoPlaySpinResetToStartValue(autoPlaySpinResetToStartValue)),
        setApplicationAutoPlayWinLimitPercentage: (autoPlayWinLimitPercentage: number): any => dispatch(applicationStateActions.setApplicationAutoPlayWinLimitPercentage(autoPlayWinLimitPercentage)),
        setApplicationResponsibleGamingUrl: (responsibleGamingUrl: string): any => dispatch(applicationStateActions.setApplicationResponsibleGamingUrl(responsibleGamingUrl)),
        setApplicationShowResponsibleGamingIcon: (showResponsibleGamingIcon: boolean): any => dispatch(applicationStateActions.setApplicationShowResponsibleGamingIcon(showResponsibleGamingIcon)),
        setApplicationAutoPlayFreeGamesAutoStart: (autoPlayFreeGamesAutoStart: boolean): any => dispatch(applicationStateActions.setApplicationAutoPlayFreeGamesAutoStart(autoPlayFreeGamesAutoStart)),
        setApplicationAutoPlayLossLimitPercentage: (autoPlayLossLimitPercentage: number): any => dispatch(applicationStateActions.setApplicationAutoPlayLossLimitPercentage(autoPlayLossLimitPercentage)),
        setApplicationCurrencySymbol: (currencySymbol: string): any => dispatch(applicationStateActions.setApplicationCurrencySymbol(currencySymbol)),
        setSuppressCelebrationForWinsBelowStake: (suppressCelebrationForWinsBelowStake: Boolean): any => dispatch(applicationStateActions.setSuppressCelebrationForWinsBelowStake(suppressCelebrationForWinsBelowStake)),
        setApplicationResponsibleGamingIconPath: (responsibleGamingIconPath: string): any => dispatch(applicationStateActions.setApplicationResponsibleGamingIconPath(responsibleGamingIconPath)),
        setApplicationAutoPlayAbortOnFreeGameWinEnabled: (autoPlayAbortOnFreeGameWinEnabled: boolean): any => dispatch(applicationStateActions.setApplicationAutoPlayAbortOnFreeGameWinEnabled(autoPlayAbortOnFreeGameWinEnabled)),
        setApplicationRequestCommand: (requestCommand: boolean): any => dispatch(applicationStateActions.setApplicationRequestCommand(requestCommand)),
        realityCheckVisible: (showRealityCheck: boolean): any => dispatch(behaviourAction.realityCheckVisible(showRealityCheck)),
        currentTimeForRC: (storeCurrentTimeForRC: number): any => dispatch(behaviourAction.currentTimeForRC(storeCurrentTimeForRC)),
        setApplicationPause: (pause: boolean): any => dispatch(applicationStateActions.setApplicationPause(pause)),
        soundLoadStartFunction: (soundLoadStart: boolean): any => dispatch(soundActions.soundLoadStartFunction(soundLoadStart)),
        introScreenVisible: (showIntroScreen: boolean): any => dispatch(introductionScreenActions.introScreenVisible(showIntroScreen)),
        introductionVisibleScreen: (introductionScreenVisible: boolean): any => dispatch(introductionScreenActions.introductionVisibleScreen(introductionScreenVisible)),
        setTurboMode: (IsTurboMode: any): any => dispatch(reelgridAction.setTurboMode(IsTurboMode)),
        turboToggleButton: (turboToggle: any): any => dispatch(desktopSettingPanelActions.turboToggleButton(turboToggle)),
        setIsGameSettingFirstTime: (isGameSettingFirstTime: Boolean): any => dispatch(applicationStateActions.setIsGameSettingFirstTime(isGameSettingFirstTime)),
        resetReelState: (): any => dispatch(reelgridAction.resetReelState()),
        setApplicationJurisdictionKey: (jurisdictionKey: string): any => dispatch(applicationStateActions.setApplicationJurisdictionKey(jurisdictionKey)),
        stakeTore: (storeStake: number): any => dispatch(baseGameActions.stakeTore(storeStake)),
        setIsSoundPrint: (isSoundPrint: boolean): any => dispatch(applicationStateActions.setIsSoundPrint(isSoundPrint)),
        setIsSoundOnOff: (soundOnOff: boolean): any => dispatch(applicationStateActions.setIsSoundOnOff(soundOnOff)),
        winningSymbolDataStored: (storeWinningSymbolData: any): any => dispatch(behaviourAction.winningSymbolDataStored(storeWinningSymbolData)),
        setRequestSent: (requestSent: boolean): any => dispatch(behaviourAction.setRequestSent(requestSent)),
        setApplicationGameVersion: (gameVersion: string): any => dispatch(applicationStateActions.setApplicationGameVersion(gameVersion)),

    }))(ServerComm));