
import Fabricant from '../../../src/components/Dgo/Fabricant';

describe('Fabricant', () => {
  it('check default values', () => {
    expect(typeof Fabricant.data).to.equal('function');
    const defaultData = Fabricant.data();
    expect(Object.keys(defaultData)[0]).to.equal('description');
  });
});
