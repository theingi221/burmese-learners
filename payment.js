(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const translate = (en, my) => window.BLH?.t(en, my) || (document.documentElement.dataset.language === 'my' ? my : en);
  const courses = {
    react: { en: 'Full-Stack Web Development with React & Node (Batch #5)', my: 'React နှင့် Node ဖြင့် Full-Stack Web Development (အတန်းစဉ် #၅)', price: 300000, tuition: 400000, instructor: 'Sayar Min Thant', image: 'assets/platform/asset-3839def590cff905.jpg' },
    figma: { en: 'UI/UX Design Masterclass (Figma to Launch)', my: 'UI/UX Design အထူးသင်တန်း (Figma မှ လက်တွေ့အထိ)', price: 220000, tuition: 220000, instructor: 'Ei Wai Phyo', image: 'assets/reference-design.webp' },
    marketing: { en: 'Digital Marketing & AI Automation Suite', my: 'Digital Marketing နှင့် AI Automation သင်တန်း', price: 180000, tuition: 180000, instructor: 'Ko Zaw Myo', image: 'assets/reference-marketing.webp' },
    flutter: { en: 'Flutter & Mobile Architecture with Firebase', my: 'Flutter နှင့် Firebase ဖြင့် Mobile App တည်ဆောက်ခြင်း', price: 280000, tuition: 280000, instructor: 'Sayar Htet Aung', image: 'assets/platform/asset-67896d07a627a5fc.jpg' },
    python: { en: 'Python, Data Analytics & Practical Machine Learning', my: 'Python၊ Data Analytics နှင့် လက်တွေ့ Machine Learning', price: 320000, tuition: 320000, instructor: 'Dr. Thet Naing', image: 'assets/platform/asset-35f90f2150ab7ea3.jpg' },
    cloud: { en: 'Cloud Architecture with AWS & Docker', my: 'AWS နှင့် Docker ဖြင့် Cloud Architecture', price: 250000, tuition: 250000, instructor: 'Ko Aung Kyaw', image: 'assets/platform/asset-606b4c3b18aed0cf.jpg' }
  };
  const lessonCounts = { react: 64, figma: 48, marketing: 32, flutter: 52, python: 70, cloud: 36 };
  const requestedCourse = new URLSearchParams(location.search).get('course') || 'react';
  const alias = { web: 'react', fullstack: 'react', development: 'react', design: 'figma' };
  const courseId = Object.hasOwn(courses, alias[requestedCourse] || requestedCourse) ? (alias[requestedCourse] || requestedCourse) : 'react';
  const course = courses[courseId];
  const amount = (n) => `${n.toLocaleString('en-US')} MMK`;
  const orderId = `DEMO-BLH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  let selectedMethod = 'KBZPay';
  let copyTimer;
  let validationAttempted = false;
  let formStorageError = false;
  let selectedFilename = '';
  const form = $('payment-form');
  $('payment-order-id').textContent = orderId;
  $('payment-reference-code').textContent = orderId;
  $('payment-close').href = `course.html?course=${courseId}`;
  $('payment-course-image').src = course.image;
  $('payment-instructor').textContent = course.instructor;
  $('payment-price').textContent = amount(course.price);
  $('payment-old-price').textContent = amount(course.tuition);
  $('payment-summary-tuition').textContent = amount(course.tuition);
  $('payment-summary-discount').textContent = `−${amount(course.tuition - course.price)}`;
  $('payment-summary-total').textContent = amount(course.price);
  $('payment-old-price').hidden = course.tuition === course.price;
  document.querySelector('.payment-discount').hidden = course.tuition === course.price;
  document.querySelector('.payment-course-thumb span').hidden = courseId !== 'react';
  document.querySelector('.payment-review').hidden = courseId !== 'react';

  function render() {
    window.BLH?.applyTranslations(document);
    document.title = translate('Demo Checkout — Burmese Learners Hub', 'အစမ်း သင်တန်းအပ်ရန် — Burmese Learners Hub');
    $('payment-course-name').textContent = translate(course.en, course.my);
    if (courseId !== 'react') document.querySelector('.payment-course-meta .p-eyebrow').textContent = translate('SELF-PACED COURSE', 'မိမိအချိန်ဖြင့် လေ့လာရန်');
    document.querySelector('.payment-summary-lines dt').textContent = translate(`Tuition fee (${lessonCounts[courseId]} lessons + projects)`, `သင်တန်းကြေး (သင်ခန်းစာ ${lessonCounts[courseId]} ခုနှင့် Project)`);
    const method = selectedMethod === 'Card' ? translate('Card', 'ကတ်') : selectedMethod === 'Bank' ? translate('Bank', 'ဘဏ်') : selectedMethod;
    $('payment-method-title-text').textContent = translate(`${method} Demo Details`, `${method} အစမ်း အချက်အလက်များ`);
    if (validationAttempted) validate();
    if (formStorageError) $('payment-form-status').textContent = translate('Your browser could not save this demo. Allow local storage and try again. Nothing was submitted.', 'ဤ browser တွင် အစမ်းအချက်အလက်ကို သိမ်းမရပါ။ Local storage ကို ဖွင့်ပြီး ပြန်စမ်းပါ။ မည်သည့်အချက်အလက်မှ ပေးပို့ခြင်း မရှိပါ။');
  }
  document.querySelectorAll('[data-method]').forEach((button) => button.addEventListener('click', () => {
    selectedMethod = button.dataset.method;
    document.querySelectorAll('[data-method]').forEach((item) => { const selected = item === button; item.classList.toggle('is-selected', selected); item.setAttribute('aria-pressed', String(selected)); });
    render();
  }));

  function fieldError(inputId, errorId, message) {
    $(errorId).textContent = message;
    $(inputId).setAttribute('aria-invalid', String(Boolean(message)));
    return Boolean(message);
  }
  function validate() {
    const name = $('payment-name').value.trim();
    const email = $('payment-email').value.trim();
    const reference = $('payment-demo-reference').value.trim();
    const receipt = $('payment-receipt').files[0];
    const errors = [];
    if (fieldError('payment-name', 'payment-name-error', name.length < 2 ? translate('Enter a name with at least 2 characters.', 'အမည်ကို အနည်းဆုံး စာလုံး ၂ လုံး ထည့်ပါ။') : '')) errors.push('payment-name');
    if (fieldError('payment-email', 'payment-email-error', !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? translate('Enter a valid email address.', 'မှန်ကန်သော အီးမေးလ်လိပ်စာ ထည့်ပါ။') : '')) errors.push('payment-email');
    if (fieldError('payment-demo-reference', 'payment-reference-error', reference.length < 3 ? translate('Enter any demo reference, at least 3 characters.', 'အစမ်းနံပါတ်ကို အနည်းဆုံး စာလုံး ၃ လုံး ထည့်ပါ။') : '')) errors.push('payment-demo-reference');
    let receiptError = '';
    if (receipt && (!/\.(png|jpe?g|pdf)$/i.test(receipt.name) || !['image/png', 'image/jpeg', 'application/pdf', ''].includes(receipt.type))) receiptError = translate('Choose a PNG, JPG or PDF sample.', 'PNG၊ JPG သို့မဟုတ် PDF နမူနာကို ရွေးပါ။');
    else if (receipt && receipt.size > 5 * 1024 * 1024) receiptError = translate('Choose a file smaller than 5 MB.', '၅ MB ထက်ငယ်သော ဖိုင်ကို ရွေးပါ။');
    if (fieldError('payment-receipt', 'payment-receipt-error', receiptError)) errors.push('payment-receipt');
    selectedFilename = receipt && !receiptError ? receipt.name.slice(0, 180) : '';
    return errors;
  }
  form.addEventListener('input', () => { if (validationAttempted) validate(); if (formStorageError) { formStorageError = false; $('payment-form-status').textContent = ''; } });
  $('payment-receipt').addEventListener('change', () => { if (validationAttempted) validate(); });
  $('payment-copy').addEventListener('click', async () => {
    clearTimeout(copyTimer);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(orderId);
      $('payment-copy').textContent = translate('✓ Copied', '✓ ကူးယူပြီး');
    } catch {
      $('payment-copy').textContent = translate('Select reference', 'နံပါတ်ရွေးပါ');
      const selection = window.getSelection();
      const range = document.createRange(); range.selectNodeContents($('payment-reference-code')); selection.removeAllRanges(); selection.addRange(range);
    }
    copyTimer = setTimeout(() => { $('payment-copy').textContent = translate('▢ Copy', '▢ ကူးယူမည်'); }, 2200);
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault(); validationAttempted = true; formStorageError = false; $('payment-form-status').textContent = '';
    const errors = validate();
    if (errors.length) { $(errors[0]).focus(); return; }
    const record = { demo: true, course: courseId, orderId, name: $('payment-name').value.trim(), email: $('payment-email').value.trim(), reference: $('payment-demo-reference').value.trim(), method: selectedMethod, amount: course.price, createdAt: new Date().toISOString(), receiptFilename: selectedFilename };
    try {
      let enrollments = {};
      try { const previous = JSON.parse(localStorage.getItem('blh-demo-enrollments') || '{}'); if (previous && typeof previous === 'object' && !Array.isArray(previous)) enrollments = previous; } catch { /* Start a fresh local demo collection when existing data is invalid. */ }
      enrollments[courseId] = record;
      localStorage.setItem('blh-demo-enrollments', JSON.stringify(enrollments));
      location.assign(`confirmed.html?course=${encodeURIComponent(courseId)}&demo=1`);
    } catch { formStorageError = true; render(); }
  });
  window.addEventListener('blh:preferences', render);
  render();
})();
