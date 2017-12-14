import { mount } from 'vue-test-utils';
import store from '@/vuex/store';
import Contact from '../../../src/components/Contacts';

describe('Contact', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Contact, { store });
  });
  it('check default Contact values', () => {
    expect(typeof Contact.data).to.equal('function');
    const defaultData = Contact.data();
    expect(defaultData.headers[0].text).to.equal('ID');
    expect(defaultData.headers[1].text).to.equal('Nome');
    expect(defaultData.headers[2].text).to.equal('Número de Telefone');
    expect(defaultData.headers[3].text).to.equal('Email');
    expect(defaultData.headers[4].text).to.equal('Prioridade');
    expect(defaultData.headers[5].text).to.equal('Tipo de Contato');
    expect(defaultData.headers[6].text).to.equal('IPA');
  });

  it('check default Contact components', () => {
    expect(typeof Contact.components).to.equal('object');
  });

  it('check default Contact creation', () => {
    expect(typeof Contact.created).to.equal('function');
  });
  it('renders a div', () => {
    expect(wrapper.contains('.segment')).to.equal(true);
    expect(wrapper.contains('div')).to.equal(true);
  });
});
