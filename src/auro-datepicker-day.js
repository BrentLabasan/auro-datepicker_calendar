// DEVELOPER NOTES
// When changing month, each day gets rerendered.

// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// NOTES
// The 'readonly' attribute on the <input/> tag in auro-input.js prevents the <input> from being editable.

// ---------------------------------------------------------------------

import { LitElement, html } from "lit-element";
import { DateTime } from "luxon";
import { classMap } from 'lit-html/directives/class-map.js';
// import { ifDefined } from 'lit-html/directives/if-defined.js';
import styleCss from "./auro-datepicker-day-style-css.js";

/**
 * auro-datepicker-week is comprised of exactly 7 auro-datepicker-day's.
 * in the form of input fields
 *
 * @attr {DateTime} dateTime - Luxon DateTime object to signify -day's date.
 * @attr {Boolean} isRangeStart - The currently depart date.
 * @attr {Boolean} isRangeEnd - The current return date.
 * @attr {Number} year - The -day's year numeral.
 * @attr {Number} month - The -day's month numeral.
 * @attr {Number} day - The -day's day numeral.
 * @attr {Boolean} isDisabled - Whether or not the -day can be interacted with.
 * @attr {Boolean} isNonExistent - If -day is non-existent, it will not be visible, such as the case where a -day is in a -calendar but they do not have the same month numeral.
 * @attr {Number} displayMonthOffset - Concerning the index of the month currently being displayed, this offset signifies the current month displayed in relation to the first month generated.
 * @attr {Number} tabindex - Determines if the -day can be focused on.
 * @attr {Boolean} isOneWay - The parent -calendar's configuration of displaying.
 * @attr {Number} weekIndex - The parent -week's index.
 * @attr {Number} dayIndex - Index of this -day in its -week.
 * @attr {Number} monthThatGeneratedThisDay - The month numeral of the grandparent -month of this -day.
 * @attr {String} priceData - TODO.
 * 
 */
export default class AuroDatePickerDay extends LitElement {
  constructor() {
    super();

  }

  static get styles() {
    return [styleCss,];
  }

  static get properties() {
    return {
      dateTime: { type: DateTime },

      isRangeStart: { type: Boolean },
      isRangeEnd: { type: Boolean },
      isWithinRange: { type: Boolean },

      year: { type: Number },
      month: { type: Number },
      day: { type: Number },

      // TODO if a tab is disabled, does that always mean that it can't be tabbed onto?
      isDisabled: { type: Boolean, reflect: true },

      isNonExistent: { type: Boolean, reflect: true },

      displayMonthOffset: { type: Number },

      tabindex: { type: Number },

      isOneWay: { type: Boolean, reflect: true },

      weekIndex: { type: Number },
      dayIndex: { type: Number },
      
      monthThatGeneratedThisDay: { type: Number },

      priceData: { type: String },
    };
  }

  handleDayClick() {

    // alert();
    // debugger;

    if (this.isDisabled) {
      return null;
    }

    this.dispatchEvent(new CustomEvent('dayClicked', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {
        // dateTime: evt.target.getAttribute('dateTime'),
        year: this.year,
        month: this.month,
        day: this.day
      }
    }));

  }

