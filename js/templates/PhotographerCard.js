class PhotographerCard {
  static instance = null; // Propriété statique pour stocker l'instance unique de la lightbox
  constructor(photographer, mediaItem) {
    this.photographerInformation = photographer;
    this.media = mediaItem;
    this.photosSection = document.querySelector(".photos_section");
    this.photosHeader = document.querySelector(".photograph-head");
    this.main = document.querySelector("#main");
  }

  static getInstance() {
    if (!Lightbox.instance) {
      Lightbox.instance = new Lightbox();
    }
    return Lightbox.instance;
  }
  fetchLikeNumber() {
    // Sélectionner tous les éléments <p> avec la classe "like"
    const likeElements = document.querySelectorAll(".likes p");
  
    // Créer un tableau pour stocker les valeurs des likes
    const likeValues = [];

    // Parcourir tous les éléments <p> sélectionnés
    likeElements.forEach((element) => {
      // Obtenir le texte contenu dans chaque élément <p> et l' ajouter au tableau
      likeValues.push(parseInt(element.textContent.trim()));
    });
    const likeNumberTotal = likeValues.reduce((acc, curr) => acc + curr, 0);
    // Maintenant, likeValues contient toutes les valeurs de likes
    console.log(likeValues);
    const wrapper = document.createElement("div");
    wrapper.classList.add("likeWrapper");

    const likeNumber = `
      <article class="card-like">
            <div class="likes">
              <img src="assets/images/svg/blacklike.svg" class="clicklike">
              <p>${likeNumberTotal}</p>
            </div>
            <div>
            <p>${this.photographerInformation.price} € / jour</p>
          </div>
      </article>
          `;
    wrapper.innerHTML = likeNumber;
    return wrapper;
  }

  renderPhotographerHeader(photographerInformation, mediaItem) {
    const header = new PhotographerCard(photographerInformation);
    this.photosHeader.appendChild(header.getHeader());
    
  }

  renderPhotographerMedia(photographer) {
    photographer.medias.forEach((mediaItem) => {
      const template = new PhotographerCard(
        photographer.information,
        mediaItem
      );
      this.photosSection.appendChild(template.getUserCardMedia());
      this.likeHeartEventListeners(mediaItem, photographer.information);
      this.urlImages(photographer.information.url, photographer, mediaItem);
      this.lightbox = new Lightbox(photographer, mediaItem);
      this.modalDisplay(photographer.information.name);
     
    });
    
  }
  renderLikeMedia(photographer){
    const mediaLike = new PhotographerCard(photographer.information);
    this.main.appendChild(mediaLike.fetchLikeNumber());
  }
  // lightboxeKill() {
  //   let lightboxes = document.querySelectorAll(".lightbox");
  //   for (let i = 1; i < lightboxes.length; i++) {
  //     lightboxes[i].remove();
  //   }
  // }

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

  urlImages(url, photographer, mediaItem, namePerson) {
    let images = document.querySelectorAll(".containerImage img");
    namePerson = this.photographerInformation.information.name;
    let mediaList = [mediaItem];
    let imageArray = [];
    let titleArray = [];
    let newMedia;
    for (let i = 0; i < mediaList.length; i++) {
      imageArray.push(mediaList[i].image);
      titleArray.push(mediaList[i].title);
      newMedia += imageArray + titleArray;
    }

    images.forEach((img) => {
      img.addEventListener("click", (e) => {
        e.preventDefault();
        // this.lightboxeKill();
        url = e.target.src;
        namePerson = this.photographerInformation.information.name;

        // Créez une nouvelle liste de médias à chaque clic sur une image

        if (!PhotographerCard.lightboxInstance) {
          // S'il n'y a pas encore d'instance de la lightbox, créez-en une
          PhotographerCard.lightboxInstance = new Lightbox(
            url,
            photographer,
            mediaItem,
            namePerson,
            mediaList
          );
        } else {
          // Si une instance existe déjà, mettez à jour ses informations
          PhotographerCard.lightboxInstance.setUrl(url);
          PhotographerCard.lightboxInstance.setList(mediaList);
        }

        // Affichez la lightbox
        PhotographerCard.lightboxInstance.render();

        img.classList.add("clicked-img");
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

  getHeader() {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("photograph-header");

    const headerCard = `
          <div class="info">
                  <h2>${this.photographerInformation.name}</h2>
                  <h3> ${this.photographerInformation.city} , ${this.photographerInformation.country} </h3>
                  <p>${this.photographerInformation.tagline}</p>
           </div>
                  <button class="contact_button">Contactez-moi</button>
                  <div class="photo">
                    <img alt="${this.photographerInformation.name}" src="/assets/photographers/${this.photographerInformation.portrait}" />
                  </div>
              `;

    $wrapper.innerHTML = headerCard;
    return $wrapper;
  }

  getUserCardDOM() {
    const $wrapper = document.createElement("div");

    const photographerCard = `
        <article>
            <a href="photographer.html?id=${this.photographerInformation.id}">
                <img
                    alt="${this.photographerInformation.name}"
                    src="/assets/photographers/${this.photographerInformation.portrait}"
                />
            </a>
            <h2>${this.photographerInformation.name}</h2>
            <h3> ${this.photographerInformation.city} , ${this.photographerInformation.country} </h3>
            <p>
            <span>${this.photographerInformation.tagline}</span>
            <span>${this.photographerInformation.price}/jour</span> 
            </p>
        </article>
        `;

    $wrapper.innerHTML = photographerCard;
    return $wrapper;
  }

  getUserCardMedia() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("card-wrapper");

    let isVideo = this.media.video;
    let image = this.media.image;
    let load = image;
    let mediaElement;
    if (typeof image !== "undefined") {
      mediaElement = `<img src="assets/images/sample_photo/${this.photographerInformation.name}/${image}" alt="${this.media.title}">`;
    } else if (typeof isVideo !== "undefined") {
      mediaElement = `<video autoplay loop controls src="assets/images/sample_photo/${this.photographerInformation.name}/${isVideo} "></video>`;
      load = isVideo;
    } else {
      // Gérer le cas où ni l'image ni la vidéo ne sont définies
      mediaElement = "<p>Aucun média disponible</p>";
    }

    const photographerCardMedia = `
    <article class="card">
        <div class="containerImage">
           <a href="../assets/images/sample_photo/${this.photographerInformation.name}/${load}">
             ${mediaElement}
            </a>
            </div>
            <div class="containerInfo">
                <p >${this.media.title}</p>
                <div class="likes"><p>${this.media.likes}</p>
                    <img src="assets/images/svg/like.svg" class="clicklike">
                </div>
            </div>
        </div>
    </article>
        `;

    wrapper.innerHTML = photographerCardMedia;
    return wrapper;
  }
}
