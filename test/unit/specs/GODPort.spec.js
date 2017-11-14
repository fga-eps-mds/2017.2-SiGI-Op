// import moxios from 'moxios';
// import { equal } from 'assert';

import GODPort from '../../../src/components/GODPort/GODPort';

describe('GODPort', () => {
  it('check default values', () => {
    expect(typeof GODPort.data).to.equal('function');
    const defaultData = GODPort.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Code');
    expect(defaultData.headers[2].text).to.equal('General Distributor');
    expect(defaultData.headers[3].text).to.equal('Connection Type');
    expect(defaultData.headers[4].text).to.equal('GBIC');
  });
});
