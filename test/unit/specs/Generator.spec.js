// import moxios from 'moxios';
// import { equal } from 'assert';

import Generator from '../../../src/components/Generator/Generator';

describe('Generator', () => {
  it('check default Generator values', () => {
    expect(typeof Generator.data).to.equal('function');
    const defaultData = Generator.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Power');
    expect(defaultData.headers[2].text).to.equal('Manufacturer');
    expect(defaultData.headers[3].text).to.equal('Patrimony');
    expect(defaultData.headers[4].text).to.equal('Site');
  });
});
