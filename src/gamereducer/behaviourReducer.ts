export interface IApplicationState {

    transitionBalance: any;
    previousBalance: any;
    betList: any;
    winAmountEmpty: any;
    totalCreditWinAmount: any;
    totalWinAmount: any;
    scatterDataBeforeFG: any;
    scatterDataAnticipation: any;
    resetManyWaysTextToInitial: any;
    storeAmountForAutoplay: any;
    betBoxCount: any;
    featureTriggered: any;
    counterStartIncreasing: any;
    showMobileMenuPanel: boolean;
    maxWinOddsCount: number;
    showRealityCheck: boolean;
    storeCurrentTimeForRC: number;
    noInternetPopupVisible: boolean;
    storeWinningSymbolData: any;
    requestSent: boolean;

}

const initialState: IApplicationState = {
    transitionBalance: 0,
    previousBalance: 0,
    betList: [],
    winAmountEmpty: false,
    totalCreditWinAmount: 0,
    totalWinAmount: 0,
    scatterDataBeforeFG: [],
    scatterDataAnticipation: [],
    resetManyWaysTextToInitial: false,
    storeAmountForAutoplay: 0,
    betBoxCount: 0,
    featureTriggered: false,
    counterStartIncreasing: true,
    showMobileMenuPanel: false,
    maxWinOddsCount: 0,
    showRealityCheck: false,
    storeCurrentTimeForRC: 0,
    noInternetPopupVisible: false,
    storeWinningSymbolData: [],
    requestSent: false,
};

export enum actionTypes {

    SET_TRANSITION_BALANCE = '@@behaviour/SET_TRANSITION_BALANCE',
    SET_PREVIOUS_BALANCE = '@@behaviour/SET_PREVIOUS_BALANCE',
    SET_BET_LIST = '@@behaviour/SET_BET_LIST',
    SET_SCATTER_DATA_BEFORE_FG = '@@behaviour/SET_SCATTER_DATA_BEFORE_FG',
    SET_SCATTER_DATA_ANTICIPATION = '@@behaviour/SET_SCATTER_DATA_ANTICIPATION',
    SET_WIN_AMOUNT_EMPTY = '@@behaviour/SET_WIN_AMOUNT_EMPTY',
    SET_TOTAL_CREDITED_WIN_AMOUNT = '@@behaviour/SET_TOTAL_CREDITED_WIN_AMOUNT',
    SET_TOTAL_WIN_AMOUNT = '@@behaviour/SET_TOTAL_WIN_AMOUNT',
    RESET_INITIAL_MANYWAYS_TEXT = '@@behaviour/RESET_INITIAL_MANYWAYS_TEXT',
    STORE_AMOUNT_FOR_AUTOPLAY = '@@behaviour/STORE_AMOUNT_FOR_AUTOPLAY',
    SET_BET_BOX_COUNT = '@@behaviour/SET_BET_BOX_COUNT',
    SET_FEATURE_TRIGGERED = '@@behaviour/SET_FEATURE_TRIGGERED',
    SET_COUNTER_START_INCREASING = '@@behaviour/SET_COUNTER_START_INCREASING',
    SET_MOBILE_MENU_PANEL_VISIBILITLY = '@@behaviour/SET_MOBILE_MENU_PANEL_VISIBILITLY',
    SET_MAX_WIN_ODDS_COUNT = '@@behaviour/SET_MAX_WIN_ODDS_COUNT',
    SET_REALITY_CHECK_VISIBILITTY = '@@behaviour/SET_REALITY_CHECK_VISIBILITTY',
    SET_CURRENT_TIME_FOR_REALITY_CHECK = '@@behaviour/SET_CURRENT_TIME_FOR_REALITY_CHECK',
    SET_NO_INTERNET_POPUP_VISIBLE = '@@behaviour/SET_NO_INTERNET_POPUP_VISIBLE',
    STORE_WINNING_SYMBOL_DATA = '@@behaviour/STORE_WINNING_SYMBOL_DATA',
    SET_REQUEST_SENT = '@@behaviour/SET_REQUEST_SENT',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { maxWinOddsCount, showMobileMenuPanel, counterStartIncreasing, betBoxCount, transitionBalance, previousBalance, betList, storeAmountForAutoplay,
        winAmountEmpty, totalCreditWinAmount, totalWinAmount, scatterDataBeforeFG, resetManyWaysTextToInitial, scatterDataAnticipationAction,
        featureTriggered, showRealityCheck, storeCurrentTimeForRC, noInternetPopupVisible, storeWinningSymbolData, requestSent } = action;

