import moment from 'moment';

// All stored timestamps in this app are recorded on Eastern wall-clock time
// (labeled +00:00), so reading them as UTC yields the correct Eastern time.
// Use these helpers everywhere a date/time is displayed so times stay consistent.

export function formatEst(value, format = 'MMM D, YYYY h:mm A') {
  if (!value) return '';
  return `${moment.utc(value).format(format)} ET`;
}

export function formatEstDate(value, format = 'MMM D, YYYY') {
  if (!value) return '';
  return moment.utc(value).format(format);
}