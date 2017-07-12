jest.mock('yargs');
jest.mock('mz/fs');
jest.mock('mz-modules/mkdirp');
import * as yargs from 'yargs';
import { spies } from 'mz/fs';

const init = (argv = {}) => {
  yargs.argv = Object.assign({ _: [] }, argv);
  require('./cli');
};

describe('command line interface (CLI)', () => {
  it('throws an error if folder name is not specified', () => {
    expect(() => init()).toThrow(
      'A post title is required, e.g. `create-post "hello-world"`'
    );
  });

  it('does not write file if --dry', () => {
    init({ _: ['hello world'], dry: true });

    expect(spies.writeFile).not.toHaveBeenCalled();
  });

  it.skip('writes file', () => {
    init({ _: ['hello world'] });

    expect(spies.writeFile).toHaveBeenCalled();
  });
});
