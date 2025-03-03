document.addEventListener("DOMContentLoaded", function () {
    // ---------------------------
    // Dark & Light Theme Switcher
    // ---------------------------
    const themeSwitcher = document.getElementById("theme-switcher");
    if (themeSwitcher) {
      const body = document.body;
      // Retrieve saved theme from localStorage
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        body.classList.add("dark-theme");
        themeSwitcher.textContent = "🌜"; // Moon icon indicates dark mode
      } else {
        themeSwitcher.textContent = "🌞"; // Sun icon indicates light mode
      }
      // Toggle theme on click and save preference to localStorage
      themeSwitcher.addEventListener("click", function () {
        body.classList.toggle("dark-theme");
        if (body.classList.contains("dark-theme")) {
          themeSwitcher.textContent = "🌜";
          localStorage.setItem("theme", "dark");
        } else {
          themeSwitcher.textContent = "🌞";
          localStorage.setItem("theme", "light");
        }
      });
    }
  
    // -------------------------------------------------------
    // Existing Contact Form Validation & Logging (if present)
    // -------------------------------------------------------
    const form = document.getElementById("contact-form");
    if (form) {
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const commentsInput = document.getElementById("comments");
      const formErrorsInput = document.getElementById("form-errors");
      let form_errors = [];  // Cumulative log of errors
  
      // Strict Email Validation Function
      function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
      }
  
      // Function to add an error to form_errors[]
      function logError(field, message) {
        form_errors.push({ field: field, message: message });
      }
  
      // Function to show errors in the UI with flash effect
      function showError(outputId, message) {
        const output = document.getElementById(outputId);
        output.textContent = message;
        output.style.color = "red";
        output.style.fontSize = "0.9rem";
        output.classList.add("flash");
        setTimeout(() => {
          output.classList.remove("flash");
          output.textContent = "";
        }, 3000);
      }
  
      // Name Field - Only Allow Letters & Spaces
      nameInput.addEventListener("input", function () {
        const regex = /^[A-Za-z\s]*$/; // Allow empty string or valid characters
        if (!regex.test(this.value)) {
          logError("name", "Illegal character entered in name field.");
          // Remove disallowed characters
          this.value = this.value.replace(/[^A-Za-z\s]/g, "");
          showError("name-error", "Only letters and spaces allowed.");
        }
      });
  
      // Email Field - Log error on blur if invalid
      emailInput.addEventListener("blur", function () {
        if (this.value && !validateEmail(this.value)) {
          logError("email", "Invalid email address entered.");
          showError("email-error", "Enter a valid email address.");
        }
      });
  
      // Comments Field - Log error if character limit exceeded or on blur if too short
      commentsInput.addEventListener("input", function () {
        const maxChars = 500;
        const currentLength = this.value.length;
        const remaining = maxChars - currentLength;
        const counter = document.getElementById("char-count");
  
        // Display 0 characters left if exceeded
        counter.textContent = remaining >= 0 ? `${remaining} characters left` : "0 characters left";
        counter.style.color = remaining < 50 ? "red" : "white";
  
        if (currentLength > maxChars) {
          logError("comments", "Exceeded maximum characters.");
          if (!counter.classList.contains("flash")) {
            counter.classList.add("flash");
            setTimeout(() => {
              counter.classList.remove("flash");
            }, 1500);
          }
          showError("comments-error", "You have reached the character limit.");
        }
      });
  
      // Prevent further keystrokes if max limit reached for comments
      commentsInput.addEventListener("keydown", function (event) {
        const maxChars = 500;
        const allowedKeys = [
          "Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"
        ];
        if (this.value.length >= maxChars && event.key.length === 1 && !allowedKeys.includes(event.key)) {
          event.preventDefault();
          const counter = document.getElementById("char-count");
          if (!counter.classList.contains("flash")) {
            counter.classList.add("flash");
            setTimeout(() => {
              counter.classList.remove("flash");
            }, 1500);
          }
          showError("comments-error", "You have reached the character limit.");
          logError("comments", "Reached maximum characters.");
        }
      });
  
      // Comments Field - On blur, log error if too short
      commentsInput.addEventListener("blur", function () {
        if (this.value.length < 10) {
          logError("comments", "Comment too short.");
          showError("comments-error", "Comments must be at least 10 characters.");
        }
      });
  
      // Form Submission Handler
      form.addEventListener("submit", function (event) {
        // Validate Name
        if (!nameInput.checkValidity()) {
          showError("name-error", "Name must be at least 2 characters and contain only letters.");
          logError("name", "Invalid Name");
        }
  
        // Validate Email
        if (!validateEmail(emailInput.value)) {
          showError("email-error", "Enter a valid email address.");
          logError("email", "Invalid Email");
        }
  
        // Validate Comments Length (minimum)
        if (commentsInput.value.length < 10) {
          showError("comments-error", "Comments must be at least 10 characters.");
          logError("comments", "Comment too short");
        }
  
        // Update hidden field with the accumulated error log (JSON-encoded)
        formErrorsInput.value = JSON.stringify(form_errors);
  
        console.log("Captured Form Errors:", form_errors); // For debugging
  
        // For testing purposes, you might allow submission even if errors exist.
        // If you want to force the user to fix errors, uncomment the next block:
        // if (form_errors.length > 0) {
        //     event.preventDefault();
        // }
      });
    }
  });
  