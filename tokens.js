// AGO Android Design - the shared shell's only script.
//
// `26-130`: the artifact this site replaces drew its glyph sprite and bottom navigation once per
// page (it was one page). Six section pages copy-pasting that markup by hand would turn "fix a
// glyph" back into "fix it in six places and hope none drifts" - exactly what `26-126` already cost
// once, live, in the artifact this repository replaces. So the sprite and the bottom-nav markup are
// defined exactly once, here, and every page injects them at load time. There is still no build
// step: this is the plain-`<script>`, no-bundler shape `ago-brandbook`'s own `tokens.js` already
// uses, just carrying shell markup instead of swatch data, because that is what this site's shared
// shell needs to define.

// ---- Corrected glyph sprite (26-126) --------------------------------------------------------
// chat_bubble: rounded-rectangle Material silhouette (rect + short bottom-left tail), replacing
// the round Feather-style tailed oval the source artifact still carried at the time this repo was
// created. phone/call: mirrored horizontally (handset under the right hand) via a `<g transform>`
// around the original, untouched path - see the comments inlined in the sprite below for why a
// transform is the auditable way to do that instead of hand-flipping coordinates.
const AGO_SPRITE_HTML = `
<svg style="display:none" aria-hidden="true">
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></symbol>
  <symbol id="i-more" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/></symbol>
  <symbol id="i-back" viewBox="0 0 24 24"><path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></symbol>
  <!-- \`26-126\`: chat_bubble corrected to Material's rounded-rectangle silhouette (a slightly
       rounded rect body plus a short bottom-left tail), replacing the earlier round Feather-style
       tailed oval this artifact still carried. Drawn as a \`rect\`+\`path\` pair rather than one
       hand-plotted outline, because that is the honest way to author a stroke version of a filled
       Material glyph (fill:none, stroke-width:1.8, round caps/joins - the whole sprite's rule) without
       guessing at Material's exact filled path coordinates and calling the guess "the same icon". -->
  <symbol id="i-chat" viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="12" rx="3.2"/><path d="M8 16.5v4l5-4"/></symbol>
  <!-- \`26-126\`: phone/call, mirrored horizontally from the Feather-derived path this artifact drew
       before the correction (handset was under the left hand; Material's own call glyph, and this
       fix, put it under the right). A \`transform\` on a \`<g>\` around the untouched original path is
       the auditable way to mirror a stroke icon - the path data itself never has to be hand-flipped
       coordinate by coordinate, so there is nothing here to get subtly wrong. -->
  <symbol id="i-call" viewBox="0 0 24 24"><g transform="matrix(-1,0,0,1,24,0)"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.1 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13 1 .36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.27a2 2 0 0 1 2.1-.45c.9.34 1.85.57 2.8.7A2 2 0 0 1 22 16.9z"/></g></symbol>
  <symbol id="i-cal" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/></symbol>
  <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></symbol>
  <symbol id="i-team" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.2 2.7-5.2 6-5.2s6 2 6 5.2"/><path d="M16 5.2A3.2 3.2 0 0 1 16 14"/><path d="M18 20c0-2.4-.8-4-2-4.8"/></symbol>
  <symbol id="i-dots" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></symbol>
  <symbol id="i-send" viewBox="0 0 24 24"><path d="M4 12l16-8-6 16-2.5-6.5L4 12z"/></symbol>
  <symbol id="i-clip" viewBox="0 0 24 24"><path d="M20 11l-8.5 8.5a4.5 4.5 0 0 1-6.4-6.4l9-9a3 3 0 0 1 4.3 4.3l-9 9a1.5 1.5 0 0 1-2.1-2.1l8-8"/></symbol>
  <symbol id="i-chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></symbol>
  <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M4 12.5l5.2 5L20 6.5"/></symbol>
  <symbol id="i-trash" viewBox="0 0 24 24"><path d="M4 7h16M10 7V4.5h4V7M6 7l1 13h10l1-13"/></symbol>
  <!-- \`26-90\`: смысловой аналог Material Symbols «delete_forever» - корзина с крестом, а не корзина с
       тремя полосками. Настоящая геометрия Material - это залитый контур в системе координат
       \`0 -960 960 960\`; здесь она перерисована штрихом, потому что весь этот спрайт штриховой
       (\`svg.i\`: fill:none, stroke-width:1.8, round). Вставить тот путь как есть значило бы получить
       сплошное пятно в штриховом наборе. Корзина повторяет \`#i-trash\` буква в букву, крест вписан
       внутрь корпуса с запасом по сужающимся стенкам. -->
  <symbol id="i-trash-forever" viewBox="0 0 24 24"><path d="M4 7h16M10 7V4.5h4V7M6 7l1 13h10l1-13"/><path d="M9.6 11.1l4.8 4.8M14.4 11.1l-4.8 4.8"/></symbol>
  <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 3 2.6 15 0 18M12 3c-2.6 3-2.6 15 0 18"/></symbol>
  <symbol id="i-wifi" viewBox="0 0 24 24"><path d="M2 8.5a16 16 0 0 1 20 0M5.5 12.5a11 11 0 0 1 13 0M9 16.5a6 6 0 0 1 6 0"/><circle cx="12" cy="20" r="1"/></symbol>
  <symbol id="i-batt" viewBox="0 0 24 24"><rect x="2" y="7" width="17" height="10" rx="2.5"/><path d="M22 11v2"/><rect x="4.5" y="9.5" width="11" height="5" rx="1" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.6M12 18.9v2.6M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12h2.6M18.9 12h2.6M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></symbol>
  <symbol id="i-moon" viewBox="0 0 24 24"><path d="M20.5 13.4A8.4 8.4 0 1 1 10.6 3.5a6.8 6.8 0 0 0 9.9 9.9z"/></symbol>
  <symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 9a6 6 0 1 1 12 0c0 4 1.6 5.6 1.6 5.6H4.4S6 13 6 9z"/><path d="M10 18.5a2.2 2.2 0 0 0 4 0"/></symbol>
  <symbol id="i-sliders" viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></symbol>
  <symbol id="i-alert" viewBox="0 0 24 24"><path d="M12 4.5L2.5 20h19L12 4.5z"/><path d="M12 10v4.2M12 17.2v.1"/></symbol>
  <!-- exclamation on its own (Material Symbols \`exclamation\`: bare stem + dot, no triangle) - the
       status glyph for a settings row that "needs attention". Drawn stroke-only like the rest of the
       sprite: the second sub-path is a zero-length segment that round caps render as the dot. The
       triangle-wrapped variant stays #i-alert; this one is used inside the small .statdot circle. -->
  <symbol id="i-excl" viewBox="0 0 24 24"><path d="M12 5.5v8.5M12 18v.1"/></symbol>
  <!-- \`26-184\`/\`26-187\`: flat, circle-enclosed status glyphs - Material Symbols Outlined
       \`check_circle\`/\`error\`/\`info\`, each a ring ENCLOSING its own mark, drawn stroke-only
       (\`svg.i\`: fill:none, stroke=currentColor) so a caller tints via \`color\`. These retire the
       old \`.statdot\` treatment (a filled tinted circle + a bare #i-check/#i-excl/#i-alert mark):
       the ring is now part of the glyph, there is no coloured podложka behind it, and state is a
       colour, not a background. Geometry mirrors the app's own AgoIcons.CheckCircle/ErrorCircle/
       InfoCircle (\`ago-android\` \`26-184\`/\`26-187\`): a \`circle(12,12,r=9)\` plus, respectively,
       the checkmark \`M8 12.5l2.5 2.5 5-5.5\`, the exclamation stem+dot \`M12 7v6\`/\`M12 16h.01\`, and
       the info dot+stem \`M12 8h.01\`/\`M12 11v5\` (the \`.01\` sub-path is a zero-length segment the
       round line-cap renders as the dot - the same convention #i-excl already uses). -->
  <symbol id="i-check-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5 5-5.5"/></symbol>
  <symbol id="i-error" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v6"/><path d="M12 16h.01"/></symbol>
  <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01"/><path d="M12 11v5"/></symbol>
  <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/></symbol>
  <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
  <symbol id="i-logout" viewBox="0 0 24 24"><path d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></symbol>
</svg>`;

