import React from "react";
import { symbolAssetConfig } from "../../../data/symbol"
import { configGame } from "../../../data/config"
import { Ianimation } from "../../../core/components/ui/interface/Ianimation";

interface IframeworkHorizontalSymbolContainer {
    data: {
        "SYMBOL_WIDTH": number,
        "SYMBOL_HEIGHT": number,
        "SINGLE_SYMBOL_DELAY_IN_ANIM": number,
        "SYMBOL_ANIMATION_GRP_WISE": boolean,
        "SYMBOL_ANIMATION_EFFECT": Array<string>
        "symbols": Array<{
            "id": string,
            "name": string,
            "width"?: number | string,
            "height"?: number | string,
            "x"?: number | string,
            "y"?: number | string,
            "offsetX"?: number | string,
            "offsetY"?: number | string,
            "anchor"?: any,
            "visible": boolean,
            "child": Array<Ianimation>,
        }>,
        "symbolsAnimation": Array<{
            "id": string,
            "name": string,
            "width"?: number | string,
            "height"?: number | string,
            "x"?: number | string,
            "y"?: number | string,
            "offsetX"?: number | string,
            "offsetY"?: number | string,
            "anchor"?: any,
            "visible": boolean,
            "child": Array<Ianimation>,
        }>,


    }

}

