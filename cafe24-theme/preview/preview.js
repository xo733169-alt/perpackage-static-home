(function (window, document) {
  "use strict";

  var assetBase = "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/";
  var liveCafe24Base = "https://peerl.cafe24.com";
  var categoryItems = [
    { label: "패키지", cateNo: "44" },
    { label: "싸바리박스", cateNo: "64" },
    { label: "쇼핑백", cateNo: "45" },
    { label: "명함", cateNo: "43" },
    { label: "봉투", cateNo: "42" },
    { label: "더스트백", cateNo: "46" },
    { label: "부자재", cateNo: "54" },
    { label: "카페용품", cateNo: "87" }
  ];
  var categoryPreview = {
    "44": { label: "패키지", image: "shop-photos/uploaded-ready-package.jpg" },
    "63": { label: "고급 선물 패키지", image: "shop-photos/uploaded-premium-package-set.jpg" },
    "64": { label: "싸바리박스", image: "shop-photos/uploaded-premium-package-set.jpg" },
    "65": { label: "단상자", image: "shop-photos/uploaded-ready-package.jpg" },
    "66": { label: "상하박스", image: "shop-photos/uploaded-natural-package-set.jpg" },
    "67": { label: "C형박스", image: "shop-photos/uploaded-studio-samples.jpg" },
    "68": { label: "단추박스", image: "shop-photos/uploaded-studio-samples.jpg" },
    "45": { label: "쇼핑백", image: "shop-photos/uploaded-logo-print-set.jpg" },
    "43": { label: "명함", image: "shop-photos/uploaded-studio-samples.jpg" },
    "42": { label: "봉투", image: "shop-photos/uploaded-natural-package-set.jpg" },
    "46": { label: "더스트백", image: "shop-photos/uploaded-soft-sample-set.jpg" },
    "54": { label: "부자재", image: "shop-photos/uploaded-custom-consulting.jpg" },
    "87": { label: "카페용품", image: "shop-photos/uploaded-small-sample.jpg" },
    "95": { label: "디자인의뢰", image: "shop-photos/uploaded-custom-consulting.jpg" }
  };
  var contentPages = {
    "guide-production": "제작가이드",
    "guide-design": "디자인가이드",
    "guide-caution": "제작주의사항",
    faq: "자주 묻는 질문",
    support: "고객센터"
  };
  var mockProductSets = {
    newProducts: [
      { name: "기본 흰색 단상자", image: "shop-photos/uploaded-ready-package.jpg", cateNo: "44", guide: "기성 규격·소량 제작" },
      { name: "크라프트 단상자", image: "shop-thumbs/category-corrugated-box.jpg", cateNo: "44", guide: "재질·규격 선택" },
      { name: "소량 샘플 패키지", image: "shop-photos/uploaded-small-sample.jpg", cateNo: "44", guide: "샘플·졸업작품 상담" },
      { name: "프리미엄 선물 패키지", image: "shop-photos/uploaded-premium-package-set.jpg", cateNo: "64", guide: "맞춤 구조 상담" },
      { name: "로고 인쇄 쇼핑백", image: "shop-photos/uploaded-logo-print.jpg", cateNo: "45", guide: "로고 인쇄 상담" },
      { name: "자연 소재 패키지", image: "shop-photos/uploaded-natural-package-set.jpg", cateNo: "44", guide: "용지·인쇄 상담" },
      { name: "맞춤제작 패키지", image: "shop-photos/uploaded-custom-consulting.jpg", cateNo: "64", guide: "구조·후가공 상담" },
      { name: "스튜디오 샘플 세트", image: "shop-photos/uploaded-studio-samples.jpg", cateNo: "44", guide: "샘플 구성 확인" }
    ],
    bestProducts: [
      { name: "브랜드 로고 패키지 세트", image: "shop-photos/uploaded-logo-print-set.jpg", cateNo: "44", guide: "단상자·스티커 구성" },
      { name: "프리미엄 싸바리 선물상자", image: "shop-photos/uploaded-premium-package-set.jpg", cateNo: "64", guide: "선물세트·B2B 제작" },
      { name: "디저트 포장 패키지", image: "shop-photos/uploaded-natural-package-set.jpg", cateNo: "87", guide: "식품·카페 포장" },
      { name: "본제작 전 샘플 패키지", image: "shop-photos/uploaded-soft-sample-set.jpg", cateNo: "44", guide: "구조·색상 사전 확인" },
      { name: "제품 맞춤 칼선 패키지", image: "shop-photos/uploaded-custom-consulting.jpg", cateNo: "64", guide: "제품 실측 후 상담" },
      { name: "행사용 소량 패키지", image: "shop-photos/uploaded-small-sample.jpg", cateNo: "44", guide: "일정·수량 우선 확인" },
      { name: "무지 쇼핑백 로고 인쇄", image: "shop-photos/uploaded-logo-print.jpg", cateNo: "45", guide: "소량 로고 인쇄" },
      { name: "브랜드 촬영용 패키지", image: "shop-photos/uploaded-studio-samples.jpg", cateNo: "44", guide: "촬영·전시용 구성" }
    ]
  };
  var categoryProductOrders = {
    "63": [3, 9, 6, 12, 7, 5, 11, 8],
    "64": [3, 9, 6, 12, 7, 5, 11, 8],
    "65": [0, 1, 2, 5, 12, 13, 6, 7],
    "66": [5, 3, 11, 2, 0, 6, 7, 12],
    "67": [7, 6, 3, 12, 8, 2, 5, 11],
    "68": [7, 8, 3, 6, 12, 2, 5, 11],
    "45": [4, 14, 8, 2, 7, 5, 13, 0],
    "43": [7, 8, 6, 4, 5, 2, 12, 0],
    "42": [5, 11, 8, 4, 2, 0, 7, 6],
    "46": [11, 5, 4, 7, 3, 2, 8, 6],
    "54": [8, 4, 5, 6, 12, 7, 2, 0],
    "87": [10, 5, 3, 4, 8, 2, 7, 0],
    "95": [12, 6, 8, 7, 3, 5, 2, 0]
  };

  function isDeployPreview() {
    return document.body.hasAttribute("data-preview-deploy") || window.location.pathname.indexOf("/preview/") === -1;
  }

  function getSearchParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name) || "";
    } catch (error) {
      return "";
    }
  }

  function getPreviewFile(fileName) {
    return (isDeployPreview() ? "/" : "") + fileName;
  }

  function getCategoryPreviewLink(cateNo) {
    return getPreviewFile("category.html") + "?cate_no=" + encodeURIComponent(cateNo || "44");
  }

  function getContentPageKey() {
    var requested = getSearchParam("page");
    var fileName = window.location.pathname.split("/").pop().replace(/\.html$/, "");
    if (contentPages[requested]) return requested;
    if (contentPages[fileName]) return fileName;
    return "guide-production";
  }

  function getContentPreviewLink(pageKey) {
    if (isDeployPreview()) return "/" + pageKey + ".html";
    return "content.html?page=" + encodeURIComponent(pageKey);
  }

  function configureContentPreview() {
    if (document.body.getAttribute("data-preview-page") !== "content") return;

    var pageKey = getContentPageKey();
    var mount = document.querySelector("[data-preview-content]");
    var sourceBase = isDeployPreview() ? "/_wg/perpackage/pages/" : "../_wg/perpackage/pages/";
    if (mount) mount.setAttribute("data-preview-include", sourceBase + pageKey + ".html");
    document.body.setAttribute("data-preview-content-key", pageKey);
    document.title = "페르패키지 " + contentPages[pageKey] + " 팀 검수";
  }

  function renderReviewToolbar() {
    var page = document.body.getAttribute("data-preview-page");
    var toolbar = document.createElement("aside");
    toolbar.className = "pp-preview-toolbar";
    toolbar.setAttribute("aria-label", "팀 검수 화면 전환");
    toolbar.innerHTML =
      '<div class="pp-preview-toolbar__inner">' +
        '<div class="pp-preview-toolbar__title"><strong>Cafe24 전환 미리보기</strong><span>상품·회원 데이터는 복제 테스트 스킨에서 최종 확인합니다.</span></div>' +
        '<nav aria-label="검수 페이지">' +
          '<a href="' + getPreviewFile("index.html") + '"' + (page === "main" ? ' aria-current="page"' : "") + '>메인</a>' +
          '<a href="' + getCategoryPreviewLink("44") + '"' + (page === "category" ? ' aria-current="page"' : "") + '>상품</a>' +
          '<a href="' + getContentPreviewLink("guide-production") + '"' + (page === "content" ? ' aria-current="page"' : "") + '>가이드</a>' +
        '</nav>' +
      '</div>';
    document.body.insertBefore(toolbar, document.body.firstChild);
  }

  function cleanCafe24Source(source) {
    return source
      .replace(/<!--@(?:layout|css|js|define)[\s\S]*?-->/g, "")
      .replace(/<!--@import\([\s\S]*?-->/g, "")
      .replace(/\{\$[^}]+\}/g, "")
      .replace(/\s+onclick="[^"]*"/g, "");
  }

  function loadIncludes() {
    var includes = Array.prototype.slice.call(document.querySelectorAll("[data-preview-include]"));
    return Promise.all(includes.map(function (mount) {
      var url = mount.getAttribute("data-preview-include");
      return fetch(url).then(function (response) {
        if (!response.ok) throw new Error(url + " 로드 실패");
        return response.text();
      }).then(function (source) {
        mount.innerHTML = cleanCafe24Source(source);
      });
    }));
  }

  function getProductSet(list) {
    if (document.body.getAttribute("data-preview-page") === "category") return getCategoryProductSet(getSearchParam("cate_no") || "44");
    if (list.closest('[aria-labelledby="pp-main-best-title"]')) return mockProductSets.bestProducts;
    return mockProductSets.newProducts;
  }

  function getCategoryProductSet(cateNo) {
    var combined = mockProductSets.newProducts.concat(mockProductSets.bestProducts);
    var order = categoryProductOrders[cateNo];
    if (!order) return mockProductSets.newProducts;
    return order.map(function (index) { return combined[index]; }).filter(Boolean);
  }

  function renderProductCards() {
    Array.prototype.forEach.call(document.querySelectorAll(".pp-cafe24-product-list"), function (list) {
      var products = getProductSet(list);
      list.innerHTML = products.map(function (product, index) {
        var href = getCategoryPreviewLink(product.cateNo);
        return '<li class="pp-cafe24-product-card">' +
          '<div class="pp-cafe24-product-card__media"><a href="' + href + '"><img src="' + assetBase + product.image + '" alt="' + product.name + '"' + (index ? ' loading="lazy"' : "") + '></a></div>' +
          '<div class="pp-cafe24-product-card__body"><p class="pp-cafe24-product-card__name"><a href="' + href + '">' + product.name + '</a></p>' +
          '<ul class="pp-cafe24-product-card__meta"><li><strong>제작 안내</strong><span>' + product.guide + '</span></li></ul></div></li>';
      }).join("");
    });
  }

  function renderFooterPreview() {
    var company = document.querySelector(".pp-cafe24-footer__company");
    if (company) {
      company.innerHTML =
        "<h2>회사 정보</h2>" +
        "<p><span>상호 페르패키지</span><span>서울 중구 을지로</span></p>" +
        "<p><span>사업자 정보는 Cafe24 관리자 입력값으로 표시됩니다.</span></p>" +
        "<p><span>전화·이메일·개인정보관리책임자 정보는 복제 테스트 스킨에서 확인합니다.</span></p>";
    }

    var copyright = document.querySelector(".pp-cafe24-footer__bottom > p:first-child");
    if (copyright) copyright.innerHTML = "Copyright © <strong>페르패키지</strong>. All rights reserved.";
  }

  function renderCommonPreview() {
    var logon = document.querySelector('[module="Layout_stateLogon"]');
    if (logon) logon.remove();

    Array.prototype.forEach.call(document.querySelectorAll(".pp-cafe24-search"), function (search) {
      if (search.querySelector("input")) return;
      var input = document.createElement("input");
      input.type = "search";
      input.setAttribute("aria-label", "상품 검색어");
      input.placeholder = "원하는 패키지나 용도를 검색해보세요.";
      input.value = getSearchParam("keyword");
      search.insertBefore(input, search.querySelector("button"));
    });

    var categoryList = document.querySelector(".pp-cafe24-category-nav ul");
    if (categoryList) {
      categoryList.innerHTML = categoryItems.map(function (item) {
        return '<li><a href="' + getCategoryPreviewLink(item.cateNo) + '">' + item.label + '</a></li>';
      }).join("");
    }

    var basketCount = document.querySelector(".pp-cafe24-basket-link em");
    if (basketCount) basketCount.textContent = "0";
    renderFooterPreview();
  }

  function renderCategoryPreview() {
    var cateNo = getSearchParam("cate_no") || "44";
    var current = categoryPreview[cateNo] || categoryPreview["44"];
    var categoryTitle = document.querySelector("[data-pp-category-title]");
    if (categoryTitle) categoryTitle.textContent = current.label;

    var breadcrumb = document.querySelector(".pp-cafe24-breadcrumb ol");
    if (breadcrumb) breadcrumb.innerHTML = '<li><a href="' + getPreviewFile("index.html") + '">홈</a></li><li><strong>' + current.label + '</strong></li>';

    var subcategories = document.querySelector(".pp-cafe24-subcategories");
    if (subcategories) {
      subcategories.innerHTML = categoryItems.slice(0, 5).map(function (item, index) {
        return '<li><a href="' + getCategoryPreviewLink(item.cateNo) + '"' + (item.cateNo === cateNo ? ' aria-current="page"' : "") + '>' + item.label + '<span>' + (12 - index) + '</span></a></li>';
      }).join("");
    }

    var count = document.querySelector(".pp-cafe24-product-menu__summary > p");
    if (count) {
      var keyword = getSearchParam("keyword");
      var countValue = document.createElement("strong");
      count.textContent = keyword ? '"' + keyword + '" 검색 예시 ' : "등록 상품 ";
      countValue.textContent = getCategoryProductSet(cateNo).length;
      count.appendChild(countValue);
      count.appendChild(document.createTextNode("개"));
    }

    var sortList = document.querySelector(".pp-cafe24-product-menu__summary #type");
    if (sortList) {
      sortList.innerHTML = ["신상품", "인기상품", "낮은가격", "높은가격", "상품명"].map(function (label, index) {
        return '<li><a href="' + getCategoryPreviewLink(cateNo) + '"' + (index === 0 ? ' aria-current="page"' : "") + '>' + label + '</a></li>';
      }).join("");
    }

    var compare = document.querySelector(".pp-cafe24-compare");
    if (compare) compare.remove();

    var paging = document.querySelector(".pp-cafe24-paging");
    if (paging) {
      paging.innerHTML =
        '<span class="pp-cafe24-paging__edge is-disabled" aria-hidden="true">«</span>' +
        '<span class="pp-cafe24-paging__edge is-disabled" aria-hidden="true">‹</span>' +
        '<ol><li><a href="' + getCategoryPreviewLink(cateNo) + '" aria-current="page">1</a></li><li><a href="' + getCategoryPreviewLink(cateNo) + '">2</a></li><li><a href="' + getCategoryPreviewLink(cateNo) + '">3</a></li></ol>' +
        '<a class="pp-cafe24-paging__edge" href="' + getCategoryPreviewLink(cateNo) + '" aria-label="다음 페이지">›</a>' +
        '<a class="pp-cafe24-paging__edge" href="' + getCategoryPreviewLink(cateNo) + '" aria-label="마지막 페이지">»</a>';
    }
  }

  function renderPreviewData() {
    renderCommonPreview();
    renderProductCards();
    if (document.body.getAttribute("data-preview-page") === "category") renderCategoryPreview();
  }

  function makeLiveCafe24Link(link, href) {
    link.setAttribute("href", liveCafe24Base + href);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  }

  function rewritePreviewLinks() {
    var customRoutePattern = /^\/custom\/(guide-production|guide-design|guide-caution|faq|support)\.html/;
    var liveRoutePattern = /^\/(member|myshop|order|board|shopinfo|product\/detail)/;

    Array.prototype.forEach.call(document.querySelectorAll("a[href]"), function (link) {
      var href = link.getAttribute("href") || "";
      var customMatch;
      if (!href || href.charAt(0) === "#" || /^(?:https?:|mailto:|tel:)/.test(href)) return;

      customMatch = href.match(customRoutePattern);
      if (customMatch) {
        link.setAttribute("href", getContentPreviewLink(customMatch[1]));
      } else if (href.indexOf("/product/list.html") === 0) {
        link.setAttribute("href", getPreviewFile("category.html") + (href.indexOf("?") >= 0 ? href.slice(href.indexOf("?")) : "?cate_no=44"));
      } else if (href === "/" || href === "/index.html") {
        link.setAttribute("href", getPreviewFile("index.html"));
      } else if (liveRoutePattern.test(href)) {
        makeLiveCafe24Link(link, href);
      }
    });
  }

  function bindPreviewSearch() {
    Array.prototype.forEach.call(document.querySelectorAll(".pp-cafe24-search"), function (search) {
      var input = search.querySelector("input[type='text'], input[type='search']");
      var button = search.querySelector("button");
      if (!input || !button || search.getAttribute("data-preview-search-bound") === "true") return;

      search.setAttribute("data-preview-search-bound", "true");
      function submitSearch() {
        var keyword = input.value.trim();
        var href = getCategoryPreviewLink("44");
        if (keyword) href += "&keyword=" + encodeURIComponent(keyword);
        window.location.href = href;
      }

      button.addEventListener("click", submitSearch);
      input.addEventListener("keydown", function (event) {
        if (event.key !== "Enter") return;
        event.preventDefault();
        submitSearch();
      });
    });
  }

  function finalizePreview() {
    rewritePreviewLinks();
    bindPreviewSearch();
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  function getThemeScriptPath(fileName) {
    var base = isDeployPreview() ? "/js/perpackage/" : "../js/perpackage/";
    return base + fileName;
  }

  configureContentPreview();
  renderReviewToolbar();

  loadIncludes()
    .then(renderPreviewData)
    .then(function () { return loadScript(getThemeScriptPath("config.js?v=20260721-assets1")); })
    .then(function () { return loadScript(getThemeScriptPath("common.js?v=20260721-assets1")); })
    .then(function () {
      if (document.body.getAttribute("data-preview-page") === "main") {
        return loadScript(getThemeScriptPath("main.js?v=20260721-assets1"));
      }
      if (document.body.getAttribute("data-preview-page") === "category") {
        return loadScript(getThemeScriptPath("category.js?v=20260721-assets1"));
      }
      return null;
    })
    .then(finalizePreview)
    .catch(function (error) {
      document.body.insertAdjacentHTML("afterbegin", '<p class="pp-preview-error" role="alert">미리보기를 불러오지 못했습니다. ' + error.message + '</p>');
    });
})(window, document);
