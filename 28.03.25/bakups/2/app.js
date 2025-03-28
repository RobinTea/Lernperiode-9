document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const body = document.body;
  const menuButton = document.querySelector('.menu-button');
  const menu = document.querySelector('.menu');
  const closeMenu = document.querySelector('.close-menu');
  const imageSection = document.querySelector('.image-section');
  const image1 = document.querySelector('.image-1');
  const image2 = document.querySelector('.image-2');
  const finalText = document.querySelector('.final-text');
  const nextButton = document.querySelector('.next-button');
  
  // State
  let darkModeActive = false;
  let image1Visible = false;
  let finalSectionVisible = false;
  let lastScrollY = 0;
  let ticking = false;
  
  // Current Date and Time implementation
  function updateDateTime() {
    const now = new Date();
    
    // Format the date as YYYY-MM-DD HH:MM:SS (UTC)
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    // Create or update the date-time element
    let dateTimeElement = document.getElementById('current-datetime');
    if (!dateTimeElement) {
      // Create the element if it doesn't exist
      dateTimeElement = document.createElement('div');
      dateTimeElement.id = 'current-datetime';
      dateTimeElement.style.position = 'fixed';
      dateTimeElement.style.bottom = '10px';
      dateTimeElement.style.right = '10px';
      dateTimeElement.style.fontSize = '0.8rem';
      dateTimeElement.style.opacity = '0.7';
      dateTimeElement.style.zIndex = '1000';
      dateTimeElement.style.fontFamily = 'monospace';
      dateTimeElement.style.padding = '5px';
      dateTimeElement.style.transition = 'color 0.8s';
      body.appendChild(dateTimeElement);
    }
    
    // Add user login information
    const userLogin = 'RobinTea';
    dateTimeElement.innerHTML = `${formattedDateTime}<br>User: ${userLogin}`;
    
    // Adjust color based on dark mode
    if (darkModeActive) {
      dateTimeElement.style.color = 'rgba(255, 255, 255, 0.7)';
    } else {
      dateTimeElement.style.color = 'rgba(0, 0, 0, 0.7)';
    }
  }
  
  // Update the date and time every second
  updateDateTime();
  setInterval(updateDateTime, 1000);
  
  // Menu functionality
  menuButton.addEventListener('click', function() {
    menu.classList.add('open');
    menuButton.style.opacity = '0';
  });
  
  closeMenu.addEventListener('click', function() {
    menu.classList.remove('open');
    menuButton.style.opacity = '1';
  });
  
  function updateMenuTheme() {
    menu.classList.toggle('dark', body.classList.contains('dark-mode'));
  }
  
  // Text animation (for some reason Title)

  function animateTitle() {
  setTimeout(() => {
    const textSection = document.querySelector('.text-section');
    if (textSection) {
      textSection.classList.add('visible');
    }
  }, 500);  
  }
  
  // Start animations after a small delay
  setTimeout(animateTitle, 500);
  
  // Optimized scroll handler using requestAnimationFrame
  function handleScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollDirection = scrollPosition > lastScrollY ? 'down' : 'up';
    lastScrollY = scrollPosition;
    
    // Dark mode toggle
    if (scrollPosition > windowHeight * 0.3 && !darkModeActive) {
      body.classList.add('dark-mode');
      darkModeActive = true;
      updateMenuTheme();
      updateDateTime(); // Update datetime element color
    } else if (scrollPosition < windowHeight * 0.3 && darkModeActive) {
      body.classList.remove('dark-mode');
      darkModeActive = false;
      updateMenuTheme();
      updateDateTime(); // Update datetime element color
    }
    
    // Image transitions
    if (isInViewport(imageSection)) {
      if (!image1Visible) {
        image1.style.opacity = '1';
        image1Visible = true;
      }
      
      const sectionTop = imageSection.getBoundingClientRect().top;
      const scrollProgress = 1 - (sectionTop / windowHeight);
      
      if (scrollProgress > 0.75 && scrollProgress < 1.1) {
        const transitionPoint = (scrollProgress - 0.75) / 0.3;
        image1.style.opacity = Math.max(0, 1 - transitionPoint);
        image2.style.opacity = Math.min(1, transitionPoint);
      } else if (scrollProgress >= 1.1) {
        image1.style.opacity = '0';
        image2.style.opacity = '1';
      } else if (scrollProgress <= 0.75) {
        image1.style.opacity = '1';
        image2.style.opacity = '0';
      }
    }
    
    // Final section animation
    if (scrollPosition > windowHeight * 2.07 && !finalSectionVisible) {
      finalText.style.opacity = '1';
      setTimeout(() => {
        nextButton.style.opacity = '1';
      }, 500);
      finalSectionVisible = true;
    }
  }
  
  // Optimized scroll event with requestAnimationFrame
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Helper function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
      rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) * 0.25
    );
  }
  
  // Initial image check
  setTimeout(() => {
    if (isInViewport(imageSection)) {
      image1.style.opacity = '1';
      image1Visible = true;
    }
  }, 500);
  
  // Button click
  nextButton.addEventListener('click', function() {
    alert('You clicked the Next button!');
  });
  
  // Use IntersectionObserver for detecting elements in viewport (modern alternative)
  function setupObservers() {
    if ('IntersectionObserver' in window) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Can be used to trigger animations
            // entry.target.classList.add('in-view');
          }
        });
      }, options);
      
      // Observe elements (add more as needed)
      const elements = document.querySelectorAll('.image-section, .final-section');
      elements.forEach(el => observer.observe(el));
    }
  }
  
  // Initialize observers
  setupObservers();
});

