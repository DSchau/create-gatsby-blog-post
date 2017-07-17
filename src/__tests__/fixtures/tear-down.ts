jest.unmock('mz/fs');
jest.unmock('mz-modules/mkdirp');

import * as path from 'path';
import * as del from 'rmfr';

export default function tearDown({ root: srcRoot }) {
  return del(path.resolve(srcRoot));
}
