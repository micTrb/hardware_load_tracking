
export function dateFormatter(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();

  return y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}


export function dateTimeFormatter(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();

  var h = date.getHours();
  var min = date.getMinutes();
  var s = date.getSeconds();

  return y + '-' +
    (m <= 9 ? '0' + m : m) + '-' +
    (d <= 9 ? '0' + d : d) + 'T' +
    (h <= 9 ? '0' + h : h) + ':' +
    (min <= 9 ? '0' + min : min) + ':' +
    (s <= 9 ? '0' + s : s);
}

export function readableTimestamp(timestamp) {
  var date = new Date(timestamp);

  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  var h = date.getHours();
  var min = date.getMinutes();
  var s = date.getSeconds();

  return y + '-' +
    (monthNames[m]) + '-' +
    (d <= 9 ? '0' + d : d) + ' at ' +
    (h <= 9 ? '0' + h : h) + ':' +
    (min <= 9 ? '0' + min : min) + ':' +
    (s <= 9 ? '0' + s : s);
}