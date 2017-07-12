export default function post({
  folder,
  now,
  capitalized
}, {
  useNewLine
}) {
  return [
    `---
path: "/${folder}.html"
date: "${now.toJSON()}"
title: "${capitalized}"
---
# ${capitalized}`
  ]
    .concat(useNewLine ? [`\n`] : [])
    .join('');
}
