export interface IApplicationState {
    autoplayKeyboardListenerActive: boolean;
    clickedInputBox: string;
    digitToDisplay:number;

}

const initialState: IApplicationState = {

    autoplayKeyboardListenerActive: false,
    clickedInputBox:"",
    digitToDisplay:0,

};

export enum actionTypes {

    ACTIVE_AUTOPLAY_KEYBOARD_LISTENER = '@@autoplayKeyboardListener/ACTIVE_AUTOPLAY_KEYBOARD_LISTENER',
    CLICKED_INPUT_BOX = '@@autoplayKeyboardListener/CLICKED_INPUT_BOX',
    SET_VALUE_TO_DISPLAY = '@@autoplayKeyboardListener/SET_VALUE_TO_DISPLAY',



}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {autoplayKeyboardListenerActive,clickedInputBox,digitToDisplay} = action;
    switch (action.type) {
        case actionTypes.ACTIVE_AUTOPLAY_KEYBOARD_LISTENER:
            return {
                ...state,
                autoplayKeyboardListenerActive: autoplayKeyboardListenerActive
            };

        case actionTypes.CLICKED_INPUT_BOX:
            return {
                ...state,
                clickedInputBox: clickedInputBox
            };

        case actionTypes.SET_VALUE_TO_DISPLAY:
            return {
                ...state,
                digitToDisplay: digitToDisplay
            };

        default:
            return state;
    }
}

export const actions = {
    setAutoplayKeyboardListenerActive: (autoplayKeyboardListenerActive: boolean): any => ({type: actionTypes.ACTIVE_AUTOPLAY_KEYBOARD_LISTENER, autoplayKeyboardListenerActive}),
    setNameOfClickedInputBox: (clickedInputBox: any): any => ({type: actionTypes.CLICKED_INPUT_BOX, clickedInputBox}),
    setDigitToDisplay: (digitToDisplay: any): any => ({type: actionTypes.SET_VALUE_TO_DISPLAY, digitToDisplay}),

};
