import React from "react";

import { configGame } from "../../../data/config"


interface IframeworkReels {
    data: {
        "GRID_COLUMN": number,
        "GRID_WIDTH": number,
        "GRID_ROWS": number,
        "SPIN_TYPE": number,
        "GRID_GAP": number,
        "SYMBOL_WIDTH": number,
        "SYMBOL_HEIGHT": number,


        "createPosition": {
            "x": number,
            "y": number
        },
        "endPosition": {
            "x": number,
            "y": number
        },


        "singlePositionDropDuration": number,
        "blastDuration": number,
        "dropAfterBlastDuration": number,
        "singlePositionDropDurationInTurboMode": number,
        "delayDropDuration": number,
        "delayDropDurationInTurboMode": number,
        "delayInSymbolAnimationPlay": number,
        "staggerColumnDelay": number,
        "staggerDropDelay": number,
        "gridPositionIds": any,
        "gridPositions": any,
    }

}

export const frameworkGrids: IframeworkReels = {
    data: {
        "GRID_COLUMN": configGame.REEL_COLUMN,
        "GRID_WIDTH": configGame.REEL_WIDTH,
        "SPIN_TYPE": configGame.SPIN_TYPE,
        "GRID_ROWS": 4,
        "GRID_GAP": configGame.REEL_GAP,
        "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
        "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
        "staggerDropDelay": 100,
        "staggerColumnDelay": 180,
        "singlePositionDropDuration": 200,
        "dropAfterBlastDuration": 500,
        "blastDuration": 2200,
        "singlePositionDropDurationInTurboMode": 100,
        "delayDropDuration": 500,
        "delayInSymbolAnimationPlay": 700,
        "delayDropDurationInTurboMode": 180,
        "createPosition": {
            "x": 0,
            "y": -2080
        },
        "endPosition": {
            "x": 206,
            "y": 1200
        },
        "gridPositionIds": [4, 3, 2, 1, 0],
        "gridPositions": [


            {
                "x": 206,
                "y": 618
            },
            {
                "x": 206,
                "y": 412
            },
            {
                "x": 206,
                "y": 206
            },
            {
                "x": 206,
                "y": 0
            }
        ]


    }


};

export const HorizontalGridsConfigurationContext = React.createContext(
    {}
);