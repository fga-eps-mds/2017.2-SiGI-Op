import Vue from 'vue';
import TypeRegister from '../../../src/components/Ipas/TypeRegister';

describe('TypeRegister', () => {
  it('check default TypeRegister values', () => {
    expect(typeof TypeRegister.data).to.equal('function');
    expect(typeof TypeRegister.methods.clear).to.equal('function');
    expect(typeof TypeRegister.methods.close).to.equal('function');
    expect(typeof TypeRegister.methods.register).to.equal('function');
    const defaultData = TypeRegister.data();
    expect(defaultData.description).to.equal('');
    expect(defaultData.dialog).to.equal(false);
  });

  it('check default TypeRegister clear', () => {
    expect(typeof TypeRegister.data).to.equal('function');
    const vm = new Vue(TypeRegister);
    vm.description = 'blaba';
    vm.clear();
    expect(vm.description).to.equal('');
  });

  it('check default TypeRegister close', () => {
    expect(typeof TypeRegister.data).to.equal('function');
    const vm = new Vue(TypeRegister);
    vm.description = 'blaba';
    vm.dialog = true;
    vm.close();
    expect(vm.description).to.equal('');
    expect(vm.dialog).to.equal(false);
  });

  it('check default Ipa creation', () => {
    expect(typeof TypeRegister.created).to.equal('function');
  });
});
