import path from 'node:path';
import Image from '@11ty/eleventy-img';

// Photos are resized at build time into _site/img/ as WebP + JPEG at a few widths.
// `src` is relative to src/assets/ ("photos/bof.jpg") or a full "src/..." path from the event data.
const IMAGE_OPTIONS = { widths: [320, 640, 1280], formats: ['webp', 'jpeg'], urlPath: '/img/' };
const resolve = src => (src.startsWith('src/') ? src : path.join('src/assets', src));

export default function (eleventyConfig) {
  const image = src => Image(resolve(src), { ...IMAGE_OPTIONS, outputDir: path.join(eleventyConfig.directories.output, 'img') });

  eleventyConfig.addPassthroughCopy({ 'src/assets/logos': 'assets/logos' });
  eleventyConfig.addPassthroughCopy('src/styles.css');
  eleventyConfig.addPassthroughCopy('src/script.js');
  eleventyConfig.addWatchTarget('src/assets/');

  eleventyConfig.addShortcode('photo', async (src, alt, sizes = '100vw', attrs = {}) => {
    const meta = await image(src);
    // no width/height attributes: the CSS sizes every photo, and the attributes would override its aspect-ratios
    return Image.generateHTML(meta, { alt, sizes, decoding: 'async', ...attrs }).replace(/ (width|height)="\d+"/g, '');
  });

  // a single JPEG URL, for images that script.js swaps in itself
  eleventyConfig.addShortcode('photoUrl', async (src, width = 640) => {
    const meta = await image(src);
    const jpegs = meta.jpeg;
    return (jpegs.find(j => j.width >= width) || jpegs.at(-1)).url;
  });

  return {
    dir: { input: 'src', includes: '_includes', data: '_data', output: '_site' },
    templateFormats: ['njk', 'md', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
}
