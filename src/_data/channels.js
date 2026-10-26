// Community page: PyDelhi's channels as a bento grid. `size` is the tile's footprint (big 2x2, wide 2x1,
// otherwise 1x1) and `tint` the pastel it's drawn in; the rest are white.
import site from './site.js';

const channel = (label, sub, url, icon, size, tint) => ({ label, sub, url, icon, size, tint });

export default [
  channel('Commudle', 'Every meetup is announced here first. RSVP, see who is coming and find the venue.', site.commudle, 'calendar-dots', 'big', 'blue'),
  channel('WhatsApp', 'Announcements and everyday chat', site.whatsapp, 'whatsapp-logo', 'wide', 'green'),
  channel('Propose a talk', 'Reviewed in the open', '/speak/', 'microphone-stage'),
  channel('GitHub', 'Code and talk proposals', site.github, 'github-logo'),
  channel('YouTube', 'Talks, recorded at the meetups', site.youtube, 'youtube-logo', 'wide'),
  channel('Telegram', 'Questions any day', site.telegram, 'telegram-logo', '', 'yellow'),
  channel('Community partnership', 'Team up with us', site.communityPartnership, 'handshake'),
  channel('Mailing list', 'ncr-python.in', site.mailingList, 'envelope-simple'),
  channel('Blog', 'Meetup recaps', '/blog/', 'article'),
  channel('LinkedIn', 'News and photos', site.linkedin, 'linkedin-logo'),
  channel('X', '@pydelhi', site.x, 'x-logo'),
];
