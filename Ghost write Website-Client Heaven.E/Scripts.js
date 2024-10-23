
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target element
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Remove the animation class if it already exists
                targetElement.classList.remove('highlight');

                // Trigger reflow to restart the animation
                void targetElement.offsetWidth;

                // Add the animation class
                targetElement.classList.add('highlight');
            }
        });
    });
});
