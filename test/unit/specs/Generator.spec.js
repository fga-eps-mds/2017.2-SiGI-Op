import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import Generator from '../../../src/components/Generator/Generator';

describe('Generator', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Generator, { store });
  });
  it('check default Generator values', () => {
    expect(typeof Generator.data).to.equal('function');
    const defaultData = Generator.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Power');
    expect(defaultData.headers[2].text).to.equal('Manufacturer');
    expect(defaultData.headers[3].text).to.equal('Patrimony');
    expect(defaultData.headers[4].text).to.equal('Site');
  });

  it('check default Generator components', () => {
    expect(typeof Generator.components).to.equal('object');
  });

  it('check default Generator creation', () => {
    expect(typeof Generator.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
