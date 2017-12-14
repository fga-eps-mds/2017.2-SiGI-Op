import { expect } from 'chai';
import { actions, state } from '@/vuex/store';


const testAction = (action, args, newState, expectedMutations, done) => {
  let count = 0;

  const commit = (type, payload) => {
    const mutation = expectedMutations[0];
    expect(mutation.type).to.equal(type);
    if (payload) {
      expect(mutation.payload).to.deep.equal(payload);
    }
    count += 1;

    if (count >= expectedMutations.length) {
      done();
    }
  };

  action({ commit, newState }, ...args);

  if (expectedMutations.length === 0) {
    expect(count).to.equal(0);
    done();
  }
};


describe('Actions', () => {
  it('setNewHeaders', (done) => {
    testAction(actions.setNewHeaders, [], state, [
      { type: 'SET_NEW_HEADERS', payload: [] },
    ], done);
  });

  it('setNewHeaders', (done) => {
    testAction(actions.setNewHeaders, [], state, [
      { type: 'SET_NEW_HEADERS', payload: [] },
    ], done);
  });

  it('setNewName', (done) => {
    testAction(actions.setNewName, [], state, [
      { type: 'SET_NEW_NAME', payload: '' },
    ], done);
  });

  it('toggleAlert', (done) => {
    testAction(actions.toggleAlert, [], state, [
      { type: 'TOGGLE_ALERT', payload: true },
    ], done);
  });

  it('fillUpdateFields', (done) => {
    testAction(actions.fillUpdateFields, [], state, [
      { type: 'FILL_UPDATE_FIELDS', payload: {} },
    ], done);
  });

  it('postObject', (done) => {
    testAction(actions.postObject, [], state, [
      { type: 'POST_OBJECTS' },
    ], done);
  });

  it('putObject', (done) => {
    testAction(actions.putObject, [], state, [
      { type: 'PUT_OBJECTS', payload: 1 },
    ], done);
  });

  it('deleteObject', (done) => {
    testAction(actions.deleteObject, [], state, [
      { type: 'DELETE_OBJECTS', payload: 1 },
    ], done);
  });

  it('changePage', (done) => {
    testAction(actions.changePage, [], state, [
      { type: 'CHANGE_PAGE', payload: 1 },
    ], done);
  });

  it('setSearch', (done) => {
    testAction(actions.setSearch, [], state, [
      { type: 'SET_SEARCH', payload: 1 },
    ], done);
  });
});
