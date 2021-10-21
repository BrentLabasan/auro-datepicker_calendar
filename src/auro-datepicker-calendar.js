// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// NOTES
// The 'readonly' attribute on the <input/> tag in auro-input.js prevents the <input> from being editable.
// Animation of the scrolling through months did not use .fill or any other methods, because the ones I found are unsupported in Safari.
// ---------------------------------------------------------------------

import { LitElement, html } from "lit-element";
import "@alaskaairux/auro-button";
// import { ifDefined } from 'lit-html/directives/if-defined.js';
import styleCss from './auro-datepicker-style-css.js';
// import AuroDatePickerWeek from './auro-datepicker-week.js';
import { DateTime } from 'luxon';
import { classMap } from 'lit-html/directives/class-map.js';
import chevronLeft from '@alaskaairux/icons/dist/icons/interface/chevron-left_es6.js';
import chevronRight from '@alaskaairux/icons/dist/icons/interface/chevron-right_es6.js';

import { MONTH_MARGIN_RIGHT, MONTH_WIDTH } from './constants.js';

/**
 * auro-datepicker-calendar provides a graphical way for a user to specify a departure date, and also possibly a return date.querySelector.querySelector
 * It is comprised of 1 or 2 auro-datepicker-month's, which are each comprised of auro-datepicker-week's, which are comprised of auro-datepicker-day's.
 *
* @attr {Boolean} mobileLayout - Whether or not to display either the desktop or mobile layout.
 * 
 * @attr {Number} displayMonthOffset - Concerning the index of the month currently being displayed, this offset signifies the current month displayed in relation to the first month generated.
 * 
 * @attr {Number} displayMonth - The month numeral of the left-most -calendar.
 * @attr {Number} displayYear - The year numeral of the left-most -calendar.
 * 
 * @attr {Number} departDate_year - The year of the current depart date.
 * @attr {Number} departDate_month - The month of the current depart date.
 * @attr {Number} departDate_day - The day of the current depart date.
 * @attr {Number} returnDate_year - The year of the current return date.
 * @attr {Number} returnDate_month - The month of the current return date.
 * @attr {Number} returnDate_day - The day of the current return date.
 * 
 * @attr {Boolean} isSelectionDepartDate - Determines whether the next click on a -day will set the depart or return date.
 * @attr {Boolean} isOneWay - Toggles ADA between 2 modes: 1) one way 2) round trip
 * 
 * @attr {Boolean} isDisabled - TODO
 * 
 */

const animationSlidingDuration = 400; // milliseconds
// build the component class
export default class AuroDatePickerCalendar extends LitElement {
  constructor() {
    super();


    this.chevronLeft = this.getIconAsHtml(chevronLeft);
    this.chevronRight = this.getIconAsHtml(chevronRight);

    this.isSelectionDepartDate = true;

    this.mobileLayout = !this.mobileLayout ? false : true;
  }

  /**
   * @private
   * @param {string} icon HTML string for requested icon.
   * @returns {object} Appended HTML for SVG.
   */
  getIconAsHtml(icon) {
    const dom = new DOMParser().parseFromString(icon.svg, 'text/html');

    return dom.body.firstChild;
  }

  static get styles() {
    return [styleCss,];
  }

  static get properties() {
    return {
      mobileLayout: { type: Boolean },

      displayMonthOffset: { type: Number, reflect: true }, // when you press forward and backward through the months, this tracks which Month is actually being displayed in #scrollingContainer

      displayMonth: { type: Number, reflect: true },
      displayYear: { type: Number, reflect: true },

      departDate_year: {type: Number, reflect: true},
      departDate_month: {type: Number, reflect: true},
      departDate_day: {type: Number, reflect: true},
      returnDate_year: {type: Number, reflect: true},
      returnDate_month: {type: Number, reflect: true},
      returnDate_day: {type: Number, reflect: true},

      isSelectionDepartDate: { type: Boolean },
      isOneWay: { type: Boolean, reflect: true },

      isDisabled: { type: Boolean },

      numbMonthsToGenerate: { type: Number},
    };
  }

