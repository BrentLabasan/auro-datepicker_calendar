import { DateTime } from 'luxon';

function dtInFuture(months, days) {
    return DateTime.now().plus({month: months, day: days});
}

function dtInPast(months, days) {
    return DateTime.now().minus({month: months, day: days});
}

const AMOUNT_MONTHS_SHOWN = 11;

export const ROOT_CONTAINER_WIDTH_ONEWAY = 412;
export const ROOT_CONTAINER_WIDTH_ROUNDTRIP = 846;
export const ROOT_CONTAINER_HEIGHT = 470;

export const MONTH_WIDTH = 412;

export const MONTH_MARGIN_RIGHT = 22;

export const dtNow = DateTime.now();

export const dt1DayFromNow = dtInFuture(0, 1);
export const dt5DaysFromNow = dtInFuture(0, 5);
export const dt10DaysFromNow = dtInFuture(0, 10);
export const dt15DaysFromNow = dtInFuture(0, 15);
export const dt25DaysFromNow = dtInFuture(0, 25);
export const dt30DaysFromNow = dtInFuture(0, 30);
// WARNING: I tried to do a "dt35DaysFromNow" and use it in a test,
// but when trying to run findTargetDay with dt35DaysFromNow, it doesn't work
// I don't know right now why this is.
export const dt1MonthFromNow = dtInFuture(1, 0);
export const dt2MonthsFromNow = dtInFuture(2, 0);
export const dt6MonthsFromNow = dtInFuture(6, 0);
export const dt11MonthsFromNow = dtInFuture(11, 0);

export const dt1DayInPast = dtInPast(0, 1);
export const dt15DaysInPast = dtInPast(0, 15);
export const dt1MonthInPast = dtInPast(1, 0);

export default AMOUNT_MONTHS_SHOWN;