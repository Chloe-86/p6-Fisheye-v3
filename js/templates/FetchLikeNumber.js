class FetchLikeNumber {
  constructor(photographer, mediaItem,photographerCardMedias) {
    this.photographerInformation = photographer.information;
    this.media = mediaItem;
    this.body = document.querySelector("body");
    this.photographerCardMedias = photographerCardMedias;
    this.likeNumberTotal;
    this.fetchLikeNumber();
  }

  fetchLikeNumber() {
    // Sélectionner tous les éléments <p> avec la classe "like"
    const likeElements = document.querySelectorAll(".likes p");
    
    // Créer un tableau pour stocker les valeurs des likes
    const likeValues = [];

    // Parcourir tous les éléments <p> sélectionnés
    likeElements.forEach((element) => {
      // Obtenir le texte contenu dans chaque élément <p> et l' ajouter au tableau
      likeValues.push(parseInt(element.textContent.trim()));
    });
    this.likeNumberTotal = likeValues.reduce((acc, curr) => acc + curr, 0);
    // Maintenant, likeValues contient toutes les valeurs de likes
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("likeWrapper");

    const likeNumber = `
        <article class="card-like">
              <div class="likes">
                <img src="assets/images/svg/blacklike.svg" class="clicklike">
                <p>${this.likeNumberTotal}</p>
              </div>
              <div>
              <p>${this.photographerInformation.price} € / jour</p>
            </div>
        </article>
            `;
    wrapper.innerHTML = likeNumber;
    this.body.appendChild(wrapper);
    return wrapper;
  }
}
