import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import Groups from '../../../src/components/Groups/Groups';

describe('Groups', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Groups, { store });
  });

  it('check default Groups values', () => {
    expect(typeof Groups.data).to.equal('function');
    const defaultData = Groups.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Nome');
    expect(defaultData.headers[2].type).to.equal('checkbox');
  });

  it('check default Groups components', () => {
    expect(typeof Groups.components).to.equal('object');
  });

  it('check default Groups creation', () => {
    expect(typeof Groups.created).to.equal('function');
  });

  it('renders a div', () => {
    expect(wrapper.contains('div')).to.equal(true);
  });
});
