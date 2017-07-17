#!/usr/bin/env node
import * as path from 'path';
import * as yargs from 'yargs';
import { createPost } from './index';

const args = yargs.argv;

const folder = args._.pop();

if (!folder) {
  throw new Error('A post title is required, e.g. `create-post "hello-world"`');
}

createPost(folder, args)
  .then(({ path, success }) => {
    if (success) {
      console.log(`Created ${path}`);
    }
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
