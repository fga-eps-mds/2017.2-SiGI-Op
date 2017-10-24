import moxios from 'moxios';
import { equal } from 'assert';

import Switch from '../../../src/components/Switches/Switch';

describe('Switch', () => {
  it('check default values', () => {
    expect(typeof Switch.data).to.equal('function');
    const defaultData = Switch.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Serial Number');
    expect(defaultData.headers[2].text).to.equal('Fabricant');
    expect(defaultData.headers[3].text).to.equal('Quantity of Slots');
    expect(defaultData.headers[4].text).to.equal('Patrimony Number');
    expect(defaultData.headers[5].text).to.equal('Site Id');
  });

  it('get request in Switch', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Switch.methods.get().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 1,
            serial_number: '1',
            fabricant: 'fabricant',
            qtd_slots: 1,
            patrimony_number: '1',
            site_id: 1,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad get request in Switch', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Switch.methods.get().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {},
        }).then(() => {
          equal(onFulfilled.called, false);
          done();
        });
      });
    });
  });

  it('getSites request in Switch', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Switch.methods.getSite().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            name: 'name',
            lattitude: 1,
            longitude: 1,
            bandwith: 1,
            ipa_code: 1,
            site_type: 1,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad getSites request in Switch', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Switch.methods.getSite().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {},
        }).then(() => {
          equal(onFulfilled.called, false);
          done();
        });
      });
    });
  });
});