  // To handle when user presses Tab button on btnNextMonth.
  handleKeyDown_btnNextMonth(e) {
    // alert();
    // console.log(e.code);
    e.preventDefault();
    if (e.code.toLowerCase() ==='tab') {
      // BOOKMARK TODO

      let thereWasABreak = false;

      // find the ADC-month that's currently visible using the displayMonthOffset
      const month = this.shadowRoot.querySelectorAll('auro-datepicker-month')[this.displayMonthOffset];
      // find the first Day that should be focusable and focus on it
      const weeks = month.shadowRoot.querySelectorAll('auro-datepicker-week');

      for (let i = 0; i < weeks.length; i++) {
        if (thereWasABreak) {
          break;
        }
        const days = weeks[i].shadowRoot.querySelectorAll('auro-datepicker-day');

        for (let j = 0; j < days.length; j++) {
          if (
            days[j].hasAttribute('isnonexistent') === false &&
            days[j].hasAttribute('isdisabled') === false // TO CHECK
            ) {
              // debugger;
              days[j].shadowRoot.querySelector('button').focus();
              thereWasABreak = true;
              break;
            }
        }
      }

    }
  }

  firstUpdated() {
    // debugger;

    const dt = DateTime.now();
    // debugger;
    // if auro-dropdown's departDate attributes have all been set
    if (this.parentElement.getAttribute('departDate_year') && this.parentElement.getAttribute('departDate_month') && this.parentElement.getAttribute('departDate_day')) {
      this.departDate_year = this.parentElement.getAttribute('departDate_year');
      this.departDate_month = this.parentElement.getAttribute('departDate_month');
      this.departDate_day = this.parentElement.getAttribute('departDate_day');

      const dt2 = DateTime.fromObject({year: this.departDate_year, month: this.departDate_month, day: this.departDate_day}).plus({month: 1});

      if (this.parentElement.getAttribute('returnDate_year') && this.parentElement.getAttribute('returnDate_month') && this.parentElement.getAttribute('returnDate_day')) {
        this.returnDate_year = this.parentElement.getAttribute('returnDate_year');
        this.returnDate_month = this.parentElement.getAttribute('returnDate_month');
        this.returnDate_day = this.parentElement.getAttribute('returnDate_day');
      } else {
        if (!this.isOneWay) {
          this.returnDate_year = dt2.year;
          this.returnDate_month = dt2.month;
          this.returnDate_day = dt2.day;
        }

      }

      // sets what month is acutally shown when popover opens
      this.displayMonth = this.departDate_month;
      this.displayYear = this.departDate_year;
    } else { // if auro-dropdown's departDate attributes have NOT been set

      this.departDate_year = dt.year;
      this.departDate_month = dt.month;
      this.departDate_day = dt.day;

      const dt2 = DateTime.fromISO(dt).plus({month: 1});

      if (!this.isOneWay) {
        this.returnDate_year = dt2.year;
        this.returnDate_month = dt2.month;
        this.returnDate_day = dt2.day;
      }


      this.displayMonth = this.departDate_month;
      this.displayYear = this.departDate_year;
    }

    // TODO if departDate is set, then this equals month of departure minus the month of today's actual date
    this.displayMonthOffset = this.departDate_month - DateTime.now().month; // if 1, then the month after the current month is the first month displayed in UI
    // debugger;

    this.addEventListener('dayClicked', (data) => {
      // alert(data);
      console.log(data.detail);

      /**
       *
       */
      function genLuxonObj(year, month, day) {
        return {
          year,
          month,
          day,
        };
      }

      /**
       *
       */
      function comesBefore(a, b) {
        return DateTime.fromISO(a) < DateTime.fromISO(b);
      }

      /**
       *
       */
      function comesAfter(a, b) {
        return DateTime.fromISO(a) > DateTime.fromISO(b);
      }

      // function datesAreSame(pending, current) {
      //   console.log("datesAreSame()", DateTime.fromISO(pending), DateTime.fromISO(current));
      //   return DateTime.fromISO(pending) === DateTime.fromISO(current);
      // }


      // this is currently for double mode
      if (this.isSelectionDepartDate) {
        const pendingRangeStart = DateTime.fromObject(genLuxonObj(data.detail.year, data.detail.month, data.detail.day));
        const currentRangeEnd = DateTime.fromObject(genLuxonObj(this.returnDate_year, this.returnDate_month, this.returnDate_day));

        // debugger;

        // BOOKMARK
        if (currentRangeEnd && comesAfter(pendingRangeStart, currentRangeEnd)) { // pending departure date selection comes after the current arival date
          alert("pending start date CAN NOT be after current end date");

          return;
        }

        // debugger;

        this.departDate_year = data.detail.year;
        this.departDate_month = data.detail.month;
        this.departDate_day = data.detail.day;

        this.dispatchEvent(new CustomEvent('changeAttributeGlobally', {
          bubbles: true,
          cancelable: false,
          composed: true,
          detail:
          {
            departDate_year: data.detail.year,
            departDate_month: data.detail.month,
            departDate_day: data.detail.day,
          }
        }));

      } else {
        const pendingRangeEnd = DateTime.fromObject(genLuxonObj(data.detail.year, data.detail.month, data.detail.day));
        const currentRangeStart = DateTime.fromObject(genLuxonObj(this.departDate_year, this.departDate_month, this.departDate_day));

        if (currentRangeStart && comesBefore(pendingRangeEnd, currentRangeStart)) { // pending departure date selection comes after the current arival date
          alert("pending end date CAN NOT be before current begin date");
        }

        // if ( 1 === true ) { // pending departure date selection comes after the current arival date
        //   return false;
        // }

        this.returnDate_year = data.detail.year;
        this.returnDate_month = data.detail.month;
        this.returnDate_day = data.detail.day;

        this.dispatchEvent(new CustomEvent('changeAttributeGlobally', {
          bubbles: true,
          cancelable: false,
          composed: true,
          detail:
          {
            returnDate_year: data.detail.year,
            returnDate_month: data.detail.month,
            returnDate_day: data.detail.day,
          }
        }));
      }

      this.isSelectionDepartDate = !this.isSelectionDepartDate;
    });

    // goes through every Day in ADC until it finds the attempted date. If date is valid to be selected, it gets selected
    // If date is not valid, TODO
    this.addEventListener('attemptToFocusOnDay', (data) => {
      console.log(data.detail);

      const attemptedDate = data.detail.attemptedDate;

      const months = this.shadowRoot.querySelectorAll('auro-datepicker-month');
        
      let dateFound = false;
      let scrollingGonnaHappen = false;
      let bruh;
      for (let h = 0; h < months.length; h++) {
        if (dateFound) {
          break;
        }
        
        const weeks = months[h].shadowRoot.querySelectorAll('auro-datepicker-week');
        // debugger;
        for (let i = 0; i < weeks.length; i++) {
          if (dateFound) {
            break;
          }
  
          const days = weeks[i].shadowRoot.querySelectorAll('auro-datepicker-day');
    
          for (let j = 0; j < 7; j++) {
            if (
              parseInt(days[j].getAttribute('year')) === attemptedDate.year &&
              parseInt(days[j].getAttribute('month')) === attemptedDate.month &&
              parseInt(days[j].getAttribute('day')) === attemptedDate.day &&
              days[j].hasAttribute('isnonexistent') === false &&
              days[j].hasAttribute('isdisabled') === false // TO CHECK
              ) {
                bruh = days[j].shadowRoot.querySelector('button');
  
                dateFound = true;

  
                // debugger;
                // if going from end of a month to beginning of next month, scrolling container slides to left
                if (data.detail.attemptedDate.month > data.detail.prevMonthDigit) {
                  alert("scrollingGonnaHappen set to true");
                  scrollingGonnaHappen = true;
                  let kf1 = `translateX(${-1 * ( MONTH_WIDTH + MONTH_MARGIN_RIGHT ) * this.displayMonthOffset}px)`;
                  let kf2 = `translateX(${-1 * ( MONTH_WIDTH + MONTH_MARGIN_RIGHT ) * (this.displayMonthOffset + 1)}px)`;
              
                  // console.log(`${kf1} ${kf2}`);
              
                  const keyframes = { transform: [ kf1, kf2] };
              
                  // debugger;
              
                  this.displayMonthOffset++;
                  if (this.displayMonth + 1 === 13) {
                    this.displayMonth = 1;
                    this.displayYear++;
                  } else {
                    this.displayMonth++;
                  }
              
                  this.shadowRoot.querySelector('#containerScrolling').animate(keyframes, {
                    duration: animationSlidingDuration, // milliseconds
                    iterations: 1, // or a number
                    fill: 'forwards' // 'backwards', 'both', 'none', 'auto'
                  });
  
                  Promise.all(
                    this.shadowRoot.querySelector('#containerScrolling').getAnimations().map(
                      function(animation) {
                        return animation.finished
                      }
                    )
                  ).then(
                    function() {
                      // alert("animation finished");
                      // debugger;
                      console.log("bruh.focus() 1 of 3");
                      bruh.focus();
  
                    }
                  );
  
                }
  
                // if going from beginning of a month to end of prev month, scrolling container slides to right
                if (data.detail.attemptedDate.month < data.detail.prevMonthDigit) {
                  alert("scrollingGonnaHappen set to true");
                  scrollingGonnaHappen = true;
  
                  let kf1 = `translateX(${-1 * ( MONTH_WIDTH + MONTH_MARGIN_RIGHT ) * this.displayMonthOffset}px)`;
                  let kf2 = `translateX(${-1 * ( MONTH_WIDTH + MONTH_MARGIN_RIGHT ) * (this.displayMonthOffset - 1)}px)`;
              
                  // console.log(`${kf1} ${kf2}`);
              
                  const keyframes = { transform: [ kf1, kf2] };
              
                  this.displayMonthOffset--;
              
                  if (this.displayMonth - 1 === 0) {
                    this.displayMonth = 12;
                    this.displayYear--;
                  } else {
                    this.displayMonth--;
                  }
              
                  this.shadowRoot.querySelector('#containerScrolling').animate(keyframes, {
                    duration: animationSlidingDuration, // milliseconds
                    iterations: 1, // or a number
                    fill: 'forwards' // 'backwards', 'both', 'none', 'auto'
                  });
  
                  Promise.all(
                    this.shadowRoot.querySelector('#containerScrolling').getAnimations().map(
                      function(animation) {
                        return animation.finished
                      }
                    )
                  ).then(
                    function() {
                      // alert("animation finished");
                      // debugger;
                      console.log("bruh.focus() 2 of 3");
                      bruh.focus();
                    }
                  );
                }
  
                break;
            } // END eligible Day was found, so .focus() on it
          }
        }
  
      }
  
      // TODO finish explanation that the scrolling needs to stop before .focus(),
      // or else the browser will jump during the .focus(), moving the scrollingContainer
      // (I think) AND THEN the animation will fire, which results in the month
      // after the next month being displayed
      if (dateFound && !scrollingGonnaHappen) {
        // alert("entered Gus block");
        // console.log("dateFound", dateFound);
        // console.log("bruh", bruh);
        // debugger;
        console.log("bruh.focus() 1 of 3");
        bruh.focus();
      }



    });

    // BEGIN when ADC first loads, scroll the #containerScrolling to show the calendar of the month of the current date

    if (this.displayMonthOffset !== 0) {
      let kf1 = `translateX(${-1 * ( MONTH_WIDTH + MONTH_MARGIN_RIGHT ) * (this.displayMonthOffset - 1)}px)`;
      let kf2 = `translateX(${-1 * ( MONTH_WIDTH + MONTH_MARGIN_RIGHT ) * (this.displayMonthOffset)}px)`;
  
      // console.log(`${kf1} ${kf2}`);
  
      const keyframes = { transform: [ kf1, kf2] };
  
      // debugger;
  
      // very small chance I might need to keep this
      // if (this.displayMonth + 1 === 13) {
      //   this.displayMonth = 1;
      //   this.displayYear++;
      // } else {
      //   this.displayMonth++;
      // }

      this.shadowRoot.querySelector('#containerScrolling').animate(keyframes, {
        duration: animationSlidingDuration, // milliseconds
        iterations: 1, // or a number
        fill: 'forwards' // 'backwards', 'both', 'none', 'auto'
      });
  
    }
    // END when ADC first loads, scroll the #containerScrolling to show the calendar of the month of the current date


    this.inputElement = this.renderRoot.querySelector('input');
    this.labelElement = this.shadowRoot.querySelector('label');

    if (this.error === "") {
      this.error = null;
    }

    if (this.disabled) {
      this.labelElement.classList.add('inputElement-label--disabled');
    }

  }

/*   update(changedProperties) {
    super.update();
    debugger;
    // return true;
    // return !changedProperties.has('displayMonth');

    // this.calculateTabIndexForAllMonths();

    // return changedProperties.get('displayMonthOffset') === undefined;
    // return true;

    // if (changedProperties.get('displayMonthOffset') === undefined) {
    //   this.render();
    // }

    console.log("changedProperties", changedProperties);
    this.render();
  } */

