import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import Posts from '../../../src/components/Posts/Posts';

describe('Posts', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Posts, { store });
  });
  it('check default values', () => {
    expect(typeof Posts.data).to.equal('function');
    const defaultData = Posts.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Cable Length');
    expect(defaultData.headers[2].text).to.equal('Cable Stretch');
    expect(defaultData.headers[3].text).to.equal('Emendation Box');
    expect(defaultData.headers[4].text).to.equal('GOD');
  });
  it('check default Posts components', () => {
    expect(typeof Posts.components).to.equal('object');
  });

  it('check default Posts creation', () => {
    expect(typeof Posts.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
