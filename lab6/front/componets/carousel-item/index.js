export class CarouselItem {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                                <div class="carousel-item ${data.active}">
                <div class="card card-h">
                    <img class="card-img-top crop-photo" src="${data.src}" alt="${data.title}">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                        </div>
                    </div>
                </div>
            </div>

            `
        )
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }

    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}