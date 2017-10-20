import { shallow } from 'vue-test-utils';
import Vuex from 'vuex';
import DeleteModal from '@/components/DeleteModal';
import store from '@/vuex/store';

describe('DeleteModal', () => {
  let wrapper;
  let vm;
  let Store;
  let actions;
  beforeEach(() => {
    actions = {
      actionClick: sinon.stub(),
      actionInput: sinon.stub(),
    };
    Store = new Vuex.Store({
      state: store.state,
      actions,
    });
    wrapper = shallow(DeleteModal, { store });
    vm = wrapper.vm;
  });

  it('sets correct default value', () => {
    expect(vm.dialog).to.equal(false);
    expect(vm.name).to.equal('');
  });

  it('has correct elements', () => {
    expect(wrapper.contains('ul')).to.equal(false);
    expect(wrapper.contains('.headline')).to.equal(true);
    expect(wrapper.contains('.green--text')).to.equal(true);
    expect(wrapper.contains('.text')).to.equal(true);
    expect(wrapper.contains('td')).to.equal(false);
  });

  it('dispatches action', () => {
    const btn = wrapper.find('#deleteBTN');
    btn.trigger('click');
    expect(actions.deleteObject.calledOnce).to.equal(true);
  });

  it('is a function', () => {
    expect(DeleteModal.methods.deleteItem).to.be.a('function');
  });
});
