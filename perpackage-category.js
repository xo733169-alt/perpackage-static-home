(function () {
  const categoryOrder = [
    { key: "box", label: "패키지" },
    { key: "rigid-box", label: "싸바리박스" },
    { key: "shopping-bag", label: "쇼핑백" },
    { key: "business-card", label: "명함" },
    { key: "envelope-sleeve", label: "봉투" },
    { key: "dust-bag", label: "더스트백" },
    { key: "accessories", label: "부자재" },
    { key: "cafe-supplies", label: "카페용품" },
    { key: "design-request", label: "디자인의뢰" },
  ];

  // Cafe24 운영 상품 연결 준비 필드입니다. 실제 고객용 분류 URL이 확정되면 cafe24CategoryUrl만 채우고,
  // 운영자 전용 URL은 고객 화면 데이터로 사용하지 않습니다.
  const cafe24CategoryMappings = Object.freeze({
    box: { cafe24CategoryUrl: "", cafe24Status: "pending", cafe24Memo: "Cafe24 패키지 카테고리" },
    "rigid-box": { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=64", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 하위 분류는 상하 2단 싸바리, 자석형 표지바리, 서랍형 싸바리. 현재 상품 수 0개로 확인되어 상품 등록 여부 확인 필요." },
    "shopping-bag": { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=45", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 쇼핑백 계열. 현재 상품 수는 4개로 확인됨. 노출 상품 예시는 쇼핑백 손잡이형, 쇼핑백 매립형, 쇼핑백 타공형, 쇼핑백 디자인·주문제작." },
    "business-card": { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=43", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 하위 분류는 레터프레스명함, 일반명함, 고급명함, 엣지박 명함. 현재 상품 수 3개로 확인됨." },
    "envelope-sleeve": { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=42", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 하위 분류는 소봉투&대봉투, 자켓봉투, 규격봉투, 교회봉투, 단추봉투, 종이홀더, 청첩장봉투. 현재 상품 수 8개로 확인됨." },
    "dust-bag": { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=46", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 하위 분류는 조리개, 덮개형, 에코백, 슈트케이스. 현재 상품 수 0개로 확인되어 상품 등록 여부 확인 필요." },
    accessories: { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=54", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 현재 상품 수 0개로 확인되어 상품 등록 여부 확인 필요." },
    "cafe-supplies": { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=87", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 하위 분류는 컵홀더, 컵캐리어, 디저트박스, 비닐쇼핑백. 현재 상품 수 2개로 확인됨." },
    "design-request": { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=95", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 하위 분류는 패키지박스 디자인, 명함 디자인, 패키지 도면 설계도, 상세페이지 디자인. 현재 상품 수 15개로 확인됨." },
    "delivery-box": { cafe24CategoryUrl: "", cafe24Status: "pending", cafe24Memo: "Cafe24 배송박스 세부 카테고리" },
    "sticker-label": { cafe24CategoryUrl: "", cafe24Status: "pending", cafe24Memo: "Cafe24 스티커·라벨 세부 카테고리" },
    "gift-box": { cafe24CategoryUrl: "", cafe24Status: "pending", cafe24Memo: "Cafe24 선물상자 세부 카테고리" },
    "small-sample": { cafe24CategoryUrl: "", cafe24Status: "pending", cafe24Memo: "Cafe24 샘플·소량 세부 카테고리" },
    "logo-print": { cafe24CategoryUrl: "", cafe24Status: "pending", cafe24Memo: "Cafe24 로고인쇄 세부 카테고리" },
  });

  const cafe24SubCategoryMappings = Object.freeze({
    box: [
      { key: "premium-gift-package", label: "고급 선물 패키지", cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=63", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 패키지 > 고급 선물 패키지 계열." },
      { key: "single-box", label: "단박스", cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=65", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 패키지 > 단박스 계열." },
      { key: "button-box", label: "단추박스", cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=68", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 패키지 > 단추박스 계열. 현재 상품 수 0개로 확인되어 상품 등록 여부 확인 필요." },
    ],
  });

  const quoteHref = "index.html#quote";
  const images = {
    ready: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-ready-package.jpg",
    small: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-small-sample.jpg",
    logo: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-logo-print.jpg",
    logoSet: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-logo-print-set.jpg",
    custom: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-custom-consulting.jpg",
    sampleSet: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-soft-sample-set.jpg",
    natural: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-natural-package-set.jpg",
    premium: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-premium-package-set.jpg",
    studio: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-studio-samples.jpg",
    delivery: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-thumbs/category-corrugated-box.jpg",
    sleeve: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-thumbs/category-sleeve.jpg",
    boxThumb: "assets/shop-thumbs/category-folding-carton.jpg",
    shoppingBagThumb: "assets/shop-thumbs/category-shopping-bag.jpg",
    envelopeThumb: "assets/shop-thumbs/category-envelope.jpg",
    stickerThumb: "assets/shop-thumbs/category-sticker-label.jpg",
    giftThumb: "assets/shop-thumbs/category-gift-box.jpg",
    sampleThumb: "assets/shop-thumbs/category-sample-set.jpg",
  };

  const productDetailRoutes = Object.freeze({
    box: ["basic-white-box", "kraft-paper-box", "small-product-box", "plain-test-box"],
    "delivery-box": ["kraft-delivery-box", "small-shipping-box", "brand-delivery-box"],
    "shopping-bag": [
      "plain-shopping-bag",
      "kraft-shopping-bag",
      { category: "logo-print", product: "logo-print-shopping-bag" },
      "event-shopping-bag",
    ],
    "envelope-sleeve": ["ready-envelope", "ready-sleeve", "logo-sticker-envelope"],
    "sticker-label": ["logo-round-sticker", "square-label", "logo-sticker", "product-info-label"],
    "gift-box": ["basic-gift-box", "premium-package-set", "inner-tray-set"],
    "small-sample": ["small-carton-box", "sample-package-set", "graduation-package-set", "small-label-set"],
    "logo-print": ["logo-print-shopping-bag", "logo-print-carton-box", "logo-print-sticker", "logo-print-sleeve"],
    "rigid-box": ["top-bottom-rigid-box", "drawer-rigid-box"],
    "business-card": ["basic-business-card", "premium-business-card"],
    "dust-bag": ["basic-dust-bag", "logo-dust-bag"],
    accessories: ["package-cushion", null, null, null, "sealing-sticker"],
    "cafe-supplies": ["dessert-package-box", null, null, "cafe-sticker"],
    "design-request": ["package-dieline-design", "package-graphic-design"],
  });

  function productHref(category, product) {
    return `product.html?category=${encodeURIComponent(category)}&product=${encodeURIComponent(product)}`;
  }

  function getProductDetailRoute(categoryKey, index) {
    const route = (productDetailRoutes[categoryKey] || [])[index];
    if (!route) return null;
    return typeof route === "string" ? { category: categoryKey, product: route } : route;
  }

  const categoryPageData = {
    box: {
      title: "패키지",
      description: "단상자, 접착 박스, 손잡이 박스처럼 제품 포장에 많이 쓰는 기본 박스 상품군입니다.",
      notice: "사이즈, 수량, 인쇄 여부에 따라 상담 후 금액이 달라질 수 있습니다.",
      heroImage: images.ready,
      heroAlt: "흰색 단상자와 크라프트 박스, 쇼핑백이 함께 놓인 기성 단상자 구성",
      tags: ["소형 제품 포장", "로고 인쇄 상담 가능", "수량별 상담", "재고 확인 필요"],
      products: [
        {
          title: "기본 흰색 단상자",
          description: "소형 제품 포장에 사용하기 좋은 기본 종이박스입니다.",
          image: images.ready,
          tags: ["인기", "로고인쇄 상담"],
          options: ["사이즈", "수량", "인쇄 여부"],
          href: "product.html?category=box&product=basic-white-box",
          actionLabel: "자세히 보기",
        },
        {
          title: "크라프트 단상자",
          description: "따뜻한 브랜드 톤과 자연스러운 포장에 어울리는 박스입니다.",
          image: images.natural,
          tags: ["크라프트", "재질 상담"],
          options: ["재질", "박스 형태", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "소형 제품 포장 박스",
          description: "화장품, 굿즈, 디저트류처럼 작은 제품을 담기 좋은 구성입니다.",
          image: images.sampleSet,
          tags: ["소형", "샘플 상담"],
          options: ["제품 크기", "내부 구성", "인쇄 여부"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "테스트용 무지박스",
          description: "제품 담김새와 사이즈를 먼저 확인할 때 쓰기 좋은 기본 박스입니다.",
          image: images.custom,
          tags: ["테스트", "소량 상담"],
          options: ["사이즈", "수량", "납기 확인"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "둥근 디저트 박스",
          description: "디저트와 소형 선물 포장에 어울리는 라운드형 박스 상담 상품입니다.",
          image: images.natural,
          tags: ["디저트", "구조 상담"],
          options: ["제품 크기", "박스 형태", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "6면 접착 박스",
          description: "제품 고정감과 조립 방식을 함께 확인해야 하는 접착형 박스입니다.",
          image: images.boxThumb,
          tags: ["접착형", "사양 상담"],
          options: ["전개 구조", "재질", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "2면 접착 박스",
          description: "간단한 접착 구조로 제품을 담는 박스이며 사양 확인 후 안내됩니다.",
          image: images.ready,
          tags: ["접착형", "소형 제품"],
          options: ["사이즈", "접착 방식", "인쇄 여부"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "손수건 박스",
          description: "섬유, 굿즈, 선물용 소형 제품에 맞춰 형태를 상담하는 박스입니다.",
          image: images.premium,
          tags: ["굿즈", "선물 포장"],
          options: ["제품 크기", "내부 구성", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "투명 슬리브 박스",
          description: "제품 노출과 보호를 함께 고려하는 슬리브형 박스 구성입니다.",
          image: images.sleeve,
          tags: ["슬리브", "별도 상담"],
          options: ["제품 둘레", "투명 소재", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "반달 상자",
          description: "곡선형 포인트가 필요한 선물 포장과 이벤트 패키지에 맞춰 상담합니다.",
          image: images.giftThumb,
          tags: ["이벤트", "형태 상담"],
          options: ["형태", "재질", "인쇄 여부"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "손잡이 박스",
          description: "이동과 전달이 편한 손잡이 구조의 패키지 상담 상품입니다.",
          image: images.custom,
          tags: ["손잡이", "구조 상담"],
          options: ["손잡이 구조", "제품 무게", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
      ],
    },
    "delivery-box": {
      title: "택배박스",
      description: "발송과 보관에 적합한 골판지 박스와 배송용 패키지를 확인해보세요.",
      notice: "재고와 납기는 확인 후 안내되며, 사이즈와 수량에 따라 상담이 필요합니다.",
      heroImage: images.delivery,
      heroAlt: "크라프트 택배박스 대표 이미지",
      tags: ["택배 발송", "보관용", "골판지", "재고 확인 필요"],
      products: [
        {
          title: "크라프트 택배박스",
          description: "배송과 보관에 쓰기 좋은 기본 골판지 박스입니다.",
          image: images.delivery,
          tags: ["배송용", "재고 확인"],
          options: ["사이즈", "골 종류", "수량"],
          href: "product.html?category=delivery-box&product=kraft-delivery-box",
          actionLabel: "자세히 보기",
        },
        {
          title: "소형 발송 박스",
          description: "작은 제품이나 샘플 발송에 활용하기 좋은 박스입니다.",
          image: images.ready,
          tags: ["소형", "샘플 발송"],
          options: ["제품 크기", "완충 여부", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "브랜드 배송 박스",
          description: "무지 박스에 로고 인쇄나 스티커 구성을 더할 수 있습니다.",
          image: images.logoSet,
          tags: ["로고 상담", "브랜드 포장"],
          options: ["인쇄 위치", "수량", "재질"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
      ],
    },
    "shopping-bag": {
      title: "쇼핑백",
      description: "매장 포장, 행사 배포, 브랜드 선물 구성에 사용할 수 있는 종이 쇼핑백입니다.",
      notice: "인쇄 가능 여부는 수량, 재질, 쇼핑백 형태에 따라 달라질 수 있습니다.",
      heroImage: images.logo,
      heroAlt: "로고가 들어간 흰색 쇼핑백과 패키지 구성",
      tags: ["매장 포장", "행사용", "로고 인쇄 상담", "재질 상담"],
      products: [
        {
          title: "무지 쇼핑백",
          description: "로고 스티커나 리본과 함께 활용하기 좋은 기본 쇼핑백입니다.",
          image: images.logo,
          tags: ["기본", "로고 상담"],
          options: ["사이즈", "끈 종류", "수량"],
          href: "product.html?category=shopping-bag&product=plain-shopping-bag",
          actionLabel: "자세히 보기",
        },
        {
          title: "크라프트 쇼핑백",
          description: "자연스러운 브랜드 톤과 식품, 카페 포장에 잘 맞는 쇼핑백입니다.",
          image: images.natural,
          tags: ["크라프트", "식품 포장"],
          options: ["재질", "인쇄 여부", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "로고 인쇄 쇼핑백",
          description: "브랜드 로고와 그래픽을 넣어 포장 완성도를 높이는 구성입니다.",
          image: images.logoSet,
          tags: ["로고인쇄", "상담"],
          options: ["로고 파일", "인쇄 위치", "수량"],
          href: "product.html?category=logo-print&product=logo-print-shopping-bag",
          actionLabel: "자세히 보기",
        },
        {
          title: "행사 배포용 쇼핑백",
          description: "박람회, 팝업, 증정품 포장에 활용하기 좋은 쇼핑백입니다.",
          image: images.small,
          tags: ["행사", "팝업"],
          options: ["용도", "사이즈", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
      ],
    },
    "envelope-sleeve": {
      title: "봉투·슬리브",
      description: "소형 제품과 인쇄물 포장, 제품을 감싸는 슬리브형 패키지를 확인해보세요.",
      notice: "제품 크기와 재질, 인쇄 방식에 따라 제작 방향이 달라질 수 있습니다.",
      heroImage: images.logo,
      heroAlt: "봉투와 슬리브 패키지에 참고할 수 있는 브랜드 포장 구성",
      tags: ["소형 포장", "슬리브", "봉투", "로고 상담"],
      products: [
        {
          title: "기성 봉투",
          description: "작은 굿즈, 카드, 인쇄물 포장에 쓰기 좋은 봉투입니다.",
          image: images.logo,
          tags: ["봉투", "소형"],
          options: ["사이즈", "재질", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "기성 슬리브",
          description: "제품을 감싸 브랜드 정보와 시각적 포인트를 더하는 포장입니다.",
          image: images.sleeve,
          tags: ["슬리브", "띠지"],
          options: ["제품 둘레", "인쇄 여부", "수량"],
          href: "product.html?category=envelope-sleeve&product=ready-sleeve",
          actionLabel: "자세히 보기",
        },
        {
          title: "로고 스티커 부착 봉투",
          description: "무지 봉투에 로고 스티커를 더해 가볍게 브랜드를 표현합니다.",
          image: images.logoSet,
          tags: ["로고", "스티커"],
          options: ["스티커 형태", "봉투 재질", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
      ],
    },
    "sticker-label": {
      title: "스티커·라벨",
      description: "박스, 쇼핑백, 봉투에 브랜드 정보와 안내 문구를 더하는 스티커와 라벨입니다.",
      notice: "재질, 크기, 후가공, 수량에 따라 상담 후 안내됩니다.",
      heroImage: images.logoSet,
      heroAlt: "로고 스티커와 라벨이 포함된 패키지 구성",
      tags: ["로고 스티커", "봉인 라벨", "제품 정보", "소량 상담"],
      products: [
        {
          title: "원형 스티커",
          description: "봉인과 브랜드 표시를 함께 활용하기 좋은 기본 스티커입니다.",
          image: images.logoSet,
          tags: ["원형", "봉인"],
          options: ["지름", "재질", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "사각 라벨",
          description: "제품명과 안내 정보를 깔끔하게 정리할 수 있는 라벨입니다.",
          image: images.logo,
          tags: ["라벨", "정보 표시"],
          options: ["사이즈", "부착 위치", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "로고 스티커",
          description: "무지 상품에 브랜드 로고를 더하는 가장 간단한 구성입니다.",
          image: images.logoSet,
          tags: ["로고", "브랜드"],
          options: ["로고 파일", "형태", "수량"],
          href: "product.html?category=sticker-label&product=logo-sticker",
          actionLabel: "자세히 보기",
        },
        {
          title: "제품 정보 라벨",
          description: "성분, 재질, 안내 문구처럼 필요한 정보를 담는 라벨입니다.",
          image: images.logo,
          tags: ["정보 라벨", "상담"],
          options: ["문구", "크기", "재질"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
      ],
    },
    "gift-box": {
      title: "선물상자",
      description: "선물세트와 프리미엄 제품 구성에 적합한 패키지 상자입니다.",
      notice: "구성품 크기와 내부 고정 방식에 따라 제작 사양을 상담해야 합니다.",
      heroImage: images.premium,
      heroAlt: "선물세트와 프리미엄 박스가 함께 놓인 패키지 구성",
      tags: ["선물세트", "프리미엄", "내부 구성", "상담 필요"],
      products: [
        {
          title: "기본 선물상자",
          description: "선물세트 구성에 적합한 기본 박스입니다.",
          image: images.premium,
          tags: ["선물", "세트"],
          options: ["구성품", "사이즈", "수량"],
          href: "product.html?category=gift-box&product=basic-gift-box",
          actionLabel: "자세히 보기",
        },
        {
          title: "프리미엄 패키지 세트",
          description: "브랜드 선물과 고급 제품 포장에 어울리는 구성입니다.",
          image: images.studio,
          tags: ["프리미엄", "브랜드"],
          options: ["박스 형태", "인쇄 여부", "내부 구성"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "내부 트레이 구성",
          description: "제품을 고정하고 구성품을 정리하기 위한 내부 구조 상담 상품입니다.",
          image: images.custom,
          tags: ["트레이", "구조 상담"],
          options: ["제품 개수", "고정 방식", "재질"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
      ],
    },
    "small-sample": {
      title: "샘플·소량",
      description: "처음 시작하는 브랜드, 졸업작품, 테스트 제작을 위한 소량 패키지입니다.",
      notice: "소량 가능 여부와 샘플 일정은 상품과 사양 확인 후 안내됩니다.",
      heroImage: images.small,
      heroAlt: "소량 패키지와 샘플 제작을 위한 박스, 쇼핑백, 라벨 구성",
      tags: ["소량 상담", "샘플 확인", "졸업작품", "테스트 제작"],
      products: [
        {
          title: "소량 단상자",
          description: "처음 제품을 준비할 때 부담 없이 확인하기 좋은 박스입니다.",
          image: images.ready,
          tags: ["소량", "단상자"],
          options: ["사이즈", "수량", "인쇄 여부"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "샘플 패키지 세트",
          description: "여러 패키지 구성을 비교해보는 샘플형 구성입니다.",
          image: images.sampleSet,
          tags: ["샘플", "비교"],
          options: ["구성품", "수량", "상담 일정"],
          href: "product.html?category=small-sample&product=sample-package-set",
          actionLabel: "자세히 보기",
        },
        {
          title: "졸업작품 포장 세트",
          description: "작품 전시와 제출용 패키지를 준비할 때 활용하기 좋습니다.",
          image: images.natural,
          tags: ["작품", "전시"],
          options: ["작품 크기", "수량", "일정"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "소량 라벨 세트",
          description: "소량 상품에 브랜드 정보를 더하는 스티커와 라벨 구성입니다.",
          image: images.logoSet,
          tags: ["라벨", "소량"],
          options: ["형태", "재질", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
      ],
    },
    "logo-print": {
      title: "로고인쇄",
      description: "무지 상품에 브랜드 로고를 더해 쇼핑백, 박스, 슬리브, 라벨을 정리합니다.",
      notice: "인쇄 가능 여부는 상품, 수량, 재질에 따라 달라질 수 있습니다.",
      heroImage: images.logoSet,
      heroAlt: "로고 인쇄가 적용된 쇼핑백, 박스, 라벨 패키지 구성",
      tags: ["로고 파일 필요", "인쇄 위치 상담", "상품별 확인", "수량별 상담"],
      products: [
        {
          title: "쇼핑백 로고 인쇄",
          description: "무지 쇼핑백에 브랜드 로고를 더하는 상담 상품입니다.",
          image: images.logo,
          tags: ["쇼핑백", "로고"],
          options: ["로고 파일", "인쇄 위치", "수량"],
          href: "product.html?category=logo-print&product=logo-print-shopping-bag",
          actionLabel: "자세히 보기",
        },
        {
          title: "단상자 로고 인쇄",
          description: "기본 박스에 브랜드 로고와 안내 문구를 넣는 구성입니다.",
          image: images.ready,
          tags: ["단상자", "인쇄 상담"],
          options: ["박스 형태", "인쇄 면", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "스티커 로고 인쇄",
          description: "무지 패키지에 붙일 수 있는 로고 스티커입니다.",
          image: images.logoSet,
          tags: ["스티커", "소량 상담"],
          options: ["스티커 형태", "재질", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "슬리브 로고 인쇄",
          description: "제품을 감싸는 슬리브에 브랜드 정보를 더하는 구성입니다.",
          image: images.sleeve,
          tags: ["슬리브", "브랜드"],
          options: ["제품 둘레", "인쇄 범위", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
      ],
    },
  };

  Object.assign(categoryPageData, {
    "rigid-box": {
      title: "싸바리박스",
      description: "고급 선물세트, 화장품, 브랜드 패키지에 많이 사용하는 단단한 박스입니다.",
      notice: "구조, 재질, 수량, 후가공에 따라 제작 가능 여부와 견적이 달라질 수 있습니다.",
      heroImage: images.premium,
      heroAlt: "고급 선물세트와 브랜드 패키지에 어울리는 싸바리박스 구성",
      tags: ["고급 선물세트", "브랜드 패키지", "구조 상담", "후가공 상담"],
      products: [
        {
          title: "상하 분리형 싸바리박스",
          description: "뚜껑과 하부가 분리되는 고급 선물 패키지에 어울리는 구조입니다.",
          image: images.premium,
          tags: ["상하형", "선물세트"],
          options: ["제품 크기", "내부 구성", "후가공"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "서랍형 싸바리박스",
          description: "열고 닫는 경험을 강조하고 싶은 브랜드 제품에 적합한 박스입니다.",
          image: images.studio,
          tags: ["서랍형", "브랜드"],
          options: ["서랍 방향", "내부 트레이", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "고급 선물세트 싸바리박스",
          description: "여러 구성품을 안정적으로 담는 프리미엄 선물세트용 박스입니다.",
          image: images.giftThumb,
          tags: ["프리미엄", "세트"],
          options: ["구성품", "재질", "인쇄 여부"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "화장품 브랜드 싸바리박스",
          description: "화장품과 뷰티 브랜드의 제품군을 정돈해 보여주는 고급 박스입니다.",
          image: images.logoSet,
          tags: ["화장품", "로고 상담"],
          options: ["제품 배열", "로고 위치", "후가공"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
      ],
    },
    "business-card": {
      title: "명함",
      description: "브랜드와 담당자 정보를 전달하는 인쇄물입니다.",
      notice: "용지, 수량, 후가공, 디자인 파일 상태에 따라 상담 후 안내됩니다.",
      heroImage: images.studio,
      heroAlt: "브랜드 명함과 인쇄 샘플을 확인하는 구성",
      tags: ["브랜드 카드", "인쇄 상담", "후가공 상담", "디자인 의뢰 가능"],
      products: [
        {
          title: "기본 명함",
          description: "회사와 담당자 정보를 깔끔하게 전달하는 기본 명함입니다.",
          image: images.studio,
          tags: ["기본", "인쇄물"],
          options: ["용지", "수량", "디자인 파일"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "고급지 명함",
          description: "종이 질감과 두께로 브랜드 인상을 더 단단하게 보여주는 명함입니다.",
          image: images.premium,
          tags: ["고급지", "브랜드"],
          options: ["용지", "후가공", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "박 명함",
          description: "로고나 이름에 포인트 후가공을 더하는 명함 상담 상품입니다.",
          image: images.logoSet,
          tags: ["박", "후가공"],
          options: ["박 위치", "색상", "용지"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "브랜드 카드",
          description: "제품 설명, 감사 카드, 안내 카드처럼 패키지와 함께 쓰는 카드입니다.",
          image: images.sampleSet,
          tags: ["동봉 카드", "패키지 구성"],
          options: ["문구", "사이즈", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
      ],
    },
    "dust-bag": {
      title: "더스트백",
      description: "제품 보호와 고급 포장에 사용하는 패브릭 포장입니다.",
      notice: "원단, 사이즈, 로고 적용 방식에 따라 제작 가능 여부를 상담 후 안내드립니다.",
      heroImage: images.natural,
      heroAlt: "패브릭 더스트백과 선물 포장에 참고할 수 있는 구성",
      tags: ["패브릭 포장", "제품 보호", "로고 적용 상담", "선물 포장"],
      products: [
        {
          title: "기본 더스트백",
          description: "제품 보관과 보호에 활용하는 기본 패브릭 포장입니다.",
          image: images.natural,
          tags: ["기본", "제품 보호"],
          options: ["사이즈", "원단", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "로고 인쇄 더스트백",
          description: "패브릭 위에 브랜드 로고를 적용하는 더스트백 상담 상품입니다.",
          image: images.logoSet,
          tags: ["로고 상담", "브랜드"],
          options: ["로고 파일", "인쇄 위치", "원단"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "파우치형 더스트백",
          description: "끈 여밈과 보관성을 함께 고려하는 파우치형 포장입니다.",
          image: images.sampleSet,
          tags: ["파우치형", "여밈"],
          options: ["끈 방식", "사이즈", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "선물 포장용 더스트백",
          description: "상자 대신 부드러운 선물 포장 분위기를 만들 때 쓰기 좋습니다.",
          image: images.premium,
          tags: ["선물", "패브릭"],
          options: ["원단 색상", "로고 여부", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
      ],
    },
    accessories: {
      title: "부자재",
      description: "스티커, 라벨, 완충재, 리본처럼 패키지 완성도를 높이는 구성입니다.",
      notice: "패키지 본품과 함께 사용할 위치, 수량, 재질을 확인한 뒤 안내드립니다.",
      heroImage: images.logoSet,
      heroAlt: "스티커, 라벨, 완충재가 함께 놓인 패키지 부자재 구성",
      tags: ["스티커", "라벨", "완충재", "리본", "봉인"],
      products: [
        {
          title: "완충재",
          description: "제품 보호와 내부 고정을 위해 함께 검토하는 포장 부자재입니다.",
          image: images.natural,
          tags: ["보호", "내부 구성"],
          options: ["제품 무게", "박스 크기", "재질"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "리본",
          description: "선물 포장과 브랜드 키트에 포인트를 더하는 부자재입니다.",
          image: images.premium,
          tags: ["선물 포장", "포인트"],
          options: ["색상", "폭", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "스티커·라벨",
          description: "패키지 봉인, 로고 표시, 제품 정보 표시에 활용합니다.",
          image: images.stickerThumb,
          tags: ["스티커", "라벨"],
          options: ["모양", "재질", "문구"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "종이 충전재",
          description: "상자 안의 빈 공간을 채우고 제품을 안정적으로 보여주는 부자재입니다.",
          image: images.giftThumb,
          tags: ["충전재", "선물세트"],
          options: ["색상", "부피", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "봉인 스티커",
          description: "박스와 봉투를 깔끔하게 마감하면서 브랜드 포인트를 줄 수 있습니다.",
          image: images.logo,
          tags: ["봉인", "로고 상담"],
          options: ["크기", "형태", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
      ],
    },
    "cafe-supplies": {
      title: "카페용품",
      description: "카페, 디저트 매장, 테이크아웃 포장에 활용할 수 있는 패키지 상품군입니다.",
      notice: "식품 포장 용도, 수량, 재질, 인쇄 여부에 따라 상담 후 안내됩니다.",
      heroImage: images.small,
      heroAlt: "디저트 박스와 카페 스티커, 쇼핑백을 함께 구성한 카페용품",
      tags: ["디저트", "테이크아웃", "쿠키 봉투", "카페 스티커", "쇼핑백"],
      products: [
        {
          title: "디저트 포장박스",
          description: "쿠키, 마카롱, 작은 디저트 포장에 맞는 박스 상담 상품입니다.",
          image: images.natural,
          tags: ["디저트", "식품 포장"],
          options: ["제품 크기", "식품 용도", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "테이크아웃 쇼핑백",
          description: "카페 제품과 디저트 박스를 함께 담는 종이 쇼핑백입니다.",
          image: images.shoppingBagThumb,
          tags: ["테이크아웃", "쇼핑백"],
          options: ["제품 무게", "사이즈", "로고 여부"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "쿠키 봉투",
          description: "작은 디저트와 이벤트 상품을 담는 봉투형 포장입니다.",
          image: images.envelopeThumb,
          tags: ["쿠키", "봉투"],
          options: ["사이즈", "재질", "스티커 여부"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "카페 스티커",
          description: "컵, 봉투, 박스에 브랜드 로고와 안내 문구를 더하는 스티커입니다.",
          image: images.stickerThumb,
          tags: ["스티커", "로고 상담"],
          options: ["부착 위치", "모양", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "음료 캐리어",
          description: "테이크아웃 음료 이동과 매장 포장 흐름에 맞춰 상담하는 상품입니다.",
          image: images.delivery,
          tags: ["음료", "테이크아웃"],
          options: ["컵 수량", "재질", "납기 확인"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
      ],
    },
    "design-request": {
      title: "디자인의뢰",
      description: "로고, 패키지 도면, 그래픽, 굿즈 디자인 상담이 필요한 경우 연결하는 카테고리입니다.",
      notice: "디자인 범위와 보유 자료에 따라 상담 후 진행 방향을 안내드립니다.",
      heroImage: images.custom,
      heroAlt: "패키지 도면과 그래픽 디자인 상담 자료가 놓인 디자인의뢰 구성",
      tags: ["패키지 도면", "그래픽 디자인", "로고 적용", "굿즈 디자인", "상담 필요"],
      products: [
        {
          title: "패키지 도면 설계",
          description: "제품 크기와 포장 방식을 기준으로 칼선과 구조 방향을 상담합니다.",
          image: images.custom,
          tags: ["도면", "구조 상담"],
          options: ["제품 치수", "포장 형태", "사용 목적"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "패키지 그래픽 디자인",
          description: "박스, 쇼핑백, 라벨에 들어갈 그래픽 방향을 상담합니다.",
          image: images.logoSet,
          tags: ["그래픽", "브랜드"],
          options: ["로고 파일", "문구", "적용 상품"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "BI/CI 디자인 상담",
          description: "브랜드 기본 로고와 시각 요소를 패키지에 맞춰 정리하는 상담입니다.",
          image: images.studio,
          tags: ["BI/CI", "브랜드"],
          options: ["브랜드 자료", "사용 범위", "일정"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "슬로건 디자인 상담",
          description: "패키지와 카드에 들어갈 문구와 브랜드 톤을 함께 정리합니다.",
          image: images.sampleSet,
          tags: ["문구", "브랜드 톤"],
          options: ["문구 방향", "적용 위치", "수량"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
        {
          title: "굿즈 디자인 상담",
          description: "굿즈와 패키지를 함께 준비할 때 디자인 적용 범위를 상담합니다.",
          image: images.premium,
          tags: ["굿즈", "패키지 세트"],
          options: ["상품군", "디자인 범위", "일정"],
          href: quoteHref,
          actionLabel: "상담하기",
        },
      ],
    },
  });

  const categoryHeroBanners = {
    box: [
      { title: "기본 포장을 쉽게 시작하는 단상자", description: "화장품, 굿즈, 소형 제품 포장에 많이 쓰는 기본 종이박스입니다.", image: images.ready, href: productHref("box", "basic-white-box"), alt: "기본 흰색 단상자와 패키지 구성" },
      { title: "제품 크기에 맞춰 먼저 확인해보세요", description: "소형 제품, 샘플, 테스트 포장에 맞는 박스 구성을 둘러볼 수 있습니다.", image: images.sampleSet, href: productHref("box", "small-product-box"), alt: "소형 제품 포장 박스와 샘플 구성" },
      { title: "무지 박스에 로고 인쇄도 상담 가능", description: "로고 파일, 수량, 인쇄 위치에 따라 가능한 방식을 안내드립니다.", image: images.logoSet, href: "category.html?category=logo-print", alt: "로고 인쇄 상담용 패키지 구성" },
    ],
    "delivery-box": [
      { title: "발송과 보관을 위한 택배박스", description: "제품 무게와 크기에 맞춰 배송용 골판지 박스를 확인해보세요.", image: images.delivery, href: productHref("delivery-box", "kraft-delivery-box"), alt: "크라프트 택배박스" },
      { title: "샘플 발송도 깔끔하게", description: "작은 제품과 샘플을 보낼 때 필요한 사이즈와 완충 조건을 상담할 수 있습니다.", image: images.ready, href: productHref("delivery-box", "small-shipping-box"), alt: "소형 발송 박스" },
      { title: "브랜드 배송 박스 상담", description: "무지 택배박스에 로고 인쇄나 스티커를 더하는 방향을 확인해보세요.", image: images.logoSet, href: productHref("delivery-box", "brand-delivery-box"), alt: "브랜드 배송 박스 구성" },
    ],
    "shopping-bag": [
      { title: "브랜드가 잘 보이는 쇼핑백", description: "매장 포장, 행사 배포, 선물 구성에 어울리는 종이 쇼핑백입니다.", image: images.shoppingBagThumb, href: productHref("shopping-bag", "plain-shopping-bag"), alt: "무지 쇼핑백과 브랜드 포장" },
      { title: "로고 인쇄 쇼핑백 상담", description: "로고 위치, 수량, 종이 재질에 따라 인쇄 가능 여부를 확인합니다.", image: images.logo, href: productHref("logo-print", "logo-print-shopping-bag"), alt: "로고 인쇄 쇼핑백" },
      { title: "행사와 팝업에 쓰기 좋은 구성", description: "배포용 쇼핑백은 사이즈, 손잡이, 수량을 먼저 정리하면 상담이 빨라집니다.", image: images.small, href: productHref("shopping-bag", "event-shopping-bag"), alt: "행사 배포용 쇼핑백" },
    ],
    "envelope-sleeve": [
      { title: "제품을 감싸는 봉투·슬리브", description: "인쇄물, 굿즈, 소형 제품을 가볍게 포장하는 구성을 확인해보세요.", image: images.envelopeThumb, href: productHref("envelope-sleeve", "ready-envelope"), alt: "기성 봉투 패키지" },
      { title: "제품에 밀착되는 슬리브", description: "제품 둘레와 노출하고 싶은 정보에 맞춰 슬리브 방향을 상담할 수 있습니다.", image: images.sleeve, href: productHref("envelope-sleeve", "ready-sleeve"), alt: "슬리브 패키지" },
      { title: "스티커와 함께 쓰는 봉투 포장", description: "무지 봉투에 로고 스티커를 더해 브랜드 포인트를 만들 수 있습니다.", image: images.logoSet, href: productHref("envelope-sleeve", "logo-sticker-envelope"), alt: "로고 스티커 부착 봉투" },
    ],
    "sticker-label": [
      { title: "브랜드 사인을 더하는 스티커", description: "박스, 쇼핑백, 봉투 위에 로고와 안내 정보를 정리할 수 있습니다.", image: images.stickerThumb, href: productHref("sticker-label", "logo-sticker"), alt: "로고 스티커와 라벨" },
      { title: "봉인 라벨과 제품 정보 라벨", description: "용도에 따라 재질, 형태, 문구를 나눠 상담하면 좋습니다.", image: images.logoSet, href: productHref("sticker-label", "square-label"), alt: "사각 라벨 패키지" },
      { title: "선물 포장에 어울리는 스티커", description: "감사 문구, 브랜드 로고, 봉인용 스티커를 함께 검토할 수 있습니다.", image: images.premium, href: productHref("sticker-label", "logo-round-sticker"), alt: "선물 포장 스티커" },
    ],
    "gift-box": [
      { title: "선물세트 구성을 위한 상자", description: "구성품 크기와 수량에 맞춰 선물상자와 내부 구성 방향을 확인합니다.", image: images.premium, href: productHref("gift-box", "basic-gift-box"), alt: "기본 선물상자 구성" },
      { title: "프리미엄 패키지 세트", description: "상자, 쇼핑백, 스티커를 함께 맞춰 브랜드 선물 느낌을 정리할 수 있습니다.", image: images.giftThumb, href: productHref("gift-box", "premium-package-set"), alt: "프리미엄 선물 패키지 세트" },
      { title: "제품 고정을 위한 내부 트레이", description: "여러 구성품이 흔들리지 않도록 내부 구조까지 상담할 수 있습니다.", image: images.custom, href: productHref("gift-box", "inner-tray-set"), alt: "내부 트레이 패키지 구성" },
    ],
    "small-sample": [
      { title: "처음 시작하는 소량 패키지", description: "테스트, 샘플, 졸업작품용 패키지를 부담 없이 확인해보세요.", image: images.small, href: productHref("small-sample", "sample-package-set"), alt: "소량 샘플 패키지 세트" },
      { title: "졸업작품과 전시용 패키지", description: "짧은 일정에서도 필요한 수량, 사이즈, 인쇄 여부를 먼저 정리하면 상담이 수월합니다.", image: images.studio, href: productHref("small-sample", "graduation-package-set"), alt: "졸업작품 패키지 구성" },
      { title: "소량 라벨과 스티커", description: "무지 상품에 라벨을 더해 작은 수량의 브랜드 테스트를 진행할 수 있습니다.", image: images.sampleThumb, href: productHref("small-sample", "small-label-set"), alt: "소량 라벨 스티커 구성" },
    ],
    "logo-print": [
      { title: "무지 상품에 로고를 더해보세요", description: "쇼핑백, 단상자, 슬리브, 스티커에 로고 인쇄 상담이 가능합니다.", image: images.logoSet, href: productHref("logo-print", "logo-print-shopping-bag"), alt: "로고 인쇄 패키지 구성" },
      { title: "단상자 로고 인쇄 상담", description: "박스 재질과 수량, 인쇄 면적에 따라 가능한 방식을 확인합니다.", image: images.ready, href: productHref("logo-print", "logo-print-carton-box"), alt: "단상자 로고 인쇄 상담" },
      { title: "스티커로 간단하게 브랜드 표시", description: "로고 스티커는 소량 상품과 샘플 포장에도 활용하기 좋습니다.", image: images.stickerThumb, href: productHref("logo-print", "logo-print-sticker"), alt: "로고 스티커 상담" },
    ],
  };

  const categoryFeatureCards = {
    box: [
      { label: "추천 용도", title: "화장품, 굿즈, 건강식품", description: "소형 제품을 깔끔하게 담기 좋은 기본 종이박스입니다." },
      { label: "확인 정보", title: "제품 가로·세로·높이", description: "제품 실측과 예상 수량을 먼저 정리해주시면 상담이 빨라집니다." },
      { label: "인쇄 상담", title: "로고 인쇄 또는 스티커", description: "수량과 재질에 따라 적합한 브랜드 적용 방식을 안내드립니다." },
      { label: "주의사항", title: "재질과 납기 확인", description: "종이, 수량, 인쇄 여부에 따라 견적과 납기가 달라질 수 있습니다." },
    ],
    "delivery-box": [
      { label: "추천 용도", title: "택배 발송과 보관", description: "제품 무게와 파손 가능성을 함께 고려해야 합니다." },
      { label: "확인 정보", title: "제품 무게와 완충 여부", description: "완충재 필요 여부에 따라 박스 여유 공간이 달라집니다." },
      { label: "로고 적용", title: "인쇄 또는 스티커", description: "배송 박스에도 브랜드 노출을 위한 상담이 가능합니다." },
      { label: "주의사항", title: "재고와 납기 확인", description: "기성 사이즈 재고는 확인 후 안내됩니다." },
    ],
    "shopping-bag": [
      { label: "추천 용도", title: "매장 포장, 행사 배포", description: "브랜드 제품 전달과 선물 포장에 많이 사용됩니다." },
      { label: "확인 정보", title: "사이즈, 종이, 손잡이", description: "담을 제품 무게에 따라 종이 두께와 손잡이를 검토해야 합니다." },
      { label: "로고 적용", title: "인쇄 또는 스티커 부착", description: "로고 인쇄 가능 여부는 수량과 재질에 따라 달라질 수 있습니다." },
      { label: "주의사항", title: "제품 무게 확인", description: "무거운 제품은 쇼핑백 보강 여부를 함께 확인하는 것이 좋습니다." },
    ],
    "envelope-sleeve": [
      { label: "추천 용도", title: "굿즈, 카드, 소형 제품", description: "제품을 가볍게 감싸거나 묶어 보이게 하는 포장입니다." },
      { label: "확인 정보", title: "제품 둘레와 삽입 방향", description: "슬리브는 실제 제품 치수와 여유 공간 확인이 중요합니다." },
      { label: "조합 상담", title: "띠지, 라벨, 스티커", description: "무지 상품에 라벨을 더해 브랜드 표현을 할 수 있습니다." },
      { label: "주의사항", title: "재질과 접착 방식", description: "종이 재질과 접착 방식에 따라 제작 방향이 달라집니다." },
    ],
    "sticker-label": [
      { label: "추천 용도", title: "봉인, 로고, 제품 정보", description: "기본 패키지 위에 브랜드 정보를 빠르게 더할 수 있습니다." },
      { label: "확인 정보", title: "크기, 모양, 재질", description: "붙일 대상과 표면에 따라 재질 선택이 달라집니다." },
      { label: "인쇄 상담", title: "로고 색상과 후가공", description: "색상과 후가공은 파일 상태와 수량을 보고 안내드립니다." },
      { label: "주의사항", title: "부착 위치 확인", description: "곡면이나 거친 표면에는 접착 테스트가 필요할 수 있습니다." },
    ],
    "gift-box": [
      { label: "추천 용도", title: "선물세트와 브랜드 키트", description: "여러 구성품을 한 번에 담는 포장에 적합합니다." },
      { label: "확인 정보", title: "구성품 크기와 배열", description: "내부 트레이와 완충 구조를 함께 검토하면 좋습니다." },
      { label: "조합 상담", title: "상자, 쇼핑백, 라벨", description: "전체 선물세트 톤을 맞춰 상담할 수 있습니다." },
      { label: "주의사항", title: "수량과 제작 방식", description: "구조와 후가공에 따라 상담 후 견적이 달라질 수 있습니다." },
    ],
    "small-sample": [
      { label: "추천 용도", title: "테스트, 샘플, 졸업작품", description: "본 제작 전 형태와 분위기를 먼저 확인할 때 좋습니다." },
      { label: "확인 정보", title: "필요 수량과 일정", description: "일정이 촉박하면 가능한 방식부터 먼저 확인해야 합니다." },
      { label: "로고 적용", title: "스티커 또는 간단한 인쇄", description: "소량은 상품과 방식에 따라 상담이 필요합니다." },
      { label: "주의사항", title: "최소 수량 확인", description: "상품별 최소 수량과 재고는 확인 후 안내됩니다." },
    ],
    "logo-print": [
      { label: "추천 용도", title: "무지 상품 브랜드화", description: "기본 상품에 로고를 더해 브랜드 포장으로 사용할 수 있습니다." },
      { label: "확인 정보", title: "로고 파일과 인쇄 위치", description: "AI, PDF 등 원본 파일이 있으면 상담이 더 정확합니다." },
      { label: "가능 범위", title: "상품별 인쇄 가능 여부", description: "상품, 수량, 재질에 따라 인쇄 가능 여부가 달라질 수 있습니다." },
      { label: "주의사항", title: "색상 차이 가능", description: "화면 색상과 실제 인쇄 색상은 차이가 있을 수 있습니다." },
    ],
  };

  const categoryLinkCards = [
    { title: "이용안내", description: "FAQ, 배송, 주문/결제, 취소/반품 안내를 한곳에서 확인합니다.", href: "support.html", badge: "고객센터" },
    { title: "제작가이드", description: "제작 전 사이즈, 수량, 재질을 정리하는 기준을 확인해보세요.", href: "guide-production.html", badge: "GUIDE" },
    { title: "디자인가이드", description: "로고 파일과 인쇄 위치를 준비할 때 필요한 내용을 확인합니다.", href: "index.html#guide-updates", badge: "준비중" },
    { title: "주의사항", description: "재고, 납기, 인쇄 가능 여부는 상담 후 안내되는 항목입니다.", href: "index.html#guide-updates", badge: "안내" },
    { title: "자주 묻는 질문", description: "디자인 파일, 납기, 소량 제작 관련 질문을 모았습니다.", href: "faq.html", badge: "FAQ" },
    { title: "견적문의", description: "원하는 상품과 수량, 사이즈, 인쇄 여부를 남겨 상담으로 이어갑니다.", href: "index.html#quote", badge: "상담" },
    { title: "로고인쇄 상담", description: "무지 상품에 브랜드 로고를 적용하는 방향을 확인합니다.", href: "category.html?category=logo-print", badge: "로고" },
    { title: "샘플·소량 상담", description: "테스트와 소량 제작에 맞는 상품을 먼저 둘러보세요.", href: "category.html?category=small-sample", badge: "소량" },
  ];

  const categoryProductSections = {
    box: [
      { title: "대표 단상자", description: "가장 많이 확인하는 기본 종이박스 구성입니다.", indexes: [0, 1, 2, 3] },
      { title: "소형 제품 포장 추천", description: "화장품, 굿즈, 디저트처럼 작은 제품에 어울리는 묶음입니다.", indexes: [0, 2, 3] },
    ],
    "delivery-box": [
      { title: "배송 박스 추천", description: "발송과 보관을 고려한 골판지 박스 구성입니다.", indexes: [0, 1, 2] },
      { title: "브랜드 배송 구성", description: "배송 박스에 로고와 스티커를 더하는 방향을 볼 수 있습니다.", indexes: [2, 0, 1] },
    ],
    "shopping-bag": [
      { title: "대표 쇼핑백", description: "매장 포장과 행사 배포에 많이 쓰는 쇼핑백입니다.", indexes: [0, 1, 2, 3] },
      { title: "로고 적용 추천", description: "브랜드 노출이 필요한 쇼핑백 구성을 모았습니다.", indexes: [2, 0, 3] },
    ],
    "envelope-sleeve": [
      { title: "봉투·슬리브 추천", description: "소형 제품과 인쇄물을 감싸는 가벼운 포장입니다.", indexes: [0, 1, 2] },
      { title: "스티커 조합 포장", description: "무지 상품에 로고 스티커를 더하는 구성을 확인해보세요.", indexes: [2, 0, 1] },
    ],
    "sticker-label": [
      { title: "대표 스티커·라벨", description: "봉인, 로고, 제품 정보 표시에 많이 쓰는 구성입니다.", indexes: [0, 1, 2, 3] },
      { title: "패키지 마감 추천", description: "박스와 쇼핑백에 함께 쓰기 좋은 스티커 묶음입니다.", indexes: [2, 0, 3] },
    ],
    "gift-box": [
      { title: "선물상자 구성", description: "선물세트와 프리미엄 패키지를 위한 기본 묶음입니다.", indexes: [0, 1, 2] },
      { title: "함께 맞추면 좋은 상품", description: "상자, 내부 트레이, 라벨 조합을 함께 검토할 수 있습니다.", indexes: [1, 2, 0] },
    ],
    "small-sample": [
      { title: "소량·샘플 추천", description: "처음 시작하는 브랜드와 졸업작품에 맞는 구성입니다.", indexes: [0, 1, 2, 3] },
      { title: "테스트용 포장 묶음", description: "본 제작 전 형태와 느낌을 확인하기 좋은 상품입니다.", indexes: [1, 0, 3] },
    ],
    "logo-print": [
      { title: "로고 인쇄 대표 상품", description: "무지 상품에 브랜드 로고를 더하는 구성을 모았습니다.", indexes: [0, 1, 2, 3] },
      { title: "상품별 로고 적용", description: "쇼핑백, 단상자, 슬리브, 스티커별 상담 흐름을 확인하세요.", indexes: [0, 1, 3, 2] },
    ],
  };

  Object.assign(categoryHeroBanners, {
    "rigid-box": [
      { title: "고급 선물세트에 어울리는 싸바리박스", description: "상하 분리형, 서랍형, 내부 트레이 구성까지 함께 상담할 수 있습니다.", image: images.premium, href: productHref("rigid-box", "top-bottom-rigid-box"), alt: "고급 선물세트 싸바리박스" },
      { title: "브랜드 제품을 단단하게 보여주세요", description: "화장품과 프리미엄 굿즈에 맞는 재질, 후가공, 로고 적용을 확인합니다.", image: images.studio, href: productHref("rigid-box", "drawer-rigid-box"), alt: "브랜드 제품용 싸바리박스" },
    ],
    "business-card": [
      { title: "브랜드 정보를 깔끔하게 전달하는 명함", description: "기본 명함부터 고급지, 박 후가공까지 용도에 맞춰 상담합니다.", image: images.studio, href: productHref("business-card", "basic-business-card"), alt: "명함과 브랜드 카드 인쇄 샘플" },
      { title: "패키지와 함께 쓰는 브랜드 카드", description: "감사 카드, 제품 설명 카드, 동봉 카드까지 함께 검토해보세요.", image: images.sampleSet, href: productHref("business-card", "premium-business-card"), alt: "패키지 동봉용 브랜드 카드" },
    ],
    "dust-bag": [
      { title: "제품을 부드럽게 보호하는 더스트백", description: "원단, 사이즈, 로고 적용 방식에 따라 더스트백 방향을 안내드립니다.", image: images.natural, href: productHref("dust-bag", "basic-dust-bag"), alt: "기본 패브릭 더스트백" },
      { title: "로고를 더한 패브릭 포장", description: "선물 포장과 제품 보관에 어울리는 로고 인쇄 더스트백을 확인하세요.", image: images.logoSet, href: productHref("dust-bag", "logo-dust-bag"), alt: "로고 인쇄 더스트백" },
    ],
    accessories: [
      { title: "패키지 완성도를 높이는 부자재", description: "완충재, 리본, 라벨, 봉인 스티커를 패키지와 함께 검토합니다.", image: images.logoSet, href: productHref("accessories", "package-cushion"), alt: "스티커와 완충재 패키지 부자재" },
      { title: "봉인과 마감까지 한 번에 정리", description: "패키지 본품에 맞는 스티커와 충전재 구성을 상담해보세요.", image: images.stickerThumb, href: productHref("accessories", "sealing-sticker"), alt: "봉인 스티커와 라벨 부자재" },
    ],
    "cafe-supplies": [
      { title: "디저트와 테이크아웃 포장을 위한 카페용품", description: "디저트 박스, 쿠키 봉투, 쇼핑백, 카페 스티커를 함께 둘러보세요.", image: images.small, href: productHref("cafe-supplies", "dessert-package-box"), alt: "디저트 박스와 카페 포장용품" },
      { title: "매장 로고를 포장에 자연스럽게", description: "컵, 봉투, 박스에 적용할 카페 스티커와 쇼핑백 구성을 안내합니다.", image: images.shoppingBagThumb, href: productHref("cafe-supplies", "cafe-sticker"), alt: "카페 스티커와 테이크아웃 쇼핑백" },
    ],
    "design-request": [
      { title: "패키지 디자인이 어렵다면 상담으로 시작하세요", description: "도면 설계, 그래픽 디자인, 로고 적용 범위를 함께 정리합니다.", image: images.custom, href: productHref("design-request", "package-dieline-design"), alt: "패키지 도면 설계와 디자인 상담 자료" },
      { title: "제품과 브랜드에 맞는 그래픽 방향", description: "보유 자료와 제작 목적을 기준으로 디자인 상담 흐름을 안내드립니다.", image: images.logoSet, href: productHref("design-request", "package-graphic-design"), alt: "패키지 그래픽 디자인 상담 구성" },
    ],
  });

  Object.assign(categoryFeatureCards, {
    "rigid-box": [
      { label: "추천 용도", title: "고급 선물세트, 화장품", description: "제품을 단단하게 보호하면서 브랜드 인상을 높이는 포장입니다." },
      { label: "확인 정보", title: "구성품 크기와 내부 구조", description: "제품 배열과 고정 방식에 따라 구조 상담이 필요합니다." },
      { label: "후가공 상담", title: "박, 엠보, 로고 적용", description: "수량과 재질에 따라 가능한 후가공 방향을 안내드립니다." },
      { label: "주의사항", title: "제작 사양 확인", description: "구조와 재질에 따라 납기와 견적이 달라질 수 있습니다." },
    ],
    "business-card": [
      { label: "추천 용도", title: "명함, 브랜드 카드", description: "담당자 정보와 브랜드 안내를 간결하게 전달합니다." },
      { label: "확인 정보", title: "용지, 수량, 파일", description: "디자인 파일 상태와 후가공 여부를 먼저 확인합니다." },
      { label: "후가공 상담", title: "박, 두께, 질감", description: "브랜드 톤에 맞는 종이와 가공 방향을 안내합니다." },
      { label: "주의사항", title: "색상 차이 가능", description: "화면 색상과 실제 인쇄 색상은 차이가 있을 수 있습니다." },
    ],
    "dust-bag": [
      { label: "추천 용도", title: "제품 보호와 선물 포장", description: "제품을 부드럽게 감싸고 고급감을 더하는 패브릭 포장입니다." },
      { label: "확인 정보", title: "제품 크기와 원단", description: "원단과 여밈 방식에 따라 제작 방향이 달라집니다." },
      { label: "로고 상담", title: "인쇄, 라벨, 자수 여부", description: "로고 적용 방식은 원단과 수량에 따라 확인합니다." },
      { label: "주의사항", title: "재질별 상담 필요", description: "패브릭 소재는 색상과 수량 조건을 함께 확인해야 합니다." },
    ],
    accessories: [
      { label: "추천 용도", title: "패키지 마감과 보호", description: "부자재는 본품 포장과 함께 쓰일 때 완성도가 높아집니다." },
      { label: "확인 정보", title: "부착 위치와 제품 무게", description: "완충재와 스티커는 실제 사용 위치가 중요합니다." },
      { label: "조합 상담", title: "스티커, 리본, 충전재", description: "패키지 톤에 맞춰 필요한 부자재만 정리할 수 있습니다." },
      { label: "주의사항", title: "본품 사양과 함께 확인", description: "부자재만 단독으로 보기보다 패키지 본품과 함께 검토하는 것이 좋습니다." },
    ],
    "cafe-supplies": [
      { label: "추천 용도", title: "디저트, 쿠키, 테이크아웃", description: "카페 매장 운영에 자주 쓰는 포장 상품군입니다." },
      { label: "확인 정보", title: "식품 용도와 제품 크기", description: "담을 제품과 보관 방식을 먼저 정리하면 상담이 빨라집니다." },
      { label: "로고 적용", title: "스티커와 쇼핑백", description: "소량은 스티커 조합으로 브랜드 포인트를 더할 수 있습니다." },
      { label: "주의사항", title: "재질과 용도 확인", description: "식품 포장 용도와 재질 조건은 상담 후 안내됩니다." },
    ],
    "design-request": [
      { label: "추천 용도", title: "도면, 그래픽, 브랜드 정리", description: "제작할 상품은 정했지만 디자인 방향이 필요한 경우 연결합니다." },
      { label: "확인 정보", title: "보유 파일과 적용 상품", description: "로고, 이미지, 문구, 참고 자료가 있으면 상담이 쉬워집니다." },
      { label: "상담 범위", title: "구조와 그래픽 분리 확인", description: "도면 설계와 그래픽 디자인은 필요한 범위가 다를 수 있습니다." },
      { label: "주의사항", title: "제작 전 사양 확인", description: "디자인은 실제 제작 사양과 함께 검토해야 합니다." },
    ],
  });

  Object.assign(categoryProductSections, {
    "rigid-box": [
      { title: "싸바리박스 대표 구성", description: "고급 선물세트와 브랜드 제품에 많이 쓰는 구조입니다.", indexes: [0, 1, 2, 3] },
      { title: "프리미엄 패키지 추천", description: "내부 구성과 후가공까지 함께 상담하는 묶음입니다.", indexes: [2, 0, 3] },
    ],
    "business-card": [
      { title: "명함과 브랜드 카드", description: "기본 인쇄물과 패키지 동봉 카드를 함께 확인합니다.", indexes: [0, 1, 2, 3] },
      { title: "후가공 명함 추천", description: "브랜드 인상을 높이는 용지와 박 가공 중심 구성입니다.", indexes: [1, 2, 3] },
    ],
    "dust-bag": [
      { title: "더스트백 대표 구성", description: "제품 보호와 선물 포장에 맞는 패브릭 포장입니다.", indexes: [0, 1, 2, 3] },
      { title: "로고 적용 더스트백", description: "브랜드 로고를 더하는 패브릭 포장 방향을 확인합니다.", indexes: [1, 0, 3] },
    ],
    accessories: [
      { title: "패키지 부자재 묶음", description: "완충재, 리본, 스티커, 충전재를 함께 확인합니다.", indexes: [0, 1, 2, 3] },
      { title: "봉인과 마감 추천", description: "패키지 마감에 자주 쓰는 스티커와 라벨 중심 구성입니다.", indexes: [4, 2, 1] },
    ],
    "cafe-supplies": [
      { title: "카페 포장 대표 상품", description: "디저트 박스, 쇼핑백, 봉투, 스티커를 함께 둘러봅니다.", indexes: [0, 1, 2, 3] },
      { title: "테이크아웃 포장 추천", description: "매장 운영 흐름에 맞춰 자주 쓰는 상품을 묶었습니다.", indexes: [1, 2, 3, 4] },
    ],
    "design-request": [
      { title: "디자인 상담 대표 항목", description: "도면 설계와 그래픽 디자인을 먼저 확인해보세요.", indexes: [0, 1, 2, 3] },
      { title: "패키지 제작 전 준비", description: "브랜드 자료와 적용 상품을 기준으로 상담 범위를 정리합니다.", indexes: [0, 1, 4] },
    ],
  });

  const productFilterData = {
    box: [
      { useCases: ["화장품", "굿즈", "소형제품"], materials: ["흰색", "종이"], printOptions: ["무지", "로고인쇄 상담"], isSmallQuantity: true, popularity: 95, createdAt: "2026-06-20", recommendedOrder: 1, alt: "기본 흰색 단상자 패키지" },
      { useCases: ["디저트", "굿즈", "소형제품"], materials: ["크라프트", "종이"], printOptions: ["무지", "로고인쇄 상담"], isSmallQuantity: false, popularity: 83, createdAt: "2026-06-16", recommendedOrder: 2, alt: "크라프트 단상자 패키지" },
      { useCases: ["화장품", "굿즈", "소형제품"], materials: ["흰색", "종이"], printOptions: ["로고인쇄 상담", "스티커 적용"], isSmallQuantity: true, popularity: 88, createdAt: "2026-06-18", recommendedOrder: 3, alt: "소형 제품 포장 박스" },
      { useCases: ["소형제품", "졸업작품"], materials: ["남색", "흰색", "종이"], printOptions: ["무지", "별도 상담"], isSmallQuantity: true, popularity: 76, createdAt: "2026-06-11", recommendedOrder: 4, alt: "테스트용 무지박스" },
    ],
    "delivery-box": [
      { useCases: ["배송"], materials: ["크라프트", "골판지"], printOptions: ["무지", "스티커 적용"], isSmallQuantity: false, popularity: 91, createdAt: "2026-06-19", recommendedOrder: 1, alt: "크라프트 택배박스" },
      { useCases: ["배송", "소형제품", "졸업작품"], materials: ["흰색", "종이", "골판지"], printOptions: ["무지", "스티커 적용"], isSmallQuantity: true, popularity: 78, createdAt: "2026-06-12", recommendedOrder: 2, alt: "소형 발송 박스" },
      { useCases: ["배송", "굿즈"], materials: ["크라프트", "골판지"], printOptions: ["로고인쇄 상담", "스티커 적용"], isSmallQuantity: false, popularity: 86, createdAt: "2026-06-14", recommendedOrder: 3, alt: "브랜드 배송 박스" },
    ],
    "shopping-bag": [
      { useCases: ["화장품", "굿즈", "행사"], materials: ["흰색", "종이"], printOptions: ["무지", "스티커 적용", "로고인쇄 상담"], isSmallQuantity: true, popularity: 93, createdAt: "2026-06-20", recommendedOrder: 1, alt: "무지 쇼핑백" },
      { useCases: ["디저트", "행사"], materials: ["크라프트", "종이"], printOptions: ["무지", "로고인쇄 상담"], isSmallQuantity: false, popularity: 82, createdAt: "2026-06-15", recommendedOrder: 2, alt: "크라프트 쇼핑백" },
      { useCases: ["화장품", "굿즈", "선물세트"], materials: ["흰색", "남색", "종이"], printOptions: ["로고인쇄 상담"], isSmallQuantity: false, popularity: 96, createdAt: "2026-06-21", recommendedOrder: 3, alt: "로고 인쇄 쇼핑백" },
      { useCases: ["행사", "굿즈"], materials: ["흰색", "종이"], printOptions: ["무지", "스티커 적용"], isSmallQuantity: true, popularity: 74, createdAt: "2026-06-10", recommendedOrder: 4, alt: "행사 배포용 쇼핑백" },
    ],
    "envelope-sleeve": [
      { useCases: ["굿즈", "소형제품", "행사"], materials: ["흰색", "종이"], printOptions: ["무지", "스티커 적용"], isSmallQuantity: true, popularity: 80, createdAt: "2026-06-17", recommendedOrder: 1, alt: "기성 봉투" },
      { useCases: ["화장품", "디저트", "소형제품"], materials: ["크라프트", "종이"], printOptions: ["로고인쇄 상담", "별도 상담"], isSmallQuantity: false, popularity: 84, createdAt: "2026-06-13", recommendedOrder: 2, alt: "기성 슬리브" },
      { useCases: ["굿즈", "행사"], materials: ["흰색", "스티커", "종이"], printOptions: ["스티커 적용", "로고인쇄 상담"], isSmallQuantity: true, popularity: 72, createdAt: "2026-06-09", recommendedOrder: 3, alt: "로고 스티커 부착 봉투" },
    ],
    "sticker-label": [
      { useCases: ["화장품", "디저트", "소형제품"], materials: ["스티커", "라벨"], printOptions: ["로고인쇄 상담", "별도 상담"], isSmallQuantity: true, popularity: 92, createdAt: "2026-06-21", recommendedOrder: 1, alt: "원형 스티커" },
      { useCases: ["화장품", "소형제품"], materials: ["라벨", "흰색"], printOptions: ["별도 상담"], isSmallQuantity: true, popularity: 81, createdAt: "2026-06-12", recommendedOrder: 2, alt: "사각 라벨" },
      { useCases: ["굿즈", "선물세트", "행사"], materials: ["스티커", "크라프트"], printOptions: ["스티커 적용", "로고인쇄 상담"], isSmallQuantity: true, popularity: 79, createdAt: "2026-06-16", recommendedOrder: 3, alt: "로고 스티커" },
      { useCases: ["화장품", "디저트"], materials: ["라벨", "흰색"], printOptions: ["별도 상담"], isSmallQuantity: false, popularity: 70, createdAt: "2026-06-08", recommendedOrder: 4, alt: "제품 정보 라벨" },
    ],
    "gift-box": [
      { useCases: ["선물세트", "굿즈"], materials: ["흰색", "종이"], printOptions: ["무지", "로고인쇄 상담"], isSmallQuantity: false, popularity: 89, createdAt: "2026-06-18", recommendedOrder: 1, alt: "기본 선물상자" },
      { useCases: ["선물세트", "화장품"], materials: ["남색", "흰색", "종이"], printOptions: ["로고인쇄 상담", "별도 상담"], isSmallQuantity: false, popularity: 94, createdAt: "2026-06-20", recommendedOrder: 2, alt: "프리미엄 패키지 세트" },
      { useCases: ["선물세트", "소형제품"], materials: ["크라프트", "종이"], printOptions: ["별도 상담"], isSmallQuantity: false, popularity: 77, createdAt: "2026-06-07", recommendedOrder: 3, alt: "내부 트레이 구성" },
    ],
    "small-sample": [
      { useCases: ["졸업작품", "소형제품", "화장품"], materials: ["흰색", "종이"], printOptions: ["무지", "로고인쇄 상담"], isSmallQuantity: true, popularity: 90, createdAt: "2026-06-22", recommendedOrder: 1, alt: "소량 단상자" },
      { useCases: ["졸업작품", "굿즈", "선물세트"], materials: ["흰색", "크라프트", "종이"], printOptions: ["무지", "스티커 적용", "별도 상담"], isSmallQuantity: true, popularity: 87, createdAt: "2026-06-19", recommendedOrder: 2, alt: "샘플 패키지 세트" },
      { useCases: ["졸업작품", "행사", "선물세트"], materials: ["크라프트", "종이"], printOptions: ["스티커 적용", "별도 상담"], isSmallQuantity: true, popularity: 82, createdAt: "2026-06-15", recommendedOrder: 3, alt: "졸업작품 포장 세트" },
      { useCases: ["소형제품", "굿즈"], materials: ["스티커", "라벨"], printOptions: ["로고인쇄 상담", "스티커 적용"], isSmallQuantity: true, popularity: 78, createdAt: "2026-06-11", recommendedOrder: 4, alt: "소량 라벨 세트" },
    ],
    "logo-print": [
      { useCases: ["화장품", "굿즈", "행사"], materials: ["흰색", "종이"], printOptions: ["로고인쇄 상담"], isSmallQuantity: false, popularity: 96, createdAt: "2026-06-21", recommendedOrder: 1, alt: "쇼핑백 로고 인쇄" },
      { useCases: ["화장품", "굿즈", "소형제품"], materials: ["흰색", "종이"], printOptions: ["로고인쇄 상담"], isSmallQuantity: false, popularity: 93, createdAt: "2026-06-18", recommendedOrder: 2, alt: "단상자 로고 인쇄" },
      { useCases: ["소형제품", "졸업작품", "굿즈"], materials: ["스티커", "라벨"], printOptions: ["로고인쇄 상담", "스티커 적용"], isSmallQuantity: true, popularity: 85, createdAt: "2026-06-14", recommendedOrder: 3, alt: "스티커 로고 인쇄" },
      { useCases: ["화장품", "디저트", "소형제품"], materials: ["크라프트", "종이"], printOptions: ["로고인쇄 상담", "별도 상담"], isSmallQuantity: false, popularity: 80, createdAt: "2026-06-10", recommendedOrder: 4, alt: "슬리브 로고 인쇄" },
    ],
  };

  productFilterData.box.push(
    { useCases: ["디저트", "선물세트", "소형제품"], materials: ["크라프트", "종이"], printOptions: ["무지", "별도 상담"], isSmallQuantity: false, popularity: 84, createdAt: "2026-06-23", recommendedOrder: 5, alt: "둥근 디저트 박스" },
    { useCases: ["화장품", "굿즈", "소형제품"], materials: ["흰색", "종이"], printOptions: ["로고인쇄 상담", "별도 상담"], isSmallQuantity: false, popularity: 82, createdAt: "2026-06-22", recommendedOrder: 6, alt: "6면 접착 박스" },
    { useCases: ["굿즈", "소형제품"], materials: ["흰색", "종이"], printOptions: ["무지", "로고인쇄 상담"], isSmallQuantity: true, popularity: 79, createdAt: "2026-06-21", recommendedOrder: 7, alt: "2면 접착 박스" },
    { useCases: ["선물세트", "굿즈"], materials: ["흰색", "종이"], printOptions: ["무지", "별도 상담"], isSmallQuantity: false, popularity: 76, createdAt: "2026-06-20", recommendedOrder: 8, alt: "손수건 박스" },
    { useCases: ["화장품", "디저트", "소형제품"], materials: ["흰색", "종이"], printOptions: ["로고인쇄 상담", "별도 상담"], isSmallQuantity: false, popularity: 81, createdAt: "2026-06-19", recommendedOrder: 9, alt: "투명 슬리브 박스" },
    { useCases: ["선물세트", "행사", "굿즈"], materials: ["크라프트", "종이"], printOptions: ["무지", "스티커 적용"], isSmallQuantity: true, popularity: 74, createdAt: "2026-06-18", recommendedOrder: 10, alt: "반달 상자" },
    { useCases: ["행사", "선물세트", "배송"], materials: ["흰색", "골판지", "종이"], printOptions: ["무지", "로고인쇄 상담"], isSmallQuantity: false, popularity: 78, createdAt: "2026-06-17", recommendedOrder: 11, alt: "손잡이 박스" },
  );

  Object.assign(productFilterData, {
    "rigid-box": [
      { useCases: ["선물세트", "화장품"], materials: ["남색", "종이"], printOptions: ["로고인쇄 상담", "별도 상담"], isSmallQuantity: false, popularity: 94, createdAt: "2026-06-23", recommendedOrder: 1, alt: "상하 분리형 싸바리박스" },
      { useCases: ["화장품", "굿즈", "선물세트"], materials: ["흰색", "종이"], printOptions: ["로고인쇄 상담", "별도 상담"], isSmallQuantity: false, popularity: 92, createdAt: "2026-06-22", recommendedOrder: 2, alt: "서랍형 싸바리박스" },
      { useCases: ["선물세트", "행사"], materials: ["남색", "검정", "종이"], printOptions: ["로고인쇄 상담", "별도 상담"], isSmallQuantity: false, popularity: 90, createdAt: "2026-06-21", recommendedOrder: 3, alt: "고급 선물세트 싸바리박스" },
      { useCases: ["화장품", "소형제품"], materials: ["흰색", "종이"], printOptions: ["로고인쇄 상담", "스티커 적용"], isSmallQuantity: false, popularity: 88, createdAt: "2026-06-20", recommendedOrder: 4, alt: "화장품 브랜드 싸바리박스" },
    ],
    "business-card": [
      { useCases: ["행사", "굿즈"], materials: ["흰색", "종이"], printOptions: ["별도 상담"], isSmallQuantity: true, popularity: 84, createdAt: "2026-06-22", recommendedOrder: 1, alt: "기본 명함" },
      { useCases: ["행사", "선물세트"], materials: ["흰색", "종이"], printOptions: ["별도 상담"], isSmallQuantity: false, popularity: 82, createdAt: "2026-06-20", recommendedOrder: 2, alt: "고급지 명함" },
      { useCases: ["행사", "굿즈"], materials: ["검정", "종이"], printOptions: ["별도 상담"], isSmallQuantity: false, popularity: 79, createdAt: "2026-06-18", recommendedOrder: 3, alt: "박 명함" },
      { useCases: ["굿즈", "선물세트", "소형제품"], materials: ["흰색", "종이"], printOptions: ["별도 상담"], isSmallQuantity: true, popularity: 86, createdAt: "2026-06-21", recommendedOrder: 4, alt: "브랜드 카드" },
    ],
    "dust-bag": [
      { useCases: ["선물세트", "굿즈"], materials: ["흰색"], printOptions: ["무지", "별도 상담"], isSmallQuantity: false, popularity: 83, createdAt: "2026-06-20", recommendedOrder: 1, alt: "기본 더스트백" },
      { useCases: ["선물세트", "화장품"], materials: ["흰색", "검정"], printOptions: ["로고인쇄 상담", "별도 상담"], isSmallQuantity: false, popularity: 89, createdAt: "2026-06-22", recommendedOrder: 2, alt: "로고 인쇄 더스트백" },
      { useCases: ["굿즈", "소형제품"], materials: ["흰색"], printOptions: ["로고인쇄 상담", "별도 상담"], isSmallQuantity: false, popularity: 78, createdAt: "2026-06-17", recommendedOrder: 3, alt: "파우치형 더스트백" },
      { useCases: ["선물세트", "행사"], materials: ["남색", "검정"], printOptions: ["로고인쇄 상담", "별도 상담"], isSmallQuantity: false, popularity: 81, createdAt: "2026-06-18", recommendedOrder: 4, alt: "선물 포장용 더스트백" },
    ],
    accessories: [
      { useCases: ["배송", "선물세트"], materials: ["크라프트", "종이"], printOptions: ["무지", "별도 상담"], isSmallQuantity: false, popularity: 80, createdAt: "2026-06-19", recommendedOrder: 1, alt: "완충재" },
      { useCases: ["선물세트", "행사"], materials: ["남색", "흰색"], printOptions: ["별도 상담"], isSmallQuantity: false, popularity: 75, createdAt: "2026-06-15", recommendedOrder: 2, alt: "리본" },
      { useCases: ["화장품", "디저트", "소형제품"], materials: ["스티커", "라벨"], printOptions: ["스티커 적용", "로고인쇄 상담"], isSmallQuantity: true, popularity: 91, createdAt: "2026-06-23", recommendedOrder: 3, alt: "스티커 라벨 부자재" },
      { useCases: ["선물세트", "배송"], materials: ["크라프트", "종이"], printOptions: ["무지", "별도 상담"], isSmallQuantity: false, popularity: 73, createdAt: "2026-06-14", recommendedOrder: 4, alt: "종이 충전재" },
      { useCases: ["굿즈", "행사", "소형제품"], materials: ["스티커", "라벨"], printOptions: ["스티커 적용", "로고인쇄 상담"], isSmallQuantity: true, popularity: 87, createdAt: "2026-06-21", recommendedOrder: 5, alt: "봉인 스티커" },
    ],
    "cafe-supplies": [
      { useCases: ["디저트", "소형제품"], materials: ["크라프트", "종이"], printOptions: ["무지", "스티커 적용"], isSmallQuantity: true, popularity: 90, createdAt: "2026-06-23", recommendedOrder: 1, alt: "디저트 포장박스" },
      { useCases: ["디저트", "행사"], materials: ["흰색", "종이"], printOptions: ["로고인쇄 상담", "스티커 적용"], isSmallQuantity: true, popularity: 86, createdAt: "2026-06-20", recommendedOrder: 2, alt: "테이크아웃 쇼핑백" },
      { useCases: ["디저트", "소형제품"], materials: ["크라프트", "종이"], printOptions: ["무지", "스티커 적용"], isSmallQuantity: true, popularity: 84, createdAt: "2026-06-18", recommendedOrder: 3, alt: "쿠키 봉투" },
      { useCases: ["디저트", "행사", "소형제품"], materials: ["스티커", "라벨"], printOptions: ["스티커 적용", "로고인쇄 상담"], isSmallQuantity: true, popularity: 88, createdAt: "2026-06-22", recommendedOrder: 4, alt: "카페 스티커" },
      { useCases: ["디저트", "행사"], materials: ["크라프트", "골판지"], printOptions: ["무지", "별도 상담"], isSmallQuantity: false, popularity: 77, createdAt: "2026-06-16", recommendedOrder: 5, alt: "음료 캐리어" },
    ],
    "design-request": [
      { useCases: ["화장품", "굿즈", "선물세트"], materials: ["종이"], printOptions: ["별도 상담"], isSmallQuantity: false, popularity: 93, createdAt: "2026-06-23", recommendedOrder: 1, alt: "패키지 도면 설계" },
      { useCases: ["화장품", "디저트", "굿즈"], materials: ["종이"], printOptions: ["로고인쇄 상담", "별도 상담"], isSmallQuantity: false, popularity: 92, createdAt: "2026-06-22", recommendedOrder: 2, alt: "패키지 그래픽 디자인" },
      { useCases: ["행사", "굿즈"], materials: ["종이"], printOptions: ["별도 상담"], isSmallQuantity: false, popularity: 84, createdAt: "2026-06-19", recommendedOrder: 3, alt: "BI/CI 디자인 상담" },
      { useCases: ["선물세트", "행사"], materials: ["종이"], printOptions: ["별도 상담"], isSmallQuantity: true, popularity: 76, createdAt: "2026-06-16", recommendedOrder: 4, alt: "슬로건 디자인 상담" },
      { useCases: ["굿즈", "졸업작품", "행사"], materials: ["종이"], printOptions: ["별도 상담"], isSmallQuantity: true, popularity: 82, createdAt: "2026-06-18", recommendedOrder: 5, alt: "굿즈 디자인 상담" },
    ],
  });

  function applyProductFilterData() {
    Object.entries(categoryPageData).forEach(([categoryKey, category]) => {
      const filterRows = productFilterData[categoryKey] || [];
      const cafe24Mapping = cafe24CategoryMappings[categoryKey] || { cafe24CategoryUrl: "", cafe24Status: "pending", cafe24Memo: "" };
      const cafe24SubCategories = cafe24SubCategoryMappings[categoryKey] || [];
      category.cafe24CategoryUrl = category.cafe24CategoryUrl || cafe24Mapping.cafe24CategoryUrl;
      category.cafe24Status = category.cafe24Status || cafe24Mapping.cafe24Status;
      category.cafe24Memo = category.cafe24Memo || cafe24Mapping.cafe24Memo;
      category.cafe24SubCategories = category.cafe24SubCategories || cafe24SubCategories;
      category.products.forEach((product, index) => {
        const fallbackOrder = index + 1;
        const detailRoute = getProductDetailRoute(categoryKey, index);
        Object.assign(product, {
          useCases: [],
          materials: [],
          printOptions: ["별도 상담"],
          isSmallQuantity: false,
          popularity: 0,
          createdAt: "",
          recommendedOrder: fallbackOrder,
          cafe24ProductUrl: "",
          cafe24CategoryUrl: category.cafe24CategoryUrl || "",
          cafe24Status: "pending",
          cafe24Memo: "Cafe24 고객용 상품 URL 연결 대기",
        }, filterRows[index] || {});
        if (detailRoute) {
          product.category = detailRoute.category;
          product.product = detailRoute.product;
          product.href = productHref(detailRoute.category, detailRoute.product);
          product.actionLabel = "자세히 보기";
        }
        product.cafe24ProductUrl = product.cafe24ProductUrl || "";
        product.cafe24CategoryUrl = product.cafe24CategoryUrl || category.cafe24CategoryUrl || "";
        product.cafe24Status = product.cafe24Status || "pending";
        product.cafe24Memo = product.cafe24Memo || `${category.title} 상품 연결 대기`;
      });
    });
  }

  applyProductFilterData();

  window.categoryPageData = categoryPageData;

  let requestedCategory = "";
  let searchTerm = "";
  let hasRequestedCategory = false;
  let isGlobalSearch = false;
  let activeCategory = "box";
  let activeData = categoryPageData.box;

  function buildGlobalSearchData(keyword) {
    return {
      title: "전체 상품 검색",
      description: `"${keyword}" 검색어와 관련된 패키지 상품을 확인해보세요.`,
      notice: "검색 결과도 옵션, 수량, 인쇄 여부에 따라 상담 후 안내됩니다.",
      heroImage: images.ready,
      heroAlt: "페르패키지 전체 상품 검색 대표 이미지",
      tags: ["전체 상품", "검색 결과", "상담 가능"],
      products: Object.values(categoryPageData).flatMap((category) => (
        category.products.map((product) => ({
          ...product,
          categoryTitle: category.title,
          categoryDescription: category.description,
        }))
      )),
    };
  }

  const header = document.querySelector("[data-category-header]");
  const mobileSearchToggle = document.querySelector("[data-category-mobile-search-toggle]");
  const mobileSearch = document.querySelector("[data-category-mobile-search]");
  const titleNode = document.querySelector("[data-category-title]");
  const descriptionNode = document.querySelector("[data-category-description]");
  const noticeNode = document.querySelector("[data-category-notice]");
  const heroImageHolder = document.querySelector("[data-category-hero-image-holder]");
  const heroImage = document.querySelector("[data-category-hero-image]");
  const heroSliderMount = document.querySelector("[data-category-hero-slider]");
  const metaDescription = document.querySelector('meta[name="description"]');
  const tabsMount = document.querySelector("[data-category-tabs]");
  const tagsMount = document.querySelector("[data-category-tags]");
  const productSectionsMount = document.querySelector("[data-category-product-sections]");
  const featureCardsMount = document.querySelector("[data-category-feature-cards]");
  const linkCardsMount = document.querySelector("[data-category-link-cards]");
  const filterJump = document.querySelector("[data-category-filter-jump]");
  const productsMount = document.querySelector("[data-category-products]");
  const countNode = document.querySelector("[data-category-count]");
  const toolbar = document.querySelector(".pp-category-toolbar");
  const toolbarControls = document.querySelector(".pp-category-toolbar__controls");
  const searchForms = document.querySelectorAll(".pp-shop-search");
  let filterPanel = document.querySelector("[data-category-filter-panel]");
  let emptyState = document.querySelector("[data-category-empty]");
  let searchStatus = document.querySelector("[data-category-search-status]");

  const filterGroups = [
    {
      key: "useCase",
      label: "용도",
      options: ["전체", "화장품", "디저트", "굿즈", "배송", "선물세트", "행사", "졸업작품", "소형제품"],
    },
    {
      key: "material",
      label: "색상/재질",
      options: ["전체", "흰색", "크라프트", "남색", "검정", "종이", "골판지", "스티커", "라벨"],
    },
    {
      key: "print",
      label: "인쇄 가능 여부",
      options: ["전체", "무지", "로고인쇄 상담", "스티커 적용", "별도 상담"],
    },
    {
      key: "smallQuantity",
      label: "소량 가능 여부",
      options: [
        { label: "전체", value: "전체" },
        { label: "소량 가능", value: "available" },
        { label: "소량 상담 필요", value: "consult" },
      ],
    },
  ];

  const filterState = {
    useCase: "전체",
    material: "전체",
    print: "전체",
    smallQuantity: "전체",
    sort: "recommended",
  };
  let categorySliderIndex = 0;

  function normalizeQueryToken(value) {
    return String(value || "").trim().replace(/\s+/g, "");
  }

  function getFilterGroup(key) {
    return filterGroups.find((group) => group.key === key);
  }

  function getFilterOptionValues(key) {
    const group = getFilterGroup(key);
    if (!group) return [];
    return group.options.map((option) => getFilterOptionValue(option));
  }

  function normalizeFilterQueryValue(key, value) {
    const queryValue = String(value || "").trim();
    if (!queryValue) return "전체";
    if (key === "smallQuantity") {
      if (queryValue === "true") return "available";
      if (queryValue === "false") return "consult";
      return ["available", "consult"].includes(queryValue) ? queryValue : "전체";
    }

    const options = getFilterOptionValues(key);
    return options.find((option) => option === queryValue)
      || options.find((option) => normalizeQueryToken(option) === normalizeQueryToken(queryValue))
      || "전체";
  }

  function normalizeSortQueryValue(value) {
    if (value === "popular") return "popular";
    if (value === "recent" || value === "latest") return "latest";
    return "recommended";
  }

  function getSortQueryValue() {
    if (filterState.sort === "popular") return "popular";
    if (filterState.sort === "latest") return "recent";
    return "";
  }

  function getSmallQuantityQueryValue() {
    if (filterState.smallQuantity === "available") return "true";
    if (filterState.smallQuantity === "consult") return "false";
    return "";
  }

  function syncStateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    requestedCategory = params.get("category") || "";
    searchTerm = (params.get("search") || "").trim();
    hasRequestedCategory = Object.prototype.hasOwnProperty.call(categoryPageData, requestedCategory);
    isGlobalSearch = Boolean(searchTerm && !requestedCategory);
    activeCategory = hasRequestedCategory ? requestedCategory : "box";
    activeData = isGlobalSearch ? buildGlobalSearchData(searchTerm) : categoryPageData[activeCategory];

    filterState.useCase = normalizeFilterQueryValue("useCase", params.get("useCase"));
    filterState.material = normalizeFilterQueryValue("material", params.get("material"));
    filterState.print = normalizeFilterQueryValue("print", params.get("print"));
    filterState.smallQuantity = normalizeFilterQueryValue("smallQuantity", params.get("small"));
    filterState.sort = normalizeSortQueryValue(params.get("sort"));
  }

  function buildStateHref(options = {}) {
    const params = new URLSearchParams();
    const omitSearch = Boolean(options.omitSearch);
    const omitFilters = Boolean(options.omitFilters);

    if (!isGlobalSearch) {
      params.set("category", activeCategory);
    }

    if (!omitSearch && searchTerm) {
      params.set("search", searchTerm);
    }

    if (!omitFilters) {
      if (filterState.useCase !== "전체") params.set("useCase", filterState.useCase);
      if (filterState.material !== "전체") params.set("material", filterState.material);
      if (filterState.print !== "전체") params.set("print", normalizeQueryToken(filterState.print));

      const smallQueryValue = getSmallQuantityQueryValue();
      if (smallQueryValue) params.set("small", smallQueryValue);

      const sortQueryValue = getSortQueryValue();
      if (sortQueryValue) params.set("sort", sortQueryValue);
    }

    const query = params.toString();
    return `category.html${query ? `?${query}` : ""}`;
  }

  function syncSortControl() {
    const sortSelect = toolbarControls ? toolbarControls.querySelector("[data-category-sort]") : null;
    if (sortSelect) sortSelect.value = filterState.sort;
  }

  function syncSearchInputs() {
    searchForms.forEach((form) => {
      const input = form.querySelector('input[type="search"]');
      if (input) input.value = searchTerm;
    });
  }

  function renderPageState() {
    renderHero();
    renderTabs();
    renderTags();
    renderHeroSlider();
    renderProductSections();
    renderFeatureCards();
    renderLinkCards();
    renderFilterControls();
    syncFilterPanelVisibility();
    syncSortControl();
    syncSearchInputs();
    renderProducts();
  }

  function commitStateToUrl(options = {}) {
    const nextUrl = buildStateHref(options);
    const currentUrl = `${window.location.pathname.split("/").pop()}${window.location.search}`;
    if (nextUrl !== currentUrl) {
      window.history.pushState({ perpackageCategoryState: true }, "", nextUrl);
    }
    syncStateFromUrl();
    renderPageState();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderTabs() {
    if (!tabsMount) return;
    tabsMount.innerHTML = categoryOrder.map((item) => {
      const isActive = !isGlobalSearch && item.key === activeCategory;
      return `<a href="category.html?category=${item.key}" class="${isActive ? "is-active" : ""}" ${isActive ? "aria-current=\"page\"" : ""}>${escapeHtml(item.label)}</a>`;
    }).join("");
  }

  function renderTags() {
    if (!tagsMount) return;
    tagsMount.innerHTML = activeData.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  }

  function renderHeroSlider() {
    if (!heroSliderMount) return;
    const banners = !isGlobalSearch ? (categoryHeroBanners[activeCategory] || []) : [];
    heroSliderMount.hidden = banners.length === 0;
    if (!banners.length) {
      heroSliderMount.innerHTML = "";
      return;
    }

    categorySliderIndex = 0;
    const cards = banners.map((banner, index) => {
      const href = withReturnUrl(banner.href);
      return `
        <a class="pp-category-hero-slide" href="${escapeHtml(href)}" data-category-slide="${index}" aria-label="${escapeHtml(`${banner.title} 상세 보기`)}">
          <span class="pp-category-hero-slide__copy">
            <span class="pp-category-hero-slide__eyebrow">CATEGORY VISUAL</span>
            <strong>${escapeHtml(banner.title)}</strong>
            <span>${escapeHtml(banner.description)}</span>
          </span>
          <span class="pp-category-hero-slide__image" data-image-holder data-fallback-label="${escapeHtml(banner.title)} 이미지 준비중">
            <img src="${escapeHtml(banner.image)}" alt="${escapeHtml(banner.alt)}" decoding="async">
          </span>
        </a>
      `;
    }).join("");
    const dots = banners.map((banner, index) => `
      <button type="button" class="${index === 0 ? "is-active" : ""}" data-category-slider-dot="${index}" aria-label="${escapeHtml(`${banner.title} 배너 보기`)}"></button>
    `).join("");

    heroSliderMount.innerHTML = `
      <div class="pp-category-hero-slider__header">
        <div>
          <p>CATEGORY PICK</p>
          <h2>${escapeHtml(activeData.title)}를 더 쉽게 비교해보세요</h2>
        </div>
        <div class="pp-category-hero-slider__controls" aria-label="배너 이동">
          <button type="button" data-category-slider-prev aria-label="이전 배너"></button>
          <button type="button" data-category-slider-next aria-label="다음 배너"></button>
        </div>
      </div>
      <div class="pp-category-hero-slider__viewport">
        <div class="pp-category-hero-slider__track" data-category-slider-track>${cards}</div>
      </div>
      <div class="pp-category-hero-slider__dots">${dots}</div>
    `;
    bindImageFallbacks(heroSliderMount);
    setHeroSlide(0);
  }

  function setHeroSlide(nextIndex) {
    if (!heroSliderMount) return;
    const track = heroSliderMount.querySelector("[data-category-slider-track]");
    const slides = Array.from(heroSliderMount.querySelectorAll("[data-category-slide]"));
    const dots = Array.from(heroSliderMount.querySelectorAll("[data-category-slider-dot]"));
    if (!track || !slides.length) return;
    categorySliderIndex = (nextIndex + slides.length) % slides.length;
    const target = slides[categorySliderIndex];
    if (target) {
      track.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    }
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === categorySliderIndex);
      dot.setAttribute("aria-pressed", String(index === categorySliderIndex));
    });
  }

  function getCategoryProductByIndex(index) {
    return activeData.products[index];
  }

  function renderProductTile(product, size = "normal") {
    if (!product) return "";
    const href = withReturnUrl(product.href);
    const tags = (product.tags || []).slice(0, 2).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    const imageAlt = product.alt || `${product.title} 이미지`;
    return `
      <a class="pp-category-portal-card ${size === "large" ? "pp-category-portal-card--large" : ""}" href="${escapeHtml(href)}" aria-label="${escapeHtml(`${product.title} 상세 보기`)}">
        <span class="pp-category-portal-card__image" data-image-holder data-fallback-label="${escapeHtml(product.title)} 이미지 준비중">
          ${product.image ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(imageAlt)}" decoding="async">` : ""}
        </span>
        <span class="pp-category-portal-card__body">
          <span class="pp-category-portal-card__tags">${tags}</span>
          <strong>${escapeHtml(product.title)}</strong>
          <span>${escapeHtml(product.description)}</span>
        </span>
      </a>
    `;
  }

  function renderProductSections() {
    if (!productSectionsMount) return;
    const sections = !isGlobalSearch ? (categoryProductSections[activeCategory] || []) : [];
    productSectionsMount.hidden = sections.length === 0;
    if (!sections.length) {
      productSectionsMount.innerHTML = "";
      return;
    }

    productSectionsMount.innerHTML = sections.map((section, sectionIndex) => {
      const cards = section.indexes
        .map((index, cardIndex) => renderProductTile(getCategoryProductByIndex(index), sectionIndex === 0 && cardIndex === 0 ? "large" : "normal"))
        .join("");
      return `
        <section class="pp-category-product-bundle" aria-label="${escapeHtml(section.title)}">
          <div class="pp-category-section-heading">
            <p>상품 묶음</p>
            <h2>${escapeHtml(section.title)}</h2>
            <span>${escapeHtml(section.description)}</span>
          </div>
          <div class="pp-category-portal-grid">${cards}</div>
        </section>
      `;
    }).join("");
    bindImageFallbacks(productSectionsMount);
  }

  function renderFeatureCards() {
    if (!featureCardsMount) return;
    const cards = !isGlobalSearch ? (categoryFeatureCards[activeCategory] || []) : [];
    featureCardsMount.hidden = cards.length === 0;
    if (!cards.length) {
      featureCardsMount.innerHTML = "";
      return;
    }

    featureCardsMount.innerHTML = `
      <div class="pp-category-section-heading">
        <p>카테고리 안내</p>
        <h2>이런 경우에 많이 사용해요</h2>
        <span>상품을 고르기 전에 확인하면 상담이 쉬워지는 기준입니다.</span>
      </div>
      <div class="pp-category-feature-grid">
        ${cards.map((card) => `
          <article class="pp-category-feature-card">
            <span>${escapeHtml(card.label)}</span>
            <strong>${escapeHtml(card.title)}</strong>
            <p>${escapeHtml(card.description)}</p>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderLinkCards() {
    if (!linkCardsMount) return;
    linkCardsMount.hidden = isGlobalSearch;
    if (isGlobalSearch) {
      linkCardsMount.innerHTML = "";
      return;
    }

    linkCardsMount.innerHTML = `
      <div class="pp-category-section-heading">
        <p>다음 단계</p>
        <h2>제작 전 함께 확인해보세요</h2>
        <span>아직 별도 페이지가 없는 항목은 기존 안내 섹션으로 임시 연결했습니다.</span>
      </div>
      <div class="pp-category-link-grid">
        ${categoryLinkCards.map((card) => `
          <a class="pp-category-link-card" href="${escapeHtml(card.href)}" aria-label="${escapeHtml(card.title)} 이동">
            <span>${escapeHtml(card.badge)}</span>
            <strong>${escapeHtml(card.title)}</strong>
            <p>${escapeHtml(card.description)}</p>
          </a>
        `).join("")}
      </div>
    `;
  }

  function hasActiveFilterCondition() {
    return Boolean(searchTerm)
      || filterState.useCase !== "전체"
      || filterState.material !== "전체"
      || filterState.print !== "전체"
      || filterState.smallQuantity !== "전체";
  }

  function syncFilterPanelVisibility() {
    if (!filterPanel) return;
    const shouldShow = hasActiveFilterCondition() || filterPanel.classList.contains("is-open");
    filterPanel.hidden = !shouldShow;
    if (filterJump) {
      filterJump.setAttribute("aria-expanded", String(shouldShow));
      filterJump.textContent = shouldShow ? "상세 필터 접기" : "상세 필터 보기";
    }
  }

  function createFilterScaffold() {
    if (toolbarControls) {
      toolbarControls.innerHTML = `
        <label class="pp-category-sort">
          <span>정렬</span>
          <select aria-label="상품 정렬 선택" data-category-sort>
            <option value="recommended">추천순</option>
            <option value="popular">인기순</option>
            <option value="latest">최근 등록순</option>
          </select>
        </label>
        <button class="pp-category-reset" type="button" aria-label="필터 초기화" data-category-reset>필터 초기화</button>
      `;
    }

    if (!filterPanel && toolbar && toolbar.parentNode) {
      filterPanel = document.createElement("div");
      filterPanel.className = "pp-category-filter-panel";
      filterPanel.setAttribute("data-category-filter-panel", "");
      toolbar.insertAdjacentElement("afterend", filterPanel);
    }

    if (!searchStatus && filterPanel && filterPanel.parentNode) {
      searchStatus = document.createElement("div");
      searchStatus.className = "pp-category-search-status";
      searchStatus.setAttribute("data-category-search-status", "");
      searchStatus.setAttribute("hidden", "");
      filterPanel.insertAdjacentElement("beforebegin", searchStatus);
    }

    if (!emptyState && productsMount && productsMount.parentNode) {
      emptyState = document.createElement("div");
      emptyState.className = "pp-category-empty";
      emptyState.setAttribute("data-category-empty", "");
      emptyState.setAttribute("hidden", "");
      emptyState.innerHTML = `
        <strong>선택한 조건에 맞는 상품이 없습니다.</strong>
        <p>조건을 줄이거나 상담으로 필요한 패키지를 문의해보세요.</p>
        <a href="index.html#quote" aria-label="견적문의 상담 섹션으로 이동">상담하기</a>
      `;
      productsMount.insertAdjacentElement("afterend", emptyState);
    }
  }

  function getFilterOptionValue(option) {
    return typeof option === "string" ? option : option.value;
  }

  function getFilterOptionLabel(option) {
    return typeof option === "string" ? option : option.label;
  }

  function renderFilterControls() {
    if (!filterPanel) return;
    filterPanel.innerHTML = filterGroups.map((group) => {
      const buttons = group.options.map((option) => {
        const value = getFilterOptionValue(option);
        const label = getFilterOptionLabel(option);
        const isActive = filterState[group.key] === value;
        return `<button type="button" class="${isActive ? "is-active" : ""}" data-filter-key="${escapeHtml(group.key)}" data-filter-value="${escapeHtml(value)}" aria-pressed="${String(isActive)}">${escapeHtml(label)}</button>`;
      }).join("");

      return `
        <section class="pp-category-filter-group" aria-label="${escapeHtml(group.label)} 필터">
          <h2>${escapeHtml(group.label)}</h2>
          <div class="pp-category-filter-options">${buttons}</div>
        </section>
      `;
    }).join("");
  }

  function resetFilters() {
    commitStateToUrl({ omitSearch: true, omitFilters: true });
  }

  function normalizeSearchValue(value) {
    return String(value || "").trim().toLocaleLowerCase("ko-KR");
  }

  function flattenSearchValues(values) {
    return values
      .flatMap((value) => Array.isArray(value) ? value : [value])
      .filter(Boolean)
      .join(" ");
  }

  function productMatchesSearch(product) {
    if (!searchTerm) return true;
    const keyword = normalizeSearchValue(searchTerm);
    const categoryTitle = product.categoryTitle || (!isGlobalSearch ? activeData.title : "");
    const categoryDescription = product.categoryDescription || (!isGlobalSearch ? activeData.description : "");
    const haystack = normalizeSearchValue(flattenSearchValues([
      product.title,
      product.description,
      product.tags,
      product.options,
      product.useCases,
      product.materials,
      product.printOptions,
      categoryTitle,
      categoryDescription,
    ]));
    return haystack.includes(keyword);
  }

  function getSearchClearHref() {
    return buildStateHref({ omitSearch: true });
  }

  function getSmallQuantityLabel() {
    const group = getFilterGroup("smallQuantity");
    if (!group) return "";
    const activeOption = group.options.find((option) => getFilterOptionValue(option) === filterState.smallQuantity);
    return activeOption ? getFilterOptionLabel(activeOption) : "";
  }

  function getActiveConditionSummary() {
    const summary = [];
    if (searchTerm) summary.push(`검색어 "${searchTerm}"`);
    if (filterState.useCase !== "전체") summary.push(`용도: ${filterState.useCase}`);
    if (filterState.material !== "전체") summary.push(`재질: ${filterState.material}`);
    if (filterState.print !== "전체") summary.push(`인쇄: ${filterState.print}`);
    if (filterState.smallQuantity !== "전체") summary.push(`소량: ${getSmallQuantityLabel()}`);
    if (filterState.sort === "popular") summary.push("정렬: 인기순");
    if (filterState.sort === "latest") summary.push("정렬: 최근 등록순");
    return summary;
  }

  function renderSearchStatus(resultCount) {
    if (!searchStatus) return;
    const summary = getActiveConditionSummary();
    if (!summary.length) {
      searchStatus.hidden = true;
      searchStatus.innerHTML = "";
      return;
    }

    searchStatus.hidden = false;
    const heading = searchTerm ? `"${escapeHtml(searchTerm)}" 검색 결과` : "선택한 조건 결과";
    const searchClearLink = searchTerm ? `<a href="${escapeHtml(getSearchClearHref())}" data-category-search-clear aria-label="검색어 초기화">검색어 초기화</a>` : "";
    searchStatus.innerHTML = `
      <div>
        <strong>${heading}</strong>
        <span>${escapeHtml(summary.join(" · "))} · 총 ${resultCount}개의 상품을 찾았습니다.</span>
      </div>
      <div class="pp-category-search-status__actions">
        ${searchClearLink}
        <a href="${escapeHtml(buildStateHref({ omitSearch: true, omitFilters: true }))}" data-category-reset-all aria-label="전체 필터 초기화">전체 필터 초기화</a>
      </div>
    `;
  }

  function updateEmptyState(resultCount) {
    if (!emptyState) return;
    emptyState.hidden = resultCount > 0;
    if (resultCount > 0) return;

    const title = searchTerm ? "검색어에 맞는 상품이 없습니다." : "선택한 조건에 맞는 상품이 없습니다.";
    const description = searchTerm ? "검색어를 바꾸거나 상담으로 필요한 패키지를 문의해보세요." : "조건을 줄이거나 상담으로 필요한 패키지를 문의해보세요.";
    emptyState.innerHTML = `
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(description)}</p>
      <a href="index.html#quote" aria-label="견적문의 상담 섹션으로 이동">상담하기</a>
    `;
  }

  function productMatchesFilters(product) {
    if (!productMatchesSearch(product)) return false;
    if (filterState.useCase !== "전체" && !product.useCases.includes(filterState.useCase)) return false;
    if (filterState.material !== "전체" && !product.materials.includes(filterState.material)) return false;
    if (filterState.print !== "전체" && !product.printOptions.includes(filterState.print)) return false;
    if (filterState.smallQuantity === "available" && product.isSmallQuantity !== true) return false;
    if (filterState.smallQuantity === "consult" && product.isSmallQuantity === true) return false;
    return true;
  }

  function getSortValue(product, sortKey) {
    if (sortKey === "popular") return Number(product.popularity || 0);
    if (sortKey === "latest") {
      const time = Date.parse(product.createdAt || "");
      return Number.isNaN(time) ? 0 : time;
    }
    return Number(product.recommendedOrder || Number.MAX_SAFE_INTEGER);
  }

  function getVisibleProducts() {
    return activeData.products
      .filter(productMatchesFilters)
      .slice()
      .sort((a, b) => {
        if (filterState.sort === "popular" || filterState.sort === "latest") {
          return getSortValue(b, filterState.sort) - getSortValue(a, filterState.sort);
        }
        return getSortValue(a, filterState.sort) - getSortValue(b, filterState.sort);
      });
  }

  function bindFilters() {
    if (filterPanel) {
      filterPanel.addEventListener("click", (event) => {
        const button = event.target.closest("[data-filter-key]");
        if (!button) return;
        const key = button.getAttribute("data-filter-key");
        const value = button.getAttribute("data-filter-value");
        if (!Object.prototype.hasOwnProperty.call(filterState, key)) return;
        filterState[key] = value;
        commitStateToUrl();
      });
    }

    if (toolbarControls) {
      toolbarControls.addEventListener("change", (event) => {
        const select = event.target.closest("[data-category-sort]");
        if (!select) return;
        filterState.sort = select.value;
        commitStateToUrl();
      });

      toolbarControls.addEventListener("click", (event) => {
        const resetButton = event.target.closest("[data-category-reset]");
        if (!resetButton) return;
        resetFilters();
      });
    }

    if (searchStatus) {
      searchStatus.addEventListener("click", (event) => {
        const searchClear = event.target.closest("[data-category-search-clear]");
        if (searchClear) {
          event.preventDefault();
          commitStateToUrl({ omitSearch: true });
          return;
        }

        const resetAll = event.target.closest("[data-category-reset-all]");
        if (resetAll) {
          event.preventDefault();
          resetFilters();
        }
      });
    }
  }

  function bindPortalInteractions() {
    if (heroSliderMount) {
      heroSliderMount.addEventListener("click", (event) => {
        const prevButton = event.target.closest("[data-category-slider-prev]");
        const nextButton = event.target.closest("[data-category-slider-next]");
        const dotButton = event.target.closest("[data-category-slider-dot]");

        if (prevButton) {
          setHeroSlide(categorySliderIndex - 1);
          return;
        }

        if (nextButton) {
          setHeroSlide(categorySliderIndex + 1);
          return;
        }

        if (dotButton) {
          const nextIndex = Number(dotButton.getAttribute("data-category-slider-dot") || 0);
          setHeroSlide(nextIndex);
        }
      });
    }

    if (filterJump && filterPanel) {
      filterJump.addEventListener("click", () => {
        const nextOpen = filterPanel.hidden;
        filterPanel.classList.toggle("is-open", nextOpen);
        syncFilterPanelVisibility();
        if (nextOpen && toolbar) {
          toolbar.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  }

  function bindImageFallbacks(root) {
    root.querySelectorAll("img").forEach((image) => {
      image.addEventListener("error", () => {
        const holder = image.closest("[data-image-holder], [data-category-hero-image-holder]");
        if (holder) holder.classList.add("is-missing");
        image.remove();
      });
    });
  }

  function getCurrentCategoryReturnUrl() {
    const pageName = window.location.pathname.split("/").pop() || "category.html";
    return `${pageName}${window.location.search || ""}`;
  }

  function withReturnUrl(href) {
    if (!href || !href.startsWith("product.html")) return href;
    const url = new URL(href, window.location.href);
    url.searchParams.set("returnUrl", getCurrentCategoryReturnUrl());
    return `${url.pathname.split("/").pop()}?${url.searchParams.toString()}`;
  }

  function renderProductCard(product) {
    const tags = product.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    const options = product.options.map((option) => `<li>${escapeHtml(option)}</li>`).join("");
    const image = product.image || "";
    const href = withReturnUrl(product.href);
    const isDetailLink = product.href && product.href.startsWith("product.html");
    const actionAriaLabel = `${product.title} ${isDetailLink ? "상세 보기" : "상담하기"}`;
    const imageAlt = product.alt || `${product.title} 이미지`;
    return `
      <article class="pp-category-product-card">
        <div class="pp-category-product-card__image" data-image-holder data-fallback-label="${escapeHtml(product.title)} 이미지 준비중">
          ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(imageAlt)}" decoding="async">` : ""}
        </div>
        <div class="pp-category-product-card__body">
          <div class="pp-category-product-card__tags">${tags}</div>
          <h2>${escapeHtml(product.title)}</h2>
          <p>${escapeHtml(product.description)}</p>
          <ul aria-label="${escapeHtml(product.title)} 확인 옵션">${options}</ul>
          <a href="${escapeHtml(href)}" aria-label="${escapeHtml(actionAriaLabel)}">${escapeHtml(product.actionLabel)}</a>
        </div>
      </article>
    `;
  }

  function renderProducts() {
    if (!productsMount) return;
    const visibleProducts = getVisibleProducts();
    productsMount.innerHTML = visibleProducts.map(renderProductCard).join("");
    bindImageFallbacks(productsMount);
    if (countNode) countNode.textContent = `상품 ${visibleProducts.length}개`;
    renderSearchStatus(visibleProducts.length);
    updateEmptyState(visibleProducts.length);
  }

  function renderHero() {
    if (titleNode) titleNode.textContent = activeData.title;
    if (descriptionNode) descriptionNode.textContent = activeData.description;
    if (noticeNode) noticeNode.textContent = activeData.notice;
    if (heroImage) {
      heroImage.src = activeData.heroImage;
      heroImage.alt = activeData.heroAlt || `${activeData.title} 대표 이미지`;
    }
    if (heroImageHolder) {
      heroImageHolder.dataset.fallbackLabel = `${activeData.title} 이미지 준비중`;
      bindImageFallbacks(heroImageHolder);
    }
    document.title = isGlobalSearch ? `"${searchTerm}" 검색 결과 | 페르패키지` : `${activeData.title} | 페르패키지`;
    if (metaDescription) {
      const description = isGlobalSearch
        ? `"${searchTerm}" 검색어와 관련된 페르패키지 상품을 확인하고 수량, 인쇄, 재질 조건에 맞춰 상담으로 이어갈 수 있습니다.`
        : `${activeData.title} 상품을 확인하고 수량, 사이즈, 인쇄 여부에 따라 페르패키지 상담으로 이어갈 수 있습니다.`;
      metaDescription.setAttribute("content", description);
    }
  }

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 6);
  }

  function bindMobileSearch() {
    if (!mobileSearchToggle || !mobileSearch) return;
    mobileSearchToggle.addEventListener("click", () => {
      const expanded = mobileSearchToggle.getAttribute("aria-expanded") === "true";
      mobileSearchToggle.setAttribute("aria-expanded", String(!expanded));
      mobileSearch.classList.toggle("is-open", !expanded);
    });
  }

  function bindSearchForms() {
    searchForms.forEach((form) => {
      const input = form.querySelector('input[type="search"]');
      const submitButton = form.querySelector('button[type="submit"]');
      if (input) {
        input.setAttribute("aria-label", input.getAttribute("aria-label") || "패키지 검색어");
      }
      if (submitButton) {
        submitButton.setAttribute("aria-label", "상품 검색");
      }

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!input) return;
        const nextSearchTerm = input.value.trim();
        if (!nextSearchTerm) return;

        searchTerm = nextSearchTerm;
        commitStateToUrl();
      });
    });
  }

  createFilterScaffold();
  syncStateFromUrl();
  renderPageState();
  bindFilters();
  bindPortalInteractions();
  bindSearchForms();
  bindMobileSearch();
  setHeaderState();

  window.addEventListener("scroll", setHeaderState, { passive: true });
  window.addEventListener("popstate", () => {
    syncStateFromUrl();
    renderPageState();
  });
}());

