// Apply the theme before styles load, so a saved preference never flashes the wrong palette.
(() => {
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  const key = 'blh-theme';
  let explicitTheme = null;
  try {
    const stored = localStorage.getItem(key);
    if (stored === 'light' || stored === 'dark') explicitTheme = stored;
  } catch { /* A theme toggle still works when browser storage is unavailable. */ }

  function apply(theme) {
    root.dataset.theme = theme;
    const light = theme === 'light';
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.setAttribute('aria-pressed', String(light));
      button.title = `Switch to ${light ? 'dark' : 'light'} mode`;
    }
    const color = document.querySelector('meta[name="theme-color"]');
    if (color) color.content = light ? '#f4fbf7' : '#071a12';
  }

  function applyPreference() {
    apply(explicitTheme || (preference.matches ? 'dark' : 'light'));
  }

  applyPreference();
  document.addEventListener('DOMContentLoaded', () => {
    applyPreference();
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      explicitTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, explicitTheme); } catch { /* Session-only selection. */ }
      apply(explicitTheme);
    });
  }, { once: true });

  preference.addEventListener('change', () => { if (!explicitTheme) applyPreference(); });
  window.addEventListener('storage', (event) => {
    if (event.key !== key && event.key !== null) return;
    explicitTheme = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : null;
    applyPreference();
  });
})();
