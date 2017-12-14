// import moxios from 'moxios';
// import { equal } from 'assert';
import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import Modal from '../../../src/components/Modal';

describe('Modal', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(Modal, { store });
    vm = wrapper.vm;
  });

  it('check default Modal values', () => {
    expect(typeof Modal.data).to.equal('function');
    expect(typeof Modal.methods.clear).to.equal('function');
    expect(typeof Modal.methods.close).to.equal('function');
    expect(typeof Modal.methods.register).to.equal('function');
    const defaultData = Modal.data();
    expect(defaultData.dialog).to.equal(false);
  });

  it('check default Modal clear', () => {
    vm.headers = [{ value: 'anfueu' }];
    vm.clear();
    expect(vm.headers[0].value).to.equal('');
  });

  it('check default Modal close', () => {
    expect(typeof Modal.data).to.equal('function');
    vm.headers = [{ value: 'anfueu' }];
    vm.dialog = true;
    vm.close();
    expect(vm.headers[0].value).to.equal('');
    expect(vm.dialog).to.equal(false);
  });


  it('check valid Modal register', () => {
    expect(typeof Modal.data).to.equal('function');
    vm.dialog = true;
    vm.headers = [
      { value: 'a', name: 'blaba', required: false },
      { value: 'b', name: 'blbob', required: false },
    ];
    vm.alert = false;
    vm.register();
    expect(vm.dialog).to.equal(false);
  });
});

