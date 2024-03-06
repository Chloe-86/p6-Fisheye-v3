class ContactForm {
  constructor(photographer, media, url) {
    this.photographer = photographer;
    this.media = media;
    this.url = url;
    // Création d'un élément div pour le wrapper du formulaire de tri
    this.wrapper = document.createElement("div");
    // Sélection de l'élément avec la classe "filter-wrapper" pour le wrapper du formulaire de tri
    this.wrapper.classList.add("contact_modal");
    this.filterFormWrapper = document.querySelector("body");
  }

  closeModal() {
    // this.$filterFormWrapper.removeChild(this.$wrapper);
    this.wrapper.style.display = "none";
  }

  render(photographer) {
    // Définit le HTML du formulaire de tri
    const modal = `
            <div class="modal__container">
            <div id="contact_modal">
            <div class="modal">
              <header>
                <div class="header">
                  <h2>Contactez-moi</h2>
                  <img class="lightbox_close" src="assets/icons/close.svg"/>
                </div>
                <h3>${photographer}</h3>
              </header>
              <form name="reserve" action="index.html" method="get" id="signup">
                <div class="formData" id="nickName">
                  <label for="first">Prénom</label>
                  <input class="text-control" type="text" id="first" name="first" minlength="2" />
                  <span>Veuillez entrer 2 caractères ou plus pour le champ du
                    prénom.</span>
                </div>
                <div class="formData" id="name">
                  <label for="last">Nom</label>
                  <input class="text-control" type="text" id="last" name="last" />
                  <span>Veuillez entrer 2 caractères ou plus pour le champ du
                    nom.</span>
                </div>
                <div class="formData" id="checkEmail">
                  <label for="email">E-mail</label>
                  <input class="text-control" type="email" id="email" name="email" />
                  <span>Veuillez entrer une adresse email correcte</span>
                </div>
                <div class="formData" id="textarea">
                  <label for="area">Votre message</label>
                  <input class="text-area" type="text" id="area" name="area" />
                  <span>"Vous devez entrer un message"</span>
                </div>
                <input class="btn-submit contact_button" type="submit" class="button" value="Envoyer" />
              </form>
            </div>
          </div>
            </div>
        `;

    // Injecte le HTML du formulaire dans le wrapper du formulaire
    this.wrapper.innerHTML = modal;
    this.wrapper.style.display = "block";
    // Ajoute le formulaire rendu au wrapper du formulaire dans le document
    this.filterFormWrapper.appendChild(this.wrapper);

    // Ajout du gestionnaire d'événements au bouton de fermeture
    const closeButton = this.wrapper.querySelector(".lightbox_close");
    closeButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.closeModal(); // Appel de la méthode closeModal() lorsque le bouton de fermeture est cliqué
    });
  }
}
