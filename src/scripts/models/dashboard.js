import { Api } from "./api.js";
import { Modal } from "./modal.js";
import { Render } from "./render.js";

class Dashboard {
    static logout() {
        const logoutBtn = document.getElementById("logout-btn");
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("@kenzieRedeSocial:token");
            localStorage.removeItem("@kenzieRedeSocial:userId");
            window.location.assign("../../index.html");
        });
    };

    static showPosts(posts) {
        const postsList = document.getElementById("post-list");
        const userToken = localStorage.getItem("@kenzieRedeSocial:token");

        postsList.innerHTML = "";

        if(!userToken) {
            window.location.assign("../../index.html");
        }

        Render.postList(posts);
    }
    
}

const userId = localStorage.getItem("@kenzieRedeSocial:userId");
const user = await Api.user(userId);
const postsApi = await Api.getPosts();

Dashboard.logout();
Render.showUser(user);
Dashboard.showPosts(postsApi);
