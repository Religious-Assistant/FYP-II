export const dateDifference = createdAt => {
  let dt1 = new Date(createdAt);
  return timeSince(dt1);
};

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
}


export function setHours(dt, time) {
  var splitted = time.split(":");
  let hours=splitted[0]
  let mins=splitted[1]
  let meridium=splitted[2].split(" ")[1]
  dt.setHours(meridium.toLowerCase() === 'pm' ? 12 + parseInt(hours) : parseInt(hours));
  dt.setMinutes(parseInt(mins)); 
}