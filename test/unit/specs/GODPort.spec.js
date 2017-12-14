import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import GODPort from '../../../src/components/GODPort/GODPort';

describe('GODPort', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(GODPort, { store });
  });
  it('check default values', () => {
    expect(typeof GODPort.data).to.equal('function');
    const defaultData = GODPort.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Code');
    expect(defaultData.headers[2].text).to.equal('General Distributor');
    expect(defaultData.headers[3].text).to.equal('Connection Type');
    expect(defaultData.headers[4].text).to.equal('GBIC');
  });

  it('check default GODPort components', () => {
    expect(typeof GODPort.components).to.equal('object');
  });

  it('check default GODPort creation', () => {
    expect(typeof GODPort.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
