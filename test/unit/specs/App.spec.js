import App from '../../../src/App';

describe('', () => {
  it('sets correct default data', () => {
    expect(typeof App.data).to.equal('function');
    const defaultData = App.data();
    expect(defaultData.username).to.equal(undefined);
  });

  it('user should be signed out', () => {
    expect(typeof App.methods.sign_out).to.equal('function');
    /* App.methods.sign_out(); */
    expect(localStorage.getItem('Token')).to.equal(null);
    expect(localStorage.getItem('username')).to.equal(null);
  });
});
