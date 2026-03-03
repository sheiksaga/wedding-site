/*
========================================
  WEDDING SITE - MAIN JAVASCRIPT
========================================
Simplified, consolidated script
*/

document.addEventListener('DOMContentLoaded', () => {
    initNavVisibility();
    initBackToTop();
    initPhotoUpload();
    initQuiz();
    initRsvp();
    initLanguageSwitcher();
    initSectionBackgrounds();
    initLightbox();
    initProtectedContacts();

    // Quiz button handlers (attached once)
    const calculateBtn = document.getElementById('calculate-btn');
    const retakeBtn = document.getElementById('retake-btn');
    if (calculateBtn) calculateBtn.onclick = calculateScore;
    if (retakeBtn) retakeBtn.onclick = retakeQuiz;
});

/* ========================================
   SECTION BACKGROUND IMAGES
   Randomly assign images to sections (no duplicates)
   Lazy load backgrounds using Intersection Observer
   Responsive image loading based on viewport size
   ======================================== */
function initSectionBackgrounds() {
    const imageNames = ['AO9A7155', 'AO9A7275', 'AO9A7341', 'AO9A7440', 'AO9A7529', 'AO9A7727', 'AO9A7293'];

    // Map section IDs (some use id, some use class)
    const sections = [
        { id: 'home', selector: '.hero' },
        { id: 'story', selector: null },
        { id: 'wedding', selector: null },
        { id: 'rsvp', selector: null },
        { id: 'photos', selector: null }
    ];

    // Shuffle array (Fisher-Yates)
    function shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Determine appropriate image size based on viewport
    function getImageSize() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const maxDimension = Math.max(viewportWidth, viewportHeight);

        // For retina/high-DPI displays, multiply by device pixel ratio
        const dpr = window.devicePixelRatio || 1;
        const effectiveResolution = maxDimension * dpr;

        // Select appropriate size based on effective resolution
        if (effectiveResolution <= 800) return 'small';
        if (effectiveResolution <= 1200) return 'medium';
        if (effectiveResolution <= 1920) return 'large';
        if (effectiveResolution <= 2560) return 'xlarge';
        return 'full'; // Original resolution for very high-res displays
    }

    // Check WebP support once
    const supportsWebP = (() => {
        try {
            return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
        } catch (e) {
            return false;
        }
    })();

    const shuffledImages = shuffle(imageNames);

    // Create Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionEl = entry.target;
                const imageName = sectionEl.dataset.bgImage;

                if (imageName) {
                    const imageSize = getImageSize();
                    const imagePath = supportsWebP
                        ? `images/${imageSize}/${imageName}.webp`
                        : `images/${imageSize}/${imageName}.jpg`;

                    // Preload image before setting as background
                    const img = new Image();
                    img.onload = () => {
                        sectionEl.style.backgroundImage = `url('${imagePath}')`;
                        sectionEl.classList.add('bg-loaded');
                    };
                    img.src = imagePath;

                    // Stop observing once loaded
                    observer.unobserve(sectionEl);
                }
            }
        });
    }, {
        // Start loading when section is within 200px of viewport
        rootMargin: '200px 0px',
        // Load immediately if section is already visible
        threshold: 0.01
    });

    sections.forEach((section, index) => {
        if (index < shuffledImages.length) {
            let sectionEl = document.getElementById(section.id);
            if (!sectionEl && section.selector) {
                sectionEl = document.querySelector(section.selector);
            }
            if (sectionEl) {
                const imageName = shuffledImages[index];
                // Store image name for lazy loading
                sectionEl.dataset.bgImage = imageName;

                // Start observing the section
                imageObserver.observe(sectionEl);
            }
        }
    });
}

/* ========================================
   NAV VISIBILITY ON SCROLL
   ======================================== */
function initNavVisibility() {
    const nav = document.querySelector('.nav-menu');
    if (!nav) return;

    let ticking = false;

    const updateNav = () => {
        const currentScrollY = window.scrollY;

        // Show nav after user starts scrolling (past 50px)
        if (currentScrollY > 50) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    }, { passive: true });
}

