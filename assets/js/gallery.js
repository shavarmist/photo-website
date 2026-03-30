
(function () {
  const container = document.querySelector(".page-content .wrapper");
  if (!container) return "";

  const children = Array.from(container.children);

  const prelude = [];
  const galleries = [];

  let currentGallery = null;

  for (const el of children) {
    if (el.tagName.toLowerCase() === "h3") {
      // Start a new gallery
      currentGallery = [el];
      galleries.push(currentGallery);
    } else {
      if (currentGallery) {
        currentGallery.push(el);
      } else {
        // Before first h3 → prelude
        prelude.push(el);
      }
    }
  }

  // Build HTML
  let newHtml = "";

  // Add prelude
  newHtml += prelude.map(el => el.outerHTML).join("\n");

  // Add galleries
  for (const gal of galleries) {
    if (gal.length === 0) continue;

    const title = gal[0].innerText;

    const content = gal
      .slice(1)
      .map(el => el.outerHTML)
      .join("\n");

    newHtml += `
<section class="gallery">
  <label>
    <input type="checkbox"/>${title}
  </label>
  <div class="gallery-content">
    ${content}
  </div>
</section>`;
  }

   container.innerHTML = newHtml;
})();

