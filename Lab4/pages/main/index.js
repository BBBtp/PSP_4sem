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
        this.peer_id = 350122993 // ID получателя сообщения
        this.delay = 5000;
    }
    renderData(items) {
        for(let item of items){
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        }
    }
     renderDataMess(item) {

            const productCard = new ProductCardComponent(this.containerRoot)
            productCard.render(item, this.clickCard.bind(this), this.sendMes.bind(this))

    }

    getDataMes(){
        console.log(this.filter)
        ajax.post(urls.getMessageConversations(groupId,this.filter), (data) => {
            for (let item of data.response.items){
                if (item.conversation.peer.type === "user") {
                    ajax.post(urls.getUserInfo(item.conversation.peer.id),(user) => {
                        this.renderDataMess(user.response[0])
                    })
                }
            }
        })
    }

    sendMessageWithDelay(peer_id, delay) {
        setTimeout(() => {
            const url = urls.messageSend(peer_id);

            // Отправка HTTP-запроса с использованием fetch
            fetch(url)
                .then(response => response.json())
                .then(data => console.log('Message sent:', data))
                .catch(error => console.error('Error:', error));
        }, delay);
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

    sendMes(e){
        const cardId = e.target.dataset.id
        this.sendMessageWithDelay(cardId,this.delay)
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