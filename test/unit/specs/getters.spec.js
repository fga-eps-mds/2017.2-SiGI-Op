import { expect } from 'chai';
import { getters } from '@/vuex/store';

const { name, headers, objects, selectitems,
    alert, errors, currentPage } = getters;

describe('Getters', () => {
  it('gets correct name', () => {
    const state = { name: '' };
    expect(name(state)).to.equal('');
    state.name = 'test';
    expect(name(state)).to.equal('test');
  });

  it('gets correct header', () => {
    const state = { headers: [] };
    expect(headers(state)).to.deep.equal([]);
    state.headers = [{ a: 'b' }, { c: 'd' }];
    expect(headers(state)).to.deep.equal([{ a: 'b' }, { c: 'd' }]);
  });

  it('gets correct objects', () => {
    const state = { objects: [] };
    expect(objects(state)).to.deep.equal([]);
    state.objects = [{ a: 'b' }, { c: 'd' }];
    expect(objects(state)).to.deep.equal([{ a: 'b' }, { c: 'd' }]);
  });

  it('gets correct selectitems', () => {
    const state = { selectitems: {} };
    expect(selectitems(state)).to.deep.equal({});
    state.selectitems = { a: 'b' };
    expect(selectitems(state)).to.deep.equal({ a: 'b' });
  });

  it('gets correct alert', () => {
    const state = { alert: false };
    expect(alert(state)).to.equal(false);
    state.alert = true;
    expect(alert(state)).to.equal(true);
  });

  it('gets correct errors', () => {
    const state = { errors: [] };
    expect(errors(state)).to.deep.equal([]);
    state.errors = ['a', 'b'];
    expect(errors(state)).to.deep.equal(['a', 'b']);
  });

  it('gets correct page', () => {
    const state = { currentPage: 1 };
    expect(currentPage(state)).to.deep.equal(1);
    state.currentPage = 2;
    expect(currentPage(state)).to.deep.equal(2);
  });
});
