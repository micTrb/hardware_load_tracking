
export default function dateFormatter(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();

  return y + '-' + (m<=9 ? '0' + m : m) + '-' + d;
}

