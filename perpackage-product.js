(function () {
  const quoteHref = "index.html#quote";
  const categoryLabels = {
    box: "패키지",
    "delivery-box": "택배박스",
    "shopping-bag": "쇼핑백",
    "envelope-sleeve": "봉투·슬리브",
    "sticker-label": "스티커·라벨",
    "gift-box": "선물상자",
    "small-sample": "샘플·소량",
    "logo-print": "로고인쇄",
    "rigid-box": "싸바리박스",
    "business-card": "명함",
    "dust-bag": "더스트백",
    accessories: "부자재",
    "cafe-supplies": "카페용품",
    "design-request": "디자인의뢰",
  };

  // Cafe24 고객용 상품/분류 URL 연결 준비 필드입니다. 실제 URL 확정 전까지는 빈 값으로 유지합니다.
  const cafe24CategoryMappings = Object.freeze({
    box: { cafe24CategoryUrl: "", cafe24Status: "pending", cafe24Memo: "Cafe24 패키지 카테고리 연결 대기" },
    "rigid-box": { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=64", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 하위 분류는 상하 2단 싸바리, 자석형 표지바리, 서랍형 싸바리. 현재 상품 수 0개로 확인되어 상품 등록 여부 확인 필요." },
    "shopping-bag": { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=45", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 쇼핑백 계열. 현재 상품 수는 4개로 확인됨. 노출 상품 예시는 쇼핑백 손잡이형, 쇼핑백 매립형, 쇼핑백 타공형, 쇼핑백 디자인·주문제작." },
    "business-card": { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=43", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 하위 분류는 레터프레스명함, 일반명함, 고급명함, 엣지박 명함. 현재 상품 수 3개로 확인됨." },
    "envelope-sleeve": { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=42", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 하위 분류는 소봉투&대봉투, 자켓봉투, 규격봉투, 교회봉투, 단추봉투, 종이홀더, 청첩장봉투. 현재 상품 수 8개로 확인됨." },
    "dust-bag": { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=46", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 하위 분류는 조리개, 덮개형, 에코백, 슈트케이스. 현재 상품 수 0개로 확인되어 상품 등록 여부 확인 필요." },
    accessories: { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=54", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 현재 상품 수 0개로 확인되어 상품 등록 여부 확인 필요." },
    "cafe-supplies": { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=87", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 하위 분류는 컵홀더, 컵캐리어, 디저트박스, 비닐쇼핑백. 현재 상품 수 2개로 확인됨." },
    "design-request": { cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=95", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 하위 분류는 패키지박스 디자인, 명함 디자인, 패키지 도면 설계도, 상세페이지 디자인. 현재 상품 수 15개로 확인됨." },
    "delivery-box": { cafe24CategoryUrl: "", cafe24Status: "pending", cafe24Memo: "Cafe24 택배박스 카테고리 연결 대기" },
    "sticker-label": { cafe24CategoryUrl: "", cafe24Status: "pending", cafe24Memo: "Cafe24 스티커·라벨 카테고리 연결 대기" },
    "gift-box": { cafe24CategoryUrl: "", cafe24Status: "pending", cafe24Memo: "Cafe24 선물상자 카테고리 연결 대기" },
    "small-sample": { cafe24CategoryUrl: "", cafe24Status: "pending", cafe24Memo: "Cafe24 샘플·소량 카테고리 연결 대기" },
    "logo-print": { cafe24CategoryUrl: "", cafe24Status: "pending", cafe24Memo: "Cafe24 로고인쇄 카테고리 연결 대기" },
  });

  const cafe24SubCategoryMappings = Object.freeze({
    box: [
      { key: "premium-gift-package", label: "고급 선물 패키지", cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=63", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 패키지 > 고급 선물 패키지 계열." },
      { key: "single-box", label: "단박스", cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=65", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 패키지 > 단박스 계열." },
      { key: "button-box", label: "단추박스", cafe24CategoryUrl: "https://peerl.cafe24.com/product/list.html?cate_no=68", cafe24Status: "ready", cafe24Memo: "Cafe24 고객용 상품분류 URL 확인됨. 패키지 > 단추박스 계열. 현재 상품 수 0개로 확인되어 상품 등록 여부 확인 필요." },
    ],
  });

  const images = {
    ready: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-ready-package.jpg",
    delivery: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-thumbs/category-corrugated-box.jpg",
    shoppingBag: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-logo-print.jpg",
    sleeve: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-thumbs/category-sleeve.jpg",
    sticker: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-logo-print-set.jpg",
    gift: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-premium-package-set.jpg",
    sample: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-soft-sample-set.jpg",
    logoPrint: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-logo-print-set.jpg",
    natural: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-natural-package-set.jpg",
    studio: "https://ecimg.cafe24img.com/pg1853b44513043087/peerl/web/assets/shop-photos/uploaded-studio-samples.jpg",
    envelope: "assets/shop-thumbs/category-envelope.jpg",
    stickerThumb: "assets/shop-thumbs/category-sticker-label.jpg",
    boxThumb: "assets/shop-thumbs/category-folding-carton.jpg",
    shoppingBagThumb: "assets/shop-thumbs/category-shopping-bag.jpg",
    giftThumb: "assets/shop-thumbs/category-gift-box.jpg",
    sampleThumb: "assets/shop-thumbs/category-sample-set.jpg",
  };

  const commonChecklist = [
    "제품의 가로, 세로, 높이를 확인해주세요.",
    "필요한 수량을 정리해주세요.",
    "인쇄 또는 로고 적용이 필요한지 확인해주세요.",
    "디자인 파일 또는 로고 파일 보유 여부를 확인해주세요.",
    "희망 납기일을 확인해주세요.",
  ];

  const commonCautions = [
    "최종 견적은 사양 확인 후 안내됩니다.",
    "재고와 납기는 상담 후 안내됩니다.",
    "인쇄 가능 여부는 상품, 수량, 재질에 따라 달라질 수 있습니다.",
    "화면 색상과 실제 인쇄 색상은 차이가 있을 수 있습니다.",
    "맞춤 변경이 필요한 경우 별도 상담이 필요합니다.",
  ];

  const commonFaq = [
    {
      question: "로고 인쇄가 가능한가요?",
      answer: "일부 상품은 로고 인쇄 상담이 가능합니다. 상품과 수량에 따라 가능 여부가 달라질 수 있습니다.",
    },
    {
      question: "소량도 가능한가요?",
      answer: "상품별 최소 수량이 다를 수 있으며, 소량 가능 여부는 상담 후 안내됩니다.",
    },
    {
      question: "디자인 파일이 없어도 상담 가능한가요?",
      answer: "로고만 있는 경우에도 상담이 가능하며, 필요한 파일 형식은 상담 시 안내드립니다.",
    },
    {
      question: "납기는 얼마나 걸리나요?",
      answer: "재고, 인쇄 여부, 수량에 따라 달라질 수 있으며 확인 후 안내드립니다.",
    },
  ];

  const categoryContentGuide = {
    box: {
      notice: "제품 실측, 수량, 인쇄 여부를 확인한 뒤 박스 사양을 상담으로 안내드립니다.",
      checklist: [
        "제품의 가로, 세로, 높이를 실측해 주세요.",
        "제품이 박스 안에서 흔들리지 않도록 여유 공간을 확인해 주세요.",
        "로고 인쇄, 스티커, 라벨 중 어떤 방식이 필요한지 정리해 주세요.",
        "예상 수량과 희망 납기일을 함께 알려주세요.",
        "샘플 확인이 필요한 경우 상담 시 먼저 말씀해 주세요.",
      ],
      printGuide: "단상자는 제품 크기와 종이 재질, 인쇄 면적에 따라 제작 방향이 달라질 수 있습니다. 로고 파일, 인쇄 위치, 수량을 함께 알려주시면 상담이 더 정확해집니다.",
      faq: [
        { question: "제품 사이즈를 정확히 몰라도 상담 가능한가요?", answer: "제품 실측값이나 실물 기준으로 상담할 수 있습니다. 가로, 세로, 높이와 제품이 들어가는 방향을 알려주시면 박스 사양을 잡는 데 도움이 됩니다." },
        { question: "단상자에 로고 인쇄도 상담할 수 있나요?", answer: "상품과 수량, 종이 재질에 따라 로고 인쇄 상담이 가능합니다. 로고 파일과 인쇄 위치를 함께 알려주시면 확인 후 안내드립니다." },
        { question: "소량으로 먼저 확인할 수 있나요?", answer: "상품별 최소 수량과 재고 상황이 다를 수 있습니다. 샘플 또는 소량 확인이 필요한 경우 상담 후 가능한 방향을 안내드립니다." },
        { question: "종이 두께나 코팅도 선택해야 하나요?", answer: "제품 무게와 브랜드 느낌에 따라 달라질 수 있습니다. 특별히 원하는 질감이나 코팅이 있으면 상담 시 함께 알려주세요." },
      ],
    },
    "delivery-box": {
      notice: "제품 무게, 발송 방식, 완충재 필요 여부에 따라 적합한 박스 사양이 달라질 수 있습니다.",
      checklist: [
        "배송할 제품의 크기와 무게를 확인해 주세요.",
        "택배 발송인지, 보관용인지 사용 목적을 알려주세요.",
        "완충재나 내부 고정이 필요한지 확인해 주세요.",
        "발송 수량과 반복 주문 가능성을 함께 정리해 주세요.",
        "스티커, 테이프, 라벨 등 브랜드 표시 방식도 함께 알려주세요.",
      ],
      printGuide: "택배박스는 제품 보호가 우선입니다. 박스 직접 인쇄가 필요한지, 스티커나 테이프 조합으로 충분한지 수량과 재질을 기준으로 상담 후 안내드립니다.",
      faq: [
        { question: "제품 무게가 있으면 어떤 점을 확인해야 하나요?", answer: "제품 무게와 배송 중 파손 가능성을 함께 봐야 합니다. 골판지 종류, 박스 크기, 완충재 필요 여부를 상담 후 안내드립니다." },
        { question: "택배박스에도 로고를 넣을 수 있나요?", answer: "수량과 박스 재질에 따라 직접 인쇄 또는 스티커, 테이프 조합을 검토할 수 있습니다. 적용 방식은 상담 후 안내됩니다." },
        { question: "기성 택배박스 재고 확인도 가능한가요?", answer: "재고와 납기는 시점에 따라 달라질 수 있습니다. 필요한 사이즈와 수량을 알려주시면 확인 후 안내드립니다." },
        { question: "완충재까지 함께 상담할 수 있나요?", answer: "제품 특성에 따라 완충재나 내부 고정 방식이 필요할 수 있습니다. 파손 우려가 있는 제품은 상담 시 미리 알려주세요." },
      ],
    },
    "shopping-bag": {
      notice: "쇼핑백 사이즈, 손잡이, 수량, 로고 적용 방식에 따라 상담 후 안내됩니다.",
      checklist: [
        "담을 제품이나 박스의 크기와 무게를 확인해 주세요.",
        "매장 포장, 행사 배포, 선물용 등 사용 상황을 알려주세요.",
        "손잡이, 종이 재질, 색상 톤에 대한 선호를 정리해 주세요.",
        "로고 인쇄 또는 스티커 부착 중 원하는 방식을 알려주세요.",
        "행사 일정이 있다면 필요한 날짜를 함께 전달해 주세요.",
      ],
      printGuide: "쇼핑백은 브랜드 노출이 큰 포장입니다. 로고 인쇄, 스티커, 리본 조합 중 어떤 방식이 적합한지는 수량과 재질에 따라 상담 후 안내드립니다.",
      faq: [
        { question: "쇼핑백 손잡이 종류도 선택해야 하나요?", answer: "상품 구성과 재고 상황에 따라 선택지가 달라질 수 있습니다. 원하는 느낌이 있으면 상담 시 함께 알려주세요." },
        { question: "쇼핑백에 로고 인쇄가 가능한가요?", answer: "수량, 재질, 인쇄 위치에 따라 상담이 필요합니다. 로고 파일과 원하는 위치를 알려주시면 가능 여부를 확인해드립니다." },
        { question: "행사용으로 수량을 맞춰 상담할 수 있나요?", answer: "행사 일정과 예상 수량을 알려주시면 재고와 납기를 확인한 뒤 안내드립니다." },
        { question: "무지 쇼핑백에 스티커만 붙이는 방식도 괜찮나요?", answer: "소량이나 빠른 브랜드 표시가 필요한 경우 스티커 조합을 검토할 수 있습니다. 상품과 수량에 따라 상담 후 안내드립니다." },
      ],
    },
    "envelope-sleeve": {
      notice: "제품 둘레, 삽입 방식, 라벨·스티커 조합에 따라 제작 방향을 상담합니다.",
      checklist: [
        "제품을 감싸는 방향과 둘레를 확인해 주세요.",
        "봉투형인지 슬리브형인지 원하는 포장 방식을 정리해 주세요.",
        "제품명, 브랜드명, 안내 문구가 들어갈 위치를 생각해 주세요.",
        "스티커나 라벨을 함께 사용할지 확인해 주세요.",
        "제품을 직접 넣고 빼는 방식에 불편함이 없는지 확인해 주세요.",
      ],
      printGuide: "봉투와 슬리브는 제품 크기와 삽입 방식이 중요합니다. 인쇄 면적과 접히는 위치를 함께 확인해야 하며, 소량은 스티커 조합이 더 적합할 수 있습니다.",
      faq: [
        { question: "제품 둘레를 어떻게 재야 하나요?", answer: "제품을 감싸는 방향 기준으로 가로, 세로, 높이 또는 둘레를 확인해 주세요. 실측이 어렵다면 제품 사진과 대략 크기로 상담을 시작할 수 있습니다." },
        { question: "슬리브에 제품명과 로고를 넣을 수 있나요?", answer: "슬리브 재질과 수량, 인쇄 면적에 따라 상담이 필요합니다. 문구와 로고 파일을 준비해주시면 확인 후 안내드립니다." },
        { question: "봉투에 스티커를 붙이는 방식도 가능한가요?", answer: "봉투 사양과 스티커 재질에 따라 검토할 수 있습니다. 부착 위치와 수량을 함께 알려주세요." },
        { question: "소량 포장에도 어울리나요?", answer: "소량 상품이나 샘플 포장에도 사용할 수 있지만, 제작 방식은 상품 사양에 따라 달라질 수 있습니다." },
      ],
    },
    "sticker-label": {
      notice: "부착 위치, 크기, 재질, 후가공에 따라 상담 후 안내드립니다.",
      checklist: [
        "스티커를 붙일 제품이나 패키지 표면을 확인해 주세요.",
        "원형, 사각형, 봉인용 등 원하는 형태를 정리해 주세요.",
        "로고 파일이나 표시할 문구를 준비해 주세요.",
        "부착 위치와 실제 노출 크기를 확인해 주세요.",
        "방수, 무광, 유광 등 원하는 느낌이 있으면 알려주세요.",
      ],
      printGuide: "스티커와 라벨은 크기와 부착 위치가 중요합니다. 제품 정보 표기가 필요한 경우 문구를 먼저 정리하고, 재질과 후가공은 상담 후 안내받는 것이 좋습니다.",
      faq: [
        { question: "원하는 모양으로 제작 상담이 가능한가요?", answer: "원형, 사각형, 봉인용 등 형태에 따라 상담할 수 있습니다. 크기와 수량, 재질에 따라 제작 방향이 달라질 수 있습니다." },
        { question: "박스나 쇼핑백에 붙일 라벨도 상담할 수 있나요?", answer: "부착 위치와 패키지 재질을 알려주시면 라벨 크기와 재질을 함께 검토할 수 있습니다." },
        { question: "제품 정보 라벨 문구도 확인해주나요?", answer: "문구 배치 상담은 가능하지만, 법적 표기 의무가 있는 내용은 고객 측에서 확인이 필요합니다." },
        { question: "소량 스티커도 상담 가능한가요?", answer: "형태와 수량에 따라 상담 후 안내됩니다. 테스트용이나 샘플용이면 필요한 일정도 함께 알려주세요." },
      ],
    },
    "gift-box": {
      notice: "구성품 크기, 내부 고정 방식, 쇼핑백 조합 여부를 확인해 상담합니다.",
      checklist: [
        "선물세트에 들어갈 구성품 개수와 크기를 정리해 주세요.",
        "제품이 움직이지 않도록 내부 고정이 필요한지 확인해 주세요.",
        "쇼핑백, 띠지, 스티커를 함께 사용할지 생각해 주세요.",
        "선물용인지 판매용인지 사용 목적을 알려주세요.",
        "브랜드 로고나 안내 카드가 필요한지 확인해 주세요.",
      ],
      printGuide: "선물상자는 외부 박스뿐 아니라 내부 구성과 고정 방식이 중요합니다. 로고 인쇄, 띠지, 스티커, 쇼핑백 조합은 구성품과 수량을 확인한 뒤 안내드립니다.",
      faq: [
        { question: "선물세트 구성품이 여러 개여도 상담 가능한가요?", answer: "구성품 개수와 크기를 알려주시면 내부 고정 방식과 박스 크기를 함께 검토할 수 있습니다." },
        { question: "내부 트레이도 같이 상담할 수 있나요?", answer: "제품 형태와 고정 방식에 따라 상담이 필요합니다. 실측값이나 제품 사진이 있으면 더 정확히 안내드릴 수 있습니다." },
        { question: "선물상자와 쇼핑백을 함께 맞출 수 있나요?", answer: "브랜드 톤에 맞춰 박스, 쇼핑백, 스티커 조합을 상담할 수 있습니다. 재고와 납기는 확인 후 안내됩니다." },
        { question: "로고 인쇄와 띠지 중 어떤 방식이 좋나요?", answer: "수량과 예산, 원하는 브랜드 표현에 따라 달라질 수 있습니다. 상담 시 비교 방향을 안내드립니다." },
      ],
    },
    "small-sample": {
      notice: "소량 가능 여부와 일정은 상품 사양과 재고 확인 후 안내드립니다.",
      checklist: [
        "테스트, 졸업작품, 샘플 중 어떤 용도인지 알려주세요.",
        "필요한 수량과 사용 날짜를 먼저 정리해 주세요.",
        "제품 실측값이나 사진을 준비해 주세요.",
        "로고 인쇄가 필요한지, 스티커로 대체 가능한지 확인해 주세요.",
        "본 제작 전 확인하고 싶은 부분을 상담 시 알려주세요.",
      ],
      printGuide: "샘플·소량 상품은 일정과 사양 확인이 중요합니다. 모든 사양을 바로 제작하기보다 무지 상품, 스티커, 라벨 조합으로 먼저 확인하는 방향도 상담할 수 있습니다.",
      faq: [
        { question: "졸업작품용 소량도 상담할 수 있나요?", answer: "작품 크기, 필요한 수량, 제출 일정을 알려주시면 가능한 방향을 상담 후 안내드립니다." },
        { question: "본 제작 전에 샘플 느낌을 먼저 볼 수 있나요?", answer: "상품과 일정에 따라 샘플 또는 비슷한 구성으로 확인하는 방법을 안내드릴 수 있습니다." },
        { question: "소량에도 로고를 넣을 수 있나요?", answer: "직접 인쇄가 어려운 경우 스티커나 라벨 조합을 검토할 수 있습니다. 수량과 재질에 따라 상담이 필요합니다." },
        { question: "일정이 촉박하면 어떻게 해야 하나요?", answer: "희망 날짜를 먼저 알려주세요. 재고와 작업 가능 여부를 확인한 뒤 안내드립니다." },
      ],
    },
    "logo-print": {
      notice: "로고 파일, 인쇄 면적, 색상, 수량을 확인한 뒤 인쇄 가능 여부를 안내드립니다.",
      checklist: [
        "로고 원본 파일 보유 여부를 확인해 주세요.",
        "인쇄할 상품과 위치를 정리해 주세요.",
        "원하는 인쇄 크기와 색상 수를 알려주세요.",
        "상품 수량과 희망 납기를 함께 전달해 주세요.",
        "실제 인쇄 색상은 화면 색상과 차이가 날 수 있음을 확인해 주세요.",
      ],
      printGuide: "로고 인쇄는 상품 재질, 인쇄 면적, 색상 수, 수량에 따라 가능 여부가 달라질 수 있습니다. 로고 파일과 위치 예시를 함께 주시면 상담이 더 빠릅니다.",
      faq: [
        { question: "로고 파일은 어떤 형식이 좋나요?", answer: "가능하면 원본 벡터 파일을 준비하는 것이 좋습니다. 파일이 없다면 보유한 이미지 기준으로 상담 후 필요한 형식을 안내드립니다." },
        { question: "인쇄 색상이 화면과 똑같이 나오나요?", answer: "화면 색상과 실제 인쇄 색상은 재질과 인쇄 방식에 따라 차이가 있을 수 있습니다. 색상 기준이 있으면 상담 시 함께 알려주세요." },
        { question: "상품마다 인쇄 가능 위치가 다른가요?", answer: "상품 형태와 재질에 따라 인쇄 가능한 면적과 위치가 달라질 수 있습니다. 원하는 위치를 알려주시면 확인 후 안내드립니다." },
        { question: "소량 로고 인쇄도 상담할 수 있나요?", answer: "수량과 상품에 따라 직접 인쇄 또는 스티커 조합을 검토할 수 있습니다. 상담 후 가능한 방향을 안내드립니다." },
      ],
    },
  };

  function productHref(category, product) {
    return `product.html?category=${encodeURIComponent(category)}&product=${encodeURIComponent(product)}`;
  }

  const related = {
    whiteBox: {
      title: "기본 흰색 단상자",
      description: "소형 제품 포장에 많이 쓰는 기본 단상자입니다.",
      image: images.ready,
      alt: "기본 흰색 단상자 패키지",
      href: productHref("box", "basic-white-box"),
    },
    deliveryBox: {
      title: "크라프트 택배박스",
      description: "배송과 보관에 적합한 기본 골판지 박스입니다.",
      image: images.delivery,
      alt: "크라프트 택배박스",
      href: productHref("delivery-box", "kraft-delivery-box"),
    },
    shoppingBag: {
      title: "무지 쇼핑백",
      description: "스티커와 리본 구성을 더하기 좋은 기본 쇼핑백입니다.",
      image: images.shoppingBag,
      alt: "무지 쇼핑백",
      href: productHref("shopping-bag", "plain-shopping-bag"),
    },
    sleeve: {
      title: "기성 슬리브",
      description: "제품을 감싸 브랜드 정보를 더하는 슬리브 포장입니다.",
      image: images.sleeve,
      alt: "기성 슬리브 패키지",
      href: productHref("envelope-sleeve", "ready-sleeve"),
    },
    sticker: {
      title: "로고 스티커",
      description: "무지 상품에 브랜드 로고를 더하는 스티커입니다.",
      image: images.sticker,
      alt: "로고 스티커",
      href: productHref("sticker-label", "logo-sticker"),
    },
    gift: {
      title: "기본 선물상자",
      description: "선물세트 구성에 적합한 기본 상자입니다.",
      image: images.gift,
      alt: "기본 선물상자",
      href: productHref("gift-box", "basic-gift-box"),
    },
    sample: {
      title: "샘플 패키지 세트",
      description: "여러 패키지 구성을 비교하기 좋은 샘플형 구성입니다.",
      image: images.sample,
      alt: "샘플 패키지 세트",
      href: productHref("small-sample", "sample-package-set"),
    },
    logoBag: {
      title: "로고 인쇄 쇼핑백",
      description: "무지 쇼핑백에 브랜드 로고를 더하는 상담 상품입니다.",
      image: images.logoPrint,
      alt: "로고 인쇄 쇼핑백",
      href: productHref("logo-print", "logo-print-shopping-bag"),
    },
  };

  const productDetailData = {
    box: {
      "basic-white-box": {
        category: "box",
        product: "basic-white-box",
        title: "기본 흰색 단상자",
        subtitle: "소형 제품 포장에 사용하기 좋은 기본 종이박스입니다.",
        description: "화장품, 굿즈, 건강식품, 소형 제품 포장에 많이 사용하는 기본형 단상자입니다.",
        image: images.ready,
        alt: "기본 흰색 단상자 패키지",
        badges: ["인기", "로고인쇄 상담"],
        useCases: ["화장품", "굿즈", "소형제품"],
        options: ["사이즈", "수량", "인쇄 여부", "코팅 여부"],
        materials: ["흰색", "종이"],
        printOptions: ["무지", "로고인쇄 상담"],
        notice: "사이즈, 수량, 인쇄 여부에 따라 상담 후 안내됩니다.",
        optionSummary: {
          size: "상품별 상담",
          quantity: "소량 또는 수량별 상담",
          print: "무지 / 로고 인쇄 상담",
          material: "흰색 종이",
          delivery: "상담 후 안내",
        },
        checklist: commonChecklist,
        printGuide: "흰색 단상자는 로고 인쇄, 스티커, 라벨 조합으로 브랜드 느낌을 만들기 좋습니다. 인쇄 가능 여부는 상품, 수량, 재질에 따라 달라질 수 있습니다.",
        faq: commonFaq,
        relatedProducts: [related.shoppingBag, related.sticker, related.sample],
      },
    },
    "delivery-box": {
      "kraft-delivery-box": {
        category: "delivery-box",
        product: "kraft-delivery-box",
        title: "크라프트 택배박스",
        subtitle: "배송과 보관에 쓰기 좋은 기본 골판지 박스입니다.",
        description: "온라인 발송, 샘플 배송, 제품 보관에 활용하기 좋은 크라프트 톤의 택배박스입니다.",
        image: images.delivery,
        alt: "크라프트 택배박스",
        badges: ["배송용", "재고 확인"],
        useCases: ["배송", "보관", "소형제품"],
        options: ["사이즈", "골 종류", "수량", "완충 여부"],
        materials: ["크라프트", "골판지"],
        printOptions: ["무지", "스티커 적용"],
        notice: "재고와 납기는 확인 후 안내되며, 사이즈와 수량에 따라 상담이 필요합니다.",
        optionSummary: {
          size: "택배 규격 및 제품 크기 상담",
          quantity: "수량별 상담",
          print: "무지 / 스티커 적용",
          material: "크라프트 골판지",
          delivery: "재고 확인 후 안내",
        },
        checklist: commonChecklist,
        printGuide: "택배박스는 스티커, 라벨, 봉인 테이프 조합으로 브랜드 표시를 더할 수 있습니다. 박스 직접 인쇄는 수량과 재질에 따라 별도 상담이 필요합니다.",
        faq: commonFaq,
        relatedProducts: [related.whiteBox, related.sticker, related.logoBag],
      },
    },
    "shopping-bag": {
      "plain-shopping-bag": {
        category: "shopping-bag",
        product: "plain-shopping-bag",
        title: "무지 쇼핑백",
        subtitle: "로고 스티커나 리본과 함께 활용하기 좋은 기본 쇼핑백입니다.",
        description: "매장 포장, 행사 배포, 선물 구성에 활용할 수 있는 종이 쇼핑백입니다.",
        image: images.shoppingBag,
        alt: "무지 쇼핑백",
        badges: ["기본", "로고 상담"],
        useCases: ["화장품", "굿즈", "행사"],
        options: ["사이즈", "끈 종류", "수량", "로고 적용 여부"],
        materials: ["흰색", "종이"],
        printOptions: ["무지", "스티커 적용", "로고인쇄 상담"],
        notice: "인쇄 가능 여부는 수량, 재질, 쇼핑백 형태에 따라 달라질 수 있습니다.",
        optionSummary: {
          size: "상품 또는 구성품 크기 상담",
          quantity: "소량 또는 수량별 상담",
          print: "무지 / 스티커 / 로고 인쇄 상담",
          material: "흰색 종이",
          delivery: "상담 후 안내",
        },
        checklist: commonChecklist,
        printGuide: "무지 쇼핑백에는 로고 인쇄, 스티커, 라벨, 리본 구성을 더해 브랜드 느낌을 만들 수 있습니다.",
        faq: commonFaq,
        relatedProducts: [related.logoBag, related.sticker, related.gift],
      },
    },
    "envelope-sleeve": {
      "ready-sleeve": {
        category: "envelope-sleeve",
        product: "ready-sleeve",
        title: "기성 슬리브",
        subtitle: "제품을 감싸 브랜드 정보와 시각적 포인트를 더하는 포장입니다.",
        description: "박스, 용기, 디저트, 소형 제품을 감싸는 띠지형 패키지로 제품 정보를 간결하게 보여줄 수 있습니다.",
        image: images.sleeve,
        alt: "기성 슬리브 패키지",
        badges: ["슬리브", "띠지"],
        useCases: ["화장품", "디저트", "소형제품"],
        options: ["제품 둘레", "인쇄 여부", "수량", "종이 두께"],
        materials: ["크라프트", "종이"],
        printOptions: ["로고인쇄 상담", "별도 상담"],
        notice: "제품 크기와 재질, 인쇄 방식에 따라 제작 방향이 달라질 수 있습니다.",
        optionSummary: {
          size: "제품 둘레 기준 상담",
          quantity: "수량별 상담",
          print: "로고 인쇄 / 별도 상담",
          material: "종이 / 크라프트",
          delivery: "상담 후 안내",
        },
        checklist: commonChecklist,
        printGuide: "슬리브는 브랜드명, 제품명, 안내 문구를 넣기 좋은 포장입니다. 제품 둘레와 종이 두께를 함께 확인해야 합니다.",
        faq: commonFaq,
        relatedProducts: [related.whiteBox, related.sticker, related.sample],
      },
    },
    "sticker-label": {
      "logo-sticker": {
        category: "sticker-label",
        product: "logo-sticker",
        title: "로고 스티커",
        subtitle: "무지 상품에 브랜드 로고를 더하는 가장 간단한 구성입니다.",
        description: "박스, 쇼핑백, 봉투, 슬리브에 부착해 브랜드 표시와 봉인 기능을 함께 사용할 수 있는 스티커입니다.",
        image: images.sticker,
        alt: "로고 스티커",
        badges: ["로고", "브랜드"],
        useCases: ["굿즈", "선물세트", "행사"],
        options: ["로고 파일", "형태", "수량", "재질"],
        materials: ["스티커", "크라프트"],
        printOptions: ["스티커 적용", "로고인쇄 상담"],
        notice: "재질, 크기, 후가공, 수량에 따라 상담 후 안내됩니다.",
        optionSummary: {
          size: "지름 또는 가로세로 상담",
          quantity: "소량 또는 수량별 상담",
          print: "로고 스티커 제작 상담",
          material: "스티커 / 라벨",
          delivery: "상담 후 안내",
        },
        checklist: commonChecklist,
        printGuide: "로고 스티커는 무지 패키지에 브랜드 느낌을 빠르게 더하기 좋습니다. 부착 위치와 재질을 함께 정리하면 상담이 수월합니다.",
        faq: commonFaq,
        relatedProducts: [related.shoppingBag, related.whiteBox, related.sample],
      },
    },
    "gift-box": {
      "basic-gift-box": {
        category: "gift-box",
        product: "basic-gift-box",
        title: "기본 선물상자",
        subtitle: "선물세트 구성에 적합한 기본 박스입니다.",
        description: "제품 여러 개를 함께 담거나 선물용 구성을 만들 때 활용하기 좋은 패키지 상자입니다.",
        image: images.gift,
        alt: "기본 선물상자",
        badges: ["선물", "세트"],
        useCases: ["선물세트", "굿즈"],
        options: ["구성품", "사이즈", "수량", "내부 구성"],
        materials: ["흰색", "종이"],
        printOptions: ["무지", "로고인쇄 상담"],
        notice: "구성품 크기와 내부 고정 방식에 따라 제작 사양을 상담해야 합니다.",
        optionSummary: {
          size: "구성품 크기 기준 상담",
          quantity: "수량별 상담",
          print: "무지 / 로고 인쇄 상담",
          material: "종이 / 별도 재질 상담",
          delivery: "상담 후 안내",
        },
        checklist: commonChecklist,
        printGuide: "선물상자는 로고 인쇄, 스티커, 띠지, 내부 트레이 조합으로 브랜드 선물 구성을 만들 수 있습니다.",
        faq: commonFaq,
        relatedProducts: [related.whiteBox, related.sticker, related.logoBag],
      },
    },
    "small-sample": {
      "sample-package-set": {
        category: "small-sample",
        product: "sample-package-set",
        title: "샘플 패키지 세트",
        subtitle: "여러 패키지 구성을 비교해보는 샘플형 구성입니다.",
        description: "처음 시작하는 브랜드, 졸업작품, 테스트 제작 전 패키지 방향을 비교하고 확인하기 좋은 구성입니다.",
        image: images.sample,
        alt: "샘플 패키지 세트",
        badges: ["샘플", "비교"],
        useCases: ["졸업작품", "굿즈", "선물세트"],
        options: ["구성품", "수량", "상담 일정", "인쇄 여부"],
        materials: ["흰색", "크라프트", "종이"],
        printOptions: ["무지", "스티커 적용", "별도 상담"],
        notice: "소량 가능 여부와 샘플 일정은 상품과 사양 확인 후 안내됩니다.",
        optionSummary: {
          size: "구성별 상담",
          quantity: "소량 상담",
          print: "무지 / 스티커 / 별도 상담",
          material: "종이 / 크라프트",
          delivery: "일정 확인 후 안내",
        },
        checklist: commonChecklist,
        printGuide: "샘플 단계에서는 로고 스티커, 무지 박스, 쇼핑백을 조합해 실제 브랜드 적용 느낌을 먼저 확인할 수 있습니다.",
        faq: commonFaq,
        relatedProducts: [related.whiteBox, related.shoppingBag, related.sticker],
      },
    },
    "logo-print": {
      "logo-print-shopping-bag": {
        category: "logo-print",
        product: "logo-print-shopping-bag",
        title: "로고 인쇄 쇼핑백",
        subtitle: "무지 쇼핑백에 브랜드 로고를 더하는 상담 상품입니다.",
        description: "매장 포장, 행사 배포, 선물 구성에 브랜드 로고를 넣어 통일감 있는 쇼핑백을 준비할 수 있습니다.",
        image: images.logoPrint,
        alt: "로고 인쇄 쇼핑백",
        badges: ["쇼핑백", "로고"],
        useCases: ["화장품", "굿즈", "행사"],
        options: ["로고 파일", "인쇄 위치", "수량", "쇼핑백 사이즈"],
        materials: ["흰색", "종이"],
        printOptions: ["로고인쇄 상담"],
        notice: "인쇄 가능 여부는 상품, 수량, 재질에 따라 달라질 수 있습니다.",
        optionSummary: {
          size: "쇼핑백 사이즈 상담",
          quantity: "수량별 상담",
          print: "로고 인쇄 상담",
          material: "흰색 종이",
          delivery: "상담 후 안내",
        },
        checklist: commonChecklist,
        printGuide: "로고 인쇄 쇼핑백은 로고 파일, 인쇄 위치, 쇼핑백 사이즈, 수량을 함께 확인해야 상담이 정확해집니다.",
        faq: commonFaq,
        relatedProducts: [related.shoppingBag, related.sticker, related.gift],
      },
    },
  };

  function defaultRelatedProducts(category, product) {
    const defaults = {
      box: [related.deliveryBox, related.sticker, related.logoBag],
      "delivery-box": [related.whiteBox, related.sticker, related.shoppingBag],
      "shopping-bag": [related.logoBag, related.sticker, related.gift],
      "envelope-sleeve": [related.whiteBox, related.sticker, related.sample],
      "sticker-label": [related.shoppingBag, related.whiteBox, related.sample],
      "gift-box": [related.whiteBox, related.sticker, related.logoBag],
      "small-sample": [related.whiteBox, related.shoppingBag, related.sticker],
      "logo-print": [related.shoppingBag, related.sticker, related.gift],
      "rigid-box": [related.gift, related.logoBag, related.sticker],
      "business-card": [related.sticker, related.logoBag, related.sample],
      "dust-bag": [related.gift, related.logoBag, related.shoppingBag],
      accessories: [related.sticker, related.whiteBox, related.shoppingBag],
      "cafe-supplies": [related.shoppingBag, related.sticker, related.whiteBox],
      "design-request": [related.logoBag, related.whiteBox, related.sample],
    };
    return (defaults[category] || [related.whiteBox, related.shoppingBag, related.sticker])
      .filter((item) => item.href !== productHref(category, product))
      .slice(0, 3);
  }

  function createProductDetail(config) {
    const materials = config.materials || ["종이"];
    const printOptions = config.printOptions || ["별도 상담"];
    const useCases = config.useCases || ["소형제품"];
    const options = config.options || ["사이즈", "수량", "인쇄 여부"];

    return {
      category: config.category,
      product: config.product,
      title: config.title,
      subtitle: config.subtitle || `${config.title} 사양을 상담으로 확인할 수 있는 상품입니다.`,
      description: config.description || `${categoryLabels[config.category] || "패키지"} 카테고리에서 많이 찾는 ${config.title}입니다.`,
      image: config.image || images.ready,
      alt: config.alt || `${config.title} 패키지 이미지`,
      badges: config.badges || ["상담"],
      useCases,
      options,
      materials,
      printOptions,
      notice: config.notice || "사이즈, 수량, 인쇄 여부에 따라 상담 후 안내됩니다.",
      optionSummary: {
        size: config.sizeSummary || "상품 사양 기준 상담",
        quantity: config.quantitySummary || "수량별 상담",
        print: config.printSummary || printOptions.join(" / "),
        material: config.materialSummary || materials.join(" / "),
        delivery: config.deliverySummary || "재고와 납기 확인 후 안내",
      },
      checklist: config.checklist || commonChecklist,
      printGuide: config.printGuide || `${config.title}은 상품, 수량, 재질에 따라 인쇄 가능 여부가 달라질 수 있습니다. 로고 파일과 인쇄 위치를 함께 알려주시면 상담이 빠릅니다.`,
      faq: config.faq || commonFaq,
      relatedProducts: config.relatedProducts || defaultRelatedProducts(config.category, config.product),
      cafe24ProductUrl: config.cafe24ProductUrl || "",
      cafe24CategoryUrl: config.cafe24CategoryUrl || (cafe24CategoryMappings[config.category] && cafe24CategoryMappings[config.category].cafe24CategoryUrl) || "",
      cafe24Status: config.cafe24Status || (cafe24CategoryMappings[config.category] && cafe24CategoryMappings[config.category].cafe24Status) || "pending",
      cafe24Memo: config.cafe24Memo || `${categoryLabels[config.category] || "상품"} 상품 URL 연결 대기`,
    };
  }

  function addProductDetails(items) {
    items.forEach((config) => {
      if (!productDetailData[config.category]) productDetailData[config.category] = {};
      if (productDetailData[config.category][config.product]) return;
      productDetailData[config.category][config.product] = createProductDetail(config);
    });
  }

  addProductDetails([
    {
      category: "box",
      product: "kraft-paper-box",
      title: "크라프트 단상자",
      subtitle: "자연스러운 브랜드 톤에 어울리는 종이 단상자입니다.",
      description: "디저트, 굿즈, 소형 제품 포장에 따뜻한 인상을 더하기 좋은 크라프트 박스입니다.",
      image: images.natural,
      alt: "크라프트 단상자 패키지",
      badges: ["크라프트", "사양 상담"],
      useCases: ["디저트", "굿즈", "소형제품"],
      options: ["사양", "박스 형태", "수량"],
      materials: ["크라프트", "종이"],
      printOptions: ["무지", "로고인쇄 상담"],
      sizeSummary: "제품 크기 기준 상담",
      quantitySummary: "수량별 상담",
      printSummary: "무지 / 로고 인쇄 상담",
      materialSummary: "크라프트 종이",
    },
    {
      category: "box",
      product: "small-product-box",
      title: "소형 제품 포장 박스",
      subtitle: "화장품, 굿즈, 액세서리처럼 작은 제품에 맞추기 좋은 박스입니다.",
      description: "제품이 흔들리지 않도록 사이즈와 내부 구성 상담이 함께 필요한 소형 포장 박스입니다.",
      image: images.sample,
      alt: "소형 제품 포장 박스",
      badges: ["소형", "샘플 상담"],
      useCases: ["화장품", "굿즈", "소형제품"],
      options: ["제품 크기", "내부 구성", "인쇄 여부"],
      materials: ["흰색", "종이"],
      printOptions: ["로고인쇄 상담", "스티커 적용"],
      sizeSummary: "제품 실측 기준 상담",
      quantitySummary: "소량 또는 수량별 상담",
      printSummary: "로고 인쇄 / 스티커 적용 상담",
    },
    {
      category: "box",
      product: "plain-test-box",
      title: "테스트용 무지박스",
      subtitle: "제품 담김새와 사이즈를 먼저 확인하기 좋은 무지 박스입니다.",
      description: "본 제작 전 샘플 확인이나 소량 테스트용으로 상담하기 좋은 기본 박스입니다.",
      image: images.ready,
      alt: "테스트용 무지박스",
      badges: ["테스트", "소량 상담"],
      useCases: ["소형제품", "졸업작품"],
      options: ["사이즈", "수량", "담김 확인"],
      materials: ["흰색", "종이"],
      printOptions: ["무지", "별도 상담"],
      sizeSummary: "샘플 실측 기준 상담",
      quantitySummary: "소량 상담",
      printSummary: "무지 중심 / 필요 시 별도 상담",
    },
    {
      category: "delivery-box",
      product: "small-shipping-box",
      title: "소형 발송 박스",
      subtitle: "작은 제품이나 샘플을 발송하기 좋은 배송 박스입니다.",
      description: "제품 보호와 배송 안정성을 함께 확인하는 소형 발송용 박스입니다.",
      image: images.ready,
      alt: "소형 발송 박스",
      badges: ["소형", "샘플 발송"],
      useCases: ["배송", "소형제품", "졸업작품"],
      options: ["제품 크기", "완충 여부", "수량"],
      materials: ["흰색", "종이", "골판지"],
      printOptions: ["무지", "스티커 적용"],
      sizeSummary: "발송 제품 기준 상담",
      materialSummary: "종이 / 골판지",
    },
    {
      category: "delivery-box",
      product: "brand-delivery-box",
      title: "브랜드 배송 박스",
      subtitle: "배송 과정에서도 브랜드 인상을 남길 수 있는 박스입니다.",
      description: "무지 배송 박스에 로고 인쇄나 스티커 구성을 더해 브랜드 포장으로 활용할 수 있습니다.",
      image: images.logoPrint,
      alt: "브랜드 배송 박스",
      badges: ["로고 상담", "브랜드 포장"],
      useCases: ["배송", "굿즈"],
      options: ["인쇄 위치", "수량", "사양"],
      materials: ["크라프트", "골판지"],
      printOptions: ["로고인쇄 상담", "스티커 적용"],
      printSummary: "로고 인쇄 / 스티커 적용 상담",
    },
    {
      category: "shopping-bag",
      product: "kraft-shopping-bag",
      title: "크라프트 쇼핑백",
      subtitle: "자연스러운 브랜드 톤과 식품, 카페 포장에 어울리는 쇼핑백입니다.",
      description: "따뜻한 소재감이 필요한 매장 포장, 디저트 포장, 행사 배포용으로 상담할 수 있습니다.",
      image: images.natural,
      alt: "크라프트 쇼핑백",
      badges: ["크라프트", "식품 포장"],
      useCases: ["디저트", "행사"],
      options: ["사양", "인쇄 여부", "수량"],
      materials: ["크라프트", "종이"],
      printOptions: ["무지", "로고인쇄 상담"],
    },
    {
      category: "shopping-bag",
      product: "event-shopping-bag",
      title: "행사 배포용 쇼핑백",
      subtitle: "박람회, 팝업, 증정품 포장에 활용하기 좋은 쇼핑백입니다.",
      description: "행사 일정과 수량에 맞춰 재고와 납기를 확인한 뒤 상담이 필요한 쇼핑백입니다.",
      image: images.shoppingBag,
      alt: "행사 배포용 쇼핑백",
      badges: ["행사", "팝업"],
      useCases: ["행사", "굿즈"],
      options: ["용도", "사이즈", "수량"],
      materials: ["흰색", "종이"],
      printOptions: ["무지", "스티커 적용"],
    },
    {
      category: "envelope-sleeve",
      product: "ready-envelope",
      title: "기성 봉투",
      subtitle: "작은 굿즈, 카드, 인쇄물 포장에 쓰기 좋은 봉투입니다.",
      description: "소형 제품과 안내물 포장에 활용하기 좋으며 스티커 조합으로 브랜드 표시를 더할 수 있습니다.",
      image: images.envelope,
      alt: "기성 봉투",
      badges: ["봉투", "소형"],
      useCases: ["굿즈", "소형제품", "행사"],
      options: ["사이즈", "사양", "수량"],
      materials: ["흰색", "종이"],
      printOptions: ["무지", "스티커 적용"],
    },
    {
      category: "envelope-sleeve",
      product: "logo-sticker-envelope",
      title: "로고 스티커 부착 봉투",
      subtitle: "무지 봉투에 로고 스티커를 더해 간단히 브랜드 느낌을 만드는 구성입니다.",
      description: "소량 포장이나 행사 배포용 봉투에 로고 스티커를 조합해 사용할 수 있습니다.",
      image: images.logoPrint,
      alt: "로고 스티커 부착 봉투",
      badges: ["로고", "스티커"],
      useCases: ["굿즈", "행사"],
      options: ["스티커 형태", "봉투 사양", "수량"],
      materials: ["흰색", "스티커", "종이"],
      printOptions: ["스티커 적용", "로고인쇄 상담"],
    },
    {
      category: "sticker-label",
      product: "logo-round-sticker",
      title: "원형 스티커",
      subtitle: "봉인과 브랜드 표시를 함께 활용하기 좋은 원형 스티커입니다.",
      description: "박스, 봉투, 쇼핑백에 붙여 브랜드 표시와 마감 포인트를 동시에 줄 수 있습니다.",
      image: images.logoPrint,
      alt: "원형 스티커",
      badges: ["원형", "봉인"],
      useCases: ["화장품", "디저트", "소형제품"],
      options: ["지름", "사양", "수량"],
      materials: ["스티커", "라벨"],
      printOptions: ["로고인쇄 상담", "별도 상담"],
      sizeSummary: "지름 기준 상담",
    },
    {
      category: "sticker-label",
      product: "square-label",
      title: "사각 라벨",
      subtitle: "제품명과 안내 정보를 정돈해 보여주는 라벨입니다.",
      description: "제품 정보, 성분, 안내 문구를 담아야 하는 패키지에 활용할 수 있습니다.",
      image: images.stickerThumb,
      alt: "사각 라벨",
      badges: ["라벨", "정보 표시"],
      useCases: ["화장품", "소형제품"],
      options: ["사이즈", "부착 위치", "수량"],
      materials: ["라벨", "흰색"],
      printOptions: ["별도 상담"],
    },
    {
      category: "sticker-label",
      product: "product-info-label",
      title: "제품 정보 라벨",
      subtitle: "재질, 성분, 안내 문구처럼 필요한 정보를 담는 라벨입니다.",
      description: "상품 정보 표기가 필요한 화장품, 식품, 소형 제품 패키지에 상담할 수 있습니다.",
      image: images.stickerThumb,
      alt: "제품 정보 라벨",
      badges: ["정보 라벨", "상담"],
      useCases: ["화장품", "디저트"],
      options: ["문구", "크기", "사양"],
      materials: ["라벨", "흰색"],
      printOptions: ["별도 상담"],
      printGuide: "제품 정보 라벨은 표기 내용과 부착 위치를 먼저 정리해주시면 상담이 빠릅니다. 표기 의무가 있는 항목은 고객 측에서 확인이 필요합니다.",
    },
    {
      category: "gift-box",
      product: "premium-package-set",
      title: "프리미엄 패키지 세트",
      subtitle: "브랜드 선물과 고급 제품 포장에 어울리는 패키지 구성입니다.",
      description: "박스, 슬리브, 라벨 등 여러 구성 요소를 조합해 선물세트 느낌을 만들 수 있습니다.",
      image: images.studio,
      alt: "프리미엄 패키지 세트",
      badges: ["프리미엄", "브랜드"],
      useCases: ["선물세트", "화장품"],
      options: ["박스 형태", "인쇄 여부", "내부 구성"],
      materials: ["흰색", "검정", "종이"],
      printOptions: ["로고인쇄 상담", "별도 상담"],
    },
    {
      category: "gift-box",
      product: "inner-tray-set",
      title: "내부 트레이 구성",
      subtitle: "제품을 고정하고 구성감을 정리하기 위한 내부 구조 상담 상품입니다.",
      description: "제품 개수와 형태에 따라 내부 고정 방식과 재질 상담이 필요한 구성입니다.",
      image: images.ready,
      alt: "내부 트레이 구성",
      badges: ["트레이", "구조 상담"],
      useCases: ["선물세트", "소형제품"],
      options: ["제품 개수", "고정 방식", "사양"],
      materials: ["크라프트", "종이"],
      printOptions: ["별도 상담"],
      printGuide: "내부 트레이는 제품 실측과 고정 방식이 중요합니다. 제품 크기와 개수를 알려주시면 제작 방향을 안내드립니다.",
    },
    {
      category: "small-sample",
      product: "small-carton-box",
      title: "소량 단상자",
      subtitle: "처음 제품을 준비할 때 부담 없이 확인하기 좋은 소량 박스입니다.",
      description: "샘플 제작, 테스트 판매, 졸업작품 준비처럼 작은 수량으로 먼저 확인하고 싶을 때 상담할 수 있습니다.",
      image: images.ready,
      alt: "소량 단상자",
      badges: ["소량", "단상자"],
      useCases: ["졸업작품", "소형제품", "화장품"],
      options: ["사이즈", "수량", "인쇄 여부"],
      materials: ["흰색", "종이"],
      printOptions: ["무지", "로고인쇄 상담"],
      quantitySummary: "소량 상담",
    },
    {
      category: "small-sample",
      product: "graduation-package-set",
      title: "졸업작품 포장 세트",
      subtitle: "작품 전시와 제출용 포장 구성을 상담할 수 있는 세트입니다.",
      description: "졸업작품, 전시 제출, 포트폴리오용 패키지를 작은 수량으로 준비할 때 적합합니다.",
      image: images.natural,
      alt: "졸업작품 포장 세트",
      badges: ["작품", "전시"],
      useCases: ["졸업작품", "행사", "선물세트"],
      options: ["작품 크기", "수량", "일정"],
      materials: ["크라프트", "종이"],
      printOptions: ["스티커 적용", "별도 상담"],
      quantitySummary: "소량 일정 상담",
    },
    {
      category: "small-sample",
      product: "small-label-set",
      title: "소량 라벨 세트",
      subtitle: "소량 상품에 붙이는 기본 라벨과 스티커 구성입니다.",
      description: "테스트 판매나 샘플 상품에 필요한 라벨을 작은 수량으로 상담할 수 있습니다.",
      image: images.logoPrint,
      alt: "소량 라벨 세트",
      badges: ["라벨", "소량"],
      useCases: ["소형제품", "굿즈"],
      options: ["형태", "사양", "수량"],
      materials: ["스티커", "라벨"],
      printOptions: ["로고인쇄 상담", "스티커 적용"],
      quantitySummary: "소량 상담",
    },
    {
      category: "logo-print",
      product: "logo-print-carton-box",
      title: "단상자 로고 인쇄",
      subtitle: "기본 박스에 브랜드 로고와 안내 문구를 넣는 상담 상품입니다.",
      description: "화장품, 굿즈, 소형 제품용 박스에 로고 인쇄를 적용할 때 필요한 사양을 상담합니다.",
      image: images.ready,
      alt: "단상자 로고 인쇄",
      badges: ["단상자", "인쇄 상담"],
      useCases: ["화장품", "굿즈", "소형제품"],
      options: ["박스 형태", "인쇄 면", "수량"],
      materials: ["흰색", "종이"],
      printOptions: ["로고인쇄 상담"],
      printSummary: "로고 인쇄 상담",
    },
    {
      category: "logo-print",
      product: "logo-print-sticker",
      title: "스티커 로고 인쇄",
      subtitle: "무지 패키지에 붙일 수 있는 로고 스티커 상담 상품입니다.",
      description: "박스, 쇼핑백, 봉투에 브랜드 표시를 빠르게 더할 수 있는 스티커 구성입니다.",
      image: images.logoPrint,
      alt: "스티커 로고 인쇄",
      badges: ["스티커", "소량 상담"],
      useCases: ["소형제품", "졸업작품", "굿즈"],
      options: ["스티커 형태", "사양", "수량"],
      materials: ["스티커", "라벨"],
      printOptions: ["로고인쇄 상담", "스티커 적용"],
    },
    {
      category: "logo-print",
      product: "logo-print-sleeve",
      title: "슬리브 로고 인쇄",
      subtitle: "제품을 감싸는 슬리브에 브랜드 정보를 더하는 상담 상품입니다.",
      description: "제품명, 브랜드명, 안내 문구를 슬리브에 적용해 패키지 완성도를 높일 수 있습니다.",
      image: images.sleeve,
      alt: "슬리브 로고 인쇄",
      badges: ["슬리브", "브랜드"],
      useCases: ["화장품", "디저트", "소형제품"],
      options: ["제품 둘레", "인쇄 범위", "수량"],
      materials: ["크라프트", "종이"],
      printOptions: ["로고인쇄 상담", "별도 상담"],
      sizeSummary: "제품 둘레 기준 상담",
    },
  ]);

  addProductDetails([
    {
      category: "rigid-box",
      product: "top-bottom-rigid-box",
      title: "상하 분리형 싸바리박스",
      subtitle: "뚜껑과 하부가 분리되는 고급 선물 패키지 구조입니다.",
      description: "고급 선물세트, 화장품, 브랜드 키트처럼 제품을 단단하게 보여주고 싶은 경우 상담하기 좋은 싸바리박스입니다.",
      image: images.premium,
      alt: "상하 분리형 싸바리박스",
      badges: ["싸바리", "선물세트"],
      useCases: ["선물세트", "화장품"],
      options: ["제품 크기", "내부 구성", "후가공"],
      materials: ["남색", "종이"],
      printOptions: ["로고인쇄 상담", "별도 상담"],
      sizeSummary: "구성품 실측 기준 상담",
      quantitySummary: "수량별 상담",
      materialSummary: "싸바리 원단 / 종이 재질 상담",
    },
    {
      category: "rigid-box",
      product: "drawer-rigid-box",
      title: "서랍형 싸바리박스",
      subtitle: "열고 닫는 경험을 강조하는 프리미엄 박스 구조입니다.",
      description: "브랜드 제품, 굿즈, 화장품 세트처럼 개봉 경험이 중요한 상품에 맞춰 구조와 내부 트레이를 함께 상담합니다.",
      image: images.studio,
      alt: "서랍형 싸바리박스",
      badges: ["서랍형", "구조 상담"],
      useCases: ["화장품", "굿즈", "선물세트"],
      options: ["서랍 방향", "내부 트레이", "수량"],
      materials: ["흰색", "종이"],
      printOptions: ["로고인쇄 상담", "별도 상담"],
      sizeSummary: "제품 배열 기준 상담",
      materialSummary: "싸바리 재질 상담",
    },
    {
      category: "business-card",
      product: "basic-business-card",
      title: "기본 명함",
      subtitle: "회사와 담당자 정보를 깔끔하게 전달하는 기본 인쇄물입니다.",
      description: "브랜드 첫인상을 정리하는 기본 명함으로, 용지와 수량, 디자인 파일 상태를 확인한 뒤 상담으로 안내드립니다.",
      image: images.studio,
      alt: "기본 명함",
      badges: ["명함", "인쇄물"],
      useCases: ["행사", "굿즈"],
      options: ["용지", "수량", "디자인 파일"],
      materials: ["흰색", "종이"],
      printOptions: ["별도 상담"],
      sizeSummary: "명함 규격 또는 맞춤 사이즈 상담",
      printSummary: "양면 / 단면 인쇄 상담",
    },
    {
      category: "business-card",
      product: "premium-business-card",
      title: "고급지 명함",
      subtitle: "종이 질감과 두께로 브랜드 인상을 높이는 명함입니다.",
      description: "고급 용지, 두께, 후가공 여부를 함께 검토해 브랜드 톤에 맞는 명함 사양을 상담합니다.",
      image: images.premium,
      alt: "고급지 명함",
      badges: ["고급지", "후가공"],
      useCases: ["행사", "선물세트"],
      options: ["용지", "후가공", "수량"],
      materials: ["흰색", "종이"],
      printOptions: ["별도 상담"],
      materialSummary: "고급지 / 특수지 상담",
      printSummary: "후가공 별도 상담",
    },
    {
      category: "dust-bag",
      product: "basic-dust-bag",
      title: "기본 더스트백",
      subtitle: "제품 보관과 보호에 활용하는 기본 패브릭 포장입니다.",
      description: "패브릭 원단, 제품 크기, 여밈 방식을 기준으로 제품 보호와 선물 포장에 맞는 더스트백을 상담합니다.",
      image: images.natural,
      alt: "기본 더스트백",
      badges: ["더스트백", "제품 보호"],
      useCases: ["선물세트", "굿즈"],
      options: ["사이즈", "원단", "수량"],
      materials: ["흰색"],
      printOptions: ["무지", "별도 상담"],
      materialSummary: "패브릭 원단 상담",
      printSummary: "무지 / 로고 적용 상담",
    },
    {
      category: "dust-bag",
      product: "logo-dust-bag",
      title: "로고 인쇄 더스트백",
      subtitle: "패브릭 포장에 브랜드 로고를 더하는 상담 상품입니다.",
      description: "원단과 로고 위치, 적용 방식에 따라 더스트백 인쇄 가능 여부를 확인하고 상담으로 안내드립니다.",
      image: images.logoPrint,
      alt: "로고 인쇄 더스트백",
      badges: ["로고 상담", "패브릭"],
      useCases: ["선물세트", "화장품"],
      options: ["로고 파일", "인쇄 위치", "원단"],
      materials: ["흰색", "검정"],
      printOptions: ["로고인쇄 상담", "별도 상담"],
      materialSummary: "원단 색상 상담",
      printSummary: "로고 적용 방식 상담",
    },
    {
      category: "accessories",
      product: "package-cushion",
      title: "완충재",
      subtitle: "제품 보호와 내부 고정을 위해 함께 검토하는 포장 부자재입니다.",
      description: "제품 무게, 박스 크기, 흔들림 여부를 기준으로 필요한 완충 방향을 상담합니다.",
      image: images.natural,
      alt: "패키지 완충재",
      badges: ["완충재", "내부 구성"],
      useCases: ["배송", "선물세트"],
      options: ["제품 무게", "박스 크기", "재질"],
      materials: ["크라프트", "종이"],
      printOptions: ["무지", "별도 상담"],
      sizeSummary: "박스 내부 여유 공간 기준 상담",
      materialSummary: "종이 완충재 / 기타 부자재 상담",
    },
    {
      category: "accessories",
      product: "sealing-sticker",
      title: "봉인 스티커",
      subtitle: "박스와 봉투를 깔끔하게 마감하는 패키지 부자재입니다.",
      description: "브랜드 로고, 봉인 위치, 부착 표면을 기준으로 스티커 형태와 재질을 상담합니다.",
      image: images.sticker,
      alt: "봉인 스티커",
      badges: ["봉인", "스티커"],
      useCases: ["굿즈", "행사", "소형제품"],
      options: ["크기", "형태", "수량"],
      materials: ["스티커", "라벨"],
      printOptions: ["스티커 적용", "로고인쇄 상담"],
      sizeSummary: "부착 위치 기준 상담",
      printSummary: "로고 / 문구 적용 상담",
    },
    {
      category: "cafe-supplies",
      product: "dessert-package-box",
      title: "디저트 포장박스",
      subtitle: "쿠키, 마카롱, 작은 디저트 포장에 맞는 박스 상담 상품입니다.",
      description: "디저트 크기, 식품 포장 용도, 매장 운영 수량을 기준으로 적합한 박스 방향을 안내드립니다.",
      image: images.natural,
      alt: "디저트 포장박스",
      badges: ["디저트", "카페용품"],
      useCases: ["디저트", "소형제품"],
      options: ["제품 크기", "식품 용도", "수량"],
      materials: ["크라프트", "종이"],
      printOptions: ["무지", "스티커 적용"],
      sizeSummary: "디저트 크기 기준 상담",
      materialSummary: "식품 포장 용도 상담",
    },
    {
      category: "cafe-supplies",
      product: "cafe-sticker",
      title: "카페 스티커",
      subtitle: "컵, 봉투, 박스에 브랜드 로고와 안내 문구를 더하는 스티커입니다.",
      description: "매장 로고, 부착 위치, 필요한 수량을 기준으로 스티커 형태와 재질을 상담합니다.",
      image: images.stickerThumb,
      alt: "카페 스티커",
      badges: ["스티커", "로고 상담"],
      useCases: ["디저트", "행사", "소형제품"],
      options: ["부착 위치", "모양", "수량"],
      materials: ["스티커", "라벨"],
      printOptions: ["스티커 적용", "로고인쇄 상담"],
      sizeSummary: "부착 위치 기준 상담",
      printSummary: "로고 / 안내 문구 적용 상담",
    },
    {
      category: "design-request",
      product: "package-dieline-design",
      title: "패키지 도면 설계",
      subtitle: "제품 크기와 포장 방식을 기준으로 칼선과 구조 방향을 상담합니다.",
      description: "제품 실측값, 포장 목적, 원하는 박스 형태를 기준으로 패키지 도면 설계 범위를 정리합니다.",
      image: images.ready,
      alt: "패키지 도면 설계 상담",
      badges: ["도면", "구조 상담"],
      useCases: ["화장품", "굿즈", "선물세트"],
      options: ["제품 치수", "포장 형태", "사용 목적"],
      materials: ["종이"],
      printOptions: ["별도 상담"],
      sizeSummary: "제품 실측 기준 상담",
      printSummary: "도면 설계 범위 상담",
    },
    {
      category: "design-request",
      product: "package-graphic-design",
      title: "패키지 그래픽 디자인",
      subtitle: "박스, 쇼핑백, 라벨에 들어갈 그래픽 방향을 상담합니다.",
      description: "로고 파일, 문구, 참고 이미지, 적용 상품을 기준으로 패키지 그래픽 디자인 범위를 정리합니다.",
      image: images.logoPrint,
      alt: "패키지 그래픽 디자인 상담",
      badges: ["그래픽", "브랜드"],
      useCases: ["화장품", "디저트", "굿즈"],
      options: ["로고 파일", "문구", "적용 상품"],
      materials: ["종이"],
      printOptions: ["로고인쇄 상담", "별도 상담"],
      sizeSummary: "적용 상품 기준 상담",
      printSummary: "그래픽 적용 범위 상담",
    },
  ]);

  Object.assign(categoryContentGuide, {
    "rigid-box": {
      notice: "싸바리박스는 구조, 내부 구성, 후가공 여부에 따라 제작 방향이 달라질 수 있습니다.",
      checklist: [
        "제품 크기와 구성품 개수를 정리해 주세요.",
        "상하형, 서랍형 등 원하는 개봉 방식을 알려주세요.",
        "내부 트레이나 고정 구조가 필요한지 확인해 주세요.",
        "로고 적용과 후가공 필요 여부를 알려주세요.",
        "예상 수량과 희망 납기일을 함께 전달해 주세요.",
      ],
      printGuide: "싸바리박스는 재질, 원단, 후가공, 내부 구조가 함께 결정되어야 합니다. 로고 파일과 참고 이미지를 함께 주시면 상담이 더 정확해집니다.",
      faq: commonFaq,
    },
    "business-card": {
      notice: "명함은 용지, 수량, 후가공, 디자인 파일 상태를 확인한 뒤 안내됩니다.",
      checklist: [
        "명함에 들어갈 이름, 연락처, 회사 정보를 정리해 주세요.",
        "디자인 파일이 있는지 먼저 확인해 주세요.",
        "단면 또는 양면 인쇄 여부를 알려주세요.",
        "용지 질감이나 후가공 선호가 있으면 알려주세요.",
        "필요 수량과 사용 일정을 함께 전달해 주세요.",
      ],
      printGuide: "명함은 작은 인쇄물이지만 색상, 용지, 후가공에 따라 인상이 달라집니다. 파일 상태와 원하는 종이 느낌을 함께 확인합니다.",
      faq: commonFaq,
    },
    "dust-bag": {
      notice: "더스트백은 원단, 사이즈, 로고 적용 방식에 따라 상담 후 안내됩니다.",
      checklist: [
        "담을 제품의 크기와 무게를 확인해 주세요.",
        "원하는 원단 색상과 여밈 방식을 알려주세요.",
        "로고 인쇄 또는 라벨 적용 여부를 정리해 주세요.",
        "선물 포장용인지 보관용인지 사용 목적을 알려주세요.",
        "예상 수량과 희망 납기일을 전달해 주세요.",
      ],
      printGuide: "패브릭 소재는 종이와 인쇄 조건이 다릅니다. 원단과 수량, 로고 적용 방식에 따라 가능 여부를 확인해야 합니다.",
      faq: commonFaq,
    },
    accessories: {
      notice: "부자재는 본품 패키지와 함께 사용할 위치와 수량을 확인해 안내드립니다.",
      checklist: [
        "함께 사용할 패키지 종류를 알려주세요.",
        "부착 위치나 내부 사용 위치를 정리해 주세요.",
        "필요한 수량과 반복 사용 여부를 확인해 주세요.",
        "로고나 문구가 필요한지 알려주세요.",
        "본품과 함께 납품이 필요한지 확인해 주세요.",
      ],
      printGuide: "스티커와 라벨은 로고와 문구 적용이 가능하지만, 완충재나 리본은 재질과 수량 조건을 함께 확인해야 합니다.",
      faq: commonFaq,
    },
    "cafe-supplies": {
      notice: "카페용품은 식품 포장 용도, 재질, 수량, 로고 적용 여부를 확인해 안내드립니다.",
      checklist: [
        "담을 디저트나 음료의 크기를 확인해 주세요.",
        "식품 포장 용도인지 먼저 알려주세요.",
        "매장 로고 적용이 필요한지 정리해 주세요.",
        "필요한 수량과 운영 일정을 알려주세요.",
        "쇼핑백, 스티커, 봉투를 함께 사용할지 확인해 주세요.",
      ],
      printGuide: "카페용품은 식품 포장 용도와 매장 운영 수량을 함께 봐야 합니다. 소량은 스티커 조합으로 브랜드 표시를 검토할 수 있습니다.",
      faq: commonFaq,
    },
    "design-request": {
      notice: "디자인의뢰는 보유 자료와 필요한 작업 범위를 확인한 뒤 상담 방향을 안내드립니다.",
      checklist: [
        "현재 보유한 로고, 이미지, 문구 자료를 정리해 주세요.",
        "디자인을 적용할 상품 종류를 알려주세요.",
        "도면 설계와 그래픽 디자인 중 필요한 범위를 확인해 주세요.",
        "참고 이미지나 원하는 분위기가 있으면 전달해 주세요.",
        "제작 일정과 사용 목적을 함께 알려주세요.",
      ],
      printGuide: "디자인은 실제 제작 사양과 분리해서 보기 어렵습니다. 제품 크기, 인쇄 방식, 재질을 함께 확인해야 제작 가능한 방향으로 정리할 수 있습니다.",
      faq: commonFaq,
    },
  });

  function applyProductContentGuide() {
    Object.entries(productDetailData).forEach(([category, products]) => {
      const guide = categoryContentGuide[category];
      if (!guide) return;

      Object.values(products).forEach((product) => {
        product.notice = guide.notice;
        product.checklist = guide.checklist;
        product.faq = guide.faq;
        const detailGuide = product.printGuide || "";
        product.printGuide = detailGuide && !detailGuide.includes(guide.printGuide)
          ? `${detailGuide} ${guide.printGuide}`
          : guide.printGuide;
      });
    });
  }

  function applyCafe24DefaultsToProductDetails() {
    Object.entries(productDetailData).forEach(([category, products]) => {
      const mapping = cafe24CategoryMappings[category] || { cafe24CategoryUrl: "", cafe24Status: "pending", cafe24Memo: "" };
      const subCategories = cafe24SubCategoryMappings[category] || [];
      const categoryName = categoryLabels[category] || "상품";

      Object.values(products).forEach((product) => {
        product.cafe24ProductUrl = product.cafe24ProductUrl || "";
        product.cafe24CategoryUrl = product.cafe24CategoryUrl || mapping.cafe24CategoryUrl || "";
        product.cafe24Status = product.cafe24Status || mapping.cafe24Status || "pending";
        product.cafe24Memo = product.cafe24Memo || `${categoryName} 상품 URL 연결 대기`;
        product.cafe24SubCategories = product.cafe24SubCategories || subCategories;
      });
    });
  }

  applyProductContentGuide();
  applyCafe24DefaultsToProductDetails();

  window.productDetailData = productDetailData;

  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("category") || "";
  const requestedProduct = params.get("product") || "";
  const representativeProducts = {
    box: "basic-white-box",
    "delivery-box": "kraft-delivery-box",
    "shopping-bag": "plain-shopping-bag",
    "envelope-sleeve": "ready-sleeve",
    "sticker-label": "logo-sticker",
    "gift-box": "basic-gift-box",
    "small-sample": "sample-package-set",
    "logo-print": "logo-print-shopping-bag",
    "rigid-box": "top-bottom-rigid-box",
    "business-card": "basic-business-card",
    "dust-bag": "basic-dust-bag",
    accessories: "package-cushion",
    "cafe-supplies": "dessert-package-box",
    "design-request": "package-dieline-design",
  };

  function getRepresentativeProduct(category) {
    const product = representativeProducts[category];
    return productDetailData[category] && productDetailData[category][product]
      ? productDetailData[category][product]
      : productDetailData.box["basic-white-box"];
  }

  function getSafeReturnUrl() {
    const rawReturnUrl = (params.get("returnUrl") || "").trim();
    if (!rawReturnUrl) return "";
    let decodedReturnUrl = rawReturnUrl;
    try {
      decodedReturnUrl = decodeURIComponent(rawReturnUrl);
    } catch (error) {
      decodedReturnUrl = rawReturnUrl;
    }

    if (/^(?:https?:)?\/\//i.test(decodedReturnUrl)) return "";
    if (!/^category\.html(?:$|[?#])/i.test(decodedReturnUrl)) return "";
    return decodedReturnUrl;
  }

  function getQuoteHref(product) {
    const query = new URLSearchParams({
      quoteProduct: product.product,
      quoteCategory: product.category,
    });
    return `index.html?${query.toString()}#quote`;
  }

  const hasValidCategory = Object.prototype.hasOwnProperty.call(productDetailData, requestedCategory);
  const requestedData = hasValidCategory && productDetailData[requestedCategory][requestedProduct];
  const productData = requestedData || (hasValidCategory ? getRepresentativeProduct(requestedCategory) : productDetailData.box["basic-white-box"]);
  const fallbackReason = requestedData ? "" : (hasValidCategory ? "category" : "default");
  const isFallback = Boolean(fallbackReason);
  const safeReturnUrl = getSafeReturnUrl();

  const header = document.querySelector("[data-product-header]");
  const invalidNotice = document.querySelector("[data-product-invalid]");
  const breadcrumbCategory = document.querySelector("[data-product-breadcrumb-category]");
  const breadcrumbCurrent = document.querySelector("[data-product-breadcrumb-current]");
  const categoryLabel = document.querySelector("[data-product-category-label]");
  const badgesMount = document.querySelector("[data-product-badges]");
  const titleNode = document.querySelector("[data-product-title]");
  const subtitleNode = document.querySelector("[data-product-subtitle]");
  const descriptionNode = document.querySelector("[data-product-description]");
  const metaDescription = document.querySelector('meta[name="description"]');
  const noticeNode = document.querySelector("[data-product-notice]");
  const imageHolder = document.querySelector("[data-product-image-holder]");
  const imageNode = document.querySelector("[data-product-image]");
  const metaMount = document.querySelector("[data-product-meta]");
  const quoteLinks = document.querySelectorAll("[data-product-quote-link]");
  const categoryLink = document.querySelector("[data-product-category-link]");
  const optionSummaryMount = document.querySelector("[data-product-option-summary]");
  const useCasesMount = document.querySelector("[data-product-use-cases]");
  const checklistMount = document.querySelector("[data-product-checklist]");
  const printGuideNode = document.querySelector("[data-product-print-guide]");
  const printOptionsMount = document.querySelector("[data-product-print-options]");
  const cautionsMount = document.querySelector("[data-product-cautions]");
  const faqMount = document.querySelector("[data-product-faq]");
  const relatedMount = document.querySelector("[data-product-related]");
  const mobileSearchToggle = document.querySelector("[data-product-mobile-search-toggle]");
  const mobileSearch = document.querySelector("[data-product-mobile-search]");
  const searchForms = document.querySelectorAll(".pp-shop-search");

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function categoryHref(category) {
    return `category.html?category=${encodeURIComponent(category)}`;
  }

  function renderTags(items) {
    return items.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  }

  function bindImageFallbacks(root) {
    root.querySelectorAll("img").forEach((image) => {
      image.addEventListener("error", () => {
        const holder = image.closest("[data-product-image-holder], [data-related-image-holder]");
        if (holder) holder.classList.add("is-missing");
        image.remove();
      });
    });
  }

  function renderInvalidNotice() {
    if (!invalidNotice) return;
    if (!isFallback) {
      invalidNotice.hidden = true;
      invalidNotice.innerHTML = "";
      return;
    }

    const message = fallbackReason === "category"
      ? "요청한 상품 정보를 찾을 수 없어 해당 카테고리의 대표 상품을 보여드립니다."
      : "요청한 상품 정보를 찾을 수 없어 기본 상품을 보여드립니다.";
    const categoryName = categoryLabels[productData.category] || "상품";

    invalidNotice.hidden = false;
    invalidNotice.innerHTML = `
      <strong>${escapeHtml(message)}</strong>
      <a href="${escapeHtml(categoryHref(productData.category))}">${escapeHtml(categoryName)} 목록으로 돌아가기</a>
    `;
  }

  function renderHero() {
    const categoryName = categoryLabels[productData.category] || "상품";
    const categoryUrl = categoryHref(productData.category);
    const returnCategoryUrl = safeReturnUrl || categoryUrl;
    const quoteUrl = getQuoteHref(productData);

    if (breadcrumbCategory) {
      breadcrumbCategory.textContent = categoryName;
      breadcrumbCategory.href = categoryUrl;
    }
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = productData.title;
    if (categoryLabel) categoryLabel.textContent = categoryName;
    if (badgesMount) badgesMount.innerHTML = renderTags(productData.badges);
    if (titleNode) titleNode.textContent = productData.title;
    if (subtitleNode) subtitleNode.textContent = productData.subtitle;
    if (descriptionNode) descriptionNode.textContent = productData.description;
    if (noticeNode) noticeNode.textContent = productData.notice;
    if (imageNode) {
      imageNode.src = productData.image;
      imageNode.alt = productData.alt;
    }
    if (imageHolder) {
      imageHolder.dataset.fallbackLabel = `${productData.title} 이미지 준비중`;
      bindImageFallbacks(imageHolder);
    }
    quoteLinks.forEach((link) => {
      link.href = quoteUrl;
      link.setAttribute("aria-label", `${productData.title} 견적문의하기`);
    });
    if (categoryLink) {
      categoryLink.href = returnCategoryUrl;
      categoryLink.setAttribute("aria-label", `${categoryName} 카테고리로 돌아가기`);
    }

    document.title = `${productData.title} | 페르패키지`;
    if (metaDescription) {
      const description = `${productData.description} 수량, 사이즈, 인쇄 여부를 확인한 뒤 페르패키지 상담으로 이어갈 수 있습니다.`;
      metaDescription.setAttribute("content", description.slice(0, 155));
    }
  }

  function renderMeta() {
    if (!metaMount) return;
    const metaRows = [
      ["용도", productData.useCases.join(", ")],
      ["재질", productData.materials.join(", ")],
      ["인쇄", productData.printOptions.join(", ")],
    ];

    metaMount.innerHTML = metaRows.map(([label, value]) => `
      <div>
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>
    `).join("");
  }

  function renderOptionSummary() {
    if (!optionSummaryMount) return;
    const items = [
      ["사이즈", productData.optionSummary.size],
      ["수량", productData.optionSummary.quantity],
      ["인쇄", productData.optionSummary.print],
      ["재질", productData.optionSummary.material],
      ["납기", productData.optionSummary.delivery],
    ];

    optionSummaryMount.innerHTML = items.map(([label, value]) => `
      <article>
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </article>
    `).join("");
  }

  function renderChecklist() {
    if (!checklistMount) return;
    checklistMount.innerHTML = productData.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  function renderPrintGuide() {
    if (printGuideNode) printGuideNode.textContent = productData.printGuide;
    if (printOptionsMount) printOptionsMount.innerHTML = renderTags(productData.printOptions);
  }

  function renderCautions() {
    if (!cautionsMount) return;
    cautionsMount.innerHTML = commonCautions.map((item) => `<article>${escapeHtml(item)}</article>`).join("");
  }

  function renderFaq() {
    if (!faqMount) return;
    faqMount.innerHTML = productData.faq.map((item, index) => `
      <article class="pp-product-faq__item">
        <button type="button" aria-expanded="${index === 0 ? "true" : "false"}">
          <span>${escapeHtml(item.question)}</span>
          <span aria-hidden="true"></span>
        </button>
        <div class="pp-product-faq__answer" ${index === 0 ? "" : "hidden"}>
          <p>${escapeHtml(item.answer)}</p>
        </div>
      </article>
    `).join("");
  }

  function relatedHref(href) {
    if (!href || !href.startsWith("product.html")) return href;
    const url = new URL(href, window.location.href);
    url.searchParams.set("returnUrl", safeReturnUrl || categoryHref(productData.category));
    return `${url.pathname.split("/").pop()}?${url.searchParams.toString()}`;
  }

  function renderRelated() {
    if (!relatedMount) return;
    relatedMount.innerHTML = productData.relatedProducts.map((item) => `
      <a class="pp-product-related-card" href="${escapeHtml(relatedHref(item.href))}" aria-label="${escapeHtml(item.title)} 상세 보기">
        <span class="pp-product-related-card__image" data-related-image-holder data-fallback-label="${escapeHtml(item.title)} 이미지 준비중">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt)}" decoding="async">
        </span>
        <strong>${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(item.description)}</small>
      </a>
    `).join("");
    bindImageFallbacks(relatedMount);
  }

  function renderUseCases() {
    if (useCasesMount) useCasesMount.innerHTML = renderTags(productData.useCases);
  }

  function bindFaq() {
    if (!faqMount) return;
    faqMount.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      const item = button.closest(".pp-product-faq__item");
      const answer = item ? item.querySelector(".pp-product-faq__answer") : null;
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      if (answer) answer.hidden = expanded;
    });
  }

  function bindSearchForms() {
    searchForms.forEach((form) => {
      const input = form.querySelector('input[type="search"]');
      const submitButton = form.querySelector('button[type="submit"]');
      if (input) input.setAttribute("aria-label", input.getAttribute("aria-label") || "패키지 검색어");
      if (submitButton) submitButton.setAttribute("aria-label", "상품 검색");

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!input) return;
        const searchTerm = input.value.trim();
        if (!searchTerm) return;
        window.location.href = `category.html?search=${encodeURIComponent(searchTerm)}`;
      });
    });
  }

  function bindMobileSearch() {
    if (!mobileSearchToggle || !mobileSearch) return;
    mobileSearchToggle.addEventListener("click", () => {
      const expanded = mobileSearchToggle.getAttribute("aria-expanded") === "true";
      mobileSearchToggle.setAttribute("aria-expanded", String(!expanded));
      mobileSearch.classList.toggle("is-open", !expanded);
    });
  }

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 6);
  }

  renderInvalidNotice();
  renderHero();
  renderMeta();
  renderOptionSummary();
  renderUseCases();
  renderChecklist();
  renderPrintGuide();
  renderCautions();
  renderFaq();
  renderRelated();
  bindFaq();
  bindSearchForms();
  bindMobileSearch();
  setHeaderState();

  window.addEventListener("scroll", setHeaderState, { passive: true });
}());
