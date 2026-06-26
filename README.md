# totcho.app

Public website for [Tot](https://github.com/MERSNZ/tot-app) — privacy policy and support pages served via GitHub Pages.

## Live URLs

| Page | URL |
|------|-----|
| Home | https://totcho.app/ |
| Privacy policy | https://totcho.app/privacy/ |

Use **`https://totcho.app/privacy/`** in App Store Connect, Google Play Console, and Supabase OAuth settings.

## Favicons

Static icons live in **`favicon/`** (ICO, SVG, PNG, `site.webmanifest`). Linked from each page `<head>` with root-absolute paths (`/favicon/...`) so they work on `/` and `/privacy/`.

After changing icons, hard-refresh or clear cache to verify in the browser tab.

## Enable GitHub Pages

1. Repo **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` → **`/ (root)`**
4. Save

## Custom domain

`CNAME` is set to `totcho.app`. In Pages settings, confirm the custom domain and add DNS A records at your registrar (see GitHub’s Pages docs). Enable **Enforce HTTPS** once DNS propagates.

## Keeping privacy policy in sync

Policy text must match `tot-app` → `src/screens/PrivacyPolicyScreen.tsx`. When you update the in-app policy, edit `privacy/index.html` here and bump the “Last updated” date in both places.

Contact: **hello@totcho.app**