  shouldUpdate(changedProperties) {
    // console.log("changedProperties", changedProperties);

        // debugger;
    // return true;
    // return !changedProperties.has('displayMonth');

    // this.calculateTabIndexForAllMonths();

    // return changedProperties.get('displayMonthOffset') === undefined;
    // return true;

    // if (changedProperties.get('displayMonthOffset') === undefined) {
    //   this.render();
    // }

    // this.render();
    // debugger;

    if (changedProperties.size === 2 && changedProperties.has('displayMonthOffset') && changedProperties.has('displayMonth')) {

      // this.setAttribute('displaymonthoffset', changedProperties.get('displayMonthOffset'));
      // this.setAttribute('displaymonth', changedProperties.get('displayMonth'));
      this.setAttribute('displaymonthoffset', this.displayMonthOffset);
      this.setAttribute('displaymonth', this.displayMonth);
      return false;
    }

    return true;
  }

  generateCalendars() {
    // console.log('calendar.js generateCalendars()');

    const templates = [];

    // DEBUGGING
    // todo bookmark
    // 1 no error
    // 2 is when error happens 1
    // 8+ is 2
    // 11+ is 3

    const dt = DateTime.now();

    // 12, for Ctrl + F purposes
    // Actually, only 11 months are generated because the API currently returns only that amount of data
    for (let i = 0; i < 12; i++) {
      // debugger;
      templates.push(html`
          
          <auro-datepicker-month

            index="${i}"


            departDate_year="${this.departDate_year}"
            departDate_month="${this.departDate_month}"
            departDate_day="${this.departDate_day}"
            returnDate_year="${this.returnDate_year}"
            returnDate_month="${this.returnDate_month}"
            returnDate_day="${this.returnDate_day}"
            isOneWay="${this.isOneWay}"

            displayMonthOffset="${this.displayMonthOffset}"

            month="${DateTime.fromObject({ month: dt.month, year: dt.year }).plus({ month: i }).toFormat('MM')}"
            year="${DateTime.fromObject({ month: dt.month, year: dt.year }).plus({ month: i }).year}"
          >
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
    console.log('handlePrevMonthClick');

    if (this.displayMonthOffset === 0) {
      alert("Not allowed to show months that are before the current month.");
      return;
    }

    let kf1 = `translateX(${-1 * ( MONTH_WIDTH + MONTH_MARGIN_RIGHT ) * this.displayMonthOffset}px)`;
    let kf2 = `translateX(${-1 * ( MONTH_WIDTH + MONTH_MARGIN_RIGHT ) * (this.displayMonthOffset - 1)}px)`;

    // console.log(`${kf1} ${kf2}`);

    const keyframes = { transform: [ kf1, kf2] };

    this.displayMonthOffset--;

    if (this.displayMonth - 1 === 0) {
      this.displayMonth = 12;
      this.displayYear--;
    } else {
      this.displayMonth--;
    }

    this.shadowRoot.querySelector('#containerScrolling').animate(keyframes, {
      duration: animationSlidingDuration, // milliseconds
      iterations: 1, // or a number
      fill: 'forwards' // 'backwards', 'both', 'none', 'auto'
    });

    // TODO is this needed, now that all Days now and in the future are tabbable?
    // this.calculateTabIndexForAllMonths();

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

    let kf1 = `translateX(${-1 * ( MONTH_WIDTH + MONTH_MARGIN_RIGHT ) * this.displayMonthOffset}px)`;
    let kf2 = `translateX(${-1 * ( MONTH_WIDTH + MONTH_MARGIN_RIGHT ) * (this.displayMonthOffset + 1)}px)`;

    // console.log(`${kf1} ${kf2}`);

    const keyframes = { transform: [ kf1, kf2] };

    // debugger;

    this.displayMonthOffset++;
    if (this.displayMonth + 1 === 13) {
      this.displayMonth = 1;
      this.displayYear++;
    } else {
      this.displayMonth++;
    }

    this.shadowRoot.querySelector('#containerScrolling').animate(keyframes, {
      duration: animationSlidingDuration, // milliseconds
      iterations: 1, // or a number
      fill: 'forwards' // 'backwards', 'both', 'none', 'auto'
    });

    // TODO is this needed, now that all Days now and in the future are tabbable?
    // this.calculateTabIndexForAllMonths();

    this.dispatchEvent(new CustomEvent('btnNextMonthClicked', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  calculateTabIndexForAllMonths() {
    // query Months
    // debugger;
    const months = this.shadowRoot.querySelectorAll('auro-datepicker-month');
    months.forEach(month => {
      // console.log(month)
      // queue Weeks
      const weeks = month.shadowRoot.querySelectorAll('auro-datepicker-week');

      weeks.forEach(week => {
        // console.log(week);
        // queue Days
        const days = week.shadowRoot.querySelectorAll('auro-datepicker-day');
        days.forEach(day => {
          // console.log(day);

          let newTabIndex = -1;

          let xYear = parseInt(day.getAttribute('year'));
          let xMonth = parseInt(day.getAttribute('month'));
          let xDay = parseInt(day.getAttribute('day'));
          let that = this;

          const dateIsOnDisplay = () => {
            const handleRollover = (monthDigit) => {
              if (monthDigit === 13) {
                return 1;
              } else {
                return monthDigit;
              }
            }
    
            if (that.isOneWay) {

              return xMonth === that.displayMonth + this.displayMonthOffset; // the +1 is when right arrow is clicked
            } else {
              return xMonth === day.getAttribute('displayMonth') + day.getAttribute('displayMonthOffset') || xMonth === handleRollover(day.getAttribute('displayMonth') + day.getAttribute('displayMonthOffset') + 1) ;
            }
          }
      
          if (
            // Day's date needs to be either today or in the future
            DateTime.fromObject({year:xYear, month: xMonth, day: xDay}).toISODate() >= DateTime.now().toISODate()
            &&
            // and it needs to be visually visible in the UI, whether the trip is one way or round trip
            dateIsOnDisplay()
            ) {
              newTabIndex = 0;
          }

          day.shadowRoot.querySelector('button').setAttribute('tabindex', newTabIndex);


        });
      }); 
    }); 

  }
  
  render() {
    // debugger;
    // console.log("calendar.js render()");

    const calendarsContainerClasses = {
      // will ultimately be the functionality of the auro-dropdown

      // this functionality is for auro-datepicker specifically
      'viewMode-single': this.isOneWay,
      'viewMode-double': !this.isOneWay,
    };
    
    if (this.mobileLayout) {
      const tripType = this.isOneWay ? 'One way' : 'Round trip';
      const dateFormat = 'ccc, LLL dd, yyyy';

      return html`
      
      <div id="parent">
        <header>
          <div id="containerBackButton">
            <button id="btnGoBack_circle">
              &lt;
            </button>
          </div>
          <div id="containerDateInfo">
            <div id="blahblah1">${tripType}</div>
            <div id="blahblah2">

              <input id="inputDepart" type="text" @click="${this.handleClickDepart}" @keydown="${this.handleKeyPressDepart}" value="${DateTime.fromObject({ year: this.departDate_year,
              month: this.departDate_month,
              day: this.departDate_day }).toFormat(dateFormat)}"/>
              
