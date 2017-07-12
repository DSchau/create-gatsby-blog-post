export default {
  date: +new Date(),
  dateFormat: 'MM-DD-YYYY',
  dasherize: true,
  dry: false,
  log: process.env.NODE_ENV !== 'test',
  root: 'src/pages',
  useNewLine: true
};
