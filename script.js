
// ===================================
// 1. AUTOMATIC FOOTER YEAR
// ===================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ===================================
// 2. MOBILE NAVIGATION
// ===================================

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });

}


// ===================================
// 3. PROFILE PHOTO UPLOAD
// ===================================

const photoUpload = document.getElementById("photoUpload");
const profilePhoto = document.getElementById("profilePhoto");

if (photoUpload && profilePhoto) {

    // Load previously saved photo
    const savedPhoto = localStorage.getItem("snaiderPhoto");

    if (savedPhoto) {
        profilePhoto.src = savedPhoto;
    }

    // Upload a new photo
    photoUpload.addEventListener("change", function () {

        const file = photoUpload.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Image must be smaller than 2MB.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {

            profilePhoto.src = event.target.result;

            localStorage.setItem(
                "snaiderPhoto",
                event.target.result
            );

        };

        reader.readAsDataURL(file);

    });

}


// ===================================
// 4. EMAILJS CONTACT FORM
// ===================================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const sendButton = document.getElementById("send-button");
        const status = document.getElementById("form-status");

        sendButton.disabled = true;
        sendButton.textContent = "Sending...";

        status.textContent = "Sending your message...";
        status.style.color = "#d63384";

        emailjs.sendForm(
            "service_zrjjqkd",
            "template_cxem2xq",
            contactForm
        )

        .then(function () {

            status.textContent =
                "Message sent successfully! Thank you for contacting me.";

            status.style.color = "green";

            contactForm.reset();

        })

        .catch(function (error) {

            console.error("EmailJS Error:", error);

            status.textContent =
                "Message not sent. Please try again.";

            status.style.color = "red";

        })

        .finally(function () {

            sendButton.disabled = false;
            sendButton.textContent = "Send Message";

        });

    });

}


// ===================================
// 5. ACTIVE NAVIGATION LINK
// ===================================

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(function (link) {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    }

});


// ===================================
// END OF SCRIPT
// ===================================
