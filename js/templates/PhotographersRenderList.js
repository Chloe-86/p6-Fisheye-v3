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

  getUserCardDOM(photographerInformation) {
    const $wrapper = document.createElement("div");

    const photographerCard = `
          <article>
              <a href="photographer.html?id=${photographerInformation.id}">
                  <img
                      alt="${photographerInformation.name}"
                      src="/assets/photographers/${photographerInformation.portrait}"
                  />
              </a>
              <h2>${photographerInformation.name}</h2>
              <h3> ${photographerInformation.city} , ${photographerInformation.country} </h3>
              <p>
              <span>${photographerInformation.tagline}</span>
              <span>${photographerInformation.price} €/jour</span> 
              </p>
          </article>
          `;

    $wrapper.innerHTML = photographerCard;
    return $wrapper;
  }
}
