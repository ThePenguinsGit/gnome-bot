export default class DateHelper {
  static TIME_MAPPING = {
    years: 365.25 * 24 * 60 * 60,
    months: 30.44 * 24 * 60 * 60,
    days: 24 * 60 * 60,
    hours: 60 * 60,
    minutes: 60,
  };

  static getFormattedDuration(seconds: number): string {
    const returnStrings = [];

    for (const [key, value] of Object.entries(this.TIME_MAPPING)) {
      const amount = Math.floor(seconds / value);
      let unit = key;
      if (amount > 0) {
        if (amount === 1) unit = key.slice(0, -1);
        returnStrings.push(`${amount} ${unit}`);
        seconds = seconds % value;
      }
    }

    seconds = Math.round(seconds);

    if (seconds > 0) {
      const unit = seconds === 1 ? "second" : "seconds";
      returnStrings.push(`${seconds} ${unit}`);
    }

    return returnStrings.join(", ").trim();
  }
}
