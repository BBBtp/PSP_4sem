export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
            <div class="card" style="width: 300px;">
                <img class="card-img-top" src="${data.photo_400_orig}" alt="картинка">
                <div class="card-body">
                    <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                    <button class="btn btn-secondary" id="send-${data.id}" data-id="${data.id}">Отправить привет</button>
                </div>
            </div>
        `
        )
    }

    addListeners(data, listener,message) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
        document
            .getElementById(`send-${data.id}`)
            .addEventListener("click",message)
    }

    render(data, listener,message) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener,message)
    }
}