import Site from '../../../src/components/Sites/Site';

describe('Site', () => {
  it('check default values', () => {
    expect(typeof Site.data).to.equal('function');
    const defaultData = Site.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Name');
    expect(defaultData.headers[2].text).to.equal('Latitude');
    expect(defaultData.headers[3].text).to.equal('Longitude');
    expect(defaultData.headers[4].text).to.equal('Bandwidth');
    expect(defaultData.headers[5].text).to.equal('IPA');
    expect(defaultData.headers[6].text).to.equal('Site type');
  });
});
