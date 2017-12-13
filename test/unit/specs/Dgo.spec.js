import store from '@/vuex/store';
import HTTP from '@/http-common';
import { mount } from 'vue-test-utils';
import moxios from 'moxios';
import sinon from 'sinon';
import { equal } from 'assert';
import Dgo from '../../../src/components/Dgo/Dgo';

describe('Dgo', () => {
  let wrapper;
  let vm;
  beforeEach(() => {
    moxios.install(HTTP);
    wrapper = mount(Dgo, { store });
    vm = wrapper.vm;
  });

  afterEach(() => {
    moxios.uninstall(HTTP);
  });

  it('check default values', (done) => {
    expect(typeof Dgo.data).to.equal('function');
    const defaultData = Dgo.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Código do DGO');
    expect(defaultData.headers[2].text).to.equal('Modelo do DGO');
    expect(defaultData.headers[3].text).to.equal('Site');
    done();
  });

  it('check default DGO clear', (done) => {
    vm.fabricant = 'blaba';
    vm.code = 'teste';
    vm.clear();
    expect(vm.fabricant).to.equal('');
    expect(vm.code).to.equal('');
    done();
  });

  it('check default DGO close', (done) => {
    vm.fabricant = 'blaba';
    vm.code = 'teste';
    vm.dialog = true;
    vm.close();
    expect(vm.fabricant).to.equal('');
    expect(vm.code).to.equal('');
    expect(vm.dialog).to.equal(false);
    done();
  });

  it('check component creation', (done) => {
    expect(typeof Dgo.created).to.equal('function');
    done();
  });

  it('get request for Fabricants in DGO', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getFabricants().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 3,
            description: 'fabr',
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('get request for Models in DGO', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getGODModel(1).then(onFulfilled);
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 3,
            name: 'model',
            fabricant_id: 1,
            port_quantity: 20,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
        });
      });
    });
  });

  it('fail request for Models in DGO', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getGODModel('ba').then(onFulfilled);
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
        }).then(() => {
          equal(onFulfilled.called, false);
        });
      });
    });
  });

  it('get request for sites in DGO', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getSites().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 3,
            name: 'model',
            lattitude: 20,
            longitude: 20,
            ipa_code: 1,
            site_type: 1,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
        });
      });
    });
  });
});
