
// Toggle the mobile menu on/off
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navList = document.querySelector('.nav-list');

    mobileMenuIcon.addEventListener('click', function () {
        navList.classList.toggle('show');
    });
});
