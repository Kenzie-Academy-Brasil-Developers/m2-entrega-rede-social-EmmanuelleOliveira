import { Api } from "./models/api.js";

class LoginPage {
    static renderRegisterPage() {
        const backLoginBtn = document.getElementById("back-register-btn");
        backLoginBtn.addEventListener("click", () => {
            window.location.assign("../src/pages/register.html");
        });
    };

    static renderLoginPage() {
        const token = localStorage.getItem("@kenzieRedeSocial:token");
        if (token) {
            window.location.assign("src/pages/dashboard.html");
        }
        const emailInput = document.querySelector("#user-email");
        const passwordInput = document.querySelector("#user-password");
        const loginButton = document.querySelector("#login-btn");
        loginButton.addEventListener("click", async () => {
            const body = {
                email: emailInput.value,
                password: passwordInput.value
            };
            const response = await Api.login(body);
            if(response) {
                window.location.assign("src/pages/dashboard.html");
            }
            /* if (response.error) {
                alert(response.error);
            } */
        });
    }
}

LoginPage.renderLoginPage();
LoginPage.renderRegisterPage();