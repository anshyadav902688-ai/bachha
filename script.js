
/* =========================================================
   POOJA BIRTHDAY EXPERIENCE
   PREMIUM INTERACTIVE JAVASCRIPT
   ========================================================= */


/* =========================================================
   01. GLOBAL VARIABLES
   ========================================================= */

const slides =
    document.querySelectorAll(".slide");

const navDots =
    document.querySelectorAll(".nav-dot");

const nextButtons =
    document.querySelectorAll("[data-next]");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const preloader =
    document.getElementById("preloader");

const starsContainer =
    document.getElementById("stars");

const floatingHearts =
    document.getElementById("floatingHearts");

const confettiContainer =
    document.getElementById("confettiContainer");

const musicButton =
    document.getElementById("musicButton");

const birthdayMusic =
    document.getElementById("birthdayMusic");

const surpriseButton =
    document.getElementById("surpriseButton");

const finalMessage =
    document.getElementById("finalMessage");

const restartButton =
    document.getElementById("restartButton");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const birthdayToast =
    document.getElementById("birthdayToast");


let currentSlide = 1;

const totalSlides =
    slides.length;

let isTransitioning = false;

let touchStartX = 0;

let touchEndX = 0;


/* =========================================================
   02. PRELOADER
   ========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        preloader.classList.add("loaded");

        showToast(
            "Made with love especially for Pooja ❤️"
        );

    }, 2200);

});


/* =========================================================
   03. CREATE STARS
   ========================================================= */

function createStars() {

    if (!starsContainer) return;

    const numberOfStars =
        window.innerWidth < 600
            ? 70
            : 130;

    starsContainer.innerHTML = "";

    for (
        let i = 0;
        i < numberOfStars;
        i++
    ) {

        const star =
            document.createElement("span");

        star.classList.add("star");

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        const size =
            Math.random() * 2 + 1;

        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;

        star.style.setProperty(
            "--duration",
            `${2 + Math.random() * 5}s`
        );

        star.style.animationDelay =
            `${Math.random() * 5}s`;

        starsContainer.appendChild(star);
    }
}

createStars();


/* =========================================================
   04. FLOATING HEARTS
   ========================================================= */

function createFloatingHeart() {

    if (!floatingHearts) return;

    const heart =
        document.createElement("span");

    heart.classList.add("floating-heart");

    const hearts = [
        "♥",
        "♡",
        "❤",
        "✦"
    ];

    heart.textContent =
        hearts[
            Math.floor(
                Math.random() *
                hearts.length
            )
        ];

    heart.style.left =
        `${Math.random() * 100}%`;

    heart.style.fontSize =
        `${8 + Math.random() * 18}px`;

    heart.style.setProperty(
        "--duration",
        `${7 + Math.random() * 8}s`
    );

    heart.style.animationDelay =
        `${Math.random() * 1.5}s`;

    floatingHearts.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 16000);
}


/*
    Create hearts continuously
*/

setInterval(
    createFloatingHeart,
    850
);


/*
    Initial hearts
*/

for (
    let i = 0;
    i < 12;
    i++
) {

    setTimeout(
        createFloatingHeart,
        i * 250
    );
}


/* =========================================================
   05. SLIDE NAVIGATION
   ========================================================= */

function goToSlide(
    targetSlide,
    direction = "next"
) {

    if (isTransitioning) return;

    if (
        targetSlide < 1 ||
        targetSlide > totalSlides
    ) {
        return;
    }

    if (
        targetSlide === currentSlide
    ) {
        return;
    }

    isTransitioning = true;


    /*
        Current slide
    */

    const oldSlide =
        document.getElementById(
            `slide${currentSlide}`
        );


    /*
        New slide
    */

    const newSlide =
        document.getElementById(
            `slide${targetSlide}`
        );


    /*
        Remove active class
    */

    oldSlide.classList.remove(
        "active"
    );


    /*
        Activate new slide
    */

    newSlide.classList.add(
        "active"
    );


    /*
        Update navigation dots
    */

    navDots.forEach(dot => {

        dot.classList.remove(
            "active"
        );

    });


    const activeDot =
        document.querySelector(
            `[data-slide-target="${targetSlide}"]`
        );

    if (activeDot) {

        activeDot.classList.add(
            "active"
        );

    }


    /*
        Update current slide
    */

    currentSlide =
        targetSlide;


    /*
        Slide-specific actions
    */

    if (currentSlide === 4) {

        startCountdown();

    }


    /*
        Reset transition lock
    */

    setTimeout(() => {

        isTransitioning = false;

    }, 850);

}


/* =========================================================
   06. NEXT SLIDE
   ========================================================= */

