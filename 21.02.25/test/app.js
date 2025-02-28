// Generate particles
const grid = document.getElementById('grid');
const particleCount = Math.floor(window.innerWidth * window.innerHeight / 400);

for(let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  grid.appendChild(particle);
}

// Update cursor position
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
  document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
});

// Add distance calculation to each particle
document.querySelectorAll('.particle').forEach(particle => {
  particle.style.setProperty('--distance', Math.random() * 100);
  
  particle.addEventListener('mousemove', () => {
    const rect = particle.getBoundingClientRect();
    const distance = Math.hypot(
      rect.x - parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cursor-x')),
      rect.y - parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cursor-y'))
    );
    
    particle.style.setProperty('--distance', distance);
  });
});

/*
// Create main cursor
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

// Create trail elements
const numTrails = 35; //number of circles
const trails = [];
const startSize = 18; // Starting size for first trail dot

for (let i = 0; i < numTrails; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    // Calculate size reduction for each subsequent dot
    const size = startSize * (1 - (i / numTrails)); //size changing
    trail.style.width = size + 'px';
    trail.style.height = size + 'px';
    document.body.appendChild(trail);
    trails.push({
        element: trail,
        x: 0,
        y: 0,
        size: size
    });
}

// Update cursor and trail positions
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update main cursor
    cursor.style.left = mouseX - cursor.offsetWidth / 2 + 'px';
    cursor.style.top = mouseY - cursor.offsetHeight / 2 + 'px';
});

// Animate trails
function animateTrails() {
    let currentX = mouseX;
    let currentY = mouseY;

    trails.forEach((trail, index) => {
        // Create trailing effect by delayed following
        trail.x += (currentX - trail.x) * 0.3;
        trail.y += (currentY - trail.y) * 0.3;

        trail.element.style.left = trail.x - trail.size / 2 + 'px';
        trail.element.style.top = trail.y - trail.size / 2 + 'px';

        currentX = trail.x;
        currentY = trail.y;
    });

    requestAnimationFrame(animateTrails);
}

animateTrails();

*/