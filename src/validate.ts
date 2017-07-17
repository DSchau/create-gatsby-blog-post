import * as path from 'path';

import * as matter from 'gray-matter';
import * as fs from 'mz/fs';
import * as glob from 'globby';

export default function validate({ root: srcRoot }) {
  const roots = []
    .concat(srcRoot)
    .map(root => path.join(path.resolve(root, '**/*.md')));

  return Promise.all(roots.map(root => glob(root)))
    .then(files => Array.prototype.concat.apply([], files))
    .then(files => {
      return Promise.all(
        files.map(file =>
          fs.readFile(file, 'utf8').then(contents => [file, contents])
        )
      );
    })
    .then(files => {
      return files.map(([file, content]) => {
        return [file, matter(content)];
      });
    })
    .then(files => {
      let uniquePaths = {};

      for (let i = 0; i < files.length; i++) {
        const [file, { data }] = files[i];
        if (data.path) {
          if (uniquePaths[data.path]) {
            const files = [uniquePaths[data.path], file].map(file =>
              path.join(srcRoot, file.split('/').pop())
            );
            return Promise.reject(
              new Error(
                `Path exists: (${files.join(
                  ' and '
                )}) contain the same path, ${data.path}`
              )
            );
          } else {
            uniquePaths[data.path] = file;
          }
        }
      }

      return Promise.resolve(true);
    });
}
