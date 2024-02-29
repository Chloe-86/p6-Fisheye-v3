class Lightbox {
  constructor(photographer, media, url) {
    this.photographer = photographer;
    this.media = media;
    this.url = url;
    // Création d'un élément div pour le wrapper du formulaire de tri
    this.$wrapper = document.createElement("div");
    // Sélection de l'élément avec la classe "filter-wrapper" pour le wrapper du formulaire de tri
    this.$wrapper.classList.add("lightbox");
    this.$filterFormWrapper = document.querySelector("body");
  }
  setUrl(url) {
    this.url = url;
    }
    
  closeModal() {
    this.$filterFormWrapper.removeChild(this.$wrapper);
  }

  render() {
    console.log("ok");
    // Définit le HTML du formulaire de tri
    const lightbox = `
            <button class="lightbox__close"></button>
            <button class="lightbox__next"></button>
            <button class="lightbox__prev"></button>
            <div class="lightbox__container">
                <img src="${this.url}">
            </div>
        `;

    // Injecte le HTML du formulaire dans le wrapper du formulaire
    this.$wrapper.innerHTML = lightbox;

    // Ajoute le formulaire rendu au wrapper du formulaire dans le document
    this.$filterFormWrapper.appendChild(this.$wrapper);

    // Ajout du gestionnaire d'événements au bouton de fermeture
    const closeButton = this.$wrapper.querySelector(".lightbox__close");
    closeButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.closeModal(); // Appel de la méthode closeModal() lorsque le bouton de fermeture est cliqué
    });
  }
}
