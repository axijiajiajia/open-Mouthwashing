// Gallery Images Data
const galleryImages = [
    {
        id: 1,
        src: 'images/screenshots/clinic-entrance.jpg',
        alt: 'Mouthwashing - Swansea Dental Clinic Entrance',
        caption: 'The ominous entrance to Swansea Dental Clinic',
        category: 'screenshots'
    },
    {
        id: 2,
        src: 'images/screenshots/dental-chair.jpg',
        alt: 'Mouthwashing - The Dental Chair Scene',
        caption: 'The Dental Chair',
        category: 'screenshots'
    },
    {
        id: 3,
        src: 'gallery/dr-swansea.jpg',
        alt: 'Mouthwashing - Dr. Helena Swansea Character Art',
        caption: 'Dr. Helena Swansea - The mysterious dentist',
        category: 'characters'
    },
    {
        id: 4,
        src: 'gallery/jimmy-portrait.jpg',
        alt: 'Mouthwashing - Jimmy Morrison Character Art',
        caption: 'Jimmy Morrison - The protagonist',
        category: 'characters'
    },
    {
        id: 5,
        src: 'gallery/concept-art-1.jpg',
        alt: 'Mouthwashing - Dental Tools Concept Art',
        caption: 'Early concept art of the transformed dental tools',
        category: 'artwork'
    },
    {
        id: 6,
        src: 'gallery/concept-art-2.jpg',
        alt: 'Mouthwashing - Nightmare Sequence Concept',
        caption: 'Concept art for the nightmare sequence',
        category: 'artwork'
    },
    {
        id: 7,
        src: 'gallery/clinic-corridor.jpg',
        alt: 'Mouthwashing - Twisted Corridor Screenshot',
        caption: 'The ever-changing corridors of the clinic',
        category: 'screenshots'
    },
    {
        id: 8,
        src: 'gallery/nurse-anya.jpg',
        alt: 'Mouthwashing - Nurse Anya Character Art',
        caption: 'Nurse Anya - The enigmatic assistant',
        category: 'characters'
    }
];

// Populate Gallery
function populateGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    galleryImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.category = image.category;
        
        galleryItem.innerHTML = `
            <div class="image-container">
                <div class="loading-spinner"></div>
                <img src="${image.src}" 
                     alt="${image.alt}" 
                     loading="lazy"
                     onload="this.parentElement.classList.add('loaded')"
                     onerror="handleImageError(this)"
                >
            </div>
            <p class="gallery-caption">${image.caption}</p>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Scroll Reveal
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterGallery(filter);
        
        // Update active button
        filterButtons.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');
    });
});

function filterGallery(filter) {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Statistics Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            stat.textContent = Math.floor(current).toLocaleString();
            if (current >= target) {
                clearInterval(timer);
                stat.textContent = target.toLocaleString();
            }
        }, 20);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateGallery();
    reveal();
    animateStats();
    setupVideoThumbnails();
});

// 处理图片加载失败
function handleImageError(img) {
    img.parentElement.innerHTML = `
        <div class="image-error">
            <i class="fas fa-image"></i>
            <p>Image not available</p>
        </div>
    `;
}

// Video Modal Functionality
function setupVideoThumbnails() {
    const videoThumbs = document.querySelectorAll('.video-thumb');
    const body = document.body;
    
    videoThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const videoId = thumb.querySelector('.play-button').dataset.videoId;
            const modal = createVideoModal(videoId);
            body.appendChild(modal);
            
            // Show modal with animation
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Handle close button
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
        });
    });
}

function createVideoModal(videoId) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-video-container">
            <span class="modal-close">&times;</span>
            <div class="main-video">
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    `;
    return modal;
} 