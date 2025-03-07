document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("zoomButton");
  const circle = document.getElementById("circle");
  const circleContainer = document.getElementById("circleContainer");

  if (button && circle && circleContainer) {
    button.addEventListener("click", function () {
      // Get the circle dimensions and position before shrinking
      const rect = circle.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Clear the content of the main circle
      circle.innerHTML = "";
      
      // Set absolute positioning
      circle.style.position = "absolute";
      circle.style.left = rect.left + "px";
      circle.style.top = rect.top + "px";
      
      // Force browser to acknowledge the position change
      void circle.offsetWidth;
      
      // Apply transition and shrink
      circle.style.transition = "all 1s ease";
      circle.style.width = "50px";
      circle.style.height = "50px";
      circle.style.boxShadow = "0 8px 8px rgba(0, 0, 0, 0.1)";
      
      // Calculate centered position
      const newLeft = centerX - 25;
      const newTop = centerY - 25;
      
      circle.style.left = newLeft + "px";
      circle.style.top = newTop + "px";

      // Create info window
      const infoWindow = document.createElement("div");
      infoWindow.className = "info-window";
      infoWindow.innerHTML = `
        <p>Hi there! I'm a web developer.</p>
        <div class="social-links">
          <a href="https://github.com/RobinTea" target="_blank" class="social-icon github">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/robin-taing-7a8b56353/" target="_blank" class="social-icon linkedin">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>
      `;
      infoWindow.style.opacity = "0";
      document.body.appendChild(infoWindow);
      
      // Fade in the info window
      setTimeout(() => {
        infoWindow.style.opacity = "1";
      }, 100);

      // Bewegung des Hauptkreises
      const angle = Math.random() * 2 * Math.PI;
      const speed = 2;
      let dx = Math.cos(angle) * speed;
      let dy = Math.sin(angle) * speed;

      function moveMainCircle() {
        let x = parseFloat(circle.style.left);
        let y = parseFloat(circle.style.top);
        const circleSize = 50; // Size of the circle

        // Correct edge detection
        if (x + dx < 0 || x + dx > window.innerWidth - circleSize) {
          dx = -dx;
        }
        if (y + dy < 0 || y + dy > window.innerHeight - circleSize) {
          dy = -dy;
        }

        circle.style.left = `${x + dx}px`;
        circle.style.top = `${y + dy}px`;

        requestAnimationFrame(moveMainCircle);
      }

      // Start the animation after transition
      setTimeout(() => {
        moveMainCircle();
      }, 1000);

      // Create additional circles
      for (let i = 0; i < 19; i++) {
        const smallCircle = document.createElement("div");
        smallCircle.classList.add("circle");
        smallCircle.style.width = "50px";
        smallCircle.style.height = "50px";
        smallCircle.style.position = "absolute";
        smallCircle.style.backgroundColor = "#ffffff";
        smallCircle.style.borderRadius = "100%";
        smallCircle.style.boxShadow = "0 8px 8px rgba(0, 0, 0, 0.1)";

        // Random position
        const maxX = window.innerWidth - 50;
        const maxY = window.innerHeight - 50;
        smallCircle.style.left = `${Math.random() * maxX}px`;
        smallCircle.style.top = `${Math.random() * maxY}px`;
        smallCircle.style.opacity = "0";
        
        circleContainer.appendChild(smallCircle);

        // Random movement
        const angle = Math.random() * 2 * Math.PI;
        const speed = 2;
        let dx = Math.cos(angle) * speed;
        let dy = Math.sin(angle) * speed;

        function moveCircle() {
          let x = parseFloat(smallCircle.style.left);
          let y = parseFloat(smallCircle.style.top);
          const circleSize = 50;

          // Correct edge detection
          if (x + dx < 0 || x + dx > window.innerWidth - circleSize) {
            dx = -dx;
          }
          if (y + dy < 0 || y + dy > window.innerHeight - circleSize) {
            dy = -dy;
          }

          smallCircle.style.left = `${x + dx}px`;
          smallCircle.style.top = `${y + dy}px`;

          requestAnimationFrame(moveCircle);
        }

        moveCircle();

        // Fade in
        setTimeout(() => {
          smallCircle.style.opacity = "0.8";
          smallCircle.style.transition = "opacity 1s ease";
        }, 0);
      }
    });
  } else {
    console.error("Ein Element wurde nicht gefunden.");
  }
});