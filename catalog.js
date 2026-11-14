(() => {
  'use strict';
  const t = (en, my) => window.BLH ? window.BLH.t(en, my) : en;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const courses = [
    {id:'react',title:['Full-Stack Web Development with React & Node','React နှင့် Node ဖြင့် Full-Stack Web Development'],description:['Modern JavaScript (ES6+), React hooks, Next.js, Node.js API architecture, and PostgreSQL.','Modern JavaScript၊ React hooks၊ Next.js၊ Node.js API တည်ဆောက်ပုံနှင့် PostgreSQL ကို လေ့လာပါ။'],category:'web',tag:['</> Development','</> Web Development'],image:'assets/platform/asset-952e287873f31e42.jpg',hours:38,lessons:64,teacher:'Sayar Min Thant',role:['Senior Lead Architect','အကြီးတန်း Architect'],avatar:'MT',color:'green',price:300000,rating:4.9,reviews:1420,levels:['beginner','intermediate'],formats:['self','live','mentor'],medium:['my','en']},
    {id:'figma',title:['UI/UX Design Masterclass (Figma to Launch)','UI/UX Design Masterclass (Figma မှ Launch အထိ)'],description:['Design systems, typography tokens, auto-layout components, user testing, and interactive prototypes.','Design system၊ typography၊ auto-layout၊ user testing နှင့် prototype များ လက်တွေ့တည်ဆောက်ပါ။'],category:'design',tag:['✦ Product Design','✦ Product Design'],image:'assets/platform/asset-e4a0f02564b61a8d.jpg',hours:26,lessons:48,teacher:'Ei Wai Phyo',role:['Staff Product Designer','အကြီးတန်း Product Designer'],avatar:'EW',color:'blue',price:220000,rating:5,reviews:910,levels:['beginner','intermediate'],formats:['self','live'],medium:['my','en']},
    {id:'marketing',title:['Digital Marketing & AI Automation Suite','Digital Marketing နှင့် AI Automation'],description:['Customer acquisition, Facebook & Google Performance Max, SEO strategies, and AI-powered automation.','ဖောက်သည်ရှာဖွေမှု၊ Facebook နှင့် Google ကြော်ငြာ၊ SEO နှင့် AI automation ကို လေ့လာပါ။'],category:'marketing',tag:['↗ Growth & AI','↗ Growth & AI'],image:'assets/platform/asset-91af2785eae72530.jpg',hours:20,lessons:32,teacher:'Ko Zaw Myo',role:['Growth Director','Growth Director'],avatar:'KZ',color:'amber',price:180000,rating:4.8,reviews:512,levels:['beginner'],formats:['self','live'],medium:['my']},
    {id:'flutter',title:['Flutter & Mobile Architecture with Firebase','Flutter နှင့် Firebase ဖြင့် Mobile App တည်ဆောက်ခြင်း'],description:['State management using Bloc & Riverpod, real-time messaging, local caching, and mobile deployment.','Bloc နှင့် Riverpod state management၊ အချိန်နှင့်တစ်ပြေးညီ messaging၊ local cache နှင့် mobile deployment တို့ကို လေ့လာပါ။'],category:'web',tag:['▣ Mobile Dev','▣ Mobile Dev'],image:'assets/platform/asset-67896d07a627a5fc.jpg',hours:34,lessons:52,teacher:'Sayar Htet Aung',role:['Mobile Lead Architect','Mobile Lead Architect'],avatar:'HA',color:'teal',price:280000,rating:4.9,reviews:780,levels:['intermediate'],formats:['self','mentor'],medium:['my','en']},
    {id:'python',title:['Python, Data Analytics & Practical Machine Learning','Python၊ Data Analytics နှင့် လက်တွေ့ Machine Learning'],description:['Pandas, Scikit-Learn, PyTorch neural networks, deep visual storytelling, and practical data projects.','Pandas၊ Scikit-Learn၊ PyTorch neural network များ၊ data visualization နှင့် လက်တွေ့ data project များ။'],category:'ai',tag:['♧ Data Science','♧ Data Science'],image:'assets/platform/asset-35f90f2150ab7ea3.jpg',hours:42,lessons:70,teacher:'Dr. Thet Naing',role:['AI Researcher','AI သုတေသီ'],avatar:'TN',color:'purple',price:320000,rating:4.9,reviews:630,levels:['beginner','intermediate','advanced'],formats:['self','mentor'],medium:['my','en']},
    {id:'cloud',title:['Cloud Architecture with AWS & Docker','AWS နှင့် Docker ဖြင့် Cloud Architecture'],description:['AWS EC2, S3, Docker containers, Kubernetes cluster management, and production-ready deployments.','AWS EC2၊ S3၊ Docker container၊ Kubernetes cluster စီမံခန့်ခွဲမှုနှင့် deployment များကို လေ့လာပါ။'],category:'cloud',tag:['☁ Cloud & DevOps','☁ Cloud & DevOps'],image:'assets/platform/asset-606b4c3b18aed0cf.jpg',hours:24,lessons:36,teacher:'Ko Aung Kyaw',role:['DevOps Architect','DevOps Architect'],avatar:'AK',color:'sky',price:250000,rating:4.9,reviews:490,levels:['intermediate','advanced'],formats:['self'],medium:['my','en']}
  ];
  const categories = [ ['all','All Specializations','အထူးပြုဘာသာ အားလုံး'],['web','Web & App Dev','Web နှင့် App'],['design','Product & UI/UX','Product နှင့် UI/UX'],['ai','AI & Data Science','AI နှင့် Data Science'],['cloud','Cloud & DevOps','Cloud နှင့် DevOps'],['marketing','Growth & Marketing','Growth နှင့် Marketing'] ];
  const form = document.getElementById('catalog-filter-form');
  const filterDisclosure = document.querySelector('.catalog-filter-disclosure');
  const mobileFilters = window.matchMedia('(max-width: 680px)');
  let mobileFiltersOpen = false;
  let wasMobile = mobileFilters.matches;
  filterDisclosure.open = !wasMobile;
  const syncFilterDisclosure = () => {
    if (wasMobile) mobileFiltersOpen = filterDisclosure.open;
    wasMobile = mobileFilters.matches;
    filterDisclosure.open = !wasMobile || mobileFiltersOpen;
  };
  filterDisclosure.addEventListener('toggle', () => { if (mobileFilters.matches) mobileFiltersOpen = filterDisclosure.open; });
  mobileFilters.addEventListener('change', syncFilterDisclosure);
  const search = document.getElementById('catalog-search');
  const grid = document.getElementById('catalog-grid');
  let category = 'all';
  const pick = name => [...form.querySelectorAll(`input[name="${name}"]:checked`)].map(input => input.value);
  function renderCategories() {
    document.getElementById('catalog-categories').innerHTML = categories.map(([id,en,my]) => `<button type="button" data-category="${id}" aria-pressed="${category===id}">${escape(t(en,my))} (${id==='all'?courses.length:courses.filter(course=>course.category===id).length})</button>`).join('');
  }
  function card(course) {
    const title = t(...course.title), titleEscaped = escape(title), query = `?course=${course.id}`;
    return `<article class="catalog-card" data-color="${course.color}"><a class="catalog-card-picture" href="course.html${query}" aria-label="${escape(t('Explore '+course.title[0],course.title[1]+' ကို ကြည့်ရန်'))}"><img src="${course.image}" alt="${titleEscaped}" width="512" height="279" loading="lazy"><span class="catalog-card-badge">● ${escape(t('3 Free Modules Available','အခန်း ၃ ခန်း အခမဲ့'))}</span><span class="catalog-card-play" aria-hidden="true">▶</span></a><div class="catalog-card-content"><div class="catalog-card-category"><span>${escape(t(...course.tag))}</span><small>${course.hours} ${escape(t('Hours','နာရီ'))} •<br>${course.lessons} ${escape(t('Lessons','သင်ခန်းစာ'))}</small></div><h3><a href="course.html${query}">${titleEscaped}</a></h3><p class="catalog-card-description">${escape(t(...course.description))}</p><div class="catalog-card-instructor"><span class="catalog-avatar" style="background:${({green:'#059669',blue:'#2563eb',amber:'#d97706',teal:'#0d9488',purple:'#9333ea',sky:'#0284c7'})[course.color]}">${course.avatar}</span><div><strong>${course.teacher}</strong><small>${escape(t(...course.role))}</small></div><span class="catalog-card-rating">★ ${course.rating.toFixed(1)} <small>(${course.reviews.toLocaleString('en-US')})</small></span></div><div class="catalog-card-price"><small class="catalog-card-wallet">▣ KBZPay / Wave</small><span>${escape(t('COURSE FEE','သင်တန်းကြေး'))}</span><strong>${course.price.toLocaleString('en-US')} ${escape(t('MMK','ကျပ်'))}</strong></div><div class="catalog-card-actions"><a href="course.html${query}">◎ ${escape(t('Preview','အစမ်းကြည့်မည်'))}</a><a href="payment.html${query}">${escape(t('Enroll Now','အပ်နှံမည်'))} →</a></div></div></article>`;
  }
  function render() {
    const formats=pick('format'), levels=pick('level'), media=pick('medium');
    const price=form.querySelector('input[name="price"]:checked')?.value||'all';
    const term=search.value.trim().toLocaleLowerCase();
    const results=courses.filter(course=>(category==='all'||course.category===category)&&(!formats.length||formats.some(value=>course.formats.includes(value)))&&(!levels.length||levels.some(value=>course.levels.includes(value)))&&(!media.length||media.some(value=>course.medium.includes(value)))&&(price==='all'||(price==='under200'&&course.price<200000)||(price==='200to300'&&course.price>=200000&&course.price<=300000)||(price==='over300'&&course.price>300000))&&(!term||[...course.title,...course.description,course.teacher,course.id].join(' ').toLocaleLowerCase().includes(term)));
    const sort=document.getElementById('catalog-sort').value;
    if(sort==='rating')results.sort((a,b)=>b.rating-a.rating||b.reviews-a.reviews);
    if(sort==='price-low')results.sort((a,b)=>a.price-b.price);
    if(sort==='price-high')results.sort((a,b)=>b.price-a.price);
    grid.innerHTML=results.map(card).join('');
    document.getElementById('catalog-result-count').textContent=t(`Available Courses (${results.length})`,`သင်တန်းများ (${results.length})`);
    document.getElementById('catalog-empty').hidden=results.length!==0;
    renderCategories();
  }
  document.getElementById('catalog-categories').addEventListener('click',event=>{const button=event.target.closest('[data-category]');if(button){category=button.dataset.category;render();}});
  form.addEventListener('change',render);
  form.addEventListener('reset',()=>{category='all';search.value='';document.getElementById('catalog-sort').value='recommended';setTimeout(render,0);});
  document.getElementById('catalog-reset-empty').addEventListener('click',()=>form.reset());
  search.addEventListener('input',render);
  document.getElementById('catalog-sort').addEventListener('change',render);
  document.getElementById('catalog-search-form').addEventListener('submit',event=>{event.preventDefault();render();document.querySelector('.catalog-results-heading').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});});
  document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();search.focus();}});
  window.addEventListener('blh:preferences',()=>{render();window.BLH?.applyTranslations(document);});
  render();window.BLH?.applyTranslations(document);
})();
