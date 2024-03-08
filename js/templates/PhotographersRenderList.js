class PhotographersRenderList {
  constructor(photographersList) {
    
    this.photographersList = photographersList;
    this.body = document.querySelector('body');
    this.photographersWrapper = document.createElement("div");
    this.photographersWrapper.classList.add('photographer_section');
    this.body.appendChild(this.photographersWrapper);
  }

  render() {
    this.photographersList.forEach((photographer) => {
      const template = this.getUserCardDOM(photographer);
      this.photographersWrapper.appendChild(template);
    });
  }

  getUserCardDOM(photographerInformation) {
    const wrapper = document.createElement("div");

    const photographerCard = `
          <article>
              <a aria-label="cliquez-ici pour ouvvrir la page du photographe ${photographerInformation.name}" href="photographer.html?id=${photographerInformation.id}">
                  <img
                      alt="${photographerInformation.name}"
                      src="/assets/images/photographers/${photographerInformation.portrait}"
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

    wrapper.innerHTML = photographerCard;
    return wrapper;
  }
}
