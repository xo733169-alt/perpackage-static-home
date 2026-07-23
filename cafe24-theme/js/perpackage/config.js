(function (window, document) {
  "use strict";

  if (window.PP_CAFE24_CONFIG) return;

  var assetBase = "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/";
  var iconBase = assetBase + "icons/new/";
  var homepageAssetHost = "https://perpackage-main-public.vercel.app/assets/homepage/";
  var promotionAssetBase = "https://kr.object.ncloudstorage.com/perpackage-public-assets/homepage/images/promotions/";
  var homepageAssetBase = window.location.protocol === "file:"
    ? "../../assets/homepage/"
    : homepageAssetHost;
  var homepageIconBase = "https://kr.object.ncloudstorage.com/perpackage-public-assets/homepage/icons/";
  var quoteFormUrl = "https://www.pluuug.com/form/TrPLMjXdJ1";

  /* 소셜 채널은 여기에서만 관리합니다. 비어 있는 값은 아이콘만 표시합니다. */
  var social = Object.freeze({
    instagram: "https://www.instagram.com/peerl_package/",
    youtube: "",
    naverBlog: "https://blog.naver.com/peerl"
  });

  var paths = Object.freeze({
    home: "/",
    quote: quoteFormUrl,
    support: "/custom/support.html",
    faq: "/custom/faq.html",
    guideProduction: "/custom/guide-production.html",
    guideDesign: "/custom/guide-design.html",
    guideCaution: "/custom/guide-caution.html",
    login: "/member/login.html",
    join: "/member/join.html",
    myshop: "/myshop/index.html",
    basket: "/order/basket.html",
    productQna: "/board/product/list.html?board_no=6",
    agreement: "/member/agreement.html",
    privacy: "/member/privacy.html"
  });

  /* cate_no는 Cafe24 관리자 상품 분류 번호와 맞춰 한 곳에서만 관리합니다. */
  var categories = Object.freeze({
    box: "/product/list.html?cate_no=44",
    package: "/product/list.html?cate_no=44",
    premiumGift: "/product/list.html?cate_no=63",
    foldingCarton: "/product/list.html?cate_no=65",
    topBottomBox: "/product/list.html?cate_no=66",
    cTypeBox: "/product/list.html?cate_no=67",
    buttonBox: "/product/list.html?cate_no=68",
    rigidBox: "/product/list.html?cate_no=64",
    shoppingBag: "/product/list.html?cate_no=45",
    businessCard: "/product/list.html?cate_no=43",
    envelopeSleeve: "/product/list.html?cate_no=42",
    dustBag: "/product/list.html?cate_no=46",
    accessories: "/product/list.html?cate_no=54",
    cafeSupplies: "/product/list.html?cate_no=87",
    designRequest: "/product/list.html?cate_no=95"
  });

  /* 신규 2D SVG는 Cafe24에서 Vercel 공개 이미지 주소로 불러옵니다. */
  var icons = Object.freeze({
    allProducts: homepageIconBase + "icon-all-products.svg",
    smallProducts: iconBase + "icon-small-products.png",
    sampleRequest: iconBase + "icon-sample-request.png",
    customMade: homepageIconBase + "icon-custom-made.svg",
    bulkInquiry: homepageIconBase + "icon-quote.svg",
    quote: homepageIconBase + "icon-quote.svg",
    chat: iconBase + "icon-chat.png",
    productQna: homepageIconBase + "icon-product-qna.svg",
    guide: homepageIconBase + "icon-production-guide.svg",
    designGuide: iconBase + "icon-design-guide.png",
    caution: homepageIconBase + "icon-caution.svg",
    checklist: iconBase + "icon-checklist.png",
    logoPrint: iconBase + "icon-logo-print.png",
    productionLine: iconBase + "icon-production-line.png",
    delivery: iconBase + "icon-delivery.png",
    cart: homepageIconBase + "icon-cart.svg",
    businessRegistration: homepageIconBase + "icon-business-registration.svg",
    bankbook: iconBase + "icon-bankbook.png",
    support: homepageIconBase + "icon-support.svg",
    top: homepageIconBase + "icon-top.svg"
  });

  var banners = Object.freeze({
    mainRigidBox01: homepageAssetBase + "banners/main/main-rigid-box-01.svg",
    shoppingBag01: homepageAssetBase + "banners/category/shopping-bag-01.svg",
    shoppingBag02: homepageAssetBase + "banners/category/shopping-bag-02.svg",
    shoppingBag03: homepageAssetBase + "banners/category/shopping-bag-03.svg",
    rigidBox01: homepageAssetBase + "banners/category/rigid-box-01.svg",
    rigidBox02: homepageAssetBase + "banners/category/rigid-box-02.svg",
    rigidBox03: homepageAssetBase + "banners/category/rigid-box-03.svg",
    displayBanner01: homepageAssetBase + "banners/category/display-banner-01.svg",
    hangingBanner01: homepageAssetBase + "banners/category/hanging-banner-01.svg",
    promotionFoldingCarton: promotionAssetBase + "folding-carton.svg",
    promotionShoppingBag: promotionAssetBase + "shopping-bag.svg",
    promotionRigidBox: promotionAssetBase + "rigid-box.svg",
    promotionCafeSupplies: promotionAssetBase + "cafe-supplies.svg"
  });

  var assets = Object.freeze({
    base: assetBase,
    homepageBase: homepageAssetBase,
    wordmark: assetBase + "brand/perpackage-wordmark.png",
    icons: icons,
    banners: banners
  });

  function each(nodes, callback) {
    Array.prototype.forEach.call(nodes || [], callback);
  }

  function applyLinks(root) {
    var scope = root || document;

    each(scope.querySelectorAll("[data-pp-path]"), function (link) {
      var key = link.getAttribute("data-pp-path");
      if (!paths[key]) return;

      link.setAttribute("href", paths[key]);
      if (key === "quote") {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }
    });

    each(scope.querySelectorAll("[data-pp-category]"), function (link) {
      var key = link.getAttribute("data-pp-category");
      if (categories[key]) link.setAttribute("href", categories[key]);
    });

    each(scope.querySelectorAll("img[data-pp-icon]"), function (image) {
      var key = image.getAttribute("data-pp-icon");
      if (icons[key]) image.setAttribute("src", icons[key]);
    });

    each(scope.querySelectorAll("img[data-pp-banner-asset]"), function (image) {
      var key = image.getAttribute("data-pp-banner-asset");
      if (banners[key]) image.setAttribute("src", banners[key]);
    });

    each(scope.querySelectorAll("[data-pp-social]"), function (link) {
      var key = link.getAttribute("data-pp-social");
      var url = social[key];

      if (!url) {
        link.setAttribute("href", "#none");
        link.setAttribute("aria-disabled", "true");
        link.setAttribute("tabindex", "-1");
        link.classList.add("is-disabled");
        return;
      }

      link.setAttribute("href", url);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      link.setAttribute("aria-disabled", "false");
      link.removeAttribute("tabindex");
      link.classList.remove("is-disabled");
    });
  }

  function getCurrentCategoryNumber() {
    var match = window.location.search.match(/[?&]cate_no=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : "";
  }

  window.PP_CAFE24_CONFIG = Object.freeze({
    version: "2026-07-23.1",
    paths: paths,
    categories: categories,
    social: social,
    icons: icons,
    assets: assets,
    applyLinks: applyLinks,
    getCurrentCategoryNumber: getCurrentCategoryNumber
  });
})(window, document);
