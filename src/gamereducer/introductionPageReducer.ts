export interface IApplicationState {

    showIntroductionPage: boolean;
    startResize: boolean;
    introductionScreenVisible: boolean;

}

const initialState: IApplicationState = {
    showIntroductionPage: false,
    startResize: false,
    introductionScreenVisible:true,
};

export enum actionTypes {

    SHOW_INTRODUCTION_PAGE = '@@introduction/SHOW_INTRODUCTION_PAGE',
    HIDE_INTRODUCTION_PAGE = '@@introduction/HIDE_INTRODUCTION_PAGE',
    START_RESIZE_INTRODUCTION_PAGE = '@@introduction/START_RESIZE_INTRODUCTION_PAGE',
    VISIBILITY_OF_INTRODUCTION_SCREEN = '@@introduction/VISIBILITY_OF_INTRODUCTION_SCREEN',

}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const {introductionScreenVisible} = action;
    switch (action.type) {
        case actionTypes.SHOW_INTRODUCTION_PAGE:
            return {
                ...state, showIntroductionPage: true,
            };
        case actionTypes.HIDE_INTRODUCTION_PAGE:

            return {
                ...state, showIntroductionPage: false,
            };
        case actionTypes.START_RESIZE_INTRODUCTION_PAGE:

            return {
                ...state, startResize: true,
            };
        case actionTypes.VISIBILITY_OF_INTRODUCTION_SCREEN:

            return {
                ...state, introductionScreenVisible: introductionScreenVisible,
            };
        default:
            return state;
    }
}

export const actions = {
    introductionPageShow: (): any => ({type: actionTypes.SHOW_INTRODUCTION_PAGE}),
    hideIntroductionPage: (): any => ({type: actionTypes.HIDE_INTRODUCTION_PAGE}),
    resizeStart: (): any => ({type: actionTypes.START_RESIZE_INTRODUCTION_PAGE}),
    visibleIntroductionScreen: (introductionScreenVisible:boolean): any => ({type: actionTypes.VISIBILITY_OF_INTRODUCTION_SCREEN,introductionScreenVisible}),


};
