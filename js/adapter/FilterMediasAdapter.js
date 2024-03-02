class FilterMediasAdapter {
    constructor(photographer,date) {
        this.photographer = photographer;
        this.photographer = photographer.medias;
        this.photographer.date = date;
    }

    async filterByDate() {
        console.log()
        return await Filter.filterByDate(this.photographer.date, this.photographer.media)
    }
}
