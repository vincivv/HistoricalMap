const CIVILIZATIONS = [
  {
    name: 'Roman Empire',
    file: 'GeoJSON_files/provinces.geojson',
    startYear: 0,
    endYear: 499,
    style: { color: '#8a2b22', fillColor: '#f0b6b0', fillOpacity: 0.46, weight: 1.3 },
    label: { position: [40, 13], className: 'country-label-text', minZoom: 3 },
  },
  {
    name: 'Parthian Empire',
    file: 'GeoJSON_files/Parthian_Empire.geojson',
    startYear: 0,
    endYear: 200,
    style: { color: '#6e466f', fillColor: '#cda9cf', fillOpacity: 0.45, weight: 1.2 },
    label: { position: [34.5, 57], className: 'country-label-text', minZoom: 3 },
  },
  {
    name: 'Han Dynasty',
    file: 'GeoJSON_files/han_dynasty.geojson',
    startYear: 0,
    endYear: 200,
    style: { color: '#caa52c', fillColor: '#f7e59f', fillOpacity: 0.46, weight: 1.2 },
    label: { position: [41.5, 95], className: 'han-label-text', minZoom: 3 },
  },
  {
    name: 'Xiongnu Confederation',
    file: 'GeoJSON_files/xiongnu_confederation.geojson',
    startYear: 0,
    endYear: 200,
    style: { color: '#3044b9', fillColor: '#8a90f2', fillOpacity: 0.46, weight: 1.2 },
    label: { position: [50.5, 102.5], className: 'country-label-text', minZoom: 3 },
  },
  {
    name: 'Sasanian Empire',
    file: 'GeoJSON_files/sasanian_empire.geojson',
    startYear: 300,
    endYear: 649,
    style: { color: '#964a27', fillColor: '#ddac88', fillOpacity: 0.42, weight: 1.2 },
    label: { position: [32.5, 54], className: 'country-label-text', minZoom: 3 },
  },
  {
    name: 'Gupta Empire',
    file: 'GeoJSON_files/gupta_empire.geojson',
    startYear: 300,
    endYear: 600,
    style: { color: '#1f6774', fillColor: '#7bc2cf', fillOpacity: 0.42, weight: 1.2 },
    label: { position: [24, 79.5], className: 'country-label-text', minZoom: 3 },
  },
  {
    name: 'Aksumite Kingdom',
    file: 'GeoJSON_files/aksumite_kingdom.geojson',
    startYear: 100,
    endYear: 899,
    style: { color: '#7c4f17', fillColor: '#d3a96d', fillOpacity: 0.42, weight: 1.2 },
    label: { position: [13.8, 40.2], className: 'country-label-text', minZoom: 3 },
  },
  {
    name: 'Hun Empire',
    file: 'GeoJSON_files/attilasHunEmpire.geojson',
    startYear: 400,
    endYear: 499,
    style: { color: '#c87f17', fillColor: '#f2c177', fillOpacity: 0.42, weight: 1.2 },
    label: { position: [51.5, 30], className: 'country-label-text', minZoom: 3 },
  },
  {
    name: 'Byzantine Empire',
    file: 'GeoJSON_files/byzantine_empire.geojson',
    startYear: 500,
    endYear: 1000,
    style: { color: '#1f5b89', fillColor: '#83b4de', fillOpacity: 0.42, weight: 1.2 },
    label: { position: [39.2, 27], className: 'country-label-text', minZoom: 3 },
  },
  {
    name: 'Tang Dynasty',
    file: 'GeoJSON_files/tang_dynasty.geojson',
    startYear: 600,
    endYear: 900,
    style: { color: '#2e7b48', fillColor: '#8fd4a2', fillOpacity: 0.42, weight: 1.2 },
    label: { position: [34.5, 107], className: 'country-label-text', minZoom: 3 },
  },
  {
    name: 'Umayyad Caliphate',
    file: 'GeoJSON_files/umayyad_caliphate.geojson',
    startYear: 700,
    endYear: 799,
    style: { color: '#916220', fillColor: '#e1c07c', fillOpacity: 0.3, weight: 1.2 },
    label: { position: [31, 7], className: 'country-label-text', minZoom: 3 },
  },
  {
    name: 'Abbasid Caliphate',
    file: 'GeoJSON_files/abbasid_caliphate.geojson',
    startYear: 800,
    endYear: 1000,
    style: { color: '#6e3220', fillColor: '#c98975', fillOpacity: 0.36, weight: 1.2 },
    label: { position: [34, 44.5], className: 'country-label-text', minZoom: 3 },
  },
  {
    name: 'Carolingian Empire',
    file: 'GeoJSON_files/carolingian_empire.geojson',
    startYear: 800,
    endYear: 899,
    style: { color: '#5b3f8f', fillColor: '#b7a3e5', fillOpacity: 0.38, weight: 1.2 },
    label: { position: [47.8, 5.2], className: 'country-label-text', minZoom: 3 },
  },
];

