(function () {
  const quickItems = [
    {
      type: "link",
      label: "견적문의",
      href: "/#quote",
      icon: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-quote.png",
      aria: "페르패키지 견적문의로 이동",
      track: "견적문의",
    },
    {
      type: "link",
      label: "카톡상담",
      href: "/#quote",
      icon: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-chat.png",
      aria: "카카오톡 상담 준비 영역으로 이동",
      track: "카톡상담",
    },
    {
      type: "link",
      label: "이용안내",
      href: "/support.html",
      icon: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-guide.png",
      aria: "페르패키지 고객센터와 이용안내로 이동",
      track: "이용안내",
    },
    {
      type: "link",
      label: "사업자등록증",
      href: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/perpackage-business-registration-2026.png",
      icon: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-business-registration.png",
      aria: "페르패키지 사업자등록증 새 창에서 보기",
      track: "사업자등록증",
      target: "_blank",
    },
    {
      type: "link",
      label: "통장사본",
      href: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/documents/perpackage-bankbook-copy.png",
      icon: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-bankbook.png",
      aria: "페르패키지 통장사본 새 창에서 보기",
      track: "통장사본",
      target: "_blank",
    },
    {
      type: "button",
      label: "TOP",
      icon: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-top.png",
      aria: "페이지 상단으로 이동",
      track: "TOP",
    },
  ];

  const mobileItems = quickItems.filter((item) => ["견적문의", "카톡상담", "이용안내", "TOP"].includes(item.label));

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function trackAttrs(item, location) {
    return `data-track="floating_quick_click" data-track-location="${location}" data-track-label="${escapeHtml(item.track)}" data-cta="floating_quick_click" data-cta-location="${location}" data-cta-label="${escapeHtml(item.track)}"`;
  }

  function useCafe24RootLinks() {
    return Boolean(document.querySelector("[data-cafe24-root-links]")) || /(^|\.)cafe24\.com$/i.test(window.location.hostname);
  }

  function resolvePageHref(href) {
    if (!href || /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return href;
    }

    if (!useCafe24RootLinks()) return href;

    if (href === "#quote") return "/#quote";
    if (href === "/") return "/";
    if (href.startsWith("index.html#")) return `/${href.slice("/".length)}`;
    if (href.startsWith("/")) return href;
    if (/^(support|faq|guide-production|guide-design|guide-caution|category|product|blog)\.html(?:[?#].*)?$/i.test(href)) {
      return `/${href}`;
    }

    return href;
  }

  function renderIcon(item) {
    return `<img class="pp-icon-image" src="${escapeHtml(item.icon)}" alt="" aria-hidden="true" decoding="async">`;
  }

  function renderDesktopItem(item) {
    if (item.type === "button") {
      return `
        <li class="perpackage-floating-quick__item">
          <button class="perpackage-floating-quick__link" type="button" aria-label="${escapeHtml(item.aria)}" data-scroll-top onclick="window.scrollTo(0, 0); document.documentElement.scrollTop = 0; document.body.scrollTop = 0;" ${trackAttrs(item, "right-floating")}>
            <span class="perpackage-floating-quick__icon">${renderIcon(item)}</span>
            <span class="perpackage-floating-quick__label">${escapeHtml(item.label)}</span>
          </button>
        </li>
      `;
    }

    const target = item.target ? ` target="${escapeHtml(item.target)}" rel="noopener noreferrer"` : "";
    return `
      <li class="perpackage-floating-quick__item">
        <a class="perpackage-floating-quick__link" href="${escapeHtml(resolvePageHref(item.href))}"${target} aria-label="${escapeHtml(item.aria)}" ${trackAttrs(item, "right-floating")}>
          <span class="perpackage-floating-quick__icon">${renderIcon(item)}</span>
          <span class="perpackage-floating-quick__label">${escapeHtml(item.label)}</span>
        </a>
      </li>
    `;
  }

  function renderMobileItem(item) {
    if (item.type === "button") {
      return `
        <button class="perpackage-mobile-quickbar__link" type="button" aria-label="${escapeHtml(item.aria)}" data-scroll-top onclick="window.scrollTo(0, 0); document.documentElement.scrollTop = 0; document.body.scrollTop = 0;" ${trackAttrs(item, "mobile-quickbar")}>
          ${renderIcon(item)}
          <span>${escapeHtml(item.label)}</span>
        </button>
      `;
    }

    return `
      <a class="perpackage-mobile-quickbar__link" href="${escapeHtml(resolvePageHref(item.href))}" aria-label="${escapeHtml(item.aria)}" ${trackAttrs(item, "mobile-quickbar")}>
        ${renderIcon(item)}
        <span>${escapeHtml(item.label)}</span>
      </a>
    `;
  }

  function ensureFallbackStyles() {
    const hasMainCss = Array.from(document.styleSheets).some((sheet) => {
      const href = sheet.href || "";
      return href.includes("perpackage-main-renewal.css");
    });
    if (hasMainCss || document.getElementById("perpackage-common-quick-style")) return;

    const style = document.createElement("style");
    style.id = "perpackage-common-quick-style";
    style.textContent = `
      .perpackage-floating-quick{position:fixed;right:max(20px,calc((100vw - 1360px)/2 - 168px));top:220px;z-index:80;width:96px}
      .perpackage-floating-quick__list{list-style:none;margin:0;padding:8px;border:1px solid #dfe5f3;border-radius:18px;background:#fff;box-shadow:0 16px 42px rgba(26,42,86,.14)}
      .perpackage-floating-quick__item+.perpackage-floating-quick__item{border-top:1px solid #edf1f7}
      .perpackage-floating-quick__link{display:flex;width:100%;min-height:68px;flex-direction:column;align-items:center;justify-content:center;gap:6px;border:0;background:transparent;color:#26324f;text-decoration:none;font:inherit;font-size:12px;font-weight:700;cursor:pointer}
      .perpackage-floating-quick__icon img{width:30px;height:30px;object-fit:contain}
      .perpackage-floating-quick__link:hover,.perpackage-floating-quick__link:focus-visible{color:#2A408C;background:#f4f7fc;border-radius:12px;outline:2px solid transparent}
      .perpackage-mobile-quickbar{display:none}
      @media (max-width:860px){body{padding-bottom:88px}.perpackage-floating-quick{display:none}.perpackage-mobile-quickbar{position:fixed;left:12px;right:12px;bottom:12px;z-index:80;display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:8px;border:1px solid #dfe5f3;border-radius:18px;background:rgba(255,255,255,.96);box-shadow:0 12px 36px rgba(26,42,86,.16)}.perpackage-mobile-quickbar__link{display:flex;min-width:0;flex-direction:column;align-items:center;gap:4px;border:0;background:transparent;color:#26324f;text-decoration:none;font:inherit;font-size:11px;font-weight:700}.perpackage-mobile-quickbar__link img{width:25px;height:25px;object-fit:contain}}
    `;
    document.head.appendChild(style);
  }

  function ensureSupportItemInExistingQuick() {
    const desktop = document.querySelector(".perpackage-floating-quick__list");
    if (desktop && !desktop.querySelector('[href="/support.html"], [href="/support.html"]')) {
      const topItem = desktop.querySelector("[data-scroll-top]")?.closest("li");
      const template = document.createElement("template");
      template.innerHTML = renderDesktopItem(quickItems[2]);
      desktop.insertBefore(template.content, topItem || null);
    }

    const mobile = document.querySelector(".perpackage-mobile-quickbar");
    if (mobile && !mobile.querySelector('[href="/support.html"], [href="/support.html"]')) {
      const topButton = mobile.querySelector("[data-scroll-top]");
      const template = document.createElement("template");
      template.innerHTML = renderMobileItem(quickItems[2]);
      mobile.insertBefore(template.content, topButton || null);
    }
  }

  function normalizeCafe24DocumentLinks() {
    const businessRegistrationUrl = "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/perpackage-business-registration-2026.png";
    const bankbookCopyUrl = "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/documents/perpackage-bankbook-copy.png";

    document.querySelectorAll("a[href]").forEach((anchor) => {
      const href = anchor.getAttribute("href") || "";
      const normalizedHref = resolvePageHref(href);
      if (normalizedHref && normalizedHref !== href) {
        anchor.setAttribute("href", normalizedHref);
      }
      if (href.includes("perpackage-bankbook-copy.png")) {
        anchor.setAttribute("href", bankbookCopyUrl);
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener noreferrer");
      }
      if (href.includes("perpackage-business-registration-2026")) {
        anchor.setAttribute("href", businessRegistrationUrl);
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  function renderQuickMenus() {
    ensureFallbackStyles();

    if (!document.querySelector(".perpackage-floating-quick")) {
      const nav = document.createElement("nav");
      nav.className = "perpackage-floating-quick";
      nav.setAttribute("aria-label", "빠른 상담 메뉴");
      nav.innerHTML = `<ul class="perpackage-floating-quick__list">${quickItems.map(renderDesktopItem).join("")}</ul>`;
      (document.querySelector(".pp-page") || document.body).appendChild(nav);
    }

    if (!document.querySelector(".perpackage-mobile-quickbar")) {
      const nav = document.createElement("nav");
      nav.className = "perpackage-mobile-quickbar";
      nav.setAttribute("aria-label", "모바일 빠른 상담 메뉴");
      nav.innerHTML = mobileItems.map(renderMobileItem).join("");
      (document.querySelector(".pp-page") || document.body).appendChild(nav);
    }

    ensureSupportItemInExistingQuick();
    normalizeCafe24DocumentLinks();
  }

  function scrollPageTop(event) {
    if (event) event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduceMotion ? "auto" : "smooth";
    const scrollingElement = document.scrollingElement || document.documentElement || document.body;

    try {
      window.scrollTo({ top: 0, left: 0, behavior });
      if (scrollingElement && typeof scrollingElement.scrollTo === "function") {
        scrollingElement.scrollTo({ top: 0, left: 0, behavior });
      }
    } catch (error) {
      window.scrollTo(0, 0);
    }

    if (scrollingElement) scrollingElement.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  function bindScrollTopControls() {
    document.querySelectorAll("[data-scroll-top], [data-pp-cafe24-top]").forEach((control) => {
      if (control.dataset.commonScrollBound === "true") return;
      control.dataset.commonScrollBound = "true";
      control.addEventListener("click", scrollPageTop);
    });

    if (document.body.dataset.commonScrollDelegated === "true") return;
    document.body.dataset.commonScrollDelegated = "true";
    document.addEventListener("click", (event) => {
      const control = event.target.closest("[data-scroll-top], [data-pp-cafe24-top]");
      if (!control) return;
      scrollPageTop(event);
    });
  }

  function bindMobileQuickbarVisibility() {
    const sections = document.querySelectorAll("#quote");
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const visibleSections = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.add(entry.target);
        else visibleSections.delete(entry.target);
      });
      document.body.classList.toggle("is-quote-section-visible", visibleSections.size > 0);
    }, { rootMargin: "-18% 0px -30% 0px", threshold: 0.01 });
    sections.forEach((section) => observer.observe(section));
  }

  function init() {
    renderQuickMenus();
    normalizeCafe24DocumentLinks();
    bindScrollTopControls();
    bindMobileQuickbarVisibility();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
