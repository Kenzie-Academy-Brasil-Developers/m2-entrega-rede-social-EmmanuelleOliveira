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
        console.log(this.token)
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

    static async getPosts() {
        const posts = await fetch(`${this.baseUrl}posts/`, {
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
    }
}

