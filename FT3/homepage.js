// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const homepageContainer = document.querySelector('.homepage-container');
    const button = document.querySelector('.btn-animated');
  
    // Add fade-in animation when the page loads
    homepageContainer.style.opacity = 0;
    homepageContainer.style.transition = 'opacity 2s ease-in-out';
    setTimeout(() => {
      homepageContainer.style.opacity = 1;
    }, 100); // small delay to start the animation after load
  
    // Button hover effect - scale up when hovered
    button.addEventListener('mouseover', () => {
      button.style.transform = 'scale(1.1)';
    });
  
    // Button returns to original scale when hover ends
    button.addEventListener('mouseout', () => {
      button.style.transform = 'scale(1)';
    });
  });
  