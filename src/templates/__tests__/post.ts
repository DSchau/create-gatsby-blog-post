import post from '../post';

describe('post template', () => {
  const date = 1234;
  const postObj = {
    capitalized: 'Hello World',
    date,
    folder: 'hello-world',
    tags: true
  };

  it('writes expected template', () => {
    expect(post(postObj)).toMatchSnapshot();
  });
});
