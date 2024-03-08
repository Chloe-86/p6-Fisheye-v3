class HeaderCardPresentation {
  constructor(photographer) {
    this.main = main;
    this.photographerInformation = photographer.information;
    this.body = document.querySelector("body");
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("photograph-header");
    this.contactForm = new ContactForm(this.photographerInformation.name);
  }
  
  renderPhotographerHeader() {
    const header = this.renderHTML();
    this.main.appendChild(header);
    this.addContactButtonListener(); 
  }

  renderHTML() {
    const headerContent = `
        <div class="info">
          <h2>${this.photographerInformation.name}</h2>
          <h3>${this.photographerInformation.city}, ${this.photographerInformation.country}</h3>
          <p>${this.photographerInformation.tagline}</p>
        </div>
        <button role="button" aria-disabled="false" class="contact_button">Contactez-moi</button>
        <div class="photo">
          <img alt="${this.photographerInformation.name}" src="/assets/images/photographers/${this.photographerInformation.portrait}" />
        </div>
      `;

    this.wrapper.innerHTML = headerContent;
    return this.wrapper;
  }

  addContactButtonListener() {
    const contactButton = document.querySelector(".contact_button");
    contactButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.contactForm.render(this.photographerInformation.name);
    });
  }

}
