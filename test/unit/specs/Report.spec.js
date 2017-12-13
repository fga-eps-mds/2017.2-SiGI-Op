// import moxios from 'moxios';
// import { equal } from 'assert';
import Report from '../../../src/components/Ipas/Report';

describe('Report', () => {
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

  it('check default Report creation', () => {
    expect(typeof Report.created).to.equal('function');
  });
  it('check default Report addCsvObject method', () => {
    expect(typeof Report.methods.addCsvObject).to.equal('function');
  });
});

