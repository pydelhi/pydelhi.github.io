// The stats graph: one square per month since 2011, filled when PyDelhi met that month.
// From 2025 on it is filled from Commudle; the years before that are kept here by hand.
import { getEvents } from '../../lib/commudle.js';

// TODO: placeholder history. One string per year, one character per month (Jan..Dec): x = met, . = no meetup
const BEFORE_COMMUDLE = {
  2011: '.......x..x.',
  2012: 'x..x.x..x.xx',
  2013: '....x.x.xx.x',
  2014: 'x.xx.xx.xx.x',
  2015: 'xx.xxx.xx.xx',
  2016: 'xxxx.xxxx.xx',
  2017: 'xx.xxxx.xxxx',
  2018: 'xxxxxx.xxxxx',
  2019: 'xxxxxx.xxxxx',
  2020: 'xxx..x..x..x',
  2021: '..x..x..x.xx',
  2022: 'x.xx.xx.xxxx',
  2023: 'xxxxx.xxxxxx',
  2024: 'xxxxxxxxx.xx',
};
const FIRST_COMMUDLE_YEAR = 2025;
// TODO confirm: meetups held before 2025. The headline adds every Commudle event to this.
const MEETUPS_BEFORE_COMMUDLE = 122;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default async function () {
  const { past } = await getEvents();
  const met = new Set(past.filter(ev => ev.year >= FIRST_COMMUDLE_YEAR).map(ev => `${ev.year}-${ev.month}`));
  const now = new Date();
  const thisYear = now.getFullYear(), thisMonth = now.getMonth();

  const cells = [];
  for (let year = 2011; year <= thisYear; year++) {
    for (let m = 0; m < 12; m++) {
      const future = year === thisYear && m > thisMonth;
      const on = !future && (year < FIRST_COMMUDLE_YEAR ? BEFORE_COMMUDLE[year]?.[m] === 'x' : met.has(`${year}-${m}`));
      cells.push({ cls: future ? 'future' : on ? 'met' : '', label: `${MONTHS[m]} ${year}: ${future ? 'coming up' : on ? 'meetup' : 'no meetup'}` });
    }
  }
  return { cells, total: MEETUPS_BEFORE_COMMUDLE + past.length };
}
