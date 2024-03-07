class SorterForm {
  constructor(photographer, photographers, mediaItem, photographerCardMedias ) {
    this.photographerInformation = photographer.information;
    this.photographers = photographers;
    this.media = mediaItem;
    this.media = photographer.medias;
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("filter-container");
    this.body = document.querySelector("body");
    this.ProxyRatingSorter = new ProxyRatingSorter();
    this.photographerCardMedias = photographerCardMedias;
    this.photosSection = photographerCardMedias.photosSection;
    this.gallery = photographerCardMedias.gallery;
  }

  async sorterMedias(sorter) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.clearPhotographWrapper();

    if (!!sorter) {
      const photographerMedia = this.media.filter(
        (item) => item.photographerId === parseInt(id)
      );

      const sortedData = await this.ProxyRatingSorter.sorter(
        photographerMedia,
        sorter
      );

      const sortedMedias = sortedData.data;

      if (sortedMedias.length > 0) {
        sortedMedias.forEach((media) => {
          const template = new PhotographerCardMedias(
            this.photographerInformation,
            media,
            this.photographerInformation.name
          );
          this.photosSection.appendChild(
            template.getUserCardMedia(this.photographerInformation.name)
          ); 
          // this.PhotographerCardMedias.likeHeartEventListeners(mediaItem, photographer.information);
          // this.PhotographerCardMedias.urlImages(photographer.information.url, photographer, mediaItem);
          // this.PhotographerCardMedias.lightbox = new Lightbox(photographer, mediaItem);
        });
      }
    } else {
      // Afficher les médias dans l'ordre original
      
      // renderPhotographerMedia(photographer) {
      //   this.createPhotosSection();
        
      //   photographer.medias.forEach((mediaItem) => {
      //     const template = new PhotographerCardMedias(
      //       photographer.information,
      //       mediaItem
      //     );
    
      //     this.photosSection.appendChild(photographerCardMedias.getUserCardMedia());
      //     this.likeHeartEventListeners(mediaItem, photographer.information);
      //     this.urlImages(photographer.information.url, photographer, mediaItem);
      //     this.lightbox = new Lightbox(photographer, mediaItem);
      //   });
      // }
    }
  }

  onChangeSorter() {
    this.wrapper.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", (e) => {
        const sorter = e.target.dataset.active;
        this.sorterMedias(sorter);
      });
    });
  }

  clearPhotographWrapper() {
    this.photosSection.innerHTML = "";

  }

  render() {
    const sorterForm = `
     
        <div class="filter">
          <div>
            <p>Trier par</p>
          </div>
          <div>
            <img src="./assets/images/svg/mini-arrow.svg" alt="fleche">
            <ul>
              <li data-active="popularity" id="pop">Popularité</li>
              <li data-active="ASC" id="date">Date</li>
              <li data-active="title" id="title">Titre</li>
            </ul>
          </div>
        </div>
  
    `;

    this.wrapper.innerHTML = sorterForm;
    this.onChangeSorter();
    this.gallery.appendChild(this.wrapper);
    // Sélection de l'image
    const filterImg = document.querySelector(".filter img");
    // Sélection de la liste ul
    const filterUl = document.querySelector(".filter ul");

    // Ajout d'un gestionnaire d'événements au clic sur l'image
    filterImg.addEventListener("click", () => {
      // Ajout de la classe active à la liste ul
      filterUl.classList.toggle("active");

      if (!filterUl.classList.contains("active")) {
        // Appliquer le style à l'image lorsque la liste ul a la classe active
        filterImg.style.transform = "rotateY(180deg)";
      } else {
        // Supprimer le style si la liste ul n'a pas la classe active
        filterImg.style.transform = "rotate(-180deg)";
      }
    });
  }
}
