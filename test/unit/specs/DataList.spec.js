import { mount } from 'vue-test-utils';
import DataList from '@/components/DataList';
import { store } from '@/vuex/store';

describe('DataList', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(DataList, { store });
    vm = wrapper.vm;
  });

  it('sets correct default value', () => {
    expect(vm.search).to.equal('');
    expect(vm.totalItems).to.equal(0);
  });

  it('has correct elements', () => {
    expect(wrapper.contains('ul')).to.equal(false);
    expect(wrapper.contains('.headline')).to.equal(false);
    expect(wrapper.contains('td')).to.equal(false);
  });

  it('is a function', () => {
    expect(DataList.methods.nextPage).to.be.a('function');
    expect(DataList.methods.previousPage).to.be.a('function');
    expect(DataList.methods.inputPage).to.be.a('function');
  });
});
