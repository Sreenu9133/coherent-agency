document.addEventListener("DOMContentLoaded", () => {
    // 1. Pata lagao ki current page kis depth par khula hai takki dynamic root path mil sake
    // Agar page subfolder me hai (e.g. services/branding.html), toh yeh "../" banayega
    const currentPath = window.location.pathname;
    const depth = (currentPath.match(/\//g) || []).length - 1;
    const basePrefix = depth > 0 ? "../".repeat(depth) : "./";

    // 2. Footer HTML file ko fetch karo
    fetch(basePrefix + 'footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("Footer file nahi mili bhai!");
            }
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) {
                // HTML inject karo
                placeholder.innerHTML = data;

                // 3. CRITICAL PATH RESOLUTION: Inject hone ke baad saare links aur images thik karo
                // Taaki kisi bhi folder se image aur anchor tags na tootey
                
                // Sabhi images (Logo etc.) ke paths sahi karo
                placeholder.querySelectorAll('img').forEach(img => {
                    const src = img.getAttribute('src');
                    if (src && !src.startsWith('http') && !src.startsWith('/')) {
                        // Agar path './' ya bina slash ke hai, toh use absolute basePrefix lagao
                        img.src = basePrefix + src.replace(/^\.\//, '');
                    }
                });

                // Sabhi navigation links ke paths sahi karo
                placeholder.querySelectorAll('a').forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('/')) {
                        link.href = basePrefix + href.replace(/^\.\//, '');
                    }
                });
            }
        })
        .catch(error => console.error("Error loading footer:", error));
});