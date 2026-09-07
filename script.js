const menuIcon = document.getElementById("menu-icon");
const navbar = document.getElementById("navbar");

menuIcon.addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuIcon.classList.toggle("open");
});

navbar.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("active");
        menuIcon.classList.remove("open");
    });
});

const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const preloaded = {};
let currentIndex = 0;

function preloadImage(src) {
    if (preloaded[src]) {
        return preloaded[src];
    }

    const image = new Image();
    image.decoding = "async";
    image.src = src;
    preloaded[src] = image;
    return image;
}

function setLightboxImage(index) {
    const item = galleryItems[index];
    const src = item.getAttribute("data-full");
    const thumb = item.querySelector("img");
    const ready = preloadImage(src);

    currentIndex = index;
    lightboxImage.alt = thumb.alt;

    if (ready.complete) {
        lightboxImage.src = src;
        return;
    }

    ready.decode().then(function () {
        if (currentIndex === index) {
            lightboxImage.src = src;
        }
    }).catch(function () {
        if (currentIndex === index) {
            lightboxImage.src = src;
        }
    });
}

function preloadNeighbors(index) {
    const next = galleryItems[(index + 1) % galleryItems.length];
    const prev = galleryItems[(index - 1 + galleryItems.length) % galleryItems.length];
    preloadImage(next.getAttribute("data-full"));
    preloadImage(prev.getAttribute("data-full"));
}

function openLightbox(index) {
    currentIndex = index;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    setLightboxImage(index);
    preloadNeighbors(index);
}

function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
}

function showNext(step) {
    const nextIndex = (currentIndex + step + galleryItems.length) % galleryItems.length;
    setLightboxImage(nextIndex);
    preloadNeighbors(nextIndex);
}

galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
        openLightbox(index);
    });
});

document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
document.getElementById("lightbox-next").addEventListener("click", function () {
    showNext(1);
});
document.getElementById("lightbox-prev").addEventListener("click", function () {
    showNext(-1);
});

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", function (event) {
    if (lightbox.hidden) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    } else if (event.key === "ArrowRight") {
        showNext(1);
    } else if (event.key === "ArrowLeft") {
        showNext(-1);
    }
});