    switch (action.type) {
        case actionTypes.SET_TRANSITION_BALANCE:
            return {
                ...state, transitionBalance: transitionBalance,
            };
        case actionTypes.SET_FEATURE_TRIGGERED:
            return {
                ...state, featureTriggered: featureTriggered,
            };
        case actionTypes.SET_BET_BOX_COUNT:
            return {
                ...state, betBoxCount: betBoxCount,
            };
        case actionTypes.STORE_AMOUNT_FOR_AUTOPLAY:
            return {
                ...state, storeAmountForAutoplay: storeAmountForAutoplay,
            };
        case actionTypes.SET_PREVIOUS_BALANCE:
            return {
                ...state, previousBalance: previousBalance,
            };
        case actionTypes.SET_BET_LIST:
            return {
                ...state, betList: betList,
            };
        case actionTypes.SET_WIN_AMOUNT_EMPTY:
            return {
                ...state, winAmountEmpty: winAmountEmpty,
            };
        case actionTypes.SET_TOTAL_CREDITED_WIN_AMOUNT:
            return {
                ...state, totalCreditWinAmount: totalCreditWinAmount,
            };
        case actionTypes.SET_TOTAL_WIN_AMOUNT:
            return {
                ...state, totalWinAmount: totalWinAmount,
            };
        case actionTypes.RESET_INITIAL_MANYWAYS_TEXT:
            return {
                ...state, resetManyWaysTextToInitial: resetManyWaysTextToInitial,
            };
        case actionTypes.SET_SCATTER_DATA_BEFORE_FG:
            return {
                ...state, scatterDataBeforeFG: scatterDataBeforeFG,
            };
        case actionTypes.SET_SCATTER_DATA_ANTICIPATION:
            return {
                ...state, scatterDataAnticipation: scatterDataAnticipationAction,
            };
        case actionTypes.SET_COUNTER_START_INCREASING:
            return {
                ...state, counterStartIncreasing: counterStartIncreasing,
            };
        case actionTypes.SET_MOBILE_MENU_PANEL_VISIBILITLY:
            return {
                ...state, showMobileMenuPanel: showMobileMenuPanel,
            };
        case actionTypes.SET_MAX_WIN_ODDS_COUNT:
            return {
                ...state, maxWinOddsCount: maxWinOddsCount,
            };
        case actionTypes.SET_REALITY_CHECK_VISIBILITTY:
            return {
                ...state, showRealityCheck: showRealityCheck,
            };
        case actionTypes.SET_CURRENT_TIME_FOR_REALITY_CHECK:
            return {
                ...state, storeCurrentTimeForRC: storeCurrentTimeForRC,
            };
        case actionTypes.SET_NO_INTERNET_POPUP_VISIBLE:
            return {
                ...state, noInternetPopupVisible: noInternetPopupVisible,
            };
        case actionTypes.STORE_WINNING_SYMBOL_DATA:
            return {
                ...state, storeWinningSymbolData: storeWinningSymbolData,
            };
        case actionTypes.SET_REQUEST_SENT:
            return {
                ...state, requestSent: requestSent,
            };
        default:
            return state;
    }
}

export const actions = {
    currentTimeForRC: (storeCurrentTimeForRC: number): any => ({
        type: actionTypes.SET_CURRENT_TIME_FOR_REALITY_CHECK,
        storeCurrentTimeForRC
    }),
    visibleNoInternetPopUp: (noInternetPopupVisible: boolean): any => ({
        type: actionTypes.SET_NO_INTERNET_POPUP_VISIBLE,
        noInternetPopupVisible
    }),
    setMaxWinOddsCount: (maxWinOddsCount: number): any => ({
        type: actionTypes.SET_MAX_WIN_ODDS_COUNT,
        maxWinOddsCount
    }),
    setTransitionBalance: (transitionBalance: any): any => ({
        type: actionTypes.SET_TRANSITION_BALANCE,
        transitionBalance
    }),
    setAmountForAutoplay: (storeAmountForAutoplay: any): any => ({
        type: actionTypes.STORE_AMOUNT_FOR_AUTOPLAY,
        storeAmountForAutoplay
    }),
    setPreviousBalance: (previousBalance: any): any => ({ type: actionTypes.SET_PREVIOUS_BALANCE, previousBalance }),
    setBetList: (betList: any): any => ({ type: actionTypes.SET_BET_LIST, betList }),
    setWinAmount: (winAmountEmpty: any): any => ({ type: actionTypes.SET_WIN_AMOUNT_EMPTY, winAmountEmpty }),
    setTotalCreditWinAmount: (totalCreditWinAmount: any): any => ({
        type: actionTypes.SET_TOTAL_CREDITED_WIN_AMOUNT,
        totalCreditWinAmount
    }),
    setTotalWinAmount: (totalWinAmount: any): any => ({ type: actionTypes.SET_TOTAL_WIN_AMOUNT, totalWinAmount }),
    setScatterDataBeforeFG: (scatterDataBeforeFG: any): any => ({ type: actionTypes.SET_SCATTER_DATA_BEFORE_FG, scatterDataBeforeFG }),
    setScatterDataAnticipation: (scatterDataAnticipationAction: any): any => ({ type: actionTypes.SET_SCATTER_DATA_ANTICIPATION, scatterDataAnticipationAction }),
    resetManywaysValue: (resetManyWaysTextToInitial: any): any => ({ type: actionTypes.RESET_INITIAL_MANYWAYS_TEXT, resetManyWaysTextToInitial }),
    setBetBoxCount: (betBoxCount: any): any => ({ type: actionTypes.SET_BET_BOX_COUNT, betBoxCount }),
    FgFeaturetrigger: (featureTriggered: any): any => ({ type: actionTypes.SET_FEATURE_TRIGGERED, featureTriggered }),
    startIncreasingCounter: (counterStartIncreasing: any): any => ({ type: actionTypes.SET_COUNTER_START_INCREASING, counterStartIncreasing }),
    setMobMenuVisibility: (showMobileMenuPanel: boolean): any => ({
        type: actionTypes.SET_MOBILE_MENU_PANEL_VISIBILITLY,
        showMobileMenuPanel
    }),
    realityCheckVisible: (showRealityCheck: boolean): any => ({
        type: actionTypes.SET_REALITY_CHECK_VISIBILITTY,
        showRealityCheck
    }),
    winningSymbolDataStored: (storeWinningSymbolData: any): any => ({
        type: actionTypes.STORE_WINNING_SYMBOL_DATA,
        storeWinningSymbolData
    }),
    setRequestSent: (requestSent: boolean): any => ({
        type: actionTypes.SET_REQUEST_SENT,
        requestSent
    }),
};