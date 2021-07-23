// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// NOTES
// The 'readonly' attribute on the <input/> tag in auro-input.js prevents the <input> from being editable.
// Animation of the scrolling through months did not use .fill or any other methods, because the ones I found are unsupported in Safari.
// ---------------------------------------------------------------------

import { LitElement, html, css } from "lit-element";
// import { ifDefined } from 'lit-html/directives/if-defined.js';
import styleCss from './auro-datepicker-style-css.js';
// import AuroDatePickerWeek from './auro-datepicker-week.js';
import { DateTime } from 'luxon';
import { classMap } from 'lit-html/directives/class-map.js';
import chevronLeft from '@alaskaairux/icons/dist/icons/interface/chevron-left_es6.js';
import chevronRight from '@alaskaairux/icons/dist/icons/interface/chevron-right_es6.js';

// https://www.alaskaair.com/searchbff/shoulder/sea/ewr/29jun
// const apiData = [{"date":"2021-06-14","Price":"202.40"},{"date":"2021-06-15","Price":"202.40"},{"date":"2021-06-16","Price":"358.40"},{"date":"2021-06-17","Price":"358.40"},{"date":"2021-06-18","Price":"358.40"},{"date":"2021-06-19","Price":"358.40"},{"date":"2021-06-20","Price":"338.41"},{"date":"2021-06-21","Price":"398.40"},{"date":"2021-06-22","Price":"398.40"},{"date":"2021-06-23","Price":"466.80"},{"date":"2021-06-24","Price":"398.40"},{"date":"2021-06-25","Price":"348.40"},{"date":"2021-06-26","Price":"348.40"},{"date":"2021-06-27","Price":"298.40"},{"date":"2021-06-28","Price":"348.40"},{"date":"2021-06-29","Price":"348.40"},{"date":"2021-06-30","Price":"398.40"},{"date":"2021-07-01","Price":"348.40"},{"date":"2021-07-02","Price":"348.40"},{"date":"2021-07-03","Price":"298.40"},{"date":"2021-07-04","Price":"348.40"},{"date":"2021-07-05","Price":"348.40"},{"date":"2021-07-06","Price":"348.40"},{"date":"2021-07-07","Price":"298.40"},{"date":"2021-07-08","Price":"198.40"},{"date":"2021-07-09","Price":"198.40"},{"date":"2021-07-10","Price":"348.40"},{"date":"2021-07-11","Price":"198.40"},{"date":"2021-07-12","Price":"198.40"},{"date":"2021-07-13","Price":"198.40"},{"date":"2021-07-14","Price":"198.40"}];
// const apiDataObject = {};
// apiData.forEach(object => {
//   apiDataObject[object.date] = object.Price;
// });
// console.log("apiDataObject", apiDataObject);

const animationSlidingDuration = 400; // milliseconds
// build the component class
export default class AuroDatePickerCalendar extends LitElement {
  constructor() {
    super();

            /**
     * @private Value is SVG for use
     */
             this.chevronLeft = this.getIconAsHtml(chevronLeft);

             /**
              * @private Value is SVG for use
              */
             this.chevronRight = this.getIconAsHtml(chevronRight);

    this.isSelectionModeFromDate = true;
    this.isViewSingleMode = this.hasAttribute('isViewSingleMode');


    this.displayMonthOffset = 0;
  }

      /**
   * @private Parse imported SVG object data to string for HTML use
   * @param {string} icon HTML string for requested icon.
   * @returns {object} Appended HTML for SVG.
   */
       getIconAsHtml(icon) {
        const dom = new DOMParser().parseFromString(icon.svg, 'text/html');
    
        return dom.body.firstChild;
      }

  static get styles() {
    return [
      styleCss,
    ];
  }

  static get properties() {
    return {



      displayMonthOffset: { type: Number },

      displayMonth: { type: Number, reflect: true },
      displayYear: { type: Number, reflect: true },

      selectedDepartureDateTime: { type: DateTime, reflect: true },
      selectedArrivalDateTime: { type: DateTime, reflect: true },

      departDate_month: {type: Number},
      departDate_day: {type: Number},
      departDate_year: {type: Number},
      returnDate_month: {type: Number},
      returnDate_day: {type: Number},
      returnDate_year: {type: Number},

      isSelectionModeFromDate: { type: Boolean },
      isViewSingleMode: { type: Boolean, reflect: true },

      isDisabled: { type: Boolean },

    };
  }

