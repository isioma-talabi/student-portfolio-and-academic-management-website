const form = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-btn");

// Event listener to stop form from submitting until we have validated the form
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  clearErrors();

  const firstName = document.getElementById("fname");
  const lastName = document.getElementById("lname");
  const email = document.getElementById("email_address");
  const phone = document.getElementById("phone-number");
  const message = document.getElementById("message");

  let isValid = true;

  //   Logic to ensure that no field is empty. Use trim() to check that a field of only spaces counts as empty
  [firstName, lastName, email, phone, message].forEach(function (field) {
    if (field.value.trim() === "") {
      showError(field, "This field is required.");
      isValid = false;
    }
  });

  // Logic to check that email format is valid: something@something.something, no spaces
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() !== "" && !emailPattern.test(email.value.trim())) {
    showError(email, "Enter a valid email address, e.g. name@example.com.");
    isValid = false;
  }

  // Logic to check that Phone number contains only digits (one or more 0-9, nothing else)
  const phonePattern = /^\d+$/;
  if (phone.value.trim() !== "" && !phonePattern.test(phone.value.trim())) {
    showError(
      phone,
      "Phone number must contain digits only, with no spaces or symbols.",
    );
    isValid = false;
  }

  if (isValid) {
    alert("Thank you. Your message has been sent.");
    form.reset();
  }
});

// Puts an error message directly under the field that failed
function showError(input, text) {
  input.classList.add("input-error");
  const error = document.createElement("small");
  error.className = "error-message";
  error.textContent = text;
  input.insertAdjacentElement("afterend", error);
}

// Removes old messages so errors don't stack up on each submit
function clearErrors() {
  document.querySelectorAll(".error-message").forEach(function (el) {
    el.remove();
  });
  document.querySelectorAll(".input-error").forEach(function (el) {
    el.classList.remove("input-error");
  });
}