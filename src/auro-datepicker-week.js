// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// NOTES
// The 'readonly' attribute on the <input/> tag in auro-input.js prevents the <input> from being editable.

// ---------------------------------------------------------------------

import { LitElement, html, css } from "lit-element";
// import { classMap } from 'lit-html/directives/class-map.js';
// import { ifDefined } from 'lit-html/directives/if-defined.js';
import styleCss from './auro-datepicker-week-style-css.js';
// import AuroDatePickerDay from './auro-datepicker-day.js';
import { DateTime } from 'luxon';

// build the component class
export default class AuroDatePickerWeek extends LitElement {
  constructor() {
    super();

  }

  static get styles() {
    return [
      styleCss,
    ];
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      firstDaysNumber: { type: Number },
      firstDayOfWeekDateTime: { type: DateTime },

      firstDayOfWeek_year: { type: Number },
      firstDayOfWeek_month: { type: Number },
      firstDayOfWeek_day: { type: Number },

      departDate_month: {type: Number},
      departDate_day: {type: Number},
      departDate_year: {type: Number},
      returnDate_month: {type: Number},
      returnDate_day: {type: Number},
      returnDate_year: {type: Number},

      displayMonth: { type: Number },

    };
  }

  firstUpdated() {
    this.inputElement = this.renderRoot.querySelector('input');
    this.labelElement = this.shadowRoot.querySelector('label');

    if (this.error === "") {
      this.error = null;
    }

    if (this.disabled) {
      this.labelElement.classList.add('inputElement-label--disabled')
    }
  }



  render() {


      const dateDigitsObject = {
        year: this.firstDayOfWeek_year,
        month: this.firstDayOfWeek_month,
        day: this.firstDayOfWeek_day
      }

      const firstSunday = DateTime.fromObject(dateDigitsObject);

      // const classes = {
      //   'hidden': !this.isCalendarContainerVisible,
      //   'viewMode-single': this.isViewSingleMode,
      //   'viewMode-double': !this.isViewSingleMode,
      //   // 'alertIcon': this.error
      // };
      
const isoRangeStart = DateTime.fromObject({year: this.departDate_year, month: this.departDate_month, day: this.departDate_day }).toISO();
const isoRangeEnd = DateTime.fromObject({year: this.returnDate_year, month: this.returnDate_month, day: this.returnDate_day }).toISO();


// debugger;
      return html`
        <div class="wrapper">

          <auro-datepicker-day
  displayMonth="${this.displayMonth}"
          
          ?isInRange="${
DateTime.fromObject({year: this.departDate_year, month: this.departDate_month, day: this.departDate_day }).toISO()


          }"


?isRangeStart="${ firstSunday.plus({ days: 0 }).toISO() === isoRangeStart }"
?isRangeEnd="${ firstSunday.plus({ days: 0 }).toISO() === isoRangeEnd }"
?isWithinRange="${ firstSunday.plus({ days: 0 }).toISO() >= isoRangeStart && firstSunday.plus({ days: 0 }).toISO() <= isoRangeEnd }"


          year="${firstSunday.plus({ days: 0 }).year}"
            month="${firstSunday.plus({ days: 0 }).month}"
            day="${firstSunday.plus({ days: 0 }).day}"

            dateTime="${DateTime.fromISO(this.firstDayOfWeekDateTime).plus({ days: 0 })}" 
            
            id="iso${firstSunday.plus({ days: 0 }).year}${firstSunday.plus({ days: 0 }).toFormat('MM')}${firstSunday.plus({ days: 0 }).toFormat('dd')}"

          >
          </auro-datepicker-day>

          <auro-datepicker-day
  displayMonth="${this.displayMonth}"
          
          ?isRangeStart="${ firstSunday.plus({ days: 1 }).toISO() === isoRangeStart }"
?isRangeEnd="${ firstSunday.plus({ days: 1 }).toISO() === isoRangeEnd }"
?isWithinRange="${ firstSunday.plus({ days: 1 }).toISO() >= isoRangeStart && firstSunday.plus({ days: 1 }).toISO() <= isoRangeEnd }"


            year="${firstSunday.plus({ days: 1 }).year}"
            month="${firstSunday.plus({ days: 1 }).month}"
            day="${firstSunday.plus({ days: 1 }).day}"

            dateTime="${DateTime.fromISO(this.firstDayOfWeekDateTime).plus({ days: 1 })}" 
            
            id="iso${firstSunday.plus({ days: 1 }).year}${firstSunday.plus({ days: 1 }).toFormat('MM')}${firstSunday.plus({ days: 1 }).toFormat('dd')}"


          >
          </auro-datepicker-day>
          
          <auro-datepicker-day
  displayMonth="${this.displayMonth}"

          ?isRangeStart="${ firstSunday.plus({ days: 2 }).toISO() === isoRangeStart }"
?isRangeEnd="${ firstSunday.plus({ days: 2 }).toISO() === isoRangeEnd }"
?isWithinRange="${ firstSunday.plus({ days: 2 }).toISO() >= isoRangeStart && firstSunday.plus({ days: 2 }).toISO() <= isoRangeEnd }"

            year="${firstSunday.plus({ days: 2 }).year}"
            month="${firstSunday.plus({ days: 2 }).month}"
            day="${firstSunday.plus({ days: 2 }).day}"

            dateTime="${DateTime.fromISO(this.firstDayOfWeekDateTime).plus({ days: 2 })}" 
            
            
            id="iso${firstSunday.plus({ days: 2 }).year}${firstSunday.plus({ days: 2 }).toFormat('MM')}${firstSunday.plus({ days: 2 }).toFormat('dd')}"

          >
          </auro-datepicker-day>

          <auro-datepicker-day
  displayMonth="${this.displayMonth}"

          ?isRangeStart="${ firstSunday.plus({ days: 3 }).toISO() === isoRangeStart }"
?isRangeEnd="${ firstSunday.plus({ days: 3 }).toISO() === isoRangeEnd }"
?isWithinRange="${ firstSunday.plus({ days: 3 }).toISO() >= isoRangeStart && firstSunday.plus({ days: 3 }).toISO() <= isoRangeEnd }"

            year="${firstSunday.plus({ days: 3 }).year}"
            month="${firstSunday.plus({ days: 3 }).month}"
            day="${firstSunday.plus({ days: 3 }).day}"

            dateTime="${DateTime.fromISO(this.firstDayOfWeekDateTime).plus({ days: 3 })}" 
            
            id="iso${firstSunday.plus({ days: 3 }).year}${firstSunday.plus({ days: 3 }).toFormat('MM')}${firstSunday.plus({ days: 3 }).toFormat('dd')}"

            
          >
          </auro-datepicker-day>

          <auro-datepicker-day
  displayMonth="${this.displayMonth}"

          ?isRangeStart="${ firstSunday.plus({ days: 4 }).toISO() === isoRangeStart }"
?isRangeEnd="${ firstSunday.plus({ days: 4 }).toISO() === isoRangeEnd }"
?isWithinRange="${ firstSunday.plus({ days: 4 }).toISO() >= isoRangeStart && firstSunday.plus({ days: 4 }).toISO() <= isoRangeEnd }"

            year="${firstSunday.plus({ days: 4 }).year}"
            month="${firstSunday.plus({ days: 4 }).month}"
            day="${firstSunday.plus({ days: 4 }).day}"

            dateTime="${DateTime.fromISO(this.firstDayOfWeekDateTime).plus({ days: 4 })}" 
            
            id="iso${firstSunday.plus({ days: 4 }).year}${firstSunday.plus({ days: 4 }).toFormat('MM')}${firstSunday.plus({ days: 4 }).toFormat('dd')}"

            
          >
          </auro-datepicker-day>

          <auro-datepicker-day
  displayMonth="${this.displayMonth}"

          ?isRangeStart="${ firstSunday.plus({ days: 5 }).toISO() === isoRangeStart }"
?isRangeEnd="${ firstSunday.plus({ days: 5 }).toISO() === isoRangeEnd }"
?isWithinRange="${ firstSunday.plus({ days: 5 }).toISO() >= isoRangeStart && firstSunday.plus({ days: 5 }).toISO() <= isoRangeEnd }"

            year="${firstSunday.plus({ days: 5 }).year}"
            month="${firstSunday.plus({ days: 5 }).month}"
            day="${firstSunday.plus({ days: 5 }).day}"

            dateTime="${DateTime.fromISO(this.firstDayOfWeekDateTime).plus({ days: 5 })}" 
            
            id="iso${firstSunday.plus({ days: 5 }).year}${firstSunday.plus({ days: 5 }).toFormat('MM')}${firstSunday.plus({ days: 5 }).toFormat('dd')}"

            
          >
          </auro-datepicker-day>

          <auro-datepicker-day
  displayMonth="${this.displayMonth}"

          ?isRangeStart="${ firstSunday.plus({ days: 6 }).toISO() === isoRangeStart }"
?isRangeEnd="${ firstSunday.plus({ days: 6 }).toISO() === isoRangeEnd }"
?isWithinRange="${ firstSunday.plus({ days: 6 }).toISO() >= isoRangeStart && firstSunday.plus({ days: 6 }).toISO() <= isoRangeEnd }"

            year="${firstSunday.plus({ days: 6 }).year}"
            month="${firstSunday.plus({ days: 6 }).month}"
            day="${firstSunday.plus({ days: 6 }).day}"

            dateTime="${DateTime.fromISO(this.firstDayOfWeekDateTime).plus({ days: 6 })}" 
            
            id="iso${firstSunday.plus({ days: 6 }).year}${firstSunday.plus({ days: 6 }).toFormat('MM')}${firstSunday.plus({ days: 6 }).toFormat('dd')}"

            
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
