
import { ProductComponent } from "../../componets/product/index.js"
import {BackButtonComponent} from "../../componets/back-button/index.js";
import { MainPage1 } from "../myMain/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {DeleteButtonComponent} from "../../componets/delete-button";

export class ProductPage {
    constructor(parent, data) {
        this.parent = parent
        this.data = data
    }

    async getData() {
        let data = await ajax.fetchProductById(urls.getProductById(this.data))
        let json = await data.json()
        this.renderData(json.data)

    }


    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        )
    }

    clickBack(e) {
        const mainPage = new MainPage1(this.parent)
        mainPage.render()
    }
    async clickDelete(e) {
        if (confirm('Уверены, что хотите это удалить?')) {
            await ajax.deleteProductById(urls.getProductById(this.data))
            location.reload()
        }
    }
    renderData(data) {
        const product = new ProductComponent(this.pageRoot)
        product.render(data)
    }

    async render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        await this.getData()
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
        const deleteButton = new DeleteButtonComponent(this.pageRoot)
        deleteButton.render(this.clickDelete.bind(this))
    }
}
