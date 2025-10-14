// utils/formatDate.js
const formatDate = (date) => {
  if (!date) return null;

  const d = new Date(date);
  // Format: DD/MM/YYYY
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

module.exports = formatDate;
