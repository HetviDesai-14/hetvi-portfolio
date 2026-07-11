# Hetvi Desai — Portfolio

A Next.js (App Router) + React + Tailwind CSS portfolio for an AI/ML engineer, with a
working contact-form API route (Resend) and a résumé download button.

## 1. Project structure

```
hetvi-portfolio/
├─ public/
│  └─ resume/
│     └─ Hetvi_Desai_CV.pdf          ← swap with the résumé PDF you want visitors to download
├─ src/
│  ├─ app/
│  │  ├─ api/contact/route.js        ← POST handler that emails you + auto-replies to sender
│  │  ├─ globals.css                 ← design tokens (CSS vars) for light/dark themes
│  │  ├─ layout.jsx                  ← fonts, metadata, ThemeProvider, no-flash script
│  │  └─ page.jsx                    ← assembles all sections
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ ThemeToggle.jsx
│  │  ├─ Hero.jsx
│  │  ├─ LiveSignal.jsx              ← animated "signal" strip in the hero
│  │  ├─ SignalDivider.jsx           ← recurring waveform section divider
│  │  ├─ About.jsx
│  │  ├─ Experience.jsx
│  │  ├─ Projects.jsx
│  │  ├─ Research.jsx                ← education + publications
│  │  ├─ Skills.jsx
│  │  ├─ Volunteering.jsx
│  │  ├─ Contact.jsx                 ← the contact form (client component)
│  │  └─ Footer.jsx
│  ├─ data/                          ← ALL your content lives here, as JSON
│  │  ├─ profile.json
│  │  ├─ experience.json
│  │  ├─ projects.json
│  │  ├─ education.json
│  │  ├─ publications.json
│  │  ├─ skills.json
│  │  └─ volunteering.json
│  └─ lib/
│     └─ theme-provider.jsx          ← dark/light theme context
├─ package.json
├─ next.config.js
├─ tailwind.config.js
├─ postcss.config.js
├─ jsconfig.json
├─ .env.local.example
└─ README.md (this file)
```

Everything text-based on the page is pulled from `src/data/*.json` — to update your bio, jobs,
projects, or skills later, you only ever need to edit those JSON files, not the components.

## 2. Run it locally

```bash
cd hetvi-portfolio
npm install
cp .env.local.example .env.local   # then fill in RESEND_API_KEY (see step 4)
npm run dev
```

Open http://localhost:3000.

## 4. Set up the contact form email (Gmail App Password + Nodemailer)

The form posts to `src/app/api/contact/route.js`, which uses **Nodemailer** to send through your
own Gmail account via an **App Password** (a 16-character password Google generates just for
apps like this — your real Gmail password never touches the code).

1. Turn on 2-Step Verification on the sending Gmail account (required):
   https://myaccount.google.com/security
2. Generate an App Password: https://myaccount.google.com/apppasswords
   - App name: something like "Portfolio Contact Form"
   - Google gives you a 16-character password (e.g. `abcd efgh ijkl mnop`) — copy it **without
     spaces**.
3. In `.env.local` (and later in your Vercel project settings), set:
   ```
   GMAIL_USER=desaihetvi008@gmail.com
   GMAIL_APP_PASSWORD=
   CONTACT_TO_EMAIL=desaihetvi008@gmail.com
   ```
4. Restart `npm run dev` after changing `.env.local`.

What the route does:
- Validates name/email/message.
- Sends **you** an email at `CONTACT_TO_EMAIL` with the message (reply-to is set to the visitor,
  so hitting "reply" in Gmail goes straight to them).
- Sends the **visitor** an automatic "thanks for reaching out" confirmation email, from the same
  Gmail account.
- Returns clear JSON errors that the form displays inline.

## 5. Swap in your résumé

Replace `public/resume/Hetvi_Desai_CV.pdf` with whichever PDF you want the "Download résumé"
buttons to serve — the filename can stay the same, or update `resumeFile` in
`src/data/profile.json` if you rename it.

## 6. Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new and import the repo.
3. In **Environment Variables**, add `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO_EMAIL`
   (same values as your `.env.local`).
4. Deploy. Vercel auto-detects Next.js — no config needed.

## 7. Editing content later

- **Bio / hero copy / stats** → `src/data/profile.json`
- **Jobs** → `src/data/experience.json`
- **Projects** → `src/data/projects.json`
- **Education** → `src/data/education.json`
- **Publications** → `src/data/publications.json`
- **Skills** → `src/data/skills.json`
- **Volunteering** → `src/data/volunteering.json`

Add a new job/project by adding a new object to the relevant array — the UI updates
automatically, no component changes required.
