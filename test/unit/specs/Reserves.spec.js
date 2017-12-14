import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import Reserves from '../../../src/components/Reserves/Reserve';

describe('Reserves', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Reserves, { store });
  });
  it('sets correct default data', () => {
    expect(typeof Reserves.data).to.equal('function');
    const defaultData = Reserves.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Código');
    expect(defaultData.headers[2].text).to.equal('Comprimento');
    expect(defaultData.headers[3].text).to.equal('Latitude');
    expect(defaultData.headers[4].text).to.equal('Longitude');
  });
  it('check default Reserves components', () => {
    expect(typeof Reserves.components).to.equal('object');
  });

  it('check default Reserves creation', () => {
    expect(typeof Reserves.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
