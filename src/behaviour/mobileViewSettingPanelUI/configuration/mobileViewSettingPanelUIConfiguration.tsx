import React from "react";
import { objectTypes } from "../../../core/components/buttonpanel/interface/Ibuttons";


interface IframeworkMobileViewSettingPanelUI {
    data: {}
}

export const frameworkMobileViewSettingPanelUI: IframeworkMobileViewSettingPanelUI = {

    data: {
        "COMPONENTS": [
            {
                "id": "musicRadioButtonMobileOff",
                "name": "musicRadioButtonMobileOff",
                "type": objectTypes.Sprite,
                "uimode": "mobile",
                "buttonMode": true,
                "interactive": true,
                "layout": true,
                "anchor": [0.5, 0.5],
                "visible": true,
                "x": 0,
                "y": 0,
                "width": 150,
                "height": 50,
                "buttonState": {
                    up: 'landradio_btn_off.png',
                    out: 'landradio_btn_off.png',
                    down: 'landradio_btn_off.png',
                    disable: 'landradio_btn_off.png',
                    enable: 'landradio_btn_off.png',
                    hover: 'landradio_btn_off.png'
                },
                "hitareaVisible": false,
                "shapeVisible": false,
                "shape": {}
            },
            {
                "id": "musicRadioButtonMobileOn",
                "name": "musicRadioButtonMobileOn",
                "type": objectTypes.Sprite,
                "uimode": "mobile",
                "buttonMode": true,
                "interactive": true,
                "layout": true,
                "anchor": [0.5, 0.5],
                "visible": true,
                "x": 0,
                "y": 0,
                "width": 150,
                "height": 50,
                "buttonState": {
                    up: 'landradio_btn_on.png',
                    out: 'landradio_btn_on.png',
                    down: 'landradio_btn_on.png',
                    disable: 'landradio_btn_on.png',
                    enable: 'landradio_btn_on.png',
                    hover: 'landradio_btn_on.png'
                },
                "hitareaVisible": false,
                "shapeVisible": false,
                "shape": {}
            },
            {
                "id": "musicRadioButtonMobileDisable",
                "name": "musicRadioButtonMobileDisable",
                "type": objectTypes.Sprite,
                "uimode": "mobile",
                "buttonMode": true,
                "interactive": true,
                "layout": true,
                "anchor": [0.5, 0.5],
                "visible": true,
                "x": 0,
                "y": 0,
                "width": 150,
                "height": 50,
                "buttonState": {
                    up: 'landradio_btn_disable.png',
                },
                "hitareaVisible": false,
                "shapeVisible": false,
                "shape": {}
            },
        
            {
                "id": "showIntroScreenRadioButtonMobileOff",
                "name": "showIntroScreenRadioButtonMobileOff",
                "type": objectTypes.Sprite,
                "uimode": "mobile",
                "layout": true,
                "visible": true,
                "buttonMode": true,
                "interactive": true,
                "x": 0,
                "y": 0,
                "width": 150,
                "height": 50,
                "buttonState": {
                    up: 'landradio_btn_off.png',
                    out: 'landradio_btn_off.png',
                    down: 'landradio_btn_off.png',
                    disable: 'landradio_btn_off.png',
                    enable: 'landradio_btn_off.png',
                    hover: 'landradio_btn_off.png'
                },
                "hitareaVisible": false,
                "shapeVisible": false,
                "shape": {}
            },
            {
                "id": "showIntroScreenRadioButtonMobileOn",
                "name": "showIntroScreenRadioButtonMobileOn",
                "type": objectTypes.Sprite,
                "uimode": "mobile",
                "layout": true,
                "visible": true,
                "buttonMode": true,
                "interactive": true,
                "x": 0,
                "y": 0,
                "width": 150,
                "height": 50,
                "buttonState": {
                    up: 'landradio_btn_on.png',
                    out: 'landradio_btn_on.png',
                    down: 'landradio_btn_on.png',
                    disable: 'landradio_btn_on.png',
                    enable: 'landradio_btn_on.png',
                    hover: 'landradio_btn_on.png'
                },
            },
            {
                "id": "musicTextMobile",
                "name": "musicTextMobile",
                "type": "Text",
                "x": 0,
                "y": 0,
                "width": 800,
                "layout": true,
                "uimode": "mobile",
                "visible": true,
                "text": "desktopSettingPanel_Text_5",
                "scaleToFit": true,
                "anchor": [0, 0.5],
                "textStyle": {
                    fontFamily: 'Arial',
                    fontSize: 48,
                    fill: '#ffffff',
                },
            },
            {
                "id": "showIntroScreenTextMobile",
                "name": "showIntroScreenTextMobile",
                "type": "Text",
                "x": 0,
                "y": 0,
                "width": 800,
                "visible": true,
                "layout": true,
                "uimode": "mobile",
                "text": "desktopSettingPanel_Text_2",
                "scaleToFit": true,
                "anchor": [0, 0.5],
                "textStyle": {
                    fontFamily: 'Arial',
                    fontSize: 48,
                    fill: '#ffffff',
                },
            },
            {
                "id": "bottomSpritLineMobile",
                "name": "bottomSpritLineMobile",
                "image": "landhorizontal_line.png",
                "type": "Image",
                "uimode": "mobile",
                "layout": true,
                "visible": true,
                "x": 0,
                "y": 0,
                "width": 1920,
                "height": 4,
            },
            {
                "id": "mobile_turboSpinText",
                "name": "mobile_turboSpinText",
                "type": "Text",
                "x": 0,
                "y": 0,
                "width": 800,
                "visible": true,
                "layout": true,
                "text": "desktopSettingPanel_Text_8",
                "scaleToFit": true,
                "anchor": [0, 0.5],
                "textStyle": {
                    fontFamily: 'Arial',
                    fontSize: 48,
                    fill: '#ffffff',
                },
            },
           
            {
                "id": "mobile_turboSpinRadioButtonOff",
                "name": "mobile_turboSpinRadioButtonOff",
                "type": objectTypes.Sprite,
                "interactive": true,
                "width": 150,
                "height": 50,
                "x": 0,
                "y": 0,
                "text": "",
                "anchor": [0.5, 0.5],
                "visible": false,
                "buttonMode": true,
                "layout": true,
                "buttonState": {
                    up: 'landradio_btn_off.png',
                    out: 'landradio_btn_off.png',
                    down: 'landradio_btn_off.png',
                    disable: 'landradio_btn_off.png',
                    enable: 'landradio_btn_off.png',
                    hover: 'landradio_btn_off.png'
                },
                "hitareaVisible": false,
                "shapeVisible": false,
                "shape": {}
            },
            {
                "id": "mobile_turboSpinRadioButtonOn",
                "name": "mobile_turboSpinRadioButtonOn",
                "type": objectTypes.Sprite,
                "interactive": true,
                "width": 150,
                "height": 50,
                "x": 0,
                "y": 0,
                "text": "",
                "anchor": [0.5, 0.5],
                "layout": true,
                "visible": false,
                "buttonMode": true,
                "buttonState": {
                    up: 'landradio_btn_on.png',
                    out: 'landradio_btn_on.png',
                    down: 'landradio_btn_on.png',
                    disable: 'landradio_btn_on.png',
                    enable: 'landradio_btn_on.png',
                    hover: 'landradio_btn_on.png'
                },
                "hitareaVisible": false,
                "shapeVisible": false,
                "shape": {}
            },
  
            {
                "id": "turboSpinRadioButtonMobDisable",
                "name": "turboSpinRadioButtonMobDisable",
                "type": objectTypes.Sprite,
                "interactive": true,
                "width": 150,
                "height": 50,
                "x": 0,
                "y": 0,
                "text": "",
                "anchor": [0.5, 0.5],
                "visible": false,
                "buttonMode": true,
                "layout": true,
                "buttonState": {
                    up: 'landradio_btn_disable.png',
                },
                "hitareaVisible": false,
                "shapeVisible": false,
                "shape": {}
            },
            {
                "id": "mobile_settingHeading",
                "name": "mobile_settingHeading",
                "type": "Text",
                "x": 0,
                "y": 0,
                "width": 1000,
                "visible": true,
                "text": "desktopSettingPanel_Text_1",
                "layout": true,
                "uimode": "mobile",
                "scaleToFit": true,
                "anchor": [0.5, 0.5],
                "textStyle": {
                    fontFamily: 'Arial',
                    fontSize: 52,
                    fontWeight: 'bold',
                    fill: '#ffffff',
                },
            },

        ]
    }
};

export const MobileViewSettingPanelUIConfigurationContext = React.createContext(
    {}
);

