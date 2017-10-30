import Map from '../../../src/components/Map/Map';

describe('Map', () => {
  it('check default values', () => {
    expect(typeof Map.data).to.equal('function');
    const defaultData = Map.data();
    expect(defaultData.markers[0].title).to.equal('Marcador 1');
    expect(defaultData.markers[1].title).to.equal('Marcador 2');
  });
});
