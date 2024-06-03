import {MyCarousel} from "../../componets/carousel";
import {ProductPage} from "../product";

export class MainPage1 {
    constructor(parent) {
        this.parent = parent;
        this.carousel = new MyCarousel();
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getData() {
        return [
            {
                id: 1,
                src: "Математика.png",
                title: "Математика",
                text: "Сложная наука",
            },
            {
                id: 2,
                src: "Русский язык.png",
                title: "Русский язык",
                text: "Без этой науки никак",
            },
            {
                id: 3,
                src: "Физкультура.png",
                title: "Физкультура",
                text: "Для крепкого здоровья",
            }
        ]
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

        const productPage = new ProductPage(this.parent, this.getData()[cardId - 1])
        productPage.render()
    }
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        const data = this.getData();

        this.carousel.render(data,this.clickCard.bind(this));

    }

}
