// Community page: PyDelhi's channels drawn as a Delhi Metro map. Three lines cross at Commudle.
// The green "Watch and read" line is the snake. Coordinates are for a 1000x520 map (desktop)
// and a 360x820 map (phones); `a` is the label side: l, r, t (top) or b (bottom).
import site from './site.js';

const station = (id, label, sub, url, d, line) => ({ id, label, sub, url, d, line });

export default {
  lines: [
    { key: 'chat', name: 'Chat line', colour: 'navy', d: 'M140 110 H350 L500 260 L650 410 H860' },
    { key: 'build', name: 'Build line', colour: 'gold', d: 'M140 410 H350 L500 260 L650 110 H860' },
    { key: 'watch', name: 'Watch and read line', colour: 'snake', d: 'M40 260 H930' },
  ],
  stations: [
    station('whatsapp', 'WhatsApp', 'Announcements and chat', site.whatsapp, { x: 140, y: 110, a: 't' }, 'chat'),
    station('telegram', 'Telegram', 'Questions any day', site.telegram, { x: 300, y: 110, a: 't' }, 'chat'),
    station('mail', 'Mailing list', 'ncr-python.in', site.mailingList, { x: 860, y: 410, a: 'b' }, 'chat'),
    station('github', 'GitHub', 'Code and proposals', site.github, { x: 140, y: 410, a: 'b' }, 'build'),
    station('speak', 'Propose a talk', 'Open review', '/speak/', { x: 300, y: 410, a: 'b' }, 'build'),
    station('forum', 'Forum', 'Ask the organisers', site.discussions, { x: 860, y: 110, a: 't' }, 'build'),
    station('youtube', 'YouTube', 'Talk recordings', site.youtube, { x: 150, y: 260, a: 'b' }, 'watch'),
    station('blog', 'Blog', 'Meetup recaps', '/blog/', { x: 320, y: 260, a: 'b' }, 'watch'),
    station('linkedin', 'LinkedIn', 'News and photos', site.linkedin, { x: 680, y: 260, a: 'b' }, 'watch'),
    station('x', 'X', '@pydelhi', site.x, { x: 840, y: 260, a: 'b' }, 'watch'),
  ],
  hub: station('commudle', 'Commudle', 'Every meetup, every RSVP', site.commudle, { x: 500, y: 260, a: 'b' }),
};
