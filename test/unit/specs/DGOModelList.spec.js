
import DGOModelList from '../../../src/components/Dgo/DGOModelList';

describe('DGOModelList', () => {
  it('check default values', () => {
    expect(typeof DGOModelList.data).to.equal('function');
    const defaultData = DGOModelList.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Fabricant');
    expect(defaultData.headers[2].text).to.equal('Name');
    expect(defaultData.headers[3].text).to.equal('Number of ports');
  });
});
