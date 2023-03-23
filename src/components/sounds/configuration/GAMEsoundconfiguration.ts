import { frameworkSound } from "./../../../core/components/sounds/configuration/soundconfiguration"
import { soundAssetConfig } from "../../../data/sounds";


frameworkSound.data = {
    sfx: {
        "bigWinLoop": { id: "bigWinLoop", src: soundAssetConfig["bigWinLoop"], loop: false, vol: 0.1 },
        "superWinLoop": { id: "superWinLoop", src: soundAssetConfig["superWinLoop"], loop: false, vol: 0.1 },
        "megaWinLoop": { id: "megaWinLoop", src: soundAssetConfig["megaWinLoop"], loop: false, vol: 0.1 },
        "ultraWinLoop": { id: "ultraWinLoop", src: soundAssetConfig["ultraWinLoop"], loop: false, vol: 0.1 },

        "blastSound1": { id: "spinStopSound", src: soundAssetConfig["blastSound1"], loop: false, vol: 0.7 },
        "blastSound2": { id: "spinStopSound", src: soundAssetConfig["blastSound2"], loop: false, vol: 0.7 },
        "blastSound3": { id: "spinStopSound", src: soundAssetConfig["blastSound3"], loop: false, vol: 0.7 },
        "blastSound4": { id: "spinStopSound", src: soundAssetConfig["blastSound4"], loop: false, vol: 0.7 },

        "symbolLandingSound": { id: "symbolLandingSound", src: soundAssetConfig["symbolLandingSound"], loop: false, vol: 1 },

        "spinSound1": { id: "spinSound1", src: soundAssetConfig["spinSound1"], loop: true, vol: 0.2 },
        "spinSound2": { id: "spinSound2", src: soundAssetConfig["spinSound2"], loop: true, vol: 0.2 },
        "spinSound3": { id: "spinSound3", src: soundAssetConfig["spinSound3"], loop: true, vol: 0.2 },
        "spinSound4": { id: "spinSound4", src: soundAssetConfig["spinSound4"], loop: true, vol: 0.2 },

        "scatterLanding1": { id: "scatterLanding1", src: soundAssetConfig["scatterLanding1"], loop: true, vol: 0.8 },
        "scatterLanding2": { id: "scatterLanding2", src: soundAssetConfig["scatterLanding2"], loop: true, vol: 0.8 },
        "scatterLanding3": { id: "scatterLanding3", src: soundAssetConfig["scatterLanding3"], loop: true, vol: 0.8 },
        "scatterLanding4": { id: "scatterLanding4", src: soundAssetConfig["scatterLanding4"], loop: true, vol: 0.8 },

       
        "featureTriggerSound": { id: "featureTriggerSound", src: soundAssetConfig["featureTriggerSound"], loop: false, vol: 0.7 },
        "freeGameEnterSound": { id: "freeGameEnterSound", src: soundAssetConfig["freeGameEnterSound"], loop: false, vol: 0.7 },
        "anticipationSound": { id: "anticipationSound", src: soundAssetConfig["anticipationSound"], loop: false, vol: 0.7 },
        "reelStoppingSound": { id: "reelStoppingSound", src: soundAssetConfig["reelStoppingSound"], loop: false, vol: 0.7 },
        "spinButtonSound": { id: "spinButtonSound", src: soundAssetConfig["spinButtonSound"], loop: false, vol: 0.7 },
        "genericButtonSound": { id: "genericButtonSound", src: soundAssetConfig["genericButtonSound"], loop: false, vol: 0.7 },
        "multiplierSound": { id: "multiplierSound", src: soundAssetConfig["multiplierSound"], loop: false, vol: 0.7 },
        "reTriggerBlastSound": { id: "reTriggerBlastSound", src: soundAssetConfig["reTriggerBlastSound"], loop: false, vol: 0.7 },
        "introBlastSound": { id: "introBlastSound", src: soundAssetConfig["introBlastSound"], loop: false, vol: 0.7 },

        "winShowerSound": { id: "winShowerSound", src: soundAssetConfig["winShowerSound"], loop: true, vol: 1 },
        "winCelebrationStartSound": { id: "winCelebrationStartSound", src: soundAssetConfig["winCelebrationStartSound"], loop: false, vol: 1 },
        "winCelebrationStartSoundBell": { id: "winCelebrationStartSoundBell", src: soundAssetConfig["winCelebrationStartSoundBell"], loop: false, vol: 1 },
        "winShowerBgSound": { id: "winShowerBgSound", src: soundAssetConfig["winShowerBgSound"], loop: false, vol: 1 },
    },
    bg: {
        "bgloop": { id: "bgloop", src: soundAssetConfig["baseGameLoop"], loop: true, vol: 0.4 },
        "fgloop": { id: "fgloop", src: soundAssetConfig["freeGameLoop"], loop: true, vol: 0.4 },
    }
}
