import { fixture, html, expect } from '@open-wc/testing';
import '../src/auro-datepicker_calendar.js';

describe('auro-datepicker_calendar', () => {
  it('sets the CSS class on auro-datepicker_calendar > div element', async () => {
    const el = await fixture(html`
      <auro-datepicker_calendar cssclass="testClass"></auro-datepicker_calendar>
    `);

    const div = el.shadowRoot.querySelector('div');
    expect(div.className).to.equal('testClass');
  });

  it('auro-datepicker_calendar is accessible', async () => {
    const el = await fixture(html`
      <auro-datepicker_calendar cssclass="testClass"></auro-datepicker_calendar>
    `);

    await expect(el).to.be.accessible();
  });

  it('auro-datepicker_calendar custom element is defined', async () => {
    const el = await !!customElements.get("auro-datepicker_calendar");

    await expect(el).to.be.true;
  });
});
