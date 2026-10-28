# shopspero

This is the website for Spero, a team of college students with a heart to share the gospel with biblically empowered apparel.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Board
https://shopspero.atlassian.net/jira/software/projects/WEBSITE/boards/1
Jira board we use to track issues

## Development

### Requirements

Install [Node.js](https://nodejs.dev/en/learn/how-to-install-nodejs/) 22 or newer and npm (Next.js 16 requires Node 20.9+, and MongoDB 7 requires Node 20.19+).

### Dependencies

```
npm install
```

Installs the required dependencies for this project.

### Development Server

```
npm run dev
```

Runs the app in development mode.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

```
npm run build
```

Builds an optimized version of the app for production.

## Deployment

This project is automatically built and deployed from the `main` branch of this repository using [Vercel](https://vercel.com/).

Any pull request against the `main` branch will also trigger a deploy preview, which allows you to preview your changes before merging.

## Checks

- `npm run lint` — ESLint checks for application sources.
- `npm run typecheck` — TypeScript without emitting files.
- `npm test` — behavior regression tests using Node’s built-in test runner.

Tests transpile TypeScript with the existing compiler and replace external service
boundaries with in-memory fakes. They do not need production credentials. A full
build and authenticated smoke tests still require the environment configuration
documented in `.env.example`.
