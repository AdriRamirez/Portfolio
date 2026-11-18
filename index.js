/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* -----------------------------------------
  Project previews: play on hover (desktop)
  or when the project is on screen (touch)
 ---------------------------------------- */

const mediaBoxes = document.querySelectorAll(".media-container");
const canHover = window.matchMedia("(hover: hover)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const setPlaying = (box, playing) => {
  const video = box.querySelector(".hover-video");
  if (!video || reduceMotion) return;
  if (playing) {
    video.play().then(() => box.classList.add("is-playing")).catch(() => {});
  } else {
    video.pause();
    box.classList.remove("is-playing");
  }
};

mediaBoxes.forEach((box) => {
  if (canHover) {
    box.addEventListener("mouseenter", () => setPlaying(box, true));
    box.addEventListener("mouseleave", () => setPlaying(box, false));
  }
});

if (!canHover && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => setPlaying(e.target, e.isIntersecting)),
    { threshold: 0.6 }
  );
  mediaBoxes.forEach((box) => observer.observe(box));
}
