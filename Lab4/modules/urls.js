import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig&${this.commonInfo}`
    }

    getGroupMembers(groupId) {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}`
    }
    getMessageConversations(groupId,filter){
        return `${this.url}/messages.getConversations?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}&filter=${filter}`
    }

    messageSend(peer_id){
        return `${this.url}/messages.send?peer_id=${peer_id}&random_id=0&message="Hello!!"&${this.commonInfo}`
    }


}

export const urls = new Urls()