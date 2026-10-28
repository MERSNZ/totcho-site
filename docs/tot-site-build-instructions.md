# Build brief: Tot website (totcho.app)

You are updating the marketing site for **Tot**, a free carbohydrate calculator app for families. The site lives in this repo and is hosted on GitHub (Pages). Your job is to turn the current single page into a small, fast, five-page static site using the copy in this brief.

Read this whole brief before changing anything.

---

## 1. Ground rules

1. **Inspect the repo first.** Work out how the site is built today (plain HTML, Jekyll, or something else), where styles and images live, and how GitHub Pages serves it (`CNAME`, branch, `/docs` folder, etc.). Extend what's there. Do not introduce a framework, bundler or build step that doesn't already exist.
2. **Do not change the privacy policy content.** Leave `/privacy/` exactly as it is. The page now uses the shared header, footer and page layout (approved by the owner); the policy text and its markup must stay word-for-word unchanged.
3. **Keep the existing brand.** Reuse the current logo (`/images/logo.svg`), the theme colour `#E60080` (sparingly — see rule 4), and existing styles. Refine and extend; don't redesign from scratch.
4. **Match the app's look.** The site should reflect the Tot app: refined, simple, very minimal colour, and **no rounded corners** on buttons, cards or other UI elements. (The official App Store / Google Play badges keep their own artwork.)
   - **Colour:** white and greys throughout. No pink backgrounds, bands or tinted sections; alternate sections use a very light grey (`#F9F9F9`). Tot pink appears only on the logo and in small accents: inline text links, list ticks, keyboard focus outlines, and the header nav (current/hovered link shown as Tot pink `#E60080` text on a pale pink `#FFF2F8` highlight, square corners). Inline text links, list ticks, focus outlines and nav highlight text all use `#E60080`, with links turning near-black on hover. `#E60080` is 4.49:1 on white, a hair under AA for body text; the owner has accepted this. Footer links stay grey with no underline (underline on hover), with the current page in semibold.
5. **Typeface: Inter Variable only**, the same font the app uses (`tot-app` → `assets/fonts/InterVariable.ttf`). It is self-hosted as a Latin subset at `/fonts/InterVariable-latin.woff2` (weights 100–900, `opsz` axis kept), declared via `@font-face` in `styles.css` with `font-display: swap`, and preloaded on each page. Inter's SIL Open Font License lives at `/fonts/LICENSE.txt` and must stay alongside the font. Fall back to the system font stack.
6. **No trackers, ever.** No analytics, no third-party pixels, no embedded social widgets, no cookie banner. Tot promises "no ads, no data selling" and the site must match. Avoid third-party requests generally: never load Google Fonts or other font CDNs.
7. **Static and fast.** Plain HTML + CSS. Only add JavaScript if a feature genuinely needs it. The one exception so far is `/scripts/header.js` (see "Header" in section 3). Every page should work with JS disabled.
8. **Copy is final.** Use the text in section 4 word for word. Do not add marketing claims, medical claims, statistics or testimonials. Text in `[square brackets]` is a placeholder or instruction, not copy — see section 5.
9. **Spelling is NZ English** (colour, favourite, organise). Keep it.

---

## 2. Site structure

Use folder-style URLs with `index.html` so trailing-slash URLs work on GitHub Pages:

| Page | File | URL |
| --- | --- | --- |
| Home | `/index.html` | `/` |
| How it works | `/how-it-works/index.html` | `/how-it-works/` |
| FAQ | `/faq/index.html` | `/faq/` |
| About | `/about/index.html` | `/about/` |
| Privacy policy | existing | `/privacy/` (unchanged) |

Also add:

- `/sitemap.xml` listing all five URLs on `https://totcho.app`.
- `/robots.txt` allowing all and pointing to the sitemap (if not already present).
- A simple `/404.html` with the logo, "Sorry, that page doesn't exist." and a link home.

---

## 3. Shared layout and components

