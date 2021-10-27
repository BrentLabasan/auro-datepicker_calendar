// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// NOTES
// The 'readonly' attribute on the <input/> tag in auro-input.js prevents the <input> from being editable.

// ---------------------------------------------------------------------

import { LitElement, html } from "lit-element";
// import { classMap } from 'lit-html/directives/class-map.js';
// import { ifDefined } from 'lit-html/directives/if-defined.js';
import styleCss from './auro-datepicker-month-css.js';
// import AuroDatePickerWeek from './auro-datepicker-week.js';
import { DateTime } from 'luxon';
import { classMap } from 'lit-html/directives/class-map.js';


/**
 * auro-datepicker-month is comprised of auro-datepicker-week's.
 *
 * @attr {Number} month - The month numeral.
 * @attr {Number} year - The year numeral.
 * 
 * @attr {Number} departDate_year - The year of the current depart date.
 * @attr {Number} departDate_month - The month of the current depart date.
 * @attr {Number} departDate_day - The day of the current depart date.
 * @attr {Number} returnDate_year - The year of the current return date.
 * @attr {Number} returnDate_month - The month of the current return date.
 * @attr {Number} returnDate_day - The day of the current return date.
 * 
 * @attr {Boolean} isOneWay - Toggles ADA between 2 modes: 1) one way 2) round trip
 * @attr {Number} displayMonthOffset - Concerning the index of the month currently being displayed, this offset signifies the current month displayed in relation to the first month generated.
 * @attr {Object} priceData - Price data for this specific -month.
 * 
 */
export default class AuroDatePickerMonth extends LitElement {
  constructor() {
    super();


  }

  static get styles() {
    return [styleCss,];
  }


  static get properties() {
    return {
      month: { type: Number },
      year: { type: Number },

      departDate_year: {type: Number},
      departDate_month: {type: Number},
      departDate_day: {type: Number},
      returnDate_year: {type: Number},
      returnDate_month: {type: Number},
      returnDate_day: {type: Number},

      isOneWay: { type: Boolean, reflect: true },
      displayMonthOffset: { type: Number },
      priceData: { type: Object },
    };
  }

  firstUpdated() {
    // debugger;

    this.inputElement = this.renderRoot.querySelector('input');
    this.labelElement = this.shadowRoot.querySelector('label');

    if (this.error === "") {
      this.error = null;
    }

    if (this.disabled) {
      this.labelElement.classList.add('inputElement-label--disabled');
    }

    fetch(`https://flightsearch-lembff.w2.ecomm-test-aks.alaskaair.com/calendar/sea/alw/${this.year}-${this.month}`)
      .then((data) => {
        // when you add the priceData property to Week, it causes an error for some reason. .text() doesn't
        // return data.json(); // call the json method on the response to get JSON
        return data.text(); // call the json method on the response to get JSON
      })
      .then((json) => {
          // console.log("Month.js", json)

          this.priceData = json;
      })
      .catch((error) => {
        console.log('Looks like there was a problem: \n', error);
      });
  }

