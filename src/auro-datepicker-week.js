// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// NOTES
// The 'readonly' attribute on the <input/> tag in auro-input.js prevents the <input> from being editable.

// ---------------------------------------------------------------------

import { LitElement, html } from "lit-element";
// import { classMap } from 'lit-html/directives/class-map.js';
// import { ifDefined } from 'lit-html/directives/if-defined.js';
import styleCss from './auro-datepicker-week-style-css.js';
// import AuroDatePickerDay from './auro-datepicker-day.js';
import { DateTime } from 'luxon';

/**
 * auro-datepicker-week is comprised of exactly 7 auro-datepicker-day's.
 * in the form of input fields
 *
 * @attr {Number} firstDayOfWeekDateTime - For the first -day in the -week, its Luxon DateTime.
 * 
 * @attr {Number} firstDayOfWeek_year - For the first -day in the -week, its year numeral.
 * @attr {Number} firstDayOfWeek_month - For the first -day in the -week, its month numeral.
 * @attr {Number} firstDayOfWeek_day - For the first -day in the -week, its day numeral.
 * 
 * @attr {Number} departDate_year - The year of the current depart date.
 * @attr {Number} departDate_month - The month of the current depart date.
 * @attr {Number} departDate_day - The day of the current depart date.
 * @attr {Number} returnDate_year - The year of the current return date.
 * @attr {Number} returnDate_month - The month of the current return date.
 * @attr {Number} returnDate_day - The day of the current return date.
 * 
 * @attr {Number} monthThatGeneratedThisWeek - TODO.
 * @attr {Number} displayMonthOffset - Concerning the index of the month currently being displayed, this offset signifies the current month displayed in relation to the first month generated.
 * @attr {Boolean} isOneWay - Toggles ADA between 2 modes: 1) one way 2) round trip
 * @attr {Number} weekIndex - Index of this week in its parent -month.
 * @attr {String} priceData - TODO .
 * 
 */
export default class AuroDatePickerWeek extends LitElement {
  constructor() {
    super();

  }

