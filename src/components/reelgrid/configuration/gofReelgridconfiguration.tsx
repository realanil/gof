import { frameworkReelGrid } from "../../../core/components/reelgrid/configuration/reelgridconfiguration";
import { configGame, constant } from "../../../data/config";

frameworkReelGrid.data = {
    "REEL_COLUMN": configGame.REEL_COLUMN,
    "REEL_WIDTH": configGame.REEL_WIDTH,
    "REEL_ROWS": configGame.REEL_ROWS,
    "REEL_GAP": configGame.REEL_GAP,
    "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
    "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
    "LANDING_SYMBOL_ID_LIST": constant.reelgridConfig.LANDING_SYMBOL_ID_LIST,
    "REEL_BLUR": false,
    "staggerDropDelay": 180,
    "staggerColumnDelay": 180,
    "singlePositionDropDuration": 80,
    "delayDropDuration": 200,
    "createPosition": {
        "x": 64,
        "y": -104
    },
    "endPosition": {
        "x": 64,
        "y": 764
    },
    "gridPositionIds": [4, 3, 2, 1, 0],
    "gridPositions": [
        {
            "x": 64,
            "y": 504
        },
        {
            "x": 64,
            "y": 394
        },
        {
            "x": 64,
            "y": 284
        },
        {
            "x": 64,
            "y": 174
        },
        {
            "x": 64,
            "y": 64
        }
    ],
    "WOBBLE_HEIGHT": [50, 50, 50, 50, 50, 50, 50],
    "WOBBLE_SPEED": [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
    "CURRENT_WOBBLE_HEIGHT": [0, 0, 0, 0, 0, 0, 0],
    "WIND_SPEED": [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
    "WIND_HEIGHT": [10, 10, 10, 10, 10, 10, 10],
    "SYMBOL_NUMBER_OFFSET": [0, 0, 0, 0, 0, 0, 0],
    "REEL_STOP_DIFFERENCE": [4, 4, 4, 4, 4, 4, 4],
    "SPIN_SYMBOL_COUNT": [0, 0, 0, 0, 0, 0, 0],
    "SYMBOL_IN_VIEW_COUNT": [8, 8, 8, 8, 8, 8, 8],
    "SPIN_SYMBOL_LENGTH": [9, 9, 9, 9, 9, 9, 9],
    "TURBO_SPIN_SYMBOL_LENGTH": [9, 9, 9, 9, 9, 9, 9],
    "ANTICIPATION_SYMBOL_LENGTH": [45, 45, 45, 45, 45, 45, 45],
    "FPS": [60, 60, 60, 60, 60, 60, 60],
    "FPS_INTERVAL": [30, 30, 30, 30, 30, 30, 30],
    "FRAME_COUNT": [30, 30, 30, 30, 30, 30, 30],
    "START_TIME": [30, 30, 30, 30, 30, 30, 30],
    "NOW": [30, 30, 30, 30, 30, 30, 30],
    "THEN": [30, 30, 30, 30, 30, 30, 30],
    "SPIN_SPEED": [4, 4, 4, 4, 4, 4],
    "ANTICIPATION_SPIN_SPEED": [4, 4, 4, 4, 4, 4],
    "Y_OFFSET": [0, 0, 0, 0, 0, 0, 0],
    "TURBO": [false, false, false, false, false, false, false],
    "STOP_TICK": [false, false, false, false, false, false, false],
    "ELAPSED": [0, 0, 0, 0, 0, 0, 0],
    "STOPABLE": [false, false, false, false, false, false],
    "SYMBOLS_BETWEEN_STOP": [1, 2, 3, 4, 5, 6, 7],
    "SPINNING": [false, false, false, false, false, false, false],
    "ENABLED": [false, false, false, false, false, false, false],

    "SYMBOL_HEIGHT_MAPPING_LIST": [
        { symbolOnReel: 2, height: 308 },
        { symbolOnReel: 3, height: 206 },
        { symbolOnReel: 4, height: 154 },
        { symbolOnReel: 5, height: 124 },
        { symbolOnReel: 6, height: 104 },
        { symbolOnReel: 7, height: 88 },
    ],
    "TIMERS": [0],
    "REELSTIMERS": [0],
    "REELSTIMERSFORSLAM": [0],
    "REELSNO": -1,

}