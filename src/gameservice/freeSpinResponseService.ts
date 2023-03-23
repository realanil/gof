import ApiService from "./api.service"
import {server} from "./../core/data/config"

export const freeSpinResponseService = {
    sendFreeSpinResponse
}

function sendFreeSpinResponse(): any {
    let url = "";
    if (server.configGame.port === 0) {
        url = server.configGame.endpoint + "action?token=" + localStorage.getItem("playerId");
    } else {
        url = server.configGame.endpoint + ":" + server.configGame.port + "action?token=" + localStorage.getItem("playerId");
    }
    const api = new ApiService(url);

    let cheatApplied :any = localStorage.getItem("cheatModifiedRequest")
    let param: any = {};
    if (cheatApplied == "") {
        param = {
            "gameRequest": { cmd: "spin" }
        }
    } else {
        param = {
            "gameRequest":  JSON.parse(cheatApplied)
        }
    }
    if (server.configGame.method === "get") {
        return api.get(url, param);
    }
    if (server.configGame.method === "post") {
        return api.post(url, param);
    }
}
