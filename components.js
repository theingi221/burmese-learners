(() => {
  const icons = `<svg class="shell-icons" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><defs>
    <symbol id="ui-arrow" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></symbol>
    <symbol id="ui-catalog" viewBox="0 0 24 24"><path d="M4 3h14v11M4 3v17h7M8 3v6l3-2 3 2V3"/><circle cx="17" cy="18" r="4"/><path d="m16 16 3 2-3 2z"/></symbol>
    <symbol id="ui-portal" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M8 8V4h5v7M7 13h2m-2 4h2m4-4h4m-4 4h4"/></symbol>
    <symbol id="ui-bell" viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-11 13h4M12 2v1"/></symbol>
    <symbol id="ui-menu" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></symbol>
  </defs></svg>`;
  const header = document.getElementById('site-header');
  if (header) {
    header.className = 'shell-header';
    header.innerHTML = `${icons}<div class="site-container shell-header-inner"><a class="shell-brand" href="index.html" aria-label="Burma Learners Hub home"><img class="shell-logo" src="assets/burma-logo.webp" width="140" height="43" alt="Burma Learners Hub"><span class="shell-tagline">NEXT-GEN EDUCATION<br>PLATFORM</span></a><nav class="shell-nav" id="shell-nav" aria-label="Main navigation"><a class="is-current" href="courses.html#courses">Courses<span class="nav-dot" aria-hidden="true"></span></a><a href="courses.html#formats">Categories</a><a href="courses.html#community">Community <span class="shell-live">Live</span></a></nav><div class="shell-actions"><button class="shell-icon-button" id="notifications-toggle" type="button" aria-label="Notifications" aria-expanded="false" aria-controls="notifications-panel"><svg aria-hidden="true"><use href="#ui-bell"/></svg><span class="notification-dot" aria-hidden="true"></span></button><a class="shell-action shell-portal" href="auth.html"><svg aria-hidden="true"><use href="#ui-portal"/></svg>Student Portal</a><a class="shell-action shell-signin" href="auth.html">Sign In</a><a class="shell-action shell-join" href="auth.html?tab=create">Join Free</a><button class="shell-icon-button shell-menu" type="button" id="shell-menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="shell-nav"><svg aria-hidden="true"><use href="#ui-menu"/></svg></button></div></div><div class="notification-popover" id="notifications-panel" hidden><strong>You’re all caught up</strong>Learning updates will appear here when the live platform is connected.</div>`;
  }
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'shell-footer';
    footer.innerHTML = `<div class="site-container shell-footer-inner"><div><a class="shell-footer-brand" href="index.html"><img src="assets/burma-footer-mark.webp" width="42" height="42" alt=""><span>Burmese Learners Hub</span></a><p class="shell-copyright">© 2025 Burmese Learners Hub. All rights reserved. Myanmar Ed-Tech<br>Empowerment.</p></div><nav class="shell-footer-links" aria-label="Footer"><a href="#terms" data-info="terms">Terms of Service</a><span class="footer-link-dot" aria-hidden="true">•</span><a href="#privacy" data-info="privacy">Privacy Policy</a><span class="footer-link-dot" aria-hidden="true">•</span><a href="#security" data-info="security">Security &amp; OTP Guidelines</a><span class="footer-link-dot" aria-hidden="true">•</span><a href="#community" data-info="community">Community Standards</a><span class="footer-link-dot" aria-hidden="true">•</span><a href="#support" data-info="support">Telegram Support</a><a class="contact-link" href="#contact" data-info="contact">Contact Us</a></nav></div>`;
  }
  const menu = document.getElementById('shell-menu-toggle');
  const nav = document.getElementById('shell-nav');
  const notificationButton = document.getElementById('notifications-toggle');
  const notifications = document.getElementById('notifications-panel');
  function closeMenu() { nav?.classList.remove('is-open'); menu?.setAttribute('aria-expanded','false'); menu?.setAttribute('aria-label','Open navigation'); }
  function closeNotifications() { if (notifications) notifications.hidden = true; notificationButton?.setAttribute('aria-expanded','false'); }
  menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; nav?.classList.toggle('is-open',open); menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open ? 'Close navigation' : 'Open navigation'); });
  nav?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  notificationButton?.addEventListener('click', () => { const open = notificationButton.getAttribute('aria-expanded') !== 'true'; notifications.hidden = !open; notificationButton.setAttribute('aria-expanded',String(open)); });
  document.addEventListener('click', e => { if (!e.target.closest('#notifications-toggle, #notifications-panel')) closeNotifications(); if (!e.target.closest('#shell-menu-toggle, #shell-nav')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeNotifications(); closeMenu(); } });
  const information = {
    terms:['Terms of Service','This is a preview of Burma Learners Hub. Published enrollment terms will be available before live accounts or payments are enabled.'],
    privacy:['Privacy Policy','Demo profile details and learning progress are saved only in this browser. Passwords and verification codes are never saved. No form details are sent to a server.'],
    security:['Security & OTP Guidelines','The sign-in screen is a UI demonstration. It does not send SMS or authenticate a real account. Use the displayed demo verification code to explore the flow.'],
    community:['Community Standards','Be kind, ask thoughtful questions, respect other learners, and share only material you have permission to share. Live community services are not connected in this preview.'],
    support:['Telegram Support','A support channel has not been connected to this preview. Explore the course catalog and its local study-room demonstration in the meantime.'],
    contact:['Contact Us','Official contact details will appear here when supplied by the platform owner. No inquiry is sent from this UI preview.']
  };
  const dialog = document.createElement('dialog');
  dialog.className = 'shell-dialog'; dialog.setAttribute('aria-labelledby','shell-dialog-title');
  dialog.innerHTML = '<button type="button" class="shell-dialog-close" aria-label="Close dialog">×</button><h2 id="shell-dialog-title"></h2><p></p><a class="button button-green" href="courses.html#courses">Explore courses</a>';
  document.body.append(dialog);
  document.addEventListener('click', e => { const link = e.target.closest('[data-info]'); if (!link || !information[link.dataset.info]) return; e.preventDefault(); const [title,copy] = information[link.dataset.info]; dialog.querySelector('h2').textContent = title; dialog.querySelector('p').textContent = copy; closeMenu(); closeNotifications(); dialog.showModal(); });
  dialog.querySelector('button').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',e => { if (e.target !== dialog) return; const box = dialog.getBoundingClientRect(); if (e.clientX<box.left || e.clientX>box.right || e.clientY<box.top || e.clientY>box.bottom) dialog.close(); });
})();