/* ========================================
   BACK TO TOP BUTTON
   ======================================== */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
}

/* ========================================
   PHOTO/VIDEO UPLOAD WITH GOOGLE DRIVE
   ======================================== */

// CONFIGURATION - Replace with your Google Apps Script Web App URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzierS5v8pjV-wqrg2_vlEnMXbZLHTieXw3xvUJU4b7iHXbcLB-ax0W6RaabdLntEuQ/exec';

let currentFiles = [];

function initPhotoUpload() {
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');

    if (!uploadBtn || !fileInput) return;

    // Click button to trigger file input
    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            uploadFiles(files);
        }
        // Reset input so same file can be selected again
        fileInput.value = '';
    });

    // Initialize carousel navigation
    initCarousel();

    // Load existing gallery on page load
    loadGallery();
}

/**
 * Upload files to Google Drive
 */
async function uploadFiles(files) {
    const statusEl = document.getElementById('uploadStatus');
    const uploadBtn = document.getElementById('uploadBtn');

    // Validate files
    const validFiles = Array.from(files).filter(file => {
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        return isImage || isVideo;
    });

    if (validFiles.length === 0) {
        showToast(t('upload.validating'), 'error');
        return;
    }

    if (APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_URL_HERE') {
        showToast(t('upload.configError'), 'error');
        console.error('Please configure APPS_SCRIPT_URL in scripts/app.js');
        return;
    }

    // Show loading state
    uploadBtn.disabled = true;
    statusEl.innerHTML = `
        <div class="upload-progress">
            <span>${t('upload.uploading', { count: validFiles.length })}</span>
            <div class="upload-progress-bar">
                <div class="upload-progress-fill" style="width: 0%"></div>
            </div>
        </div>
    `;

    let uploadedCount = 0;
    const totalFiles = validFiles.length;
    const errors = [];

    for (const file of validFiles) {
        try {
            await uploadSingleFile(file);
            uploadedCount++;
            // Update progress bar
            const progress = (uploadedCount / totalFiles) * 100;
            statusEl.querySelector('.upload-progress-fill').style.width = progress + '%';
        } catch (error) {
            console.error('Upload error:', error);
            errors.push(file.name);
        }
    }

    // Reset button
    uploadBtn.disabled = false;

    // Show result
    if (uploadedCount > 0) {
        const message = errors.length > 0
            ? t('upload.partial', { count: uploadedCount, failed: errors.join(', ') })
            : t('upload.success', { count: uploadedCount });
        showToast(message, errors.length > 0 ? 'error' : 'success');

        // Clear status after delay
        setTimeout(() => {
            statusEl.innerHTML = '';
        }, 3000);

        // Refresh gallery
        loadGallery();
    } else if (errors.length > 0) {
        showToast(t('upload.failed'), 'error');
        statusEl.innerHTML = '';
    }
}

/**
 * Upload a single file to Google Drive (Corrected for CORS)
 */
function uploadSingleFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Read file as Data URL (Base64)
        reader.readAsDataURL(file);

        reader.onload = function(e) {
            const rawData = e.target.result;
            // Remove the "data:image/jpeg;base64," prefix to get raw string
            const base64Data = rawData.split(',')[1];

            const payload = {
                filename: file.name,
                mimeType: file.type,
                file: base64Data
            };

            fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                // specific mode usually not needed if script handles standard CORS
                // but 'no-cors' would hide the response. We want the response.
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    resolve(data);
                } else {
                    reject(new Error(data.error || 'Unknown server error'));
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                reject(error);
            });
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
    });
}

/**
 * Load gallery from Google Drive
 */
function loadGallery() {
    if (APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_URL_HERE') {
        console.log('Please configure APPS_SCRIPT_URL to load gallery');
        return;
    }

    fetch(APPS_SCRIPT_URL + '?action=getFiles')
        .then(response => response.json())
        .then(data => {
            if (data.files) {
                currentFiles = data.files;
                renderGallery(currentFiles);
            }
        })
        .catch(error => {
            console.error('Failed to load gallery:', error);
        });
}

