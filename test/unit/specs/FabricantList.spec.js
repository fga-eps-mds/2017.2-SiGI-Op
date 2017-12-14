import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import FabricantList from '../../../src/components/Dgo/FabricantList';

describe('FabricantList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(FabricantList, { store });
  });

  it('check default values', () => {
    expect(typeof FabricantList.data).to.equal('function');
    const defaultData = FabricantList.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Nome');
  });

  it('check created', () => {
    expect(typeof FabricantList.created).to.equal('function');
  });

  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
