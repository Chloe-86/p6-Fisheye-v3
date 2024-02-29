class App {
  constructor() {
    this.$photographersWrapper = document.querySelector(
      ".photographer_section"
    );
    this.photographersApi = new photographersApi("/data/photographers.json");
    this.photos_section = document.querySelector(".photos_section");
    this.photos_header = document.querySelector(".photograph-head");
  }

  async main() {
    const media = await this.photographersApi.getMedias();
    const photos = await this.photographersApi.getPhotographers();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (window.location.pathname === "/") {
      photos.forEach((photographer) => {
        const Template = new photographerCard(photographer);
        this.$photographersWrapper.appendChild(Template.getUserCardDOM());
      });
    }
    //affiche les tableaux des photographes
    const photographerMedia = media.filter(
      (item) => item.photographerId === parseInt(id)
    );
    if (photographerMedia) {
      photographerMedia.forEach((mediaItem) => {
        const photographer = photos.find(
          (p) => p.id == mediaItem.photographerId
        );
        console.log(photographer);
        const Template = new photographerCard(photographer, mediaItem);
        this.photos_section.appendChild(Template.getUserCardMedia());
      });
    } else {
      console.log("Aucun photographe trouvé avec l'ID spécifié.");
    }

    if (id) {
      //affiche le header
      const photographer = photos.find((p) => p.id == id);
      console.log(photographer);
      if (photographer) {
        const Header = new photographerCard(photographer);
        this.photos_header.appendChild(Header.getHeader());
      } else {
        console.log("Aucun photographe trouvé avec l'ID spécifié.");
      }
    }
  }
}

const app = new App();
app.main();
