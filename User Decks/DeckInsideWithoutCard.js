 function toggleDropdown() {
                const menu = document.getElementById("dropdownMenu");
                menu.classList.toggle("show");
            }

                document.addEventListener("click", function(e) {
                const dropdown = document.querySelector(".dropdown");
    
            if (!dropdown.contains(e.target)) {
                document.getElementById("dropdownMenu").classList.remove("show");
            }
            });

/* DeckInsideWithoutCard.js
   - add card modal
   - tabs: all / not / mem
   - dynamic rendering
   - empty-state toggle
*/

document.addEventListener("DOMContentLoaded", () => {

  // Elements
  const addCardBtn = document.getElementById("addCardBtn");
  const practiceBtn = document.getElementById("practiceBtn");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const cancelAdd = document.getElementById("cancelAdd");
  const saveAdd = document.getElementById("saveAdd");
  const inputQuestion = document.getElementById("inputQuestion");
  const inputAnswer = document.getElementById("inputAnswer");
  const isMem = document.getElementById("isMem");
  const emptyState = document.getElementById("emptyState");
  const cardGrid = document.getElementById("cardGrid");
  const tabs = document.querySelectorAll(".tab");

  // Data store (in-memory). You can replace with localStorage/db later.
  let cards = []; // { question, answer, memorized }
  let filter = "all";

  // Open modal
  addCardBtn && addCardBtn.addEventListener("click", () => {
    modalBackdrop.style.display = "flex";
    modalBackdrop.setAttribute("aria-hidden","false");
  });

  // Close modal
  if (cancelAdd) {
    cancelAdd.addEventListener("click", () => {
      closeModal();
    });
  }

  // Save add - create card
  if (saveAdd) {
    saveAdd.addEventListener("click", () => {
      const q = inputQuestion.value.trim();
      const a = inputAnswer.value.trim();
      const mem = isMem.checked;

      if (!q || !a) {
        alert("Please enter both Question and Answer");
        return;
      }

      cards.push({ question: q, answer: a, memorized: mem });
      closeModal();
      renderCards();
    });
  }

  // Tabs handling
  tabs.forEach(t => {
    t.addEventListener("click", () => {
      tabs.forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      filter = t.dataset.filter || "all";
      renderCards();
    });
  });

  // Close modal helper
  function closeModal() {
    modalBackdrop.style.display = "none";
    modalBackdrop.setAttribute("aria-hidden","true");
    if (inputQuestion) inputQuestion.value = "";
    if (inputAnswer) inputAnswer.value = "";
    if (isMem) isMem.checked = false;
  }

  // Render cards
  function renderCards() {
    cardGrid.innerHTML = "";

    // Apply filter
    let list = cards.slice();
    if (filter === "mem") list = list.filter(c => c.memorized);
    if (filter === "not") list = list.filter(c => !c.memorized);

    if (!list.length) {
      emptyState.style.display = "flex";
      return;
    } else {
      emptyState.style.display = "none";
    }

    // render grid
    list.forEach((c, idx) => {
      const card = document.createElement("div");
      card.className = "card-item";
      card.innerHTML = `
        <div class="card-content">
          <strong>${escapeHtml(c.question)}</strong>
          <p style="margin:8px 0 6px">${escapeHtml(c.answer)}</p>
          <small style="color:#555">${c.memorized ? "⭐ Memorized" : "❗ Not memorized"}</small>
        </div>
      `;
      cardGrid.appendChild(card);
    });
  }

  // small helper to avoid html injection
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/\'/g, "&#039;");
  }

  // initial render (empty)
  renderCards();

  // Practice button (simple demo behavior)
  practiceBtn && practiceBtn.addEventListener("click", () => {
    if (cards.length === 0) {
      alert("No cards yet — add some cards first.");
      return;
    }
    alert("Practice feature not implemented — this is a placeholder.");
  });

  // close modal when clicking backdrop (but not inside modal)
  document.getElementById("modalBackdrop").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modalBackdrop")) closeModal();
  });

});
