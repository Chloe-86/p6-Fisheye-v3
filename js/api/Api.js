class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
  }

  async get() {
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log("an error occurs", err));
  }
}

class PhotographersApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getPhotographersList() {
    const photographersData = await this.get();
    this.photographersData = photographersData.photographers;
    return await this.photographersData;
  }

  async getMedias() {
    const photographersData = await this.get();
    this.mediaData = photographersData.media;
    return await this.mediaData;
  }

  async getPhotographerById(id) {
    const photographersList = await this.getPhotographersList();
    const medias = await this.getMedias();
    const photographer = {
      information: {},
      medias: [],
    };

    photographersList.forEach((elt) => {
      if (elt.id == id) {
        photographer.information = elt;
      }
    //console.log(elt)//retourne 1 objet qui contient les 6 photographes
    });
    //console.log(photographs)//retourne les 6 photographes dans une boucle

    medias.forEach((elt) => {
    //console.log(medias)//retourne les 59 objets
      if (elt.photographerId == id) {
        photographer.medias.push(elt);
      }
      //console.log(photograph.medias)//retourne les medias de l'id les 11 medias de chaque id sur lequel je suis
    });

  // console.log(photograph.information)retourne les informations de 1 phototgraphe
    if (photographer.information.length == 0) {
      throw Error("Aucun photographe trouvé avec l'ID spécifié.");
    }
    const photoInfo = photographer.information;
    // console.log(photoInfo)
   
    return photographer;
  }
}