### Header (all pages)
- Logo (links to `/`), then nav: **How it works · FAQ · About**.
- Mobile: nav must stay usable at 360px width. A simple wrapping row of links is fine — no hamburger JS needed.
- Mark the current page in the nav with `aria-current="page"`.
- **Pinned, hide on scroll:** the header is `position: sticky` at the top. `/scripts/header.js` (loaded with `defer`) hides it while scrolling down and shows it again on any scroll up or when back near the top. It stays visible while keyboard focus is inside the header, and the slide animation is turned off for `prefers-reduced-motion`. Without JS the header simply stays pinned.

### Footer (all pages)
```
Tot — carb counting for families
Home · How it works · FAQ · About · Privacy policy
Questions? [contact email]
```
Then the disclaimer in small text:

> Tot is a carbohydrate calculator, not a medical device. It does not provide medical advice or insulin dosing. Always follow the guidance of your healthcare team.

### App store buttons (reusable component)
- Two buttons side by side: **Download on the App Store** and **Get it on Google Play**.
- Use the official badge artwork from Apple and Google (SVG), stored locally in `/images/badges/`. Follow their usage guidelines (don't recolour or distort).
- Links: check the repo for existing store URLs. If none exist, use `href="#"` with a clear `<!-- TODO: App Store URL -->` comment and list this in your summary.
- Stack vertically on narrow screens.

### Screenshot slots
- Screenshots go in `/images/screenshots/`. Use the filenames listed in section 4.
- Render each inside a simple phone-shaped frame (CSS border-radius + subtle shadow is enough — no device mockup images).
- Every screenshot needs meaningful `alt` text (provided in section 4), explicit `width`/`height` to avoid layout shift, and `loading="lazy"` except the hero image.
- If a screenshot file doesn't exist yet, add a visible placeholder box with the filename so the owner knows what to drop in.

### Contact email
The current homepage has the contact email (it's behind Cloudflare email obfuscation in the live HTML). Find the real address in the repo source and reuse it everywhere `[contact email]` appears, as a `mailto:` link.

---

## 4. Page copy

### 4.1 Home (`/`)

**`<title>`:** Tot — Free carb counting app for families
**Meta description:** A free carbohydrate calculator for families living with type 1 diabetes. Weigh it, tap it, see the total. No ads, no subscriptions.

---

**Hero**

# Carb counting, minus the maths.

Tot is a free carbohydrate calculator for families living with type 1 diabetes. Pick the food, weigh it, and Tot adds it up.

[App store buttons]

Free. No subscriptions, no ads, no data selling.

[Screenshot: `home-list.png` — alt: "Tot's saved foods, listed A to Z with a search bar, and a running total of 38 g carbs"]

Layout: on desktop, text left and screenshot right. On mobile, text first, screenshot below the buttons.

---

**Sound familiar?**

Peer at the label. Weigh the food. Work out the carbs. Check your sum. Then do it again for the next thing on the plate.

Breakfast, school lunch, after-school snack, dinner — every day. There's no sugar-coating it, carb counting is a burden.

[Photo: `cereal-packet.png` (keep transparency) — alt: "Back of a breakfast cereal sachet, showing carbohydrate at 65.2 g per 100 g on the nutrition panel". Not a phone frame; sit to the right of the text on desktop (300px wide), below the text on mobile, at 75% opacity, rotated 10° clockwise.]

---

**One job, done well**

Tot does one thing: works out how many carbs are in the food you're preparing and eating. No diet tracking, no charts, no features you'll never use. Just quick, accurate carb counting.

Render these five as a card grid (1 column mobile, 2–3 columns desktop). Each card has a [Lucide](https://lucide.dev) icon above its heading (in order: `calculator`, `circle-check`, `cooking-pot`, `users`, `wifi-off`), inlined as SVG with `aria-hidden="true"`, grey `#171717`, stroke width 1.5. Lucide is ISC-licensed; keep the attribution comment in the HTML.

- **Less mental maths** — Save a food once with its carb %. After that, just weigh it and tap.
- **Fewer slip-ups** — Tot does the arithmetic, so you're not adding numbers in your head at 7am with a lunchbox half-packed.
- **Home cooking, sorted** — Tot up carb containing ingredients as you cook, then weigh the finished dish. Tot turns it into a food with a known carb %, so a scoop of homemade lasagne is as easy as a slice of bread.
- **The whole household, on the same page** — One shared account for your family. Invite a partner, grandparent or older child with a quick QR code scan.
- **Works anywhere** — Tot works fully offline, even in airplane mode. Changes sync to everyone's phones when you're back online.

[Screenshot: `home-weigh.png` — alt: "Weighing 65 g of banana at 20.4% carbohydrate in Tot, giving 13.3 g carbs"]

---

**How it works**

1. **Pick the food** from your saved list.
2. **Weigh it** on your kitchen scales, or enter the number of pieces.
3. **Add it to your Tot list.** Tot shows the total carbs as you go.

[Screenshot: `tot-list.png` — alt: "Tot list with four foods, their weights and carbs, adding up to 45 g total carbohydrate"]

Link: **See it step by step →** (to `/how-it-works/`)

Panel background: light grey (`#F9F9F9`) only. No photo overlay.

---

**What you'll need**

- The Tot app on your iPhone or Android phone
- Digital kitchen scales
- The carbohydrate % from your food packaging

---

**Free. Really.**

No subscriptions, no ads, no selling your data. Sign in with the Google or Apple account you already have.

---

**Made by a parent who gets it**

Tot was designed by a parent whose daughter has type 1 diabetes. We built it for our own kitchen and wanted other families to have it too.

Link: **Read our story →** (to `/about/`)

---

**Closing call to action** (full-width band, light grey background — not brand colour)

## Make your next meal a little easier.

[App store buttons]

---

### 4.2 How it works (`/how-it-works/`)

**`<title>`:** How Tot works — Carb counting in seconds
**Meta description:** Save your foods once, then weigh and tap. Share with the whole household and turn home cooking into foods with a known carb %.

---

# From scales to carbs in seconds.

Tot works the way you already do — using your food, your scales and the label on the packet. It just reduces repetition and takes the maths off your hands.

## Getting set up (once)

1. **Download Tot** from the App Store or Google Play.
2. **Sign in** with your Google or Apple account. No new password to remember.
3. **Create your household.** Everyone in it shares the same saved foods.
4. **Invite your people.** Partner, grandparents, babysitter, older kids — they scan a QR code on your phone and they're in.

[Screenshot: `add-device.png` — alt: "Tot's Add device screen, showing a QR code and a six-letter code to type in on the joining phone"]

## Saving your foods (once per food)

Add the foods and ingredients your family eats. For each one, enter its carbohydrate % from the nutrition panel on the packet. Foods you count by the piece — crackers, nuggets, biscuits — can be saved per piece instead.

You'll build up your list over the first week or so. After that, most items are already in there, ready to use.

[Screenshot: `add-food.png` — alt: "Adding milk to the Tot library at 4.8% carbohydrate, with an optional carbs-per-piece field"]

## Every meal

1. **Pick the food** from your saved list.
2. **Weigh it**, or enter the number of pieces.
3. **Add it to your Tot list**, the total updates as you go.

[Screenshots, as a left-to-right sequence below the steps (one row on desktop and tablet, a swipeable strip on narrow screens):
`find-food.png` — alt: "Searching saved foods in Tot for rice";
`use-food.png` — alt: "Weighing 105 g of cooked rice in Tot, giving 29.4 g carbs";`tot-list.png` — alt: "Tot list with four foods, their weights and carbs, adding up to 45 g total carbohydrate"]

## Quick use

One-off food? Use Quick use to add it to your Tot list without saving it to your library. Enter the weight and carb %, or just type in the grams of carbs if you already know them.

[Screenshot: `quick-use.png` — alt: "Tot's Quick use screen, with fields for weight, percent carbohydrate and grams of carbohydrate, and a note that the food won't be saved in the library"]

## Home cooking using the weigh-log

Homemade food is usually the hardest to count. Tot's weigh-log option makes it simple:

1. Tot up all the carb-containing ingredients as you cook.
2. Log the Tot list as a weigh-log.
3. Once cooked, enter the finished weight and Tot works out its carb % and saves it to your foods.

Next time, serve a portion, weigh it, and add it like anything else. Leftovers in the fridge? Still sorted.

[Screenshots, as a left-to-right sequence below the text (one row on desktop and tablet, a swipeable strip on narrow screens):
`tot-logs.png` — alt: "Tot logs: past Tot lists by date, with today's 5.40pm weigh-log of 4 items and 248 g carbs at the top";
`weigh-log.png` — alt: "A weigh-log of four baking ingredients (gluten-free flour, sugar, almond flour and cocoa), totalling 248 g carbohydrate";
`convert.png` — alt: "Converting the weigh-log into a food called Choc Slice: 563 g total, 44.0% carbohydrate"]

## Works offline, and stays with you

Out of coverage? Tot works fully offline, even in airplane mode. Anything you add syncs to the rest of your household when you're back online.

Lost your device? No problem, just install the app on your new device and sign in with your Google or Apple account.

---

## Ready to try it at your next meal?

[App store buttons]

---

### 4.3 FAQ (`/faq/`)

**`<title>`:** Tot FAQ — Cost, privacy and accuracy
**Meta description:** Answers about Tot: what it costs, what happens to your data, where to find carb %, and what Tot does and doesn't do.

Build each question as a native `<details>`/`<summary>` element (accessible, no JS). Leave all closed by default. Also add `FAQPage` JSON-LD structured data in the `<head>` containing the same questions and answers (plain text, no placeholders).

# Frequently asked questions

**Who is Tot for?**
Families living with type 1 diabetes, and anyone else who counts carbs in the food they cook and eat at home.

**Is Tot a medical app?**
No. Tot is a calculator. It adds up the carbs in your food. It doesn't give insulin doses, connect to pumps or CGMs, or offer medical advice. Use your total the way your diabetes team has shown you.

**What does it cost?**
Nothing. No subscriptions, no ads, no in-app purchases. We built Tot for our own family and want others to benefit too.

**What happens to my data?**
We don't sell it, and we don't show ads. You sign in with your existing Google or Apple account. Read the full [privacy policy](/privacy/).

**Does it work without internet?**
Yes. Tot works fully offline, even in airplane mode. Changes sync to the other phones in your household when you're back online.

**What happens if I lose my device?**
No problem, just install the app on your new device and sign in with your Google or Apple account.

**Can the whole family use it?**
Yes. Create one household, then invite others by scanning a QR code. Everyone shares the same saved foods.

**Where do I find the carb %?**
On the nutrition information panel on the packet. Look for **Carbohydrate** in the **per 100 g** column — that number is the %. For example, 62 g per 100 g = 62%. For fresh food without a label, use a trusted reference such as your diabetes team's carb lists.

**Do I need kitchen scales?**
Yes. Digital scales give the best results.

**How accurate is Tot?**
Tot's maths is exact. Your total is as accurate as the weights and carb % you enter — the same as working it out by hand, without the arithmetic errors.

**What about home cooking?**
Use a weigh-log. Tot up the carb-containing ingredients as you cook and save the list as a weigh-log. Then enter the weight of the finished dish, and Tot converts the log into a food with its own carb %, ready to weigh and serve like anything else.

**Which devices does it run on?**
Tot supports iOS 15.1 and later (iPhone and iPad) and Android 7.0 and later.

---

### 4.4 About (`/about/`)

**`<title>`:** About Tot — Made by a T1D family
**Meta description:** Tot was built by a designer whose daughter has type 1 diabetes, to make daily carb counting lighter. Now free for every family.

---

# Built in our kitchen, for yours.

Our daughter was diagnosed with type 1 diabetes when she was 11. From that day, carb counting was part of everyday life. Labels, reading glasses for the fine print, scales, calculator, notebooks. Then the same again for the next thing on the plate.

The maths wasn't hard. It was just repetitive and time-consuming, and it had to be right — several times a day, every day, often while doing three other things.

I'm a designer, so I did what designers do: I built a tool to make the job simpler. Tot started as something just for our household. It became the thing we reached for at every meal, and the thing grandparents could use without a phone call to check.

We know we're not the only family doing these sums. So we've made Tot free for anyone who might find it useful. No ads, no subscriptions, no catch.

If Tot makes your day a little better, that's all we're after. And if you have ideas to improve it, we'd genuinely love to hear them.

[Signature: leave an HTML comment `<!-- TODO: owner's first name -->` here, render nothing visible]

[Optional image: `about-kitchen.jpg` — alt: "Kitchen scales and a phone running Tot on a bench". Placed after the third paragraph. If the file doesn't exist, omit the image entirely (no placeholder on this page).]

**Get in touch:** [contact email]

[App store buttons]

---

## 5. Placeholders — how to handle them

| Placeholder | What to do |
| --- | --- |
| `[App store buttons]` | Insert the shared badge component (section 3). |
| `[Screenshot: file — alt: "…"]` | `<img>` from `/images/screenshots/<file>` with that alt text, in the phone frame. Visible placeholder box if missing (except About, see above). |
| `[contact email]` | Real address from the repo, as a `mailto:` link. |
| Store URLs | Use existing URLs from the repo, else `#` + TODO comment. |

---

## 6. Technical requirements

**Every page `<head>`:**
- `<meta charset="utf-8">`, viewport meta, the page's `<title>` and meta description from section 4.
- `<meta name="theme-color" content="#E60080">`.
- `<link rel="canonical">` with the full `https://totcho.app/...` URL (trailing slash).
- Open Graph and Twitter card tags: `og:title`, `og:description`, `og:url`, `og:type=website`, `og:image` (create `/images/og-image.png`, 1200×630, logo on brand colour, if one doesn't exist), `twitter:card=summary_large_image`.
- Favicon: reuse the existing one; add `apple-touch-icon` if missing.
- Font preload: `<link rel="preload" href="/fonts/InterVariable-latin.woff2" as="font" type="font/woff2" crossorigin>`.
- Header script: `<script src="/scripts/header.js" defer></script>`.
- On the Home page, add `SoftwareApplication` JSON-LD: name "Tot", operatingSystem "iOS, Android", applicationCategory "HealthApplication", offers price "0".

**Accessibility:**
- One `<h1>` per page; headings in order.
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`.
- Colour contrast at least WCAG AA. Pink text uses Tot pink `#E60080` (4.49:1 on white, a hair under AA for body text; accepted by the owner).
- Visible focus styles on all links and buttons.
- Add a "Skip to content" link.

**Responsive:**
- Mobile-first. Test at 360px, 768px and 1280px widths. No horizontal scrolling at any width.
- Max content width around 1100px; comfortable reading line length (~65 characters) for body text.

**Performance:**
- No render-blocking third-party resources.
- Optimise images (WebP with PNG fallback is fine via `<picture>`, or compressed PNG). Keep each screenshot under ~200 KB.
- Inline or single shared CSS file; no CSS framework downloads.

---

## 7. Before you finish — checklist

- [ ] All five URLs load locally with and without trailing slash behaviour matching GitHub Pages.
- [ ] `/privacy/` content is byte-for-byte unchanged (diff it).
- [ ] Every internal link works; nav highlights the current page.
- [ ] No requests to third-party domains (check the browser network tab) other than the App Store / Google Play links themselves.
- [ ] Copy matches this brief exactly; spot-check NZ spelling wasn't "corrected".
- [ ] All images have alt text; no layout shift on load.
- [ ] Pages pass a Lighthouse run with Accessibility and SEO ≥ 95.
- [ ] `sitemap.xml`, `robots.txt`, `404.html` present.

## 8. Report back

When done, give a short summary listing:
1. Files added and changed.
2. Every TODO left (store URLs, owner name, missing screenshots by filename, OG image if created as a placeholder).
3. Anything in this brief you couldn't follow and why.
