// import moxios from 'moxios';
// import { equal } from 'assert';

import GBIC from '../../../src/components/GBIC/GBIC';

describe('GBIC', () => {
  it('check default values', () => {
    expect(typeof GBIC.data).to.equal('function');
    const defaultData = GBIC.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Serial Code');
    expect(defaultData.headers[2].text).to.equal('Patrimony Number');
    expect(defaultData.headers[3].text).to.equal('GBIC Type');
  });
});
