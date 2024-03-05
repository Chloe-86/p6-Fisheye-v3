class PhotographersRenderList {
  constructor(photographersList) {
    this.photographersList = photographersList;
    this.$photographersWrapper = document.querySelector(
      ".photographer_section"
    );
  }

  render() {
    this.photographersList.forEach((photographer) => {
      const template = this.getUserCardDOM(photographer);
      this.$photographersWrapper.appendChild(template);
    });
   
  }

  getUserCardDOM(photographer) {
    const $wrapper = document.createElement("div");

    const photographerCard = `
          <article>
              <a href="photographer.html?id=${photographer.id}">
                  <img
                      alt="${photographer.name}"
                      src="/assets/photographers/${photographer.portrait}"
                  />
              </a>
              <h2>${photographer.name}</h2>
              <h3> ${photographer.city} , ${photographer.country} </h3>
              <p>
              <span>${photographer.tagline}</span>
              <span>${photographer.price} €/jour</span> 
              </p>
          </article>
          `;

    $wrapper.innerHTML = photographerCard;
    return $wrapper;
  }
}
