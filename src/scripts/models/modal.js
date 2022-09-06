export class Modal {
    static showModal() {
        const modal = document.querySelector(".modal-edit");
        modal.classList.toggle("hidden");
        const understandBtn = document.querySelector(".white-fixed-btn");
        understandBtn.addEventListener("click", () => {
            modal.classList.add("hidden");
        });
    };   
}