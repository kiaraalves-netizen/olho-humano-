/* =========================================================
   FUNCIONAMENTO DO OLHO HUMANO
   JAVASCRIPT PRINCIPAL
========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    /* ================= MENU MOBILE ================= */

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("active");

            if (navbar.classList.contains("active")) {
                menuToggle.textContent = "✕";
            } else {
                menuToggle.textContent = "☰";
            }

        });

    }


    /* ================= DROPDOWN MOBILE ================= */

    const dropdown = document.querySelector(".dropdown");
    const dropdownButton = document.querySelector(".dropdown-button");

    if (dropdown && dropdownButton) {

        dropdownButton.addEventListener("click", (event) => {

            if (window.innerWidth <= 750) {

                event.preventDefault();

                dropdown.classList.toggle("active");

            }

        });

    }


    /* ================= FECHAR MENU AO CLICAR ================= */

    const navLinks = document.querySelectorAll(".navbar a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 750) {

                navbar.classList.remove("active");

                if (menuToggle) {
                    menuToggle.textContent = "☰";
                }

            }

        });

    });


    /* ================= ANO AUTOMÁTICO ================= */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* ================= ANIMAÇÃO AO ROLAR ================= */

    const animatedElements = document.querySelectorAll(
        ".structure-card, .mechanism-card, .flashcard, .refraction-card, .gallery-item"
    );


    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observerInstance.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    animatedElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity .6s ease, transform .6s ease";

        observer.observe(element);

    });


    /* ================= ESTILO PARA ELEMENTOS VISÍVEIS ================= */

    const style = document.createElement("style");

    style.textContent = `
        .structure-card.visible,
        .mechanism-card.visible,
        .flashcard.visible,
        .refraction-card.visible,
        .gallery-item.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;

    document.head.appendChild(style);


    /* ================= EFEITO DE HOVER NOS FLASHCARDS ================= */

    const flashcards = document.querySelectorAll(".flashcard");

    flashcards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - 0.5) * -4;

            const rotateY =
                ((x / rect.width) - 0.5) * 4;

            card.style.transform =
                `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0) rotateX(0) rotateY(0)";

        });

    });


    /* ================= INDICADOR DE SEÇÃO ================= */

    const sections = document.querySelectorAll("main section[id]");
    const menuLinks = document.querySelectorAll(".navbar a");

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.getAttribute("id");

                    menuLinks.forEach(link => {

                        link.classList.remove("current");

                        if (
                            link.getAttribute("href") ===
                            `#${currentId}`
                        ) {
                            link.classList.add("current");
                        }

                    });

                }

            });

        },
        {
            threshold: 0.35
        }
    );


    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* ================= BOTÃO ESC ================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            navbar?.classList.remove("active");
            dropdown?.classList.remove("active");

            if (menuToggle) {
                menuToggle.textContent = "☰";
            }

        }

    });

});
