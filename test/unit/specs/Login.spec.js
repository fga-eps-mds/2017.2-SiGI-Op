// import Vue from 'vue';
import Login from '../../../src/components/Login';

describe('Login', () => {
  it('sets correct default data', () => {
    expect(typeof Login.data).to.equal('function');
    const defaultData = Login.data();
    expect(defaultData.name).to.equal('');
    expect(defaultData.password).to.equal('');
  });

  it('clear all fields', () => {
    expect(typeof Login.methods.clear).to.equal('function');
    const login = Login;
    login.methods.clear();
    const clearedData = login.data();
    expect(clearedData.name).to.equal('');
    expect(clearedData.password).to.equal('');
  });

  it('check login function', () => {
    expect(typeof Login.methods.login).to.equal('function');
  });

  it('post login data', () => {
    expect(typeof Login.methods.post).to.equal('function');
  });
});
