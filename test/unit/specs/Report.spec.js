import store from '@/vuex/store';
import { equal } from 'assert';
import moxios from 'moxios';
import sinon from 'sinon';
import { mount } from 'vue-test-utils';
import HTTP from '@/http-common';
import Report from '../../../src/components/Ipas/Report';

describe('Report', () => {
  let wrapper;
  let vm;
  beforeEach(() => {
    moxios.install(HTTP);
    wrapper = mount(Report, { store });
    vm = wrapper.vm;
  });

  afterEach(() => {
    moxios.uninstall(HTTP);
  });

  it('check default Report values', () => {
    expect(typeof Report.data).to.equal('function');
    const defaultData = Report.data();
    expect(defaultData.ipas).to.equal('');
    expect(defaultData.ipasType).to.equal('');
    expect(defaultData.sites).to.equal('');
    expect(defaultData.sitesType).to.equal('');
    expect(defaultData.contacts).to.equal('');
    expect(defaultData.contactsType).to.equal('');
    expect(defaultData.dgos).to.equal('');
    expect(defaultData.segments).to.equal('');
  });

  it('get request for Contacts in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getContacts().then(onFulfilled);
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 3,
            name: 'model',
            phone_number: 202020,
            email: 'jpm@hotmail.com',
            priority: 1,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
        });
      });
    });
  });

  it('fail request for Contacts in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getContacts('ba').then(onFulfilled);
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

  it('get request for Contact_type in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getContatTypes().then(onFulfilled);
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 3,
            name: 'abc',
          },
        }).then(() => {
          equal(onFulfilled.called, true);
        });
      });
    });
  });

  it('fail request for Contact_type in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getContatTypes('ba').then(onFulfilled);
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

  it('get request for sites in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getSite().then(onFulfilled);
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

  it('fail request for sites in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getSite('ba').then(onFulfilled);
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

  it('get request for site_type in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getSiteTypes().then(onFulfilled);
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 1,
            name: 'model',
          },
        }).then(() => {
          equal(onFulfilled.called, true);
        });
      });
    });
  });

  it('get request for segments in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getSegments().then(onFulfilled);
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 1,
            number: 1,
            length: 20,
            cable_stretch_quantity: 20,
            emendation_boxes: 1,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
        });
      });
    });
  });

  it('fail request for segments in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getSegments('ba').then(onFulfilled);
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

  it('get request for GOD in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getGOD().then(onFulfilled);
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 1,
            code: 1,
            god_model: 'model',
            site_id: 1,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
        });
      });
    });
  });

  it('fail request for GOD in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getGOD('ba').then(onFulfilled);
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

  it('get request for Ipa in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getIpa().then(onFulfilled);
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 1,
            name: 'model',
            institution_type: 1,
            cnpj: '00001',
            sigla: 'model',
          },
        }).then(() => {
          equal(onFulfilled.called, true);
        });
      });
    });
  });

  it('fail request for Ipa in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getIpa('ba').then(onFulfilled);
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

  it('get request for Ipa-types in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getIpaTypes().then(onFulfilled);
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 3,
            description: 'ba',
          },
        }).then(() => {
          equal(onFulfilled.called, true);
        });
      });
    });
  });

  it('fail request for Ipa-types in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getIpaTypes('ba').then(onFulfilled);
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

  it('get request for Emendation_boxes in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getEmendationBoxes().then(onFulfilled);
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 3,
            designNumber: 1,
            lattitude: 20,
            longitude: 20,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
        });
      });
    });
  });

  it('fail request for Emendation_boxes in Report', () => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      vm.getEmendationBoxes('ba').then(onFulfilled);
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

  it('check default Report creation', () => {
    expect(typeof Report.created).to.equal('function');
  });

  it('check default Report addCsvObject method', () => {
    expect(typeof Report.methods.addCsvObject).to.equal('function');
  });
});
