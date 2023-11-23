
// Toggle the mobile menu on/off

    document.addEventListener('DOMContentLoaded', function () {
        const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
        const navList = document.querySelector('.nav-list');
    
        mobileMenuIcon.addEventListener('click', function () {
            navList.classList.toggle('show');
        });
    
        const customizeButton = document.getElementById('customize-button');
        let isDarkMode = localStorage.getItem('isDarkMode') === 'true';
    
        // Function to toggle theme
        function toggleTheme() {
            const themeStylesheet1 = document.getElementById('theme-stylesheet');
            const themeStylesheet2 = document.querySelector('link[href="theme2.css"]');
    
            if (isDarkMode) {
                themeStylesheet1.removeAttribute('disabled');
                themeStylesheet2.setAttribute('disabled', 'true');
            } else {
                themeStylesheet1.setAttribute('disabled', 'true');
                themeStylesheet2.removeAttribute('disabled');
            }
    
            // Toggle Dark Mode / Light Mode text
            isDarkMode = !isDarkMode;
    
            // Update the button text on all pages
            customizeButton.textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
    
            // Save the user's preference to localStorage
            localStorage.setItem('isDarkMode', isDarkMode.toString());
        }
    
        // Set initial theme based on user's preference
        toggleTheme();
    
        customizeButton.addEventListener('click', toggleTheme);
    });
    