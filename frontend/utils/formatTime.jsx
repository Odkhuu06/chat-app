export function formatMessageTime(timestamp) {
  const now = new Date();
  const messageDate = new Date(timestamp);

  const diffInMs = now - messageDate;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // Дотоод хоног эсэхийг шалгах
  const isToday = messageDate.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = messageDate.toDateString() === yesterday.toDateString();

  // 1 минутаас бага
  if (diffInMinutes < 1) {
    return "Just now";
  }

  // 1 цагаас бага
  if (diffInMinutes < 60) {
    return `${diffInMinutes}min`;
  }

  // Өнөөдөр
  if (isToday) {
    return messageDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  // Өчигдөр
  if (isYesterday) {
    return "Yesterday";
  }

  // 7 хоногоос бага
  if (diffInDays < 7) {
    return `${diffInDays}d`;
  }

  // 7 хоногоос их
  return messageDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// Sidebar дээр сүүлийн мессежийн цаг
export function formatLastMessageTime(timestamp) {
  const now = new Date();
  const messageDate = new Date(timestamp);

  const diffInMs = now - messageDate;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const isToday = messageDate.toDateString() === now.toDateString();

  // 1 минутаас бага
  if (diffInMinutes < 1) {
    return "now";
  }

  // 60 минутаас бага
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }

  // Өнөөдөр, 24 цагаас бага
  if (isToday) {
    return `${diffInHours}h`;
  }

  // 7 хоногоос бага
  if (diffInDays < 7) {
    return `${diffInDays}d`;
  }

  // 7 хоногоос их
  return messageDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
