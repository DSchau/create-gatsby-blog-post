const frontmatter = ({ date, folder, capitalized, tags }) => {
  return [
    '___',
    `path: "/${folder}.html"`,
    `date: "${date.toJSON()}"`,
    `title: "${capitalized}"`,
    tags && 'tags: []',
    '___'
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
