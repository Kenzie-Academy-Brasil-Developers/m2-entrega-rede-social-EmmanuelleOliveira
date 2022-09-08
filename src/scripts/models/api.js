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
            //window.location.assign("src/pages/dashboard.html");
            
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
        const firstPost = await fetch(`${this.baseUrl}posts/?limit=1&offset=1`, {
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
        const posts = await fetch(`${this.baseUrl}posts/?limit=10&offset=${position-10}`, {
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
        const users = await fetch(`${this.baseUrl}users/?limit=99&offset=1`, {
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
}

