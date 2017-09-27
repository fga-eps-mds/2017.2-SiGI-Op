import Site from '../../../src/components/sites/Site';

describe('Site', () => {
  it('get sites', () => {
    expect(typeof Site.data).to.equal('function');
    const defaultData = Site.data();
    expect(defaultData.id).to.equal('null');
    expect(defaultData.name).to.equal('null');
    expect(defaultData.lattitude).to.equal('null');
    expect(defaultData.longitude).to.equal('null');
    expect(defaultData.bandwidth).to.equal('null');
    expect(defaultData.ipa_code).to.equal('null');
    expect(defaultData.site_type).to.equal('null');
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
