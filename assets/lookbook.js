/**
 * Lookbook component for StyleMode theme
 * Handles product hotspot interactions and popup displays
 */

class Lookbook {
  constructor() {
    this.productTags = document.querySelectorAll('.lookbook-card__product-tag');
    this.init();
  }

  init() {
    // Initialize product tags
    this.productTags.forEach((tag) => {
      tag.addEventListener('click', this.handleTagClick.bind(this));

      // For mobile: use click instead of hover
      if (window.innerWidth < 750) {
        tag.addEventListener('click', this.toggleProductPopup.bind(this));
      }
    });

    // Close popups when clicking outside
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.lookbook-card__product-tag')) {
        this.closeAllPopups();
      }
    });

    // Adjust popup positions on window resize
    window.addEventListener('resize', this.adjustPopupPositions.bind(this));
  }

  handleTagClick(event) {
    // Prevent default link behavior for mobile
    if (window.innerWidth < 750) {
      event.preventDefault();
    }
  }

  toggleProductPopup(event) {
    event.preventDefault();
    const tag = event.currentTarget;
    const popup = tag.querySelector('.lookbook-product-popup');

    // Close all other popups first
    this.closeAllPopups();

    // Toggle current popup
    if (popup) {
      popup.classList.toggle('is-active');
      this.adjustPopupPosition(popup, tag);
    }
  }

  closeAllPopups() {
    const activePopups = document.querySelectorAll('.lookbook-product-popup.is-active');
    activePopups.forEach((popup) => {
      popup.classList.remove('is-active');
    });
  }

  adjustPopupPositions() {
    const activePopups = document.querySelectorAll('.lookbook-product-popup.is-active');
    activePopups.forEach((popup) => {
      const tag = popup.closest('.lookbook-card__product-tag');
      this.adjustPopupPosition(popup, tag);
    });
  }

  adjustPopupPosition(popup, tag) {
    // Get tag position
    const tagRect = tag.getBoundingClientRect();
    const lookbookCard = tag.closest('.lookbook-card');
    const cardRect = lookbookCard.getBoundingClientRect();

    // Calculate popup position
    const popupWidth = popup.offsetWidth;
    const popupHeight = popup.offsetHeight;

    // Default position (below tag)
    let top = '100%';
    let left = '50%';
    let transform = 'translateX(-50%)';

    // Check if popup would go outside the viewport
    if (tagRect.bottom + popupHeight > window.innerHeight) {
      // Position above tag
      top = 'auto';
      popup.style.bottom = '100%';
    } else {
      popup.style.bottom = 'auto';
    }

    // Check if popup would go outside the card horizontally
    if (tagRect.left - popupWidth / 2 < cardRect.left) {
      // Align to left edge of card with padding
      left = '0';
      transform = 'translateX(0)';
      popup.style.left = '0';
    } else if (tagRect.right + popupWidth / 2 > cardRect.right) {
      // Align to right edge of card with padding
      left = '100%';
      transform = 'translateX(-100%)';
    }

    // Apply position
    popup.style.top = top;
    popup.style.left = left;
    popup.style.transform = transform;
  }
}

// Initialize lookbook when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Lookbook();
});
