document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const commentsInput = document.getElementById("comments");
    const formErrorsInput = document.getElementById("form-errors");

    let form_errors = [];

    // Character Masking for Name Field
    nameInput.addEventListener("input", function (event) {
        const regex = /^[A-Za-z\s]+$/;
        if (!regex.test(this.value)) {
            this.value = this.value.replace(/[^A-Za-z\s]/g, "");
            showError("name-error", "Only letters and spaces allowed.");
        }
    });

    // Character Countdown for Comments Field
    commentsInput.addEventListener("input", function () {
        const remaining = 500 - this.value.length;
        const counter = document.getElementById("char-count");

        counter.textContent = `${remaining} characters left`;
        counter.style.color = remaining < 50 ? "red" : "white";

        if (remaining <= 0) {
            showError("comments-error", "You have reached the character limit.");
        }
    });

    // Custom Validation Messages
    form.addEventListener("submit", function (event) {
        form_errors = [];

        // Validate Name
        if (!nameInput.checkValidity()) {
            showError("name-error", "Name must be at least 2 characters and contain only letters.");
            form_errors.push({ field: "name", message: "Invalid Name" });
        }

        // Validate Email
        if (!emailInput.checkValidity()) {
            showError("email-error", "Enter a valid email address.");
            form_errors.pusdocument.addEventListener("DOMContentLoaded", function () {
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
                    const remaining = 500 - this.value.length;
                    const counter = document.getElementById("char-count");
            
                    counter.textContent = `${remaining} characters left`;
                    counter.style.color = remaining < 50 ? "red" : "white";
            
                    if (remaining <= 0) {
                        showError("comments-error", "You have reached the character limit.");
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
            
                    // Convert Errors to JSON & Set to Hidden Input
                    formErrorsInput.value = JSON.stringify(form_errors);
            
                    // Prevent Submission if Errors Exist
                    if (form_errors.length > 0) {
                        event.preventDefault();
                    }
                });
            
                // Function to Show Errors in UI
                function showError(outputId, message) {
                    const output = document.getElementById(outputId);
                    output.textContent = message;
                    output.style.color = "red";
                    output.style.fontSize = "0.9rem";
            
                    // Flash effect
                    output.classList.add("flash");
                    setTimeout(() => {
                        output.classList.remove("flash");
                        output.textContent = "";
                    }, 3000);
                }
            });
            h({ field: "email", message: "Invalid Email" });
        }

        // Validate Comments Length
        if (commentsInput.value.length < 10) {
            showError("comments-error", "Comments must be at least 10 characters.");
            form_errors.push({ field: "comments", message: "Comment too short" });
        }

        // If there are errors, prevent submission
        if (form_errors.length > 0) {
            event.preventDefault();
            formErrorsInput.value = JSON.stringify(form_errors);
        }
    });

    // Function to Show Errors and Fade Them Out
    function showError(outputId, message) {
        const output = document.getElementById(outputId);
        output.textContent = message;
        output.style.color = "white";
        output.style.fontSize = "0.9rem";

        // Flash effect
        output.classList.add("flash");
        setTimeout(() => {
            output.classList.remove("flash");
            output.textContent = "";
        }, 3000);
    }
});
