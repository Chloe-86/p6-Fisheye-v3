class Lightbox {
  constructor(photographer, mediaItem, newArrayLightboxCopy) {
    this.photographerInformation = photographer;
    this.mediaItem = mediaItem; 
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("lightbox");
    this.filterFormWrapper = document.querySelector("body");
    this.newArrayLightboxCopy = newArrayLightboxCopy;
    this.index = 0;
    this.lightboxHTML;
    this.url = `/assets/images/Sample_photo/${this.photographerInformation.name}/${this.newArrayLightboxCopy.image});
    }`;
  }

  setTitle(title) {
    this.title = title;
  }
  setUrl(url) {
    this.url = url;
  }

  render() {
    // Définit le HTML de la lightbox
    let lightboxHTML = `
      <div class="lightbox__container1">
        <div class="lightbox__container2">
          <button role="button" aria-disabled="false" class="lightbox__close"></button>
          <button role="button" aria-disabled="false" class="lightbox__next"></button>
          <button role="button" aria-disabled="false" class="lightbox__prev"></button>
          <img src="${this.url}">
          <p>${this.title}</p>
        </div>
        
      </div>
    `;
  
    // Injecte le HTML de la lightbox dans le wrapper
    this.wrapper.innerHTML = lightboxHTML;

    // Ajoute la lightbox au document
    this.filterFormWrapper.appendChild(this.wrapper);

    // Sélectionne les éléments de la lightbox
    const lightboxCont = this.wrapper.querySelector(".lightbox__container1");
    const lightboxNext = this.wrapper.querySelector(".lightbox__next");
    const lightboxPrev = this.wrapper.querySelector(".lightbox__prev");
    const closeButton = this.wrapper.querySelector(".lightbox__close");

    // Ajoute les gestionnaires d'événements
    lightboxCont.addEventListener("click", (e) => {
      switch (e.target.className) {
        case "lightbox__next":
          this.nextImage();
          break;
        case "lightbox__prev":
          this.prevImage();
          break;
        case "lightbox__close":
          this.closeModal();
          break;
      }
    });
  }

  nextImage() {
    if (this.index < this.newArrayLightboxCopy.length - 1) {
      this.index++;
      this.update();
    }
  }

  prevImage() {
    if (this.index > 0) {
      this.index--;
      this.update();
    }
  }

  update() {
    const currentImage = this.newArrayLightboxCopy[this.index];
    const imageElement = this.wrapper.querySelector(".lightbox__container2 img");
    const titleElement = this.wrapper.querySelector(".lightbox__container2 p");

    if (currentImage) {
      if (currentImage.image === undefined) {
              // Créer un élément vidéo et le configurer
              const videoElement = document.createElement("video");
              videoElement.autoplay = true;
              videoElement.loop = true;
              videoElement.controls = true;
              videoElement.setAttribute("aria-label", currentImage.title);
              videoElement.src = `/assets/images/Sample_photo/${this.photographerInformation.name}/${currentImage.video}`;
              
              // Remplacer l'élément img existant par l'élément vidéo
              imageElement.parentNode.replaceChild(videoElement, imageElement);
            } else {
              // Si ce n'est pas une vidéo, mettre à jour simplement l'attribut src de l'élément img
              imageElement.src = `/assets/images/Sample_photo/${this.photographerInformation.name}/${currentImage.image}`;
            }


        imageElement.src = `/assets/images/Sample_photo/${this.photographerInformation.name}/${currentImage.image}`;
        titleElement.textContent = currentImage.title;
    }
}
  closeModal() {
    this.filterFormWrapper.removeChild(this.wrapper);
  }
}
