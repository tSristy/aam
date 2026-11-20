# AAMF Next.js Migration

Production-oriented migration of the existing Amzad Ali Memorial Foundation frontend from React + Vite + React Router to the Next.js App Router.

The visual design and CMS workflows are intentionally preserved. The main changes are routing, server rendering, SEO metadata, crawlable content URLs, MUI SSR integration, and production-safe configuration.

## What changed

- Replaced Vite and React Router with Next.js App Router.
- Preserved the existing public routes:
  - `/`
  - `/about`
  - `/community`
  - `/moments`
  - `/news-articles`
  - `/contact`
- Preserved the existing CMS routes:
  - `/admin/login`
  - `/admin`
  - `/admin/moments`
  - `/admin/moments/new`
  - `/admin/moments/[id]/edit`
  - `/admin/news`
  - `/admin/news/new`
  - `/admin/news/[id]/edit`
- Added crawlable content detail routes:
  - `/news-articles/[slug]`
  - `/moments/[slug]`
- Public news and moments are now fetched by Next.js on the server. They are present in the initial HTML instead of appearing only after a browser `useEffect` request.
- Added per-page metadata, canonical URLs, Open Graph/Twitter metadata, JSON-LD, `robots.txt`, dynamic `sitemap.xml`, manifest, favicon, 404 page, and generated social-share images.
- Admin pages are `noindex` and blocked in robots rules.
- Preserved current localStorage/JWT admin authentication behavior so the backend contract does not have to change for this migration.
- Replaced programmatic public navigation with real anchor links via `next/link` so crawlers can discover the site hierarchy.
- Added permanent redirects for obsolete/broken internal URLs found in the old footer.
- Converted the hero banner to `next/image` for better LCP behavior while preserving the same overlay/zoom presentation.
- Added an Emotion/MUI App Router SSR registry to prevent style hydration/FOUC problems.
- Fixed case-sensitive asset imports that could fail when deployed to Linux.

## Requirements

- Node.js 20.9+ is recommended for this Next.js setup.
- Existing AAMF Express/MySQL backend running and reachable from the Next.js server.
- Existing backend CORS must continue allowing the public site origin for browser-side admin requests.

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment

Copy the example:

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Then configure:

```env
API_BASE_URL=https://api.your-domain.com/api
NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.com/api
NEXT_PUBLIC_MEDIA_BASE_URL=https://api.your-domain.com
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
```

### Environment variable purpose

`API_BASE_URL`
: Server-only URL used by Server Components, metadata pages and the sitemap. It is not exposed to browsers.

`NEXT_PUBLIC_API_BASE_URL`
: Browser-visible API URL used by the existing admin CMS authentication and CRUD requests.

`NEXT_PUBLIC_MEDIA_BASE_URL`
: Public origin serving backend `/uploads` files. This prevents SSR from leaking internal API hostnames into image URLs. Usually this is the API origin without `/api`.

`NEXT_PUBLIC_SITE_URL`
: The exact canonical production origin. This is critical for correct canonical URLs, sitemap URLs, JSON-LD and metadata.

Do not put a trailing slash on these values.

## 3. Run locally

Start the existing backend first, then:

```bash
npm run dev
```

Open:

- Public site: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`
- Sitemap: `http://localhost:3000/sitemap.xml`
- Robots: `http://localhost:3000/robots.txt`

For the provided backend defaults, `.env.local` can be:

```env
API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_MEDIA_BASE_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 4. Validate every route before deployment

Check public pages:

```text
/
/about
/community
/moments
/news-articles
/contact
```

Create one published News item and one published Moment in the CMS and verify:

```text
/news-articles/<slug>
/moments/<slug>
```

Check admin pages:

```text
/admin/login
/admin
/admin/moments
/admin/moments/new
/admin/news
/admin/news/new
```

Then edit and delete test items to verify the existing backend contract remains intact.

## 5. Production build

```bash
npm run build
npm run start
```

If the build machine cannot reach the backend, that is acceptable for compilation because public CMS fetches are runtime/dynamic. The production Next.js server must be able to reach `API_BASE_URL` when users request the dynamic content pages.

## 6. Deployment architecture

Recommended:

```text
Browser
  -> Cloudflare / reverse proxy
      -> Next.js app (www.your-domain.com)
      -> Express backend (api.your-domain.com)
          -> MySQL
          -> uploads/
```

Keep the browser-facing backend API and media origin on HTTPS in production. Never use an HTTP public API/media URL from an HTTPS frontend.

`API_BASE_URL` may use a private container/VPS address for faster server-to-server requests. If you do that, keep `NEXT_PUBLIC_MEDIA_BASE_URL` on the public HTTPS API/media origin; the Next.js server normalizes backend `cover_image` values to that public origin.

## 7. DNS and canonical setup

Pick one canonical host, for example:

```text
https://www.aamfoundation.com
```

Redirect every other public variant to it:

```text
http://aamfoundation.com        -> https://www.aamfoundation.com
http://www.aamfoundation.com    -> https://www.aamfoundation.com
https://aamfoundation.com       -> https://www.aamfoundation.com
```

Set `NEXT_PUBLIC_SITE_URL` to the final canonical host only.

## 8. Search Console / indexing

After production deployment:

1. Add and verify the canonical site in Google Search Console.
2. Submit `/sitemap.xml`.
3. Inspect the homepage, `/news-articles`, one article URL, `/moments`, and one moment URL.
4. Confirm each returns rendered content without requiring JavaScript to fetch the main content.
5. Request indexing only after canonical domain redirects are correct.
6. Add Bing Webmaster Tools and submit the same sitemap.

## 9. SEO behavior now implemented

### Static pages

Each public route has its own server-generated title, description and canonical URL.

### News articles

Each article has a permanent crawlable route using its backend slug. The page emits:

- server-rendered title/content
- canonical URL
- description from excerpt/content
- `NewsArticle` JSON-LD
- publication/update timestamps
- Open Graph article metadata
- Twitter card metadata
- backend cover image when available

### Moments

Each moment has a crawlable detail route and `ImageObject` structured data.

### Collections

`/news-articles` and `/moments` emit `CollectionPage` + `ItemList` JSON-LD.

### Site-level schema

The root layout emits `NGO` and `WebSite` schema for Amzad Ali Memorial Foundation.

### Sitemap

`sitemap.xml` includes static public routes and published news/moment detail routes from the backend.

### Robots

Public content is indexable. `/admin/` and `/api/` are disallowed and CMS metadata is explicitly `noindex`.

## 10. Important backend SEO follow-up

The frontend migration works with the backend exactly as provided. However, the backend currently regenerates a post slug whenever the title changes. That means an indexed URL can become a 404 after an editor renames a title.

For long-term SEO, apply the recommendations in:

`docs/BACKEND_SEO_RECOMMENDATIONS.md`

The most important change is to keep existing slugs stable by default and optionally support an explicit editable slug plus redirect history.

## 11. Important security follow-up

The backend ZIP supplied during migration contained a `.env` file. Do not commit or deploy shared secrets from source control. If those credentials were ever committed to a shared/public repository, rotate them.

The existing browser-local JWT login was intentionally preserved to avoid breaking the CMS. A future security hardening phase can move the admin session to secure HTTP-only cookies/BFF routes without affecting public SEO.

## 12. What was intentionally not redesigned

This migration does not change the product's visible design system, CMS field structure, community copy, forms, or backend API contract. Existing UI interactions such as news/moment modals are retained; crawlable detail pages are added alongside them.

The contact form and volunteer/patient modal submission behavior remain as implemented in the original frontend. If those forms did not submit to a backend endpoint before migration, Next.js does not invent a new backend workflow.
