// ============================================================
// Performance-optimized Portfolio Script
// Strategy: Videos are NOT loaded until user interaction.
// IntersectionObserver only sets src when card is visible.
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

  // ─── 1. Scroll Reveal ───────────────────────────────────
  var revealItems = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("reveal-visible"); });
  } else {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("reveal-visible");
          revealIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    revealItems.forEach(function (el) { revealIO.observe(el); });
  }

  // ─── 0. Render Work Folders from videos.js ─────────────────
  function renderWorkFolders() {
    var grid = document.querySelector(".folders-grid-4");
    if (!grid) return;

    var videos = window.myWorkVideos || (typeof myWorkVideos !== "undefined" ? myWorkVideos : null);
    if (!videos || !videos.length) return;

    grid.innerHTML = videos.map(function (item, idx) {
      var folderLabel = item.folder || ("RightWay");
      var category = item.category || "reels";
      var src = item.src || "";
      var title = item.title || ("Video");
      var tag = item.tag || (category === "rightway" ? "Commercial Reel" : "Reel");
      var sub = item.subtitle || (category === "rightway" ? "Rightway Real Estate" : "Reel Project");
      var ig = item.instagram || item.ig || "";
      var tiktok = item.tiktok || "";

      var socialIconsHtml = "";
      if (ig || tiktok) {
        socialIconsHtml = '<div class="flex items-center gap-1 mr-1">';
        if (ig) {
          socialIconsHtml += '<a href="' + ig + '" target="_blank" rel="noopener noreferrer" class="folder-social-icon ig" title="Watch on Instagram" onclick="event.stopPropagation();">' +
            '<img src="ig_icon.jpg" alt="Instagram">' +
            '</a>';
        }
        if (tiktok) {
          socialIconsHtml += '<a href="' + tiktok + '" target="_blank" rel="noopener noreferrer" class="folder-social-icon tiktok" title="Watch on TikTok" onclick="event.stopPropagation();">' +
            '<img src="tiktok_logo.jpg" alt="TikTok">' +
            '</a>';
        }
        socialIconsHtml += '</div>';
      }

      return '<div class="folder-card" data-category="' + category + '" data-video-src="' + src + '"' +
        ' data-video-title="' + title + '" data-video-tag="' + tag + '"' +
        ' data-video-instagram="' + ig + '" data-video-tiktok="' + tiktok + '">' +
        '<div class="folder-tab-bar">' +
        '  <div class="folder-tab">' +
        '    <svg class="folder-icon" viewBox="0 0 24 24" fill="currentColor">' +
        '      <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-1.5V9a3 3 0 0 0-3-3h-3.379a3 3 0 0 1-2.121-.879L8.379 4.04A3 3 0 0 0 6.257 3.16H4.5A3 3 0 0 0 1.5 6.16v11.84a3 3 0 0 0 3 3h15Z" />' +
        '    </svg>' +
        '    <span>' + folderLabel + '</span>' +
        '  </div>' +
        '  <span class="folder-tag">MP4</span>' +
        '</div>' +
        '<div class="folder-sleeve">' +
        '  <div class="folder-cover">' +
        '    <video class="folder-video" preload="none" muted playsinline loop>' +
        '      <source src="' + src + '" type="video/mp4">' +
        '    </video>' +
        '    <div class="folder-cover-overlay">' +
        '      <div class="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/80">' +
        '        <span class="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">MP4</span>' +
        '        <span class="bg-primary/90 text-primary-foreground font-semibold px-2 py-0.5 rounded">HD</span>' +
        '      </div>' +
        '      <div>' +
        '        <span class="text-xs font-mono uppercase tracking-wider text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">' + tag + '</span>' +
        '      </div>' +
        '    </div>' +
        '    <div class="folder-play-center">' +
        '      <div class="folder-play-btn" title="Open Folder Video">' +
        '        <svg class="size-5 ml-0.5 fill-current" viewBox="0 0 24 24">' +
        '          <polygon points="6 4 20 12 6 20 6 4"></polygon>' +
        '        </svg>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '  <div class="folder-meta">' +
        '    <div class="min-w-0 flex-1">' +
        '      <div class="folder-meta-title" title="' + title + '">' + title + '</div>' +
        '      <div class="folder-meta-sub">' +
        '        <span class="size-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"></span>' +
        '        <span class="truncate">' + sub + '</span>' +
        '      </div>' +
        '    </div>' +
        '    <div class="flex items-center gap-1">' +
        socialIconsHtml +
        '    </div>' +
        '  </div>' +
        '</div>' +
        '</div>';
    }).join("\n");

    // Dynamic Filter Button Counters
    var allCount = videos.length;
    var rwCount = videos.filter(function (v) { return v.category === "rightway"; }).length;
    var reelCount = videos.filter(function (v) { return v.category === "reels"; }).length;

    var allBtn = document.querySelector('.work-filter-btn[data-filter="all"]');
    var rwBtn = document.querySelector('.work-filter-btn[data-filter="rightway"]');
    var reelBtn = document.querySelector('.work-filter-btn[data-filter="reels"]');

    if (allBtn) allBtn.textContent = "All Videos (" + allCount + ")";
    if (rwBtn) rwBtn.textContent = "Rightway Real Estate (" + rwCount + ")";
    if (reelBtn) reelBtn.textContent = "Reel Projects (" + reelCount + ")";
  }

  renderWorkFolders();

  // ─── 2. Lazy Video Loading  ──────────────────────────────
  // Videos only get their src assigned when the card scrolls
  // into view (near the viewport). Before that, zero bytes downloaded.
  var folderCards = document.querySelectorAll(".folder-card");

  function loadVideoSrc(card) {
    var video = card.querySelector("video");
    if (!video) return;
    var source = video.querySelector("source");
    if (!source) return;
    // Already loaded
    if (video.dataset.loaded) return;
    video.dataset.loaded = "1";
    // Stop CSS shimmer once a frame is ready
    video.addEventListener("loadedmetadata", function () {
      video.setAttribute("data-loaded", "1");
    }, { once: true });
    // Set preload to metadata only when near viewport
    video.preload = "metadata";
    // Trigger load
    video.load();
  }

  if ("IntersectionObserver" in window) {
    var lazyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          loadVideoSrc(e.target);
          lazyIO.unobserve(e.target);
        }
      });
    }, {
      // Start loading when card is 200px away from viewport
      rootMargin: "200px 0px"
    });
    folderCards.forEach(function (card) { lazyIO.observe(card); });
  } else {
    // Fallback: load all immediately
    folderCards.forEach(loadVideoSrc);
  }

  // ─── 3. Hover Preview ───────────────────────────────────
  folderCards.forEach(function (card) {
    var video = card.querySelector("video");
    if (!video) return;

    card.addEventListener("mouseenter", function () {
      // Ensure src is loaded before playing
      if (!video.dataset.loaded) { loadVideoSrc(card); }
      video.muted = true;
      var p = video.play();
      if (p) p.catch(function () { });
    });

    card.addEventListener("mouseleave", function () {
      video.pause();
      try { video.currentTime = 0; } catch (e) { }
    });
  });

  // ─── 4.  Category Filter ─────────────────────────────────
  var filterBtns = document.querySelectorAll(".work-filter-btn");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var filter = btn.getAttribute("data-filter");
      folderCards.forEach(function (card) {
        var cat = card.getAttribute("data-category");
        card.style.display = (filter === "all" || cat === filter) ? "flex" : "none";
      });
    });
  });

  // ─── 5. Theater Lightbox Modal ───────────────────────────
  var modal = document.getElementById("reelModal");
  var modalVideo = document.getElementById("modalVideo");
  var modalTitle = document.getElementById("modalTitle");
  var modalTag = document.getElementById("modalTag");
  var modalClose = document.getElementById("modalClose");
  var modalPrev = document.getElementById("modalPrev");
  var modalNext = document.getElementById("modalNext");

  var currentList = [];
  var currentIndex = 0;

  function getVisibleCards() {
    return Array.from(folderCards).filter(function (c) {
      return c.style.display !== "none";
    });
  }

  function openModal(index) {
    currentList = getVisibleCards();
    if (!currentList.length) return;
    if (index < 0) index = currentList.length - 1;
    if (index >= currentList.length) index = 0;
    currentIndex = index;

    var card = currentList[currentIndex];
    var src = card.getAttribute("data-video-src");
    var title = card.getAttribute("data-video-title") || "Featured Reel";
    var tag = card.getAttribute("data-video-tag") || "Reel Edit";

    modalTitle.textContent = title;
    modalTag.textContent = tag;
    modalVideo.src = src;
    modalVideo.muted = false;
    modalVideo.volume = 1.0;

    var instagram = card.getAttribute("data-video-instagram") || "";
    var tiktok = card.getAttribute("data-video-tiktok") || "";
    var modalIg = document.getElementById("modalIgLink");
    var modalTiktok = document.getElementById("modalTiktokLink");

    if (modalIg) {
      if (instagram && instagram.trim() !== "") {
        modalIg.href = instagram;
        modalIg.style.display = "inline-flex";
      } else {
        modalIg.style.display = "none";
        modalIg.href = "#";
      }
    }

    if (modalTiktok) {
      if (tiktok && tiktok.trim() !== "") {
        modalTiktok.href = tiktok;
        modalTiktok.style.display = "inline-flex";
      } else {
        modalTiktok.style.display = "none";
        modalTiktok.href = "#";
      }
    }

    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    var p = modalVideo.play();
    if (p) {
      p.catch(function () {
        modalVideo.muted = true;
        modalVideo.play().catch(function () { });
      });
    }
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    modalVideo.pause();
    modalVideo.src = "";

    var modalIg = document.getElementById("modalIgLink");
    var modalTiktok = document.getElementById("modalTiktokLink");
    if (modalIg) { modalIg.style.display = "none"; modalIg.href = "#"; }
    if (modalTiktok) { modalTiktok.style.display = "none"; modalTiktok.href = "#"; }
  }

  folderCards.forEach(function (card) {
    card.addEventListener("click", function () {
      currentList = getVisibleCards();
      var idx = currentList.indexOf(card);
      if (idx !== -1) openModal(idx);
    });
  });

  if (modalClose) modalClose.addEventListener("click", function (e) { e.stopPropagation(); closeModal(); });
  if (modalPrev) modalPrev.addEventListener("click", function (e) { e.stopPropagation(); openModal(currentIndex - 1); });
  if (modalNext) modalNext.addEventListener("click", function (e) { e.stopPropagation(); openModal(currentIndex + 1); });
  if (modal) modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });

  document.addEventListener("keydown", function (e) {
    if (!modal || !modal.classList.contains("open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") openModal(currentIndex - 1);
    if (e.key === "ArrowRight") openModal(currentIndex + 1);
  });

  // ─── 6. Insight Proof Photos Filter & Lightbox ───────────
  var insightFilterBtns = document.querySelectorAll(".insight-filter-btn");
  var insightCards = document.querySelectorAll(".insight-photo-card");

  insightFilterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      insightFilterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var filter = btn.getAttribute("data-insight-filter");
      insightCards.forEach(function (card) {
        var cat = card.getAttribute("data-insight-cat");
        card.style.display = (filter === "all" || cat === filter) ? "flex" : "none";
      });
    });
  });

  var insightModal = document.getElementById("insightPhotoModal");
  var insightModalImg = document.getElementById("insightModalImg");
  var insightModalTitle = document.getElementById("insightModalTitle");
  var insightModalDesc = document.getElementById("insightModalDesc");
  var insightModalClose = document.getElementById("insightModalClose");
  var insightModalPrev = document.getElementById("insightModalPrev");
  var insightModalNext = document.getElementById("insightModalNext");

  var currentInsightList = [];
  var currentInsightIndex = 0;

  function getVisibleInsightCards() {
    return Array.from(insightCards).filter(function (c) {
      return c.style.display !== "none";
    });
  }

  function openInsightModal(index) {
    currentInsightList = getVisibleInsightCards();
    if (!currentInsightList.length) return;
    if (index < 0) index = currentInsightList.length - 1;
    if (index >= currentInsightList.length) index = 0;
    currentInsightIndex = index;

    var card = currentInsightList[currentInsightIndex];
    var imgSrc = card.getAttribute("data-full-img");
    var caption = card.getAttribute("data-caption") || "Analytics Proof";
    var cat = card.getAttribute("data-insight-cat") || "social";

    if (insightModalTitle) insightModalTitle.textContent = caption;
    if (insightModalDesc) insightModalDesc.textContent = cat.toUpperCase() + " VERIFIED BACKEND DASHBOARD PROOF";
    if (insightModalImg) insightModalImg.src = imgSrc;

    if (insightModal) {
      insightModal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeInsightModal() {
    if (!insightModal) return;
    insightModal.classList.remove("open");
    document.body.style.overflow = "";
    if (insightModalImg) insightModalImg.src = "";
  }

  insightCards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      currentInsightList = getVisibleInsightCards();
      var idx = currentInsightList.indexOf(card);
      if (idx !== -1) openInsightModal(idx);
    });

    var zoomBtn = card.querySelector(".insight-zoom-btn");
    if (zoomBtn) {
      zoomBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        currentInsightList = getVisibleInsightCards();
        var idx = currentInsightList.indexOf(card);
        if (idx !== -1) openInsightModal(idx);
      });
    }
  });

  if (insightModalClose) insightModalClose.addEventListener("click", function (e) { e.stopPropagation(); closeInsightModal(); });
  if (insightModalPrev) insightModalPrev.addEventListener("click", function (e) { e.stopPropagation(); openInsightModal(currentInsightIndex - 1); });
  if (insightModalNext) insightModalNext.addEventListener("click", function (e) { e.stopPropagation(); openInsightModal(currentInsightIndex + 1); });
  if (insightModal) insightModal.addEventListener("click", function (e) { if (e.target === insightModal) closeInsightModal(); });

  document.addEventListener("keydown", function (e) {
    if (insightModal && insightModal.classList.contains("open")) {
      if (e.key === "Escape") closeInsightModal();
      if (e.key === "ArrowLeft") openInsightModal(currentInsightIndex - 1);
      if (e.key === "ArrowRight") openInsightModal(currentInsightIndex + 1);
    }
  });
});
