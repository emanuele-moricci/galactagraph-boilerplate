const firstLower = (string) => string.charAt(0).toLowerCase() + string.slice(1);
const capital = (string) => string.charAt(0).toUpperCase() + string.slice(1);

module.exports = {
  firstLower,
  capital,
};
