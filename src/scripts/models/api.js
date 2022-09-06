export class Api {
    static baseUrl = "https://m2-rede-social.herokuapp.com/api/";
    static token = localStorage.getItem("@kenzieRedeSocial:token") || "";
    static headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
    };

    static async login(body) {
        console.log(body)
        const userLogin = await fetch(`${this.baseUrl}users/login/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            localStorage.setItem("@kenzieRedeSocial:token", res.token);
            localStorage.setItem("@kenzieRedeSocial:userId", res.user_uuid);
            window.location.assign("src/pages/dashboard.html");
            
            return res; 
        })
        .catch(err => console.log(err));
        return userLogin; 
        /* return {
            "token": "a9b5d3e0aca0aa07a2b680147dfada5be1",
            "user_uuid": "ff3ec410-f435-4eb6-9e4a-76a97ffc7"
        } */
    };

    static async register(body) {
        console.log(body);
        const newUser = await fetch(`${this.baseUrl}users/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            window.location.assign('../../index.html');
            return res;
        })
        .catch(err => console.log(err));
        return newUser;
    };
}

