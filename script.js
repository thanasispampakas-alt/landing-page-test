gsap.registerPlugin(ScrollTrigger);

// --- 1. MOUSE TARGET CURSOR INTERACTION ---
const targetCursor = document.getElementById("target-cursor");

window.addEventListener("mousemove", (e) => {
  gsap.set(targetCursor, { x: e.clientX, y: e.clientY });
});

const triggerBtn = document.getElementById("strike-btn");
if(triggerBtn) {
  triggerBtn.addEventListener("mouseenter", () => gsap.to(targetCursor, { scale: 1.6, rotate: 45, duration: 0.15 }));
  triggerBtn.addEventListener("mouseleave", () => gsap.to(targetCursor, { scale: 1, rotate: 0, duration: 0.15 }));
}

// --- 2. FULLSCREEN OVERLAY MENU TIMELINE ---
const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const menuOverlay = document.getElementById("menu-overlay");
const menuPanels = gsap.utils.toArray(".menu-panel");

menuPanels.forEach(panel => {
  panel.style.backgroundColor = panel.getAttribute("data-bg");
});

const menuTimeline = gsap.timeline({ paused: true });

menuTimeline.set(menuOverlay, { display: "block" })
  .to(menuPanels, {
    y: "0%",
    duration: 0.5,
    stagger: 0.08,
    ease: "back.out(1.2)"
  })
  .to(menuClose, { opacity: 1, y: 0, duration: 0.2 }, "-=0.2");

if(menuToggle && menuClose) {
  menuToggle.addEventListener("click", () => menuTimeline.play());
  menuClose.addEventListener("click", () => menuTimeline.reverse());
}

// Close menu with ESC key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") menuTimeline.reverse();
});

// --- 3. PHASE 0: VIDEO HERO PARALLAX TRACKS ---
gsap.to(".hero-ink-video", {
  scale: 1.4,
  scrollTrigger: {
    trigger: ".comic-video-hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

gsap.to(".hero-overlay-content", {
  y: -150,
  opacity: 0,
  scrollTrigger: {
    trigger: ".comic-video-hero",
    start: "top top",
    end: "bottom 20%",
    scrub: true
  }
});

// --- 4. PHASE A: HORIZONTAL PANNING TRACK ---
const comicPanels = gsap.utils.toArray(".comic-panel");
const horizontalTrack = document.querySelector(".horizontal-track");

let horizontalScrollTimeline = gsap.to(comicPanels, {
  xPercent: -100 * (comicPanels.length - 1),
  ease: "none", 
  scrollTrigger: {
    trigger: ".comic-universe",
    pin: true,
    scrub: 1,
    snap: 1 / (comicPanels.length - 1),
    start: "top top",
    end: () => "+=" + horizontalTrack.offsetWidth
  }
});

// --- 5. INTERNAL HORIZONTAL ELEMENT REVEALS ---
gsap.from(".panel-acid-bright .slam-text", {
  y: -250, scale: 2.5, opacity: 0, rotation: 20,
  scrollTrigger: {
    trigger: ".panel-acid-bright",
    containerAnimation: horizontalScrollTimeline,
    start: "left center",
    toggleActions: "play none none reverse"
  }
});

gsap.from(".speed-lines", {
  x: 600, opacity: 0,
  scrollTrigger: {
    trigger: ".panel-blue",
    containerAnimation: horizontalScrollTimeline,
    start: "left 80%",
    scrub: true
  }
});

// --- 6. PHASE B: VERTICAL SPLIT PARALLAX ENGINES ---
const parallaxImages = gsap.utils.toArray(".parallax-img");

parallaxImages.forEach((img) => {
  const imageFrame = img.parentElement;
  
  gsap.fromTo(img, 
    { yPercent: -20 }, 
    {
      yPercent: 20,    
      ease: "none",    
      scrollTrigger: {
        trigger: imageFrame,
        start: "top bottom", 
        end: "bottom top",   
        scrub: true          
      }
    }
  );
});

// Content Lifts
const splitFrames = gsap.utils.toArray(".split-frame");

splitFrames.forEach((frame) => {
  const leftContentBox = frame.querySelector(".left-content");
  
  gsap.from(leftContentBox, {
    x: -120,
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: "power4.out",
    scrollTrigger: {
      trigger: frame,
      start: "top 60%",
      toggleActions: "play none none reverse"
    }
  });
});
