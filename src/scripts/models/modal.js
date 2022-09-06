export class Modal {
    static showModal() {
        const modal = document.querySelector(".modal-edit");
        let toggleModal = modal.classList.toggle("hidden");
        if (!toggleModal) {
            const understandBtn = document.querySelector(".white-fixed-btn");
            understandBtn.addEventListener("click", () => {
                modal.classList.toggle("hidden");
            });
        };
    };   
}