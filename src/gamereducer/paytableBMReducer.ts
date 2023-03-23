export interface IApplicationState {

    carouselStart: boolean;
    paytablePayoutArray: any;
    storeRtp: string;
    showPaytableMobile: boolean;

}

const initialState: IApplicationState = {
    carouselStart: false,
    paytablePayoutArray: [],
    storeRtp: "",
    showPaytableMobile: false,
};

export enum actionTypes {

    START_CAROUSEL_STATE = '@@paytableGof/START_CAROUSEL_STATE',
    PAYTABLE_PAYOUTS = '@@paytableGof/PAYTABLE_PAYOUTS',
    STORE_GAME_RTP = '@@paytableGof/STORE_GAME_RTP',
    SHOW_PAYTABLE_MOBILE = '@@paytableGof/SHOW_PAYTABLE_MOBILE',

}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { paytablePayoutArray, storeRtp, showPaytableMobile } = action;
    switch (action.type) {
        case actionTypes.START_CAROUSEL_STATE:
            return {
                ...state, carouselStart: true
            };
        case actionTypes.PAYTABLE_PAYOUTS:
            return {
                ...state, paytablePayoutArray: paytablePayoutArray
            };
        case actionTypes.STORE_GAME_RTP:
            return {
                ...state, storeRtp: storeRtp
            };
        case actionTypes.SHOW_PAYTABLE_MOBILE:
            return {
                ...state, showPaytableMobile: showPaytableMobile
            };
        default:
            return state;
    }
}

export const actions = {
    startCarousel: (): any => ({ type: actionTypes.START_CAROUSEL_STATE }),
    arrayOfPaytablePayouts: (paytablePayoutArray: any): any => ({
        type: actionTypes.PAYTABLE_PAYOUTS,
        paytablePayoutArray
    }),
    setGameRtp: (storeRtp: string): any => ({
        type: actionTypes.STORE_GAME_RTP,
        storeRtp
    }),
    mobilePaytableShow: (showPaytableMobile: boolean): any => ({
        type: actionTypes.SHOW_PAYTABLE_MOBILE,
        showPaytableMobile
    }),
};