/**
 * Render gallery carousel
 */
function renderGallery(files) {
    const carousel = document.getElementById('galleryCarousel');
    const track = document.getElementById('carouselTrack');
    const emptyMsg = carousel.querySelector('.gallery-empty-msg');

    if (!files || files.length === 0) {
        carousel.style.display = 'none';
        return;
    }

    carousel.style.display = 'block';
    emptyMsg.style.display = 'none';

    track.innerHTML = '';

    files.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item' + (file.type === 'video' ? ' video' : '');
        item.dataset.index = index;
        item.dataset.fileId = file.id;
        item.dataset.fileType = file.type;
        item.dataset.fileUrl = file.url;
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', file.type === 'video' ? 'Play video' : 'View photo');
        item.style.cursor = 'pointer';

        if (file.type === 'video') {
            item.innerHTML = `<video src="${file.url}" preload="metadata" muted></video>`;
        } else {
            item.innerHTML = `<img src="${file.thumbnailUrl}" alt="${file.name}" loading="lazy">`;
        }

        // Open lightbox on click or keyboard activation
        item.addEventListener('click', () => openLightbox(index));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });

        track.appendChild(item);
    });

    // Reset carousel index when gallery is re-rendered
    carouselIndex = 0;
    // Don't scroll on initial page load - only on user navigation
}

/**
 * Initialize carousel navigation (index-based with infinite looping)
 */
let carouselIndex = 0;

function scrollCarouselToIndex(index) {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    const items = track.querySelectorAll('.carousel-item');
    if (!items.length) return;
    const item = items[index];
    if (item) {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

function initCarousel() {
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const track = document.getElementById('carouselTrack');

    if (!prevBtn || !nextBtn || !track) return;

    prevBtn.addEventListener('click', () => {
        const items = track.querySelectorAll('.carousel-item');
        if (!items.length) return;
        carouselIndex = (carouselIndex - 1 + items.length) % items.length;
        scrollCarouselToIndex(carouselIndex);
    });

    nextBtn.addEventListener('click', () => {
        const items = track.querySelectorAll('.carousel-item');
        if (!items.length) return;
        carouselIndex = (carouselIndex + 1) % items.length;
        scrollCarouselToIndex(carouselIndex);
    });

    // Always show both buttons
    prevBtn.style.visibility = 'visible';
    nextBtn.style.visibility = 'visible';
}

/* ========================================
   LIGHTBOX
   ======================================== */
let lightboxIndex = 0;

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !currentFiles.length) return;

    lightboxIndex = index;
    renderLightboxContent();
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Focus the close button for accessibility
    const closeBtn = document.getElementById('lightboxClose');
    if (closeBtn) closeBtn.focus();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('show');
    document.body.style.overflow = '';

    // Clear content after transition
    setTimeout(() => {
        const content = document.getElementById('lightboxContent');
        if (content) content.innerHTML = '';
    }, 300);
}

function navigateLightbox(direction) {
    if (!currentFiles.length) return;
    lightboxIndex = (lightboxIndex + direction + currentFiles.length) % currentFiles.length;
    renderLightboxContent();
}

function renderLightboxContent() {
    const content = document.getElementById('lightboxContent');
    if (!content) return;

    const file = currentFiles[lightboxIndex];
    if (!file) return;

    content.innerHTML = '';

    if (file.type === 'video') {
        const video = document.createElement('video');
        video.src = file.url;
        video.controls = true;
        video.autoplay = true;
        video.style.maxWidth = '100%';
        video.style.maxHeight = '90vh';
        content.appendChild(video);
    } else {
        const img = document.createElement('img');
        // Use a large thumbnail URL for lightbox (file.url is a Drive view URL, not embeddable)
        const largeUrl = file.thumbnailUrl
            ? file.thumbnailUrl.replace(/sz=w\d+/, 'sz=w1600')
            : `https://drive.google.com/uc?export=view&id=${file.id}`;
        img.src = largeUrl;
        img.alt = file.name || '';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '90vh';
        img.style.objectFit = 'contain';
        content.appendChild(img);
    }
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    // Close button
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);

    // Prev / Next buttons
    document.getElementById('lightboxPrev').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });
    document.getElementById('lightboxNext').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });

    // Click backdrop to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Hide and remove after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

