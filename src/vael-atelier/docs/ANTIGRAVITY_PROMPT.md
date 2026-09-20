Integrate the `src/vael-atelier` folder from this package into the existing VAEL project. Read README.md first.

Rules:
- Do not change the navbar, hero, footer, or any route other than the two below.
- Replace ONLY the current Collection section on the landing page with `<CollectionSection />`.
- Mount `<InvitationBuilder />` on the existing `/create` route; read `?template=` (the builder does this itself when `initialTemplateId` is omitted).
- Keep the existing `/custom` route. Prefill its form from `?template=` and `?templateName=`.
- Reuse VAEL's router (`navigate` prop), language state (`locale`), and fonts (`--vael-font-*` variables).
- Keep VAEL's existing localStorage keys and free-invitation rule: map the builder's `onChange` snapshot into them
  (see the table "What Antigravity must reconcile" in README.md). Do not rename the new keys unless they collide.
- Render guest invitation pages with `<InvitationRenderer showPlaceholders={false} motion="reveal" />` using the saved template id, blocks and data.
- Add only `@dnd-kit/core` and `@dnd-kit/utilities` as dependencies.
- Do not delete or rewrite the package's CSS; override with variables or wrapper classes if something clashes.

Finish by running the app on port 5175, then check: navbar unchanged; landing collection; "Use this design" → `/create?template=<id>` with that design already applied; drop a Photo between Time and Venue (it should appear immediately, be selected, and focus the upload control); premium "Request this design" → `/custom?template=<id>&templateName=<name>`; Arabic RTL; mobile preview sheet; `npm run build`.
