import Reserves from '../../../src/components/Reserves/Reserve';

describe('Reserves', () => {
  it('sets correct default data', () => {
    expect(typeof Reserves.data).to.equal('function');
    const defaultData = Reserves.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Code');
    expect(defaultData.headers[2].text).to.equal('Length');
    expect(defaultData.headers[3].text).to.equal('Latitude');
    expect(defaultData.headers[4].text).to.equal('Longitude');
  });
});
