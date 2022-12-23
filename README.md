# sveltekit-todo

Yet another todo list made with Svelte.

Features:
  - Powered by a [REST API backend](https://github.com/arcanemachine/django-todo-api) (made with Django and DRF).
    - Uses an OpenAPI client generated from a `schema.yml` file on the server.
  - Handles user authentication.
  - Uses session authentication for the unbeatable security offered by HttpOnly cookies.

## Developing

This project uses HTTPS via self-signed certificates powered by `mkcert`. You have two choices:
  - Generate certificates and place them in `.cert/`
  - Comment out the `server` block in `vite.config.js`.
    - Note that disabling HTTPS will probably cause the API server to stop working.

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
