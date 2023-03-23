export interface IApplicationState {
    playSymbolAnimation: boolean
    blastStart: boolean
    blastPosition: any,
    gridList: any,
    gridListAfterBlast: any,
    winSymbolCoOrdinate: any,
}

const initialState: IApplicationState = {
    playSymbolAnimation: false,
    blastStart: false,
    blastPosition: [],
    gridList: [],
    gridListAfterBlast: [],
    winSymbolCoOrdinate: []
};

export enum actionTypes {
    PLAY_ANIM_WIN_SYMBOL = '@@horizontalsymbolanimation/PLAY_ANIM_WIN_SYMBOL',
    SET_HORIZONTAL_BLAST_POSITION = '@@horizontalsymbolanimation/SET_HORIZONTAL_BLAST_POSITION',
    SET_HORIZONTAL_GRID_LIST = '@@horizontalsymbolanimation/SET_HORIZONTAL_GRID_LIST',
    SET_HORIZONTAL_GRID_LIST_AFTER_BLAST = '@@horizontalsymbolanimation/SET_HORIZONTAL_GRID_LIST_AFTER_BLAST',
    GET_HORIZONTAL_BLAST_POSITION = '@@horizontalsymbolanimation/GET_HORIZONTAL_BLAST_POSITION',
    BLAST_START = '@@horizontalsymbolanimation/BLAST_SYMBOL',
    SET_WIN_SYMBOL_CO_ORDINATE = '@@horizontalsymbolanimation/SET_WIN_SYMBOL_CO_ORDINATE'
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {
        blastStart,
        playSymbolAnimation,
        horizontalblastPosition,
        gridList,
        gridListAfterBlast,
        winSymbolCoOrdinate
    } = action;

    switch (action.type) {
        case actionTypes.SET_HORIZONTAL_BLAST_POSITION:

            return {
                ...state,
                blastPosition: horizontalblastPosition,
            };
        case actionTypes.GET_HORIZONTAL_BLAST_POSITION:
            return {
                ...state,
            };

        case actionTypes.PLAY_ANIM_WIN_SYMBOL:
            return {
                ...state, playSymbolAnimation: true
            };
        case actionTypes.BLAST_START:
            return {
                ...state, blastStart: true
            };
        case actionTypes.SET_HORIZONTAL_GRID_LIST:
            return {
                ...state,
                gridList: gridList,
            };
        case actionTypes.SET_WIN_SYMBOL_CO_ORDINATE:
            return {
                ...state,
                winSymbolCoOrdinate: winSymbolCoOrdinate
            };

        case actionTypes.SET_HORIZONTAL_GRID_LIST_AFTER_BLAST:
            return {
                ...state,
                gridListAfterBlast: gridListAfterBlast,
            };
        default:
            return state;
    }
}

export const actions = {
    setBlastPosition: (horizontalblastPosition: any): any => ({
        type: actionTypes.SET_HORIZONTAL_BLAST_POSITION,
        horizontalblastPosition
    }),
    setGridList: (gridList: any): any => ({type: actionTypes.SET_HORIZONTAL_GRID_LIST, gridList}),
    setGridListAfterBlast: (gridListAfterBlast: any): any => ({
        type: actionTypes.SET_HORIZONTAL_GRID_LIST_AFTER_BLAST,
        gridListAfterBlast
    }),
    getBlastPosition: (): any => ({type: actionTypes.GET_HORIZONTAL_BLAST_POSITION}),
    blastStart: (): any => ({type: actionTypes.BLAST_START}),
    playSymbolAnim: (): any => ({type: actionTypes.PLAY_ANIM_WIN_SYMBOL}),
    setWinSymbolCoOrdinate: (winSymbolCoOrdinate: number): any => ({
        type: actionTypes.SET_WIN_SYMBOL_CO_ORDINATE,
        winSymbolCoOrdinate
    }),
};