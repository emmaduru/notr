const register_form = document.querySelector("#register-form");

register_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const first_name = register_form.first_name.value;
    const last_name = register_form.last_name.value;
    const email = register_form.email.value;
    const password = register_form.password.value;
    const confirm_password = register_form.confirm_password.value;

    const form_err = document.querySelector(".form-err");
    const set_form_err_content = (err) => {
        form_err.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${err}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
    }
    if (password !== confirm_password) {
        set_form_err_content("Password fields must match.");
        return;
    }

    try {
        const res = await fetch("/register", {
            method: "POST",
            body: JSON.stringify({first_name, last_name, email, password}),
            headers: {"Content-Type": "application/json"}
        });
        const data = await res.json();

        if (data.success) {
            location.replace("/login")
        }
        else {
            set_form_err_content(data.message);
        }
    } catch (err) {
        console.log(err);
    }
})