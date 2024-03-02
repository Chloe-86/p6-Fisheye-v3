class Photographers {
    constructor(photographer) {
      this.photographerInformation = photographer;
      this.$photographersWrapper = document.querySelector(
        ".photographer_section"
      );
      
    }
    
    renderPhotographers(photographers) {
        photographers.forEach((photographer) => {
          const template = new Photographers(photographer);
          this.$photographersWrapper.appendChild(template.getUserCardDOM());
        });
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
  
  }
  