import post from './post';

describe('post template', () => {
  const date = new Date('10/08/1990');
  const postObj = {
    capitalized: 'Hello World',
    date,
    folder: 'hello-world'
  };
  const options = { useNewLine: true };

  it('writes correct file', () => {
    expect(post(postObj, options)).toMatchSnapshot();
  });

  it('does not include new line if specified', () => {
    const templated = post(postObj, { useNewLine: false });
    expect(templated.match(/\n$/)).toBeNull();
    expect(templated).toMatchSnapshot();
  });
});
