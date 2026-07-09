(function () {
  function initPerpackageMainRenewal() {
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("#site-menu");
  const shopIconNav = document.querySelector("[data-shop-icons]");
  const categoryNav = document.querySelector("[data-category-nav]");
  const heroTrack = document.querySelector("[data-hero-banners]");
  const heroPrev = document.querySelector("[data-hero-prev]");
  const heroNext = document.querySelector("[data-hero-next]");
  const heroProgress = document.querySelector("[data-hero-progress]");
  const quickMenu = document.querySelector("[data-quick-menu]");
  const mobileSearchToggle = document.querySelector("[data-mobile-search-toggle]");
  const mobileSearch = document.querySelector("[data-mobile-search]");
  const searchForms = document.querySelectorAll(".pp-shop-search");
  const newProductsMount = document.querySelector("[data-new-product-items]");
  const bestSellerMount = document.querySelector("[data-best-seller-items]");
  const boxProductsMount = document.querySelector("[data-box-product-items]");
  const bagEnvelopeMount = document.querySelector("[data-bag-envelope-items]");
  const stickerLabelMount = document.querySelector("[data-sticker-label-items]");
  const smallSampleMount = document.querySelector("[data-small-sample-items]");
  const midPromotionMount = document.querySelector("[data-mid-promotion-banners]");
  const themeShopMount = document.querySelector("[data-theme-shop-items]");
  const guideUpdatesMount = document.querySelector("[data-guide-update-items]");
  const quickbarHideSections = document.querySelectorAll("#quote, #support");
  const scrollTopControls = document.querySelectorAll("[data-scroll-top]");
  const quoteProductNotice = document.querySelector("[data-quote-product-selected]");
  const pageRoot = document.querySelector(".pp-shop-page");
  const cafe24AssetBase = "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/";
  const useCafe24RootLinks = Boolean(
    pageRoot && pageRoot.hasAttribute("data-cafe24-root-links")
  ) || /(^|\.)cafe24\.com$/i.test(window.location.hostname);

  const categoryLinks = Object.freeze({
    box: "/category.html?category=box",
    deliveryBox: "/category.html?category=delivery-box",
    shoppingBag: "/category.html?category=shopping-bag",
    envelopeSleeve: "/category.html?category=envelope-sleeve",
    stickerLabel: "/category.html?category=sticker-label",
    giftBox: "/category.html?category=gift-box",
    smallSample: "/category.html?category=small-sample",
    logoPrint: "/category.html?category=logo-print",
    rigidBox: "/category.html?category=rigid-box",
    businessCard: "/category.html?category=business-card",
    dustBag: "/category.html?category=dust-bag",
    accessories: "/category.html?category=accessories",
    cafeSupplies: "/category.html?category=cafe-supplies",
    designRequest: "/category.html?category=design-request",
  });

  const quoteProductLabels = Object.freeze({
    "box:basic-white-box": "기본 흰색 단상자",
    "box:kraft-paper-box": "크라프트 단상자",
    "box:small-product-box": "소형 제품 포장 박스",
    "box:plain-test-box": "테스트용 무지박스",
    "delivery-box:kraft-delivery-box": "크라프트 택배박스",
    "delivery-box:small-shipping-box": "소형 발송 박스",
    "delivery-box:brand-delivery-box": "브랜드 배송 박스",
    "shopping-bag:plain-shopping-bag": "무지 쇼핑백",
    "shopping-bag:kraft-shopping-bag": "크라프트 쇼핑백",
    "shopping-bag:event-shopping-bag": "행사 배포용 쇼핑백",
    "envelope-sleeve:ready-envelope": "기성 봉투",
    "envelope-sleeve:ready-sleeve": "기성 슬리브",
    "envelope-sleeve:logo-sticker-envelope": "로고 스티커 부착 봉투",
    "sticker-label:logo-round-sticker": "원형 스티커",
    "sticker-label:square-label": "사각 라벨",
    "sticker-label:logo-sticker": "로고 스티커",
    "sticker-label:product-info-label": "제품 정보 라벨",
    "gift-box:basic-gift-box": "기본 선물상자",
    "gift-box:premium-package-set": "프리미엄 패키지 세트",
    "gift-box:inner-tray-set": "내부 트레이 구성",
    "small-sample:small-carton-box": "소량 단상자",
    "small-sample:sample-package-set": "샘플 패키지 세트",
    "small-sample:graduation-package-set": "졸업작품 포장 세트",
    "small-sample:small-label-set": "소량 라벨 세트",
    "logo-print:logo-print-shopping-bag": "쇼핑백 로고 인쇄",
    "logo-print:logo-print-carton-box": "단상자 로고 인쇄",
    "logo-print:logo-print-sticker": "스티커 로고 인쇄",
    "logo-print:logo-print-sleeve": "슬리브 로고 인쇄",
    "rigid-box:top-bottom-rigid-box": "상하 분리형 싸바리박스",
    "rigid-box:drawer-rigid-box": "서랍형 싸바리박스",
    "business-card:basic-business-card": "기본 명함",
    "business-card:premium-business-card": "고급지 명함",
    "dust-bag:basic-dust-bag": "기본 더스트백",
    "dust-bag:logo-dust-bag": "로고 인쇄 더스트백",
    "accessories:package-cushion": "완충재",
    "accessories:sealing-sticker": "봉인 스티커",
    "cafe-supplies:dessert-package-box": "디저트 포장박스",
    "cafe-supplies:cafe-sticker": "카페 스티커",
    "design-request:package-dieline-design": "패키지 도면 설계",
    "design-request:package-graphic-design": "패키지 그래픽 디자인",
  });

  const shopHeaderIcons = [
    { label: "전체상품", icon: "box", href: "#new-products" },
    { label: "맞춤제작", icon: "bulk", href: "#quote" },
    { label: "견적함", icon: "quote", href: "#quote" },
    { label: "제작가이드", icon: "guide", href: "/guide-production.html" },
    { label: "디자인가이드", icon: "design", href: "/guide-design.html" },
    { label: "주의사항", icon: "info", href: "/guide-caution.html" },
  ];

  const shopCategories = [
    { label: "패키지", href: categoryLinks.box },
    { label: "싸바리박스", href: categoryLinks.rigidBox },
    { label: "쇼핑백", href: categoryLinks.shoppingBag },
    { label: "명함", href: categoryLinks.businessCard },
    { label: "봉투", href: categoryLinks.envelopeSleeve },
    { label: "더스트백", href: categoryLinks.dustBag },
    { label: "부자재", href: categoryLinks.accessories },
    { label: "카페용품", href: categoryLinks.cafeSupplies },
    { label: "디자인의뢰", href: categoryLinks.designRequest, badge: "상담", tone: "consult" },
    { label: "제작가이드", href: "/guide-production.html", badge: "GUIDE", tone: "new" },
  ];

  const heroBanners = [
    {
      title: "필요한 패키지, 상품 고르듯 쉽게 선택하세요",
      description: "단상자, 택배박스, 쇼핑백, 봉투까지 빠르게 찾아보세요.",
      href: "#new-products",
      image: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-ready-package.jpg",
      alt: "단상자, 쇼핑백, 박스가 함께 놓인 페르패키지 패키지 상품 구성",
      ariaLabel: "패키지 상품 영역으로 이동",
      fallbackLabel: "인기 상품",
      tone: "blue",
      note: "옵션 선택 후 견적 확인",
    },
    {
      title: "처음 시작하는 브랜드를 위한 소량 패키지",
      description: "테스트, 샘플, 졸업작품용 패키지를 부담 없이 확인해보세요.",
      href: "#quote",
      image: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-small-sample.jpg",
      alt: "소량 샘플 제작에 활용하기 좋은 흰색 단상자",
      ariaLabel: "소량 상품과 샘플 상담 영역으로 이동",
      fallbackLabel: "소량 샘플",
      tone: "beige",
      note: "50개·100개 기준 상담 가능",
    },
    {
      title: "무지 상품에 브랜드 로고를 더해보세요",
      description: "쇼핑백, 단상자, 슬리브, 스티커에 로고 인쇄 상담이 가능합니다.",
      href: "#quote",
      image: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-logo-print-set.jpg",
      alt: "로고 인쇄 상담에 활용하기 좋은 무지 쇼핑백",
      ariaLabel: "로고 인쇄 상담 영역으로 이동",
      fallbackLabel: "로고 인쇄",
      tone: "kraft",
      note: "인쇄 가능 여부는 사양별 확인",
    },
    {
      title: "원하는 사이즈가 없다면 맞춤제작으로 상담해보세요",
      description: "제품 크기, 수량, 인쇄 방식에 맞춰 제작 방향을 안내드립니다.",
      href: "#quote",
      image: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-custom-consulting.jpg",
      alt: "패키지 칼선 도면과 맞춤 제작 상담 자료",
      ariaLabel: "맞춤제작 상담과 견적문의 영역으로 이동",
      fallbackLabel: "맞춤제작",
      tone: "gray",
      note: "최종 견적은 상담 후 확정",
    },
  ];

  const quickMenuItems = [
    { label: "소량상품", icon: "small", href: "#small-sample" },
    { label: "샘플신청", icon: "sample", href: "#quote" },
    { label: "로고인쇄", icon: "print", href: "#quote" },
    { label: "견적함", icon: "quote", href: "#quote" },
    { label: "제작가이드", icon: "guide", href: "/guide-production.html" },
    { label: "빠른상담", icon: "chat", href: "#quote" },
    { label: "배송안내", icon: "truck", href: "#process" },
    { label: "대량문의", icon: "bulk", href: "#quote" },
    { label: "주의사항", icon: "info", href: "/guide-caution.html" },
  ];

  const productImages = {
    carton: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-ready-package.jpg",
    deliveryBox: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-thumbs/category-corrugated-box.jpg",
    shoppingBag: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-logo-print.jpg",
    envelope: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-logo-print.jpg",
    sleeve: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-thumbs/category-sleeve.jpg",
    sticker: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-logo-print-set.jpg",
    giftBox: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-premium-package-set.jpg",
    sampleSet: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-soft-sample-set.jpg",
    cosmetic: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-ready-package.jpg",
    dessert: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-natural-package-set.jpg",
    goods: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-studio-samples.jpg",
    event: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-small-sample.jpg",
    logoPrint: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-logo-print-set.jpg",
    customDrawing: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-custom-consulting.jpg",
    fullSet: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-studio-samples.jpg",
  };

  const newProductItems = [
    { title: "소량 단상자", description: "작게 시작하는 브랜드용 기본 박스", image: productImages.carton, href: "#quote", badge: "NEW", meta: "소량 상담 가능", alt: "소량 단상자" },
    { title: "샘플 패키지 세트", description: "여러 패키지를 한 번에 비교", image: productImages.sampleSet, href: "#quote", badge: "추천", meta: "샘플 상담 가능", alt: "샘플 패키지 세트" },
    { title: "로고 인쇄 쇼핑백", description: "무지 쇼핑백에 브랜드 포인트", image: productImages.shoppingBag, href: "#quote", badge: "상담", meta: "로고 인쇄 상담", alt: "로고 인쇄 쇼핑백" },
    { title: "크라프트 택배박스", description: "배송과 보관에 적합한 박스", image: productImages.deliveryBox, href: "#box-products", badge: "배송", meta: "재고 확인 후 안내", alt: "크라프트 택배박스" },
    { title: "기성 슬리브 포장", description: "제품을 감싸는 간단한 포장", image: productImages.sleeve, href: "#box-products", badge: "인쇄", meta: "견적 확인 필요", alt: "기성 슬리브 포장" },
    { title: "스티커 라벨 세트", description: "박스와 쇼핑백에 브랜드 정보 추가", image: productImages.sticker, href: "#sticker-label-products", badge: "라벨", meta: "옵션별 상이", alt: "스티커 라벨 세트" },
    { title: "선물상자 구성", description: "선물세트용 박스와 부자재 조합", image: productImages.giftBox, href: "#theme-shop", badge: "구성", meta: "상담 후 안내", alt: "선물상자 구성" },
    { title: "제작가이드 패키지", description: "처음 제작 전 확인할 자료", image: productImages.customDrawing, href: "/guide-production.html", badge: "가이드", meta: "자세히 보기", alt: "제작가이드 패키지" },
  ];

  const bestSellerItems = [
    { title: "기본 흰색 단상자", description: "소형 제품 포장에 사용하기 좋은 기본 종이박스", image: productImages.carton, href: "#quote", badge: "인기", meta: "옵션별 상이", alt: "기본 흰색 단상자" },
    { title: "크라프트 택배박스", description: "배송과 보관에 적합한 기본 골판지 박스", image: productImages.deliveryBox, href: "#quote", badge: "배송용", meta: "재고 확인 후 안내", alt: "크라프트 택배박스" },
    { title: "무지 쇼핑백", description: "로고 스티커나 리본과 함께 활용하기 좋은 종이 가방", image: productImages.shoppingBag, href: "#quote", badge: "로고인쇄 상담", meta: "상담 후 안내", alt: "무지 쇼핑백" },
    { title: "샘플 패키지 세트", description: "여러 종류의 패키지를 비교해볼 수 있는 구성", image: productImages.sampleSet, href: "#quote", badge: "소량상담", meta: "샘플 상담 가능", alt: "샘플 패키지 세트" },
  ];

  const boxProductItems = [
    { title: "기성 단상자", description: "화장품, 굿즈, 소형 제품 포장", image: productImages.carton, href: "#quote", badge: "기본", meta: "견적함 담기", alt: "기성 단상자" },
    { title: "크라프트 택배박스", description: "택배 발송과 보관용 박스", image: productImages.deliveryBox, href: "#quote", badge: "배송용", meta: "재고 확인 후 안내", alt: "크라프트 택배박스" },
    { title: "기본 선물상자", description: "선물세트 구성에 적합한 박스", image: productImages.giftBox, href: "#quote", badge: "선물", meta: "옵션별 상이", alt: "기본 선물상자" },
    { title: "기성 슬리브 박스", description: "제품을 감싸 브랜드 느낌을 더하는 포장", image: productImages.sleeve, href: "#quote", badge: "슬리브", meta: "로고 인쇄 상담", alt: "기성 슬리브 박스" },
    { title: "테스트용 무지박스", description: "샘플 확인과 소량 테스트용 박스", image: productImages.carton, href: "#quote", badge: "테스트", meta: "소량 상담 가능", alt: "테스트용 무지박스" },
    { title: "소형 제품 포장 박스", description: "작은 제품을 안정적으로 담는 기본 박스", image: productImages.cosmetic, href: "#quote", badge: "소형", meta: "상담 후 안내", alt: "소형 제품 포장 박스" },
  ];

  const bagEnvelopeItems = [
    { title: "무지 쇼핑백", description: "매장 포장과 행사 배포에 적합", image: productImages.shoppingBag, href: "#quote", badge: "쇼핑백", meta: "로고 인쇄 상담", alt: "무지 쇼핑백" },
    { title: "크라프트 쇼핑백", description: "따뜻한 브랜드 톤에 맞는 종이 가방", image: productImages.dessert, href: "#quote", badge: "크라프트", meta: "상담 후 안내", alt: "크라프트 쇼핑백" },
    { title: "기성 봉투", description: "소형 제품과 인쇄물 포장에 적합", image: productImages.envelope, href: "#quote", badge: "봉투", meta: "재고 확인 후 안내", alt: "기성 봉투" },
    { title: "소형 봉투", description: "작은 굿즈와 샘플 포장용 봉투", image: productImages.envelope, href: "#quote", badge: "소형", meta: "옵션별 상이", alt: "소형 봉투" },
    { title: "로고 스티커 부착 쇼핑백", description: "간단하게 브랜드 포인트를 더하는 구성", image: productImages.logoPrint, href: "#quote", badge: "로고", meta: "로고 인쇄 상담", alt: "로고 스티커 부착 쇼핑백" },
    { title: "행사 배포용 쇼핑백", description: "박람회와 팝업 배포용", image: productImages.event, href: "#quote", badge: "행사", meta: "상담 후 안내", alt: "행사 배포용 쇼핑백" },
  ];

  const stickerLabelItems = [
    { title: "원형 스티커", description: "봉인과 브랜드 표시를 함께 활용", image: productImages.sticker, href: "#quote", badge: "원형", meta: "옵션별 상이", alt: "원형 스티커" },
    { title: "사각 라벨", description: "제품명과 정보를 정돈해 보여주는 라벨", image: productImages.sticker, href: "#quote", badge: "라벨", meta: "로고 인쇄 상담", alt: "사각 라벨" },
    { title: "감사 스티커", description: "소량 브랜드 포장에 가볍게 더하는 포인트", image: productImages.envelope, href: "#quote", badge: "감사", meta: "상담 후 안내", alt: "감사 스티커" },
    { title: "제품 정보 라벨", description: "재질, 성분, 안내 정보를 담는 라벨", image: productImages.sticker, href: "#quote", badge: "정보", meta: "견적 확인 필요", alt: "제품 정보 라벨" },
    { title: "봉인 스티커", description: "상자와 봉투의 개봉부를 정리하는 스티커", image: productImages.envelope, href: "#quote", badge: "봉인", meta: "옵션별 상이", alt: "봉인 스티커" },
    { title: "로고 스티커", description: "무지 상품에 브랜드 로고를 더하는 스티커", image: productImages.logoPrint, href: "#quote", badge: "로고", meta: "로고 인쇄 상담", alt: "로고 스티커" },
  ];

  const smallSampleItems = [
    { title: "소량 단상자", description: "처음 제작 전 부담 없이 확인", image: productImages.carton, href: "#quote", badge: "소량", meta: "소량 상담 가능", alt: "소량 단상자" },
    { title: "소량 쇼핑백", description: "팝업과 행사 운영 전 테스트", image: productImages.shoppingBag, href: "#quote", badge: "쇼핑백", meta: "재고 확인 후 안내", alt: "소량 쇼핑백" },
    { title: "샘플 패키지 세트", description: "여러 패키지를 비교해보는 구성", image: productImages.sampleSet, href: "#quote", badge: "샘플", meta: "샘플 상담 가능", alt: "샘플 패키지 세트" },
    { title: "졸업작품 포장 세트", description: "작품 전시와 제출용 포장 구성", image: productImages.giftBox, href: "#quote", badge: "작품", meta: "상담 후 안내", alt: "졸업작품 포장 세트" },
    { title: "테스트용 무지박스", description: "제품 크기와 담김새 확인용", image: productImages.carton, href: "#quote", badge: "테스트", meta: "옵션별 상이", alt: "테스트용 무지박스" },
    { title: "소량 라벨 세트", description: "소량 상품에 붙이는 기본 라벨", image: productImages.sticker, href: "#quote", badge: "라벨", meta: "로고 인쇄 상담", alt: "소량 라벨 세트" },
  ];

  const midPromotionBanners = [
    { title: "무지 상품에 브랜드 로고를 더해보세요", description: "쇼핑백, 단상자, 슬리브, 스티커에 로고 인쇄 상담이 가능합니다.", image: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-logo-print-set.jpg", href: "#quote", tone: "navy", alt: "로고 인쇄 상담 패키지 배너" },
    { title: "원하는 사이즈가 없다면 맞춤제작 상담", description: "제품 크기, 수량, 인쇄 방식에 맞춰 제작 방향을 안내드립니다.", image: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-custom-consulting.jpg", href: "#quote", tone: "kraft", alt: "맞춤제작 상담 배너" },
    { title: "패키지 제작이 처음이라면 먼저 확인해보세요", description: "사이즈 재는 법, 종이 선택, 인쇄 파일 준비 방법을 쉽게 안내드립니다.", image: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-soft-sample-set.jpg", href: "/guide-production.html", tone: "light", alt: "패키지 제작가이드 배너" },
  ];

  const themeShopItems = [
    { title: "화장품 포장", image: productImages.cosmetic, href: "#box-products", alt: "화장품 포장 추천" },
    { title: "디저트 포장", image: productImages.dessert, href: "#bag-envelope-products", alt: "디저트 포장 추천" },
    { title: "굿즈 포장", image: productImages.goods, href: "#box-products", alt: "굿즈 포장 추천" },
    { title: "선물세트 포장", image: productImages.giftBox, href: "#box-products", alt: "선물세트 포장 추천" },
    { title: "박람회·행사용", image: productImages.event, href: "#bag-envelope-products", alt: "박람회 행사용 추천" },
    { title: "졸업작품·샘플용", image: productImages.sampleSet, href: "#quote", alt: "졸업작품 샘플용 추천" },
    { title: "택배 발송용", image: productImages.deliveryBox, href: "#box-products", alt: "택배 발송용 추천" },
    { title: "로고 인쇄용", image: productImages.logoPrint, href: "#quote", alt: "로고 인쇄용 추천" },
  ];

  const guideUpdateItems = [
    { title: "패키지 제작 전 사이즈 재는 법", description: "제품 기준으로 가로, 세로, 높이를 정리하는 방법", image: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-custom-made.png", href: "/guide-production.html", badge: "가이드", alt: "사이즈 측정 가이드 아이콘" },
    { title: "종이 선택이 어려울 때 확인할 것", description: "강도, 인쇄, 질감 기준으로 종이를 고르는 방법", image: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-guide.png", href: "/guide-production.html", badge: "재질", alt: "종이 선택 가이드 아이콘" },
    { title: "로고 인쇄 상담 전 준비자료", description: "로고 파일, 인쇄 위치, 수량을 미리 정리해보세요", image: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-logo-print.png", href: "#quote", badge: "인쇄", alt: "로고 인쇄 준비자료 아이콘" },
    { title: "소량 제작과 맞춤제작 차이", description: "수량과 사양에 따라 상담 방식이 달라질 수 있습니다", image: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-small-products.png", href: "#quote", badge: "상담", alt: "소량 제작과 맞춤제작 차이 아이콘" },
    { title: "인쇄 파일 준비 체크리스트", description: "칼선, 해상도, 색상 모드를 확인하는 기본 체크", image: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-checklist.png", href: "/guide-production.html", badge: "파일", alt: "인쇄 파일 준비 체크리스트 아이콘" },
    { title: "자주 묻는 질문", description: "견적문의 전 자주 확인하는 내용을 모았습니다", image: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-checklist.png", href: "/faq.html", badge: "FAQ", alt: "자주 묻는 질문 아이콘" },
  ];

  function applyCategoryLinks() {
    const assignLinks = (items, links) => {
      items.forEach((item, index) => {
        if (links[index]) item.href = links[index];
      });
    };

    if (shopHeaderIcons[0]) shopHeaderIcons[0].href = categoryLinks.box;

    assignLinks(shopCategories, [
      categoryLinks.box,
      categoryLinks.rigidBox,
      categoryLinks.shoppingBag,
      categoryLinks.businessCard,
      categoryLinks.envelopeSleeve,
      categoryLinks.dustBag,
      categoryLinks.accessories,
      categoryLinks.cafeSupplies,
      categoryLinks.designRequest,
      "#guide-updates",
    ]);

    assignLinks(quickMenuItems, [
      categoryLinks.smallSample,
      categoryLinks.smallSample,
      categoryLinks.logoPrint,
      "#quote",
      "#guide-updates",
      "#quote",
      "#process",
      "#quote",
      "#guide-updates",
    ]);

    assignLinks(newProductItems, [
      categoryLinks.smallSample,
      categoryLinks.smallSample,
      categoryLinks.logoPrint,
      categoryLinks.deliveryBox,
      categoryLinks.envelopeSleeve,
      categoryLinks.stickerLabel,
      categoryLinks.giftBox,
      "#guide-updates",
    ]);

    assignLinks(bestSellerItems, [
      categoryLinks.box,
      categoryLinks.deliveryBox,
      categoryLinks.shoppingBag,
      categoryLinks.smallSample,
    ]);

    assignLinks(boxProductItems, [
      categoryLinks.box,
      categoryLinks.deliveryBox,
      categoryLinks.giftBox,
      categoryLinks.envelopeSleeve,
      categoryLinks.box,
      categoryLinks.box,
    ]);

    assignLinks(bagEnvelopeItems, [
      categoryLinks.shoppingBag,
      categoryLinks.shoppingBag,
      categoryLinks.envelopeSleeve,
      categoryLinks.envelopeSleeve,
      categoryLinks.logoPrint,
      categoryLinks.shoppingBag,
    ]);

    assignLinks(stickerLabelItems, [
      categoryLinks.stickerLabel,
      categoryLinks.stickerLabel,
      categoryLinks.stickerLabel,
      categoryLinks.stickerLabel,
      categoryLinks.stickerLabel,
      categoryLinks.logoPrint,
    ]);

    assignLinks(smallSampleItems, [
      categoryLinks.smallSample,
      categoryLinks.smallSample,
      categoryLinks.smallSample,
      categoryLinks.smallSample,
      categoryLinks.smallSample,
      categoryLinks.smallSample,
    ]);

    assignLinks(midPromotionBanners, [
      categoryLinks.logoPrint,
      "#quote",
      "#guide-updates",
    ]);

    assignLinks(themeShopItems, [
      categoryLinks.box,
      categoryLinks.shoppingBag,
      categoryLinks.box,
      categoryLinks.giftBox,
      categoryLinks.shoppingBag,
      categoryLinks.smallSample,
      categoryLinks.deliveryBox,
      categoryLinks.logoPrint,
    ]);
  }

  function resolveAssetUrl(src) {
    if (!src) return src;
    if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) return src;
    if (src.startsWith("assets/")) {
      return `${cafe24AssetBase}${src.replace(/^assets\//, "")}`;
    }
    return src;
  }

  function resolvePageHref(href) {
    if (!href || /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return href;
    }

    if (!useCafe24RootLinks) return href;

    if (href === "#quote") return "/#quote";
    if (href === "#top") return "/";
    if (href.startsWith("#")) return href;
    if (href === "/") return "/";
    if (href.startsWith("index.html#")) return `/${href.slice("/".length)}`;
    if (href.startsWith("index.html?")) return `/${href.slice("/".length)}`;
    if (href.startsWith("/")) return href;
    if (/^(category|product|faq|support|guide-production|guide-design|guide-caution|blog)\.html(?:[?#].*)?$/i.test(href)) {
      return `/${href}`;
    }

    return href;
  }

  function buildSearchHref(searchTerm) {
    const basePath = "/category.html";
    return `${basePath}?search=${encodeURIComponent(searchTerm)}`;
  }

  function normalizeCafe24PageLinks(root = document) {
    root.querySelectorAll("a[href]").forEach((anchor) => {
      const nextHref = resolvePageHref(anchor.getAttribute("href"));
      if (nextHref) anchor.setAttribute("href", nextHref);
    });

    root.querySelectorAll("form.pp-shop-search").forEach((form) => {
      const action = form.getAttribute("action");
      if (action) form.setAttribute("action", resolvePageHref(action));
    });
  }

  function updateStaticCategoryLinks() {
    const staticMoreLinks = [
      ["best-seller", categoryLinks.box],
      ["box-products", categoryLinks.box],
      ["bag-envelope-products", categoryLinks.shoppingBag],
      ["sticker-label-products", categoryLinks.stickerLabel],
      ["small-sample", categoryLinks.smallSample],
    ];

    staticMoreLinks.forEach(([sectionId, href]) => {
      const link = document.querySelector(`#${sectionId} .pp-portal-more`);
      if (link) link.setAttribute("href", resolvePageHref(href));
    });
  }

  const iconAssets = {
    box: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-all-products.png",
    bulk: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-custom-made.png",
    quote: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-quote.png",
    guide: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-guide.png",
    design: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-design-guide.png",
    print: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-logo-print.png",
    info: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-caution.png",
    small: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-small-products.png",
    sample: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-sample-request.png",
    chat: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-chat.png",
    truck: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-delivery.png",
    cart: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-cart.png",
    top: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/icons/new/icon-top.png",
  };

  function lineIcon(iconName) {
    if (iconAssets[iconName]) {
      return `<img class="pp-icon-image pp-icon-image--${iconName}" src="${resolveAssetUrl(iconAssets[iconName])}" alt="" aria-hidden="true" decoding="async">`;
    }

    return `<span class="pp-line-icon pp-line-icon--${iconName}" aria-hidden="true"></span>`;
  }

  function renderShopHeader() {
    if (shopIconNav) {
      shopIconNav.innerHTML = shopHeaderIcons.map((item) => (
        `<a href="${resolvePageHref(item.href)}" aria-label="${item.label}">${lineIcon(item.icon)}<span>${item.label}</span></a>`
      )).join("");
    }

    if (categoryNav) {
      categoryNav.innerHTML = shopCategories.map((item) => {
        const badge = item.badge ? `<em class="pp-shop-category-badge pp-shop-category-badge--${item.tone || "new"}">${item.badge}</em>` : "";
        return `<a href="${resolvePageHref(item.href)}"><span>${item.label}</span>${badge}</a>`;
      }).join("");
    }

    if (quickMenu) {
      quickMenu.innerHTML = quickMenuItems.map((item) => {
        const external = item.href.startsWith("http");
        const attrs = external ? ` target="_blank" rel="noopener" data-cta="quote" data-cta-location="homepage-quick" data-cta-label="${item.label}"` : "";
        return `<a href="${resolvePageHref(item.href)}"${attrs}>${lineIcon(item.icon)}<span>${item.label}</span></a>`;
      }).join("");
    }
  }

  let activeHeroBanner = 0;

  function getHeroBannerCount() {
    if (!heroTrack) return 0;
    return heroTrack.querySelectorAll(".pp-shop-banner").length || heroBanners.length || 0;
  }

  function bindHeroImageFallbacks() {
    if (!heroTrack) return;
    heroTrack.querySelectorAll(".pp-shop-banner__media img").forEach((image) => {
      image.addEventListener("error", () => {
        const media = image.closest(".pp-shop-banner__media");
        if (media) media.classList.add("is-missing");
        image.remove();
      }, { once: true });
      if (image.complete && image.naturalWidth === 0) {
        const media = image.closest(".pp-shop-banner__media");
        if (media) media.classList.add("is-missing");
        image.remove();
      }
    });
  }

  function renderHeroBanners() {
    if (!heroTrack) return;
    if (!heroBanners.length) {
      bindHeroImageFallbacks();
      return;
    }

    try {
      heroTrack.innerHTML = heroBanners.map((banner, index) => (
        `<a class="pp-shop-banner pp-shop-banner--${escapeHtml(banner.tone || "blue")}" href="${escapeHtml(resolvePageHref(banner.href))}" aria-label="${escapeHtml(banner.ariaLabel || banner.title)}" data-hero-dynamic-banner>
          <span class="pp-shop-banner__copy">
            <em>${escapeHtml(banner.note)}</em>
            <strong>${escapeHtml(banner.title)}</strong>
            <span>${escapeHtml(banner.description)}</span>
          </span>
          <span class="pp-shop-banner__media" data-fallback-label="${escapeHtml(banner.fallbackLabel)}">
            <span class="pp-shop-banner__fallback" aria-hidden="true">
              <span class="pp-shop-banner__fallback-mark"></span>
              <span>${escapeHtml(banner.fallbackLabel)}</span>
            </span>
            <img src="${escapeHtml(resolveAssetUrl(banner.image))}" alt="${escapeHtml(banner.alt)}" loading="${index === 0 ? "eager" : "lazy"}" decoding="async">
          </span>
        </a>`
      )).join("");
    } catch (error) {
      if (window.console && typeof window.console.warn === "function") {
        window.console.warn("[Perpackage] Hero banner render failed. Static banners will remain.", error);
      }
    }
    bindHeroImageFallbacks();
  }

  function portalBadge(item) {
    return item.badge ? `<em class="pp-portal-badge">${item.badge}</em>` : "";
  }

  function handlePortalImageError(image) {
    const media = image.closest(".pp-portal-product-card__image, .pp-portal-best-card__image, .pp-mid-promotion-card__media, .pp-theme-card__image, .pp-guide-card__image");
    if (media) media.classList.add("is-missing");
    image.remove();
  }

  function bindPortalImageFallbacks(root) {
    if (!root) return;
    root.querySelectorAll("img").forEach((image) => {
      image.addEventListener("error", () => handlePortalImageError(image), { once: true });
      if (image.complete && image.naturalWidth === 0) {
        handlePortalImageError(image);
      }
    });
  }

  function renderPortalEmptyCard(label) {
    return `<div class="pp-portal-empty-card" role="status">
      <strong>상품 이미지를 준비 중입니다.</strong>
      <span>${label || "원하시는 패키지를 문의해 주세요."}</span>
      <a href="${resolvePageHref("#quote")}">상담으로 확인하기</a>
    </div>`;
  }

  function renderPortalMount(mount, items, renderer, fallbackLabel) {
    if (!mount) return;

    try {
      const safeItems = Array.isArray(items) ? items : [];
      mount.innerHTML = safeItems.map(renderer).join("");
      if (!mount.children.length) {
        mount.innerHTML = renderPortalEmptyCard(fallbackLabel);
      }
    } catch (error) {
      mount.innerHTML = renderPortalEmptyCard(fallbackLabel);
      if (window.console && typeof window.console.warn === "function") {
        window.console.warn("[Perpackage] Portal section render failed.", error);
      }
    }

    bindPortalImageFallbacks(mount);
  }

  function renderPortalProductCard(item, modifier = "") {
    const modifierClass = modifier ? ` pp-portal-product-card--${modifier}` : "";
    return `<a class="pp-portal-product-card${modifierClass}" href="${resolvePageHref(item.href)}" aria-label="${item.title} 자세히 보기">
      <span class="pp-portal-product-card__image">
        <img src="${resolveAssetUrl(item.image)}" alt="${item.alt}" loading="lazy" decoding="async">
      </span>
      <span class="pp-portal-product-card__body">
        ${portalBadge(item)}
        <strong>${item.title}</strong>
        <span>${item.description}</span>
        <small>${item.meta}</small>
      </span>
    </a>`;
  }

  function renderBestSellerCard(item, index) {
    return `<a class="pp-portal-best-card" href="${resolvePageHref(item.href)}" aria-label="${item.title} 자세히 보기">
      <span class="pp-portal-best-card__rank">${String(index + 1).padStart(2, "0")}</span>
      <span class="pp-portal-best-card__image">
        <img src="${resolveAssetUrl(item.image)}" alt="${item.alt}" loading="lazy" decoding="async">
      </span>
      <span class="pp-portal-best-card__body">
        ${portalBadge(item)}
        <strong>${item.title}</strong>
        <span>${item.description}</span>
        <small>${item.meta}</small>
      </span>
    </a>`;
  }

  function renderMidPromotionCard(item) {
    return `<a class="pp-mid-promotion-card pp-mid-promotion-card--${item.tone}" href="${resolvePageHref(item.href)}" aria-label="${item.title} 자세히 보기">
      <span class="pp-mid-promotion-card__copy">
        <em>PERPACKAGE PICK</em>
        <strong>${item.title}</strong>
        <span>${item.description}</span>
        <small>옵션에 따라 금액이 달라질 수 있습니다. 재고와 납기는 확인 후 안내됩니다.</small>
      </span>
      <span class="pp-mid-promotion-card__media">
        <img src="${resolveAssetUrl(item.image)}" alt="${item.alt}" loading="lazy" decoding="async">
      </span>
    </a>`;
  }

  function renderThemeCard(item) {
    return `<a class="pp-theme-card" href="${resolvePageHref(item.href)}" aria-label="${item.title} 상품 보기">
      <span class="pp-theme-card__image">
        <img src="${resolveAssetUrl(item.image)}" alt="${item.alt}" loading="lazy" decoding="async">
      </span>
      <strong>${item.title}</strong>
    </a>`;
  }

  function renderGuideCard(item) {
    return `<a class="pp-guide-card" href="${resolvePageHref(item.href)}" aria-label="${item.title} 보기">
      <span class="pp-guide-card__image">
        <img src="${resolveAssetUrl(item.image)}" alt="${item.alt}" loading="lazy" decoding="async">
      </span>
      <span class="pp-guide-card__body">
        <em>${item.badge}</em>
        <strong>${item.title}</strong>
        <span>${item.description}</span>
      </span>
    </a>`;
  }

  function renderPortalSections() {
    renderPortalMount(newProductsMount, newProductItems, (item) => renderPortalProductCard(item, "new"), "원하시는 패키지를 문의해 주세요.");
    renderPortalMount(bestSellerMount, bestSellerItems, (item, index) => renderBestSellerCard(item, index), "자주 찾는 패키지를 상담으로 확인해 주세요.");
    renderPortalMount(boxProductsMount, boxProductItems, (item) => renderPortalProductCard(item), "박스 상품 사양은 상담 후 안내드립니다.");
    renderPortalMount(bagEnvelopeMount, bagEnvelopeItems, (item) => renderPortalProductCard(item), "쇼핑백과 봉투 사양은 상담 후 안내드립니다.");
    renderPortalMount(stickerLabelMount, stickerLabelItems, (item) => renderPortalProductCard(item), "스티커와 라벨 사양은 상담 후 안내드립니다.");
    renderPortalMount(smallSampleMount, smallSampleItems, (item) => renderPortalProductCard(item), "소량 제작 가능 여부는 상담 후 안내드립니다.");
    renderPortalMount(midPromotionMount, midPromotionBanners, renderMidPromotionCard, "필요한 패키지를 상담으로 확인해 주세요.");
    renderPortalMount(themeShopMount, themeShopItems, renderThemeCard, "용도에 맞는 패키지를 상담으로 확인해 주세요.");
    renderPortalMount(guideUpdatesMount, guideUpdateItems, renderGuideCard, "제작 전 확인할 내용을 상담으로 안내드립니다.");
  }

  function bindPortalScrollControls() {
    document.querySelectorAll("[data-portal-scroll]").forEach((button) => {
      button.addEventListener("click", () => {
        const targetName = button.getAttribute("data-portal-scroll");
        const rail = document.querySelector(`[data-portal-rail="${targetName}"]`);
        if (!rail) return;

        const direction = Number(button.getAttribute("data-scroll-dir") || 1);
        const distance = Math.max(240, Math.round(rail.clientWidth * 0.82));
        rail.scrollBy({ left: direction * distance, behavior: "smooth" });
      });
    });
  }

  function updateHeroSlider() {
    if (!heroTrack) return;
    const bannerCount = getHeroBannerCount();
    if (!bannerCount) return;
    activeHeroBanner = Math.min(activeHeroBanner, bannerCount - 1);
    heroTrack.style.setProperty("--slide-index", String(activeHeroBanner));
    if (heroProgress) {
      heroProgress.style.width = `${((activeHeroBanner + 1) / bannerCount) * 100}%`;
    }
  }

  function moveHeroSlider(direction) {
    const bannerCount = getHeroBannerCount();
    if (!bannerCount) return;
    activeHeroBanner = (activeHeroBanner + direction + bannerCount) % bannerCount;
    updateHeroSlider();
  }

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 6);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function bindQuoteProductNotice() {
    if (!quoteProductNotice) return;
    const params = new URLSearchParams(window.location.search);
    const product = params.get("quoteProduct") || "";
    const category = params.get("quoteCategory") || "";

    if (!product) {
      quoteProductNotice.hidden = true;
      quoteProductNotice.innerHTML = "";
      return;
    }

    const label = quoteProductLabels[`${category}:${product}`];
    quoteProductNotice.hidden = false;
    quoteProductNotice.innerHTML = label
      ? `
        <strong>선택한 상품: ${escapeHtml(label)}</strong>
        <span>아래 폼에 수량, 사이즈, 인쇄 여부를 남겨주시면 확인 후 상담을 도와드립니다.</span>
      `
      : `
        <strong>선택한 상품 정보 확인 필요</strong>
        <span>아래 폼에 원하시는 패키지 종류, 수량, 사이즈, 인쇄 여부를 남겨주세요.</span>
      `;
  }

  function bindQuoteVisibilityState() {
    if (!quickbarHideSections.length || !("IntersectionObserver" in window)) return;

    const visibleSections = new Set();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target);
        } else {
          visibleSections.delete(entry.target);
        }
      });

      document.body.classList.toggle("is-quote-section-visible", visibleSections.size > 0);
    }, {
      rootMargin: "-18% 0px -30% 0px",
      threshold: 0.01,
    });

    quickbarHideSections.forEach((section) => observer.observe(section));
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
      if (control.dataset.mainScrollBound === "true") return;
      control.dataset.mainScrollBound = "true";
      control.addEventListener("click", scrollPageTop);
    });

    if (document.body.dataset.mainScrollDelegated === "true") return;
    document.body.dataset.mainScrollDelegated = "true";
    document.addEventListener("click", (event) => {
      const control = event.target.closest("[data-scroll-top], [data-pp-cafe24-top]");
      if (!control) return;
      scrollPageTop(event);
    });
  }

  function bindSearchForms() {
    searchForms.forEach((form) => {
      const input = form.querySelector('input[type="search"]');
      const submitButton = form.querySelector('button[type="submit"]');
      if (input && !input.getAttribute("aria-label")) {
        input.setAttribute("aria-label", "패키지 검색어");
      }
      if (submitButton) {
        submitButton.setAttribute("aria-label", "상품 검색");
      }

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!input) return;
        const searchTerm = input.value.trim();
        if (!searchTerm) return;
        window.location.href = buildSearchHref(searchTerm);
      });
    });
  }

  function closeMenu() {
    if (!menu || !menuButton) return;
    menu.classList.remove("is-open");
    menuButton.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-menu-open");
  }

  function toggleMenu() {
    if (!menu || !menuButton) return;
    const willOpen = !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", willOpen);
    menuButton.classList.toggle("is-open", willOpen);
    menuButton.setAttribute("aria-expanded", String(willOpen));
    document.body.classList.toggle("is-menu-open", willOpen);
  }

  applyCategoryLinks();
  updateStaticCategoryLinks();
  renderShopHeader();
  renderHeroBanners();
  renderPortalSections();
  normalizeCafe24PageLinks(pageRoot || document);
  bindPortalScrollControls();
  bindQuoteProductNotice();
  bindQuoteVisibilityState();
  bindScrollTopControls();
  bindSearchForms();
  updateHeroSlider();

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
  }

  if (menu) {
    menu.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (link) closeMenu();
    });
  }

  if (heroPrev) {
    heroPrev.addEventListener("click", () => moveHeroSlider(-1));
  }

  if (heroNext) {
    heroNext.addEventListener("click", () => moveHeroSlider(1));
  }

  if (mobileSearchToggle && mobileSearch) {
    mobileSearchToggle.addEventListener("click", () => {
      const willOpen = !mobileSearch.classList.contains("is-open");
      mobileSearch.classList.toggle("is-open", willOpen);
      mobileSearchToggle.setAttribute("aria-expanded", String(willOpen));
      const input = mobileSearch.querySelector("input");
      if (willOpen && input) input.focus();
    });
  }

  document.addEventListener("click", (event) => {
    const cta = event.target.closest("[data-cta]");
    if (!cta) return;

    const ctaDetail = {
      cta: cta.dataset.cta || "",
      cta_location: cta.dataset.ctaLocation || "",
      cta_label: cta.dataset.ctaLabel || cta.textContent.trim(),
      cta_href: cta.getAttribute("href") || "",
      page_path: window.location.pathname,
    };

    if (window.console && typeof window.console.debug === "function") {
      window.console.debug("[Perpackage CTA]", ctaDetail);
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", "cta_click", ctaDetail);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
  });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPerpackageMainRenewal, { once: true });
  } else {
    initPerpackageMainRenewal();
  }
})();
