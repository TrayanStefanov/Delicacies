/* Back to top button */

window.onscroll = function () {
    scrollFunction();
};

let backToTop = document.getElementById("btn-back-to-top");
backToTop.style.display = "none";

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

const navLinks = document.querySelectorAll("[data-nav-link]");
const homePageLink = Array.from(navLinks).find(link => link.dataset = "landing");

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

/* Products pages */

const productPages = document.querySelectorAll("[data-product-page]");
const paginationLinks = document.querySelectorAll("[data-pagination-link]");
const productsArticle = document.querySelector('[data-page="products"]');
const pages = document.querySelectorAll("[data-page]");

let currentPage = 1;
const totalPages = productPages.length;

paginationLinks.forEach(link => {
    link.addEventListener("click", function () {
        const text = this.textContent.trim();

        // Determine new page
        let newPage;
        if (text === "Назад") {
            newPage = currentPage > 1 ? currentPage - 1 : 1;
        } else if (text === "Напред") {
            newPage = currentPage < totalPages ? currentPage + 1 : totalPages;
        } else {
            newPage = parseInt(text);
        }

        // If page hasn't changed, do nothing
        if (newPage === currentPage || isNaN(newPage)) return;

        const paginationAnimation = () => {
            // Hide current product page
            const currentProductPage = document.querySelector(`[data-product-page="${currentPage}"]`);
            if (currentProductPage) currentProductPage.classList.add("d-none");

            // Show new product page
            const newProductPage = document.querySelector(`[data-product-page="${newPage}"]`);
            if (newProductPage) newProductPage.classList.remove("d-none");

            // Reset animation state
            productsArticle.classList.remove("active");
            productsArticle.removeEventListener("animationend", paginationAnimation);

            currentPage = newPage;
            updatePaginationUI();
        };

        // Trigger animation
        productsArticle.addEventListener("animationend", paginationAnimation);
        productsArticle.classList.add("active");
    });
});

/* Pagination state update */

function updatePaginationUI() {
    paginationLinks.forEach(link => {
        const text = link.textContent.trim();
        const parent = link.closest(".page-item");

        // Reset state
        parent.classList.remove("active", "disabled");

        if (text === "Назад") {
            if (currentPage === 1) parent.classList.add("disabled");
        } else if (text === "Напред") {
            if (currentPage === totalPages) parent.classList.add("disabled");
        } else if (parseInt(text) === currentPage) {
            parent.classList.add("active");
        }
    });
}

/* Full product info */

const productCards = document.querySelectorAll(".products .card");
const fullProduct = document.querySelector(".full-product");

// Select full product content areas
const fullProductImage = fullProduct.querySelector("img");
const fullProductTitle = fullProduct.querySelector("h1");
const fullProductDescription = fullProduct.querySelector("#file-info-head p.fs-5");
const fullProductIngredients = fullProduct.querySelector("#file-info-head p.fs-6");
const fullProductPrice = fullProduct.querySelector("#file-info-bottom div:nth-child(1) div:last-child");

productCards.forEach(card => {
    card.addEventListener("click", () => {
        const imgSrc = card.querySelector("img").getAttribute("src");
        const title = card.querySelector(".card-title").textContent;
        const description = card.querySelectorAll("p")[0].textContent;
        const ingredients = card.querySelectorAll("p")[1].textContent;
        const price = card.querySelector(".d-flex div:last-child").textContent;

        // Fill full-product section
        fullProductImage.setAttribute("src", imgSrc);
        fullProductTitle.textContent = title;
        fullProductDescription.textContent = description;
        fullProductIngredients.textContent = ingredients;
        fullProductPrice.textContent = price;

        // Show full product, hide product page
        const productsArticleAnimation = () => {
            // Reset animation state
            productsArticle.classList.add("d-none");
            productsArticle.classList.remove("active");
            productsArticle.removeEventListener("animationend", productsArticleAnimation);
            fullProduct.classList.remove("d-none");
        };
        productsArticle.addEventListener("animationend", productsArticleAnimation);
        productsArticle.classList.add("active");
        scrollTo({ top: 0, behavior: "smooth" });
    });
});



const closeBtn = document.querySelector(".full-product .close-btn");

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        // Optionally trigger hide animation
        const handleClose = () => {
            fullProduct.classList.add("d-none");
            fullProduct.classList.remove("active");
            fullProduct.removeEventListener("animationend", handleClose);

            productsArticle.classList.remove("d-none");
            scrollTo({ top: 0, behavior: "smooth" });
        };

        fullProduct.addEventListener("animationend", handleClose);
        fullProduct.classList.add("active"); // triggers .active → fade-out animation
    });
}


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