export interface IApplicationState {

    showSettingPanel: boolean;
    spaceBarSpin: boolean,
    turboToggle: boolean,
    fullScreenToggle: boolean,
    EnableIntroScreenOption: boolean,
    EnableTurboModeOption: boolean,
}

const initialState: IApplicationState = {
    showSettingPanel: false,
    spaceBarSpin: false,
    turboToggle: false,
    fullScreenToggle: false,
    EnableIntroScreenOption: false,
    EnableTurboModeOption: false,

};

export enum actionTypes {

    SHOW_SETTING_PANEL = '@@desktopSettingPanel/SHOW_SETTING_PANEL',
    SPACE_BAR_SPIN = '@@desktopSettingPanel/SPACE_BAR_SPIN',
    TURBO_TOGGLE = '@@desktopSettingPanel/TURBO_TOGGLE',
    FULL_SCREEN_TOGGLE = '@@desktopSettingPanel/FULL_SCREEN_TOGGLE',
    INTRO_SCREEN_OPTION_ENABLED = '@@desktopSettingPanel/INTRO_SCREEN_OPTION_ENABLED',
    TURBO_MODE_OPTION_ENABLED = '@@desktopSettingPanel/TURBO_MODE_OPTION_ENABLED',

}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {
    const { showSettingPanel, spaceBarSpin, turboToggle, fullScreenToggle, EnableIntroScreenOption, EnableTurboModeOption } = action;

    switch (action.type) {
        case actionTypes.SHOW_SETTING_PANEL:
            return {
                ...state, showSettingPanel: showSettingPanel,
            };
        case actionTypes.SPACE_BAR_SPIN:
            return {
                ...state, spaceBarSpin: spaceBarSpin,
            };
        case actionTypes.TURBO_TOGGLE:
            return {
                ...state, turboToggle: turboToggle,
            };
        case actionTypes.FULL_SCREEN_TOGGLE:
            return {
                ...state, fullScreenToggle: fullScreenToggle,
            };
        case actionTypes.INTRO_SCREEN_OPTION_ENABLED:
            return {
                ...state, EnableIntroScreenOption: EnableIntroScreenOption,
            };
        case actionTypes.TURBO_MODE_OPTION_ENABLED:
            return {
                ...state, EnableTurboModeOption: EnableTurboModeOption,
            };
        default:
            return state;
    }
}

export const actions = {
    showDesktopSettingPanelUI: (showSettingPanel: boolean): any => ({ type: actionTypes.SHOW_SETTING_PANEL, showSettingPanel }),
    spinWithSpaceBar: (spaceBarSpin: boolean): any => ({ type: actionTypes.SPACE_BAR_SPIN, spaceBarSpin }),
    turboToggleButton: (turboToggle: boolean): any => ({ type: actionTypes.TURBO_TOGGLE, turboToggle }),
    fullScreenToggleButton: (fullScreenToggle: boolean): any => ({ type: actionTypes.FULL_SCREEN_TOGGLE, fullScreenToggle }),
    introScreenOptionEnabled: (EnableIntroScreenOption: boolean): any => ({ type: actionTypes.INTRO_SCREEN_OPTION_ENABLED, EnableIntroScreenOption }),
    turboModeOptionEnabled: (EnableTurboModeOption: boolean): any => ({ type: actionTypes.TURBO_MODE_OPTION_ENABLED, EnableTurboModeOption }),
};



