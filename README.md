# Burmese Learners Hub

A responsive, self-contained website based on the supplied Burma Learners UI references. Plain HTML, CSS and JavaScript; Node.js 20+ runs the development server and static build. No dependency installation or credentials are needed.

Live website: https://theingi221.github.io/burmese-learners/

[Download the public website ZIP](https://github.com/theingi221/burmese-learners/raw/refs/heads/main/downloads/Burma-Learners.zip)

## Pages

- `index.html`: the new Splash screen from `Burma Learners.zip`.
- `auth.html`: Sign In / Create Free Account, with phone OTP and email tabs.
- `courses.html`: the previously built course catalog, community and instructor page, including its Light/Dark switch.

The new screens use the original logo and hero illustration cropped losslessly from the supplied PNG. Inter and Noto Sans Myanmar are bundled locally. At the reference's 1280px desktop width, the shared header is 104px, the main area is 786px, and the footer is 134px. Smaller widths reflow into readable layouts rather than shrinking the screenshots.

## Run

```sh
cd /workspace/burmese-learners
npm run dev
```

The server listens on port 3000 on all interfaces. Set `PORT` or `HOST` if needed. A local address alone is not a publicly accessible preview URL; use a hosting provider or a supported environment port-sharing feature to share the site.

You can also open `index.html` directly in a modern browser for an offline preview. Local form/progress persistence depends on the browser's storage policy for local files; the development server is recommended for consistent persistence.

## Build and serve the production files

```sh
npm run build
SERVE_DIR=dist PORT=3000 npm start
```

Deploy the generated `dist/` directory to any static website host. No server-side routes are required.

For the prepared GitHub Pages workflow, current deployment prerequisites, and the hosting-ready ZIP, see [DEPLOYMENT.md](DEPLOYMENT.md). A public website deployment is separate from publishing the cloud environment.

## Included interactions

- Responsive mobile navigation and anchored section links.
- Splash-to-account navigation, notification popover, and footer information dialogs.
- Sign In / Create Account and phone / email tabs, including keyboard navigation.
- Device-only OTP demonstration: request a code, enter the visibly disclosed `123456`, resend after 45 seconds, and reject codes after five minutes or a phone-number change. No SMS is sent.
- Email form validation, password visibility, confirmation matching, and session-only or remembered demo profiles. Passwords and OTPs are never stored.
- Light and dark themes, with a header toggle and a saved device preference. First visits follow the system appearance; an explicit choice persists across reloads and tabs. Instructor and footer sections retain their dark emerald treatment in light mode, matching the reference.
- Course category filters.
- Three introductory text lessons per specialization with device-local progress.
- Enrollment, mentor inquiries, instructor interest, and a local demo profile.
- Switchable study rooms and local-only demo messages.
- Accessible native dialogs, keyboard focus, reduced-motion preferences, and form validation.

This is a frontend concept, not a connected learning platform. Forms and study messages stay on the current device. No accounts are authenticated, payments processed, inquiries delivered, or real community messages sent. Community links open informational demo dialogs until the owner supplies actual destinations. Statistics, learner stories, course prices and instructor details illustrate the reference design and should be replaced with verified content before commercial use.

## Assets

All fonts and images are local, so runtime use does not require third-party requests. Inter is by Rasmus Andersson, licensed under the SIL Open Font License (see `assets/Inter-LICENSE.txt`). Noto Sans Myanmar is bundled with its OFL notice in `assets/NotoSansMyanmar-LICENSE.txt`. The new `assets/burma-*.webp` files are pixel-identical crops from the supplied Splash PNG. The five `assets/reference-*.webp` photos are lossless extractions of the embedded JPEG pixels in the earlier Figma exports. The four small `assets/reference-*.svg` backgrounds contain the original vector gradient and glow definitions, not flattened screenshots of the interface.

## Design reference

Reference: [Burmese Learners in Figma](https://www.figma.com/design/tsf0KDglyOc51CFvV5YE9B/Burmese-Learners?node-id=0-1).

The latest `Burma Learners.zip` supplies Splash and Sign Up PNGs, implemented in `index.html` / `auth.html` with shared `ui.css` / `components.js` and scoped `auth.css` / `auth.js`. It includes only desktop screens, so mobile layouts are responsive adaptations. The source image's account/security wording is represented as an explicit UI preview because no authentication backend or SMS service is connected.

The earlier `Burmese Learners.zip` and `Burmese Learners (1).zip` contain the original Light and Dark course-page SVG frames, now preserved in `courses.html`. That page uses their embedded photos, exact gradient stops, native 1280px frame width, 32px gutters, 1216px content width, 99px header, 833px hero, and 28px card radii. `design-colors.css` contains its exported palette; `design-layout.css` recreates its measured desktop geometry. The website remains semantic HTML with functional controls, rather than a single image of either design.

Direct Figma access was blocked by the environment's outbound policy, but the uploaded exports now supply the required reference locally. No additional network change or Figma credential is needed to run or inspect this version. The original SVGs and locally rendered comparison images remain in ignored `.local/design-reference/`; they are not served publicly or included in the distributable website. Only desktop frames were supplied, so mobile layouts are responsive adaptations. The requested theme toggle and device-only demo notices are functional additions to the source design.
