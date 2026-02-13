/*
========================================
  SITE TRANSLATIONS - SWEDISH
========================================
- All static site content
- UI strings and messages
*/

const translationsSv = {
  // Navigation
  'nav.home': 'Hem',
  'nav.story': 'Vår Historia',
  'nav.wedding': 'Bröllop',
  'nav.rsvp': 'OSA',

  // Hero Section
  'hero.coupleName': 'Tanja & Sangeeth',
  'hero.location': 'Gränna, Sverige',
  'hero.btnStory': 'Vår Historia',
  'hero.btnDetails': 'Detaljer',
  'hero.btnRsvp': 'OSA',

  // Section Headings
  'section.story': 'Vår Historia',
  'section.wedding': 'Bröllopet',
  'section.photos': 'Foton & Videor',
  'section.rsvp': 'OSA',

  // Wedding Details
  'wedding.ceremony': 'Ceremoni',
  'wedding.ceremony.time': '13:00',
  'wedding.ceremony.location': 'Järsnäs Kyrka',
  'wedding.reception': 'Mottagning',
  'wedding.reception.time': '16:30',
  'wedding.reception.location': 'Åsens By',
  'wedding.accommodation': 'Boende',
  'wedding.accommodation.details': 'Här är några alternativ i området:',
  'wedding.hotel1': 'Bauergården - Mot Gränna',
  'wedding.hotel2': 'Hotel Amalias Hus - Gränna',
  'wedding.hotel3': 'Slottsvillan - Huskvarna',
  'wedding.hotel4': 'Slottsparken Motell - Huskvarna',
  'wedding.hotel5': 'Home Hostel Victoria - Jönköping',
  'wedding.contact': 'Kontakt',
  'wedding.contact.detail1': 'Gustav (Toastmaster)',
  'wedding.contact.detail2': 'Vishvajith (Organisatör)',
  'wedding.contact.detail3': 'Amanda (Organisatör)',
  'wedding.dresscode': 'Klädkod',
  'wedding.dresscode.details': 'Kavaj / Ethnic',
  'wedding.speeches': 'Tal',
  'wedding.speeches.details': 'Vi skulle älska om du ville hedra oss med ett tal eller en aktivitet. Skicka ditt tal till toast@tanjasangeeth.se, där vår toastmaster Gustav tar hand om talordningen.',
  'wedding.gifts': 'Gåvor',
  'wedding.gifts.details': 'Den finaste gåvan är att fira denna dag tillsammans med er! Vill ni ändå bidra med en gåva så uppskattas ett bidrag till vår smekmånad. Bidrag kan swishas till Amanda på +46 723830620 .',

  // RSVP Form
  'rsvp.name': 'Namn*',
  'rsvp.email': 'E-post*',
  'rsvp.attending': 'Kommer du?*',
  'rsvp.yes': 'Ja',
  'rsvp.no': 'Nej',
  'rsvp.dietary': 'Kostrestriktioner*',
  'rsvp.comments': 'Kommentarer',
  'rsvp.submit': 'Skicka OSA',
  'rsvp.sending': 'Skickar...',
  'rsvp.success': 'Tack! Din OSA har registrerats.',
  'rsvp.error': 'Något gick fel. Försök igen.',
  'rsvp.honeypot': 'Lämna tomt',

  // Photo Gallery
  'photos.upload': '📷 Ladda upp foto/video',
  'photos.empty': 'Var den första att dela ett foto!',

  // Upload Messages
  'upload.validating': 'Välj bara foton eller videor.',
  'upload.uploading': 'Laddar upp {count} fil(er)...',
  'upload.success': '{count} fil(er) uppladdade!',
  'upload.partial': '{count} fil(er) uppladdade. Misslyckades: {failed}',
  'upload.failed': 'Uppladdning misslyckades. Försök igen.',
  'upload.configError': 'Konfigurera Google Apps Script URL i app.js',

  // Quiz
  'quiz.calculate': 'Räkna Poäng',
  'quiz.retake': 'Gör om',
  'quiz.scoreNormal': 'Din poäng: {score} av 10',
  'quiz.scoreHidden': 'Du hittade de dolda svaren! Grattis!',

  // Weather Conditions
  'weather.clearSky': 'Klar himmel',
  'weather.mainlyClear': 'Mainly clear',
  'weather.partlyCloudy': 'Partly cloudy',
  'weather.overcast': 'Overcast',
  'weather.fog': 'Fog',
  'weather.depositingRimeFog': 'Depositing rime fog',
  'weather.lightDrizzle': 'Light drizzle',
  'weather.moderateDrizzle': 'Moderate drizzle',
  'weather.denseDrizzle': 'Dense drizzle',
  'weather.lightFreezingDrizzle': 'Light freezing drizzle',
  'weather.denseFreezingDrizzle': 'Dense freezing drizzle',
  'weather.slightRain': 'Slight rain',
  'weather.moderateRain': 'Moderate rain',
  'weather.heavyRain': 'Heavy rain',
  'weather.lightFreezingRain': 'Light freezing rain',
  'weather.heavyFreezingRain': 'Heavy freezing rain',
  'weather.slightSnow': 'Slight snow',
  'weather.moderateSnow': 'Moderate snow',
  'weather.heavySnow': 'Heavy snow',
  'weather.snowGrains': 'Snow grains',
  'weather.slightRainShowers': 'Slight rain showers',
  'weather.moderateRainShowers': 'Moderate rain showers',
  'weather.violentRainShowers': 'Violent rain showers',
  'weather.slightSnowShowers': 'Slight snow showers',
  'weather.heavySnowShowers': 'Heavy snow showers',
  'weather.thunderstorm': 'Thunderstorm',
  'weather.thunderstormHail': 'Thunderstorm with hail',
  'weather.thunderstormHeavyHail': 'Thunderstorm with heavy hail',
  'weather.unknown': 'Okänt',
  'weather.loading': 'Laddar...',

  // Cultural Facts (Fika & Sadya)
  'facts.fika1': 'Fika är Sveriges favoritförströelse—mer än en rast, det\'s en social institution.',
  'facts.sadya1': 'En traditionell Sadya har 26+ rätter serverade på ett bananlöv, ätna med händerna.',
  'facts.fika2': 'Kanelbulle utsågs till Sveriges nationalpajs 1999.',
  'facts.sadya2': 'Att äta från ett bananlöv sägs ha kylande egenskaper för kroppen.',
  'facts.fika3': 'Svenskar dricker i genomsnitt 3-4 koppar kaffe per dag—en av världens toppkonsumenter.',
  'facts.sadya3': 'Payasam (söt efterrätt) serveras sist, ofta i 3-4 olika sorter.',
  'facts.fika4': 'Det finns över 300 sorter av svenska kanelbullar—varje region har sitt eget recept!',
  'facts.sadya4': 'Bananlövet viks efter ätande som en signal att du är klar.',
  'facts.fika': 'Fika',
  'facts.sadya': 'Sadya',

  // Footer (always in English)
  'footer.dogMessage': 'We\'re excited to celebrate with you!',
  'footer.twoCultures': 'Two cultures, one story.',
  'footer.designSaga': 'Design Saga',
  'footer.photography': 'Photography by'
};