function nextSlide() {

    if (
        currentSlide < totalSlides
    ) {

        goToSlide(
            currentSlide + 1,
            "next"
        );

    }

}


/* =========================================================
   07. PREVIOUS SLIDE
   ========================================================= */

function previousSlide() {

    if (
        currentSlide > 1
    ) {

        goToSlide(
            currentSlide - 1,
            "previous"
        );

    }

}


/* =========================================================
   08. NEXT BUTTONS
   ========================================================= */

nextButtons.forEach(button => {

    button.addEventListener(
        "click",
        nextSlide
    );

});


/* =========================================================
   09. ARROW BUTTONS
   ========================================================= */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextSlide
    );

}

if (previousButton) {

    previousButton.addEventListener(
        "click",
        previousSlide
    );

}


/* =========================================================
   10. NAVIGATION DOTS
   ========================================================= */

navDots.forEach(dot => {

    dot.addEventListener(
        "click",
        () => {

            const target =
                Number(
                    dot.dataset.slideTarget
                );

            goToSlide(target);

        }
    );

});


/* =========================================================
   11. KEYBOARD NAVIGATION
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
            Don't control slides
            while lightbox is open
        */

        if (
            lightbox.classList.contains(
                "open"
            )
        ) {

            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }

            return;

        }


        if (
            event.key === "ArrowRight" ||
            event.key === "ArrowDown"
        ) {

            nextSlide();

        }


        if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowUp"
        ) {

            previousSlide();

        }


        /*
            Press Enter for next slide
        */

        if (
            event.key === "Enter"
        ) {

            nextSlide();

        }

    }
);


/* =========================================================
   12. TOUCH / SWIPE NAVIGATION
   ========================================================= */

document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    {
        passive: true
    }
);


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;

    const minimumSwipe =
        60;


    if (
        Math.abs(difference) <
        minimumSwipe
    ) {

        return;

    }


    if (difference > 0) {

        nextSlide();

    } else {

        previousSlide();

    }

}


/* =========================================================
   13. MUSIC SYSTEM
   ========================================================= */

let musicPlaying = false;


/*
    Music button
*/

if (musicButton) {

    musicButton.addEventListener(
        "click",
        toggleMusic
    );

}


function toggleMusic() {

    if (
        birthdayMusic.paused
    ) {

        playMusic();

    } else {

        pauseMusic();

    }

}


function playMusic() {

    birthdayMusic
        .play()
        .then(() => {

            musicPlaying = true;

            musicButton.classList.add(
                "playing"
            );

            const icon =
                musicButton.querySelector(
                    "i"
                );

            if (icon) {

                icon.className =
                    "fa-solid fa-pause";

            }

        })
        .catch(() => {

            showToast(
                "Click the music button to start the music 🎵"
            );

        });

}


function pauseMusic() {

    birthdayMusic.pause();

    musicPlaying = false;

    musicButton.classList.remove(
        "playing"
    );

    const icon =
        musicButton.querySelector(
            "i"
        );

    if (icon) {

        icon.className =
            "fa-solid fa-music";

    }

}


/*
    Volume
*/

birthdayMusic.volume = 0.45;


/* =========================================================
   14. PHOTO LIGHTBOX
   ========================================================= */

const memoryCards =
    document.querySelectorAll(
        ".memory-card"
    );


memoryCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const image =
                card.dataset.image;

            openLightbox(image);

        }
    );

});


