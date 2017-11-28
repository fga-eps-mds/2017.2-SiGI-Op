// import moxios from 'moxios';
// import { equal } from 'assert';
import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import CableStretch from '../../../src/components/CableStretch/CableStretch';

describe('CableStretch', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CableStretch, { store });
  });

  it('check default CableStretch values', () => {
    expect(typeof CableStretch.data).to.equal('function');
    const defaultData = CableStretch.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Code');
    expect(defaultData.headers[2].text).to.equal('Length');
    expect(defaultData.headers[3].text).to.equal('Manufacturing Year');
    expect(defaultData.headers[4].text).to.equal('Infrastructure');
    expect(defaultData.headers[5].text).to.equal('Owner');
    expect(defaultData.headers[6].text).to.equal('Fabricant');
    expect(defaultData.headers[7].text).to.equal('Cable Stretch Type');
    expect(defaultData.headers[8].text).to.equal('Segment');
    expect(defaultData.headers[9].text).to.equal('Access Cable');
    expect(defaultData.headers[10].text).to.equal('DGO');
    expect(defaultData.headers[11].text).to.equal('Access');
    expect(defaultData.headers[12].text).to.equal('Created at');
    expect(defaultData.headers[13].text).to.equal('Updated at');
  });

  it('check default CableStretch components', () => {
    expect(typeof CableStretch.components).to.equal('object');
  });

  it('check default CableStretch creation', () => {
    expect(typeof CableStretch.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('div')).to.equal(true);
  });
});
