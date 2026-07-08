document.addEventListener("DOMContentLoaded", () => {
    fetch('/navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("Navbar file nahi mili bhai!");
            }
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById('navbar-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
            }

            const menuIcon = document.getElementById("menuIcon");
            const mobileMenu = document.getElementById("mobileMenu");

            if (menuIcon && mobileMenu) {
                menuIcon.addEventListener("click", () => {
                    menuIcon.classList.toggle("menu-icon-active");
                    mobileMenu.classList.toggle("open");
                });
            }

            const currentPath = window.location.pathname;

            const allLinks = document.querySelectorAll('.navbar a, .mobile-menu-overlay a');

            allLinks.forEach(link => {
                const linkPath = link.getAttribute('href');

                if (currentPath === linkPath || (currentPath === '/' && linkPath === '/index.html')) {
                    if (link.classList.contains('nav-multi-p')) {
                        link.classList.add('active');
                    } else {
                        const textElement = link.querySelector('.nav-multi-p');
                        if (textElement) textElement.classList.add('active');
                    }
                }
            });
        })
        .catch(error => console.error("Error loading navbar:", error));
});