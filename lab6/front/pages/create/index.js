import {BackButtonComponent} from "../../componets/back-button";
import {CreationForm} from "../../componets/creation-form";
import {MainPage1} from "../myMain";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";


export class CreationPage {
    constructor(parent) {
        this.parent = parent
    }

    get pageRoot() {
        return document.getElementById('creation-page')
    }

    getHTML() {
        return (
            `
                <div id="creation-page" class=""></div>
            `
        )
    }

    clickBack(e) {
        const mainPage = new MainPage1(this.parent)
        mainPage.render()
    }

    async createProduct(e) {
        e.preventDefault()

        const name = document.getElementById('nameInput'),
            desc = document.getElementById('descriptionInput'),
            img = document.getElementById('imgInput')


        const data = {
            src: img.value,
            title: name.value,
            text: desc.value,
        }

        await ajax.createProduct(urls.getProducts(), data)

        location.reload()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        const creationForm = new CreationForm(this.pageRoot)
        creationForm.render()
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
        const createButton = document.getElementById('form')
        createButton.addEventListener('submit', this.createProduct)
    }
}