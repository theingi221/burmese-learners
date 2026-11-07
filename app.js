(() => {
  'use strict';

  function initialize() {
    const nav = document.querySelector('#main-nav');
    const menu = document.querySelector('#menu-toggle');
    const dialog = document.querySelector('#action-dialog');
    const content = document.querySelector('#dialog-content');
    const toast = document.querySelector('#toast');
    let toastTimer;

    const node = (tag, className, text) => {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (text !== undefined) element.textContent = text;
      return element;
    };

    function read(key, fallback) {
      try {
        const value = localStorage.getItem(key) ?? (key === 'blh-demo-profile' ? sessionStorage.getItem(key) : null);
        return JSON.parse(value) ?? fallback;
      }
      catch { return fallback; }
    }

    function save(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch { return false; }
    }

    function notify(message) {
      if (!toast) return;
      clearTimeout(toastTimer);
      toast.hidden = false;
      toast.textContent = message;
      toast.classList.add('is-visible');
      toastTimer = setTimeout(() => {
        toast.classList.remove('is-visible');
        toast.hidden = true;
      }, 5500);
    }

    menu?.addEventListener('click', () => {
      const expanded = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(expanded));
      menu.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
      nav?.classList.toggle('is-open', expanded);
    });

    nav?.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) {
        nav.classList.remove('is-open');
        menu?.setAttribute('aria-expanded', 'false');
        menu?.setAttribute('aria-label', 'Open navigation');
      }
    });

    const filters = [...document.querySelectorAll('[data-filter]')];
    const cards = [...document.querySelectorAll('[data-course-card]')];
    filters.forEach((button) => {
      button.addEventListener('click', () => {
        const category = button.dataset.filter;
        let visible = 0;
        filters.forEach((filter) => {
          const active = filter === button;
          filter.classList.toggle('active', active);
          filter.setAttribute('aria-pressed', String(active));
        });
        cards.forEach((card) => {
          const show = category === 'all' || card.dataset.category === category;
          card.hidden = !show;
          if (show) visible += 1;
        });
        const count = document.querySelector('#course-count');
        if (count) count.textContent = `${visible} ${visible === 1 ? 'course' : 'courses'} to start your next chapter`;
      });
    });

    const year = document.querySelector('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    const roomButtons = [...document.querySelectorAll('[data-room]')];
    const chatMessages = document.querySelector('#chat-messages');
    const chatInput = document.querySelector('#chat-message');
    const rooms = {
      react: {
        name: 'React Batch 4 Study Group', members: 148, mentor: 'Sayar Min Thant',
        note: '"Module 2 Homework solutions will be reviewed live this Saturday at 8:00 PM MMT. Drop your questions below."',
        messages: [
          { name: 'Aung Kyaw', initials: 'AK', body: 'Sayar, when doing data fetching inside useEffect, how should we write the cleanup function properly? Is using AbortController the best practice?', time: '10:14 AM', blue: true },
          { name: 'Sayar Min Thant', initials: 'MT', body: 'Yes Aung Kyaw, utilizing AbortController is indeed a best practice for cancelling requests when a component unmounts. Return a cleanup function from useEffect that calls controller.abort().', time: '10:18 AM', mentor: true }
        ]
      },
      design: {
        name: 'UI Designers Lounge', members: 92, mentor: 'Ei Wai Phyo',
        note: 'Bring your sketches, rough ideas, and questions. A thoughtful critique helps all of us get a little better. ✨',
        messages: [
          { name: 'May Myat Noe', initials: 'MM', body: 'Working on my first mobile onboarding flow in Figma. How many screens is too many?', time: '11:08 AM', blue: true },
          { name: 'Ei Wai Phyo', initials: 'EW', body: 'Start with what someone needs to take their first step. Try three focused screens, then test whether each one earns its place. Share your draft! 🎨', time: '11:12 AM', mentor: true }
        ]
      },
      backend: {
        name: 'Node.js Backend Squad', members: 67, mentor: 'Sayar Min Thant',
        note: 'One bug at a time, one breakthrough at a time. Share what you tried, what you expected, and what actually happened. 🛠️',
        messages: [
          { name: 'Kyaw Swein Hein', initials: 'KS', body: 'My first Node.js API is returning data! Next goal: add input validation before saving a request.', time: '9:35 AM', blue: true },
          { name: 'Sayar Min Thant', initials: 'MT', body: 'Great next step. Start by checking required fields, types, and length. Return a helpful error message for each case. You’ve got this! 💚', time: '9:39 AM', mentor: true }
        ]
      }
    };
    let activeRoom = 'react';
    const storedChats = read('blh-demo-chats', {});
    const localChats = {};
    Object.keys(rooms).forEach((key) => {
      const messages = storedChats && typeof storedChats === 'object' ? storedChats[key] : null;
      localChats[key] = Array.isArray(messages) ? messages.filter((message) => message && typeof message.name === 'string' && typeof message.body === 'string' && typeof message.time === 'string').slice(-30) : [];
    });

    function messageNode(message) {
      const wrapper = node('div', 'chat-message');
      const initials = message.initials || message.name.split(/\s+/).map((part) => part[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
      const avatar = node('span', `initial-avatar${message.blue ? ' avatar-blue' : ''}`, initials);
      const body = node('div');
      const sender = node('span', 'chat-sender', message.name);
      if (message.mentor) sender.append(node('span', 'mentor-tag', 'Instructor'));
      sender.append(node('small', '', message.time));
      body.append(sender, node('p', '', message.body));
      wrapper.append(avatar, body);
      return wrapper;
    }

    function showRoom(key) {
      if (!rooms[key] || !chatMessages) return;
      activeRoom = key;
      const room = rooms[key];
      roomButtons.forEach((button) => {
        const active = button.dataset.room === key;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
        button.setAttribute('aria-controls', 'chat-messages');
      });
      const title = document.querySelector('#chat-room-name');
      const members = document.querySelector('#chat-room-members');
      if (title) title.textContent = room.name;
      if (members) members.replaceChildren(node('span', 'status-dot'), document.createTextNode(` ${room.members} Members Online • Moderated by ${room.mentor}`));
      chatMessages.replaceChildren(node('div', 'chat-date', 'COMMUNITY PREVIEW · A LITTLE LEARNING, A LOT OF SUPPORT'));
      const pinned = node('div', 'pinned-message');
      const pinnedText = node('p');
      pinnedText.append(node('strong', '', `${room.mentor} (Instructor) Pinned:`), node('span', '', room.note));
      pinned.append(node('span', 'room-icon', '✦'), pinnedText);
      chatMessages.append(pinned);
      [...room.messages, ...localChats[key]].forEach((message) => chatMessages.append(messageNode(message)));
      chatMessages.scrollTop = 0;
    }

    roomButtons.forEach((button) => button.addEventListener('click', () => showRoom(button.dataset.room)));
    if (chatMessages) {
      chatMessages.setAttribute('aria-live', 'polite');
      chatMessages.setAttribute('aria-relevant', 'additions');
      showRoom(activeRoom);
    }
    chatInput?.addEventListener('input', () => chatInput.setCustomValidity(''));
    document.querySelector('#chat-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!chatInput || !chatMessages) return;
      const text = chatInput.value.trim();
      if (!text) {
        chatInput.setCustomValidity('Please write a question, an idea, or a little win.');
        chatInput.reportValidity();
        return;
      }
      const profile = read('blh-demo-profile', null);
      const name = profile && typeof profile.name === 'string' ? profile.name : 'You';
      const message = { name, body: text.slice(0, 500), time: new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date()) };
      localChats[activeRoom].push(message);
      localChats[activeRoom] = localChats[activeRoom].slice(-30);
      const saved = save('blh-demo-chats', localChats);
      chatMessages.append(messageNode(message));
      chatMessages.scrollTop = chatMessages.scrollHeight;
      chatInput.value = '';
      notify(saved ? 'Demo message saved on this device only. Nothing was sent.' : 'Demo message added for this visit. Nothing was sent.');
      chatInput.focus({ preventScroll: true });
    });

    function heading(kicker, title, copy) {
      content.replaceChildren();
      content.append(node('span', 'modal-kicker', kicker));
      const h2 = node('h2', 'modal-title', title);
      h2.id = 'dialog-title';
      content.append(h2);
      dialog.setAttribute('aria-labelledby', h2.id);
      if (copy) content.append(node('p', 'modal-copy', copy));
    }

    function field(form, labelText, name, type = 'text', value = '', options) {
      const wrapper = node('div', 'form-field');
      const label = node('label', 'field-label', labelText);
      const id = `demo-${name}`;
      label.htmlFor = id;
      let input;
      if (options) {
        input = node('select');
        options.forEach((option) => input.append(node('option', '', option)));
      } else if (type === 'textarea') {
        input = node('textarea');
        input.rows = 3;
      } else {
        input = node('input');
        input.type = type;
        input.autocomplete = name === 'name' ? 'name' : name === 'email' ? 'email' : 'off';
      }
      input.id = id;
      input.name = name;
      input.required = true;
      input.value = value;
      if (type === 'text') input.maxLength = 120;
      if (type === 'textarea') input.maxLength = 1200;
      wrapper.append(label, input);
      form.append(wrapper);
      return input;
    }

    function requestForm(kind, title, extraFields = []) {
      const storedProfile = read('blh-demo-profile', {});
      const profile = storedProfile && typeof storedProfile === 'object' ? storedProfile : {};
      const form = node('form', 'modal-form');
      field(form, 'Your name', 'name', 'text', typeof profile.name === 'string' ? profile.name : '');
      field(form, 'Email address', 'email', 'email', typeof profile.email === 'string' ? profile.email : '');
      extraFields.forEach((definition) => field(form, ...definition));
      form.append(node('p', 'modal-note', 'Demo only. Your entry is saved on this device. No message, booking, payment, or sign-in is sent to a server.'));
      const submit = node('button', 'modal-submit', kind === 'profile' ? 'Save demo profile' : 'Save my interest');
      submit.type = 'submit';
      form.append(submit);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const values = Object.fromEntries(new FormData(form));
        for (const [key, value] of Object.entries(values)) values[key] = String(value).trim();
        if (!values.name) {
          form.elements.namedItem('name').setCustomValidity('Please enter your name.');
          form.elements.namedItem('name').reportValidity();
          return;
        }
        let saved;
        if (kind === 'profile') {
          saved = save('blh-demo-profile', { name: values.name, email: values.email });
        } else {
          const previous = read('blh-demo-requests', []);
          const requests = Array.isArray(previous) ? previous : [];
          saved = save('blh-demo-requests', [...requests.slice(-19), { kind, title, ...values, savedAt: new Date().toISOString() }]);
        }
        form.replaceChildren();
        form.append(node('div', 'modal-success', saved ? `Thanks, ${values.name}. Your ${kind === 'profile' ? 'demo profile' : 'interest'} is saved on this device.` : 'Your browser could not save this entry. Please allow local storage and try again.'));
        form.append(node('p', 'modal-note', kind === 'profile' ? 'This is a local demo profile, not an authenticated account.' : 'Nothing has been sent to an instructor or group. This demo does not confirm a reservation or enrollment.'));
        notify(saved ? 'Saved on this device only. Nothing was sent.' : 'Browser storage is unavailable. Your entry was not saved.');
      });
      form.addEventListener('input', () => form.elements.namedItem('name')?.setCustomValidity(''));
      content.append(form);
    }

    const lessons = {
      web: [
        { title: 'Start with the web', time: '5 min', body: 'Every website starts with structure, style, and behavior. HTML describes the content, CSS shapes its appearance, and JavaScript responds to what a learner does.', steps: ['Create an index.html file with a descriptive page title.', 'Add a heading, a short paragraph, and a button inside the body.', 'Open the file in a browser and inspect the elements using developer tools.'], exercise: 'Try it: write a page introducing yourself and one skill you want to learn.' },
        { title: 'Think in components', time: '7 min', body: 'A component is a small, reusable piece of an interface. A course card is a good example: it has a title, an image, a description, and an action.', steps: ['List the pieces that every course card shares.', 'Keep the content separate from the card’s presentation.', 'Choose a clear label for the button and check that you can reach it with Tab.'], exercise: 'Try it: sketch a course card, then label the information that changes between courses.' },
        { title: 'Build for every screen', time: '6 min', body: 'Responsive design lets the same page work on a phone and a wide display. Start with a simple single-column layout, then add room as the viewport grows.', steps: ['Use flexible widths instead of a fixed page width.', 'Let a card grid wrap into fewer columns on smaller screens.', 'Test readable text, visible focus, and touch-friendly buttons at 375px wide.'], exercise: 'Try it: resize this page and observe how the course grid and navigation adapt.' }
      ],
      design: [
        { title: 'Start with a real problem', time: '5 min', body: 'Good interface design begins with understanding what someone is trying to do. A beautiful screen is useful when it helps a person reach that goal clearly.', steps: ['Choose one person and one task, such as finding a beginner course.', 'Write down the information they need before taking action.', 'Arrange that information in order of importance.'], exercise: 'Try it: describe the goal of a course page in one sentence.' },
        { title: 'Create visual hierarchy', time: '7 min', body: 'Size, contrast, spacing, and alignment guide attention. A strong hierarchy makes a page easy to scan without making every element compete.', steps: ['Choose one primary heading and a clear action.', 'Group related information using space and alignment.', 'Check that text remains readable against its background.'], exercise: 'Try it: sketch a course card with three levels of text emphasis.' },
        { title: 'Test your first prototype', time: '6 min', body: 'A prototype is a way to test an idea before building every detail. Observe whether someone can complete the main task, then improve the points where they hesitate.', steps: ['Connect a small set of screens around one task.', 'Ask a tester to complete the task without giving hints.', 'Record what happened and revise the most confusing step.'], exercise: 'Try it: make a three-screen journey from browsing a course to reviewing its details.' }
      ],
      ai: [
        { title: 'Give AI a clear task', time: '5 min', body: 'Useful AI prompts describe the task, the relevant context, and the expected result. Specific instructions make it easier to evaluate the answer.', steps: ['State the goal in one sentence.', 'Provide only the context needed for the task, without private information.', 'Specify the format and length of the response.'], exercise: 'Try it: ask for a five-step study plan for a beginner learning HTML.' },
        { title: 'Evaluate the result', time: '7 min', body: 'An AI answer can sound confident and still be wrong. Treat the output as a draft that needs checks against reliable sources and your actual goal.', steps: ['Identify factual claims that need verification.', 'Compare them with trusted documentation or your own tests.', 'Ask for a revision with a precise explanation of what is missing.'], exercise: 'Try it: review an AI study plan and check whether every step is practical for a beginner.' },
        { title: 'Design a simple workflow', time: '6 min', body: 'A useful workflow combines a clear input, a repeatable task, a review step, and an output. Keep human review where accuracy or judgment matters.', steps: ['Choose a small repeatable task, such as summarizing study notes.', 'Define what a good output must include.', 'Review the result before sharing or using it.'], exercise: 'Try it: outline a workflow that turns your own notes into five practice questions.' }
      ]
    };

    function showLessons(title) {
      heading('YOUR FIRST STEP STARTS HERE', 'A little learning. A lot of possibility.', 'Explore three short, text-based introductory lessons. No account or payment is needed.');
      const track = /design|figma|ux|ui\//i.test(title) ? 'design' : /ai|marketing|growth/i.test(title) ? 'ai' : 'web';
      const storageKey = `blh-lessons-${track}`;
      const stored = read(storageKey, []);
      const completed = new Set(Array.isArray(stored) ? stored.filter((index) => Number.isInteger(index) && index >= 0 && index < 3) : []);
      const progress = node('p', 'lesson-progress');
      progress.setAttribute('aria-live', 'polite');
      const list = node('div', 'lesson-list');
      list.setAttribute('aria-label', 'Introductory lessons');
      const article = node('article', 'lesson-content');
      let activeIndex = 0;

      function update() {
        progress.textContent = `${completed.size} of 3 lessons completed on this device`;
        [...list.children].forEach((button, index) => {
          button.classList.toggle('active', activeIndex === index);
          button.setAttribute('aria-pressed', String(activeIndex === index));
          button.textContent = `${completed.has(index) ? '✓' : String(index + 1).padStart(2, '0')}  ${lessons[track][index].title} · ${lessons[track][index].time}`;
        });
        const lesson = lessons[track][activeIndex];
        article.replaceChildren(node('h3', '', lesson.title), node('p', '', lesson.body));
        const steps = node('ol');
        lesson.steps.forEach((step) => steps.append(node('li', '', step)));
        article.append(steps, node('p', 'modal-note', lesson.exercise));
        const complete = node('button', 'modal-submit', completed.has(activeIndex) ? '✓ Lesson completed' : 'Mark lesson complete');
        complete.type = 'button';
        complete.disabled = completed.has(activeIndex);
        complete.addEventListener('click', () => {
          completed.add(activeIndex);
          const saved = save(storageKey, [...completed]);
          update();
          notify(saved ? 'Lesson progress saved on this device.' : 'Lesson complete for this visit. Browser storage is unavailable.');
        });
        article.append(complete);
      }

      lessons[track].forEach((lesson, index) => {
        const button = node('button', 'lesson-option');
        button.type = 'button';
        button.addEventListener('click', () => { activeIndex = index; update(); });
        list.append(button);
      });
      content.append(progress, list, article);
      update();
    }

    const actions = {
      preview: showLessons,
      enroll(title) {
        heading('MAKE ROOM FOR YOUR NEXT CHAPTER', title, 'Interested in this course? Save a local expression of interest. This demo does not process payments or enroll you in a hosted course.');
        requestForm('course interest', title);
      },
      mentor() {
        heading('LEARN WITH SOMEONE IN YOUR CORNER', 'Find your next step, together.', 'Tell us what you want to work on and your preferred time. This local demo does not send or confirm a consultation.');
        requestForm('mentorship interest', '1-on-1 mentorship', [['What would you like help with?', 'goal', 'textarea'], ['Your time zone', 'timezone', 'text', Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Yangon']]);
      },
      instructor() {
        heading('A CONVERSATION CAN CHANGE YOUR DIRECTION', 'Ask Sayar Min Thant', 'Draft a question about learning, your career, or a course. It is saved locally only; this demo has no instructor messaging service.');
        requestForm('instructor question', 'Question for Sayar Min Thant', [['Your question', 'question', 'textarea'], ['Your time zone', 'timezone', 'text', Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Yangon']]);
      },
      signin() {
        heading('YOUR LEARNING, IN ONE PLACE', 'Create a local demo profile', 'Try the learner experience with a name and email. No password is needed because this is a device-only demo, not a real sign-in.');
        requestForm('profile', 'Local learner profile');
      },
      portal() {
        heading('WELCOME TO YOUR LEARNING SPACE', 'Your demo student portal', 'Explore introductory lessons and track their completion on this device. Course purchases and authenticated accounts are not connected.');
        const stored = read('blh-demo-profile', null);
        if (stored && typeof stored.name === 'string') content.append(node('p', 'modal-success', `Welcome back, ${stored.name}.`));
        const preview = node('button', 'modal-submit', 'Continue free lessons →');
        preview.type = 'button';
        preview.addEventListener('click', () => showLessons('Web development'));
        content.append(preview);
        requestForm('profile', 'Local learner profile');
        if (stored) {
          const clear = node('button', 'lesson-option', 'Remove this demo profile');
          clear.type = 'button';
          clear.addEventListener('click', () => {
            try { localStorage.removeItem('blh-demo-profile'); sessionStorage.removeItem('blh-demo-profile'); }
            catch { notify('Browser storage is unavailable.'); return; }
            actions.portal();
            notify('Demo profile removed from this device.');
          });
          content.append(clear);
        }
      },
      community(title) {
        heading('GOOD COMPANY. BETTER LEARNING.', 'Find your people', 'Choose a study group and save your interest on this device. Live chat and external community invitations are not connected in this demo.');
        const groups = ['React Batch 4 Study Group', 'UI Designers Lounge', 'Node.js Backend Squad', 'Telegram Study Channels', 'Viber Discussion Hub'];
        requestForm('community interest', title, [['Choose your community', 'group', 'text', groups.includes(title) ? title : groups[0], groups]]);
      },
      teach() {
        heading('YOUR EXPERIENCE CAN OPEN DOORS', 'Share what you know.', 'Help the next generation of Myanmar creators. Save a teaching interest draft locally; this demo does not submit an instructor application.');
        requestForm('teaching interest', 'Become an instructor', [['What would you like to teach?', 'topic', 'textarea']]);
      }
    };

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-action]');
      if (!trigger || !dialog || !content) return;
      const action = actions[trigger.dataset.action];
      if (!action) return;
      event.preventDefault();
      action(trigger.dataset.title || 'Start your learning journey');
      if (!dialog.open) dialog.showModal();
      document.body.classList.add('dialog-open');
    });

    document.querySelector('#dialog-close')?.addEventListener('click', () => dialog.close());
    dialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));
    dialog?.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });

    const reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach((element) => element.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      reveals.forEach((element) => observer.observe(element));
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
