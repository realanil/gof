import {IApplicationState as Iactionreducer} from '../gamereducer/actionReducer';
import {IStore} from "../core/store/IStore";
import {IApplicationState as IhorizontalSymbolStateReducer} from "../gamereducer/horizontalSymbolStateReducer";
import {IApplicationState as IhorizontalSymbolReducer} from "../gamereducer/horizontalSymbolReducer";
import {IApplicationState as IbehaviourReducer} from "../gamereducer/behaviourReducer";
import {IApplicationState as introductionPageReducer} from "../gamereducer/introductionPageReducer";
import {IApplicationState as IasyncServerGameLevelResponseReducer} from "../gamereducer/asyncGameLevelServerResponseReducer";

export interface GJIStore extends IStore {
    gameactionstate: Iactionreducer
    horizontalSymbolState: IhorizontalSymbolStateReducer,
    horizontalGridState: IhorizontalSymbolReducer,
    behaviourState: IbehaviourReducer,
    asyncGameLevelSeverState: IasyncServerGameLevelResponseReducer,
    introductionState: introductionPageReducer,

}

