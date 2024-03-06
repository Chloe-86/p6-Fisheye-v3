class Lightbox {
  constructor(url, photographer, mediaItem, list) {
    this.photographerInformation = photographer;
    this.media = mediaItem;
    this.url = url;
    this.list = list;
    // Création d'un élément div pour le wrapper du formulaire de tri
    this.wrapper = document.createElement("div");
    // Sélection de l'élément avec la classe "filter-wrapper" pour le wrapper du formulaire de tri
    this.wrapper.classList.add("lightbox");
    this.filterFormWrapper = document.querySelector("body");
    this.index = 0; // Initialisez l'index à 0
  }

  setUrl(url) {
    this.url = url;
  }

  setList(mediaList) {
    this.list = mediaList;
  }

  render() {
    // Définit le chemin de l'image

    console.log(this.photographerInformation.information.name);

    // Définit le HTML de la lightbox
    const lightboxHTML = `
      <div class="lightbox__container1">
        <div class="lightbox__container2">
          <button class="lightbox__close"></button>
          <button class="lightbox__next"></button>
          <button class="lightbox__prev"></button>
          <img src="${this.url}">
          <p>${this.media.title}</p>
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

  update(newUrl, title) {
    const imageElement = this.wrapper.querySelector(
      ".lightbox__container2 img"
    );
    const titleElement = this.wrapper.querySelector(".lightbox__container2 p");
    imageElement.src = newUrl;
    titleElement.textContent = title;
  }

  // Méthode pour passer à l'image suivante
  nextImage() {
    console.log(this.list);
    this.index = (this.index + 1) % this.list.length;
    const nextMedia = this.list[this.index];
    const imageUrl = `../../assets/images/Sample_photo/${this.photographerInformation.information.name}/${nextMedia.image}`;
    this.update(imageUrl, nextMedia.title);
  }

  // Méthode pour passer à l'image précédente
  prevImage() {
    this.index = (this.index - 1 + this.list.length) % this.list.length;
    const prevMedia = this.list[this.index];
    const imageUrl = `../../assets/images/Sample_photo/${this.photographerInformation.information.name}/${prevMedia.image}`;
    this.update(imageUrl, prevMedia.title);
  }

  closeModal() {
    this.filterFormWrapper.removeChild(this.wrapper);
  }
}
