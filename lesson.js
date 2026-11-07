(() => {
  'use strict';
  const root = document.getElementById('lesson-root');
  if (!root) return;
  const t = (en, my) => window.BLH?.t(en, my) ?? en;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const tr = (en, my) => `<span data-en="${esc(en)}" data-my="${esc(my)}">${esc(t(en,my))}</span>`;
  const icon = (name) => {
    const paths = {note:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h4M9 12h6M9 16h6"/>',code:'<rect x="3" y="4" width="18" height="16" rx="1"/><path d="m7 9 3 3-3 3m6 0h4"/>',chat:'<path d="M3 4h18v13H8l-5 4zM7 8h10M7 12h7"/>',folder:'<path d="M3 7V4h7l2 3h9l-3 13H3zM3 10h17"/>',search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',download:'<path d="M12 3v13m-5-5 5 5 5-5M4 17v4h16v-4"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v5m10-5v5M3 11h18m-14 4h2m3 0h2m3 0h1"/>'};
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.note}</svg>`;
  };
  const lessons = [
    {id:'2-1',number:'2.1',en:'Virtual DOM & Fiber Engine',my:'Virtual DOM နှင့် Fiber Engine',duration:'32:00',mins:32},
    {id:'2-2',number:'2.2',en:'Hooks Mastery: useState, useEffect, useRef and useMemo Pitfalls',my:'Hooks ကျွမ်းကျင်မှု — useState၊ useEffect၊ useRef နှင့် useMemo',duration:'38:45',mins:39},
    {id:'2-3',number:'2.3',en:'Modern Global State with Zustand',my:'Zustand ဖြင့် Global State စီမံခြင်း',duration:'44:00',mins:44}
  ];
  const progressKey = 'blh-course-fullstack-progress';
  let completed = [];
  try { const saved = JSON.parse(localStorage.getItem(progressKey) || '[]'); if(Array.isArray(saved)) completed = saved.filter(id => lessons.some(l => l.id === id)); } catch (_) { /* Browser storage may be unavailable. */ }
  const params = new URLSearchParams(location.search);
  const requestedLesson = params.get('lesson');
  let selected = lessons.find(l => l.id === requestedLesson) || lessons[1];
  let activeTab = 'overview';
  let status = '';
  let questionStatus = '';
  const starter = `import { useEffect, useState } from 'react';\n\n// Complete the hook: cancel obsolete requests and retain a cached result.\nexport function useBatchCourses(endpoint) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const controller = new AbortController();\n    let active = true;\n\n    async function load() {\n      try {\n        setLoading(true);\n        const response = await fetch(endpoint, { signal: controller.signal });\n        if (!response.ok) throw new Error('Request failed');\n        const result = await response.json();\n        if (active) {\n          setData(result);\n          // TODO: cache the result with a timestamp.\n        }\n      } catch (err) {\n        if (active && err.name !== 'AbortError') {\n          setError(err);\n          // TODO: restore a valid cached result when offline.\n        }\n      } finally {\n        if (active) setLoading(false);\n      }\n    }\n\n    load();\n    return () => {\n      active = false;\n      controller.abort();\n    };\n  }, [endpoint]);\n\n  return { data, loading, error };\n}\n`;
  const production = `useEffect(() => {\n  const abortCtrl = new AbortController();\n\n  async function fetchStudentAssignments() {\n    try {\n      const res = await fetch('/api/v1/batches/5/lessons', {\n        signal: abortCtrl.signal\n      });\n      if (!res.ok) throw new Error('Request failed');\n      const data = await res.json();\n      setBatchLessons(data);\n    } catch (err) {\n      // An intentional cancellation is not a network error.\n      if (err.name !== 'AbortError') notifyError(err);\n    }\n  }\n\n  fetchStudentAssignments();\n  return () => abortCtrl.abort();\n}, []);`;
  const preview = `<span class="syntax-purple">import</span> { useState, useEffect } <span class="syntax-purple">from</span> <span class="syntax-teal">'react'</span>;

<span class="syntax-comment">// Sayar Min Thant: AbortController cleanup prevents memory leaks</span>
<span class="syntax-blue">export function</span> <span class="syntax-yellow">useBatchCourses</span>(endpoint: <span class="syntax-teal">string</span>) {
  <span class="syntax-blue">const</span> [data, setData] = <span class="syntax-yellow">useState</span>&lt;<span class="syntax-teal">any</span>&gt;(<span class="syntax-yellow">null</span>);
  <span class="syntax-blue">const</span> [loading, setLoading] = <span class="syntax-yellow">useState</span>(<span class="syntax-yellow">true</span>);

  <span class="syntax-yellow">useEffect</span>(() =&gt; {
    <span class="syntax-blue">const</span> controller = <span class="syntax-blue">new</span> <span class="syntax-yellow">AbortController</span>();
    <span class="syntax-yellow">fetch</span>(endpoint, { signal: controller.signal })
      .then(res =&gt; res.json())
      .then(d =&gt; { setData(d); setLoading(<span class="syntax-yellow">false</span>); })
      .catch(err =&gt; { <span class="syntax-purple">if</span> (err.name !== <span class="syntax-teal">'AbortError'</span>) console.error(err); });
    <span class="syntax-purple">return</span> () =&gt; controller.<span class="syntax-yellow">abort</span>(); <span class="syntax-comment">// Memory teardown</span>
  }, [endpoint]);
  <span class="syntax-purple">return</span> { data, loading };
}`;

  root.innerHTML = `<div class="lesson-wrap">
    <div class="lesson-bandwidth"><div class="lesson-bandwidth-copy"><i aria-hidden="true">ϟ</i><span><strong>${tr('Low-Bandwidth Learning:','ဒေတာအသုံးနည်းသော သင်ယူမှု —')}</strong> ${tr('Written lessons and offline starter files, ready for Myanmar learners.','မြန်မာသင်ယူသူများအတွက် စာဖြင့်သင်ခန်းစာနှင့် အော့ဖ်လိုင်းလေ့ကျင့်ဖိုင်များ။')}</span></div><div class="lesson-bandwidth-actions"><span class="lesson-chip">${tr('Text-first preview','စာဖြင့် အစမ်းလေ့လာရန်')}</span><button type="button" class="lesson-text-button" data-action="transcript">${tr('Read Transcript','သင်ခန်းစာစာသားဖတ်ရန်')} ♧</button></div></div>
    <div class="lesson-columns"><div class="lesson-primary">
      <section class="lesson-player" aria-label="Lesson code preview" data-label-en="Lesson code preview" data-label-my="သင်ခန်းစာ ကုဒ်အကြိုကြည့်ရှုမှု"><div class="lesson-player-top"><strong id="lesson-player-title"><b>MODULE 2.2</b> / React useEffect &amp; AbortController</strong><span class="lesson-player-tag">${tr('CODE PREVIEW · TypeScript 5.4','ကုဒ်အကြိုကြည့်ရန် · TypeScript 5.4')}</span></div><pre id="lesson-preview-code" aria-label="React code example">${preview}</pre><div class="lesson-instructor-video"><img src="assets/platform/asset-62b02b353ec15e8e.jpg" alt="Sayar Min Thant teaching at his desk" loading="eager"><span>Sayar Min Thant</span></div><div class="lesson-player-bottom"><div class="lesson-progress-decoration" aria-hidden="true"><i></i></div><div class="lesson-player-controls"><button type="button" data-action="transcript">▷ ${tr('Read lesson transcript','သင်ခန်းစာစာသားဖတ်ရန်')}</button><span>${tr('Design preview • Video is not hosted','ဒီဇိုင်းအကြိုကြည့်မှု • ဗီဒီယို မတင်ထားပါ')}</span><button type="button" data-action="practice">&lt;/&gt; ${tr('Code','ကုဒ်')}</button></div></div></section>
      <section class="lesson-meta lesson-card"><div class="lesson-meta-eyebrow"><span class="lesson-pill">REACT 18 ARCHITECTURE</span> • <span id="lesson-position"></span></div><div class="lesson-exercise-badge">${tr('Includes Code Exercise','ကုဒ်လေ့ကျင့်ခန်း ပါဝင်သည်')}</div><div class="lesson-meta-heading"><h1 id="lesson-title"></h1><div class="lesson-meta-actions"><button class="lesson-small-button" type="button" data-action="complete" id="lesson-complete"></button><button class="lesson-small-button is-green" type="button" data-action="next">${tr('Next Lesson','နောက်သင်ခန်းစာ')} →</button></div></div><div class="lesson-author"><img src="assets/platform/asset-49834627bb49bb66.jpg" alt="Sayar Min Thant"> <span>${tr('Taught by','သင်ကြားသူ')} <strong>Sayar Min Thant</strong> ${tr('(Lead Architect)','(Lead Architect)')}</span><span>•</span><span>${tr('Updated Oct 2024','နောက်ဆုံးပြင်ဆင်မှု — အောက်တိုဘာ ၂၀၂၄')}</span></div><p id="lesson-completion-note" class="lesson-completion-note" role="status"></p></section>
      <section class="lesson-content lesson-card"><div class="lesson-tabs" role="tablist" aria-label="Lesson sections" data-label-en="Lesson sections" data-label-my="သင်ခန်းစာကဏ္ဍများ">
        <button class="lesson-tab" id="lesson-tab-overview" role="tab" aria-selected="true" aria-controls="lesson-panel-overview" data-tab="overview">${icon('note')}${tr('Lesson Overview & Notes','အနှစ်ချုပ်နှင့် မှတ်စု')}</button>
        <button class="lesson-tab" id="lesson-tab-practice" role="tab" aria-selected="false" aria-controls="lesson-panel-practice" data-tab="practice" tabindex="-1">${icon('code')}${tr('Live Sandbox','ကုဒ်လေ့ကျင့်ရန်')} <span class="lesson-chip">${tr('Local','စက်တွင်း')}</span></button>
        <button class="lesson-tab" id="lesson-tab-discussion" role="tab" aria-selected="false" aria-controls="lesson-panel-discussion" data-tab="discussion" tabindex="-1">${icon('chat')}${tr('Q&A Discussion','မေးခွန်းနှင့် ဆွေးနွေးမှု')}</button>
        <button class="lesson-tab" id="lesson-tab-resources" role="tab" aria-selected="false" aria-controls="lesson-panel-resources" data-tab="resources" tabindex="-1">${icon('folder')}${tr('Batch Resources','အထောက်အကူဖိုင်များ')}</button>
      </div><div class="lesson-panel" id="lesson-panel-overview" role="tabpanel" aria-labelledby="lesson-tab-overview" tabindex="0">
        <div class="lesson-takeaways"><h2>♧ ${tr('Core Takeaways for Myanmar Developers','မြန်မာ Developer များအတွက် အဓိကမှတ်သားစရာများ')}</h2><div id="lesson-takeaways"></div></div>
        <div class="lesson-section-title"><h2>${tr('Recommended Production Pattern','လုပ်ငန်းခွင်အတွက် သင့်တော်သော ကုဒ်ပုံစံ')}</h2><button type="button" class="lesson-text-button" data-action="copy">♧ ${tr('Copy Snippet','ကုဒ်ကူးရန်')}</button></div><pre class="lesson-code" id="lesson-production"></pre>
        <details class="lesson-transcript" id="lesson-transcript"><summary>${tr('Read the lesson transcript','သင်ခန်းစာစာသား အပြည့်အစုံဖတ်ရန်')}</summary><div id="lesson-transcript-content"></div></details>
        <div class="lesson-question"><div class="lesson-question-heading"><strong>ⓘ ${tr('Stuck on this topic?','ဒီအကြောင်းအရာကို မရှင်းလင်းသေးဘူးလား?')} <code>useEffect</code></strong><span>${tr('Save a question for later','နောက်မှမေးရန် မေးခွန်းမှတ်ထားပါ')}</span></div><form id="lesson-question-form" class="lesson-question-input"><label class="sr-only" for="lesson-question">${tr('Your question','သင့်မေးခွန်း')}</label><input id="lesson-question" maxlength="1000" placeholder="Ask your question about AbortController in Burmese or English..." data-placeholder-en="Ask your question about AbortController in Burmese or English..." data-placeholder-my="AbortController အကြောင်း မေးခွန်းကို မြန်မာ/အင်္ဂလိပ်ဖြင့် ရေးပါ..."><button type="submit">${tr('Save Question','မေးခွန်းသိမ်းရန်')}</button></form><p id="lesson-question-status" class="lesson-status" role="status"></p></div>
        <div class="lesson-downloads"><h2>${tr('Downloadable Module Assets','ဒေါင်းလုဒ်ယူနိုင်သော သင်ခန်းစာဖိုင်များ')}</h2><div class="lesson-download-grid">${downloadMarkup()}</div></div>
        <div id="lesson-assignment-slot"></div>
      </div>
      <div class="lesson-panel lesson-simple-panel" id="lesson-panel-practice" role="tabpanel" aria-labelledby="lesson-tab-practice" tabindex="0" hidden><h2>${tr('Practice the cleanup pattern','Cleanup ပုံစံကို လေ့ကျင့်ပါ')}</h2><p>${tr('Edit the starter code in this local editor. Download it to run in your React project; this page does not execute code or connect to a server.','ဤစက်တွင်း editor တွင် starter ကုဒ်ကို ပြင်ဆင်ပါ။ မိမိ React project တွင် run ရန် ဖိုင်ကို ဒေါင်းလုဒ်ယူပါ။ ဤစာမျက်နှာက ကုဒ် run ခြင်း၊ ဆာဗာချိတ်ဆက်ခြင်း မလုပ်ပါ။')}</p><label class="sr-only" for="lesson-editor">${tr('React hook practice code','React hook လေ့ကျင့်ကုဒ်')}</label><textarea class="lesson-editor" id="lesson-editor" spellcheck="false"></textarea><button class="lesson-small-button is-green" type="button" data-action="download-editor">${icon('download')}${tr('Download My Code','မိမိကုဒ် ဒေါင်းလုဒ်ယူရန်')}</button></div>
      <div class="lesson-panel lesson-simple-panel" id="lesson-panel-discussion" role="tabpanel" aria-labelledby="lesson-tab-discussion" tabindex="0" hidden><h2>${tr('Questions worth discussing','ဆွေးနွေးသင့်သော မေးခွန်းများ')}</h2><div class="lesson-discussion-note"><strong>${tr('Why check for AbortError?','AbortError ကို ဘာကြောင့် စစ်ရသလဲ?')}</strong><p>${tr('Cancelling a request is expected when a component unmounts or its input changes. Treating it as a real failure causes an unnecessary error message. Show your fallback only for other errors.','Component ပျောက်သွားသောအခါ၊ input ပြောင်းသောအခါ request ဖျက်ခြင်းသည် ပုံမှန်လုပ်ဆောင်မှုဖြစ်သည်။ ၎င်းကို အမှားအဖြစ် သတ်မှတ်လျှင် မလိုအပ်သော error message ပေါ်မည်။ အခြားအမှားများအတွက်သာ fallback ပြပါ။')}</p></div><p style="margin-top:16px">${tr('This is a reading example. Questions saved on this page remain in this browser; they are not sent to an instructor. Visit the community page to explore the study spaces.','ဤသည်မှာ ဖတ်ရှုလေ့လာရန် ဥပမာဖြစ်သည်။ ဤစာမျက်နှာတွင် သိမ်းသောမေးခွန်းများသည် ဤ browser တွင်သာ ရှိပြီး ဆရာထံ မပို့ပါ။ လေ့လာရေးအဖွဲ့များကို Community စာမျက်နှာတွင် ကြည့်ပါ။')}</p><a class="lesson-small-button is-green" href="community.html">${tr('Explore Community','Community ကို ကြည့်ရန်')} →</a></div>
      <div class="lesson-panel lesson-simple-panel" id="lesson-panel-resources" role="tabpanel" aria-labelledby="lesson-tab-resources" tabindex="0" hidden><h2>${tr('Keep Learning Offline','အော့ဖ်လိုင်း ဆက်လေ့လာပါ')}</h2><p>${tr('These real, small text files are generated in your browser. The JavaScript starter includes TODOs for caching; the cheat sheet summarizes cleanup, dependencies, and cancellation.','ဤဖိုင်ငယ်များကို browser ထဲတွင် ဖန်တီးပေးသည်။ JavaScript starter တွင် caching လေ့ကျင့်ရန် TODO များ ပါဝင်ပြီး မှတ်စုဖိုင်က cleanup၊ dependencies နှင့် cancellation အကြောင်း အနှစ်ချုပ်ပေးထားသည်။')}</p><div class="lesson-download-grid">${downloadMarkup()}</div><a class="lesson-small-button" style="margin-top:20px" href="assignment.html#assignment-brief">${tr('Open Module 2 Assignment','Module 2 လေ့ကျင့်ခန်းဖွင့်ရန်')} →</a></div>
      </section></div>
      <aside class="lesson-sidebar"><section class="lesson-syllabus lesson-card"><div class="lesson-syllabus-header"><div class="lesson-syllabus-title"><h2>${tr('Course Syllabus','သင်ရိုးညွှန်းတမ်း')}</h2><span>${tr('Batch #5','အတန်းစဉ် #၅')}</span></div><p>${tr('64 Lessons • 38 Total Hours','သင်ခန်းစာ ၆၄ ခု • စုစုပေါင်း ၃၈ နာရီ')}</p><label class="lesson-search">${icon('search')}<span class="sr-only">${tr('Search lessons','သင်ခန်းစာရှာရန်')}</span><input id="lesson-search" type="search" data-placeholder-en="Search lesson or code keyword..." data-placeholder-my="သင်ခန်းစာ သို့မဟုတ် ကုဒ်စာလုံး ရှာရန်..." placeholder="Search lesson or code keyword..."></label></div><div class="lesson-module is-complete"><strong>✓ ${tr('Module 1: Modern JS & Async','Module 1: Modern JS နှင့် Async')}</strong><span>${tr('Course Preview','သင်တန်းအကြိုကြည့်မှု')}</span></div><div class="lesson-module is-active"><strong>● ${tr('Module 2: React Core & Hooks','Module 2: React အခြေခံနှင့် Hooks')}</strong><span id="lesson-module-progress"></span></div><div id="lesson-list"></div><a class="lesson-row assignment-link" href="assignment.html#assignment-brief"><i>♧</i><span><strong>${tr('2.4 Project 1 Review & Pull Request','2.4 Project 1 သုံးသပ်မှုနှင့် Pull Request')}</strong><small>${tr('Module milestone assignment','Module ပြီးမြောက် လေ့ကျင့်ခန်း')}</small></span></a><div class="lesson-module"><strong>${tr('Module 3: Next.js 14 App Router','Module 3: Next.js 14 App Router')}</strong><span>${tr('6 Lessons','သင်ခန်းစာ ၆ ခု')}</span></div><div class="lesson-module"><strong>${tr('Module 4: Node.js & PostgreSQL APIs','Module 4: Node.js နှင့် PostgreSQL APIs')}</strong><span>${tr('8 Lessons','သင်ခန်းစာ ၈ ခု')}</span></div><div class="lesson-syllabus-bottom"><span id="lesson-progress-label"></span><div class="lesson-progress" role="progressbar" aria-valuemin="0" aria-valuemax="3" aria-label="Preview lesson progress" id="lesson-progressbar"><i id="lesson-progress-fill"></i></div></div></section>
      <section class="lesson-peers lesson-card"><div class="lesson-syllabus-title"><h2>● ${tr('Batch #5 Learning Community','အတန်းစဉ် #၅ လေ့လာရေးအဖွဲ့')}</h2><span>${tr('Preview','အကြိုကြည့်ရန်')}</span></div><p>${tr('Learn alongside peers in Yangon, Mandalay, and remote hubs. Explore the study spaces and community guidelines.','ရန်ကုန်၊ မန္တလေးနှင့် အခြားဒေသများမှ မိတ်ဆွေများနှင့် လေ့လာနိုင်ရန် Study spaces နှင့် Community လမ်းညွှန်များကို ကြည့်ပါ။')}</p><div class="lesson-avatars"><img src="assets/platform/asset-f3b8f53fe1d7ddf9.jpg" alt="" loading="lazy"><img src="assets/platform/asset-c3133bff2466bdcb.jpg" alt="" loading="lazy"><img src="assets/platform/asset-93f7ae813f026a13.jpg" alt="" loading="lazy"><img src="assets/platform/asset-16e80218a56b2004.jpg" alt="" loading="lazy"><b>+144</b><span>${tr('Sample community','Community နမူနာ')}</span></div><div class="lesson-peer-actions"><a href="community.html#discussion-hubs">♧ ${tr('Telegram Hub','Telegram ဆွေးနွေးခန်း')}</a><a href="community.html#discussion-hubs">▱ ${tr('Viber Group','Viber အဖွဲ့')}</a></div></section>
      <section class="lesson-office"><span>${icon('calendar')}${tr('OFFICE HOURS','အကြံဉာဏ်ရယူရန်')}</span><h2>${tr('Code Reviews & Better Practice','ကုဒ်သုံးသပ်ခြင်းနှင့် လက်တွေ့လေ့ကျင့်ခြင်း')}</h2><p>${tr('Prepare your pull request and questions with the Module 2 milestone brief. This preview does not schedule a live review.','Module 2 လေ့ကျင့်ခန်းညွှန်ကြားချက်အတိုင်း Pull Request နှင့် မေးခွန်းများကို ပြင်ဆင်ပါ။ ဤအကြိုကြည့်မှုက တိုက်ရိုက်သုံးသပ်ချိန် ချိန်းပေးခြင်း မလုပ်ပါ။')}</p><a href="assignment.html#assignment-brief">${tr('Open Your Assignment','လေ့ကျင့်ခန်းကို ဖွင့်ရန်')} →</a></section>
      </aside></div></div>`;

  const requestedCourse=params.get('course');
  if(requestedCourse&&!['react','web','fullstack'].includes(requestedCourse)){
    root.querySelector('.lesson-wrap').insertAdjacentHTML('afterbegin',`<p class="p-note" style="margin-bottom:14px">${tr('You are viewing the shared React sample lesson. Teaching material for your selected course is not included in this preview.','ယခုသည် React နမူနာသင်ခန်းစာ ဖြစ်သည်။ သင်ရွေးထားသော အခြားသင်တန်း၏ သင်ကြားရေးအကြောင်းအရာကို ဤအကြိုကြည့်မှုတွင် မထည့်ထားပါ။')} <a href="course.html?course=${encodeURIComponent(requestedCourse)}" style="text-decoration:underline">${tr('Back to your course','မိမိသင်တန်းသို့ ပြန်ရန်')}</a></p>`);
  }

  function downloadMarkup() {
    return `<button class="lesson-download" type="button" data-action="download-starter">${icon('folder')}<span><strong>Lesson-02-Hooks-Exercise.js</strong><small>${tr('Starter code • Offline practice','Starter ကုဒ် • အော့ဖ်လိုင်းလေ့ကျင့်ရန်')}</small></span><i aria-hidden="true">↓</i></button><button class="lesson-download" type="button" data-action="download-notes">${icon('note')}<span><strong>React18-Hooks-Cheatsheet.txt</strong><small>${tr('English & Burmese notes','အင်္ဂလိပ်နှင့် မြန်မာ မှတ်စု')}</small></span><i aria-hidden="true">↓</i></button>`;
  }
  function safeSet(key, value) {try {localStorage.setItem(key, value);return true;} catch (_) {return false;}}
  function safeGet(key) {try {return localStorage.getItem(key) || '';} catch (_) {return '';}}
  function download(filename, content, type='text/plain;charset=utf-8') {
    const url = URL.createObjectURL(new Blob([content], {type}));
    const a = document.createElement('a'); a.href = url; a.download = filename;
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  function notesText() {
    return `REACT 18 HOOKS — BURMESE LEARNERS HUB\n\nENGLISH\n1. useEffect runs after rendering. Return a cleanup function to cancel side effects before an effect repeats or a component unmounts.\n2. Bind fetch to controller.signal and call controller.abort() in cleanup. Ignore AbortError; show a meaningful fallback for real network errors.\n3. Every reactive value read by the effect belongs in its dependency list. Object identity changes can rerun an effect. Prefer primitive dependencies when appropriate.\n4. useRef stores mutable values without causing renders. useMemo caches an expensive calculation; it is not a replacement for correct state design.\n5. For low bandwidth, cache successful responses with a timestamp, show stale data honestly, and include a retry action. Avoid caching private data without a clear policy.\n\nမြန်မာမှတ်စု\n၁။ useEffect သည် render ပြီးနောက် အလုပ်လုပ်သည်။ Effect ပြန်လုပ်ချိန် သို့မဟုတ် component ဖယ်ရှားချိန်တွင် cleanup function ဖြင့် ရှင်းလင်းပါ။\n၂။ fetch တွင် controller.signal ချိတ်ပြီး cleanup တွင် controller.abort() ခေါ်ပါ။ AbortError ကို ပုံမှန် cancellation အဖြစ် သတ်မှတ်ပါ။\n၃။ Effect ဖတ်သုံးသော reactive value များကို dependency list ထဲတွင် ထည့်ပါ။ Object အသစ်ဖြစ်တိုင်း effect ထပ်လုပ်နိုင်သည်။\n၄။ useRef က render မဖြစ်စေဘဲ value သိမ်းနိုင်သည်။ useMemo က ကုန်ကျစရိတ်မြင့်သော calculation ကို cache လုပ်ပေးသည်။\n၅။ အင်တာနက်နှေးချိန်တွင် နောက်ဆုံးအောင်မြင်သော data နှင့် timestamp ကို သိမ်းပြီး stale data ဖြစ်ကြောင်း ပြပါ။ Retry လုပ်ရန်လည်း ပေးပါ။\n\nPractice: complete Lesson-02-Hooks-Exercise.js and open assignment.html for the rubric.\nThis is an educational starter. No production API or hosted video is included.\n`;
  }
  function renderLessons() {
    const query = document.getElementById('lesson-search').value.trim().toLocaleLowerCase();
    const visible = lessons.filter(l => `${l.number} ${l.en} ${l.my}`.toLocaleLowerCase().includes(query));
    document.getElementById('lesson-list').innerHTML = visible.length ? visible.map(l => `<button type="button" class="lesson-row ${l.id===selected.id?'is-active':''}" data-lesson="${l.id}" ${l.id===selected.id?'aria-current="true"':''}><i aria-hidden="true">${completed.includes(l.id)?'✓':l.id===selected.id?'▥':'▷'}</i><span><strong>${l.number} ${esc(t(l.id==='2-2'?'Hooks Mastery: useState & useEffect':l.en,l.my))}</strong><small>${completed.includes(l.id)?esc(t('Completed','ပြီးမြောက်ပြီ')):`${l.mins} ${esc(t('mins • Written preview available','မိနစ် • စာဖြင့်လေ့လာနိုင်သည်'))}`}</small></span>${l.id===selected.id?`<b>${esc(t('ACTIVE','လက်ရှိ'))}</b>`:''}</button>`).join('') : `<p class="lesson-empty">${esc(t('No matching lessons. Try “React” or “2.2”.','ကိုက်ညီသော သင်ခန်းစာမတွေ့ပါ။ “React” သို့မဟုတ် “2.2” ဖြင့် ရှာကြည့်ပါ။'))}</p>`;
    document.getElementById('lesson-module-progress').textContent = `${completed.length}/3 ${t('Done','ပြီးမြောက်')}`;
    document.getElementById('lesson-progress-label').textContent = t(`${completed.length} of 3 preview lessons complete • Saved on this device`, `အစမ်းသင်ခန်းစာ ၃ ခုအနက် ${completed.length} ခု ပြီးမြောက် • ဤစက်တွင်သာ သိမ်းထားသည်`);
    document.getElementById('lesson-progress-fill').style.width = `${completed.length/3*100}%`;
    document.getElementById('lesson-progressbar').setAttribute('aria-valuenow',completed.length);
  }
  function renderSelected() {
    document.getElementById('lesson-title').textContent = `${selected.number} ${t(selected.en, selected.my)}`;
    document.getElementById('lesson-position').textContent = t(`Lesson ${selected.number} of 64`, `သင်ခန်းစာ ၆၄ ခုအနက် ${selected.number}`);
    document.getElementById('lesson-complete').textContent = completed.includes(selected.id) ? t('✓ Completed','✓ ပြီးမြောက်ပြီ') : t('✓ Mark Complete','✓ ပြီးမြောက်ကြောင်း မှတ်ရန်');
    const takeaways = selected.id === '2-1' ? [
      ['React creates a lightweight description of your UI. Reconciliation compares the previous and next trees before updating the DOM.','React က UI ၏ ပေါ့ပါးသောဖွဲ့စည်းပုံကို တည်ဆောက်သည်။ Reconciliation က DOM မပြင်မီ tree အဟောင်းနှင့် အသစ်ကို နှိုင်းယှဉ်သည်။'],
      ['Use stable keys for list items. Array indexes can associate state with the wrong item after a reorder.','List item များအတွက် တည်ငြိမ်သော key သုံးပါ။ အစီအစဉ်ပြောင်းလျှင် array index key ကြောင့် state မှားချိတ်နိုင်သည်။'],
      ['Keep render functions pure. Run subscriptions, timers, and network requests in effects with cleanup.','Render function ကို pure ဖြစ်အောင် ထားပါ။ Subscriptions၊ timers နှင့် network requests ကို cleanup ပါသော effect တွင် လုပ်ပါ။']
    ] : selected.id === '2-3' ? [
      ['Keep shared state small. Local form inputs usually belong in the component that owns the form.','မျှဝေသုံးသော state ကို လိုအပ်သလောက်သာ ထားပါ။ Form input များကို သက်ဆိုင်ရာ component တွင် သိမ်းခြင်းက များသောအားဖြင့် သင့်တော်သည်။'],
      ['Select only the slice of a Zustand store that a component needs to avoid unrelated updates.','မသက်ဆိုင်သော update များ လျှော့ချရန် component လိုအပ်သော Zustand store အပိုင်းကိုသာ ရွေးပါ။'],
      ['Separate server data from UI preferences. Decide which values need persistence and when cached data expires.','Server data နှင့် UI preference များကို ခွဲထားပါ။ မည်သည့် value သိမ်းမည်၊ cached data မည်သည့်အချိန် သက်တမ်းကုန်မည်ကို သတ်မှတ်ပါ။']
    ] : [
      ['Never dispatch asynchronous state updates after a React component unmounts. Bind fetch to an AbortController and clean it up.','React component ဖယ်ရှားပြီးနောက် asynchronous state update မလုပ်ပါနှင့်။ fetch ကို AbortController နှင့် ချိတ်ပြီး cleanup လုပ်ပါ။'],
      ['Understand the difference between object references in the useEffect dependency array and primitive values.','useEffect dependency array ထဲမှ object reference နှင့် primitive value တို့၏ ကွာခြားချက်ကို နားလည်ပါ။'],
      ['Handle Myanmar font encoding changes deliberately in state without triggering cascade re-renders.','မြန်မာစာ encoding အပြောင်းအလဲကို state ထဲတွင် စီမံရာ၌ မလိုအပ်သော render အဆင့်ဆင့် မဖြစ်စေရန် သတိပြုပါ။']
    ];
    document.getElementById('lesson-takeaways').innerHTML = takeaways.map(([en,my]) => `<p>${esc(t(en,my))}</p>`).join('');
    const transcript = selected.id==='2-2' ? [
      ['Start with a component that fetches lessons when its endpoint changes. A slow connection means the component can disappear before the response arrives. Create one AbortController inside each effect and pass its signal to fetch.','Endpoint ပြောင်းလျှင် သင်ခန်းစာများ fetch လုပ်သော component ဖြင့် စကြမည်။ အင်တာနက်နှေးချိန်တွင် response မရမီ component ပျောက်သွားနိုင်သည်။ Effect တစ်ခုစီအတွင်း AbortController တစ်ခုဖန်တီးပြီး signal ကို fetch သို့ ပေးပါ။'],
      ['The cleanup function runs before the next effect and on unmount. Calling abort stops the pending request. In the catch block, ignore AbortError and handle other failures with a readable message and retry option. Never turn an intentional cancellation into a warning.','နောက် effect မလုပ်မီနှင့် unmount ဖြစ်ချိန်တွင် cleanup အလုပ်လုပ်သည်။ abort ခေါ်ခြင်းက pending request ကို ရပ်စေသည်။ Catch block တွင် AbortError ကို လျစ်လျူရှုပြီး အခြားအမှားများအတွက် နားလည်လွယ်သော message နှင့် retry လုပ်ရန် ပေးပါ။'],
      ['The dependency list must include the endpoint. When objects are recreated on every render, their references change and an effect can run again. Prefer explicit primitive inputs. Use useRef for a mutable value that does not belong in rendering; useMemo is useful for an expensive calculation, not for hiding a dependency bug.','Dependency list တွင် endpoint ထည့်ရမည်။ Render တိုင်း object အသစ်လုပ်လျှင် reference ပြောင်းပြီး effect ထပ်အလုပ်လုပ်နိုင်သည်။ Primitive input များကို ရှင်းရှင်းလင်းလင်း သုံးပါ။ Render မလိုသော mutable value အတွက် useRef၊ တွက်ချက်မှုကုန်ကျစရိတ်မြင့်ချိန်တွင် useMemo ကို သုံးပါ။'],
      ['For an offline fallback, save successful public data with a timestamp. If a later request fails, offer the cached result with a visible stale-data label. Test unmounting, rapid endpoint changes, airplane mode, and a restored connection.','အော့ဖ်လိုင်း fallback အတွက် အောင်မြင်သော public data ကို timestamp နှင့် သိမ်းပါ။ နောက် request မအောင်မြင်လျှင် အဟောင်းဖြစ်ကြောင်း ပြပြီး cache ပြန်သုံးနိုင်စေပါ။ Unmount၊ endpoint လျင်မြန်စွာပြောင်းမှု၊ airplane mode နှင့် connection ပြန်ရမှုကို စမ်းသပ်ပါ။']
    ] : takeaways;
    document.getElementById('lesson-transcript-content').innerHTML = transcript.map(([en,my]) => `<p>${esc(t(en,my))}</p>`).join('');
    const code = selected.id==='2-1' ? `function CourseList({ courses }) {\n  return (\n    <ul>\n      {courses.map(course => (\n        <li key={course.id}>{course.title}</li>\n      ))}\n    </ul>\n  );\n}\n\n// Use stable IDs so React can preserve the correct item state.\n// Keep this render pure; fetch data in an effect or data layer.` : selected.id==='2-3' ? `import { create } from 'zustand';\n\nconst usePreferences = create(set => ({\n  theme: 'light',\n  language: 'en',\n  setTheme: theme => set({ theme }),\n  setLanguage: language => set({ language })\n}));\n\nfunction ThemeLabel() {\n  const theme = usePreferences(state => state.theme);\n  return <span>{theme}</span>;\n}\n\n// Select the values you need. Keep server requests in a data layer.` : production;
    document.getElementById('lesson-production').textContent = code;
    document.getElementById('lesson-player-title').innerHTML = `<b>${esc(t('MODULE','အပိုင်း'))} ${selected.number}</b> / ${esc(t(selected.id==='2-2'?'React useEffect & AbortController':selected.en,selected.id==='2-2'?'React useEffect နှင့် AbortController':selected.my))}`;
    const previewCode=document.getElementById('lesson-preview-code');
    if(selected.id==='2-2')previewCode.innerHTML=preview;else previewCode.textContent=code;
    renderFeedback();
    renderLessons();
  }
  function renderFeedback() {
    const messages = {saved:['Progress saved in this browser. Continue when you are ready.','တိုးတက်မှုကို ဤ browser တွင် သိမ်းပြီးပါပြီ။ အဆင်သင့်ဖြစ်လျှင် ဆက်လေ့လာပါ။'],unavailable:['Progress updated for this visit. Browser storage is unavailable.','ယခုဖွင့်ထားချိန်အတွက် မှတ်သားပြီးပါပြီ။ Browser storage မရနိုင်ပါ။'],copied:['Code copied to clipboard.','ကုဒ်ကို clipboard သို့ ကူးပြီးပါပြီ။'],selected:['Code selected. Use your browser’s Copy command.','ကုဒ်ကို ရွေးထားပြီးပါပြီ။ Browser ၏ Copy ကို နှိပ်ပါ။']};
    document.getElementById('lesson-completion-note').textContent=messages[status]?t(...messages[status]):'';
  }
  function renderQuestionStatus() {
    const messages={empty:['Write a question before saving.','မသိမ်းမီ မေးခွန်းကို ရေးပါ။'],saved:['Question saved on this device only. It has not been sent to an instructor.','မေးခွန်းကို ဤစက်တွင်သာ သိမ်းထားသည်။ ဆရာထံ မပို့ရသေးပါ။'],unavailable:['Browser storage is unavailable. Copy your question before leaving.','Browser storage မရနိုင်ပါ။ စာမျက်နှာမပိတ်မီ မေးခွန်းကို ကူးယူထားပါ။']};
    document.getElementById('lesson-question-status').textContent=messages[questionStatus]?t(...messages[questionStatus]):'';
  }
  function setTab(name, focus=false) {
    activeTab=name;
    root.querySelectorAll('[data-tab]').forEach(button => {const active=button.dataset.tab===name;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;if(active&&focus)button.focus();});
    root.querySelectorAll('[role="tabpanel"]').forEach(panel => {panel.hidden=panel.id!==`lesson-panel-${name}`;});
  }
  function openTranscript() {setTab('overview');const d=document.getElementById('lesson-transcript');d.open=true;d.scrollIntoView({behavior:'smooth',block:'center'});}
  root.addEventListener('click', async event => {
    const lessonButton=event.target.closest('[data-lesson]');
    if(lessonButton) {selected=lessons.find(l=>l.id===lessonButton.dataset.lesson);status='';renderSelected();const url=new URL(location.href);url.searchParams.set('lesson',selected.id);history.replaceState(null,'',url);return;}
    const tab=event.target.closest('[data-tab]');if(tab){setTab(tab.dataset.tab);return;}
    const action=event.target.closest('[data-action]')?.dataset.action;
    if(action==='transcript')openTranscript();
    if(action==='practice')setTab('practice');
    if(action==='complete') {
      completed=completed.includes(selected.id)?completed.filter(id=>id!==selected.id):[...completed,selected.id];
      const stored=safeSet(progressKey,JSON.stringify(completed));status=stored?'saved':'unavailable';renderSelected();
    }
    if(action==='next') {const next=lessons[lessons.findIndex(l=>l.id===selected.id)+1];if(next){selected=next;status='';renderSelected();setTab('overview');const url=new URL(location.href);url.searchParams.set('lesson',selected.id);url.hash='';history.replaceState(null,'',url);document.querySelector('.lesson-meta').scrollIntoView({behavior:'smooth',block:'start'});}else{location.href='assignment.html#assignment-brief';}}
    if(action==='download-starter')download('Lesson-02-Hooks-Exercise.js',starter,'text/javascript;charset=utf-8');
    if(action==='download-notes')download('React18-Hooks-Cheatsheet.txt',notesText());
    if(action==='download-editor')download('My-Hooks-Exercise.js',document.getElementById('lesson-editor').value,'text/javascript;charset=utf-8');
    if(action==='copy') {
      const code=document.getElementById('lesson-production').textContent;
      try {await navigator.clipboard.writeText(code);status='copied';renderFeedback();}
      catch (_) {const range=document.createRange();range.selectNodeContents(document.getElementById('lesson-production'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);status='selected';renderFeedback();}
    }
  });
  root.querySelector('[role="tablist"]').addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const tabs=[...root.querySelectorAll('[data-tab]')];let n=tabs.findIndex(b=>b.dataset.tab===activeTab);n=event.key==='Home'?0:event.key==='End'?tabs.length-1:(n+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;setTab(tabs[n].dataset.tab,true);});
  document.getElementById('lesson-search').addEventListener('input',renderLessons);
  document.getElementById('lesson-editor').value=safeGet('blh-hooks-practice')||starter;
  document.getElementById('lesson-editor').addEventListener('input',event=>safeSet('blh-hooks-practice',event.target.value));
  document.getElementById('lesson-question').value=safeGet('blh-hooks-question');
  document.getElementById('lesson-question-form').addEventListener('submit',event=>{event.preventDefault();const input=document.getElementById('lesson-question');if(!input.value.trim()){input.focus();questionStatus='empty';renderQuestionStatus();return;}questionStatus=safeSet('blh-hooks-question',input.value.trim())?'saved':'unavailable';renderQuestionStatus();});
  window.addEventListener('blh:preferences',()=>{window.BLH?.applyTranslations(root);renderSelected();renderQuestionStatus();});
  window.BLHLesson={download,starter,t,esc,tr,openOverview:()=>setTab('overview')};
  renderSelected();window.BLH?.applyTranslations(root);
})();
