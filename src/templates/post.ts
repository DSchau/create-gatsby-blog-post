const DELIMITTER = '---';

const frontmatter = ({ date, folder, capitalized, tags }) => {
  return [
    DELIMITTER,
    `path: "/${folder}"`,
    `date: "${date}"`,
    `title: "${capitalized}"`,
    tags && 'tags: []',
    DELIMITTER
  ]
    .filter(val => val && val.length > 0)
    .join('\n');
};

export default function post(options) {
  return [
    frontmatter(options),
    null,
    'Your next, great blog post goes here',
    null
  ].join('\n');
}
