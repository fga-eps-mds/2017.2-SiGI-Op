import { mount } from 'vue-test-utils';
import Segment from '@/components/Segments/Segment';
import store from '@/vuex/store';

describe('Segment', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Segment, { store });
  });
  it('check default Segment values', () => {
    expect(typeof Segment.data).to.equal('function');
    const defaultData = Segment.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[0].name).to.equal('id');
    expect(defaultData.headers[1].text).to.equal('Cable Length');
    expect(defaultData.headers[1].name).to.equal('cable_length');
    expect(defaultData.headers[1].type).to.equal('number');
    expect(defaultData.headers[2].text).to.equal('Segment Number');
    expect(defaultData.headers[2].name).to.equal('segment_number');
    expect(defaultData.headers[1].type).to.equal('number');
  });

  it('check default Segment components', () => {
    expect(typeof Segment.components).to.equal('object');
  });

  it('check default Segment creation', () => {
    expect(typeof Segment.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
