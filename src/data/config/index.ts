import { server } from "./../../core/data/config";

export enum configGame {
    "CANVAS_WIDTH" = 1920,
    "CANVAS_HEIGHT" = 1080,
    "SPIN_TYPE" = 2,
    "SYMBOL_COUNT_MAX" = 8,
    "REEL_ROWS" = 7,
    "REEL_COLUMN" = 6,
    "REEL_HEIGHT" = 616,
    "REEL_CONTAINER_X" = -5,
    "REEL_CONTAINER_Y" = 0,
    "REEL_CONTAINER_X_IN_PORTRAIT" = 0,
    "REEL_CONTAINER_Y_IN_PORTRAIT" = 0,
    "REEL_CONTAINER_SCALE" = 1,
    "REEL_CONTAINER_SCALE_IN_PORTRAIT" = 0.5,
    "REEL_GRID_X" = 346,
    "REEL_GRID_Y" = 254,
    "REEL_GRID_X_IN_PORTRAIT" = 8,
    "REEL_GRID_Y_IN_PORTRAIT" = 544,
    "REEL_GRID_SCALE" = 1,
    "REEL_GRID_SCALE_IN_PORTRAIT" = 0.86,
    "REEL_WIDTH" = 206,
    "REEL_GAP" = 0,
    "SYMBOL_WIDTH" = 206,
    "SYMBOL_HEIGHT" = 88,
    "DISPLAY_ALL_WIN_DURATION" = 1,
    "TOGGLE_WIN_DURATION" = 1,
    "TOGGLE_WIN_DURATION_IDLE" = 1,
    "AUTOPLAY_UI_IN_CANVAS" = 0,
    "MENU_UI_IN_CANVAS" = 0,
    "HORIZONTAL_REEL_CONTAINER_X" = 1166,
    "HORIZONTAL_REEL_CONTAINER_Y" = 90,
    "HORIZONTAL_REEL_CONTAINER_X_IN_PORTRAIT" = 719,
    "HORIZONTAL_REEL_CONTAINER_Y_IN_PORTRAIT" = 396,
    "HORIZONTAL_REEL_CONTAINER_X_IN_LANDSCAPE" = 1166,
    "HORIZONTAL_REEL_CONTAINER_Y_IN_LANDSCAPE" = 89,
    "HORIZONTAL_REEL_CONTAINER_SCALE_IN_LANDSCAPE" = 1,
    "HORIZONTAL_REEL_CONTAINER_SCALE_IN_PORTRAIT" = 0.88,
    "HORIZONTAL_REEL_CONTAINER_X_ANIM_IN_PORTRAIT" = 886,
    "LANDING_ANIM_HIDE_DURATION" = 1000,
    "HORIZONTAL_REEL_CONTAINER_Y_ANIM_IN_PORTRAIT" = 315,
    "REEL_POST_STOP_FEATURE_TIMER" = 1,
    "TIMERS" = 0,
    

}

export const constant = {
    configGame: {
        "landscapeCanvasWidth": 1920,
        "landscapeCanvasHeight": 1080,
        "portraitCanvasWidth": 1080,
        "portraitCanvasHeight": 1920,
        "canvasWidth": 1920,
        "canvasHeight": 1080,
        "fillWindow": false,
        "fullscreen": false,
        "fullscreenMode": "FULLSCREEN_MODE_AUTO_PREFER_HEIGHT",
        "centered": true,
        "loaderBarWidth": 682,
        "loaderBarHeight": 10,
        "loaderBarX": -25,
        "loaderBarY": 30.2,
        "loaderBarBGX": -27,
        "loaderBarBGY": 28,
        "loaderBarPortraitX": 10,
        "loaderBarPortraitY": -51,
        "loaderBarBGPortraitX": 10,
        "loaderBarBGPortraitY": -54,
        "showLoaderText": false,

    },
    reelgridConfig: {
        "LANDING_SYMBOL_ID_LIST": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        //  "LANDING_SYMBOL_ID_LIST" : [],
        "ANTICIPATION_SYMBOL_LIST": ["SC"],
        "ANTICIPATION_TRIGGERING_SYMBOL_MIN_COUNT": 3,
        "ANTICIPATION_TRIGGERING_SYMBOL_MAX_COUNT": 4,
    },
}


server.configGame.endpoint = "https://social-bridge-staging.gamesrvr.net/"
server.configGame.port = 0
server.configGame.method = "post"
server.configGame.postfixpath = "init?token=" + localStorage.getItem("playerId")
