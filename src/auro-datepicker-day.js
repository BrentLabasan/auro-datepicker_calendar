// DEVELOPER NOTES
// When changing month, each day gets rerendered.

// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// NOTES
// The 'readonly' attribute on the <input/> tag in auro-input.js prevents the <input> from being editable.

// ---------------------------------------------------------------------

import { LitElement, html, css } from "lit-element";
import { DateTime } from "luxon";
import { classMap } from 'lit-html/directives/class-map.js';
// import { ifDefined } from 'lit-html/directives/if-defined.js';
import styleCss from "./auro-datepicker-day-style-css.js";

// build the component class
export default class AuroDatePickerDay extends LitElement {
  constructor() {
    super();

    // this.isViewSingleMode = this.hasAttribute('isViewSingleMode');


  }

  static get styles() {
    return [
      styleCss,
    ];
  }

  static get properties() {
    return {
      dateTime: { type: DateTime },
      price: { type: Number },

      isRangeStart: { type: Boolean },
      isRangeEnd: { type: Boolean },
      isWithinRange: { type: Boolean },  // if the attribute is isInRange it throws weird error wtf

      year: { type: Number },
      month: { type: Number },
      day: { type: Number },

      isDisabled: { type: Boolean },
      displayMonth: { type: Number },

    }
  }

  firstUpdated() {
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
      this.labelElement.classList.add('inputElement-label--disabled')
    }
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



  render() {
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
      hidden: this.month !== this.displayMonth
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

    return html`
      <div class="${classMap(dayContainerClasses)}" @click=${this.handleDayClick}>
      
      
      
        <span id="dayDigit" class="${classMap(dayDigitClasses)}">
          ${this.day}
        </span>
      
        <span id="dayPrice" class="${classMap(dayPriceClasses)}">
          $${this.price}
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
      
      </div>
      `;
  }

}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-datepicker-day")) {
  customElements.define("auro-datepicker-day", AuroDatePickerDay);
}
