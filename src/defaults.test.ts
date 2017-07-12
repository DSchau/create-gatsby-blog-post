import defaults from './defaults';

describe('defaults', () => {
  it('contains expected default keys', () => {
    ['dateFormat', 'dry', 'root', 'useNewLine'].forEach(key =>
      expect(defaults[key]).toBeDefined()
    );
  });

  it('defaults to src/pages for root', () => {
    expect(defaults.root).toBe('src/pages');
  });

  it('defaults to dry=false', () => {
    expect(defaults.dry).toBe(false);
  });
});
