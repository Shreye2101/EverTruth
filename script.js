let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function currentSlide(index) {
    showSlide(index - 1);
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

setInterval(nextSlide, 5000); // Automatically change slide every 5 seconds

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smartphone: {
        smooth: true
    },
    tablet: {
        smooth: true
    }
});

// Refresh ScrollTrigger when Locomotive Scroll updates
scroll.on('scroll', ScrollTrigger.update);

// Tell ScrollTrigger to use Locomotive Scroll's proxy methods
ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices
    pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
});

// Refresh ScrollTrigger and Locomotive Scroll after setup
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

// Example ScrollTrigger Animations
gsap.registerPlugin(ScrollTrigger);

// Fade-in sections as they enter the viewport
gsap.utils.toArray('section').forEach((section) => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: section,
            scroller: '[data-scroll-container]',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const navToggleBtn = document.querySelector('.nav-toggle-btn');
    const navLinks = document.querySelector('.nav-links');
    
    navToggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});



// const scrollLeftBtn = document.getElementById('scroll-left');
// const scrollRightBtn = document.getElementById('scroll-right');

// let scrollPosition = 0;
// const itemWidth = 320; // Adjust based on card width + margin
// const containerWidth = scrollContainer.scrollWidth;

// // Update scrollPosition based on the current position
// function updateScrollPosition() {
//     scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
// }

// scrollRightBtn.addEventListener('click', () => {
//     // Ensure we don't scroll past the end
//     if (scrollPosition + itemWidth < containerWidth) {
//         scrollPosition += itemWidth;
//         updateScrollPosition();
//     }
// });

// scrollLeftBtn.addEventListener('click', () => {
//     // Ensure we don't scroll past the beginning
//     if (scrollPosition - itemWidth >= 0) {
//         scrollPosition -= itemWidth;
//         updateScrollPosition();
//     }
// });


// const menuBtn = document.querySelector('.menu-btn');
// const menuOverlay = document.querySelector('.menu-overlay');

// menuBtn.addEventListener('click', () => {
//     menuOverlay.classList.toggle('active');
// });


