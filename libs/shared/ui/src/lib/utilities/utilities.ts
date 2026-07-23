export class Utilities {
  static secondsInOneMinute = 60;
  static secondsInOneHour = Utilities.secondsInOneMinute * 60;
  static secondsInOneDay = Utilities.secondsInOneHour * 24;
  static secondsInOneMonth = Utilities.secondsInOneDay * 30;
  static secondsInOneYear = Utilities.secondsInOneMonth * 12;
  static timeIntervals = [
    { unit: 'second', value: 1 },
    { unit: 'minute', value: Utilities.secondsInOneMinute },
    { unit: 'hour', value: Utilities.secondsInOneHour },
    { unit: 'day', value: Utilities.secondsInOneDay },
    { unit: 'month', value: Utilities.secondsInOneMonth },
    { unit: 'year', value: Utilities.secondsInOneYear },
    { unit: 'more than year', value: Infinity },
  ];

  static dateToDisplayString(date: Date) {
    let dateString = '';
    const dateDiffInSeconds = Math.floor(
      (new Date().getTime() - date.getTime()) / 1000,
    );
    let dateDiffNumber = 0;

    for (let i = 0; i < Utilities.timeIntervals.length; i++) {
      if (dateDiffInSeconds < Utilities.timeIntervals[i].value) {
        const dateDiff = Math.floor(
          dateDiffInSeconds /
            Utilities.timeIntervals[i >= 1 ? i - 1 : 0]?.value,
        );
        dateString += `${dateDiff} ${Utilities.timeIntervals[i >= 1 ? i - 1 : 0].unit}`;
        dateDiffNumber = dateDiff;
        break;
      }
    }

    if (dateDiffNumber > 1) {
      dateString += 's';
    }

    dateString += ' ago';
    return dateString;
  }
}
