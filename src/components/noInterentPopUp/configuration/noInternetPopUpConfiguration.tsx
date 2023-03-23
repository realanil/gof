import React from "react";

import { Icomponent } from "../../../core/components/basegame/interface/Icomponent";


interface IframeworkNoInternetPopUp {
    data: {
        COMPONENTS: Icomponent[]
    }

}

export const frameworkNoInternetPopUp: IframeworkNoInternetPopUp = {

    data: {
        "COMPONENTS": [
            {
                "id": "noInternetPopUpContainerDesktop",
                "name": "noInternetPopUpContainerDesktop",
                "type": "Container",
                "class": "",
                "x": 0,
                "y": 0,
                "uimode": "desktop",
                "layout": false,
                "filterTypes": [],
                child: [
                    {
                        "id": "graphic_1",
                        "name": "graphic_1",
                        "type": "Graphic",
                        "shape": "rectangle",
                        "color": "0x000000",
                        "alpha": 0.89,
                        "x": 50,
                        "y": 465,
                        "width": 1800,
                        "height": 200,
                        "visible": true,
                        "scaleToFit": true,
                    },
                    {
                        "id": "graphic_2",
                        "name": "graphic_2",
                        "type": "Graphic",
                        "shape": "rectangle",
                        "color": "0xffffff",
                        "alpha": 0.89,
                        "x": 97,
                        "y": 544,
                        "width": 1700,
                        "height": 2,
                        "visible": true,
                        "scaleToFit": true,
                    },
                    {
                        "id": "graphic_3",
                        "name": "graphic_3",
                        "type": "Graphic",
                        "shape": "rectangle",
                        "color": "0xffffff",
                        "alpha": 0.89,
                        "x": 97,
                        "y": 612,
                        "width": 1700,
                        "height": 2,
                        "visible": true,
                        "scaleToFit": true,
                    },
                    {
                        "id": "noInternetPopUpText1",
                        "name": "noInternetPopUpText1",
                        "type": "Text",
                        "x": 933,
                        "y": 500,
                        "width": 100,
                        "height": 300,
                        "text": "noInternetPopUpText1",
                        "scaleToFit": true,
                        "visible": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 40,
                            fontWeight: 'bold',
                            fill: ['#f8f8ff'],
                        },
                    },
                    {
                        "id": "noInternetPopUpText2",
                        "name": "noInternetPopUpText2",
                        "type": "Text",
                        "x": 1000,
                        "y": 577,
                        "width": 1000,
                        "height": 300,
                        "text": "noInternetPopUpText2",
                        "scaleToFit": true,
                        "visible": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 200,
                            fontWeight: 'bold',
                            fill: ['#f8f8ff'],
                        },
                    },
                ]
            },

            {
                "id": "noInternetPopUpContainerMobile",
                "name": "noInternetPopUpContainerMobile",
                "type": "Container",
                "class": "",
                "x": 0,
                "y": 0,
                "uimode": "mobile",
                "layout": true,
                "visible": true,
                "filterTypes": [],
                child: [
                    {
                        "id": "graphic_1",
                        "name": "graphic_1",
                        "type": "Graphic",
                        "shape": "rectangle",
                        "color": "0x000000",
                        "alpha": 0.89,
                        "x": 50,
                        "y": 465,
                        "width": 1800,
                        "height": 200,
                        "visible": true,
                        "scaleToFit": true,
                    },
                    {
                        "id": "graphic_2",
                        "name": "graphic_2",
                        "type": "Graphic",
                        "shape": "rectangle",
                        "color": "0xffffff",
                        "alpha": 0.89,
                        "x": 97,
                        "y": 544,
                        "width": 1700,
                        "height": 2,
                        "visible": true,
                        "scaleToFit": true,
                    },
                    {
                        "id": "graphic_3",
                        "name": "graphic_3",
                        "type": "Graphic",
                        "shape": "rectangle",
                        "color": "0xffffff",
                        "alpha": 0.89,
                        "x": 97,
                        "y": 612,
                        "width": 1700,
                        "height": 2,
                        "visible": true,
                        "scaleToFit": true,
                    },
                    {
                        "id": "noInternetPopUpText1",
                        "name": "noInternetPopUpText1",
                        "type": "Text",
                        "x": 933,
                        "y": 500,
                        "width": 100,
                        "height": 300,
                        "text": "noInternetPopUpText1",
                        "scaleToFit": true,
                        "visible": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 40,
                            fontWeight: 'bold',
                            fill: ['#f8f8ff'],
                        },
                    },
                    {
                        "id": "noInternetPopUpText2",
                        "name": "noInternetPopUpText2",
                        "type": "Text",
                        "x": 1000,
                        "y": 577,
                        "width": 1000,
                        "height": 300,
                        "text": "noInternetPopUpText2",
                        "scaleToFit": true,
                        "visible": true,
                        "anchor": [0.5, 0.5],
                        "textStyle": {
                            fontFamily: 'Arial',
                            fontSize: 200,
                            fontWeight: 'bold',
                            fill: ['#f8f8ff'],
                        },
                    },
                ]
            },
        ],
    }
};

export const NoInternetPopUpConfigurationContext = React.createContext(
    {}
);