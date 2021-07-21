// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// NOTES
// The 'readonly' attribute on the <input/> tag in auro-input.js prevents the <input> from being editable.

// ---------------------------------------------------------------------

import { LitElement, html, css } from "lit-element";
// import { classMap } from 'lit-html/directives/class-map.js';
// import { ifDefined } from 'lit-html/directives/if-defined.js';
import styleCss from './auro-datepicker-month-css.js';
// import AuroDatePickerWeek from './auro-datepicker-week.js';
import { DateTime } from 'luxon';
import { classMap } from 'lit-html/directives/class-map.js';


// build the component class
export default class AuroDatePickerMonth extends LitElement {
  constructor() {
    super();


  }

  static get styles() {
    return [
      styleCss,
    ];
  }
  


  static get properties() {
    return {
      // error: { type: String },
      // placement: { type: String },
      // displayText: { type: String },
      // value: { type: String, reflect: true },
      // isPopoverVisible: { type: Boolean },
      // disabled: { type: Boolean },
      // indexSelectedOption: { type: Number },
      // options: {type: Array},


      displayMonth: { type: Number },
      displayYear: { type: Number },

      departDate_month: {type: Number},
      departDate_day: {type: Number},
      departDate_year: {type: Number},
      returnDate_month: {type: Number},
      returnDate_day: {type: Number},
      returnDate_year: {type: Number},
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
      this.labelElement.classList.add('inputElement-label--disabled')
    }
  }

  renderSevenDays() {
    for (let i = 0; i < 7; i++) {
      return html`a ${i} b`;
    }
  }



  render() {
    const obj = {
      month: this.displayMonth,
      year: this.displayYear
    }

    // can delete
    // const displayMonthName = DateTime.fromObject(obj).monthLong;

    // console.log(DateTime.fromObject(obj).toString()); // 2021-06-01T00:00:00.000-07:00
    // console.log(DateTime.fromObject(obj).weekNumber);

    const weekNumber = DateTime.fromObject(obj).weekNumber;
    const firstMonday = DateTime.fromObject({ weekNumber: weekNumber, weekYear:  DateTime.fromObject(obj).weekYear });

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
  'viewMode-single': this.isViewSingleMode,
  'viewMode-double': !this.isViewSingleMode,
  // 'alertIcon': this.error
};



