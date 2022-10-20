const login_form = document.querySelector("#login-form");

login_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = login_form.email.value;
    const password = login_form.password.value;

    const form_err = document.querySelector(".form-err");
    const set_form_err_content = (err) => {
        form_err.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${err}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
    }

    try {
        const res = await fetch('/login', {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {"Content-Type": "application/json"}
        });
        const data = await res.json();

        if (data.success) {
            location.replace("/")
        } else {
            set_form_err_content(data.message)
        }
    } catch (err) {
        console.log(err)
    }
})