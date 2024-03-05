class App {
  constructor() {
    this.photographersApi = new PhotographersApi("/data/photographers.json");
  }

  async pageListPhotographes() {
    const photographers = await this.photographersApi.getPhotographersList();
    this.photographersRenderList = new PhotographersRenderList(photographers);
    this.photographersRenderList.render(photographers);
  }

  async pagePhotographe(id) {
    const photographer = await this.photographersApi.getPhotographerById(id);

    //instancier page du photographe
    this.photo = new PhotographerCardMedias(photographer);
    this.photo.renderPhotographerHeader(photographer.information);
    this.photo.renderPhotographerMedia(photographer);
    this.photo.renderLikeMedia(photographer);

    this.SorterForm = new SorterForm(
      photographer,
      photographer.medias,
      photographer.information
    );
    this.SorterForm.render(
      photographer,
      photographer.medias,
      photographer.information
    );
  }
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
