class PhotographerCardMedias {
  constructor(photographer, mediaItem) {
    this.main = main;
    this.photographerInformation = photographer;
    this.media = mediaItem;
    this.body = document.querySelector("body");
    
  }

  createPhotosSection() {
    const photosSection = document.createElement("div");
    photosSection.classList.add("photos_section");

    this.gallery = document.createElement("div");
    this.gallery.classList.add("gallery");
    this.main.appendChild(this.gallery);
    this.gallery.appendChild(photosSection);
    this.photosSection = photosSection;
    return photosSection;
  }

  renderPhotographerMedia(photographer) {
    this.createPhotosSection();

    photographer.medias.forEach((mediaItem) => {
      const template = new PhotographerCardMedias(
        photographer.information,
        mediaItem
      );

      this.photosSection.appendChild(template.getUserCardMedia());
      this.likeHeartEventListeners(mediaItem, photographer.information);
      this.urlImages(photographer.information.url, photographer, mediaItem);
      this.lightbox = new Lightbox(photographer, mediaItem);
    });
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

  urlImages(url, photographer, mediaItem, namePerson) {
    let images = document.querySelectorAll(".containerImage img");

    namePerson = this.photographerInformation.information.name;
   
    images.forEach((img) => {
    
      img.addEventListener("click", (e) => {
   
        e.preventDefault();
        // this.lightboxeKill();
        url = e.target.src;
        namePerson = namePerson;
       
        this.lightbox.setUrl(url);

        this.lightbox.render(
          url,
          mediaItem,
          photographer,
          namePerson
        );
        img.classList.add("clicked-img");
      });
    });
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
      mediaElement = `<video autoplay loop controls aria-label="${this.media.title}" src="assets/images/sample_photo/${this.photographerInformation.name}/${isVideo} "></video>`;
      load = isVideo;
    } else {
      // Gérer le cas où ni l'image ni la vidéo ne sont définies
      mediaElement = "<p>Aucun média disponible</p>";
    }

    const photographerCardMedia = `

      <article class="card">
          <div class="containerImage">
             <a aria-label="Cliquez ici pour ouvrir la lightbox" href="../assets/images/sample_photo/${this.photographerInformation.name}/${load}"> 
               ${mediaElement}
              </a>
              </div>
              <div class="containerInfo">
                  <p >${this.media.title}</p>
                  <div class="likes"><p>${this.media.likes}</p>
                      <img src="assets/images/svg/like.svg" class="clicklike" alt="coeur">
                  </div>
              </div>
          </div>
      </article>
 
          `;

    wrapper.innerHTML = photographerCardMedia;

    return wrapper;
  }
}
