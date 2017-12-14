import store from '@/vuex/store';
import HTTP from '@/http-common';
import { mount } from 'vue-test-utils';
import moxios from 'moxios';
import sinon from 'sinon';
import { equal } from 'assert';
import Fabricant from '../../../src/components/Dgo/Fabricant';

describe('Fabricant', () => {
  let wrapper;
  let vm;
  beforeEach(() => {
    moxios.install(HTTP);
    wrapper = mount(Fabricant, { store });
    vm = wrapper.vm;
  });

  afterEach(() => {
    moxios.uninstall(HTTP);
  });

  it('check default values', () => {
    expect(typeof Fabricant.data).to.equal('function');
    const defaultData = Fabricant.data();
    expect(Object.keys(defaultData)[0]).to.equal('description');
  });

  it('check default fabricant clear', (done) => {
    vm.description = 'blaba';
    vm.clear();
    expect(vm.description).to.equal('');
    done();
  });

  it('check default fabricant close', (done) => {
    vm.description = 'blaba';
    vm.dialog = true;
    vm.close();
    expect(vm.description).to.equal('');
    expect(vm.dialog).to.equal(false);
    done();
  });

  it('check component creation', (done) => {
    expect(typeof Fabricant.created).to.equal('function');
    done();
  });

  it('post fabricant', () => {
    vm.dialog = true;
    vm.description = 'TOpper';
    moxios.install(HTTP);

    const onFulfilled = sinon.spy();
    moxios.stubRequest(vm.register().then(onFulfilled), {
      status: 200,
    });

    moxios.wait(() => {
      equal(onFulfilled.called, true);
      expect(wrapper.emmited('registerFab')).to.be(true);
      expect(vm.dialog).to.equal(false);
    });

    moxios.uninstall();
  });

  it('not post fabricant', () => {
    vm.description = undefined;
    moxios.install(HTTP);

    const onFulfilled = sinon.spy();
    moxios.stubRequest(vm.register().then(onFulfilled), {
      status: 400,
    });

    moxios.wait(() => {
      equal(onFulfilled.called, false);
    });

    moxios.uninstall();
  });
});
