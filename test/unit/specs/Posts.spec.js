import moxios from 'moxios';
import { equal } from 'assert';

import Posts from '../../../src/components/Posts/Posts';

describe('Posts', () => {
  it('check default values', () => {
    expect(typeof Posts.data).to.equal('function');
    const defaultData = Posts.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Cable Length');
    expect(defaultData.headers[2].text).to.equal('stretch');
    expect(defaultData.headers[3].text).to.equal('Emendation box');
    expect(defaultData.headers[4].text).to.equal('GOD');
  });

  it('get request in Posts', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Posts.methods.get().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 1,
            cable_length: 1,
            stretch: 1,
            emendation_box: 1,
            god: 1,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad get request in Posts', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Posts.methods.get().then(onFulfilled);

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

  it('getEmendqationBox request in Posts', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Posts.methods.getEmendationBox().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            lattitude: 1,
            longitude: 23,
            designNumber: 3,
            access_box: false,
            creation_date: 20171007,
            extinction_date: null,
            emendation_type: 1,
            emendation_structure: 1,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad getSites request in Posts', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      Posts.methods.getEmendationBox().then(onFulfilled);

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