const TIMELINE_YEARS = Array.from({ length: 11 }, (_, index) => index * 100);

const savedBasemap = localStorage.getItem('basemap');
const themePreference = localStorage.getItem('theme');
const isDarkMode = themePreference === 'dark';

const searchInput = document.querySelector('.search-bar');
const suggestionsList = document.getElementById('search-suggestions');
const introPanel = document.getElementById('map-hero');
const introToggle = document.getElementById('intro-toggle');
const introClose = document.getElementById('intro-close');
const storyToggle = document.getElementById('story-toggle');
const storyPanel = document.getElementById('story-panel');
const storyClose = document.getElementById('story-close');
const storyTitle = document.getElementById('story-title');
const storyMeta = document.getElementById('story-meta');
const storyContent = document.getElementById('story-content');
const timelineSlider = document.getElementById('timeline-slider');
const timelineYear = document.getElementById('timeline-year');
const timelineSummary = document.getElementById('timeline-summary');
const activeCivilizations = document.getElementById('active-civilizations');

const provinceLabels = [];
const countryStoryCache = new Map();

let currentYear = 0;
let selectedCivilizationName = null;

const lightMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', { attribution: '' });
const darkMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', { attribution: '' });
const satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: '' });

const initialLayer = savedBasemap === 'satellite'
  ? satelliteMap
  : isDarkMode
    ? darkMap
    : lightMap;

const map = L.map('map', {
  minZoom: 3,
  maxZoom: 9,
  center: [24, 32],
  zoom: 3,
  layers: [initialLayer],
  zoomAnimation: true,
  markerZoomAnimation: false,
});

map.setMaxBounds([[-85, -180], [85, 180]]);
map.on('drag', () => {
  map.panInsideBounds([[-85, -180], [85, 180]], { animate: false });
});

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getYearLabel(year) {
  return `${year} AD`;
}

function isCivilizationActive(civilization, year) {
  return year >= civilization.startYear && year <= civilization.endYear;
}

function getActiveCivilizations(year = currentYear) {
  return CIVILIZATIONS.filter((civilization) => isCivilizationActive(civilization, year));
}

function renderStoryPanel(name, info) {
  storyPanel.classList.remove('is-hidden');
  storyPanel.classList.add('has-selection');
  storyToggle.classList.add('is-hidden');
  storyTitle.textContent = name;

  if (!info || !info.title || !info.content) {
    storyMeta.textContent = `No story snapshot available for ${getYearLabel(currentYear)}.`;
    storyContent.innerHTML = '<p>Try a different century or select another civilization.</p>';
    return;
  }

  storyMeta.textContent = `${info.title} • ${getYearLabel(info.year)} snapshot`;
  storyContent.innerHTML = `<p>${escapeHtml(info.content)}</p>`;
}

function renderStoryError(name) {
  storyPanel.classList.remove('is-hidden');
  storyPanel.classList.add('has-selection');
  storyToggle.classList.add('is-hidden');
  storyTitle.textContent = name;
  storyMeta.textContent = `Unable to load the ${getYearLabel(currentYear)} entry right now.`;
  storyContent.innerHTML = '<p>Please try again in a moment.</p>';
}

function openIntroPanel() {
  introPanel.classList.remove('is-hidden');
  introToggle.classList.add('is-hidden');
}

function closeIntroPanel() {
  introPanel.classList.add('is-hidden');
  introToggle.classList.remove('is-hidden');
}

function openStoryPanel() {
  storyPanel.classList.remove('is-hidden');
  storyToggle.classList.add('is-hidden');
}

function closeStoryPanel() {
  storyPanel.classList.add('is-hidden');

  if (storyPanel.classList.contains('has-selection')) {
    storyToggle.classList.remove('is-hidden');
  }
}

async function getCountryStory(name, year) {
  const cacheKey = `${name}-${year}`;

  if (countryStoryCache.has(cacheKey)) {
    return countryStoryCache.get(cacheKey);
  }

  const response = await fetch(`/api/country/${encodeURIComponent(name)}?year=${year}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Could not load history for ${name} in ${year}`);
  }

  const story = await response.json();
  countryStoryCache.set(cacheKey, story);
  return story;
}

