import React from "react";
import {configGame} from "../../../data/config"
import {Icomponent} from "../../../core/components/basegame/interface/Icomponent";

interface IframeworkHorizontalGridContainer {
    data: {
        "REEL_COLUMN": number,
        "REEL_WIDTH": number,
        "REEL_HEIGHT": number,
        "REEL_ROWS": number,
        "REEL_GAP": number,
        "SYMBOL_WIDTH": number,
        "SYMBOL_HEIGHT": number,
        "REEL_CONTAINER_X": number,
        "REEL_CONTAINER_Y": number,
        "HORIZONTAL_REEL_CONTAINER_X_IN_PORTRAIT": number,
        "HORIZONTAL_REEL_CONTAINER_Y_IN_PORTRAIT": number,
        "HORIZONTAL_REEL_CONTAINER_X_ANIM_IN_PORTRAIT": number,
        "HORIZONTAL_REEL_CONTAINER_Y_ANIM_IN_PORTRAIT": number,
        "HORIZONTAL_REEL_CONTAINER_SCALE_IN_PORTRAIT": number,
        "HORIZONTAL_REEL_CONTAINER_X_IN_LANDSCAPE": number,
        "HORIZONTAL_REEL_CONTAINER_Y_IN_LANDSCAPE": number,
        "HORIZONTAL_REEL_CONTAINER_SCALE_IN_LANDSCAPE": number,
        "child": Array<Icomponent>
    }

}

export const frameworkHorizontalGridContainer: IframeworkHorizontalGridContainer = {
    data: {
        "REEL_COLUMN": configGame.REEL_COLUMN,
        "REEL_WIDTH": configGame.REEL_WIDTH,
        "REEL_ROWS": configGame.REEL_ROWS,
        "REEL_GAP": configGame.REEL_GAP,
        "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
        "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
        "REEL_CONTAINER_X": configGame.HORIZONTAL_REEL_CONTAINER_X,
        "REEL_CONTAINER_Y": configGame.HORIZONTAL_REEL_CONTAINER_Y,
        "HORIZONTAL_REEL_CONTAINER_X_IN_PORTRAIT": configGame.HORIZONTAL_REEL_CONTAINER_X_IN_PORTRAIT,
        "HORIZONTAL_REEL_CONTAINER_Y_IN_PORTRAIT": configGame.HORIZONTAL_REEL_CONTAINER_Y_IN_PORTRAIT,
        "REEL_HEIGHT": configGame.REEL_HEIGHT,
        "HORIZONTAL_REEL_CONTAINER_SCALE_IN_PORTRAIT": configGame.HORIZONTAL_REEL_CONTAINER_SCALE_IN_PORTRAIT,
        "HORIZONTAL_REEL_CONTAINER_X_IN_LANDSCAPE": configGame.HORIZONTAL_REEL_CONTAINER_X_IN_LANDSCAPE,
        "HORIZONTAL_REEL_CONTAINER_Y_IN_LANDSCAPE": configGame.HORIZONTAL_REEL_CONTAINER_Y_IN_LANDSCAPE,
        "HORIZONTAL_REEL_CONTAINER_SCALE_IN_LANDSCAPE": configGame.HORIZONTAL_REEL_CONTAINER_SCALE_IN_LANDSCAPE,
        "HORIZONTAL_REEL_CONTAINER_X_ANIM_IN_PORTRAIT": configGame.HORIZONTAL_REEL_CONTAINER_X_ANIM_IN_PORTRAIT,
        "HORIZONTAL_REEL_CONTAINER_Y_ANIM_IN_PORTRAIT": configGame.HORIZONTAL_REEL_CONTAINER_Y_ANIM_IN_PORTRAIT,
        child: []
    }

};

export const HorizontalGridContainerConfigurationContext = React.createContext(
    {}
);