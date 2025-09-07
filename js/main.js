// burger
document.querySelector(".burger").addEventListener("click", () => {
    document.querySelector(".navbar").classList.toggle("show");
});

// back to top
document.addEventListener("DOMContentLoaded", () => {
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > window.innerHeight * 0.5) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// dark/ light mode
const darkToggle = document.getElementById("dark-mode-toggle");
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});




