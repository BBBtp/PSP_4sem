import {urls} from "./urls.js";
class Ajax {
    post = async(url)=>{
        try{
            return await fetch(url)
        }
        catch (e){
            console.log(e)
        }
    }
}

    export const ajax = new Ajax();