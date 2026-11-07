# Public website deployment

The owner approved public publication. GitHub Pages is enabled with **GitHub Actions** as its source.

- Website: https://theingi221.github.io/burmese-learners/
- Sign in: https://theingi221.github.io/burmese-learners/auth.html
- Platform homepage: https://theingi221.github.io/burmese-learners/home.html
- Course catalog: https://theingi221.github.io/burmese-learners/catalog.html
- Community: https://theingi221.github.io/burmese-learners/community.html
- ZIP download: https://github.com/theingi221/burmese-learners/raw/refs/heads/main/downloads/Burma-Learners.zip

The first successful deployment is [workflow run 42353174450](https://github.com/theingi221/burmese-learners/actions/runs/42353174450), deploying website commit `0e7875234113e56f45a4a6c01253a5e5cd5a11ec`. Subsequent application pushes deploy updates to the same URL. The expanded site includes ten screens, shared English/Burmese and Light/Dark preferences, course navigation, lesson and assignment workspaces, demo enrollment and local community interactions. Authentication, SMS, payments and shared community delivery remain frontend demonstrations.

## Future updates

`.github/workflows/pages.yml` builds on pushes to `main` and supports manual dispatch. It uses exact commit pins for official GitHub Actions, builds with Node.js 24, and uploads only `dist/`. A normal application push triggers deployment. Documentation-only commits can skip CI without changing the live application.

The active network policy permits `api.github.com` and `theingi221.github.io`. Existing GitHub authentication works for repository writes and workflow dispatch. Initial Pages creation through the integration returned a permissions error; the repository owner enabled the site through Settings → Pages. This prerequisite is now complete.

`downloads/Burma-Learners.zip` is the verified public website bundle, with `index.html` at its root. Refresh it when the website changes. It excludes private reference exports, `.local/`, Git metadata, credentials and source tooling. The GitHub download was fetched without authentication and its SHA256 verified against the local file.

Publishing this website is separate from publishing the cloud environment. Environment publication is not needed for others to visit the GitHub Pages URL.
