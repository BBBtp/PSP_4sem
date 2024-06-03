
export class CreationForm {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return (
            `
                <form class="container" id="form">
                    <div class="form-group">
                        <label for="nameInput" class="pt-3">Название</label>
                        <input type="text" class="form-control" id="nameInput" placeholder="Название урока" required>
                    </div>
                    <div class="form-group">
                        <label for="descriptionInput" class="pt-3">Описание</label>
                        <input type="text" class="form-control" id="descriptionInput" placeholder="Описание" required>
                    </div>
                    <div class="form-group">
                        <label for="imgInput" class="pt-3">Изображение</label>
                        <input type="url" class="form-control" id="imgInput" placeholder="Вставьте ссылку на изображение урока" required>
                    </div>
                    
                    <div class="form-group btn-group pt-3" id="button-wrapper">
                        <button type="submit" class="btn btn-success" id="create-button">Создать</button>
                    </div>
                </form>
            `
        )
    }

    render() {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('afterbegin', html)
    }
}
