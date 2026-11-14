# Burmese Learners Hub

A responsive learning website built from the supplied Burma Learners UI exports. All pages support English / Burmese and Light / Dark appearance. Preferences persist across navigation, reloads, and tabs. Plain HTML, CSS and JavaScript; Node.js 20+ runs the development server and static build. No package installation or credentials are needed to run it.

Live website: https://theingi221.github.io/burmese-learners/

[Download the public website ZIP](https://github.com/theingi221/burmese-learners/raw/refs/heads/main/downloads/Burma-Learners.zip)

## Pages

| File | Screen |
| --- | --- |
| `index.html` | Welcome / Splash |
| `auth.html` | Sign In / Create Account |
| `home.html` | Full learning platform homepage |
| `catalog.html` | Searchable course catalog with filters |
| `course.html?course=react` | Course details, projects and curriculum |
| `lesson.html?course=react` | Lesson workspace, syllabus and progress |
| `assignment.html?course=react` | Assignment workspace and saved draft |
| `payment.html?course=react` | Clearly labeled demo checkout |
| `confirmed.html?course=react` | Demo enrollment summary and next steps |
| `community.html` | Mentor sessions, study groups and discussion previews |

`courses.html` redirects the previous public homepage address to `home.html`. Supported course IDs are `react`, `figma`, `marketing`, `flutter`, `python`, and `cloud`. The supplied lesson and assignment screens contain a React sample; other course links clearly identify that shared preview. Syllabus outlines are distinct from available lessons.

## Run and build

```sh
npm run dev
```

The development server listens on port 3000. Set `HOST=127.0.0.1` for local-only access, or set `PORT` as needed. To build and serve the production files:

```sh
npm run build
SERVE_DIR=dist HOST=127.0.0.1 PORT=3000 npm start
```

The build checks browser JavaScript syntax and local asset references, then copies the public website into `dist/`. Deploy that directory to a static website host. All page links are relative, including GitHub Pages project-path navigation. See [DEPLOYMENT.md](DEPLOYMENT.md) for publication details.

You can also open `index.html` directly in a modern browser for an offline preview. Browser storage policies for local files differ; the development server provides consistent preference and demo-state persistence.

## Interactions and limits

- Shared responsive navigation, appearance and language controls, translated dialogs and local fonts.
- Course search, specialization filters, curriculum expansion and course-specific navigation.
- Local lesson progress, study notes, assignment drafts and filename previews.
- Local study-room membership, messages, group creation, reminders and helpful votes.
- Demo checkout validation, local demo enrollment and downloadable summary.
- Phone OTP demonstration using the visibly disclosed `123456`, 45-second resend delay and five-minute expiry. No SMS is sent.
- Email form validation, password visibility and session-only or remembered demo profiles. Passwords and OTPs are never stored.

This is a frontend demonstration. Authentication, payment verification, video delivery, instructor submissions and shared community services require a backend. Checkout prominently identifies itself as a demo and asks visitors not to transfer money. Messages, progress and form state stay in the current browser. Uploaded files are not delivered; demo forms retain filenames only. Course prices, statistics and instructor details illustrate the reference.

## Design and assets

The primary brand color is defined in `brand.css`: solid `#46A237`, shared by Light and Dark modes. Primary actions, navigation, filters and progress use this exact fill. Dark foregrounds and derived text shades keep labels readable. Every page header uses the same high-resolution transparent logo, with a white treatment in Dark Mode.

The site now uses one minimalist visual system: neutral ivory surfaces in Light Mode, charcoal green surfaces in Dark Mode, consistent typography, restrained borders and shadows, and solid brand-green actions. `minimal.css` defines shared tokens, navigation, footer and common panels. Page-specific refresh files supply layout without changing learning or demo enrollment behavior. Mobile course cards use horizontal thumbnails, wrapping titles and 44px actions; catalog filters collapse behind an accessible native disclosure.

`assets/learning-3d.svg` and `assets/community-3d.svg` are original, transparent vector illustrations created for this refresh. They use simple isometric shapes and soft shadows and contain no language-specific text. The welcome, account and community views use these illustrations. `assets/platform/` contains deduplicated media extracted from the supplied exports; `asset-manifest.json` records their provenance. Original course and instructor photos remain local. Both header and footer use the high-resolution transparent logo.

The shared stylesheet loads after `brand.css`, followed by the relevant page files:

| File | Scope |
| --- | --- |
| `landing-refresh.css` | Welcome, Home and Sign In |
| `course-cards.css` | Home and catalog course cards and mobile filter disclosure |
| `community-refresh.css` | Community |
| `classroom-refresh.css` | Lesson and Assignment |
| `enrollment-refresh.css` | Demo checkout and confirmation |

Inter and Noto Sans Myanmar are bundled locally with their SIL Open Font License notices. Runtime pages require no external image or font requests. Original private uploads and rendered design comparisons remain in ignored `.local/` and are excluded from the public site and download bundle.

Original design: [Burmese Learners in Figma](https://www.figma.com/design/tsf0KDglyOc51CFvV5YE9B/Burmese-Learners?node-id=0-1).
