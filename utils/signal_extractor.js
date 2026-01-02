function extractIngredients(rawText) {
  if (!rawText) return "";

  let clean = rawText.toLowerCase();

  // Target common list starts
  const markers = ["ingredients:", "contains:", "composition:"];
  for (let m of markers) {
    if (clean.includes(m)) {
      clean = clean.split(m).pop();
      break;
    }
  }

  // Remove noise like percentages and weights
  return clean
    .replace(/\d+%/g, "")
    .replace(/\(\d+.*?\)/g, "")
    .replace(/[^a-z0-9,\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

module.exports = { extractIngredients };