  firstUpdated() {
    // if both a month and year aren't provided for the starting date for auro-datepicker,
    // use the user's current date's month and year
    if (!this.displayMonth && !this.displayYear) {
      // debugger;
      const dt = DateTime.now();
      this.selectedDepartureDateTime = dt;
      this.selectedArrivalDateTime = dt.plus({ month: 1 });

      this.displayMonth = dt.month;
      console.log("displayMonth", this.displayMonth);
      this.displayYear = dt.year;

      this.departDate_year = dt.year;
      this.departDate_month = dt.month;
      this.departDate_day = dt.day;

      this.returnDate_year = dt.year;
      this.returnDate_month = dt.month;
      this.returnDate_day = dt.day;

      // debugger;
    }
    // debugger;
    // console.log("iii")
    // console.log(this.displayMonth)
    // console.log(this.displayYear)

    this.addEventListener('dayClicked', (data) => {
      // alert(data);
      console.log(data.detail);

      function genLuxonObj(year, month, day) {
        return {
          year: year,
          month: month,
          day: day,
        }
      }
      
      function comesBefore(a, b) {
        return DateTime.fromISO(a) < DateTime.fromISO(b);
      }
      
      function comesAfter(a, b) {
        return DateTime.fromISO(a) > DateTime.fromISO(b);
      }

      // function datesAreSame(pending, current) {
      //   console.log("datesAreSame()", DateTime.fromISO(pending), DateTime.fromISO(current));
      //   return DateTime.fromISO(pending) === DateTime.fromISO(current);
      // }


      // this is currently for double mode
      if (this.isSelectionModeFromDate) {
        this.selectedDepartureDateTime = data.detail.dateTime;

        const pendingRangeStart = DateTime.fromObject(genLuxonObj(data.detail.year, data.detail.month, data.detail.day));
        const currentRangeEnd = DateTime.fromObject(genLuxonObj(this.returnDate_year, this.returnDate_month, this.returnDate_day));
        
        // debugger;
        
        // BOOKMARK
        if ( currentRangeEnd && comesAfter(pendingRangeStart, currentRangeEnd) ) { // pending departure date selection comes after the current arival date
          alert("pending start date CAN NOT be after current end date");
        }

        // debugger;

        this.departDate_year = data.detail.year;
        this.departDate_month = data.detail.month;
        this.departDate_day = data.detail.day;


        // todo rainy day, I totally messed up what I was trying to do. this is rainy day code
        // 1 month added b/c of 0 based indexing
        // this.displayMonth = DateTime.fromISO(data.detail.dateTime).plus({months: 1}).month;
        // this.displayYear = DateTime.fromISO(data.detail.dateTime).year;
      } else {
        this.selectedArrivalDateTime = data.detail.dateTime;

        const pendingRangeEnd = DateTime.fromObject(genLuxonObj(data.detail.year, data.detail.month, data.detail.day));
        const currentRangeStart = DateTime.fromObject(genLuxonObj(this.departDate_year, this.departDate_month, this.departDate_day));

        if ( currentRangeStart && comesBefore(pendingRangeEnd, currentRangeStart) ) { // pending departure date selection comes after the current arival date
          alert("pending end date CAN NOT be before current begin date");
        }

        // if ( 1 === true ) { // pending departure date selection comes after the current arival date
        //   return false;
        // }

        this.returnDate_year = data.detail.year;
        this.returnDate_month = data.detail.month;
        this.returnDate_day = data.detail.day;
      }

      this.isSelectionModeFromDate = !this.isSelectionModeFromDate;
    });


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

  generateCalendars() {
    const templates = [];

    for (let i = 0; i < 12; i++) {
      templates.push(html`
        <auro-datepicker-month
        offset="${i}"
        departDate_year="${this.departDate_year}"
        departDate_month="${this.departDate_month}"
        departDate_day="${this.departDate_day}"
        returnDate_year="${this.returnDate_year}"
        returnDate_month="${this.returnDate_month}"
        returnDate_day="${this.returnDate_day}"

        displayMonth="${DateTime.fromObject({ month: this.displayMonth, year: this.displayYear }).plus({ month: i }).toFormat('MM')}"
        displayYear="${DateTime.fromObject({ month: this.displayMonth, year: this.displayYear }).plus({ month: i }).year}">
      </auro-datepicker-month>

      <!-- vertical grey line between months -->
      <!-- <span id="containerVerticalLine">
        <svg height="210" width="1">
          <line x1="0" y1="0" x2="0" y2="200" style="stroke: lightgrey;stroke-width:1" shape-rendering="crispEdges"  />
          Sorry, your browser does not support inline SVG.
        </svg>
      </span> -->
      
      `);
    }

    return templates;
  }

  handlePrevMonthClick() {
    // console.log('handlePrevMonthClick');

    if (this.displayMonthOffset === 0) {
      alert("Not allowed to show months that are before the current month.");
      return;
    }
    var keyframes = { transform: [ `translateX(${-375 * this.displayMonthOffset}px)`, `translateX(${-375 * (this.displayMonthOffset - 1)}px)` ] };
    this.displayMonthOffset--;

    this.shadowRoot.querySelector('#containerScrolling').animate(keyframes, {
      duration: animationSlidingDuration, //milliseconds
      iterations: 1, //or a number
      fill: 'forwards' //'backwards', 'both', 'none', 'auto'
    });

    this.dispatchEvent(new CustomEvent('btnPrevMonthClicked', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));
  }
  
  handleNextMonthClick() {
      console.log('handleNextMonthClick');

      if (this.displayMonthOffset === 12) {
        alert("Not allowed to show months that are 12 months after the current month.");
        return;
      }

      var keyframes = { transform: [ `translateX(${-375 * this.displayMonthOffset}px)`, `translateX(${-375 * (this.displayMonthOffset + 1)}px)` ] };
      this.displayMonthOffset++;

      this.shadowRoot.querySelector('#containerScrolling').animate(keyframes, {
        duration: animationSlidingDuration, //milliseconds
        iterations: 1, //or a number
        fill: 'forwards' //'backwards', 'both', 'none', 'auto'
      });

    this.dispatchEvent(new CustomEvent('btnNextMonthClicked', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));
  }

  render() {
    // this.isViewSingleMode = false;
    // console.log(this.getAttribute('id'));
        // this.isViewSingleMode = true;
        // this.isViewSingleMode = false;
        // console.log(this.isViewSingleMode);




    const calendarsContainerClasses = {
      // will ultimately be the functionality of the auro-dropdown

      // this functionality is for auro-datepicker specifically
      'viewMode-single': this.isViewSingleMode,
      'viewMode-double': !this.isViewSingleMode,
    };

    const btnPrevMonthClasses = {
      // hidden: this.hasAttribute('isSecondCalendar')
    }
    
    const btnNextMonthClasses = {
      // hidden: this.hasAttribute('isFirstCalendar')
    }

    const obj = {
      month: this.displayMonth,
      year: this.displayYear
    }

// debugger;
    return html`
        <div>

        
          <div
            id="calendarContainer"
            class="${classMap(calendarsContainerClasses)}"
          >

            <div id="monthNameAndArrows">
              <button 
                class="${classMap(btnPrevMonthClasses)}"
                id="btn-prevMonth" 
                @click="${this.handlePrevMonthClick}"
              >
                ${this.chevronLeft}
              </button>

              <span>
                <span id="displayMonthName">${DateTime.fromObject(obj).plus({month: this.displayMonthOffset }).monthLong}</span>
                <span id="displayMonthYear">${DateTime.fromObject(obj).plus({month: this.displayMonthOffset }).year}</span>
              </span>

              <span>
                <span id="displayMonthPlusOneName">${DateTime.fromObject(obj).plus({month: this.displayMonthOffset + 1 }).monthLong}</span>
                <span id="displayMonthPlusOneYear">${DateTime.fromObject(obj).plus({month: this.displayMonthOffset + 1 }).year}</span>
              </span>
              
              <button
                class="${classMap(btnNextMonthClasses)}"
                id="btn-nextMonth" 
                @click="${this.handleNextMonthClick}"
              >
                ${this.chevronRight}
              </button>
            </div>

            <div id="containerScrolling">
              ${this.generateCalendars()}
            </div>

          </div> 
 
        </div>
      `;
  }



}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-datepicker_calendar")) {
  customElements.define("auro-datepicker_calendar", AuroDatePickerCalendar);
}
