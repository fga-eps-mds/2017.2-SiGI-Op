import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import Site from '../../../src/components/Sites/Site';

describe('Site', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Site, { store });
  });
  it('check default values', () => {
    expect(typeof Site.data).to.equal('function');
    const defaultData = Site.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Nome');
    expect(defaultData.headers[2].text).to.equal('Latitude');
    expect(defaultData.headers[3].text).to.equal('Longitude');
    expect(defaultData.headers[4].text).to.equal('Largura de Banda');
    expect(defaultData.headers[5].text).to.equal('IPA');
    expect(defaultData.headers[6].text).to.equal('Tipo de Site');
  });
  it('check default Site components', () => {
    expect(typeof Site.components).to.equal('object');
  });

  it('check default Site creation', () => {
    expect(typeof Site.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
