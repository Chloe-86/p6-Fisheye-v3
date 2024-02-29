class Filter {
  /**
   *
   * @param {string} choice
   * @param {array} media
   * @returns
   */
  static async filterByChoice(choice, media) {
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!choice) {
      return media;
    }

    return media.filter((Media) => Media.date=== choice);
  }
}
