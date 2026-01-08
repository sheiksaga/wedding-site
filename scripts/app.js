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

    // Quiz button handlers (attached once)
    const calculateBtn = document.getElementById('calculate-btn');
    const retakeBtn = document.getElementById('retake-btn');
    if (calculateBtn) calculateBtn.onclick = calculateScore;
    if (retakeBtn) retakeBtn.onclick = retakeQuiz;
});

/* ========================================
   SECTION BACKGROUND IMAGES
   Randomly assign images to sections (no duplicates)
   ======================================== */
function initSectionBackgrounds() {
    const imageNames = ['AO9A7155', 'AO9A7275', 'AO9A7341', 'AO9A7440', 'AO9A7529', 'AO9A7727'];

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

    const shuffledImages = shuffle(imageNames);

    sections.forEach((section, index) => {
        if (index < shuffledImages.length) {
            let sectionEl = document.getElementById(section.id);
            if (!sectionEl && section.selector) {
                sectionEl = document.querySelector(section.selector);
            }
            if (sectionEl) {
                const imageName = shuffledImages[index];
                // Use WebP if supported, fallback to JPEG
                const supportsWebP = (() => {
                    try {
                        return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
                    } catch (e) {
                        return false;
                    }
                })();
                const imagePath = supportsWebP
                    ? `images/${imageName}.webp`
                    : `images/${imageName}.jpg`;
                sectionEl.style.backgroundImage = `url('${imagePath}')`;
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
        showToast('Please select photos or videos only.', 'error');
        return;
    }

    if (APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_URL_HERE') {
        showToast('Please configure the Google Apps Script URL in app.js', 'error');
        console.error('Please configure APPS_SCRIPT_URL in scripts/app.js');
        return;
    }

    // Show loading state
    uploadBtn.disabled = true;
    statusEl.innerHTML = `
        <div class="upload-progress">
            <span>Uploading ${validFiles.length} file(s)...</span>
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
            ? `${uploadedCount} file(s) uploaded. Failed: ${errors.join(', ')}`
            : `${uploadedCount} file(s) uploaded successfully!`;
        showToast(message, errors.length > 0 ? 'error' : 'success');

        // Clear status after delay
        setTimeout(() => {
            statusEl.innerHTML = '';
        }, 3000);

        // Refresh gallery
        loadGallery();
    } else if (errors.length > 0) {
        showToast('Upload failed. Please try again.', 'error');
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

        if (file.type === 'video') {
            // For videos, use the direct URL from Google Drive
            item.innerHTML = `<video src="${file.url}" preload="metadata" muted></video>`;
        } else {
            // For images, use the thumbnail URL for the gallery
            item.innerHTML = `<img src="${file.thumbnailUrl}" alt="${file.name}" loading="lazy">`;
        }

        // Carousel items are now non-clickable for lightbox
        item.setAttribute('tabindex', '-1');
        item.style.cursor = 'default';

        track.appendChild(item);
    });
}

/**
 * Initialize carousel navigation
 */
function initCarousel() {
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const track = document.getElementById('carouselTrack');

    if (!prevBtn || !nextBtn || !track) return;

    const scrollAmount = 220; // item width + gap

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Hide nav buttons when at edges
    track.addEventListener('scroll', () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        prevBtn.style.visibility = track.scrollLeft <= 0 ? 'hidden' : 'visible';
        nextBtn.style.visibility = track.scrollLeft >= maxScroll - 5 ? 'hidden' : 'visible';
    });

    // Initial state
    prevBtn.style.visibility = 'hidden';
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
        scoreEl.textContent = "You found the hidden answers! Congrats!";
        scoreEl.style.color = 'green';
        // Trigger confetti for finding all hidden answers!
        if (typeof window.showConfetti === 'function') {
            window.showConfetti();
        }
    } else {
        scoreEl.textContent = `Your score: ${score} out of 10`;
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

    // Create hidden iframe for Google Forms submission
    const iframe = document.createElement('iframe');
    iframe.name = 'google-form-target';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    form.target = 'google-form-target';

    form.addEventListener('submit', () => {
        // Honeypot check
        const honeypot = document.getElementById('honeypot');
        if (honeypot && honeypot.value) return;

        const submitBtn = form.querySelector('.reply-button');
        const confirmMsg = document.getElementById('confirmMsg');
        const originalBtnText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        confirmMsg.style.display = 'none';

        // Listen for iframe load to show confirmation
        iframe.onload = () => {
            confirmMsg.textContent = 'Thank you! Your RSVP has been recorded.';
            confirmMsg.style.display = 'block';
            form.reset();
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            setTimeout(() => confirmMsg.style.display = 'none', 5000);
        };
    });
}

/* ========================================
   LANGUAGE SWITCHER
   ======================================== */
function initLanguageSwitcher() {
    // Load saved language or default to English
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);

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
}
