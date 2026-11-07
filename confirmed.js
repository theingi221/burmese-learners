(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const translate = (en, my) => window.BLH?.t(en, my) || (document.documentElement.dataset.language === 'my' ? my : en);
  const courses = {
    react: { en: 'Full-Stack Web Development with React & Node (Batch #5)', my: 'React နှင့် Node ဖြင့် Full-Stack Web Development (အတန်းစဉ် #၅)', price: 300000, tuition: 400000, instructor: 'Sayar Min Thant', initials: 'MT', description: ['Master modern TypeScript, Next.js, Node/Express, PostgreSQL and cloud deployment with practical portfolio projects.', 'လက်တွေ့ Portfolio Project များနှင့် Modern TypeScript၊ Next.js၊ Node/Express၊ PostgreSQL၊ Cloud Deployment ကို လေ့လာပါ။'], image: 'assets/platform/asset-1bb834344a1ac656.jpg' },
    figma: { en: 'UI/UX Design Masterclass (Figma to Launch)', my: 'UI/UX Design အထူးသင်တန်း (Figma မှ လက်တွေ့အထိ)', price: 220000, tuition: 220000, instructor: 'Ei Wai Phyo', initials: 'EW', description: ['Learn user research, wireframes, design systems and interactive prototypes through practical Figma projects.', 'လက်တွေ့ Figma Project များဖြင့် User Research၊ Wireframe၊ Design System နှင့် Interactive Prototype များကို လေ့လာပါ။'], image: 'assets/reference-design.webp' },
    marketing: { en: 'Digital Marketing & AI Automation Suite', my: 'Digital Marketing နှင့် AI Automation သင်တန်း', price: 180000, tuition: 180000, instructor: 'Ko Zaw Myo', initials: 'ZM', description: ['Build a practical marketing toolkit with campaigns, analytics, content planning and AI-assisted automation.', 'Campaign၊ Analytics၊ Content အစီအစဉ်နှင့် AI Automation ပါဝင်သော လက်တွေ့ Marketing နည်းလမ်းများကို လေ့လာပါ။'], image: 'assets/reference-marketing.webp' },
    flutter: { en: 'Flutter & Mobile Architecture with Firebase', my: 'Flutter နှင့် Firebase ဖြင့် Mobile App တည်ဆောက်ခြင်း', price: 280000, tuition: 280000, instructor: 'Sayar Htet Aung', initials: 'HA', description: ['Explore state management, real-time messaging, local caching and practical mobile deployment.', 'State management၊ အချိန်နှင့်တစ်ပြေးညီ Messaging၊ Local Cache နှင့် လက်တွေ့ Mobile Deployment ကို လေ့လာပါ။'], image: 'assets/platform/asset-67896d07a627a5fc.jpg' },
    python: { en: 'Python, Data Analytics & Practical Machine Learning', my: 'Python၊ Data Analytics နှင့် လက်တွေ့ Machine Learning', price: 320000, tuition: 320000, instructor: 'Dr. Thet Naing', initials: 'TN', description: ['Learn Pandas, Scikit-Learn, neural networks and data visualization through practical projects.', 'Pandas၊ Scikit-Learn၊ Neural Network နှင့် Data Visualization ကို လက်တွေ့ Project များဖြင့် လေ့လာပါ။'], image: 'assets/platform/asset-35f90f2150ab7ea3.jpg' },
    cloud: { en: 'Cloud Architecture with AWS & Docker', my: 'AWS နှင့် Docker ဖြင့် Cloud Architecture', price: 250000, tuition: 250000, instructor: 'Ko Aung Kyaw', initials: 'AK', description: ['Build with AWS, Docker containers, Kubernetes and practical deployment workflows.', 'AWS၊ Docker Container၊ Kubernetes နှင့် လက်တွေ့ Deployment လုပ်ငန်းစဉ်များကို လေ့လာပါ။'], image: 'assets/platform/asset-606b4c3b18aed0cf.jpg' }
  };
  const lessonCounts = { react: 64, figma: 48, marketing: 32, flutter: 52, python: 70, cloud: 36 };
  const requestedCourse = new URLSearchParams(location.search).get('course') || 'react';
  const alias = { web: 'react', fullstack: 'react', development: 'react', design: 'figma' };
  const courseId = Object.hasOwn(courses, alias[requestedCourse] || requestedCourse) ? (alias[requestedCourse] || requestedCourse) : 'react';
  const course = courses[courseId];
  let record = null;
  try { const saved = JSON.parse(localStorage.getItem('blh-demo-enrollments') || '{}'); const candidate = saved?.[courseId]; if (candidate?.demo === true && candidate.course === courseId && typeof candidate.orderId === 'string' && candidate.orderId.startsWith('DEMO-BLH-') && typeof candidate.createdAt === 'string' && Number.isFinite(Date.parse(candidate.createdAt))) record = candidate; } catch { /* A directly opened page is an honest preview without a saved enrollment. */ }
  const amount = (value) => `${value.toLocaleString('en-US')} MMK`;
  $('confirmed-tuition').textContent = amount(course.tuition);
  $('confirmed-discount').textContent = `−${amount(course.tuition - course.price)}`;
  $('confirmed-course-price').textContent = amount(course.price);
  $('confirmed-mentor').textContent = course.instructor;
  $('confirmed-instructor').textContent = course.instructor;
  document.querySelector('.confirmed-instructor-avatar').textContent = course.initials;
  $('confirmed-course-image').src = course.image;
  $('confirmed-discount').closest('div').hidden = course.tuition === course.price;
  document.querySelector('.confirmed-mentor img').hidden = courseId !== 'react';
  ['confirmed-course-link', 'confirmed-syllabus'].forEach((id) => { $(id).href = `course.html?course=${courseId}`; });
  $('confirmed-create-demo').href = `payment.html?course=${courseId}`;
  $('confirmed-classroom').href = `lesson.html?course=${courseId}`;
  $('confirmed-assignment').href = `assignment.html?course=${courseId}`;
  let feedbackKey = '';
  function render() {
    window.BLH?.applyTranslations(document);
    document.title = translate('Enrollment Preview — Burmese Learners Hub', 'အပ်နှံမှု အစမ်းကြည့်ရန် — Burmese Learners Hub');
    $('confirmed-course-title').textContent = translate(course.en, course.my);
    $('confirmed-course-description').textContent = translate(...course.description);
    document.querySelector('.confirmed-course-stats strong').textContent = translate(`${lessonCounts[courseId]} Lessons`, `သင်ခန်းစာ ${lessonCounts[courseId]} ခု`);
    if (courseId !== 'react') {
      document.querySelectorAll('.confirmed-course-stats strong')[1].textContent = translate('Practical Projects', 'လက်တွေ့ Project များ');
      document.querySelector('.confirmed-module>b').textContent = translate('Course foundations & your first steps', 'သင်တန်း အခြေခံနှင့် ပထမအဆင့်များ');
      document.querySelector('.confirmed-module>div:first-child>span').textContent = translate('Free preview', 'အခမဲ့ အစမ်း');
    }
    $('confirmed-state-badge').textContent = record ? translate('✓ Demo enrollment saved on this device', '✓ ဤစက်တွင် အစမ်းအပ်နှံမှု သိမ်းပြီးပါပြီ') : translate('Demo enrollment preview · No payment', 'အစမ်း အပ်နှံမှု ပုံစံ · ငွေပေးချေမှုမရှိ');
    $('confirmed-title').textContent = record ? translate('Your Demo Enrollment Is Ready!', 'သင်၏ အစမ်းအပ်နှံမှု အဆင်သင့်ဖြစ်ပါပြီ!') : translate('Explore Your Enrollment Preview!', 'သင်တန်းအပ်နှံမှု ပုံစံကို စမ်းကြည့်ပါ!');
    $('confirmed-intro').textContent = record ? translate(`Your demo for ${course.en} has been saved in this browser. No payment was collected or verified, and no live course enrollment was created.`, `${course.my} အတွက် အစမ်းအပ်နှံမှုကို ဤ browser တွင် သိမ်းပြီးပါပြီ။ ငွေလက်ခံခြင်း၊ စစ်ဆေးခြင်းနှင့် တကယ့်သင်တန်းအပ်နှံခြင်း မပြုလုပ်ပါ။`) : translate(`Explore ${course.en} and the next steps for your learning journey. This preview does not confirm a payment or a live course enrollment.`, `${course.my} နှင့် ဆက်လက်လေ့လာရန် အဆင့်များကို စမ်းကြည့်ပါ။ ဤအစမ်းပုံစံသည် ငွေပေးချေမှု သို့မဟုတ် တကယ့်သင်တန်းအပ်နှံမှု အတည်ပြုချက် မဟုတ်ပါ။`);
    $('confirmed-order').textContent = record ? record.orderId.slice(0, 50) : translate('PREVIEW', 'အစမ်းကြည့်');
    $('confirmed-reference').textContent = record && typeof record.reference === 'string' ? record.reference.slice(0, 80) : '—';
    $('confirmed-date').textContent = record ? new Date(record.createdAt).toLocaleDateString(window.BLH?.language === 'my' ? 'my-MM' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
    $('confirmed-status').textContent = record ? translate('Demo saved · No payment', 'အစမ်း သိမ်းပြီး · ငွေမပေးချေပါ') : translate('Preview only', 'အစမ်းကြည့်ရန်သာ');
    $('confirmed-create-demo').hidden = Boolean(record);
    $('confirmed-course-image').alt = translate('Course welcome screen preview', 'သင်တန်း ကြိုဆိုစာမျက်နှာ အစမ်းပုံ');
    if (feedbackKey === 'summary') $('confirmed-feedback').textContent = translate('Your demo summary download is ready. It is not a receipt or proof of payment.', 'အစမ်းအကျဉ်းချုပ် ဒေါင်းလုဒ် အဆင်သင့်ဖြစ်ပါပြီ။ ဤဖိုင်သည် ပြေစာ သို့မဟုတ် ငွေပေးချေမှု သက်သေ မဟုတ်ပါ။');
    if (feedbackKey === 'calendar') $('confirmed-feedback').textContent = translate('Your personal study reminder is ready. This is not a scheduled live class.', 'ကိုယ်ပိုင်လေ့လာချိန် သတိပေးဖိုင် အဆင်သင့်ဖြစ်ပါပြီ။ တိုက်ရိုက်သင်တန်း အချိန်ဇယား မဟုတ်ပါ။');
  }
  function download(content, type, filename) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const link = document.createElement('a'); link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  $('confirmed-download').addEventListener('click', () => {
    const lines = [translate('BURMESE LEARNERS HUB — DEMO ENROLLMENT SUMMARY', 'BURMESE LEARNERS HUB — အစမ်းအပ်နှံမှု အကျဉ်းချုပ်'), '', translate('DEMO ONLY. This is not an invoice, payment receipt, proof of payment, student credential, or real enrollment.', 'အစမ်းပုံစံသာ။ ဤဖိုင်သည် တရားဝင်ငွေတောင်းခံလွှာ၊ ပြေစာ၊ ငွေပေးချေမှုသက်သေ၊ ကျောင်းသားအထောက်အထား သို့မဟုတ် တကယ့်အပ်နှံမှု မဟုတ်ပါ။'), '', `${translate('Course', 'သင်တန်း')}: ${translate(course.en, course.my)}`, `${translate('Course price (preview)', 'သင်တန်းဈေးနှုန်း (အစမ်း)')}: ${amount(course.price)}`, `${translate('Payment collected', 'လက်ခံသည့်ငွေ')}: 0 MMK`, `${translate('Status', 'အခြေအနေ')}: ${record ? translate('Saved local demo', 'ဤစက်တွင် သိမ်းထားသည့် အစမ်း') : translate('Preview only; no local enrollment', 'အစမ်းသာ၊ ဤစက်တွင် အပ်နှံမှု မရှိပါ')}`];
    if (record) lines.push(`${translate('Demo order', 'အစမ်းနံပါတ်')}: ${record.orderId.slice(0, 50)}`, `${translate('Demo reference', 'အစမ်း ရည်ညွှန်းနံပါတ်')}: ${String(record.reference || '').slice(0, 80)}`, `${translate('Saved date', 'သိမ်းသည့်ရက်')}: ${new Date(record.createdAt).toISOString()}`);
    lines.push('', translate('No payment was processed or verified. No email was sent. This summary was generated on your device.', 'ငွေပေးချေမှု လုပ်ဆောင်ခြင်း၊ စစ်ဆေးခြင်း မရှိပါ။ အီးမေးလ် မပို့ပါ။ ဤအကျဉ်းချုပ်ကို သင့်စက်တွင်သာ ထုတ်ပေးခြင်းဖြစ်ပါသည်။'));
    download(`\uFEFF${lines.join('\n')}`, 'text/plain;charset=utf-8', `Burma-Learners-DEMO-${courseId}.txt`); feedbackKey = 'summary'; render();
  });
  $('confirmed-calendar').addEventListener('click', () => {
    const start = new Date(); start.setDate(start.getDate() + 1); start.setHours(19, 0, 0, 0);
    const end = new Date(start.getTime() + 45 * 60 * 1000);
    const stamp = (date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
    const escape = (value) => value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
    const calendar = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Burmese Learners Hub//Personal Demo Reminder//EN', 'BEGIN:VEVENT', `UID:blh-personal-${Date.now()}@local.demo`, `DTSTAMP:${stamp(new Date())}`, `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`, `SUMMARY:${escape(translate('Personal study time — Burmese Learners Hub', 'ကိုယ်ပိုင်လေ့လာချိန် — Burmese Learners Hub'))}`, `DESCRIPTION:${escape(translate('Personal study reminder for the demo lesson preview. This is not a live class booking.', 'အစမ်းသင်ခန်းစာ လေ့လာရန် ကိုယ်ပိုင်သတိပေးချက်။ တိုက်ရိုက်သင်တန်း ချိန်းဆိုမှု မဟုတ်ပါ။'))}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    download(calendar, 'text/calendar;charset=utf-8', 'Burma-Learners-Personal-Study.ics'); feedbackKey = 'calendar'; render();
  });
  window.addEventListener('blh:preferences', render);
  render();
})();
