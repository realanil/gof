import { combineReducers, Reducer } from 'redux';
import { IStore } from '../core/store/IStore';

import { reducer as asyncInitReducer } from '../core/reducers/asyncInitAction';

import { reducer as asyncServerReducer } from '../core/reducers/asyncServerResponseReducer';

import { reducer as buttonPanelReducer } from '../core/reducers/buttonPanelReducer';

import { reducer as applicationReducer } from '../core/reducers/applicationStateReducer';
import { reducer as layoutsReducer } from './../core/reducers/layoutsStateReducer';

import { reducer as basegamereducer } from '../core/reducers/baseGameReducer';
import { reducer as freegamereducer } from '../core/reducers/freeGameReducer';

import { reducer as reelsreducer } from '../core/reducers/reelsStateReducer';
import { reducer as reelgridreducer } from './../core/reducers/reelgridStateReducer';

import { reducer as gridsreducer } from '../core/reducers/gridStateReducer';
import { reducer as symbolreducer } from './../core/reducers/symbolStateReducer';
import { reducer as winpresentationreducer } from './../core/reducers/winPresentationReducer';
import { reducer as paytablereducer } from './../core/reducers/paytableReducer';
import { reducer as autoplayReducer } from '../core/reducers/autoplayReducer';
import { reducer as menuReducer } from './../core/reducers/menuReducer';
import { reducer as soundreducer } from './../core/reducers/soundReducer';
import {
    reducer as flowManagerReducer
} from './../core/reducers/flowManagerReducer';

import { reducer as ActionReducer } from "../gamereducer/actionReducer";
import { reducer as introductionpagereducer } from '../gamereducer/introductionPageReducer';
import { reducer as paytableBMreducer } from "../gamereducer/paytableBMReducer"
import { reducer as desktopSettingPanelReducer } from "../core/reducers/desktopSettingPanelReducer";
import { reducer as bonusreducer } from "../core/reducers/bonusReducer";
import { reducer as currencyManagerReducer } from "../core/reducers/currencymanagerReducer";
import { reducer as playerMessageReducer } from "../core/reducers/playerMessageReducer";
import { reducer as betpanelreducer } from "../core/reducers/betPanelReducer";
import { reducer as helpreducer } from "../core/reducers/helpreducer";
import { reducer as historyreducer } from "../core/reducers/historyreducer";
import { reducer as winCelebrationreducer } from "../gamereducer/winCelebrationReducer";
import { reducer as winShowerreducer } from "../gamereducer/winShowerReducer";
import { reducer as horizontalSymbolStateReducer } from "../gamereducer/horizontalSymbolStateReducer";
import { reducer as desktopSettingPanelGameLevelStateReducer } from "../gamereducer/desktopSettingPanelGameLevelReducer";
import { reducer as keyboardListenerReducer } from '../core/reducers/keyboardListenerReducer';
import { reducer as MultiplierReducer } from '../gamereducer/multiplierReducer';
import { reducer as horizontalSymbolReducer } from '../gamereducer/horizontalSymbolReducer';
import { reducer as transitionLayerReducer } from '../core/reducers/transitionLayerReducer';
import { reducer as behaviourReducer } from '../gamereducer/behaviourReducer';
import { reducer as asyncGameLevelSeverReducer } from '../gamereducer/asyncGameLevelServerResponseReducer';
import { reducer as autoplayKeyBoardListenerReducer } from '../gamereducer/autoplayKeyboardListenerReducer';
import { reducer as landingSymbolReducer } from "../core/reducers/landingsymbolreducer";
import { reducer as soundGameLevelReducer } from '../gamereducer/soundGameLevelReducer';
import { reducer as wrapperReducer } from "../gamereducer/wrapperReducer";
import { reducer as overlaySymbolReducer } from "../core/reducers/overlayreducer";
import { reducer as introductionScreenReducer } from "../core/reducers/introductionScreenReducer";

const rootReducerData = {
    asyncInitAction: asyncInitReducer,
    asyncServerAction: asyncServerReducer,
    applicationState: applicationReducer,
    layoutsState: layoutsReducer,
    reelsState: reelsreducer,
    reelgridState: reelgridreducer,
    gridsState: gridsreducer,
    basegameState: basegamereducer,
    autoplayState: autoplayReducer,
    buttonPanelState: buttonPanelReducer,
    freegameState: freegamereducer,
    menuState: menuReducer,
    symbolState: symbolreducer,
    winpresentationState: winpresentationreducer,
    paytableState: paytablereducer,
    soundState: soundreducer,
    gameactionstate: ActionReducer,
    introductionState: introductionpagereducer,
    paytableBMState: paytableBMreducer,
    desktopSettingPanelState: desktopSettingPanelReducer,
    bonusState: bonusreducer,
    currencyManagerState: currencyManagerReducer,
    playerMessageState: playerMessageReducer,
    betPanelState: betpanelreducer,
    helpState: helpreducer,
    historyState: historyreducer,
    winCelebrationState: winCelebrationreducer,
    winShowerState: winShowerreducer,
    horizontalSymbolState: horizontalSymbolStateReducer,
    keyboardListenerState: keyboardListenerReducer,
    MultiplierState: MultiplierReducer,
    transitionLayerState: transitionLayerReducer,
    horizontalGridState: horizontalSymbolReducer,
    desktopSettingPanelGameLevel: desktopSettingPanelGameLevelStateReducer,
    behaviourState: behaviourReducer,
    asyncGameLevelSeverState: asyncGameLevelSeverReducer,
    flowManagerState: flowManagerReducer,
    autoplayKeyBoardListenerState: autoplayKeyBoardListenerReducer,
    landingState: landingSymbolReducer,
    soundGameLevelState: soundGameLevelReducer,
    wrapperState: wrapperReducer,
    overlaySymbolState: overlaySymbolReducer,
    introductionScreenState: introductionScreenReducer,
}

const combineReducerData = { ...rootReducerData }
const gamerootReducer: Reducer<IStore> = combineReducers<IStore>(combineReducerData);

export default gamerootReducer;
