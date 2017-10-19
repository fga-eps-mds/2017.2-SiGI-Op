import moxios from 'moxios';
import { equal } from 'assert';

import UndergroundBox from '../../../src/components/UndergroundBox/UndergroundBox';

describe('UndergroundBox', () => {
  it('check default values', () => {
    expect(typeof UndergroundBox.data).to.equal('function');
    const defaultData = UndergroundBox.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Code');
    expect(defaultData.headers[2].text).to.equal('Latitude');
    expect(defaultData.headers[3].text).to.equal('Longitude');
    expect(defaultData.headers[4].text).to.equal('Cover Type');
    expect(defaultData.headers[5].text).to.equal('Emendation Box');
    expect(defaultData.headers[6].text).to.equal('Technical Reserve');
    expect(defaultData.headers[7].text).to.equal('Underground box type');
  });

  it('get request in UndergroundBox', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      UndergroundBox.methods.get().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 1,
            code: 1,
            latitude: 'Proprietary',
            longitude: 1,
            cover_type: 1,
            emendation_box: 1,
            technical_reserve: 1,
            box_type: 1,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad get request in UndergroundBox', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      UndergroundBox.methods.get().then(onFulfilled);

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

  it('getType request in UndergroundBox', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      UndergroundBox.methods.getType().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            name: 'Most Lonely Day of My Life SOAD',
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad getType request in UndergroundBox', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      UndergroundBox.methods.getType().then(onFulfilled);

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

  it('getEmendationBox request in UndergroundBox', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      UndergroundBox.methods.getEmendationBox().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            lattitude: 1,
            longitude: 1,
            designNumber: 2,
            access_box: true,
            creation_date: 20170101,
            extinction_date: 20180101,
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

  it('bad getEmendationBox request in UndergroundBox', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      UndergroundBox.methods.getEmendationBox().then(onFulfilled);

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

  it('getTechnicalReserve request in UndergroundBox', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      UndergroundBox.methods.getTechnicalReserve().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            code: 1,
            length: 2.1,
            latitude: 1.2,
            longitude: 9.8,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad getTechnicalReserve request in UndergroundBox', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      UndergroundBox.methods.getTechnicalReserve().then(onFulfilled);

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
