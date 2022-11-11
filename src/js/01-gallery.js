import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);
const galleryContainer = document.querySelector(".gallery");
const imagesMarkup = createImageGallery(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", imagesMarkup);

function createImageGallery(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>`;
    })
    .join("");
}
const createModalWindow = (imageAddress) => {
  window.instance = basicLightbox.create(
    `
    <img src="${imageAddress}">
`,
    {
      onShow: () =>
        window.addEventListener("keydown", closeModalWindowByEscPressing),
      onClose: () => {
        window.removeEventListener("keydown", closeModalWindowByEscPressing);
        document.body.classList.remove("disable-scroll");
      },
    }
  );
  return instance;
};

galleryContainer.addEventListener("click", onClickOpenModal);

function onClickOpenModal(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  const originalImageRef = event.target.dataset.source;
  createModalWindow(originalImageRef).show();
  document.body.classList.add("disable-scroll");
}

function closeModalWindowByEscPressing(event) {
  const ESC_KEY_CODE = "Escape";
  if (event.code === ESC_KEY_CODE && instance.visible()) {
    instance.close();
    document.body.classList.remove("disable-scroll");
  }
}

const lazyImages = galleryContainer.querySelectorAll(".gallery__image");

lazyImages.forEach((image) =>
  image.addEventListener("load", onImageLoaded, { once: true })
);

function onImageLoaded(event) {
  event.target.classList.add("appear");
}

lazyImages.forEach((image) =>
  image.addEventListener("mouseenter", onMouseEnter)
);

function onMouseEnter(event) {
  event.target.style.transitionDelay = "100ms";
  event.target.style.transitionDuration = "500ms";
}
