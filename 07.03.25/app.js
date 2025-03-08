// Roter laser Cursor
const redCursor = document.getElementById('redCursor');

document.addEventListener('mousemove', (e) => {
  redCursor.style.left = `${e.clientX}px`;
  redCursor.style.top = `${e.clientY}px`;
});

//outer circle ist der grössere Kreis
const outerCircle = document.getElementById('outerCircle');
const imageContainer = document.getElementById('imageContainer');

// Stellt sicher das der Roboter in der mitte bleibt
const centerX = outerCircle.offsetWidth / 2;
const centerY = outerCircle.offsetHeight / 2;

// Current position
let currentX = centerX;
let currentY = centerY;
// Target position
let targetX = centerX;
let targetY = centerY;


imageContainer.style.left = currentX + 'px';
imageContainer.style.top = currentY + 'px';

//Border
const maxRadius = (outerCircle.offsetWidth / 2) - (imageContainer.offsetWidth / 2);

// Delay der Augen
const followSpeed = 0.1;

document.addEventListener('mousemove', (e) => {
  // Get the outer circle's position
  const rect = outerCircle.getBoundingClientRect();
  
  // Calculate the center of the eyes (inner circle)
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Calculate the mouse position relative to the center
  const mouseX = e.clientX - centerX;
  const mouseY = e.clientY - centerY;
  
  // Calculate the distance from the center
  const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
  
  // If the distance is greater than maxRadius, scale the coordinates
  if (distance > maxRadius) {
    const ratio = maxRadius / distance;
    targetX = mouseX * ratio + rect.width / 2;
    targetY = mouseY * ratio + rect.height / 2;
  } else {
    targetX = mouseX + rect.width / 2;
    targetY = mouseY + rect.height / 2;
  }
});

// Animation loop for smooth following with delay
function animate() {
  currentX += (targetX - currentX) * followSpeed;
  currentY += (targetY - currentY) * followSpeed;
  
  // Update the image position
  imageContainer.style.left = currentX + 'px';
  imageContainer.style.top = currentY + 'px';
  
  // Continue the animation loop
  requestAnimationFrame(animate);
}

// Start animation
animate();

// Buttons
document.addEventListener("DOMContentLoaded", function () {
  const buttons = [
      document.getElementById("button1"),
      document.getElementById("button2"),
      document.getElementById("button3"),
      document.getElementById("button4"),
  ];

  const centerX = window.innerWidth / 2; // Mitte des Bildschirms (X)
  const centerY = window.innerHeight / 2; // Mitte des Bildschirms (Y)
  const radius = 350; // Abstand von der Mitte
  const centerMultiplier = 1.5;

  // Positionen der Buttons (oben, rechts, unten, links)
  const positions = [
    { x: centerX, y: centerY - radius }, // Button 1: Oben
    { x: centerX + radius * centerMultiplier, y: centerY }, // Button 2: Rechts
    { x: centerX, y: centerY + radius }, // Button 3: Unten
    { x: centerX - radius * centerMultiplier, y: centerY }, // Button 4: Links
  ];

  buttons.forEach((button, index) => {
      // Setze die Position jedes Buttons
      button.style.left = `${positions[index].x}px`;
      button.style.top = `${positions[index].y}px`;
  });
});
