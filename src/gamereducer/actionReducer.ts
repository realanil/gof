export interface IApplicationState {
    isActionResponseReceived: boolean,
    result: object,
    error: object

}

const initialState: IApplicationState = {

    isActionResponseReceived: false,
    result: {},
    error: {}

};

export enum actionTypes {
    GET_APPLICATION_ACTION_RESPONSE = '@@application_action/GET_APPLICATION_ACTION_RESPONSE',
    GET_APPLICATION_ACTION_SUCCESS = '@@application_action/GET_APPLICATION_ACTION_SUCCESS',
    GET_APPLICATION_ACTION_FAILURE = '@@application_action/GET_APPLICATION_ACTION_FAILURE',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {result, error} = action;

    switch (action.type) {
        case actionTypes.GET_APPLICATION_ACTION_FAILURE:
            return {...state, error, isActionResponseReceived: false};
        case actionTypes.GET_APPLICATION_ACTION_SUCCESS:
            return {...state, result, isActionResponseReceived: true};
        default:
            return state;
    }
}

export const actions = {
    getApplicationActionResponse: (): any => ({type: actionTypes.GET_APPLICATION_ACTION_RESPONSE}),

};