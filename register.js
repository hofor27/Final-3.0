document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Here, you can add additional validation logic for username and password, such as length requirements, special characters, etc.
    // If the validation fails, display an error message and return.

    // For the demo, assume the registration is successful, and store user data in localStorage.
    // You can replace this with a server-side registration process in a real application.
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Registration successful. You can now log in with your credentials.");

    // Redirect to the login page after successful registration
    window.location.href = "login.html";
  });
});
