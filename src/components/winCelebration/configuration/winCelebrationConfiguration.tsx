import React from "react";
import {winCelebrationAssetConfig} from "../../../data/winCelebration"


interface IframeworkWinCelebration {
    data: {}
}

export const frameworkWinCelebration: IframeworkWinCelebration = {
    data: {
        "COMPONENTS": [
            {
                "name": "winCelebration_Graphic",
                "type": "Graphic",
                "shape": "rectangle",
                "visible": true,
                "alpha": 0.9,
                "color": "0x000000",
                "x": 0,
                "y": 0,
                "width": 1920,
                "height": 1080,

            },


            {
                "id": "bgSpine_desktop",
                "name": "bgSpine",
                "type": "Spine",
                "x": 932,
                "y": 550,
                "width": 1623.12,
                "height": 1033.07,
                "layout": false,
                "uimode": "desktop",
                "visible": true,
                "anchor": [0, 0],
                "spinedata": {
                    "spinename": "bgRaysJson",
                    "animationname": "animation",
                    "loop": true,
                    "timeScale": 0.9

                },
                "parentLayer": "specialAnimationLayer",
            },
            {
                "id": "bgSpine",
                "name": "bgSpine_mobile",
                "type": "Spine",
                "x": 932,
                "y": 600,
                "width": 1623.12,
                "height": 1033.07,
                "layout": true,
                "uimode": "mobile",
                "visible": true,
                "anchor": [0, 0],
                "spinedata": {
                    "spinename": "bgRaysJson",
                    "animationname": "animation",
                    "loop": true,
                    "timeScale": 0.9

                },
                "parentLayer": "specialAnimationLayer",
            },

            {
                "id": "winCelebration_Container_desktop",
                "name": "winCelebration_Container_desktop",
                "type": "Container",
                "class": "",
                "x": 0,
                "y": 0,
                "layout": false,
                "uimode": "desktop",
                "filterTypes": [],
                "parentLayer": "baseLayer",
                child: []
            },

            {
                "id": "winCelebration_Container_mobile",
                "name": "winCelebration_Container_mobile",
                "type": "Container",
                "class": "",
                "x": 0,
                "y": 0,
                "layout": true,
                "uimode": "mobile",
                "filterTypes": [],
                "parentLayer": "baseLayer",
                child: []
            },
            {
                "name": "coins_Anim",
                "type": "Animation",
                "width": 300,
                "height": 300,
                "image": winCelebrationAssetConfig["coinsJson"],
                "parentLayer": "specialAnimationLayer",
                "animationSpeed": 0.4,
                "playing": true,
                "loop": true,
                "visible": false,
                "anchor": [0.5, 0.5],
                "x": 100,
                "y": 540,
                "animations": {
                    "anim": "coinsJson",
                },
            },

            {
                "id": "Text_1",
                "name": "Text_amount_tickup_desktop",
                "type": "NumberText",
                "x": 930,
                "y": 680,
                "layout": false,
                "uimode": "desktop",
                "width": 1000,
                "scaleToFit": true,
                "text": "",
                "visible":true,
                "value": 0,
                "textType": "BitMapText",
                "prefix": "",
                "postfix": "",
                "anchor": [0.5, 0.5],
                "numberaddup": false,
                "skiptickup": false,
                "runonvalue": false,
                "tickupvalue": 1000,
                "tickupspeed": 12,
                "tickuptime": 25000,
                "decimaldigit": 2,
                "textStyle": {
                    font: '90px celebration_win_num-export',
                    letterSpacing: 10
                },
                "parentLayer": "specialAnimationLayer",
            },
            {
                "id": "Text_1",
                "name": "Text_amount_tickup_mobile",
                "type": "NumberText",
                "x": 920,
                "y": 680,
                "layout": true,
                "uimode": "mobile",
                "width": 1000,
                "scaleToFit": true,
                "text": "",
                "visible":true,
                "value": 0,
                "textType": "BitMapText",
                "prefix": "",
                "postfix": "",
                "anchor": [0.5, 0.5],
                "numberaddup": false,
                "skiptickup": false,
                "runonvalue": false,
                "tickupvalue": 1000,
                "tickupspeed": 12,
                "tickuptime": 25000,
                "decimaldigit": 2,
                "textStyle": {
                    font: '90px celebration_win_num-export',
                    letterSpacing: 10
                },
                "parentLayer": "specialAnimationLayer",
            },
            {
                "id": "BitMapText_1",
                "name": "text_WinCelebration_label_desktop",
                "type": "BitMapText",
                "x": 940,
                "y": 455,
                "layout": false,
                "uimode": "desktop",
                "text": "",
                "scaleToFit": false,
                "textStyle": {
                    font: '30px num_1-export',
                    letterSpacing: 0

                },
            },
            {
                "id": "BitMapText_2",
                "name": "text_WinCelebration_label_mobile",
                "type": "BitMapText",
                "x": 940,
                "y": 455,
                "layout": true,
                "uimode": "mobile",
                "width": 700,
                "text": "",
                "scaleToFit": true,
                "textStyle": {
                    font: '30px num_1-export'
                },
            },
            {
                "id": "BitMapText_3",
                "name": "text_WinCelebration_label_mobile_portrait",
                "type": "BitMapText",
                "x": 551,
                "y": 633,
                "layout": true,
                "uimode": "mobile",
                "width": 700,
                "text": "",
                "scaleToFit": true,
                "textStyle": {
                    font: '20px num_1-export'
                },
            },

        ],
    }

};
export const winCelebrationConfigurationContext = React.createContext(
    {}
);