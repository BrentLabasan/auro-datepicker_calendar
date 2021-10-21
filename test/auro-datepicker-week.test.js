import { fixture, html, expect } from '@open-wc/testing';
import '../src/auro-datepicker-week.js';
import '../src/auro-datepicker-day.js';

import { Oct2021 } from './testData/2021-10.js';

describe('auro-datepicker-week', () => {

  it('week has the correct number of days', async () => {
    // 3rd week of October 2021
    const el = await fixture(html`
      <auro-datepicker-week monththatgeneratedthisweek="10" firstdayofweek_year="2021" firstdayofweek_month="10"
        firstdayofweek_day="10" departdate_year="2021" departdate_month="9" departdate_day="9" returndate_year="2021"
        returndate_month="10" returndate_day="9" isoneway="true" displaymonthoffset="0"
        firstdayofweekdatetime="2021-10-10T00:00:00.000-07:00" weekindex="2"
      >
      </auro-datepicker-week>
    `);

    // console.log(el);
    // console.log(el.shadowRoot);

    expect(el.shadowRoot.querySelectorAll('auro-datepicker-day:not([isnonexistent])').length).to.equal(7);

    //

    // 1st week of October 2021
    const el2 = await fixture(html`
      <auro-datepicker-week weekindex="0" monththatgeneratedthisweek="10" firstdayofweek_year="2021" firstdayofweek_month="9"
        firstdayofweek_day="26" departdate_year="2021" departdate_month="9" departdate_day="9" returndate_year="2021"
        returndate_month="10" returndate_day="9" isoneway="true" displaymonthoffset="0"
        firstdayofweekdatetime="2021-09-26T00:00:00.000-07:00"
      >
      </auro-datepicker-week>
    `);

    // console.log(el2);
    // console.log(el2.shadowRoot);

    expect(el2.shadowRoot.querySelectorAll('auro-datepicker-day:not([isnonexistent])').length).to.equal(2);

    // last week of October 2021
    const el3 = await fixture(html`
      <auro-datepicker-week monththatgeneratedthisweek="10" firstdayofweek_year="2021" firstdayofweek_month="10"
        firstdayofweek_day="31" departdate_year="2021" departdate_month="9" departdate_day="9" returndate_year="2021"
        returndate_month="10" returndate_day="9" isoneway="true" displaymonthoffset="0"
        firstdayofweekdatetime="2021-10-31T00:00:00.000-07:00" weekindex="5"
      >
      </auro-datepicker-week>
    `);

    // console.log(el3);
    // console.log(el3.shadowRoot);

    expect(el3.shadowRoot.querySelectorAll('auro-datepicker-day:not([isnonexistent])').length).to.equal(1);

    // first week of January 2022
    const el4 = await fixture(html`
      <auro-datepicker-week weekindex="0" monththatgeneratedthisweek="1" firstdayofweek_year="2021" firstdayofweek_month="12"
        firstdayofweek_day="26" departdate_year="2021" departdate_month="9" departdate_day="9" returndate_year="2021"
        returndate_month="10" returndate_day="9" isoneway="true" displaymonthoffset="0"
        firstdayofweekdatetime="2021-12-26T00:00:00.000-08:00"
      >
      </auro-datepicker-week>
    `);

    // console.log(el4);
    // console.log(el4.shadowRoot);

    expect(el4.shadowRoot.querySelectorAll('auro-datepicker-day:not([isnonexistent])').length).to.equal(1);

    // last week of January 2022
    const el5 = await fixture(html`
      <auro-datepicker-week monththatgeneratedthisweek="1" firstdayofweek_year="2022" firstdayofweek_month="1"
        firstdayofweek_day="30" departdate_year="2021" departdate_month="9" departdate_day="9" returndate_year="2021"
        returndate_month="10" returndate_day="9" isoneway="true" displaymonthoffset="0"
        firstdayofweekdatetime="2022-01-30T00:00:00.000-08:00" weekindex="5"
      >
      </auro-datepicker-week>
    `);

    // console.log(el5);
    // console.log(el5.shadowRoot);

    expect(el5.shadowRoot.querySelectorAll('auro-datepicker-day:not([isnonexistent])').length).to.equal(2);

    // first week of July 2022
    const el6 = await fixture(html`
      <auro-datepicker-week weekindex="0" monththatgeneratedthisweek="7" firstdayofweek_year="2022" firstdayofweek_month="6"
        firstdayofweek_day="26" departdate_year="2021" departdate_month="9" departdate_day="9" returndate_year="2021"
        returndate_month="10" returndate_day="9" isoneway="true" displaymonthoffset="0"
        firstdayofweekdatetime="2022-06-26T00:00:00.000-07:00"
        >
      </auro-datepicker-week>
    `);

    // console.log(el6);
    // console.log(el6.shadowRoot);

    expect(el6.shadowRoot.querySelectorAll('auro-datepicker-day:not([isnonexistent])').length).to.equal(2);

    // last week of July 2022
    const el7 = await fixture(html`
      <auro-datepicker-week monththatgeneratedthisweek="7" firstdayofweek_year="2022" firstdayofweek_month="7"
        firstdayofweek_day="31" departdate_year="2021" departdate_month="9" departdate_day="9" returndate_year="2021"
        returndate_month="10" returndate_day="9" isoneway="true" displaymonthoffset="0" firstdayofweekdatetime="2022-07-31T00:00:00.000-07:00" weekindex="5"
      >
      </auro-datepicker-week>
    `);


    // console.log(el7);
    // console.log(el7.shadowRoot);

    expect(el7.shadowRoot.querySelectorAll('auro-datepicker-day:not([isnonexistent])').length).to.equal(1);

  });


});
