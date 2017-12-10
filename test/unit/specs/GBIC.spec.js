import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import GBIC from '../../../src/components/GBIC/GBIC';

describe('GBIC', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(GBIC, { store });
  });
  it('check default values', () => {
    expect(typeof GBIC.data).to.equal('function');
    const defaultData = GBIC.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Serial Code');
    expect(defaultData.headers[2].text).to.equal('Patrimony Number');
    expect(defaultData.headers[3].text).to.equal('GBIC Type');
  });
  it('check default GBIC components', () => {
    expect(typeof GBIC.components).to.equal('object');
  });

  it('check default GBIC creation', () => {
    expect(typeof GBIC.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
