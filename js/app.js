(function () {
  const data = window.SEC_PLUS_DATA;
  if (!data) return;

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* Domain cards */
  const domainRoot = document.getElementById("domainCards");
  if (domainRoot) {
    domainRoot.innerHTML = data.domains
      .map(
        (d) => `
      <details class="domain-card" id="${d.id}">
        <summary>
          ${d.icon}
          <div>
            <h3>${d.title}</h3>
            <p class="domain-meta">${data.exam?.code ?? "SY0-701"} · Domain ${d.order} (~${d.weight}%) — ${d.subtitle}</p>
          </div>
        </summary>
        <div class="domain-body">
          <ul>${d.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
        </div>
      </details>`
      )
      .join("");
  }

  /* Scenario lab */
  const scenarioRoot = document.getElementById("scenarioLab");
  let scenarioIndex = 0;
  let scenarioScore = 0;

  function renderScenario() {
    if (!scenarioRoot) return;
    const s = data.scenarios[scenarioIndex];
    if (!s) {
      scenarioRoot.innerHTML = `
        <p class="feedback ok">You finished the set. Score: ${scenarioScore}/${data.scenarios.length}</p>
        <button type="button" class="btn ghost" id="scenarioReset">Run scenarios again</button>`;
      scenarioRoot.querySelector("#scenarioReset")?.addEventListener("click", () => {
        scenarioIndex = 0;
        scenarioScore = 0;
        renderScenario();
      });
      return;
    }
    scenarioRoot.innerHTML = `
      <div class="scenario-block" data-idx="${scenarioIndex}">
        <p>${s.prompt}</p>
        <div class="scenario-options">
          ${s.choices
            .map(
              (c, i) => `
            <button type="button" class="option-btn" data-i="${i}">${c.text}</button>`
            )
            .join("")}
        </div>
        <div class="feedback-slot"></div>
      </div>
      <p class="lab-score">Score: ${scenarioScore} / ${data.scenarios.length}</p>
    `;
    const block = scenarioRoot.querySelector(".scenario-block");
    const slot = scenarioRoot.querySelector(".feedback-slot");
    block.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.i);
        const choice = s.choices[i];
        const ok = choice.correct;
        if (ok) scenarioScore += 1;
        slot.innerHTML = `<div class="feedback ${ok ? "ok" : "bad"}">${ok ? "Nice!" : "Not quite."} ${s.explain}</div>`;
        block.querySelectorAll(".option-btn").forEach((b) => {
          b.disabled = true;
          const bi = Number(b.dataset.i);
          if (s.choices[bi].correct) b.style.borderColor = "rgba(52, 211, 153, 0.8)";
        });
        const next = document.createElement("button");
        next.type = "button";
        next.className = "btn primary";
        next.style.marginTop = "0.75rem";
        next.textContent = scenarioIndex + 1 < data.scenarios.length ? "Next scenario" : "See results";
        next.addEventListener("click", () => {
          scenarioIndex += 1;
          renderScenario();
        });
        slot.appendChild(next);
      });
    });
  }
  renderScenario();

  /* Match lab */
  const matchRoot = document.getElementById("matchLab");

  function renderMatch() {
    if (!matchRoot) return;
    const pairs = shuffle(data.matchPairs);
    let correctCount = 0;
    matchRoot.innerHTML = `
      <div class="match-toolbar">
        <button type="button" class="btn ghost" id="matchShuffle">Shuffle & reset</button>
      </div>
      <div class="match-lab-inner">
        <div class="match-pool">
          <span class="match-label">Controls (drag)</span>
          <div id="dragPool"></div>
        </div>
        <div class="match-targets">
          <span class="match-label">Scenarios (drop)</span>
          <div id="dropTargets"></div>
          <p class="lab-score" id="matchScore">Correct: 0 / ${pairs.length}</p>
        </div>
      </div>
    `;
    matchRoot.querySelector("#matchShuffle")?.addEventListener("click", renderMatch);

    const pool = matchRoot.querySelector("#dragPool");
    const targets = matchRoot.querySelector("#dropTargets");
    const scoreEl = matchRoot.querySelector("#matchScore");

    pairs.forEach((pair) => {
      const dz = document.createElement("div");
      dz.className = "drop-zone";
      dz.dataset.expected = pair.control;
      dz.innerHTML = `<p>${pair.story}</p><div class="drop-slot">Drop a control label here</div>`;
      targets.appendChild(dz);
    });

    const controls = shuffle(data.matchPairs.map((p) => p.control));
    controls.forEach((label) => {
      const el = document.createElement("div");
      el.className = "draggable";
      el.textContent = label;
      el.draggable = true;
      el.dataset.control = label;
      el.addEventListener("dragstart", (e) => {
        el.classList.add("dragging");
        e.dataTransfer.setData("text/plain", label);
      });
      el.addEventListener("dragend", () => el.classList.remove("dragging"));
      pool.appendChild(el);
    });

    matchRoot.querySelectorAll(".drop-zone").forEach((zone) => {
      const slot = zone.querySelector(".drop-slot");
      slot.addEventListener("dragover", (e) => {
        e.preventDefault();
        zone.classList.add("dragover");
      });
      slot.addEventListener("dragleave", () => zone.classList.remove("dragover"));
      slot.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.classList.remove("dragover");
        if (slot.dataset.locked === "1") return;
        const val = e.dataTransfer.getData("text/plain");
        slot.textContent = val;
        slot.classList.add("filled");
        const expected = zone.dataset.expected;
        if (val === expected) {
          slot.style.borderColor = "rgba(52, 211, 153, 0.85)";
          correctCount += 1;
        } else {
          slot.style.borderColor = "rgba(251, 113, 133, 0.85)";
        }
        slot.dataset.locked = "1";
        scoreEl.textContent = `Correct: ${correctCount} / ${pairs.length}`;
        pool.querySelectorAll(".draggable").forEach((d) => {
          if (d.dataset.control === val) d.remove();
        });
      });
    });
  }

  renderMatch();

  /* Crypto quiz */
  const cryptoRoot = document.getElementById("cryptoLab");
  let cq = 0;
  let cqScore = 0;

  function renderCrypto() {
    if (!cryptoRoot) return;
    const item = data.cryptoQuiz[cq];
    if (!item) {
      cryptoRoot.innerHTML = `<p class="feedback ok">Quiz complete. Score: ${cqScore}/${data.cryptoQuiz.length}</p>
        <button type="button" class="btn ghost" id="cqReset">Run again</button>`;
      cryptoRoot.querySelector("#cqReset")?.addEventListener("click", () => {
        cq = 0;
        cqScore = 0;
        renderCrypto();
      });
      return;
    }
    cryptoRoot.innerHTML = `
      <div class="quiz-q">
        <p>${item.q}</p>
        <div class="quiz-choices">
          ${item.choices
            .map(
              (c, i) =>
                `<button type="button" class="option-btn" data-ci="${i}">${c}</button>`
            )
            .join("")}
        </div>
        <div class="cq-feedback"></div>
      </div>
      <p class="lab-score">Score: ${cqScore} / ${data.cryptoQuiz.length}</p>
    `;
    const fb = cryptoRoot.querySelector(".cq-feedback");
    cryptoRoot.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.ci);
        const ok = i === item.answer;
        if (ok) cqScore += 1;
        fb.innerHTML = `<div class="feedback ${ok ? "ok" : "bad"}">${item.explain}</div>`;
        cryptoRoot.querySelectorAll(".option-btn").forEach((b) => {
          b.disabled = true;
          if (Number(b.dataset.ci) === item.answer) b.style.borderColor = "rgba(52, 211, 153, 0.8)";
        });
        const next = document.createElement("button");
        next.type = "button";
        next.className = "btn primary";
        next.style.marginTop = "0.75rem";
        next.textContent = cq + 1 < data.cryptoQuiz.length ? "Next question" : "See results";
        next.addEventListener("click", () => {
          cq += 1;
          renderCrypto();
        });
        fb.appendChild(next);
      });
    });
  }
  renderCrypto();
})();
