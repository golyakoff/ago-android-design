# The Android design mini-site - a single, self-contained static bundle (no build step: no
# bundler, no framework, everything plain HTML/CSS/JS) at its own subdomain, public but
# unadvertised. `26-130`: source of truth for the AGO Chat Android mockups, split by section
# instead of living as one ~200 KB Artifact.
#
# This is as easy to make honest as ago-brandbook's own Dockerfile states, and for the identical
# reason: there is no environment input here at all - no API origin, no issuer, no build. The
# commit fully determines the image already, which is adr/0051's rule holding trivially rather
# than by effort.
#
# nginx's own "-alpine-slim" variant - the closest analogue to ago-chat's Chiseled-image preference
# that actually exists for nginx: official image, not a bespoke build, with the dynamic modules this
# static-file-only container never uses stripped out. Same base image ago-brandbook uses.
FROM nginx:1.31-alpine-slim
# `17-04`: the base tag names the image nginx's own maintainers published, not the Alpine packages
# inside it *today* - Alpine ships security fixes into its package repositories continuously,
# independent of when a base image was last rebuilt from them. `apk upgrade` reaches into the live
# package repository at build time and pulls whatever is patched *now*.
# `--no-cache` skips the local index without leaving `/var/cache/apk` behind.
RUN apk update && apk upgrade --no-cache
# The commit this image is built from (`15-07`'s pattern, carried by ago-brandbook and ago-landing
# before it). Defaults to "unknown" rather than failing the build: a local `docker build` for a
# quick check is a legitimate thing to do, and it should say "unknown" out loud rather than lie.
ARG GIT_COMMIT=unknown
# The OCI annotations a registry and `docker inspect`/`crane config` read. `.source` is not only
# documentation - GHCR uses it to link the published package back to this repository, which is what
# makes the package inherit the repository's own visibility instead of arriving orphaned.
LABEL org.opencontainers.image.source="https://github.com/golyakoff/ago-android-design" \
      org.opencontainers.image.description="AGO Chat Android app - design mini-site (mockups, by section)" \
      org.opencontainers.image.licenses="MIT" \
      org.opencontainers.image.revision="${GIT_COMMIT}"
# `15-08`'s own fix, carried in from the start: see nginx.conf's own header comment.
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Every page named one by one, not `COPY *.html` - the same discipline ago-brandbook and
# ago-landing already apply: this list is deliberately the exact set of files this site ships.
COPY index.html /usr/share/nginx/html/index.html
COPY common.html /usr/share/nginx/html/common.html
COPY login-boot.html /usr/share/nginx/html/login-boot.html
COPY dialogs.html /usr/share/nginx/html/dialogs.html
COPY booking.html /usr/share/nginx/html/booking.html
COPY team.html /usr/share/nginx/html/team.html
COPY settings.html /usr/share/nginx/html/settings.html
COPY system.html /usr/share/nginx/html/system.html
COPY channels.html /usr/share/nginx/html/channels.html
COPY branding.html /usr/share/nginx/html/branding.html
COPY auto-reply.html /usr/share/nginx/html/auto-reply.html
COPY widget.html /usr/share/nginx/html/widget.html
COPY widget-appearance.html /usr/share/nginx/html/widget-appearance.html
COPY widget-behaviour.html /usr/share/nginx/html/widget-behaviour.html
COPY widget-consent.html /usr/share/nginx/html/widget-consent.html
COPY canned-responses.html /usr/share/nginx/html/canned-responses.html
COPY tags.html /usr/share/nginx/html/tags.html
COPY consent.html /usr/share/nginx/html/consent.html
COPY modules-faq.html /usr/share/nginx/html/modules-faq.html
COPY visitor-restrictions.html /usr/share/nginx/html/visitor-restrictions.html
COPY common.css /usr/share/nginx/html/common.css
COPY tokens.js /usr/share/nginx/html/tokens.js
# `15-07`'s own pattern: the commit as a file the running container serves, so smoke.sh and
# deploy.sh have one question to ask and one answer to parse -
# `curl https://android-design.reserve-me.ru/version.json`. Deliberately no build timestamp: two
# builds of one commit should be the same artifact, and a clock is the easiest way to make them
# differ for no reason.
RUN printf '{"app":"ago-android-design","commit":"%s"}\n' "${GIT_COMMIT}" \
      > /usr/share/nginx/html/version.json
EXPOSE 80
