# Public website deployment

The static website is built and ready to deploy. Public publication has been requested by the owner, but no public deployment has yet been verified.

## Prepared route: GitHub Pages

The selected repository is `theingi221/burmese-learners`. The workflow in `.github/workflows/pages.yml` builds the site on pushes to `main`, publishes only `dist/`, and uses exact commit pins verified against the official GitHub Actions repositories. All browser URLs are relative, so the repository subpath is supported.

Current prerequisite: the environment's outbound proxy denies `api.github.com` before an API response is received. Native HTTPS Git reads work; API authentication and administrative Pages permissions are not yet verified. `GH_TOKEN` is already present; no additional credential should be requested until the existing binding has been tested after connectivity is restored. Do not print or extract its value.

A network draft preserves prior custom destinations and adds `api.github.com` and `theingi221.github.io`. Saving that draft does not apply or publish it. Apply the network settings through the environment settings workflow before retrying the API operation. Do not route around the proxy denial.

Once API access works:

1. Read the repository metadata and current branches. Preserve any remote work and verify Pages availability for the repository's visibility and plan.
2. Check the existing Pages configuration. If missing, enable GitHub Pages with **GitHub Actions** as the source, using the existing GitHub authentication and verified permission.
3. Commit the website and workflow with an explicit source allowlist. Exclude `.local/`, private reference exports, attachments, Git metadata, and generated `dist/`. Push the resulting website to the repository's `main` branch without force.
4. Wait for the deployment workflow to succeed. Read its actual `page_url` result; do not present a guessed URL as live.
5. Verify the public page, the theme script, the stylesheets, and an original course photo through HTTPS. Check that Light/Dark switching and course previews work under the repository subpath.

Publication of the cloud environment is separate from deploying this public website.

## Hosting-ready ZIP

`.local/burmese-learners-publish.zip` contains only the contents of `dist/`, with `index.html` at its root. It excludes source tooling and the private uploaded SVGs. This is the ZIP for a static host such as Netlify Drop; the source-code ZIP has a parent project directory and serves a different purpose.

If deploying manually, sign into the intended hosting account, upload the public ZIP or the unzipped folder containing `index.html`, then use the actual URL returned by that host. A configured hosting account is required to retain ownership and manage future deployments.
