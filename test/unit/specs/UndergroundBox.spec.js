import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import UndergroundBox from '../../../src/components/UndergroundBox/UndergroundBox';

describe('UndergroundBox', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(UndergroundBox, { store });
  });
  it('check default values', () => {
    expect(typeof UndergroundBox.data).to.equal('function');
    const defaultData = UndergroundBox.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Código');
    expect(defaultData.headers[2].text).to.equal('Tipo de caixa subterrânea');
    expect(defaultData.headers[3].text).to.equal('Latitude');
    expect(defaultData.headers[4].text).to.equal('Longitude');
    expect(defaultData.headers[5].text).to.equal('Tipo de cobertura');
    expect(defaultData.headers[6].text).to.equal('Caixa de emenda');
    expect(defaultData.headers[7].text).to.equal('Reserva técnica');
  });
  it('check default UndergroundBox components', () => {
    expect(typeof UndergroundBox.components).to.equal('object');
  });

  it('check default UndergroundBox creation', () => {
    expect(typeof UndergroundBox.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
