/**
 * Stellar Task Card Logic
 * Handles dynamic time calculations and interactivity.
 */

document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('[data-testid="test-todo-card"]');
    const checkbox = document.getElementById('complete-checkbox');
    const statusContainer = document.getElementById('status-container');
    const statusText = document.getElementById('status-text');
    const timeRemainingEl = document.querySelector('[data-testid="test-todo-time-remaining"]');
    const dueDateEl = document.querySelector('[data-testid="test-todo-due-date"]');

    // Hardcoded due date for demonstration (set to 7 days from now)
    const dueDate = new Date('2026-04-18T12:00:00');

    /**
     * Updates the status indicator visually
     */
    function updateStatus(isCompleted, isOverdue) {
        statusContainer.classList.remove('status-pending', 'status-completed', 'status-overdue');
        
        if (isCompleted) {
            statusContainer.classList.add('status-completed');
            statusText.textContent = 'Completed';
            card.classList.add('completed');
        } else if (isOverdue) {
            statusContainer.classList.add('status-overdue');
            statusText.textContent = 'Overdue';
            card.classList.remove('completed');
        } else {
            statusContainer.classList.add('status-pending');
            statusText.textContent = 'Pending';
            card.classList.remove('completed');
        }
    }

    /**
     * Calculates and formats human-readable time remaining/overdue
     */
    function updateTimeLogic() {
        if (checkbox.checked) {
            timeRemainingEl.textContent = 'Task completed';
            return;
        }

        const now = new Date();
        const diffInMs = dueDate - now;
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        const isOverdue = diffInMs < 0;
        const absDiffInMs = Math.abs(diffInMs);
        const absDiffInSeconds = Math.floor(absDiffInMs / 1000);
        const absDiffInMinutes = Math.floor(absDiffInSeconds / 60);
        const absDiffInHours = Math.floor(absDiffInMinutes / 60);
        const absDiffInDays = Math.floor(absDiffInHours / 24);

        let timeStr = "";

        if (isOverdue) {
            if (absDiffInDays > 0) {
                timeStr = `Overdue by ${absDiffInDays} day${absDiffInDays > 1 ? 's' : ''}`;
            } else if (absDiffInHours > 0) {
                timeStr = `Overdue by ${absDiffInHours} hour${absDiffInHours > 1 ? 's' : ''}`;
            } else {
                timeStr = `Overdue by ${absDiffInMinutes} minute${absDiffInMinutes > 1 ? 's' : ''}`;
            }
        } else {
            if (diffInDays > 0) {
                timeStr = `Due in ${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
            } else if (diffInHours > 0) {
                timeStr = `Due in ${diffInHours} hour${diffInHours > 1 ? 's' : ''}`;
            } else {
                timeStr = `Due in ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
            }
        }

        timeRemainingEl.textContent = timeStr;
        updateStatus(checkbox.checked, isOverdue);
    }

    // Handle Checkbox Interaction
    checkbox.addEventListener('change', () => {
        updateTimeLogic();
    });

    // Update time displays immediately
    updateTimeLogic();
    
    // Auto-update every 60 seconds
    setInterval(updateTimeLogic, 60000);

    // Initial Date Format
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    dueDateEl.textContent = `Due ${dueDate.toLocaleDateString('en-US', options)}`;
    dueDateEl.setAttribute('datetime', dueDate.toISOString());
});
