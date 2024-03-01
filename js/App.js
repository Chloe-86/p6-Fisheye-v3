class App {
  constructor() {
    this.$photographersWrapper = document.querySelector(
      ".photographer_section"
    );
    this.photographersApi = new PhotographersApi("/data/photographers.json");
    this.photosSection = document.querySelector(".photos_section");
    this.photosHeader = document.querySelector(".photograph-head");
  }

  async pageListPhotographes() {
    const photographers = await this.photographersApi.getPhotographers();
    this.renderPhotographers(photographers);
  }

  async pagePhotographe(id) {
    const photographer = await this.photographersApi.getPhotographerById(id);

    this.renderPhotographerHeader(photographer.information);
    this.renderPhotographerMedia(photographer);

    this.SorterForm = new SorterForm(photographer.medias);
    this.SorterForm.render();
  }

  likeHeartEventListeners() {
    let likes = document.querySelectorAll(".clicklike");

    likes.forEach((like) => {
      like.addEventListener("click", (e) => {
        if (!like.classList.contains("clicked")) {
          // Vérifie si le like n'a pas déjà été cliqué
          const likeNumber = e.target.previousElementSibling;
          let likeNumberValue = parseInt(
            likeNumber.textContent.trim().replace(/['"]+/g, "")
          );
          let newLikeValue = likeNumberValue + 1;
          likeNumber.textContent = newLikeValue;
          like.classList.add("clicked");
        }
      });
    });
  }
  urlImages(url) {
    let images = document.querySelectorAll(".containerImage img");

    images.forEach((img) => {
      img.addEventListener("click", (e) => {
        e.preventDefault();
        if (!img.classList.contains("clicked")) {
          url = e.target.src;
          this.lightbox = new Lightbox(url);
          this.lightbox.setUrl(url);
          this.lightbox.render(url);
          img.classList.add("clicked");
        }
      });
    });
  }
  modalDisplay(namePerson) {
    const btn = document.querySelector(".contact_button");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!btn.classList.contains("clicked")) {
        this.ContactForm = new ContactForm(namePerson);
        this.ContactForm.setName(namePerson);
        this.ContactForm.render(namePerson);
        btn.classList.add("clicked");
      }
    });
  }

  renderPhotographers(photographers) {
    photographers.forEach((photographer) => {
      const template = new PhotographerCard(photographer);
      this.$photographersWrapper.appendChild(template.getUserCardDOM());
    });
  }

  renderPhotographerHeader(photographerInformation) {
    const header = new PhotographerCard(photographerInformation);
    //ici deplacer la logique d attache dans le cardmediaheader
    this.photosHeader.appendChild(header.getHeader());
  }

  renderPhotographerMedia(photographer) {
    photographer.medias.forEach((mediaItem) => {
      const template = new PhotographerCard(
        photographer.information,
        mediaItem
      );
      this.photosSection.appendChild(template.getUserCardMedia());
    });

    this.likeHeartEventListeners();
    this.urlImages(photographer.information.url);
    this.modalDisplay(photographer.information.name);
  }
  // sortie main
}

const app = new App();

let id = null;
try {
  const urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get("id");
} catch (e) {}

if (id !== null) {
  app.pagePhotographe(id);
} else {
  app.pageListPhotographes();
}
