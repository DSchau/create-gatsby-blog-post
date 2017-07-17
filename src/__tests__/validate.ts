jest.unmock('mz/fs');

import validate from '../validate';

import setUp, { makeDuplicate, removeDuplicate } from './fixtures/set-up';
import tearDown from './fixtures/tear-down';

describe('validation', () => {
  const root = '__fixtures__/src/pages';
  beforeAll(async () => {
    await setUp({ root });
  });

  afterAll(async () => {
    await tearDown({ root: '__fixtures__' });
  });

  it('detects duplicate files', async () => {
    await makeDuplicate({ root });
    await validate({ root }).catch(e => {
      expect(e instanceof Error).toBe(true);
    });
  });

  it('returns true when no duplicate files/paths', async () => {
    await removeDuplicate({ root });
    expect(await validate({ root })).toBe(true);
  });
});
