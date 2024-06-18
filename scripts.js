document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}
// Auto-slide functionality
setInterval(function() {
    plusSlides(1);
}, 3000); // Change image every 3 seconds

document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".stat");
    stats.forEach(stat => {
        const value = +stat.getAttribute("data-value");
        const increment = value / 200;
        const updateCount = () => {
            const display = stat.querySelector("h3");
            const count = +display.innerText.replace('%', '');
            if (count < value) {
                display.innerText = Math.ceil(count + increment) + (display.innerText.includes('%') ? '%' : '');
                setTimeout(updateCount, 10);
            } else {
                display.innerText = value + (display.innerText.includes('%') ? '%' : '');
            }
        };
        updateCount();
    });
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Adjust block property as needed
    }
}
// Event listener to trigger scroll on link click
document.addEventListener('DOMContentLoaded', function () {
    const aboutLink = document.querySelector('a[href="#about-section"]');
    if (aboutLink) {
        aboutLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            scrollToSection('about-section'); // Scroll to section
        });
    }
});

document.getElementById('back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    scrollToTop();
});

function scrollToTop() {
    const scrollDuration = 500; // Duration of the scroll animation in milliseconds
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
}
