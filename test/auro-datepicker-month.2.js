import { fixture, html, expect } from '@open-wc/testing';
import '../src/auro-datepicker-month.js';
import '../src/auro-datepicker-week.js';
import '../src/auro-datepicker-day.js';

import { Oct2021 } from './testData/2021-10.js';

describe('auro-datepicker-month', () => {

  it('month has the correct number of days', async () => {
    // October 2021
    const el = await fixture(html`
      <auro-datepicker-month index="1" departdate_year="2021" departdate_month="9" departdate_day="9" returndate_year="2021"
        returndate_month="10" returndate_day="9" isoneway="true" displaymonthoffset="0" month="10" year="2021">
      </auro-datepicker-month>
    `);

    // console.log(el);
    // console.log(el.shadowRoot);

    let count = 0;

    const weeks = el.shadowRoot.querySelectorAll('auro-datepicker-week');

    // console.log(weeks);

    weeks.forEach(week => {
      const days = week.shadowRoot.querySelectorAll('auro-datepicker-day:not([isnonexistent])');

      // console.log(days);
      // console.log(days.length);

      count += days.length;
    })

    expect(count).to.equal(31);

    //

    // December 2021
    const el2 = await fixture(html`
      <auro-datepicker-month index="3" departdate_year="2021" departdate_month="9" departdate_day="9" returndate_year="2021"
        returndate_month="10" returndate_day="9" isoneway="true" displaymonthoffset="0" month="12" year="2021">
        </auro-datepicker-month>
    `);

    // console.log(el);
    // console.log(el.shadowRoot);

    let count2 = 0;

    const weeks = el2.shadowRoot.querySelectorAll('auro-datepicker-week');

    // console.log(weeks);

    weeks.forEach(week => {
      const days = week.shadowRoot.querySelectorAll('auro-datepicker-day:not([isnonexistent])');

      // console.log(days);
      // console.log(days.length);

      count2 += days.length;
    })

    expect(count2).to.equal(31);

    //

    // January 2022
    const el3 = await fixture(html`
      <auro-datepicker-month index="4" departdate_year="2021" departdate_month="9" departdate_day="9" returndate_year="2021"
        returndate_month="10" returndate_day="9" isoneway="true" displaymonthoffset="0" month="01" year="2022">
      </auro-datepicker-month>
    `);

    // console.log(el);
    // console.log(el.shadowRoot);

    let count3 = 0;

    const weeks = el3.shadowRoot.querySelectorAll('auro-datepicker-week');

    // console.log(weeks);

    weeks.forEach(week => {
      const days = week.shadowRoot.querySelectorAll('auro-datepicker-day:not([isnonexistent])');

      // console.log(days);
      // console.log(days.length);

      count3 += days.length;
    })

    expect(count3).to.equal(31);

    //

    // February 2022
    const el4 = await fixture(html`
      <auro-datepicker-month index="5" departdate_year="2021" departdate_month="9" departdate_day="9" returndate_year="2021"
        returndate_month="10" returndate_day="9" isoneway="true" displaymonthoffset="0" month="02" year="2022">
      </auro-datepicker-month>
    `);

    // console.log(el);
    // console.log(el.shadowRoot);

    let count4 = 0;

    const weeks = el4.shadowRoot.querySelectorAll('auro-datepicker-week');

    // console.log(weeks);

    weeks.forEach(week => {
      const days = week.shadowRoot.querySelectorAll('auro-datepicker-day:not([isnonexistent])');

      // console.log(days);
      // console.log(days.length);

      count4 += days.length;
    })

    expect(count4).to.equal(28);

  });


});
