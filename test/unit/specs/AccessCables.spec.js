import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import AccessCables from '../../../src/components/AccessCables/AccessCables';

describe('AccessCables', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(AccessCables, { store });
  });
  it('check default AccessCables values', () => {
    expect(typeof AccessCables.data).to.equal('function');
    const defaultData = AccessCables.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Access Cable Code');
    expect(defaultData.headers[1].type).to.equal('number');
    expect(defaultData.headers[2].text).to.equal('Access Cable Length');
    expect(defaultData.headers[2].type).to.equal('number');
    expect(defaultData.headers[3].text).to.equal('Access Cable Fiber Quantity');
    expect(defaultData.headers[3].type).to.equal('number');
    expect(defaultData.headers[4].text).to.equal('GOD');
    expect(defaultData.headers[4].type).to.equal('select');
    expect(defaultData.headers[5].text).to.equal('Site');
    expect(defaultData.headers[5].type).to.equal('select');
  });

  it('check default AccessCables components', () => {
    expect(typeof AccessCables.components).to.equal('object');
  });

  it('check default AccessCables creation', () => {
    expect(typeof AccessCables.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
