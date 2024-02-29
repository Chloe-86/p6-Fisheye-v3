class FilterForm {
        constructor(photographer, media) {
            this.photographer = photographer;
            this.media = media;
          

        this.$wrapper = document.createElement('div');
        this.$filterFormWrapper = document.querySelector('.filter-wrapper');
        this.$photosWrapper = document.querySelector('photos_section');
    }

    async filterCards(choice) {
        this.clearPhotographWrapper()

        const AdaptedFilterLib = new filterMediaAdapter(this.media, choice)
        const Filteredcards = await AdaptedFilterLib.filterByChoice()

        Filteredcards.forEach(choice=> {
            const Template = new MovieCard(choice)
            this.$moviesWrapper.appendChild(Template.PhotographerCard())
        })
    }

    onChangeFilter() {
        this.$wrapper
            .querySelector('form')
            .addEventListener('change', e => {
                const choice = e.target.value
                this.filterCards(choice)
            })
    }

    clearPhotographWrapper() {
        this.$photosWrapper.innerHTML = ""
    }

    render() {
        const filterForm = `
            <form class="filter" action="#" method="POST">
                <label for="filter-select"><p>Trier par</p>
                <select name="filter-select" id="filter-select">
                    <option value="popularity" id="pop">Popularité</option>
                    <option value="Date">Date</option>
                    <option value="Titre">Titre</option>
                </select>
            </form>
            
        `

        this.$wrapper.innerHTML = filterForm
        this.onChangeFilter()

        this.$filterFormWrapper.appendChild(this.$wrapper)
    }
}

