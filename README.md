# jamesportfolio

My personal portfolio — [www.jameswmson.ca](https://www.jameswmson.ca)

Built with React 19, Vite, and Tailwind CSS v4. The About section renders a
dithered 3D head with three.js.

## Layout

The app lives in `portfolio/`, not the repository root. The root holds only
this README and shared tooling files.

```
portfolio/
  index.html        page shell, favicon and Open Graph tags
  src/
    sections/       one component per screen (Hero, About, Projects, ...)
    components/     shared pieces (slabs, carousel cards, DitheredHead)
    data/           content: projects, experience, skills, contact
    lib/deck.js     all carousel/card transform maths
  public/           static assets served from the site root
```

## Running it

```sh
cd portfolio
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into portfolio/dist
npm run lint
```

## Deploying

Vercel builds from `main` on every push. Because the app sits in a
subdirectory, the project's **Root Directory** must be set to `portfolio` in
Vercel's build settings — pointed at the repository root the build fails,
since there is no `package.json` there.

Two things do not refresh on their own after a deploy:

- **The favicon.** Browsers cache it separately from the page and ignore a
  normal reload. Check it in a private window.
- **Link previews.** Slack, Discord, LinkedIn and X cache `og:image` for days.
  Force a refresh through each platform's own card debugger.
