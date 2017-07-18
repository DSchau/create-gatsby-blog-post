import post from '../post';

describe('post template', () => {
  const date = new Date();
  const postObj = {
    capitalized: 'Hello World',
    date,
    folder: 'hello-world',
    tags: true
  };

  const toJSON = Date.prototype.toJSON;
  beforeAll(() => {
    Date.prototype.toJSON = () => JSON.stringify(1234);
  });

  afterAll(() => {
    Date.prototype.toJSON = toJSON;
  });

  it('writes expected template', () => {
    expect(post(postObj)).toMatchSnapshot();
  });
});
