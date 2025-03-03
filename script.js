document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const commentsInput = document.getElementById("comments");
    const formErrorsInput = document.getElementById("form-errors");
    let form_errors = [];

    // Strict Email Validation Function
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // Function to Add Error to `form_errors[]`
    function logError(field, message) {
        form_errors.push({ field: field, message: message });
    }

    // Function to Show Errors in UI
    function showError(outputId, message) {
        const output = document.getElementById(outputId);
        output.textContent = message;
        output.style.color = "white";
        output.style.fontSize = "0.9rem";
        output.classList.add("flash");
        setTimeout(() => {
            output.classList.remove("flash");
            output.textContent = "";
        }, 3000);
    }

    // Name Field - Only Allow Letters & Spaces
    nameInput.addEventListener("input", function () {
        const regex = /^[A-Za-z\s]+$/;
        if (!regex.test(this.value)) {
            this.value = this.value.replace(/[^A-Za-z\s]/g, "");
            showError("name-error", "Only letters and spaces allowed.");
        }
    });

    // Character Countdown for Comments Field
    commentsInput.addEventListener("input", function () {
        const maxChars = 500;
        const remaining = maxChars - this.value.length;
        const counter = document.getElementById("char-count");

        counter.textContent = remaining >= 0 ? `${remaining} characters left` : "0 characters left";
        counter.style.color = remaining < 50 ? "red" : "white";

        // Flash error if text exceeds max length (if somehow pasted in extra characters)
        if (this.value.length > maxChars) {
            if (!counter.classList.contains("flash")) {
                counter.classList.add("flash");
                setTimeout(() => {
                    counter.classList.remove("flash");
                }, 1500);
            }
            showError("comments-error", "You have reached the character limit.");
            logError("comments", "Exceeded maximum characters");
        }
    });

    // Prevent further keystrokes if max limit reached
    commentsInput.addEventListener("keydown", function (event) {
        const maxChars = 500;
        // Allow control keys even if limit is reached
        const allowedKeys = [
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "Home",
            "End"
        ];

        // If the length is at or above the limit and the key pressed is a single character (not a control key)
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

    // Prevent Form Submission if Errors Exist
    form.addEventListener("submit", function (event) {
        form_errors = []; // Reset error array

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

        // Validate Comments Length
        if (commentsInput.value.length < 10) {
            showError("comments-error", "Comments must be at least 10 characters.");
            logError("comments", "Comment too short");
        }

        // Update hidden field with JSON error log
        formErrorsInput.value = JSON.stringify(form_errors);

        console.log("Form Errors:", form_errors); // Debug log

        // Prevent submission if errors exist
        // if (form_errors.length > 0) {
        //     event.preventDefault();
        // }
    });
});
