export class Activity {
  constructor(name, start, end) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.startInMinutes = this.convertTimeToMinutes(start);
    this.endInMinutes = this.convertTimeToMinutes(end);
  }

  convertTimeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  getActivity() {
    return this;
  }
}