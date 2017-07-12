import * as mkdir from 'mz-modules/mkdirp';
import * as fs from 'mz/fs';

import { createPost } from './index';

describe('createPost', () => {
  it('throws error if folder is not specified', () => {
    expect(() => (createPost as any)()).toThrow();
  });

  it('creates a directory', async () => {
    createPost('hello-world', { date: new Date('10/08-1990') }).then(() => {
      const call = mkdir.spy.mock.calls[0][0];
      expect(call).toMatch('src/pages/10-08-1990-hello-world');
    });
  });

  it('writes a blog post template', async () => {
    createPost('hello-world', { date: new Date('10/08/1990') }).then(() => {
      expect(fs.spies.writeFile).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
        expect.any(String)
      );
    });
  });

  it('returns a promise containing results', async () => {
    createPost('hello-world', {
      date: new Date('10/08/1990')
    }).then(results => {
      ['path', 'success'].forEach(key => expect(results[key]).toBeDefined());
    });
  });

  describe('options', () => {
    it('does not write file if dry option', async () => {
      createPost('hello-world', { dry: true }).then(({ dry }) => {
        expect(dry).toBe(true);
      });
    });

    it('can customize dateFormat', async () => {
      createPost('hello-world', {
        dry: true,
        dateFormat: 'YYYY'
      }).then(({ path }) => {
        expect(path).toMatch(/2017-hello-world/);
      });
    });

    it('can customize date', async () => {
      createPost('hello-world', {
        dry: true,
        date: new Date('10/08/1990')
      }).then(({ path }) => {
        expect(path).toMatch(/10-08-1990/);
      });
    });

    it('can customize root', async () => {
      const root = '__heh_not_a_real_path__/pages';
      createPost('hello-world', { dry: true, root }).then(({ path }) => {
        expect(path).toMatch(root);
      });
    });

    it('does not dasherize if disabled', async () => {
      createPost('hello world', {
        dry: true,
        dasherize: false
      }).then(({ path }) => {
        expect(path).toMatch('hello world');
      });
    });
  });
});
