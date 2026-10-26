import { photo, photoUrl, setOutputDir } from './lib/image.js';
import shortcodes from './lib/shortcodes.js';

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/assets/logos': 'assets/logos' });
  eleventyConfig.addPassthroughCopy('src/styles.css');
  eleventyConfig.addPassthroughCopy('src/script.js');
  eleventyConfig.addWatchTarget('src/assets/');
  eleventyConfig.addWatchTarget('lib/');

  eleventyConfig.on('eleventy.before', () => setOutputDir(eleventyConfig.directories.output));
  eleventyConfig.addShortcode('photo', photo);
  eleventyConfig.addShortcode('photoUrl', photoUrl);
  eleventyConfig.addPlugin(shortcodes);

  // the blog index shelves: newest year first, newest post first in each
  eleventyConfig.addCollection('postsByYear', api => {
    const years = new Map();
    for (const post of api.getFilteredByTag('post').sort((a, b) => b.date - a.date)) {
      const y = post.date.getUTCFullYear();
      if (!years.has(y)) years.set(y, []);
      years.get(y).push(post);
    }
    return [...years].map(([year, posts]) => ({ year, posts }));
  });

  return {
    dir: { input: 'src', includes: '_includes', data: '_data', output: '_site' },
    templateFormats: ['njk', 'md', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
}
