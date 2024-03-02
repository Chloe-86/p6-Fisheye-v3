class App {
  constructor() {
    this.photographersApi = new PhotographersApi("/data/photographers.json"); 
  }

  async pageListPhotographes() {
    const photographers = await this.photographersApi.getPhotographers();
    this.photographers = new Photographers(photographers);
    this.photographers.renderPhotographers(photographers);

  }

  async pagePhotographe(id) {
    const photographer = await this.photographersApi.getPhotographerById(id);

    
    //instancier page du photographe
    this.photo = new PhotographerCard(photographer);
    this.photo.renderPhotographerHeader(photographer.information);
    this.photo.renderPhotographerMedia(photographer);

    this.SorterForm = new SorterForm(photographer,photographer.medias, photographer.information);
    this.SorterForm.render(photographer,photographer.medias, photographer.information);
    console.log(photographer);
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


