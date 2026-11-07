(() => {
  'use strict';
  const copy = {
    'Skip to content': 'အဓိကအကြောင်းအရာသို့',
    '100% Free Course Previews': '၁၀၀% အခမဲ့ သင်တန်းအစမ်းသင်ခန်းစာများ',
    'Try 3 Modules Free': 'အခန်း ၃ ခန်း အခမဲ့ စမ်းသင်ပါ',
    'Empowering Curious Minds with': 'သင်ယူလိုစိတ်ရှိသူများအတွက်',
    'Industry-Grade Tech Education': 'လုပ်ငန်းခွင်အဆင့်မီ နည်းပညာပညာရေး',
    'Start with': 'စတင်လေ့လာပါ —',
    '— Enroll only when you love it. World-class curricula, real-world mentors, and collaborative community groups across Myanmar.': '— နှစ်သက်မှသာ သင်တန်းအပ်ပါ။ နိုင်ငံတကာအဆင့်မီ သင်ရိုးများ၊ လက်တွေ့အတွေ့အကြုံရှိ ဆရာများနှင့် မြန်မာတစ်ဝန်းမှ သင်ယူဖော်များကို တစ်နေရာတည်းတွင် တွေ့ဆုံပါ။',
    'Try Free Lessons': 'အခမဲ့ စမ်းသင်ရန်',
    'Explore Live & 1-on-1 Mentorship': 'တိုက်ရိုက်အတန်းနှင့် တစ်ဦးချင်းသင်ကြားမှု',
    'Active': 'တက်ကြွသော', 'Students': 'သင်ယူသူများ', 'Expert': 'ကျွမ်းကျင်', 'Instructors': 'နည်းပြဆရာများ',
    'Free Trial': 'အခမဲ့အစမ်း', 'Modules': 'သင်ခန်းစာများ', 'Average': 'ပျမ်းမျှ', 'Satisfaction': 'ကျေနပ်မှု',
    'Interactive Study Sandbox v2.4': 'အပြန်အလှန်လေ့လာခန်း v2.4', 'Live Session': 'တိုက်ရိုက်အတန်း',
    'FREE LESSON 01': 'အခမဲ့ သင်ခန်းစာ ၀၁', '14:20 mins': '၁၄:၂၀ မိနစ်',
    'Modern React State Architectures': 'ခေတ်မီ React State တည်ဆောက်ပုံများ',
    'Free Preview': 'အခမဲ့ အစမ်းကြည့်ရန်', '3 Modules Ready': 'အခန်း ၃ ခန်း ရရှိနိုင်သည်',
    'Peer Discussion': 'သင်ယူဖော်များနှင့် ဆွေးနွေးရန်', '● 148 Online': '● ၁၄၈ ဦး ရှိနေသည်',
    'Instant peer discussion': 'သင်ယူဖော်များနှင့် ချက်ချင်းဆွေးနွေးပါ',
    'Accredited Certificate': 'သင်တန်းပြီးဆုံး လက်မှတ်', 'Verified by Industry Mentors': 'လုပ်ငန်းခွင်ဆရာများက စစ်ဆေးထားသည်',
    'FLEXIBLE FORMATS': 'အဆင်ပြေသည့် သင်ယူမှုပုံစံများ',
    'Choose How You Want to Learn': 'ကိုယ်နှစ်သက်သည့် သင်ယူမှုပုံစံကို ရွေးချယ်ပါ',
    'From on-demand pre-recorded lessons to interactive live cohorts and dedicated 1-on-1': 'အချိန်မရွေးကြည့်နိုင်သော ဗီဒီယိုသင်ခန်းစာ၊ တိုက်ရိုက်အဖွဲ့လိုက်အတန်းနှင့် တစ်ဦးချင်း',
    'coaching, select the format tailored to your schedule.': 'သင်ကြားမှုတို့မှ သင့်အချိန်ဇယားနှင့် ကိုက်ညီသည့်ပုံစံကို ရွေးချယ်ပါ။',
    'Self-Paced Video Classes': 'ကိုယ်ပိုင်အချိန်ဖြင့် ဗီဒီယိုသင်တန်းများ',
    'Learn at your own pace with 3 free trial modules, downloadable project files, and lifetime access to HD video lessons.': 'အခမဲ့ အစမ်းသင်ခန်းစာ ၃ ခန်း၊ ဒေါင်းလုဒ်ရယူနိုင်သော ပရောဂျက်ဖိုင်များနှင့် HD ဗီဒီယိုများကို မိမိအဆင်ပြေသည့်အချိန်တွင် သင်ယူပါ။',
    'Instant 3-module free preview': 'အခန်း ၃ ခန်းကို ချက်ချင်း အခမဲ့ စမ်းသင်ပါ',
    'Downloadable project repositories': 'ပရောဂျက်ဖိုင်များ ဒေါင်းလုဒ်ရယူနိုင်သည်',
    'Lifetime video & resource access': 'ဗီဒီယိုနှင့် အရင်းအမြစ်များ အမြဲကြည့်နိုင်သည်',
    'Browse Courses': 'သင်တန်းများ ကြည့်ရန်', 'POPULAR CHOICE': 'လူကြိုက်များသော ရွေးချယ်မှု',
    'Group Live Cohorts': 'အဖွဲ့လိုက် တိုက်ရိုက်သင်တန်းများ',
    'Scheduled live cohort sessions on Zoom/Meet with hands-on code reviews, team assignments, and live mentor Q&A.': 'Zoom/Meet မှ သတ်မှတ်ချိန်အတိုင်း အဖွဲ့လိုက် တက်ရောက်ပြီး code ပြန်လည်သုံးသပ်ခြင်း၊ အဖွဲ့လိုက်အိမ်စာနှင့် ဆရာကို တိုက်ရိုက်မေးမြန်းခြင်းတို့ ပြုလုပ်ပါ။',
    'Interactive weekly live lectures': 'အပတ်စဉ် အပြန်အလှန် တိုက်ရိုက်သင်ကြားမှု',
    'Real-time screen sharing & debug': 'မျက်နှာပြင်မျှဝေ၍ အမှားများ အတူဖြေရှင်းခြင်း',
    'Dedicated batch study channels': 'အတန်းသီးသန့် လေ့လာဆွေးနွေးခန်းများ',
    'Inquire Group Live': 'အဖွဲ့လိုက်အတန်း စုံစမ်းရန်', '1-on-1 Mentorship': 'တစ်ဦးချင်း နည်းပြသင်ကြားမှု',
    'Personalized 1-on-1 coaching matched to your availability, custom syllabus, career roadmap, and portfolio reviews.': 'သင့်အားလပ်ချိန်နှင့် ကိုက်ညီသည့် တစ်ဦးချင်းသင်ကြားမှု၊ သီးသန့်သင်ရိုး၊ အလုပ်အကိုင်လမ်းညွှန်နှင့် ပရောဂျက်လက်ရာ သုံးသပ်မှုတို့ကို ရယူပါ။',
    'Tailored pacing for your career goals': 'အလုပ်အကိုင်ရည်မှန်းချက်နှင့် ကိုက်ညီသည့် သင်ကြားမှု',
    'Private mock interviews & resume audits': 'အင်တာဗျူးအစမ်းနှင့် ကိုယ်ရေးရာဇဝင် စစ်ဆေးပေးမှု',
    'Direct WhatsApp/Telegram mentor access': 'WhatsApp/Telegram မှ နည်းပြနှင့် ဆက်သွယ်နိုင်မှု',
    'Book 1-on-1 Consultation': 'တစ်ဦးချင်းဆွေးနွေးရန်', 'CURATED CURRICULUM': 'စနစ်တကျ ရွေးချယ်ထားသော သင်ရိုးများ',
    'Featured Courses with Instant Free Trials': 'ချက်ချင်း အခမဲ့စမ်းသင်နိုင်သည့် အထူးသင်တန်းများ',
    'Experience the first 3 modules completely free. No upfront payment required.': 'ပထမ အခန်း ၃ ခန်းကို အခမဲ့ စမ်းသင်ပါ။ ကြိုတင်ငွေပေးရန် မလိုပါ။',
    'All Specializations': 'ဘာသာရပ်အားလုံး', 'Web & App Dev': 'ဝဘ်နှင့် အက်ပ်ရေးသားခြင်း', 'Product & UI/UX': 'Product နှင့် UI/UX', 'AI & Growth': 'AI နှင့် လုပ်ငန်းတိုးတက်ရေး',
    '3 Free Modules Available': 'အခန်း ၃ ခန်း အခမဲ့ ရရှိနိုင်သည်', 'Development': 'ဆော့ဖ်ဝဲရေးသားခြင်း',
    '38 Hours • 64 Lessons': '၃၈ နာရီ • သင်ခန်းစာ ၆၄ ခု',
    'Full-Stack Web Development with React & Node': 'React နှင့် Node ဖြင့် Full-Stack ဝဘ်ရေးသားခြင်း',
    'Modern JavaScript (ES6+), React hooks, Next.js, Node.js API architecture, and...': 'ခေတ်မီ JavaScript (ES6+)၊ React hooks၊ Next.js၊ Node.js API တည်ဆောက်ပုံနှင့် အခြားအကြောင်းအရာများ...',
    'Sayar Min Thant': 'ဆရာမင်းသန့်', 'Senior Lead Architect': 'အကြီးတန်း ဦးဆောင်စနစ်ဗိသုကာ',
    'Course Fee:': 'သင်တန်းကြေး:', 'MMK': 'ကျပ်', 'Enroll Now': 'သင်တန်းအပ်ရန်', 'Product Design': 'ထုတ်ကုန်ဒီဇိုင်း',
    '26 Hours • 48 Lessons': '၂၆ နာရီ • သင်ခန်းစာ ၄၈ ခု',
    'UI/UX Design Masterclass (Figma to Launch)': 'UI/UX ဒီဇိုင်းအထူးသင်တန်း (Figma မှ ဖြန့်ချိသည်အထိ)',
    'Design systems, typography tokens, auto-layout components, user testing, and...': 'Design system၊ စာလုံးပုံစံ၊ auto-layout component၊ အသုံးပြုသူစမ်းသပ်မှုနှင့် အခြားအကြောင်းအရာများ...',
    'Ei Wai Phyo': 'အိဝေဖြိုး', 'Staff Product Designer': 'အကြီးတန်း ထုတ်ကုန်ဒီဇိုင်နာ', 'Growth & AI': 'လုပ်ငန်းတိုးတက်ရေးနှင့် AI',
    '20 Hours • 32 Lessons': '၂၀ နာရီ • သင်ခန်းစာ ၃၂ ခု',
    'Digital Marketing & AI Automation Suite': 'ဒစ်ဂျစ်တယ်စျေးကွက်နှင့် AI အလိုအလျောက်စနစ်',
    'Customer acquisition, Facebook & Google Performance Max, SEO strategies, and...': 'ဖောက်သည်ရရှိရေး၊ Facebook နှင့် Google Performance Max၊ SEO နည်းဗျူဟာနှင့် အခြားအကြောင်းအရာများ...',
    'Ko Zaw Myo': 'ကိုဇော်မျိုး', 'Growth Director': 'လုပ်ငန်းတိုးတက်ရေး ဒါရိုက်တာ',
    '3 courses to start your next chapter': 'သင်တန်း ၃ ခုဖြင့် နောက်တစ်ဆင့် စတင်ပါ',
    'Try it first. Find your fit. Then go all in.': 'အရင် စမ်းသင်ပါ။ ကိုယ်နှင့်ကိုက်ညီမှုကို ရှာပါ။ ပြီးမှ အပြည့်အဝ လေ့လာပါ။',
    'Meet Your Instructor': 'သင့်နည်းပြနှင့် တွေ့ဆုံပါ', '03:45 Preview': '၀၃:၄၅ အစမ်းကြည့်ရန်',
    'Introduction to Burmese Learners Hub Ecosystem': 'Burmese Learners Hub အကြောင်း မိတ်ဆက်ခြင်း',
    'Featured Lead Instructor': 'အထူးဦးဆောင်နည်းပြ',
    'Senior Lead Software Architect (10+ Years Industry Experience in SG & MM)': 'အကြီးတန်း ဆော့ဖ်ဝဲစနစ်ဗိသုကာ (စင်ကာပူနှင့် မြန်မာတွင် အတွေ့အကြုံ ၁၀ နှစ်ကျော်)',
    '“My mission is to equip Myanmar developers with global production engineering standards and robust system architecture that opens doors to international remote careers.”': '“မြန်မာ developer များကို နိုင်ငံတကာအဆင့်မီ အင်ဂျင်နီယာစံနှုန်းများနှင့် ခိုင်မာသော စနစ်တည်ဆောက်မှု သင်ကြားပေးပြီး နိုင်ငံတကာ remote အလုပ်အကိုင်များ ရရှိစေရန် ရည်ရွယ်ပါသည်။”',
    'Graduates': 'သင်တန်းပြီးဆုံးသူများ', 'Completion': 'ပြီးဆုံးမှု', 'Instructor Rating': 'နည်းပြအဆင့်သတ်မှတ်ချက်',
    'Ask Instructor Q&A': 'နည်းပြကို မေးမြန်းရန်', 'ACTIVE PEER LEARNING': 'သင်ယူဖော်များနှင့် အတူလေ့လာပါ',
    'Collaborative Study Groups & Peer Channels': 'ပူးပေါင်းလေ့လာရေးအဖွဲ့များနှင့် ဆွေးနွေးခန်းများ',
    'Never study alone. Solve bugs together, share resources, and receive prompt feedback from peers': 'တစ်ဦးတည်း လေ့လာစရာ မလိုပါ။ အမှားများ အတူဖြေရှင်းပါ၊ အရင်းအမြစ်များ မျှဝေပါ၊',
    'and mentors in real-time study groups.': 'သင်ယူဖော်များနှင့် နည်းပြများထံမှ အကြံပြုချက်များ ရယူပါ။',
    'Active Rooms': 'အသုံးပြုနေသော အခန်းများ', '● 14 Live': '● ၁၄ ခန်း အသုံးပြုနေသည်',
    'React Batch 4 Study Group': 'React အတန်း ၄ လေ့လာရေးအဖွဲ့', '148 Members Active': 'အဖွဲ့ဝင် ၁၄၈ ဦး ပါဝင်နေသည်',
    '“Sayar Min Thant: Async state...”': '“ဆရာမင်းသန့်: Async state အကြောင်း...”',
    'UI Designers Lounge': 'UI ဒီဇိုင်နာများ ဆွေးနွေးခန်း', '92 Members Active': 'အဖွဲ့ဝင် ၉၂ ဦး ပါဝင်နေသည်',
    'Reviewing Design Systems & Design...': 'Design system များ ပြန်လည်သုံးသပ်နေသည်...',
    'Node.js Backend Squad': 'Node.js Backend လေ့လာရေးအဖွဲ့', '67 Members Active': 'အဖွဲ့ဝင် ၆၇ ဦး ပါဝင်နေသည်',
    'Database connection pooling and JWT...': 'Database connection pooling နှင့် JWT အကြောင်း...',
    '＋ Create a Study Group': '＋ လေ့လာရေးအဖွဲ့ ဖန်တီးရန်', 'A safe space to ask “why?”': 'မေးခွန်းများ လွတ်လပ်စွာ မေးမြန်းပါ',
    '148 Members Online • Moderated by Sayar Min Thant': 'အဖွဲ့ဝင် ၁၄၈ ဦး ရှိနေသည် • ဆရာမင်းသန့် ကြီးကြပ်သည်',
    'Sayar Min Thant (Instructor) Pinned:': 'ဆရာမင်းသန့် (နည်းပြ) မှ ပင်ထိုးထားသည်:',
    '“Module 2 Homework solutions will be reviewed live this Saturday at 8:00 PM MMT. Drop your questions below.”': '“အခန်း ၂ အိမ်စာအဖြေများကို စနေနေ့ ည ၈ နာရီ (မြန်မာစံတော်ချိန်) တွင် တိုက်ရိုက်ဆွေးနွေးပါမည်။ မေးခွန်းများ အောက်တွင် ရေးထားခဲ့ပါ။”',
    'Aung Kyaw': 'အောင်ကျော်',
    'Sayar, when doing data fetching inside useEffect, how should we write the cleanup function properly? Is using AbortController the best practice?': 'ဆရာ၊ useEffect ထဲမှာ data ရယူတဲ့အခါ cleanup function ကို ဘယ်လို မှန်ကန်စွာ ရေးသင့်ပါသလဲ။ AbortController သုံးတာ အကောင်းဆုံးနည်းလမ်းလား။',
    'Instructor': 'နည်းပြ',
    'Yes Aung Kyaw, utilizing AbortController is indeed a best practice for cancelling requests when a component unmounts. Return a cleanup function from useEffect that calls controller.abort().': 'ဟုတ်ပါတယ် အောင်ကျော်။ Component ဖြုတ်လိုက်တဲ့အချိန် request ကို ပယ်ဖျက်ဖို့ AbortController သုံးတာ သင့်တော်ပါတယ်။ useEffect ကနေ controller.abort() ကို ခေါ်တဲ့ cleanup function ကို ပြန်ပေးပါ။',
    'Message your study group': 'လေ့လာရေးအဖွဲ့သို့ စာရေးရန်',
    'Community preview · Messages stay on this device.': 'ဆွေးနွေးခန်းနမူနာ • စာများကို ဤစက်တွင်သာ သိမ်းထားသည်။',
    'DIRECT MOBILE CHANNELS': 'မိုဘိုင်းမှ တိုက်ရိုက်ဆွေးနွေးရန်',
    'Join Our Instant Discussion Hubs': 'လျင်မြန်သော ဆွေးနွေးရေးအဖွဲ့များသို့ ဝင်ရောက်ပါ',
    'Stay connected even during low-bandwidth situations with official Telegram and Viber': 'အင်တာနက်နှေးချိန်တွင်လည်း Telegram နှင့် Viber အဖွဲ့များမှ',
    'communities for instant alerts and updates.': 'သင်ခန်းစာနှင့် သတင်းအချက်အလက်များကို ဆက်လက်ရယူပါ။',
    'Telegram Study Channels': 'Telegram လေ့လာရေးအဖွဲ့များ', 'Real-time lesson alerts &': 'သင်ခန်းစာအသစ် အသိပေးချက်နှင့်',
    'lecture PDFs': 'သင်ခန်းစာ PDF များ', 'Members': 'အဖွဲ့ဝင်များ', 'Daily active discussion': 'နေ့စဉ် တက်ကြွစွာ ဆွေးနွေးမှု',
    'Join Telegram Discussion': 'Telegram ဆွေးနွေးခန်းသို့', 'Viber Discussion Hub': 'Viber ဆွေးနွေးရေးအဖွဲ့',
    'Daily Q&A & Local payment': 'နေ့စဉ် အမေးအဖြေနှင့် ငွေပေးချေမှု', 'updates': 'သတင်းအသစ်များ',
    'Local community announcements': 'အဖွဲ့တွင်း ကြေညာချက်များ', 'Join Viber Community Group': 'Viber အဖွဲ့သို့ ဝင်ရန်',
    'VERIFIED OUTCOMES': 'သင်ယူသူများ၏ ရလဒ်များ', 'Student Stories & Verified Reviews': 'သင်ယူသူများ၏ အတွေ့အကြုံနှင့် သုံးသပ်ချက်များ',
    'Real feedback from students who mastered industry skills through BLH and': 'BLH မှတစ်ဆင့် လုပ်ငန်းခွင်ကျွမ်းကျင်မှု တိုးတက်လာပြီး',
    'secured roles at top regional companies.': 'ဒေသတွင်းကုမ္ပဏီများတွင် အလုပ်ရရှိသူတို့၏ အတွေ့အကြုံများ။',
    '4.9 Average Rating': 'ပျမ်းမျှအဆင့် ၄.၉', '(1,240+ reviews)': '(သုံးသပ်ချက် ၁၂၄၀ ကျော်)',
    '“Watching the 3 free preview modules gave me complete confidence to enroll. Sayar Min Thant\'s teaching on production React architecture was top notch, and I just landed a Junior Frontend role at an overseas firm!”': '“အခမဲ့ အစမ်းသင်ခန်းစာ ၃ ခန်း ကြည့်ပြီး သင်တန်းအပ်ဖို့ ယုံကြည်မှု ရလာတယ်။ ဆရာမင်းသန့်ရဲ့ React တည်ဆောက်ပုံ သင်ကြားမှုက လက်တွေ့ကျပြီး နိုင်ငံခြားကုမ္ပဏီမှာ Junior Frontend အလုပ် ရခဲ့ပါတယ်။”',
    'Thant Htoo Aung': 'သန့်ထူးအောင်', 'Frontend Developer @ YgnTech': 'YgnTech မှ Frontend Developer', 'Project ↗': 'ပရောဂျက် ↗',
    '“The case studies in the UI/UX Masterclass are deeply practical. Continuous peer feedback in our study group helped me build a comprehensive design system portfolio that won over recruiters.”': '“UI/UX အတန်းထဲက လက်တွေ့ဥပမာတွေက အသုံးဝင်ပါတယ်။ လေ့လာရေးအဖွဲ့ရဲ့ အကြံပြုချက်တွေကြောင့် အလုပ်ရှင်တွေနှစ်သက်တဲ့ design system လက်ရာစုကို ဖန်တီးနိုင်ခဲ့ပါတယ်။”',
    'May Myat Noe': 'မေမြတ်နိုး', 'UI Designer @ CreativeHub': 'CreativeHub မှ UI ဒီဇိုင်နာ', 'Figma Case ↗': 'Figma လက်ရာ ↗',
    '“Connecting our classes with Telegram and Viber groups has been a lifesaver. Whenever power or internet drops, I can still access offline files and discuss course exercises with classmates seamlessly.”': '“Telegram နဲ့ Viber အဖွဲ့တွေရှိလို့ အရမ်းအဆင်ပြေပါတယ်။ မီးပျက်တာ၊ လိုင်းကျတာရှိရင်လည်း offline ဖိုင်တွေကနေ ဆက်လေ့လာပြီး အတန်းဖော်တွေနဲ့ လေ့ကျင့်ခန်း ဆွေးနွေးနိုင်ပါတယ်။”',
    'Kyaw Swar Hein': 'ကျော်စွာဟိန်း', 'Growth Marketer & Creator': 'စျေးကွက်တိုးတက်ရေးနှင့် ဖန်တီးသူ', 'Campaign ↗': 'စျေးကွက်အစီအစဉ် ↗',
    'Website concept · Stories and statistics are illustrative.': 'ဝဘ်ဆိုက်နမူနာ • အတွေ့အကြုံနှင့် ကိန်းဂဏန်းများသည် သရုပ်ပြရန်သာ ဖြစ်သည်။',
    'FAIR REVENUE ARCHITECTURE': 'မျှတသော ဝင်ငွေခွဲဝေမှု',
    'Transparent & Fair Instructor Revenue Share': 'ပွင့်လင်းမျှတသော နည်းပြဝင်ငွေ ခွဲဝေမှု',
    'Clear revenue breakdowns, zero hidden platform fees, and guaranteed local payouts that honor your': 'နည်းပြတို့၏ ကြိုးပမ်းမှုကို တန်ဖိုးထားသည့် ရှင်းလင်းသော ဝင်ငွေခွဲဝေမှု၊',
    'hard work.': 'ဖုံးကွယ်ထားသော အခကြေးငွေမရှိသော ပြည်တွင်းငွေပေးချေမှုပုံစံ။',
    'Example Course Enrollment Revenue Distribution': 'သင်တန်းကြေး ဝင်ငွေခွဲဝေမှု နမူနာ',
    'Direct Teacher Payout': 'ဆရာသို့ တိုက်ရိုက်ပေးငွေ', 'Platform Infrastructure & DRM': 'ပလက်ဖောင်းစနစ်နှင့် DRM',
    'Teacher Set Price': 'ဆရာသတ်မှတ်ထားသော စျေးနှုန်း', 'Instructor defined price': 'နည်းပြသတ်မှတ်သည့် သင်တန်းကြေး',
    'Platform Fee': 'ပလက်ဖောင်း အခကြေးငွေ', 'Cloud, DRM & Payments': 'Cloud၊ DRM နှင့် ငွေပေးချေမှု',
    'Automated weekly transfer': 'အပတ်စဉ် အလိုအလျောက် လွှဲပေးမှု',
    'Withdraw instantly to KBZPay, WavePay, AYA Pay, or CB Bank accounts.': 'KBZPay၊ WavePay၊ AYA Pay သို့မဟုတ် CB Bank အကောင့်သို့ ထုတ်ယူနိုင်သည့် ပုံစံ။',
    'An example revenue model for this platform concept; no payments are processed.': 'ဤပလက်ဖောင်းအတွက် ဝင်ငွေခွဲဝေမှု နမူနာသာ ဖြစ်ပြီး ငွေပေးချေမှု မပြုလုပ်ပါ။',
    'TEACH ON BURMESE LEARNERS HUB': 'BURMESE LEARNERS HUB တွင် သင်ကြားပါ',
    'Scale Your Knowledge Across Myanmar': 'သင့်ပညာကို မြန်မာတစ်ဝန်း မျှဝေပါ',
    'Free, secure cloud video hosting & DRM privacy protection': 'လုံခြုံသော အခမဲ့ cloud ဗီဒီယိုသိုလှောင်မှုနှင့် DRM ကာကွယ်မှု',
    'Automated 3-module free previews to drive enrollments': 'သင်တန်းသားသစ်များအတွက် အခန်း ၃ ခန်း အခမဲ့ အစမ်းကြည့်နိုင်မှု',
    'Automated Telegram & Viber community channel syncing': 'Telegram နှင့် Viber အဖွဲ့များ ချိတ်ဆက်နိုင်မည့်ပုံစံ',
    'Start Teaching Today': 'ယနေ့ပဲ စတင်သင်ကြားရန်',
    'A learner viewing course lessons on a desktop monitor': 'ကွန်ပျူတာမျက်နှာပြင်တွင် သင်ခန်းစာကြည့်နေသော သင်ယူသူ',
    'A developer working with code and a web application on a wide monitor': 'ကွန်ပျူတာမျက်နှာပြင်တွင် code နှင့် ဝဘ်အက်ပ် ရေးသားနေသော developer',
    'Two product designers reviewing an interface together': 'ဒီဇိုင်နာနှစ်ဦးက အက်ပ်ဒီဇိုင်းကို အတူသုံးသပ်နေသည်',
    'A digital marketing analytics dashboard displayed on a laptop': 'လက်တော့ပ်ပေါ်ရှိ ဒစ်ဂျစ်တယ်စျေးကွက် အချက်အလက်ပြမျက်နှာပြင်',
    'Sayar Min Thant presenting a software development course beside a monitor': 'ဆရာမင်းသန့်က ဆော့ဖ်ဝဲရေးသားမှုသင်တန်းကို မိတ်ဆက်နေသည်',
    'A LITTLE LEARNING, A LOT OF SUPPORT': 'အတူလေ့လာ၍ အချင်းချင်း ပံ့ပိုးကူညီပါ',
    'Preview the Full-Stack Web Development course': 'Full-Stack ဝဘ်ရေးသားမှု သင်တန်း အစမ်းကြည့်ရန်',
    'Preview a free lesson': 'အခမဲ့ သင်ခန်းစာ အစမ်းကြည့်ရန်',
    'Preview Full-Stack Web Development': 'Full-Stack ဝဘ်ရေးသားခြင်း အစမ်းကြည့်ရန်',
    'Preview UI/UX Design Masterclass': 'UI/UX ဒီဇိုင်းသင်တန်း အစမ်းကြည့်ရန်',
    'Preview Digital Marketing and AI Automation': 'ဒစ်ဂျစ်တယ်စျေးကွက်နှင့် AI သင်တန်း အစမ်းကြည့်ရန်',
    'Meet Sayar Min Thant': 'ဆရာမင်းသန့်နှင့် တွေ့ဆုံရန်',
  };

  const t = (en, my) => window.BLH?.t(en, my) ?? en;
  const normalize = value => value.replace(/\s+/g, ' ').trim();
  const main = document.querySelector('#main');
  const textNodes = [];
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (node.parentElement.closest('svg,script,style,[data-en]')) return NodeFilter.FILTER_REJECT;
      return copy[normalize(node.nodeValue)] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  while (walker.nextNode()) textNodes.push({ node: walker.currentNode, en: normalize(walker.currentNode.nodeValue), before: walker.currentNode.nodeValue.match(/^\s*/)[0], after: walker.currentNode.nodeValue.match(/\s*$/)[0] });
  const skip = document.querySelector('.skip-link');
  if (skip) { skip.dataset.en = 'Skip to content'; skip.dataset.my = copy['Skip to content']; }
  const attributes = [];
  main.querySelectorAll('[alt],[aria-label]').forEach(element => {
    ['alt', 'aria-label'].forEach(attribute => {
      const en = element.getAttribute(attribute);
      if (copy[en]) attributes.push({ element, attribute, en });
    });
  });

  let visibleCourses = document.querySelectorAll('[data-course-card]').length;
  let localMessages = [];
  try {
    const saved = JSON.parse(sessionStorage.getItem('blh-home-chat') || '[]');
    if (Array.isArray(saved)) localMessages = saved.filter(value => typeof value === 'string').map(value => value.slice(0, 500)).slice(-15);
  } catch { /* The preview still works when browser storage is unavailable. */ }

  function refreshCount() {
    const count = document.getElementById('course-count');
    if (count) count.textContent = t(`${visibleCourses} ${visibleCourses === 1 ? 'course' : 'courses'} to start your next chapter`, `သင်တန်း ${visibleCourses} ခုဖြင့် နောက်တစ်ဆင့် စတင်ပါ`);
  }
  function renderLocalMessages() {
    const chat = document.getElementById('chat-messages');
    chat.querySelectorAll('[data-local-message]').forEach(element => element.remove());
    localMessages.forEach(body => {
      const item = document.createElement('div'); item.className = 'chat-message'; item.dataset.localMessage = '';
      const avatar = document.createElement('span'); avatar.className = 'initial-avatar'; avatar.textContent = 'Y';
      const content = document.createElement('div');
      const name = document.createElement('span'); name.className = 'chat-sender'; name.textContent = t('You · Local preview', 'သင် · စက်တွင်းနမူနာ');
      const message = document.createElement('p'); message.textContent = body;
      content.append(name, message); item.append(avatar, content); chat.append(item);
    });
  }
  function translate() {
    textNodes.forEach(({ node, en, before, after }) => { node.nodeValue = `${before}${t(en, copy[en])}${after}`; });
    attributes.forEach(({ element, attribute, en }) => element.setAttribute(attribute, t(en, copy[en])));
    window.BLH?.applyTranslations(document);
    refreshCount(); renderLocalMessages();
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(filter => { filter.classList.toggle('active', filter === button); filter.setAttribute('aria-pressed', String(filter === button)); });
    visibleCourses = 0;
    document.querySelectorAll('[data-course-card]').forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; if (!card.hidden) visibleCourses++; });
    refreshCount();
  }));
  document.querySelectorAll('[data-room]').forEach(button => button.addEventListener('click', () => { location.href = `community.html?room=${encodeURIComponent(button.dataset.room)}`; }));
  document.getElementById('chat-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.getElementById('chat-message');
    const body = input.value.trim(); if (!body) return;
    localMessages.push(body); localMessages = localMessages.slice(-15);
    try { sessionStorage.setItem('blh-home-chat', JSON.stringify(localMessages)); } catch { /* Keep the local session usable without storage. */ }
    renderLocalMessages(); input.value = '';
    const chat = document.getElementById('chat-messages'); chat.scrollTop = chat.scrollHeight;
  });
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
  window.addEventListener('blh:preferences', translate);
  translate();
})();
