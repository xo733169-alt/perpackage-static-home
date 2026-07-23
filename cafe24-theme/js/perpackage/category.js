(function (window, document) {
  "use strict";

  var profiles = Object.freeze({
    "44": {
      title: "패키지",
      headline: "제품에 맞는 패키지를\n한눈에 비교하세요",
      description: "단상자, 싸바리박스, 쇼핑백과 기본 포장 상품을 용도와 수량에 맞춰 확인할 수 있습니다.",
      image: "shop-photos/uploaded-ready-package.jpg",
      tone: "blue",
      usage: "제품 포장, 샘플, 브랜드 패키지",
      prepare: "제품 실측 사이즈, 수량, 인쇄 여부",
      method: "기성 규격 선택 또는 맞춤제작",
      guideTitle: "처음이라면 사이즈와 수량부터 정하세요",
      guideText: "담을 제품의 가로·세로·높이와 예상 수량을 준비하면 구조와 재질을 더 빠르게 비교할 수 있습니다.",
      guideImage: "shop-photos/uploaded-soft-sample-set.jpg",
      productTitle: "패키지 상품"
    },
    "63": {
      title: "고급 선물 패키지",
      headline: "선물의 가치를 높이는\n프리미엄 패키지",
      description: "브랜드 선물세트와 고급 제품에 어울리는 구조, 내부 트레이와 후가공 방향을 확인합니다.",
      image: "shop-photos/uploaded-premium-package-set.jpg",
      tone: "warm",
      usage: "선물세트, 화장품, 프리미엄 제품",
      prepare: "제품 구성, 트레이 필요 여부, 후가공",
      method: "샘플 확인 후 맞춤 본제작",
      guideTitle: "구성품과 열리는 방식을 먼저 확인하세요",
      guideText: "제품 개수와 배치, 뚜껑 방식, 완충재를 정리하면 선물 패키지 구조를 구체적으로 상담할 수 있습니다.",
      guideImage: "shop-photos/uploaded-studio-samples.jpg",
      productTitle: "고급 선물 패키지"
    },
    "64": {
      title: "싸바리박스",
      headline: "견고함과 완성도를 갖춘\n싸바리박스",
      description: "선물세트, 화장품, 굿즈처럼 높은 완성도가 필요한 제품에 맞는 싸바리 구조를 살펴보세요.",
      image: "shop-photos/uploaded-premium-package-set.jpg",
      tone: "warm",
      bannerAssets: ["rigidBox01", "rigidBox02", "rigidBox03"],
      usage: "고급 선물, 화장품, 굿즈, 전자제품",
      prepare: "제품 무게, 내부 트레이, 여닫는 방식",
      method: "샘플 제작 후 대량 본제작",
      guideTitle: "제품 고정 방식과 내부 구성을 함께 봅니다",
      guideText: "제품이 흔들리지 않도록 트레이와 완충재를 설계하고, 싸개지와 박·형압 같은 후가공을 함께 결정합니다.",
      guideImage: "shop-photos/uploaded-custom-consulting.jpg",
      productTitle: "싸바리박스 상품"
    },
    "65": {
      title: "단상자",
      headline: "가볍고 실용적인\n접이식 단상자",
      description: "화장품, 식품, 생활용품 등 다양한 제품에 사용하는 기본 종이박스를 규격별로 확인하세요.",
      image: "shop-photos/uploaded-ready-package.jpg",
      tone: "blue",
      usage: "화장품, 식품, 생활용품, 소형 제품",
      prepare: "제품 크기, 종이 두께, 접착 방식",
      method: "기성 규격 또는 칼선 맞춤제작",
      guideTitle: "제품 크기와 포장 방향이 구조를 결정합니다",
      guideText: "제품이 들어가는 방향과 여유 공간을 확인한 뒤 단면, 접착면, 바닥 구조와 종이 두께를 선택합니다.",
      guideImage: "shop-photos/uploaded-small-sample.jpg",
      productTitle: "단상자 상품"
    },
    "66": {
      title: "상하박스",
      headline: "뚜껑과 몸통이 분리되는\n상하박스",
      description: "열었을 때 제품이 잘 보이고 조립이 간단한 상하 구조를 제품 크기에 맞춰 확인합니다.",
      image: "shop-photos/uploaded-natural-package-set.jpg",
      tone: "green",
      usage: "선물, 의류, 식품, 세트 구성",
      prepare: "뚜껑 깊이, 제품 높이, 내부 포장",
      method: "규격 확인 후 맞춤 칼선 제작",
      guideTitle: "뚜껑 깊이와 몸통 여유를 함께 계산하세요",
      guideText: "너무 헐겁거나 빡빡하지 않도록 종이 두께와 제품 사이즈를 기준으로 뚜껑과 몸통 치수를 조정합니다.",
      guideImage: "shop-photos/uploaded-soft-sample-set.jpg",
      productTitle: "상하박스 상품"
    },
    "67": {
      title: "C형박스",
      headline: "밀어서 여는 구조가 돋보이는\nC형박스",
      description: "슬리브와 내부 상자를 조합해 개봉 경험과 제품 보호를 함께 고려하는 패키지입니다.",
      image: "shop-photos/uploaded-studio-samples.jpg",
      tone: "blue",
      usage: "굿즈, 문구, 화장품, 소형 선물",
      prepare: "내부 상자 크기, 슬리브 방향, 손잡이",
      method: "구조 샘플 확인 후 맞춤제작",
      guideTitle: "슬리브와 내부 상자의 간격이 중요합니다",
      guideText: "부드럽게 열리면서 빠지지 않도록 종이 두께와 가공 오차를 고려해 슬리브 여유를 정합니다.",
      guideImage: "shop-photos/uploaded-custom-consulting.jpg",
      productTitle: "C형박스 상품"
    },
    "68": {
      title: "단추박스",
      headline: "여닫기 편하고 보관하기 좋은\n단추박스",
      description: "단추와 끈, 잠금 구조를 활용해 문서, 샘플과 굿즈를 반복 보관하기 좋은 패키지입니다.",
      image: "shop-photos/uploaded-studio-samples.jpg",
      tone: "warm",
      usage: "샘플북, 문서, 굿즈, 브랜드 키트",
      prepare: "내용물 두께, 잠금 위치, 반복 사용 여부",
      method: "부자재와 구조 확인 후 맞춤제작",
      guideTitle: "잠금 위치와 내용물 두께를 먼저 정하세요",
      guideText: "내용물이 빠지지 않고 쉽게 여닫히도록 접힘 두께와 단추·끈 위치를 함께 설계합니다.",
      guideImage: "shop-photos/uploaded-logo-print-set.jpg",
      productTitle: "단추박스 상품"
    },
    "45": {
      title: "쇼핑백",
      headline: "브랜드를 들고 이동하는\n로고 쇼핑백",
      description: "매장, 행사와 선물 포장에 필요한 크기, 종이, 손잡이와 로고 인쇄 방식을 비교하세요.",
      image: "shop-photos/uploaded-logo-print.jpg",
      tone: "blue",
      bannerAssets: ["shoppingBag01", "shoppingBag02", "shoppingBag03"],
      usage: "매장, 팝업, 행사, 선물 포장",
      prepare: "가로·폭·높이, 제품 무게, 손잡이",
      method: "무지 상품 인쇄 또는 맞춤제작",
      guideTitle: "제품 무게에 맞는 종이와 손잡이를 고르세요",
      guideText: "담을 제품의 크기와 무게에 따라 종이 두께, 코팅, 손잡이 재질과 바닥 보강 여부를 정합니다.",
      guideImage: "shop-photos/uploaded-logo-print-set.jpg",
      productTitle: "쇼핑백 상품"
    },
    "43": {
      title: "명함",
      headline: "첫인상을 정돈하는\n브랜드 명함",
      description: "용지의 촉감, 인쇄 색상과 후가공을 비교해 브랜드 분위기에 맞는 명함을 준비하세요.",
      image: "shop-photos/uploaded-studio-samples.jpg",
      tone: "green",
      usage: "브랜드 소개, 영업, 매장, 행사",
      prepare: "규격, 용지, 수량, 후가공",
      method: "파일 확인 후 인쇄 제작",
      guideTitle: "작은 인쇄물일수록 파일 검수가 중요합니다",
      guideText: "재단 여백, 작은 글자, 색상 모드와 박·형압 위치를 확인하면 인쇄 결과의 오차를 줄일 수 있습니다.",
      guideImage: "shop-photos/uploaded-logo-print-set.jpg",
      productTitle: "명함 상품"
    },
    "42": {
      title: "봉투",
      headline: "제품과 서류를 깔끔하게 담는\n맞춤 봉투",
      description: "문서, 카드, 소형 제품과 패키지 슬리브에 맞는 규격과 접착 방식을 확인하세요.",
      image: "shop-photos/uploaded-natural-package-set.jpg",
      tone: "green",
      usage: "문서, 카드, 소형 제품, 슬리브",
      prepare: "내용물 크기, 봉투 방향, 접착 여부",
      method: "규격 선택 또는 맞춤 칼선 제작",
      guideTitle: "내용물보다 여유 있는 완성 사이즈가 필요합니다",
      guideText: "종이 두께와 삽입 방향을 고려해 여유 치수를 잡고, 뚜껑과 접착 방식, 창문 가공 여부를 정합니다.",
      guideImage: "shop-photos/uploaded-soft-sample-set.jpg",
      productTitle: "봉투 상품"
    },
    "46": {
      title: "더스트백",
      headline: "제품을 부드럽게 보호하는\n패브릭 더스트백",
      description: "패션, 잡화와 선물 제품에 사용하는 원단, 끈과 로고 인쇄 방식을 제품 크기에 맞춰 확인합니다.",
      image: "shop-photos/uploaded-soft-sample-set.jpg",
      tone: "warm",
      usage: "패션, 잡화, 선물, 제품 보호",
      prepare: "제품 크기, 원단, 끈, 로고 방식",
      method: "샘플 확인 후 봉제·인쇄 제작",
      guideTitle: "원단과 입구 구조가 사용감을 좌우합니다",
      guideText: "제품 표면과 무게를 고려해 원단 두께와 끈 방식을 선택하고, 로고 인쇄 크기와 위치를 정합니다.",
      guideImage: "shop-photos/uploaded-natural-package-set.jpg",
      productTitle: "더스트백 상품"
    },
    "54": {
      title: "부자재",
      headline: "패키지 완성도를 높이는\n인쇄 부자재",
      description: "스티커, 완충재, 속지와 포장 부자재를 기존 패키지와 함께 구성해보세요.",
      image: "shop-photos/uploaded-logo-print-set.jpg",
      tone: "green",
      usage: "스티커, 속지, 완충, 포장 마감",
      prepare: "패키지 규격, 부착 위치, 필요 수량",
      method: "기성 선택 또는 인쇄 맞춤제작",
      guideTitle: "패키지와 함께 사용할 위치를 먼저 확인하세요",
      guideText: "부착 면적과 제품 접촉 여부, 포장 순서를 기준으로 부자재의 재질과 크기를 결정합니다.",
      guideImage: "shop-photos/uploaded-custom-consulting.jpg",
      productTitle: "패키지 부자재"
    },
    "87": {
      title: "카페용품",
      headline: "메뉴와 매장 경험을 담는\n카페 패키지",
      description: "디저트 박스, 봉투, 쇼핑백과 스티커를 메뉴 크기와 포장 방식에 맞춰 비교하세요.",
      image: "shop-photos/uploaded-natural-package-set.jpg",
      tone: "warm",
      usage: "카페, 베이커리, 디저트, 테이크아웃",
      prepare: "메뉴 크기, 보관 조건, 포장 수량",
      method: "기성 조합 또는 매장 맞춤제작",
      guideTitle: "메뉴 크기와 보관 환경을 함께 확인하세요",
      guideText: "기름과 수분, 냉장 여부, 이동 시간을 고려해 식품 포장에 맞는 구조와 종이를 선택합니다.",
      guideImage: "shop-photos/uploaded-small-sample.jpg",
      productTitle: "카페용품 상품"
    },
    "95": {
      title: "디자인의뢰",
      headline: "제작 가능한 파일로 정리하는\n패키지 디자인",
      description: "칼선, 로고, 인쇄 색상과 후가공 위치를 실제 제작 조건에 맞춰 준비할 수 있습니다.",
      image: "shop-photos/uploaded-custom-consulting.jpg",
      tone: "blue",
      usage: "칼선, 편집, 인쇄 파일, 후가공 표시",
      prepare: "제품 사이즈, 로고 원본, 참고 이미지",
      method: "상담 후 디자인 범위와 일정 확정",
      guideTitle: "디자인 전에 구조와 제작 사양을 확정하세요",
      guideText: "완성 사이즈와 종이, 인쇄, 후가공 조건이 정해져야 실제 칼선에 맞는 디자인 파일을 만들 수 있습니다.",
      guideImage: "shop-photos/uploaded-logo-print-set.jpg",
      productTitle: "디자인의뢰 상품"
    }
  });

  // Package child categories reuse the parent package banner while keeping their own product-list heading.
  var bannerProfileByCategory = Object.freeze({
    "44": "44",
    "63": "44",
    "65": "44",
    "66": "44",
    "67": "44",
    "68": "44"
  });

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatHeadline(value) {
    return escapeHtml(value).replace(/\n/g, "<br>");
  }

  function buildSlide(slide, index, config) {
    var pathAttribute = slide.path ? ' data-pp-path="' + slide.path + '"' : "";
    var assetClass = slide.assetKey ? " pp-category-hero__slide--artboard" : "";
    var bannerUrl = slide.assetKey && config.assets.banners && config.assets.banners[slide.assetKey];
    var imageUrl = bannerUrl || (config.assets.base + slide.image);
    var assetAttribute = slide.assetKey ? ' data-pp-banner-asset="' + escapeHtml(slide.assetKey) + '"' : "";
    return '<a class="pp-category-hero__slide' + assetClass + (index === 0 ? " is-active" : "") + '" href="' + escapeHtml(slide.href) + '" data-pp-category-slide data-pp-category-label="' + escapeHtml(slide.label) + '" data-tone="' + slide.tone + '"' + pathAttribute + '>' +
      '<span class="pp-category-hero__copy">' +
        '<em>' + escapeHtml(slide.eyebrow) + '</em>' +
        '<strong>' + formatHeadline(slide.title) + '</strong>' +
        '<span>' + escapeHtml(slide.text) + '</span>' +
        '<b>' + escapeHtml(slide.cta) + '</b>' +
      '</span>' +
      '<span class="pp-category-hero__media"><img src="' + escapeHtml(imageUrl) + '"' + assetAttribute + ' alt="' + escapeHtml(slide.alt) + '" decoding="async"' + (index ? ' loading="lazy"' : ' fetchpriority="high"') + '></span>' +
    '</a>';
  }

  function renderProfile(root, profile, config, contentProfile) {
    var track = root.querySelector("[data-pp-category-track]");
    var title = root.querySelector("[data-pp-category-title]");
    var productProfile = contentProfile || profile;
    var slides = [
      {
        label: "카테고리 상품",
        eyebrow: profile.title.toUpperCase(),
        title: profile.headline,
        text: profile.description,
        cta: "상품 보기",
        href: "#pp-category-products",
        image: profile.image,
        alt: profile.title + " 상품 구성",
        tone: profile.tone
      },
      {
        label: "제작가이드",
        eyebrow: "CHOICE GUIDE",
        title: profile.guideTitle,
        text: profile.guideText,
        cta: "제작가이드",
        href: config.paths.guideProduction,
        path: "guideProduction",
        image: profile.guideImage,
        alt: profile.title + " 제작 상담 자료",
        tone: profile.tone === "warm" ? "green" : "warm"
      },
      {
        label: "맞춤제작",
        eyebrow: "CUSTOM ORDER",
        title: "원하는 규격이 없다면\n맞춤제작으로 상담하세요",
        text: "제품 크기, 수량, 재질, 인쇄와 희망 일정을 알려주시면 제작 가능한 방향을 함께 정리합니다.",
        cta: "견적문의",
        href: config.paths.quote,
        path: "quote",
        image: "shop-photos/uploaded-custom-consulting.jpg",
        alt: "맞춤 패키지 제작 상담 자료",
        tone: "blue"
      }
    ];

    if (profile.bannerAssets) {
      slides.forEach(function (slide, index) {
        slide.assetKey = profile.bannerAssets[index];
      });
    }

    if (title) title.textContent = profile.title;
    if (track) track.innerHTML = slides.map(function (slide, index) {
      return buildSlide(slide, index, config);
    }).join("");

    var productTitle = document.querySelector("[data-pp-category-product-title]");
    if (productTitle) productTitle.textContent = productProfile.productTitle;

    config.applyLinks(root);
  }

  function initSlider(root) {
    var track = root.querySelector("[data-pp-category-track]");
    var slides = track ? Array.prototype.slice.call(track.querySelectorAll("[data-pp-category-slide]")) : [];
    var prev = root.querySelector("[data-pp-category-prev]");
    var next = root.querySelector("[data-pp-category-next]");
    var pause = root.querySelector("[data-pp-category-pause]");
    var tabs = root.querySelector("[data-pp-category-tabs]");
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var index = 0;
    var timer = null;
    var userPaused = false;
    var interactionPaused = false;
    var scrollFrame = null;

    if (!track || slides.length < 1) return;

    function createTabs() {
      if (!tabs) return;
      tabs.innerHTML = "";
      slides.forEach(function (slide, slideIndex) {
        var label = slide.getAttribute("data-pp-category-label") || "배너 " + (slideIndex + 1);
        var button = document.createElement("button");
        var labelText = document.createElement("span");
        button.type = "button";
        button.className = "pp-category-hero__tab";
        button.setAttribute("role", "tab");
        button.setAttribute("aria-label", label + " 배너 보기");
        button.setAttribute("aria-selected", "false");
        button.setAttribute("data-pp-category-tab", String(slideIndex));
        labelText.textContent = label;
        button.appendChild(labelText);
        button.addEventListener("click", function () {
          centerSlide(slideIndex, true);
          startTimer();
        });
        tabs.appendChild(button);
      });
    }

    function updateTabs() {
      if (!tabs) return;
      Array.prototype.forEach.call(tabs.querySelectorAll("[data-pp-category-tab]"), function (button, buttonIndex) {
        var active = buttonIndex === index;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", active ? "true" : "false");
      });
    }

    function updateState() {
      slides.forEach(function (slide, slideIndex) {
        var active = slideIndex === index;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
        slide.setAttribute("tabindex", active ? "0" : "-1");
      });
      updateTabs();
    }

    function centerSlide(nextIndex, smooth) {
      index = (nextIndex + slides.length) % slides.length;
      var slide = slides[index];
      var left = slide.offsetLeft - ((track.clientWidth - slide.clientWidth) / 2);
      try {
        track.scrollTo({ left: left, behavior: smooth && !reducedMotion ? "smooth" : "auto" });
      } catch (error) {
        track.scrollLeft = left;
      }
      updateState();
    }

    function stopTimer() {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
    }

    function startTimer() {
      stopTimer();
      if (reducedMotion || userPaused || interactionPaused || slides.length < 2) return;
      timer = window.setInterval(function () { centerSlide(index + 1, true); }, 5200);
    }

    function setPauseButton() {
      if (!pause) return;
      var icon = pause.querySelector("span");
      pause.setAttribute("aria-label", userPaused ? "배너 자동 전환 재생" : "배너 자동 전환 일시정지");
      pause.setAttribute("aria-pressed", userPaused ? "true" : "false");
      pause.setAttribute("title", userPaused ? "배너 자동 전환 재생" : "배너 자동 전환 일시정지");
      if (icon) icon.textContent = userPaused ? "▶" : "Ⅱ";
    }

    if (prev) prev.addEventListener("click", function () {
      centerSlide(index - 1, true);
      startTimer();
    });
    if (next) next.addEventListener("click", function () {
      centerSlide(index + 1, true);
      startTimer();
    });
    if (pause) pause.addEventListener("click", function () {
      userPaused = !userPaused;
      setPauseButton();
      startTimer();
    });

    track.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      centerSlide(index + (event.key === "ArrowRight" ? 1 : -1), true);
      startTimer();
    });

    track.addEventListener("scroll", function () {
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(function () {
        var trackCenter = track.scrollLeft + (track.clientWidth / 2);
        var nearest = 0;
        var distance = Infinity;
        slides.forEach(function (slide, slideIndex) {
          var slideCenter = slide.offsetLeft + (slide.clientWidth / 2);
          var nextDistance = Math.abs(trackCenter - slideCenter);
          if (nextDistance < distance) {
            distance = nextDistance;
            nearest = slideIndex;
          }
        });
        if (nearest !== index) {
          index = nearest;
          updateState();
        }
      });
    }, { passive: true });

    root.addEventListener("mouseenter", function () {
      interactionPaused = true;
      stopTimer();
    });
    root.addEventListener("mouseleave", function () {
      interactionPaused = false;
      startTimer();
    });
    root.addEventListener("focusin", function () {
      interactionPaused = true;
      stopTimer();
    });
    root.addEventListener("focusout", function () {
      interactionPaused = false;
      startTimer();
    });

    document.addEventListener("visibilitychange", function () {
      interactionPaused = document.hidden;
      startTimer();
    });
    window.addEventListener("resize", function () { centerSlide(index, false); });

    createTabs();
    setPauseButton();
    centerSlide(0, false);
    startTimer();
  }

  function init() {
    var root = document.querySelector("[data-pp-category-hero]");
    var config = window.PP_CAFE24_CONFIG;
    var categoryNumber;
    if (!root || !config || root.getAttribute("data-pp-category-bound") === "true") return;

    root.setAttribute("data-pp-category-bound", "true");
    categoryNumber = config.getCurrentCategoryNumber() || "44";
    var contentProfile = profiles[categoryNumber] || profiles["44"];
    var bannerProfileKey = bannerProfileByCategory[categoryNumber] || categoryNumber;
    var bannerProfile = profiles[bannerProfileKey] || contentProfile;
    renderProfile(root, bannerProfile, config, contentProfile);
    initSlider(root);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})(window, document);
