/**
 * Interactive Footer JavaScript
 * - Weather API integration (Open-Meteo)
 * - Fika & Sadya cultural facts with click-to-cycle
 * - Smooth interactions
 */

(function() {
  'use strict';

  // ========================================
  // CONFIGURATION
  // ========================================

  // Location coordinates
  const LOCATIONS = {
    granna: { lat: 58.036, lon: 14.469, name: 'Gränna, Sweden' },
    kollam: { lat: 8.881, lon: 76.584, name: 'Kollam, Kerala' }
  };

  // Weather condition mappings (WMO codes) with icons
  const WEATHER_CONDITIONS = {
    0: { name: 'Clear sky', icon: 'clear' },
    1: { name: 'Mainly clear', icon: 'clear' },
    2: { name: 'Partly cloudy', icon: 'partly-cloudy' },
    3: { name: 'Overcast', icon: 'cloudy' },
    45: { name: 'Fog', icon: 'fog' },
    48: { name: 'Depositing rime fog', icon: 'fog' },
    51: { name: 'Light drizzle', icon: 'drizzle' },
    53: { name: 'Moderate drizzle', icon: 'drizzle' },
    55: { name: 'Dense drizzle', icon: 'drizzle' },
    56: { name: 'Light freezing drizzle', icon: 'freezing-drizzle' },
    57: { name: 'Dense freezing drizzle', icon: 'freezing-drizzle' },
    61: { name: 'Slight rain', icon: 'rain' },
    63: { name: 'Moderate rain', icon: 'rain' },
    65: { name: 'Heavy rain', icon: 'rain' },
    66: { name: 'Light freezing rain', icon: 'freezing-rain' },
    67: { name: 'Heavy freezing rain', icon: 'freezing-rain' },
    71: { name: 'Slight snow', icon: 'snow' },
    73: { name: 'Moderate snow', icon: 'snow' },
    75: { name: 'Heavy snow', icon: 'snow' },
    77: { name: 'Snow grains', icon: 'snow' },
    80: { name: 'Slight rain showers', icon: 'rain' },
    81: { name: 'Moderate rain showers', icon: 'rain' },
    82: { name: 'Violent rain showers', icon: 'rain' },
    85: { name: 'Slight snow showers', icon: 'snow' },
    86: { name: 'Heavy snow showers', icon: 'snow' },
    95: { name: 'Thunderstorm', icon: 'thunderstorm' },
    96: { name: 'Thunderstorm with hail', icon: 'thunderstorm-hail' },
    99: { name: 'Thunderstorm with heavy hail', icon: 'thunderstorm-hail' }
  };

  // SVG icon definitions
  const WEATHER_ICONS = {
    clear: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="12" fill="#f59e0b"/>
      <g stroke="#f59e0b" stroke-width="2" stroke-linecap="round">
        <line x1="32" y1="8" x2="32" y2="14"/>
        <line x1="32" y1="50" x2="32" y2="56"/>
        <line x1="8" y1="32" x2="14" y2="32"/>
        <line x1="50" y1="32" x2="56" y2="32"/>
        <line x1="14.9" y1="14.9" x2="19.5" y2="19.5"/>
        <line x1="44.5" y1="44.5" x2="49.1" y2="49.1"/>
        <line x1="14.9" y1="49.1" x2="19.5" y2="44.5"/>
        <line x1="44.5" y1="19.5" x2="49.1" y2="14.9"/>
      </g>
    </svg>`,
    'partly-cloudy': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="10" fill="#f59e0b"/>
      <g stroke="#f59e0b" stroke-width="2" stroke-linecap="round">
        <line x1="24" y1="8" x2="24" y2="12"/>
        <line x1="24" y1="36" x2="24" y2="40"/>
        <line x1="8" y1="24" x2="12" y2="24"/>
        <line x1="36" y1="24" x2="40" y2="24"/>
        <line x1="12.9" y1="12.9" x2="16.5" y2="16.5"/>
        <line x1="31.5" y1="31.5" x2="35.1" y2="35.1"/>
        <line x1="12.9" y1="35.1" x2="16.5" y2="31.5"/>
        <line x1="31.5" y1="16.5" x2="35.1" y2="12.9"/>
      </g>
      <path d="M44 42c4.4 0 8-3.6 8-8 0-2.2-.9-4.2-2.4-5.6l-1.5 2.1c.9.9 1.4 2.1 1.4 3.5 0 2.5-2 4.5-4.5 4.5h-1" stroke="#9ca3af" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M54 36c0 0-4-6-10-6h-2c-3.3 0-6 2.7-6 6 0 2.5 1.5 4.6 3.7 5.5" fill="#9ca3af" stroke="#9ca3af" stroke-width="2"/>
    </svg>`,
    cloudy: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 40c0-4.4 3.6-8 8-8h24c3.3 0 6 2.7 6 6 0 2.2-.9 4.2-2.4 5.6l-1.5-2.1c.9-.9 1.4-2.1 1.4-3.5 0-2.5-2-4.5-4.5-4.5h-21" fill="#9ca3af" stroke="#9ca3af" stroke-width="2" stroke-linecap="round"/>
      <path d="M46 42c4.4 0 8-3.6 8-8 0-2.2-.9-4.2-2.4-5.6l-1.5 2.1c.9.9 1.4 2.1 1.4 3.5 0 2.5-2 4.5-4.5 4.5h-1" stroke="#9ca3af" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M54 36c0 0-4-6-10-6h-2c-3.3 0-6 2.7-6 6 0 2.5 1.5 4.6 3.7 5.5" fill="#9ca3af" stroke="#9ca3af" stroke-width="2"/>
    </svg>`,
    drizzle: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 34c0-3.3 2.7-6 6-6h28c2.2 0 4.1 1.2 5.2 3l-1.3-1.8c-.6-.8-1.6-1.2-2.6-1.2h-26c-2.8 0-5 2.2-5 5 0 1.7.9 3.2 2.2 4l-1.8-1c-.8.8-1.3 2-1.3 3.2 0 2.8 2.2 5 5 5h1" fill="#9ca3af" stroke="#9ca3af" stroke-width="2"/>
      <path d="M54 30c0 0-3-5-8-5h-1.5c-2.8 0-5 2.2-5 5 0 1.9 1.1 3.5 2.7 4.4" fill="#9ca3af" stroke="#9ca3af" stroke-width="2"/>
      <circle cx="20" cy="52" r="2" fill="#60a5fa"/>
      <circle cx="28" cy="52" r="2" fill="#60a5fa"/>
      <circle cx="36" cy="52" r="2" fill="#60a5fa"/>
      <circle cx="44" cy="52" r="2" fill="#60a5fa"/>
      <circle cx="24" cy="58" r="2" fill="#60a5fa"/>
      <circle cx="32" cy="58" r="2" fill="#60a5fa"/>
      <circle cx="40" cy="58" r="2" fill="#60a5fa"/>
    </svg>`,
    rain: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 34c0-3.3 2.7-6 6-6h28c2.2 0 4.1 1.2 5.2 3l-1.3-1.8c-.6-.8-1.6-1.2-2.6-1.2h-26c-2.8 0-5 2.2-5 5 0 1.7.9 3.2 2.2 4l-1.8-1c-.8.8-1.3 2-1.3 3.2 0 2.8 2.2 5 5 5h1" fill="#6b7280" stroke="#6b7280" stroke-width="2"/>
      <path d="M54 30c0 0-3-5-8-5h-1.5c-2.8 0-5 2.2-5 5 0 1.9 1.1 3.5 2.7 4.4" fill="#6b7280" stroke="#6b7280" stroke-width="2"/>
      <line x1="18" y1="48" x2="14" y2="58" stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="26" y1="46" x2="22" y2="56" stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="34" y1="48" x2="30" y2="58" stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="42" y1="46" x2="38" y2="56" stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="50" y1="48" x2="46" y2="58" stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
    'freezing-rain': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 34c0-3.3 2.7-6 6-6h28c2.2 0 4.1 1.2 5.2 3l-1.3-1.8c-.6-.8-1.6-1.2-2.6-1.2h-26c-2.8 0-5 2.2-5 5 0 1.7.9 3.2 2.2 4l-1.8-1c-.8.8-1.3 2-1.3 3.2 0 2.8 2.2 5 5 5h1" fill="#6b7280" stroke="#6b7280" stroke-width="2"/>
      <path d="M54 30c0 0-3-5-8-5h-1.5c-2.8 0-5 2.2-5 5 0 1.9 1.1 3.5 2.7 4.4" fill="#6b7280" stroke="#6b7280" stroke-width="2"/>
      <line x1="18" y1="48" x2="14" y2="58" stroke="#e5e7eb" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="26" y1="46" x2="22" y2="56" stroke="#e5e7eb" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="34" y1="48" x2="30" y2="58" stroke="#e5e7eb" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="42" y1="46" x2="38" y2="56" stroke="#e5e7eb" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="50" y1="48" x2="46" y2="58" stroke="#e5e7eb" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
    'freezing-drizzle': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 34c0-3.3 2.7-6 6-6h28c2.2 0 4.1 1.2 5.2 3l-1.3-1.8c-.6-.8-1.6-1.2-2.6-1.2h-26c-2.8 0-5 2.2-5 5 0 1.7.9 3.2 2.2 4l-1.8-1c-.8.8-1.3 2-1.3 3.2 0 2.8 2.2 5 5 5h1" fill="#9ca3af" stroke="#9ca3af" stroke-width="2"/>
      <path d="M54 30c0 0-3-5-8-5h-1.5c-2.8 0-5 2.2-5 5 0 1.9 1.1 3.5 2.7 4.4" fill="#9ca3af" stroke="#9ca3af" stroke-width="2"/>
      <circle cx="20" cy="52" r="2" fill="#e5e7eb"/>
      <circle cx="28" cy="52" r="2" fill="#e5e7eb"/>
      <circle cx="36" cy="52" r="2" fill="#e5e7eb"/>
      <circle cx="44" cy="52" r="2" fill="#e5e7eb"/>
      <circle cx="24" cy="58" r="2" fill="#e5e7eb"/>
      <circle cx="32" cy="58" r="2" fill="#e5e7eb"/>
      <circle cx="40" cy="58" r="2" fill="#e5e7eb"/>
    </svg>`,
    snow: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 34c0-3.3 2.7-6 6-6h28c2.2 0 4.1 1.2 5.2 3l-1.3-1.8c-.6-.8-1.6-1.2-2.6-1.2h-26c-2.8 0-5 2.2-5 5 0 1.7.9 3.2 2.2 4l-1.8-1c-.8.8-1.3 2-1.3 3.2 0 2.8 2.2 5 5 5h1" fill="#9ca3af" stroke="#9ca3af" stroke-width="2"/>
      <path d="M54 30c0 0-3-5-8-5h-1.5c-2.8 0-5 2.2-5 5 0 1.9 1.1 3.5 2.7 4.4" fill="#9ca3af" stroke="#9ca3af" stroke-width="2"/>
      <line x1="16" y1="48" x2="12" y2="58" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="46" x2="20" y2="56" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
      <line x1="32" y1="48" x2="28" y2="58" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="46" x2="36" y2="56" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
      <line x1="48" y1="48" x2="44" y2="58" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
      <line x1="20" y1="50" x2="16" y2="60" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
      <line x1="28" y1="48" x2="24" y2="58" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
      <line x1="36" y1="50" x2="32" y2="60" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
      <line x1="44" y1="48" x2="40" y2="58" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
      <line x1="52" y1="50" x2="48" y2="60" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    thunderstorm: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 34c0-3.3 2.7-6 6-6h28c2.2 0 4.1 1.2 5.2 3l-1.3-1.8c-.6-.8-1.6-1.2-2.6-1.2h-26c-2.8 0-5 2.2-5 5 0 1.7.9 3.2 2.2 4l-1.8-1c-.8.8-1.3 2-1.3 3.2 0 2.8 2.2 5 5 5h1" fill="#4b5563" stroke="#4b5563" stroke-width="2"/>
      <path d="M54 30c0 0-3-5-8-5h-1.5c-2.8 0-5 2.2-5 5 0 1.9 1.1 3.5 2.7 4.4" fill="#4b5563" stroke="#4b5563" stroke-width="2"/>
      <path d="M30 48l-6 12h4l-2 8 6-8h-4l2-8h-4z" fill="#fbbf24" stroke="#fbbf24" stroke-width="1"/>
      <line x1="18" y1="50" x2="14" y2="58" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/>
      <line x1="42" y1="50" x2="38" y2="58" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    'thunderstorm-hail': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 34c0-3.3 2.7-6 6-6h28c2.2 0 4.1 1.2 5.2 3l-1.3-1.8c-.6-.8-1.6-1.2-2.6-1.2h-26c-2.8 0-5 2.2-5 5 0 1.7.9 3.2 2.2 4l-1.8-1c-.8.8-1.3 2-1.3 3.2 0 2.8 2.2 5 5 5h1" fill="#4b5563" stroke="#4b5563" stroke-width="2"/>
      <path d="M54 30c0 0-3-5-8-5h-1.5c-2.8 0-5 2.2-5 5 0 1.9 1.1 3.5 2.7 4.4" fill="#4b5563" stroke="#4b5563" stroke-width="2"/>
      <path d="M30 48l-6 12h4l-2 8 6-8h-4l2-8h-4z" fill="#fbbf24" stroke="#fbbf24" stroke-width="1"/>
      <circle cx="18" cy="52" r="2" fill="#e5e7eb"/>
      <circle cx="26" cy="56" r="2" fill="#e5e7eb"/>
      <circle cx="36" cy="52" r="2" fill="#e5e7eb"/>
      <circle cx="44" cy="56" r="2" fill="#e5e7eb"/>
    </svg>`,
    fog: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 24h44" stroke="#9ca3af" stroke-width="3" stroke-linecap="round"/>
      <path d="M10 32h44" stroke="#9ca3af" stroke-width="3" stroke-linecap="round"/>
      <path d="M10 40h44" stroke="#9ca3af" stroke-width="3" stroke-linecap="round"/>
      <circle cx="32" cy="32" r="8" fill="#f59e0b"/>
    </svg>`
  };

  // Fun facts for Fika and Sadya
  const CULTURAL_FACTS = [
    { text: 'Fika is Sweden\'s favorite pastime—more than a coffee break, it\'s a social institution.', label: 'Fika' },
    { text: 'A traditional Sadya has 26+ dishes served on a banana leaf, eaten with your hands.', label: 'Sadya' },
    { text: 'The cinnamon bun (kanelbulle) was named Sweden\'s national pastry in 1999.', label: 'Fika' },
    { text: 'Eating from a banana leaf is believed to have cooling properties for the body.', label: 'Sadya' },
    { text: 'Swedes average 3-4 cups of coffee per day—one of the world\'s top consumers.', label: 'Fika' },
    { text: 'Payasam (sweet dessert) is served last, often in 3-4 different varieties.', label: 'Sadya' },
    { text: 'There are over 300 kinds of Swedish cinnamon buns—each region has its own recipe!', label: 'Fika' },
    { text: 'The banana leaf is folded after eating as a signal you\'re done.', label: 'Sadya' }
  ];

  // ========================================
  // WEATHER FUNCTIONS
  // ========================================

  /**
   * Fetch weather data from Open-Meteo API
   */
  async function fetchWeather(lat, lon) {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      if (!response.ok) throw new Error('Weather fetch failed');
      return await response.json();
    } catch (error) {
      console.error('Weather error:', error);
      return null;
    }
  }

  /**
   * Update weather display for a location
   */
  function updateWeatherDisplay(locationId, data) {
    const container = document.getElementById(`weather-${locationId}`);
    if (!container || !data) return;

    const iconEl = container.querySelector('.weather-icon');
    const tempEl = container.querySelector('.weather-temp');
    const conditionEl = container.querySelector('.weather-condition');

    // Update icon
    if (iconEl) {
      const wmoCode = data.current_weather.weathercode;
      const condition = WEATHER_CONDITIONS[wmoCode];
      const iconType = condition?.icon || 'clear';
      iconEl.innerHTML = WEATHER_ICONS[iconType] || WEATHER_ICONS.clear;
    }

    // Update temperature
    if (tempEl) {
      tempEl.textContent = `${Math.round(data.current_weather.temperature)}°C`;
    }

    // Update condition text
    if (conditionEl) {
      const wmoCode = data.current_weather.weathercode;
      conditionEl.textContent = WEATHER_CONDITIONS[wmoCode]?.name || 'Unknown';
    }
  }

  /**
   * Initialize all weather widgets
   */
  async function initWeather() {
    // Fetch weather for both locations in parallel
    const [grannaData, kollamData] = await Promise.all([
      fetchWeather(LOCATIONS.granna.lat, LOCATIONS.granna.lon),
      fetchWeather(LOCATIONS.kollam.lat, LOCATIONS.kollam.lon)
    ]);

    updateWeatherDisplay('granna', grannaData);
    updateWeatherDisplay('kollam', kollamData);
  }

  // ========================================
  // CULTURAL FACTS FUNCTIONS
  // ========================================

  let currentFactIndex = 0;
  let isAnimating = false;

  /**
   * Cycle to next fact
   */
  function cycleFact() {
    if (isAnimating) return;

    const tooltip = document.getElementById('culture-tooltip');
    const factText = tooltip.querySelector('.culture-fact');
    const factLabel = tooltip.querySelector('.culture-label');

    if (!tooltip || !factText || !factLabel) return;

    isAnimating = true;

    // Fade out
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateX(-50%) translateY(4px)';

    setTimeout(() => {
      // Update content
      currentFactIndex = (currentFactIndex + 1) % CULTURAL_FACTS.length;
      const fact = CULTURAL_FACTS[currentFactIndex];
      factText.textContent = fact.text;
      factLabel.textContent = fact.label;

      // Fade in
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateX(-50%) translateY(-4px)';

      setTimeout(() => {
        isAnimating = false;
      }, 300);
    }, 300);
  }

  /**
   * Initialize cultural facts interaction
   */
  function initCulturalFacts() {
    const cultureSplit = document.getElementById('culture-split');
    const tooltip = document.getElementById('culture-tooltip');

    if (!cultureSplit || !tooltip) return;

    // Set initial fact
    const initialFact = CULTURAL_FACTS[0];
    tooltip.querySelector('.culture-fact').textContent = initialFact.text;
    tooltip.querySelector('.culture-label').textContent = initialFact.label;

    // Click to cycle
    cultureSplit.addEventListener('click', cycleFact);

    // Keyboard accessibility
    cultureSplit.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        cycleFact();
      }
    });
  }

  // ========================================
  // INITIALIZATION
  // ========================================

  function init() {
    initWeather();
    initCulturalFacts();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
