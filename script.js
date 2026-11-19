
/* =================================
   SNAIDER ANYANGO WEBSITE JAVASCRIPT
================================= */

// 1. MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", function () {
        navbar.classList.toggle("active");

        menuToggle.textContent =
            navbar.classList.contains("active") ? "✕" : "☰";
    });
}

// 2. ACTIVE NAVIGATION LINK
document.querySelectorAll("#navbar a").forEach(link => {
    if (
        link.pathname === window.location.pathname ||
        (window.location.pathname.endsWith("/") &&
         link.getAttribute("href") === "index.html")
    ) {
        link.classList.add("active");
    }
});

// 3. GREETING BUTTON
const greetBtn = document.getElementById("greetBtn");
const greeting = document.getElementById("greeting");

if (greetBtn && greeting) {
    greetBtn.addEventListener("click", function () {
        greeting.textContent =
            "Hello! Welcome to my personal website. Thank you for visiting! 💗";
    });
}

// 4. CHANGE PROFILE PHOTO
const photoUpload = document.getElementById("photoUpload");
const profilePhoto = document.getElementById("profilePhoto");

if (profilePhoto) {
    const savedPhoto = localStorage.getItem("myProfilePhoto");

    if (savedPhoto) {
        profilePhoto.src = savedPhoto;
    }
}

if (photoUpload && profilePhoto) {
    photoUpload.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image!");
            this.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Please select an image smaller than 2MB.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            try {
                localStorage.setItem(
                    "myProfilePhoto",
                    event.target.result
                );

                profilePhoto.src = event.target.result;

                alert("Your photo has been changed successfully! 💕");

            } catch (error) {
                alert("Unable to save this photo. Try a smaller image.");
            }
        };

        reader.readAsDataURL(file);
    });
}

// 5. SKILLS ANIMATION
const progressBars = document.querySelectorAll(".progress-bar");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const bar = entry.target;

                bar.style.width = bar.dataset.progress;

                observer.unobserve(bar);
            }

        });

    }, { threshold: 0.2 });

    progressBars.forEach(bar => observer.observe(bar));

} else {
    progressBars.forEach(bar => {
        bar.style.width = bar.dataset.progress;
    });
}

// 6. INTERACTIVE INTEREST CARDS
document.querySelectorAll(".interest-card").forEach(card => {

    card.addEventListener("click", function () {

        card.classList.toggle("selected");

    });

});

// 7. MOTIVATION BUTTON
const motivationBtn = document.getElementById("motivationBtn");
const motivationMessage =
    document.getElementById("motivationMessage");

const messages = [
    "Believe in yourself. Your dreams are possible! 💗",
    "Keep learning. Your future is bright! 🌟",
    "Every small step takes you closer to success! 🎯",
    "Never give up on your dreams! 💜",
    "You are capable of amazing things! 🌷"
];

if (motivationBtn && motivationMessage) {

    motivationBtn.addEventListener("click", function () {

        const randomIndex =
            Math.floor(Math.random() * messages.length);

        motivationMessage.textContent =
            messages[randomIndex];

    });

}

// 8. CONTACT FORM
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const emailBody =
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message;

        const mailLink =
            "mailto:YOUR_EMAIL@gmail.com" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(emailBody);

        formMessage.textContent =
            "Opening your email application to send your message... 💗";

        window.location.href = mailLink;
    });
}

// 9. AUTOMATIC FOOTER YEAR
document.querySelectorAll(".year").forEach(element => {
    element.textContent = new Date().getFullYear();
});


/* ===== HOME PAGE PHOTO UPLOAD ===== */

const homePhotoUpload = document.getElementById("homePhotoUpload");
const homeProfilePhoto = document.getElementById("homeProfilePhoto");

// Display previously selected photo
const savedHomePhoto = localStorage.getItem("myProfilePhoto");

if (savedHomePhoto && homeProfilePhoto) {
    homeProfilePhoto.src = savedHomePhoto;
}

// Upload a new photo
if (homePhotoUpload && homeProfilePhoto) {

    homePhotoUpload.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Please choose a photo smaller than 2MB.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {

            homeProfilePhoto.src = event.target.result;

            // Remember the selected photo in this browser
            try {
                localStorage.setItem("myProfilePhoto", event.target.result);
            } catch (error) {
                alert("This photo could not be saved. Please choose a smaller image.");
            }
        };

        reader.readAsDataURL(file);
    });
}
