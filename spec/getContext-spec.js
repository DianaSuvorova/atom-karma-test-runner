'use babel';

import path from 'path';
import { closestPackage } from '../lib/getContext';

describe('closestPackage', () => {
  it('returns encolsing npm package', () => {
    const packageForlder = path.dirname(__dirname);
    expect(closestPackage(__dirname)).toEqual(packageForlder);
  });
});
