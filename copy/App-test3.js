class App {
  constructor() {
    this.photographersWrapper = document.querySelector(".photographer_section");
    this.photographersApi = new PhotographersApi(
      "./../data/photographers.json"
    );
    this.photosSection = document.querySelector(".photos_section");
    this.photosHeader = document.querySelector(".photograph-head");
    this.mediaArray = [];
    this.photographersArray = [];
  }

  async fetchMedias() {
    const mediasData = await this.photographersApi.getMedias();
    this.mediaArray = mediasData;
  }

  async fetchPhotographer() {
    const photographersData = await this.photographersApi.getPhotographers();
    this.photographersArray = photographersData; // Stockez les photographes dans photographersArray
  }

  async main() {
    await this.fetchMedias();
    await this.fetchPhotographer();

    this.mediaArray.forEach((media) => {
      console.log(media);
      const Template = new PhotographerCard(media);
      this.photographersWrapper.appendChild(Template.getUserCardDOM());
    });

    this.photographersArray.forEach((photographer) => {
      console.log(photographer);
      const Template = new PhotographerCard(photographer);
      this.photosSection.appendChild(Template.getUserCardDOM());
    });
  }
}

const app = new App();
app.main();
