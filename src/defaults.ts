export default {
  date: +new Date(),
  dateFormat: 'YYYY-MM-DD',
  dasherize: true,
  dry: false,
  log: process.env.NODE_ENV !== 'test',
  root: 'src/pages',
  tags: true,
  useNewLine: true
};
