jest.unmock('mz/fs');
jest.unmock('mz-modules/mkdirp');

import * as fs from 'mz/fs';
import * as mkdir from 'mz-modules/mkdirp';
import * as path from 'path';

const getTemplate = path => {
  return [`---`, `path: /${path}`, `---`, ``, `hello`].join('\n');
};

export function makeDuplicate({ root }) {
  const [file, content] = [
    `03-03-2012-hello-world.md`,
    getTemplate('hello-world')
  ];
  return fs.writeFile(path.join(path.resolve(root), file), content);
}

export function removeDuplicate({ root }) {
  return fs.unlink(path.join(path.resolve(root), `03-03-2012-hello-world.md`));
}

export default function setUp({ root }) {
  const resolvedRoot = path.resolve(root);
  return mkdir(resolvedRoot).then(() => {
    return Promise.all(
      [
        [`01-01-2012-hello-world`, getTemplate('hello-world')],
        [`02-02-2012-sup`, getTemplate('sup')]
      ].map(([file, contents]) => {
        return fs.writeFile(path.join(resolvedRoot, file) + '.md', contents);
      })
    );
  });
}
