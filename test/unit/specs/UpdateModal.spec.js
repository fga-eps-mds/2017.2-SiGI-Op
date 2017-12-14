// import moxios from 'moxios';
// import { equal } from 'assert';
import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import UpdateModal from '../../../src/components/UpdateModal';

describe('UpdateModal', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(UpdateModal, { store });
    vm = wrapper.vm;
  });

  it('check default UpdateModal values', () => {
    expect(typeof UpdateModal.data).to.equal('function');
    expect(typeof UpdateModal.methods.close).to.equal('function');
    expect(typeof UpdateModal.methods.update).to.equal('function');
    expect(typeof UpdateModal.methods.getItems).to.equal('function');
    expect(typeof UpdateModal.methods.fill).to.equal('function');
    expect(typeof UpdateModal.methods.verifyCamps).to.equal('function');
    const defaultData = UpdateModal.data();
    expect(defaultData.dialog).to.equal(false);
  });

  it('check default UpdateModal close', () => {
    expect(typeof UpdateModal.data).to.equal('function');
    vm.headers = [{ value: 'anfueu' }];
    vm.dialog = true;
    vm.close();
    expect(vm.headers[0].value).to.equal(undefined);
    expect(vm.dialog).to.equal(false);
  });

  it('check valid UpdateModal update', () => {
    expect(typeof UpdateModal.data).to.equal('function');
    vm.dialog = true;
    vm.item = [{ id: 1 }];
    vm.headers = [
      { value: '' },
      { value: '' },
      { value: '' },
    ];
    vm.alert = false;
    vm.update();
    expect(vm.dialog).to.equal(false);
  });

  it('check default UpdateModal getItems', () => {
    expect(typeof UpdateModal.data).to.equal('function');
    const item = [
      { text: 'anfueu', value: 't' },
    ];
    const headerTexts = 'anfueu';
    const v = vm.getItems(item, headerTexts);
    expect(v).to.equal('t');
  });

  it('check default UpdateModal verifyCamps', () => {
    expect(typeof UpdateModal.data).to.equal('function');
    const begin = 0;
    const end = 1;
    vm.headers = [{ value: '' }];
    const v = vm.verifyCamps(begin, end);
    expect(v).to.equal(0);
  });
});
