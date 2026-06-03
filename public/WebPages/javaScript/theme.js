document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const legacyDarkMode = localStorage.getItem('darkMode');
  const isDark = savedTheme === 'dark' || legacyDarkMode === 'true';
  const checkbox = document.getElementById('theme');

  if (isDark) {
    document.body.classList.add('dark-mode');
    if (checkbox) checkbox.checked = true;
  }

  if (!savedTheme && legacyDarkMode) {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  if (checkbox) {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        localStorage.setItem('darkMode', 'false');
      }
    });
  }
});
