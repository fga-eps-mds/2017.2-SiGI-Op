import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import DGOModelList from '../../../src/components/Dgo/DGOModelList';

describe('DGOModelList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(DGOModelList, { store });
  });

  it('check default values', () => {
    expect(typeof DGOModelList.data).to.equal('function');
    const defaultData = DGOModelList.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Fabricante');
    expect(defaultData.headers[2].text).to.equal('Nome');
    expect(defaultData.headers[3].text).to.equal('Numero de portas');
  });

  it('check created', () => {
    expect(typeof DGOModelList.created).to.equal('function');
  });

  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
