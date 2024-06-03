import {ButtonComponent} from "../../components/button";
import {ProductCardComponent} from "../../components/product-card";
import {ProductPage} from "../product/index.js";
import {FilterComponent} from "../../components/filter";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.filter = "all"
    }
    renderData(items) {
        for(let item of items){
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        }
    }
     renderDataMess(item) {
         if (item.sex !== 1 && "ИОПРСТУФХЦЧШЩЭЮЯ".indexOf(item.last_name[0]) >= 0){
             const productCard = new ProductCardComponent(this.containerRoot)
            productCard.render(item, this.clickCard.bind(this))
     }
    }

    getDataMes = async() => {
        console.log(this.filter);
            const response = await fetch(urls.getMessageConversations(groupId, this.filter))
            const data = await response.json();
            for (let item of data.response.items) {
                if (item.conversation.peer.type === "user") {
                        const userResponse = await fetch(urls.getUserInfo(item.conversation.peer.id))
                        const user = await userResponse.json();
                        this.renderDataMess(user.response[0])
            }
        }

    }
    changeFilter(e){

        this.filter = e.target.checked ? "important" : "all"
        this.renderContainer()
    }
    renderContainer(){
        this.containerRoot.innerHTML = ''
        this.getDataMes()
    }
    get pageRoot() {
        return document.getElementById('main-page')
    }
    get containerRoot() {
        return document.getElementById('main-container')
    }
    getHTML() {
        return (
            `
            <div id="main-page" class="d-flex flex-wrap"><div/>
            <div id="main-container" class="d-flex flex-wrap container"><div/>
        `
        )
    }
    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }


    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.getDataMes()
        const filterComponent = new FilterComponent(this.pageRoot)
        filterComponent.render(this.changeFilter.bind(this))
    }

}