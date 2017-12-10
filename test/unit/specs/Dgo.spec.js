
import Dgo from '../../../src/components/Dgo/Dgo';

describe('Dgo', () => {
  it('check default values', () => {
    expect(typeof Dgo.data).to.equal('function');
    const defaultData = Dgo.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Código do DGO');
    expect(defaultData.headers[2].text).to.equal('Modelo do DGO');
    expect(defaultData.headers[3].text).to.equal('Site');
  });
});
