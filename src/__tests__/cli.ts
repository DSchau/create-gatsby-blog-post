jest.unmock('mz/fs');

import * as path from 'path';
import * as yargs from 'yargs';
import * as fs from 'mz/fs';

const init = (argv = {}) => {
  yargs.argv = argv;
  require('../cli');
};

describe('command line interface (CLI)', () => {
  it('contains node bash header', async () => {
    const contents = await fs.readFile(
      path.resolve(__dirname, 'cli.ts'),
      'utf-8'
    );

    expect(contents).toMatch('#!/usr/bin/env node');
  });

  it('throws an error if folder name is not specified', () => {
    expect(() => init({ _: [] })).toThrow(
      'A post title is required, e.g. `create-post "hello-world"`'
    );
  });
});
