export interface IApplicationState {

    multiplierActive: boolean;
    multiplierCurrentValue: any;
    storeMultiplierCurrentValue: any;

}

const initialState: IApplicationState = {
    multiplierActive: false,
    multiplierCurrentValue: 0,
    storeMultiplierCurrentValue: 0,
};

export enum actionTypes {

    MULTIPLIER_ACTIVE = '@@multiplier/MULTIPLIER_ACTIVE',
    SET_MULTIPLIER_VALUE = '@@multiplier/SET_MULTIPLIER_VALUE',
    STORE_MULTIPLIER_VALUE = '@@multiplier/STORE_MULTIPLIER_VALUE',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {multiplierActive, multiplierCurrentValue,storeMultiplierCurrentValue} = action;
    switch (action.type) {
        case actionTypes.MULTIPLIER_ACTIVE:
            return {
                ...state, multiplierActive: multiplierActive
            };
        case actionTypes.SET_MULTIPLIER_VALUE:
            return {
                ...state, multiplierCurrentValue: multiplierCurrentValue
            };
        case actionTypes.STORE_MULTIPLIER_VALUE:
            return {
                ...state, storeMultiplierCurrentValue: storeMultiplierCurrentValue
            };


        default:
            return state;
    }
}

export const actions = {
    activeMultiplier: (multiplierActive: boolean): any => ({type: actionTypes.MULTIPLIER_ACTIVE, multiplierActive}),
    setMultiplierValue: (multiplierCurrentValue: any): any => ({
        type: actionTypes.SET_MULTIPLIER_VALUE,
        multiplierCurrentValue
    }),
    storeMultiplierValue: (storeMultiplierCurrentValue: any): any => ({
        type: actionTypes.STORE_MULTIPLIER_VALUE,
        storeMultiplierCurrentValue
    }),

};
