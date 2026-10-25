import fs from 'node:fs';
import { getEvents, findPhoto } from '../../lib/commudle.js';

export default async function () {
  const { upcoming, past } = await getEvents();
  // meetups from before PyDelhi moved to Commudle (2025), added by hand in eventExtras.json
  const { archive } = JSON.parse(fs.readFileSync('src/_data/eventExtras.json', 'utf8'));
  return {
    next: upcoming[0] || null,
    upcoming,
    past,
    archive: archive
      .map(ev => ({
        ...ev,
        monthYear: new Date(ev.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
        photo: findPhoto(ev.slug),
        link: ev.recap || null,
        alt: ev.alt || `Group photo from ${ev.name}`,
      }))
      .sort((a, b) => b.date.localeCompare(a.date)),
  };
}
