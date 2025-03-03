document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
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

    // Function to Add Error to form_errors[]
    function logError(field, message) {
        // You could add more details (like timestamp) if needed
        form_errors.push({ field: field, message: message });
    }

    // Function to Show Errors in UI with flash effect
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
        const regex = /^[A-Za-z\s]*$/; // allow empty string or valid characters
        if (!regex.test(this.value)) {
            logError("name", "Illegal character entered in name field.");
            // Remove disallowed characters
            this.value = this.value.replace(/[^A-Za-z\s]/g, "");
            showError("name-error", "Only letters and spaces allowed.");
        }
    });

    // Character Countdown for Comments Field
    commentsInput.addEventListener("input", function () {
        const maxChars = 500;
        const currentLength = this.value.length;
        const remaining = maxChars - currentLength;
        const counter = document.getElementById("char-count");

        counter.textContent = remaining >= 0 ? `${remaining} characters left` : "0 characters left";
        counter.style.color = remaining < 50 ? "red" : "white";

        if (currentLength > maxChars) {
            // Log error as soon as the limit is exceeded.
            logError("comments", "Exceeded maximum characters.");
            // Flash the counter element if not already flashing
            if (!counter.classList.contains("flash")) {
                counter.classList.add("flash");
                setTimeout(() => {
                    counter.classList.remove("flash");
                }, 1500);
            }
            showError("comments-error", "You have reached the character limit.");
        }
    });

    // Prevent further keystrokes if max limit reached (for comments field)
    commentsInput.addEventListener("keydown", function (event) {
        const maxChars = 500;
        const allowedKeys = [
            "Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"
        ];
        if (this.value.length >= maxChars && event.key.length === 1 && !allowedKeys.includes(event.key)) {
            event.preventDefault();
            // Flash the counter as feedback
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

    // Form Submission Handler
    form.addEventListener("submit", function (event) {
        // DO NOT reset form_errors here – let it accumulate all mistakes.
        // form_errors = []; // (Commented out so earlier errors remain)

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

        // Update the hidden field with the accumulated error log
        formErrorsInput.value = JSON.stringify(form_errors);

        console.log("Captured Form Errors:", form_errors); // Debugging Log

        // Optionally, you can block submission if there are errors.
        // For testing (to see the errors logged), you might allow submission.
        // if (form_errors.length > 0) {
        //     event.preventDefault();
        // }
    });
});
