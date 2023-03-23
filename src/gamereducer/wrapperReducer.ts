export interface IApplicationState {

    betLimit: number;
    clickToEnterFeature: boolean;
    disableAutoplay: boolean;
    disableCoins: boolean;
    hideNegativeWins: boolean;
    maximumAutoplay: number;
    maximumStake: number;
    oneClickRules: boolean;
    spacebarDisabled: boolean;
    useBuyAFeature: boolean;
    onError: boolean;
    homeButton: boolean;
    spinStopButton: boolean;
}

const initialState: IApplicationState = {

    betLimit: 0,
    clickToEnterFeature: false, //raj
    disableAutoplay: false, //done
    disableCoins: false,  //done
    hideNegativeWins: false, //done
    maximumAutoplay: 0,  //done
    maximumStake: 1, //raj
    oneClickRules: false,  //done
    spacebarDisabled: false, //done
    useBuyAFeature: false,
    onError: false,
    homeButton: false,
    spinStopButton: true,

};

export enum actionTypes {

    SET_BET_LIMIT = '@@wrapper/SET_BET_LIMIT',
    SET_CLICK_TO_ENTER_FEATURE = '@@wrapper/SET_CLICK_TO_ENTER_FEATURE',
    SET_DISABLE_AUTOPLAY = '@@wrapper/SET_DISABLE_AUTOPLAY',
    SET_DISABLE_COINS = '@@wrapper/SET_DISABLE_COINS',
    SET_HIDE_NEGATIVE_VALUE = '@@wrapper/SET_HIDE_NEGATIVE_VALUE',
    SET_MAX_AUTOPLAY = '@@wrapper/SET_MAX_AUTOPLAY',
    SET_MAX_STAKE = '@@wrapper/SET_MAX_STAKE',
    SET_ONE_CLICK_RULES = '@@wrapper/SET_ONE_CLICK_RULES',
    SET_SPACEBAR_DISABLE = '@@wrapper/SET_SPACEBAR_DISABLE',
    SET_USE_BUY_FEATURE = '@@wrapper/SET_USE_BUY_FEATURE',
    SET_ERROR_OCCURED = '@@wrapper/SET_ERROR_OCCURED',
    SHOW_HOME_BUTTON = '@@wrapper/SHOW_HOME_BUTTON',
    SHOW_SPIN_STOP_BUTTON = '@@wrapper/SHOW_SPIN_STOP_BUTTON',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { spinStopButton, homeButton, betLimit, clickToEnterFeature, disableAutoplay, disableCoins, hideNegativeWins, maximumAutoplay, maximumStake, oneClickRules, spacebarDisabled, useBuyAFeature } = action;

    switch (action.type) {

        case actionTypes.SET_BET_LIMIT:
            return {
                ...state, betLimit: betLimit,
            };
        case actionTypes.SET_CLICK_TO_ENTER_FEATURE:

            return {
                ...state, clickToEnterFeature: clickToEnterFeature
            };
        case actionTypes.SET_DISABLE_AUTOPLAY:
            return {
                ...state, disableAutoplay: disableAutoplay,
            };
        case actionTypes.SET_DISABLE_COINS:

            return {
                ...state, disableCoins: disableCoins
            };
        case actionTypes.SET_HIDE_NEGATIVE_VALUE:
            return {
                ...state, hideNegativeWins: hideNegativeWins,
            };
        case actionTypes.SET_MAX_AUTOPLAY:

            return {
                ...state, maximumAutoplay: maximumAutoplay
            };
        case actionTypes.SET_MAX_STAKE:
            return {
                ...state, maximumStake: maximumStake,
            };
        case actionTypes.SET_ONE_CLICK_RULES:

            return {
                ...state, oneClickRules: oneClickRules
            };
        case actionTypes.SET_SPACEBAR_DISABLE:
            return {
                ...state, spacebarDisabled: spacebarDisabled,
            };
        case actionTypes.SET_USE_BUY_FEATURE:

            return {
                ...state, useBuyAFeature: useBuyAFeature
            };

        case actionTypes.SET_ERROR_OCCURED:

            return {
                ...state, onError: true
            };

        case actionTypes.SHOW_HOME_BUTTON:

            return {
                ...state, homeButton: homeButton
            };


        case actionTypes.SHOW_SPIN_STOP_BUTTON:

            return {
                ...state, spinStopButton: spinStopButton
            };


        default:
            return state;
    }
}

export const actions = {
    stopButtonVisible: (spinStopButton: boolean): any => ({
        type: actionTypes.SHOW_SPIN_STOP_BUTTON,
        spinStopButton
    }),
    setUseBuyFeature: (useBuyAFeature: boolean): any => ({
        type: actionTypes.SET_USE_BUY_FEATURE,
        useBuyAFeature
    }),
    setSpaceBarDisable: (spacebarDisabled: boolean): any => ({
        type: actionTypes.SET_SPACEBAR_DISABLE,
        spacebarDisabled
    }),

    setOneClickRule: (oneClickRules: boolean): any => ({
        type: actionTypes.SET_ONE_CLICK_RULES,
        oneClickRules
    }),

    setMaxStake: (maximumStake: number): any => ({
        type: actionTypes.SET_MAX_STAKE,
        maximumStake
    }),
    setMaxAutoPlay: (maximumAutoplay: number): any => ({
        type: actionTypes.SET_MAX_AUTOPLAY,
        maximumAutoplay
    }),

    setHideNegativeValue: (hideNegativeWins: boolean): any => ({
        type: actionTypes.SET_HIDE_NEGATIVE_VALUE,
        hideNegativeWins
    }),
    setDisableCoins: (disableCoins: boolean): any => ({
        type: actionTypes.SET_DISABLE_COINS,
        disableCoins
    }),
    setDisableAutoplay: (disableAutoplay: boolean): any => ({
        type: actionTypes.SET_DISABLE_AUTOPLAY,
        disableAutoplay
    }),
    setClickToEnterFeature: (clickToEnterFeature: boolean): any => ({
        type: actionTypes.SET_CLICK_TO_ENTER_FEATURE,
        clickToEnterFeature
    }),
    setBetLimit: (betLimit: number): any => ({
        type: actionTypes.SET_BET_LIMIT,
        betLimit
    }),

    showHomeButton: (homeButton: boolean): any => ({
        type: actionTypes.SHOW_HOME_BUTTON,
        homeButton
    }),

};