/* ========================================
   QUIZ FUNCTIONALITY
   ======================================== */
function initQuiz() {
    const quizTextContainer = document.getElementById('quizText');
    if (!quizTextContainer) return;

    loadQuizData(getCurrentLanguage());

    document.addEventListener('languageChanged', (e) => {
        loadQuizData(e.detail.language);
    });
}

function getCurrentLanguage() {
    return document.documentElement.lang || 'en';
}

function detectDeviceLanguage() {
    // Get browser language (e.g., 'en-US', 'sv-SE', 'ml-IN', 'ta-IN')
    const browserLang = navigator.language || navigator.userLanguage || '';

    // Extract the primary language code (before the hyphen)
    const primaryLang = browserLang.split('-')[0].toLowerCase();

    // Map to supported languages
    const supportedLanguages = ['en', 'sv', 'ml', 'ta'];

    if (supportedLanguages.includes(primaryLang)) {
        return primaryLang;
    }

    // Default to English if language not supported
    return 'en';
}

function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
}

let currentQuizData = [];
let currentQuizParts = [];
let isHiddenMode = false;

function loadQuizData(language) {
    const data = getQuizDataForLanguage(language);
    if (data.quizData && data.quizParts) {
        currentQuizData = data.quizData;
        currentQuizParts = data.quizParts;
        isHiddenMode = false;
        generateQuiz();
    }
}

function getQuizDataForLanguage(language) {
    switch(language) {
        case 'sv':
            return { quizData: typeof quizDataSv !== 'undefined' ? quizDataSv : null, quizParts: typeof quizPartsSv !== 'undefined' ? quizPartsSv : null };
        case 'ml':
            return { quizData: typeof quizDataMl !== 'undefined' ? quizDataMl : null, quizParts: typeof quizPartsMl !== 'undefined' ? quizPartsMl : null };
        case 'ta':
            return { quizData: typeof quizDataTa !== 'undefined' ? quizDataTa : null, quizParts: typeof quizPartsTa !== 'undefined' ? quizPartsTa : null };
        default:
            return { quizData: typeof quizDataEn !== 'undefined' ? quizDataEn : null, quizParts: typeof quizPartsEn !== 'undefined' ? quizPartsEn : null };
    }
}

function generateQuiz() {
    const container = document.getElementById('quizText');
    if (!container || !currentQuizData.length) return;

    container.innerHTML = '';

    currentQuizData.forEach((question, index) => {
        const select = document.createElement('select');
        select.id = question.id;
        select.addEventListener('change', checkHiddenMode);

        question.options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            select.appendChild(option);
        });

        container.appendChild(select);

        if (currentQuizParts[index]) {
            const span = document.createElement('span');
            span.textContent = currentQuizParts[index];
            container.appendChild(span);
        }
    });
}

const HIDDEN_ANSWERS = ['hidden1', 'hidden2', 'hidden3', 'hidden4', 'hidden5', 'hidden6'];
const HIDDEN_DROPDOWNS = ['dropdown1', 'dropdown2', 'dropdown3', 'dropdown4', 'dropdown5', 'dropdown9'];
const DROPDOWN_10_ID = 'dropdown10';
const HIDDEN_ANSWER_VALUE = 'hiddenAnswer';
const ANSWER_PREFIX = 'answer';

function checkHiddenMode() {
    const allHidden = HIDDEN_DROPDOWNS.every((id, i) => {
        const el = document.getElementById(id);
        return el && el.value === HIDDEN_ANSWERS[i];
    });

    if (allHidden && !isHiddenMode) {
        isHiddenMode = true;
        updateDropdown10Hidden();
    } else if (!allHidden && isHiddenMode) {
        isHiddenMode = false;
        restoreDropdown10();
    }
}

