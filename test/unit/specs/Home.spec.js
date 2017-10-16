import Home from '../../../src/components/Home';

describe('Home', () => {
  /* it('sets correct default data', () => {
    expect(typeof Home.data).to.equal('function');
    const defaultData = Home.data();
    expect(defaultData.current_username).to.equal(null);
  }); */

  it('should be a current_username', () => {
    localStorage.setItem('username', 'some_user');
    const defaultData = Home.data();
    expect(defaultData.current_username).to.equal('some_user');
  });
});
