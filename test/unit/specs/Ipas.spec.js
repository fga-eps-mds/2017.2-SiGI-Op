import moxios from 'moxios';
import { equal } from 'assert';

import Ipa from '../../../src/components/Ipas/Ipas';

describe('Ipa', () => {
  it('check default values', () => {
    expect(typeof Ipa.data).to.equal('function');
    const defaultData = Ipa.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Name');
    expect(defaultData.headers[2].text).to.equal('Type');
  });

  it('get request in Ipa', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Ipa.methods.get().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            name: 'Xablau',
            institution_type: 1,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad get request in Ipa', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Ipa.methods.get().then(onFulfilled);

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

  it('getType request in Ipa', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Ipa.methods.getType().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            description: 'Most Lonely Day of My Life SOAD',
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad getType request in Ipa', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Ipa.methods.getType().then(onFulfilled);

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
