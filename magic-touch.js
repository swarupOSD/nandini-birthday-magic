(function() {
    // Inject CSS for the magic sparkles
    const style = document.createElement('style');
    style.innerHTML = `
        .magic-sparkle {
            position: fixed;
            pointer-events: none;
            z-index: 99999;
            width: 10px;
            height: 10px;
            background-color: #ffd700;
            border-radius: 50%;
            box-shadow: 0 0 10px #ffd700, 0 0 20px #ffb6c1, 0 0 30px #ff69b4;
            animation: sparkleAnim 1s linear forwards;
            opacity: 1;
        }
        @keyframes sparkleAnim {
            0% {
                transform: scale(0.5) translate(0, 0);
                opacity: 1;
            }
            100% {
                transform: scale(0) translate(var(--tx), var(--ty));
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    let lastX = 0;
    let lastY = 0;
    
    // Create a sparkle at given coordinates
    function createSparkle(x, y) {
        // Prevent creating too many sparkles if mouse is moving too slow
        if(Math.abs(x - lastX) < 10 && Math.abs(y - lastY) < 10) return;
        lastX = x;
        lastY = y;

        const sparkle = document.createElement('div');
        sparkle.className = 'magic-sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        // Randomize the direction it falls/fades out
        const tx = (Math.random() - 0.5) * 100 + 'px';
        const ty = (Math.random() * 50 + 50) + 'px'; // mostly fall down
        sparkle.style.setProperty('--tx', tx);
        sparkle.style.setProperty('--ty', ty);
        
        // Randomize size and color slightly
        const size = Math.random() * 8 + 4;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        
        const colors = ['#ffd700', '#ffb6c1', '#ff69b4', '#fff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.backgroundColor = color;
        sparkle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;

        document.body.appendChild(sparkle);

        // Cleanup
        setTimeout(() => {
            if(sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
        }, 1000);
    }

    // Add listeners for both mouse and touch
    window.addEventListener('mousemove', (e) => {
        createSparkle(e.clientX, e.clientY);
    });

    window.addEventListener('touchmove', (e) => {
        if(e.touches.length > 0) {
            createSparkle(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, {passive: true});
    
})();
