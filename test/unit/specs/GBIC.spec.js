import moxios from 'moxios';
import { equal } from 'assert';

import GBIC from '../../../src/components/GBIC/GBIC';

describe('GBIC', () => {
  it('check default values', () => {
    expect(typeof GBIC.data).to.equal('function');
    const defaultData = GBIC.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Serial Code');
    expect(defaultData.headers[2].text).to.equal('Patrimony Number');
    expect(defaultData.headers[3].text).to.equal('GBIC Type');
  });

  it('get request in GBIC', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      GBIC.methods.get().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 1,
            serial: 'abcd',
            patrimony_number: '1234',
            gbic_type: 1,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad get request in GBIC', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      GBIC.methods.get().then(onFulfilled);

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

  it('getGBICType request in GBIC', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      GBIC.methods.getGBICType().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            description: 'dez_de_dez',
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });
  it('bad getGBICType request in GBIC', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      GBIC.methods.getGBICType().then(onFulfilled);

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