    return html`
        <div
          class="${classMap(containerCasses)}"
        >

        

        
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
  displayMonth="${this.displayMonth}"
            
            firstDayOfWeek_year="${DateTime.fromISO(firstSunday).year}"
            firstDayOfWeek_month="${DateTime.fromISO(firstSunday).month}"
            firstDayOfWeek_day="${DateTime.fromISO(firstSunday).day}"

            departDate_year="${this.departDate_year}"
              departDate_month="${this.departDate_month}"
              departDate_day="${this.departDate_day}"
              returnDate_year="${this.returnDate_year}"
              returnDate_month="${this.returnDate_month}"
              returnDate_day="${this.returnDate_day}"
            
            firstDayOfWeekDateTime="${firstSunday}">
            </auro-datepicker-week>
          </div>`: html`<span></span>`}

          <div>
            <auro-datepicker-week
  displayMonth="${this.displayMonth}"
            
            firstDayOfWeek_year="${DateTime.fromISO(firstSunday).plus({ week: 1 }).year}"
            firstDayOfWeek_month="${DateTime.fromISO(firstSunday).plus({ week: 1 }).month}"
            firstDayOfWeek_day="${DateTime.fromISO(firstSunday).plus({ week: 1 }).day}"

            departDate_year="${this.departDate_year}"
              departDate_month="${this.departDate_month}"
              departDate_day="${this.departDate_day}"
              returnDate_year="${this.returnDate_year}"
              returnDate_month="${this.returnDate_month}"
              returnDate_day="${this.returnDate_day}"
            
            firstDayOfWeekDateTime="${DateTime.fromISO(firstSunday).plus({ week: 1 })}">
            </auro-datepicker-week>
          </div>

          <div>
            <auro-datepicker-week
  displayMonth="${this.displayMonth}"
            
            firstDayOfWeek_year="${DateTime.fromISO(firstSunday).plus({ week: 2 }).year}"
            firstDayOfWeek_month="${DateTime.fromISO(firstSunday).plus({ week: 2 }).month}"
            firstDayOfWeek_day="${DateTime.fromISO(firstSunday).plus({ week: 2 }).day}"

            departDate_year="${this.departDate_year}"
              departDate_month="${this.departDate_month}"
              departDate_day="${this.departDate_day}"
              returnDate_year="${this.returnDate_year}"
              returnDate_month="${this.returnDate_month}"
              returnDate_day="${this.returnDate_day}"
            
            firstDayOfWeekDateTime="${DateTime.fromISO(firstSunday).plus({ week: 2 })}">
            </auro-datepicker-week>
          </div>

          <div>
            <auro-datepicker-week
  displayMonth="${this.displayMonth}"
            
            firstDayOfWeek_year="${DateTime.fromISO(firstSunday).plus({ week: 3 }).year}"
            firstDayOfWeek_month="${DateTime.fromISO(firstSunday).plus({ week: 3 }).month}"
            firstDayOfWeek_day="${DateTime.fromISO(firstSunday).plus({ week: 3 }).day}"

            departDate_year="${this.departDate_year}"
              departDate_month="${this.departDate_month}"
              departDate_day="${this.departDate_day}"
              returnDate_year="${this.returnDate_year}"
              returnDate_month="${this.returnDate_month}"
              returnDate_day="${this.returnDate_day}"
            
            firstDayOfWeekDateTime="${DateTime.fromISO(firstSunday).plus({ week: 3 })}">
            </auro-datepicker-week>
          </div>

          <div>
            <auro-datepicker-week
  displayMonth="${this.displayMonth}"
            
            firstDayOfWeek_year="${DateTime.fromISO(firstSunday).plus({ week: 4 }).year}"
            firstDayOfWeek_month="${DateTime.fromISO(firstSunday).plus({ week: 4 }).month}"
            firstDayOfWeek_day="${DateTime.fromISO(firstSunday).plus({ week: 4 }).day}"

            departDate_year="${this.departDate_year}"
              departDate_month="${this.departDate_month}"
              departDate_day="${this.departDate_day}"
              returnDate_year="${this.returnDate_year}"
              returnDate_month="${this.returnDate_month}"
              returnDate_day="${this.returnDate_day}"
            
            firstDayOfWeekDateTime="${DateTime.fromISO(firstSunday).plus({ week: 4 })}">
            </auro-datepicker-week>
          </div>

          <div>
            <auro-datepicker-week
  displayMonth="${this.displayMonth}"
            
            firstDayOfWeek_year="${DateTime.fromISO(firstSunday).plus({ week: 5 }).year}"
            firstDayOfWeek_month="${DateTime.fromISO(firstSunday).plus({ week: 5 }).month}"
            firstDayOfWeek_day="${DateTime.fromISO(firstSunday).plus({ week: 5 }).day}"

            departDate_year="${this.departDate_year}"
              departDate_month="${this.departDate_month}"
              departDate_day="${this.departDate_day}"
              returnDate_year="${this.returnDate_year}"
              returnDate_month="${this.returnDate_month}"
              returnDate_day="${this.returnDate_day}"
            
            firstDayOfWeekDateTime="${DateTime.fromISO(firstSunday).plus({ week: 5 })}">
            </auro-datepicker-week>
          </div>

          
          <div>
            <auro-datepicker-week
  displayMonth="${this.displayMonth}"
            
            firstDayOfWeek_year="${DateTime.fromISO(firstSunday).plus({ week: 6 }).year}"
            firstDayOfWeek_month="${DateTime.fromISO(firstSunday).plus({ week: 6 }).month}"
            firstDayOfWeek_day="${DateTime.fromISO(firstSunday).plus({ week: 6 }).day}"

            departDate_year="${this.departDate_year}"
              departDate_month="${this.departDate_month}"
              departDate_day="${this.departDate_day}"
              returnDate_year="${this.returnDate_year}"
              returnDate_month="${this.returnDate_month}"
              returnDate_day="${this.returnDate_day}"
            
            firstDayOfWeekDateTime="${DateTime.fromISO(firstSunday).plus({ week: 6 })}">
            </auro-datepicker-week>
          </div>


          ${ !doesFirstRowHaveDay1 ? html`<div>
            <auro-datepicker-week
  displayMonth="${this.displayMonth}"
            
            firstDayOfWeek_year="${DateTime.fromISO(firstSunday).plus({ week: 7 }).year}"
            firstDayOfWeek_month="${DateTime.fromISO(firstSunday).plus({ week: 7 }).month}"
            firstDayOfWeek_day="${DateTime.fromISO(firstSunday).plus({ week: 7 }).day}"

            departDate_year="${this.departDate_year}"
              departDate_month="${this.departDate_month}"
              departDate_day="${this.departDate_day}"
              returnDate_year="${this.returnDate_year}"
              returnDate_month="${this.returnDate_month}"
              returnDate_day="${this.returnDate_day}"
            
            firstDayOfWeekDateTime="${DateTime.fromISO(firstSunday).plus({ week: 7 })}">
            </auro-datepicker-week>
          </div>`: html`<span></span>`}
        
        
        </div>
      `;
  }

}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-datepicker-month")) {
  customElements.define("auro-datepicker-month", AuroDatePickerMonth);
}
