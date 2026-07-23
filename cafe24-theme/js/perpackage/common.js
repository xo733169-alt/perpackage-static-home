(function (window, document) {
  "use strict";

  function each(nodes, callback) {
    Array.prototype.forEach.call(nodes || [], callback);
  }

  function setExpanded(button, expanded) {
    if (!button) return;
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
  }

  function setHeaderState(header) {
    if (!header) return;
    if (window.pageYOffset > 6) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }

  function bindNavigation(site) {
    var menuButton = site.querySelector("[data-pp-menu-toggle]");
    var navigation = site.querySelector("[data-pp-navigation]");
    var searchButton = site.querySelector("[data-pp-search-toggle]");
    var mobileSearch = site.querySelector("[data-pp-mobile-search]");

    if (menuButton && navigation && menuButton.getAttribute("data-pp-bound") !== "true") {
      menuButton.setAttribute("data-pp-bound", "true");
      menuButton.addEventListener("click", function () {
        var open = !navigation.classList.contains("is-open");
        navigation.classList.toggle("is-open", open);
        menuButton.classList.toggle("is-active", open);
        setExpanded(menuButton, open);
        if (open && mobileSearch) {
          mobileSearch.classList.remove("is-open");
          setExpanded(searchButton, false);
        }
      });
    }

    if (searchButton && mobileSearch && searchButton.getAttribute("data-pp-bound") !== "true") {
      searchButton.setAttribute("data-pp-bound", "true");
      searchButton.addEventListener("click", function () {
        var open = !mobileSearch.classList.contains("is-open");
        mobileSearch.classList.toggle("is-open", open);
        setExpanded(searchButton, open);
        if (open && navigation) {
          navigation.classList.remove("is-open");
          if (menuButton) menuButton.classList.remove("is-active");
          setExpanded(menuButton, false);
        }

        if (open) {
          var input = mobileSearch.querySelector("input[type='text'], input[type='search']");
          if (input) input.focus();
        }
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (navigation) navigation.classList.remove("is-open");
      if (menuButton) {
        menuButton.classList.remove("is-active");
        setExpanded(menuButton, false);
      }
      if (mobileSearch) mobileSearch.classList.remove("is-open");
      if (searchButton) setExpanded(searchButton, false);
    });
  }

  function bindScrollTop(site) {
    each(site.querySelectorAll("[data-pp-scroll-top]"), function (button) {
      if (button.getAttribute("data-pp-bound") === "true") return;
      button.setAttribute("data-pp-bound", "true");
      button.addEventListener("click", function () {
        try {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } catch (error) {
          window.scrollTo(0, 0);
        }
      });
    });
  }

  function initSearchPlaceholder(site) {
    var placeholder = "선물용 박스";

    each(site.querySelectorAll(".pp-cafe24-search input[type='text'], .pp-cafe24-search input[type='search']"), function (input) {
      input.setAttribute("placeholder", placeholder);
      if (input.getAttribute("data-pp-placeholder-bound") === "true") return;

      input.setAttribute("data-pp-placeholder-bound", "true");
      input.addEventListener("focus", function () {
        input.setAttribute("placeholder", "");
      });
      input.addEventListener("blur", function () {
        if (!input.value.trim()) input.setAttribute("placeholder", placeholder);
      });
    });
  }

  function markCurrentCategory(site, config) {
    var current = config.getCurrentCategoryNumber();
    if (!current) return;

    each(site.querySelectorAll(".pp-cafe24-category-nav a"), function (link) {
      var href = link.getAttribute("href") || "";
      var match = href.match(/[?&]cate_no=([^&]+)/);
      if (match && decodeURIComponent(match[1]) === current) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function buildCategoryAllMenu(site) {
    var sourceList = site.querySelector(".pp-cafe24-category-nav__list--db");
    var targetGrid = site.querySelector("[data-pp-category-all-grid]");
    if (!sourceList || !targetGrid || targetGrid.dataset.ppCafe24CategoryDb === "true") return;

    function getDirectLink(item) {
      var children = item.children || [];
      for (var index = 0; index < children.length; index += 1) {
        if (children[index].tagName === "A") return children[index];
      }
      return null;
    }

    function render() {
      var items = [];
      each(sourceList.children, function (item) {
        if (item.tagName !== "LI") return;
        var categoryLink = getDirectLink(item);
        if (!categoryLink) return;
        items.push({ item: item, link: categoryLink });
      });

      targetGrid.innerHTML = "";
      each(items, function (entry) {
        var section = document.createElement("section");
        var heading = document.createElement("h2");
        heading.appendChild(entry.link.cloneNode(true));
        section.appendChild(heading);

        each(entry.item.querySelectorAll(".sub-category a"), function (childLink) {
          section.appendChild(childLink.cloneNode(true));
        });

        targetGrid.appendChild(section);
      });
    }

    render();

    if (window.MutationObserver && sourceList.getAttribute("data-pp-category-observed") !== "true") {
      sourceList.setAttribute("data-pp-category-observed", "true");
      new window.MutationObserver(render).observe(sourceList, { childList: true, subtree: true });
    }
  }

  function init() {
    var site = document.querySelector("[data-pp-site]");
    var config = window.PP_CAFE24_CONFIG;
    if (!site || !config || site.getAttribute("data-pp-initialized") === "true") return;

    site.setAttribute("data-pp-initialized", "true");
    config.applyLinks(site);
    bindNavigation(site);
    initSearchPlaceholder(site);
    bindScrollTop(site);
    buildCategoryAllMenu(site);
    markCurrentCategory(site, config);

    var header = site.querySelector("[data-pp-header]");
    setHeaderState(header);
    window.addEventListener("scroll", function () {
      setHeaderState(header);
    }, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})(window, document);
