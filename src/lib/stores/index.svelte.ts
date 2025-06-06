import moment from 'moment';
import toast from 'svelte-french-toast';

export enum Screens {
  start = 'start',
  washing = 'washing',
  finishedWashing = 'finishedWashing',
  drying = 'drying',
  finishedAll = 'finishedAll'
}

export const washing_time = moment.duration(40, 'seconds');
export const drying_time = moment.duration(50, 'minutes');

const START_WASHING_TIME_KEY = 'start-washing-time';
const START_DRYING_TIME_KEY = 'start-drying-time';
const FINISHED_WASHING_KEY = 'finished-washing';
const FINISHED_ALL_KEY = 'finished-all';

export class Store {
  screen = $state<Screens>(Screens.start);
  startWashingTime: moment.Moment | null = null;
  startDryingTime: moment.Moment | null = null;

  constructor() {
    const local = this.getLocalStoredValues();

    const finishedAll = localStorage.getItem(FINISHED_ALL_KEY) === 'true';

    const finishedWashing = localStorage.getItem(FINISHED_WASHING_KEY) === 'true';

    if (finishedAll) {
      this.clearLocal();
      return;
    } else if (local.dry && local.wash) {
      const dryTime = moment(local.dry);

      this.screen = Screens.drying;

      this.startDryingTime = dryTime;
      this.startWashingTime = moment(local.wash);
    } else if (local.wash) {
      const washTime = moment(local.wash);

      if (finishedWashing) {
        this.screen = Screens.finishedWashing;
      } else {
        this.screen = Screens.washing;
      }

      this.startWashingTime = washTime;
    }
  }

  getLocalStoredValues() {
    const wash = localStorage.getItem(START_WASHING_TIME_KEY);
    const dry = localStorage.getItem(START_DRYING_TIME_KEY);

    return {
      wash,
      dry
    };
  }

  saveWash(time: moment.Moment) {
    localStorage.setItem(START_WASHING_TIME_KEY, time.toISOString());
  }

  saveDry(time: moment.Moment) {
    localStorage.setItem(START_DRYING_TIME_KEY, time.toISOString());
  }

  startLaundry() {
    this.startWashingTime = moment();
    this.saveWash(this.startWashingTime);
    toast.success('Laundry is started!');

    this.screen = Screens.washing;

    this.scheduleNotification({
      title: 'Finished Washing',
      body: 'Go back to continue to drying',
      time: moment().add(washing_time.asMilliseconds(), 'milliseconds')
    });

    setTimeout(() => {
      this.screen = Screens.finishedWashing;
      toast.success('Finished Washing!');
    }, washing_time.asMilliseconds());

    this.scheduleNotification({
      title: 'Laundry is started',
      body: 'Go back to continue washing',
      time: moment().add(5, 'seconds')
    });
  }

  finishWashing() {
    this.screen = Screens.finishedWashing;
    localStorage.setItem(FINISHED_WASHING_KEY, 'true');

    // this.showNotif({ title: 'Finished Washing', body: 'Go back to continue drying' });
    toast.success('Finished Washing!');
  }

  continue() {
    this.screen = Screens.drying;
    this.startDryingTime = moment();
    this.saveDry(this.startDryingTime);
    toast.success('Drying is started!');

    this.scheduleNotification({
      title: 'Your Laundry is Completed',
      body: 'Drying is completed, time to take out your clothes!',
      time: moment().add(drying_time.asMilliseconds(), 'milliseconds')
    });

    setTimeout(() => {
      this.screen = Screens.finishedAll;
      toast.success('Laundry is completed!');
    }, drying_time.asMilliseconds());
  }

  finishDrying() {
    this.screen = Screens.finishedAll;
    localStorage.setItem(FINISHED_ALL_KEY, 'true');
    // this.showNotif({ title: 'Your Laundry is Completed', body: 'Your laundry is completed' });
    toast.success('Laundry is completed!');
  }

  reset() {
    this.startDryingTime = null;
    this.startWashingTime = null;
    this.screen = Screens.start;
    this.clearLocal();
  }

  clearLocal() {
    localStorage.setItem(START_WASHING_TIME_KEY, '');
    localStorage.setItem(START_DRYING_TIME_KEY, '');
    localStorage.setItem(FINISHED_ALL_KEY, '');
    localStorage.setItem(FINISHED_WASHING_KEY, '');
  }

  async scheduleNotification({
    title,
    body,
    time
  }: {
    title: string;
    body: string;
    time: moment.Moment;
  }) {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SCHEDULE_NOTIFICATION',
        title: title,
        options: {
          body,
          icon: '/logo.png'
        },
        scheduledTime: time.valueOf()
      });
    }
  }

  // async showNotif({ title, body }: { title: string; body: string }) {
  //   if (Notification.permission !== 'granted') {
  //     await Notification.requestPermission();
  //   }
  //
  //   if (Notification.permission === 'granted') {
  //     const notification = new Notification(title, {
  //       body,
  //       icon: '/logo.png'
  //     });
  //
  //     notification.onclick = () => {
  //       window.focus();
  //     };
  //   }
  // }
}

export const store = new Store();
