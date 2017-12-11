// import moxios from 'moxios';
// import { equal } from 'assert';
import { mount } from 'vue-test-utils';
import Vue from 'vue';
import IpaTypeRegister from '../../../src/components/Ipas/IpaTypeRegister';

describe('IpaTypeRegister', () => {
  it('check default IpaTypeRegister values', () => {
    expect(typeof IpaTypeRegister.data).to.equal('function');
    expect(typeof IpaTypeRegister.methods.clear).to.equal('function');
    expect(typeof IpaTypeRegister.methods.close).to.equal('function');
    expect(typeof IpaTypeRegister.methods.register).to.equal('function');
    const defaultData = IpaTypeRegister.data();
    expect(defaultData.description).to.equal('');
    expect(defaultData.dialog).to.equal(false);
  });

  it('check default IpaTypeRegister clear', () => {
    expect(typeof IpaTypeRegister.data).to.equal('function');
    const vm = new Vue(IpaTypeRegister);
    vm.description = 'blaba';
    vm.clear();
    expect(vm.description).to.equal('');
  });

  it('check default IpaTypeRegister close', () => {
    expect(typeof IpaTypeRegister.data).to.equal('function');
    const vm = new Vue(IpaTypeRegister);
    vm.description = 'blaba';
    vm.dialog = true;
    vm.close();
    expect(vm.description).to.equal('');
    expect(vm.dialog).to.equal(false);
  });

  it('check default Ipa creation', () => {
    expect(typeof IpaTypeRegister.created).to.equal('function');
  });
});

