import Ipas from '../../../src/components/Ipas';

describe('Ipas', () => {
    it('sets correct default data', () => {
      expect(typeof Ipas.data).to.equal('function');
      const defaultData = Ipas.data();
      expect(defaultData.name).to.equal('');
      expect(defaultData.institution_type).to.equal('');
    });
})
