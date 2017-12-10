import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import SwitchSlot from '../../../src/components/SwitchSlot/SwitchSlot';

describe('SwitchSlot', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(SwitchSlot, { store });
  });
  it('check default Switch Slot values', () => {
    expect(typeof SwitchSlot.data).to.equal('function');
    const defaultData = SwitchSlot.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Series');
    expect(defaultData.headers[2].text).to.equal('Number');
    expect(defaultData.headers[3].text).to.equal('Patrimony');
    expect(defaultData.headers[4].text).to.equal('Band');
    expect(defaultData.headers[5].type).to.equal('select');
    expect(defaultData.headers[6].text).to.equal('Quantity of Ports');
  });
  it('check default SwitchSlot components', () => {
    expect(typeof SwitchSlot.components).to.equal('object');
  });

  it('check default SwitchSlot creation', () => {
    expect(typeof SwitchSlot.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
