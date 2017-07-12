#!/usr/bin/env node
import * as path from 'path';
import { createPost } from './index';

const folder = process.argv.pop();

if (folder === path.resolve(__dirname, path.basename(__filename))) {
  throw new Error('A post title is required, e.g. `create-post "hello-world"`');
}

createPost(folder);
