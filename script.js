document.querySelector('#year').textContent = new Date().getFullYear();

const pagesTrack = document.querySelector('.pages-track');
if (pagesTrack) {
const pageSlides = Array.from(pagesTrack.querySelectorAll('.page-slide'));
const pageDots = Array.from(document.querySelectorAll('[data-page]'));
const pageStatus = document.querySelector('.carousel-status');
let currentPage = 0;
function loadPage(index) {
  const image = pageSlides[index].querySelector('img');
  if (!image.dataset.src) return;
  image.srcset = image.dataset.srcset;
  image.src = image.dataset.src;
  delete image.dataset.srcset;
  delete image.dataset.src;
}
function showPage(index) {
  const next = (index + pageSlides.length) % pageSlides.length;
  loadPage(next);
  const left = pageSlides[next].offsetLeft - pageSlides[0].offsetLeft;
  pagesTrack.scrollTo({ left, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}
function updatePage() {
  currentPage = pageSlides.reduce((closest, slide, index) => {
    const position = slide.offsetLeft - pageSlides[0].offsetLeft;
    const closestPosition = pageSlides[closest].offsetLeft - pageSlides[0].offsetLeft;
    return Math.abs(position - pagesTrack.scrollLeft) < Math.abs(closestPosition - pagesTrack.scrollLeft) ? index : closest;
  }, 0);
  loadPage(currentPage);
  pageDots.forEach((dot, index) => {
    if (index === currentPage) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
  });
  pageStatus.textContent = `Página ${currentPage + 1} de ${pageSlides.length}`;
}
document.querySelector('[data-page-prev]').addEventListener('click', () => showPage(currentPage - 1));
document.querySelector('[data-page-next]').addEventListener('click', () => showPage(currentPage + 1));
pageDots.forEach(dot => dot.addEventListener('click', () => showPage(Number(dot.dataset.page))));
pagesTrack.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showPage(currentPage + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
let carouselScrollTimer;
pagesTrack.addEventListener('scroll', () => {
  clearTimeout(carouselScrollTimer);
  carouselScrollTimer = setTimeout(updatePage, 100);
}, { passive: true });
window.addEventListener('resize', updatePage);
}
