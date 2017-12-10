
import FabricantList from '../../../src/components/Dgo/FabricantList';

describe('FabricantList', () => {
  it('check default values', () => {
    expect(typeof FabricantList.data).to.equal('function');
    const defaultData = FabricantList.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Nome');
  });
});
