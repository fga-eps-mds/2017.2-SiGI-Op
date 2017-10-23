import moxios from 'moxios';
import { equal } from 'assert';

import Switch from '../../../src/components/Switches/Switch';

describe('Switch', () => {
  it('check default values', () => {
    expect(typeof Switch.data).to.equal('function');
    const defaultData = Switch.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Serial Number');
    expect(defaultData.headers[2].text).to.equal('Manufacturer');
    expect(defaultData.headers[3].text).to.equal('Quantity of Slots');
    expect(defaultData.headers[4].text).to.equal('Patrimony Number');
    expect(defaultData.headers[5].text).to.equal('Site');
  });
});
