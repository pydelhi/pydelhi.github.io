// Designed blocks for pages written in Markdown. Each paired shortcode renders its own
// Markdown body, then returns HTML with no blank lines, so the page's Markdown pass leaves it alone.
//
//   {% section "Title with <em>emphasis</em>", "Optional lede", "optional-id" %} ... {% endsection %}
//   {% tiles %} {% tile "icon", "Title", "optional link", "optional footnote" %}Text{% endtile %} ... {% endtiles %}
//     (a linked tile drops links inside its text; use {% tiles 2 %} for two columns)
//   {% steps %} {% step "Title" %}Text{% endstep %} ... {% endsteps %}
//   {% timeline %} {% moment "2016", "Title" %}Text{% endmoment %} ... {% endtimeline %}
//   {% panel "blue" | "green", "Title", "Optional lede" %} ... {% endpanel %}
//   {% prose %} long-form Markdown {% endprose %}
//   {% chips %} - a Markdown list {% endchips %}
//   {% buttons %} {% button "Label", "url", "icon", "line" %} ... {% endbuttons %}
// Icons are Phosphor names without the "ph-" prefix: https://phosphoricons.com
import markdownIt from 'markdown-it';

const md = markdownIt({ html: true, typographer: false });
const render = text => md.render(dedent(text)).trim();
const tight = html => html.replace(/\n\s*\n/g, '\n').trim();
const external = url => /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : '';

// shortcode bodies are usually indented in the page source; Markdown would read that as code
function dedent(text) {
  const lines = text.replace(/^\n+|\s+$/g, '').split('\n');
  const indent = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^ */)[0].length));
  return lines.map(l => l.slice(indent)).join('\n');
}

export default function (eleventyConfig) {
  eleventyConfig.addPairedShortcode('section', (body, title, lede, id) => tight(`
<section class="page-section"${id ? ` id="${id}"` : ''}>
<div class="wrap">
${title ? `<div class="section-head"><h2 class="h2">${title}</h2>${lede ? `<p class="lede">${lede}</p>` : ''}</div>` : ''}
${render(body)}
</div>
</section>`));

  eleventyConfig.addPairedShortcode('tiles', (body, columns = 3) =>
    tight(`<div class="tiles${columns == 2 ? ' tiles-2' : ''}">${body}</div>`));

  eleventyConfig.addPairedShortcode('tile', (body, icon, title, url, meta) => {
    const tag = url ? 'a' : 'div';
    // the whole tile is already a link, and links can't nest, so links in its text become plain text
    const text = url ? render(body).replace(/<a\b[^>]*>(.*?)<\/a>/gs, '$1') : render(body);
    return tight(`
<${tag} class="tile" data-reveal${url ? ` href="${url}"${external(url)}` : ''}>
${icon ? `<span class="tile-icon"><i class="ph ph-${icon}" aria-hidden="true"></i></span>` : ''}
<h3>${title}</h3>
${text}
${meta ? `<span class="tile-meta">${meta}</span>` : ''}
${url ? `<i class="ph ph-arrow-up-right tile-arrow" aria-hidden="true"></i>` : ''}
</${tag}>`);
  });

  eleventyConfig.addPairedShortcode('steps', body => tight(`<ol class="steps">${body}</ol>`));
  eleventyConfig.addPairedShortcode('step', (body, title) =>
    tight(`<li data-reveal><h3>${title}</h3>${render(body)}</li>`));

  eleventyConfig.addPairedShortcode('timeline', body => tight(`<ol class="timeline">${body}</ol>`));
  eleventyConfig.addPairedShortcode('moment', (body, year, title) =>
    tight(`<li data-reveal><strong>${year}</strong><div><h3>${title}</h3>${render(body)}</div></li>`));

  eleventyConfig.addPairedShortcode('panel', (body, colour = 'blue', title, lede) => tight(`
<div class="panel panel-${colour}" data-reveal>
${title ? `<div class="section-head"><h2 class="h2">${title}</h2>${lede ? `<p class="lede">${lede}</p>` : ''}</div>` : ''}
${render(body)}
</div>`));

  eleventyConfig.addPairedShortcode('prose', body => tight(`<div class="prose">${render(body)}</div>`));

  eleventyConfig.addPairedShortcode('chips', body =>
    tight(render(body).replace('<ul>', '<ul class="chips">')));

  eleventyConfig.addPairedShortcode('buttons', body => tight(`<div class="section-foot">${body}</div>`));
  eleventyConfig.addShortcode('button', (label, url, icon, style) => {
    const arrow = icon || (external(url) ? 'arrow-up-right' : 'arrow-right');
    return `<a href="${url}" class="${style === 'line' ? 'btn-line' : 'btn-navy'}"${external(url)}>${label} <i class="ph ph-${arrow}"></i></a>`;
  });
}