function updateDropdown10Hidden() {
    const dropdown = document.getElementById(DROPDOWN_10_ID);
    const question = currentQuizData.find(q => q.id === DROPDOWN_10_ID);
    if (dropdown && question && question.hiddenOptions) {
        dropdown.innerHTML = '';
        question.hiddenOptions.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            dropdown.appendChild(option);
        });
    }
}

function restoreDropdown10() {
    const dropdown = document.getElementById(DROPDOWN_10_ID);
    const question = currentQuizData.find(q => q.id === DROPDOWN_10_ID);
    if (dropdown && question && question.options) {
        dropdown.innerHTML = '';
        question.options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            dropdown.appendChild(option);
        });
    }
}

function calculateScore() {
    let score = 0;

    currentQuizData.forEach(question => {
        const dropdown = document.getElementById(question.id);
        if (!dropdown) return;

        const val = dropdown.value;
        if (question.id === DROPDOWN_10_ID && isHiddenMode) {
            if (val === HIDDEN_ANSWER_VALUE) score++;
        } else {
            if (val.startsWith(ANSWER_PREFIX)) score++;
        }
    });

    const scoreEl = document.getElementById('score');
    const retakeBtn = document.getElementById('retake-btn');
    const dropdown10 = document.getElementById(DROPDOWN_10_ID);

    if (isHiddenMode && dropdown10 && dropdown10.value === HIDDEN_ANSWER_VALUE) {
        scoreEl.textContent = t('quiz.scoreHidden');
        scoreEl.style.color = 'green';
        // Trigger confetti for finding all hidden answers!
        if (typeof window.showConfetti === 'function') {
            window.showConfetti();
        }
    } else {
        scoreEl.textContent = t('quiz.scoreNormal', { score: score });
        scoreEl.style.color = score >= 8 ? 'green' : score >= 6 ? 'orange' : '#e74c3c';
        // Trigger confetti for perfect score!
        if (score === 10 && typeof window.showConfetti === 'function') {
            window.showConfetti();
        }
    }

    scoreEl.style.display = 'block';
    retakeBtn.style.display = 'inline-block';
}

function retakeQuiz() {
    generateQuiz();
    document.getElementById('score').style.display = 'none';
    document.getElementById('retake-btn').style.display = 'none';
    isHiddenMode = false;
    restoreDropdown10();
}

/* ========================================
   RSVP FORM
   ======================================== */
function initRsvp() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Honeypot check
        const honeypot = document.getElementById('honeypot');
        if (honeypot && honeypot.value) return;

        const submitBtn = form.querySelector('.reply-button');
        const confirmMsg = document.getElementById('confirmMsg');
        const originalBtnText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = t('rsvp.sending');
        submitBtn.disabled = true;
        confirmMsg.style.display = 'none';

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            console.log('Web3Forms response:', result);

            if (result.success) {
                confirmMsg.textContent = t('rsvp.success');
                confirmMsg.classList.remove('error');
                confirmMsg.style.display = 'block';
                form.reset();
                setTimeout(() => {
                    confirmMsg.style.display = 'none';
                    confirmMsg.classList.remove('error');
                }, 5000);
            } else {
                confirmMsg.textContent = t('rsvp.error');
                confirmMsg.classList.add('error');
                confirmMsg.style.display = 'block';
                setTimeout(() => {
                    confirmMsg.style.display = 'none';
                    confirmMsg.classList.remove('error');
                }, 5000);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            confirmMsg.textContent = t('rsvp.error');
            confirmMsg.classList.add('error');
            confirmMsg.style.display = 'block';
            setTimeout(() => {
                confirmMsg.style.display = 'none';
                confirmMsg.classList.remove('error');
            }, 5000);
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

/* ========================================
   LANGUAGE SWITCHER
   ======================================== */
function initLanguageSwitcher() {
    // Load saved language, or detect device language, or default to English
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        // Detect device language
        const deviceLang = detectDeviceLanguage();
        setLanguage(deviceLang);
    }

    // Add click handlers to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = btn.dataset.lang;
            setLanguage(lang);

            // Update current lang display - target the first span inside lang-toggle
            const langToggle = document.querySelector('.lang-toggle');
            if (langToggle) {
                langToggle.querySelector('span:first-child').textContent = lang.toUpperCase();
            }
        });
    });

    // Initialize translations on page load
    updatePageTranslations();
}

