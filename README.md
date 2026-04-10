# Express.js Tutorial (Learning Notes + Mini Projects)

A personal, step-by-step Express.js learning repository. It includes small demos (route params, query params, static files, etc.) and a mini project (URL shortener) as I explore Express.

## What you’ll learn here

This repo is meant to be readable even if you're brand new to Express. Each file/folder is a small learning step.

You’ll see examples of:

- Creating an Express server
- Serving static files (HTML/CSS/JS)
- Route parameters (`/profile/:username`)
- Nested route parameters (`/profile/:username/article/:slug`)
- Query parameters (`/product?name=...&category=...`)
- Basic environment variable validation using `zod`

## Repository structure

- `app.js` — Express demo app showing:
  - Serving static files from `public/`
  - Route parameters (e.g. `/profile/:username`)
  - Nested route parameters (e.g. `/profile/:username/article/:slug`)
  - Query parameters (e.g. `/product?name=...&category=...`)
  - Serving an HTML file from `public/index.html`
- `env.js` — environment + validation experiments (uses `zod` to validate/coerce `PORT`)
- `form.js` and `formsubmission/` — form handling / submission practice
- `public/` — static assets / HTML
- `views/` — template views (if used by examples)
- `URL_Shortner_Project/` — mini project (separate Express app; entry: `URL_Shortner_Project/code.js`)
- `.env-example` — example env file (rename/copy to `.env` if needed)

## How Express works (quick explanation)

Express is a Node.js web framework. Your app usually looks like:

1. Create an app: `const app = express()`
2. Add middleware: `app.use(...)`
3. Add routes: `app.get(...)`, `app.post(...)`, etc.
4. Start the server: `app.listen(PORT)`

In this repository, `app.js` is the main file that demonstrates this flow.

## Running the basic Express demo (`app.js`)

### Prerequisites

- Node.js installed (recommended: current LTS)
- Basic familiarity with running Node scripts

> Note: This repository currently does **not** contain a root `package.json`, so it does not include a one-command install/run script yet.

### Install dependencies

If you haven’t installed dependencies yet, you need at least:

- `express`
- `zod`

Example (using npm):

```bash
npm i express zod
```

### Start the server

```bash
node app.js
```

When it starts, you should see something like:
- `Server running on http://localhost:<PORT>`

Open your browser:
- `http://localhost:<PORT>/`

## Understanding the demo routes

### 1) Route parameters

Route parameters are parts of the URL path.

Example from `app.js`:

- `GET /profile/:username`

Try it in the browser:

- `/profile/prashant`

You should get a page like:

- `Welcome to the profile of prashant`

### 2) Nested route parameters

Example:

- `GET /profile/:username/article/:slug`

Try:

- `/profile/prashant/article/hello-express`

### 3) Query parameters

Query params come after `?` in the URL.

Example:

- `GET /product?name=phone&category=electronics`

In `app.js` you can read them with `req.query`.

## Environment variables (`env.js`)

This repo also contains `env.js` which experiments with validating/coercing environment values using `zod`.

For example, it parses `process.env.PORT` safely into a number.

## URL Shortener project

The URL shortener project lives in `URL_Shortner_Project/`.

- Entry point: `URL_Shortner_Project/code.js`
- Uses EJS views and serves static files from `URL_Shortner_Project/public/`.
- Contains environment validation in `URL_Shortner_Project/config/env.js` and expects MongoDB settings.

To run it, you’ll need to:

1. Install the dependencies used by that project
2. Add the required environment variables (MongoDB URL and DB name)

## Goals / Notes

- Keep examples small and focused
- Add mini projects as learning milestones
- Update this README as more topics are added

## License

No license specified yet.