function openLightbox(image) {

    if (!image) return;

    lightboxImage.src =
        image;

    lightbox.classList.add(
        "open"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

}


function closeLightbox() {

    lightbox.classList.remove(
        "open"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

    setTimeout(() => {

        lightboxImage.src = "";

    }, 400);

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


/*
    Close by clicking outside
*/

if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


/* =========================================================
   15. COUNTDOWN
   ========================================================= */

let countdownInterval;


/*
    Find the next October 5
*/

function getNextBirthday() {

    const now =
        new Date();

    let year =
        now.getFullYear();

    let birthday =
        new Date(
            year,
            9,
            5,
            0,
            0,
            0
        );


    /*
        If this year's birthday
        has already passed,
        use next year.
    */

    if (
        now > birthday
    ) {

        birthday =
            new Date(
                year + 1,
                9,
                5,
                0,
                0,
                0
            );

    }

    return birthday;

}


function updateCountdown() {

    const birthday =
        getNextBirthday();

    const now =
        new Date();

    const difference =
        birthday - now;


    /*
        Birthday has arrived
    */

    if (
        difference <= 0
    ) {

        setCountdownValue(
            "days",
            "00"
        );

        setCountdownValue(
            "hours",
            "00"
        );

        setCountdownValue(
            "minutes",
            "00"
        );

        setCountdownValue(
            "seconds",
            "00"
        );

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                difference %
                (1000 * 60)
            ) /
            1000
        );


    setCountdownValue(
        "days",
        formatNumber(days)
    );

    setCountdownValue(
        "hours",
        formatNumber(hours)
    );

    setCountdownValue(
        "minutes",
        formatNumber(minutes)
    );

    setCountdownValue(
        "seconds",
        formatNumber(seconds)
    );

}


function setCountdownValue(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );

    if (element) {

        element.textContent =
            value;

    }

}


function formatNumber(number) {

    return String(number)
        .padStart(2, "0");

}


function startCountdown() {

    clearInterval(
        countdownInterval
    );

    updateCountdown();

    countdownInterval =
        setInterval(
            updateCountdown,
            1000
        );

}


/*
    Start immediately
*/

startCountdown();


/* =========================================================
   16. BIRTHDAY SURPRISE
   ========================================================= */

if (surpriseButton) {

    surpriseButton.addEventListener(
        "click",
        revealSurprise
    );

}


function revealSurprise() {

    /*
        Prevent repeated clicks
    */

    if (
        surpriseButton.dataset.opened ===
        "true"
    ) {

        return;

    }


    surpriseButton.dataset.opened =
        "true";


    /*
        Show final message
    */

    finalMessage.classList.add(
        "show"
    );


    /*
        Change button
    */

    surpriseButton.innerHTML = `

        <span class="gift-icon">
            <i class="fa-solid fa-heart"></i>
        </span>

        <span>
            Happy Birthday, Pooja ❤️
        </span>

    `;


    /*
        Start celebration
    */

    createConfettiExplosion();

    createHeartExplosion();

    showToast(
        "Happy Birthday Pooja! 🎉❤️"
    );


    /*
        Try starting music
    */

    if (
        birthdayMusic.paused
    ) {

        playMusic();

    }

}


/* =========================================================
   17. CONFETTI SYSTEM
   ========================================================= */

function createConfettiExplosion() {

    if (!confettiContainer) return;


    const pieces =
        window.innerWidth < 600
            ? 90
            : 180;


    const symbols = [
        "●",
        "◆",
        "♥",
        "✦",
        "★",
        "●"
    ];


    for (
        let i = 0;
        i < pieces;
        i++
    ) {

        const piece =
            document.createElement(
                "span"
            );

        piece.classList.add(
            "confetti"
        );


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        /*
            Random starting position
        */

        piece.style.left =
            `${Math.random() * 100}%`;


        /*
            Random size
        */

        const size =
            5 + Math.random() * 9;

        piece.style.width =
            `${size}px`;

        piece.style.height =
            `${size + 4}px`;


        /*
            Random fall duration
        */

        piece.style.setProperty(
            "--fall-time",
            `${2.5 + Math.random() * 3.5}s`
        );


        /*
            Random horizontal movement
        */

        piece.style.setProperty(
            "--drift",
            `${-150 + Math.random() * 300}px`
        );


        /*
            Random animation delay
        */

        piece.style.animationDelay =
            `${Math.random() * 1.2}s`;


        /*
            Slight random rotation
        */

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        confettiContainer.appendChild(
            piece
        );


        setTimeout(() => {

            piece.remove();

        }, 7000);

    }

}


/* =========================================================
   18. HEART EXPLOSION
   ========================================================= */

function createHeartExplosion() {

    const hearts =
        [
            "❤️",
            "💖",
            "💕",
            "💗",
            "💓",
            "💞",
            "✨"
        ];


    const amount =
        window.innerWidth < 600
            ? 25
            : 45;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const heart =
            document.createElement(
                "span"
            );


        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        heart.style.position =
            "fixed";

        heart.style.left =
            "50%";

        heart.style.top =
            "50%";

        heart.style.zIndex =
            "25000";

        heart.style.pointerEvents =
            "none";

        heart.style.fontSize =
            `${12 + Math.random() * 22}px`;


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            120 +
            Math.random() *
            350;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        heart.animate(

            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0.2)",
                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1,
                    offset: 0.15
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(0.7)`,

                    opacity: 0
                }
            ],

            {
                duration:
                    1200 +
                    Math.random() *
                    1200,

                delay:
                    Math.random() *
                    250,

                easing:
                    "cubic-bezier(.17,.67,.3,1.2)",

                fill:
                    "forwards"
            }

        );


        document.body.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 3000);

    }

}


/* =========================================================
   19. RESTART EXPERIENCE
   ========================================================= */

if (restartButton) {

    restartButton.addEventListener(
        "click",
        restartExperience
    );

}


function restartExperience() {

    /*
        Reset surprise
    */

    finalMessage.classList.remove(
        "show"
    );


    surpriseButton.dataset.opened =
        "false";


    surpriseButton.innerHTML = `

        <span class="gift-icon">
            <i class="fa-solid fa-gift"></i>
        </span>

        <span>
            Open Your Birthday Surprise
        </span>

        <span class="button-shine"></span>

    `;


    /*
        Clear confetti
    */

    if (confettiContainer) {

        confettiContainer.innerHTML =
            "";

    }


    /*
        Return to first slide
    */

    goToSlide(
        1
    );


    /*
        Scroll to top
    */

    window.scrollTo(
        0,
        0
    );


    /*
        Show toast
    */

    setTimeout(() => {

        showToast(
            "Let's experience Pooja's birthday again ❤️"
        );

    }, 800);

}


/* =========================================================
   20. TOAST SYSTEM
   ========================================================= */

let toastTimeout;


function showToast(message) {

    if (!birthdayToast) return;


    const text =
        birthdayToast.querySelector(
            "span"
        );


    if (text) {

        text.textContent =
            message;

    }


    birthdayToast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(() => {

            birthdayToast.classList.remove(
                "show"
            );

        }, 3500);

}


/* =========================================================
   21. CUSTOM CURSOR
   ========================================================= */

const cursorDot =
    document.querySelector(
        ".cursor-dot"
    );

const cursorOutline =
    document.querySelector(
        ".cursor-outline"
    );


if (
    window.innerWidth > 900 &&
    cursorDot &&
    cursorOutline
) {

    let mouseX = 0;

    let mouseY = 0;

    let outlineX = 0;

    let outlineY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        outlineX +=
            (
                mouseX -
                outlineX
            ) * 0.15;


        outlineY +=
            (
                mouseY -
                outlineY
            ) * 0.15;


        cursorOutline.style.left =
            `${outlineX}px`;

        cursorOutline.style.top =
            `${outlineY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    /*
        Cursor hover effect
    */

    const interactiveElements =
        document.querySelectorAll(
            "button, .memory-card"
        );


    interactiveElements.forEach(
        element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorOutline.classList.add(
                        "hover"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursorOutline.classList.remove(
                        "hover"
                    );

                }
            );

        }
    );

}


