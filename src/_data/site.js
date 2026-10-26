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
  proposeTalk: 'https://github.com/pydelhi/talks/issues/new?template=talk-proposal.yaml',
  talksRepo: 'https://github.com/pydelhi/talks',
  speakingGuidelines: 'https://github.com/pydelhi/talks/blob/main/guidelines/speaking.md',
  accessibilityGuidelines: 'https://github.com/pydelhi/talks/blob/main/guidelines/accessibility.md',
  reviewingGuidelines: 'https://github.com/pydelhi/talks/blob/main/guidelines/reviewing.md',
  // TODO: Google Form for volunteer sign-ups; until then volunteers open an issue, as people already do
  volunteerForm: 'https://github.com/pydelhi/talks/issues/new?title=Interested%20in%20volunteering',
  // TODO confirm: hand-set numbers shown on the home page and inner pages (meetup.com/pydelhi lists ~14.7k members)
  stats: { speakers: '350+', members: '12k+' },
  // the SPONSORS list in script.js, rounded down for copy
  sponsorCount: 27 - 27 % 5,
  nav: [
    { url: '/events/', label: 'Events' },
    { url: '/speak/', label: 'Speak' },
    { url: '/sponsor/', label: 'Sponsor' },
    { url: '/community/', label: 'Community' },
    { url: '/about/', label: 'About' },
    { url: '/blog/', label: 'Blog' },
  ],
};
