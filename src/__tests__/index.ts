import * as mkdir from 'mz-modules/mkdirp';
import * as fs from 'mz/fs';

import { createPost } from '../index';

describe('createPost', () => {
  it('throws error if folder is not specified', async () => {
    await (createPost as any)().catch(e => {
      console.log(e);
    });
  });

  it('creates a directory', async () => {
    await createPost('hello-world', { date: new Date('10/08-1990') });

    const call = mkdir.spy.mock.calls[0][0];
    expect(call).toMatch('src/pages/10-08-1990-hello-world');
  });

  it('writes a blog post template', async () => {
    await createPost('hello-world', { date: new Date('10/08/1990') });

    expect(fs.spies.writeFile).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(String)
    );
  });

  it('returns a promise containing results', async () => {
    const results = await createPost('hello-world', {
      date: new Date('10/08/1990')
    });

    ['path', 'success'].forEach(key => expect(results[key]).toBeDefined());
  });

  describe('options', () => {
    it('does not write file if dry option', async () => {
      const { dry } = await createPost('hello-world', { dry: true });

      expect(dry).toBe(true);
    });

    it('can customize dateFormat', async () => {
      const { path } = await createPost('hello-world', {
        dry: true,
        dateFormat: 'YYYY'
      });

      expect(path).toMatch(/2017-hello-world/);
    });

    it('can customize date', async () => {
      const { path } = await createPost('hello-world', {
        dry: true,
        date: new Date('10/08/1990')
      });

      expect(path).toMatch(/10-08-1990/);
    });

    it('can customize root', async () => {
      const root = '__heh_not_a_real_path__/pages';
      const { path } = await createPost('hello-world', { dry: true, root });

      expect(path).toMatch(root);
    });

    it('does not dasherize if disabled', async () => {
      const { path } = await createPost('hello world', {
        dry: true,
        dasherize: false
      });

      expect(path).toMatch('hello world');
    });
  });
});
