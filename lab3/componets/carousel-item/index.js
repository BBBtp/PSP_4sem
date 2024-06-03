export class CarouselItem {
    constructor(parent) {
        this.parent = parent
        this.clickCount = 0;
    }

    getHTML(data) {
        return (
                        `<div class="carousel-item ${data.active}">
                <div class="card card-h">
                    <img class="card-img-top crop-photo" src="${data.src}" alt="${data.title}">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                        <button class="btn btn-primary click-button" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                        <p>Количество лайков: <span id="click-count-${data.id}">${this.clickCount}</span></p>
                        
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
        this.clickCount = localStorage.getItem(`click-count-${data.id}`) || 0
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}