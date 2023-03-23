export interface IApplicationState {

    startWinShower: boolean;
    showWinShower: boolean;
    winShowerAmount: number;
    stopWinShowerSound: boolean;

}

const initialState: IApplicationState = {
    startWinShower: false,
    showWinShower: false,
    winShowerAmount: 0,
    stopWinShowerSound: false,


};

export enum actionTypes {

    START_WIN_SHOWER = '@@winShower/START_WIN_SHOWER',
    SHOW_WIN_SHOWER = '@@winShower/SHOW_WIN_SHOWER',
    STOP_WIN_SHOWER_SOUND = '@@winShower/STOP_WIN_SHOWER_SOUND',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { startWinShower, showWinShower, winShowerAmount, stopWinShowerSound } = action;

    switch (action.type) {
        case actionTypes.START_WIN_SHOWER:
            return {
                ...state, startWinShower: startWinShower, winShowerAmount,
            };
        case actionTypes.SHOW_WIN_SHOWER:

            return {
                ...state, showWinShower: showWinShower
            };
        case actionTypes.STOP_WIN_SHOWER_SOUND:

            return {
                ...state, stopWinShowerSound: stopWinShowerSound
            };
        default:
            return state;
    }
}

export const actions = {
    winShowerStart: (startWinShower: boolean, winShowerAmount: number): any => ({
        type: actionTypes.START_WIN_SHOWER,
        startWinShower, winShowerAmount
    }),
    winShowerShow: (showWinShower: boolean): any => ({
        type: actionTypes.SHOW_WIN_SHOWER,
        showWinShower
    }),

    winShowerSoundStop: (stopWinShowerSound: boolean): any => ({
        type: actionTypes.STOP_WIN_SHOWER_SOUND,
        stopWinShowerSound
    }),

};
