import moxios from 'moxios';
import { equal } from 'assert';

import GODPort from '../../../src/components/GODPort/GODPort';

describe('GODPort', () => {
  it('check default values', () => {
    expect(typeof GODPort.data).to.equal('function');
    const defaultData = GODPort.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Code');
    expect(defaultData.headers[2].text).to.equal('Connection Type');
    expect(defaultData.headers[3].text).to.equal('G.O.D.');
    expect(defaultData.headers[4].text).to.equal('GBIC');
  });

  it('get request in GODPort', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      GODPort.methods.get().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 1,
            code: 1,
            connection_type: 1,
            god_id: 1,
            gbic_id: 1,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad get request in GODPort', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      GODPort.methods.get().then(onFulfilled);

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

  it('getConnectionTypes request in GODPort', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      GODPort.methods.getConnectionTypes().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            code: 'Woohoo',
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad getSites request in GODPort', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      GODPort.methods.getConnectionTypes().then(onFulfilled);

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

  it('getGODs request in GODPort', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      GODPort.methods.getGODs().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            code: 1,
            fabricant: 'AC/DC',
            port_quantity: 42,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad getGODs request in GODPort', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      GODPort.methods.getGODs().then(onFulfilled);

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

  it('getGBICs request in GODPort', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      GODPort.methods.getGBICs().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            serial: 'FreshPrince',
            patrimony_number: 'ABC_easyas_123',
            gbic_type: 1,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad getGBICs request in GODPort', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      GODPort.methods.getGBICs().then(onFulfilled);

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
