(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const t = (en, my) => window.BLH?.t ? window.BLH.t(en, my) : document.documentElement.dataset.language === 'my' ? my : en;
  const translations = scope => window.BLH?.applyTranslations?.(scope || document);
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Keep the current session usable when storage is disabled. */ } };
  const make = (tag, className, text) => { const element = document.createElement(tag); if (className) element.className = className; if (text !== undefined) element.textContent = text; return element; };
  const button = (text, className, handler) => { const element = make('button', className, text); element.type = 'button'; element.addEventListener('click', handler); return element; };
  const categories = [
    ['all', 'All Rooms', 'အခန်းအားလုံး'],
    ['web', 'Web & App Dev', 'Web နှင့် App ဖန်တီးခြင်း'],
    ['design', 'UI/UX Design', 'UI/UX ဒီဇိုင်း'],
    ['ai', 'Data & AI', 'ဒေတာနှင့် AI'],
    ['focus', 'Silent Focus Room (Lofi Music)', 'တိတ်ဆိတ်စွာ အာရုံစိုက်လေ့လာခြင်း'],
    ['career', 'Job Prep & Resume Review', 'အလုပ်အတွက် ပြင်ဆင်ခြင်း']
  ];
  const seedRooms = [
    { id: 'react', category: 'web', name: ['React Batch 4 Study Group', 'React အမှတ်စဉ် ၄ လေ့လာရေးအဖွဲ့'], description: ['“Reviewing Module 2 Homework solutions & JWT authentication middleware. Mentors on voice stage.”', '“Module ၂ အိမ်စာနှင့် JWT authentication middleware ကို ဆွေးနွေးနေပါတယ်။ ဆရာများလည်း ပါဝင်ပါတယ်။”'], members: 148, host: 'Sayar Min Thant', initials: ['SM', 'AK', 'TH', '+145'], activity: ['♩ Live Audio & Screen', '♩ အသံနှင့် Screen မျှဝေခြင်း'], official: true },
    { id: 'design', category: 'design', name: ['UI Designers Lounge', 'UI ဒီဇိုင်နာများ၏ စကားဝိုင်း'], description: ['“Reviewing Design Systems & Figma variable modes. Bring your mobile wireframes for instant critique.”', '“Design System နှင့် Figma variable mode များကို ဆွေးနွေးနေပါတယ်။ သင့် mobile wireframe ကို ယူလာပြီး အကြံပြုချက်ရယူပါ။”'], members: 92, host: 'May Myat Noe', initials: ['MN', 'KP', '+90'], activity: ['▣ Figma Jam Live', '▣ Figma Jam အတူလေ့လာခြင်း'] },
    { id: 'node', category: 'web', name: ['Node.js Backend Squad', 'Node.js Backend လေ့လာရေးအဖွဲ့'], description: ['“Database connection pooling and JWT refresh token rotation debug session. High technical rigor.”', '“Database connection pooling နှင့် JWT refresh token rotation ပြဿနာများကို စနစ်တကျ ဆွေးနွေးဖြေရှင်းနေပါတယ်။”'], members: 67, host: 'Thant Htoo Aung', initials: ['TH', 'SN', '+65'], activity: ['▣ Code Sharing', '▣ Code မျှဝေခြင်း'] }
  ];
  const rawGroups = read('blh-community-groups', []);
  const customRooms = Array.isArray(rawGroups) ? rawGroups.filter(room => room && typeof room.id === 'string' && room.id.startsWith('local-') && typeof room.name === 'string' && categories.some(cat => cat[0] === room.category && cat[0] !== 'all')).slice(0, 40).map(room => ({ id: room.id.slice(0, 100), category: room.category, name: room.name.slice(0, 70), description: typeof room.description === 'string' ? room.description.slice(0, 250) : '' })) : [];
  const rawMemberships = read('blh-community-memberships', []);
  const memberships = new Set(Array.isArray(rawMemberships) ? rawMemberships.filter(value => typeof value === 'string').slice(0, 100) : []);
  const rawReminders = read('blh-community-reminders', []);
  const reminders = new Set(Array.isArray(rawReminders) ? rawReminders.filter(value => typeof value === 'string').slice(0, 20) : []);
  const rawMessages = read('blh-community-messages', {});
  const messages = Object.create(null);
  if (rawMessages && typeof rawMessages === 'object' && !Array.isArray(rawMessages)) {
    for (const [key, value] of Object.entries(rawMessages).slice(0, 100)) {
      if (Array.isArray(value)) messages[key] = value.filter(item => item && typeof item.text === 'string').slice(-100).map(item => ({ text: item.text.slice(0, 1500), at: typeof item.at === 'number' ? item.at : Date.now() }));
    }
  }
  const roomDrafts = Object.create(null);
  let activeCategory = 'all';
  let activeRoomId = null;
  let currentInfo = null;
  let toastTimer;
  let toastText = null;
  const roomNames = room => Array.isArray(room.name) ? t(...room.name) : room.name;
  const roomDescriptions = room => Array.isArray(room.description) ? t(...room.description) : room.description || t('A new circle for learning together.', 'အတူလေ့လာရန် ဖွဲ့စည်းထားသော အဖွဲ့အသစ်။');
  const allRooms = () => [...seedRooms, ...customRooms.map(room => ({ ...room, members: 1, host: t('You', 'သင်'), initials: ['YOU'], activity: ['♧ New study circle', '♧ လေ့လာရေးအဖွဲ့အသစ်'], local: true }))];
  const currentRoom = () => allRooms().find(room => room.id === activeRoomId);
  const persistMessages = () => save('blh-community-messages', messages);
  const persistMemberships = () => save('blh-community-memberships', [...memberships]);

  function toast(en, my) {
    toastText = [en, my];
    $('#hub-toast').textContent = t(en, my);
    $('#hub-toast').hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { $('#hub-toast').hidden = true; toastText = null; }, 6500);
  }
  function showDialog(dialog) {
    if (dialog.open) return;
    dialog.showModal();
  }
  const info = {
    stream: [['Stream preview', 'အစီအစဉ် အကြိုကြည့်ရှုခြင်း'], ['This is a sample mentor session from the design. A live broadcast service has not been connected. You can download the code example and try the local chat below.', 'ဒီဇိုင်းထဲက ဆရာနှင့် လေ့လာမှု နမူနာဖြစ်ပါတယ်။ တိုက်ရိုက်ဝန်ဆောင်မှု မချိတ်ဆက်ရသေးပါ။ Code ကို ဒေါင်းလုဒ်လုပ်နိုင်ပြီး ဒီစက်တွင် chat စမ်းသုံးနိုင်ပါတယ်။']],
    stage: [['Interactive mentor stage', 'ဆရာနှင့် တိုက်ရိုက်လေ့လာခန်း'], ['Live video, microphones and screen sharing are not connected yet. Explore the code example or enter a study room to try a conversation saved only on this device.', 'တိုက်ရိုက်ဗီဒီယို၊ မိုက်ခရိုဖုန်းနှင့် screen မျှဝေမှု မချိတ်ဆက်ရသေးပါ။ Code နမူနာကို လေ့လာပါ သို့မဟုတ် လေ့လာခန်းထဲတွင် ဒီစက်၌သာ သိမ်းထားသော စကားဝိုင်းကို စမ်းသုံးပါ။']],
    telegram: [['Telegram community', 'Telegram အဖွဲ့'], ['The official Telegram invitation link has not been provided. A verified link will appear here when the community owner adds it.', 'တရားဝင် Telegram ဖိတ်ခေါ်လင့်ခ် မပေးထားသေးပါ။ အဖွဲ့ပိုင်ရှင်က အတည်ပြုလင့်ခ် ထည့်ပေးသောအခါ ဒီနေရာမှ ဝင်နိုင်ပါမယ်။']],
    viber: [['Viber community', 'Viber အဖွဲ့'], ['The official Viber invitation link has not been provided. A verified link will appear here when the community owner adds it.', 'တရားဝင် Viber ဖိတ်ခေါ်လင့်ခ် မပေးထားသေးပါ။ အဖွဲ့ပိုင်ရှင်က အတည်ပြုလင့်ခ် ထည့်ပေးသောအခါ ဒီနေရာမှ ဝင်နိုင်ပါမယ်။']],
    challenge: [['Weekly code challenge #18', 'အပတ်စဉ် Code စိန်ခေါ်မှု #၁၈'], ['Practice building an offline image cache with a service worker, a storage limit and a fallback image. Challenge submissions and prize registration are not open in this preview.', 'Service worker၊ storage အကန့်အသတ်နှင့် fallback image သုံးပြီး offline image cache တည်ဆောက်ကြည့်ပါ။ ဒီအကြိုကြည့်ရှုမှုမှာ ပြိုင်ပွဲအဖြေတင်ခြင်းနှင့် ဆုလျှောက်ထားခြင်း မဖွင့်ရသေးပါ။']],
    leaderboard: [['Peer helper badges', 'အကူအညီပေးသူ ဆုတံဆိပ်များ'], ['Top Debugger: Thant Htoo Aung — 42 solutions. Code Champ: Kyaw Swar Hein — 31 solutions. Active Helper: May Myat Noe — 27 solutions. These are sample profiles from the design; live rankings are not connected.', 'Top Debugger: Thant Htoo Aung — အဖြေ ၄၂ ခု။ Code Champ: Kyaw Swar Hein — အဖြေ ၃၁ ခု။ Active Helper: May Myat Noe — အဖြေ ၂၇ ခု။ ဒီဇိုင်းမှ နမူနာအမည်များဖြစ်ပြီး တိုက်ရိုက်အဆင့်စာရင်း မချိတ်ဆက်ရသေးပါ။']],
    voice: [['Voice assistance', 'အသံဖြင့် အကူအညီ'], ['Voice appointments are not connected yet. You can explore the React, design or Node.js study rooms and save your question locally until a live service is available.', 'အသံဖြင့် ချိန်းဆိုမှု မချိတ်ဆက်ရသေးပါ။ React၊ ဒီဇိုင်း သို့မဟုတ် Node.js အခန်းများကို ကြည့်ရှုပြီး သင့်မေးခွန်းကို ဒီစက်မှာ သိမ်းဆည်းနိုင်ပါတယ်။']],
    'thread-react': [['AbortController cleanup', 'AbortController cleanup'], ['Abort the request when the component unmounts, and catch AbortError separately from network errors. The full thread is a design sample. To write your own question, use a study room; your message stays on this device.', 'Component unmount ဖြစ်ချိန် request ကို abort လုပ်ပြီး AbortError ကို network error နှင့် သီးခြား catch လုပ်ပါ။ ဆွေးနွေးချက်အပြည့်အစုံက ဒီဇိုင်းနမူနာဖြစ်ပါတယ်။ သင့်မေးခွန်းကို လေ့လာခန်းတွင် ရေးနိုင်ပြီး ဒီစက်မှာသာ သိမ်းဆည်းထားပါမယ်။']],
    'thread-unicode': [['Myanmar font fallback', 'မြန်မာ Font fallback'], ['Use Unicode text with a font stack such as Noto Sans Myanmar, Pyidaungsu, Padauk, sans-serif. Font fallback does not convert legacy Zawgyi text. You can explore the design study room to save your own note locally.', 'Unicode စာသားအတွက် Noto Sans Myanmar၊ Pyidaungsu၊ Padauk၊ sans-serif အစီအစဉ်ကို သုံးနိုင်ပါတယ်။ Font fallback က Zawgyi စာသားကို Unicode သို့ မပြောင်းပေးပါ။ ဒီဇိုင်းလေ့လာခန်းမှာ သင့်မှတ်စုကို ဒီစက်၌ သိမ်းနိုင်ပါတယ်။']]
  };
  function renderInfo() {
    if (!info[currentInfo]) return;
    $('#hub-info-title').textContent = t(...info[currentInfo][0]);
    $('#hub-info-copy').textContent = t(...info[currentInfo][1]);
  }
  function openInfo(key) { currentInfo = key; renderInfo(); showDialog($('#hub-info-dialog')); }
  $$('[data-info]').forEach(element => element.addEventListener('click', () => openInfo(element.dataset.info)));
  $$('[data-thread]').forEach(element => element.addEventListener('click', () => openInfo(`thread-${element.dataset.thread}`)));
  $$('[data-close-dialog]').forEach(element => element.addEventListener('click', () => element.closest('dialog').close()));
  $$('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } }));
  $$('[data-create-group]').forEach(element => element.addEventListener('click', () => showDialog($('#hub-create-dialog'))));

  const events = [
    { id: 'tokens', category: ['UI/UX DESIGN', 'UI/UX ဒီဇိုင်း'], time: ['◷ Tonight 8:00 PM MMT', '◷ ယနေ့ည ၈:၀၀ MMT'], title: ['Design Tokens & Figma Auto-Layout v5 deep dive', 'Design Token နှင့် Figma Auto-Layout v5 အသေးစိတ်လေ့လာခြင်း'], description: ['Hands-on walkthrough with student submissions. Bring your design files for real-time adjustments.', 'ကျောင်းသားများ၏ လက်ရာများဖြင့် လက်တွေ့လေ့လာပါ။ သင့်ဒီဇိုင်းဖိုင်ကို ယူလာပြီး အကြံပြုချက်ရယူပါ။'], host: 'Ei Wai Phyo', initials: 'EW', avatar: 'hub-avatar-blue' },
    { id: 'showcase', category: ['FULL-STACK', 'FULL-STACK'], time: ['◷ Tomorrow 7:30 PM MMT', '◷ မနက်ဖြန်ည ၇:၃၀ MMT'], title: ['React & Node.js Batch #5 Project Showcase', 'React နှင့် Node.js အမှတ်စဉ် ၅ လက်ရာပြပွဲ'], description: ['Graduating learners demo live e-commerce & logistics web apps built with Next.js and PostgreSQL.', 'သင်တန်းပြီးသူများ၏ Next.js နှင့် PostgreSQL သုံးထားသော အရောင်းနှင့် ပို့ဆောင်ရေး app များကို လေ့လာပါ။'], host: 'Sayar Min Thant', initials: 'SM', avatar: 'hub-avatar-green-soft' },
    { id: 'automation', category: ['GROWTH & AI', 'GROWTH နှင့် AI'], time: ['◷ Sunday 4:00 PM MMT', '◷ တနင်္ဂနွေ ညနေ ၄:၀၀ MMT'], title: ['AI Prompt Automation for Local Myanmar Businesses', 'မြန်မာစီးပွားရေးလုပ်ငန်းများအတွက် AI Prompt Automation'], description: ['Leverage automated lead capture, Telegram bots, and Burmese NLP workflows with no-code tools.', 'No-code tool များဖြင့် lead စုဆောင်းခြင်း၊ Telegram bot နှင့် မြန်မာ NLP လုပ်ငန်းစဉ်များ လေ့လာပါ။'], host: 'Ko Zaw Myo', initials: 'KZ', avatar: 'hub-avatar-purple' }
  ];
  function toggleReminder(id) {
    if (reminders.has(id)) { reminders.delete(id); toast('Reminder removed from this device.', 'ဒီစက်မှ သတိပေးချက်ကို ဖယ်ရှားပြီးပါပြီ။'); }
    else { reminders.add(id); toast('Saved on this device. Calendar and live notifications are not connected yet.', 'ဒီစက်မှာ သိမ်းဆည်းပြီးပါပြီ။ Calendar နှင့် တိုက်ရိုက်သတိပေးချက် မချိတ်ဆက်ရသေးပါ။'); }
    save('blh-community-reminders', [...reminders]);
    renderEvents();
  }
  function renderEvents() {
    $('#hub-event-cards').replaceChildren(...events.map(event => {
      const card = make('article', 'hub-event-card');
      const meta = make('div', 'hub-event-card-meta');
      meta.append(make('span', 'hub-pill', t(...event.category)), make('span', '', t(...event.time)));
      const footer = make('div', 'hub-event-card-footer');
      const reminder = button(reminders.has(event.id) ? t('Saved ✓', 'သိမ်းပြီး ✓') : t('RSVP Free ›', 'အခမဲ့ စာရင်းသွင်း ›'), '', () => toggleReminder(event.id));
      reminder.setAttribute('aria-pressed', String(reminders.has(event.id)));
      footer.append(make('span', `hub-avatar ${event.avatar}`, event.initials), make('span', '', event.host), reminder);
      card.append(meta, make('h4', '', t(...event.title)), make('p', '', t(...event.description)), footer);
      return card;
    }));
    const featured = $('[data-reminder="design"]');
    featured.textContent = reminders.has('design') ? t('Reminder Saved ✓', 'သိမ်းပြီး ✓') : t('Set Reminder', 'သတိပေးချက်ထားရန်');
    featured.setAttribute('aria-pressed', String(reminders.has('design')));
  }
  $('[data-reminder="design"]').addEventListener('click', () => toggleReminder('design'));

  function renderFilters() {
    $('#hub-room-filters').replaceChildren(...categories.map(category => {
      const label = t(category[1], category[2]) + (category[0] === 'all' ? ` (${allRooms().length})` : '');
      const filter = button(label, category[0] === activeCategory ? 'is-active' : '', () => { activeCategory = category[0]; renderFilters(); renderRooms(); });
      filter.dataset.category = category[0];
      filter.setAttribute('aria-pressed', String(category[0] === activeCategory));
      return filter;
    }));
  }
  function renderRooms() {
    const rooms = allRooms().filter(room => activeCategory === 'all' || room.category === activeCategory);
    $('#hub-rooms-empty').hidden = rooms.length !== 0;
    $('#hub-room-grid').replaceChildren(...rooms.map(room => {
      const card = make('article', `hub-room-card${room.official ? ' is-official' : ''}`);
      if (room.official) card.append(make('span', 'hub-official-label', t('OFFICIAL BATCH ROOM', 'တရားဝင် အတန်းအဖွဲ့')));
      const status = make('div', 'hub-room-status');
      const count = room.members + (memberships.has(room.id) && !room.local ? 1 : 0);
      status.append(make('span', 'hub-dot'), make('span', '', room.official ? t(`ACTIVE NOW • ${count} LEARNERS`, `လက်ရှိ • လေ့လာသူ ${count} ဦး`) : t(`ACTIVE • ${count} MEMBERS`, `အဖွဲ့ဝင် ${count} ဦး`)));
      const people = make('div', 'hub-room-people');
      const avatars = make('div', 'hub-avatar-stack');
      avatars.append(...room.initials.map(initial => make('span', '', initial === 'YOU' ? t('YOU', 'သင်') : initial)));
      people.append(avatars, make('span', '', room.official ? t(`Moderated by ${room.host}`, `${room.host} ဦးဆောင်သည်`) : t(`Host: ${room.host}`, `ဦးဆောင်သူ: ${room.host}`)));
      const footer = make('div', 'hub-room-card-footer');
      const enter = button(memberships.has(room.id) ? t('Open Room', 'အခန်း ဖွင့်ရန်') : t('Enter Room', 'အခန်း ဝင်ရန်'), `hub-button${room.official ? '' : ' hub-button-soft'}`, () => openRoom(room.id));
      enter.dataset.enterRoom = room.id;
      footer.append(make('span', '', t(...room.activity)), enter);
      card.append(status, make('h3', '', roomNames(room)), make('p', '', roomDescriptions(room)), people, footer);
      return card;
    }));
  }
  const roomGreetings = {
    react: [['Sayar Min Thant', 'Welcome! Today we’re reviewing Module 2 homework and JWT authentication. Share your question below.', 'ကြိုဆိုပါတယ်။ ဒီနေ့ Module ၂ အိမ်စာနဲ့ JWT authentication ကို လေ့လာနေပါတယ်။ မေးခွန်းရှိရင် အောက်မှာ ရေးပါ။'], ['Aung Kyaw', 'How do we cancel an ongoing fetch when the component unmounts?', 'Component unmount ဖြစ်တဲ့အခါ လုပ်ဆောင်နေဆဲ fetch ကို ဘယ်လို ရပ်ရမလဲ။']],
    design: [['May Myat Noe', 'Welcome to the design lounge. Let’s compare spacing tokens and Figma variable modes.', 'ဒီဇိုင်းစကားဝိုင်းမှ ကြိုဆိုပါတယ်။ Spacing token နဲ့ Figma variable mode တွေကို အတူလေ့လာကြမယ်။'], ['Khin Phyo', 'I’m organizing my mobile wireframes into reusable components.', 'Mobile wireframe တွေကို ပြန်သုံးနိုင်တဲ့ component အဖြစ် စီစဉ်နေပါတယ်။']],
    node: [['Thant Htoo Aung', 'Today’s focus: connection pooling and refresh token rotation. What are you working on?', 'ဒီနေ့ connection pooling နဲ့ refresh token rotation ကို လေ့လာမယ်။ သင်က ဘာလုပ်နေပါသလဲ။'], ['Su Nandar', 'I’m checking how to reuse database connections safely.', 'Database connection တွေကို လုံခြုံစွာ ပြန်သုံးပုံကို စစ်ဆေးနေပါတယ်။']]
  };
  function renderRoom() {
    const room = currentRoom(); if (!room) return;
    $('#hub-room-title').textContent = roomNames(room);
    $('#hub-room-context').textContent = roomDescriptions(room);
    const count = room.members + (memberships.has(room.id) && !room.local ? 1 : 0);
    $('#hub-room-members').replaceChildren(make('span', 'hub-avatar hub-avatar-green', room.initials[0] === 'YOU' ? t('YOU', 'သင်') : room.initials[0]), make('span', '', t(`${count} members • Host: ${room.host}`, `အဖွဲ့ဝင် ${count} ဦး • ဦးဆောင်သူ: ${room.host}`)));
    const initial = roomGreetings[room.id] || [[t('Study room', 'လေ့လာခန်း'), 'Your new study circle is ready. Add a note to start your learning conversation.', 'သင့်လေ့လာရေးအဖွဲ့ အဆင်သင့်ဖြစ်ပါပြီ။ မှတ်စုတစ်ခု ရေးပြီး စတင်လိုက်ပါ။']];
    const fragment = document.createDocumentFragment();
    initial.forEach(([name, en, my]) => { const row = make('div', 'hub-room-message'); row.append(make('strong', '', name), make('p', '', t(en, my))); fragment.append(row); });
    (messages[room.id] || []).forEach(message => { const row = make('div', 'hub-room-message'); row.append(make('strong', '', t('You', 'သင်')), make('p', '', message.text)); fragment.append(row); });
    $('#hub-room-thread').replaceChildren(fragment);
    const joined = memberships.has(room.id);
    $('#hub-membership').textContent = joined ? t('Leave Room', 'အခန်းမှ ထွက်ရန်') : t('Join Room', 'အခန်းသို့ ဝင်ရန်');
    $('#hub-membership').setAttribute('aria-pressed', String(joined));
    $('#hub-room-input').disabled = !joined;
    $('#hub-room-form button').disabled = !joined;
  }
  function openRoom(id) {
    if (activeRoomId) roomDrafts[activeRoomId] = $('#hub-room-input').value;
    activeRoomId = id;
    memberships.add(id); persistMemberships();
    $('#hub-room-input').value = roomDrafts[id] || '';
    renderRoom(); renderRooms();
    showDialog($('#hub-room-dialog'));
    $('#hub-room-thread').scrollTop = $('#hub-room-thread').scrollHeight;
  }
  $('#hub-membership').addEventListener('click', () => {
    if (!activeRoomId) return;
    const leaving = memberships.has(activeRoomId);
    if (leaving) memberships.delete(activeRoomId); else memberships.add(activeRoomId);
    persistMemberships(); renderRoom(); renderRooms();
    toast(leaving ? 'You left this room on this device.' : 'You joined this room on this device.', leaving ? 'ဒီစက်တွင် အခန်းမှ ထွက်ပြီးပါပြီ။' : 'ဒီစက်တွင် အခန်းသို့ ဝင်ပြီးပါပြီ။');
  });
  $('#hub-room-form').addEventListener('submit', event => {
    event.preventDefault();
    const input = $('#hub-room-input'); const text = input.value.trim();
    if (!text || !activeRoomId || !memberships.has(activeRoomId)) return;
    messages[activeRoomId] = [...(messages[activeRoomId] || []), { text: text.slice(0, 1500), at: Date.now() }].slice(-100);
    persistMessages(); input.value = ''; roomDrafts[activeRoomId] = ''; renderRoom();
    $('#hub-room-thread').scrollTop = $('#hub-room-thread').scrollHeight;
    input.focus();
  });
  $('#hub-create-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = $('#hub-group-name').value.trim(); if (!name) { $('#hub-group-name').focus(); return; }
    if (customRooms.length >= 40) { toast('You can save up to 40 groups on this device.', 'ဒီစက်မှာ အဖွဲ့ ၄၀ အထိ သိမ်းနိုင်ပါတယ်။'); return; }
    const room = { id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name: name.slice(0, 70), category: $('#hub-group-category').value, description: $('#hub-group-description').value.trim().slice(0, 250) };
    customRooms.push(room); save('blh-community-groups', customRooms);
    activeCategory = 'all'; renderFilters(); renderRooms();
    $('#hub-create-dialog').close(); $('#hub-create-form').reset(); openRoom(room.id);
    toast('Study group created on this device.', 'ဒီစက်တွင် လေ့လာရေးအဖွဲ့ ဖန်တီးပြီးပါပြီ။');
  });

  const stageExamples = [
    ['Aung Kyaw', '10:14 AM', 'Does this also prevent memory leaks on React Native with low-spec Android devices?', 'စွမ်းဆောင်ရည်နိမ့် Android စက်တွေပေါ်က React Native မှာလည်း memory leak ကို ကာကွယ်ပေးပါသလား။'],
    ['Su Myat', '10:15 AM', 'Tested this in my local repo, the request cancellation worked flawlessly!', 'ကျွန်မ local repo မှာ စမ်းပြီးပြီ။ Request cancellation က အဆင်ပြေပါတယ်။'],
    ['Ko Zaw Myo', '', 'Yes @AungKyaw! It prevents unmounted state writes entirely on React Native as well.', 'ဟုတ်ပါတယ် @AungKyaw။ React Native မှာလည်း unmount ပြီး state ပြန်ရေးတာကို တားဆီးပေးပါတယ်။', true]
  ];
  function renderStage() {
    const fragment = document.createDocumentFragment();
    stageExamples.forEach(([name, time, en, my, mentor]) => {
      const row = make('div', `hub-stage-message${mentor ? ' is-mentor' : ''}`); const byline = make('strong', '', name);
      if (time) byline.append(make('time', '', time));
      if (mentor) byline.append(make('em', '', t('Peer Mentor', 'လမ်းညွှန်သူ')));
      row.append(byline, make('p', '', t(en, my))); fragment.append(row);
    });
    (messages.stage || []).forEach(message => { const row = make('div', 'hub-stage-message'); row.append(make('strong', '', t('You · local message', 'သင် · ဒီစက်မှစာ')), make('p', '', message.text)); fragment.append(row); });
    $('#hub-stage-messages').replaceChildren(fragment);
  }
  $('#hub-stage-form').addEventListener('submit', event => {
    event.preventDefault(); const input = $('#hub-stage-input'); const text = input.value.trim(); if (!text) return;
    messages.stage = [...(messages.stage || []), { text: text.slice(0, 1500), at: Date.now() }].slice(-100);
    persistMessages(); input.value = ''; renderStage();
    $('#hub-stage-messages').scrollTop = $('#hub-stage-messages').scrollHeight;
    toast('Message saved locally. This preview is not connected to a live broadcast.', 'စာကို ဒီစက်မှာ သိမ်းပြီးပါပြီ။ အကြိုကြည့်ရှုမှုကို တိုက်ရိုက်အစီအစဉ်နှင့် မချိတ်ဆက်ထားပါ။');
  });
  $('#hub-download-snippet').addEventListener('click', () => {
    const code = "import { useEffect } from 'react';\n\nexport function AbortControllerHook() {\n  useEffect(() => {\n    const controller = new AbortController();\n    fetch('/api/lecture/status', { signal: controller.signal })\n      .then(response => {\n        if (!response.ok) throw new Error('Request failed');\n        return response.json();\n      })\n      .catch(error => {\n        if (error.name !== 'AbortError') console.error(error);\n      });\n    return () => controller.abort();\n  }, []);\n  return null;\n}\n";
    const url = URL.createObjectURL(new Blob([code], { type: 'text/plain;charset=utf-8' }));
    const link = make('a'); link.href = url; link.download = 'AbortControllerHook.tsx'; document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Code example downloaded. Replace the sample API path before using it.', 'Code နမူနာကို ဒေါင်းလုဒ်လုပ်ပြီးပါပြီ။ အသုံးမပြုမီ API နမူနာလမ်းကြောင်းကို ပြောင်းပါ။');
  });
  const rawHelpful = read('blh-community-helpful', []);
  const helpful = new Set(Array.isArray(rawHelpful) ? rawHelpful.filter(value => value === 'react' || value === 'unicode') : []);
  function renderHelpful() {
    $$('[data-help]').forEach(element => {
      const voted = helpful.has(element.dataset.help); const card = element.closest('[data-question]');
      $('[data-help-count]', element).textContent = String(Number(card.dataset.helpful) + (voted ? 1 : 0));
      element.setAttribute('aria-pressed', String(voted));
    });
  }
  $$('[data-help]').forEach(element => element.addEventListener('click', () => { const id = element.dataset.help; if (helpful.has(id)) helpful.delete(id); else helpful.add(id); save('blh-community-helpful', [...helpful]); renderHelpful(); }));
  $$('[data-question-sort]').forEach(element => element.addEventListener('click', () => {
    $$('[data-question-sort]').forEach(item => { const active = item === element; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active)); });
    const cards = $$('[data-question]');
    cards.sort((a, b) => element.dataset.questionSort === 'popular' ? Number(b.dataset.helpful) - Number(a.dataset.helpful) : (a.dataset.question === 'unicode' ? -1 : 1));
    $('#hub-questions').append(...cards);
  }));
  function translateAccessibleLabels() {
    const labels = [
      ['#hub-stream-settings', 'Stream options', 'အစီအစဉ် ရွေးချယ်စရာများ'],
      ['#hub-room-filters', 'Filter study rooms', 'လေ့လာခန်း စစ်ထုတ်ရန်'],
      ['#hub-stage-input', 'Stage message', 'အစီအစဉ်သို့ ပို့မည့်စာ'],
      ['#hub-stage-form button', 'Save message on this device', 'စာကို ဒီစက်တွင် သိမ်းရန်']
    ];
    labels.forEach(([selector, en, my]) => $(selector)?.setAttribute('aria-label', t(en, my)));
    $$('[data-close-dialog]').forEach(element => element.setAttribute('aria-label', t('Close', 'ပိတ်ရန်')));
    $$('.hub-window-dots').forEach(element => element.setAttribute('aria-hidden', 'true'));
    $$('.hub-tags').forEach(element => { const tags = element.textContent.slice(element.textContent.indexOf('#')); element.textContent = t('Tags: ', 'အမှတ်အသား: ') + tags; });
    $('.hub-code-window img').alt = t('Sayar Min Thant at his computer', 'ကွန်ပျူတာရှေ့တွင် ဆရာမင်းသန့်');
  }
  function onPreferences() {
    translations(document);
    renderEvents(); renderFilters(); renderRooms(); renderStage(); renderInfo(); renderHelpful(); translateAccessibleLabels();
    if (activeRoomId) renderRoom();
    if (toastText) $('#hub-toast').textContent = t(...toastText);
    document.title = t('Community LIVE · Burmese Learners Hub', 'Community LIVE · မြန်မာလေ့လာသူများ၏ ရပ်ဝန်း');
  }
  window.addEventListener('blh:preferences', onPreferences);
  onPreferences();
  const requestedRoom = new URLSearchParams(window.location.search).get('room');
  const requestedRoomId = requestedRoom === 'backend' ? 'node' : requestedRoom;
  if (['react', 'design', 'node'].includes(requestedRoomId)) openRoom(requestedRoomId);
})();
