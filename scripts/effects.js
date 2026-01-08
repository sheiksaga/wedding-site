/*
========================================
  VISUAL EFFECTS
========================================
- Confetti animation
- Particle systems
- Visual feedback effects
*/

(function() {
    /**
     * Check if reduced motion is preferred (live check)
     */
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function shouldReduceMotion() {
        return motionQuery.matches;
    }

    /**
     * Show confetti animation if not reduced motion
     */
    window.showConfetti = function() {
        if (shouldReduceMotion()) {
            return; // Skip animation for accessibility
        }

        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1000';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const particles = [];
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];

        // Create particles
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 5 + 5,
                speedX: Math.random() * 3 - 1.5,
                speedY: Math.random() * 3 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5
            });
        }

        let animationId = null;

        /**
         * Animate confetti particles
         */
        function animate() {
            // Check reduced motion preference on each frame
            if (shouldReduceMotion()) {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
                if (canvas.parentNode) {
                    canvas.parentNode.removeChild(canvas);
                }
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
                p.x += p.speedX;
                p.y += p.speedY;
                p.rotation += p.rotationSpeed;
                if (p.y > canvas.height) {
                    p.y = -p.size;
                    p.x = Math.random() * canvas.width;
                }
            });
            animationId = requestAnimationFrame(animate);
        }

        animationId = requestAnimationFrame(animate);

        // Cancel animation and remove canvas
        setTimeout(() => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            if (canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
        }, 5000);
    };
})();
