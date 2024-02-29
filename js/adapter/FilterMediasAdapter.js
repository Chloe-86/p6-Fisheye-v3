class FilterMediasAdapter {
    constructor(media,date) {
        this.media = media
        this.date = date
    }

    async filterByDate() {
        console.log()
        return await Filter.filterByDate(this.date, this.media)
    }
}
