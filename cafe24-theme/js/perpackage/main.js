(function (window, document) {
  "use strict";

  function initMainSlider(root) {
    var slider = root.querySelector("[data-pp-main-slider]");
    if (!slider || slider.getAttribute("data-pp-bound") === "true") return;

    var track = slider.querySelector("[data-pp-main-track]");
    var slides = track ? Array.prototype.slice.call(track.querySelectorAll(".pp-main-banner")) : [];
    var prev = slider.querySelector("[data-pp-main-prev]");
    var next = slider.querySelector("[data-pp-main-next]");
    var tabs = slider.querySelector("[data-pp-main-tabs]");
    var pause = slider.querySelector("[data-pp-main-pause]");
    var index = 0;
    var timer = null;
    var scrollTimer = null;
    var isProgrammaticMove = false;
    var leadingClone = null;
    var trailingClone = null;
    var userPaused = false;
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!track || !slides.length) return;
    slider.setAttribute("data-pp-bound", "true");

    function getSlideOffset(slide) {
      return slide.offsetLeft - track.offsetLeft;
    }

    function resetToOriginalSlide(slideIndex) {
      var originalSlide = slides[slideIndex];
      if (!originalSlide) return;
      track.classList.add("is-resetting");
      track.scrollLeft = getSlideOffset(originalSlide);
      void track.offsetWidth;
      track.classList.remove("is-resetting");
    }

    function createLoopClones() {
      if (slides.length < 2) return;
      leadingClone = slides[slides.length - 1].cloneNode(true);
      trailingClone = slides[0].cloneNode(true);
      leadingClone.setAttribute("data-pp-main-clone", "last");
      trailingClone.setAttribute("data-pp-main-clone", "first");
      leadingClone.setAttribute("aria-hidden", "true");
      trailingClone.setAttribute("aria-hidden", "true");
      leadingClone.setAttribute("tabindex", "-1");
      trailingClone.setAttribute("tabindex", "-1");
      track.insertBefore(leadingClone, slides[0]);
      track.appendChild(trailingClone);
      resetToOriginalSlide(0);
    }

    function createTabs() {
      if (!tabs) return;
      tabs.innerHTML = "";
      Array.prototype.forEach.call(slides, function (slide, slideIndex) {
        var label = slide.getAttribute("data-pp-banner-label") || (slideIndex + 1) + "번 배너";
        var button = document.createElement("button");
        button.type = "button";
        button.className = "pp-main-slider__tab";
        button.setAttribute("role", "tab");
        button.setAttribute("aria-label", label + " 배너 보기");
        button.setAttribute("aria-selected", "false");
        button.setAttribute("data-pp-main-tab", String(slideIndex));
        var labelText = document.createElement("span");
        labelText.textContent = label;
        button.appendChild(labelText);
        button.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopImmediatePropagation();
          moveTo(slideIndex, true);
        }, true);
        tabs.appendChild(button);
      });
    }

    function updateTabs() {
      if (!tabs) return;
      var buttons = tabs.querySelectorAll("[data-pp-main-tab]");
      Array.prototype.forEach.call(buttons, function (button, buttonIndex) {
        button.classList.remove("is-active");
        button.setAttribute("aria-selected", "false");
        if (buttonIndex === index) {
          void button.offsetWidth;
          button.classList.add("is-active");
          button.setAttribute("aria-selected", "true");
        }
      });
    }

    function stopTimer() {
      if (!timer) return;
      window.clearTimeout(timer);
      timer = null;
    }

    function startTimer() {
      stopTimer();
      if (reducedMotion || userPaused || slides.length < 2) return;
      timer = window.setTimeout(function () {
        moveTo(index + 1, true);
      }, 5200);
    }

    function clearScrollTimer() {
      if (!scrollTimer) return;
      window.clearTimeout(scrollTimer);
      scrollTimer = null;
    }

    function animateBanner(slide, direction) {
      if (!slide || !direction || reducedMotion) return;
      Array.prototype.forEach.call(track.querySelectorAll(".pp-main-banner"), function (item) {
        item.classList.remove("is-entering-next", "is-entering-prev");
      });
      void slide.offsetWidth;
      slide.classList.add(direction > 0 ? "is-entering-next" : "is-entering-prev");
    }

    function updatePauseButton() {
      if (!pause) return;
      var icon = pause.querySelector("span");
      pause.setAttribute("aria-pressed", userPaused ? "true" : "false");
      pause.setAttribute("aria-label", userPaused ? "배너 자동 전환 재생" : "배너 자동 전환 일시정지");
      pause.setAttribute("title", userPaused ? "배너 자동 전환 재생" : "배너 자동 전환 일시정지");
      if (icon) icon.textContent = userPaused ? "▶" : "Ⅱ";
    }

    function moveTo(nextIndex, restartTimer) {
      var previousIndex = index;
      index = (nextIndex + slides.length) % slides.length;
      var direction = index === previousIndex ? 0 : (index > previousIndex ? 1 : -1);
      if (Math.abs(index - previousIndex) > slides.length / 2) direction *= -1;
      var isWrappingForward = previousIndex === slides.length - 1 && index === 0;
      var isWrappingBackward = previousIndex === 0 && index === slides.length - 1;
      var slide = isWrappingForward ? trailingClone : (isWrappingBackward ? leadingClone : slides[index]);
      var left = getSlideOffset(slide);
      stopTimer();
      clearScrollTimer();
      isProgrammaticMove = true;
      try {
        track.scrollTo({ left: left, behavior: "smooth" });
      } catch (error) {
        track.scrollLeft = left;
      }
      updateTabs();
      animateBanner(slide, direction);
      scrollTimer = window.setTimeout(function () {
        if (isWrappingForward || isWrappingBackward) resetToOriginalSlide(index);
        isProgrammaticMove = false;
        if (restartTimer) startTimer();
      }, reducedMotion ? 0 : 820);
    }

    if (prev) prev.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      moveTo(index - 1, true);
    }, true);
    if (next) next.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      moveTo(index + 1, true);
    }, true);
    if (pause) pause.addEventListener("click", function () {
      userPaused = !userPaused;
      updatePauseButton();
      if (userPaused) stopTimer(); else startTimer();
    });

    track.addEventListener("scroll", function () {
      if (isProgrammaticMove) return;
      clearScrollTimer();
      scrollTimer = window.setTimeout(function () {
        var nearest = 0;
        var distance = Infinity;
        Array.prototype.forEach.call(slides, function (slide, slideIndex) {
          var slideDistance = Math.abs((slide.offsetLeft - track.offsetLeft) - track.scrollLeft);
          if (slideDistance < distance) {
            distance = slideDistance;
            nearest = slideIndex;
          }
        });
        if (nearest !== index) {
          index = nearest;
          updateTabs();
          startTimer();
        }
      }, 120);
    }, { passive: true });

    createLoopClones();
    createTabs();
    updateTabs();
    updatePauseButton();
    startTimer();
  }

  function init() {
    var root = document.querySelector("[data-pp-main]");
    if (!root) return;
    initMainSlider(root);
    if (window.PP_CAFE24_CONFIG) window.PP_CAFE24_CONFIG.applyLinks(root);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})(window, document);
