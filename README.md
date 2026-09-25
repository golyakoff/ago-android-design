# AGO Android Design

The design source of truth for AGO Chat's Android app — a static mini-site, public but
unadvertised, at its own subdomain (`android-design.reserve-me.ru` once `26-131` wires the route),
separate from the product repositories the same way `ago-brandbook` is separate from
`ago-landing`/`ago-console` (`ago-root/docs/architecture/repositories.md`): each deployable surface
gets its own repo.

`26-130` moved this out of a single Artifact (`ago-root` 26-00, ~200 KB, revised through
26-90/26-96/26-97/26-112/26-126) into small per-section files in git — the Artifact was expensive to
iterate on: changing one screen meant rereading the whole file. This repository is organised **by
section**, not by feature or ticket, so a screen lives where a reader would look for it rather than
where the ticket that touched it last happened to land.

Static HTML — no build step, no framework, no bundler — the same shape `ago-brandbook` and
`ago-landing` use, and for the same reason: plain pages, a shared stylesheet, one shared script,
nothing here needs a build step.

Unlike `ago-brandbook` — which deliberately keeps its own chrome palette separate from the product
tokens it displays as reference data — this site's own subject *is* the product, so its chrome uses
the product's real tokens directly (`ago-console/src/design/tokens.css`, carried over unchanged from
the original artifact: `--brand`, `--ink`, `--paper`, `--line`, the presence-indicator green, and
their measured dark-mode values).

## What's here

- `index.html` — table of contents linking the six section pages.
- `common.html` — the transition graph between every screen, the account/header pattern (avatar
  chip with presence, profile menu), and the wide-screen (tablet) breakpoint.
- `login-boot.html` — sign-in and the platform-owner terminal screen.
- `dialogs.html` — the dialogs list (Мои/Ожидают/Все), thread, visitor sheet, and the notifications
  screen.
- `booking.html` — Ожидают/Утверждены/Клиенты, the booking detail sheet (`26-112`), and the whole
  booking-readiness configuration flow.
- `team.html` — the Команда tab. The transition graph already names its three screens
  (`TeamChat`/`People`/`InviteSheet`); none of them has been drawn yet, so this page says that
  plainly instead of standing empty. Fill it in when they are.
- `settings.html` — the Настройки screen (theme, language, current site) and the redesigned Ещё menu
  (channels, automation, storage).
- `common.css` — the shared design system for every page: the phone frame, Material chrome, the
  product's own color/type tokens (light and dark), plus this site's own small amount of chrome
  (top nav, table-of-contents cards) appended after a marker comment.
- `tokens.js` — the shared shell's only script: the corrected glyph sprite (`26-126` — rounded-rect
  `chat_bubble`, mirrored `phone`), the bottom-navigation markup, and the light/dark theme toggle.
  Injected at load time into a `<div id="glyph-sprite">`/`<div data-bnav="...">` placeholder each
  page carries, so a glyph or nav change is one edit instead of six.
- `Dockerfile` — packages it behind a minimal `nginx:1.31-alpine-slim`, matching `ago-brandbook`'s
  own no-build-step static-file pattern.
- `.github/workflows/ci.yml` — builds the image on every pull request and publishes it from `main`.

## Running it locally

```bash
cd ago-android-design
docker build -t ago-android-design:local .
docker run --rm -p 8092:80 ago-android-design:local
# open http://localhost:8092
```

Or just open `index.html` directly in a browser — it has no server-side dependency, though a static
file server (e.g. `python -m http.server`) is more honest to how it's actually served, since opening
via `file://` is subject to browser-specific quirks the deployed site never sees.

## Deployment

CI publishes `ghcr.io/golyakoff/ago-android-design:<40-char commit SHA>` on every push to `main`,
using the workflow's own `GITHUB_TOKEN` and no other secret. The route
(`static.yaml` + Gateway/HTTPRoute/Certificate wiring in `ago-deploy`) is `26-131`, out of scope for
this repository until the subdomain is provisioned.

The image serves `/version.json` — `{"app":"ago-android-design","commit":"<sha>"}` — so
`curl https://android-design.reserve-me.ru/version.json` (once routed) names the deployed commit
without cluster access. This page takes no build-time configuration at all: there is no environment
for the image to have been pointed at, so its SHA tag means one thing with no extra effort.

## Where the design actually comes from

The screens are Material components, drawn on AGO Chat's own product palette
(`ago-console/src/design/tokens.css`), not a copy of the web console's layout. Every caption next to
a screen carries its own route/ticket reference and the reasoning behind a redesign, the same
documentary style the source Artifact used — that context moved here with the screens, not just the
markup.

The original Artifact (`8b4fb3a8`) stays where it was published, as a snapshot of the design at that
point in time. This repository is the new source of truth going forward.

## License

MIT — see `LICENSE`.
