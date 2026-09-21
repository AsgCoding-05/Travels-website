# Luxury Car Website

This project is split into three editable parts:

- `frontend/` contains the website UI (`index.html`, `styles.css`, `app.js`).
- `backend/` contains the Node server and API routes (`server.js`).
- `database/` contains editable website content (`site-content.json`) and saved booking requests (`booking-requests.json`).

## Run Locally

```bash
npm start
```

Open:

```text
http://127.0.0.1:4173
```

## Edit Content

Most website changes should be made in:

```text
database/site-content.json
```

Common edits:

- Business name, phone, email, WhatsApp number: `business`
- Menu links: `navigation`
- Hero slides: `hero.slides`
- Services: `services.items`
- Cars and rates: `fleet.items`
- Gallery photos: `gallery.images`
- FAQ: `faq.items`

## Backend Routes

- `GET /api/site-content` returns the editable website content.
- `POST /api/booking-requests` saves quote requests into `database/booking-requests.json`.

## Hosting

For Node hosting, deploy the whole folder and run:

```bash
npm start
```

## Host On GitHub Pages

GitHub Pages hosts static files, so use the generated `docs/` folder for GitHub hosting.

Build the GitHub Pages version:

```bash
npm run build:github
```

Then commit and push:

```bash
git add .
git commit -m "Prepare luxury car website for GitHub Pages"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

In GitHub:

1. Open the repository settings.
2. Go to `Pages`.
3. Set source to `Deploy from a branch`.
4. Select branch `main`.
5. Select folder `/docs`.
6. Save.

Your site will publish at:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

Important: GitHub Pages cannot save booking requests because it does not run the Node backend. The quote form still opens WhatsApp. Use Node hosting if you want `database/booking-requests.json` to collect requests.