/* ========================================
   TRANSLATION SYSTEM
   ======================================== */

// Get translation by key with placeholder support
function t(key, placeholders = {}) {
  const lang = getCurrentLanguage();
  const translations = getTranslationsForLanguage(lang);
  let text = translations[key] || key;

  // Replace placeholders like {count}, {score}, etc.
  Object.keys(placeholders).forEach(placeholder => {
    text = text.replace(new RegExp(`{${placeholder}}`, 'g'), placeholders[placeholder]);
  });

  return text;
}

// Get translation object for current language
function getTranslationsForLanguage(language) {
  switch(language) {
    case 'sv':
      return typeof translationsSv !== 'undefined' ? translationsSv : {};
    case 'ml':
      return typeof translationsMl !== 'undefined' ? translationsMl : {};
    case 'ta':
      return typeof translationsTa !== 'undefined' ? translationsTa : {};
    default:
      return typeof translationsEn !== 'undefined' ? translationsEn : {};
  }
}

// Update all translatable elements in the DOM
function updatePageTranslations() {
  const lang = getCurrentLanguage();

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);

    if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'email')) {
      el.placeholder = translation;
    } else if (el.tagName === 'INPUT' && el.type === 'submit') {
      el.value = translation;
    } else {
      el.textContent = translation;
    }
  });

  // Update elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  // Update elements with data-i18n-value
  document.querySelectorAll('[data-i18n-value]').forEach(el => {
    const key = el.getAttribute('data-i18n-value');
    el.value = t(key);
  });

  // Update elements with data-i18n-aria-label
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria-label');
    el.setAttribute('aria-label', t(key));
  });

  // Update date formatting based on locale
  updateDateFormats(lang);
}

// Update date formats based on language
function updateDateFormats(lang) {
  const dateEl = document.querySelector('.date');
  if (dateEl) {
    const date = new Date('2026-05-30');
    const locale = lang === 'sv' ? 'sv-SE' : lang === 'ml' ? 'ml-IN' : lang === 'ta' ? 'ta-IN' : 'en-US';
    dateEl.textContent = date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

// Listen for language changes and update translations
document.addEventListener('languageChanged', (e) => {
  updatePageTranslations();
});

/* ========================================
   PROTECTED CONTACTS (Email/Phone Obfuscation)
   Prevents spam bots from scraping contact info
   ======================================== */
function initProtectedContacts() {
  // Find all elements with data-protected attribute
  document.querySelectorAll('[data-protected]').forEach(el => {
    const type = el.dataset.protected;
    const encoded = el.dataset.encoded;

    if (!encoded) return;

    // Decode the base64 string
    const decoded = atob(encoded);

    if (type === 'email') {
      // Create mailto link
      const link = document.createElement('a');
      link.href = 'mailto:' + decoded;
      link.textContent = decoded;
      link.style.textDecoration = 'underline';
      // Copy any inline styles from original element
      if (el.style.cssText) {
        link.style.cssText = el.style.cssText;
      }
      el.replaceWith(link);
    } else if (type === 'phone') {
      // Create tel link
      const link = document.createElement('a');
      link.href = 'tel:' + decoded.replace(/\s/g, '');
      link.textContent = decoded;
      link.style.textDecoration = 'underline';
      if (el.style.cssText) {
        link.style.cssText = el.style.cssText;
      }
      el.replaceWith(link);
    } else if (type === 'swish') {
      // Just display text (no link for Swish)
      el.textContent = decoded;
    }
  });
}
