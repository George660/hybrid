const mobileToggle = document.querySelector(".mobile-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuModal = document.querySelectorAll(".menu-modal");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal-close img");

mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("mobile-toggle-zero");
    mobileToggle.classList.toggle("mobile-toggle-jx");
    mobileMenu.classList.toggle("mobile-menu-show");
});
for (let i = 0; i < menuModal.length; i++) {
    menuModal[i].addEventListener("click", e => {
        e.preventDefault();
        modal.classList.add("modal-show");
    });
}

modalCloseBtn.addEventListener("click", () => {
    modal.classList.remove("modal-show");
});

modal.addEventListener("click", e => {
    if (e.target.classList.contains("modal")) {
        modal.classList.remove("modal-show");
    } else {
        return;
    }
});
