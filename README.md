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

## 2. Design direction (why it looks the way it does)

- **Theme**: "activation signal" — a recurring animated waveform (`SignalDivider`,
  `LiveSignal`) stands in for the activation-steering / speech-signal work in your experience,
  used as the site's one signature motif instead of generic decoration.
- **Type**: Space Grotesk (display/headings), Inter (body), JetBrains Mono (labels, tags, data —
  reinforces the "engineer" register).
- **Color**: dark mode is graphite/near-black (`#0B0E14`) with a cyan-teal signal accent
  (`#4FD1C5`) and a soft violet secondary (`#A78BFA`); light mode mirrors it with a paper
  background and a deeper teal/violet so contrast stays accessible. Both live as CSS variables in
  `globals.css`, toggled by a `.dark` class on `<html>`.

## 3. Run it locally

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
   GMAIL_APP_PASSWORD=abcdefghijklmnop
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

**Good to know / limits:**
- Gmail via Nodemailer is fine for a personal portfolio's traffic, but Google caps regular Gmail
  accounts around ~500 sends/day and may rate-limit or flag bulk-looking traffic — not a concern
  at portfolio scale, but worth knowing if the form ever gets hammered.
- If Gmail ever blocks the sign-in attempt as "less secure," double-check you're using the App
  Password (not your normal password) and that 2-Step Verification is actually on — App Passwords
  won't appear in your Google Account until it is.
- On Vercel, add `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and `CONTACT_TO_EMAIL` as Environment
  Variables in the project settings (same as `.env.local`), then redeploy.

### Alternative: Resend (a dedicated email API)

If you outgrow Gmail's sending limits later, or want better deliverability, Resend's free tier
is a drop-in swap:

```bash
npm uninstall nodemailer
npm install resend
```

```js
// src/app/api/contact/route.js (Resend version)
import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, message } = await request.json();
  // ...same validation as the Nodemailer version...

  await resend.emails.send({
    from: "Hetvi Desai <onboarding@resend.dev>", // or your verified domain
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `Portfolio contact — ${name}`,
    html: `<p><b>${name}</b> (${email})</p><p>${message}</p>`,
  });

  await resend.emails.send({
    from: "Hetvi Desai <onboarding@resend.dev>",
    to: email,
    subject: "Thanks for reaching out — Hetvi Desai",
    html: `<p>Thanks for your message, ${name}! I'll reply soon.</p>`,
  });

  return NextResponse.json({ ok: true });
}
```

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
