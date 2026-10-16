(function () {
  "use strict";

  var PROJECTS = [
    { id: "labelaudit", name: "LabelAudit", repo: "https://github.com/DevFrancisA/LabelAudit",
      demo: "https://DevFrancisA.github.io/LabelAudit/",
      blurb: "Finds the training labels most likely to be wrong, using confident learning and loss trajectories.",
      detail: "Upload your own CSV and audit it in the browser. Nothing leaves your machine.",
      topics: ["Machine learning", "Data tools"], stack: ["Python", "PyTorch", "scikit-learn", "TypeScript", "Web Workers"] },
    { id: "liftlab", name: "LiftLab", repo: "https://github.com/DevFrancisA/LiftLab",
      demo: "https://devfrancisa.github.io/LiftLab/",
      blurb: "An uplift modeling dashboard with audience exploration, experiments, and model evaluation views.",
      detail: "Runs on simulated mock data, not real customer data.",
      topics: ["Machine learning", "Web apps"], stack: ["React", "TypeScript", "Vite", "Python", "PyTorch", "scikit-learn"] },
    { id: "adsrank", name: "AdsRank", repo: "https://github.com/DevFrancisA/AdsRank",
      demo: "https://devfrancisa.github.io/AdsRank/",
      blurb: "A three-stage ad click-through ranking system: two-tower retrieval, a DeepFM ranker, and C++ serving.",
      detail: "Built on Criteo data. The demo walks through the full funnel in the browser.",
      topics: ["Machine learning", "Systems"], stack: ["Python", "C++", "PyTorch", "FAISS", "ONNX Runtime"] },
    { id: "dogarmor", name: "DogArmor", org: "DogArmor-Devs", repo: "https://github.com/DogArmor-Devs/dog-armor",
      demo: "https://dogarmor.up.railway.app",
      video: "https://cdn.jsdelivr.net/gh/DogArmor-Devs/dog-armor@main/docs/dogarmor-demo.mp4",
      blurb: "A dog breed classifier web app. I built the model and backend as part of a team.",
      detail: "EfficientNetV2-S served through ONNX Runtime, deployed on Railway.",
      topics: ["Machine learning", "Web apps"], stack: ["Python", "ONNX Runtime", "Flask", "Tailwind", "Docker"] },

    { id: "researchrag", name: "research-paper-rag", repo: "https://github.com/DevFrancisA/research-paper-rag",
      blurb: "Question answering over research papers with hybrid dense and BM25 search, reranking, and cited answers that refuse when the sources don't support one.",
      topics: ["Machine learning", "Backend"], stack: ["FastAPI", "Streamlit", "Qdrant", "PostgreSQL", "Inngest"] },
    { id: "diffsense", name: "DiffSense", repo: "https://github.com/DevFrancisA/diffsense",
      blurb: "An AI code review system that retrieves repository context before commenting on a diff.",
      topics: ["Machine learning", "Backend"], stack: ["TypeScript", "Node.js", "PostgreSQL", "pgvector", "Playwright", "Docker"] },
    { id: "payplan", name: "payplan", repo: "https://github.com/DevFrancisA/payplan",
      blurb: "A checkout and installment payment app with a sandbox flow that safely handles repeated requests.",
      topics: ["Web apps", "Backend"], stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Terraform", "AWS"] },
    { id: "releasewatch", name: "releasewatch", repo: "https://github.com/DevFrancisA/releasewatch",
      blurb: "Tracks deployments with signed webhooks, post-deploy health checks, and rollback history.",
      topics: ["Web apps", "Backend"], stack: ["FastAPI", "React", "PostgreSQL", "Docker", "pytest", "Playwright"] },
    { id: "degree", name: "DegreePrototype", org: "V3RT3X-Solutions", repo: "https://github.com/V3RT3X-Solutions/DegreePrototype",
      blurb: "Turns a UGA degree audit into an interactive course graph and a planner that finds the earliest graduation term.",
      detail: "Runs locally in one file and makes no network calls.",
      topics: ["Web apps"], stack: ["JavaScript", "SVG"] },
    { id: "review", name: "review-topic-embeddings", repo: "https://github.com/DevFrancisA/review-topic-embeddings",
      blurb: "Embeds product reviews, plots them with t-SNE, labels topics zero-shot, and searches for similar reviews.",
      topics: ["Machine learning", "Data tools"], stack: ["Python", "OpenAI embeddings", "ChromaDB", "t-SNE"] },
    { id: "toilets", name: "australian-public-toilets-sql", repo: "https://github.com/DevFrancisA/australian-public-toilets-sql",
      blurb: "A SQLite loader and 14 SQL queries over Australian public toilet data, with an interactive map.",
      topics: ["Data tools"], stack: ["SQL", "SQLite", "Python", "MapLibre"] },
    { id: "golden", name: "golden-cross-strategy", repo: "https://github.com/DevFrancisA/golden-cross-strategy",
      blurb: "Backtests a moving-average crossover strategy against buy-and-hold.",
      topics: ["Finance"], stack: ["Python", "pandas", "yfinance"] },
    { id: "equity", name: "equity-signal-backtest", repo: "https://github.com/DevFrancisA/equity-signal-backtest",
      blurb: "Backtests a random forest next-day direction signal on AAPL, MSFT, and GOOG.",
      topics: ["Finance", "Machine learning"], stack: ["Python", "scikit-learn", "pandas"] },
    { id: "corpus", name: "college-corpus-rag", repo: "https://github.com/DevFrancisA/college-corpus-rag",
      blurb: "An early retrieval-augmented generation experiment over a college document corpus.",
      topics: ["Machine learning"], stack: ["Python"] },
    { id: "jarvis", name: "personal-jarvis", repo: "https://github.com/DevFrancisA/personal-jarvis",
      blurb: "A personal assistant project.",
      topics: ["Other"], stack: [] },
    { id: "bunny", name: "Matts-Bunny-Overload", repo: "https://github.com/DevFrancisA/Matts-Bunny-Overload",
      blurb: "A Java game built with Gradle in 2024.",
      topics: ["Games"], stack: ["Java", "Gradle"] },
    { id: "kana", name: "Japanese-Learning-Program", repo: "https://github.com/DevFrancisA/Japanese-Learning-Program",
      blurb: "A kana study tool from 2024.",
      topics: ["Other"], stack: [] }
  ];

  var $ = function (id) { return document.getElementById(id); };
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "class") n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function link(href, text, cls) {
    return el("a", { href: href, text: text, "class": cls || "", rel: "noopener" });
  }
  function host(u) { return u.replace(/^https?:\/\//, "").replace(/\/$/, ""); }

  /* live demos */
  var demos = PROJECTS.filter(function (p) { return p.demo; });
  var counts = ["No", "One", "Two", "Three", "Four", "Five", "Six"];
  $("demo-count").textContent = (counts[demos.length] || demos.length) + " of these projects run live";
  var lede = $("demo-count").parentNode;
  lede.innerHTML = "";
  lede.appendChild(document.createTextNode("I'm a computer science student at the University of Georgia. " +
    (counts[demos.length] || demos.length) + " of these projects run live. Pick one and run it here."));

  var listEl = $("demo-list"), viewer = $("viewer");
  var current = null, mode = "live";

  function renderTabs() {
    listEl.innerHTML = "";
    demos.forEach(function (p) {
      var b = el("button", { type: "button", "class": "demo-tab", role: "tab", id: "tab-" + p.id,
        "aria-selected": String(current === p), "aria-controls": "viewer" }, [
        el("span", { "class": "t", text: p.name }),
        el("span", { "class": "d", text: p.blurb })
      ]);
      b.addEventListener("click", function () { select(p); });
      b.addEventListener("keydown", function (e) {
        var i = demos.indexOf(p), n = null;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") n = demos[(i + 1) % demos.length];
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = demos[(i - 1 + demos.length) % demos.length];
        if (n) { e.preventDefault(); select(n); $("tab-" + n.id).focus(); }
      });
      listEl.appendChild(b);
    });
  }

  function select(p) {
    current = p; mode = "live";
    renderTabs(); renderViewer(false);
  }

  function renderViewer(run) {
    viewer.innerHTML = "";
    viewer.setAttribute("role", "tabpanel");
    viewer.setAttribute("aria-labelledby", "tab-" + current.id);
    var p = current;

    var modes = el("div", { "class": "v-modes", role: "group", "aria-label": "View" });
    if (p.video) {
      [["live", "Live site"], ["video", "Video"]].forEach(function (m) {
        var b = el("button", { type: "button", "class": "mode", "aria-pressed": String(mode === m[0]), text: m[1] });
        b.addEventListener("click", function () { mode = m[0]; renderViewer(m[0] === "video"); });
        modes.appendChild(b);
      });
    }
    var bar = el("div", { "class": "v-bar" }, [
      el("span", { "class": "v-url", text: host(p.demo) }), modes,
      link(p.demo, "Open in new tab", "v-open"), link(p.repo, "Source on GitHub", "v-open")
    ]);
    bar.querySelectorAll("a.v-open").forEach(function (a) { a.target = "_blank"; });
    viewer.appendChild(bar);

    var stage = el("div", { "class": "v-stage" });
    if (mode === "video") {
      var v = el("video", { controls: "", preload: "metadata", src: p.video, "aria-label": p.name + " demo video" });
      stage.appendChild(v);
    } else if (run) {
      stage.appendChild(el("iframe", { src: p.demo, title: p.name + " live demo", loading: "lazy",
        allow: "clipboard-write", referrerpolicy: "no-referrer" }));
    } else {
      var idle = el("div", { "class": "v-idle" }, [
        el("h2", { text: p.name }),
        el("p", { text: p.blurb + (p.detail ? " " + p.detail : "") })
      ]);
      var run1 = el("button", { type: "button", "class": "btn", text: "Run the live demo" });
      run1.addEventListener("click", function () { renderViewer(true); });
      idle.appendChild(run1);
      idle.appendChild(el("p", { "class": "v-note", text: "If the demo doesn't load here, use Open in new tab." }));
      stage.appendChild(idle);
    }
    viewer.appendChild(stage);
  }

  /* all projects */
  var state = { topic: "All", q: "" };
  var topics = ["All"];
  PROJECTS.forEach(function (p) { p.topics.forEach(function (t) { if (topics.indexOf(t) < 0) topics.push(t); }); });

  function matches(p) {
    if (state.topic !== "All" && p.topics.indexOf(state.topic) < 0) return false;
    if (!state.q) return true;
    var hay = [p.name, p.org || "", p.blurb, p.detail || "", p.topics.join(" "), p.stack.join(" ")].join(" ").toLowerCase();
    return state.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; });
  }

  function renderChips() {
    var c = $("chips"); c.innerHTML = "";
    topics.forEach(function (t) {
      var n = PROJECTS.filter(function (p) { return t === "All" || p.topics.indexOf(t) >= 0; }).length;
      var b = el("button", { type: "button", "class": "chip", "aria-pressed": String(state.topic === t) }, [
        document.createTextNode(t), el("span", { "class": "n", text: String(n) })
      ]);
      b.addEventListener("click", function () { state.topic = t; renderChips(); renderList(); });
      c.appendChild(b);
    });
  }

  function renderList() {
    var ul = $("list"); ul.innerHTML = "";
    var shown = PROJECTS.filter(matches);
    shown.forEach(function (p) {
      var name = el("h3", { "class": "r-name" }, [document.createTextNode(p.name)]);
      if (p.org) name.appendChild(el("span", { "class": "r-org", text: p.org }));
      var left = el("div", {}, [name, el("p", { "class": "r-sum", text: p.blurb + (p.detail ? " " + p.detail : "") })]);
      if (p.stack.length) {
        var s = el("ul", { "class": "r-stack", "aria-label": "Built with" });
        p.stack.forEach(function (t) { s.appendChild(el("li", { text: t })); });
        left.appendChild(s);
      }
      var act = el("div", { "class": "r-act" });
      if (p.demo) {
        var d = el("button", { type: "button", "class": "btn", text: "View demo" });
        d.addEventListener("click", function () {
          select(p); renderViewer(true);
          $("viewer").scrollIntoView({ block: "start" });
        });
        act.appendChild(d);
      }
      act.appendChild(link(p.repo, "Source on GitHub"));
      ul.appendChild(el("li", { "class": "row" }, [left, act]));
    });
    $("count").textContent = shown.length + " of " + PROJECTS.length + " projects";
    var none = shown.length === 0;
    $("empty").hidden = !none;
    $("empty-q").textContent = state.q || state.topic;
  }

  $("q").addEventListener("input", function (e) { state.q = e.target.value.trim(); renderList(); });
  $("clear").addEventListener("click", function () {
    state.q = ""; state.topic = "All"; $("q").value = ""; renderChips(); renderList();
  });

  select(demos[0]);
  renderChips();
  renderList();
})();
