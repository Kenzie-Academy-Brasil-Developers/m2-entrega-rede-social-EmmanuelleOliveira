export class Modal {
    static showModal() {
        const modal = document.querySelector(".modal-edit");
        modal.classList.toggle("hidden");
        const understandBtn = document.querySelector(".white-fixed-btn");
        understandBtn.addEventListener("click", () => {
            modal.classList.add("hidden");
        });
    };
    
    static showModalPost(uuid, posts) {
        const modal = document.querySelector(".modal-show-post-wrapper");
        modal.classList.toggle("hidden");
        const postClicked = posts.results.find((elem) => elem.uuid === uuid);
        document.getElementById("user-img-post").src = `${postClicked.author.image}`;
        document.getElementById("user-name-post").innerText = `${postClicked.author.username}`;
        document.getElementById("user-work-post").innerText = `${postClicked.author.work_at}`;
        document.getElementById("title-post-select").innerText = `${postClicked.title}`;
        document.getElementById("description-post-select").innerText = `${postClicked.description}`;
        const closeModalBtn = document.querySelector(".close-post-modal");
        closeModalBtn.addEventListener("click", () => {
            modal.classList.add("hidden");
        });
    }
}