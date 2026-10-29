// Links used across the site. Sources: meetup.com/pydelhi "About us" and the pydelhi/talks issue templates.
// A Vercel build is a preview of the site: links, canonical URLs and share images point at the preview's own
// address, and search engines are asked not to index it. Everywhere else (the GitHub Pages deploy) it's pydelhi.org.
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export default {
  url: vercel ? `https://${vercel}` : 'https://pydelhi.org',
  preview: Boolean(process.env.VERCEL),
  name: 'PyDelhi',
  tagline: "Delhi NCR's Python community",
  description: "PyDelhi is Delhi NCR's Python community. Free monthly meetups, talks, workshops and lightning talks.",
  commudle: 'https://www.commudle.com/communities/pydelhi',
  // the WhatsApp Community from meetup.com/pydelhi (the talks issue template's older link isn't used)
  whatsapp: 'https://chat.whatsapp.com/DFaT2HSZVfOBocqP4Bob4j',
  telegram: 'https://t.me/PyDelhi_official',
  mailingList: 'https://mail.python.org/mailman/listinfo/ncr-python.in',
  mailingListGuidelines: 'https://github.com/pydelhi/mailing-list-guidelines',
  x: 'https://x.com/pydelhi',
  linkedin: 'https://www.linkedin.com/company/pydelhi-community/',
  youtube: 'https://www.youtube.com/channel/UC3QVyJ-Zt0QoYAibn4SD20A',
  github: 'https://github.com/pydelhi',
  githubSponsors: 'https://github.com/sponsors/pydelhi',
  discussions: 'https://github.com/orgs/pydelhi/discussions',
  communityPartnership: 'https://github.com/orgs/pydelhi/discussions/new?category=community-partnership',
  collaborativeMeetups: 'https://github.com/orgs/pydelhi/discussions/new?category=collaborative-meetups',
  email: 'contact@pydelhi.org',
  proposeTalk: 'https://github.com/pydelhi/talks/issues/new?template=talk-proposal.yaml',
  talksRepo: 'https://github.com/pydelhi/talks',
  // every talk given: proposals are closed once they've been delivered
  pastTalks: 'https://github.com/pydelhi/talks/issues?q=is%3Aissue%20state%3Aclosed',
  speakingGuidelines: 'https://github.com/pydelhi/talks/blob/main/guidelines/speaking.md',
  accessibilityGuidelines: 'https://github.com/pydelhi/talks/blob/main/guidelines/accessibility.md',
  reviewingGuidelines: 'https://github.com/pydelhi/talks/blob/main/guidelines/reviewing.md',
  volunteerForm: 'https://forms.gle/x6UFYSbaba9xN6Ar8',
  // Hand-set numbers shown on the home page and inner pages (meetup.com/pydelhi lists ~14.7k members)
  stats: { speakers: '350+', members: '14k+' },
  // the SPONSORS list in script.js, rounded down for copy
  sponsorCount: 27 - 27 % 5,
  // in the order a newcomer goes: who we are and the rules of the room, where to find us, then the ways to take part, sponsors last but one
  nav: [
    { url: '/about/', label: 'About' },
    // short in the bar; the tooltip and screen readers get the full name
    { url: '/coc/', label: 'CoC', title: 'Code of Conduct' },
    { url: '/community/', label: 'Community' },
    { url: '/speak/', label: 'Speak' },
    { url: '/volunteer/', label: 'Volunteer' },
    { url: '/sponsor/', label: 'Sponsor' },
    { url: '/blog/', label: 'Blog' },
  ],
};
