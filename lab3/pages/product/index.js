
import { ProductComponent } from "../../componets/product/index.js"
import {BackButtonComponent} from "../../componets/back-button/index.js";
import { MainPage1 } from "../myMain/index.js";


export class ProductPage {
    constructor(parent, data) {
        this.parent = parent
        this.data = data
    }

    getData() {
        return {
            id: `${this.data.id}`,
            src: `${this.data.src}`,
            title: `${this.data.title}`,
            text: `${this.data.text}`
        }
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

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const data = this.getData()
        const product = new ProductComponent(this.pageRoot)
        product.render(data)

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
    }
}
