import {commongameAssetConfig} from "../../data/commongame";
import {buttonpanelAssetConfig} from "../../data/buttonpanel";
import {symbolAssetConfig} from "../../data/symbol";
import {basegameAssetConfig} from "../../data/basegame";
import {introductionPageAssetConfig} from "../../data/introduction";
import {paytableAssetConfig} from "../../data/paytable";
import {overlayAssetConfig} from "../../data/overlay";
import {desktopSettingPanelAssetConfig} from "../../data/desktopSettingPanel";
import {mobViewPanelAssetConfig} from "../../data/mobViewPanel";
import {freegameAssetConfig} from "../../data/freegame";
import {winCelebrationAssetConfig} from "../../data/winCelebration";
import {introAssetConfig} from "../../data/intro";
import {multiplierAssetConfig} from "../../data/multiplier";
import {soundAssetConfig} from "../../data/sounds";
import {autoplayAssetConfig} from "../../data/autoplay";


export let loadingGameConfig: any = {}
let IntroductionAssetObject: any = introductionPageAssetConfig;
for (let key in IntroductionAssetObject) {
    loadingGameConfig[key] = IntroductionAssetObject[key];
}


let Commongameobject: any = commongameAssetConfig;
for (let key in Commongameobject) {
    loadingGameConfig[key] = Commongameobject[key];
}


let buttonpanelAssetobject: any = buttonpanelAssetConfig;
for (let key in buttonpanelAssetobject) {

    loadingGameConfig[key] = buttonpanelAssetobject[key];
}

let symbolAssetObject: any = symbolAssetConfig;
for (let key in symbolAssetConfig) {

    loadingGameConfig[key] = symbolAssetObject[key];
}


let Basegameobject: any = basegameAssetConfig;
for (let key in Basegameobject) {
    loadingGameConfig[key] = Basegameobject[key];
}


let PaytableAssetObject: any = paytableAssetConfig;
for (let key in PaytableAssetObject) {
    loadingGameConfig[key] = PaytableAssetObject[key];
}

let OverlayAssetObject: any = overlayAssetConfig;
for (let key in OverlayAssetObject) {
    loadingGameConfig[key] = OverlayAssetObject[key];
}

let DesktopSettingPanelAssetObject: any = desktopSettingPanelAssetConfig;
for (let key in DesktopSettingPanelAssetObject) {
    loadingGameConfig[key] = DesktopSettingPanelAssetObject[key];
}

let MobileViewPanelAssetObject: any = mobViewPanelAssetConfig;
for (let key in MobileViewPanelAssetObject) {
    loadingGameConfig[key] = MobileViewPanelAssetObject[key];
}
let FreeGameAssetObject: any = freegameAssetConfig;
for (let key in FreeGameAssetObject) {
    loadingGameConfig[key] = FreeGameAssetObject[key];
}
let WinCelebrationAssetObject: any = winCelebrationAssetConfig;
for (let key in WinCelebrationAssetObject) {
    loadingGameConfig[key] = WinCelebrationAssetObject[key];
}
let introAssetConfigObj: any = introAssetConfig;
for (let key in introAssetConfigObj) {
    loadingGameConfig[key] = introAssetConfigObj[key];
}
let MultiplierAssetObject: any = multiplierAssetConfig;
for (let key in MultiplierAssetObject) {
    loadingGameConfig[key] = MultiplierAssetObject[key];
}

let soundAssetObject: any = soundAssetConfig;
for (let key in soundAssetConfig) {

    loadingGameConfig[key] = soundAssetObject[key];
}
let autoplayAssetObject: any = autoplayAssetConfig;
for (let key in autoplayAssetConfig) {

    loadingGameConfig[key] = autoplayAssetObject[key];
}