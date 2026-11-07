// Shared appearance and language preferences, applied before the page paints.
(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const validLanguage = value => value === 'en' || value === 'my';
  const validTheme = value => value === 'light' || value === 'dark';
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Preferences still work for this visit. */ } };
  let selectedTheme = read('blh-theme');
  if (!validTheme(selectedTheme)) selectedTheme = null;
  let language = read('blh-language');
  if (!validLanguage(language)) language = 'en';
  const dictionary = new Map();
  const t = (english, burmese) => language === 'my' ? (burmese ?? dictionary.get(english) ?? english) : english;

  function translate(scope = document) {
    const nodes = scope.querySelectorAll?.('[data-en][data-my], [data-placeholder-en], [data-label-en]') || [];
    const all = scope instanceof Element && scope.matches('[data-en][data-my], [data-placeholder-en], [data-label-en]') ? [scope, ...nodes] : nodes;
    for (const element of all) {
      if (element.hasAttribute('data-en') && element.hasAttribute('data-my')) {
        const value = language === 'my' ? element.dataset.my : element.dataset.en;
        if (element.textContent !== value) element.textContent = value;
      }
      if (element.dataset.placeholderEn !== undefined) element.placeholder = language === 'my' ? (element.dataset.placeholderMy || element.dataset.placeholderEn) : element.dataset.placeholderEn;
      if (element.dataset.labelEn !== undefined) element.setAttribute('aria-label', language === 'my' ? (element.dataset.labelMy || element.dataset.labelEn) : element.dataset.labelEn);
    }
    const body = document.body;
    if (body?.dataset.titleEn) document.title = language === 'my' ? (body.dataset.titleMy || body.dataset.titleEn) : body.dataset.titleEn;
  }

  function apply(notify = false) {
    const theme = selectedTheme || (systemTheme.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    root.dataset.language = language;
    root.lang = language;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#08130d' : '#f7faf7';
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.setAttribute('aria-label', t('Dark mode', 'အမှောင်အပြင်အဆင်'));
      button.title = theme === 'dark' ? t('Switch to light mode', 'အလင်းအပြင်အဆင်သို့ ပြောင်းရန်') : t('Switch to dark mode', 'အမှောင်အပြင်အဆင်သို့ ပြောင်းရန်');
    });
    document.querySelectorAll('[data-language-toggle]').forEach(button => {
      button.setAttribute('aria-label', t('Switch to Burmese', 'အင်္ဂလိပ်ဘာသာသို့ ပြောင်းရန်'));
      button.title = t('Switch to Burmese', 'Switch to English');
      const label = button.querySelector('[data-language-name]');
      if (label) label.textContent = language === 'en' ? 'မြန်မာ' : 'EN';
    });
    translate();
    if (notify) window.dispatchEvent(new CustomEvent('blh:preferences', { detail: { theme, language } }));
  }

  const api = window.BLH || {};
  Object.defineProperties(api, { language: { get: () => language, configurable: true }, theme: { get: () => root.dataset.theme, configurable: true } });
  Object.assign(api, {
    t, applyTranslations: translate,
    setLanguage(value) { if (!validLanguage(value)) return; language = value; save('blh-language', value); apply(true); },
    setTheme(value) { if (!validTheme(value)) return; selectedTheme = value; save('blh-theme', value); apply(true); },
    registerTranslations(entries) { for (const [english, burmese] of Object.entries(entries)) dictionary.set(english, burmese); },
    refreshPreferences() { apply(); },
    readLocal(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
    saveLocal(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } }
  });
  window.BLH = api;
  apply();
  document.addEventListener('DOMContentLoaded', () => apply(), { once: true });
  document.addEventListener('click', event => {
    if (event.target.closest('[data-theme-toggle]')) api.setTheme(api.theme === 'dark' ? 'light' : 'dark');
    if (event.target.closest('[data-language-toggle]')) api.setLanguage(language === 'en' ? 'my' : 'en');
  });
  systemTheme.addEventListener('change', () => { if (!selectedTheme) apply(true); });
  window.addEventListener('storage', event => {
    if (!['blh-theme', 'blh-language', null].includes(event.key)) return;
    const storedTheme = read('blh-theme');
    const storedLanguage = read('blh-language');
    selectedTheme = validTheme(storedTheme) ? storedTheme : null;
    language = validLanguage(storedLanguage) ? storedLanguage : 'en';
    apply(true);
  });
})();
