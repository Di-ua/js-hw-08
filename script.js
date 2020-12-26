import galleryItems from "./gallery-items.js";

/*********Задание
Создай галерею с возможностью клика по ее элементам и просмотра полноразмерного изображения в модальном окне. Превью результата посмотри по ссылке.
Разбей задание на несколько подзадач:

Создание и рендер разметки по массиву данных и предоставленному шаблону.
Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
Открытие модального окна по клику на элементе галереи.
Подмена значения атрибута src элемента img.lightbox__image.
Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
............................................................
Разметка элемента галереи
Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img, и указываться в href ссылки (это необходимо для доступности).

<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>
 */
// const galleryListRef = document.querySelector("ul.js-gallery");
// galleryListRef.addEventListener("click", onGalleryClick);

// const createItem = (item, array) => {
//   const itemRef = document.createElement("li");
//   const linkRef = document.createElement("a");
//   const imageRef = document.createElement("img");
//   const { preview, original, description } = item;
//   itemRef.classList.add("gallery__item");
// };
const galleryContainer = document.querySelector(".js-gallery");
const lightboxWindow = document.querySelector(".js-lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);
galleryContainer.addEventListener("click", onGalleryContainerClick);
lightboxOverlay.addEventListener("click", onBackdropClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
              <a class="gallery__link" href=${original}>
                <img
                  class="gallery__image"
                  src=${preview}
                  data-source=${original}
                  alt=${description}
                />
              </a>
            </li>`;
    })
    .join("");
}

function onGalleryContainerClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  lightboxWindow.classList.add("is-open");
  openImage(event);
  window.addEventListener("keydown", onKeyPress);
  closeModalBtn.addEventListener("click", closeModal);
}

function openImage(event) {
  lightboxImage.src = event.target.dataset.source;
  lightboxImage.alt = event.target.alt;
}

function closeModal() {
  lightboxWindow.classList.remove("is-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  window.removeEventListener("keydown", onKeyPress);
  closeModalBtn.removeEventListener("click", closeModal);
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function onKeyPress(event) {
  const indexArray = galleryItems.map((item) => item.original);
  let index = indexArray.indexOf(lightboxImage.src);
  switch (event.code) {
    case "Escape":
      closeModal();
      break;
    case "ArrowLeft": {
      if (index === 0) {
        index = galleryItems.length;
      }
      lightboxImage.src = galleryItems[index - 1].original;
      break;
    }
    case "ArrowRight": {
      if (index === galleryItems.length - 1) {
        index = -1;
      }
      lightboxImage.src = galleryItems[index + 1].original;
      break;
    }
  }
}