async function showCountryStory(name) {
  selectedCivilizationName = name;

  try {
    const info = await getCountryStory(name, currentYear);
    renderStoryPanel(name, info);
  } catch (error) {
    renderStoryError(name);
    showToast('Could not load that historical note.', 'error');
  }
}

function setCivilizationVisibility(civilization, visible) {
  if (visible) {
    if (!map.hasLayer(civilization.layer)) {
      civilization.layer.addTo(map);
    }

    const labelIsVisibleAtZoom = map.getZoom() >= (civilization.label.minZoom || 3);

    if (civilization.labelMarker && labelIsVisibleAtZoom && !map.hasLayer(civilization.labelMarker)) {
      civilization.labelMarker.addTo(map);
    }

    if (civilization.labelMarker && !labelIsVisibleAtZoom && map.hasLayer(civilization.labelMarker)) {
      map.removeLayer(civilization.labelMarker);
    }

    return;
  }

  if (civilization.layer && map.hasLayer(civilization.layer)) {
    map.removeLayer(civilization.layer);
  }

  if (civilization.labelMarker && map.hasLayer(civilization.labelMarker)) {
    map.removeLayer(civilization.labelMarker);
  }
}

function createCivilizationLayer(civilization) {
  return fetch(civilization.file)
    .then((response) => response.json())
    .then((data) => {
      const geoJsonLayer = L.geoJSON(data, {
        style: civilization.style,
        onEachFeature: (feature, layer) => {
          layer.on('click', () => showCountryStory(civilization.name));
        },
      });

      civilization.layer = geoJsonLayer;
      civilization.labelMarker = L.marker(civilization.label.position, {
        icon: L.divIcon({
          className: 'country-label',
          html: `<div class="${civilization.label.className}">${civilization.name}</div>`,
          iconSize: [0, 0],
        }),
      });
    });
}

function renderSuggestions(matches) {
  suggestionsList.innerHTML = '';

  if (matches.length === 0) {
    suggestionsList.style.display = 'none';
    return;
  }

  matches.forEach((civilization) => {
    const item = document.createElement('li');
    item.className = 'suggestion-item';
    item.textContent = civilization.name;
    item.addEventListener('mousedown', (event) => {
      event.preventDefault();
      searchInput.value = civilization.name;
      focusCountry(civilization.name.toLowerCase());
      suggestionsList.style.display = 'none';
    });
    suggestionsList.appendChild(item);
  });

  suggestionsList.style.display = 'block';
}

function findCountryMatch(query) {
  if (!query) {
    return null;
  }

  const active = getActiveCivilizations();
  const exactMatch = active.find((civilization) => civilization.name.toLowerCase() === query);

  if (exactMatch) {
    return exactMatch;
  }

  const partialMatches = active
    .filter((civilization) => civilization.name.toLowerCase().includes(query))
    .sort((left, right) => left.name.localeCompare(right.name));

  return partialMatches[0] || null;
}

function focusCountry(query) {
  const civilization = findCountryMatch(query);

  if (!civilization || !civilization.layer) {
    showToast('No matching civilization is active in the selected year.', 'warning');
    return;
  }

  map.fitBounds(civilization.layer.getBounds(), { maxZoom: 6 });
  searchInput.value = civilization.name;
  showCountryStory(civilization.name);
}

function initializeSearch() {
  if (!searchInput || !suggestionsList) {
    return;
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      suggestionsList.style.display = 'none';
      return;
    }

    const matches = getActiveCivilizations()
      .filter((civilization) => civilization.name.toLowerCase().includes(query))
      .sort((left, right) => left.name.localeCompare(right.name))
      .slice(0, 6);

    renderSuggestions(matches);
  });

  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      suggestionsList.style.display = 'none';
      focusCountry(searchInput.value.trim().toLowerCase());
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-shell')) {
      suggestionsList.style.display = 'none';
    }
  });
}

function initializePanelControls() {
  if (introToggle && introClose) {
    introToggle.addEventListener('click', openIntroPanel);
    introClose.addEventListener('click', closeIntroPanel);
  }

  if (storyToggle && storyClose) {
    storyToggle.addEventListener('click', openStoryPanel);
    storyClose.addEventListener('click', closeStoryPanel);
  }
}

