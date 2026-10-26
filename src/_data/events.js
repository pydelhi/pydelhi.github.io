import { getEvents } from '../../lib/commudle.js';

export default async function () {
  const { upcoming, past } = await getEvents();
  return {
    next: upcoming[0] || null,
    upcoming,
    past,
  };
}
