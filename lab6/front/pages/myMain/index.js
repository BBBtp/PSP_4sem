import {MyCarousel} from "../../componets/carousel";
import {ProductPage} from "../product";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {CreateButtonComponent} from "../../componets/create-button";
import {CreationPage} from "../create";

export class MainPage1 {
    constructor(parent) {
        this.parent = parent;
        this.carousel = new MyCarousel();
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    async getData() {
        let data = await ajax.fetchProductList(urls.getProducts())
        let json = await data.json()
        console.log(json.data)
        this.carousel.render(json.data,this.clickCard.bind(this));
    }

    getHTML() {
        return (
            `
            <div id="main-page" class="d-flex flex-wrap"><div/>
        `
        )
    }
    clickCard(e) {
        const cardId = e.target.dataset.id
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }
    clickCreate(e){
        const creationPage = new CreationPage(root)
        creationPage.render()
    }
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.getData();
        const createButton = new CreateButtonComponent(this.pageRoot)
        createButton.render(this.clickCreate.bind(this))

    }

}
