// Définition d'une classe SortCache
class ProxyRatingSorter {
    // Constructeur de la classe
    constructor() {
        // Initialisation d'un tableau vide pour le cache
        this.cache = []
    }

    // Méthode asynchrone pour trier les medias avec mise en cache
    async sorter(media, orderBy) {
        // Recherche d'un résultat déjà mis en cache pour cet orderBy
        const cachedResult = this.cache.find(elt => elt.key === orderBy)
        // Vérification si un résultat est trouvé dans le cache
        if (cachedResult) {
            // Affichage d'un message indiquant que les données sont récupérées depuis le cache
            console.log('get from cache')
            // Retourne le résultat trouvé dans le cache
            return cachedResult
        }

        // Si aucune donnée n'est trouvée dans le cache, appelle l'API pour effectuer le tri
        const data = await RatingSorterApi.sorter(media, orderBy)

        // Ajoute les données triées au cache pour une utilisation ultérieure
        this.cache.push(data)
        // Retourne les données triées
        return data
    }
}
