
export function formatDate(date, options = {}) {
  if (!date) return "Not available";

  const parsedDate = date instanceof Date ? date : new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options
  }).format(parsedDate);
}

export function formatDateLong(date) {
  return formatDate(date, {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export function getDaysUntilDue(dueDate, today = new Date()) {
  if (!dueDate) return null;

  const due = new Date(`${dueDate}T00:00:00`);
  const current = new Date(today);

  if (Number.isNaN(due.getTime()) || Number.isNaN(current.getTime())) {
    return null;
  }

  due.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);

  return Math.round((due.getTime() - current.getTime()) / 86400000);
}

export function getDueDateStatus(dueDate, today = new Date()) {
  const daysRemaining = getDaysUntilDue(dueDate, today);

  if (daysRemaining === null) {
    return {
      label: "Unknown",
      status: "unknown",
      daysRemaining: null
    };
  }

  if (daysRemaining < 0) {
    const daysOverdue = Math.abs(daysRemaining);

    return {
      label: `${daysOverdue} ${daysOverdue === 1 ? "day" : "days"} overdue`,
      status: "overdue",
      daysRemaining
    };
  }

  if (daysRemaining === 0) {
    return {
      label: "Due today",
      status: "due-today",
      daysRemaining
    };
  }

  if (daysRemaining <= 3) {
    return {
      label: `Due in ${daysRemaining} ${daysRemaining === 1 ? "day" : "days"}`,
      status: "due-soon",
      daysRemaining
    };
  }

  return {
    label: `Due in ${daysRemaining} days`,
    status: "upcoming",
    daysRemaining
  };
}

export function formatRelativeDate(date, today = new Date()) {
  if (!date) return "Not available";

  const parsedDate = new Date(`${date}T00:00:00`);
  const current = new Date(today);

  if (Number.isNaN(parsedDate.getTime()) || Number.isNaN(current.getTime())) {
    return "Invalid date";
  }

  parsedDate.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);

  const difference = Math.round(
    (parsedDate.getTime() - current.getTime()) / 86400000
  );

  if (difference === 0) return "Today";
  if (difference === 1) return "Tomorrow";
  if (difference === -1) return "Yesterday";

  return formatDate(parsedDate);
}
