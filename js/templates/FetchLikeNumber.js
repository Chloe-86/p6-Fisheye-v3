class FetchLikeNumber {
  constructor(photographer, mediaItem, photographerCardMedias) {
    this.main = main;
    this.photographerInformation = photographer.information;
    this.media = mediaItem;
    this.body = document.querySelector("body");
    this.photographerCardMedias = photographerCardMedias;
    
  }

  fetchLikeNumber() {
    // Sélectionner tous les éléments <p> avec la classe "like"
    const likeElements = document.querySelectorAll(".photos_section .likes p");

    // Créer un tableau pour stocker les valeurs des likes
    const likeValues = [];

    // Parcourir tous les éléments <p> sélectionnés
    likeElements.forEach((element) => {
      // Obtenir le texte contenu dans chaque élément <p> et l' ajouter au tableau
      likeValues.push(parseInt(element.textContent.trim()));
  
    });

    this.likeNumberTotal = likeValues.reduce((acc, curr) => acc + curr, 0) ;

  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("likeWrapper");

    const likeNumber = `
        <article class="card-like">
              <div class="likes">
                <p>${this.likeNumberTotal}</p>
                <img src="assets/icons/svg/blacklike.svg" class="clicklike" alt="coeur">
              </div>
              <div>
              <p>${this.photographerInformation.price} € / jour</p>
            </div>
        </article>
            `;

    
    wrapper.innerHTML = likeNumber;
    this.main.appendChild(wrapper);
    return wrapper;
  }

}
