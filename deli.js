/* Back to top button */

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

/* Navigation */

/* Sign home? */

/* Products pages */

/* let products = [{
    "imageSRC": "./images/file1_f.jpg",
    "title": "Филе Елена",
    "price": "4.99лв",
    "description": "Класическо мезе направено по рецепта от Елена.",
    "ingredients": "Съставки: Свинско контрафиле, чубрица - ронена и смляна, сминдух, сол"
},
{
    "imageSRC": "./images/file2_f.jpg",
    "title": "Пастърма",
    "price": "5.99лв",
    "description": "Много вкусно пастърма с червен пипер и пушен червен пипер.",
    "ingredients": "Съставки: Свинско контрафиле, червен пипер, пушен червен пипер, сол"
}
] */


const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const homePageLink = Array.from(navLinks).find(p => p.dataset = "landing");

window.onload = function () {
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            const target = this.dataset.navLink;

            const currentPage = Array.from(pages).find(p => !p.classList.contains("d-none"));
            /* const currentLink = Array.from(navLinks).find(l => l.classList.contains("active")); */

            if (currentPage && currentPage.dataset.page === target) return;

            navLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");

            // Add animationend handler once
            const handleAnimationEnd = () => {
                currentPage.classList.add("d-none");
                currentPage.classList.remove("active");
                currentPage.removeEventListener("animationend", handleAnimationEnd);

                const newPage = Array.from(pages).find(p => p.dataset.page === target);
                if (newPage) {
                    newPage.classList.remove("d-none");
                    scrollTo(0, 0);
                }
            };

            currentPage.addEventListener("animationend", handleAnimationEnd);
            currentPage.classList.add("active"); // Trigger animation
        });
    });
}




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
        homePageLink.click();
    }, function (error) {
        alert("Failed sending message. Please try again in a bit.")
    });


})