import store from '@/vuex/store';
import HTTP from '@/http-common';
import { mount } from 'vue-test-utils';
import moxios from 'moxios';
import sinon from 'sinon';
import { equal } from 'assert';
import Login from '../../../src/components/Login';

describe('Login', () => {
  let wrapper;
  let vm;
  beforeEach(() => {
    moxios.install(HTTP);
    wrapper = mount(Login, { store });
    vm = wrapper.vm;
  });

  afterEach(() => {
    moxios.uninstall(HTTP);
  });

  it('sets correct default data', () => {
    expect(typeof Login.data).to.equal('function');
    const defaultData = Login.data();
    expect(defaultData.name).to.equal('');
    expect(defaultData.password).to.equal('');
    expect(defaultData.alert).to.equal(false);
  });

  it('clear all fields', () => {
    expect(typeof Login.methods.clear).to.equal('function');
    vm.name = 'blaba';
    vm.password = 'x';
    vm.clear();
    expect(vm.name).to.equal('');
    expect(vm.password).to.equal('');
  });

  it('check login function', () => {
    expect(typeof Login.methods.login).to.equal('function');
  });

  it('post login data', () => {
    expect(typeof Login.methods.post).to.equal('function');
  });

  it('post Login', () => {
    vm.dialog = true;
    vm.username = 'teste';
    vm.password = 'dhb';
    moxios.install(HTTP);

    const onFulfilled = sinon.spy();
    moxios.stubRequest(vm.post().then(onFulfilled), {
      status: 200,
    });

    moxios.wait(() => {
      equal(onFulfilled.called, true);
      expect(vm.alert).to.equal(false);
      expect(vm.dialog).to.equal(false);
    });

    moxios.uninstall();
  });

  it('not post Login', () => {
    expect(typeof Login.methods.post).to.equal('function');
    vm.username = undefined;
    vm.password = undefined;
    moxios.install(HTTP);

    const onFulfilled = sinon.spy();
    moxios.stubRequest(vm.post().then(onFulfilled), {
      status: 400,
    });

    moxios.wait(() => {
      equal(onFulfilled.called, false);
      expect(vm.alert).to.equal(true);
      expect(vm.token).to.equal(null);
    });

    moxios.uninstall();
  });
});
