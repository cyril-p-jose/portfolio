const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const errorMsg = document.getElementById("errorMsg");

    // Email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    // Phone validation (10 digits)
    const phonePattern = /^[0-9]{10}$/;

    if (!email.match(emailPattern)) {
        errorMsg.innerText = "Invalid Email!";
        return;
    }

    if (!phone.match(phonePattern)) {
        errorMsg.innerText = "Phone must be 10 digits!";
        return;
    }

    // Success
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("portfolioPage").classList.remove("hidden");
});

// Navigation
function showSection(sectionId) {
    const sections = document.querySelectorAll(".section");

    sections.forEach(sec => {
        sec.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");
}
