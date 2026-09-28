document.addEventListener("DOMContentLoaded", () => {
// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", (event) => {

        event.stopPropagation();

        navbar.classList.toggle("active");
        menuToggle.classList.toggle("active");

        const isOpen = navbar.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );
    });


    // Close menu when clicking a link

    const navLinks = navbar.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    // Close when clicking outside

    document.addEventListener("click", (event) => {

        if (
            !navbar.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navbar.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });

}


    // ==========================================
    // HEADER ON SCROLL
    // ==========================================

    const header = document.querySelector(".site-header");

    function handleHeaderScroll() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();


    // ==========================================
    // SMOOTH SCROLL
    // ==========================================

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // ==========================================
    // SCROLL REVEAL ANIMATION
    // ==========================================

    const revealElements = document.querySelectorAll(
        ".section, .article-card, .category-card, .destination-card, " +
        ".video-card, .life-card, .mini-card, .latest-article, " +
        ".instagram-item, .featured-video, .travel-banner"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });

    } else {
        // Fallback for older browsers
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }


    // ==========================================
    // ACTIVE NAVIGATION
    // ==========================================

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const navigationLinks = document.querySelectorAll(".navbar a");

    navigationLinks.forEach((link) => {
        const linkPage = link.getAttribute("href");

        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }
    });


    // ==========================================
    // CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    // ==========================================

    document.addEventListener("click", (event) => {

        if (!navbar || !menuToggle) return;

        const clickedInsideNavbar = navbar.contains(event.target);
        const clickedMenuButton = menuToggle.contains(event.target);

        if (
            !clickedInsideNavbar &&
            !clickedMenuButton &&
            navbar.classList.contains("active")
        ) {
            navbar.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }

    });


    // ==========================================
    // ESC KEY - CLOSE MOBILE MENU
    // ==========================================

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (navbar) {
                navbar.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }

        }

    });


    // ==========================================
    // SEARCH BUTTON
    // ==========================================

    const searchButton = document.querySelector(".search-button");

    if (searchButton) {

        searchButton.addEventListener("click", () => {

            const searchTerm = window.prompt(
                "چه چیزی در Armenia Start جستجو می‌کنید؟"
            );

            if (!searchTerm) return;

            const query = searchTerm.trim();

            if (query.length === 0) return;

            /*
             * فعلاً جستجو به search.html منتقل می‌شود.
             * بعداً می‌توانیم یک سیستم جستجوی واقعی
             * برای مقالات Armenia Start بسازیم.
             */

            window.location.href =
                "search.html?q=" + encodeURIComponent(query);

        });

    }


    // ==========================================
    // VIDEO LINKS
    // ==========================================

    const videoLinks = document.querySelectorAll(".video-link");

    videoLinks.forEach((link) => {

        link.addEventListener("click", () => {

            // YouTube links will work normally.
            // This is only here for future tracking/analytics.

            const videoTitle =
                link.closest(".video-card")
                    ?.querySelector("h3")
                    ?.textContent;

            if (videoTitle) {
                console.log("Opening video:", videoTitle);
            }

        });

    });


    // ==========================================
    // IMAGE ERROR HANDLING
    // ==========================================

    const images = document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            console.warn(
                "Image could not be loaded:",
                image.src
            );

        });

    });


    // ==========================================
    // FOOTER YEAR
    // ==========================================

    const footerYear = document.querySelector(".footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }


    // ==========================================
    // REDUCED MOTION
    // ==========================================

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (prefersReducedMotion.matches) {

        document.documentElement.style.scrollBehavior = "auto";

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    // ==========================================
    // MOBILE SCREEN CHECK
    // ==========================================

    const mobileQuery = window.matchMedia("(max-width: 850px)");

    function handleMobileChange(event) {

        if (!event.matches) {

            if (navbar) {
                navbar.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }

        }

    }

    mobileQuery.addEventListener("change", handleMobileChange);

});