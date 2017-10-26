import { mount } from 'vue-test-utils';
import Jumper from '@/components/Jumper/Jumpers';
import store from '@/vuex/store';

describe('Jumper', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Jumper, { store });
  });

  it('check default Jumper values', () => {
    expect(typeof Jumper.data).to.equal('function');
    const defaultData = Jumper.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('GOD Port 1');
    expect(defaultData.headers[1].type).to.equal('select');
    expect(defaultData.headers[2].text).to.equal('GOD Port 2');
    expect(defaultData.headers[2].type).to.equal('select');
  });

  it('check default Jumper components', () => {
    expect(typeof Jumper.components).to.equal('object');
  });

  it('check default Jumper creation', () => {
    expect(typeof Jumper.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('div')).to.equal(true);
  });
});
