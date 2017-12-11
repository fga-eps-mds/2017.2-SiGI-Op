// import moxios from 'moxios';
// import { equal } from 'assert';
import Vue from 'vue';
import ContactTypeRegister from '../../../src/components/Ipas/ContactTypeRegister';

describe('ContactTypeRegister', () => {
  it('check default ContactTypeRegister values', () => {
    expect(typeof ContactTypeRegister.data).to.equal('function');
    expect(typeof ContactTypeRegister.methods.clear).to.equal('function');
    expect(typeof ContactTypeRegister.methods.close).to.equal('function');
    expect(typeof ContactTypeRegister.methods.register).to.equal('function');
    const defaultData = ContactTypeRegister.data();
    expect(defaultData.description).to.equal('');
    expect(defaultData.dialog1).to.equal(false);
  });

  it('check default ContactTypeRegister clear', () => {
    expect(typeof ContactTypeRegister.data).to.equal('function');
    const vm = new Vue(ContactTypeRegister);
    vm.description = 'blaba';
    vm.clear();
    expect(vm.description).to.equal('');
  });

  it('check default ContactTypeRegister close', () => {
    expect(typeof ContactTypeRegister.data).to.equal('function');
    const vm = new Vue(ContactTypeRegister);
    vm.description = 'blaba';
    vm.dialog1 = true;
    vm.close();
    expect(vm.description).to.equal('');
    expect(vm.dialog1).to.equal(false);
  });

  it('check default Ipa creation', () => {
    expect(typeof ContactTypeRegister.created).to.equal('function');
  });
});

