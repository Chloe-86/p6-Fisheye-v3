class App {
  constructor() {
    this.$photographersWrapper = document.querySelector(
      ".photographer_section"
    );
    this.photographersApi = new PhotographersApi("/data/photographers.json");
    this.photosSection = document.querySelector(".photos_section");
    this.photosHeader = document.querySelector(".photograph-head");
  }

  async main() {
    const media = await this.photographersApi.getMedias();
    const photographers = await this.photographersApi.getPhotographers();
    const id = this.getPhotographerIdFromUrl();
    const isVideoFormat = ".mp4";

    if (window.location.pathname === "/") {
      this.renderPhotographers(photographers);
    }
   
    if (id) {
      this.renderPhotographerHeader(photographers, id);
      this.renderPhotographerMedia(photographers, media, id);
    }
    this.SorterForm = new SorterForm(photographers, media);
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

  getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  }

  renderPhotographers(photographers) {
    photographers.forEach((photographer) => {
      const template = new PhotographerCard(photographer);
      this.$photographersWrapper.appendChild(template.getUserCardDOM());
    });
  }

  renderPhotographerHeader(photographers, id) {
    const photographer = photographers.find((p) => p.id == id);
    if (photographer) {
      const header = new PhotographerCard(photographer);
       //ici deplacer la logique d attache dans le cardmediaheader
      this.photosHeader.appendChild(header.getHeader());
    } else {
      console.log("Aucun photographe trouvé avec l'ID spécifié.");
    }
  }

  renderPhotographerMedia(photographers, media, id, url, namePerson) {
    const photographerMedia = media.filter(
      (item) => item.photographerId === parseInt(id)
    );

    if (photographerMedia.length > 0) {
      photographerMedia.forEach((mediaItem) => {
        const photographer = photographers.find(
          (p) => p.id == mediaItem.photographerId
        );

        if (photographer) {
          namePerson = photographer.name;
          const template = new PhotographerCard(photographer, mediaItem);
          this.photosSection.appendChild(template.getUserCardMedia());
        }
      });
      this.likeHeartEventListeners();
      this.urlImages(url);
      this.modalDisplay(namePerson);
    } else {
      console.log("Aucun média trouvé pour ce photographe.");
    }
  }
  // sortie main
}
// sortie class
const app = new App();
app.main();
