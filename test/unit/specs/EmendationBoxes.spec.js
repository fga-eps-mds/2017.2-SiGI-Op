// import moxios from 'moxios';
// import { equal } from 'assert';
import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import EmendationBox from '../../../src/components/EmendationBoxes/EmendationBox';

describe('EmendationBox', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(EmendationBox, { store });
  });

  it('check default EmendationBox values', () => {
    expect(typeof EmendationBox.data).to.equal('function');
    const defaultData = EmendationBox.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Numero de design');
    expect(defaultData.headers[2].text).to.equal('Latitude');
    expect(defaultData.headers[3].text).to.equal('Longitude');
    expect(defaultData.headers[4].text).to.equal('Caixa de acesso?');
    expect(defaultData.headers[5].text).to.equal('Data de extinção');
    expect(defaultData.headers[6].text).to.equal('Tipo de caixa de emenda');
    expect(defaultData.headers[7].text).to.equal('Estrutura de caixa de emenda');
  });

  it('check default EmendationBox components', () => {
    expect(typeof EmendationBox.components).to.equal('object');
  });

  it('check default EmendationBox creation', () => {
    expect(typeof EmendationBox.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('div')).to.equal(true);
    expect(wrapper.contains('.segment')).to.equal(true);
  });
});

