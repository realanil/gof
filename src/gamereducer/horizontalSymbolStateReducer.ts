export interface IApplicationState {
    updatedSymbolId: number,
    dropDuration: number,
    updatedSymbol: any,
    animationSymbol: any,
    dropSymbol: any,
    randomSymbol: boolean
    animatOnLand: boolean
    landPosition: any
    startPosition: any
    symnolImage: any,
    symbolUpdate: any
    onComplete: any
    onCompleteScope: any
    animationName: any
    reactCompSymbolTrayList: any
    addSymbolInTray: any
}

const initialState: IApplicationState = {

    updatedSymbolId: -1,
    dropDuration: -1,
    updatedSymbol: {},
    animationSymbol: {},
    dropSymbol: {},
    landPosition: {},
    startPosition: {},
    randomSymbol: false,
    animatOnLand: false,
    addSymbolInTray: false,
    animationName: "",
    symnolImage: [],
    symbolUpdate: [],
    reactCompSymbolTrayList: [],
    onComplete: Function,
    onCompleteScope: {},
};

export enum actionTypes {

    SET_SYMBOL_ANIMATION_NAME = '@@horizontalsymbol/SET_SYMBOL_ANIMATION_NAME',
    SET_UPDATED_SYMBOL = '@@horizontalsymbol/SET_UPDATED_SYMBOL',
    GET_UPDATED_SYMBOL = '@@horizontalsymbol/GET_UPDATED_SYMBOL',
    START_DROP_SYMBOL = '@@horizontalsymbol/START_DROP_SYMBOL',
    SET_REACT_SYMBOL_TRAY = '@@horizontalsymbol/SET_REACT_SYMBOL_TRAY',
    ADD_SYMBOL_IN_TRAY = '@@horizontalsymbol/ADD_SYMBOL_IN_TRAY'
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {
        updatedSymbol,
        updatedSymbolId,
        randomSymbol,
        dropSymbol,
        animationname,
        animationSymbol,
        callback,
        callbackScope,
        reactCompSymbolTrayList
    } = action;
    switch (action.type) {
        case actionTypes.GET_UPDATED_SYMBOL:
            return {...state};
        case actionTypes.SET_UPDATED_SYMBOL:
            return {
                ...state,
                updatedSymbolId: updatedSymbolId,
                updatedSymbol: updatedSymbol,
                randomSymbol: randomSymbol,
                addSymbolInTray: false
            };
        case actionTypes.SET_SYMBOL_ANIMATION_NAME:

            return {
                ...state,
                animationSymbol: animationSymbol,
                animationName: animationname,
                onComplete: callback,
                onCompleteScope: callbackScope
            };
        case actionTypes.START_DROP_SYMBOL:

            return {
                ...state, dropSymbol: dropSymbol, updatedSymbolId: updatedSymbolId
            };
        case actionTypes.SET_REACT_SYMBOL_TRAY:

            return {
                ...state, reactCompSymbolTrayList: reactCompSymbolTrayList
            };
        case actionTypes.ADD_SYMBOL_IN_TRAY:

            return {
                ...state, addSymbolInTray: true
            };

        default:
            return state;
    }
}

export const actions = {

    getUpdatedSymbol: (): any => ({type: actionTypes.GET_UPDATED_SYMBOL}),
    setUpdatedSymbol: (updatedSymbol: any, updatedSymbolId: number, randomSymbol: boolean): any => ({
        type: actionTypes.SET_UPDATED_SYMBOL,
        updatedSymbol,
        updatedSymbolId,
        randomSymbol
    }),
    setReactSymbolTray: (reactCompSymbolTrayList: any): any => ({
        type: actionTypes.SET_REACT_SYMBOL_TRAY,
        reactCompSymbolTrayList
    }),
    setDropSymbol: (dropSymbol: any, updatedSymbolId: number): any => ({
        type: actionTypes.START_DROP_SYMBOL,
        dropSymbol, updatedSymbolId
    }),
    addSymbolInTray: (): any => ({
        type: actionTypes.ADD_SYMBOL_IN_TRAY,

    }),
    setSymbolAnimationName: (animationSymbol: any, animationname: string = "", callback?: any, callbackScope?: any): any => ({
        type: actionTypes.SET_SYMBOL_ANIMATION_NAME,
        animationSymbol,
        animationname,
        callback,
        callbackScope
    }),

};
