/*
 * 적용 위치: Cafe24 스마트디자인 공통 JS 또는 별도 업로드 JS 파일
 * 원본 백업: 적용 전 현재 스킨 JS 백업 필요
 * 파일 성격: 페르패키지 Cafe24 스니펫 링크/가벼운 동작 보조 JS
 * 주의사항: Cafe24 주문/회원/게시판 기본 기능을 직접 변경하지 않습니다.
 */

(function (window, document) {
  "use strict";

  const version = "2026-06-25";

  const links = Object.freeze({
    quote: "index.html#quote",
    faq: "faq.html",
    support: "support.html",
    guideProduction: "guide-production.html",
    guideDesign: "guide-design.html",
    guideCaution: "guide-caution.html",
    myshop: "https://peerl.cafe24.com/myshop/index.html",
    login: "https://peerl.cafe24.com/member/login.html",
    findId: "https://peerl.cafe24.com/member/id/find_id.html",
    findPassword: "https://peerl.cafe24.com/member/passwd/find_passwd_info.html",
    cart: "https://peerl.cafe24.com/order/basket.html",
    boardIndex: "https://peerl.cafe24.com/board/index.html",
    productQnaList: "https://peerl.cafe24.com/board/product/list.html?board_no=6",
    productQnaWrite: "https://peerl.cafe24.com/board/product/write.html?board_no=6",
    agreement: "https://peerl.cafe24.com/_wg/import/agreement.html",
    privacy: "https://peerl.cafe24.com/member/privacy.html",
    businessRegistration: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/perpackage-business-registration-2026.png",
    bankbookCopy: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/documents/perpackage-bankbook-copy.png",
  });

  const categoryUrls = Object.freeze({
    "rigid-box": "https://peerl.cafe24.com/product/list.html?cate_no=64",
    "shopping-bag": "https://peerl.cafe24.com/product/list.html?cate_no=45",
    "business-card": "https://peerl.cafe24.com/product/list.html?cate_no=43",
    "envelope-sleeve": "https://peerl.cafe24.com/product/list.html?cate_no=42",
    "dust-bag": "https://peerl.cafe24.com/product/list.html?cate_no=46",
    accessories: "https://peerl.cafe24.com/product/list.html?cate_no=54",
    "cafe-supplies": "https://peerl.cafe24.com/product/list.html?cate_no=87",
    "design-request": "https://peerl.cafe24.com/product/list.html?cate_no=95",
  });

  const subCategoryUrls = Object.freeze({
    "premium-gift-package": "https://peerl.cafe24.com/product/list.html?cate_no=63",
    "single-box": "https://peerl.cafe24.com/product/list.html?cate_no=65",
    "button-box": "https://peerl.cafe24.com/product/list.html?cate_no=68",
  });

  function applyLinks(root) {
    const scope = root || document;

    scope.querySelectorAll("[data-pp-cafe24-link]").forEach((anchor) => {
      const key = anchor.getAttribute("data-pp-cafe24-link");
      const href = links[key];
      if (!href) return;
      anchor.setAttribute("href", href);
    });

    scope.querySelectorAll("[data-pp-cafe24-category]").forEach((anchor) => {
      const key = anchor.getAttribute("data-pp-cafe24-category");
      const href = categoryUrls[key] || subCategoryUrls[key];
      if (!href) return;
      anchor.setAttribute("href", href);
    });
  }

  function scrollPageTop(event) {
    if (event) event.preventDefault();
    const scrollingElement = document.scrollingElement || document.documentElement || document.body;

    try {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      if (scrollingElement && typeof scrollingElement.scrollTo === "function") {
        scrollingElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    } catch (error) {
      window.scrollTo(0, 0);
    }

    if (scrollingElement) scrollingElement.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  function bindScrollTop(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-pp-cafe24-top], [data-scroll-top]").forEach((button) => {
      if (button.dataset.ppCafe24Bound === "true") return;
      button.dataset.ppCafe24Bound = "true";
      button.addEventListener("click", scrollPageTop);
    });

    if (document.body.dataset.ppCafe24TopDelegated === "true") return;
    document.body.dataset.ppCafe24TopDelegated = "true";
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-pp-cafe24-top], [data-scroll-top]");
      if (!button) return;
      scrollPageTop(event);
    });
  }

  function init(root) {
    const scope = root || document;
    applyLinks(scope);
    bindScrollTop(scope);
  }

  if (window.PP_CAFE24 && window.PP_CAFE24.version === version) {
    window.PP_CAFE24.init(document);
    return;
  }

  window.PP_CAFE24_LINKS = links;
  window.PP_CAFE24_CATEGORY_URLS = categoryUrls;
  window.PP_CAFE24_SUB_CATEGORY_URLS = subCategoryUrls;
  window.PP_CAFE24 = Object.freeze({
    version,
    links,
    categoryUrls,
    subCategoryUrls,
    applyLinks,
    init,
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init(document), { once: true });
  } else {
    init(document);
  }
})(window, document);
