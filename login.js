document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // For demo purposes, assume authentication is successful
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validate username and password (add your validation logic here)
    if (username === "example" && password === "password") {
      // Store login status in local storage
      localStorage.setItem("isLoggedIn", "true");

      // Redirect to index.html
      window.location.href = "index.html";
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
});