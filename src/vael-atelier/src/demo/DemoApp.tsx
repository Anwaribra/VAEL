import { useCallback, useEffect, useState } from "react";
import { CollectionSection, InvitationBuilder, requestUrl } from "../vael-atelier";
import type { Locale, Template } from "../vael-atelier";

/**
 * Stand-in for the real VAEL app, used only to run and verify the package on its own.
 * In VAEL the navbar, hero and routes already exist: copy the two usages below
 * (<CollectionSection /> and <InvitationBuilder />) and ignore the rest.
 */

function useRoute() {
  const [loc, setLoc] = useState(() => window.location.pathname + window.location.search);
  useEffect(() => {
    const on = () => setLoc(window.location.pathname + window.location.search);
    window.addEventListener("popstate", on);
    return () => window.removeEventListener("popstate", on);
  }, []);
  const navigate = useCallback((to: string) => {
    window.history.pushState({}, "", to);
    setLoc(to);
    window.scrollTo({ top: 0 });
  }, []);
  return { loc, navigate };
}

export function DemoApp() {
  const { loc, navigate } = useRoute();
  const url = new URL(loc, window.location.origin);
  const params = url.searchParams;
  const locale: Locale = params.get("lang") === "ar" ? "ar" : "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  // keep ?lang=ar on every internal link while testing Arabic
  const withLang = (to: string) =>
    locale === "ar" ? to + (to.includes("?") ? "&" : "?") + "lang=ar" : to;
  const go = (to: string) => navigate(withLang(to));

  return (
    <div dir={dir} className="demo">
      {/* PLACEHOLDER navbar: not part of the package. VAEL keeps its own. */}
      <header className="demo-nav">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            go("/");
          }}
        >
          VAEL
        </a>
        <nav>
          <a href="/#collection" onClick={(e) => { e.preventDefault(); go("/"); }}>
            {locale === "ar" ? "المجموعة" : "Collection"}
          </a>
          <a href="/create" onClick={(e) => { e.preventDefault(); go("/create"); }}>
            {locale === "ar" ? "أنشئ" : "Create"}
          </a>
          <a href={locale === "ar" ? "/?lang=en" : "/?lang=ar"}>{locale === "ar" ? "EN" : "عربي"}</a>
        </nav>
      </header>

      {url.pathname === "/create" ? (
        <InvitationBuilder
          locale={locale}
          dir={dir}
          storageKey="vael:atelier:draft"
          // ?template=id is read from the URL automatically when initialTemplateId is not set.
          initialTemplateId={params.get("template") ?? undefined}
          onUsePremiumTemplate={(tpl: Template) => go(requestUrl("/custom", tpl))}
          onChange={() => {
            /* persist to VAEL's own store here if needed */
          }}
        />
      ) : url.pathname === "/custom" ? (
        <main className="demo-custom">
          <h1>{locale === "ar" ? "طلب تصميم" : "Request a design"}</h1>
          <p>
            {locale === "ar" ? "التصميم المطلوب: " : "Requested design: "}
            <strong>{params.get("templateName") ?? "—"}</strong>{" "}
            <small>({params.get("template") ?? "none"})</small>
          </p>
          <form onSubmit={(e) => { e.preventDefault(); window.alert("Demo only. Connect this to VAEL's existing /custom flow."); }}>
            <input type="hidden" name="template" value={params.get("template") ?? ""} />
            <label>
              Name
              <input name="name" type="text" />
            </label>
            <label>
              Email
              <input name="email" type="email" />
            </label>
            <button type="submit">Send request</button>
          </form>
        </main>
      ) : (
        <main>
          <section className="demo-hero">
            <h1>An invitation, made personal.</h1>
            <p>Choose a design made for the moment. Then shape every detail around your story.</p>
            <p className="demo-note">(Hero is a stand-in. VAEL keeps its own.)</p>
          </section>
          <CollectionSection
            locale={locale}
            dir={dir}
            navigate={go}
          />
          <footer className="demo-footer">Footer stand-in</footer>
        </main>
      )}
    </div>
  );
}
