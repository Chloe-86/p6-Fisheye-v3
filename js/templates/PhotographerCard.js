class photographerCard {
  constructor(photographer, media) {
    this.photographer = photographer;
    this.media = media;
  }

  getHeader() {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add('photograph-header');

          const headerCard = `
          <div class="info">
                  <h2>${this.photographer.name}</h2>
                  <h3> ${this.photographer.city} , ${this.photographer.country} </h3>
                  <p>${this.photographer.tagline}</p>
           </div>
                  <button class="contact_button">Contactez-moi</button>
                  <div class="photo">
                    <img alt="${this.photographer.name}" src="/assets/photographers/${this.photographer.portrait}" />
                  </div>
              `;
      
    $wrapper.innerHTML = headerCard;
    return $wrapper;
  }

  getUserCardDOM() {
    const $wrapper = document.createElement("div");

    const photographerCard = `
        <article>
            <a href="photographer.html?id=${this.photographer.id}">
                <img
                    alt="${this.photographer.name}"
                    src="/assets/photographers/${this.photographer.portrait}"
                />
            </a>
            <h2>${this.photographer.name}</h2>
            <h3> ${this.photographer.city} , ${this.photographer.country} </h3>
            <p>
            <span>${this.photographer.tagline}</span>
            <span>${this.photographer.price}/jour</span> 
            </p>
        </article>
        `;

    $wrapper.innerHTML = photographerCard;
    return $wrapper;
  }

  getUserCardMedia() {
    const $wrapper = document.createElement("div");

    const photographerCardMedia = `
    <article class="card">
        <div class="containerImage">
            <img src="assets/images/sample_photo/${this.photographer.name}/${this.media.image}">
            </div>
            <div class="containerInfo">
                <p>${this.media.title}</p>
                <div class="likes"><p>72</p>
                    <img src="assets/images/svg/like.svg" class="clicklike">
                </div>
            </div>
        </div>
    </article>
        `;

    $wrapper.innerHTML = photographerCardMedia;
    return $wrapper;
  }
}
