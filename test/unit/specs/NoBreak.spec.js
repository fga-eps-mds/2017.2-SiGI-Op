import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import NoBreak from '../../../src/components/NoBreaks/NoBreak';

describe('NoBreak', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(NoBreak, { store });
  });
  it('check default values', () => {
    expect(typeof NoBreak.data).to.equal('function');
    const defaultData = NoBreak.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Potência');
    expect(defaultData.headers[2].text).to.equal('Proprietário');
    expect(defaultData.headers[3].text).to.equal('Número de patrimônio');
    expect(defaultData.headers[4].text).to.equal('Site');
  });
  it('check default NoBreak components', () => {
    expect(typeof NoBreak.components).to.equal('object');
  });

  it('check default NoBreak creation', () => {
    expect(typeof NoBreak.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
