document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Retrieve user data from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // Validate username and password
    if (username === storedUsername && password === storedPassword) {
      // Store login status in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username); // Store username in localStorage

      // Redirect to index.html
      window.location.href = "index.html";
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
});