// Variables for smooth scrolling
let scrollPosition = 0;
let targetScroll = 0;
const scrollSpeed = 0.02; // Lower values make scrolling slower (0.02-0.06 is a good range)

// Listen for wheel events to determine scrolling intent
window.addEventListener("wheel", function(event) {
    // Prevent default scrolling
    event.preventDefault();
    
    // Adjust target scroll based on scroll direction and delta
    targetScroll += event.deltaY;
}, { passive: false });

// Prevent default scrolling on touch devices
window.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) return; // Allow pinch/zoom
    event.preventDefault();
}, { passive: false });

// Track touch start position
let touchStartY = 0;
window.addEventListener('touchstart', function(event) {
    touchStartY = event.touches[0].clientY;
});

// Handle touch movement for scrolling
window.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) return; // Allow pinch/zoom
    const touchY = event.touches[0].clientY;
    const diff = touchStartY - touchY;
    
    // Adjust sensitivity for touch devices
    targetScroll += diff * 3;
    touchStartY = touchY;
});

// Smooth scrolling using requestAnimationFrame
function smoothScroll() {
    // Gradually approach the target scroll position
    scrollPosition += (targetScroll - scrollPosition) * scrollSpeed;
    
    // Apply bounds to avoid scrolling past document limits
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollPosition < 0) scrollPosition = 0;
    if (scrollPosition > maxScroll) scrollPosition = maxScroll;
    
    // Apply the scroll
    window.scrollTo(0, scrollPosition);
    
    // Continue animation loop
    requestAnimationFrame(smoothScroll);
}

// Start the smooth scrolling animation
smoothScroll();

// Reset target scroll to match current position when page is resized
window.addEventListener('resize', function() {
    targetScroll = window.scrollY;
    scrollPosition = window.scrollY;
});

// Handle keyboard scrolling
window.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowDown':
            targetScroll += 50;
            event.preventDefault();
            break;
        case 'ArrowUp':
            targetScroll -= 50;
            event.preventDefault();
            break;
        case 'PageDown':
            targetScroll += window.innerHeight * 0.9;
            event.preventDefault();
            break;
        case 'PageUp':
            targetScroll -= window.innerHeight * 0.9;
            event.preventDefault();
            break;
        case 'Home':
            targetScroll = 0;
            event.preventDefault();
            break;
        case 'End':
            targetScroll = document.documentElement.scrollHeight - window.innerHeight;
            event.preventDefault();
            break;
        case ' ': // Space bar
            if (event.shiftKey) {
                targetScroll -= window.innerHeight * 0.9;
            } else {
                targetScroll += window.innerHeight * 0.9;
            }
            event.preventDefault();
            break;
    }
});

// When clicking on links that target elements on the same page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetScroll = targetElement.getBoundingClientRect().top + window.scrollY;
        }
    });
});