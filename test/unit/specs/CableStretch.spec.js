// import moxios from 'moxios';
// import { equal } from 'assert';
import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import CableStretch from '../../../src/components/CableStretch/CableStretch';

describe('CableStretch', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CableStretch, { store });
  });

  it('check default CableStretch values', () => {
    expect(typeof CableStretch.data).to.equal('function');
    const defaultData = CableStretch.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Código');
    expect(defaultData.headers[2].text).to.equal('Comprimento');
    expect(defaultData.headers[3].text).to.equal('Ano de fabricação');
    expect(defaultData.headers[4].text).to.equal('Infraestrutura');
    expect(defaultData.headers[5].text).to.equal('Proprietário');
    expect(defaultData.headers[6].text).to.equal('Fabricante');
    expect(defaultData.headers[7].text).to.equal('Tipo de trecho de cabo');
    expect(defaultData.headers[8].text).to.equal('Segmento');
    expect(defaultData.headers[9].text).to.equal('Cabo de acesso');
    expect(defaultData.headers[10].text).to.equal('DGO');
    expect(defaultData.headers[11].text).to.equal('Acesso');
    expect(defaultData.headers[12].text).to.equal('Criado em');
    expect(defaultData.headers[13].text).to.equal('Atualizado em');
  });

  it('check default CableStretch components', () => {
    expect(typeof CableStretch.components).to.equal('object');
  });

  it('check default CableStretch creation', () => {
    expect(typeof CableStretch.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
