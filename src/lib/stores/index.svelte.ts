import moment from 'moment';
import toast from 'svelte-french-toast';

export enum Screens {
  start = 'start',
  washing = 'washing',
  finishedWashing = 'finishedWashing',
  drying = 'drying',
  finishedAll = 'finishedAll'
}

const washing_time = moment.duration(40, 'minutes');
const drying_time = moment.duration(50, 'minutes');

export class Store {
  screen = $state<Screens>(Screens.start);
  startWashingTime: moment.Moment | null = null;
  startDryingTime: moment.Moment | null = null;

  startLaundry() {
    this.startWashingTime = moment();
    toast.success('Laundry is started!');

    this.screen = Screens.washing;

    setTimeout(() => {
      this.screen = Screens.finishedWashing;
      toast.success('Finished Washing!');
    }, washing_time.asMilliseconds());
  }

  finishWashing() {
    this.screen = Screens.finishedWashing;
    toast.success('Finished Washing!');
  }

  continue() {
    this.screen = Screens.drying;
    this.startDryingTime = moment();
    toast.success('Drying is started!');

    setTimeout(() => {
      this.screen = Screens.finishedAll;
      toast.success('Laundry is completed!');
    }, drying_time.asMilliseconds());
  }

  finishDrying() {
    this.screen = Screens.finishedAll;
    toast.success('Laundry is completed!');
  }

  reset() {
    this.startDryingTime = null;
    this.startWashingTime = null;
    this.screen = Screens.start;
  }
}

export const store = new Store();
