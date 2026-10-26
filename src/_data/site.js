// Links used across the site. Sources: meetup.com/pydelhi "About us" and the pydelhi/talks issue templates.
export default {
  url: 'https://pydelhi.org',
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
  // TODO: the Google Form link, owner will send it
  volunteerForm: 'https://forms.gle/TODO',
  // TODO confirm: hand-set numbers shown on the home page and inner pages (meetup.com/pydelhi lists ~14.7k members)
  stats: { speakers: '350+', members: '12k+' },
  // the SPONSORS list in script.js, rounded down for copy
  sponsorCount: 27 - 27 % 5,
  // in the order a newcomer goes: who we are, where to find us, then the ways to take part, sponsors last but one
  nav: [
    { url: '/about/', label: 'About' },
    { url: '/community/', label: 'Community' },
    { url: '/speak/', label: 'Speak' },
    { url: '/volunteer/', label: 'Volunteer' },
    { url: '/sponsor/', label: 'Sponsor' },
    { url: '/blog/', label: 'Blog' },
  ],
};
