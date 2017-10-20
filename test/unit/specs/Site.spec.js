import Site from '../../../src/components/Sites/Site';

describe('Site', () => {
  it('check default values', () => {
    expect(typeof Site.data).to.equal('function');
    const defaultData = Site.data();
    expect(defaultData.site_name).to.equal('');
    expect(defaultData.site_lattitude).to.equal('');
    expect(defaultData.site_longitude).to.equal('');
    expect(defaultData.site_ipa_code).to.equal('');
    expect(defaultData.site_type_site).to.equal('');
    expect(defaultData.site_bandwidth).to.equal('');
  });

  it('check getsites function', () => {
    expect(typeof Site.methods.getSites).to.equal('function');
  });

  it('check getTypeSite function', () => {
    expect(typeof Site.methods.getTypeSite).to.equal('function');
  });

  it('check deleteSite function', () => {
    expect(typeof Site.methods.deleteSite).to.equal('function');
  });

  it('check updateSite function', () => {
    expect(typeof Site.methods.updateSite).to.equal('function');
  });

  it('check getIpaCode function', () => {
    expect(typeof Site.methods.getIpaCode).to.equal('function');
  });

  it('check addSite function', () => {
    expect(typeof Site.methods.addSite).to.equal('function');
  });
});
