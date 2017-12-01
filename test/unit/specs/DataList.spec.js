import DataList from '@/components/DataList';

describe('DataList', () => {
  it('is a function', () => {
    expect(DataList.methods.nextPage).to.be.a('function');
    expect(DataList.methods.previousPage).to.be.a('function');
    expect(DataList.methods.inputPage).to.be.a('function');
  });
});
