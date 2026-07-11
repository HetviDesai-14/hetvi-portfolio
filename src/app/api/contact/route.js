import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || GMAIL_USER;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getTransporter() {
  // "gmail" is a Nodemailer well-known service shortcut for
  // smtp.gmail.com:465 (secure). Requires a Gmail *App Password*, not your
  // normal account password — see the README for how to generate one.
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
}

export async function POST(request) {
  try {
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variable.");
      return NextResponse.json(
        { error: "Email service isn't configured yet. Please try again later." },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const message = (body.message || "").toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are all required." },
        { status: 400 }
      );
    }
    if (name.length > 120 || email.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const safeName = escapeHtml(name);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
    const transporter = getTransporter();

    // 1. Notify Hetvi
    try {
      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${GMAIL_USER}>`,
        to: TO_EMAIL,
        replyTo: email,
        subject: `Portfolio contact — ${name}`,
        html: `
          <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto;">
            <h2 style="margin-bottom: 4px;">New message from your portfolio</h2>
            <p style="color: #666; margin-top: 0;">Someone filled out the contact form.</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 90px;">Name</td>
                <td style="padding: 8px 0;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${escapeHtml(email)}</a></td>
              </tr>
            </table>
            <div style="background: #f7f8fa; border-radius: 12px; padding: 16px 18px; line-height: 1.6;">
              ${safeMessage}
            </div>
            <p style="color: #aaa; font-size: 12px; margin-top: 24px;">Sent from your portfolio contact form</p>
          </div>
        `,
      });
    } catch (sendErr) {
      console.error("Nodemailer notify error:", sendErr);
      return NextResponse.json(
        { error: "Couldn't send your message right now. Please email desaihetvi008@gmail.com directly." },
        { status: 502 }
      );
    }

    // 2. Auto-reply "thank you" to the sender (best-effort — don't fail the request if this errors)
    try {
      await transporter.sendMail({
        from: `"Hetvi Desai" <${GMAIL_USER}>`,
        to: email,
        subject: "Thanks for reaching out — Hetvi Desai",
        html: `
          <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto;">
            <h2 style="margin-bottom: 4px;">Thanks for reaching out, ${safeName}!</h2>
            <p style="color: #444; line-height: 1.6;">
              I've received your message and will get back to you within a day or two. If it's
              urgent, feel free to reach me directly on WhatsApp at +91 7434851851.
            </p>
            <p style="color: #444; line-height: 1.6;">In the meantime, here's what you sent me:</p>
            <div style="background: #f7f8fa; border-radius: 12px; padding: 16px 18px; line-height: 1.6; color: #333;">
              ${safeMessage}
            </div>
            <p style="color: #444; line-height: 1.6; margin-top: 24px;">Talk soon,<br />Hetvi</p>
            <p style="color: #aaa; font-size: 12px; margin-top: 24px;">
              This is an automated confirmation — no need to reply to this email.
            </p>
          </div>
        `,
      });
    } catch (autoReplyErr) {
      console.error("Nodemailer auto-reply error:", autoReplyErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Unexpected server error. Please try again." }, { status: 500 });
  }
}
