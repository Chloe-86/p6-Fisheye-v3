class Filter {
  /**
   *
   * @param {string} choice
   * @param {array} media
   * @returns
   */
  static async filterByChoice(choice,photographer) {
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!choice) {
      return photographer;
    }

    return photographer.filter((photo) => photo.date=== choice);
  }
}
