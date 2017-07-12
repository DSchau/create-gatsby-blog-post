const spies = {
  writeFile: jest.fn()
};

export = {
  spies,
  writeFile(...args) {
    this.spies.writeFile(...args);
    return Promise.resolve();
  }
}
