class App {
  constructor() {
    this.photographersApi = new PhotographersApi("/data/photographers.json");
    this.body = document.querySelector('body');
    this.headerBanner = new HeaderBanner();
    this.main= document.createElement('div');
    this.main.id = 'main';
    this.body.appendChild(this.main);
   
  }

  async pageListPhotographes() {

    this.headerBanner.renderPhotographersHeader();

    const photographers = await this.photographersApi.getPhotographersList();
    this.photographersRenderList = new PhotographersRenderList(photographers);
    this.photographersRenderList.render(photographers);
    
  }

  async pagePhotographe(id) {
    const photographer = await this.photographersApi.getPhotographerById(id);

     this.headerBanner.renderPhototographerHeader();

    // console.log(photographer)
    // console.log(photographer.information)
    // console.log(photographer.medias);
    this.fetchLike = new FetchLikeNumber(photographer);
 
    
    
    //instancier page du photographe
    this.photo = new PhotographerCardMedias(photographer, null, this.fetchLike);

    //instancier le header
    this.header = new HeaderCardPresentation(photographer);
    this.header.renderPhotographerHeader(photographer);
    

     // appele les medias
    this.photo.renderPhotographerMedia(photographer);

    
    //appelle le filtre
    this.SorterForm = new SorterForm(
      photographer,
      photographer.medias,
      photographer.information,
      this.photo
    );
    this.SorterForm.render(
      photographer,
      photographer.medias,
      photographer.information,
      
    );
   
    this.fetchLike.fetchLikeNumber();
    this.fetchLike.render();
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
