import moxios from 'moxios';
import { equal } from 'assert';

import UndergroundBox from '../../../src/components/UndergroundBox/UndergroundBox';

describe('UndergroundBox', () => {
  it('check default values', () => {
    expect(typeof UndergroundBox.data).to.equal('function');
    const defaultData = UndergroundBox.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Code');
    expect(defaultData.headers[2].text).to.equal('Underground box type');
    expect(defaultData.headers[3].text).to.equal('Latitude');
    expect(defaultData.headers[4].text).to.equal('Longitude');
    expect(defaultData.headers[5].text).to.equal('Cover Type');
    expect(defaultData.headers[6].text).to.equal('Emendation Box');
    expect(defaultData.headers[7].text).to.equal('Technical Reserve');
  });
});
