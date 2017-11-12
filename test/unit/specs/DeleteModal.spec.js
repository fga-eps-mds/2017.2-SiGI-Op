import { mount } from 'vue-test-utils';
import DeleteModal from '@/components/DeleteModal';
import store from '@/vuex/store';

describe('DeleteModal', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(DeleteModal, { store });
    vm = wrapper.vm;
  });

  it('sets correct default value', () => {
    expect(vm.dialog).to.equal(false);
  });

  it('has correct elements', () => {
    expect(wrapper.contains('ul')).to.equal(false);
    expect(wrapper.contains('.headline')).to.equal(true);
    expect(wrapper.contains('.green--text')).to.equal(true);
    expect(wrapper.contains('.text')).to.equal(true);
    expect(wrapper.contains('td')).to.equal(false);
  });

  it('is a function', () => {
    expect(DeleteModal.methods.deleteItem).to.be.a('function');
  });
});
