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
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(err => err);
        return newUser;
    };
}

