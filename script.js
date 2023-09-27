// Common JavaScript code for both pages

// Function to check if a user exists in localStorage
function userExists(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.email === email && user.password === password);
}

// Event listener for login and register forms
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const errorElement = document.getElementById("error");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (userExists(email, password)) {
                // Redirect to the home page or perform other actions as needed.
                window.location.href = "quiz.html";
            } else {
                errorElement.textContent = "User not found. Please check your email and password.";
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                errorElement.textContent = "Passwords do not match.";
                return;
            }

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const existingUser = users.find(user => user.email === email);

            if (existingUser) {
                errorElement.textContent = "User with this email already exists.";
                return;
            }

            const newUser = {
                email: email,
                username: username,
                password: password
            };

            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            // Redirect to the login page or perform other actions as needed.
            window.location.href = "index.html";
        });
    }
});
