// import moxios from 'moxios';
// import { equal } from 'assert';

import NoBreak from '../../../src/components/NoBreaks/NoBreak';

describe('NoBreak', () => {
  it('check default values', () => {
    expect(typeof NoBreak.data).to.equal('function');
    const defaultData = NoBreak.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Power');
    expect(defaultData.headers[2].text).to.equal('Proprietary');
    expect(defaultData.headers[3].text).to.equal('Patrimony Number');
    expect(defaultData.headers[4].text).to.equal('Site');
  });
});
