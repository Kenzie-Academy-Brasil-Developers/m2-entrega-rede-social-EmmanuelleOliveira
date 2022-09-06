import { Api } from "./api.js";

class RegisterPage {
    static renderHomePage() {
        const backLoginBtn = document.getElementById("back-login-btn");
        backLoginBtn.addEventListener("click", () => {
            window.location.assign("../../index.html");
        });
        const backLoginBtnSecond = document.getElementById("back-login-btn-second");
        backLoginBtnSecond.addEventListener("click", () => {
            window.location.assign("../../index.html");
        });
    };

    static renderRegister() {
        const nameInput = document.querySelector("#user-name");
        const emailInput = document.querySelector("#user-email");
        const passwordInput = document.querySelector("#user-password");
        const workInput = document.querySelector("#user-work");
        const urlInput = document.querySelector("#user-url");
        const registerButton = document.querySelector("#register-btn");
        registerButton.addEventListener("click", async () => {
            const body = {
                username: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                "work_at": workInput.value,
                image: urlInput.value
            };
            const response = await Api.register(body);
            if (response.error) {
                alert(response.error);
            }
        });
    }
} 

RegisterPage.renderHomePage();
RegisterPage.renderRegister();