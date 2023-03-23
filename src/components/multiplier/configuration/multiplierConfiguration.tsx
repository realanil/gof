import React from "react";

import { Icomponent } from "../../../core/components/basegame/interface/Icomponent";


interface IframeworkMultiplier {
    data: {
        COMPONENTS: Icomponent[]
    }

}

export const frameworkMultiplier: IframeworkMultiplier = {

    data: {
        "COMPONENTS": [
            {
                "id": "desktopMainContainer",
                "name": "desktopMainContainer",
                "type": "Container",
                "class": "",
                "x": 0,
                "y": 0,
                "layout": false,
                "uimode": "desktop",
                "filterTypes": [],
                "parentLayer": "baseLayer",
                child: [
                    {
                        "id": "multiplierText_desktop",
                        "name": "multiplierText_desktop",
                        "type": "BitMapText",
                        "x": 1807,
                        "y": 502,
                        // "height": 100,
                        "width": 440,
                        "text": "",
                        visible: true,
                        "scaleToFit": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            font: '14x multiplier_num-export',
                        },
                    },
                    {
                        "name": "blastAnimation",
                        "type": "Animation",
                        "width": 147,
                        "height": 199,
                        "image": "blastAnim",
                        "parentLayer": "specialAnimationLayer",
                        "animationSpeed": 0.3,
                        "playing": false,
                        "loop": false,
                        "visible": false,
                        "anchor": [0.5, 0.5],
                        "x": 1780,
                        "y": 449,
                        "animations": {
                            "anim": "blastAnim",
                            //"blast": "FG_torchFlame"
                        },
                    },

                    {
                        "name": "multiplierGraphicDesktop",
                        "image": "multiplierBgImage",
                        "type": "Image",
                        "class": "",
                        "anchor": [0.5, 0.5],
                        "visible": false,
                        "width": 960,
                        "height": 248,
                        "x": 956,
                        "y": 540,
                    },

                    {
                        "id": "multiplierBigText_desktop",
                        "name": "multiplierBigText_desktop",
                        "type": "BitMapText",
                        "x": 956,
                        "y": 681,
                        // "height": 100,
                        "width": 1600,
                        "text": "",
                        visible: true,
                        "scaleToFit": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            font: '50x big_num_digit-export',
                        },
                    },
                ]
            },
            {
                "id": "mobileMainContainer",
                "name": "mobileMainContainer",
                "type": "Container",
                "class": "",
                "x": 0,
                "y": 0,
                "layout": true,
                "uimode": "mobile",
                "filterTypes": [],
                "parentLayer": "baseLayer",
                child: [
                    {
                        "id": "multiplierText_mobile",
                        "name": "multiplierText_mobile",
                        "type": "BitMapText",
                        "x": 1807,
                        "y": 502,
                        "width": 440,
                        "text": "",
                        visible: true,
                        "scaleToFit": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            font: '14x multiplier_num-export'
                        },
                    },
                    {
                        "name": "blastAnimation_mobile",
                        "type": "Animation",
                        "width": 147,
                        "height": 199,
                        "image": "blastAnim",
                        "parentLayer": "specialAnimationLayer",
                        "animationSpeed": 0.3,
                        "playing": false,
                        "loop": false,
                        "visible": false,
                        "anchor": [0.5, 0.5],
                        "x": 1780,
                        "y": 449,
                        "animations": {
                            "anim": "blastAnim",
                        },
                    },
                ]
            },

            {
                "id": "mobileBigTextContainer",
                "name": "mobileBigTextContainer",
                "type": "Container",
                "class": "",
                "x": 340,
                "y": 337,
                "layout": true,
                "uimode": "mobile",
                "filterTypes": [],
                "parentLayer": "baseLayer",
                child: [
                    {
                        "name": "multiplierGraphicMobile",
                        "image": "multiplierBgImage",
                        "type": "Image",
                        "class": "",
                        "anchor": [0.5, 0.5],
                        "visible": false,
                        "width": 960,
                        "height": 248,
                        "x": 647,
                        "y": 247,
                    },
                    {
                        "id": "multiplierBigText_mobile",
                        "name": "multiplierBigText_mobile",
                        "type": "BitMapText",
                        "x": 600,
                        "y": 372,
                        // "height": 100,
                        "width": 1600,
                        "text": "",
                        visible: true,
                        "scaleToFit": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            font: '50x big_num_digit-export',
                        },
                    },
                ]
            }
        ],
    }
};

export const MultiplierConfigurationContext = React.createContext(
    {}
);