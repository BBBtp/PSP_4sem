export class FilterComponent {
    constructor(parent, asc) {
        this.parent = parent;
        this.asc = asc;
    }

    addListeners(listener) {
        // Check if the element exists before adding event listener
        const checkbox = document.getElementById("flexCheckDefault");
        if (checkbox) {
            checkbox.addEventListener("click", listener);
        } else {
            console.error("Element with id 'flexCheckDefault' not found");
        }
    }

    getHTML() {
        return (
            `
            <div class="filter-list">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                    Показать важные
                </label>
            </div>
            `
        );
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}
