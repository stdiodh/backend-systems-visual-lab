(function () {
  const chapters = window.labChapters || [];
  const scenarios = window.labScenarios || {};
  const glossary = window.labGlossary || {};

  const state = {
    selectedChapterId: "02-performance-triage"
  };

  const selectors = {
    terminalLines: document.querySelector("#terminal-lines"),
    heroMiniRail: document.querySelector("#hero-mini-rail"),
    heroIncidentCue: document.querySelector("#hero-incident-cue"),
    goalSteps: document.querySelector("#goal-steps"),
    rail: document.querySelector("#chapter-rail"),
    category: document.querySelector("#selected-category"),
    title: document.querySelector("#selected-title"),
    subtitle: document.querySelector("#selected-subtitle"),
    incident: document.querySelector("#incident-panel"),
    observations: document.querySelector("#observation-list"),
    metrics: document.querySelector("#metric-grid"),
    systemMap: document.querySelector("#system-map"),
    specialPanels: document.querySelector("#special-panels"),
    flow: document.querySelector("#flow-explorer"),
    checklist: document.querySelector("#checklist-panel"),
    causes: document.querySelector("#cause-stack"),
    decisions: document.querySelector("#decision-panel"),
    concepts: document.querySelector("#concept-grid"),
    nextQuestion: document.querySelector("#next-question")
  };

  const requiredSelectors = {
    terminalLines: "#terminal-lines",
    heroMiniRail: "#hero-mini-rail",
    heroIncidentCue: "#hero-incident-cue",
    goalSteps: "#goal-steps",
    rail: "#chapter-rail",
    category: "#selected-category",
    title: "#selected-title",
    subtitle: "#selected-subtitle",
    incident: "#incident-panel",
    observations: "#observation-list",
    metrics: "#metric-grid",
    systemMap: "#system-map",
    specialPanels: "#special-panels",
    flow: "#flow-explorer",
    checklist: "#checklist-panel",
    causes: "#cause-stack",
    decisions: "#decision-panel",
    concepts: "#concept-grid",
    nextQuestion: "#next-question"
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getMissingSelectors() {
    return Object.entries(requiredSelectors)
      .filter(([key]) => !selectors[key])
      .map(([, selector]) => selector);
  }

  function canRender() {
    const missingSelectors = getMissingSelectors();

    if (missingSelectors.length > 0) {
      console.warn(
        "Backend Systems Visual Lab: missing required DOM selectors",
        missingSelectors
      );
      return false;
    }

    if (chapters.length === 0) {
      console.warn("Backend Systems Visual Lab: no chapter data found");
      return false;
    }

    return true;
  }

  function getChapter(id) {
    return chapters.find((chapter) => chapter.id === id) || chapters[0];
  }

  function getScenario(id) {
    const chapter = getChapter(id);
    return scenarios[id] || renderPlannedState(chapter);
  }

  function renderPlannedState(chapter) {
    return {
      title: `${chapter.title} 준비 중`,
      severity: "planned",
      situation: "이 장의 상세 화면은 이후 Phase에서 구현한다.",
      impact: "현재는 planned 상태와 sequence 제목만 안내한다.",
      firstQuestion: chapter.nextQuestion,
      observations: ["상세 데이터는 다음 구현 Phase에서 sequence 문서를 기준으로 연결한다."],
      metrics: [],
      flow: [],
      causes: [],
      decisions: [],
      systemFocus: [],
      systemMap: [],
      specialPanels: [],
      checklist: [
        "Chapter Progress Rail에는 남긴다.",
        "상세 콘텐츠는 아직 렌더링하지 않는다.",
        "다음 Phase에서 대상 sequence 문서를 먼저 읽는다."
      ],
      terminal: ["select planned sequence", "show title only", "wait next phase"],
      isPlanned: true
    };
  }

  function renderTerminal(scenario, chapter) {
    const lines = [
      `goal phase-3-5 --visual-lab-review`,
      `selected ${chapter.order}-${chapter.code.toLowerCase()}`,
      ...scenario.terminal,
      `sequence ${chapter.sequenceFile}`
    ];

    selectors.terminalLines.innerHTML = lines
      .slice(0, 7)
      .map((line, index) => `
        <div class="terminal-line ${index === 0 ? "is-goal" : ""}">
          <span class="terminal-line__prompt">&gt;</span>
          <span class="terminal-line__text">${escapeHtml(line)}</span>
        </div>
      `)
      .join("");
  }

  function renderHeroDock(scenario) {
    selectors.heroMiniRail.innerHTML = chapters
      .map((chapter) => {
        const isActive = chapter.id === state.selectedChapterId;
        return `
          <button
            class="mini-rail__item ${isActive ? "is-active" : ""}"
            type="button"
            data-chapter-id="${escapeHtml(chapter.id)}"
            aria-pressed="${isActive}"
          >
            <span>${escapeHtml(chapter.order)}</span>
            <strong>${escapeHtml(chapter.code)}</strong>
          </button>
        `;
      })
      .join("");

    selectors.heroIncidentCue.innerHTML = `
      <span class="badge badge--warning">Incident Entry</span>
      <strong>${escapeHtml(scenario.title)}</strong>
      <span>${escapeHtml(scenario.firstQuestion)}</span>
    `;
  }

  function renderGoalSteps(chapter) {
    const steps = [
      {
        label: "Incident",
        text: "문제 상황 확인"
      },
      {
        label: "Observations",
        text: "지표와 증상 읽기"
      },
      {
        label: "Candidate Causes",
        text: "원인 후보 좁히기"
      },
      {
        label: "Concepts",
        text: "핵심 개념 확인"
      },
      {
        label: "Decisions",
        text: "선택지와 tradeoff"
      },
      {
        label: "Flow",
        text: "요청 흐름 분해"
      },
      {
        label: "Checklist",
        text: "누락 방지 확인"
      },
      {
        label: "Next",
        text: "다음 질문 연결"
      }
    ];

    selectors.goalSteps.innerHTML = steps
      .map((step, index) => `
        <li class="goal-step ${index === 0 ? "is-active" : ""}">
          <strong>${escapeHtml(step.label)}</strong>
          <p>${escapeHtml(step.text)}</p>
        </li>
      `)
      .join("");

    selectors.goalSteps.setAttribute("aria-label", `${chapter.title} workflow`);
  }

  function renderRail() {
    selectors.rail.innerHTML = chapters
      .map((chapter) => {
        const isActive = chapter.id === state.selectedChapterId;
        return `
          <button
            class="chapter-button ${isActive ? "is-active" : ""}"
            type="button"
            data-chapter-id="${escapeHtml(chapter.id)}"
            aria-pressed="${isActive}"
            data-status="${escapeHtml(chapter.status)}"
          >
            <span class="chapter-button__code">${escapeHtml(chapter.order)} ${escapeHtml(chapter.code)}</span>
            <span>
              <span class="chapter-button__title">${escapeHtml(chapter.title)}</span>
              <span class="chapter-button__meta">${escapeHtml(chapter.category)}</span>
            </span>
            <span class="chapter-button__status">${escapeHtml(chapter.status)}</span>
          </button>
        `;
      })
      .join("");
  }

  function renderHeader(chapter) {
    selectors.category.textContent = `${chapter.order} ${chapter.code} · ${chapter.category}`;
    selectors.title.textContent = chapter.title;
    selectors.subtitle.textContent = chapter.subtitle;
  }

  function renderIncident(scenario) {
    selectors.incident.innerHTML = `
      <div class="incident-panel__top">
        <span class="badge badge--warning">INCIDENT</span>
        <span class="badge">${escapeHtml(scenario.severity)}</span>
      </div>
      <h3 id="incident-title">${escapeHtml(scenario.title)}</h3>
      <p>${escapeHtml(scenario.situation)}</p>
      <div>
        <p class="eyebrow">Impact</p>
        <p>${escapeHtml(scenario.impact)}</p>
      </div>
      <div>
        <p class="eyebrow">First Question</p>
        <p>${escapeHtml(scenario.firstQuestion)}</p>
      </div>
    `;
  }

  function renderMetrics(scenario) {
    if (!scenario.metrics.length) {
      selectors.metrics.innerHTML = `
        <article class="metric-card" data-status="warning">
          <span class="metric-card__label">Status</span>
          <strong class="metric-card__value">planned</strong>
          <p>04장 이후 상세 지표는 다음 Phase에서 연결합니다.</p>
        </article>
      `;
      return;
    }

    selectors.metrics.innerHTML = scenario.metrics
      .map((metric) => `
        <article class="metric-card" data-status="${escapeHtml(metric.status)}">
          <span class="metric-card__label">${escapeHtml(metric.label)}</span>
          <strong class="metric-card__value">
            ${escapeHtml(metric.value)}<small>${escapeHtml(metric.unit)}</small>
          </strong>
          <span class="metric-card__status">${escapeHtml(metric.status)}</span>
          <p>${escapeHtml(metric.meaning)}</p>
        </article>
      `)
      .join("");
  }

  function renderObservations(scenario) {
    selectors.observations.innerHTML = `
      <ul>
        ${scenario.observations
          .map((observation) => `<li>${escapeHtml(observation)}</li>`)
          .join("")}
      </ul>
    `;
  }

  function renderSystemMap(scenario) {
    const fallbackNodes = [
      {
        id: "client",
        label: "Client",
        detail: "사용자 요청과 체감 지연"
      },
      {
        id: "api",
        label: "API Server",
        detail: "controller, service, thread"
      },
      {
        id: "db",
        label: "DB",
        detail: "query, index, transaction"
      },
      {
        id: "external",
        label: "External API",
        detail: "timeout, retry, pool"
      },
      {
        id: "queue",
        label: "Queue",
        detail: "async, lag, consumer"
      },
      {
        id: "shell",
        label: "Site Shell",
        detail: "layout, token, renderer"
      },
      {
        id: "docs",
        label: "Docs",
        detail: "sequence map and guardrail"
      },
      {
        id: "codex",
        label: "Codex",
        detail: "workflow and terminal panel"
      }
    ];
    const focus = new Set(scenario.systemFocus || []);
    const nodes = scenario.systemMap && scenario.systemMap.length ? scenario.systemMap : fallbackNodes;

    if (!nodes.length) {
      selectors.systemMap.innerHTML = `<p>이 장의 시스템 맵은 후속 Phase에서 연결합니다.</p>`;
      return;
    }

    selectors.systemMap.innerHTML = nodes
      .map((node) => {
        const active = focus.has(node.id) || node.state === "active" || node.state === "risk";
        const muted = focus.size > 0 && !active;
        return `
          <div class="system-node ${active ? "is-risk" : ""} ${muted ? "is-muted" : ""}">
            <strong>${escapeHtml(node.label)}</strong>
            <p>${escapeHtml(node.detail)}</p>
          </div>
        `;
      })
      .join("");
  }

  function renderPanelRows(rows = []) {
    return `
      <ul>
        ${rows.map((row) => `<li>${escapeHtml(row)}</li>`).join("")}
      </ul>
    `;
  }

  function renderGenericSpecialPanel(panel) {
    return `
      <article class="special-panel special-panel--generic">
        <div>
          <p class="eyebrow">${escapeHtml(panel.type || "generic")}</p>
          <h4>${escapeHtml(panel.title || "Special Panel")}</h4>
        </div>
        ${renderPanelRows(panel.rows || [])}
      </article>
    `;
  }

  function renderReferenceOrderPanel(panel) {
    return `
      <article class="special-panel special-panel--reference-order">
        <div>
          <p class="eyebrow">Reference Order</p>
          <h4>${escapeHtml(panel.title)}</h4>
        </div>
        <ol class="reference-order-list">
          ${(panel.rows || [])
            .map((row) => `<li>${escapeHtml(row)}</li>`)
            .join("")}
        </ol>
      </article>
    `;
  }

  function renderQueryLensPanel(panel) {
    const items = panel.items || [];
    const rows = panel.rows || [];
    const body = items.length
      ? `
        <div class="query-lens-grid">
          ${items
            .map((item) => `
              <div class="query-lens-item" data-status="${escapeHtml(item.status || "normal")}">
                <span>${escapeHtml(item.label)}</span>
                <strong>${escapeHtml(item.value)}</strong>
              </div>
            `)
            .join("")}
        </div>
      `
      : `
        <div class="query-lens-lines">
          ${rows
            .map((row, index) => `
              <code data-line="${index + 1}">${escapeHtml(row)}</code>
            `)
            .join("")}
        </div>
      `;

    return `
      <article class="special-panel special-panel--query-lens">
        <div>
          <p class="eyebrow">Query Lens</p>
          <h4>${escapeHtml(panel.title)}</h4>
        </div>
        ${body}
      </article>
    `;
  }

  function renderIndexSimulatorPanel(panel) {
    const items = panel.items || [];
    const rows = panel.rows || [];
    const options = items.length
      ? items
      : rows.map((row, index) => ({
          label: `${index + 1}`,
          readEffect: row,
          writeCost: "",
          risk: ""
        }));

    return `
      <article class="special-panel special-panel--index-simulator">
        <div>
          <p class="eyebrow">Index Simulator</p>
          <h4>${escapeHtml(panel.title)}</h4>
        </div>
        <div class="simulator-options">
          ${options
            .map((item, index) => `
              <div class="simulator-option" data-risk="${escapeHtml(item.status || "normal")}">
                <span>${index + 1}</span>
                <div class="simulator-option__body">
                  <h5>${escapeHtml(item.label)}</h5>
                  <p><strong>Read:</strong> ${escapeHtml(item.readEffect)}</p>
                  <p><strong>Write:</strong> ${escapeHtml(item.writeCost || "변화 없음")}</p>
                  <p><strong>Risk:</strong> ${escapeHtml(item.risk || "추가 확인 필요")}</p>
                </div>
              </div>
            `)
            .join("")}
        </div>
      </article>
    `;
  }

  function renderNPlusOnePanel(panel) {
    const items = panel.items || [];
    const rows = panel.rows || [];
    const body = items.length
      ? items
          .map((item) => `
            <div class="query-count-item" data-status="${escapeHtml(item.status || "normal")}">
              <strong>${escapeHtml(item.count)}</strong>
              <span>${escapeHtml(item.label)}</span>
              <small>${escapeHtml(item.detail)}</small>
            </div>
          `)
          .join("")
      : rows.map((row) => `<span>${escapeHtml(row)}</span>`).join("");

    return `
      <article class="special-panel special-panel--n-plus-one">
        <div>
          <p class="eyebrow">N+1 Panel</p>
          <h4>${escapeHtml(panel.title)}</h4>
        </div>
        <div class="query-count-stack">
          ${body}
        </div>
      </article>
    `;
  }

  function renderTransactionTimelinePanel(panel) {
    const items = panel.items || [];
    const rows = panel.rows || [];
    const body = items.length
      ? items
          .map((item) => `
            <li data-risk="${escapeHtml(item.status || "normal")}">
              <strong>${escapeHtml(item.label)}</strong>
              <p>${escapeHtml(item.detail)}</p>
            </li>
          `)
          .join("")
      : rows.map((row) => `<li>${escapeHtml(row)}</li>`).join("");

    return `
      <article class="special-panel special-panel--transaction-timeline">
        <div>
          <p class="eyebrow">Transaction Timeline</p>
          <h4>${escapeHtml(panel.title)}</h4>
        </div>
        <ol class="timeline-list">
          ${body}
        </ol>
      </article>
    `;
  }

  function renderSpecialPanels(scenario) {
    const panels = scenario.specialPanels || [];
    const renderers = {
      "reference-order": renderReferenceOrderPanel,
      "query-lens": renderQueryLensPanel,
      "index-simulator": renderIndexSimulatorPanel,
      "n-plus-one": renderNPlusOnePanel,
      "transaction-timeline": renderTransactionTimelinePanel
    };

    if (!panels.length) {
      selectors.specialPanels.innerHTML = "";
      return;
    }

    selectors.specialPanels.innerHTML = panels
      .map((panel) => {
        const renderer = renderers[panel.type] || renderGenericSpecialPanel;
        return renderer(panel);
      })
      .join("");
  }

  function renderFlow(scenario) {
    if (!scenario.flow.length) {
      selectors.flow.innerHTML = `<p>상세 흐름은 다음 Phase에서 sequence 문서를 기준으로 연결합니다.</p>`;
      return;
    }

    selectors.flow.innerHTML = scenario.flow
      .map((step, index) => `
        <article class="flow-step ${index === 0 ? "is-active" : ""}">
          <span class="flow-step__index">${index + 1}</span>
          <div>
            <h4>${escapeHtml(step.label)}</h4>
            <p>${escapeHtml(step.input)} → ${escapeHtml(step.processing)} → ${escapeHtml(step.output)}</p>
          </div>
          <div>
            <span class="badge badge--warning">${escapeHtml(step.risk)}</span>
            <p>${escapeHtml(step.fix)}</p>
          </div>
        </article>
      `)
      .join("");
  }

  function renderCauses(scenario) {
    if (!scenario.causes.length) {
      selectors.causes.innerHTML = `<p>원인 후보 스택은 상세 구현 Phase에서 추가합니다.</p>`;
      return;
    }

    selectors.causes.innerHTML = scenario.causes
      .map((cause) => `
        <article class="cause-item" data-priority="${escapeHtml(cause.priority)}">
          <div>
            <h4>${escapeHtml(cause.name)}</h4>
            <p>${escapeHtml(cause.evidence)}</p>
            <p><strong>Action:</strong> ${escapeHtml(cause.action)}</p>
          </div>
          <span class="badge">${escapeHtml(cause.priority)} · ${escapeHtml(cause.metric)}</span>
        </article>
      `)
      .join("");
  }

  function renderDecisionOptions(decision) {
    return `
      <div class="decision-choice-list">
        ${(decision.options || [])
          .map((option) => `
            <div class="decision-choice" data-status="${escapeHtml(option.status)}">
              <strong>${escapeHtml(option.label)}</strong>
              <p>${escapeHtml(option.tradeoff)}</p>
            </div>
          `)
          .join("")}
      </div>
    `;
  }

  function renderDecisions(scenario) {
    if (!scenario.decisions.length) {
      selectors.decisions.innerHTML = `<p>${escapeHtml(renderPlannedCopy("decision"))}</p>`;
      return;
    }

    selectors.decisions.innerHTML = scenario.decisions
      .map((decision) => `
        <article class="decision-option">
          <h4>${escapeHtml(decision.problem)}</h4>
          ${renderDecisionOptions(decision)}
          <p><strong>추천:</strong> ${escapeHtml(decision.recommended)}</p>
          <p><strong>Tradeoff:</strong> ${escapeHtml(decision.tradeoff)}</p>
          <p><strong>피할 것:</strong> ${escapeHtml(decision.avoid)}</p>
        </article>
      `)
      .join("");
  }

  function renderConcepts(chapter) {
    const conceptIds = chapter.conceptIds || [];
    selectors.concepts.innerHTML = conceptIds.length
      ? conceptIds
          .slice(0, 6)
          .map((id) => {
            const concept = glossary[id];
            if (!concept) return "";
            return `
              <article class="concept-card">
                <h4>${escapeHtml(concept.name)}</h4>
                <p>${escapeHtml(concept.definition)}</p>
                <p><strong>Why:</strong> ${escapeHtml(concept.why)}</p>
                <p><strong>흔한 오해:</strong> ${escapeHtml(concept.mistake)}</p>
                <p><strong>화면 반영:</strong> ${escapeHtml(concept.visualHint)}</p>
              </article>
            `;
          })
          .join("")
      : `<p>이 장의 개념 카드는 후속 Phase에서 연결합니다.</p>`;
  }

  function renderChecklist(scenario) {
    const items = scenario.checklist || [];

    if (!items.length) {
      selectors.checklist.innerHTML = `
        <p>${escapeHtml(renderPlannedCopy("checklist"))}</p>
      `;
      return;
    }

    selectors.checklist.innerHTML = `
      <ul>
        ${items
          .map((item) => `
            <li>
              <span aria-hidden="true">✓</span>
              <p>${escapeHtml(item)}</p>
            </li>
          `)
          .join("")}
      </ul>
    `;
  }

  function renderPlannedCopy(section) {
    return `${section} 상세 데이터는 다음 Phase에서 sequence 문서를 기준으로 연결합니다.`;
  }

  function renderNextQuestion(chapter) {
    selectors.nextQuestion.innerHTML = `
      <p class="eyebrow">Next Question</p>
      <h3>${escapeHtml(chapter.nextQuestion)}</h3>
      <p>다음 sequence 문서를 기준으로 상세 패널을 확장합니다.</p>
    `;
  }

  function render() {
    const chapter = getChapter(state.selectedChapterId);
    const scenario = getScenario(state.selectedChapterId);

    renderTerminal(scenario, chapter);
    renderHeroDock(scenario);
    renderGoalSteps(chapter);
    renderRail();
    renderHeader(chapter);
    renderIncident(scenario);
    renderMetrics(scenario);
    renderObservations(scenario);
    renderCauses(scenario);
    renderConcepts(chapter);
    renderDecisions(scenario);
    renderSystemMap(scenario);
    renderSpecialPanels(scenario);
    renderFlow(scenario);
    renderChecklist(scenario);
    renderNextQuestion(chapter);
  }

  if (!canRender()) return;

  selectors.rail.addEventListener("click", (event) => {
    const button = event.target.closest("[data-chapter-id]");
    if (!button) return;
    state.selectedChapterId = button.dataset.chapterId;
    render();
  });

  selectors.heroMiniRail.addEventListener("click", (event) => {
    const button = event.target.closest("[data-chapter-id]");
    if (!button) return;
    state.selectedChapterId = button.dataset.chapterId;
    render();
  });

  render();
})();
