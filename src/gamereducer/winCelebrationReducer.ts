export interface IApplicationState {

    startWinCelebration: boolean;
    showAmount: string
    amountValueStore: number
    showWinCelebration: boolean

}

const initialState: IApplicationState = {
    startWinCelebration: false,
    showAmount: "Coin",
    amountValueStore: 0,
    showWinCelebration: false,


};

export enum actionTypes {

    START_WIN_CELEBRATION = '@@winCelebration/START_WIN_CELEBRATION',
    STORE_AMOUNT_VALUE = '@@winCelebration/STORE_AMOUNT_VALUE',
    SHOW_WIN_CELEBRATION = '@@winCelebration/SHOW_WIN_CELEBRATION',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {startWinCelebration, showAmount, amountValueStore, showWinCelebration} = action;

    switch (action.type) {
        case actionTypes.START_WIN_CELEBRATION:
            return {
                ...state, startWinCelebration: startWinCelebration, showAmount,
            };
        case actionTypes.STORE_AMOUNT_VALUE:
            return {
                ...state, startWinCelebration: amountValueStore,
            };
        case actionTypes.SHOW_WIN_CELEBRATION:
            return {
                ...state, showWinCelebration: showWinCelebration,
            };
        default:
            return state;
    }
}

export const actions = {
    winCelebrationStart: (startWinCelebration: boolean, showAmount: string): any => ({
        type: actionTypes.START_WIN_CELEBRATION,
        startWinCelebration,
        showAmount
    }),
    winCelebrationShow: (showWinCelebration: boolean): any => ({
        type: actionTypes.SHOW_WIN_CELEBRATION,
        showWinCelebration
    }),


};
