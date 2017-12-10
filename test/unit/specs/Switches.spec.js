import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import Switch from '../../../src/components/Switches/Switch';

describe('Switch', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Switch, { store });
  });
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
  it('check default Switch components', () => {
    expect(typeof Switch.components).to.equal('object');
  });

  it('check default Switch creation', () => {
    expect(typeof Switch.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
