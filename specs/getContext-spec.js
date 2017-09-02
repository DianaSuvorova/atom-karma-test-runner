'use babel';

import path from 'path';
import { closestPackage } from '../lib/getContext';

describe('closestPackage', () => {
  it('returns encolsing npm package', () => {
    const packageForlder = path.dirname(__dirname);
    expect(closestPackage(__dirname)).toEqual(packageForlder);
  });

  it('returns enclosinf npm package for test package spec', () => {
    const testpackage = path.join(__dirname, 'testpackage');
    const spec = path.join(testpackage,  'specs', 'spec.js');
    expect(closestPackage(spec)).toEqual(testpackage);
  })
});
