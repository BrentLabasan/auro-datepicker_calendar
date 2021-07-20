import { fixture, html, expect } from '@open-wc/testing';
import '../src/auro-datepicker-day.js';

import { Oct2021 } from './testData/2021-10.js';

describe('auro-datepicker-day', () => {

  // it.only('shows the correct day digit', async () => {
  it('shows the correct day digit', async () => {
    const el = await fixture(html`
        <auro-datepicker-day year="2021" month="10" day="15" monththatgeneratedthisday="10">
        </auro-datepicker-day>
    `);

    // console.log(el);
    // console.log(el.shadowRoot);

    expect(el.shadowRoot.querySelector('#dayDigit').innerText).to.equal("15");
  });


  // TODO WHY IS THE SHADOWROOT EMPTY?!
  // if pricedata attribute is removed, then the shadowRoot isn't empty
  // it.only('shows the correct price', async () => {
/*   it('shows the correct price', async () => {
    const el = await fixture(html`
        <auro-datepicker-day year="2021" month="10" day="15" monththatgeneratedthisday="10" pricedata='${JSON.stringify(Oct2021)}'>
        </auro-datepicker-day>
    `);

    console.log(el);
    console.log(el.shadowRoot);

    expect(el.shadowRoot.querySelector('#dayPrice').innerText).to.equal("1337.37");
  }); */

  // test isDisabled
  // it.only('cannot be interacted with if Day is disabled', async () => {
  it('cannot be interacted with if Day is disabled', async () => {
    const elDisabled = await fixture(html`
        <auro-datepicker-day year="2021" month="10" day="15" monththatgeneratedthisday="10" isdisabled>
        </auro-datepicker-day>
    `);

    // console.log(elDisabled);
    // console.log(el.shadowRoot);
    // console.log("style", elDisabled.style.cursor);

    expect(elDisabled.style.cursor).to.equal("");

    // TODO more
  });


/*   it('can be interacted with normally', async () => {
    const el = await fixture(html`
        <auro-datepicker-day year="2021" month="10" day="15" monththatgeneratedthisday="10">
        </auro-datepicker-day>
    `);

    console.log(el);
    // console.log(el.shadowRoot);
    console.log("style", el.style.cursor);

    // TODO wtf in real world cursor is not pointer (see comment in .scss)
    expect(el.style.cursor).to.equal("pointer");

    // TODO more
  }); */


  // test for isNonExistent is done in auro-datepicker-calendar, because isNonExistent is determined when ADC is rendered

});
