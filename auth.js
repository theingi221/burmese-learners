(() => {
  'use strict';

  function initialize() {
    const form = document.querySelector('#auth-form');
    if (!form) return;

    const get = (id) => document.getElementById(id);
    const t = (en, my) => window.BLH?.t(en, my) ?? en;
    const messages = {
      'Enter a valid Myanmar mobile number, such as 9 123 456 789.': 'မှန်ကန်သော မြန်မာဖုန်းနံပါတ်ကို ထည့်ပါ။ ဥပမာ 9 123 456 789။',
      'Your phone number changed. Request a new demo code.': 'ဖုန်းနံပါတ် ပြောင်းသွားပါသည်။ စမ်းသပ်ကုဒ်အသစ် ရယူပါ။',
      'Demo code: 123456. No SMS was sent. The code expires in 5 minutes.': 'စမ်းသပ်ကုဒ်: 123456။ SMS မပို့ထားပါ။ ကုဒ်သည် ၅ မိနစ်အတွင်း သက်တမ်းကုန်ပါမည်။',
      'Enter your name to create a local demo profile.': 'ဤ browser အတွင်း စမ်းသပ်ပရိုဖိုင် ဖန်တီးရန် သင့်အမည်ကို ထည့်ပါ။',
      'Request a demo code for this phone number before continuing.': 'ဆက်မလုပ်မီ ဤဖုန်းနံပါတ်အတွက် စမ်းသပ်ကုဒ် ရယူပါ။',
      'This demo code has expired. Request a new code.': 'စမ်းသပ်ကုဒ် သက်တမ်းကုန်သွားပါသည်။ ကုဒ်အသစ် ရယူပါ။',
      'Enter the demo code 123456. No SMS was sent.': 'စမ်းသပ်ကုဒ် 123456 ကို ထည့်ပါ။ SMS မပို့ထားပါ။',
      'Enter a valid email address.': 'မှန်ကန်သော အီးမေးလ်လိပ်စာကို ထည့်ပါ။',
      'Use a password with at least 8 characters for this demo.': 'ဤစမ်းသပ်မှုအတွက် အနည်းဆုံး အက္ခရာ ၈ လုံးပါ စကားဝှက်ကို အသုံးပြုပါ။',
      'Your passwords do not match.': 'စကားဝှက်နှစ်ခု မတူပါ။',
      'Your browser could not save the local demo profile. Allow site storage and try again. No account was authenticated.': 'ဤ browser တွင် စမ်းသပ်ပရိုဖိုင် သိမ်း၍ မရပါ။ Site storage ကို ခွင့်ပြုပြီး ထပ်ကြိုးစားပါ။ အကောင့်အစစ် အတည်ပြုထားခြင်း မရှိပါ။',
    };
    function translateMessage(message) {
      if (messages[message]) return t(message, messages[message]);
      const provider = message.match(/^(Google|Telegram|GitHub) sign-in is not connected/);
      if (provider) return t(message, `${provider[1]} ဖြင့် ဝင်ရောက်ခြင်းကို ဤ UI နမူနာတွင် မချိတ်ဆက်ရသေးပါ။ အောက်ပါ စမ်းသပ်ဖောင်ကို အသုံးပြုပါ။`);
      if (message.startsWith('Local demo profile saved ')) return t(message, `စမ်းသပ်ပရိုဖိုင်ကို ${message.includes('on this device') ? 'ဤစက်တွင်' : 'ဤ browser session အတွက်'} သိမ်းပြီးပါပြီ။ အကောင့်အစစ် အတည်ပြုထားခြင်း မရှိပါ။`);
      return message;
    }
    let currentFeedback;
    const tabs = [...document.querySelectorAll('[data-auth-tab]')];
    const methods = [...document.querySelectorAll('[data-auth-method]')];
    const phonePanel = get('phone-panel');
    const emailPanel = get('email-panel');
    const phone = get('phone');
    const otp = get('otp');
    const email = get('email');
    const password = get('password');
    const displayName = get('display-name');
    const confirmPassword = get('confirm-password');
    const sendButton = get('send-otp');
    const resendButton = get('resend-otp');
    const feedback = get('auth-feedback');
    const submitButton = get('auth-submit');
    const submitArrow = submitButton.querySelector('svg');
    const passwordToggle = get('toggle-password');
    const fields = [phone, otp, email, password, displayName, confirmPassword].filter(Boolean);
    const storageKey = 'blh-demo-profile';
    const codeLifetime = 5 * 60 * 1000;
    const cooldown = 45 * 1000;
    let tab = new URLSearchParams(location.search).get('tab') === 'create' ? 'create' : 'signin';
    let method = 'phone';
    let issuedPhone = '';
    let issuedAt = 0;
    let resendAt = 0;
    let countdown;

    feedback.setAttribute('aria-live', 'polite');
    feedback.setAttribute('aria-atomic', 'true');
    feedback.tabIndex = -1;
    passwordToggle?.setAttribute('aria-pressed', 'false');
    passwordToggle?.setAttribute('aria-controls', 'password');
    // Validate the active fields together, including demo-specific checks.
    form.noValidate = true;

    function showFeedback(message, kind = 'info', withLink = false) {
      currentFeedback = { message, kind, withLink };
      feedback.hidden = false;
      feedback.classList.remove('is-info', 'is-error', 'is-success');
      feedback.classList.add(`is-${kind}`);
      feedback.replaceChildren(document.createTextNode(translateMessage(message)));
      if (withLink) {
        const link = document.createElement('a');
        link.href = 'catalog.html';
        link.textContent = t('Explore courses →', 'သင်တန်းများ ကြည့်ရန် →');
        feedback.append(document.createTextNode(' '), link);
      }
    }

    function clearFeedback() {
      currentFeedback = undefined;
      feedback.hidden = true;
      feedback.replaceChildren();
      feedback.classList.remove('is-info', 'is-error', 'is-success');
    }

    function clearInvalid(field) {
      delete field.dataset.validationMessage;
      field.setCustomValidity('');
      field.removeAttribute('aria-invalid');
    }

    function invalid(field, message) {
      field.dataset.validationMessage = message;
      field.setCustomValidity(translateMessage(message));
      field.setAttribute('aria-invalid', 'true');
      showFeedback(message, 'error');
      field.focus();
      field.reportValidity();
      return false;
    }

    function normalizedPhone(value) {
      if (!/^[+\d\s-]+$/.test(value.trim())) return '';
      let number = value.replace(/[\s-]/g, '');
      if (number.startsWith('+95')) number = number.slice(3);
      else if (number.startsWith('+')) return '';
      if (number.startsWith('0')) number = number.slice(1);
      return /^9\d{7,10}$/.test(number) ? `+95${number}` : '';
    }

    function validatePhone() {
      const number = normalizedPhone(phone.value);
      if (!number) {
        invalid(phone, 'Enter a valid Myanmar mobile number, such as 9 123 456 789.');
      }
      return number;
    }

    function stopCountdown() {
      clearInterval(countdown);
      countdown = undefined;
    }

    function updateCountdown() {
      const seconds = Math.max(0, Math.ceil((resendAt - Date.now()) / 1000));
      sendButton.disabled = seconds > 0;
      resendButton.disabled = !issuedPhone || seconds > 0;
      resendButton.textContent = seconds > 0 ? t(`Resend code in ${seconds}s`, `${seconds} စက္ကန့်အကြာ ပြန်ရယူနိုင်မည်`) : t('Resend code', 'ကုဒ် ပြန်ရယူရန်');
      if (!seconds) stopCountdown();
    }

    function invalidateCode() {
      issuedPhone = '';
      issuedAt = 0;
      resendAt = 0;
      otp.value = '';
      clearInvalid(otp);
      stopCountdown();
      updateCountdown();
    }

    function configureField(field, active) {
      field.disabled = !active;
      field.required = active;
      clearInvalid(field);
    }

    function render(focus = false) {
      const creating = tab === 'create';
      const usingPhone = method === 'phone';
      tabs.forEach((button) => {
        const active = button.dataset.authTab === tab;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-selected', String(active));
        button.tabIndex = active ? 0 : -1;
      });
      methods.forEach((button) => {
        const active = button.dataset.authMethod === method;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
        if (button.getAttribute('role') === 'tab') {
          button.setAttribute('aria-selected', String(active));
          button.tabIndex = active ? 0 : -1;
        }
      });
      phonePanel.hidden = !usingPhone;
      emailPanel.hidden = usingPhone;
      get('name-field').hidden = !creating;
      get('confirm-field').hidden = !creating || usingPhone;
      configureField(phone, usingPhone);
      configureField(otp, usingPhone);
      configureField(email, !usingPhone);
      configureField(password, !usingPhone);
      configureField(displayName, creating);
      configureField(confirmPassword, creating && !usingPhone);
      password.autocomplete = creating ? 'new-password' : 'current-password';
      refreshLabels();
      clearFeedback();
      if (focus) (creating ? displayName : usingPhone ? phone : email).focus();
    }

    function refreshLabels() {
      const creating = tab === 'create';
      const usingPhone = method === 'phone';
      const submitLabel = t(`${creating ? 'Create Account' : 'Sign In'} with ${usingPhone ? 'Myanmar Phone' : 'Email'}`,
        `${usingPhone ? 'ဖုန်းနံပါတ်' : 'အီးမေးလ်'}ဖြင့် ${creating ? 'အကောင့်ဖွင့်ရန်' : 'အကောင့်ဝင်ရန်'}`);
      submitButton.replaceChildren(document.createTextNode(`${submitLabel} `));
      submitButton.append(submitArrow || document.createTextNode('→'));
      submitButton.setAttribute('aria-label', `${submitLabel} →`);
      if (passwordToggle) {
        const visible = password.type === 'text';
        const label = visible ? t('Hide password', 'စကားဝှက် ဖျောက်ရန်') : t('Show password', 'စကားဝှက် ပြရန်');
        passwordToggle.setAttribute('aria-label', label);
        passwordToggle.title = label;
        passwordToggle.textContent = visible ? t('Hide', 'ဖျောက်ရန်') : t('Show', 'ပြရန်');
      }
    }

    tabs.forEach((button) => {
      button.addEventListener('click', () => {
        tab = button.dataset.authTab;
        render(true);
      });
      button.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const current = tabs.indexOf(button);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        tab = tabs[next].dataset.authTab;
        render();
        tabs[next].focus();
      });
    });

    methods.forEach((button) => {
      button.addEventListener('click', () => {
        method = button.dataset.authMethod;
        render(true);
      });
      button.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const current = methods.indexOf(button);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? methods.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + methods.length) % methods.length;
        method = methods[next].dataset.authMethod;
        render();
        methods[next].focus();
      });
    });

    fields.forEach((field) => field.addEventListener('input', () => {
      clearInvalid(field);
      if (field === password) clearInvalid(confirmPassword);
    }));

    phone.addEventListener('input', () => {
      if (issuedPhone) {
        invalidateCode();
        showFeedback('Your phone number changed. Request a new demo code.');
      }
    });

    function sendCode() {
      if (Date.now() < resendAt) return;
      clearInvalid(phone);
      const number = validatePhone();
      if (!number) return;
      issuedPhone = number;
      issuedAt = Date.now();
      resendAt = issuedAt + cooldown;
      otp.value = '';
      clearInvalid(otp);
      stopCountdown();
      updateCountdown();
      countdown = setInterval(updateCountdown, 1000);
      showFeedback('Demo code: 123456. No SMS was sent. The code expires in 5 minutes.');
      otp.focus();
    }

    sendButton.addEventListener('click', sendCode);
    resendButton.addEventListener('click', sendCode);

    passwordToggle?.addEventListener('click', () => {
      const visible = password.type === 'password';
      password.type = visible ? 'text' : 'password';
      passwordToggle.setAttribute('aria-pressed', String(visible));
      refreshLabels();
    });

    document.querySelectorAll('[data-provider]').forEach((button) => {
      button.addEventListener('click', () => {
        showFeedback(`${button.dataset.provider} sign-in is not connected in this UI preview. Use the local demo form below.`);
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      fields.forEach(clearInvalid);
      if (tab === 'create' && !displayName.value.trim()) {
        invalid(displayName, 'Enter your name to create a local demo profile.');
        return;
      }

      let contact;
      if (method === 'phone') {
        const number = validatePhone();
        if (!number) return;
        if (!issuedPhone || issuedPhone !== number) {
          showFeedback('Request a demo code for this phone number before continuing.', 'error');
          sendButton.focus();
          return;
        }
        if (Date.now() - issuedAt >= codeLifetime) {
          invalid(otp, 'This demo code has expired. Request a new code.');
          return;
        }
        if (otp.value.trim() !== '123456') {
          invalid(otp, 'Enter the demo code 123456. No SMS was sent.');
          return;
        }
        contact = { phone: number };
      } else {
        email.value = email.value.trim();
        if (!email.value || !email.validity.valid) {
          invalid(email, 'Enter a valid email address.');
          return;
        }
        if (password.value.length < 8) {
          invalid(password, 'Use a password with at least 8 characters for this demo.');
          return;
        }
        if (tab === 'create' && confirmPassword.value !== password.value) {
          invalid(confirmPassword, 'Your passwords do not match.');
          return;
        }
        contact = { email: email.value };
      }

      const profile = { name: tab === 'create' ? displayName.value.trim() : 'Learner', ...contact, demo: true };
      const remember = get('remember').checked;
      try {
        const selectedStorage = remember ? localStorage : sessionStorage;
        selectedStorage.setItem(storageKey, JSON.stringify(profile));
        // Avoid an older demo profile overriding the newly selected storage scope.
        (remember ? sessionStorage : localStorage).removeItem(storageKey);
      } catch {
        showFeedback('Your browser could not save the local demo profile. Allow site storage and try again. No account was authenticated.', 'error');
        feedback.focus();
        return;
      }
      password.value = '';
      confirmPassword.value = '';
      invalidateCode();
      showFeedback(`Local demo profile saved ${remember ? 'on this device' : 'for this browser session'}. No account was authenticated.`, 'success', true);
      feedback.focus();
    });

    window.addEventListener('blh:preferences', () => {
      refreshLabels();
      updateCountdown();
      fields.forEach((field) => {
        if (field.dataset.validationMessage) field.setCustomValidity(translateMessage(field.dataset.validationMessage));
      });
      if (currentFeedback) showFeedback(currentFeedback.message, currentFeedback.kind, currentFeedback.withLink);
    });
    window.BLH?.applyTranslations(document);
    window.addEventListener('pagehide', stopCountdown);
    window.addEventListener('pageshow', () => {
      stopCountdown();
      updateCountdown();
      if (resendAt > Date.now()) countdown = setInterval(updateCountdown, 1000);
    });
    render();
    updateCountdown();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
