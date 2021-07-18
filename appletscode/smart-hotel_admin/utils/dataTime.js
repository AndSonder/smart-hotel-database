const msToDate = msec => {
  let datetime = new Date(msec);
  let year = datetime.getFullYear();
  let month = datetime.getMonth();
  let date = datetime.getDate();
  let hour = datetime.getHours();
  let minute = datetime.getMinutes();
  let second = datetime.getSeconds();
  let result1 = year +
    '-' +
    ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
    '-' +
    ((date + 1) < 10 ? '0' + date : date) +
    ' ' +
    ((hour + 1) < 10 ? '0' + hour : hour) +
    ':' +
    ((minute + 1) < 10 ? '0' + minute : minute)
  // ':' +
  // ((second + 1) < 10 ? '0' + second : second);
  let result2 = year +
    '-' +
    ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
    '-' +
    ((date + 1) <= 10 ? '0' + date : date);
  let result3 = ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
    '月' +
    ((date + 1) <= 10 ? '0' + date : date) + '日';
  let result4 = ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
    '月' +
    ((date + 1) <= 10 ? '0' + (date + 1) : (date + 1)) + '日';
  let result5 = ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
    '/' +
    ((date + 1) <= 10 ? '0' + date : date);
  let result6 = year;
  let result7 = ((hour + 1) < 10 ? '0' + hour : hour) +
    ':' +
    ((minute + 1) < 10 ? '0' + minute : minute);
  let result = {
    hasTime: result1,
    withoutTime: result2,
    justDate: result3,
    justendDate: result4,
    normalDate: result5,
    justYear: result6,
    justTime:result7,
  };
  return result;
}

module.exports = {
  msToDate
}