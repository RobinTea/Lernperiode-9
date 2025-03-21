document.addEventListener('DOMContentLoaded', function() {
  // Set image paths (replace with your actual image filenames)
  const image1Name = "pic1.jpg"; // Change this to your actual image filename
  const image2Name = "pic2.jpg"; // Change this to your actual image filename
  
  // Set background images with local files
  document.querySelector('.image-1').style.backgroundImage = `url('${image1Name}')`;
  document.querySelector('.image-2').style.backgroundImage = `url('${image2Name}')`;
  
  // Menu Functionality
  const menuButton = document.querySelector('.menu-button');
  const menu = document.querySelector('.menu');
  const closeMenu = document.querySelector('.close-menu');
  
  menuButton.addEventListener('click', function() {
      menu.classList.add('open');
      menuButton.style.opacity = '0'; // Hide menu text when menu is open
  });
  
  closeMenu.addEventListener('click', function() {
      menu.classList.remove('open');
      menuButton.style.opacity = '1'; // Show menu text when menu is closed
  });
  
  // Update menu background based on dark mode
  function updateMenuTheme() {
      if (document.body.classList.contains('dark-mode')) {
          menu.classList.add('dark');
      } else {
          menu.classList.remove('dark');
      }
  }

  // Title Animation - starts after 0.5s
  setTimeout(() => {
      const wordTop = document.querySelector('.word-top');
      const wordBottom = document.querySelector('.word-bottom');
      const lineTop = document.querySelector('.red-line-top');
      const lineBottom = document.querySelector('.red-line-bottom');
      const subtitle = document.querySelector('.subtitle');
      
      wordTop.style.opacity = '1';
      wordTop.style.transform = 'translate(-50%, 0)';
      wordTop.style.transition = 'opacity 1.5s, transform 1.5s';
      
      setTimeout(() => {
          lineTop.style.opacity = '1';
          lineTop.style.transition = 'opacity 1s';
      }, 250);
      
      setTimeout(() => {
          wordBottom.style.opacity = '1';
          wordBottom.style.transform = 'translate(-50%, 0)';
          wordBottom.style.transition = 'opacity 1.5s, transform 1.5s';
      }, 500);
      
      setTimeout(() => {
          lineBottom.style.opacity = '1';
          lineBottom.style.transition = 'opacity 1s';
      }, 750);
      
      setTimeout(() => {
          subtitle.style.opacity = '1';
          subtitle.style.transition = 'opacity 1.5s';
      }, 1000);

      // Show text section quickly after loading (0.5s)
      setTimeout(() => {
          const textSection = document.querySelector('.text-section');
          textSection.classList.add('visible');
      }, 500);
      
  }, 500); // Reduced to 0.5s (500ms)

  // Dark Mode Toggle - happens sooner now
  const body = document.body;
  let darkModeActive = false;

  // Image Animation
  const imageSection = document.querySelector('.image-section');
  const image1 = document.querySelector('.image-1');
  const image2 = document.querySelector('.image-2');
  let image1Visible = false;
  
  // Final Section
  const finalText = document.querySelector('.final-text');
  const nextButton = document.querySelector('.next-button');
  let finalSectionVisible = false;

  // Function to check if element is in viewport
  function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
          rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) * 0.25
      );
  }

  // Keep track of scroll position to determine direction and progress
  let lastScrollY = 0;
  let scrollThreshold = 200; // Amount of scroll needed to transition from pic1 to pic2

  window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll direction and delta
      const scrollDirection = scrollPosition > lastScrollY ? 'down' : 'up';
      const scrollDelta = Math.abs(scrollPosition - lastScrollY);
      lastScrollY = scrollPosition;
      
      // Dark Mode Toggle - happens sooner (at 30% of window height instead of 70%)
      if (scrollPosition > windowHeight * 0.3 && !darkModeActive) {
          body.classList.add('dark-mode');
          darkModeActive = true;
          updateMenuTheme();
      } else if (scrollPosition < windowHeight * 0.3 && darkModeActive) {
          body.classList.remove('dark-mode');
          darkModeActive = false;
          updateMenuTheme();
      }
      
      // Image Section Animation with scroll-based transition
      if (isInViewport(imageSection)) {
          // Make first image visible if not already
          if (!image1Visible) {
              image1.style.opacity = '1';
              image1Visible = true;
          }
          
          // Calculate how far we've scrolled while the image section is in viewport
          // This creates a range from 0 to 1 based on scroll position
          const sectionTop = imageSection.getBoundingClientRect().top;
          const viewportHeight = window.innerHeight;
          const scrollProgress = 1 - (sectionTop / viewportHeight);
          
          // Use scrollProgress to control the opacity transition between images
          // When scrollProgress is 0.5, the transition is halfway
          if (scrollProgress > 0.75 && scrollProgress < 1.1) {
              const transitionPoint = (scrollProgress - 0.75) / 0.3; // 0 to 1 in this range
              image1.style.opacity = 1 - transitionPoint;
              image2.style.opacity = transitionPoint;
          } else if (scrollProgress >= 1.1) {
              image1.style.opacity = '0';
              image2.style.opacity = '1';
          } else if (scrollProgress <= 0.75) {
              image1.style.opacity = '1';
              image2.style.opacity = '0';
          }
      }
      
      // Final Section Animation - faster appearance (0.5s)
      if (scrollPosition > windowHeight * 2.07 && !finalSectionVisible) {
          finalText.style.opacity = '1';
          
          setTimeout(() => {
              nextButton.style.opacity = '1';
          }, 500); // Reduced to 0.5s
          
          finalSectionVisible = true;
      }
  });

  // Initial load of first image
  setTimeout(() => {
      if (isInViewport(imageSection)) {
          image1.style.opacity = '1';
          image1Visible = true;
      }
  }, 500);

  // Button click event
  document.querySelector('.next-button').addEventListener('click', function() {
      alert('You clicked the Next button!');
  });
});



// Variables for managing smooth scrollin

let scrollPosition = 0; 
let targetScroll = 0; 
const scrollSpeed = 0.065; // Adjust this to change the scrolling speed

// Listen for wheel events to determine scrolling intent
window.addEventListener("wheel", function (event) {
    // Prevent the default scrolling
    event.preventDefault();

    // Adjust the target scroll based on scroll direction
    targetScroll += event.deltaY;
}, { passive: false });

// Smooth scrolling using requestAnimationFrame
function smoothScroll() {
    // Gradually approach the target scroll position
    scrollPosition += (targetScroll - scrollPosition) * scrollSpeed;

    // Scroll to the current scroll position
    window.scrollTo(0, scrollPosition);

    // Continue animating
    requestAnimationFrame(smoothScroll);
}

// Start the animation loop
smoothScroll();