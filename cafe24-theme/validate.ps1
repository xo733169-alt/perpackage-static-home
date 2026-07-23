$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$required = @(
  "layout/basic/layout.html",
  "layout/basic/main.html",
  "_wg/perpackage/header.html",
  "_wg/perpackage/footer.html",
  "_wg/perpackage/quick-menu.html",
  "_wg/perpackage/product-card.html",
  "css/perpackage/theme.css",
  "css/perpackage/main.css",
  "css/perpackage/product-list.css",
  "css/perpackage/content.css",
  "js/perpackage/config.js",
  "js/perpackage/common.js",
  "js/perpackage/category.js",
  "js/perpackage/main.js",
  "index.html",
  "product/list.html",
  "custom/support.html",
  "custom/faq.html",
  "custom/guide-production.html",
  "custom/guide-design.html",
  "custom/guide-caution.html",
  "_wg/perpackage/pages/support.html",
  "_wg/perpackage/pages/faq.html",
  "_wg/perpackage/pages/guide-production.html",
  "_wg/perpackage/pages/guide-design.html",
  "_wg/perpackage/pages/guide-caution.html",
  "preview/index.html",
  "preview/category.html",
  "preview/content.html",
  "preview/deploy-index.html",
  "preview/deploy-category.html",
  "preview/deploy-content.html",
  "preview/preview.css",
  "preview/preview.js",
  "vercel.json"
)

$errors = New-Object System.Collections.Generic.List[string]

foreach ($relativePath in $required) {
  $path = Join-Path $root $relativePath
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
    $errors.Add("필수 파일 누락: $relativePath")
  }
}

foreach ($layoutName in @("layout/basic/layout.html", "layout/basic/main.html")) {
  $layoutPath = Join-Path $root $layoutName
  if (Test-Path -LiteralPath $layoutPath) {
    $layout = Get-Content -LiteralPath $layoutPath -Raw -Encoding UTF8
    foreach ($marker in @("<!--@contents-->", "header.html", "footer.html", "quick-menu.html")) {
      if (-not $layout.Contains($marker)) {
        $errors.Add("$layoutName 필수 선언 누락: $marker")
      }
    }
  }
}

$pageFiles = @(
  "index.html",
  "product/list.html",
  "custom/support.html",
  "custom/faq.html",
  "custom/guide-production.html",
  "custom/guide-design.html",
  "custom/guide-caution.html"
)

foreach ($pageName in $pageFiles) {
  $pagePath = Join-Path $root $pageName
  if (-not (Test-Path -LiteralPath $pagePath)) { continue }
  $page = Get-Content -LiteralPath $pagePath -Raw -Encoding UTF8
  if (-not $page.Contains("<!--@layout(")) {
    $errors.Add("$pageName 레이아웃 선언 누락")
  }
}

$productListPath = Join-Path $root "product/list.html"
if (Test-Path -LiteralPath $productListPath) {
  $productList = Get-Content -LiteralPath $productListPath -Raw -Encoding UTF8
  foreach ($marker in @("/js/perpackage/category.js", "data-pp-category-hero", "data-pp-category-title", "data-pp-category-track", "data-pp-category-product-title", "pp-category-products", 'module="product_displaycategory"', 'module="product_listnormal"')) {
    if (-not $productList.Contains($marker)) {
      $errors.Add("product/list.html 롤링배너 필수 선언 누락: $marker")
    }
  }

  foreach ($removedMarker in @("data-pp-category-profile-title", "pp-cafe24-category-help", "category-content/folding-carton")) {
    if ($productList.Contains($removedMarker)) {
      $errors.Add("product/list.html 제거 대상 정적 안내 영역이 남아 있습니다: $removedMarker")
    }
  }
}

$themeCss = Get-Content -LiteralPath (Join-Path $root "css/perpackage/theme.css") -Raw -Encoding UTF8
$unsafeSelectors = [regex]::Matches($themeCss, "(?m)^\s*(\*|html|body|a|img|button|input|select|textarea)\s*\{")
if ($unsafeSelectors.Count -gt 0) {
  $errors.Add("theme.css에 범위 없는 전역 선택자가 있습니다.")
}

$vercelPath = Join-Path $root "vercel.json"
if (Test-Path -LiteralPath $vercelPath) {
  try {
    $vercelConfig = Get-Content -LiteralPath $vercelPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $rewriteSources = @($vercelConfig.rewrites | ForEach-Object { $_.source })
    foreach ($route in @("/", "/index.html", "/category.html", "/guide-production.html", "/guide-design.html", "/guide-caution.html", "/faq.html", "/support.html")) {
      if ($rewriteSources -notcontains $route) {
        $errors.Add("vercel.json 검수 라우트 누락: $route")
      }
    }
  } catch {
    $errors.Add("vercel.json 구문 오류")
  }
}

$jsStatus = "정상"
$nodePath = $null
$node = Get-Command node.exe -ErrorAction SilentlyContinue
if ($node) {
  $nodePath = $node.Source
} else {
  $nodeCandidates = @(
    "C:\Program Files\nodejs\node.exe",
    (Join-Path $env:USERPROFILE ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe")
  )
  $nodePath = $nodeCandidates | Where-Object { Test-Path -LiteralPath $_ -PathType Leaf } | Select-Object -First 1
}

if ($nodePath) {
  foreach ($scriptName in @("js/perpackage/config.js", "js/perpackage/common.js", "js/perpackage/category.js", "js/perpackage/main.js", "preview/preview.js")) {
    $scriptPath = Join-Path $root $scriptName
    & $nodePath --check $scriptPath
    if ($LASTEXITCODE -ne 0) {
      $errors.Add("JavaScript 구문 오류: $scriptName")
    }
  }
} else {
  $jsStatus = "건너뜀(Node.js 없음)"
  Write-Warning "Node.js를 찾지 못해 JavaScript 구문 검사를 건너뜁니다."
}

if ($errors.Count -gt 0) {
  Write-Host "Cafe24 테마 검증 실패" -ForegroundColor Red
  $errors | ForEach-Object { Write-Host "- $_" -ForegroundColor Red }
  exit 1
}

Write-Host "Cafe24 테마 검증 통과" -ForegroundColor Green
Write-Host "필수 파일: $($required.Count)개"
Write-Host "페이지 레이아웃 선언: $($pageFiles.Count)개"
Write-Host "JavaScript 구문: $jsStatus"
Write-Host "Vercel 검수 라우트: 정상"
Write-Host "상품분류 롤링배너 선언: 정상"
Write-Host "범위 없는 전역 CSS 선택자: 없음"
