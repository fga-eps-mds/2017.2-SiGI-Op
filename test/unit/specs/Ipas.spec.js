// import moxios from 'moxios';
// import { equal } from 'assert';
import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import Ipa from '../../../src/components/Ipas/Ipas';

describe('Ipa', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Ipa, { store });
  });

  it('check default Ipa values', () => {
    expect(typeof Ipa.data).to.equal('function');
    const defaultData = Ipa.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Name');
    expect(defaultData.headers[2].type).to.equal('select');
  });

  it('check default Ipa components', () => {
    expect(typeof Ipa.components).to.equal('object');
  });

  it('check default Ipa creation', () => {
    expect(typeof Ipa.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('div')).to.equal(true);
  });
});