function updateProvinceLabels(zoom) {
  const romanCivilization = CIVILIZATIONS.find((civilization) => civilization.name === 'Roman Empire');
  const shouldShow = romanCivilization && isCivilizationActive(romanCivilization, currentYear) && zoom >= 7;

  provinceLabels.forEach((marker) => {
    if (shouldShow) {
      if (!map.hasLayer(marker)) {
        map.addLayer(marker);
      }
    } else if (map.hasLayer(marker)) {
      map.removeLayer(marker);
    }
  });
}

function updateCivilizationLabelsForZoom() {
  CIVILIZATIONS.forEach((civilization) => {
    const shouldShow = isCivilizationActive(civilization, currentYear)
      && map.getZoom() >= (civilization.label.minZoom || 3);

    if (shouldShow) {
      if (civilization.labelMarker && !map.hasLayer(civilization.labelMarker)) {
        civilization.labelMarker.addTo(map);
      }
      return;
    }

    if (civilization.labelMarker && map.hasLayer(civilization.labelMarker)) {
      map.removeLayer(civilization.labelMarker);
    }
  });
}

function initializeProvinceLabels() {
  fetch('GeoJSON_files/provinces_label.geojson')
    .then((response) => response.json())
    .then((data) => {
      L.geoJSON(data, {
        pointToLayer: (feature, latlng) => {
          const marker = L.marker(latlng, {
            icon: L.divIcon({
              className: 'province-label',
              html: `<div class="province-label-text">${feature.properties.name}</div>`,
              iconSize: [130, 24],
              iconAnchor: [-50, -4],
            }),
          });

          provinceLabels.push(marker);
          return marker;
        },
      });

      updateProvinceLabels(map.getZoom());
    });
}

function initializeBasemapToggle() {
  const basemapToggle = document.getElementById('basemap-toggle');

  if (!basemapToggle) {
    return;
  }

  basemapToggle.checked = savedBasemap === 'satellite';

  basemapToggle.addEventListener('change', (event) => {
    if (event.target.checked) {
      map.removeLayer(lightMap);
      map.removeLayer(darkMap);
      map.addLayer(satelliteMap);
      localStorage.setItem('basemap', 'satellite');
      return;
    }

    map.removeLayer(satelliteMap);
    map.addLayer(isDarkMode ? darkMap : lightMap);
    localStorage.setItem('basemap', 'light');
  });
}

function renderActiveCivilizationChips(year) {
  if (!activeCivilizations) {
    return;
  }

  activeCivilizations.innerHTML = '';

  getActiveCivilizations(year).forEach((civilization) => {
    const chip = document.createElement('span');
    chip.className = 'civilization-chip';
    chip.textContent = civilization.name;
    activeCivilizations.appendChild(chip);
  });
}

function syncSelectedStoryToYear() {
  if (!selectedCivilizationName) {
    return;
  }

  const stillActive = getActiveCivilizations().some((civilization) => civilization.name === selectedCivilizationName);

  if (!stillActive) {
    selectedCivilizationName = null;
    storyPanel.classList.add('is-hidden');
    storyPanel.classList.remove('has-selection');
    storyToggle.classList.add('is-hidden');
    return;
  }

  showCountryStory(selectedCivilizationName);
}

function applyTimelineYear(year) {
  currentYear = year;

  if (timelineYear) {
    timelineYear.textContent = year;
  }

  if (timelineSummary) {
    const activeCount = getActiveCivilizations(year).length;
    timelineSummary.textContent = `${activeCount} civilizations visible in this century.`;
  }

  CIVILIZATIONS.forEach((civilization) => {
    setCivilizationVisibility(civilization, isCivilizationActive(civilization, year));
  });

  renderActiveCivilizationChips(year);
  updateCivilizationLabelsForZoom();
  updateProvinceLabels(map.getZoom());
  syncSelectedStoryToYear();
}

function initializeTimeline() {
  if (!timelineSlider) {
    return;
  }

  timelineSlider.addEventListener('input', (event) => {
    applyTimelineYear(Number.parseInt(event.target.value, 10));
  });

  timelineSlider.value = String(currentYear);
  applyTimelineYear(currentYear);
}

Promise.all(CIVILIZATIONS.map(createCivilizationLayer))
  .then(() => {
    initializeSearch();
    initializePanelControls();
    initializeTimeline();
  })
  .catch((error) => {
    console.error('Error loading map layers:', error);
    showToast('Some map layers could not be loaded.', 'error');
  });

initializeBasemapToggle();
initializeProvinceLabels();

map.on('zoomend', () => {
  updateCivilizationLabelsForZoom();
  updateProvinceLabels(map.getZoom());
});
