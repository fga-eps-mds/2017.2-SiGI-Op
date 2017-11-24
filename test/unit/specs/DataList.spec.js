import DataList from '@/components/DataList';

describe('DataList', () => {
  it('sets correct default value', () => {
    expect(DataList.data().search).to.equal('');
    expect(DataList.data().totalItems).to.equal(0);
  });
  it('is a function', () => {
    expect(DataList.methods.nextPage).to.be.a('function');
    expect(DataList.methods.previousPage).to.be.a('function');
    expect(DataList.methods.inputPage).to.be.a('function');
  });
});
