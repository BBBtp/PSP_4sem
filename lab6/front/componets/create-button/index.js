export class CreateButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("create-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <button id="create-button" class="btn btn-success create-button" type="button">Добавить уроки</button>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}