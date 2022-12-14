import { Api } from "./api.js";

export class Render {
    static showUser(user) {
        document.getElementById("user-img").setAttribute("src", user.image);
        document.getElementById("user-name-logged").innerText = `${user.username}`;
        document.getElementById("followers").innerText = `${user["followers_amount"]} seguidores`;
        document.getElementById("user-work").innerText = `${user.work_at}`;
    };

    static postList(posts) {
        const postsTag = document.getElementById("post-list");
        postsTag.innerHTML = ``;
        posts.forEach(post => {
            const card = Render.createCard(post);
            postsTag.appendChild(card);
        });
    }

    static createCard(post) { 
        const liTag = document.createElement('li');
        const sectionTag = document.createElement('section');
        const imgTag = document.createElement('img');
        const divUserTag = document.createElement('div');
        const h3Tag = document.createElement('h3');
        const pTag = document.createElement('p');
        const divPostTag = document.createElement('div');
        const h2Tag = document.createElement('h2');
        const pPostTag = document.createElement('p');
        const divInteractionTag = document.createElement('div');
        const divLikesTag = document.createElement('div');
        const openPostBtn = document.createElement('button');
        const likeImg = document.createElement('img');
        const spanLikeTag = document.createElement('span');

        const userUuid = localStorage.getItem('@kenzieRedeSocial:userId');

        imgTag.src = post.author.image;
        h3Tag.innerText = `${post.author.username}`;
        pTag.innerText = `${post.author.work_at}`;
        h2Tag.innerText = `${post.title}`;
        pPostTag.innerText = `${post.description}`;
        openPostBtn.innerText = "Abrir Post";
        if(post.likes.some((like) => like.user.uuid === userUuid)) {
            likeImg.src = `../assets/heartRed.png`;
        } else {
            likeImg.src = `../assets/heartBlack.png`;
        }
        spanLikeTag.innerText = `${post.likes.length}`;

        imgTag.classList.add("user-image");
        h3Tag.classList.add("title2");
        pTag.classList.add("work");
        divUserTag.classList.add("user-info-text");
        sectionTag.classList.add("user-info");
        liTag.classList.add("post-card");
        divPostTag.classList.add("post-subject");
        h2Tag.classList.add("title1");
        pPostTag.classList.add("text1");
        openPostBtn.classList.add("btn-grey1");
        openPostBtn.classList.add("post-btn");
        openPostBtn.id = `${post.uuid}`;
        likeImg.classList.add("img-like");
        likeImg.id = `${post.uuid}`;
        likeImg.addEventListener("click", async () => {
            const like = post.likes.find((like) => like.user.uuid === userUuid);
            if(like) {
                await Api.dislike(like.uuid);
                likeImg.src = `../assets/heartBlack.png`;
                spanLikeTag.innerText = `${post.likes.length-1}`;
                const firstPost = await Api.getFirstPosts();
                let totalPost = firstPost.count;
                let postsApi = await Api.getPosts(totalPost);
                this.postList(postsApi.results.reverse());
            } else {
                await Api.like(post.uuid);
                likeImg.src = `../assets/heartRed.png`;
                spanLikeTag.innerText = `${post.likes.length+1}`;
                const firstPost = await Api.getFirstPosts();
                let totalPost = firstPost.count;
                let postsApi = await Api.getPosts(totalPost);
                this.postList(postsApi.results.reverse());
            }
        });
        spanLikeTag.classList.add("text2");
        divLikesTag.classList.add("likes");
        divInteractionTag.classList.add("interactions-user"); 

        divUserTag.append(h3Tag, pTag);
        sectionTag.append(imgTag, divUserTag);
        divPostTag.append(h2Tag, pPostTag);
        divLikesTag.append(likeImg, spanLikeTag);
        divInteractionTag.append(openPostBtn, divLikesTag);
        liTag.append(sectionTag, divPostTag, divInteractionTag);

        return liTag;
    }
}