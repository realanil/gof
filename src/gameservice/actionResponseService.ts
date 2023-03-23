import ApiService from "./api.service"
import {server} from "./../core/data/config"

export const actionResponseService = {
    sendActionResponse
}


function sendActionResponse(): any {
    let url = "";
    if (server.configGame.port === 0) {
        url = server.configGame.endpoint + "action?token=" + "" + localStorage.getItem("playerId");
    } else {
        url = server.configGame.endpoint + ":" + server.configGame.port + "action?token=" + localStorage.getItem("playerId");

    }
    const api = new ApiService(url);
    const param = {
        "gameRequest": {cmd: "initGame"}
    };
    if (server.configGame.method === "get") {
        return api.get(url, param);
    }
    if (server.configGame.method === "post") {
        return api.post(url, param);
    }

}
