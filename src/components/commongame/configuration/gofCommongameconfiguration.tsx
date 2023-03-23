import {frameworkCommonGame} from "../../../core/components/commongame/configuration/commongameconfiguration"
import {commongameAssetConfig} from "../../../data/commongame/index";

frameworkCommonGame.data = {

    "COMPONENTS": [
        {
            "id": "BMCommonGameContainer",
            "name": "BMCommonGameContainer",
            "type": "Container",
            "class": "",
            "x": 0,
            "y": 0,
            "filterTypes": [],
            "parentLayer": "baseLayer",
            child: [
                {
                    "id": "BMCommonGameComponent",
                    "name": "GofCommonGame",
                    "type": "Tag",
                    "class": "",
                    "filterTypes": [],
                    child: [
                        {
                            "name": "image_basegameSky-bg_desktop",
                            "image": "baseGameBgSkyImage",
                            "type": "Image",
                            "class": "",
                            "layout": false,
                            "uimode": "desktop",
                            "visible": true,
                            "width": 1920,
                            "height": 573,
                            "x": 0,
                            "y": 0
                        },
                        {
                            "name": "image_basegameSky-bg_mobile",
                            "image": "baseGameBgSkyImage",
                            "type": "Image",
                            "class": "",
                            "layout": true,
                            "uimode": "mobile",
                            "visible": false,
                            "width": 1920,
                            "height": 573,
                            "x": 0,
                            "y": 0
                        },
                        {
                            "name": "image_cloud_a_desktop",
                            "image": "cloudImage_a",
                            "type": "Image",
                            "class": "",
                            "layout": false,
                            "uimode": "desktop",
                            "visible": true,
                            "width": 665,
                            "height": 205,
                            "x": -46,
                            "y": 0
                        },
                        {
                            "name": "image_cloud_b_desktop",
                            "image": "cloudImage_b",
                            "type": "Image",
                            "class": "",
                            "layout": false,
                            "uimode": "desktop",
                            "visible": true,
                            "width": 665,
                            "height": 251,
                            "x": 1065,
                            "y": 0
                        },
                        {
                            "name": "image_cloud_a_mobile",
                            "image": "cloudImage_a",
                            "type": "Image",
                            "class": "",
                            "layout": true,
                            "uimode": "mobile",
                            "visible": true,
                            "width": 665,
                            "height": 205,
                            "x": -46,
                            "y": 0
                        },
                        {
                            "name": "image_cloud_b_mobile",
                            "image": "cloudImage_b",
                            "type": "Image",
                            "class": "",
                            "layout": true,
                            "uimode": "mobile",
                            "visible": true,
                            "width": 665,
                            "height": 251,
                            "x": 1065,
                            "y": 0
                        },

                        {
                            "name": "image_basegame-bg",
                            "image": "baseGameBgImage",
                            "type": "Image",
                            "class": "",
                            "layout": false,
                            "uimode": "desktop",
                            "visible": true,
                            "width": 1920,
                            "height": 1080,
                            "x": 0,
                            "y": 0
                        },
                        {
                            "name": "image_basegame-bg1",
                            "image": "baseGameBgImage",
                            "type": "Image",
                            "class": "",
                            "layout": true,
                            "uimode": "mobile",
                            "layoutMode": "landscape",
                            "visible": false,
                            "width": 1920,
                            "height": 1080,
                            "x": 0,
                            "y": 0
                        },

                        {
                            "name": "image_freegameTop-fg_desktop",
                            "image": "freeGameBgTopImage",
                            "type": "Image",
                            "class": "",
                            "uimode": "desktop",
                            "visible": false,
                            "width": 1920,
                            "height": 520,
                            "x": 0,
                            "y": 0
                        },


                        {
                            "name": "image_freegame-fg",
                            "image": "freeGameBgImage",
                            "type": "Image",
                            "class": "",
                            "layout": true,
                            "uimode": "desktop",
                            "visible": false,
                            "width": 1922,
                            "height": 1082,
                            "x": 0,
                            "y": 0
                        },
                        {
                            "name": "image_freegameTop-fg_mobile",
                            "image": "freeGameBgTopImage",
                            "type": "Image",
                            "class": "",
                            "layout": true,
                            "uimode": "mobile",
                            "layoutMode": "landscape",
                            "visible": false,
                            "width": 1922,
                            "height": 520,
                            "x": 0,
                            "y": 0
                        },

                        {
                            "name": "image_freegame-fg1",
                            "image": "freeGameBgImage",
                            "type": "Image",
                            "class": "",
                            "layout": true,
                            "uimode": "mobile",
                            "layoutMode": "landscape",
                            "visible": false,
                            "width": 1922,
                            "height": 1082,
                            "x": 0,
                            "y": 0
                        },

                        {
                            "name": "image_commongame-potrait-bg",
                            "image": "commongamePotraitBG",
                            "layout": true,
                            "type": "Image",
                            "uimode": "mobile",
                            "class": "",
                            "anchor": [0.5, 0.5],
                            "visible": false,
                            "x": 540,
                            "y": 960,
                            "width": 1080,
                            "height": 1920
                        },
                        {
                            "name": "image_commongame-potrait-fg",
                            "image": "commongamePotraitFG",
                            "layout": true,
                            "type": "Image",
                            "uimode": "mobile",
                            "class": "",
                            "anchor": [0.5, 0.5],
                            "visible": false,
                            "x": 540,
                            "y": 960,
                            "width": 1080,
                            "height": 1920
                        },
                        {
                            "id": "WalletResponseTracker",
                            "name": "WalletResponseTracker",
                            "type": "Tag",
                            "class": "",
                            "filterTypes": [],
                            child: []
                        },
                    ]
                }
            ]
        }
    ]

}