const full = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const month = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default {
  layout: 'layouts/post.njk',
  tags: 'post',
  // base.njk: "<title> | PyDelhi" in the tab, and an article preview card
  isPost: true,
  permalink: '/blog/{{ page.fileSlug }}/',
  eleventyComputed: {
    dateLabel: (data) => full.format(data.page.date),
    monthLabel: (data) => month.format(data.page.date),
  },
};
