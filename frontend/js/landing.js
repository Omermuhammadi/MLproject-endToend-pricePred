document.addEventListener('DOMContentLoaded', () => {
    // --- Particle Background Animation ---
    const particleContainer = document.getElementById('particle-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particleContainer.appendChild(particle);
    }

    // --- Scroll Reveal Animation ---
    const animatedElements = document.querySelectorAll('.anim-fade-in-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the animation
                entry.target.style.animationPlayState = 'running';
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        // Pause animation initially to be triggered by scroll
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
});
