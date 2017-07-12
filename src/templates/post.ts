export default function post({ date, folder, capitalized }, { useNewLine }) {
  return [
    `---
path: "/${folder}.html"
date: "${date.toJSON()}"
title: "${capitalized}"
---
# ${capitalized}`
  ]
    .concat(useNewLine ? [`\n`] : [])
    .join('');
}