// ---- Bottom navigation (one definition, per `26-130`'s "one include every page pulls") -------
// Order fixed by the artifact's own correction: Диалоги, Записи, Команда, Аналитика, Ещё - by how
// often a shift touches each section, not by the console's sidebar order.
const AGO_BNAV_ITEMS = [
  { key: "dialogs", icon: "i-chat", label: "Диалоги", badge: 3 },
  { key: "booking", icon: "i-cal", label: "Записи", badge: 2 },
  { key: "team", icon: "i-team", label: "Команда" },
  { key: "analytics", icon: "i-chart", label: "Аналитика" },
  { key: "more", icon: "i-dots", label: "Ещё" },
];

function agoBnavHtml(activeKey) {
  const items = AGO_BNAV_ITEMS.map((item) => {
    const on = item.key === activeKey ? " on" : "";
    const badge = item.badge ? `<span class="nb">${item.badge}</span>` : "";
    return `<div class="${on.trim()}"><span class="ind"><svg class="i"><use href="#${item.icon}"/></svg>${badge}</span><span>${item.label}</span></div>`;
  }).join("");
  return `<div class="bnav">${items}</div>`;
}

function agoInitShell() {
  // Sprite: injected once per page, right after <body>, ahead of any phone frame that references
  // `#i-*` symbols by id.
  const spriteMount = document.getElementById("glyph-sprite");
  if (spriteMount && !spriteMount.dataset.agoFilled) {
    spriteMount.innerHTML = AGO_SPRITE_HTML;
    spriteMount.dataset.agoFilled = "1";
  }

  // Bottom nav: every phone screen that shows one carries `<div data-bnav="dialogs">` (an empty
  // placeholder naming which tab is active) instead of the five-item markup repeated by hand.
  document.querySelectorAll("[data-bnav]").forEach((el) => {
    el.outerHTML = agoBnavHtml(el.getAttribute("data-bnav"));
  });

  // Theme toggle - same logic the artifact used inline, generalised to run on every page and
  // persisted under one key so the choice follows the reader from page to page.
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const iconUse = document.getElementById("themeIcon").querySelector("use");
  const KEY = "ago-android-design-theme";

  function getStored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setStored(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* private mode, etc. - theme just won't persist */ }
  }
  function systemPrefersDark() {
    try { return window.matchMedia("(prefers-color-scheme: dark)").matches; } catch (e) { return false; }
  }
  function apply(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      iconUse.setAttribute("href", "#i-moon");
    } else {
      root.setAttribute("data-theme", "light");
      iconUse.setAttribute("href", "#i-sun");
    }
  }

  let initial = getStored();
  if (initial !== "dark" && initial !== "light") {
    initial = systemPrefersDark() ? "dark" : "light";
  }
  apply(initial);

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    apply(next);
    setStored(next);
  });
}

document.addEventListener("DOMContentLoaded", agoInitShell);