/*   handleDayKeyPress(event) {
    alert("handleDayKeyPress");
    console.log(event);
    // if user presses a key that will toggle the list of options container visible or invisible
    // if (event.key.toLowerCase() === 'enter' || event.key.toLowerCase() === ' ') {
    if (event.key.toLowerCase() === 'enter') {
      alert('Enter button pressed');
    }

    // doesn't work
    if (event.key.toLowerCase() === 'escape') {
      alert('Escape button pressed');
    }

    if (event.key.toLowerCase() === 'arrowup') {
      alert('ArrowUp button pressed');
    }

    // if user presses Shift + Tab when auro-dropdown has focus
    if (event.target.nodeName === "AURO-DROPDOWN" && event.shiftKey && event.keyCode === 9) {
      this.toggleHide();
    }
  } */

  dispatchAttemptToFocusOnDay(updated) {
    this.dispatchEvent(new CustomEvent('attemptToFocusOnDay', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: { 
        eventType: 'arrowRight',
        attemptedDate: updated, // Luxon DateTime object
        prevMonthDigit: this.month
      }
    }));
  }

  handleDayKeyDown(event) {
    // alert("handleDayKeyDown");
    console.log(event);

    // for some reason, Enter button causes the component to rerender, unless preventDefault is called
    event.preventDefault();
    let updated;
    // remember that when debugging things that have to do with .focus(), if you click into the Dev Console, the focus will be off the page!



    switch(event.key.toLowerCase()) {
      
      case 'arrowup':
        console.log('arrowup');

        this.dispatchAttemptToFocusOnDay(DateTime.fromObject({ year: this.year, month: this.month, day: this.day }).minus({day: 7}));

        break;
      case 'arrowdown':
        console.log('arrowdown');

        this.dispatchAttemptToFocusOnDay(DateTime.fromObject({ year: this.year, month: this.month, day: this.day }).plus({day: 7}));

        break;
      case 'arrowleft':
        console.log('arrowleft');

        this.dispatchAttemptToFocusOnDay(DateTime.fromObject({ year: this.year, month: this.month, day: this.day }).minus({day: 1}));

        break;
      case 'arrowright':
        console.log('arrowright');

        this.dispatchAttemptToFocusOnDay(DateTime.fromObject({ year: this.year, month: this.month, day: this.day }).plus({day: 1}));

        break;
      case 'enter':
        console.log('enter');
        break;
      case 'tab':
        console.log('tab');
        break;
    }

/*     // if user presses a key that will toggle the list of options container visible or invisible
    // if (event.key.toLowerCase() === 'enter' || event.key.toLowerCase() === ' ') {
    if (event.key.toLowerCase() === 'enter') {
      alert('Enter button pressed');
    }

    // doesn't work
    if (event.key.toLowerCase() === 'escape') {
      alert('Escape button pressed');
    }

    if (event.key.toLowerCase() === 'arrowup') {
      alert('ArrowUp button pressed');
    }

    // if user presses Shift + Tab when auro-dropdown has focus
    if (event.target.nodeName === "AURO-DROPDOWN" && event.shiftKey && event.keyCode === 9) {
      this.toggleHide();
    } */
  }

  brentLog(funcName) {
    let m = parseInt(this.month)
    let blah2 = (m < 10) ? ("0" + m) : m

    let n = parseInt(this.day)
    let blah = (n < 10) ? ("0" + n) : n


    // console.log(`day ${funcName}() ${blah2}-${blah} ${this}`); // this = [object HTMLElement]

    // debug purposes; keep
    // console.log(`day ${funcName}() ${blah2}-${blah} ${this.tabindex}`);
  }


  render() {
    // console.log("Day.js render()");

    // debugger

    if (this.monthThatGeneratedThisDay !== this.month) {
      return null;
    }

    /*
    you might be wondering why I have this code, in addition to code in auro-datepicker-calendar.js that recalculates
    the Day's indexes. It is because if I were execute that function when calendar initializes, it has to wait for its
    Months, Weeks, and Days to fully render first. I couldn't figure out how to do it. Gus suggested just doing a hacky
    JS time out, like in 
    https://dev.azure.com/itsals/E_Sell_PathtoPurchase/_git/ComponentLibrary?path=%2Fcomponents%2FFlightResults%2Ffs-shoulder%2Findex.js&version=GBmaster&line=123&lineEnd=124&lineStartColumn=1&lineEndColumn=1&lineStyle=plain&_a=contents
    and yea that should work too.
    */
    // TODO make sure this works for double view
    // BEGIN code to calculate tabindexes of the button elements on initial load
    this.tabindex = -1;

    // not needed b/c when you arrowRight on last day of month, it should go to next month's first day
/*     const dateIsOnDisplay = () => {
      const handleRollover = (monthDigit) => {
        if (monthDigit === 13) {
          return 1;
        } else {
          return monthDigit;
        }
      }
      // debugger;
      if (this.isOneWay) {
        // debugger;
        return this.month === this.month + this.displayMonthOffset;
      } else {
        return this.month === this.month + this.displayMonthOffset || this.month === handleRollover(this.month + this.displayMonthOffset + 1) ;
      }
    } */

    if (
      // Day's date needs to be either today or in the future
      DateTime.fromObject({year: this.year, month: this.month, day: this.day}).toISODate() >= DateTime.now().toISODate()

/*       &&
      // and it needs to be visually visible in the UI, whether the trip is one way or round trip
      dateIsOnDisplay() */
      && this.monthThatGeneratedThisDay === this.month

      ) {
      this.tabindex = 0;
    }

    // END code to calculate tabindexes of the button elements on initial load


    const condition = DateTime.fromISO(this.dateTime).toISODate() < DateTime.now().toISODate();
    if (condition) {
      // console.log("taco", this.dateTime, DateTime.now().toISODate(), condition);
      this.isDisabled = true;
    }
    // debugger;

    // everything below this, I think it came from the file I copy pasted

    this.inputElement = this.renderRoot.querySelector('input');
    this.labelElement = this.shadowRoot.querySelector('label');

    if (this.error === "") {
      this.error = null;
    }

    if (this.disabled) {
      this.labelElement.classList.add('inputElement-label--disabled');
    }

    // debug purposes
    this.brentLog('render');


    const inbetweenClasses = {
      inbetween: true,
      hidden: !this.isWithinRange
    };

    const rangeBeginDateClasses = {
      rangeStartPill: true,
      hidden: !this.isRangeStart,
    };

    const rangeEndDateClasses = {
      rangeEndPill: true,
      hidden: !this.isRangeEnd,
    };

    const dayDigitClasses = {
      center: true,
      whiteText: this.isRangeStart,
      disabled: this.isDisabled,
    };

    const dayPriceClasses = {
      center: true,
      whiteText: this.isRangeStart,
      disabled: this.isDisabled,
      hidden: this.isDisabled,
    };

    const leftSideClasses = {
      leftSideRounded: DateTime.fromISO(this.dateTime).toFormat('ccc') === 'Sun',
      hidden: this.isRangeStart,
    };

    const rightSideClasses = {
      rightSideRounded: DateTime.fromISO(this.dateTime).toFormat('ccc') === 'Sat',
      hidden: this.isRangeEnd,
    };

    const dayContainerClasses = {
      dayContainer: true,
      hidden: this.monthThatGeneratedThisDay !== this.month
    };
    // debugger;

    // const dayEndClasses = {
    //   center: true,
    //   hidden: !this.isRangeStart,
    // };

    // console.log('%c this.isRangeStart ' + this.isRangeStart, 'background-color: black; color: white;');
    // console.log('%c this.isRangeEnd ' + this.isRangeEnd, 'background-color: black; color: white;');
    // console.log('%c this.isWithinRange ' + this.isWithinRange, 'background-color: black; color: white;');

    // console.log('%c returning a new day ', 'background-color: black; color: white;');


    if (this.priceData && this.priceData !== '[object Object]') {
      // console.log("ENTERED");
      this.priceData = JSON.parse(this.priceData);

      // https://stackoverflow.com/a/8089938/708355
      this.month = String(this.month).padStart(2, '0');
      this.day = String(this.day).padStart(2, '0');
    }

    // console.log("Day.js", this.priceData)

    // console.log("this.priceData", this.priceData);
    
    const screenReaderDate = DateTime.fromObject( {month: this.month, day: this.day, year: this.year} ).toFormat('cccc LLLL d y');
    let screenReaderText = "";

    let price;
    if (this.priceData) {
      price = this.priceData[`${this.year}-${this.month}-${this.day}`];
    }
    if (price) {
      // console.log(price);
      const screenReaderPriceDollars = Math.floor(price);
      const screenReaderPriceCents = price.split('.')[1];
      screenReaderText = `${screenReaderDate} price ${screenReaderPriceDollars} dollars and ${screenReaderPriceCents} cents`
      // console.log(screenReaderText)
    }

    return html`
      <button role=application tabindex="${this.tabindex}" aria-label="${screenReaderText}" class="${classMap(dayContainerClasses)}" @click=${this.handleDayClick}  @keydown=${this.handleDayKeyDown}>
      
        <!-- TODO can I just change labeledby to labeled? -->
      
        <span  id="dayDigit" class="${classMap(dayDigitClasses)}">
          ${this.day}
        </span>
      
        <span id="dayPrice" class="${classMap(dayPriceClasses)}">
          <!-- ${this.year}-${this.month}-${this.day} -->
          ${this.priceData && this.priceData[`${this.year}-${this.month}-${this.day}`] ? html`<span>$${this.priceData[`${this.year}-${this.month}-${this.day}`]}</span>` : html`<span>&nbsp;</span>`}
        </span>
      
      
      
        <!-- TODO the oval for the range begin date -->
        <div class="${classMap(rangeBeginDateClasses)}">
          <div class="">&nbsp;</div>
        </div>
      
        <!-- TODO the oval for the range end date -->
        <div class="${classMap(rangeEndDateClasses)}">
          <div class="">&nbsp;</div>
        </div>
      
        <!-- the grey graphic that's between start and end dates -->
        <div class="${classMap(inbetweenClasses)}">
          <div class="${classMap(leftSideClasses)}">&nbsp;</div>
          <div class="${classMap(rightSideClasses)}">&nbsp;</div>
        </div>
      
      </button>
      `;
  }

}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-datepicker-day")) {
  customElements.define("auro-datepicker-day", AuroDatePickerDay);
}
