// import moxios from 'moxios';
// import { equal } from 'assert';

import Ipa from '../../../src/components/Ipas/Ipas';

describe('Ipa', () => {
  it('check default values', () => {
    expect(typeof Ipa.data).to.equal('function');
    const defaultData = Ipa.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Name');
    expect(defaultData.headers[2].text).to.equal('Type');
  });
});
