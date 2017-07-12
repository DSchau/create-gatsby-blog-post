const spy = jest.fn();

const mkdirp = (...args) => {
  spy(...args);
  return Promise.resolve();
};

(mkdirp as any).spy = spy;

export = mkdirp;
