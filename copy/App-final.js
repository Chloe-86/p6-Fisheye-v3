class App {
  constructor() {
    this.$photographersWrapper = document.querySelector(".photographer_section");
    this.photographersApi = new PhotographersApi("/data/photographers.json");
    this.photosSection = document.querySelector(".photos_section");
    this.photosHeader = document.querySelector(".photograph-head");
  }

  async main() {
    try {
      const media = await this.photographersApi.getMedias();
      const photographers = await this.photographersApi.getPhotographers();
      const id = this.getPhotographerIdFromUrl();
      // const isVideo = '.mp4';

      if (window.location.pathname === "/") {
        this.renderPhotographers(photographers);
      }

      if (id) {
        this.renderPhotographerHeader(photographers, id);
        this.renderPhotographerMedia(photographers, media, id);
      }

        // Vos opérations existantes...
        this.SorterForm = new SorterForm(photographers, media);
        this.SorterForm.render(); // Appeler la méthode render de FilterForm
        
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
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
      this.photosHeader.appendChild(header.getHeader());
    } else {
      console.log("Aucun photographe trouvé avec l'ID spécifié.");
    }
  }

  renderPhotographerMedia(photographers, media, id) {
    const photographerMedia = media.filter((item) => item.photographerId === parseInt(id));
    if (photographerMedia.length > 0) {
      photographerMedia.forEach((mediaItem) => {
        const photographer = photographers.find((p) => p.id == mediaItem.photographerId);
        if (photographer) {
          const template = new PhotographerCard(photographer, mediaItem);
          this.photosSection.appendChild(template.getUserCardMedia());
        }
      });
    } else {
      console.log("Aucun média trouvé pour ce photographe.");
    }
  }

}

const app = new App();
app.main();
