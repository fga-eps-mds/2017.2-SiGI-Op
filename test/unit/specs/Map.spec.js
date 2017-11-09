import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import Map from '../../../src/components/Map/Map';

describe('Map', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Map, { store });
  });

  it('check default values', () => {
    expect(typeof Map.data).to.equal('function');
    const defaultData = Map.data();
    expect(defaultData.site_checkbox).to.equal(false);
    expect(defaultData.technical_reserve_checkbox).to.equal(false);
    expect(defaultData.emendation_box_checkbox).to.equal(false);
    expect(defaultData.underground_box_checkbox).to.equal(false);
    expect(defaultData.objects.length).to.equal(0);
    expect(defaultData.markers.length).to.equal(0);
    expect(defaultData.errors.length).to.equal(0);
  });

  it('check default Map methods', () => {
    expect(typeof Map.methods.getObjects).to.equal('function');
    expect(typeof Map.methods.addMarkers).to.equal('function');
  });

  it('check default Map creation', () => {
    expect(typeof Map.created).to.equal('function');
  });

  it('renders a div', () => {
    expect(wrapper.contains('div')).to.equal(true);
  });
});
