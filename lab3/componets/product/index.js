export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
        this.clickCount = 0;
    }

    getHTML(data) {
        // Получаем количество кликов из localStorage или устанавливаем на 0

        return (
            `
                <div class="card mb-3" style="width: 300px;">
                    <div class="row g-0">
                        <div class="col-md-6">
                            <img src="${data.src}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${data.title}</h5>
                                <p class="card-text">${data.text}</p>
                                <p>Количество лайков: <span id="click-count-${data.id}">${this.clickCount}</span></p>
                                <button class="btn btn-secondary click-button" id="click-card-${data.id}" data-id="${data.id}">Лайк!</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        );
    }

    render(data) {

        this.clickCount = localStorage.getItem(`click-count-${data.id}`) || 0
        localStorage.setItem(`click-count-${data.id}`, this.clickCount);
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);

        // Добавляем обработчик событий для кнопки
        const button = document.getElementById(`click-card-${data.id}`);
        button.addEventListener('click', () => {
            const clickCountLabel = document.getElementById(`click-count-${data.id}`);
            this.clickCount = parseInt(clickCountLabel.textContent, 10);
            this.clickCount += 1;
            clickCountLabel.textContent = this.clickCount;

            // Сохраняем обновленное значение в localStorage
            localStorage.setItem(`click-count-${data.id}`, this.clickCount);
        });
    }
}
