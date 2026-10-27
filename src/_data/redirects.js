// Old pydelhi.org URLs -> new pages. Blog post redirects are added from each post's `oldUrl`.
import fs from 'node:fs';
import path from 'node:path';

const POSTS = 'src/blog/posts';

export default function () {
  const posts = (fs.existsSync(POSTS) ? fs.readdirSync(POSTS) : []).filter(f => f.endsWith('.md')).flatMap(f => {
    const m = fs.readFileSync(path.join(POSTS, f), 'utf8').match(/^oldUrl:\s*["']?([^"'\s]+)/m);
    return m ? [{ from: m[1], to: `/blog/${f.replace(/\.md$/, '')}/` }] : [];
  });
  return [
    { from: '/coc.html', to: '/coc/' },
    { from: '/talks/index.html', to: '/speak/' },
    { from: '/pydelhi-intro/index.html', to: '/about/' },
    { from: '/mailing-list-guidelines/index.html', to: '/community/' },
    // a deleted post's old address goes to the blog
    { from: '/blog/hello-pydelhi.html', to: '/blog/' },
    ...posts,
  ];
}
