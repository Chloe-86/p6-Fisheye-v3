// Définition de la classe SorterForm
class SorterForm {
  // Constructeur de la classe prenant les paramètres photograph et media
  constructor(photographers, media, photographerId) {
    // Assignation des paramètres photograph et media à des propriétés de l'instance
    this.photographers = photographers;
    this.media = media;
    this.photographerId = this.photographerId;

    // Création d'un élément div pour le wrapper du formulaire de tri
    this.$wrapper = document.createElement("div");
    // Sélection de l'élément avec la classe "filter-wrapper" pour le wrapper du formulaire de tri
    this.$wrapper.classList.add("filter-container");
    this.$filterFormWrapper = document.querySelector(".filter-wrapper");
    // Sélection de l'élément avec l'identifiant "photos_section" pour le wrapper des médias
    this.$photosWrapper = document.querySelector(".photos_section");

    // Initialisation d'une instance de ProxyRatingSorter pour gérer le tri des médias
    this.ProxyRatingSorter = new ProxyRatingSorter();
  }

  // Méthode asynchrone pour trier les médias
  async sorterMedias(sorter) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    // Efface le contenu actuel du wrapper des médias
    this.clearPhotographWrapper();

    // Vérifie si un type de tri est spécifié
    if (!!sorter) {
      const photographerMedia = this.media.filter(
        (item) => item.photographerId === parseInt(id)
      );

      // Effectue le tri en utilisant l'instance de ProxyRatingSorter
      const sortedData = await this.ProxyRatingSorter.sorter(
        photographerMedia,
        sorter
      );

      // Récupère les médias triés à partir des données triées
      const sortedMedias = sortedData.data;

      // Pour chaque média trié, crée une carte de média et l'ajoute au wrapper des média

      if (sortedMedias.length > 0) {
        // Pour chaque média trié, crée une carte de média et l'ajoute au wrapper des médias
        sortedMedias.forEach((media) => {
          const photographer = this.photographers.find(
            (p) => p.id === media.photographerId
          );
          const template = new PhotographerCard(
            photographer,
            media,
            photographer.name
          );
          this.$photosWrapper.appendChild(template.getUserCardMedia());
        });
      }
    } else {
      // Si aucun type de tri n'est spécifié, affiche les médias dans l'ordre original
      
    }
  }
  // Méthode pour gérer le changement de tri dans le formulaire
  onChangeSorter() {
    // Ajoute un écouteur d'événements "change" au formulaire
    this.$wrapper.querySelector("form").addEventListener("change", (e) => {
      // Récupère la valeur sélectionnée dans le champ de sélection
      const sorter = e.target.value;
      // Trie les médias en fonction du type de tri sélectionné
      this.sorterMedias(sorter);
    });
  }

  // Méthode pour effacer le contenu du wrapper des médias
  clearPhotographWrapper() {
    // Remplace le contenu HTML du wrapper des médias par une chaîne vide
    this.$photosWrapper.innerHTML = "";
  }

  // Méthode pour rendre le formulaire de tri
  render() {
    // Définit le HTML du formulaire de tri
    const sorterForm = ` 
            <form class="filter" action="#" method="POST">
                <label for="filter-select"><p>Trier par</p>
                <select name="filter-select" id="filter-select">
                    <option value="popularity" id="pop">Popularité</option>
                    <option value="ASC" id="date">Date</option>
                    <option value="title" id="title">Titre</option>
                </select>
            </form>
        `;

    // Injecte le HTML du formulaire dans le wrapper du formulaire
    this.$wrapper.innerHTML = sorterForm;
    // Associe la méthode onChangeSorter à l'événement de changement du formulaire
    this.onChangeSorter();

    // Ajoute le formulaire rendu au wrapper du formulaire dans le document
    this.$filterFormWrapper.appendChild(this.$wrapper);
  }
}
