// Create main cursor
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

// Create trail elements
const numTrails = 350; //number of circles
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