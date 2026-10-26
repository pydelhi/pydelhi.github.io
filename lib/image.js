// Photos are resized at build time into _site/img/ as WebP + JPEG at a few widths.
// `src` is relative to src/assets/ ("photos/bof.jpg") or a full "src/..." path from the event data.
import path from 'node:path';
import Image from '@11ty/eleventy-img';

const OPTIONS = { widths: [320, 640, 1280], formats: ['webp', 'jpeg'], urlPath: '/img/', outputDir: '_site/img/' };
const resolve = src => (src.startsWith('src/') ? src : path.join('src/assets', src));

export function setOutputDir(dir) { OPTIONS.outputDir = path.join(dir, 'img'); }

export async function photo(src, alt, sizes = '100vw', attrs = {}) {
  const meta = await Image(resolve(src), OPTIONS);
  // no width/height attributes: the CSS sizes every photo, and the attributes would override its aspect-ratios
  return Image.generateHTML(meta, { alt, sizes, decoding: 'async', ...attrs }).replace(/ (width|height)="\d+"/g, '');
}

// a single JPEG URL, for images that script.js swaps in itself
export async function photoUrl(src, width = 640) {
  const jpegs = (await Image(resolve(src), OPTIONS)).jpeg;
  return (jpegs.find(j => j.width >= width) || jpegs.at(-1)).url;
}
