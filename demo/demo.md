# auro-datepicker_calendar

## DOUBLE MODE

no set depart or return date
<div class="exampleWrapper">
  <auro-datepicker_calendar cssClass="testClass"></auro-datepicker_calendar>
</div>

depart date set, no return date set
<div class="exampleWrapper">
  <div departDate_year="2021" departDate_month="10" departDate_day="15">
    <auro-datepicker_calendar cssClass="testClass"></auro-datepicker_calendar>
  </div>
</div>

depart and return date set
<div class="exampleWrapper">
  <div departDate_year="2021" departDate_month="10" departDate_day="15" returnDate_year="2021" returnDate_month="10" returnDate_day="29">
    <auro-datepicker_calendar cssClass="testClass"></auro-datepicker_calendar>
  </div>
</div>

depart date set, return date set 2 months after depart date
<div class="exampleWrapper">
  <div class="exampleWrapper" departDate_year="2021" departDate_month="10" departDate_day="15" returnDate_year="2021" returnDate_month="12" returnDate_day="15">
    <auro-datepicker_calendar cssClass="testClass"></auro-datepicker_calendar>
  </div>
</div>

depart date and return are the same
<div class="exampleWrapper">
  <div class="exampleWrapper" departDate_year="2021" departDate_month="10" departDate_day="15" returnDate_year="2021" returnDate_month="10" returnDate_day="15">
    <auro-datepicker_calendar cssClass="testClass"></auro-datepicker_calendar>
  </div>
</div>

## SINGLE MODE
depart date set; no return date is possible because auro-datepicker-calendar is in single mode
TODO


What is the purpose of the fixed attribute?
<div class="exampleWrapper">
  <auro-datepicker_calendar cssClass="testClass" fixed></auro-datepicker_calendar>
</div>
