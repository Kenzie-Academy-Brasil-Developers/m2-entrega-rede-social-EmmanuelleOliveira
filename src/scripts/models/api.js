export class Api {
    static baseUrl = "https://m2-rede-social.herokuapp.com/api/";
    static token = localStorage.getItem("@kenzieRedeSocial:token") || "";

    static async login(body) {
        const userLogin = await fetch(`${this.baseUrl}users/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            localStorage.setItem("@kenzieRedeSocial:token", res.token);
            localStorage.setItem("@kenzieRedeSocial:userId", res.user_uuid);
            
            return res; 
        })
        .catch(err => err);
        return userLogin; 
    };

    static async register(body) {
        console.log(body);
        const newUser = await fetch(`${this.baseUrl}users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(err => err);
        return newUser;
    };

    static async user(uuid) {
        const user = await fetch(`${this.baseUrl}users/${uuid}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.token}`
            }
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err));

        return user;
    };

    static async getFirstPosts() {
        const firstPost = await fetch(`${this.baseUrl}posts/?limit=1&offset=1/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.token}`
            }
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err));

        return firstPost;
    };

    static async getPosts(position) {
        const posts = await fetch(`${this.baseUrl}posts/?limit=10&offset=${position - 10}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.token}`
            }
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err));

        return posts;
    };

    static async createUserPost(content) {
        const newPost = await fetch(`${this.baseUrl}posts/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.token}`
            },
            body: JSON.stringify(content)
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));

        return newPost;
    };

    static async getUsers() {
        const users = await fetch(`${this.baseUrl}users/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.token}`
            }
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err));

        return users;
    };

    static async unfollow(uuid) {
        const unfollowUser = await fetch(`${this.baseUrl}users/unfollow/${uuid}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.token}`
            }
        })
        .then(res => res.json())
        .then(res => {console.log("removido");
            return res;
        })
        .catch(err => console.log(err));

        return unfollowUser;
    }; 

    static async follow(uuid) {
        const followUser = await fetch(`${this.baseUrl}users/follow/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.token}`
            },
            body: JSON.stringify(uuid)
        })
        .then(res => console.log("Removido"))
        .catch(err => console.log(err));

        return followUser;
    };

    static async like(uuid) {
        const likeUser = await fetch(`${this.baseUrl}likes/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.token}`
            },
            body: JSON.stringify({"post_uuid": uuid})
        })
        .then(res => console.log("Like"))
        .catch(err => console.log(err));

        return likeUser;
    };

    static async dislike(uuid) {
        const dislikeUser = await fetch(`${this.baseUrl}likes/${uuid}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.token}`
            }
        })
        .then(res => console.log("Dislike"))
        .catch(err => console.log(err));

        return dislikeUser;
    }; 
}