/* =========================================================
   22. WINDOW RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        createStars();

    }
);


/* =========================================================
   23. VISIBILITY CHANGE
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        /*
            Stop unnecessary countdown
            work when tab is hidden.
        */

        if (
            document.hidden
        ) {

            clearInterval(
                countdownInterval
            );

        } else {

            startCountdown();

        }

    }
);


/* =========================================================
   24. IMAGE ERROR HANDLING
   ========================================================= */

const allImages =
    document.querySelectorAll(
        "img"
    );


allImages.forEach(
    image => {

        image.addEventListener(
            "error",
            () => {

                /*
                    If an image isn't found,
                    show a graceful fallback.
                */

                image.style.display =
                    "none";

                const parent =
                    image.parentElement;

                if (parent) {

                    parent.style.background =
                        `
                        linear-gradient(
                            135deg,
                            #3a1d32,
                            #1a0d20
                        )
                        `;

                    parent.style.display =
                        "flex";

                    parent.style.alignItems =
                        "center";

                    parent.style.justifyContent =
                        "center";

                    const fallback =
                        document.createElement(
                            "span"
                        );

                    fallback.textContent =
                        "❤️";

                    fallback.style.fontSize =
                        "40px";

                    parent.appendChild(
                        fallback
                    );

                }

            }
        );

    }
);


/* =========================================================
   25. PREVENT CONTEXT MENU
   ========================================================= */

/*
    Optional:
    Right-click is not disabled.
    This section intentionally stays
    empty so visitors can use the
    normal browser context menu.
*/


/* =========================================================
   26. INITIALIZE EXPERIENCE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
            Make sure first slide
            is active.
        */

        slides.forEach(
            slide => {

                slide.classList.remove(
                    "active"
                );

            }
        );


        const firstSlide =
            document.getElementById(
                "slide1"
            );


        if (firstSlide) {

            firstSlide.classList.add(
                "active"
            );

        }


        currentSlide = 1;


        /*
            First navigation dot
        */

        navDots.forEach(
            dot => {

                dot.classList.remove(
                    "active"
                );

            }
        );


        const firstDot =
            document.querySelector(
                '[data-slide-target="1"]'
            );


        if (firstDot) {

            firstDot.classList.add(
                "active"
            );

        }


        /*
            Start countdown
        */

        startCountdown();

    }
);


/* =========================================================
   END OF SCRIPT
   ========================================================= */
