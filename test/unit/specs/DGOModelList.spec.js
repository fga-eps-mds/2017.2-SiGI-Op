
import DGOModelList from '../../../src/components/Dgo/DGOModelList';

describe('DGOModelList', () => {
  it('check default values', () => {
    expect(typeof DGOModelList.data).to.equal('function');
    const defaultData = DGOModelList.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Fabricante');
    expect(defaultData.headers[2].text).to.equal('Nome');
    expect(defaultData.headers[3].text).to.equal('Numero de portas');
  });
});