  static get styles() {
    return [styleCss,];
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      firstDayOfWeekDateTime: { type: DateTime },

      firstDayOfWeek_year: { type: Number },
      firstDayOfWeek_month: { type: Number },
      firstDayOfWeek_day: { type: Number },

      departDate_year: {type: Number},
      departDate_month: {type: Number},
      departDate_day: {type: Number},
      returnDate_year: {type: Number},
      returnDate_month: {type: Number},
      returnDate_day: {type: Number},

      monthThatGeneratedThisWeek: { type: Number },
      displayMonthOffset: { type: Number },
      isOneWay: { type: Boolean, reflect: true },
      weekIndex: { type: Number },
      priceData: { type: String },
    };
  }

  firstUpdated() {
    this.inputElement = this.renderRoot.querySelector('input');
    this.labelElement = this.shadowRoot.querySelector('label');

    if (this.error === "") {
      this.error = null;
    }

    if (this.disabled) {
      this.labelElement.classList.add('inputElement-label--disabled');
    }
  }


  render() {
    // console.log(`week render() ${this.firstDayOfWeek_month}-${this.firstDayOfWeek_day}`);

    // debugger;
    const dateDigitsObject = {
      year: this.firstDayOfWeek_year,
      month: this.firstDayOfWeek_month,
      day: this.firstDayOfWeek_day
    };

    const firstSunday = DateTime.fromObject(dateDigitsObject);

    // console.log("firstDayOfWeekDateTime", firstDayOfWeekDateTime);

    const isoRangeStart = DateTime.fromObject({year: this.departDate_year, month: this.departDate_month, day: this.departDate_day }).toISO();
    
    let isoRangeEnd;
    if (!this.isOneWay) {
      isoRangeEnd = DateTime.fromObject({year: this.returnDate_year, month: this.returnDate_month, day: this.returnDate_day }).toISO();
    }

    // debugger;

    // console.log("Week.js", this.priceData)

    return html`
        <div class="wrapper">

        <!-- bookmark: compare to monthThatGeneratedThisDay, and if false, generate blank div-->
          <auro-datepicker-day
            ?isOneWay="${this.isOneWay}"
            displayMonthOffset="${this.displayMonthOffset}"
          
            ?isRangeStart="${firstSunday.plus({ days: 0 }).toISO() === isoRangeStart}"
            ?isRangeEnd="${firstSunday.plus({ days: 0 }).toISO() === isoRangeEnd}"
            ?isWithinRange="${firstSunday.plus({ days: 0 }).toISO() >= isoRangeStart && firstSunday.plus({ days: 0 }).toISO() <= isoRangeEnd}"

            year="${firstSunday.plus({ days: 0 }).year}"
            month="${firstSunday.plus({ days: 0 }).month}"
            day="${firstSunday.plus({ days: 0 }).day}"

            dateTime="${DateTime.fromISO(this.firstDayOfWeekDateTime).plus({ days: 0 })}" 
            
            id="iso${firstSunday.plus({ days: 0 }).year}${firstSunday.plus({ days: 0 }).toFormat('MM')}${firstSunday.plus({ days: 0 }).toFormat('dd')}"

            weekIndex="${this.weekIndex}"
            dayIndex="0"

            monthThatGeneratedThisDay="${this.monthThatGeneratedThisWeek}"

            priceData="${this.priceData}"

            ?isNonexistent="${firstSunday.plus({ days: 0 }).month !== this.monthThatGeneratedThisWeek}"
          >
          </auro-datepicker-day>

          <auro-datepicker-day
            ?isOneWay="${this.isOneWay}"
            displayMonthOffset="${this.displayMonthOffset}"
          
            ?isRangeStart="${firstSunday.plus({ days: 1 }).toISO() === isoRangeStart}"
            ?isRangeEnd="${firstSunday.plus({ days: 1 }).toISO() === isoRangeEnd}"
            ?isWithinRange="${firstSunday.plus({ days: 1 }).toISO() >= isoRangeStart && firstSunday.plus({ days: 1 }).toISO() <= isoRangeEnd}"

            year="${firstSunday.plus({ days: 1 }).year}"
            month="${firstSunday.plus({ days: 1 }).month}"
            day="${firstSunday.plus({ days: 1 }).day}"

            dateTime="${DateTime.fromISO(this.firstDayOfWeekDateTime).plus({ days: 1 })}" 
            
            id="iso${firstSunday.plus({ days: 1 }).year}${firstSunday.plus({ days: 1 }).toFormat('MM')}${firstSunday.plus({ days: 1 }).toFormat('dd')}"

            weekIndex="${this.weekIndex}"
            dayIndex="1"

            monthThatGeneratedThisDay="${this.monthThatGeneratedThisWeek}"

            priceData="${this.priceData}"

            ?isNonexistent="${firstSunday.plus({ days: 1 }).month !== this.monthThatGeneratedThisWeek}"
          >
          </auro-datepicker-day>
          
          <auro-datepicker-day
            ?isOneWay="${this.isOneWay}"
            displayMonthOffset="${this.displayMonthOffset}"

            ?isRangeStart="${firstSunday.plus({ days: 2 }).toISO() === isoRangeStart}"
            ?isRangeEnd="${firstSunday.plus({ days: 2 }).toISO() === isoRangeEnd}"
            ?isWithinRange="${firstSunday.plus({ days: 2 }).toISO() >= isoRangeStart && firstSunday.plus({ days: 2 }).toISO() <= isoRangeEnd}"

            year="${firstSunday.plus({ days: 2 }).year}"
            month="${firstSunday.plus({ days: 2 }).month}"
            day="${firstSunday.plus({ days: 2 }).day}"

            dateTime="${DateTime.fromISO(this.firstDayOfWeekDateTime).plus({ days: 2 })}" 
            
            id="iso${firstSunday.plus({ days: 2 }).year}${firstSunday.plus({ days: 2 }).toFormat('MM')}${firstSunday.plus({ days: 2 }).toFormat('dd')}"

            weekIndex="${this.weekIndex}"
            dayIndex="2"

            monthThatGeneratedThisDay="${this.monthThatGeneratedThisWeek}"

            priceData="${this.priceData}"

            ?isNonexistent="${firstSunday.plus({ days: 2 }).month !== this.monthThatGeneratedThisWeek}"
          >
          </auro-datepicker-day>

          <auro-datepicker-day
            ?isOneWay="${this.isOneWay}"
            displayMonthOffset="${this.displayMonthOffset}"

            ?isRangeStart="${firstSunday.plus({ days: 3 }).toISO() === isoRangeStart}"
            ?isRangeEnd="${firstSunday.plus({ days: 3 }).toISO() === isoRangeEnd}"
            ?isWithinRange="${firstSunday.plus({ days: 3 }).toISO() >= isoRangeStart && firstSunday.plus({ days: 3 }).toISO() <= isoRangeEnd}"

            year="${firstSunday.plus({ days: 3 }).year}"
            month="${firstSunday.plus({ days: 3 }).month}"
            day="${firstSunday.plus({ days: 3 }).day}"

            dateTime="${DateTime.fromISO(this.firstDayOfWeekDateTime).plus({ days: 3 })}" 
            
            id="iso${firstSunday.plus({ days: 3 }).year}${firstSunday.plus({ days: 3 }).toFormat('MM')}${firstSunday.plus({ days: 3 }).toFormat('dd')}"

            weekIndex="${this.weekIndex}"
            dayIndex="3"

            monthThatGeneratedThisDay="${this.monthThatGeneratedThisWeek}"

            priceData="${this.priceData}"

            ?isNonexistent="${firstSunday.plus({ days: 3 }).month !== this.monthThatGeneratedThisWeek}"
          >
          </auro-datepicker-day>

          <auro-datepicker-day
            ?isOneWay="${this.isOneWay}"
            displayMonthOffset="${this.displayMonthOffset}"

            ?isRangeStart="${firstSunday.plus({ days: 4 }).toISO() === isoRangeStart}"
            ?isRangeEnd="${firstSunday.plus({ days: 4 }).toISO() === isoRangeEnd}"
            ?isWithinRange="${firstSunday.plus({ days: 4 }).toISO() >= isoRangeStart && firstSunday.plus({ days: 4 }).toISO() <= isoRangeEnd}"

            year="${firstSunday.plus({ days: 4 }).year}"
            month="${firstSunday.plus({ days: 4 }).month}"
            day="${firstSunday.plus({ days: 4 }).day}"

            dateTime="${DateTime.fromISO(this.firstDayOfWeekDateTime).plus({ days: 4 })}" 
            
            id="iso${firstSunday.plus({ days: 4 }).year}${firstSunday.plus({ days: 4 }).toFormat('MM')}${firstSunday.plus({ days: 4 }).toFormat('dd')}"

            weekIndex="${this.weekIndex}"
            dayIndex="4"

            monthThatGeneratedThisDay="${this.monthThatGeneratedThisWeek}"

            priceData="${this.priceData}"

            ?isNonexistent="${firstSunday.plus({ days: 4 }).month !== this.monthThatGeneratedThisWeek}"
          >
          </auro-datepicker-day>

          <auro-datepicker-day
            ?isOneWay="${this.isOneWay}"
            displayMonthOffset="${this.displayMonthOffset}"

            ?isRangeStart="${firstSunday.plus({ days: 5 }).toISO() === isoRangeStart}"
            ?isRangeEnd="${firstSunday.plus({ days: 5 }).toISO() === isoRangeEnd}"
            ?isWithinRange="${firstSunday.plus({ days: 5 }).toISO() >= isoRangeStart && firstSunday.plus({ days: 5 }).toISO() <= isoRangeEnd}"

            year="${firstSunday.plus({ days: 5 }).year}"
            month="${firstSunday.plus({ days: 5 }).month}"
            day="${firstSunday.plus({ days: 5 }).day}"

            dateTime="${DateTime.fromISO(this.firstDayOfWeekDateTime).plus({ days: 5 })}" 
            
            id="iso${firstSunday.plus({ days: 5 }).year}${firstSunday.plus({ days: 5 }).toFormat('MM')}${firstSunday.plus({ days: 5 }).toFormat('dd')}"
            
            weekIndex="${this.weekIndex}"
            dayIndex="5"

            monthThatGeneratedThisDay="${this.monthThatGeneratedThisWeek}"

            priceData="${this.priceData}"

            ?isNonexistent="${firstSunday.plus({ days: 5 }).month !== this.monthThatGeneratedThisWeek}"
          >
          </auro-datepicker-day>

          <auro-datepicker-day
            ?isOneWay="${this.isOneWay}"
            displayMonthOffset="${this.displayMonthOffset}"

            ?isRangeStart="${firstSunday.plus({ days: 6 }).toISO() === isoRangeStart}"
            ?isRangeEnd="${firstSunday.plus({ days: 6 }).toISO() === isoRangeEnd}"
            ?isWithinRange="${firstSunday.plus({ days: 6 }).toISO() >= isoRangeStart && firstSunday.plus({ days: 6 }).toISO() <= isoRangeEnd}"

            year="${firstSunday.plus({ days: 6 }).year}"
            month="${firstSunday.plus({ days: 6 }).month}"
            day="${firstSunday.plus({ days: 6 }).day}"

            dateTime="${DateTime.fromISO(this.firstDayOfWeekDateTime).plus({ days: 6 })}" 
            
            id="iso${firstSunday.plus({ days: 6 }).year}${firstSunday.plus({ days: 6 }).toFormat('MM')}${firstSunday.plus({ days: 6 }).toFormat('dd')}"
            
            weekIndex="${this.weekIndex}"
            dayIndex="6"

            monthThatGeneratedThisDay="${this.monthThatGeneratedThisWeek}"

            priceData="${this.priceData}"

            ?isNonexistent="${firstSunday.plus({ days: 6 }).month !== this.monthThatGeneratedThisWeek}"
          >
          </auro-datepicker-day>

 
        </div>
      `;
  }

}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-datepicker-week")) {
  customElements.define("auro-datepicker-week", AuroDatePickerWeek);
}
