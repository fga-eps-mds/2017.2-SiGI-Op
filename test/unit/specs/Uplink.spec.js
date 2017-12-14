// import moxios from 'moxios';
// import { equal } from 'assert';
import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import Uplink from '../../../src/components/Uplink/Uplink';

describe('Uplink', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Uplink, { store });
  });

  it('check default Uplink values', () => {
    expect(typeof Uplink.data).to.equal('function');
    const defaultData = Uplink.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Nome VLan');
    expect(defaultData.headers[2].text).to.equal('Banda');
    expect(defaultData.headers[3].text).to.equal('Código');
  });

  it('check default Uplink components', () => {
    expect(typeof Uplink.components).to.equal('object');
  });

  it('check default Uplink creation', () => {
    expect(typeof Uplink.created).to.equal('function');
  });

  it('renders a div', () => {
    expect(wrapper.contains('div')).to.equal(true);
    expect(wrapper.contains('.segment')).to.equal(true);
  });
});

