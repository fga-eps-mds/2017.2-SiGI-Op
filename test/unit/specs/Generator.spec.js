import moxios from 'moxios';
import { equal } from 'assert';

import Generator from '../../../src/components/Generator/Generator';

describe('Generator', () => {
  it('check default Generator values', () => {
    expect(typeof Generator.data).to.equal('function');
    const defaultData = Generator.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Power');
    expect(defaultData.headers[2].text).to.equal('Manufacturer');
    expect(defaultData.headers[3].text).to.equal('Patrimony');
    expect(defaultData.headers[4].text).to.equal('Site');
  });
  it('get request in Generator', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Generator.methods.get().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 3,
            power: 404.0,
            manufacturer: 'asdf',
            patrimony: 'asdf',
            site: 2,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });
  it('bad get request in Generator', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Generator.methods.get().then();

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
  it('getSites request in Generator', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Generator.methods.getSites().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 1,
            name: 'rick',
            lattitude: 8.0,
            longitude: 8.0,
            bandwith: 5,
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

  it('bad getSites request in Generator', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Generator.methods.getSites().then(onFulfilled);

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
