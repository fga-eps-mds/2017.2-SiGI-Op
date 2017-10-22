import { expect } from 'chai';
import { mutations } from '@/vuex/store';


const { GET_OBJECTS, GET_SELECT_ITEMS, SET_NEW_HEADERS, SET_NEW_NAME,
  TOGGLE_ALERT, FILL_UPDATE_FIELDS } = mutations;

describe('Mutations', () => {
  it('GET_OBJECTS', () => {
    const state = { objects: {} };
    GET_OBJECTS(state, [{ id: 1, name: 'test 1' }, { id: 2, name: 'test 2' }]);
    expect(state.objects).to.have.deep.members([{ id: 1, name: 'test 1' }, { id: 2, name: 'test 2' }]);
  });

  it('GET_SELECT_ITEMS', () => {
    const headers = { name: 'test', itemText: 'name' };
    const responseData = [{ id: 1, name: 'test 1' }, { id: 2, name: 'test 2' }];
    const state = { headers, selectitems: {} };
    GET_SELECT_ITEMS(state, {
      key: state.headers.name,
      itemText: state.headers.itemText,
      data: responseData,
    });
    expect(state.selectitems).to.have.property(state.headers.name);
    expect(state.selectitems[state.headers.name][0]).to.have.property('value');
    expect(state.selectitems[state.headers.name][0]).to.have.property('text');
    expect(state.selectitems[state.headers.name][0]).to.not.have.property('id');
    expect(state.selectitems[state.headers.name][0]).to.not.have.property('name');
    expect(state.selectitems[state.headers.name][0]).to.deep.equal({ text: 'test 1', value: 1 });
    expect(state.selectitems[state.headers.name][1]).to.deep.equal({ text: 'test 2', value: 2 });
    expect(state.selectitems[state.headers.name]).to.deep.equal([{ text: 'test 1', value: 1 }, { text: 'test 2', value: 2 }]);
  });

  it('SET_NEW_HEADERS', () => {
    const state = { headers: [] };
    expect(state.headers).to.not.have.deep.members([{ name: 'test3', itemText: 'name3' }]);
    SET_NEW_HEADERS(state, [{ name: 'test1', itemText: 'name1' }, { name: 'test2', itemText: 'name2' }]);
    expect(state.headers).to.have.deep.members([{ name: 'test1', itemText: 'name1' }, { name: 'test2', itemText: 'name2' }]);
    SET_NEW_HEADERS(state, [{ name: 'test3', itemText: 'name3' }]);
    expect(state.headers).to.have.deep.members([{ name: 'test3', itemText: 'name3' }]);
  });

  it('SET_NEW_NAME', () => {
    const state = { name: '' };
    SET_NEW_NAME(state, 'new_name');
    expect(state.name).to.equal('new_name');
    SET_NEW_NAME(state, 'other_name');
    expect(state.name).to.equal('other_name');
  });

  it('TOGGLE_ALERT', () => {
    const state = { alert: false };
    expect(state.alert).to.equal(false);
    TOGGLE_ALERT(state, true);
    expect(state.alert).to.equal(true);
    TOGGLE_ALERT(state, false);
    expect(state.alert).to.equal(false);
  });

  it('FILL_UPDATE_FIELDS', () => {
    const headers = [{ text: 'id', value: '' }, { text: 'name', value: '' }];
    const state = { headers };
    expect(state.headers[0].value).to.equal('');
    expect(state.headers[1].value).to.equal('');
    FILL_UPDATE_FIELDS(state, { id: 1, name: 'test 1' });
    expect(state.headers[0].value).to.equal(1);
    expect(state.headers[1].value).to.deep.equal('test 1');
  });
});
