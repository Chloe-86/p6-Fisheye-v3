class PhotographerCardMedias {
  constructor(photographer, mediaItem) {
    this.main = main;
    this.photographerInformation = photographer;
    this.media = mediaItem;
    this.body = document.querySelector("body");
    this.newArrayLightbox = [];
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

    let newArrayLightbox = [];

    for (let i = 0; i < photographer.medias.length; i++) {
      let media = photographer.medias[i];
      let mediaObject;

      if (media.image === undefined) {
        mediaObject = {
          video: media.video,
          title: media.title,
        };
      } else {
        mediaObject = {
          image: media.image,
          title: media.title,
        };
      }

      newArrayLightbox.push(mediaObject);
    }
    // Créer une copie de newArrayLightbox
    const newArrayLightboxCopy = newArrayLightbox.slice();


    photographer.medias.forEach((mediaItem) => {
      const template = new PhotographerCardMedias(
        photographer.information,
        mediaItem
      );

      this.photosSection.appendChild(template.getUserCardMedia());
      this.likeHeartEventListeners(mediaItem, photographer.information);
      this.urlImages(
        photographer.information.url,
        photographer,
        mediaItem,
        photographer,
        photographer.information,
        newArrayLightboxCopy
      );
    });
    this.lightbox = new Lightbox(photographer.information, photographer.medias, newArrayLightboxCopy);
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

  urlImages(url, photographer, mediaItem, newArrayLightboxCopy) {
    let images = document.querySelectorAll(".containerImage img");

    images.forEach((img) => {
      img.addEventListener("click", (e) => {
        e.preventDefault();

        const parentContainer = e.target.closest(".card");
        if (parentContainer) {
          // Récupérer l'élément p à l'intérieur du parent
          const titleElement =
            parentContainer.querySelector(".containerInfo p");
          if (titleElement) {
            // Récupérer le titre
            let title = titleElement.textContent;

            this.lightbox.setTitle(title);
          }
        }
        url = e.target.src;
        this.lightbox.setUrl(url);
        this.lightbox.render(url, mediaItem, photographer, newArrayLightboxCopy);

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
