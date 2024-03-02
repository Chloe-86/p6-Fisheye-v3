class PhotographerCard {
  constructor(photographer, mediaItem) {
    this.photographerInformation = photographer;
    this.media = mediaItem;
    this.photosSection = document.querySelector(".photos_section");
    this.photosHeader = document.querySelector(".photograph-head");
  }

  renderPhotographerHeader(photographerInformation) {
    const header = new PhotographerCard(photographerInformation);
    //ici deplacer la logique d attache dans le cardmediaheader
    this.photosHeader.appendChild(header.getHeader());
  }

  renderPhotographerMedia(photographer) {
    photographer.medias.forEach((mediaItem) => {
      const template = new PhotographerCard(
        photographer.information,
        mediaItem
      );
      this.photosSection.appendChild(template.getUserCardMedia());
      this.likeHeartEventListeners();
      this.urlImages(photographer.information.url);
      this.modalDisplay(photographer.information.name);
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
  urlImages(url) {
    let images = document.querySelectorAll(".containerImage img");

    images.forEach((img) => {
      img.addEventListener("click", (e) => {
        e.preventDefault();
        if (!img.classList.contains("clicked")) {
          url = e.target.src;
          this.lightbox = new Lightbox(url);
          this.lightbox.setUrl(url);
          this.lightbox.render(url);
          img.classList.add("clicked");
        }
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

    // Simulation de :focus avec focus et blur: (suspicion)ne fonctionne pas car pas attache encore$wrapper (regarder la lightbox: changer app)
    // this.$wrapper.querySelector('contact_button').addEventListener("focus", () => {
    //   // Ajouter des styles pour simuler :focus
    //   button.style.background = "#0056b3";
    // });
    //doit attacher ici appendchild le wrapper
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
