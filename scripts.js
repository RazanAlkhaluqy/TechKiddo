
// Toggle the mobile menu on/off

    document.addEventListener('DOMContentLoaded', function () {
        const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
        const navList = document.querySelector('.nav-list');
    
        mobileMenuIcon.addEventListener('click', function () {
            navList.classList.toggle('show');
        });
    });
    document.addEventListener('DOMContentLoaded', function () {
        const customizeButton = document.getElementById('customize-button');
        const themeStylesheet1 = document.getElementById('theme-stylesheet');
        const themeStylesheet2 = document.querySelector('link[href="theme2.css"]');
    
        // Check if there's a saved preference in local storage
        const savedPreference = localStorage.getItem('themePreference');
    
        // Set the initial theme based on the saved preference
        if (savedPreference === 'theme1') {
            themeStylesheet1.removeAttribute('disabled');
            themeStylesheet2.setAttribute('disabled', 'true');
            document.body.classList.remove('theme2');
            document.body.classList.add('theme1');
        } else {
            themeStylesheet1.setAttribute('disabled', 'true');
            themeStylesheet2.removeAttribute('disabled');
            document.body.classList.remove('theme1');
            document.body.classList.add('theme2');
        }
    
        customizeButton.addEventListener('click', function () {
            // Toggle between themes
            if (themeStylesheet1.disabled) {
                themeStylesheet1.removeAttribute('disabled');
                themeStylesheet2.setAttribute('disabled', 'true');
                document.body.classList.remove('theme2');
                document.body.classList.add('theme1');
                // Save the preference in local storage
                localStorage.setItem('themePreference', 'theme1');
            } else {
                themeStylesheet1.setAttribute('disabled', 'true');
                themeStylesheet2.removeAttribute('disabled');
                document.body.classList.remove('theme1');
                document.body.classList.add('theme2');
                // Save the preference in local storage
                localStorage.setItem('themePreference', 'theme2');
            }
        });
    });
    
     
        