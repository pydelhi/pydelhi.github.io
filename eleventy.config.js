import { photo, photoUrl, setOutputDir } from './lib/image.js';
import shortcodes from './lib/shortcodes.js';

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/assets/logos': 'assets/logos', 'src/assets/brand': 'assets/brand', 'src/assets/icons': 'assets/icons', 'src/assets/icons/favicon.ico': 'favicon.ico' });
  eleventyConfig.addPassthroughCopy('src/styles.css');
  eleventyConfig.addPassthroughCopy('src/script.js');
  eleventyConfig.addWatchTarget('src/assets/');
  eleventyConfig.addWatchTarget('lib/');

  eleventyConfig.on('eleventy.before', () => setOutputDir(eleventyConfig.directories.output));
  eleventyConfig.addShortcode('photo', photo);
  eleventyConfig.addShortcode('photoUrl', photoUrl);
  eleventyConfig.addPlugin(shortcodes);

  // the blog index: recaps from the last two years sit on year shelves; anything older goes to the archive.
  // The cut-off moves with each build, so posts drift into the archive by themselves
  const byYear = posts => {
    const years = new Map();
    for (const post of posts) {
      const y = post.date.getUTCFullYear();
      if (!years.has(y)) years.set(y, []);
      years.get(y).push(post);
    }
    return [...years].map(([year, posts]) => ({ year, posts }));
  };
  const cutoff = () => { const d = new Date(); d.setUTCFullYear(d.getUTCFullYear() - 2); return d; };
  const newestFirst = api => api.getFilteredByTag('post').sort((a, b) => b.date - a.date);
  eleventyConfig.addCollection('recentPosts', api => newestFirst(api).filter(p => p.date >= cutoff()));
  eleventyConfig.addCollection('postsByYear', api => byYear(newestFirst(api).filter(p => p.date >= cutoff())));
  eleventyConfig.addCollection('archiveByYear', api => byYear(newestFirst(api).filter(p => p.date < cutoff())));

  return {
    dir: { input: 'src', includes: '_includes', data: '_data', output: '_site' },
    templateFormats: ['njk', 'md', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
}
