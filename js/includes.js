/**
 * HTML Component Loader
 * Betölti a [data-include] attribútummal jelölt komponens fájlokat.
 * Futtatáshoz lokális szerver szükséges (pl. VS Code Live Server).
 */
document.querySelectorAll('[data-include]').forEach(async (el) => {
  try {
    const response = await fetch(el.dataset.include);
    if (!response.ok) throw new Error(`Nem sikerült betölteni: ${el.dataset.include}`);
    const html = await response.text();
    el.outerHTML = html;
  } catch (err) {
    console.error(err);
  }
});
