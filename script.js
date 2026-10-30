const titleInput = document.querySelector("#seo-title");
const descriptionInput = document.querySelector("#seo-description");
const previewTitle = document.querySelector("#preview-title");
const previewDescription = document.querySelector("#preview-description");
const titleCount = document.querySelector("#title-count");
const descriptionCount = document.querySelector("#description-count");

function updatePreview() {
  previewTitle.textContent = titleInput.value.trim() || "Your page title";
  previewDescription.textContent = descriptionInput.value.trim() || "Your page description";
  titleCount.textContent = `${titleInput.value.length} / 60`;
  descriptionCount.textContent = `${descriptionInput.value.length} / 160`;
}
titleInput.addEventListener("input", updatePreview);
descriptionInput.addEventListener("input", updatePreview);
updatePreview();

const schemaInput = document.querySelector("#schema-input");
const schemaResult = document.querySelector("#schema-result");
document.querySelector("#validate-button").addEventListener("click", () => {
  try {
    const data = JSON.parse(schemaInput.value);
    if (Array.isArray(data)) {
      schemaResult.className = "result-box success";
      schemaResult.textContent = `Valid JSON syntax. Found an array containing ${data.length} item(s). This does not verify Schema.org properties.`;
      return;
    }
    const type = data["@type"] || "No @type provided";
    const context = data["@context"] || "No @context provided";
    schemaResult.className = "result-box success";
    schemaResult.textContent = `Valid JSON syntax. @type: ${type}. @context: ${context}. Next, check the markup with the official Schema Markup Validator.`;
  } catch (error) {
    schemaResult.className = "result-box error";
    schemaResult.textContent = `Invalid JSON: ${error.message}`;
  }
});
document.querySelector("#reset-button").addEventListener("click", () => {
  schemaInput.value = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Example Organization",
    "url": "https://example.com/"
  }, null, 2);
  schemaResult.className = "result-box neutral";
  schemaResult.textContent = "Example restored. Click “Check JSON syntax” to validate it.";
});

const checks = [...document.querySelectorAll('.check-row input[type="checkbox"]')];
const progressLabel = document.querySelector("#progress-label");
const progressFill = document.querySelector("#progress-fill");
const progressMessage = document.querySelector("#progress-message");
function updateProgress() {
  const done = checks.filter(check => check.checked).length;
  progressLabel.textContent = `${done} / ${checks.length}`;
  progressFill.style.width = `${done / checks.length * 100}%`;
  progressMessage.textContent = done === checks.length
    ? "All checklist items are marked complete. Keep your proof genuine and current."
    : done === 0
      ? "Start with the canonical URL and metadata checks."
      : `${checks.length - done} checklist item(s) remaining.`;
}
checks.forEach(check => check.addEventListener("change", updateProgress));
updateProgress();
