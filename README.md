(The file `d:\Eliana\liana\README.md` exists, but contains only whitespace)
## Liana — Next.js eCommerce Starter

A small, opinionated Next.js storefront built with the App Router, TypeScript, Redux Toolkit, Tailwind + DaisyUI and common shopping UX patterns (cart, product pages, categories, checkout).

This README covers quick setup, available scripts, repository layout and suggestions for contributors.

## Quick start

Prerequisites: Node.js (18+ recommended) and npm.

Install dependencies:

```powershell
npm install
```

Run the dev server (uses Next.js with Turbopack):

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Start the production server (after build):

```powershell
npm run start
```

Run TypeScript check (no emit):

```powershell
npx tsc --noEmit
```

Run the linter:

```powershell
npm run lint
```

## What you'll find in this repo

- Next.js (App Router) with `src/app` — pages and layout
- TailwindCSS + DaisyUI for styling
- Redux Toolkit in `src/redux` for global state
- Reusable components in `src/components`
- Example data/stubs in `src/lib/data`

Top-level files of interest:

- `package.json` — scripts & deps
- `next.config.ts` — Next.js configuration
- `tsconfig.json` — TypeScript configuration

## Scripts

- `dev` — start Next.js in development (Turbopack)
- `build` — production build
- `start` — start production server (port override: `-p 7008` in package.json)
- `lint` — run ESLint via `next lint`

## Environment variables

This project doesn't include a committed `.env` file. Add a `.env.local` at the project root for runtime configuration. Typical variables you may want:

- `NEXT_PUBLIC_API_URL` — public API base URL used by client-side requests
- Any authentication or third-party keys needed by your environment

Keep secrets out of git; use environment-specific configuration or a secret manager for production.

## Project structure (high level)

`src/`
- `app/` — Next.js App Router pages and layouts
- `components/` — UI components (Banner, Card, Header, Footer, etc.)
- `lib/` — utilities and example data used across the app
- `redux/` — Redux store, slices and hooks
- `types/` — TypeScript model definitions

Example: `src/redux/features/global/state.ts` contains a small `createSlice` for global UI flags (search modal, category drawer).

## Redux notes

- This project uses Redux Toolkit (`@reduxjs/toolkit`) + React-Redux. Keep slices small and selectors co-located when possible.
- Suggestion: export slice state types (e.g. `GlobalState`) and selectors to improve typing across the app and enable typed `useSelector` usage with your `RootState`.

## Contributing

- Fork and open a PR for fixes or features
- Keep commits focused and include tests where appropriate
- Run `npx tsc --noEmit` and `npm run lint` before opening a PR

## Deployment

This app is designed to deploy to Vercel (default for Next.js). Configure environment variables in Vercel dashboard and set the build command to `npm run build`.

## Troubleshooting

- If you hit runtime type errors, run `npx tsc --noEmit` to find type issues
- If a page fails to build, examine `next build` output. For environment-sensitive failures, check `.env.local` variables.

## License

This repository doesn't include a license file by default. If you want to open-source this project, add a `LICENSE` file (for example, MIT) and mention it here.

## Contact

If you want me to: export commonly-used types, add selectors for the Redux slices, or prepare a Vercel deployment guide with example env variables — tell me which and I'll add them.


---
Generated README: concise setup, scripts, structure, and next steps for the project.