  render() {
    // debugger;

    // console.log(`month render() ${this.month}-${this.year}`);

    const obj = {
      month: this.month,
      year: this.year
    };

    // can delete
    // const displayMonthName = DateTime.fromObject(obj).monthLong;

    // console.log(DateTime.fromObject(obj).toString()); // 2021-06-01T00:00:00.000-07:00
    // console.log(DateTime.fromObject(obj).weekNumber);

    const {weekNumber} = DateTime.fromObject(obj);
    const firstMonday = DateTime.fromObject({ weekNumber,
      weekYear:  DateTime.fromObject(obj).weekYear });

    // const firstMonday = DateTime.fromObject({ weekNumber: DateTime.fromObject(obj).weekNumber, year: this.displayYear });

    // console.log(firstMonday.minus({ day: 1 }).toString());
    // debugger;
    const firstSunday = firstMonday.minus({ day: 1 }).toString();

    let doesFirstRowHaveDay1 = false;

    // debugger;

    for (let i = 0; i < 7; i++) {
      // console.log("meow", DateTime.fromISO(firstSunday).plus({day: i}).day);

      if (DateTime.fromISO(firstSunday).plus({day: i}).day === 1) {
        doesFirstRowHaveDay1 = true;
      }
    }
    // console.log("auro-datepicker-month.js render()");
    // debugger;

    const containerCasses = {
      // 'hidden': !this.isCalendarContainerVisible,
      'viewMode-single': this.isOneWay,
      'viewMode-double': !this.isOneWay,
      // 'alertIcon': this.error
    };

    // debugger;

    if (!this.priceData) {
      this.priceData = {"test": "test"}
    }

    return html`
        <div
          class="${classMap(containerCasses)}"
        >

          <div id="monthNameYear">
            <span>
              ${DateTime.fromObject({ month: this.month, year: this.year }).toFormat('LLLL')}
              ${DateTime.fromObject({ month: this.month, year: this.year }).year}
            </span>
          </div>

        
          <div class="dayInitials">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>
        
          ${doesFirstRowHaveDay1 ? html`<div>
            <auro-datepicker-week
              monthThatGeneratedThisWeek="${this.month}"
            
              firstDayOfWeek_year="${DateTime.fromISO(firstSunday).year}"
              firstDayOfWeek_month="${DateTime.fromISO(firstSunday).month}"
              firstDayOfWeek_day="${DateTime.fromISO(firstSunday).day}"

              departDate_year="${this.departDate_year}"
              departDate_month="${this.departDate_month}"
              departDate_day="${this.departDate_day}"
              returnDate_year="${this.returnDate_year}"
              returnDate_month="${this.returnDate_month}"
              returnDate_day="${this.returnDate_day}"
              ?isOneWay="${this.isOneWay}"
              displayMonthOffset="${this.displayMonthOffset}"

              firstDayOfWeekDateTime="${firstSunday}"
              weekIndex="0"

              priceData="${this.priceData}"
            >
            </auro-datepicker-week>
          </div>` : null}

          <div>
            <auro-datepicker-week
              monthThatGeneratedThisWeek="${this.month}"
            
              firstDayOfWeek_year="${DateTime.fromISO(firstSunday).plus({ week: 1 }).year}"
              firstDayOfWeek_month="${DateTime.fromISO(firstSunday).plus({ week: 1 }).month}"
              firstDayOfWeek_day="${DateTime.fromISO(firstSunday).plus({ week: 1 }).day}"

              departDate_year="${this.departDate_year}"
              departDate_month="${this.departDate_month}"
              departDate_day="${this.departDate_day}"
              returnDate_year="${this.returnDate_year}"
              returnDate_month="${this.returnDate_month}"
              returnDate_day="${this.returnDate_day}"
              ?isOneWay="${this.isOneWay}"
              displayMonthOffset="${this.displayMonthOffset}"
 
              firstDayOfWeekDateTime="${DateTime.fromISO(firstSunday).plus({ week: 1 })}"
              weekIndex="${doesFirstRowHaveDay1 ? 1 : 0}"

              priceData="${this.priceData}"

            >
            </auro-datepicker-week>
          </div>

          <div>
            <auro-datepicker-week
              monthThatGeneratedThisWeek="${this.month}"
            
              firstDayOfWeek_year="${DateTime.fromISO(firstSunday).plus({ week: 2 }).year}"
              firstDayOfWeek_month="${DateTime.fromISO(firstSunday).plus({ week: 2 }).month}"
              firstDayOfWeek_day="${DateTime.fromISO(firstSunday).plus({ week: 2 }).day}"

              departDate_year="${this.departDate_year}"
              departDate_month="${this.departDate_month}"
              departDate_day="${this.departDate_day}"
              returnDate_year="${this.returnDate_year}"
              returnDate_month="${this.returnDate_month}"
              returnDate_day="${this.returnDate_day}"
              ?isOneWay="${this.isOneWay}"
              displayMonthOffset="${this.displayMonthOffset}"

              firstDayOfWeekDateTime="${DateTime.fromISO(firstSunday).plus({ week: 2 })}"
              weekIndex="${doesFirstRowHaveDay1 ? 2 : 1}"

              priceData="${this.priceData}"

            >
            </auro-datepicker-week>
          </div>

          <div>
            <auro-datepicker-week
              monthThatGeneratedThisWeek="${this.month}"
              
              firstDayOfWeek_year="${DateTime.fromISO(firstSunday).plus({ week: 3 }).year}"
              firstDayOfWeek_month="${DateTime.fromISO(firstSunday).plus({ week: 3 }).month}"
              firstDayOfWeek_day="${DateTime.fromISO(firstSunday).plus({ week: 3 }).day}"

              departDate_year="${this.departDate_year}"
              departDate_month="${this.departDate_month}"
              departDate_day="${this.departDate_day}"
              returnDate_year="${this.returnDate_year}"
              returnDate_month="${this.returnDate_month}"
              returnDate_day="${this.returnDate_day}"
              ?isOneWay="${this.isOneWay}"
              displayMonthOffset="${this.displayMonthOffset}"

              firstDayOfWeekDateTime="${DateTime.fromISO(firstSunday).plus({ week: 3 })}"
              weekIndex="${doesFirstRowHaveDay1 ? 3 : 2}"

              priceData="${this.priceData}"

            >
            </auro-datepicker-week>
          </div>

          <div>
            <auro-datepicker-week
              monthThatGeneratedThisWeek="${this.month}"
              
              firstDayOfWeek_year="${DateTime.fromISO(firstSunday).plus({ week: 4 }).year}"
              firstDayOfWeek_month="${DateTime.fromISO(firstSunday).plus({ week: 4 }).month}"
              firstDayOfWeek_day="${DateTime.fromISO(firstSunday).plus({ week: 4 }).day}"

              departDate_year="${this.departDate_year}"
              departDate_month="${this.departDate_month}"
              departDate_day="${this.departDate_day}"
              returnDate_year="${this.returnDate_year}"
              returnDate_month="${this.returnDate_month}"
              returnDate_day="${this.returnDate_day}"
              ?isOneWay="${this.isOneWay}"
              displayMonthOffset="${this.displayMonthOffset}"
            
              firstDayOfWeekDateTime="${DateTime.fromISO(firstSunday).plus({ week: 4 })}"
              weekIndex="${doesFirstRowHaveDay1 ? 4 : 3}"

              priceData="${this.priceData}"

            >
            </auro-datepicker-week>
          </div>

          <div>
            <auro-datepicker-week
              monthThatGeneratedThisWeek="${this.month}"
            
              firstDayOfWeek_year="${DateTime.fromISO(firstSunday).plus({ week: 5 }).year}"
              firstDayOfWeek_month="${DateTime.fromISO(firstSunday).plus({ week: 5 }).month}"
              firstDayOfWeek_day="${DateTime.fromISO(firstSunday).plus({ week: 5 }).day}"

              departDate_year="${this.departDate_year}"
              departDate_month="${this.departDate_month}"
              departDate_day="${this.departDate_day}"
              returnDate_year="${this.returnDate_year}"
              returnDate_month="${this.returnDate_month}"
              returnDate_day="${this.returnDate_day}"
              ?isOneWay="${this.isOneWay}"
              displayMonthOffset="${this.displayMonthOffset}"
            
              firstDayOfWeekDateTime="${DateTime.fromISO(firstSunday).plus({ week: 5 })}"
              weekIndex="${doesFirstRowHaveDay1 ? 5 : 4}"

              priceData="${this.priceData}"

            >
            </auro-datepicker-week>
          </div>

          
          ${!doesFirstRowHaveDay1 ? html`<div>
              <auro-datepicker-week
                monthThatGeneratedThisWeek="${this.month}"
              
                firstDayOfWeek_year="${DateTime.fromISO(firstSunday).plus({ week: 6 }).year}"
                firstDayOfWeek_month="${DateTime.fromISO(firstSunday).plus({ week: 6 }).month}"
                firstDayOfWeek_day="${DateTime.fromISO(firstSunday).plus({ week: 6 }).day}"

                departDate_year="${this.departDate_year}"
                departDate_month="${this.departDate_month}"
                departDate_day="${this.departDate_day}"
                returnDate_year="${this.returnDate_year}"
                returnDate_month="${this.returnDate_month}"
                returnDate_day="${this.returnDate_day}"
                ?isOneWay="${this.isOneWay}"
                displayMonthOffset="${this.displayMonthOffset}"
              
                firstDayOfWeekDateTime="${DateTime.fromISO(firstSunday).plus({ week: 6 })}"
                weekIndex="${doesFirstRowHaveDay1 ? 6 : 5}"

                priceData="${this.priceData}"

              >
              </auro-datepicker-week>
            </div>` : null}


          ${!doesFirstRowHaveDay1 ? html`<div>
            <auro-datepicker-week
              monthThatGeneratedThisWeek="${this.month}"
              
              firstDayOfWeek_year="${DateTime.fromISO(firstSunday).plus({ week: 7 }).year}"
              firstDayOfWeek_month="${DateTime.fromISO(firstSunday).plus({ week: 7 }).month}"
              firstDayOfWeek_day="${DateTime.fromISO(firstSunday).plus({ week: 7 }).day}"

              departDate_year="${this.departDate_year}"
              departDate_month="${this.departDate_month}"
              departDate_day="${this.departDate_day}"
              returnDate_year="${this.returnDate_year}"
              returnDate_month="${this.returnDate_month}"
              returnDate_day="${this.returnDate_day}"
              ?isOneWay="${this.isOneWay}"
              displayMonthOffset="${this.displayMonthOffset}"

              firstDayOfWeekDateTime="${DateTime.fromISO(firstSunday).plus({ week: 7 })}"
              weekIndex="6"

              priceData="${this.priceData}"

            >
            </auro-datepicker-week>
          </div>` : null}
        
        
        </div>
      `;
  }

}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-datepicker-month")) {
  customElements.define("auro-datepicker-month", AuroDatePickerMonth);
}
