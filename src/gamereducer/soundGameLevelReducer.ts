export interface IApplicationState {


    reTriggerBlastCount: number;
    introContinueButtonClick: boolean;

}

const initialState: IApplicationState = {

    reTriggerBlastCount: -1,
    introContinueButtonClick: false,

};

export enum actionTypes {


    RE_TRIGGER_BLAST_COUNT = '@@soundGameLevel/RE_TRIGGER_BLAST_COUNT',
    INTRO_BUTTON_CLICKED = '@@soundGameLevel/INTRO_BUTTON_CLICKED',

}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { reTriggerBlastCount, introContinueButtonClick } = action;

    switch (action.type) {
        case actionTypes.RE_TRIGGER_BLAST_COUNT:
            return {
                ...state, reTriggerBlastCount: reTriggerBlastCount,
            };
        case actionTypes.INTRO_BUTTON_CLICKED:
            return {
                ...state, introContinueButtonClick: introContinueButtonClick,
            };


        default:
            return state;
    }
}

export const actions = {

    reTriggerCountBlast: (reTriggerBlastCount: any): any => ({ type: actionTypes.RE_TRIGGER_BLAST_COUNT, reTriggerBlastCount }),
    buttonClickedIntro: (introContinueButtonClick: any): any => ({ type: actionTypes.INTRO_BUTTON_CLICKED, introContinueButtonClick }),


};