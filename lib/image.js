// Photos are resized at build time into _site/img/ as WebP + JPEG at a few widths.
// `src` is relative to src/assets/ ("photos/birds-of-a-feather.jpg"), a full "src/..." path, or a remote URL (Commudle event images,
// cached in .cache/ so later builds don't download them again).
import path from 'node:path';
import Image from '@11ty/eleventy-img';

const OPTIONS = { widths: [320, 640, 1280], formats: ['webp', 'jpeg'], urlPath: '/img/', outputDir: '_site/img/' };
const resolve = src => (/^(src\/|https?:)/.test(src) ? src : path.join('src/assets', src));

export function setOutputDir(dir) { OPTIONS.outputDir = path.join(dir, 'img'); }

export async function photo(src, alt, sizes = '100vw', attrs = {}) {
  let meta;
  try {
    meta = await Image(resolve(src), OPTIONS);
  } catch (err) {
    // a remote image that can't be fetched gets the generated cover's wordmark instead of failing the build
    if (!src.startsWith('http')) throw err;
    console.warn(`[photo] couldn't fetch ${src} (${err.message})`);
    return '<span class="past-gen-logo"></span>';
  }
  // no width/height attributes: the CSS sizes every photo, and the attributes would override its aspect-ratios
  return Image.generateHTML(meta, { alt, sizes, decoding: 'async', ...attrs }).replace(/ (width|height)="\d+"/g, '');
}

// a single JPEG URL, for images that script.js swaps in itself
export async function photoUrl(src, width = 640) {
  const jpegs = (await Image(resolve(src), OPTIONS)).jpeg;
  return (jpegs.find(j => j.width >= width) || jpegs.at(-1)).url;
}
