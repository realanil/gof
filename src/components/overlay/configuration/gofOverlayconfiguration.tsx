import { frameworkOverlay } from "../../../core/components/overlay/configuration/overlayconfiguration"

frameworkOverlay.data = {

    "COMPONENTS": [
        {
            "id": "overlayGenericUIContainer",
            "name": "overlayGenericUIContainer",
            "type": "Container",
            "class": "",
            "x": 0,
            "y": 0,
            "filterTypes": [],
            "parentLayer": "baseLayer",
            child: [
                {
                    "id": "overlayGenericUIComponent",
                    "name": "OverlayGenericUI",
                    "type": "Tag",
                    "class": "",
                    "filterTypes": [],
                    child: [
                        {
                            "name": "common_bgGraphic",
                            "type": "Graphic",
                            "shape": "rectangle",
                            "visible": false,
                            "alpha": 0.92,
                            "color": "0x000000",
                            "x": 0,
                            "y": 0,
                            "width": 1920,
                            "height": 1080,

                        },

                        {
                            "name": "common_autoBgImage",
                            "image": "autoplayBgImage",
                            "type": "Image",
                            "class": "",
                            "visible": false,
                            "width": 1252,
                            "height": 802,
                            "x": 334,
                            "y": 134,
                        },
                        {
                            "id": "canvasAutoplayTag",
                            "name": "CanvasAutoplay",
                            "type": "Tag",
                            "class": "",
                            "parentLayer": "specialAnimationLayer",
                            "filterTypes": [],
                            child: []
                        },
                        {
                            "id": "CanvasDesktopSettingPanelTag",
                            "name": "CanvasDesktopSettingPanel",
                            "type": "Tag",
                            "class": "",
                            "parentLayer": "specialAnimationLayer",
                            "filterTypes": [],
                            child: []
                        },
                    ]
                }
            ]
        }
    ],


}