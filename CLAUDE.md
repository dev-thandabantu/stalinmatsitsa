@AGENTS.md

# Stalin Matsitsa — Artist Hub

## What this is

The official artist site for Stalin Matsitsa — Afropop / Maskandi / Amapiano artist from Nkomazi, Mpumalanga. Built as a gift by his brother Brighton Tandabantu. Lives at `stalinmatsitsa.vercel.app`.

Two things: the hub (`/`) and a companion letter in the `who-are-you` monorepo at `letters/to-stalin/`.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 App Router |
| Styling | Global CSS — `styles/hub.css` (no Tailwind) |
| Fonts | `next/font/google` — Bebas Neue (`--font-display`) + Inter (`--font-sans`) |
| Data | Static TypeScript files in `data/` — no CMS |
| Forms | Formspree (`NEXT_PUBLIC_FORMSPREE_ENDPOINT`) → mailto fallback |
| Deploy | Vercel (auto-deploy on push to `main`) |

---

## How to update content

Everything is in `data/`. No database, no CMS. Edit a file, push, Vercel deploys.

- **`data/releases.ts`** — add/remove tracks. Include `coverUrl` if you have cover art at `public/assets/covers/`.
- **`data/shows.ts`** — add upcoming shows. Section auto-renders when non-empty.
- **`data/streams.ts`** — streaming platform links.
- **`data/social.ts`** — TikTok, Instagram, Facebook handles.
- **`data/announcements.ts`** — text that scrolls in the gold ticker strip below the hero. Update whenever there's news.

---

## Artist info

- **Full name**: Stalin Matsitsa
- **From**: Nkomazi, Mpumalanga, South Africa
- **Genres**: Afropop · Maskandi · Amapiano
- **Contact**: stalinmatsitsa@gmail.com
- **Social**: @stalinmatsitsa (TikTok, Instagram, Facebook)

**Streaming IDs:**
- Spotify: `27eEvvtOTZDiAlAgwxqRRP`
- Apple Music: `1794538444`
- Deezer: `301492631`
- TIDAL: `54035727`

---

## Visual assets

| File | Status | Notes |
|---|---|---|
| `public/assets/body-stage-hero.png` | ✅ Real | Stage performance image — hero background |
| `public/assets/press.jpg` | ✅ Real | Stalin's Facebook profile photo |
| `public/assets/watch-thumb.jpg` | ✅ Real | YouTube thumbnail for Ngeke Ngimyeke |
| `public/assets/covers/*.jpg` | ⚠️ Placeholder | Unsplash images — replace with real cover art |
| `public/assets/hero-placeholder.jpg` | ⚠️ Placeholder | Dark concert photo — not used now that body-stage-hero.png exists |
| `public/assets/hero.mp4` | ❌ Missing | Drop a performance video here to activate video hero |
| `public/audio/preview.mp3` | ❌ Missing | Drop a track here to activate the sticky audio player |
| `public/assets/og.jpg` | ❌ Missing | 1200×630px social share image |

---

## Upgrade path

- **Hero video**: drop `public/assets/hero.mp4` → swap `hero-stage-bg` div for `<video>` in `Hero.tsx`
- **Audio player**: drop `public/audio/preview.mp3` → player activates automatically
- **Real cover art**: drop JPGs in `public/assets/covers/` → update `coverUrl` in `data/releases.ts`
- **OG image**: create `public/assets/og.jpg` → add `openGraph.images` to `app/layout.tsx`
- **Domain**: `stalinmatsitsa.com` → Vercel dashboard CNAME

---

## Page sections (in order)

1. **TopBar** — fixed nav, fades in on scroll
2. **Hero** — full-viewport, stage background, animated rhythm lines, gold sweep
3. **AnnouncementTicker** — gold strip, scrolling text from `data/announcements.ts`
4. **TheArtist** — bio, stats, press photo
5. **CollabStack** — horizontal scroll-snap slider, cover art on cards
6. **ShowDates** — auto-shows when `data/shows.ts` is non-empty
7. **WatchSection** — click-to-load YouTube embed (Ngeke Ngimyeke)
8. **StreamSection** — platform links
9. **BookSection** — conversational 5-step booking form
10. **ConnectFooter** — social links, letter link
11. **AudioPlayer** — fixed bottom, appears on scroll

---

## Session start

1. Check the open PR: `gh pr list`
2. Branch off `main` for any new work
3. `npm run dev` to preview locally
4. `npm run build` before pushing — must be clean
