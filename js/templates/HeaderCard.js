class HeaderCard {
    constructor(photographer) {
      this.photographerInformation = photographer;
      this.photosHeader = document.querySelector(".photograph-head");
      this.renderHeader();
    }
  
    renderHeader() {
      const headerContent = `
        <div class="info">
          <h2>${this.photographerInformation.name}</h2>
          <h3>${this.photographerInformation.city}, ${this.photographerInformation.country}</h3>
          <p>${this.photographerInformation.tagline}</p>
        </div>
        <button class="contact_button">Contactez-moi</button>
        <div class="photo">
          <img alt="${this.photographerInformation.name}" src="/assets/photographers/${this.photographerInformation.portrait}" />
        </div>
      `;
  
      this.photosHeader.innerHTML = headerContent;
      this.addContactButtonListener();
    }
  
    addContactButtonListener() {
      const contactButton = document.querySelector(".contact_button");
      contactButton.addEventListener("click", (event) => {
        event.preventDefault();
        this.openContactForm();
      });
    }
  
    openContactForm() {
      if (!this.contactForm) {
        this.contactForm = new ContactForm(this.photographerInformation.name);
        this.contactForm.render();
      }
    }
  }
  