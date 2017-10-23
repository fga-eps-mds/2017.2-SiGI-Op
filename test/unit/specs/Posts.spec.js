import moxios from 'moxios';
import { equal } from 'assert';

import Posts from '../../../src/components/Posts/Posts';

describe('Posts', () => {
  it('check default values', () => {
    expect(typeof Posts.data).to.equal('function');
    const defaultData = Posts.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Cable Length');
    expect(defaultData.headers[2].text).to.equal('Stretch');
    expect(defaultData.headers[3].text).to.equal('Emendation Box');
    expect(defaultData.headers[4].text).to.equal('GOD');
  });
});
