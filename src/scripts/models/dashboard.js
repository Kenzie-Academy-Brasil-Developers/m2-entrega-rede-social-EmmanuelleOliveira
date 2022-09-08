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
        Render.postList(posts.results.reverse());
    };

    static newPost() {
        const postTitle = document.getElementById("title-post");
        const postDescription = document.getElementById("description-post");
        const addPostBtn = document.getElementById("post-btn");

        addPostBtn.addEventListener("click", async () => {
            const data = {
                "title": postTitle.value,
                "description": postDescription.value 
            };

            await Api.createUserPost(data);
            const firstPostUpdate = await Api.getFirstPosts();
            totalPost = firstPostUpdate.count;
            postsApi = await Api.getPosts(totalPost);
            postTitle.value = "";
            postDescription.value = "";
            this.showPosts(postsApi);
            this.showPostModal();
        });
    };

    static usersSugestions(usersApi) {
        const arrayPositions = [];
        console.log(usersApi)
        const usersRandomDiv = document.querySelectorAll(".random");
        usersRandomDiv.forEach((elem, index) => {
            let position = Math.floor(Math.random() * ((usersApi.results.length-1) - 0 + 1)) + 0;
            while (arrayPositions.indexOf(position) >= 0) {
                position = Math.floor(Math.random() * ((usersApi.results.length-1) - 0 + 1)) + 0;
            }
                arrayPositions.push(position);
                const imgSelect = document.getElementById(`img-user-${index+1}`);
                imgSelect.src = `${usersApi.results[position].image}`;
                const nameSelect = document.getElementById(`name-user-${index+1}`);
                nameSelect.innerText = `${usersApi.results[position].username}`;
                const workSelect = document.getElementById(`work-user-${index+1}`);
                workSelect.innerText = `${usersApi.results[position].work_at}`; 
                const followBtn = document.getElementById(`user-btn-${index+1}`);
                const uuidFollow = usersApi.results[position].uuid;
                console.log(uuidFollow);
                if(user.following.some((userFollow) => userFollow.uuid === usersApi.results[position].uuid)) {
                    followBtn.innerText = `Seguindo`;
                    followBtn.classList.add("primary-btn");
                    /* followBtn.addEventListener("click", async () => {
                        await Api.unfollow(uuidFollow);
                        followBtn.classList.remove("primary-btn");
                        followBtn.classList.add("outline-btn");
                        followBtn.innerText = `Seguir`;
                    });  */
                } else {
                    followBtn.innerText = `Seguir`;
                    followBtn.classList.add("outline-btn");
                    const uuidFollow = {"following_users_uuid": usersApi.results[position].uuid};
                    console.log(uuidFollow);
                    /* followBtn.addEventListener("click", async () => {
                        const response = await Api.follow(uuidFollow);
                        console.log(response);
                        console.log(user)
                        followBtn.classList.remove("outline-btn");
                        followBtn.classList.add("primary-btn");
                        followBtn.innerText = `Seguindo`;
                    }); */  
                }

                followBtn.addEventListener("click", async () => {
                    user.following.forEach((uuidUs) => {console.log(uuidUs.uuid)});
                    if(user.following.some((userFollow) => userFollow.uuid === usersApi.results[position].uuid)) {
                        await Api.unfollow(uuidFollow);
                        followBtn.classList.remove("primary-btn");
                        followBtn.classList.add("outline-btn");
                        followBtn.innerText = `Seguir`;
                        user = await Api.user(userId);
                    } else {
                        const uuidFollow = {"following_users_uuid": usersApi.results[position].uuid};
                        const response = await Api.follow(uuidFollow);
                        console.log(response);
                        console.log(user)
                        followBtn.classList.remove("outline-btn");
                        followBtn.classList.add("primary-btn");
                        followBtn.innerText = `Seguindo`;
                        user = await Api.user(userId);
                    }
                });
        });
    };
    
    static showPostModal() {
        const postBtn = document.querySelectorAll(".post-btn");
        postBtn.forEach(elem => {
            elem.addEventListener("click", (event) => {
                console.log(event.target.id)
                Modal.showModalPost(event.target.id, postsApi);
            });
            /* const postUuid = document.getElementById(``) */
            //Modal.showPostModal();
        });
    }
}

const userId = localStorage.getItem("@kenzieRedeSocial:userId");
let user = await Api.user(userId);
console.log(user)
const firstPost = await Api.getFirstPosts();
let totalPost = firstPost.count;
let postsApi = await Api.getPosts(totalPost);
const users = await Api.getUsers();
console.log(users)

Dashboard.logout();
Render.showUser(user);
Dashboard.showPosts(postsApi);
Dashboard.newPost();
Dashboard.usersSugestions(users);
Dashboard.showPostModal();