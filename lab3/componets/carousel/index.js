import {CarouselItem} from "../carousel-item";

export class MyCarousel{
    constructor(parent) {
        this.parent = parent
    }
    getHTML() {
        return (
            `
                <div id="carouselExampleControls" class="carousel slide col-6" data-bs-ride="carousel">
                  <div class="carousel-inner" id="container">
                    
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"  data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Предыдущий</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"  data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Следующий</span>
                  </button>
                </div>
            `
        )
    }
    render(data,listener) {
        const html = this.getHTML();
        document.getElementById('main-page').insertAdjacentHTML('beforeend', html);
        let container = document.getElementById('container')
        for (let item of data){
            item = Object.assign(item,{active:item.id===1 ? "active" : ""})
            const carouselItem = new CarouselItem(container)
            carouselItem.render(item,listener)

        }

    }
}