              <svg id="verticalLine" width="1" height="32">
                <line style="stroke: #DBDBDB; stroke-width:1" x1="0" y1="0" x2="0" y2="32"></line>
              </svg>

              <input id="inputReturn" type="text" @click="${this.handleClickReturn}" @keydown="${this.handleKeyPressReturn}" value="${DateTime.fromObject({ year: this.returnDate_year,
              month: this.returnDate_month,
              day: this.returnDate_day }).toFormat(dateFormat)}"/>

            </div>
          </div>
        </header>
        
        <footer>
          <span id="container-button">
            <auro-button>Done</auro-button>
          </span>
        </footer>

        <div id="textContainer">
          ${this.generateCalendars()}

          <br/><br/>
          <br/><br/>
        </div>
        
      </div>

      `;
    } else { // this.mobileLayout false
      return html`
        <div
          id="calendarContainer"
          class="${classMap(calendarsContainerClasses)}"
        >

          <div style="position: absolute; border: 1px dotted red; width: 300px">
            ${this.departDate_year}-${this.departDate_month}-${this.departDate_day} | ${this.returnDate_year}-${this.returnDate_month}-${this.returnDate_day} 
            <br/>
            ${this.isSelectionDepartDate ? html`depart` : html`return`}
          </div>

          <button
            aria-label="scroll left"
            class="btnPrevMonth"
            id="btn-prevMonth" 
            @click="${this.handlePrevMonthClick}"
          >
            ${this.chevronLeft}
          </button>
            
          <button
          aria-label="scroll right"
            class="btnNextMonth"
            id="btn-nextMonth" 
            @click="${this.handleNextMonthClick}"
            @keydown="${this.handleKeyDown_btnNextMonth}"
          >
            ${this.chevronRight}
          </button>

          <div id="containerScrolling">
            ${this.generateCalendars()}
          </div>

        </div> 

      `;
}
    }

    // debugger;



}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-datepicker-calendar")) {
  customElements.define("auro-datepicker-calendar", AuroDatePickerCalendar);
}
