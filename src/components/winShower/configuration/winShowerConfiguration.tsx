import React from "react";


interface IframeworkWinShower {
    data: {}
}

export const frameworkWinShower: IframeworkWinShower = {
    data: {
        "COMPONENTS": [
            {
                "name": "winShowerGhaphic",
                "type": "Graphic",
                "shape": "rectangle",
                "visible": true,
                "alpha": 0.01,
                "color": "0x000000",
                "x": 0,
                "y": 0,
                "width": 1920,
                "height": 1080,
            },
            {
                "id": "winShower_Container_desktop",
                "name": "winShower_Container_desktop",
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
                "id": "winShower_Container_mobile",
                "name": "winShower_Container_mobile",
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
                "image": "coinsJson",
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
                "name": "amount_tickup_desktop",
                "type": "NumberText",
                "x": 955,
                "y": 620,
                "layout": false,
                "uimode": "desktop",
                "width": 1000,
                "scaleToFit": true,
                "text": "",
                "value": 0,
                "textType": "BitMapText",
                "visible": false,
                "prefix": "",
                "postfix": "",
                "anchor": [0.5, 0.5],
                "numberaddup": false,
                "skiptickup": false,
                "runonvalue": false,
                "tickupvalue": 1000,
                "tickupspeed": 32,
                "tickuptime": 600,
                "decimaldigit": 0,
                "textStyle": {
                    font: '90px celebration_win_num-export',
                    letterSpacing: 10
                },
                "parentLayer": "specialAnimationLayer",
            },
            {
                "id": "Text_1",
                "name": "amount_tickup_mobile",
                "type": "NumberText",
                "x": 920,
                "y": 618,
                "layout": true,
                "uimode": "mobile",
                "width": 1000,
                "scaleToFit": true,
                "visible": false,
                "text": "",
                "value": 0,
                "textType": "BitMapText",
                "prefix": "",
                "postfix": "",
                "anchor": [0.5, 0.5],
                "numberaddup": false,
                "skiptickup": false,
                "runonvalue": false,
                "tickupvalue": 1000,
                "tickupspeed": 32,
                "tickuptime": 600,
                "decimaldigit": 0,
                "textStyle": {
                    font: '90px celebration_win_num-export',
                    letterSpacing: 10
                },
                "parentLayer": "specialAnimationLayer",
            },
        ],
    }

};
export const winShowerConfigurationContext = React.createContext(
    {}
);