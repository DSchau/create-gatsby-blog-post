import * as path from 'path';

import * as fs from 'mz/fs';
import * as mkdir from 'mz-modules/mkdirp';

import definedDefaults from './defaults';
import post from './templates/post';

export const createPost = (folder, options = {}) => {
  const defaults = Object.assign(definedDefaults, options);
  const capitalized = folder.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
  const now = new Date();

  const folderName = [
    now.getMonth(),
    now.getDate(),
    now.getFullYear(),
    folder
  ]
    .map(part => typeof part === 'number' && part <= 9 ? `0${part}` : part)
    .join('-');
  
  const template = post({
    capitalized,
    folder,
    now
  }, defaults);

  mkdir(path.join(defaults.root, folderName))
    .then(() => {
      return fs.writeFile(path.join(defaults.root, folderName, 'index.md'), template, 'utf8');
    });
}
