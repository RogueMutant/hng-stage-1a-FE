document.addEventListener("DOMContentLoaded", () => {
  // Single Source of Truth
  const state = {
    title: "Finalize HNG Stage 1a Submission",
    description:
      "Complete the frontend task card implementation and ensure all test IDs are correctly placed for automation. This includes verifying state changes, checking accessibility with keyboards, and testing tab order thoroughly before final branch submission.",
    status: "Pending",
    priority: "High",
    dueDate: "2026-04-18T12:00",
    isExpanded: false,
    isEditing: false,
  };

  let timerInterval = null;

  // DOM Elements - Display
  const card = document.querySelector('[data-testid="test-todo-card"]');
  const displayView = document.getElementById("display-view");
  const titleEl = document.querySelector('[data-testid="test-todo-title"]');
  const descriptionEl = document.querySelector(
    '[data-testid="test-todo-description"]',
  );
  const priorityIndicator = document.querySelector(
    '[data-testid="test-todo-priority-indicator"]',
  );
  const priorityBadgeText = document.querySelector(
    '[data-testid="test-todo-priority"]',
  );
  const dueDateEl = document.querySelector(
    '[data-testid="test-todo-due-date"]',
  );
  const timeRemainingEl = document.querySelector(
    '[data-testid="test-todo-time-remaining"]',
  );
  const checkbox = document.getElementById("complete-checkbox");
  const statusSelect = document.getElementById("status-select");

  // DOM Elements - Collapsible
  const collapsibleSection = document.querySelector(
    '[data-testid="test-todo-collapsible-section"]',
  );
  const expandToggle = document.querySelector(
    '[data-testid="test-todo-expand-toggle"]',
  );

  // DOM Elements - Edit Form
  const editForm = document.querySelector(
    '[data-testid="test-todo-edit-form"]',
  );
  const inputTitle = document.getElementById("edit-title");
  const inputDesc = document.getElementById("edit-desc");
  const selectPriority = document.getElementById("edit-priority");
  const inputDue = document.getElementById("edit-due");
  const btnEdit = document.querySelector(
    '[data-testid="test-todo-edit-button"]',
  );
  const btnCancel = document.querySelector(
    '[data-testid="test-todo-cancel-button"]',
  );

  // Constants
  const CHAR_THRESHOLD = 120;

  /**
   * Renders the UI based on current state
   */
  function render() {
    // Render Edit Mode
    if (state.isEditing) {
      editForm.hidden = false;
      displayView.hidden = true;

      // Populate form
      inputTitle.value = state.title;
      inputDesc.value = state.description;
      selectPriority.value = state.priority;

      // Extract YYYY-MM-DD for input
      inputDue.value = state.dueDate.split("T")[0];

      inputTitle.focus();
      return; // Skip rendering display view if editing
    } else {
      editForm.hidden = true;
      displayView.hidden = false;
    }

    // Render Display View
    titleEl.textContent = state.title;
    descriptionEl.textContent = state.description;

    // Render Status & Checkbox Sync
    statusSelect.value = state.status;
    const isDone = state.status === "Done";
    checkbox.checked = isDone;

    if (isDone) {
      card.classList.add("completed");
      card.classList.remove("in-progress");
    } else if (state.status === "In Progress") {
      card.classList.add("in-progress");
      card.classList.remove("completed");
    } else {
      card.classList.remove("completed", "in-progress");
    }

    // Render Priority
    priorityBadgeText.textContent = `${state.priority} Priority`;
    priorityIndicator.className = "priority-indicator"; // Reset
    if (state.priority === "High")
      priorityIndicator.classList.add("priority-high");
    if (state.priority === "Medium")
      priorityIndicator.classList.add("priority-medium");
    if (state.priority === "Low")
      priorityIndicator.classList.add("priority-low");

    // Render Expand/Collapse
    if (state.description.length > CHAR_THRESHOLD) {
      expandToggle.classList.remove("sr-only");
      if (state.isExpanded) {
        collapsibleSection.classList.remove("collapsed");
        expandToggle.textContent = "Show Less";
        expandToggle.setAttribute("aria-expanded", "true");
      } else {
        collapsibleSection.classList.add("collapsed");
        expandToggle.textContent = "Show More";
        expandToggle.setAttribute("aria-expanded", "false");
      }
    } else {
      expandToggle.classList.add("sr-only");
      collapsibleSection.classList.remove("collapsed");
    }

    // Render Due Date
    const dateObj = new Date(state.dueDate);
    const options = { month: "short", day: "numeric", year: "numeric" };
    dueDateEl.textContent = `Due ${dateObj.toLocaleDateString("en-US", options)}`;
    dueDateEl.setAttribute("datetime", state.dueDate);

    // Compute and Render Time Remaining
    formatTimeRemaining();
    manageTimer();
  }

  /**
   * Updates state and triggers a re-render
   */
  function updateState(patch) {
    Object.assign(state, patch);
    render();
  }

  /**
   * Calculates and formats human-readable time remaining/overdue
   */
  function formatTimeRemaining() {
    if (state.status === "Done") {
      timeRemainingEl.textContent = "Completed";
      timeRemainingEl.style.color = "var(--text-secondary)";
      return;
    }

    const now = new Date();
    const dueObj = new Date(state.dueDate);
    const diffInMs = dueObj - now;
    const isOverdue = diffInMs < 0;

    const absDiffInSeconds = Math.floor(Math.abs(diffInMs) / 1000);
    const absDiffInMinutes = Math.floor(absDiffInSeconds / 60);
    const absDiffInHours = Math.floor(absDiffInMinutes / 60);
    const absDiffInDays = Math.floor(absDiffInHours / 24);

    let timeStr = "";

    if (isOverdue) {
      if (absDiffInDays > 0)
        timeStr = `Overdue by ${absDiffInDays} day${absDiffInDays > 1 ? "s" : ""}`;
      else if (absDiffInHours > 0)
        timeStr = `Overdue by ${absDiffInHours} hour${absDiffInHours > 1 ? "s" : ""}`;
      else
        timeStr = `Overdue by ${absDiffInMinutes} minute${absDiffInMinutes > 1 ? "s" : ""}`;

      timeRemainingEl.style.color = "var(--danger-color)";
      timeRemainingEl.style.fontWeight = "600";
    } else {
      if (absDiffInDays > 0)
        timeStr = `Due in ${absDiffInDays} day${absDiffInDays > 1 ? "s" : ""}`;
      else if (absDiffInHours > 0)
        timeStr = `Due in ${absDiffInHours} hour${absDiffInHours > 1 ? "s" : ""}`;
      else
        timeStr = `Due in ${absDiffInMinutes} minute${absDiffInMinutes > 1 ? "s" : ""}`;

      timeRemainingEl.style.color = "inherit";
      timeRemainingEl.style.fontWeight = "normal";
    }

    if (timeStr === "")
      timeStr = isOverdue ? "Overdue by < 1 minute" : "Due in < 1 minute";

    timeRemainingEl.textContent = timeStr;
  }

  /**
   * Manages the 60s update timer
   */
  function manageTimer() {
    if (state.status === "Done") {
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = null;
    } else {
      if (!timerInterval) {
        timerInterval = setInterval(() => {
          formatTimeRemaining();
        }, 60000); // 60s
      }
    }
  }

  // Toggle Status via Checkbox
  checkbox.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    updateState({ status: isChecked ? "Done" : "Pending" });
  });

  // Toggle Status via Select
  statusSelect.addEventListener("change", (e) => {
    updateState({ status: e.target.value });
  });

  // Expand / Collapse Description
  expandToggle.addEventListener("click", () => {
    updateState({ isExpanded: !state.isExpanded });
  });

  // Enter Edit Mode
  btnEdit.addEventListener("click", () => {
    updateState({ isEditing: true });
  });

  // Cancel Edit Mode
  btnCancel.addEventListener("click", () => {
    updateState({ isEditing: false });
    btnEdit.focus(); // Accessibility focus return
  });

  // Save Edit Mode
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newDueStr = inputDue.value;
    const combinedDate = newDueStr ? `${newDueStr}T12:00:00` : state.dueDate;

    updateState({
      title: inputTitle.value,
      description: inputDesc.value,
      priority: selectPriority.value,
      dueDate: combinedDate,
      isEditing: false,
    });

    btnEdit.focus(); // Accessibility focus return
  });

  // Initial render
  render();
});
