// EmailJS initialisieren (siehe index.html)

// Formulardaten validieren und E-Mail senden
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Verhindert das Absenden des Formulars

    // Formularfelder abrufen
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    // Validierung
    if (name === "" || email === "" || message === "") {
        displayFeedback("Bitte füllen Sie alle Felder aus.", "red");
        return;
    }

    if (!validateEmail(email)) {
        displayFeedback("Bitte geben Sie eine gültige E-Mail-Adresse ein.", "red");
        return;
    }

    // E-Mail senden mit EmailJS
    const params = {
        from_name: name,
        from_email: email,
        message: message
    };

    emailjs.send('service_hpn0v9i', 'template_02lmihb', params)
        .then(function(response) {
            displayFeedback("Vielen Dank für Ihre Nachricht!", "green");
            document.getElementById("contactForm").reset();
        }, function(error) {
            displayFeedback("Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.", "red");
            console.error("EmailJS Fehler:", error);
        });
});

// E-Mail-Validierung
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Feedback anzeigen
function displayFeedback(message, color) {
    const feedback = document.getElementById("formFeedback");
    feedback.textContent = message;
    feedback.style.color = color;
}

// Back-to-Top Button anzeigen oder ausblenden
window.onscroll = function() { scrollFunction(); };

function scrollFunction() {
    const backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

// Nach oben scrollen bei Klick auf den Button
document.getElementById("backToTop").addEventListener("click", function() {
    document.body.scrollTop = 0; // Für Safari
    document.documentElement.scrollTop = 0; // Für Chrome, Firefox, IE und Opera
});



// Typing Effect
const typingElement = document.getElementById('typing');
const textArray = ["Willkommen auf meinem Portfolio", "Webentwickler", "JavaScript Enthusiast"];
let textIndex = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;

function type() {
    if (textIndex < textArray.length) {
        if (!isDeleting && charIndex <= textArray[textIndex].length) {
            currentText = textArray[textIndex].substring(0, charIndex++);
            typingElement.textContent = currentText;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex >= 0) {
            currentText = textArray[textIndex].substring(0, charIndex--);
            typingElement.textContent = currentText;
            setTimeout(type, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                textIndex++;
                charIndex = 0;
            }
            setTimeout(type, 500);
        }
    } else {
        textIndex = 0;
        setTimeout(type, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    type();
});

// Skills Animation
const skillsSection = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.progress-bar');

function showSkills() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-skill-level');
        bar.style.width = width;
    });
}

skillsSection.addEventListener('mouseenter', showSkills);
