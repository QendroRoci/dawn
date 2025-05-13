/**
 * Influencer Carousel component for StyleMode theme
 * Handles carousel functionality and social media interactions
 */

class InfluencerCarousel {
  constructor() {
    this.carousel = document.querySelector('.influencer-carousel');
    this.sliderButtons = document.querySelectorAll('.slider-button');
    this.socialLinks = document.querySelectorAll('.influencer-card__social-link');
    this.init();
  }

  init() {
    if (!this.carousel) return;

    // Initialize slider buttons
    this.initSliderButtons();

    // Initialize social links
    this.initSocialLinks();

    // Add animation on scroll
    this.initScrollAnimation();
  }

  initSliderButtons() {
    this.sliderButtons.forEach((button) => {
      button.addEventListener('click', this.handleSliderButtonClick.bind(this));
    });
  }

  handleSliderButtonClick(event) {
    const button = event.currentTarget;
    const slider = button.closest('slider-component');
    const sliderList = slider.querySelector('ul');
    const sliderItems = sliderList.querySelectorAll('li');
    const currentIndex = parseInt(slider.querySelector('.slider-counter--current').textContent);
    const totalItems = sliderItems.length;

    let newIndex;

    if (button.classList.contains('slider-button--prev')) {
      newIndex = currentIndex > 1 ? currentIndex - 1 : totalItems;
    } else {
      newIndex = currentIndex < totalItems ? currentIndex + 1 : 1;
    }

    // Update counter
    slider.querySelector('.slider-counter--current').textContent = newIndex;

    // Scroll to the new item
    const newItem = sliderItems[newIndex - 1];
    newItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  initSocialLinks() {
    this.socialLinks.forEach((link) => {
      link.addEventListener('click', this.handleSocialLinkClick.bind(this));
    });
  }

  handleSocialLinkClick(event) {
    // Track social media clicks if analytics is available
    if (window.analytics && typeof window.analytics.track === 'function') {
      const link = event.currentTarget;
      const platform = link.getAttribute('aria-label');
      const influencerCard = link.closest('.influencer-card');
      const influencerName = influencerCard.querySelector('.influencer-card__name')?.textContent || 'Unknown';

      window.analytics.track('Social Media Click', {
        platform: platform,
        influencer: influencerName,
        url: link.href,
      });
    }
  }

  initScrollAnimation() {
    const cards = this.carousel.querySelectorAll('.influencer-card');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate--slide-in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      cards.forEach((card) => {
        observer.observe(card);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      cards.forEach((card) => {
        card.classList.add('animate--slide-in');
      });
    }
  }
}

// Initialize the carousel when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new InfluencerCarousel();
});
