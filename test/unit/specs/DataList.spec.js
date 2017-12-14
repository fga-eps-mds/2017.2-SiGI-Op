import DataList from '@/components/DataList';

describe('DataList', () => {
  it('is a function', () => {
    expect(DataList.methods.nextPage).to.be.a('function');
    expect(DataList.methods.previousPage).to.be.a('function');
    expect(DataList.methods.inputPage).to.be.a('function');
    expect(DataList.methods.InputSearch).to.be.a('function');
    expect(DataList.methods.NewSearch).to.not.be.a('function');
    const defaultData = DataList.data();
    expect(defaultData.disabled).to.equal(false);
    expect(defaultData.disabled1).to.equal(true);
  });
});
