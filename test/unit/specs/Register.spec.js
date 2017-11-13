// import Vue from 'vue';
import Register from '../../../src/components/Register';

describe('Register', () => {
  it('sets correct default data', () => {
    expect(typeof Register.data).to.equal('function');
    const defaultData = Register.data();
    expect(defaultData.name).to.equal('');
    expect(defaultData.password).to.equal('');
    expect(defaultData.email).to.equal('');
  });

  it('clear all fields', () => {
    expect(typeof Register.methods.clear).to.equal('function');
    const register = Register;
    register.methods.clear();
    const clearedData = Register.data();
    expect(clearedData.name).to.equal('');
    expect(clearedData.password).to.equal('');
  });

  it('post signup data', () => {
    expect(typeof Register.methods.post).to.equal('function');
  });
});
