window.onscroll = function () {
    scrollFunction();
};

let backToTop = document.getElementById("btn-back-to-top");

/* Checks if we have scrolled */

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
}

backToTop.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

/* Form submission */

const form = document.querySelector("[data-form]");
const formFields = document.querySelectorAll("[data-form-input]");
const formSubmitBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formFields.length; i++) {
    formFields[i].addEventListener("input", function () {
        if (form.checkValidity()) {
            formSubmitBtn.removeAttribute("disabled");
        }
    });
}

/* Emailjs implementation */

emailjs.init("bfJIAK9oYio7zkqe2")

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
        from_name: form.fullname.value,
        from_email: form.email.value,
        title: form.topic.value,
        message: form.message.value
    }

    emailjs.send("service_0juv8dt", "template_ukxfgdg", formData).then(function (response) {
        alert("Message sent successfully!");
        form.reset();
        formSubmitBtn.setAttribute("disabled", "");
    }, function (error) {
        alert("Failed sending message. Please try again in a bit.")
    });

})