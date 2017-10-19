import moxios from 'moxios';
import { equal } from 'assert';

import NoBreak from '../../../src/components/NoBreaks/NoBreak';

describe('NoBreak', () => {
  it('check default values', () => {
    expect(typeof NoBreak.data).to.equal('function');
    const defaultData = NoBreak.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Potência do NoBreak');
    expect(defaultData.headers[2].text).to.equal('Proprietário do NoBreak');
    expect(defaultData.headers[3].text).to.equal('Número de Patrimônio do NoBreak');
    expect(defaultData.headers[4].text).to.equal('Site');
  });

  it('get request in NoBreak', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      NoBreak.methods.get().then(onFulfilled);

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id: 1,
            power: 1,
            proprietary: 'Proprietary',
            patrimony_number: 1,
            site_id: 1,
          },
        }).then(() => {
          equal(onFulfilled.called, true);
          done();
        });
      });
    });
  });

  it('bad get request in NoBreak', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      NoBreak.methods.get().then(onFulfilled);

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

  it('getSites request in NoBreak', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      NoBreak.methods.getSites().then(onFulfilled);

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

  it('bad getSites request in NoBreak', (done) => {
    moxios.withMock(() => {
      const onFulfilled = sinon.spy();
      NoBreak.methods.getSites().then(onFulfilled);

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
