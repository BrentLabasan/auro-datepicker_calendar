import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import '../src/auro-datepicker-calendar.js';
import '../src/auro-datepicker-month.js';
import '../src/auro-datepicker-week.js';
import '../src/auro-datepicker-day.js';
import fetchMock from "fetch-mock/esm/client";

import { DateTime } from 'luxon';

import AMOUNT_MONTHS_SHOWN from '../src/constants.js';

const dtNow = DateTime.now();
const dt1MonthFromNow = dtInFuture(1, 0);
const dt2MonthsFromNow = dtInFuture(2, 0);
const dt6MonthsFromNow = dtInFuture(6, 0);
const dt11MonthsFromNow = dtInFuture(11, 0);

function dtInFuture(months, days) {
  return DateTime.now().plus({month: months, day: days});
}

describe('auro-datepicker-calendar', () => {
  beforeEach(() => {
    fetchMock.mock('begin:https://flightsearch-lembff.w2.ecomm-test-aks.alaskaair.com/calendar/sea/alw/2021-10', {"2021-11-01":"157.40","2021-11-02":"157.40","2021-11-03":"117.40","2021-11-04":"137.40","2021-11-05":"117.40","2021-11-06":"117.40","2021-11-07":"117.40","2021-11-08":"117.40","2021-11-09":"117.40","2021-11-10":"77.40","2021-11-11":"77.40","2021-11-12":"87.40","2021-11-13":"77.40","2021-11-14":"109.00","2021-11-15":"77.40","2021-11-16":"77.40","2021-11-17":"77.40","2021-11-18":"77.40","2021-11-19":"89.01","2021-11-20":"77.40","2021-11-21":"77.40","2021-11-22":"89.01","2021-11-23":"109.00","2021-11-24":"169.00","2021-11-25":"109.00","2021-11-26":"209.00","2021-11-27":"399.25","2021-11-28":"399.25","2021-11-29":"229.00","2021-11-30":"87.40"})
    fetchMock.mock('begin:https://flightsearch-lembff.w2.ecomm-test-aks.alaskaair.com/calendar/sea/alw/2021-11', {"2021-11-01":"157.40","2021-11-02":"157.40","2021-11-03":"117.40","2021-11-04":"137.40","2021-11-05":"117.40","2021-11-06":"117.40","2021-11-07":"117.40","2021-11-08":"117.40","2021-11-09":"117.40","2021-11-10":"77.40","2021-11-11":"77.40","2021-11-12":"87.40","2021-11-13":"77.40","2021-11-14":"109.00","2021-11-15":"77.40","2021-11-16":"77.40","2021-11-17":"77.40","2021-11-18":"77.40","2021-11-19":"89.01","2021-11-20":"77.40","2021-11-21":"77.40","2021-11-22":"89.01","2021-11-23":"109.00","2021-11-24":"169.00","2021-11-25":"109.00","2021-11-26":"209.00","2021-11-27":"399.25","2021-11-28":"399.25","2021-11-29":"229.00","2021-11-30":"87.40"})
    fetchMock.mock('begin:https://flightsearch-lembff.w2.ecomm-test-aks.alaskaair.com/calendar/sea/alw/2021-12', {"2021-11-01":"157.40","2021-11-02":"157.40","2021-11-03":"117.40","2021-11-04":"137.40","2021-11-05":"117.40","2021-11-06":"117.40","2021-11-07":"117.40","2021-11-08":"117.40","2021-11-09":"117.40","2021-11-10":"77.40","2021-11-11":"77.40","2021-11-12":"87.40","2021-11-13":"77.40","2021-11-14":"109.00","2021-11-15":"77.40","2021-11-16":"77.40","2021-11-17":"77.40","2021-11-18":"77.40","2021-11-19":"89.01","2021-11-20":"77.40","2021-11-21":"77.40","2021-11-22":"89.01","2021-11-23":"109.00","2021-11-24":"169.00","2021-11-25":"109.00","2021-11-26":"209.00","2021-11-27":"399.25","2021-11-28":"399.25","2021-11-29":"229.00","2021-11-30":"87.40"})
    fetchMock.mock('begin:https://flightsearch-lembff.w2.ecomm-test-aks.alaskaair.com/calendar/sea/alw/2022-1', {"2021-11-01":"157.40","2021-11-02":"157.40","2021-11-03":"117.40","2021-11-04":"137.40","2021-11-05":"117.40","2021-11-06":"117.40","2021-11-07":"117.40","2021-11-08":"117.40","2021-11-09":"117.40","2021-11-10":"77.40","2021-11-11":"77.40","2021-11-12":"87.40","2021-11-13":"77.40","2021-11-14":"109.00","2021-11-15":"77.40","2021-11-16":"77.40","2021-11-17":"77.40","2021-11-18":"77.40","2021-11-19":"89.01","2021-11-20":"77.40","2021-11-21":"77.40","2021-11-22":"89.01","2021-11-23":"109.00","2021-11-24":"169.00","2021-11-25":"109.00","2021-11-26":"209.00","2021-11-27":"399.25","2021-11-28":"399.25","2021-11-29":"229.00","2021-11-30":"87.40"})
    fetchMock.mock('begin:https://flightsearch-lembff.w2.ecomm-test-aks.alaskaair.com/calendar/sea/alw/2022-2', {"2021-11-01":"157.40","2021-11-02":"157.40","2021-11-03":"117.40","2021-11-04":"137.40","2021-11-05":"117.40","2021-11-06":"117.40","2021-11-07":"117.40","2021-11-08":"117.40","2021-11-09":"117.40","2021-11-10":"77.40","2021-11-11":"77.40","2021-11-12":"87.40","2021-11-13":"77.40","2021-11-14":"109.00","2021-11-15":"77.40","2021-11-16":"77.40","2021-11-17":"77.40","2021-11-18":"77.40","2021-11-19":"89.01","2021-11-20":"77.40","2021-11-21":"77.40","2021-11-22":"89.01","2021-11-23":"109.00","2021-11-24":"169.00","2021-11-25":"109.00","2021-11-26":"209.00","2021-11-27":"399.25","2021-11-28":"399.25","2021-11-29":"229.00","2021-11-30":"87.40"})
    fetchMock.mock('begin:https://flightsearch-lembff.w2.ecomm-test-aks.alaskaair.com/calendar/sea/alw/2022-3', {"2021-11-01":"157.40","2021-11-02":"157.40","2021-11-03":"117.40","2021-11-04":"137.40","2021-11-05":"117.40","2021-11-06":"117.40","2021-11-07":"117.40","2021-11-08":"117.40","2021-11-09":"117.40","2021-11-10":"77.40","2021-11-11":"77.40","2021-11-12":"87.40","2021-11-13":"77.40","2021-11-14":"109.00","2021-11-15":"77.40","2021-11-16":"77.40","2021-11-17":"77.40","2021-11-18":"77.40","2021-11-19":"89.01","2021-11-20":"77.40","2021-11-21":"77.40","2021-11-22":"89.01","2021-11-23":"109.00","2021-11-24":"169.00","2021-11-25":"109.00","2021-11-26":"209.00","2021-11-27":"399.25","2021-11-28":"399.25","2021-11-29":"229.00","2021-11-30":"87.40"})
    fetchMock.mock('begin:https://flightsearch-lembff.w2.ecomm-test-aks.alaskaair.com/calendar/sea/alw/2022-4', {"2021-11-01":"157.40","2021-11-02":"157.40","2021-11-03":"117.40","2021-11-04":"137.40","2021-11-05":"117.40","2021-11-06":"117.40","2021-11-07":"117.40","2021-11-08":"117.40","2021-11-09":"117.40","2021-11-10":"77.40","2021-11-11":"77.40","2021-11-12":"87.40","2021-11-13":"77.40","2021-11-14":"109.00","2021-11-15":"77.40","2021-11-16":"77.40","2021-11-17":"77.40","2021-11-18":"77.40","2021-11-19":"89.01","2021-11-20":"77.40","2021-11-21":"77.40","2021-11-22":"89.01","2021-11-23":"109.00","2021-11-24":"169.00","2021-11-25":"109.00","2021-11-26":"209.00","2021-11-27":"399.25","2021-11-28":"399.25","2021-11-29":"229.00","2021-11-30":"87.40"})
    fetchMock.mock('begin:https://flightsearch-lembff.w2.ecomm-test-aks.alaskaair.com/calendar/sea/alw/2022-5', {"2021-11-01":"157.40","2021-11-02":"157.40","2021-11-03":"117.40","2021-11-04":"137.40","2021-11-05":"117.40","2021-11-06":"117.40","2021-11-07":"117.40","2021-11-08":"117.40","2021-11-09":"117.40","2021-11-10":"77.40","2021-11-11":"77.40","2021-11-12":"87.40","2021-11-13":"77.40","2021-11-14":"109.00","2021-11-15":"77.40","2021-11-16":"77.40","2021-11-17":"77.40","2021-11-18":"77.40","2021-11-19":"89.01","2021-11-20":"77.40","2021-11-21":"77.40","2021-11-22":"89.01","2021-11-23":"109.00","2021-11-24":"169.00","2021-11-25":"109.00","2021-11-26":"209.00","2021-11-27":"399.25","2021-11-28":"399.25","2021-11-29":"229.00","2021-11-30":"87.40"})
    fetchMock.mock('begin:https://flightsearch-lembff.w2.ecomm-test-aks.alaskaair.com/calendar/sea/alw/2022-6', {"2021-11-01":"157.40","2021-11-02":"157.40","2021-11-03":"117.40","2021-11-04":"137.40","2021-11-05":"117.40","2021-11-06":"117.40","2021-11-07":"117.40","2021-11-08":"117.40","2021-11-09":"117.40","2021-11-10":"77.40","2021-11-11":"77.40","2021-11-12":"87.40","2021-11-13":"77.40","2021-11-14":"109.00","2021-11-15":"77.40","2021-11-16":"77.40","2021-11-17":"77.40","2021-11-18":"77.40","2021-11-19":"89.01","2021-11-20":"77.40","2021-11-21":"77.40","2021-11-22":"89.01","2021-11-23":"109.00","2021-11-24":"169.00","2021-11-25":"109.00","2021-11-26":"209.00","2021-11-27":"399.25","2021-11-28":"399.25","2021-11-29":"229.00","2021-11-30":"87.40"})
    fetchMock.mock('begin:https://flightsearch-lembff.w2.ecomm-test-aks.alaskaair.com/calendar/sea/alw/2022-7', {"2021-11-01":"157.40","2021-11-02":"157.40","2021-11-03":"117.40","2021-11-04":"137.40","2021-11-05":"117.40","2021-11-06":"117.40","2021-11-07":"117.40","2021-11-08":"117.40","2021-11-09":"117.40","2021-11-10":"77.40","2021-11-11":"77.40","2021-11-12":"87.40","2021-11-13":"77.40","2021-11-14":"109.00","2021-11-15":"77.40","2021-11-16":"77.40","2021-11-17":"77.40","2021-11-18":"77.40","2021-11-19":"89.01","2021-11-20":"77.40","2021-11-21":"77.40","2021-11-22":"89.01","2021-11-23":"109.00","2021-11-24":"169.00","2021-11-25":"109.00","2021-11-26":"209.00","2021-11-27":"399.25","2021-11-28":"399.25","2021-11-29":"229.00","2021-11-30":"87.40"})
    fetchMock.mock('begin:https://flightsearch-lembff.w2.ecomm-test-aks.alaskaair.com/calendar/sea/alw/2022-8', {"2021-11-01":"157.40","2021-11-02":"157.40","2021-11-03":"117.40","2021-11-04":"137.40","2021-11-05":"117.40","2021-11-06":"117.40","2021-11-07":"117.40","2021-11-08":"117.40","2021-11-09":"117.40","2021-11-10":"77.40","2021-11-11":"77.40","2021-11-12":"87.40","2021-11-13":"77.40","2021-11-14":"109.00","2021-11-15":"77.40","2021-11-16":"77.40","2021-11-17":"77.40","2021-11-18":"77.40","2021-11-19":"89.01","2021-11-20":"77.40","2021-11-21":"77.40","2021-11-22":"89.01","2021-11-23":"109.00","2021-11-24":"169.00","2021-11-25":"109.00","2021-11-26":"209.00","2021-11-27":"399.25","2021-11-28":"399.25","2021-11-29":"229.00","2021-11-30":"87.40"})
    fetchMock.mock('begin:https://flightsearch-lembff.w2.ecomm-test-aks.alaskaair.com/calendar/sea/alw/2022-9', {"2021-11-01":"157.40","2021-11-02":"157.40","2021-11-03":"117.40","2021-11-04":"137.40","2021-11-05":"117.40","2021-11-06":"117.40","2021-11-07":"117.40","2021-11-08":"117.40","2021-11-09":"117.40","2021-11-10":"77.40","2021-11-11":"77.40","2021-11-12":"87.40","2021-11-13":"77.40","2021-11-14":"109.00","2021-11-15":"77.40","2021-11-16":"77.40","2021-11-17":"77.40","2021-11-18":"77.40","2021-11-19":"89.01","2021-11-20":"77.40","2021-11-21":"77.40","2021-11-22":"89.01","2021-11-23":"109.00","2021-11-24":"169.00","2021-11-25":"109.00","2021-11-26":"209.00","2021-11-27":"399.25","2021-11-28":"399.25","2021-11-29":"229.00","2021-11-30":"87.40"})
  });

  afterEach(() => {
    fetchMock.reset();
  });

  // > setting the depart and return dates

  // 💻 DESKTOP 📅 ONE WAY | setting the depart and return dates

  it('Depart date has NOT been set, so the depart date has been set to today\'s date. No return date should be set.', async () => {
    const el = await fixture(html`
      <div>
        <auro-datepicker-calendar isOneWay>
        </auro-datepicker-calendar>
      </div>
    `);

    const adc = el.querySelector('auro-datepicker-calendar');

    const date = new Date();

    expect(parseInt(adc.getAttribute('departDate_year'))).to.equal(dtNow.year);
    expect(parseInt(adc.getAttribute('departDate_month'))).to.equal(dtNow.month); // +1 is because of date is 0 indexed
    expect(parseInt(adc.getAttribute('departDate_day'))).to.equal(dtNow.day);

    // console.log("target", target);

    expect(adc.hasAttribute('returnDate_year')).to.equal(false);
    expect(adc.hasAttribute('returnDate_month')).to.equal(false);
    expect(adc.hasAttribute('returnDate_day')).to.equal(false);

    // expect(parseInt(target.getAttribute('returnDate_year'))).to.equal(date2.year);
    // expect(parseInt(target.getAttribute('returnDate_month'))).to.equal(date2.month);
    // expect(parseInt(target.getAttribute('returnDate_day'))).to.equal(date2.day);

  });

  it('Depart date has been set. No return date should be set.', async () => {

    const departDate = dtInFuture(3, 5);

    const el = await fixture(html`
      <div departDate_year="${departDate.year}" departDate_month="${departDate.month}" departDate_day="${departDate.day}">
        <auro-datepicker-calendar isOneWay>
        </auro-datepicker-calendar>
      </div>
    `);

    const adc = el.querySelector('auro-datepicker-calendar');

    const date = new Date();

    expect(parseInt(adc.getAttribute('departDate_year'))).to.equal(departDate.year);
    expect(parseInt(adc.getAttribute('departDate_month'))).to.equal(departDate.month);
    expect(parseInt(adc.getAttribute('departDate_day'))).to.equal(departDate.day);

    // console.log("target", target);

    expect(adc.hasAttribute('returnDate_year')).to.equal(false);
    expect(adc.hasAttribute('returnDate_month')).to.equal(false);
    expect(adc.hasAttribute('returnDate_day')).to.equal(false);

  });

  // 💻 DESKTOP 📅📅 ROUND TRIP | setting the depart and return dates

  it('Depart date has NOT been set, so the depart date has been set to today\'s date. Return date is set to one month from depart date.', async () => {
    const el = await fixture(html`
      <div>
        <auro-datepicker-calendar>
        </auro-datepicker-calendar>
      </div>
    `);

    const adc = el.querySelector('auro-datepicker-calendar');

    const date = new Date();

    expect(parseInt(adc.getAttribute('departDate_year'))).to.equal(dtNow.year);
    expect(parseInt(adc.getAttribute('departDate_month'))).to.equal(dtNow.month); // +1 is because of date is 0 indexed
    expect(parseInt(adc.getAttribute('departDate_day'))).to.equal(dtNow.day);

    const oneMonthFromToday = dtInFuture(1, 0);

    expect(parseInt(adc.getAttribute('returnDate_year'))).to.equal(oneMonthFromToday.year);
    expect(parseInt(adc.getAttribute('returnDate_month'))).to.equal(oneMonthFromToday.month);
    expect(parseInt(adc.getAttribute('returnDate_day'))).to.equal(oneMonthFromToday.day);
  });

  it('Depart date and return date have been set.', async () => {
    const departDate = dtInFuture(3, 5);
    const returnDate = dtInFuture(4, 10);

    const el = await fixture(html`
      <div departDate_year="${departDate.year}" departDate_month="${departDate.month}" departDate_day="${departDate.day}" returnDate_year="${returnDate.year}" returnDate_month="${returnDate.month}" returnDate_day="${returnDate.day}">
        <auro-datepicker-calendar>
        </auro-datepicker-calendar>
      </div>
    `);

    const target = el.querySelector('auro-datepicker-calendar');

    const date = new Date();

    expect(parseInt(target.getAttribute('departDate_year'))).to.equal(departDate.year);
    expect(parseInt(target.getAttribute('departDate_month'))).to.equal(departDate.month);
    expect(parseInt(target.getAttribute('departDate_day'))).to.equal(departDate.day);

    expect(parseInt(target.getAttribute('returnDate_year'))).to.equal(returnDate.year);
    expect(parseInt(target.getAttribute('returnDate_month'))).to.equal(returnDate.month);
    expect(parseInt(target.getAttribute('returnDate_day'))).to.equal(returnDate.day);
  });

  // > clicking the depart and return dates

  // 💻 DESKTOP 📅 ONE WAY | clicking the depart and return dates

  it('clicking a Day in one way mode changes the depart date', async () => {
    const el = await fixture(html`
      <div>
        <auro-datepicker-calendar isOneWay>
        </auro-datepicker-calendar>
      </div>
    `);

    const ada = el.querySelector('auro-datepicker-calendar');

    const elDay1MonthFromNow = findTargetDay(ada, dt1MonthFromNow.year, dt1MonthFromNow.month, dt1MonthFromNow.day);
    console.log("elDay1MonthFromNow", elDay1MonthFromNow);
    elDay1MonthFromNow.click();
    await elementUpdated(elDay1MonthFromNow);

    expect(parseInt(ada.getAttribute('departDate_year'))).to.equal(dt1MonthFromNow.year);
    expect(parseInt(ada.getAttribute('departDate_month'))).to.equal(dt1MonthFromNow.month);
    expect(parseInt(ada.getAttribute('departDate_day'))).to.equal(dt1MonthFromNow.day);

    const elDay6MonthsFromNow = findTargetDay(ada, dt6MonthsFromNow.year, dt6MonthsFromNow.month, dt6MonthsFromNow.day);
    console.log("elDay6MonthsFromNow", elDay6MonthsFromNow);
    elDay6MonthsFromNow.click();
    await elementUpdated(elDay6MonthsFromNow);

    expect(parseInt(ada.getAttribute('departDate_year'))).to.equal(dt6MonthsFromNow.year);
    expect(parseInt(ada.getAttribute('departDate_month'))).to.equal(dt6MonthsFromNow.month);
    expect(parseInt(ada.getAttribute('departDate_day'))).to.equal(dt6MonthsFromNow.day);
  });

  // it('', async () => {

  // });

  // 💻 DESKTOP 📅📅 ROUND TRIP | clicking the depart and return dates


  // it('', async () => {

  // });


  // 📱 MOBILE 📅 ONE WAY | include the attributes "isOneWay" and "isMobile"

  // 📱 MOBILE 📅📅 ROUND-TRIP | omit the attribute "isOneWay" and include "isMobile"

  // it('if ADC\'s parent element doesn\'t have a depart date, set ADC\'s depart date to today\'s date', async () => {

  // });

  // it('if auro-datepicker-calendar\'s parent element does have a depart date and return date, ADA\'s dates matches', async () => {
  //   const el = await fixture(html`
  //     <div>
  //       <auro-datepicker-calendar isoneway="" departdate_year="2021" departdate_month="9"
  //         departdate_day="10" returndate_year="2021" returndate_month="10" returndate_day="10" displaymonth="9"
  //         displayyear="2021" displaymonthoffset="0">
  //       </auro-datepicker-calendar>
  //     </div>
  //   `);
  // });

  // it('if the depart date and/or arrival date attributes get changed, then the change is reflected in the input', async () => {

  // });

  // it('if ADA has "disabled" attribute, then its input elements will also have "disabled" attribute', async () => {

  // });

  // it('if user clicks depart input, auro-datepicker-calendar selection mode is for depart date', async () => {

  // });

  // it('if user clicks return input, auro-datepicker-calendar selection mode is for return date', async () => {

  // });

  // it('can only click forward button for the designated amount of times', async () => {
  //   const el = await fixture(html`
  //     <auro-datepicker-calendar   isoneway="" departdate_year="2021" departdate_month="9"
  //       departdate_day="10" returndate_year="2021" returndate_month="10" returndate_day="10" displaymonth="9"
  //       displayyear="2021" displaymonthoffset="0">
  //     </auro-datepicker-calendar>
  //   `);

  //   const btnForward = el.shadowRoot.querySelector('#btn-nextMonth');

  //   for (let i = 0; i < 14; i++) {
  //     btnForward.click();
  //   }



  // });




  // 11 auro-datepicker-calendars's Days are correct
  // it('if auro-datepicker-calendar\'s parent element doesn\'t have a depart date, set ADC\'s depart date to today\'s date', async () => {
  //   const el = await fixture(html`
  //     <div departDate_year="2021" departDate_month="9" departDate_day="15">
  //       <auro-datepicker-calendar></auro-datepicker-calendar>
  //     </div>
  //   `);

  // fetchMock.mock('begin:https://flightsearch-lembff.w2.ecomm-test-aks.alaskaair.com/calendar/sea/alw/', [
  //   {
  //     "S": [
  //       {
  //         "S": [],
  //         "N": "Everett, WA (PAE-Paine Field)",
  //         "C": "PAE"
  //       },
  //       {
  //         "S": [],
  //         "N": "Seattle, WA (SEA-Seattle/Tacoma Intl.)",
  //         "C": "SEA"
  //       }
  //     ],
  //     "N": "Seattle Area (All Airports)",
  //     "C": "SA2"
  //   }
  // ]);

  //   const months = this.shadowRoot.querySelectorAll('auro-datepicker-month');
  //   expect(months.length).to.equal(AMOUNT_MONTHS_SHOWN);


  //   // const weeks = month.shadowRoot.querySelectorAll('auro-datepicker-week');




  //   // find the first Day that isn't disabled or hidden
  // });



  // pressing forward and back buttons changes the index
  
  // pressing Tab button on forward button will .focus() on currently displayed month's first


  // it('if auro-datepicker-calendar\'s parent element doesn\'t have a depart date, set ADC\'s depart date to today\'s date', async () => {
  //   const el = await fixture(html`
  //     <div>
  //       <auro-datepicker-calendar ></auro-datepicker-calendar>
  //     </div>
  //   `);

  //   const date = new Date();

  //   const target = el.querySelector('auro-datepicker-calendar');

  //   console.log("target", target)

  //   expect(parseInt(target.getAttribute('departDate_year'))).to.equal(date.getFullYear());
  //   expect(parseInt(target.getAttribute('departDate_month'))).to.equal(date.getMonth() + 1);
  //   expect(parseInt(target.getAttribute('departDate_day'))).to.equal(date.getDate());
  // });

  // it('if auro-datepicker-calendar\'s parent element does have a depart date, ADc\'s depart date matches', async () => {
  //   const el = await fixture(html`
  //     <div departDate_year="2021" departDate_month="10" departDate_day="15">
  //       <auro-datepicker-calendar ></auro-datepicker-calendar>
  //     </div>
  //   `);


  //   const target = el.querySelector('auro-datepicker-calendar');

  //   console.log("target", target)

  //   expect(parseInt(target.getAttribute('departDate_year'))).to.equal(2021);
  //   expect(parseInt(target.getAttribute('departDate_month'))).to.equal(10);
  //   expect(parseInt(target.getAttribute('departDate_day'))).to.equal(15);
  // });

  // TODO tests for return dates

  // it.only('if auro-datepicker-calendar\'s parent element does have a depart date, ADc\'s depart date matches', async () => {
  //   const el = await fixture(html`
  //     <div departDate_year="2021" departDate_month="10" departDate_day="15">
  //       <auro-datepicker-calendar ></auro-datepicker-calendar>
  //     </div>
  //   `);


  //   const target = el.querySelector('auro-datepicker-calendar');

  //   // console.log("target", target)
  //   // console.log("target.shadowRoot", target.shadowRoot)

  //   const months = target.shadowRoot.querySelectorAll('auro-datepicker-month');
  //   const month = target.shadowRoot.querySelectorAll('auro-datepicker-month')[0];

  //   console.log("months", months)
  //   console.log("month", month)
  //   console.log("month.shadowRoot", month.shadowRoot)

  //   const week = month.shadowRoot.querySelectorAll('auro-datepicker-week')[1];

  //   const day = week.shadowRoot.querySelector(["departDate_year='2021'"]["departDate_month='15'"])["departDate_day='6'"]
  //   console.log("day", day);
  //   day.click();
  //   console.log("day click()", day);


  //   expect(parseInt(target.hasAttribute('israngestart'))).to.equal(true);
  // });

});

// retrieves the targetted element in the DOM
function findTargetDay(ada, year, month, day) {
    const months = ada.shadowRoot.querySelectorAll('auro-datepicker-month');
    console.log("months", months);
    for (let h = 0; h < months.length; h++) {
      const weeks = months[h].shadowRoot.querySelectorAll('auro-datepicker-week');
      // console.log("weeks", weeks);
      for (let i = 0; i < weeks.length; i++) {
        const days = weeks[i].shadowRoot.querySelectorAll('auro-datepicker-day');
        // console.log("days", days);
        for (let j = 0; j < 7; j++) {
          // console.log(parseInt(days[j].getAttribute('year')) , year, parseInt(days[j].getAttribute('month')) , month, parseInt(days[j].getAttribute('day')) , day);
          if (
            parseInt(days[j].getAttribute('year')) === year &&
            parseInt(days[j].getAttribute('month')) === month &&
            parseInt(days[j].getAttribute('day')) === day 
            // days[j].hasAttribute('isnonexistent') === false &&
            // days[j].hasAttribute('isdisabled') === false // TO CHECK
            ) {
              return days[j].shadowRoot.querySelector('button');
          }
        }
      }
    }
  
}