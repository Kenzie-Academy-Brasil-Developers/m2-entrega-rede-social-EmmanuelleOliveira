import { Api } from "./models/api.js";
import { Modal } from "./models/modal.js";

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
            if(emailInput.value !== "" && passwordInput.value !== "") {
                const body = {
                    email: emailInput.value,
                    password: passwordInput.value
                };
                const response = await Api.login(body);
                const token = localStorage.getItem("@kenzieRedeSocial:token");
                if(token && !response.non_field_errors) {
                    window.location.assign("src/pages/dashboard.html");
                } else {
                    Modal.showModal();
                } 
            } else {
                Modal.showModal();
            }
        });
    }
}

LoginPage.renderLoginPage();
LoginPage.renderRegisterPage();