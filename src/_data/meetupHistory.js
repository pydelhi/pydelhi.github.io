// The stats graph: one square per month since 2011, filled when PyDelhi met that month.
// From 2025 on it is filled from Commudle; the years before that are kept here by hand.
import { getEvents } from '../../lib/commudle.js';

// Pre-2025 months are approximate, not a record. One string per year, one character per month (Jan..Dec): x = met, . = no meetup
const BEFORE_COMMUDLE = {
  2011: '.........xxx',
  2012: '..xxx.xxxx..',
  2013: '.xxx...xxxxx',
  2014: 'xx..xxxxx.xx',
  2015: 'xx..xxxxxxxx',
  2016: 'x.xxxxxxxxxx',
  2017: '.xxxxxxxxxxx',
  2018: 'xxxxxxxx.xxx',
  2019: 'x.xxxxxxxxxx',
  2020: 'xxx.xx....xx',
  2021: 'xxxx..x.x.xx',
  2022: '.xxxxx.xxxxx',
  2023: 'xxxxxxxxxx.x',
  2024: 'xxxx.xxxxxxx',
};
const FIRST_COMMUDLE_YEAR = 2025;
// Meetups held before 2025, counted from the grid above. The headline adds every Commudle event to this.
const MEETUPS_BEFORE_COMMUDLE = Object.values(BEFORE_COMMUDLE).join('').replace(/\./g, '').length;

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
  return { cells, total: Math.floor((MEETUPS_BEFORE_COMMUDLE + past.length) / 10) * 10 };
}
