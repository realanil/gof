export interface Icomponent {
    "id"?: string;
    "name"?: string;
    "image"?: string;
    "type": string;
    "class"?: string;
    "uimode"?: string;
    "layoutMode"?: string;
    "parentLayer"?: string;
    "spinedata"?: any;
    "prefix"?: string;
    "postfix"?: string;
    "layout"?: boolean,
    "numberaddup"?: boolean;
    "skiptickup"?: boolean;
    "runonvalue"?: boolean;
    "tickupspeed"?: number;
    "tickuptime"?: number;
    "tickupvalue"?: number;
    "decimaldigit"?: number;
    "value"?: number;
    "minvalue"?: number;
    "maxvalue"?: number;
    "height"?: number | string;
    "width"?: number | string;
    "x"?: number | string;
    "y"?: number | string;
    "text"?: string;
    "anchor"?: Array<number>;
    "visible"?: boolean,
    "scaleToFit"?: boolean,
    "textStyle"?: any,
    "filterTypes"?: any,
    "child"?: any,
    "animationSpeed"?: number,
    "playing"?: boolean,
    "loop"?: boolean,
    "alpha"?: number,
    "scale"?: number,
    "radius"?: number,
    "color"?: string,
    "shape"?: string,
    "currentFrames"?: Array<string>,
    "animationData"?: {
        "frame-pre-name": string,
        "frame-post-name": string,
        "frame-count": number
    },


}