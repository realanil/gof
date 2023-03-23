import React from "react";
import { objectTypes } from "../../../core/components/buttonpanel/interface/Ibuttons";


interface IframeworkCanvasMobileBet {
    data: {}

}
export const frameworkCanvasMobileBet: IframeworkCanvasMobileBet = {
    data:{
        "COMPONENTS":[
            {
                "id": "betContent",
                "name": "betContent",
                "type": "Container",
                "x": 37,
                "y": 81,
                "visible": true,
                "layout": true,
                "uimode": "mobile",
                "filterTypes": [],
                child: [
                    {
                        id: "Bet_Container1Mobile",
                        "name": "Bet_Container1Mobile",
                        "type": "Container",
                        "class": "",
                        "visible": true,
                        "x": 0,
                        "y": 0,
                        "width": 1920,
                        "height": 1080,
                        "filterTypes": [],
                        child: [
                            {
                                "id": "Bet_button",
                                "name": "Bet_button",
                                "type": "Text",
                                "x": 963,
                                "y": 160,
                                "visible": true,
                                "text": "menuText_5",
                                "width": 1150,
                                "anchor": [0.5, 0.5],
                                "scaleToFit": true,
                                "textStyle": {
                                    fontFamily: 'Helvetica',
                                    fontSize: 50,
                                    fontWeight: 'bold',
                                    fill: ['#ffffff'],
                                },
                                "parentLayer": "specialAnimationLayer",
                            },
                            {
                                "name": "bet_text_Bg_image",
                                "image": "bet_btn_p.png",
                                "type": "Image",
                                "anchor": [0.5, 0.5],
                                "visible": true,
                                "width": 466,
                                "height": 149,
                                "x": 918,
                                "y": 306,
                            },
                            {
                                "id": "bet_text",
                                "name": "bet_text",
                                "type": "Text",
                                "x": 902,
                                "y": 308,
                                "visible": true,
                                "text": "",
                                "anchor": [0.5, 0.5],
                                "width": 280,
                                "scaleToFit": true,
                                "textStyle": {
                                    fontFamily: 'Helvetica',
                                    fontSize: 52,
                                    fontWeight: 'normal',
                                    fill: ['#ffffff'],
                                },
                            },
                            {
                                "id": "countMinus",
                                "name": "countMinus",
                                "type": objectTypes.Sprite,
                                "interactive": false,
                                "width": 91,
                                "height": 94,
                                "x": 598,
                                "y": 304,
                                "textStyle": {
                                    fontFamily: 'Arial',
                                    fontSize: 48,
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    fill: ['#ffffff'],
                                },
                                "anchor": [0.5, 0.5],
                                "visible": true,
                                "buttonMode": true,
                                "buttonState": {
                                    up: 'minus_p.png',
                                    out: 'minus_p.png',
                                    down: 'minus_p.png',
                                    disable: 'minus_disable_p.png',
                                    enable: 'minus_p.png',
                                    hover: 'minus_p.png'
                                },
                                "hitareaVisible": false,
                                "shapeVisible": false,
                                "shape": {}
                            },
                            {
                                "id": "countPlus",
                                "name": "countPlus",
                                "type": objectTypes.Sprite,
                                "interactive": false,
                                "x": 1246,
                                "y": 304,
                                "width": 91,
                                "height": 94,
                                "textStyle": {
                                    fontFamily: 'Arial',
                                    fontSize: 48,
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    fill: ['#ffffff'],
                                },
                                "anchor": [0.5, 0.5],
                                "visible": true,
                                "buttonMode": true,
                                "buttonState": {
                                    up: 'plus_p.png',
                                    out: 'plus_p.png',
                                    down: 'plus_p.png',
                                    disable: 'plus_disable_p.png',
                                    enable: 'plus_p.png',
                                    hover: 'plus_p.png'
                                },
                                "hitareaVisible": false,
                                "shapeVisible": false,
                                "shape": {}
                            },

                            {
                                "id": "maxbetBtn",
                                "name": "maxbetBtn",
                                "type": objectTypes.Sprite,
                                "interactive": false,
                                "x": 1500,
                                "y": 304,
                                "width": 119,
                                "height": 119,
                                "textStyle": {
                                    fontFamily: 'Arial',
                                    fontSize: 48,
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    fill: ['#ffffff'],
                                },
                                "anchor": [0.5, 0.5],
                                "visible": true,
                                "buttonMode": true,
                                "buttonState": {
                                     up: 'max.png',
                                     out: 'max_disable.png',
                                    down: 'max_disable.png',
                                 /*    disable: 'plus_disable_p.png',
                                    enable: 'plus_p.png',
                                    hover: 'plus_p.png' */ 
                                },
                                "hitareaVisible": false,
                                "shapeVisible": false,
                                "shape": {}
                            },
                            {
                                "id": "MobileViewSettingPanelUI",
                                "name": "MobileViewSettingPanelUI",
                                "type": "Tag",
                                "class": "",
                                "parentLayer": "specialAnimationLayer",
                                "filterTypes": [],
                                child: []
                            },
                        ]

                    },
                ]
            },
        ]
    }
};
export const CanvasMobileBetConfigurationContext = React.createContext(
    {}
);