export const frameworkHorizontalSymbol: IframeworkHorizontalSymbolContainer = {
    data: {
        "SYMBOL_WIDTH": configGame.SYMBOL_WIDTH,
        "SYMBOL_HEIGHT": configGame.SYMBOL_HEIGHT,
        "SINGLE_SYMBOL_DELAY_IN_ANIM": 1,
        "SYMBOL_ANIMATION_GRP_WISE": false,
        "SYMBOL_ANIMATION_EFFECT": [],
        "symbols": [

            {
                "id": "3",
                "name": "symbol_F_4",
                "width": 206,
                "height": 154,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 154,
                        "image": "static_fireBg_4",
                        "visible": true,
                    },
                    {
                        "type": "Image",
                        "width": 105,
                        "height": 143,
                        "image": "static_F",
                        "visible": true,
                        "x": 48,
                        "y": 9
                    },
                ],
                "visible": true,
            },

            {
                "id": "9",
                "name": "symbol_I_4",
                "width": 206,
                "height": 154,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 154,
                        "image": "static_fireBg_4",
                        "visible": true,
                    },
                    {
                        "type": "Image",
                        "width": 105,
                        "height": 143,
                        "x": 48,
                        "y": 8,
                        "image": "static_I",
                        "visible": true,

                    },
                ],
                "visible": true,
            },

            {
                "id": "15",
                "name": "symbol_R_4",
                "width": 206,
                "height": 154,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 154,
                        "image": "static_fireBg_4",
                        "visible": true,
                    },
                    {
                        "type": "Image",
                        "width": 105,
                        "height": 143,
                        "x": 48,
                        "y": 8,
                        "image": "static_R",
                        "visible": true,
                    },
                ],
                "visible": true,
            },
            {
                "id": "16",
                "name": "symbol_R_5",
                "width": 206,
                "height": 124,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 124,
                        "image": "static_fireBg_5",
                        "visible": true,
                    },
                    {
                        "type": "Image",
                        "width": 87,
                        "height": 120,
                        "x": 60,
                        "y": 2,
                        "image": "static_R",
                        "visible": true,
                    },
                ],
                "visible": true,
            },

            {
                "id": "21",
                "name": "symbol_E_4",
                "width": 206,
                "height": 154,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 154,
                        "image": "static_fireBg_4",
                        "visible": true,
                    },
                    {
                        "type": "Image",
                        "width": 105,
                        "height": 143,
                        "x": 48,
                        "y": 7,
                        "image": "static_E",
                        "visible": true
                    },
                ],
                "visible": true,
            },


            {
                "id": "33",
                "name": "symbol_NINE_4",
                "width": 206,
                "height": 154,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 154,
                        "image": "static_stone_4",
                        "visible": true,
                        "anchor": [0, 0],
                    },
                    {
                        "type": "Image",
                        "width": 86.40,
                        "height": 127.2,
                        "image": "static_9",
                        "anchor": [0.5, 0.5],
                        "visible": true,
                        "x": 103,
                        "y": 77
                    },
                ],
                "visible": true,
            },

            {
                "id": "39",
                "name": "symbol_TEN_4",
                "width": 206,
                "height": 154,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 154,
                        "image": "static_stone_4",
                        "visible": true,
                        "anchor": [0, 0],
                    },
                    {
                        "type": "Image",
                        "width": 134.40,
                        "height": 105.6,
                        "anchor": [0.5, 0.5],
                        "image": "static_10",
                        "visible": true,
                        "x": 103,
                        "y": 77
                    },
                ],
                "visible": true,
            },

            {
                "id": "45",
                "name": "symbol_J_4",
                "width": 206,
                "height": 154,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 154,
                        "image": "static_stone_4",
                        "visible": true,
                        "anchor": [0, 0],
                    },
                    {
                        "type": "Image",
                        "width": 56,
                        "height": 122,
                        "anchor": [0.5, 0.5],
                        "image": "static_J",
                        "visible": true,
                        "x": 103,
                        "y": 77
                    },
                ],
                "visible": true,
            },

            {
                "id": "51",
                "name": "symbol_Q_4",
                "width": 206,
                "height": 154,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 154,
                        "image": "static_stone_4",
                        "visible": true,
                        "anchor": [0, 0],
                    },
                    {
                        "type": "Image",
                        "width": 112,
                        "height": 123,
                        "image": "static_Q",
                        "visible": true,
                        "x": 45,
                        "y": 22
                    },
                ],
                "visible": true,
            },

            {
                "id": "57",
                "name": "symbol_K_4",
                "width": 206,
                "height": 154,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 154,
                        "image": "static_stone_4",
                        "visible": true,
                    
                    },
                    {
                        "type": "Image",
                        "width": 106.40,
                        "height": 110.4,
                        "image": "static_K",
                        "visible": true,
                        "x": 45,
                        "y": 22
                    },
                ],
                "visible": true,
            },

            {
                "id": "63",
                "name": "symbol_A_4",
                "width": 206,
                "height": 154,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 154,
                        "image": "static_stone_4",
                        "visible": true,
                        "anchor": [0, 0],
                    },
                    {
                        "type": "Image",
                        "width": 126,
                        "height": 120,
                        "anchor": [0.5, 0.5],
                        "image": "static_A",
                        "visible": true,
                        "x": 103,
                        "y": 77
                    },
                ],
                "visible": true,
            },

            {
                "id": "69",
                "name": "symbol_GREEN_CRYSTAL_4",
                "width": 206,
                "height": 154,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 154,
                        "image": "static_stone_4",
                        "visible": true,
                        "anchor": [0, 0],
                    },
                    {
                        "type": "Image",
                        "width": 131,
                        "height": 134,
                        "anchor": [0.5, 0.5],
                        "image": "static_green_crystal",
                        "visible": true,
                        "x": 103,
                        "y": 77
                    },
                ],
                "visible": true,
            },

            {
                "id": "75",
                "name": "symbol_BLUE_CRYSTAL_4",
                "width": 206,
                "height": 154,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 154,
                        "image": "static_stone_4",
                        "visible": true,
                        "anchor": [0, 0],
                    },
                    {
                        "type": "Image",
                        "width": 126.40,
                        "height": 147.2,
                        "anchor": [0.5, 0.5],
                        "image": "static_blue_crystal",
                        "visible": true,
                        "x": 103,
                        "y": 77
                    },
                ],
                "visible": true,
            },

            {
                "id": "81",
                "name": "symbol_RED_CRYSTAL_4",
                "width": 206,
                "height": 154,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 154,
                        "image": "static_stone_4",
                        "visible": true,
                        "anchor": [0, 0],
                    },
                    {
                        "type": "Image",
                        "width": 116.80,
                        "height": 148.8,
                        "anchor": [0.5, 0.5],
                        "image": "static_red_crystal",
                        "visible": true,
                        "x": 103,
                        "y": 77

                    },
                ],
                "visible": true,
            },

            {
                "id": "87",
                "name": "symbol_LADY_4",
                "width": 207,
                "height": 156,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 207,
                        "height": 156,
                        "image": "static_lady_4",
                        "visible": true,
                    },
                ],
                "visible": true,
            },


            {
                "id": "92",
                "name": "symbol_freeGame_scatter",
                "width": 206,
                "height": 154,
                "anchor": [0, 0],

                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 154,
                        "image": "static_scatter",
                        "visible": true,
                    },
                ],
                "visible": true,
            },

            {
                "id": "91",
                "name": "symbol_WILD",
                "width": 206,
                "height": 172,
                "anchor": [0, 0],
                "offsetX": 0,
                "offsetY": 0,
                "child": [

                    {
                        "type": "Image",
                        "width": 206,
                        "height": 155,
                        "image": "static_wild",
                        "visible": true,
                        "y": -3,
                        "x": 0,
                    },
                ],
                "visible": true,
            },

        ],
        "symbolsAnimation": [


            {
                "id": "3",
                "name": "symbolF_4",
                "width": 206,
                "height": 154,
                "offsetX": 76,
                "offsetY": -103,
                "child": [

                    {
                        "type": "Animation",
                        "width": 206,
                        "height": 154,
                        "image": "animation_fire_stone_4",
                        "animationSpeed": 0.2,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "anchor": [0.5, 0.5],

                        "animations": {
                            "anim": "animation_fire_stone_4",
                            "blast": "animation_fire_stone_4"
                        },
                    },
                    {
                        "type": "Animation",
                        "width": 190,
                        "height": 260,
                        "image": "animation_f_2",
                        "anchor": [0.5, 0.5],
                        "animationSpeed": 0.2,
                        "scale": 0.5,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": 0,
                        "y": 0,
                        "animations": {
                            "anim": "animation_f_2",
                            "blast": "animation_f_2"
                        },
                    },
                ],
                "visible": true,
            },

            {
                "id": "9",
                "name": "symbolI_4",
                "width": 206,
                "height": 154,
                "offsetX": 76,
                "offsetY": -103,
                "child": [

                    {
                        "type": "Animation",
                        "width": 206,
                        "height": 154,
                        "image": "animation_fire_stone_4",
                        "animationSpeed": 0.2,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": "animation_fire_stone_4",
                            "blast": "animation_fire_stone_4"
                        },
                    },
                    {
                        "type": "Animation",
                        "width": 190,
                        "height": 260,
                        "image": "animation_i_2",
                        "animationSpeed": 0.2,
                        "scale": 0.5,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": 0,
                        "y": 0,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": "animation_i_2",
                            "blast": "animation_i_2"
                        },
                    },
                ],
                "visible": true,
            },

            {
                "id": "15",
                "name": "symbolR_4",
                "width": 206,
                "height": 154,
                "offsetX": 76,
                "offsetY": -103,
                "child": [

                    {
                        "type": "Animation",
                        "width": 206,
                        "height": 154,
                        "image": "animation_fire_stone_4",
                        "animationSpeed": 0.2,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": "animation_fire_stone_4",
                            "blast": "animation_fire_stone_4"
                        },
                    },
                    {
                        "type": "Animation",
                        "width": 190,
                        "height": 260,
                        "image": "animation_r_2",
                        "animationSpeed": 0.2,
                        "scale": 0.5,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "anchor": [0.5, 0.5],
                        "x": 0,
                        "y": 0,
                        "animations": {
                            "anim": "animation_r_2",
                            "blast": "animation_r_2"
                        },
                    },
                ],
                "visible": true,
            },

            {
                "id": "21",
                "name": "symbolE_4",
                "width": 206,
                "height": 154,
                "offsetX": 76,
                "offsetY": -103,
                "child": [

                    {
                        "type": "Animation",
                        "width": 206,
                        "height": 154,
                        "image": "animation_fire_stone_4",
                        "animationSpeed": 0.2,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": "animation_fire_stone_4",
                            "blast": "animation_fire_stone_4"
                        },
                    },
                    {
                        "type": "Animation",
                        "width": 190,
                        "height": 260,
                        "image": "animation_e_2",
                        "animationSpeed": 0.2,
                        "scale": 0.5,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "anchor": [0.5, 0.5],
                        "x": 0,
                        "y": 0,
                        "animations": {
                            "anim": "animation_e_2",
                            "blast": "animation_e_2"
                        },
                    },
                ],
                "visible": true,
            },
            {
                "id": "33",
                "name": "symbol_SYM_1_4",
                "width": 206,
                "height": 154,
                "offsetX": 386,
                "offsetY": -105,
                "child": [

                    {
                        "type": "Animation",
                        "width": 209,
                        "height": 888,
                        "image": "animation_stone_4",
                        "animationSpeed": 0.2,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": -2,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": "animation_stone_4",
                            "blast": "animation_stone_4"
                        },
                    },
                    {
                        "type": "Animation",
                        "width": 209,
                        "height": 888,
                        "image": "animation_sym_01_2",
                        "animationSpeed": 0.2,
                        "scale": 0.8,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": -130,
                        "y": 0,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": "animation_sym_01_2",
                            "blast": "animation_sym_01_2"
                        },
                    },
                ],
                "visible": true,
            },

            {
                "id": "39",
                "name": "symbol_SYM_2_4",
                "width": 206,
                "height": 154,
                "offsetX": 386,
                "offsetY": -105,
                "child": [

                    {
                        "type": "Animation",
                        "width": 209,
                        "height": 888,
                        "image": "animation_stone_4",
                        "animationSpeed": 0.2,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": -2,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": "animation_stone_4",
                            "blast": "animation_stone_4"
                        },
                    },
                    {
                        "type": "Animation",
                        "width": 209,
                        "height": 888,
                        "image": "animation_sym_02_2",
                        "animationSpeed": 0.2,
                        "scale": 0.8,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": -130,
                        "y": 0,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": "animation_sym_02_2",
                            "blast": "animation_sym_02_2"
                        },
                    },
                ],
                "visible": true,
            },

            {
                "id": "45",
                "name": "symbol_SYM_3_4",
                "width": 206,
                "height": 154,
                "offsetX": 386,
                "offsetY": -105,
                "child": [

                    {
                        "type": "Animation",
                        "width": 209,
                        "height": 888,
                        "image": "animation_stone_4",
                        "animationSpeed": 0.2,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": -2,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": "animation_stone_4",
                            "blast": "animation_stone_4"
                        },
                    },
                    {
                        "type": "Animation",
                        "width": 209,
                        "height": 888,
                        "image": "animation_sym_03_2",
                        "animationSpeed": 0.2,
                        "scale": 0.8,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": -130,
                        "y": 0,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": "animation_sym_03_2",
                            "blast": "animation_sym_03_2"
                        },
                    },
                ],
                "visible": true,
            },

            {
                "id": "51",
                "name": "symbol_SYM_4_4",
                "width": 206,
                "height": 154,
                "offsetX": 386,
                "offsetY": -105,
                "child": [

                    {
                        "type": "Animation",
                        "width": 209,
                        "height": 888,
                        "image": "animation_stone_4",
                        "animationSpeed": 0.2,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": -2,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": "animation_stone_4",
                            "blast": "animation_stone_4"
                        },
                    },
                    {
                        "type": "Animation",
                        "width": 209,
                        "height": 888,
                        "image": "animation_sym_04_2",
                        "animationSpeed": 0.2,
                        "scale": 0.8,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": -130,
                        "y": 0,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": "animation_sym_04_2",
                            "blast": "animation_sym_04_2"
                        },
                    },
                ],
                "visible": true,
            },

            {
                "id": "57",
                "name": "symbol_SYM_5_4",
                "width": 206,
                "height": 154,
                "offsetX": 386,
                "offsetY": -105,
                "child": [

                    {
                        "type": "Animation",
                        "width": 209,
                        "height": 888,
                        "image": "animation_stone_4",
                        "animationSpeed": 0.2,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": -2,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": "animation_stone_4",
                            "blast": "animation_stone_4"
                        },
                    },
                    {
                        "type": "Animation",
                        "width": 209,
                        "height": 888,
                        "image": "animation_sym_05_2",
                        "animationSpeed": 0.2,
                        "scale": 0.8,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "anchor": [0.5, 0.5],
                        "x": -130,
                        "y": 0,
                        "animations": {
                            "anim": "animation_sym_05_2",
                            "blast": "animation_sym_05_2"
                        },
                    },
                ],
                "visible": true,
            },

            {
                "id": "63",
                "name": "symbol_SYM_6_4",
                "width": 206,
                "height": 154,
                "offsetX": 386,
                "offsetY": -105,
                "child": [

                    {
                        "type": "Animation",
                        "width": 209,
                        "height": 888,
                        "image": "animation_stone_4",
                        "animationSpeed": 0.2,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": -2,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": "animation_stone_4",
                            "blast": "animation_stone_4"
                        },
                    },
                    {
                        "type": "Animation",
                        "width": 209,
                        "height": 888,
                        "image": "animation_sym_06_2",
                        "animationSpeed": 0.2,
                        "scale": 0.8,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "anchor": [0.5, 0.5],
                        "x": -130,
                        "y": 0,
                        "animations": {
                            "anim": "animation_sym_06_2",
                            "blast": "animation_sym_06_2"
                        },
                    },
                ],
                "visible": true,
            },

            {
                "id": "69",
                "name": "symbol_SYM_7_4",
                "width": 206,
                "height": 154,
                "offsetX": -57,
                "offsetY": 84,
                "child": [

                    {
                        "type": "Animation",
                        "width": 376,
                        "height": 888,
                        "image": "animation_stone_4",
                        "animationSpeed": 0.2,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": 0,
                        "y": 0,
                        "animations": {
                            "anim": "animation_stone_4",
                            "blast": "animation_stone_4"
                        },
                    },
                    {
                        "type": "Animation",
                        "width": 376,
                        "height": 888,
                        "image": "animation_sym_07_2",
                        "animationSpeed": 0.2,
                        "scale": 0.8,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": -33,
                        "y": -40,
                        "animations": {
                            "anim": "animation_sym_07_2",
                            "blast": "animation_sym_07_2"
                        },
                    },
                ],
                "visible": true,
            },

            {
                "id": "75",
                "name": "symbol_SYM_8_4",
                "width": 206,
                "height": 154,
                "offsetX": -57,
                "offsetY": 84,
                "child": [

                    {
                        "type": "Animation",
                        "width": 376,
                        "height": 888,
                        "image": "animation_stone_4",
                        "animationSpeed": 0.2,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": 0,
                        "y": 0,
                        "animations": {
                            "anim": "animation_stone_4",
                            "blast": "animation_stone_4"
                        },
                    },
                    {
                        "type": "Animation",
                        "width": 376,
                        "height": 888,
                        "image": "animation_sym_08_2",
                        "animationSpeed": 0.2,
                        "scale": 0.8,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": -33,
                        "y": -40,
                        "animations": {
                            "anim": "animation_sym_08_2",
                            "blast": "animation_sym_08_2"
                        },
                    },
                ],
                "visible": true,
            },
            {
                "id": "81",
                "name": "symbol_SYM_9_4",
                "width": 206,
                "height": 154,
                "offsetX": -61,
                "offsetY": 86,
                "child": [

                    {
                        "type": "Animation",
                        "width": 209,
                        "height": 888,
                        "image": "animation_stone_4",
                        "animationSpeed": 0.2,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": 0,
                        "y": 0,
                        "animations": {
                            "anim": "animation_stone_4",
                            "blast": "animation_stone_4"
                        },
                    },
                    {
                        "type": "Animation",
                        "width": 209,
                        "height": 157,
                        "image": "animation_sym_09_2",
                        "animationSpeed": 0.2,
                        "scale": 0.8,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": -33,
                        "y": -40,
                        "animations": {
                            "anim": "animation_sym_09_2",
                            "blast": "animation_sym_09_2"
                        },
                    },
                ],
                "visible": true,
            },
            {
                "id": "87",
                "name": "symbolady_4",
                "width": 206,
                "height": 154,
                "offsetX": 384,
                "offsetY": -106,
                "child": [

                    {
                        "type": "Animation",
                        "width": 206,
                        "height": 888,
                        "image": "animation_lady_4",
                        "animationSpeed": 0.5,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": 0,
                        "y": 0,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": ["animation_lady_4_part_1", "animation_lady_4_part_2"],
                            "blast": ["animation_lady_4_part_1", "animation_lady_4_part_2"],
                        },
                    },
                ],
                "visible": true,
            },


            {
                "id": "92",
                "name": "animation_freeGame_Scatter",
                "width": 206,
                "height": 154,
                "offsetX": 76,
                "offsetY": -103,
                "child": [

                    {
                        "type": "Animation",
                        "width": 206,
                        "height": 154,
                        "image": "animation_freeGame_Scatter",
                        "animationSpeed": 0.2,
                        "playing": false,
                        "loop": true,
                        "visible": true,
                        "x": 0,
                        "y": 0,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": "animation_freeGame_Scatter",
                            "blast": "animation_freeGame_Scatter"
                        },
                    },
                ],
                "visible": true,
            },

            {
                "id": "91",
                "name": "symbolWild",
                "width": 206,
                "height": 154,
                "offsetX": 374,
                "offsetY": -110,
                "child": [
                    {
                        "type": "Animation",
                        "width": 316,
                        "height": 236,
                        "image": "animation_wild",
                        "animationSpeed": 0.2,
                        "playing": false,
                        "loop": false,
                        "visible": true,
                        "x": 0,
                        "y": 0,
                        "anchor": [0.5, 0.5],
                        "animations": {
                            "anim": ["animation_wild_blast_1"],
                            "blast": ["animation_wild_blast_1"],
                        },
                    },
                ],
                "visible": true,
            },
        ],

    }


};

export const HorizontalSymbolConfigurationContext = React.createContext(
    {}
);