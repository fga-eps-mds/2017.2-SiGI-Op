import Reserves from '../../../src/components/Reserves/Reserve';

describe('Reserves', () => {
  it('sets correct default data', () => {
    expect(typeof Reserves.data).to.equal('function');
    const defaultData = Reserves.data();
    expect(defaultData.reserve_code).to.equal('');
    expect(defaultData.reserve_length).to.equal('');
    expect(defaultData.reserve_latitude).to.equal('');
    expect(defaultData.reserve_longitude).to.equal('');
  });
});
