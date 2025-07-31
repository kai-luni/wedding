document.addEventListener('DOMContentLoaded', function() {
  // Define all galleries with their modal IDs and return locations
  const galleries = [
    {
      modalIds: ['img1', 'img2', 'img3', 'img4'],
      returnLocation: '#gallery'
    },
    {
      modalIds: ['hotel1', 'hotel2'],
      returnLocation: '#hotel-gallery'
    },
    {
      modalIds: ['krabi1', 'krabi2', 'krabi3', 'krabi4'],
      returnLocation: '#krabi-gallery'
    },
    {
      modalIds: ['villa1', 'villa2', 'villa3', 'villa4'],
      returnLocation: '#villa-gallery'
    },
    {
      modalIds: ['dress1', 'dress2', 'dress3', 'dress4'],
      returnLocation: '#dress-gallery'
    },
    {
      modalIds: ['sim1', 'sim2', 'sim3'],
      returnLocation: '#sim-gallery'
    }
  ];

  // Create a mapping of each modal ID to its gallery info
  const modalToGalleryMap = {};
  galleries.forEach(gallery => {
    gallery.modalIds.forEach(modalId => {
      modalToGalleryMap[modalId] = {
        modalIds: gallery.modalIds,
        returnLocation: gallery.returnLocation
      };
    });
  });

  // Handle keyboard navigation
  document.addEventListener('keydown', function(event) {
    // Current hash (e.g. '#img1'), remove '#' to get 'img1'
    const currentHash = window.location.hash.slice(1);
    
    // If no hash or not in our known modals, do nothing
    if (!currentHash || !modalToGalleryMap[currentHash]) return;
    
    // Get the gallery information for this modal
    const galleryInfo = modalToGalleryMap[currentHash];
    const currentGalleryOrder = galleryInfo.modalIds;
    const returnLocation = galleryInfo.returnLocation;
    
    switch (event.key) {
      case 'Escape':
        // ESC: Close the modal and return to the appropriate gallery
        window.location.hash = returnLocation;
        break;
      case 'ArrowLeft':
        // LEFT: Go to previous image (looped)
        {
          const currentIndex = currentGalleryOrder.indexOf(currentHash);
          const prevIndex = (currentIndex - 1 + currentGalleryOrder.length) % currentGalleryOrder.length;
          window.location.hash = '#' + currentGalleryOrder[prevIndex];
        }
        break;
      case 'ArrowRight':
        // RIGHT: Go to next image (looped)
        {
          const currentIndex = currentGalleryOrder.indexOf(currentHash);
          const nextIndex = (currentIndex + 1) % currentGalleryOrder.length;
          window.location.hash = '#' + currentGalleryOrder[nextIndex];
        }
        break;
      default:
        // Do nothing for other keys
        break;
    }
  });
});