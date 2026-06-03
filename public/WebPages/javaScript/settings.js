function saveSettings(event) {
  event.preventDefault();

  const isDark = document.getElementById('theme').checked;
  const isSatellite = document.getElementById('basemap-toggle').checked;

  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  localStorage.setItem('basemap', isSatellite ? 'satellite' : 'light');

  document.body.classList.toggle('dark-mode', isDark);
  showToast('Settings saved.', 'success');
}

document.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme');
  const basemap = localStorage.getItem('basemap');

  const themeToggle = document.getElementById('theme');
  const basemapToggle = document.getElementById('basemap-toggle');

  if (themeToggle) {
    themeToggle.checked = theme === 'dark';
  }

  if (basemapToggle) {
    basemapToggle.checked = basemap === 'satellite';
  }
});
