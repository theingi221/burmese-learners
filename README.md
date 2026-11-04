# Burmese Learners Hub

A responsive, self-contained website based on the supplied Burmese Learners Hub reference. Plain HTML, CSS and JavaScript; Node.js 20+ runs the development server and static build. No dependency installation or credentials are needed.

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
- Light and dark themes, with a header toggle and a saved device preference. First visits follow the system appearance; an explicit choice persists across reloads and tabs. Instructor and footer sections retain their dark emerald treatment in light mode, matching the reference.
- Course category filters.
- Three introductory text lessons per specialization with device-local progress.
- Enrollment, mentor inquiries, instructor interest, and a local demo profile.
- Switchable study rooms and local-only demo messages.
- Accessible native dialogs, keyboard focus, reduced-motion preferences, and form validation.

This is a frontend concept, not a connected learning platform. Forms and study messages stay on the current device. No accounts are authenticated, payments processed, inquiries delivered, or real community messages sent. Community links open informational demo dialogs until the owner supplies actual destinations. Statistics, learner stories, course prices and instructor details illustrate the reference design and should be replaced with verified content before commercial use.

## Assets

All fonts and images are local, so runtime use does not require third-party requests. Inter is by Rasmus Andersson, licensed under the SIL Open Font License (see `assets/Inter-LICENSE.txt`). The five `assets/reference-*.webp` photos are lossless extractions of the embedded JPEG pixels in the user's supplied Figma exports. The four small `assets/reference-*.svg` backgrounds contain the original vector gradient and glow definitions, not flattened screenshots of the interface.

## Design reference

Reference: [Burmese Learners in Figma](https://www.figma.com/design/tsf0KDglyOc51CFvV5YE9B/Burmese-Learners?node-id=0-1).

The uploaded `Burmese Learners.zip` and `Burmese Learners (1).zip` contain the original Light and Dark SVG frames. The implementation uses their embedded photos, exact gradient stops, native 1280px frame width, 32px gutters, 1216px content width, 99px header, 833px hero, and 28px card radii. `design-colors.css` contains the exported palette and paints; `design-layout.css` recreates the measured desktop geometry and provides tablet/mobile reflow. The website remains semantic HTML with functional controls, rather than a single image of the design.

Direct Figma access was blocked by the environment's outbound policy, but the uploaded exports now supply the required reference locally. No additional network change or Figma credential is needed to run or inspect this version. The original SVGs and locally rendered comparison images remain in ignored `.local/design-reference/`; they are not served publicly or included in the distributable website. Only desktop frames were supplied, so mobile layouts are responsive adaptations. The requested theme toggle and device-only demo notices are functional additions to the source design.
