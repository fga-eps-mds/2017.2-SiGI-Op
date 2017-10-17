import moxios from 'moxios';
import { equal } from 'assert';

import Dgo from '../../../src/components/Dgo/Dgo';

describe('Dgo', () => {
  it('check default values', () => {
    expect(typeof Dgo.data).to.equal('function');
    const defaultData = Dgo.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Code');
    expect(defaultData.headers[2].text).to.equal('Fabricator');
    expect(defaultData.headers[3].text).to.equal('Port Quantity');
    expect(defaultData.headers[4].text).to.equal('Site');
  });

  it('get request in Dgo', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Dgo.methods.get().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 1,
            code: 'abc',
            fabricant: 'ChinaMakesEverything',
            port_quantity: 1,
            site_id: 1,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad get request in Dgo', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Dgo.methods.get().then(onFulfilled);

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

  it('getSites request in Dgo', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Dgo.methods.getSites().then(onFulfilled);

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

  it('bad getSites request in Dgo', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Dgo.methods.getSites().then(onFulfilled);

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
